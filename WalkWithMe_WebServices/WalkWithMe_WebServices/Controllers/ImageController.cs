using MetadataExtractor;
using MetadataExtractor.Formats.Exif;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WalkWithMe_ImageService.Interfaces;
using WalkWithMe_ImageService.Model.DB;

namespace WalkWithMe_ImageService.Controllers
{
    [ApiController]
    public class ImageController : Controller
    {
        private readonly IConfiguration _config;
        private readonly ImageContext _context;
        private readonly ICloudService _cloudService;
        private readonly IImageService _imageService;

        public ImageController(IConfiguration config, ImageContext context, ICloudService cloudService, IImageService imageService)
        {
            _config = config;
            _context = context;
            _cloudService = cloudService;
            _imageService = imageService;

        }

        [HttpPost]
        [Authorize]
        [Route("api/imageservice/uploadimage")]
        public async Task UploadImage()
        {
            var headers = Request.Headers;

            if (headers.ContainsKey("Authorization"))
            {
                string encryptedToken = headers["Authorization"];
                encryptedToken = encryptedToken.Replace("Bearer ", "");

                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadJwtToken(encryptedToken);
                var userId = token.Claims.First(x => x.Type == "sub").Value;
                var userName = token.Claims.First(x => x.Type == "unique_name").Value;

                var image = Request.Form.Files[0];
                var title = Request.Form["title"];
                var description = Request.Form["description"];


                if (image != null)
                {
                    byte[] imageBytes;

                    using (var ms = new MemoryStream())
                    {
                        image.CopyTo(ms);
                        imageBytes = ms.ToArray();
                    }
                    
                    ImageModel imageModel = _imageService.CreateImageFromByteArray(imageBytes);
                    imageModel.UserId = userId;
                    imageModel.Title = title;
                    imageModel.UserName = userName;
                    imageModel.Description = description;

                    imageBytes = _imageService.ResizeImageFromByteArrayToHalf(imageBytes);

                    try
                    {
                        await _context.Images.AddAsync(imageModel);
                        await _context.SaveChangesAsync();
                        await _cloudService.UploadImageToStorage(new MemoryStream(imageBytes), imageModel.ImageId);
                        Response.StatusCode = 200;
                    }
                    catch (DbException e)
                    {
                        Response.StatusCode = 400;
                        Response.ContentType = "application/json";
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.ToString()));
                    }
                }
                else
                {
                    Response.StatusCode = 400;
                }
            }
            else
            {
                Response.StatusCode = 401;
            }
        }

        [HttpGet]
        [Route("/api/imageservice/getrandomimagedetails")]
        public IActionResult GetImageIds()
        {
            if(_context.Images.Count() == 1)
            {
                return new OkObjectResult(_context.Images.ToList());
            }
            else if(_context.Images.Count() > 1)
            {
                Random rnd = new Random();
                int toSkip = rnd.Next(1, _context.Images.Count());
                var image = _context.Images.OrderBy(r => Guid.NewGuid()).Skip(toSkip).Take(1).First();
                var imageList = new List<ImageModel>() { image };

                return new OkObjectResult(imageList);
            }

            return new OkObjectResult(new List<ImageModel>());
            
        }
    
        [HttpGet]
        [Route("api/imageservice/getimage")]
        public async Task<IActionResult> GetImage()
        {
            string fileName = Request.Query["FileName"];
            byte[] imageBytes = (await _cloudService.GetImageFromStorage(fileName)).ToArray();

            return File(imageBytes, "image/jpeg");


        }

        [HttpPatch]
        [Route("/api/imageservice/updatepoints")]
        public async Task UpdatePoints([FromBody] Dictionary<string, string> payload)
        {
            _context.Images.Find(payload["imageId"]).Points++;
            await _context.SaveChangesAsync();
        }

        [HttpGet]
        [Route("/api/imageservice/getimagesbyuser")]
        [Authorize]
        public async Task<List<ImageModel>> GetImagesByUser()
        {
            string username = User.Identity.Name;

            List<ImageModel> images = _context.Images.Where(image => image.UserName == username).ToList();

            return images;
        }

        [HttpPost]
        [Route("api/imageservice/deleteimage")]
        [Authorize]
        public async Task DeleteImage([FromBody] Dictionary<string, string> payload)
        {
            string imageId = payload["imageId"];
            var didDeleteFromCloud = await _cloudService.DeleteImageFromStorage(imageId);

            if(didDeleteFromCloud)
            {
                _context.Images.Remove(_context.Images.Find(imageId));
                int result = await _context.SaveChangesAsync();
                if(result == 1)
                {
                    Response.StatusCode = 200;
                }
            }
        }
    }
}
