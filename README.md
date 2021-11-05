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
