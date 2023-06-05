using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSC.Blazor.Components.MarkdownEditor
{
    internal static class StringExtensions
    {
        /// <summary>Extracts the string between the start tag and the end</summary>
        /// <param name="s">The string where to search</param>
        /// <param name="tag">The tag (only the tag itself: for example, 
        /// pass <strong>body</strong> if you want to extract the content between &lt;body&gt; 
        /// and &lt;/body).</param>
        /// <returns>A string with the content</returns>
        internal static string ExtractTagContent(this string s, string tag)
        {
            // You should check for errors in real-world code, omitted for brevity
            var startTag = "<" + tag + ">";
            int startIndex = s.IndexOf(startTag) + startTag.Length;
            int endIndex = s.IndexOf("</" + tag + ">", startIndex);
            return s.Substring(startIndex, endIndex - startIndex);
        }
    }
}