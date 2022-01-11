namespace PSC.Blazor.Components.MarkdownEditor
{
    /// <summary>
    /// JSMarkdownInterop class
    /// </summary>
    public class JSMarkdownInterop
    {
        /// <summary>
        /// The js runtime
        /// </summary>
        IJSRuntime jsRuntime;

        /// <summary>
        /// Initializes a new instance of the <see cref="JSMarkdownInterop"/> class.
        /// </summary>
        /// <param name="JSRuntime">The js runtime.</param>
        public JSMarkdownInterop(IJSRuntime JSRuntime)
        {
            this.jsRuntime = JSRuntime;
        }

        /// <summary>
        /// Initializes the specified dot net object reference.
        /// </summary>
        /// <param name="dotNetObjectRef">The dotnet object reference.</param>
        /// <param name="elementRef">The element reference.</param>
        /// <param name="elementId">The element identifier.</param>
        /// <param name="options">The options.</param>
        /// <returns></returns>
        public async ValueTask Initialize(DotNetObjectReference<MarkdownEditor> dotNetObjectRef, ElementReference elementRef,
            string elementId, object options)
        {
            await jsRuntime.InvokeVoidAsync("initialize", dotNetObjectRef, elementRef, elementId, options);
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
        /// Sets the value.
        /// </summary>
        /// <param name="elementId">The element identifier.</param>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public async ValueTask SetValue(string elementId, string value)
        {
            await jsRuntime.InvokeVoidAsync("setValue", elementId, value);
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
        /// Notifies the image upload error.
        /// </summary>
        /// <param name="elementId">The element identifier.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public async ValueTask NotifyImageUploadError(string elementId, string errorMessage)
        {
            await jsRuntime.InvokeVoidAsync("notifyImageUploadError", elementId, errorMessage);
        }
    }
}