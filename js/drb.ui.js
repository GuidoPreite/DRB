// #region DRB.UI
// #region bootstrap-select Functions
/**
 * Refresh a dropdown
 * @param {string} id Id
 */
DRB.UI.RefreshDropdown = function (id) {
    $("#" + id).selectpicker("refresh");
}

/**
 * Lock a dropdown
 * @param {string} id Id
 */
DRB.UI.LockDropdown = function (id) {
    $("#" + id).prop("disabled", "true");
    DRB.UI.RefreshDropdown(id);
}

/**
 * Unlock a dropdown
 * @param {string} id Id
 */
DRB.UI.UnlockDropdown = function (id) {
    $("#" + id).prop("disabled", "");
    DRB.UI.RefreshDropdown(id);
}

/**
 * Unselect a dropdown
 * @param {string} id Id
 */
DRB.UI.UnselectDropdown = function (id) {
    $("#" + id).val(null).change();
    DRB.UI.RefreshDropdown(id);
}

/**
 * Render a dropdown as disabled
 * @param {string} id Id
 * @param {string} title Title
 */
DRB.UI.ResetDropdown = function (id, title) {
    // empty() required for a strange bug on the update of title when no entries are selected in a multiselect optionset
    $("#" + id).empty();
    $("#" + id).selectpicker("destroy").prop("title", title);
    DRB.UI.LockDropdown(id);
}

/**
 * Fill a dropdown as enabled
 * @param {string} id Id
 * @param {string} title Title
 * @param {any} options Options
 * @param {boolean} disabledOptions If options are disabled
 * @param {boolean} showGroups If groups are shown
 * @param {boolean} hideSubText if Sub Text is hidden
 */
DRB.UI.FillDropdown = function (id, title, options, disabledOptions, showGroups, hideSubText, size) {
    var htmlOptions = "";
    var subTextProperty = "SubText";

    var groups = [];
    if (showGroups === true) {
        subTextProperty = "SubText2";
        options.forEach(function (dropOption) { if (groups.indexOf(dropOption.SubText) === -1) { groups.push(dropOption.SubText); } });
        groups.sort();
    } else { groups.push("No Groups"); } // we need at least an element for the next forEach

    groups.forEach(function (group) {
        if (showGroups === true) { htmlOptions += '<optgroup label="' + group + '">'; }
        options.forEach(function (dropOption) {
            if (dropOption.SubText == group || showGroups !== true) {
                htmlOptions += '<option value="' + dropOption.Value + '"';
                var showSubText = false;
                if (DRB.Utilities.HasValue(dropOption[subTextProperty])) { showSubText = true; }

                if (showSubText === true && hideSubText !== true) { htmlOptions += ' data-subtext="' + dropOption[subTextProperty] + '"'; }
                if (disabledOptions === true) { htmlOptions += ' disabled'; }
                htmlOptions += '>' + dropOption.Label + '</option>';
            }
        });
        if (showGroups === true) { htmlOptions += "</optgroup>"; }
    });

    $("#" + id).empty();
    if (htmlOptions !== "") { $("#" + id).html(htmlOptions); }
    if (DRB.Utilities.HasValue(size)) {
        $("#" + id).selectpicker({ title: title, size: size });
    } else {
        $("#" + id).selectpicker({ title: title, size: 10 });
    }
    DRB.UI.UnlockDropdown(id);
}

/**
 * Fill a Dropdown with Groups defined by the SubText Property
 * @param {string} id Id
 * @param {string} title Title
 * @param {any} options Options
 * @param {boolean} disabled If options are disabled
 */
DRB.UI.FillDropdownWithGroups = function (id, title, options, disabled) {
    DRB.UI.FillDropdown(id, title, options, disabled, true);
}
// #endregion

// #region bootbox.js Functions
/**
 * Display Dialog (internal function)
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} className Class Name
 * @param {string} size Size
 * @param {Function} okCallBack Function to call when OK is pressed
 * @param {boolean} askQuestion If show the dialog as a question
 */
