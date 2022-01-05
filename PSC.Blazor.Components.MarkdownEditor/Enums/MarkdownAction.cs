using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSC.Blazor.Components.MarkdownEditor.Enums
{
    /// <summary>
    /// Markdown toolbar actions.
    /// </summary>
    /// <seealso href="https://github.com/Ionaru/easy-markdown-editor#toolbar-icons"/>
    public enum MarkdownAction
    {
        Bold,
        Italic,
        Strikethrough,
        Heading,
        HeadingSmaller,
        HeadingBigger,
        Heading1,
        Heading2,
        Heading3,
        Code,
        Quote,
        UnorderedList,
        OrderedList,
        CleanBlock,
        Link,
        Image,
        Table,
        HorizontalRule,
        Preview,
        SideBySide,
        Fullscreen,
        Guide,
    }
}
