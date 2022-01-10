// #region DRB.Logic
/**
 * Logic - Console To Results Editor
 * @param {any} message Message
*/
DRB.Logic.ConsoleToResultsEditor = function (message) {
    console.log(message);
    var indentedMessage = message;
    try { indentedMessage = JSON.parse(indentedMessage); } catch { }
    indentedMessage = JSON.stringify(indentedMessage, null, 2);
    var resultsValue = DRB.Settings.Editors[DRB.Settings.TabResults].session.getValue();
    if (!DRB.Utilities.HasValue(resultsValue)) { resultsValue = indentedMessage; }
    else { resultsValue += "\n" + indentedMessage; }
    if (resultsValue === undefined) { resultsValue = ""; }
    DRB.Settings.Editors[DRB.Settings.TabResults].session.setValue(resultsValue);
}

/**
 * Logic - Execute Code From Editor
*/
DRB.Logic.ExecuteCodeFromEditor = function () {
    DRB.Settings.Editors[DRB.Settings.TabResults].session.setValue("");
    var now = new Date();
    DRB.Logic.ConsoleToResultsEditor("Execution Start: " + now.toLocaleString("sv"));
    var codeValue = DRB.Settings.Editors[DRB.Settings.TabExecute].session.getValue();

    var preCode = [];
    if (DRB.Xrm.IsInstanceMode()) {
        preCode.push('let Xrm = parent.Xrm;');
    }
    preCode.push('let webapi = {};');
    preCode.push('webapi.safeAjax = function(ajaxOptions) {');
    preCode.push('\tlet ajaxUrl = ajaxOptions.url;');
    preCode.push('\tif (ajaxUrl.indexOf("/_api/") === 0) {');
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode()) {
        preCode.push('\t\tajaxOptions.url = ajaxUrl.replace("/_api/", DRB.Xrm.GetClientUrl() + "/api/data/v9.0/");');
    } else {
        preCode.push('\t\tajaxOptions.url = ajaxUrl.replace("/_api/", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/");');
    }
    preCode.push('\tajaxOptions.beforeSend = function (req) {');
    preCode.push('\t\treq.setRequestHeader("OData-MaxVersion", "4.0");');
    preCode.push('\t\treq.setRequestHeader("OData-Version", "4.0");');
    preCode.push('\t\treq.setRequestHeader("Content-Type", "application/json; charset=utf-8");');
    preCode.push('\t\treq.setRequestHeader("Accept", "application/json");');
    if (DRB.Xrm.IsXTBMode()) {
        preCode.push('\t\treq.setRequestHeader("Authorization", "Bearer " + DRB.Settings.XTBToken);');
    }
    if (DRB.Xrm.IsJWTMode()) {
        preCode.push('\t\treq.setRequestHeader("Authorization", "Bearer " + DRB.Settings.JWTToken);');
    }
    if (DRB.Xrm.IsDVDTMode()) {
        preCode.push('\t\treq.setRequestHeader("Authorization", "Bearer " + DRB.Settings.DVDToken);');
    }

    preCode.push('\t};');
    preCode.push('\t}');
    preCode.push('\t$.ajax(ajaxOptions);');
    preCode.push('}');
    preCode.push('');

    codeValue = preCode.join('\n') + codeValue;

    // Portals replace for portalUri + "/_api" syntax (association)
    var replacePortalUri = 'Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/';
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode()) {
        replacePortalUri = 'DRB.Xrm.GetClientUrl() + "/api/data/v9.0/';
    }
    codeValue = codeValue.replace(/portalUri \+\ "\/_api\//gi, replacePortalUri);
    codeValue = codeValue.replace(/portalUri\+\ "\/_api\//gi, replacePortalUri);
    codeValue = codeValue.replace(/portalUri \+\"\/_api\//gi, replacePortalUri);
    codeValue = codeValue.replace(/portalUri\+\"\/_api\//gi, replacePortalUri);

    codeValue = codeValue.replace(/console.log/gi, "DRB.Logic.ConsoleToResultsEditor");

    if (DRB.Xrm.IsXTBMode()) {
        codeValue = codeValue.replace(/Xrm.Utility.getGlobalContext\(\).getClientUrl\(\)/gi, "DRB.Xrm.GetClientUrl()");
        codeValue = codeValue.replace(/headers: {/gi, 'headers: { "Authorization": "Bearer " + DRB.Settings.XTBToken,');
        codeValue = codeValue.replace(/req.setRequestHeader\("OData-MaxVersion", "4.0"\);/gi, 'req.setRequestHeader("OData-MaxVersion", "4.0"); req.setRequestHeader("Authorization", "Bearer " + DRB.Settings.XTBToken);');
    }

    if (DRB.Xrm.IsJWTMode()) {
        codeValue = codeValue.replace(/Xrm.Utility.getGlobalContext\(\).getClientUrl\(\)/gi, "DRB.Xrm.GetClientUrl()");
        codeValue = codeValue.replace(/headers: {/gi, 'headers: { "Authorization": "Bearer " + DRB.Settings.JWTToken,');
        codeValue = codeValue.replace(/req.setRequestHeader\("OData-MaxVersion", "4.0"\);/gi, 'req.setRequestHeader("OData-MaxVersion", "4.0"); req.setRequestHeader("Authorization", "Bearer " + DRB.Settings.JWTToken);');
    }

    if (DRB.Xrm.IsDVDTMode()) {
        codeValue = codeValue.replace(/Xrm.Utility.getGlobalContext\(\).getClientUrl\(\)/gi, "DRB.Xrm.GetClientUrl()");
        codeValue = codeValue.replace(/headers: {/gi, 'headers: { "Authorization": "Bearer " + DRB.Settings.DVDTToken,');
        codeValue = codeValue.replace(/req.setRequestHeader\("OData-MaxVersion", "4.0"\);/gi, 'req.setRequestHeader("OData-MaxVersion", "4.0"); req.setRequestHeader("Authorization", "Bearer " + DRB.Settings.DVDTToken);');
    }

    DRB.UI.ShowLoading("Executing code...");
    setTimeout(function () {
        try {
            eval(codeValue);
            $("#a_" + DRB.Settings.TabResults).click();
            DRB.UI.HideLoading();
        } catch (ex) {
            DRB.UI.ShowError("Execute Code Error", ex.message);
        }
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Logic - Move Code To Main Editor
 * @param {string} sectionName Section Name
*/
DRB.Logic.MoveCodeToMainEditor = function (sectionName) {
    var codeValue = "";

    var checkTab = DRB.Utilities.GetRecordById(DRB.Settings.Tabs, sectionName);
    if (DRB.Utilities.HasValue(checkTab)) {
        if (checkTab.MoveToEditor === true) { codeValue = DRB.Settings.Editors[checkTab.Id].session.getValue(); }
    }

    DRB.Settings.Editors[DRB.Settings.TabExecute].session.setValue(codeValue);
    $("#a_" + DRB.Settings.TabExecute).click();
}

/**
 * Logic - Copy Code From Editor
 * @param {string} sectionName Section Name
*/
DRB.Logic.CopyCodeFromEditor = function (sectionName) {
    var codeValue = "";
    var contentText = "Code";

    var checkTab = DRB.Utilities.GetRecordById(DRB.Settings.Tabs, sectionName);
    if (DRB.Utilities.HasValue(checkTab)) {
        if (checkTab.CopyCode === true) {
            codeValue = DRB.Settings.Editors[checkTab.Id].session.getValue();
        }
        if (checkTab.Results === true) { contentText = "Results"; }
    }

    // copy to clipboard
    if (DRB.Utilities.HasValue(navigator.clipboard)) {
        // modern browser code
        navigator.clipboard.writeText(codeValue);
    } else {
        // old code for IE
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(codeValue).select();
        document.execCommand("copy");
        $temp.remove();
    }

    // show message to the user
    DRB.UI.ShowMessage(contentText + " copied to Clipboard");
    setTimeout(function () { DRB.UI.HideLoading(); }, DRB.Settings.TimeoutDelay * 1.5);
}

DRB.Logic.CopyCodeForPowerAutomate = function (id, name) {
    var codeValue = $("#" + DRB.DOM.PowerAutomate[id + "Input"].Id).val();
    // copy to clipboard
    if (DRB.Utilities.HasValue(navigator.clipboard)) {
        // modern browser code
        navigator.clipboard.writeText(codeValue);
    } else {
        // old code for IE
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(codeValue).select();
        document.execCommand("copy");
        $temp.remove();
    }

    // show message to the user
    DRB.UI.ShowMessage(name + " copied to Clipboard");
    setTimeout(function () { DRB.UI.HideLoading(); }, DRB.Settings.TimeoutDelay * 1.5);
}

/**
 * Logic - Complete Initialize
 */
DRB.Logic.CompleteInitialize = function () {
    DRB.Metadata = {}; // Empty DRB.Metadata
    DRB.Metadata.CurrentNode = null; // set CurrentNode as null
    DRB.Metadata.DataverseCustomAPIsLoaded = false; // set DataverseCustomAPILoaded as false
    DRB.Metadata.DataverseCustomActionsLoaded = false; // set DataverseCustomActionLoaded as false
    DRB.Metadata.DataverseMetadataLoaded = false; // set DataverseMetadataLoaded as false

    // hide the main content because CurrentNode is now null
    $("#" + DRB.DOM.MainContent.Id).hide();

    // set URL to be visible
    $("#" + DRB.DOM.ContextSpan.Id).html(DRB.Xrm.GetContext());

    // retrieve tables
    DRB.UI.ShowLoading("Retrieving Tables and Users...");
    setTimeout(function () {
        DRB.Common.RetrieveTables()
            .done(function (data) {
                DRB.Metadata.Tables = DRB.Common.MapTables(data, "Name");
                DRB.Common.RetrieveUsers()
                    .done(function (data2) {
                        DRB.Metadata.Users = DRB.Common.MapUsers(data2, "Name");
                        // create an empty data structure
                        var currentNodes = [];

                        // Check localStorage
                        if (DRB.Settings.LocalStorageAvailable === true) {
                            var storedJson = localStorage.getItem("DRB_" + DRB.Xrm.GetClientUrl());
                            if (storedJson !== null) {
                                try {
                                    var parsedContent = JSON.parse(storedJson);
                                    // version check
                                    if (parsedContent.version > 1) {
                                        // version not compatible, remove the localStorage item
                                        localStorage.removeItem("DRB_" + DRB.Xrm.GetClientUrl());
                                    } else {
                                        currentNodes = [{}];
                                        // import jsTree nodes to the new data structure
                                        DRB.Collection.ImportNodes(parsedContent, currentNodes[0]);
                                    }
                                } catch (e) {
                                    // something went wrong when parsing the file, remove the localStorage item
                                    localStorage.removeItem("DRB_" + DRB.Xrm.GetClientUrl());
                                }
                            }
                        }
                        // load nodes
                        DRB.Collection.LoadNodes(currentNodes);

                        // Set Tabs Warnings
                        var warningXrmWebApi = "";
                        var warningClientUrl = "";
                        var warningPortals = "NOTE: Inside DRB, Portals endpoint (<i>/_api/</i>) is routed to the default Web API endpoint";
                        var warningEditor = "NOTE: console.log messages will appear inside the Results tab";
                        var warningResults = "NOTE: Due to asynchronous calls the output can appear later";

                        if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode()) {

                            if (DRB.Xrm.IsXTBMode()) {
                                warningXrmWebApi = "NOTE: Xrm.WebApi is not available when DRB is executed inside XrmToolBox";
                                warningClientUrl = "NOTE: Inside DRB for XrmToolBox, Xrm.Utility.getGlobalContext().getClientUrl() is routed to the Instance URL";
                            }

                            if (DRB.Xrm.IsJWTMode()) {
                                warningXrmWebApi = "NOTE: Xrm.WebApi is not available when DRB is in JWT Mode";
                                warningClientUrl = "NOTE: Inside DRB JWT Mode, Xrm.Utility.getGlobalContext().getClientUrl() is routed to the Instance URL";
                            }

                            if (DRB.Xrm.IsDVDTMode()) {
                                warningXrmWebApi = "NOTE: Xrm.WebApi is not available when DRB is executed inside DVDT";
                                warningClientUrl = "NOTE: Inside DRB for DVDT, Xrm.Utility.getGlobalContext().getClientUrl() is routed to the Instance URL";
                            }
                        }
                        DRB.Settings.Tabs.forEach(function (tab) {
                            if (DRB.Utilities.HasValue(tab.ShowWarning) && tab.ShowWarning === true) {
                                if (DRB.Utilities.HasValue(tab.WarningXrmWebApi) && tab.WarningXrmWebApi === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningXrmWebApi);
                                }
                                if (DRB.Utilities.HasValue(tab.WarningClientUrl) && tab.WarningClientUrl === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningClientUrl);
                                }
                                if (DRB.Utilities.HasValue(tab.WarningPortals) && tab.WarningPortals === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningPortals);
                                }
                                if (DRB.Utilities.HasValue(tab.WarningEditor) && tab.WarningEditor === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningEditor);
                                }
                                if (DRB.Utilities.HasValue(tab.WarningResults) && tab.WarningResults === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningResults);
                                }
                            }
                        });
                        DRB.UI.HideLoading();
                    })
                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveUsers Error", DRB.Common.GetErrorMessage(xhr)); });
            })
            .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTables Error", DRB.Common.GetErrorMessage(xhr)); });
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Logic - Edit Request
 * @param {any} node Node
 */
DRB.Logic.EditRequest = function (node) {
    if (node.type === "request") {
        DRB.Metadata.CurrentNode = node;
        // check if the Metadata CurrentNode has all the correct generic properties (endpoint, requestType, configuration)
        if (!DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data)) { DRB.Metadata.CurrentNode.data = { endpoint: "webapi", requestType: "", configuration: {} }; }
        if (!DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.requestType)) { DRB.Metadata.CurrentNode.data.requestType = ""; DRB.Metadata.CurrentNode.data.configuration = {}; }
        if (!DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration)) { DRB.Metadata.CurrentNode.data.configuration = {}; }

        $("#" + DRB.DOM.RequestType.Div.Id).text(DRB.Metadata.CurrentNode.text); // Set the request name inside the main content
        $("#" + DRB.DOM.RequestType.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.requestType).change(); // trigger the Request Type dropdown
        $("#" + DRB.DOM.MainContent.Id).show(); // Show the main content
    }
}

/**
 * Logic - Set Configuration Properties
 * @param {any} nodeConfiguration Node Configuration
 * @param {string[]} properties Properties
 */
DRB.Logic.SetNodeConfigurationProperties = function (nodeConfiguration, properties) {
    var updatedNodeConfiguration = {};
    properties.forEach(function (property) {
        updatedNodeConfiguration[property] = JSON.parse(JSON.stringify(nodeConfiguration[property]));
    });
    return updatedNodeConfiguration;
}

/**
 * Logic - Bind Request Type
 * @param {string} id Id
 */
DRB.Logic.BindRequestType = function (id) {
    $("#" + id).on("change", function (e) {
        var requestTypeValue = $(this).val();
        var showTabs = false;
        if (DRB.Utilities.HasValue(requestTypeValue)) { showTabs = true; }
        $("#" + DRB.DOM.ConfigureContent.Id).empty();
        $("#a_" + DRB.Settings.Tabs[0].Id).click();

        DRB.Settings.Tabs.forEach(function (tab) {
            var showDefaultTab = true;
            if (DRB.Utilities.HasValue(tab.EnabledRequests) && tab.EnabledRequests.length > 0) {
                showDefaultTab = false;
                if (tab.EnabledRequests.indexOf(requestTypeValue) > -1) { $("#a_" + tab.Id).show(); } else { $("#a_" + tab.Id).hide(); }
            }

            if (DRB.Utilities.HasValue(tab.DisabledRequests) && tab.DisabledRequests.length > 0) {
                showDefaultTab = false;
                if (tab.DisabledRequests.indexOf(requestTypeValue) > -1) { $("#a_" + tab.Id).hide(); } else { $("#a_" + tab.Id).show(); }
            }

            if (showDefaultTab === true) { $("#a_" + tab.Id).show(); }
        });

        // Set the Metadata CurrentNode generic values
        DRB.Metadata.CurrentNode.data.requestType = requestTypeValue;
        // reset all the values to the default if missing
        var nodeConfiguration = DRB.Metadata.CurrentNode.data.configuration;

        // set default values if a property is missing
        if (!DRB.Utilities.HasValue(nodeConfiguration.version)) { nodeConfiguration.version = DRB.Settings.Versions[DRB.Settings.Versions.length - 1].Id; } // All except Retrieve NextLink
        if (!DRB.Utilities.HasValue(nodeConfiguration.async)) { nodeConfiguration.async = true; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.tokenHeader)) { nodeConfiguration.tokenHeader = false; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.impersonate)) { nodeConfiguration.impersonate = false; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.impersonateType)) { nodeConfiguration.impersonateType = "mscrmcallerid"; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.impersonateId)) { nodeConfiguration.impersonateId = ""; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.formattedValues)) { nodeConfiguration.formattedValues = true; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.returnRecord)) { nodeConfiguration.returnRecord = false; } // Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.detectDuplicates)) { nodeConfiguration.detectDuplicates = false; } // Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.detectChanges)) { nodeConfiguration.detectChanges = false; } // Retrieve Single, Retrieve NextLink
        if (!DRB.Utilities.HasValue(nodeConfiguration.retrieveCount)) { nodeConfiguration.retrieveCount = false; } // Retrieve Multiple, Retrieve NextLink, Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.prevent)) { nodeConfiguration.prevent = "none"; } // Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.topCount)) { nodeConfiguration.topCount = ""; } // Retrieve Multiple
        if (!DRB.Utilities.HasValue(nodeConfiguration.primaryEntity)) { nodeConfiguration.primaryEntity = null; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.primaryIdField)) { nodeConfiguration.primaryIdField = ""; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.useAlternateKey)) { nodeConfiguration.useAlternateKey = false; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.primaryId)) { nodeConfiguration.primaryId = ""; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.alternateKeyName)) { nodeConfiguration.alternateKeyName = ""; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.alternateKeyFields)) { nodeConfiguration.alternateKeyFields = []; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.fields)) { nodeConfiguration.fields = []; } // Retrieve Single, Retrieve Multiple, Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.setFields)) { nodeConfiguration.setFields = []; } // Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.oneToMany)) { nodeConfiguration.oneToMany = []; } // Retrieve Single, Retrieve Multiple, Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.manyToOne)) { nodeConfiguration.manyToOne = []; } // Retrieve Single, Retrieve Multiple, Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.manyToMany)) { nodeConfiguration.manyToMany = []; } // Retrieve Single, Retrieve Multiple, Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.filterCriteria)) { nodeConfiguration.filterCriteria = {}; } // Retrieve Multiple
        if (!DRB.Utilities.HasValue(nodeConfiguration.orderFields)) { nodeConfiguration.orderFields = []; } // Retrieve Multiple
        if (!DRB.Utilities.HasValue(nodeConfiguration.secondaryEntity)) { nodeConfiguration.secondaryEntity = null; } // Association
        if (!Array.isArray(nodeConfiguration.secondaryIds)) { nodeConfiguration.secondaryIds = [""]; } // Association
        if (!DRB.Utilities.HasValue(nodeConfiguration.relationship)) { nodeConfiguration.relationship = ""; } // Association
        if (!DRB.Utilities.HasValue(nodeConfiguration.nextLink)) { nodeConfiguration.nextLink = ""; }  // Retrieve NextLink
        if (!DRB.Utilities.HasValue(nodeConfiguration.queryType)) { nodeConfiguration.queryType = ""; } // Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.systemViewId)) { nodeConfiguration.systemViewId = ""; } // Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.personalViewId)) { nodeConfiguration.personalViewId = ""; } // Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.fetchXML)) { nodeConfiguration.fetchXML = ""; } // Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.workflowId)) { nodeConfiguration.workflowId = ""; } // Execute Workflow
        if (!DRB.Utilities.HasValue(nodeConfiguration.dataverseExecute)) { nodeConfiguration.dataverseExecute = ""; } // Dataverse Execute
        if (!DRB.Utilities.HasValue(nodeConfiguration.dataverseOperationType)) { nodeConfiguration.dataverseOperationType = 0; } // Dataverse Execute
        if (!DRB.Utilities.HasValue(nodeConfiguration.dataverseParameters)) { nodeConfiguration.dataverseParameters = []; } // Dataverse Execute
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileField)) { nodeConfiguration.fileField = null; } // Manage File Data, Manage Image Data
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileOperation)) { nodeConfiguration.fileOperation = ""; } // Manage File Data, Manage Image Data
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileName)) { nodeConfiguration.fileName = ""; } // Manage File Data, Manage Image Data
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileContent)) { nodeConfiguration.fileContent = null; } // Manage File Data, Manage Image Data
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileFullSize)) { nodeConfiguration.fileFullSize = false; } // Manage Image Data

        // Check the selected Request Type
        switch (requestTypeValue) {
            case "retrievesingle": // Retrieve Single
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "detectChanges", "primaryEntity", "useAlternateKey", "alternateKeyName", "alternateKeyFields",
                    "primaryId", "primaryIdField", "fields", "oneToMany", "manyToOne", "manyToMany"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.RetrieveSingle.Start();
                break;

            case "retrievemultiple": // Retrieve Multiple
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "retrieveCount", "topCount", "primaryEntity", "primaryIdField", "fields", "oneToMany", "manyToOne", "manyToMany",
                    "filterCriteria", "orderFields"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.RetrieveMultiple.Start();
                break;

            case "create": // Create
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "returnRecord", "detectDuplicates", "primaryEntity", "primaryIdField", "fields", "setFields", "oneToMany", "manyToOne", "manyToMany"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Create.Start();
                break;

            case "update": // Update
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "returnRecord", "detectDuplicates", "prevent", "primaryEntity", "useAlternateKey", "alternateKeyName", "alternateKeyFields",
                    "primaryId", "primaryIdField", "fields", "setFields", "oneToMany", "manyToOne", "manyToMany"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Update.Start();
                break;

            case "delete": // Delete
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "useAlternateKey", "alternateKeyName", "alternateKeyFields", "primaryId"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Delete.Start();
                break;

            // Associate and Disassociate have the same configuration
            case "associate": // Associate
            case "disassociate": // Disassociate
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "primaryId", "secondaryEntity", "secondaryIds", "relationship"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Association.Start();
                break;

            case "retrievenextlink": // Retrieve NextLink
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "detectChanges", "primaryEntity", "retrieveCount", "nextLink"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null; // primaryEntity starts always empty as we parse the NextLink
                DRB.Logic.RetrieveNextLink.Start();
                break;

            case "predefinedquery": // Predefined Query
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "retrieveCount", "primaryEntity", "queryType", "systemViewId", "personalViewId", "fetchXML"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.PredefinedQuery.Start();
                break;

            // Custom API, Custom Action, Action and Function have the same configuration
            case "executecustomapi": // Execute Custom API
            case "executecustomaction": // Execute Custom Action
            case "executeaction": // Execute Action
            case "executefunction": // Execute Function
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "dataverseExecute", "dataverseOperationType", "dataverseParameters"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.DataverseExecute.Start(requestTypeValue);
                break;

            case "executeworkflow": // Execute Workflow
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "primaryId", "workflowId"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.ExecuteWorkflow.Start();
                break;

            case "managefiledata": // Manage File Data
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "primaryId", "fileField", "fileOperation", "fileName", "fileContent"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.ManageFileImageData.Start(requestTypeValue);
                break;

            case "manageimagedata": // Manage Image Data
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "primaryId", "fileField", "fileOperation", "fileName", "fileContent", "fileFullSize"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.ManageFileImageData.Start(requestTypeValue);
                break;
        }

        if (showTabs) { $("#" + DRB.DOM.TabsRequest.Id).show(); } else { $("#" + DRB.DOM.TabsRequest.Id).hide(); }

        DRB.Settings.Editors.forEach(function (editor) { editor.session.setValue(""); });
    });
}

