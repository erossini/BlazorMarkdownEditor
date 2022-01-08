using Microsoft.AspNetCore.Mvc;

namespace MarkdownEditorDemo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile files)
        {
            long size = files.Length;

            var filePath = Path.GetTempFileName();

            using (var stream = System.IO.File.Create(filePath))
            {
                await files.CopyToAsync(stream);
            }

            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok();

            //// Check if thefile is there
            //if (file == null)
            //    return BadRequest("File is required");

            //// Get the file name
            //var fileName = file.FileName;

            //// Get the extension
            //var extension = Path.GetExtension(fileName);

            //// Validate the extension based on your business needs

            //// Generate a new file to avoid dublicates = (FileName withoutExtension - GUId.extension)
            //var newFileName = $"{Path.GetFileNameWithoutExtension(fileName)}-{Guid.NewGuid().ToString()}{extension}";

            //// Create the full path of the file including the directory (For this demo we will save the file insidea folder called Data within wwwroot)
            //var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Data");
            //var fullPath = Path.Combine(directoryPath, newFileName);

            //// Maek sure the directory is ther bycreating it if it's not exist
            //Directory.CreateDirectory(directoryPath);

            //// Create a new file stream where you want to put your file and copy the content from the current file stream to the new one
            //using (var fileStream = new FileStream(fullPath, FileMode.Create, FileAccess.Write))
            //{
            //    // Copy the content to the new stream
            //    await file.CopyToAsync(fileStream);
            //}

            //// You are done return the new URL which is (yourapplication url/data/newfilename)
            //return Ok($"https://localhost:44302/Data/{newFileName}");
        }
    }
}