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
        public int Id { get; }

        /// <summary>
        /// Returns the last modified time of the file.
        /// </summary>
        public DateTime LastModified { get; }

        /// <summary>
        /// Returns the name of the file.
        /// </summary>
        public string Name { get; }

        /// <summary>
        /// Returns the size of the file in bytes.
        /// </summary>
        public long Size { get; }

        /// <summary>
        /// Returns the MIME type of the file.
        /// </summary>
        public string Type { get; }

        /// <summary>
        /// Provides a way to tell the location of the uploaded file or image.
        /// </summary>
        public string UploadUrl { get; set; }

        /// <summary>
        /// Provides a way to tell if any error happened.
        /// </summary>
        public string ErrorMessage { get; set; }
    }
}