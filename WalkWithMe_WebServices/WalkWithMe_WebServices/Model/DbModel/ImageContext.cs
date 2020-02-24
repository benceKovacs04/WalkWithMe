using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WalkWithMe_ImageService.Model.DB
{
    public class ImageContext : DbContext
    {
        public ImageContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ImageModel> Images { get; set; }
    }
}
