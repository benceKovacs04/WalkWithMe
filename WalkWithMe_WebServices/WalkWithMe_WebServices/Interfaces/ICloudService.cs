using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WalkWithMe_ImageService.Interfaces
{
    public interface ICloudService
    {
        Task<bool> UploadImageToStorage(MemoryStream file, string fileName);
    }
}
