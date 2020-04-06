using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace signalR_HUB.CustomMiddleware
{
    public class RequestLogger
    {

        private readonly RequestDelegate _next;

        public RequestLogger(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {

            using (var writer = File.CreateText(Guid.NewGuid().ToString() + "FROMOCELOT" + ".txt"))
            {
                foreach(var header in context.Request.Headers)
                {
                    await writer.WriteLineAsync(header.ToString());
                }
            }
                
            await _next.Invoke(context);
        }
    }
}
