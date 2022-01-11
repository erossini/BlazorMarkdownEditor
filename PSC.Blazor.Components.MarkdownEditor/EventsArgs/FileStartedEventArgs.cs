namespace PSC.Blazor.Components.MarkdownEditor.EventsArgs
{
    /// <summary>
    /// Provides the information about the file started to be uploaded.
    /// </summary>
    public class FileStartedEventArgs : EventArgs
    {
        /// <summary>
        /// A default <see cref="FileStartedEventArgs"/> constructor.
        /// </summary>
        /// <param name="file">File that is started with upload.</param>
        public FileStartedEventArgs(FileEntry file)
        {
            File = file;
        }

        /// <summary>
        /// Gets the file currently being uploaded.
        /// </summary>
        public FileEntry File { get; }
    }
}