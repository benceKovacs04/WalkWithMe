using API_Gateway.Model;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace API_Gateway.CustomMiddleware
{
    public class JWTCookieToHeader
    {
        private readonly RequestDelegate _next;

        public JWTCookieToHeader(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var cookie = context.Request.Cookies["token"];
            if(cookie != null)
            {
                context.Request.Headers.Append("Authorization", "Bearer " + cookie);
            }

            await _next.Invoke(context);
        }

    }
}
