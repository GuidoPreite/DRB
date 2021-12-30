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
    { Id: "executeworkflow", Name: "Execute Workflow" },
    { Id: "managefiledata", Name: "Manage File Data" },
    { Id: "manageimagedata", Name: "Manage Image Data" }];
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
    DRB.Settings.OptionsManageFile = [new DRB.Models.IdValue("retrieve", "Retrieve"), new DRB.Models.IdValue("upload", "Upload"), new DRB.Models.IdValue("delete", "Delete")]; // Manage File Data
    DRB.Settings.OptionsImpersonation = [new DRB.Models.IdValue("mscrmcallerid", "SystemUser Id"), new DRB.Models.IdValue("callerobjectid", "AAD Object Id")]; // Impersonation
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

    var optEqCurrentUser = new DRB.Models.IdValue("EqualUserId", "Equals Current User");
    var optNeCurrentUser = new DRB.Models.IdValue("NotEqualUserId", "Does Not Equal Current User");
    var optEqCurrentUserHierarchy = new DRB.Models.IdValue("EqualUserOrUserHierarchy", "Equals Current User Or Their Reporting Hierarchy");
    var optEqCurrentUserHierarchyAndTeams = new DRB.Models.IdValue("EqualUserOrUserHierarchyAndTeams", "Equals Current User And Their Teams Or Their Reporting Hierarchy And Their Teams");
    var optEqCurrentUserTeams = new DRB.Models.IdValue("EqualUserTeams", "Equals Current User's Teams");
    var optEqCurrentUserOrTeams = new DRB.Models.IdValue("EqualUserOrUserTeams", "Equals Current User Or User's Teams");
    var optEqCurrentBusinessUnit = new DRB.Models.IdValue("EqualBusinessId", "Equals Current Business Unit");
    var optNeCurrentBusinessUnit = new DRB.Models.IdValue("NotEqualBusinessId", "Does Not Equal Business Unit");

    // Datetime operators (no required value)
    var optYesterday = new DRB.Models.IdValue("Yesterday", "Yesterday");
    var optToday = new DRB.Models.IdValue("Today", "Today");
    var optTomorrow = new DRB.Models.IdValue("Tomorrow", "Tomorrow");
    var optNext7Days = new DRB.Models.IdValue("Next7Days", "Next 7 Days");
    var optLast7Days = new DRB.Models.IdValue("Last7Days", "Last 7 Days");
    var optNextWeek = new DRB.Models.IdValue("NextWeek", "Next Week");
    var optLastWeek = new DRB.Models.IdValue("LastWeek", "Last Week");
    var optThisWeek = new DRB.Models.IdValue("ThisWeek", "This Week");
    var optNextMonth = new DRB.Models.IdValue("NextMonth", "Next Month");
    var optLastMonth = new DRB.Models.IdValue("LastMonth", "Last Month");
    var optThisMonth = new DRB.Models.IdValue("ThisMonth", "This Month");
    var optNextYear = new DRB.Models.IdValue("NextYear", "Next Year");
    var optLastYear = new DRB.Models.IdValue("LastYear", "Last Year");
    var optThisYear = new DRB.Models.IdValue("ThisYear", "This Year");
    var optNextFiscalYear = new DRB.Models.IdValue("NextFiscalYear", "Next Fiscal Year");
    var optLastFiscalYear = new DRB.Models.IdValue("LastFiscalYear", "Last Fiscal Year");
    var optThisFiscalYear = new DRB.Models.IdValue("ThisFiscalYear", "This Fiscal Year");
    var optNextFiscalPeriod = new DRB.Models.IdValue("NextFiscalPeriod", "Next Fiscal Period");
    var optLastFiscalPeriod = new DRB.Models.IdValue("LastFiscalPeriod", "Last Fiscal Period");
    var optThisFiscalPeriod = new DRB.Models.IdValue("ThisFiscalPeriod", "This Fiscal Period");

    // Datetime operators (required value)
    var optNextXHours = new DRB.Models.IdValue("NextXHours", "Next X Hours");
    var optLastXHours = new DRB.Models.IdValue("LastXHours", "Last X Hours");
    var optNextXDays = new DRB.Models.IdValue("NextXDays", "Next X Days");
    var optLastXDays = new DRB.Models.IdValue("LastXDays", "Last X Days");
    var optNextXWeeks = new DRB.Models.IdValue("NextXWeeks", "Next X Weeks");
    var optLastXWeeks = new DRB.Models.IdValue("LastXWeeks", "Last X Weeks");
    var optNextXMonths = new DRB.Models.IdValue("NextXMonths", "Next X Months");
    var optLastXMonths = new DRB.Models.IdValue("LastXMonths", "Last X Months");
    var optNextXYears = new DRB.Models.IdValue("NextXYears", "Next X Years");
    var optLastXYears = new DRB.Models.IdValue("LastXYears", "Last X Years");
    var optNextXFiscalYears = new DRB.Models.IdValue("NextXFiscalYears", "Next X Fiscal Years");
    var optLastXFiscalYears = new DRB.Models.IdValue("LastXFiscalYears", "Last X Fiscal Years");
    var optNextXFiscalPeriods = new DRB.Models.IdValue("NextXFiscalPeriods", "Next X Fiscal Periods");
    var optLastXFiscalPeriods = new DRB.Models.IdValue("LastXFiscalPeriods", "Last X Fiscal Periods");
    var optOlderThanXMinutes = new DRB.Models.IdValue("OlderThanXMinutes", "Older Than X Minutes");
    var optOlderThanXHours = new DRB.Models.IdValue("OlderThanXHours", "Older Than X Hours");
    var optOlderThanXDays = new DRB.Models.IdValue("OlderThanXDays", "Older Than X Days");
    var optOlderThanXWeeks = new DRB.Models.IdValue("OlderThanXWeeks", "Older Than X Weeks");
    var optOlderThanXMonths = new DRB.Models.IdValue("OlderThanXMonths", "Older Than X Months");
    var optOlderThanXYears = new DRB.Models.IdValue("OlderThanXYears", "Older Than X Years");

    // Hierarchy Primary Key operators
    var optAbove = new DRB.Models.IdValue("Above", "Above");
    var optAboveOrEqual = new DRB.Models.IdValue("AboveOrEqual", "Above Or Equals");
    var optNotUnder = new DRB.Models.IdValue("NotUnder", "Not Under");
    var optUnder = new DRB.Models.IdValue("Under", "Under");
    var optUnderOrEqual = new DRB.Models.IdValue("UnderOrEqual", "Under Or Equals");

    DRB.Settings.OptionsOperatorBasic = [optEq, optNe, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorHierarchyPrimaryKey = [optEq, optNe, optNeNull, optEqNull, optAbove, optAboveOrEqual, optNotUnder, optUnder, optUnderOrEqual];
    DRB.Settings.OptionsOperatorLookupBusinessUnit = [optEq, optNe, optNeNull, optEqNull, optEqCurrentBusinessUnit, optNeCurrentBusinessUnit];
    DRB.Settings.OptionsOperatorLookupUser = [optEq, optNe, optNeNull, optEqNull, optEqCurrentUser, optNeCurrentUser];
    DRB.Settings.OptionsOperatorOwner = [optEq, optNe, optNeNull, optEqNull, optEqCurrentUser, optNeCurrentUser, optEqCurrentUserHierarchy, optEqCurrentUserHierarchyAndTeams, optEqCurrentUserTeams, optEqCurrentUserOrTeams];
    DRB.Settings.OptionsOperatorString = [optEq, optNe, optContain, optNotContain, optBegin, optNotBegin, optEnd, optNotEnd, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorMemo = [optContain, optNotContain, optBegin, optNotBegin, optEnd, optNotEnd, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorPicklist = [optEq, optNe, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorMultiPicklist = [optIn, optNotIn, optContainValues, optNotContainValues, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorNumber = [optEq, optNe, optGreater, optGreaterEqual, optLess, optLessEqual, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorDateTime = [optOn, optNotOn, optAfter, optOnOrAfter, optBefore, optOnOrBefore, optNeNull, optEqNull,
        optYesterday, optToday, optTomorrow, optNext7Days, optLast7Days, optNextWeek, optLastWeek, optThisWeek, optNextMonth, optLastMonth, optThisMonth, optNextYear, optLastYear, optThisYear, optNextFiscalYear, optLastFiscalYear, optThisFiscalYear, optNextFiscalPeriod, optLastFiscalPeriod, optThisFiscalPeriod,
        optNextXHours, optLastXHours, optNextXDays, optLastXDays, optNextXWeeks, optLastXWeeks, optNextXMonths, optLastXMonths, optNextXYears, optLastXYears, optNextXFiscalYears, optLastXFiscalYears, optNextXFiscalPeriods, optLastXFiscalPeriods,
        optOlderThanXMinutes, optOlderThanXHours, optOlderThanXDays, optOlderThanXWeeks, optOlderThanXMonths, optOlderThanXYears];

    DRB.Settings.OperatorsToStop = [optNeNull, optEqNull, optEqCurrentUser, optNeCurrentUser, optEqCurrentUserHierarchy, optEqCurrentUserHierarchyAndTeams, optEqCurrentUserTeams, optEqCurrentUserOrTeams, optEqCurrentBusinessUnit, optNeCurrentBusinessUnit,
        optYesterday, optToday, optTomorrow, optNext7Days, optLast7Days, optNextWeek, optLastWeek, optThisWeek, optNextMonth, optLastMonth, optThisMonth, optNextYear, optLastYear, optThisYear, optNextFiscalYear, optLastFiscalYear, optThisFiscalYear, optNextFiscalPeriod, optLastFiscalPeriod, optThisFiscalPeriod];
    // #endregion

    // #region Postman Export Settings
    DRB.Settings.PostmanGrantType = [new DRB.Models.IdValue("implicit", "Implicit"), new DRB.Models.IdValue("client_credentials", "Client Credentials")];
    DRB.Settings.PostmanEndpoint = [new DRB.Models.IdValue("v1", "Token Endpoint V1"), new DRB.Models.IdValue("v2", "Token Endpoint V2")];
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
                                case "collection":
                                    questionTitle = "Delete Collection";
                                    questionText = "Are you sure to delete the collection?<br/><u>All the folders and requests will be deleted</u>";
                                    break;
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
                                    if (node.type === "collection" && DRB.Settings.LocalStorageAvailable === true) {
                                        localStorage.removeItem("DRB_" + DRB.Xrm.GetClientUrl());
                                    }
                                });
                        }
                    },
                    "savestate": {
                        "separator_before": true,
                        "label": "Save State",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var currentNodes = inst.get_json("#");
                            var now = new Date(); // get current DateTime
                            var collection = {}; // create json collection
                            collection.created_on = now.toJSON(); // current DateTime as json 
                            collection.version = 1; // collection version                            
                            DRB.Collection.ExportNodes(currentNodes[0], collection); // export jsTree nodes to the json collection
                            localStorage.setItem("DRB_" + DRB.Xrm.GetClientUrl(), JSON.stringify(collection));
                        }
                    }
                };
                // delete entries based on the node type
                if (node.type === "collection") {
                    delete customItems.duplicaterequest; delete customItems.duplicatefolder;
                    if (DRB.Settings.LocalStorageAvailable !== true) {
                        delete customItems.savestate;
                    }
                }
                if (node.type === "folder") { delete customItems.duplicaterequest; delete customItems.savestate; }
                if (node.type === "request") { delete customItems.createfolder; delete customItems.duplicatefolder; delete customItems.createrequest; delete customItems.savestate; }
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
    DRB.UI.FillDropdown(DRB.DOM.RequestType.Dropdown.Id, DRB.DOM.RequestType.Dropdown.Name, new DRB.Models.Records(DRB.Settings.RequestTypes).ToDropdown(), false, false, false, 16);
    DRB.Logic.BindRequestType(DRB.DOM.RequestType.Dropdown.Id);
    // #endregion

    // #region Tabs
    DRB.Settings.Tabs = [];
    DRB.Settings.Tabs.push({ id: "configure", name: "Configure" });
    DRB.Settings.Tabs.push({ id: "code_xrmwebapi", name: "Xrm.WebApi" });
    DRB.Settings.Tabs.push({ id: "code_xrmwebapiexecute", name: "Xrm.WebApi execute" });
    DRB.Settings.Tabs.push({ id: "code_fetchapi", name: "Fetch" });
    DRB.Settings.Tabs.push({ id: "code_jquery", name: "jQuery" });
    DRB.Settings.Tabs.push({ id: "code_xmlhttprequest", name: "XHR" });
    DRB.Settings.Tabs.push({ id: "code_portals", name: "Portals" });
    DRB.Settings.Tabs.push({ id: "code_editor", name: "Editor" });
    DRB.Settings.Tabs.push({ id: "code_results", name: "Results" });
    DRB.Settings.Tabs.push({ id: "code_powerautomate", name: "Power Automate" });

    var tabs_Request = DRB.UI.CreateTabs(DRB.DOM.TabsRequest.Id, DRB.Settings.Tabs);
    var tabs_Content = DRB.UI.CreateTabContents(DRB.DOM.TabsContent.Id, DRB.Settings.Tabs, "code_editor");

    $("#" + DRB.DOM.MainContent.Id).append(tabs_Request);
    $("#" + DRB.DOM.MainContent.Id).append(tabs_Content);

    DRB.Settings.Tabs.forEach(function (tab, tabIndex) {
        var spacer = DRB.UI.CreateSpacer();
        $("#" + tab.id).append(spacer);
        if (tabIndex > 0) {
            if (tabIndex < 7) {
                var btn_copyCode = DRB.UI.CreateButton("btn_" + tab.id + "_copy", "Copy Code", "btn-secondary", DRB.Logic.CopyCodeFromEditor, tab.id);
                var btn_moveCode = DRB.UI.CreateButton("btn_" + tab.id + "_move", "Move Code to Editor", "btn-secondary", DRB.Logic.MoveCodeToMainEditor, tab.id);

                $("#" + tab.id).append(btn_copyCode);
                $("#" + tab.id).append(btn_moveCode);

                if (DRB.Xrm.IsXTBMode()) {
                    if (tab.id === "code_xrmwebapi" || tab.id === "code_xrmwebapiexecute") {
                        var span_warning_xrmwebapi_xtb = DRB.UI.CreateSpan("span_warning_xrmwebapi_xtb", "NOTE: Xrm.WebApi is not available when DRB is executed inside XrmToolBox");
                        $("#" + tab.id).append(span_warning_xrmwebapi_xtb);
                    }

                    if (tab.id === "code_fetchapi" || tab.id === "code_jquery" || tab.id === "code_xmlhttprequest") {
                        var span_warning_jqueryxhr_xtb = DRB.UI.CreateSpan("span_warning_jqueryxhr_xtb", "NOTE: Inside DRB for XrmToolBox, Xrm.Utility.getGlobalContext().getClientUrl() is routed to the Instance URL");
                        $("#" + tab.id).append(span_warning_jqueryxhr_xtb);
                    }
                }

                if (DRB.Xrm.IsJWTMode()) {
                    if (tab.id === "code_xrmwebapi" || tab.id === "code_xrmwebapiexecute") {
                        var span_warning_xrmwebapi_jwt = DRB.UI.CreateSpan("span_warning_xrmwebapi_jwt", "NOTE: Xrm.WebApi is not available when DRB is in JWT Mode");
                        $("#" + tab.id).append(span_warning_xrmwebapi_jwt);
                    }

                    if (tab.id === "code_fetchapi" || tab.id === "code_jquery" || tab.id === "code_xmlhttprequest") {
                        var span_warning_jqueryxhr_jwt = DRB.UI.CreateSpan("span_warning_jqueryxhr_jwt", "NOTE: Inside DRB JWT Mode, Xrm.Utility.getGlobalContext().getClientUrl() is routed to the Instance URL");
                        $("#" + tab.id).append(span_warning_jqueryxhr_jwt);
                    }
                }

                if (tab.id === "code_portals") {
                    var span_warning_portals = DRB.UI.CreateSpan("span_warning_portals", "NOTE: Inside DRB, Portals endpoint (<i>/_api/</i>) is routed to the default Web API endpoint");
                    $("#" + tab.id).append(span_warning_portals);
                }
                $("#" + tab.id).append(DRB.UI.CreateSpacer());
            }

            if (tabIndex === 7) {
                var btn_copyCode = DRB.UI.CreateButton("btn_" + tab.id + "_copy", "Copy Code", "btn-secondary", DRB.Logic.CopyCodeFromEditor, tab.id);
                var btn_executeCode = DRB.UI.CreateButton("btn_" + tab.id + "_execute", "Execute Code", "btn-danger", DRB.Logic.ExecuteCodeFromEditor);
                var span_warning_editor = DRB.UI.CreateSpan("span_warning_editor", "NOTE: console.log messages will appear inside the Results tab");
                $("#" + tab.id).append(btn_copyCode);
                $("#" + tab.id).append(btn_executeCode);
                $("#" + tab.id).append(span_warning_editor);
                $("#" + tab.id).append(DRB.UI.CreateSpacer());
            }

            if (tabIndex === 8) {
                var btn_copyResults = DRB.UI.CreateButton("btn_" + tab.id + "_copy", "Copy Results", "btn-secondary", DRB.Logic.CopyCodeFromEditor, tab.id);
                var span_warning_result = DRB.UI.CreateSpan("span_warning_result", "NOTE: Due to asynchronous calls the output can appear later");
                $("#" + tab.id).append(btn_copyResults);
                $("#" + tab.id).append(span_warning_result);
                $("#" + tab.id).append(DRB.UI.CreateSpacer());
            }
            if (tabIndex < 9) {
                var divEditor = DRB.UI.CreateEmptyDiv(tab.id + "_editor", "code_editor");
                $("#" + tab.id).append(divEditor);
            }
            if (tabIndex === 9) {
                var divEditor = DRB.UI.CreateEmptyDiv(tab.id + "_editor");
                $("#" + tab.id).append(divEditor);
            }
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

    DRB.Settings.FetchAPIEditor = ace.edit("code_fetchapi_editor", { useWorker: false });
    DRB.Settings.FetchAPIEditor.session.setMode("ace/mode/javascript");
    DRB.Settings.FetchAPIEditor.setShowPrintMargin(false);
    DRB.Settings.FetchAPIEditor.setOptions({ readOnly: true });

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
DRB.Initialize = async function () {
    // DRB Version
    var drbVersion = "1.0.0.21";
    document.title = document.title + " " + drbVersion;
    $("#" + DRB.DOM.VersionSpan.Id).html(drbVersion);

    // localStorage
    DRB.Settings.LocalStorageAvailable = DRB.Utilities.LocalStorageAvailable();

    // #region XTB
    DRB.Settings.XTBContext = false;
    var xtbSettings = null;
    try {
        if (DRB.Utilities.HasValue(chrome) && DRB.Utilities.HasValue(chrome.webview) && DRB.Utilities.HasValue(chrome.webview.hostObjects)) {
            xtbSettings = chrome.webview.hostObjects.xtbSettings;
        }
    } catch { }

    if (DRB.Utilities.HasValue(xtbSettings)) {
        DRB.Settings.XTBToken = await xtbSettings.Token;
        DRB.Settings.XTBUrl = await xtbSettings.Url;
        DRB.Settings.XTBVersion = await xtbSettings.Version;
        if (DRB.Utilities.HasValue(DRB.Settings.XTBToken) && DRB.Utilities.HasValue(DRB.Settings.XTBUrl) && DRB.Utilities.HasValue(DRB.Settings.XTBVersion)) {
            DRB.Settings.XTBUrl = DRB.Settings.XTBUrl.replace(/\/$/, ""); // clean url from trailing slash
            DRB.Settings.XTBContext = true;
        }
    }
    // #endregion

    // #region JWT
    DRB.Settings.JWTContext = false;
    if (DRB.Xrm.IsXTBMode() === false && DRB.Settings.LocalStorageAvailable === true) {
        try {
            if (localStorage.getItem("DRB_JWT") !== null) {
                var removeToken = true;
                var token = localStorage.getItem("DRB_JWT");
                var parsedToken = DRB.Common.ParseJWT(token);
                if (DRB.Utilities.HasValue(parsedToken)) {
                    var jwtUrl = parsedToken.aud;
                    var jwtExpireDate = parsedToken.exp * 1000;
                    var now = new Date().getTime();
                    if (DRB.Utilities.HasValue(jwtUrl) && jwtExpireDate > now) {
                        jwtUrl = jwtUrl.replace(/\/$/, ""); // clean url from trailing slash
                        DRB.UI.ShowLoading("Checking JWT Settings...");
                        try {
                            await DRB.Xrm.GetServerVersion(jwtUrl, token).done(function (data) {
                                DRB.Settings.JWTToken = token;
                                DRB.Settings.JWTUrl = jwtUrl;
                                DRB.Settings.JWTVersion = data.Version;
                                DRB.Settings.JWTContext = true;
                                removeToken = false;
                            });
                        } catch { }
                        DRB.UI.HideLoading();
                    }
                }
                if (removeToken === true) { localStorage.removeItem("DRB_JWT"); }
            }
        } catch {
            // something went wrong, remove the token
            localStorage.removeItem("DRB_JWT");
        }
    }
    // #endregion

    DRB.HideNotice();
    Split(['#div_menu', '#div_content'], { sizes: [10, 90], minSize: 200, gutterSize: 5 }); // Split
    DRB.SetDefaultSettings();
    DRB.DefineOperations();
    $("#" + DRB.DOM.ContextSpan.Id).html(DRB.Xrm.GetContext());

    // Tab script
    $(document).ready(function () {
        $("#" + DRB.DOM.TabsRequest.Id + " a").click(function (e) {
            e.preventDefault();
            switch (e.target.id) {
                case "a_code_xrmwebapi":
                case "a_code_xrmwebapiexecute":
                case "a_code_jquery":
                case "a_code_xmlhttprequest":
                case "a_code_fetchapi":
                case "a_code_portals":
                case "a_code_powerautomate": DRB.GenerateCode.Start(); break;
            }
            $(this).tab('show');
        });
    });

    // Complete Initialize
    DRB.Logic.CompleteInitialize();
}
// #endregion