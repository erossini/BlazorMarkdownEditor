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

    const easyMDE = new EasyMDE({
        element: document.getElementById(elementId),
        hideIcons: options.hideIcons,
        showIcons: options.showIcons,
        renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: true
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
        console.log(easyMDE.value());
        dotNetObjectRef.invokeMethodAsync("UpdateInternalValue", easyMDE.value());
    });

    instances[elementId] = {
        dotNetObjectRef: dotNetObjectRef,
        elementId: elementId,
        editor: easyMDE,
        imageUploadNotifier: imageUploadNotifier
    };
}

function destroy(element, elementId) {
    const instances = _instances || {};
    delete instances[elementId];
}

function setValue(elementId, value) {
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