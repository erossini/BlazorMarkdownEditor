const _instances = [];

function initialize(dotNetObjectRef, element, elementId, options) {
    const instances = _instances;

    if (!options.toolbar) {
        // remove empty toolbar so that we can fallback to the default items
        delete options.toolbar;
    }
    else if (options.toolbar && options.toolbar.length > 0) {
        // map any named action with a real action from EasyMDE
        options.toolbar.forEach(button => {
            // make sure we don't operate on separators
            if (button !== "|") {
                if (button.action) {
                    if (!button.action.startsWith("http")) {
                        button.action = EasyMDE[button.action];
                    }
                }
                else {
                    if (button.name && button.name.startsWith("http")) {
                        button.action = button.name;
                    }
                    else {
                        // custom action is used so we need to trigger custom event on click
                        button.action = (editor) => {
                            dotNetObjectRef.invokeMethodAsync('NotifyCustomButtonClicked', button.name, button.value).then(null, function (err) {
                                throw new Error(err);
                            });
                        }
                    }
                }

                // button without icon is not allowed
                if (!button.className) {
                    button.className = "fa fa-question";
                }
            }
        });
    }

    let nextFileId = 0;
    let imageUploadNotifier = {
        onSuccess: (e) => { },
        onError: (e) => { }
    };

    var mermaidInstalled = false;
    var hljsInstalled = false;

    if (typeof hljs !== 'undefined')
        hljsInstalled = true;

    if (typeof mermaid !== 'undefined') {
        mermaidInstalled = true;
        if (options.toolbar == undefined) {
            options.toolbar = [
                "bold", "italic", "heading", "|",
                "undo", "redo", "|", "code",
                {
                    name: "addMermaid",
                    action: renderMermaid,
                    className: "fas fa-pie-chart",
                    title: "Add Mermaid",
                },
                "|",
                {
                    name: "addAttention",
                    action: renderAttention,
                    className: "fas fas fa-exclamation-circle",
                    title: "Add Attention",
                },
                {
                    name: "addNote",
                    action: renderNote,
                    className: "fas fa-info-circle",
                    title: "Add Note",
                },
                {
                    name: "addTip",
                    action: renderTip,
                    className: "fas fa-lightbulb",
                    title: "Add Tip",
                },
                {
                    name: "addWarning",
                    action: renderWarning,
                    className: "fas fa-exclamation-triangle",
                    title: "Add Warning",
                },
                {
                    name: "addVideo",
                    action: renderVideo,
                    className: "fa-solid fa-video",
                    title: "Add video",
                },
                "|", "video", "|", "quote", "unordered-list", "ordered-list", "|", 
                "link", "image", "table", "|", "fullscreen",
                "preview", "|", "guide"
            ];
        }
    }

    const easyMDE = new EasyMDE({
        element: document.getElementById(elementId),
        hideIcons: options.hideIcons,
        showIcons: options.showIcons,
        renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: false,
            markedOptions: {
                langPrefix: "",
                highlight: function (code, lang) {
                    if (lang === "mermaid" && mermaidInstalled) {
                        var tempDiv = document.createElement("div");
                        tempDiv.className = "mermaid-container";

                        var svg = mermaid.render("mermaid0", code);
                        tempDiv.innerHTML = svg;
                        return tempDiv;
                    }
                    else if (lang === "att") {
                        return '<div class="me-alert callout attention"><p class="title">' +
                            '<span class="me-icon icon-attention"></span> Attention</p><p>' +
                            code + '</p></div>';
                    }
                    else if (lang === "tip") {
                        return '<div class="me-alert callout tip"><p class="title">' +
                            '<span class="me-icon icon-tip"></span> Tip</p><p>' +
                            code + '</p></div>';
                    }
                    else if (lang === "note") {
                        return '<div class="me-alert callout note"><p class="title">' +
                            '<span class="me-icon icon-note"></span> Note</p><p>' +
                            code + '</p></div>';
                    }
                    else if (lang === "warn") {
                        return '<div class="me-alert callout warning"><p class="title">' +
                            '<span class="me-icon icon-warning"></span> Warning</p><p>' +
                            code + '</p></div>';
                    }
                    else if (lang === "video") {
                        var videoCode = '<div class="video-container">';

                        if (code.includes("youtube.com") || code.includes("youtu.be"))
                            videoCode = videoCode + '<iframe width="560" height="315" src="' + code + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                        else if (code.includes("vimeo.com"))
                            videoCode = videoCode + '<iframe src="' + code + '" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
                        else
                            videoCode = videoCode + '<video controls><source src="' + code + '" type="video/mp4"></video>';

                        videoCode = videoCode + '</div>';
                        return videoCode;
                    }
                    else if (lang && hljsInstalled) {
                        return code; const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                        return hljs.highlight(code, { language }).value;
                    }

                    return code;
                }
            }
        },
        initialValue: options.value,
        sideBySideFullscreen: false,
        autoDownloadFontAwesome: options.autoDownloadFontAwesome,
        lineNumbers: options.lineNumbers,
        lineWrapping: options.lineWrapping,
        minHeight: options.minHeight,
        maxHeight: options.maxHeight,
        placeholder: options.placeholder,
        tabSize: options.tabSize,
        theme: options.theme,
        direction: options.direction,
        toolbar: options.toolbar,
        toolbarTips: options.toolbarTips,
        spellChecker: options.spellChecker,
        nativeSpellcheck: options.nativeSpellcheck,

        autosave: options.autoSave,

        uploadImage: options.uploadImage,
        imageMaxSize: options.imageMaxSize,
        imageAccept: options.imageAccept,
        imageUploadEndpoint: options.imageUploadEndpoint,
        imagePathAbsolute: options.imagePathAbsolute,
        imageCSRFToken: options.imageCSRFToken,
        imageTexts: options.imageTexts,
        imageUploadFunction: (file, onSuccess, onError) => {
            imageUploadNotifier.onSuccess = onSuccess;
            imageUploadNotifier.onError = onError;

            NotifyUploadImage(elementId, file, dotNetObjectRef);
        },

        errorMessages: options.errorMessages,
        errorCallback: (errorMessage) => {
            dotNetObjectRef.invokeMethodAsync("NotifyErrorMessage", errorMessage);
        }
    });

    easyMDE.codemirror.on("change", function () {
        var text = easyMDE.value();
        dotNetObjectRef.invokeMethodAsync("UpdateInternalValue", text, easyMDE.options.previewRender(text));
    });

    function renderAttention(editor) {
        var cm = editor.codemirror;
        var output = '';
        var selectedText = cm.getSelection();
        var text = selectedText || '';

        output = '```att\r\n' + text + '\r\n```';
        cm.replaceSelection(output);
    }

    function renderMermaid(editor) {
        var cm = editor.codemirror;
        var output = '';
        var selectedText = cm.getSelection();
        var text = selectedText || '';

        output = '```mermaid\r\n' + text + '\r\n```';
        cm.replaceSelection(output);
    }

    function renderNote(editor) {
        var cm = editor.codemirror;
        var output = '';
        var selectedText = cm.getSelection();
        var text = selectedText || '';

        output = '```note\r\n' + text + '\r\n```';
        cm.replaceSelection(output);
    }

    function renderTip(editor) {
        var cm = editor.codemirror;
        var output = '';
        var selectedText = cm.getSelection();
        var text = selectedText || '';

        output = '```tip\r\n' + text + '\r\n```';
        cm.replaceSelection(output);
    }

    function renderWarning(editor) {
        var cm = editor.codemirror;
        var output = '';
        var selectedText = cm.getSelection();
        var text = selectedText || '';

        output = '```warn\r\n' + text + '\r\n```';
        cm.replaceSelection(output);
    }

    function renderVideo(editor) {
        var cm = editor.codemirror;
        var output = '';
        var selectedText = cm.getSelection();
        var text = selectedText || '';

        output = '```video\r\n' + text + '\r\n```';
        cm.replaceSelection(output);
    }

    instances[elementId] = {
        dotNetObjectRef: dotNetObjectRef,
        elementId: elementId,
        editor: easyMDE,
        imageUploadNotifier: imageUploadNotifier
    };

    if (options.preview === true) {
        // Set initial state to preview if requested
        const isActive = easyMDE.isPreviewActive()
        if (!isActive) {
            easyMDE.togglePreview();
        }
    }

    // update the first time
    var text = easyMDE.value();
    dotNetObjectRef.invokeMethodAsync("UpdateInternalValue", text, easyMDE.options.previewRender(text));
}

