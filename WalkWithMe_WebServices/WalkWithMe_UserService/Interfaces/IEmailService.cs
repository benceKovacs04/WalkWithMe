using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkWithMe_UserService.Interfaces
{
    internal interface IEmailService
    {
        bool SendConfirmationEmail();
    }
}
