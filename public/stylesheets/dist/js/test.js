function MediumEditor(elements, options)
function extend(b, a)

    function isDescendant(parent, child) 

    // http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
    // by Tim Down
    function saveSelection() 

    function restoreSelection(savedSel) 

    // http://stackoverflow.com/questions/1197401/how-can-i-get-the-element-the-caret-is-in-with-javascript-when-using-contentedi
    // by You
    function getSelectionStart() 

    // http://stackoverflow.com/questions/4176923/html-of-selected-text
    // by Tim Down
    function getSelectionHtml() 

    // https://github.com/jashkenas/underscore
    function isElement(obj)
    
    MediumEditor.prototype = {
        defaults: {
            allowMultiParagraphSelection: true,
            anchorInputPlaceholder: 'Paste or type a link',
            anchorPreviewHideDelay: 500,
            buttons: ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'quote'],
            buttonLabels: false,
            checkLinkFormat: false,
            cleanPastedHTML: false,
            delay: 0,
            diffLeft: 0,
            diffTop: -10,
            disableReturn: false,
            disableDoubleReturn: false,
            disableToolbar: false,
            disableEditing: false,
            elementsContainer: false,
            firstHeader: 'h3',
            forcePlainText: true,
            placeholder: 'Type your text',
            secondHeader: 'h4',
            targetBlank: false,
            anchorTarget: false,
            anchorButton: false,
            anchorButtonClass: 'btn',
            extensions: {},
            activeButtonClass: 'medium-editor-button-active',
            firstButtonClass: 'medium-editor-button-first',
            lastButtonClass: 'medium-editor-button-last'
        },


        init: function (elements, options) 

        setup: function () 

        initElements: function () 

        setElementSelection: function (selector)
        
        updateElementList: function () 
        
        serialize: function ()

        callExtensions: function (funcName) 

        /**
         * Pass current Medium Editor instance to all extensions
         * if extension constructor has 'parent' attribute set to 'true'
         *
         */
        passInstance: function () 
        bindParagraphCreation: function (index) 

        isListItemChild: function (node) 

        bindReturn: function (index) 

        bindTab: function (index) 
        

        buttonTemplate: function (btnType) 

        // TODO: break method
        getButtonLabels: function (buttonLabelType) 
        
        initToolbar: function () 

        createToolbar: function ()

        //TODO: actionTemplate
        toolbarButtons: function () 

        toolbarFormAnchor: function () 
        bindSelect: function () 

        checkSelection: function () 

        clickingIntoArchorForm: function (e) 

        hasMultiParagraphs: function () 

        checkSelectionElement: function (newSelection, selectionElement) 

		// 텍스트 드레그 이벤트 리스너
        findMatchingSelectionParent: function(testElementFunction) 
        
        getSelectionElement: function () 

        selectionInContentEditableFalse: function () 

        setToolbarPosition: function () 

        setToolbarButtonStates: function () 
        
        checkActiveButtons: function () 

        activateButton: function (tag) 

        bindButtons: function () 
        
        setFirstAndLastItems: function (buttons) 

        execAction: function (action, e) 

        // http://stackoverflow.com/questions/15867542/range-object-get-selection-parent-node-chrome-vs-firefox
        rangeSelectsSingleNode: function (range) 
        
        getSelectedParentElement: function () 

        triggerAnchorAction: function () 

        execFormatBlock: function (el) 
        
        getSelectionData: function (el) 

        getFirstChild: function (el) 
        
        hideToolbarActions: function () 

        showToolbarActions: function () 
        
        saveSelection: function() 

        restoreSelection: function() 

        showAnchorForm: function (link_value) 

        bindAnchorForm: function () 


        hideAnchorPreview: function () 

        // TODO: break method
        showAnchorPreview: function (anchorEl) 
        
        // TODO: break method
        observeAnchorPreview: function (anchorEl) 
        

        createAnchorPreview: function () 
        
        anchorPreviewTemplate: function () 

        anchorPreviewClickHandler: function (e) 

        editorAnchorObserver: function (e) 

        bindAnchorPreview: function (index) 

        checkLinkFormat: function (value) 
        
        setTargetBlank: function (el) 

        setButtonClass: function (buttonClass)

        createLink: function (input, target, buttonClass) 
        

        bindWindowActions: function () 
        
        activate: function () 

        // TODO: break method
        deactivate: function () 

        htmlEntities: function (str) 

        bindPaste: function () 

        setPlaceholders: function () 

        cleanPaste: function (text) 

        pasteHTML: function (html) 
        
        isCommonBlock: function (el) 
        
        filterCommonBlocks: function (el) 
        
        filterLineBreak: function (el) 

        // remove an element, including its parent, if it is the only element within its parent
        removeWithParent: function (el) 

        cleanupSpans: function (container_el) 

