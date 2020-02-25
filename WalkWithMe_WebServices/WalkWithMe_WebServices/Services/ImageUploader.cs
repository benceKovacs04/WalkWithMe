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

namespace WalkWithMe_ImageService.Services
{
    public class ImageUploader : IImageUploader
    {
        public async Task<bool> UploadImageToStorage(MemoryStream file, string fileName)
        {
            string accountName = Environment.GetEnvironmentVariable("Azure_Account");
            string storageAccKey = Environment.GetEnvironmentVariable("Azure_Blob_Storage_Account_Key");

            StorageCredentials credentials = new StorageCredentials(accountName, storageAccKey);

            CloudStorageAccount account = new CloudStorageAccount(credentials, useHttps: true);

            CloudBlobClient client = account.CreateCloudBlobClient();

            CloudBlobContainer container = client.GetContainerReference("images");

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

            await blockBlob.UploadFromStreamAsync(file);

            return await Task.FromResult(true);
        }
    }
}
