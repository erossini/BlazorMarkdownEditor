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
                    button.className = "bi bi-question-circle";
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

    // Resolve mermaid API — v11 may expose as mermaid.default
    var _mermaidApi = null;
    if (typeof mermaid !== 'undefined') {
        _mermaidApi = (typeof mermaid.render === 'function') ? mermaid :
                      (mermaid.default && typeof mermaid.default.render === 'function') ? mermaid.default : null;
        mermaidInstalled = (_mermaidApi !== null);
        if (options.toolbar == undefined) {
            options.toolbar = [
                "bold", "italic", "heading", "|",
                "undo", "redo", "|", "code",
                {
                    name: "addMermaid",
                    action: renderMermaid,
                    className: "bi bi-pie-chart",
                    title: "Add Mermaid",
                },
                "|",
                "attention", "note", "tip", "warning", "video",
                "|", "quote", "unordered-list", "ordered-list", "|",
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
                // hljs themes target `.hljs` on the <code> element; the
                // `language-xxx` suffix keeps marked's standard class too.
                langPrefix: "hljs language-",
                highlight: function (code, lang) {
                    if (lang === "mermaid" && typeof window.mermaid !== 'undefined') {
                        var mApi = (typeof window.mermaid.render === 'function')
                            ? window.mermaid
                            : (window.mermaid.default && window.mermaid.default.render ? window.mermaid.default : null);
                        if (!mApi) return code;

                        var mermaidId = 'mermaid-preview-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
                        setTimeout(function () {
                            var el = document.getElementById(mermaidId);
                            if (el) {
                                mApi.render(mermaidId + '-svg', code).then(function (result) {
                                    el.innerHTML = result.svg || result;
                                }).catch(function (e) {
                                    el.innerHTML = '<small class="text-danger">Mermaid: ' + e.message + '</small>';
                                });
                            }
                        }, 50);
                        return '<div id="' + mermaidId + '" class="mermaid-container"><small class="text-muted">Rendering diagram...</small></div>';
                    }
                    // att / note / tip / warn / video fenced blocks are rendered
                    // natively by EasyMDE — no custom highlight branch needed.
                    if (lang && typeof window.hljs !== 'undefined') {
                        var language = window.hljs.getLanguage(lang) ? lang : 'plaintext';
                        try {
                            return window.hljs.highlight(code, { language: language, ignoreIllegals: true }).value;
                        } catch (e) {
                            return code;
                        }
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
        resize: (options.resize && options.resize !== 'none') ? options.resize : false,
        fullScreenZIndex: options.fullScreenZIndex,
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

    // Ensure the EasyMDEContainer shows a native resize grip AND that the
    // CodeMirror leaves room for the toolbar + statusbar inside the clipped
    // container (otherwise the statusbar is pushed off until the first drag).
    // Mirrors the logic in src/js/easymde.js for builds of easymde.min.js that
    // predate that fix.
    if (options.resize && options.resize !== 'none') {
        setTimeout(function () {
            var cm = easyMDE.codemirror;
            var cmWrapper = cm.getWrapperElement();
            var container = cmWrapper && cmWrapper.closest('.EasyMDEContainer');
            if (!container) return;

            var mode = options.resize;
            var resizesWidth = mode === 'horizontal' || mode === 'both';

            container.style.resize = mode;
            container.style.overflow = 'hidden';
            container.style.boxSizing = 'border-box';

            if (options.maxHeight) {
                container.style.height = options.maxHeight;
                cm.getScrollerElement().style.height = '';
            }
            cmWrapper.style.height = 'auto';

            var toolbar = container.querySelector('.editor-toolbar');
            var statusbar = container.querySelector('.editor-statusbar');

            var applyContainerSize = function () {
                var containerW = container.offsetWidth;
                var containerH = container.offsetHeight;
                var editorH = containerH;
                if (toolbar) editorH -= toolbar.offsetHeight;
                if (statusbar) editorH -= statusbar.offsetHeight;
                if (editorH < 0) editorH = 0;
                cm.setSize(resizesWidth ? containerW : null, editorH);
                return { w: containerW, h: containerH };
            };

            if (resizesWidth) {
                container.style.width = container.offsetWidth + 'px';
            }
            var initial = applyContainerSize();

            if (typeof ResizeObserver !== 'undefined') {
                var lastW = initial.w, lastH = initial.h;
                var ro = new ResizeObserver(function () {
                    var w = container.offsetWidth, h = container.offsetHeight;
                    if (w === lastW && h === lastH) return;
                    lastW = w; lastH = h;
                    applyContainerSize();
                });
                ro.observe(container);
            }
        }, 0);
    }

    easyMDE.codemirror.on("change", function () {
        var text = easyMDE.value();
        dotNetObjectRef.invokeMethodAsync("UpdateInternalValue", text, easyMDE.options.previewRender(text));
    });

    function renderMermaid(editor) {
        var cm = editor.codemirror;
        var selectedText = cm.getSelection();
        var text = selectedText || '';
        cm.replaceSelection('```mermaid\r\n' + text + '\r\n```');
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

function insertTextAtCursor(elementId, text) {
    const instance = _instances[elementId];
    if (instance && instance.editor) {
        var cm = instance.editor.codemirror;
        var doc = cm.getDoc();
        var cursor = doc.getCursor();
        doc.replaceRange(text, cursor);
        cm.focus();
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

    // UploadFile is a void C# method that handles success/error notifications
    // via separate JS interop calls (notifyImageUploadSuccess/Error).
    // Do NOT call notifyImageUploadSuccess here — the return value is not the URL.
    dotNetObjectRef.invokeMethodAsync('UploadFile', fileEntry).then(null, function (err) {
        notifyImageUploadError(elementId, err ? err.toString() : "Upload error");
    });
}

const meLoadCSS = function (name, url) {
    if (document.getElementById(name)) return Promise.resolve(true);

    return new Promise(function (resolve, reject) {
        const link = document.createElement('link');
        link.id = name;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.addEventListener('load', function () { resolve(true); });
        link.addEventListener('error', reject);
        document.head.appendChild(link);
    });
};

const meLoadScript = function (name, url) {
    if (document.getElementById(name)) return Promise.resolve(true);

    return new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        script.id = name;
        script.src = url;
        script.addEventListener('load', function () { resolve(true); });
        script.addEventListener('error', reject);
        document.head.appendChild(script);
    });
};

// Loads mermaid / highlight.js bundled with the component on demand.
// `assets` is { mermaid: bool, highlight: bool, highlightTheme: string|null }.
async function ensureAssets(assets) {
    if (!assets) return;
    const base = '/_content/PSC.Blazor.Components.MarkdownEditor/lib';

    if (assets.highlight && typeof window.hljs === 'undefined') {
        const theme = assets.highlightTheme || 'github.min.css';
        await meLoadCSS('me-hljs-css', base + '/highlight.js/styles/' + theme);
        await meLoadScript('me-hljs-js', base + '/highlight.js/highlight.min.js');
    }

    if (assets.mermaid && typeof window.mermaid === 'undefined') {
        await meLoadScript('me-mermaid-js',
            '/_content/PSC.Blazor.Components.MarkdownEditor/js/mermaid.min.js');
        if (window.mermaid && typeof window.mermaid.initialize === 'function') {
            window.mermaid.initialize({ startOnLoad: false });
        }
    }
}

window.renderMermaidDiagram = async () => {
    var m = (typeof mermaid !== 'undefined') ? mermaid : null;
    if (m && typeof m.render !== 'function' && m.default) m = m.default;
    if (!m || typeof m.render !== 'function') return;

    const collection = document.getElementsByTagName("code");

    for (let i = 0; i < collection.length; i++) {
        if (collection[i].classList.contains("mermaid")) {
            try {
                var result = await m.render("theGraph-" + i, collection[i].innerHTML);
                collection[i].innerHTML = result.svg || result;
            } catch (error) {
                collection[i].innerHTML = "Invalid syntax. " + error;
            }
        }
    }
}