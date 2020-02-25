using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WalkWithMe_ImageService.Model.DB
{
    public class ImageModel
    {
        [Key]
        public string ImageId { get; set; }
        public string UserId { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public DateTime PostDate { get; set; }
        public int Points { get; set; }
    }
}