function allowResize(id) {
    $(document).ready(function () {
        //$('#' + id + '.resizable:not(.processed)').TextAreaResizer();
    });
}

function deleteAutoSave(id) {
    $.each(localStorage, function (key, str) {
        if (key.startsWith('smde_' + id)) {
            localStorage.removeItem("smde_" + id);
        }
    });
}

function deleteAllAutoSave() {
    $.each(localStorage, function (key, str) {
        if (key.startsWith('smde_')) {
            localStorage.removeItem(key);
        }
    });
}

/**
 * Toggles preview for the specified element
 * @param {string} elementId
 */
function togglePreview(elementId) {
    const instance = _instances[elementId];
    if (instance && instance.editor) {
        instance.editor.togglePreview();
    }
}

/**
 * Acticates or deactives preview mode for the specified element
 * @param {string} elementId
 * @param {boolean} wantedState
 */
function setPreview(elementId, wantedState) {
    const instance = _instances[elementId];
    if (instance && instance.editor) {

        const isActive = instance.editor.isPreviewActive()

        if (isActive != wantedState) {
            instance.editor.togglePreview();
        }
    }
}

function destroy(element, elementId) {
    const instances = _instances || {};

    // Fix for #54: Remove from DOM when MarkdownEditor is disposed
    const instance = _instances[elementId];
    if (instance && instance.editor) {
        instance.editor.toTextArea();
    }

    delete instances[elementId];
}

