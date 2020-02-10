using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkWithMe_UserService.Models.DbModel
{
    public class WalkWithMeUserContext : IdentityDbContext<User>
    {
        public WalkWithMeUserContext(DbContextOptions<WalkWithMeUserContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }


    }
}
