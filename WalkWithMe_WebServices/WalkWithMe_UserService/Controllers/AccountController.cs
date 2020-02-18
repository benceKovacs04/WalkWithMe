using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkWithMe_UserService.Controllers
{
    [ApiController]
    public class AccountController : Controller
    {
        [HttpGet]
        [Route("api/account/confirmemail", Name="ConfirmEmail")]
        public void ConfirmEmail()
        {

        }
    }
}
