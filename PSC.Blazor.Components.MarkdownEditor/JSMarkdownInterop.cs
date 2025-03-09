namespace PSC.Blazor.Components.MarkdownEditor
{
    /// <summary>
    /// JSMarkdownInterop class
    /// </summary>
    public class JSMarkdownInterop
    {
        private readonly Lazy<Task<IJSObjectReference>> moduleTask;

        /// <summary>
        /// The js runtime
        /// </summary>
        private IJSRuntime jsRuntime;

        /// <summary>
        /// Initializes a new instance of the <see cref="JSMarkdownInterop"/> class.
        /// </summary>
        /// <param name="JSRuntime">The js runtime.</param>
        public JSMarkdownInterop(IJSRuntime JSRuntime)
        {
            jsRuntime = JSRuntime;

            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>("import",
                "./_content/PSC.Blazor.Components.MarkdownEditor/js/markdownEditor.js").AsTask());
        }

        /// <summary>
        /// Adds the CSS.
        /// </summary>
        /// <param name="targetUrl">The target URL.</param>
        /// <returns></returns>
        public async ValueTask AddCSS(string targetUrl)
        {
            await jsRuntime.InvokeVoidAsync("meLoadCSS", targetUrl);
        }

        /// <summary>
        /// Adds the js.
        /// </summary>
        /// <param name="targetUrl">The target URL.</param>
        /// <returns></returns>
        public async ValueTask AddJS(string targetUrl)
        {
            await jsRuntime.InvokeVoidAsync("meLoadJs", targetUrl);
        }

        /// <summary>
        /// Allows the resize or the textarea.
        /// </summary>
        /// <param name="Id">The identifier of the MarkEditor control.</param>
        /// <returns>ValueTask.</returns>
        public async ValueTask AllowResize(string Id)
        {
            await jsRuntime.InvokeVoidAsync("allowResize", Id);
        }

        /// <summary>
        /// Deletes the automatic save entry in the local storage.
        /// </summary>
        /// <returns>ValueTask.</returns>
        public async ValueTask DeleteAllAutoSave()
        {
            await jsRuntime.InvokeVoidAsync("deleteAllAutoSave");
        }

        /// <summary>
        /// Deletes the automatic save.
        /// </summary>
        /// <param name="autoSaveId">The automatic save identifier.</param>
        /// <returns>ValueTask.</returns>
        public async ValueTask DeleteAutoSave(string autoSaveId)
        {
            await jsRuntime.InvokeVoidAsync("deleteAutoSave", autoSaveId);
        }

        /// <summary>
        /// Destroys the specified element reference.
        /// </summary>
        /// <param name="elementRef">The element reference.</param>
        /// <param name="elementId">The element identifier.</param>
        /// <returns></returns>
        public async ValueTask Destroy(ElementReference elementRef, string elementId)
        {
            await jsRuntime.InvokeVoidAsync("destroy", elementRef, elementId);
        }

        /// <summary>
        /// Gets the value.
        /// </summary>
        /// <param name="elementId">The element identifier.</param>
        /// <returns></returns>
        public async ValueTask<string> GetValue(string elementId)
        {
            return await jsRuntime.InvokeAsync<string>("getValue", elementId);
        }

        /// <summary>
        /// Initializes the specified dot net object reference.
        /// </summary>
        /// <param name="dotNetObjectRef">The dotnet object reference.</param>
        /// <param name="elementRef">The element reference.</param>
        /// <param name="elementId">The element identifier.</param>
        /// <param name="options">The options.</param>
        /// <returns></returns>
        public async ValueTask Initialize(DotNetObjectReference<MarkdownEditor> dotNetObjectRef,
            ElementReference elementRef,
            string elementId, object options)
        {
            await jsRuntime.InvokeVoidAsync("initialize", dotNetObjectRef, elementRef, elementId, options);
        }

        /// <summary>
        /// Notifies the image upload error.
        /// </summary>
        /// <param name="elementId">The element identifier.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public async ValueTask NotifyImageUploadError(string elementId, string errorMessage)
        {
            await jsRuntime.InvokeVoidAsync("notifyImageUploadError", elementId, errorMessage);
        }

        /// <summary>
        /// Notifies the image upload success.
        /// </summary>
        /// <param name="elementId">The element identifier.</param>
        /// <param name="imageUrl">The image URL.</param>
        /// <returns></returns>
        public async ValueTask NotifyImageUploadSuccess(string elementId, string imageUrl)
        {
            await jsRuntime.InvokeVoidAsync("notifyImageUploadSuccess", elementId, imageUrl);
        }

        /// <summary>
        /// Sets the value.
        /// </summary>
        /// <param name="elementId">The element identifier.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public async ValueTask SetValue(string elementId, string value)
        {
            await jsRuntime.InvokeVoidAsync("setValue", elementId, value);
            await jsRuntime.InvokeVoidAsync("setInitValue", elementId, value);
        }

        /// <summary>
        /// Toggles preview mode.
        /// </summary>
        /// <param name="elementId">The element identifier.</param>
        /// <returns></returns>
        public async ValueTask TogglePreview(string elementId)
        {
            await jsRuntime.InvokeVoidAsync("togglePreview", elementId);
        }

        /// <summary>
        /// Enables or disables the preview
        /// </summary>
        /// <param name="elementId">The element identifier.</param>
        /// <param name="wantedState">If true preview will be enabled</param>
        /// <returns></returns>
        public async ValueTask SetPreview(string elementId, bool wantedState)
        {
            await jsRuntime.InvokeVoidAsync("setPreview", elementId, wantedState);
        }
    }
}