DRB.UI.DisplayDialog = function (title, message, className, size, okCallBack, askQuestion, confirmLabel, cancelLabel) {
    bootbox.hideAll();
    var properties = { message: message, centerVertical: true, buttons: { ok: { label: "OK", className: className } } };
    if (DRB.Utilities.HasValue(title)) { properties.title = title; }
    if (DRB.Utilities.HasValue(size)) { properties.size = size; }

    if (!DRB.Utilities.HasValue(className)) { properties.closeButton = false; properties.buttons = {}; }

    if (DRB.Utilities.HasValue(okCallBack) && askQuestion !== true) {
        properties.closeButton = false;
        properties.buttons = { ok: { label: "OK", className: className, callback: okCallBack } }
    }

    if (DRB.Utilities.HasValue(okCallBack) && askQuestion === true) {
        properties.closeButton = true;
        if (!DRB.Utilities.HasValue(confirmLabel)) { confirmLabel = "Yes"; }
        if (!DRB.Utilities.HasValue(cancelLabel)) { cancelLabel = "No"; }
        properties.buttons = { cancel: { label: cancelLabel }, confirm: { label: confirmLabel, className: className } };
        properties.callback = function (result) { if (result === true) { okCallBack(); } };
        bootbox.confirm(properties);
    } else {
        bootbox.dialog(properties);
    }
}

/**
 * Show a message
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} size Size
 * @param {Function} okCallBack Function to call when OK is pressed
 */
DRB.UI.Show = function (title, message, size, okCallBack) {
    DRB.UI.DisplayDialog("<span class='text-primary'>" + title + "</span>", message, "btn-primary", size, okCallBack);
}

/**
 * Show an error message
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} size Size
 * @param {Function} okCallBack Function to call when OK is pressed
 */
DRB.UI.ShowError = function (title, message, size, okCallBack) {
    DRB.UI.DisplayDialog("<span class='text-danger'>" + title + "</span>", message, "btn-danger", size, okCallBack);
}

/**
 * Show a loading message
 * @param {string} message Message
 * @param {string} size Size
 */
DRB.UI.ShowLoading = function (message, size) {
    var loadingMessage = '<p class="text-center mb-0">' + message + '</p><br /><div class="d-flex justify-content-center"><div class="spinner-border spinner-border-sm" role="status"><span class="sr-only"></span></div></div>';
    DRB.UI.DisplayDialog(null, loadingMessage, null, size);
}

/**
 * Show a loading message
 * @param {string} message Message
 * @param {string} size Size
 */
DRB.UI.ShowMessage = function (message, size) {
    var loadingMessage = '<p class="text-center mb-0">' + message + '</p>';
    DRB.UI.DisplayDialog(null, loadingMessage, null, size);
}

/**
 * Show a question
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} size Size
 * @param {Function} comfirmCallBack Function to call when Yes is pressed
 */
DRB.UI.ShowQuestion = function (title, message, size, comfirmCallBack) {
    DRB.UI.DisplayDialog("<span class='text-danger'>" + title + "</span>", message, "btn-danger", size, comfirmCallBack, true);
}

/**
 * Show a question
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} size Size
 * @param {Function} comfirmCallBack Function to call when Yes is pressed
 */
DRB.UI.ShowExport = function (title, message, size, comfirmCallBack) {
    DRB.UI.DisplayDialog("<span class='text-primary'>" + title + "</span>", message, "btn-primary", size, comfirmCallBack, true, "Export", "Cancel");
}

/**
 * Hide Loading
 */
DRB.UI.HideLoading = function () {
    bootbox.hideAll();
}
// #endregion

// #region HTML Helpers
/**
 * UI - Create a spacer 
 */
DRB.UI.CreateSpacer = function () {
    return $("<div>", { class: "spacer" });
}

/**
 * UI - Create External Link
 * @param {string} link Link
 * @param {string} name Name
 * @param {string} className Class Name
 */
DRB.UI.CreateExternalLink = function (link, name, className) {
    if (!DRB.Utilities.HasValue(className)) { className = ""; }
    return $("<a>", { target: "_blank", href: link, text: name, class: className });
}

DRB.UI.CreateSpacing = function () {
    return $("<div>", { html: "<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />" });
}

/**
 * Create an Input File
 * @param {string} id Id
 * @param {boolean} hidden Hidden
 * @param {Function} event Function to call when the button is clicked
 */
DRB.UI.CreateInputFile = function (id, hidden, event) {
    var displayStyle = "block";
    if (hidden === true) { displayStyle = "none"; }
    return $("<input>", { id: id, type: "file", style: "display: " + displayStyle }).on("change", function (e) { event(e); });
}

/**
 * Create a Checkbox
 * @param {string} id Id
 * @param {string} text Text
 * @param {boolean} checked Checkbox status
 */
