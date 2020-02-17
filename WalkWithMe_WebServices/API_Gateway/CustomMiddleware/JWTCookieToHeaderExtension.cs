using Microsoft.AspNetCore.Builder;

namespace API_Gateway.CustomMiddleware
{
    public static class JWTCookieToHeaderExtension
    {
        public static IApplicationBuilder UseJWTCookieToHeader(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JWTCookieToHeader>();
        }
    }
}
