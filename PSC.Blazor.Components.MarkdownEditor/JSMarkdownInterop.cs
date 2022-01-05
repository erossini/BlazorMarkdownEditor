using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSC.Blazor.Components.MarkdownEditor
{
    public class JSMarkdownInterop
    {
        IJSRuntime jsRuntime;

        public JSMarkdownInterop(IJSRuntime JSRuntime)
        {
            this.jsRuntime = JSRuntime;
        }

        public async ValueTask Initialize(DotNetObjectReference<MarkdownEditor> dotNetObjectRef, ElementReference elementRef, 
            string elementId, object options)
        {
            await jsRuntime.InvokeVoidAsync("initialize", dotNetObjectRef, elementRef, elementId, options);
        }

        public async ValueTask Destroy(ElementReference elementRef, string elementId)
        {
            await jsRuntime.InvokeVoidAsync("destroy", elementRef, elementId);
        }

        public async ValueTask SetValue(string elementId, string value)
        {
            await jsRuntime.InvokeVoidAsync("setValue", elementId, value);
        }

        public async ValueTask<string> GetValue(string elementId)
        {
            return await jsRuntime.InvokeAsync<string>("getValue", elementId);
        }

        public async ValueTask NotifyImageUploadSuccess(string elementId, string imageUrl)
        {
            await jsRuntime.InvokeVoidAsync("notifyImageUploadSuccess", elementId, imageUrl);
        }

        public async ValueTask NotifyImageUploadError(string elementId, string errorMessage)
        {
            await jsRuntime.InvokeVoidAsync("notifyImageUploadError", elementId, errorMessage);
        }
    }
}
