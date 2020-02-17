using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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

            if (user != null && await _userManager.CheckPasswordAsync(user, authData.Password))
            {

                _tokenService.SetLoginCookies(Response, user, _config);
                Response.StatusCode = 200;
            }
            else
            {
                Response.StatusCode = 401;
            }
        }

        [HttpPost]
        [Route("/api/userservice/register")]
        public async Task<IActionResult> Register([FromBody] UserAuthModel authData)
        {
            User user = new User() { UserName = authData.Username };

            var register = await _userManager.CreateAsync(user, authData.Password);

            if (register.Succeeded)
            {
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
