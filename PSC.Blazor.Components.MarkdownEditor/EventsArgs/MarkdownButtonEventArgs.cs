using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSC.Blazor.Components.MarkdownEditor.EventsArgs
{
    /// <summary>
    /// Supplies the information about the markdown button click event.
    /// </summary>
    public class MarkdownButtonEventArgs : EventArgs
    {
        /// <summary>
        /// A default <see cref="MarkdownButtonEventArgs"/> constructor.
        /// </summary>
        /// <param name="name">Button action name.</param>
        /// <param name="value">Button value.</param>
        public MarkdownButtonEventArgs(string name, object value)
        {
            Name = name;
            Value = value;
        }

        /// <summary>
        /// Gets the button action name.
        /// </summary>
        public string Name { get; }

        /// <summary>
        /// Gets the button action value.
        /// </summary>
        public object Value { get; }
    }
}
