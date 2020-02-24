using MetadataExtractor;
using MetadataExtractor.Formats.Exif;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace WalkWithMe_ImageService.Controllers
{
    [ApiController]
    public class ImageController : Controller
    {
        private readonly IConfiguration _config;

        public ImageController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        [Route("api/imageservice/test")]
        public void TestPost([FromBody] IDictionary<string, string> image)
        {

            var imageBytes = Convert.FromBase64String(image["image"]);

            var directories = ImageMetadataReader.ReadMetadata(new MemoryStream(imageBytes));
            var subIfdDirectory = directories.OfType<GpsDirectory>().FirstOrDefault();
            var Latitude = subIfdDirectory?.GetDescription(GpsDirectory.TagLatitude);
            var Longitude = subIfdDirectory?.GetDescription(GpsDirectory.TagLongitude);
            int x = 5;
        }
    }
}