/**
 * Logic - Export Relationships
 * @param {any[]} values Values (from a dropdown)
 * @param {any[]} relationshipMetadata Metadata relationship array
*/
DRB.Logic.ExportRelationships = function (values, relationshipMetadata) {
    // array containing the result
    var relationshipExports = [];

    // first extract all relationships
    var relationships = [];
    values.forEach(function (value) { relationships.push(value.split('|')[0]); });
    relationships = DRB.Utilities.RemoveDuplicatesFromArray(relationships);

    // Create the list of fields for each relationship
    relationships.forEach(function (relationship) {
        var relationshipExport = { schemaName: relationship, fields: [] };
        values.forEach(function (selectedRelationshipColumn) {
            var splitted = selectedRelationshipColumn.split('|');
            if (splitted[0] === relationship) { relationshipExport.fields.push({ logicalName: splitted[1] }); }
        });
        relationshipExports.push(relationshipExport);
    });

    // fill the other properties from the Metadata
    relationshipExports.forEach(function (relationshipExport) {
        var relationship = DRB.Utilities.GetRecordById(relationshipMetadata, relationshipExport.schemaName);
        if (DRB.Utilities.HasValue(relationship)) {
            relationshipExport.navigationProperty = relationship.NavigationProperty;
            var relationshipTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, relationship.TargetTable);
            if (DRB.Utilities.HasValue(relationshipTable)) {
                relationshipExport.targetEntity = relationshipTable.LogicalName;
                relationshipExport.targetEntityLabel = relationshipTable.Name;
                relationshipExport.fields.forEach(function (relationshipExportField) {
                    var relationshipTableColumn = DRB.Utilities.GetRecordById(relationshipTable.Columns, relationshipExportField.logicalName);
                    relationshipExportField.schemaName = relationshipTableColumn.SchemaName;
                    relationshipExportField.label = relationshipTableColumn.Name;
                    relationshipExportField.type = relationshipTableColumn.AttributeType;
                    relationshipExportField.oDataName = relationshipTableColumn.ODataName;
                });
            }
        }
    });
    return relationshipExports;
}

