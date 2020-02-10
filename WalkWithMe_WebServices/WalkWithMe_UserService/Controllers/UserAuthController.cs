using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalkWithMe_UserService.Models;

namespace WalkWithMe_UserService.Controllers
{
    [ApiController]
    public class UserAuthController : ControllerBase
    {
        private UserManager<User> _userManager;

        public UserAuthController(UserManager<User> userManager) 
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Route("/userservice/register")]
        public async Task<IActionResult> Register([FromBody] UserAuthModel authData)
        {
            User user = new User() { UserName = authData.Username };

            var x = await _userManager.CreateAsync(user, authData.Password);

            return Ok();
        }
    }
    
}
