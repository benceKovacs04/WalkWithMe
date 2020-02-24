using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WalkWithMe_UserService.Interfaces;
using WalkWithMe_UserService.Models;

namespace WalkWithMe_UserService.Services
{
    public class TokenService : ITokenService
    {
        public void SetLoginCookies(HttpResponse response, User user, IConfiguration config)
        {
            var authClaims = new[]
                 {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetValue<string>("JWTSecretKey")));

            var token = new JwtSecurityToken(
                issuer: config.GetValue<string>("GateWayURL"),
                audience: config.GetValue<string>("GateWayURL"),
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
                );

            CookieOptions tokenCookieOptions = new CookieOptions();
            tokenCookieOptions.Expires = DateTime.Now.AddHours(3);
            tokenCookieOptions.HttpOnly = true;

            response.Cookies.Append("token", new JwtSecurityTokenHandler().WriteToken(token), tokenCookieOptions);

            CookieOptions secondaryCookieOption = new CookieOptions();
            secondaryCookieOption.Expires = DateTime.Now.AddHours(3);
            response.Cookies.Append("secondaryToken", "loggedIn", secondaryCookieOption);
        }
    }
}