/**
 * Logic - Fill Current Metadata
 * @param {DRB.Models.Table} table Table
 */
DRB.Logic.FillCurrentMetadata = function (table) {
    // when a table is selected, fill Current Metadata with table properties (Columns, Relationships, Alternate Keys)
    DRB.Metadata.CurrentColumns = table.Columns;
    DRB.Metadata.CurrentOneToMany = table.OneToManyRelationships;
    DRB.Metadata.CurrentManyToOne = table.ManyToOneRelationships;
    DRB.Metadata.CurrentManyToMany = table.ManyToManyRelationships;
    DRB.Metadata.CurrentAlternateKeys = table.AlternateKeys;
}

/**
 * Logic - Fill Columns
 */
DRB.Logic.FillColumns = function () {
    if (DRB.Metadata.CurrentColumns.length === 0) {
        DRB.UI.ResetDropdown(DRB.DOM.Columns.Dropdown.Id, DRB.DOM.Columns.Dropdown.Name);
    } else {
        var readColumns = [];
        DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
            if (currentColumn.IsValidForRead === true) { readColumns.push(currentColumn); }
        });
        DRB.UI.FillDropdown(DRB.DOM.Columns.Dropdown.Id, DRB.DOM.Columns.Dropdown.Name, new DRB.Models.Records(readColumns).ToDropdown());
        var columnsValues = [];
        DRB.Metadata.CurrentNode.data.configuration.fields.forEach(function (field) { columnsValues.push(field.logicalName); });
        if (columnsValues.length > 0) { $("#" + DRB.DOM.Columns.Dropdown.Id).val(columnsValues).change(); }
    }
}

