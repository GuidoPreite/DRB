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
    var resultsValue = DRB.Settings.ResultsEditor.session.getValue();
    if (!DRB.Utilities.HasValue(resultsValue)) { resultsValue = indentedMessage; }
    else { resultsValue += "\n" + indentedMessage; }
    if (resultsValue === undefined) { resultsValue = ""; }
    DRB.Settings.ResultsEditor.session.setValue(resultsValue);
}

/**
 * Logic - Execute Code From Editor
*/
DRB.Logic.ExecuteCodeFromEditor = function () {
    DRB.Settings.ResultsEditor.session.setValue("");
    var now = new Date();
    DRB.Logic.ConsoleToResultsEditor("Execution Start: " + now.toLocaleString("sv"));
    var codeValue = DRB.Settings.MainEditor.session.getValue();

    var preCode = [];
    preCode.push('let Xrm = parent.Xrm;');
    preCode.push('let webapi = {};');
    //preCode.push('let portalUri = Xrm.Utility.getGlobalContext().getClientUrl();');
    preCode.push('webapi.safeAjax = function(ajaxOptions) {');
    preCode.push('\tlet ajaxUrl = ajaxOptions.url;');
    preCode.push('\tif (ajaxUrl.indexOf("/_api/") === 0) {');
    preCode.push('\t\tajaxOptions.url = ajaxUrl.replace("/_api/", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/");');

    preCode.push('\tajaxOptions.beforeSend = function (req) {');
    preCode.push('\t\treq.setRequestHeader("OData-MaxVersion", "4.0");');
    preCode.push('\t\treq.setRequestHeader("OData-Version", "4.0");');
    preCode.push('\t\treq.setRequestHeader("Accept", "application/json");');
    preCode.push('\t};');
    preCode.push('\t}');
    preCode.push('\t$.ajax(ajaxOptions);');
    preCode.push('}');
    preCode.push('');

    codeValue = preCode.join('\n') + codeValue;
    
    // Portals replace for portalUri + "/_api" syntax
    var replacePortalUri = 'Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/';
    codeValue = codeValue.replace(/portalUri \+\ "\/_api\//gi, replacePortalUri);
    codeValue = codeValue.replace(/portalUri\+\ "\/_api\//gi, replacePortalUri);
    codeValue = codeValue.replace(/portalUri \+\"\/_api\//gi, replacePortalUri);
    codeValue = codeValue.replace(/portalUri\+\"\/_api\//gi, replacePortalUri);

    codeValue = codeValue.replace(/console.log/gi, "DRB.Logic.ConsoleToResultsEditor");
    
    DRB.UI.ShowLoading("Executing code...");
    setTimeout(function () {
        try {
            eval(codeValue);
            $("#a_code_results").click();
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
    switch (sectionName) {
        case "code_xrmwebapi": codeValue = DRB.Settings.XrmWebApiEditor.session.getValue(); break;
        case "code_xrmwebapiexecute": codeValue = DRB.Settings.XrmWebApiExecuteEditor.session.getValue(); break;
        case "code_jquery": codeValue = DRB.Settings.jQueryEditor.session.getValue(); break;
        case "code_xmlhttprequest": codeValue = DRB.Settings.XMLHttpRequestEditor.session.getValue(); break;
        case "code_portals": codeValue = DRB.Settings.PortalsEditor.session.getValue(); break;
    }
    DRB.Settings.MainEditor.session.setValue(codeValue);
    $("#a_code_editor").click();
}

/**
 * Logic - Copy Code From Editor
 * @param {string} sectionName Section Name
*/
DRB.Logic.CopyCodeFromEditor = function (sectionName) {
    var codeValue = "";
    var contentText = "Code";
    switch (sectionName) {
        case "code_xrmwebapi": codeValue = DRB.Settings.XrmWebApiEditor.session.getValue(); break;
        case "code_xrmwebapiexecute": codeValue = DRB.Settings.XrmWebApiEditor.session.getValue(); break;
        case "code_jquery": codeValue = DRB.Settings.jQueryEditor.session.getValue(); break;
        case "code_xmlhttprequest": codeValue = DRB.Settings.XMLHttpRequestEditor.session.getValue(); break;
        case "code_portals": codeValue = DRB.Settings.PortalsEditor.session.getValue(); break;
        case "code_editor": codeValue = DRB.Settings.MainEditor.session.getValue(); break;
        case "code_results": codeValue = DRB.Settings.ResultsEditor.session.getValue(); contentText = "Results"; break;
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

/**
 * Logic - Refresh Tables
 */
DRB.Logic.RefreshTables = function () {
    // retrieve tables
    DRB.UI.ShowLoading("Retrieving Tables...");
    setTimeout(function () {
        DRB.Common.RetrieveTables()
            .done(function (data) {
                DRB.Metadata.Tables = DRB.Common.MapTables(data, "Name");
                DRB.UI.HideLoading();
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
        $("#a_" + DRB.Settings.Tabs[0].id).click();

        // hide or show Tab "Xrm.WebApi execute" (Tab number 2) based on the request type
        switch (requestTypeValue) {
            case "retrievesingle":
            case "create":
            case "update":
            case "delete":
                $("#a_" + DRB.Settings.Tabs[2].id).show();
                $("#a_" + DRB.Settings.Tabs[5].id).show();
                break;
            case "retrievemultiple":
            case "associate":
            case "disassociate":
                $("#a_" + DRB.Settings.Tabs[2].id).hide();
                $("#a_" + DRB.Settings.Tabs[5].id).show();
                break;
            default:
                $("#a_" + DRB.Settings.Tabs[2].id).hide();
                $("#a_" + DRB.Settings.Tabs[5].id).hide();
                break;
        }

        // Set the Metadata CurrentNode generic values
        DRB.Metadata.CurrentNode.data.requestType = requestTypeValue;
        // reset all the values to the default if missing
        var nodeConfiguration = DRB.Metadata.CurrentNode.data.configuration;

        // set default values if a property is missing
        if (!DRB.Utilities.HasValue(nodeConfiguration.version)) { nodeConfiguration.version = DRB.Settings.Versions[DRB.Settings.Versions.length - 1].Id; } // All except Retrieve NextLink
        if (!DRB.Utilities.HasValue(nodeConfiguration.async)) { nodeConfiguration.async = true; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.tokenHeader)) { nodeConfiguration.tokenHeader = false; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.impersonate)) { nodeConfiguration.impersonate = false; } // All
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

        // Check the selected Request Type
        switch (requestTypeValue) {
            case "retrievesingle": // Retrieve Single
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId", "formattedValues",
                    "detectChanges", "primaryEntity", "useAlternateKey", "alternateKeyName", "alternateKeyFields",
                    "primaryId", "primaryIdField", "fields", "oneToMany", "manyToOne", "manyToMany"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.RetrieveSingle.Start();
                break;

            case "retrievemultiple": // Retrieve Multiple
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId", "formattedValues",
                    "retrieveCount", "topCount", "primaryEntity", "primaryIdField", "fields", "oneToMany", "manyToOne", "manyToMany",
                    "filterCriteria", "orderFields"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.RetrieveMultiple.Start();
                break;

            case "create": // Create
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId", "formattedValues",
                    "returnRecord", "detectDuplicates", "primaryEntity", "primaryIdField", "fields", "setFields", "oneToMany", "manyToOne", "manyToMany"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Create.Start();
                break;

            case "update": // Update
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId", "formattedValues",
                    "returnRecord", "detectDuplicates", "prevent", "primaryEntity", "useAlternateKey", "alternateKeyName", "alternateKeyFields",
                    "primaryId", "primaryIdField", "fields", "setFields", "oneToMany", "manyToOne", "manyToMany"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Update.Start();
                break;

            case "delete": // Delete
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId",
                    "primaryEntity", "useAlternateKey", "alternateKeyName", "alternateKeyFields", "primaryId"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Delete.Start();
                break;

            // Associate and Disassociate have the same configuration
            case "associate": // Associate
            case "disassociate": // Disassociate
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId",
                    "primaryEntity", "primaryId", "secondaryEntity", "secondaryIds", "relationship"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Association.Start();
                break;

            case "retrievenextlink": // Retrieve NextLink
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId", "formattedValues",
                    "detectChanges", "primaryEntity", "retrieveCount", "nextLink"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null; // primaryEntity starts always empty as we parse the NextLink
                DRB.Logic.RetrieveNextLink.Start();
                break;

            case "predefinedquery": // Predefined Query
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId", "formattedValues",
                    "retrieveCount", "primaryEntity", "queryType", "systemViewId", "personalViewId", "fetchXML"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.PredefinedQuery.Start();
                break;

            // Custom API, Custom Action, Action and Function have the same configuration
            case "executecustomapi": // Execute Custom API
            case "executecustomaction": // Execute Custom Action
            case "executeaction": // Execute Action
            case "executefunction": // Execute Function
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId",
                    "primaryEntity", "dataverseExecute", "dataverseOperationType", "dataverseParameters"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.DataverseExecute.Start(requestTypeValue);
                break;

            case "executeworkflow": // Execute Workflow
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateId",
                    "primaryEntity", "primaryId", "workflowId"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.ExecuteWorkflow.Start();
                break;
        }

        if (showTabs) { $("#" + DRB.DOM.TabsRequest.Id).show(); } else { $("#" + DRB.DOM.TabsRequest.Id).hide(); }
        DRB.Settings.XrmWebApiEditor.session.setValue("");
        DRB.Settings.jQueryEditor.session.setValue("");
        DRB.Settings.XMLHttpRequestEditor.session.setValue("");
        DRB.Settings.MainEditor.session.setValue("");
        DRB.Settings.ResultsEditor.session.setValue("");
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
        DRB.UI.FillDropdown(DRB.DOM.Columns.Dropdown.Id, DRB.DOM.Columns.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.CurrentColumns).ToDropdown());
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
                    relationship.Columns.push(new DRB.Models.RelationshipColumn(relationship.SchemaName, relationship.Type, relationship.NavigationProperty, relationship.NavigationAttribute, relationship.NavigationAttributeName, relationship.TargetTable, targetTable.Name, targetColumn.LogicalName, targetColumn.Name, targetColumn.SchemaName, targetColumn.AttributeType, targetColumn.IsPrimaryIdAttribute, targetColumn.IsPrimaryNameAttribute, targetColumn.RequiredLevel, targetColumn.IsValidForRead, targetColumn.IsValidForCreate, targetColumn.IsValidForUpdate));
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