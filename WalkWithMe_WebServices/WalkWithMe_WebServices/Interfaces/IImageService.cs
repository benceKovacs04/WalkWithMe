using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WalkWithMe_ImageService.Model.DB;

namespace WalkWithMe_ImageService.Interfaces
{
    public interface IImageService
    {
        ImageModel CreateImageFromByteArray(byte[] bytes);

    }
}
