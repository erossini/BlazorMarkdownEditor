namespace PSC.Blazor.Components.MarkdownEditor
{
    /// <summary>
    /// Markdown Error Messages
    /// </summary>
    public class MarkdownErrorMessages
    {
        /// <summary>
        /// The server did not receive any file from the user. Defaults to You must select a file.
        /// </summary>
        public string NoFileGiven { get; set; }

        /// <summary>
        /// The user send a file type which doesn't match the imageAccept list, or the server returned this error code.
        /// Defaults to This image type is not allowed.
        /// </summary>
        public string TypeNotAllowed { get; set; }

        /// <summary>
        /// The size of the image being imported is bigger than the imageMaxSize, or if the server returned this error code.
        /// Defaults to Image #image_name# is too big (#image_size#).\nMaximum file size is #image_max_size#.
        /// </summary>
        public string FileTooLarge { get; set; }

        /// <summary>
        /// An unexpected error occurred when uploading the image. Defaults to Something went wrong when uploading the image #image_name#.
        /// </summary>
        public string ImportError { get; set; }
    }
}