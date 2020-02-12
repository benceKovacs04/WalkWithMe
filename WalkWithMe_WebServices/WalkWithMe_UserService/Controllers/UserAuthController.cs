﻿using Microsoft.AspNetCore.Http;
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
using WalkWithMe_UserService.Models;

namespace WalkWithMe_UserService.Controllers
{
    [ApiController]
    public class UserAuthController : Controller
    {
        private UserManager<User> _userManager;
        private IConfiguration _config;

        public UserAuthController(UserManager<User> userManager, IConfiguration config) 
        {
            _userManager = userManager;
            _config = config;
        }

        [HttpPost]
        [Route("/userservice/login")]
        public async Task Login([FromBody] UserAuthModel authData) 
        {
            var user = await _userManager.FindByNameAsync(authData.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, authData.Password))
            {
                var authClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("JWTSecretKey")));

                var token = new JwtSecurityToken(
                    issuer: _config.GetValue<string>("ServiceURL"),
                    audience: _config.GetValue<string>("ServiceURL"),
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
                    );

                CookieOptions tokenCookieOptions = new CookieOptions();
                tokenCookieOptions.Expires = DateTime.Now.AddHours(3);
                tokenCookieOptions.HttpOnly = true;

                Response.StatusCode = 200;
                Response.Cookies.Append("token", new JwtSecurityTokenHandler().WriteToken(token), tokenCookieOptions);

                Response.Cookies.Append("secondaryToken", "loggedIn");
            }
            else
            {
                Response.StatusCode = 401;
            }
        }

        [HttpPost]
        [Route("/userservice/register")]
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
    }
    
}