function setValue(elementId, value) {
    console.log("SetValue called");
    const instance = _instances[elementId];

    if (instance) {
        console.log("SetValue changes value");
        instance.editor.value(value);
    }
}

function setInitValue(elementId, value) {
    const instance = _instances[elementId];

    if (instance) {
        instance.editor.value(value);
    }
}

function getValue(elementId) {
    const instance = _instances[elementId];

    if (instance) {
        return instance.editor.value();
    }

    return null;
}

function notifyImageUploadSuccess(elementId, imageUrl) {
    const instance = _instances[elementId];

    if (instance) {
        return instance.imageUploadNotifier.onSuccess(imageUrl);
    }
}

function notifyImageUploadError(elementId, errorMessage) {
    const instance = _instances[elementId];

    if (instance) {
        return instance.imageUploadNotifier.onError(errorMessage);
    }
}

function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

async function NotifyUploadImage(elementId, file, dotNetObjectRef) {
    var arrBuffer = await file.arrayBuffer();

    const a = await arrBuffer;
    var arrBf = _arrayBufferToBase64(a);

    var fileEntry = {
        lastModified: new Date(file.lastModified).toISOString(),
        name: file.name,
        size: file.size,
        type: file.type,
        contentbase64: arrBf
    };

    dotNetObjectRef.invokeMethodAsync('NotifyImageUpload', fileEntry).then(null, function (err) {
        throw new Error(err);
    });

    dotNetObjectRef.invokeMethodAsync('UploadFile', fileEntry).then(r => {
        if (!r || r.length === 0)
            notifyImageUploadError(elementId, "Upload error");
        else
            notifyImageUploadSuccess(elementId, r);
    });
}

const meLoadCSS = function (name, url) {
    if (document.getElementById(name))
        return;

    return new Promise(function (resolve, reject) {
        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = sourceUrl;

        link.addEventListener('load', function () {
            // The script is loaded completely
            resolve(true);
        });

        document.head.appendChild(script);
    });
};

const meLoadScript = function (name, url) {
    if (document.getElementById(name))
        return;

    return new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        script.src = url;
        script.id = name;

        script.addEventListener('load', function () {
            // The script is loaded completely
            resolve(true);
        });

        document.head.appendChild(script);
    });
};

window.renderMermaidDiagram = async () => {
    const collection = document.getElementsByTagName("code");

    for (let i = 0; i < collection.length; i++) {
        if (collection[i].classList.contains("mermaid")) {
            try {
                console.log(collection[i].innerHTML);
                var svg = await mermaid.render("theGraph", collection[i].innerHTML);
                collection[i].innerHTML = svg;
            } catch (error) {
                collection[i].innerHTML = "Invalid syntax. " + error; // Display error message
            }
        }
    }
} 