namespace PSC.Blazor.Components.MarkdownEditor.Enums
{
    /// <summary>
    /// How the editor takes typing (CodeMirror's <c>inputStyle</c>).
    /// </summary>
    public enum MarkdownInputStyle
    {
        /// <summary>
        /// EasyMDE chooses: <see cref="ContentEditable"/> on a phone or tablet, <see cref="Textarea"/> elsewhere.
        /// </summary>
        Automatic,
        /// <summary>
        /// A hidden text area takes the typing. The browser's spell checker cannot see the text, so nothing is underlined.
        /// </summary>
        Textarea,
        /// <summary>
        /// The text itself is editable, so the browser's own spell checker underlines it and offers corrections,
        /// in the languages set in the browser, when <see cref="MarkdownEditor.NativeSpellChecker"/> is on.
        /// </summary>
        ContentEditable
    }
}
