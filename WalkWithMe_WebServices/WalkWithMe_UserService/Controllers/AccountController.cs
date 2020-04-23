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
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;

        public AccountController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("api/account/confirmemail", Name= "ConfirmEmail")]
        public async Task ConfirmEmail()
        {
            var userId = Request.Query["userId"].ToString();
            var token = Request.Query["token"].ToString();
            if(userId != "" && token != "")
            {
                User user = await _userManager.FindByIdAsync(userId);
                var result = await _userManager.ConfirmEmailAsync(user, token);
                Response.Redirect("http://localhost:3000/login");
            }
        }
    }
}
