using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkWithMe_UserService.Interfaces
{
    public interface IEmailService
    {
        Task SendConfirmationEmail(string emailAddress, string link);
    }
}