DRB.UI.CreateCheckbox = function (id, text, className, checked) {
    return $("<label>", { html: text + " " }).append($("<input>", { id: id, type: "checkbox", class: className, checked: checked }));
}

/**
 * Create a Button
 * @param {string} id Id
 * @param {string} text Text
 * @param {string} className Class Name
 * @param {Function} event Function to call when the button is clicked
 * @param {Function} parameter Parameter passed to the function
 */
DRB.UI.CreateButton = function (id, text, className, event, parameter, parameter2, parameter3, parameter4, parameter5, parameter6) {
    if (!DRB.Utilities.HasValue(className)) { className = "btn-primary"; }
    return $("<button>", { id: id, html: text, class: "btn " + className }).click(function () {
        if (DRB.Utilities.HasValue(event)) {
            event(parameter, parameter2, parameter3, parameter4, parameter5, parameter6);
        }
    });
}

/**
 * Create a Lookup
 * @param {string} id Id
 * @param {Function} event Function to call when the button is clicked
 * @param {Function} parameter Parameter passed to the function
 */
DRB.UI.CreateLookup = function (id, event, parameter) {
    return $("<button>", { id: id, class: "searchbutton" }).click(function () { event(parameter); }).append($("<span>", { "aria-hidden": true, html: "&telrec;" }));
}

/**
 * Create a Close Button
 * @param {Function} event Function to call when the button is clicked
 * @param {any} parameter Parameter of the event
 */
DRB.UI.CreateCloseButton = function (event, parameter, parameter2, parameter3) {
    return $("<button>", { class: "close", "aria-label": "Close" }).click(function () { event(parameter, parameter2, parameter3); }).append($("<span>", { "aria-hidden": true, html: "&times;" }));
}

DRB.UI.CreateRemoveButton = function (event, parameter, parameter2, parameter3, parameter4, parameter5, parameter6) {
    return $("<button>", { class: "closebutton" }).click(function (e) { e.stopPropagation(); event(parameter, parameter2, parameter3, parameter4, parameter5, parameter6); }).append($("<span>", { html: "&times;" }));
}

DRB.UI.CreateUpButton = function (id, event, parameter, parameter2, parameter3, parameter4, parameter5, parameter6) {
    return $("<button>", { id: id, class: "closebutton" }).click(function () { event(parameter, parameter2, parameter3, parameter4, parameter5, parameter6); }).append($("<span>", { html: "&uarr;" }));
}

DRB.UI.CreateDownButton = function (id, event, parameter, parameter2, parameter3, parameter4, parameter5, parameter6) {
    return $("<button>", { id: id, class: "closebutton" }).click(function () { event(parameter, parameter2, parameter3, parameter4, parameter5, parameter6); }).append($("<span>", { html: "&darr;" }));
}

DRB.UI.CreateEmptyArrowButton = function (id) {
    return $("<button>", { id: id, class: "disabledclose" }).append($("<span>", { html: "&darr;" }));
}

DRB.UI.CreateEmptyRemoveButton = function () {
    return $("<button>", { class: "disabledclose" }).append($("<span>", { html: "&times;" }));
}

/**
 * Create a textarea
 * @param {string} id Id
 * @param {string} className Class Name
 */
DRB.UI.CreateTextArea = function (id, className) {
    var textAreaProperties = {};
    if (DRB.Utilities.HasValue(id)) { textAreaProperties.id = id; }
    if (DRB.Utilities.HasValue(className)) { textAreaProperties.class = className; }
    return $("<textarea>", textAreaProperties);
}

/**
 * Create an empty div
 * @param {string} id Id
 * @param {string} className Class Name
 */
DRB.UI.CreateEmptyDiv = function (id, className) {
    var divProperties = {};
    if (DRB.Utilities.HasValue(id)) { divProperties.id = id; }
    if (DRB.Utilities.HasValue(className)) { divProperties.class = className; }
    return $("<div>", divProperties);
}

/**
 * Create a container (half screen)
 * @param {string} title Title
 */
DRB.UI.CreateHalfContainer = function (title) {
    return DRB.UI.CreateEmptyDiv(null, "col-lg-6").append($("<h4>", { text: title }));
}

/**
 * Create a container (full screen)
 * @param {string} title Title
 */
DRB.UI.CreateWideContainerWithId = function (id, title) {
    return DRB.UI.CreateEmptyDiv(null, "col-lg-12").append($("<h4>", { id: id, text: title }));
}

