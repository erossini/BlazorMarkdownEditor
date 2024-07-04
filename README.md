# Blazor Markdown Editor
This is a Markdown Editor component for [Blazor WebAssembly](https://www.puresourcecode.com/tag/blazor-webassembly/) and [Blazor Server](https://www.puresourcecode.com/tag/blazor-server/) with .NET8. The component is based on [EasyMDE](https://github.com/erossini/EasyMarkdownEditor) version _1.0.x_ to create the editor. 
I decided to create my repository for the JavaScript library because I wanted to have control over the updates and the changes. The component is a wrapper around the JavaScript library and it is a Blazor component that allows you to use the Markdown Editor in your Blazor application.

For more documentation and help this component, visit the post I created [here](https://www.puresourcecode.com/dotnet/blazor/markdown-editor-component-for-blazor/).

![markdown-editor-blazor-logo](https://user-images.githubusercontent.com/9497415/149015375-005eded7-4b4e-4644-b08b-8db24511f0db.jpg)

[Try Markdown Editor online](http://markdown.puresourcecode.com/) (upload is not enabled)

## Usage

Add the Editor to your ```_Imports.razor```

```
@using PSC.Blazor.Components.MarkdownEditor 
@using PSC.Blazor.Components.MarkdownEditor.EventsArgs
```

Then, in your `index.html`, `host.html` or `App.razor` add those lines:

```
<link href="/_content/PSC.Blazor.Components.MarkdownEditor/css/markdowneditor.css" rel="stylesheet" />
<link href="/_content/PSC.Blazor.Components.MarkdownEditor/css/easymde.min.css" rel="stylesheet" />

<script src="/_content/PSC.Blazor.Components.MarkdownEditor/js/easymde.min.js"></script>
<script src="/_content/PSC.Blazor.Components.MarkdownEditor/js/markdownEditor.js"></script>
```

Remember that `jQuery` is also required. The component contains the [Easy Markdown Editor](https://github.com/erossini/EasyMarkdownEditor) script version 1.0.x that is also maintain by myself. 
You can add this script in your project but if you use the script in the component, you are sure it works fine and all functionalities are tested.

The CSS `markdowneditor.css` contains the style for same of the new tags I added in the Markdown Editor such as `att`, `note`, `tip`, `warn` and `video`.

### Add MarkdownEditor in a page

In a `Razor` page, we can add the component with these lines

```
<div class="col-md-12">
    <MarkdownEditor @bind-Value="@markdownValue" 
                    ValueHTMLChanged="@OnMarkdownValueHTMLChanged" />

    <hr />

    <h3>Result</h3>
    @((MarkupString)markdownHtml)
</div>

@code {
    string markdownValue = "#Markdown Editor\nThis is a test";
    string markdownHtml;

    Task OnMarkdownValueChanged(string value)
    {
        return Task.CompletedTask;
    }

    Task OnMarkdownValueHTMLChanged(string value)
    {
        markdownHtml = value;
        return Task.CompletedTask;
    }
}
```

The main different between `value` and `ValueHTMLChanged` is that `Value` return the text written in the editor as a string whereas `ValueHTMLChanged` returns the rendered HTML code for the text. 
The `ValueHTMLChanged` includes the code for displaying mermaid graphs in a `SVG` tag.

The result is a nice Markdown Editor like in the following screenshot. This is a screenshot from the demo in this repository.

![markdown-editor-example](https://user-images.githubusercontent.com/9497415/148641050-653f6101-7099-4d76-9a59-45a44e32a275.gif)

### Add a custom toolbar

In your Markdown Editor add the following code

```
<MarkdownEditor @bind-Value="@markdownValue"
                ValueHTMLChanged="@OnMarkdownValueHTMLChanged"
                SpellChecker="false"
                CustomButtonClicked="@OnCustomButtonClicked">
    <Toolbar>
        <MarkdownToolbarButton Action="MarkdownAction.Bold" Icon="fa fa-bolt" Title="Bold" />
        <MarkdownToolbarButton Separator Name="Custom button" 
                               Value="@("Hello from your custom Toolbar Button")" 
                               Icon="fa fa-star" 
                               Title="A Custom Button" />
        <MarkdownToolbarButton Separator Name="https://github.com/erossini/BlazorMarkdownEditor" 
                               Icon="fa fab fa-github" Title="A Custom Link" />
    </Toolbar>
</MarkdownEditor>

@code {
    // omitted code...

    Task OnCustomButtonClicked(MarkdownButtonEventArgs eventArgs)
    {
        Console.WriteLine("OnCustomButtonClicked -> " + eventArgs.Value);
        buttonText += "OnCustomButtonClicked -> " + eventArgs.Value + "<br />";

        return Task.CompletedTask;
    }
}
```

In the tag `MarkdownEditor`, you add the new tab `Toolbar` that contains one or more `MarkdownToolbarButton`. 

Each `MarkdownToolbarButton` can have one of the default `Action` (see table below) or a custom value for example a link to a website. 
If you want to display before a `MarkdownToolbarButton` a vertical line, add the property `Separator` in the `MarkdownToolbarButton`.

### Change the content after the first init

In same cases, you want to refresh the content of the Markdown Editor after the first init, for example because your application has to read the value from an API and it takes time.
For that, you have to add a `ref` to the `MarkdownEditor` and then use it to call `SetValueAsync` property, as in the following code

```
<MarkdownEditor @bind-Value="@markdownValue"
                ValueHTMLChanged="@OnMarkdownValueHTMLChanged"
                SpellChecker="false" @ref="Markdown1" />

@code {
    MarkdownEditor Markdown1;

    // omitted code...

    async Task ChangeText()
    {
        markdownValue = "Test!";
        await Markdown1.SetValueAsync(markdownValue);
    }
}
```

## Add Mermaid render

In order to add more functionaties to the component, it includes the version of [mermaid.js](https://mermaid.js.org/) 10.2.1 that allows to add impressive diagrams and chart in the Markdown component like
- Flowchart
- Sequence Diagram
- Class Diagram
- State Diagram
- Entity Relationship Diagram
- User Journey
- Gantt
- Pie Chart
- Quadrant Chart
- Requirement Diagram
- Gitgraph (Git) Diagram
- C4C Diagram (Context) Diagram
- Mindmaps
- Timeline

To add this functionality to the Markdown Editor, it is enough to add in the `index.html` this script

```javascript
<script src="/_content/PSC.Blazor.Components.MarkdownEditor/js/mermaid.min.js"></script>
```

The script will check if this library is called. If it is added to the page, the Markdown Editor automatically will add a button in the toolbar to insert the tag for mermaid. That tag is

```
    ```mermaid
    ```
```

### Warning

Using this script in the component 

```
<script src="/_content/PSC.Blazor.Components.MarkdownEditor/js/easymde.min.js"></script>
```

or the cdn

```
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
```

the mermaid render will not work. The error is 

> e.replace is not a function

So, I recommend to upgrade the script with the new one as I describe in the following paragraph.

#### Upgrade to version 10.9.1 or above

Using the new version of Mermaid from the 10.9.1 requires adding this code in the `index.html`, `host.html` or `App.razor`

```
<script type="module">
    import mermaid 
        from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
</script>
```

At the moment, I'm trying to find a way to include this script in the `markdownEditor.js` but I'm not sure it will work.

### Examples of mermaid graphs

```javascript

### An example of the mermaid graphs
A **Sequence diagram** is an interaction diagram that shows how processes operate with one another and in what order.

```
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!
```

![Sequence diagram](https://github.com/erossini/BlazorMarkdownEditor/assets/9497415/10073d80-b23c-42e6-b422-3f23161baf83)

A **Gantt chart** is useful for tracking the amount of time it would take before a project is finished, but it can also be used to graphically represent "non-working days", with a few tweaks.

```
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
```

![Gantt chart](https://github.com/erossini/BlazorMarkdownEditor/assets/9497415/b5e90134-c385-4f6f-9d86-c28bdd743ca9)

An **entity–relationship model** (or ER model) describes interrelated things of interest in a specific domain of knowledge. A basic ER model is composed of entity types (which classify the things of interest) and specifies relationships that can exist between entities (instances of those entity types).

```
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

![entity–relationship model](https://github.com/erossini/BlazorMarkdownEditor/assets/9497415/1834c522-57db-41a7-a8ae-65f4438e1bff)


## Add Highlight.js

This script is not included in the component but the component can detect if _Highlight.js_ is loaded. In this case, the Markdown Editor renders also the code in one of the supported languages.

To enable this function, add the script in your project and then in the `index.html` add the following lines

```
<link rel="stylesheet" href="/path/to/styles/default.min.css">
<script src="/path/to/highlight.min.js"></script>
```

### Known issue using mermaid and Highlight.js

If both libraries are loaded in the _index.html_, the mermaid render will not work. 

## Alerts

In the Markdown, there are some missing tags to display some useful information on the page like a highlight note, a tip, a warning or an attention message. So, I added them in this Markdown Editor. An example of the result of this implementation is in the following screenshot.

![Alerts](https://github.com/erossini/BlazorMarkdownEditor/assets/9497415/46b0ba60-235e-45e6-831b-b5f3dbad2ba4)

To add the message, click on the icons in the toolbar in the editor or add those commands:

| Command | Color  | Description                   |
|---------|--------|-------------------------------|
| ```att  | Red    | Display an attention message  |
| ```note | Azure  | Add a note in the document    |
| ```tip  | Green  | Shows a tip message           |
| ```warn | Orange | This is a warning message     |

In the Markdown Editor component, there is a `CSS` for the them called `alert.css` and you can add it to the `index.html` with this line if you haven't add the `markdowneditor.css`

```
<link href="/_content/PSC.Blazor.Components.MarkdownEditor/css/alert.css" rel="stylesheet" />
```

## Clean saved documentation

By default, the Markdown Editor saves the text in the browser local storage. 

The `AutoSaveEnabled` is `True` and the `AutoSaveSubmitDelay` is set up to `5000` milliseconds. This means that the text is saved every 5 seconds.

If you want to clean the saved text, you can use the following code

```
<MarkdownEditor @bind-Value="@markdownValue" MaxHeight="300px"
                ValueHTMLChanged="@OnMarkdownValueHTMLChanged"
                SpellChecker="false" @ref="Markdown1" 
                AutoSaveEnabled="true" />

@code {
    MarkdownEditor Markdown1;

    async Task DeleteStorage()
    {
        await Markdown1.CleanAutoSave();
    }
}
```

## Video

In the Markdown Editor, you can add a video in the text. The video can be from YouTube, Vimeo or any other video provider. 
The video is displayed in the editor and in the rendered HTML code.

```
    ```video
	https://www.youtube.com/shorts/JY1zFZgX6zM
    ```
```

## Documentation
The Markdown Editor for Blazor has a estensive collection of properties to map all the functionalities in the JavaScript version. In this repository, there are 2 projects:
- **MarkdownEditorDemo** is a Blazor Web Assembly project that contains 2 pages: `Index.razor` where I show how to use the component with the basic functions and `Upload.razor` that shows how to cope with the image upload. To test the upload, the project `MarkdownEditorDemo.Api` must run
- **MarkdownEditorDemo.Api** this is an ASP.NET Core WebApi (.NET6) how to implement a proper API for uploading images. For more details, I wrote a post about [Uploading image with .NET](https://www.puresourcecode.com/dotnet/net6/upload-download-files-using-httpclient/).

### Properties
|Name|Description|Type|Default|
|--- |--- |--- |--- |
|AutoSaveEnabled|Gets or sets the setting for the auto save. Saves the text that's being written and will load it back in the future. It will forget the text when the form it's contained in is submitted. Recommended to choose a unique ID for the Markdown Editor.|bool|false|
|AutoSaveId|Gets or sets the automatic save identifier. You must set a unique string identifier so that the component can autosave. Something that separates this from other instances of the component elsewhere on your website.|string|Default value|
|AutoSaveDelay|Delay between saves, in milliseconds. Defaults to 10000 (10s).|int|10000 (10s)|
|AutoSaveSubmitDelay|Delay before assuming that submit of the form failed and saving the text, in milliseconds.|int|5000 (5s)|
|AutoSaveText|Text for autosave|string|Autosaved:|
|AutoSaveTimeFormatLocale|Set the format for the datetime to display. For more info, see the JavaScript documentation [DateTimeFormat instances](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)|string|en-US|
|AutoSaveTimeFormatYear|Set the format for the year|string|numeric|
|AutoSaveTimeFormatMonth|Set the format for the month|string|long|
|AutoSaveTimeFormatDay|Set the format for the day|string|2-digit|
|AutoSaveTimeFormatHour|Set the format for the hour|string|2-digit|
|AutoSaveTimeFormatMinute|Set the format for the minute|string|2-digit|
|AutoDownloadFontAwesome|If set to true, force downloads Font Awesome (used for icons). If set to false, prevents downloading.|bool?|null|
|CharactersStatusText|Set the words to display in the statusbar for the character's counting|string|`characters: `|
|CustomButtonClicked|Occurs after the custom toolbar button is clicked.|EventCallback<MarkdownButtonEventArgs>||
|Direction|rtl or ltr. Changes text direction to support right-to-left languages. Defaults to ltr.|string|ltr|
|ErrorMessages|Errors displayed to the user, using the errorCallback option, where _image_name_, _image_size_ and _image_max_size_ will be replaced by their respective values, that can be used for customization or internationalization.|MarkdownErrorMessages||
|HideIcons|An array of icon names to hide. Can be used to hide specific icons shown by default without completely customizing the toolbar.|string[]|'side-by-side', 'fullscreen'|
|ImageAccept|A comma-separated list of mime-types used to check image type before upload (note: never trust client, always check file types at server-side). Defaults to image/png, image/jpeg, image/jpg, image.gif.|string|image/png, image/jpeg, image/jpg, image.gif|
|ImageCSRFToken|CSRF token to include with AJAX call to upload image. For instance, used with Django backend.|string||
|ImageMaxSize|Maximum image size in bytes, checked before upload (note: never trust client, always check image size at server-side). Defaults to 1024 * 1024 * 2 (2Mb).|long|1024 * 1024 * 2 (2Mb)|
|ImagePathAbsolute|If set to true, will treat _imageUrl_ from _imageUploadFunction_ and _filePath_ returned from _imageUploadEndpoint_ as an absolute rather than relative path, i.e. not prepend window.location.origin to it.|string||
|ImageTexts|Texts displayed to the user (mainly on the status bar) for the import image feature, where _image_name_, _image_size_ and _image_max_size_ will be replaced by their respective values, that can be used for customization or internationalization.|MarkdownImageTexts|null|
|ImageUploadAuthenticationSchema|If an authentication for the API is required, assign to this property the schema to use. `Bearer` is the common one.|string|empty|
|ImageUploadAuthenticationToken|If an authentication for the API is required, assign to this property the token|string|empty|
|LineNumbers|If set to true, enables line numbers in the editor.|bool|false|
|LinesStatusText|Set the words to display in the statusbar for the line's counting|string|`lines: `|
|LineWrapping|If set to false, disable line wrapping. Defaults to true.|bool|false|
|MarkdownUrl|Set the URL for the Markdown guide.|[Link to Markdown Guide](https://www.markdownguide.org/basic-syntax/)||
|MaxHeight|Sets fixed height for the composition area. minHeight option will be ignored. Should be a string containing a valid CSS value like "500px". Defaults to undefined.|string||
|MaxUploadImageMessageSize|Gets or sets the max message size when uploading the file.|long|20 * 1024|
|MinHeight|Sets the minimum height for the composition area, before it starts auto-growing. Should be a string containing a valid CSS value like "500px". Defaults to "300px".|string|300px|
|NativeSpellChecker|Enable (true) or disable (false) the spell check in the editor|bool|True|
|Placeholder|If set, displays a custom placeholder message.|string|null|
|SegmentFetchTimeout|Gets or sets the Segment Fetch Timeout when uploading the file.|TimeSpan|1 min|
|ShowIcons|An array of icon names to show. Can be used to show specific icons hidden by default without completely customizing the toolbar.|string[]|'code', 'table'|
|SpellChecker|Enable (true) or disable (false) the spell check in the editor|bool|True|
|TabSize|If set, customize the tab size. Defaults to 2.|int|2|
|Theme|Override the theme. Defaults to easymde.|string|easymde|
|Toolbar|[Optional] Gets or sets the content of the toolbar.|RenderFragment||
|ToolbarTips|If set to false, disable toolbar button tips. Defaults to true.|bool|true|
|UploadImage|If set to true, enables the image upload functionality, which can be triggered by drag-drop, copy-paste and through the browse-file window (opened when the user clicks on the upload-image icon). Defaults to false.|bool|false|
|Value|Gets or sets the markdown value.|string|null|
|ValueHTML|Gets the HTML from the markdown value.|string|null|
|WordsStatusText|Set the words to display in the statusbar for the word's counting|string|`words: `|

### Events
|Name|Description|Type|
|--- |--- |--- |
|ErrorCallback|A callback function used to define how to display an error message. Defaults to (errorMessage) => alert(errorMessage).|Func<string, Task>|
|ImageUploadChanged|Occurs every time the selected image has changed.|Func<FileChangedEventArgs, Task>|
|ImageUploadEnded|Occurs when an individual image upload has ended.|Func<FileEndedEventArgs, Task>|
|ImageUploadEndpoint|The endpoint where the images data will be sent, via an asynchronous POST request. The server is supposed to save this image, and return a json response.|string|
|ImageUploadProgressed|Notifies the progress of image being written to the destination stream.|Func<FileProgressedEventArgs, Task>|
|ImageUploadStarted|Occurs when an individual image upload has started.|Func<FileStartedEventArgs, Task>|
|ValueChanged|An event that occurs after the markdown value has changed.|EventCallback<string>|
|ValueHTMLChanged|An event that occurs after the markdown value has changed and the new HTML code is available.|EventCallback<string>|

## Upload file
The Markdown Editor for Blazor can take care of uploading a file and add the relative Markdown code in the editor. For that, the property `UploadImage` has to set to `true`. Also, the upload API must be specified in the property `ImageUploadEndpoint`.
In some cases, the API requires an authentication. The properties `ImageUploadAuthenticationSchema` and `ImageUploadAuthenticationToken` allow you to pass the correct schema and token to use in the call.

Those values will be added to the `HttpClient` `POST` request in the header. Only if both properties are not null, they will be added to the header.

![markdown-editor-upload-image](https://user-images.githubusercontent.com/9497415/148955032-1d3dc558-f308-4134-b3fd-6d43a0e4e37a.gif)

If you want to understand better how to create the API for the upload, I have created a specific [post](https://www.puresourcecode.com/dotnet/net6/upload-download-files-using-httpclient/) on [PureSourceCode](https://www.puresourcecode.com/).

## Toolbar icons

Below are the built-in toolbar icons (only some of which are enabled by default), which can be reorganized however you like. "Name" is the name of the icon, referenced in the JS. "Action" is either a function or a URL to open. "Class" is the class given to the icon. "Tooltip" is the small tooltip that appears via the `title=""` attribute. Note that shortcut hints are added automatically and reflect the specified action if it has a key bind assigned to it (i.e. with the value of `action` set to `bold` and that of `tooltip` set to `Bold`, the final text the user will see would be "Bold (Ctrl-B)").

Additionally, you can add a separator between any icons by adding `"|"` to the toolbar array.

Name | Action | Tooltip<br>Class
:--- | :----- | :--------------
bold | toggleBold | Bold<br>fa fa-bold
italic | toggleItalic | Italic<br>fa fa-italic
strikethrough | toggleStrikethrough | Strikethrough<br>fa fa-strikethrough
heading | toggleHeadingSmaller | Heading<br>fa fa-header
heading-smaller | toggleHeadingSmaller | Smaller Heading<br>fa fa-header
heading-bigger | toggleHeadingBigger | Bigger Heading<br>fa fa-lg fa-header
heading-1 | toggleHeading1 | Big Heading<br>fa fa-header header-1
heading-2 | toggleHeading2 | Medium Heading<br>fa fa-header header-2
heading-3 | toggleHeading3 | Small Heading<br>fa fa-header header-3
code | toggleCodeBlock | Code<br>fa fa-code
quote | toggleBlockquote | Quote<br>fa fa-quote-left
unordered-list | toggleUnorderedList | Generic List<br>fa fa-list-ul
ordered-list | toggleOrderedList | Numbered List<br>fa fa-list-ol
clean-block | cleanBlock | Clean block<br>fa fa-eraser
link | drawLink | Create Link<br>fa fa-link
image | drawImage | Insert Image<br>fa fa-picture-o
table | drawTable | Insert Table<br>fa fa-table
horizontal-rule | drawHorizontalRule | Insert Horizontal Line<br>fa fa-minus
preview | togglePreview | Toggle Preview<br>fa fa-eye no-disable
side-by-side | toggleSideBySide | Toggle Side by Side<br>fa fa-columns no-disable no-mobile
fullscreen | toggleFullScreen | Toggle Fullscreen<br>fa fa-arrows-alt no-disable no-mobile
guide | [This link](https://www.markdownguide.org/basic-syntax/) | Markdown Guide<br>fa fa-question-circle

## Keyboard shortcuts

EasyMDE comes with an array of predefined keyboard shortcuts, but they can be altered with a configuration option. The list of default ones is as follows:

Shortcut (Windows / Linux) | Shortcut (macOS) | Action
:--- | :--- | :---
*Ctrl-'* | *Cmd-'* | "toggleBlockquote"
*Ctrl-B* | *Cmd-B* | "toggleBold"
*Ctrl-E* | *Cmd-E* | "cleanBlock"
*Ctrl-H* | *Cmd-H* | "toggleHeadingSmaller"
*Ctrl-I* | *Cmd-I* | "toggleItalic"
*Ctrl-K* | *Cmd-K* | "drawLink"
*Ctrl-L* | *Cmd-L* | "toggleUnorderedList"
*Ctrl-P* | *Cmd-P* | "togglePreview"
*Ctrl-Alt-C* | *Cmd-Alt-C* | "toggleCodeBlock"
*Ctrl-Alt-I* | *Cmd-Alt-I* | "drawImage"
*Ctrl-Alt-L* | *Cmd-Alt-L* | "toggleOrderedList"
*Shift-Ctrl-H* | *Shift-Cmd-H* | "toggleHeadingBigger"
*F9* | *F9* | "toggleSideBySide"
*F11* | *F11* | "toggleFullScreen"

---

## Licence and contribution
A lot of people sent me the same question. My components ([MarkdownEditor](https://www.puresourcecode.com/dotnet/blazor/markdown-editor-component-for-blazor), [DataTable](https://www.puresourcecode.com/dotnet/net-core/datatable-component-for-blazor), [SVG Icon](https://www.puresourcecode.com/dotnet/blazor/svg-icons-and-flags-for-blazor) and others that you find on my [GitHub](https://github.com/erossini)) are freeware. 

I ask you to contribute to the project in one of the following ways:

- sending your feedback
- highlight bugs
- ask for improvement
- submit code and fixes
- share the project
- share my website [PureSourceCode.com](https://www.puresourcecode.com/)

If you don't know how to do it or you:

- want to support this project
- find very useful this project and it saves you a lot of time and work
- like to sustain my work
- want to pay my a beer
- are using this component for commercial purpose and you want to set your conscience at rest and/or put a hand on one's heart 😂

then, you can buy one of the support licence I created. There are different prices. The amount is your decision. You find have a full list on [PureSourceCode Shop](https://www.puresourcecode.com/shop)

The contribution gives you:

- dedicate email support
- priority access to the support
- fast bug fix
- receive preview and beta of the components
- help to fix your code with [Visual Studio Live Share](https://www.puresourcecode.com/tools/a-guide-to-remote-development-with-visual-studio-live-share/)
    
---
    
## Other Blazor components

| Component name | Forum | Description |
|---|---|---|
| [DataTable for Blazor](https://www.puresourcecode.com/dotnet/net-core/datatable-component-for-blazor/) | [Forum](https://www.puresourcecode.com/forum/forum/datatables/) | DataTable component for Blazor WebAssembly and Blazor Server |
| [Markdown editor for Blazor](https://www.puresourcecode.com/dotnet/blazor/markdown-editor-with-blazor/) | [Forum](https://www.puresourcecode.com/forum/forum/markdown-editor-for-blazor/) |  This is a Markdown Editor for use in Blazor. It contains a live preview as well as an embeded help guide for users. |
| [Browser Detect for Blazor](https://www.puresourcecode.com/dotnet/blazor/browser-detect-component-for-blazor/) | [Forum](https://www.puresourcecode.com/forum/browser-detect-for-blazor/) | Browser detect for Blazor WebAssembly and Blazor Server |
| [CodeSnipper for Blazor](https://www.puresourcecode.com/dotnet/blazor/code-snippet-component-for-blazor/) | [Forum](https://www.puresourcecode.com/forum/codesnippet-for-blazor/) | Add code snippet in your Blazor pages for 196 programming languages with 243 styles |
| [Copy To Clipboard](https://www.puresourcecode.com/dotnet/blazor/copy-to-clipboard-component-for-blazor/) | [Forum](https://www.puresourcecode.com/forum/copytoclipboard/) | Add a button to copy text in the clipbord | 
| SVG Icons and flags for Blazor | [Forum](https://www.puresourcecode.com/forum/icons-and-flags-for-blazor/) | Library with a lot of SVG icons and SVG flags to use in your Razor pages |
| [Modal dialog for Blazor](https://www.puresourcecode.com/dotnet/blazor/modal-dialog-component-for-blazor/) | [Forum](https://www.puresourcecode.com/forum/forum/modal-dialog-for-blazor/) |  Simple Modal Dialog for Blazor WebAssembly |
| [PSC.Extensions](https://www.puresourcecode.com/dotnet/net-core/a-lot-of-functions-for-net5/) | [Forum](https://www.puresourcecode.com/forum/forum/psc-extensions/) |  A lot of functions for .NET5 in a NuGet package that you can download for free. We collected in this package functions for everyday work to help you with claim, strings, enums, date and time, expressions... |
| [Quill for Blazor](https://www.puresourcecode.com/dotnet/blazor/create-a-blazor-component-for-quill/) | [Forum](https://www.puresourcecode.com/forum/forum/quill-for-blazor/) |  Quill Component is a custom reusable control that allows us to easily consume Quill and place multiple instances of it on a single page in our Blazor application |
| [Segment for Blazor](https://www.puresourcecode.com/dotnet/blazor/segment-control-for-blazor/) | [Forum](https://www.puresourcecode.com/forum/forum/segments-for-blazor/) |  This is a Segment component for Blazor Web Assembly and Blazor Server |
| [Tabs for Blazor](https://www.puresourcecode.com/dotnet/blazor/tabs-control-for-blazor/) | [Forum](https://www.puresourcecode.com/forum/forum/tabs-for-blazor/) |  This is a Tabs component for Blazor Web Assembly and Blazor Server |
| [WorldMap for Blazor]() | [Forum](https://www.puresourcecode.com/forum/worldmap-for-blazor/) | Show world maps with your data |

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
