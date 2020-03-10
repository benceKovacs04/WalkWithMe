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
            var latitudeDeg = subIfdDirectory?.GetDescription(GpsDirectory.TagLatitude);
            var longitudeDeg = subIfdDirectory?.GetDescription(GpsDirectory.TagLongitude);

            string latitude = null;
            string longitude = null;


            if(latitudeDeg != null && longitudeDeg != null)
            {
                latitude = ConvertToDecimal(latitudeDeg);
                longitude = ConvertToDecimal(longitudeDeg);
            }

            Guid id = Guid.NewGuid();

            ImageModel imageModel = new ImageModel() { 
                ImageId = id.ToString(), 
                Latitude = latitude, 
                Longitude = longitude, 
                PostDate = DateTime.Now 
            };

            return imageModel;
        }

        private string ConvertToDecimal(string coord)
        {
            coord = coord.Replace("°", "").Replace("'", "").Replace("\"", "");
            string[] coords = coord.Split(null);

            decimal decimalCoord = Convert.ToDecimal(coords[0]);
            decimalCoord += Convert.ToDecimal(coords[1]) / 60;
            decimalCoord += Convert.ToDecimal(coords[2]) / 3600;


            return Math.Round(decimalCoord, 8).ToString();
        }
    }
}