/**
 * Create a container (full screen)
 * @param {string} title Title
 */
DRB.UI.CreateWideContainer = function (title) {
    return DRB.UI.CreateEmptyDiv(null, "col-lg-12").append($("<h4>", { text: title }));
}

/**
 * Create a sub container
 * @param {string} title Title
 */
DRB.UI.CreateSubContainerWithId = function (id, title) {
    return DRB.UI.CreateEmptyDiv().append($("<h5>", { id: id, text: title }));
}

/**
 * Create a sub container
 * @param {string} title Title
 */
DRB.UI.CreateSubContainer = function (title) {
    return DRB.UI.CreateEmptyDiv().append($("<h5>", { text: title }));
}

/**
 * Create a paragraph
 * @param {string} text
 */
DRB.UI.CreateParagraph = function (text) {
    return $("<p>", { html: text });
}

/**
 * Create an empty paragraph
 * @param {string} id
 */
DRB.UI.CreateEmptyParagraph = function (id) {
    return $("<p>", { id: id });
}

/**
 * Create a hr
 */
DRB.UI.CreateHr = function () {
    return $("<hr>");
}

/**
 * Create a br
 */
DRB.UI.CreateBr = function () {
    return $("<br />");
}

/**
 * Create a span
 * @param {string} id Id
 * @param {string} text Text
 * @param {string} smallText Small Text
 * @param {string} className Class Name
 */
DRB.UI.CreateSpan = function (id, text, smallText, className) {
    if (DRB.Utilities.HasValue(smallText)) {
        if (smallText.indexOf("{{") === 0) {
            text = text + " <small>" + smallText + "</small>";
        } else {
            text = text + " <small>(" + smallText + ")</small>";
        }
    }
    if (!DRB.Utilities.HasValue(className)) { className = ""; }
    return $("<span>", { id: id, html: text, class: className });
}

/**
 * Create an input
 * @param {string} id Id
 * @param {number} maxLength Max Length
 */
DRB.UI.CreateInput = function (id, placeholder, maxLength, width) {
    if (!DRB.Utilities.HasValue(maxLength)) { maxLength = 100; };
    if (!DRB.Utilities.HasValue(width)) { width = "100%"; };
    return $("<input>", { id: id, class: "form-control", style: "width: " + width, type: "text", autocomplete: "off", maxlength: maxLength, placeholder: placeholder });
}

/**
 * Create an input for Guid
 * @param {string} id Id
 * @param {number} maxLength Max Length
 */
DRB.UI.CreateInputGuid = function (id) {
    return $("<input>", { id: id, class: "form-control", style: "width: 340px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", maxlength: 36, title: "Guid", placeholder: "00000000-0000-0000-0000-000000000000" });
}

DRB.UI.CreateInputString = function (id, maxLength, placeholder) {
    var inputProperties = { id: id, class: "form-control", style: "width: 340px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", placeholder: "Text" };
    if (DRB.Utilities.HasValue(maxLength)) { inputProperties.maxLength = maxLength; }
    if (DRB.Utilities.HasValue(placeholder)) { inputProperties.placeholder = placeholder; }
    return $("<input>", inputProperties);
}

DRB.UI.CreateInputLongString = function (id, maxLength, placeholder) {
    var inputProperties = { id: id, class: "form-control", style: "width: 540px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", placeholder: "Text" };
    if (DRB.Utilities.HasValue(maxLength)) { inputProperties.maxLength = maxLength; }
    if (DRB.Utilities.HasValue(placeholder)) { inputProperties.placeholder = placeholder; }
    return $("<input>", inputProperties);
}

DRB.UI.CreateInputStringPowerAutomate = function (id) {
    return $("<input>", { id: id, readonly: "readonly", class: "form-control", style: "width: 600px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off" });
}

DRB.UI.CreateInputDateTime = function (id, behavior, placeholder) {
    if (!DRB.Utilities.HasValue(placeholder)) { placeholder = "Date Time"; }
    return $("<input>", { id: id, readonly: "readonly", "data-datetimebehavior": behavior, class: "form-control", style: "width: 340px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", title: placeholder, placeholder: placeholder });
}

DRB.UI.CreateInputMemo = function (id, maxLength, placeholder) {
    if (!DRB.Utilities.HasValue(maxLength)) { maxLength = 100; }
    if (!DRB.Utilities.HasValue(placeholder)) { placeholder = "Multiline Text"; }
    return $("<textarea>", { id: id, class: "form-control", style: "width: 340px; height: 34px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", maxlength: maxLength, title: placeholder, placeholder: placeholder });
}

