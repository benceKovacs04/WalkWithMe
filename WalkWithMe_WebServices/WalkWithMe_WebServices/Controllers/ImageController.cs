using MetadataExtractor;
using MetadataExtractor.Formats.Exif;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;

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
        [Authorize]
        [Route("api/imageservice/uploadimage")]
        public void TestPost([FromBody] IDictionary<string, string> image)
        {
            var headers = Request.Headers;

            if (headers.ContainsKey("Authorization"))
            {
                string encryptedToken = headers["Authorization"];
                encryptedToken = encryptedToken.Replace("Bearer ", "");

                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadJwtToken(encryptedToken);
                var asd = token.Claims.First(x => x.Type == "sub").Value;
                int y = 5;
            }

            var imageBytes = Convert.FromBase64String(image["image"]);

            var directories = ImageMetadataReader.ReadMetadata(new MemoryStream(imageBytes));
            var subIfdDirectory = directories.OfType<GpsDirectory>().FirstOrDefault();
            var Latitude = subIfdDirectory?.GetDescription(GpsDirectory.TagLatitude);
            var Longitude = subIfdDirectory?.GetDescription(GpsDirectory.TagLongitude);
        }
    }
}