/**
 * Logic - Fill Relationships Columns
 */
DRB.Logic.FillRelationshipsColumns = function () {
    var currentRelationships = ["CurrentOneToMany", "CurrentManyToOne", "CurrentManyToMany"];
    currentRelationships.forEach(function (currentRelationship) {
        DRB.Metadata[currentRelationship].forEach(function (relationship) {
            var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, relationship.TargetTable);
            if (DRB.Utilities.HasValue(targetTable)) {
                relationship.TargetTableName = targetTable.Name;
                relationship.Columns = [];

                // take NavigationAttributeName from the related table columns
                if (DRB.Utilities.HasValue(relationship.NavigationAttribute)) {
                    if (currentRelationship === "CurrentOneToMany") {
                        var relColumn = DRB.Utilities.GetRecordById(targetTable.Columns, relationship.NavigationAttribute);
                        if (DRB.Utilities.HasValue(relColumn)) { relationship.NavigationAttributeName = relColumn.Name; }
                    }

                    if (currentRelationship === "CurrentManyToOne") {
                        var sourceTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, relationship.SourceTable);
                        if (DRB.Utilities.HasValue(sourceTable)) {
                            var relColumn = DRB.Utilities.GetRecordById(sourceTable.Columns, relationship.NavigationAttribute);
                            if (DRB.Utilities.HasValue(relColumn)) { relationship.NavigationAttributeName = relColumn.Name; }
                        }
                    }
                }

                targetTable.Columns.forEach(function (targetColumn) {
                    relationship.Columns.push(new DRB.Models.RelationshipColumn(relationship.SchemaName, relationship.Type, relationship.NavigationProperty, relationship.NavigationAttribute, relationship.NavigationAttributeName, relationship.TargetTable, targetTable.Name, targetColumn.LogicalName, targetColumn.Name, targetColumn.SchemaName, targetColumn.AttributeType, targetColumn.IsPrimaryIdAttribute, targetColumn.IsPrimaryNameAttribute, targetColumn.RequiredLevel, targetColumn.IsValidForRead, targetColumn.IsValidForCreate, targetColumn.IsValidForUpdate, targetColumn.AdditionalProperties));
                });
            }
        });
    });
}

