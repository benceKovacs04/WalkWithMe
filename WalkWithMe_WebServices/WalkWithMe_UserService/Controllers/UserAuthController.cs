using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Threading.Tasks;
using WalkWithMe_UserService.Interfaces;
using WalkWithMe_UserService.Models;

namespace WalkWithMe_UserService.Controllers
{
    [ApiController]
    public class UserAuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        private readonly ITokenService _tokenService;

        public UserAuthController(UserManager<User> userManager, IConfiguration config, ITokenService tokenService) 
        {
            _userManager = userManager;
            _config = config;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("api/userservice/login")]
        public async Task Login([FromBody] UserAuthModel authData) 
        {
            var user = await _userManager.FindByNameAsync(authData.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, authData.Password) && user.EmailConfirmed)
            {

                _tokenService.SetLoginCookies(Response, user, _config);
                Response.StatusCode = 200;
            }
            else
            {
                Response.StatusCode = 401;
                Response.ContentType = "application/json";
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes("Login unsuccessful"));
            }
        }

        [HttpPost]
        [Route("/api/userservice/signup")]
        public async Task<IActionResult> Register([FromBody] UserAuthModel authData)
        {
            User user = new User() { UserName = authData.Username };

            var register = await _userManager.CreateAsync(user, authData.Password);

            if (register.Succeeded)
            {
                var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                //var confirmationLink = Url.Action("confirmemail", "api/account", new { userId = user.Id, token = emailToken }, Request.Scheme);
                var confirmationLink = Url.Link("ConfirmEmail", new { userId = user.Id, token = emailToken });
                confirmationLink = confirmationLink.Replace($"{_config.GetValue<string>("ServiceURL")}", $"{_config.GetValue<string>("GateWayURL")}");
                
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("/api/userservice/logout")]
        public void Logout()
        {
            Response.StatusCode = 200;
            Response.Cookies.Append("token", "loggedOut");
        }
    }
    
}
