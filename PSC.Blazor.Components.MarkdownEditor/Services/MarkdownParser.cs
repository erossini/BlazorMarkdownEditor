using Markdig;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSC.Blazor.Components.MarkdownEditor.Services
{
    internal static class MarkdownParser
    {
        internal static string Parse(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                var pipeline = new MarkdownPipelineBuilder()
                    .UseEmojiAndSmiley()
                    .UseAdvancedExtensions()
                    .Build();

                return Markdown.ToHtml(value, pipeline);
            }
            return "";

        }
    }
}