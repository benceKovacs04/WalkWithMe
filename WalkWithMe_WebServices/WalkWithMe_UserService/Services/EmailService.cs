using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalkWithMe_UserService.Interfaces;

namespace WalkWithMe_UserService.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendConfirmationEmail(string emailAddress, string link)
        {
            var apiKey = Environment.GetEnvironmentVariable("Send_Grid_API_Key");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("walkwithme@walk.com", "walkwithme@walk.com");
            var to = new EmailAddress(emailAddress, "example user");
            var subject = "Authenticate";
            var plainTextContent = "";
            var htmlContent = $"You can verify your account by clicking <a href='{link}'>This link!</a>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            var response = await client.SendEmailAsync(msg);
        }
    }
}
