namespace PSC.Blazor.Components.MarkdownEditor.EventsArgs
{
    /// <summary>
    /// Supplies the information about the selected files ready to be uploaded.
    /// </summary>
    public class FileChangedEventArgs : EventArgs
    {
        /// <summary>
        /// A default <see cref="FileChangedEventArgs"/> constructor.
        /// </summary>
        /// <param name="files">List of files.</param>
        public FileChangedEventArgs(params FileEntry[] files)
        {
            Files = files;
        }

        /// <summary>
        /// Gets the list of selected files.
        /// </summary>
        public FileEntry[] Files { get; }
    }
}