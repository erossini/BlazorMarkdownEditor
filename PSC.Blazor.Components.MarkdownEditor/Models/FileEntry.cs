using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSC.Blazor.Components.MarkdownEditor.Models
{
    public class FileEntry
    {
        /// <summary>
        /// Gets the file-entry id.
        /// </summary>
        public int id { get; }

        /// <summary>
        /// Returns the last modified time of the file.
        /// </summary>
        public DateTime lastModified { get; set; }

        /// <summary>
        /// Returns the name of the file.
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// Returns the size of the file in bytes.
        /// </summary>
        public long size { get; set; }

        /// <summary>
        /// Returns the MIME type of the file.
        /// </summary>
        public string type { get; set; }

        /// <summary>
        /// Provides a way to tell the location of the uploaded file or image.
        /// </summary>
        public string UploadUrl { get; set; }

        /// <summary>
        /// Provides a way to tell if any error happened.
        /// </summary>
        public string ErrorMessage { get; set; }

        public string ElementId { get; set; }

        public string contentBase64 { get; set; }
    }
}