DRB.UI.CreateInputNumber = function (id, placeholder) {
    if (!DRB.Utilities.HasValue(placeholder)) { placeholder = "Integer"; }
    return $("<input>", { id: id, class: "form-control", style: "width: 340px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", title: placeholder, placeholder: placeholder });
}

DRB.UI.CreateInputTopCount = function (id) {
    var placeholder = "Max 5000";
    return $("<input>", { id: id, class: "form-control", style: "width: 100px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", title: placeholder, placeholder: placeholder });
}

DRB.UI.CreateInputNextLink = function (id) {
    return $("<input>", { id: id, class: "form-control", style: "width: 90%; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", title: "@odata.nextLink url", placeholder: "@odata.nextLink url" });
}

DRB.UI.CreateImage = function (id, content) {
    return $("<img>", { id: id, src: content, style: "max-width: 768px;" });
}

/**
 * Create an input with a prefix
 * @param {string} id Id
 * @param {string} prefixId Prefix Id
 * @param {string} prefix Prefix
 * @param {number} maxLength Max Length
 */
DRB.UI.CreateInputWithPrefix = function (id, prefixId, prefix, maxLength) {
    var div = $("<div>", { class: "input-group" });
    var divPrefix = $("<div>", { class: "input-group-prepend" });
    var span = DRB.UI.CreateSpan(prefixId, prefix, null, "input-group-text");
    var input = DRB.UI.CreateInput(id, maxLength);

    divPrefix.append(span);
    div.append(divPrefix);
    div.append(input);
    return div;
}

/**
 * Create a dropdown (without search and without sub text)
 * @param {string} id Id
 */
DRB.UI.CreateSimpleDropdown = function (id) {
    return $("<select>", { id: id, class: "selectpicker", "data-width": "fit", "data-dropup-auto": "false" });
}

/**
 * Create a dropdown
 * @param {string} id Id
 * @param {boolean} multiSelect If the dropdown allows multi selection
 * @param {boolean} actionBox if action buttons (Select All, Deselect All) should be visible
 */
DRB.UI.CreateDropdown = function (id, multiSelect, actionBox) {
    var selectProperties = { id: id, class: "selectpicker", "data-live-search": "true", "data-width": "fit", "data-show-subtext": "true", "data-dropup-auto": "false" };
    if (multiSelect === true) {
        selectProperties["multiple"] = "multiple";
        selectProperties["data-selected-text-format"] = "count > 0";
        if (actionBox === true) { selectProperties["data-actions-box"] = "true"; }
    }
    return $("<select>", selectProperties);
}

DRB.UI.CreateTabs = function (id, tabs) {
    var ul = $("<ul>", { id: id, class: "nav nav-tabs" });
    tabs.forEach(function (tab, tabIndex) {
        var aClass = "nav-link";
        if (tabIndex === 0) { aClass += " active"; }
        var a = $("<a>", { id: "a_" + tab.Id, class: aClass, "data-bs-toggle": "tab", href: "#" + tab.Id, text: tab.Name });
        var li = $('<li>', { class: "nav-item" }).html(a);
        ul.append(li);
    });
    return ul;
}

DRB.UI.CreateTabContents = function (id, tabs) {
    var div = $("<div>", { id: id, class: "tab-content" });
    tabs.forEach(function (tab, tabIndex) {
        var subDivClass = "tab-pane";
        if (tabIndex === 0) { subDivClass += " active show"; }
        var subDiv = $("<div>", { id: tab.Id, class: subDivClass });
        div.append(subDiv);
    });
    return div;
}

DRB.UI.CreateTable = function (id) {
    return $("<table>", { id: id, class: "tablefix" });
}

DRB.UI.CreateTr = function (id) {
    return $("<tr>", { id: id });
}

DRB.UI.CreateTd = function (id) {
    return $("<td>", { id: id });
}
// #endregion

