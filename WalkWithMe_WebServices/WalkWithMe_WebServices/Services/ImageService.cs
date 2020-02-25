using MetadataExtractor;
using MetadataExtractor.Formats.Exif;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WalkWithMe_ImageService.Interfaces;
using WalkWithMe_ImageService.Model.DB;

namespace WalkWithMe_ImageService.Services
{
    public class ImageService : IImageService
    {
        public ImageModel CreateImageFromByteArray(byte[] bytes)
        {
            var directories = ImageMetadataReader.ReadMetadata(new MemoryStream(bytes));
            var subIfdDirectory = directories.OfType<GpsDirectory>().FirstOrDefault();
            var latitude = subIfdDirectory?.GetDescription(GpsDirectory.TagLatitude);
            var longitude = subIfdDirectory?.GetDescription(GpsDirectory.TagLongitude);

            Guid id = Guid.NewGuid();

            ImageModel imageModel = new ImageModel() { ImageId = id.ToString(), Latitude = latitude, Longitude = longitude };

            return imageModel;
        }
    }
}
