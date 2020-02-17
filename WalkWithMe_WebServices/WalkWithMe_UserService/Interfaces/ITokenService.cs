using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalkWithMe_UserService.Models;

namespace WalkWithMe_UserService.Interfaces
{
    public interface ITokenService
    {
        void SetLoginCookies(HttpResponse response, User user, IConfiguration config);
    }
}
