using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WalkWithMe_ImageService.Model.DB
{
    public class ImageModel
    {
        [Key]
        public string ImageId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public DateTime PostDate { get; set; }
        public int Points { get; set; }
        [Column(TypeName = "VARCHAR(90)")]
        [StringLength(90)]
        public string Title { get; set; }

        [Column(TypeName = "VARCHAR(1500)")]
        [StringLength(1500)]
        public string Description { get; set; }
    }
}
