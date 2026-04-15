namespace PSC.Blazor.Components.MarkdownEditor
{
    /// <summary>
    /// Provider for the <see cref="MarkdownAction"/>.
    /// </summary>
    internal static class MarkdownActionProvider
    {
        /// <summary>
        /// Gets the Markdown class for the specified action.
        /// </summary>
        public static string Class(MarkdownAction? action, string name)
        {
            if (!string.IsNullOrWhiteSpace(name))
                return name;

            return action switch
            {
                MarkdownAction.Bold => "bold",
                MarkdownAction.Italic => "italic",
                MarkdownAction.Strikethrough => "strikethrough",
                MarkdownAction.Heading => "heading",
                MarkdownAction.HeadingSmaller => "heading-smaller",
                MarkdownAction.HeadingBigger => "heading-bigger",
                MarkdownAction.Heading1 => "heading-1",
                MarkdownAction.Heading2 => "heading-2",
                MarkdownAction.Heading3 => "heading-3",
                MarkdownAction.Code => "code",
                MarkdownAction.Quote => "quote",
                MarkdownAction.UnorderedList => "unordered-list",
                MarkdownAction.OrderedList => "ordered-list",
                MarkdownAction.CleanBlock => "clean-block",
                MarkdownAction.Link => "link",
                MarkdownAction.Image => "image",
                MarkdownAction.Table => "tbTable",
                MarkdownAction.HorizontalRule => "horizontal-rule",
                MarkdownAction.Preview => "preview",
                MarkdownAction.SideBySide => "side-by-side",
                MarkdownAction.Fullscreen => "fullscreen",
                MarkdownAction.Guide => "guide",
                _ => name
            };
        }

        /// <summary>
        /// Gets the Markdown event name for the specified action.
        /// </summary>
        public static string Event(MarkdownAction? action) =>
            action switch
            {
                MarkdownAction.Bold => "toggleBold",
                MarkdownAction.Italic => "toggleItalic",
                MarkdownAction.Strikethrough => "toggleStrikethrough",
                MarkdownAction.Heading => "toggleHeadingSmaller",
                MarkdownAction.HeadingSmaller => "toggleHeadingSmaller",
                MarkdownAction.HeadingBigger => "toggleHeadingBigger",
                MarkdownAction.Heading1 => "toggleHeading1",
                MarkdownAction.Heading2 => "toggleHeading2",
                MarkdownAction.Heading3 => "toggleHeading3",
                MarkdownAction.Code => "toggleCodeBlock",
                MarkdownAction.Quote => "toggleBlockquote",
                MarkdownAction.UnorderedList => "toggleUnorderedList",
                MarkdownAction.OrderedList => "toggleOrderedList",
                MarkdownAction.CleanBlock => "cleanBlock",
                MarkdownAction.Link => "drawLink",
                MarkdownAction.Image => "drawImage",
                MarkdownAction.Table => "drawTable",
                MarkdownAction.HorizontalRule => "drawHorizontalRule",
                MarkdownAction.Preview => "togglePreview",
                MarkdownAction.SideBySide => "toggleSideBySide",
                MarkdownAction.Fullscreen => "toggleFullScreen",
                MarkdownAction.Guide => "https://www.markdownguide.org/basic-syntax/",
                _ => null
            };

        /// <summary>
        /// Gets the Markdown icon class name for the specified action.
        /// </summary>
        public static string IconClass(MarkdownAction? action, string icon)
        {
            if (!string.IsNullOrWhiteSpace(icon))
                return icon;

            return action switch
            {
                MarkdownAction.Bold => "bi bi-type-bold",
                MarkdownAction.Italic => "bi bi-type-italic",
                MarkdownAction.Strikethrough => "bi bi-type-strikethrough",
                MarkdownAction.Heading => "bi bi-type-h1",
                MarkdownAction.HeadingSmaller => "bi bi-type-h2",
                MarkdownAction.HeadingBigger => "bi bi-type-h1",
                MarkdownAction.Heading1 => "bi bi-type-h1 header-1",
                MarkdownAction.Heading2 => "bi bi-type-h2 header-2",
                MarkdownAction.Heading3 => "bi bi-type-h3 header-3",
                MarkdownAction.Code => "bi bi-code-slash",
                MarkdownAction.Quote => "bi bi-quote",
                MarkdownAction.UnorderedList => "bi bi-list-ul",
                MarkdownAction.OrderedList => "bi bi-list-ol",
                MarkdownAction.CleanBlock => "bi bi-eraser",
                MarkdownAction.Link => "bi bi-link-45deg",
                MarkdownAction.Image => "bi bi-image",
                MarkdownAction.Table => "bi bi-table",
                MarkdownAction.HorizontalRule => "bi bi-dash-lg",
                MarkdownAction.Preview => "bi bi-eye no-disable",
                MarkdownAction.SideBySide => "bi bi-layout-split no-disable no-mobile",
                MarkdownAction.Fullscreen => "bi bi-arrows-fullscreen no-disable no-mobile",
                MarkdownAction.Guide => "bi bi-question-circle",
                _ => icon
            };
        }

        /// <summary>
        /// Serializes the specified buttons.
        /// </summary>
        /// <param name="buttons">The buttons.</param>
        /// <returns></returns>
        public static IEnumerable<object> Serialize(List<MarkdownToolbarButton> buttons)
        {
            foreach (var button in buttons)
            {
                if (button.Separator)
                    yield return "|";

                yield return new
                {
                    Name = Class(button.Action, button.Name),
                    Value = button.Value,
                    Action = Event(button.Action),
                    ClassName = IconClass(button.Action, button.Icon),
                    Title = button.Title,
                };
            }
        }
    }
}