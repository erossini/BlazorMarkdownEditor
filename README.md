# Blazor Markdown Editor
This is a Markdown Editor for use in Blazor. It contains a live preview as well as an embeded help guide for users.

## Usage

Add the Editor to your ```_Imports.razor```

```
@using PSC.Blazor.Components.MarkdownEditor
```

Then, inside of an `EditForm` reference the editor component and bind it.

```
<EditForm OnValidSubmit="DoSave" Model="model">
    <MarkdownEditor @bind-Value="model.Comments"/>
</EditForm>
```

The editor binds the markdown text, not parsed HTML.

The toolbar is added by default.  You can disable this by passing `EnableToolbar="false"` into the component.

### Screenshot

**Write Markdown text**
![image](https://user-images.githubusercontent.com/9497415/140496482-719e6b90-dcee-4547-b6b1-e5a4c7836e77.png)

**Preview**
![image](https://user-images.githubusercontent.com/9497415/140496580-47569d20-ff3f-4f57-bd03-98e3ac0906ba.png)


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

