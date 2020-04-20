using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using WalkWithMe_ImageService.Interfaces;
using WalkWithMe_ImageService.Model.DB;

namespace WalkWithMe_ImageService.Services
{
    public class CloudService : ICloudService
    {

        private readonly StorageCredentials _credentials;
        private readonly CloudStorageAccount _account;
        private readonly CloudBlobClient _client;
        
        public CloudService()
        {
            _credentials = new StorageCredentials(
                Environment.GetEnvironmentVariable("Azure_Account"),
                Environment.GetEnvironmentVariable("Azure_Blob_Storage_Account_Key")
                );
            _account = new CloudStorageAccount(_credentials, useHttps: true);
            _client = _account.CreateCloudBlobClient();
        }

        public async Task<bool> UploadImageToStorage(MemoryStream file, string fileName)
        {
            CloudBlobContainer container = _client.GetContainerReference("images");
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

            await blockBlob.UploadFromStreamAsync(file);

            return await Task.FromResult(true);
        }

        public async Task<MemoryStream> GetImageFromStorage(string fileName)
        {

            CloudBlobContainer container = _client.GetContainerReference("images");
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

            MemoryStream imageStream = new MemoryStream();
            await blockBlob.DownloadToStreamAsync(imageStream);

            return imageStream;
            
        }

        public async Task<bool> DeleteImageFromStorage(string fileName)
        {
            CloudBlobContainer container = _client.GetContainerReference("images");
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

            bool result = await blockBlob.DeleteIfExistsAsync();

            return result;
        }
    }
}