/**
 * Logic - Fill Relationships
 */
DRB.Logic.FillRelationships = function () {
    var currentRelationships = ["CurrentOneToMany", "CurrentManyToOne", "CurrentManyToMany"];
    currentRelationships.forEach(function (currentRelationship) {
        var shortRel = currentRelationship.replace("Current", "");
        var configRel = shortRel.charAt(0).toLowerCase() + shortRel.substring(1);
        if (DRB.Metadata[currentRelationship].length === 0) {
            $("#" + DRB.DOM.Relationship[shortRel].Button.Id).hide();
            DRB.UI.ResetDropdown(DRB.DOM.Relationship[shortRel].Dropdown.Id, DRB.DOM.Relationship[shortRel].Dropdown.Name);
            DRB.Metadata.CurrentNode.data.configuration[configRel] = [];
        } else {
            $("#" + DRB.DOM.Relationship[shortRel].Button.Id).show();
            var relRecords = [];
            var configurationRelRecords = [];
            DRB.Metadata.CurrentNode.data.configuration[configRel].forEach(function (relationship) {
                var checkRelationship = DRB.Utilities.GetRecordById(DRB.Metadata[currentRelationship], relationship.schemaName);
                if (DRB.Utilities.HasValue(checkRelationship)) {
                    relationship.fields.forEach(function (relationshipField) {
                        var checkColumn = DRB.Utilities.GetRecordByProperty(checkRelationship.Columns, "ColumnLogicalName", relationshipField.logicalName);
                        if (DRB.Utilities.HasValue(checkColumn)) { relRecords.push(checkColumn); configurationRelRecords.push(checkColumn.Id); }
                    });
                }
            });

            DRB.Metadata.CurrentNode.data.configuration[configRel] = DRB.Logic.ExportRelationships(configurationRelRecords, DRB.Metadata[currentRelationship]);
            DRB.UI.FillDropdownWithGroups(DRB.DOM.Relationship[shortRel].Dropdown.Id, DRB.DOM.Relationship[shortRel].Dropdown.Name, new DRB.Models.Records(relRecords).ToDropdown(), false);
        }
    });
}