// #region Model Driven Apps helper
DRB.UI.OpenLookup = function (settings) {
    // set lookupOptions
    var lookupOptions = null;
    if (settings.openView === true) {
        if (DRB.Utilities.HasValue(DRB.Metadata.QueryObjectTypeCode)) {
            lookupOptions = {
                defaultEntityType: "savedquery", entityTypes: ["savedquery"], allowMultiSelect: false,
                filters: [{ filterXml: "<filter type='and'><condition attribute='returnedtypecode' operator='eq' value='" + DRB.Metadata.QueryObjectTypeCode + "' /></filter>", entityLogicalName: "savedquery" }]
            };
        }
    }

    if (settings.openWorkflow === true) {
        if (DRB.Utilities.HasValue(DRB.Metadata.QueryObjectTypeCode)) {
            lookupOptions = {
                defaultEntityType: "workflow", entityTypes: ["workflow"], allowMultiSelect: false,
                filters: [{ filterXml: "<filter type='and'><condition attribute='statecode' operator='eq' value='1' /><condition attribute='ondemand' operator='eq' value='1' /><condition attribute='primaryentity' operator='eq' value='" + DRB.Metadata.QueryObjectTypeCode + "' /></filter>", entityLogicalName: "workflow" }]
            };
        }
    }

    if (settings.openUser === true) {
        lookupOptions = { defaultEntityType: "systemuser", entityTypes: ["systemuser"], allowMultiSelect: false };
    }

    if (settings.openPrimaryEntity === true) {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
            var entityLogicalName = DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName;
            lookupOptions = { defaultEntityType: entityLogicalName, entityTypes: [entityLogicalName], allowMultiSelect: false };
        }
    }

    if (settings.openSecondaryEntity === true) {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.secondaryEntity)) {
            var entityLogicalName = DRB.Metadata.CurrentNode.data.configuration.secondaryEntity.logicalName;
            lookupOptions = { defaultEntityType: entityLogicalName, entityTypes: [entityLogicalName], allowMultiSelect: false };
        }
    }

    if (settings.openCustom === true) {
        if (DRB.Utilities.HasValue(settings.defaultEntityType) && DRB.Utilities.HasValue(settings.entityTypes)) {
            lookupOptions = { defaultEntityType: settings.defaultEntityType, entityTypes: settings.entityTypes, allowMultiSelect: false };
        }
    }

    if (settings.openBaseEntity === true) {
        if (DRB.Utilities.HasValue(settings.defaultEntityType)) {
            lookupOptions = { defaultEntityType: settings.defaultEntityType, entityTypes: [settings.defaultEntityType], allowMultiSelect: false };
        }
    }

    // if lookupOptions is valid show the selection, otherwise show the error
    if (DRB.Utilities.HasValue(lookupOptions)) {
        // XTB Mode
        if (DRB.Xrm.IsXTBMode()) {
            DRB.UI.Show("XrmToolBox Mode", "Lookup is not available inside XrmToolBox.<br />A random Guid has been generated.");
            $("#" + settings.textId).val(DRB.Utilities.GenerateGuid()).trigger("input").change();
            return;
        }

        // JWT Mode
        if (DRB.Xrm.IsJWTMode()) {
            DRB.UI.Show("JWT Mode", "Lookup is not available in JWT Mode.<br />A random Guid has been generated.");
            $("#" + settings.textId).val(DRB.Utilities.GenerateGuid()).trigger("input").change();
            return;
        }

        // DVDT Mode
        if (DRB.Xrm.IsDVDTMode()) {
            DRB.UI.Show("DVDT Mode", "Lookup is not available inside DVDT.<br />A random Guid has been generated.");
            $("#" + settings.textId).val(DRB.Utilities.GenerateGuid()).trigger("input").change();
            return;
        }

        // Demo Mode
        if (DRB.Xrm.IsDemoMode()) {
            DRB.UI.Show("Demo Mode", "Lookup is not available in Demo Mode.<br />A random Guid has been generated.");
            $("#" + settings.textId).val(DRB.Utilities.GenerateGuid()).trigger("input").change();
            return;
        }

        DRB.Xrm.GetXrmObject().Utility.lookupObjects(lookupOptions).then(
            function (success) {
                if (success.length > 0) {
                    $("#" + settings.textId).val(success[0].id).trigger("input").change();
                    if (DRB.Utilities.HasValue(settings.dropdownId)) {
                        $("#" + settings.dropdownId).val(success[0].entityType).change();
                        DRB.UI.RefreshDropdown(settings.dropdownId);
                    }
                }
            },
            function (error) { DRB.UI.ShowError("Xrm.Utility.lookupObjects Error", error); });
    } else {
        DRB.UI.ShowError("Table not selected", "Please select a Table first");
    }
}
// #endregion
// #endregion