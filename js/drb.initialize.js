// #region DRB.Initialize
/**
 * Set Default Settings
 */
DRB.SetDefaultSettings = function () {
    // #region Request Types
    var requests = [{ Id: "retrievesingle", Name: "Retrieve Single" },
    { Id: "retrievemultiple", Name: "Retrieve Multiple" },
    { Id: "create", Name: "Create" },
    { Id: "update", Name: "Update" },
    { Id: "delete", Name: "Delete" },
    { Id: "associate", Name: "Associate" },
    { Id: "disassociate", Name: "Disassociate" },
    { Id: "retrievenextlink", Name: "Retrieve NextLink" },
    { Id: "predefinedquery", Name: "Predefined Query" },
    { Id: "executecustomapi", Name: "Execute Custom API" },
    { Id: "executecustomaction", Name: "Execute Custom Action" },
    { Id: "executeaction", Name: "Execute Action" },
    { Id: "executefunction", Name: "Execute Function" },
    { Id: "executeworkflow", Name: "Execute Workflow" }];
    DRB.Settings.RequestTypes = [];
    requests.forEach(function (request) { DRB.Settings.RequestTypes.push(new DRB.Models.IdValue(request.Id, request.Name)); });
    // #endregion

    // #region Versions
    var versions = ["9.0", "9.1", "9.2"];
    var currentVersion = DRB.Xrm.GetVersion();
    DRB.Settings.Versions = [];
    for (var versionCount = 0; versionCount < versions.length; versionCount++) {
        DRB.Settings.Versions.push(new DRB.Models.IdValue("v" + versions[versionCount], versions[versionCount]));
        if (!DRB.Utilities.HasValue(currentVersion) || currentVersion === versions[versionCount]) { break; }
    }
    // #endregion

    // #region General
    DRB.Settings.OptionsAyncSync = [new DRB.Models.IdValue("yes", "Asynchronous"), new DRB.Models.IdValue("no", "Synchronous")];
    DRB.Settings.OptionsYesNo = [new DRB.Models.IdValue("yes", "Yes"), new DRB.Models.IdValue("no", "No")];
    DRB.Settings.OptionsViews = [new DRB.Models.IdValue("savedquery", "System View"), new DRB.Models.IdValue("userquery", "Personal View"), new DRB.Models.IdValue("fetchxml", "FetchXML")]; // Predefined Query
    DRB.Settings.OptionsPrevent = [new DRB.Models.IdValue("none", "None"), new DRB.Models.IdValue("create", "Prevent Create"), new DRB.Models.IdValue("update", "Prevent Update")]; // Update
    DRB.Settings.OptionsOrder = [new DRB.Models.IdValue("asc", "Ascending"), new DRB.Models.IdValue("desc", "Descending")]; // Retrieve Multiple
    DRB.Settings.OptionsAndOr = [new DRB.Models.IdValue("and", "And"), new DRB.Models.IdValue("or", "Or")]; // Retrieve Multiple
    DRB.Settings.OptionsTrueFalse = [new DRB.Models.IdValue("yes", "True"), new DRB.Models.IdValue("no", "False")]; // Dataverse Execute
    // #endregion

    // #region Operators
    var optNeNull = new DRB.Models.IdValue("ne null", "Contains Data");
    var optEqNull = new DRB.Models.IdValue("eq null", "Does Not Contain Data");

    var optEq = new DRB.Models.IdValue("eq", "Equals");
    var optNe = new DRB.Models.IdValue("ne", "Does Not Equal");

    var optContain = new DRB.Models.IdValue("contains", "Contains");
    var optNotContain = new DRB.Models.IdValue("not contains", "Does Not Contain");

    var optBegin = new DRB.Models.IdValue("startswith", "Begins With");
    var optNotBegin = new DRB.Models.IdValue("not startswith", "Does Not Begin With");

    var optEnd = new DRB.Models.IdValue("endswith", "Ends With");
    var optNotEnd = new DRB.Models.IdValue("not endswith", "Does Not End With");

    var optGreater = new DRB.Models.IdValue("gt", "Is Greater Than");
    var optGreaterEqual = new DRB.Models.IdValue("ge", "Is Greater Than or Equal To");
    var optLess = new DRB.Models.IdValue("lt", "Is Less Than");
    var optLessEqual = new DRB.Models.IdValue("le", "Is Less Than or Equal To");

    var optOn = new DRB.Models.IdValue("eq", "On");
    var optNotOn = new DRB.Models.IdValue("ne", "Not On");
    var optAfter = new DRB.Models.IdValue("gt", "After");
    var optOnOrAfter = new DRB.Models.IdValue("ge", "On or After");
    var optBefore = new DRB.Models.IdValue("lt", "Before");
    var optOnOrBefore = new DRB.Models.IdValue("le", "On or Before");

    var optIn = new DRB.Models.IdValue("In", "Equals");
    var optNotIn = new DRB.Models.IdValue("NotIn", "Does Not Equal");
    var optContainValues = new DRB.Models.IdValue("ContainValues", "Contain Values");
    var optNotContainValues = new DRB.Models.IdValue("DoesNotContainValues", "Does Not Contain Values");

    DRB.Settings.OptionsOperatorBasic = [optEq, optNe, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorString = [optEq, optNe, optContain, optNotContain, optBegin, optNotBegin, optEnd, optNotEnd, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorMemo = [optContain, optNotContain, optBegin, optNotBegin, optEnd, optNotEnd, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorPicklist = [optEq, optNe, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorMultiPicklist = [optIn, optNotIn, optContainValues, optNotContainValues, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorNumber = [optEq, optNe, optGreater, optGreaterEqual, optLess, optLessEqual, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorDateTime = [optOn, optNotOn, optAfter, optOnOrAfter, optBefore, optOnOrBefore, optNeNull, optEqNull];
    // #endregion

    // #region Postman Export Settings
    DRB.Settings.PostmanGrantType = [new DRB.Models.IdValue("implicit", "Implicit"), new DRB.Models.IdValue("client_credentials", "Client Credentials")];
    DRB.Settings.PostmanScopeType = [new DRB.Models.IdValue("empty", "Empty"), new DRB.Models.IdValue("default", "Dataverse Default")];
    // #endregion

    DRB.Settings.TimeoutDelay = 500; // used in the setTimout calls

    // Default Metadata
    DRB.Metadata.CurrentNode = null; // set CurrentNode as null
    DRB.Metadata.DataverseCustomAPIsLoaded = false; // set DataverseCustomAPILoaded as false
    DRB.Metadata.DataverseCustomActionsLoaded = false; // set DataverseCustomActionLoaded as false
    DRB.Metadata.DataverseMetadataLoaded = false; // set DataverseMetadataLoaded as false
}

/**
 * Define Operations
 */
DRB.DefineOperations = function () {
    // #region Menu
    var inp_LoadFile = DRB.UI.CreateInputFile(DRB.DOM.Collection.LoadInput.Id, true, DRB.Collection.Parse);
    var btn_NewCollection = DRB.UI.CreateButton(DRB.DOM.Collection.NewButton.Id, DRB.DOM.Collection.NewButton.Name, DRB.DOM.Collection.NewButton.Class, DRB.Collection.New);
    var btn_LoadCollection = DRB.UI.CreateButton(DRB.DOM.Collection.LoadButton.Id, DRB.DOM.Collection.LoadButton.Name, DRB.DOM.Collection.LoadButton.Class, DRB.Collection.Load);
    var btn_SaveCollection = DRB.UI.CreateButton(DRB.DOM.Collection.SaveButton.Id, DRB.DOM.Collection.SaveButton.Name, DRB.DOM.Collection.SaveButton.Class, DRB.Collection.Save);
    var btn_ExportPostmanCollection = DRB.UI.CreateButton(DRB.DOM.Collection.ExportPostmanButton.Id, DRB.DOM.Collection.ExportPostmanButton.Name, DRB.DOM.Collection.ExportPostmanButton.Class, DRB.Collection.ExportPostman);

    var menu = $("#" + DRB.DOM.Collection.Menu.Id);
    menu.append(inp_LoadFile);
    menu.append(btn_NewCollection);
    menu.append(btn_LoadCollection);
    menu.append(btn_SaveCollection);
    menu.append(DRB.UI.CreateEmptyDiv(DRB.DOM.Collection.Separator.Id, DRB.DOM.Collection.Separator.Class));
    menu.append(btn_ExportPostmanCollection);
    // #endregion

    // #region jsTree
    $("#" + DRB.DOM.TreeView.Id).jstree({
        "core": { "data": [], "themes": { "dots": false }, "check_callback": true }, // default settings
        "contextmenu": { // right click menu
            "select_node": false,
            "items": function (node) {
                var customItems = {
                    "createrequest": {
                        "label": "Create Request",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            inst.create_node(obj, { "type": "request", "text": "New Request" }, "last", function (new_node) {
                                try { inst.edit(new_node); } catch (ex) { setTimeout(function () { inst.edit(new_node); }, 0); }
                            });
                        }
                    },
                    "createfolder": {
                        "label": "Create Folder",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            inst.create_node(obj, { "type": "folder", "text": "New Folder" }, "last", function (new_node) {
                                try { inst.edit(new_node); } catch (ex) { setTimeout(function () { inst.edit(new_node); }, 0); }
                            });
                        }
                    },
                    "duplicaterequest": {
                        "label": "Duplicate",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            var position = $.inArray(obj.id, inst.get_node(obj.parent).children);
                            inst.create_node(obj.parent, { "type": "request", "data": obj.data, "text": obj.text + " - Copy" }, position + 1);
                        }
                    },
                    "duplicatefolder": {
                        "label": "Duplicate",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            var position = $.inArray(obj.id, inst.get_node(obj.parent).children);
                            inst.create_node(obj.parent, { "type": "folder", "text": obj.text + " - Copy" }, position + 1, function (new_node) {
                                function deep_duplicate(childNode, parentNode) {
                                    if (childNode.children.length === 0) { return; }
                                    for (var count = 0; count < childNode.children.length; count++) {
                                        var objChild = inst.get_node(childNode.children[count]);
                                        inst.create_node(parentNode, { "type": objChild.type, "data": objChild.data, "text": objChild.text });
                                        deep_duplicate(inst.get_node(childNode.children[count]), inst.get_node(parentNode.children[count]));
                                    }
                                }
                                deep_duplicate(obj, new_node);
                            });
                        }
                    },
                    "rename": {
                        "label": "Rename",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            inst.edit(obj);
                        }
                    },
                    "remove": {
                        "label": "Delete",
                        "action": function (data) {
                            var questionTitle = "";
                            var questionText = "";
                            switch (node.type) {
                                case "folder":
                                    questionTitle = "Delete Folder";
                                    questionText = "Are you sure to delete the folder <b>" + node.text + "</b>?<br/><u>All the folders and requests inside this folder will be deleted</u>";
                                    break;
                                case "request":
                                    questionTitle = "Delete Request";
                                    questionText = "Are you sure to delete the request <b>" + node.text + "</b>?";
                                    break;
                            }
                            DRB.UI.ShowQuestion(questionTitle, questionText, null,
                                function () {
                                    var inst = $.jstree.reference(data.reference);
                                    var obj = inst.get_node(data.reference);
                                    if (inst.is_selected(obj)) { inst.delete_node(inst.get_selected()); } else { inst.delete_node(obj); }
                                });
                        }
                    }
                };
                // delete entries based on the node type
                if (node.type === "collection") { delete customItems.duplicaterequest; delete customItems.duplicatefolder; delete customItems.remove; }
                if (node.type === "folder") { delete customItems.duplicaterequest; }
                if (node.type === "request") { delete customItems.createfolder; delete customItems.duplicatefolder; delete customItems.createrequest; }
                return customItems;
            }
        },
        "types": { // node types
            "#": { "valid_children": ["collection"] }, // "root" can have only "collection" nodes
            "collection": { "icon": "hide-icon", "valid_children": ["folder", "request"] }, // "collection" can have only "folder" and "request" nodes, no icon
            "folder": { "valid_children": ["folder", "request"] }, // "folder" can have only "folder" and "request" nodes, default icon
            "request": { "icon": "jstree-file", "valid_children": [] } // "request" can't have nodes, file icon
        },
        "plugins": ["dnd", "types", "contextmenu"] // drag and drop, node types, right click menu 
    });

    $("#" + DRB.DOM.TreeView.Id).on("select_node.jstree", function (e, data) {
        data.instance.toggle_node(data.selected);  // single click to expand
        DRB.Logic.EditRequest(data.node);
    });

    $("#" + DRB.DOM.TreeView.Id).on("rename_node.jstree", function (e, obj) {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode)) {
            if (DRB.Metadata.CurrentNode.type === "request" && DRB.Metadata.CurrentNode.id === obj.node.id) {
                $("#" + DRB.DOM.RequestType.Div.Id).text(obj.node.text);
            }
        }
    });

    $("#" + DRB.DOM.TreeView.Id).on("delete_node.jstree", function (e, obj) {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode)) {
            if (DRB.Metadata.CurrentNode.id === obj.node.id || DRB.Metadata.CurrentNode.parents.indexOf(obj.node.id) > -1) {
                DRB.Metadata.CurrentNode = null;
                $("#" + DRB.DOM.MainContent.Id).hide();
            }
        }
    });
    // #endregion

    // #region Request Type
    var container = DRB.UI.CreateWideContainerWithId(DRB.DOM.RequestType.Div.Id, DRB.DOM.RequestType.Div.Name);
    $("#" + DRB.DOM.MainContent.Id).append(container);
    container.append(DRB.UI.CreateSpan(DRB.DOM.RequestType.Span.Id, DRB.DOM.RequestType.Span.Name));
    container.append(DRB.UI.CreateSimpleDropdown(DRB.DOM.RequestType.Dropdown.Id));
    container.append(DRB.UI.CreateSpacer());
    DRB.UI.FillDropdown(DRB.DOM.RequestType.Dropdown.Id, DRB.DOM.RequestType.Dropdown.Name, new DRB.Models.Records(DRB.Settings.RequestTypes).ToDropdown(), false, false, false, 15);
    DRB.Logic.BindRequestType(DRB.DOM.RequestType.Dropdown.Id);
    // #endregion

    // #region Tabs
    DRB.Settings.Tabs = [];
    DRB.Settings.Tabs.push({ id: "configure", name: "Configure" });
    DRB.Settings.Tabs.push({ id: "code_xrmwebapi", name: "Xrm.WebApi" });
    DRB.Settings.Tabs.push({ id: "code_xrmwebapiexecute", name: "Xrm.WebApi execute" });
    DRB.Settings.Tabs.push({ id: "code_jquery", name: "jQuery" });
    DRB.Settings.Tabs.push({ id: "code_xmlhttprequest", name: "XMLHttpRequest" });
    DRB.Settings.Tabs.push({ id: "code_portals", name: "Portals" });
    DRB.Settings.Tabs.push({ id: "code_editor", name: "Editor" });
    DRB.Settings.Tabs.push({ id: "code_results", name: "Results" });

    var tabs_Request = DRB.UI.CreateTabs(DRB.DOM.TabsRequest.Id, DRB.Settings.Tabs);
    var tabs_Content = DRB.UI.CreateTabContents(DRB.DOM.TabsContent.Id, DRB.Settings.Tabs, "code_editor");

    $("#" + DRB.DOM.MainContent.Id).append(tabs_Request);
    $("#" + DRB.DOM.MainContent.Id).append(tabs_Content);

    DRB.Settings.Tabs.forEach(function (tab, tabIndex) {
        var spacer = DRB.UI.CreateSpacer();
        $("#" + tab.id).append(spacer);
        if (tabIndex > 0) {
            if (tabIndex < 6) {
                var btn_copyCode = DRB.UI.CreateButton("btn_" + tab.id + "_copy", "Copy Code", "btn-secondary", DRB.Logic.CopyCodeFromEditor, tab.id);
                var btn_moveCode = DRB.UI.CreateButton("btn_" + tab.id + "_move", "Move Code to Editor", "btn-secondary", DRB.Logic.MoveCodeToMainEditor, tab.id);

                $("#" + tab.id).append(btn_copyCode);
                $("#" + tab.id).append(btn_moveCode);
                if (tab.id === "code_portals") {
                    var span_warning_portals = DRB.UI.CreateSpan("span_warning_portals", "NOTE: Inside DRB, Portals endpoint (<i>/_api/</i>) is routed to the default Web API endpoint");
                    $("#" + tab.id).append(span_warning_portals);
                }
                $("#" + tab.id).append(DRB.UI.CreateSpacer());
            }

            if (tabIndex === 6) {
                var btn_copyCode = DRB.UI.CreateButton("btn_" + tab.id + "_copy", "Copy Code", "btn-secondary", DRB.Logic.CopyCodeFromEditor, tab.id);
                var btn_executeCode = DRB.UI.CreateButton("btn_" + tab.id + "_execute", "Execute Code", "btn-danger", DRB.Logic.ExecuteCodeFromEditor);
                var span_warning_editor = DRB.UI.CreateSpan("span_warning_editor", "NOTE: console.log messages will appear inside the Results tab");
                $("#" + tab.id).append(btn_copyCode);
                $("#" + tab.id).append(btn_executeCode);
                $("#" + tab.id).append(span_warning_editor);
                $("#" + tab.id).append(DRB.UI.CreateSpacer());
            }

            if (tabIndex === 7) {
                var btn_copyResults = DRB.UI.CreateButton("btn_" + tab.id + "_copy", "Copy Results", "btn-secondary", DRB.Logic.CopyCodeFromEditor, tab.id);
                var span_warning_result = DRB.UI.CreateSpan("span_warning_result", "NOTE: Due to asynchronous calls the output can appear later");
                $("#" + tab.id).append(btn_copyResults);
                $("#" + tab.id).append(span_warning_result);
                $("#" + tab.id).append(DRB.UI.CreateSpacer());
            }

            var divEditor = DRB.UI.CreateEmptyDiv(tab.id + "_editor", "code_editor");
            $("#" + tab.id).append(divEditor);
        } else {
            var divEditor = DRB.UI.CreateEmptyDiv(tab.id + "_settings");
            $("#" + tab.id).append(divEditor);
        }
    });
    // #endregion

    // #region Editors
    DRB.Settings.XrmWebApiEditor = ace.edit("code_xrmwebapi_editor", { useWorker: false });
    DRB.Settings.XrmWebApiEditor.session.setMode("ace/mode/javascript");
    DRB.Settings.XrmWebApiEditor.setShowPrintMargin(false);
    DRB.Settings.XrmWebApiEditor.setOptions({ readOnly: true });

    DRB.Settings.XrmWebApiExecuteEditor = ace.edit("code_xrmwebapiexecute_editor", { useWorker: false });
    DRB.Settings.XrmWebApiExecuteEditor.session.setMode("ace/mode/javascript");
    DRB.Settings.XrmWebApiExecuteEditor.setShowPrintMargin(false);
    DRB.Settings.XrmWebApiExecuteEditor.setOptions({ readOnly: true });

    DRB.Settings.jQueryEditor = ace.edit("code_jquery_editor", { useWorker: false });
    DRB.Settings.jQueryEditor.session.setMode("ace/mode/javascript");
    DRB.Settings.jQueryEditor.setShowPrintMargin(false);
    DRB.Settings.jQueryEditor.setOptions({ readOnly: true });

    DRB.Settings.XMLHttpRequestEditor = ace.edit("code_xmlhttprequest_editor", { useWorker: false });
    DRB.Settings.XMLHttpRequestEditor.session.setMode("ace/mode/javascript");
    DRB.Settings.XMLHttpRequestEditor.setShowPrintMargin(false);
    DRB.Settings.XMLHttpRequestEditor.setOptions({ readOnly: true });

    DRB.Settings.PortalsEditor = ace.edit("code_portals_editor", { useWorker: false });
    DRB.Settings.PortalsEditor.session.setMode("ace/mode/javascript");
    DRB.Settings.PortalsEditor.setShowPrintMargin(false);
    DRB.Settings.PortalsEditor.setOptions({ readOnly: true });

    DRB.Settings.MainEditor = ace.edit("code_editor_editor", { useWorker: false });
    DRB.Settings.MainEditor.session.setMode("ace/mode/javascript");
    DRB.Settings.MainEditor.setShowPrintMargin(false);
    //DRB.Settings.MainEditor.setOptions({ maxLines: Infinity });

    DRB.Settings.ResultsEditor = ace.edit("code_results_editor", { useWorker: false });
    DRB.Settings.ResultsEditor.session.setMode("ace/mode/json");
    DRB.Settings.ResultsEditor.setShowPrintMargin(false);
    DRB.Settings.ResultsEditor.setOptions({ readOnly: true });
    // #endregion
}