/**
 * Logic - Fill Alternate Keys
 */
DRB.Logic.FillAlternateKeys = function () {
    // Fill Alternate Keys
    if (DRB.Metadata.CurrentAlternateKeys.length === 0) {
        // this table has no Alternate Keys, "Use Alternate Key" is No
        DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        DRB.UI.ResetDropdown(DRB.DOM.AlternateKey.Dropdown.Id, DRB.DOM.AlternateKey.Dropdown.Name);
        $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("no").change();
    } else {
        // this table has Alternate Keys
        DRB.UI.UnlockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        DRB.UI.FillDropdown(DRB.DOM.AlternateKey.Dropdown.Id, DRB.DOM.AlternateKey.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.CurrentAlternateKeys).ToDropdown());
        if (DRB.Metadata.CurrentNode.data.configuration.useAlternateKey === true) { $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("yes").change(); }
    }
}

/**
 * Logic - Parse Image
 * @param {event} e Event
 */
DRB.Logic.ParseImage = function (e) {
    var file = e.target.files[0];
    if (!file) {
        DRB.UI.ShowError("Load Image Error", "Error loading the selected file");
    } else {
        if (/\.(jpe?g|png|gif|bmp)$/i.test(file.name)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                try {
                    var fileContent = e.target.result;
                    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentImageIndex)) {
                        // get full Metadata and configuration path
                        var refMetadata = DRB.Metadata;
                        var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

                        // get full Metadata and configuration path
                        DRB.Metadata.CurrentMetadataPath.split("_").forEach(function (path) {
                            if (isNaN(parseInt(path))) {
                                if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                                if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
                            } else {
                                // is a position number
                                var metadataIndex = parseInt(path);
                                refMetadata.forEach(function (refItem, refItemIndex) {
                                    if (refItem.Id === metadataIndex) {
                                        // this is the correct path to follow
                                        refMetadata = refMetadata[refItemIndex];
                                        refConfiguration = refConfiguration[refItemIndex];
                                    }
                                });
                            }
                        });

                        refMetadata.forEach(function (column, columnIndex) {
                            if (column.Id === DRB.Metadata.CurrentImageIndex) {
                                var currentField = JSON.parse(JSON.stringify(column.Value));
                                currentField.value = fileContent.split(",")[1];
                                column.Value = currentField;
                                refConfiguration[columnIndex] = currentField;

                                $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[DRB.Metadata.CurrentDomObject].ControlValue.Id + DRB.Metadata.CurrentMetadataPath + "_" + DRB.Metadata.CurrentImageIndex).show();
                                $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[DRB.Metadata.CurrentDomObject].ControlValue.Id + DRB.Metadata.CurrentMetadataPath + "_" + DRB.Metadata.CurrentImageIndex).show();
                            }
                        });
                    }
                } catch (e) { DRB.UI.ShowError("Load Image Error", "Failed to parse the selected file"); }
            };
            reader.readAsDataURL(file);
        } else {
            DRB.UI.ShowError("Load Image Error", "Supported file extensions: gif, png, bmp, jpg, jpeg");
        }
    }
    // reset the File Input (necessary if we load the same file again)
    $(e.target).val("");
}

