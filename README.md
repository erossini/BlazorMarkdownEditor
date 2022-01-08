# Blazor Markdown Editor
This is a Markdown Editor component for [Blazor WebAssembly](https://www.puresourcecode.com/tag/blazor-webassembly/) and [Blazor Server](https://www.puresourcecode.com/tag/blazor-server/). The component is based on [EasyMDE](https://easy-markdown-editor.tk/) to create the editor and [Markdig](https://github.com/xoofx/markdig) for rendering the Markdown text in HTML.

## Usage

Add the Editor to your ```_Imports.razor```

```
@using PSC.Blazor.Components.MarkdownEditor 
@using PSC.Blazor.Components.MarkdownEditor.EventsArgs
```

Then, in your `index.html` or `host.html` add those lines:

```
<link href="/_content/PSC.Blazor.Components.MarkdownEditor/css/easymde.min.css" rel="stylesheet" />

<script src="/_content/PSC.Blazor.Components.MarkdownEditor/js/easymde.min.js"></script>
<script src="/_content/PSC.Blazor.Components.MarkdownEditor/js/markdownEditor.js"></script>
```

`jQuery` is required. The component cointains the [EasyMDE](https://easy-markdown-editor.tk/) script version 2.15.0. Obviously, you can add this script in your project but if you use the script in the component, you are sure it works fine and all functionalities are tested.

### Add MarkdownEditor in a page

In a `Razor` page, we can add the component with this lines

```
<MarkdownEditor Value="@markdownValue" ValueChanged="@OnMarkdownValueChanged" />
```

The result is a nice Markdown Editor like in the following screenshot.

![markdown-editor-example](https://user-images.githubusercontent.com/9497415/148641050-653f6101-7099-4d76-9a59-45a44e32a275.gif)

## Limitation
In the current implementation, some Markdig extensions are not working. For example, adding a `mermaid` code, won't create a graph.

## Documentation
|Name|Description|Type|Default|
|--- |--- |--- |--- |
|AutoDownloadFontAwesome|If set to true, force downloads Font Awesome (used for icons). If set to false, prevents downloading.|bool?|null|
|CustomButtonClicked|Occurs after the custom toolbar button is clicked.|EventCallback<MarkdownButtonEventArgs>||
|Direction|rtl or ltr. Changes text direction to support right-to-left languages. Defaults to ltr.|string|ltr|
|ErrorCallback|A callback function used to define how to display an error message. Defaults to (errorMessage) => alert(errorMessage).|Func<string, Task>||
|ErrorMessages|Errors displayed to the user, using the errorCallback option, where #image_name#, #image_size# and #image_max_size# will replaced by their respective values, that can be used for customization or internationalization.|MarkdownErrorMessages||
|HideIcons|An array of icon names to hide. Can be used to hide specific icons shown by default without completely customizing the toolbar.|string[]|'side-by-side', 'fullscreen'|
|ImageAccept|A comma-separated list of mime-types used to check image type before upload (note: never trust client, always check file types at server-side). Defaults to image/png, image/jpeg.|string|image/png, image/jpeg|
|ImageCSRFToken|CSRF token to include with AJAX call to upload image. For instance used with Django backend.|string||
|ImageMaxSize|Maximum image size in bytes, checked before upload (note: never trust client, always check image size at server-side). Defaults to 1024 * 1024 * 2 (2Mb).|long|1024 * 1024 * 2 (2Mb)|
|ImagePathAbsolute|If set to true, will treat imageUrl from imageUploadFunction and filePath returned from imageUploadEndpoint as an absolute rather than relative path, i.e. not prepend window.location.origin to it.|string||
|ImageTexts|Texts displayed to the user (mainly on the status bar) for the import image feature, where #image_name#, #image_size# and #image_max_size# will replaced by their respective values, that can be used for customization or internationalization.|MarkdownImageTexts|null|
|ImageUploadChanged|Occurs every time the selected image has changed.|Func<FileChangedEventArgs, Task>||
|ImageUploadEnded|Occurs when an individual image upload has ended.|Func<FileEndedEventArgs, Task>||
|ImageUploadEndpoint|The endpoint where the images data will be sent, via an asynchronous POST request. The server is supposed to save this image, and return a json response.|string||
|ImageUploadProgressed|Notifies the progress of image being written to the destination stream.|Func<FileProgressedEventArgs, Task>||
|ImageUploadStarted|Occurs when an individual image upload has started.|Func<FileStartedEventArgs, Task>||
|ImageUploadWritten|Occurs every time the part of image has being written to the destination stream.|Func<FileWrittenEventArgs, Task>||
|LineNumbers|If set to true, enables line numbers in the editor.|bool|false|
|LineWrapping|If set to false, disable line wrapping. Defaults to true.|bool|false|
|MaxHeight|Sets fixed height for the composition area. minHeight option will be ignored. Should be a string containing a valid CSS value like "500px". Defaults to undefined.|string||
|MaxUploadImageMessageSize|Gets or sets the max message size when uploading the file.|long|20 * 1024|
|MinHeight|Sets the minimum height for the composition area, before it starts auto-growing. Should be a string containing a valid CSS value like "500px". Defaults to "300px".|string|300px|
|Placeholder|If set, displays a custom placeholder message.|string|null|
|SegmentFetchTimeout|Gets or sets the Segment Fetch Timeout when uploading the file.|TimeSpan|1 min|
|ShowIcons|An array of icon names to show. Can be used to show specific icons hidden by default without completely customizing the toolbar.|string[]|'code', 'table'|
|TabSize|If set, customize the tab size. Defaults to 2.|int|2|
|Theme|Override the theme. Defaults to easymde.|string|easymde|
|Toolbar|[Optional] Gets or sets the content of the toolbar.|RenderFragment||
|ToolbarTips|If set to false, disable toolbar button tips. Defaults to true.|bool|true|
|UploadImage|If set to true, enables the image upload functionality, which can be triggered by drag-drop, copy-paste and through the browse-file window (opened when the user click on the upload-image icon). Defaults to false.|bool|false|
|Value|Gets or sets the markdown value.|string|null|
|ValueHTML|Gets the HTML from the markdown value.|string|null|
|ValueChanged|An event that occurs after the markdown value has changed.|EventCallback<string>||
|ValueHTMLChanged|An event that occurs after the markdown value has changed and the new HTML code is available.|EventCallback<string>||

## Other Blazor components
- [DataTable for Blazor](https://www.puresourcecode.com/dotnet/net-core/datatable-component-for-blazor/): DataTable component for Blazor WebAssembly and Blazor Server
- [Markdown editor for Blazor](https://www.puresourcecode.com/dotnet/blazor/markdown-editor-with-blazor/): This is a Markdown Editor for use in Blazor. It contains a live preview as well as an embeded help guide for users.
- [Modal dialog for Blazor](https://www.puresourcecode.com/dotnet/blazor/modal-dialog-component-for-blazor/): Simple Modal Dialog for Blazor WebAssembly
- [PSC.Extensions](https://www.puresourcecode.com/dotnet/net-core/a-lot-of-functions-for-net5/): A lot of functions for .NET6 in a NuGet package that you can download for free. We collected in this package functions for everyday work to help you with claim, strings, enums, date and time, expressions…
- [Quill for Blazor](https://www.puresourcecode.com/dotnet/blazor/create-a-blazor-component-for-quill/): Quill Component is a custom reusable control that allows us to easily consume Quill and place multiple instances of it on a single page in our Blazor application
- [Segment for Blazor](https://www.puresourcecode.com/dotnet/blazor/segment-control-for-blazor/): This is a Segment component for Blazor Web Assembly and Blazor Server
- [Tabs for Blazor](https://www.puresourcecode.com/dotnet/blazor/tabs-control-for-blazor/): This is a Tabs component for Blazor Web Assembly and Blazor Server

## More examples and documentation
*   [Write a reusable Blazor component](https://www.puresourcecode.com/dotnet/blazor/write-a-reusable-blazor-component/)
*   [Getting Started With C# And Blazor](https://www.puresourcecode.com/dotnet/net-core/getting-started-with-c-and-blazor/)
*   [Setting Up A Blazor WebAssembly Application](https://www.puresourcecode.com/dotnet/blazor/setting-up-a-blazor-webassembly-application/)
*   [Working With Blazor Component Model](https://www.puresourcecode.com/dotnet/blazor/working-with-blazors-component-model/)
*   [Secure Blazor WebAssembly With IdentityServer4](https://www.puresourcecode.com/dotnet/blazor/secure-blazor-webassembly-with-identityserver4/)
*   [Blazor Using HttpClient With Authentication](https://www.puresourcecode.com/dotnet/blazor/blazor-using-httpclient-with-authentication/)
*   [InputSelect component for enumerations in Blazor](https://www.puresourcecode.com/dotnet/blazor/inputselect-component-for-enumerations-in-blazor/)
*   [Use LocalStorage with Blazor WebAssembly](https://www.puresourcecode.com/dotnet/blazor/use-localstorage-with-blazor-webassembly/)
*   [Modal Dialog component for Blazor](https://www.puresourcecode.com/dotnet/blazor/modal-dialog-component-for-blazor/)
*   [Create Tooltip component for Blazor](https://www.puresourcecode.com/dotnet/blazor/create-tooltip-component-for-blazor/)
*   [Consume ASP.NET Core Razor components from Razor class libraries | Microsoft Docs](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/class-libraries?view=aspnetcore-5.0&tabs=visual-studio)

