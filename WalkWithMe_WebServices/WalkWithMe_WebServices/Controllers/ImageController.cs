using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


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

            var bytes = Convert.FromBase64String(image["image"]);

            using (var imageFile = new FileStream(@"E:\Codecool\test.jpg", FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
            

            
        }
    }
}