/**
 * Logic - Load Image
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 * @param {number} elementIndex Element Index
 */
DRB.Logic.LoadImage = function (domObject, metadataPath, elementIndex) {
    DRB.Metadata.CurrentDomObject = domObject;
    DRB.Metadata.CurrentMetadataPath = metadataPath;
    DRB.Metadata.CurrentImageIndex = elementIndex;
    $("#" + DRB.DOM.Image.LoadInput.Id + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + elementIndex).trigger("click");
}

/**
 * Logic - Show Image
 * @param {string} metadataPath Metadata Path
 * @param {number} elementIndex Element Index
 */
DRB.Logic.ShowImage = function (metadataPath, elementIndex) {
    try {
        var refMetadata = DRB.Metadata;
        // get full Metadata and configuration path
        metadataPath.split("_").forEach(function (path) {
            if (isNaN(parseInt(path))) {
                if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            } else {
                // is a position number
                var metadataIndex = parseInt(path);
                refMetadata.forEach(function (refItem, refItemIndex) {
                    if (refItem.Id === metadataIndex) {
                        // this is the correct path to follow
                        refMetadata = refMetadata[refItemIndex];
                    }
                });
            }
        });


        var imageContent = null;
        refMetadata.forEach(function (column) {
            if (column.Id === elementIndex) {
                var field = JSON.parse(JSON.stringify(column.Value));
                imageContent = field.value;
            }
        });

        var base64Prefix = "data:image/jpeg;base64,";
        var finalImage = base64Prefix + imageContent;

        var showContent = DRB.UI.CreateEmptyDiv("div_showimage", "centercontent");
        showContent.append(DRB.UI.CreateImage("preview", finalImage));
        DRB.UI.Show("Show Image", showContent, "large");
    } catch (e) {
        DRB.UI.ShowError("Image Error", "Unable to show the image");
    }
}

/**
 * Logic - Remove Image
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 * @param {number} elementIndex Element Index
 */
DRB.Logic.RemoveImage = function (domObject, metadataPath, elementIndex) {
    // get full Metadata and configuration path
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
    // get full Metadata and configuration path
    metadataPath.split("_").forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    refMetadata.forEach(function (column, columnIndex) {
        if (column.Id === elementIndex) {
            var field = JSON.parse(JSON.stringify(column.Value));
            field.value = null;
            column.Value = field;
            refConfiguration[columnIndex] = field;

            $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + elementIndex).hide();
            $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + elementIndex).hide();
        }
    });
}
// #endregion