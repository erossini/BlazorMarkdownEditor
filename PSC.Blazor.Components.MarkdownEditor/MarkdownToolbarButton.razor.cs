namespace PSC.Blazor.Components.MarkdownEditor
{
    /// <summary>
    /// Markdown Toolbar Button
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Components.ComponentBase" />
    /// <seealso cref="System.IDisposable" />
    public partial class MarkdownToolbarButton : IDisposable
    {
        /// <summary>
        /// Gets or sets the custom name corresponding to the action.
        /// </summary>
        [Parameter]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the custom value corresponding to the action.
        /// </summary>
        [Parameter]
        public object Value { get; set; }

        /// <summary>
        /// Gets or sets the custom icon name corresponding to the action.
        /// </summary>
        [Parameter]
        public string Icon { get; set; }

        /// <summary>
        /// Gets or sets the small tooltip that appears via the <c>title=""</c> attribute.
        /// </summary>
        [Parameter]
        public string Title { get; set; }

        /// <summary>
        /// If true, separator will be placed before the button.
        /// </summary>
        [Parameter]
        public bool Separator { get; set; }

        /// <summary>
        /// Gets or sets the parent markdown instance.
        /// </summary>
        [CascadingParameter]
        protected MarkdownEditor ParentMarkdown { get; set; }

        /// <summary>
        /// The toolbar action.
        /// </summary>
        private MarkdownAction? action;
        protected override void OnInitialized()
        {
            if (ParentMarkdown is not null)
            {
                ParentMarkdown.AddMarkdownToolbarButton(this);
            }

            base.OnInitialized();
        }

        public void Dispose()
        {
            if (ParentMarkdown is not null)
            {
                ParentMarkdown.RemoveMarkdownToolbarButton(this);
            }
        }

        /// <summary>
        /// Gets or sets the predefined toolbar action. If undefined <see cref="Name"/> will be used.
        /// </summary>
        [Parameter]
        public MarkdownAction? Action
        {
            get => action;
            set
            {
                action = value;
            }
        }
    }
}