/**
 * Hide Notice
 */
DRB.HideNotice = function () {
    $("#div_notice").hide();
    $("#btn_notice").attr("onclick", "DRB.ShowNotice()").text("Show Notice");
}

/**
 * Show Notice
 */
DRB.ShowNotice = function () {
    $("#div_notice").fadeIn();
    $("#btn_notice").attr("onclick", "DRB.HideNotice()").text("Hide Notice");
}

/**
 * Main function called by the Index
 */
DRB.Initialize = function () {
    if (DRB.Xrm.IsDemoMode()) { $("#demo").html("(Demo)"); }
    DRB.HideNotice();
    DRB.SetDefaultSettings();
    DRB.DefineOperations();
    // Split
    Split(['#div_menu', '#div_content'], { sizes: [10, 90], minSize: 200, gutterSize: 5 });
    // Tab script
    $(document).ready(function () {
        $("#" + DRB.DOM.TabsRequest.Id + " a").click(function (e) {
            e.preventDefault();
            switch (e.target.id) {
                case "a_code_xrmwebapi":
                case "a_code_xrmwebapiexecute":
                case "a_code_jquery":
                case "a_code_xmlhttprequest":
                case "a_code_portals": DRB.GenerateCode.Start(); break;
            }
            $(this).tab('show');
        });
    });

    // retrieve Tables and add them to DRB.Metadata.Tables
    DRB.Logic.RefreshTables();
}
// #endregion