﻿using MetadataExtractor;
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
        public async Task UploadImage([FromBody] IDictionary<string, string> image)
        {
            var headers = Request.Headers;

            if (headers.ContainsKey("Authorization"))
            {
                string encryptedToken = headers["Authorization"];
                encryptedToken = encryptedToken.Replace("Bearer ", "");

                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadJwtToken(encryptedToken);
                var userId = token.Claims.First(x => x.Type == "sub").Value;

                var imageBytes = Convert.FromBase64String(image["image"]);

                ImageModel imageModel = _imageService.CreateImageFromByteArray(imageBytes);
                imageModel.UserId = userId;

                try
                {
                    var asd = await _context.Images.AddAsync(imageModel);
                    int result = await _context.SaveChangesAsync();
                    bool uploadResult = await _cloudService.UploadImageToStorage(new MemoryStream(imageBytes), imageModel.ImageId);
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
                Response.StatusCode = 401;
            }
        }
    }
}
