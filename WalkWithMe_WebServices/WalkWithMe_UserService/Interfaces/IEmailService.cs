using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkWithMe_UserService.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendConfirmationEmail(string emailAddress, string link);
    }
}
