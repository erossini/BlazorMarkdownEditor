# Blazor Markdown Editor
This is a Markdown Editor for use in Blazor. It contains a live preview as well as an embeded help guide for users.

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

The component cointains the [EasyMDE](https://easy-markdown-editor.tk/) script version 2.15.0. Obviously, you can add this script in your project but if you use the script in the component, you are sure it works fine and all functionalities are tested.

### Add MarkdownEditor in a page

In a `Razor` page, we can add the component with this lines

```
<MarkdownEditor Value="@markdownValue" ValueChanged="@OnMarkdownValueChanged" />
```

The result is a nice Markdown Editor like in the following screenshot.

![markdown-editor-example](https://user-images.githubusercontent.com/9497415/148641050-653f6101-7099-4d76-9a59-45a44e32a275.gif)

## Other Blazor components
- [DataTable for Blazor](https://www.puresourcecode.com/dotnet/net-core/datatable-component-for-blazor/): DataTable component for Blazor WebAssembly and Blazor Server
- [Markdown editor for Blazor](https://www.puresourcecode.com/dotnet/blazor/markdown-editor-with-blazor/): This is a Markdown Editor for use in Blazor. It contains a live preview as well as an embeded help guide for users.
- [Modal dialog for Blazor](https://www.puresourcecode.com/dotnet/blazor/modal-dialog-component-for-blazor/): Simple Modal Dialog for Blazor WebAssembly
- [PSC.Extensions](https://www.puresourcecode.com/dotnet/net-core/a-lot-of-functions-for-net5/): A lot of functions for .NET5 in a NuGet package that you can download for free. We collected in this package functions for everyday work to help you with claim, strings, enums, date and time, expressions…
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

