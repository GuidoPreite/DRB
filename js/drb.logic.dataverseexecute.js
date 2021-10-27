// #region DRB.Logic.DataverseExecute
/**
 * Dataverse Execute - Download Dataverse Custom APIs
 * @param {string} sourceRequestType Source Request Type
 */
DRB.Logic.DataverseExecute.DownloadDataverseCustomAPIs = function (sourceRequestType) {
    // DRB.Metadata arrays
    DRB.Metadata.DataverseCustomAPITables = [];
    DRB.Metadata.DataverseCustomAPIComplexTypes = [];

    DRB.UI.ShowLoading("Retrieving Custom APIs...<br /><b>This is a long-running operation</b>");
    setTimeout(function () {
        DRB.Common.RetrieveCustomAPIs()
            .done(function (data) {
                var customAPIs = DRB.Common.SetCustomAPITables(data);

                // create the response (ComplexType)
                customAPIs.forEach(function (customAPI) {
                    if (customAPI.Properties.length > 0) {
                        var returnTypeName = "mscrm." + customAPI.Id + "Response";
                        DRB.Metadata.DataverseCustomAPIComplexTypes.push(new DRB.Models.DataverseComplexType(returnTypeName, customAPI.Properties));
                        customAPI.HasReturnType = true;
                        customAPI.ReturnType = returnTypeName;
                    }
                });

                var customAPITableLogicalNames = [];
                customAPIs.forEach(function (customAPI) { customAPITableLogicalNames.push(customAPI.LogicalName); });
                customAPITableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(customAPITableLogicalNames); // remove duplicates

                customAPITableLogicalNames.forEach(function (tableLogicalName) {
                    var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                    if (DRB.Utilities.HasValue(table)) {
                        DRB.Metadata.DataverseCustomAPITables.push(new DRB.Models.DataverseTable(table.LogicalName, table.Name, table.SchemaName, table.EntitySetName, table.PrimaryIdAttribute, table.PrimaryNameAttribute, table.ObjectTypeCode));
                    }
                });
                DRB.Metadata.DataverseCustomAPITables.sort(DRB.Utilities.CustomSort("Name"));
                DRB.Metadata.DataverseCustomAPITables.unshift(new DRB.Models.DataverseTable("none", "(Unbound)", "None", "nones", "noneid", "name", 0));

                DRB.Metadata.DataverseCustomAPITables.forEach(function (customAPITable) {
                    customAPIs.forEach(function (customAPI) {
                        if (customAPI.LogicalName === customAPITable.LogicalName) { customAPITable.DataverseExecutes.push(customAPI); }
                    });
                });

                DRB.Metadata.DataverseCustomAPIsLoaded = true;
                $("#" + DRB.DOM.ConfigureContent.Id).empty();
                DRB.Logic.DataverseExecute.Start(sourceRequestType);
                DRB.UI.HideLoading();
            })
            .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveCustomAPIs Error", DRB.Common.GetErrorMessage(xhr)); });
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Dataverse Execute - Download Dataverse Custom API
 * @param {string} sourceRequestType Source Request Type
 */
DRB.Logic.DataverseExecute.DownloadDataverseCustomActions = function (sourceRequestType) {
    // DRB.Metadata arrays
    DRB.Metadata.DataverseCustomActionTables = [];
    DRB.Metadata.DataverseCustomActionComplexTypes = [];

    DRB.UI.ShowLoading("Retrieving Custom Actions...<br /><b>This is a long-running operation</b>");
    setTimeout(function () {
        DRB.Common.RetrieveCustomActions()
            .done(function (data) {
                var customActions = DRB.Common.SetCustomActionTables(data);

                // create the response (ComplexType)
                customActions.forEach(function (customAction) {
                    if (customAction.Properties.length > 0) {
                        var returnTypeName = "mscrm." + customAction.Id + "Response";
                        DRB.Metadata.DataverseCustomActionComplexTypes.push(new DRB.Models.DataverseComplexType(returnTypeName, customAction.Properties));
                        customAction.HasReturnType = true;
                        customAction.ReturnType = returnTypeName;
                    }
                });

                var customActionTableLogicalNames = [];
                customActions.forEach(function (customAction) { customActionTableLogicalNames.push(customAction.LogicalName); });
                customActionTableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(customActionTableLogicalNames); // remove duplicates

                customActionTableLogicalNames.forEach(function (tableLogicalName) {
                    var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                    if (DRB.Utilities.HasValue(table)) {
                        DRB.Metadata.DataverseCustomActionTables.push(new DRB.Models.DataverseTable(table.LogicalName, table.Name, table.SchemaName, table.EntitySetName, table.PrimaryIdAttribute, table.PrimaryNameAttribute, table.ObjectTypeCode));
                    }
                });
                DRB.Metadata.DataverseCustomActionTables.sort(DRB.Utilities.CustomSort("Name"));
                DRB.Metadata.DataverseCustomActionTables.unshift(new DRB.Models.DataverseTable("none", "(Unbound)", "None", "nones", "noneid", "name", 0));

                DRB.Metadata.DataverseCustomActionTables.forEach(function (customActionTable) {
                    customActions.forEach(function (customAction) {
                        if (customAction.LogicalName === customActionTable.LogicalName) { customActionTable.DataverseExecutes.push(customAction); }
                    });
                });

                DRB.Metadata.DataverseCustomActionsLoaded = true;
                $("#" + DRB.DOM.ConfigureContent.Id).empty();
                DRB.Logic.DataverseExecute.Start(sourceRequestType);
                DRB.UI.HideLoading();
            })
            .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveCustomActions Error", DRB.Common.GetErrorMessage(xhr)); });
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Dataverse Execute - Download Dataverse Metadata
 * @param {string} sourceRequestType Source Request Type
 */
DRB.Logic.DataverseExecute.DownloadDataverseMetadata = function (sourceRequestType) {
    // DRB.Metadata arrays
    DRB.Metadata.DataverseActionTables = [];
    DRB.Metadata.DataverseFunctionTables = [];
    DRB.Metadata.DataverseActionFunctionComplexTypes = [];

    DRB.UI.ShowLoading("Retrieving Metadata...<br /><b>This is a long-running operation</b>");
    setTimeout(function () {
        DRB.Common.RetrieveMetadata()
            .done(function (data) {
                // Metadata format is XML, parse Complex Types, Actions, Functions

                // #region Complex Types
                var dvComplexTypes = [];
                var xmlComplexTypes = $(data).find("ComplexType").toArray();
                xmlComplexTypes.forEach(function (xmlComplexType) {
                    var name = "mscrm." + $(xmlComplexType).attr("Name");
                    var properties = [];
                    var xmlProperties = $(xmlComplexType).find("Property").toArray();
                    xmlProperties.forEach(function (xmlProperty, xmlPropertyIndex) {
                        var propertyName = $(xmlProperty).attr("Name");
                        var propertyType = $(xmlProperty).attr("Type");
                        properties.push(new DRB.Models.DataverseProperty(propertyName, propertyType, xmlPropertyIndex, null));
                    });

                    var xmlNavigationProperties = $(xmlComplexType).find("NavigationProperty").toArray();
                    xmlNavigationProperties.forEach(function (xmlProperty, xmlPropertyIndex) {
                        var propertyName = $(xmlProperty).attr("Name");
                        var propertyType = $(xmlProperty).attr("Type");
                        properties.push(new DRB.Models.DataverseProperty(propertyName, propertyType, xmlPropertyIndex, null));
                    });

                    dvComplexTypes.push(new DRB.Models.DataverseComplexType(name, properties));
                });
                DRB.Metadata.DataverseActionFunctionComplexTypes = dvComplexTypes;
                // #endregion

                // #region Actions
                var xmlActions = $(data).find("Action").toArray();
                var dvActions = [];
                xmlActions.forEach(function (xmlAction) {
                    // extract ReturnType
                    var xmlReturnTypes = $(xmlAction).find("ReturnType").toArray();
                    // can have an empty ReturnType
                    var hasReturnType = false;
                    var returnType = "";
                    if (xmlReturnTypes.length === 1) {
                        hasReturnType = true;
                        returnType = $(xmlReturnTypes[0]).attr("Type");
                    }
                    // extract Actions details
                    var name = $(xmlAction).attr("Name");
                    var isBound = false;
                    if (DRB.Utilities.HasValue($(xmlAction).attr("IsBound"))) { isBound = true; }
                    var logicalName = "none";
                    var isCollectionBound = false;

                    // extract parameters
                    var parameters = [];
                    var xmlParameters = $(xmlAction).find("Parameter").toArray();
                    xmlParameters.forEach(function (xmlParameter, xmlParameterIndex) {
                        var parameterName = $(xmlParameter).attr("Name");
                        var parameterType = $(xmlParameter).attr("Type");
                        var parameterOptional = true;
                        if (DRB.Utilities.HasValue($(xmlParameter).attr("Nullable"))) { parameterOptional = false; }

                        if (parameterName === "entity") {
                            logicalName = parameterType.replace("mscrm.", "");
                        }
                        if (parameterName === "entityset") {
                            logicalName = parameterType.replace("Collection(mscrm.", "").replace(")", "");
                            isCollectionBound = true;
                        }
                        parameters.push(new DRB.Models.DataverseParameter(parameterName, parameterType, parameterOptional, xmlParameterIndex, null));
                    });

                    dvActions.push(new DRB.Models.DataverseExecute("Action", name, name, isBound, logicalName, isCollectionBound, false, hasReturnType, returnType, parameters));
                });

                var actionTableLogicalNames = [];
                dvActions.forEach(function (dvAction) { actionTableLogicalNames.push(dvAction.LogicalName); });
                actionTableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(actionTableLogicalNames); // remove duplicates

                actionTableLogicalNames.forEach(function (tableLogicalName) {
                    var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                    if (DRB.Utilities.HasValue(table)) {
                        DRB.Metadata.DataverseActionTables.push(new DRB.Models.DataverseTable(table.LogicalName, table.Name, table.SchemaName, table.EntitySetName, table.PrimaryIdAttribute, table.PrimaryNameAttribute, table.ObjectTypeCode));
                    }
                });
                DRB.Metadata.DataverseActionTables.sort(DRB.Utilities.CustomSort("Name"));
                DRB.Metadata.DataverseActionTables.unshift(new DRB.Models.DataverseTable("none", "(Unbound)", "None", "nones", "noneid", "name", 0));

                DRB.Metadata.DataverseActionTables.forEach(function (dvActionTable) {
                    dvActions.forEach(function (dvAction) {
                        if (dvAction.LogicalName === dvActionTable.LogicalName) { dvActionTable.DataverseExecutes.push(dvAction); }
                    });
                });
                // #endregion

                // #region Functions
                var xmlFunctions = $(data).find("Function").toArray();
                var dvFunctions = [];
                xmlFunctions.forEach(function (xmlFunction) {
                    // extract ReturnType
                    var xmlReturnTypes = $(xmlFunction).find("ReturnType").toArray();
                    // must have a single ReturnType
                    if (xmlReturnTypes.length === 1) {
                        // check if Type from ReturnType is not a Boolean
                        var returnType = $(xmlReturnTypes[0]).attr("Type");
                        if (returnType !== "Edm.Boolean") {
                            // extract Function details
                            var name = $(xmlFunction).attr("Name");
                            var isBound = false;
                            if (DRB.Utilities.HasValue($(xmlFunction).attr("IsBound"))) { isBound = true; }
                            var logicalName = "none";
                            var isCollectionBound = false;

                            // extract parameters
                            var parameters = [];
                            var xmlParameters = $(xmlFunction).find("Parameter").toArray();
                            xmlParameters.forEach(function (xmlParameter, xmlParameterIndex) {
                                var parameterName = $(xmlParameter).attr("Name");
                                var parameterType = $(xmlParameter).attr("Type");
                                var parameterOptional = true;
                                if (DRB.Utilities.HasValue($(xmlParameter).attr("Nullable"))) { parameterOptional = false; }

                                if (parameterName === "entity") {
                                    logicalName = parameterType.replace("mscrm.", "");
                                }
                                if (parameterName === "entityset") {
                                    logicalName = parameterType.replace("Collection(mscrm.", "").replace(")", "");
                                    isCollectionBound = true;
                                }
                                parameters.push(new DRB.Models.DataverseParameter(parameterName, parameterType, parameterOptional, xmlParameterIndex, null));
                            });

                            dvFunctions.push(new DRB.Models.DataverseExecute("Function", name, name, isBound, logicalName, isCollectionBound, true, true, returnType, parameters));
                        }
                    }
                });

                var functionTableLogicalNames = [];
                dvFunctions.forEach(function (dataverseFunction) { functionTableLogicalNames.push(dataverseFunction.LogicalName); });
                functionTableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(functionTableLogicalNames); // remove duplicates

                functionTableLogicalNames.forEach(function (tableLogicalName) {
                    var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                    if (DRB.Utilities.HasValue(table)) {
                        DRB.Metadata.DataverseFunctionTables.push(new DRB.Models.DataverseTable(table.LogicalName, table.Name, table.SchemaName, table.EntitySetName, table.PrimaryIdAttribute, table.PrimaryNameAttribute, table.ObjectTypeCode));
                    }
                });
                DRB.Metadata.DataverseFunctionTables.sort(DRB.Utilities.CustomSort("Name"));
                DRB.Metadata.DataverseFunctionTables.unshift(new DRB.Models.DataverseTable("none", "(Unbound)", "None", "nones", "noneid", "name", 0));

                DRB.Metadata.DataverseFunctionTables.forEach(function (dvFunctionTable) {
                    dvFunctions.forEach(function (dvFunction) {
                        if (dvFunction.LogicalName === dvFunctionTable.LogicalName) { dvFunctionTable.DataverseExecutes.push(dvFunction); }
                    });
                });
                // #endregion

                DRB.Metadata.DataverseMetadataLoaded = true;

                $("#" + DRB.DOM.ConfigureContent.Id).empty();
                DRB.Logic.DataverseExecute.Start(sourceRequestType);
                DRB.UI.HideLoading();
            })
            .fail(function (xhr) {
                var metadataLink = DRB.Xrm.GetMetadataUrl();
                var errorMessage = "Metadata Download failed.<br />Please try to refresh the Metadata from this link and try again:<br/>";
                errorMessage += '<a target="_blank" href="' + metadataLink + '">' + metadataLink + '</a>';
                DRB.UI.ShowError("DRB.Common.RetrieveMetadata Error", errorMessage);
            });
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Dataverse Execute - Bind Dataverse Table
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindDataverseTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();

        // clear DOM
        $("#" + DRB.DOM.DataverseParameters.Div.Id).hide();
        $("#" + DRB.DOM.DataverseParameters.Div.Id).empty();

        var table = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseTables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            DRB.Metadata.CurrentDataverseExecutes = table.DataverseExecutes;
            if (table.DataverseExecutes.length === 0) {
                DRB.UI.ResetDropdown(DRB.DOM.DataverseExecute.Dropdown.Id, DRB.DOM.DataverseExecute.Dropdown.Name);
            } else {
                DRB.UI.FillDropdown(DRB.DOM.DataverseExecute.Dropdown.Id, DRB.DOM.DataverseExecute.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.CurrentDataverseExecutes).ToDropdown());
                var dvExecute = DRB.Metadata.CurrentNode.data.configuration.dataverseExecute;
                $("#" + DRB.DOM.DataverseExecute.Dropdown.Id).val(dvExecute).change();
            }

            // Fill primaryEntity
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
        }
    });
}

/**
 * Dataverse Execute - Bind Parameter Include
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindParameterInclude = function (id) {
    $("#" + id).on("change", function (e) {
        // extract the index from the control name
        var elementIndex = DRB.Common.ExtractIndexFromControlName($(this).attr('id'));
        if (elementIndex === -1) { return; } // if index not found do nothing

        // get checkbox status (checked = true, not checked = false)
        var includeValue = $(this).is(':checked');
        // set inside data.configuration
        DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[elementIndex].include = includeValue;
        // show or hide the value based on the checkbox status
        var divValue = DRB.DOM.DataverseParameters.DivValue.Id + elementIndex;
        if (includeValue === true) { $("#" + divValue).show(); } else { $("#" + divValue).hide(); }
    });
}

/**
 * Dataverse Execute - Bind Parameter Value
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindParameterValue = function (id) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        var parameterValue = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[elementIndex].value));

        // Edm.Boolean
        if (controlName.indexOf("cbx1_") === 0) { parameterValue = false; if (controlValue === "yes") { parameterValue = true; } }
        // Edm.DateTimeOffset
        if (controlName.indexOf("txtd_") === 0) { parameterValue = controlValue; }
        // Edm.Guid, Edm.String, Edm.Int32, Edm.Int64, Edm.Decimal, Edm.Double
        if (controlName.indexOf("txt_") === 0) { parameterValue = controlValue; }

        if (controlName.indexOf("txt2_") === 0) {
            if (!DRB.Utilities.HasValue(parameterValue)) { parameterValue = {}; }
            parameterValue.id = controlValue;
        }

        if (controlName.indexOf("cbx2_") === 0) {
            if (!DRB.Utilities.HasValue(parameterValue)) { parameterValue = {}; }
            parameterValue.entityType = controlValue;
            var primaryIdAttribute = "";
            var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, controlValue);
            if (DRB.Utilities.HasValue(checkTable)) { primaryIdAttribute = checkTable.PrimaryIdAttribute; }
            parameterValue.primaryIdField = primaryIdAttribute;

            // additional check for BaseEntity
            if (DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[elementIndex].type === "mscrm.crmbaseentity") {
                if (DRB.Utilities.HasValue(controlValue)) {
                    var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + elementIndex;
                    var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + elementIndex;
                    var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + elementIndex;

                    $("#" + currentIdLookup).remove();
                    $("#" + DRB.DOM.DataverseParameters.DivValue.Id + elementIndex).append(DRB.UI.CreateLookup(currentIdLookup, DRB.UI.OpenLookup,
                        {
                            openBaseEntity: true,
                            defaultEntityType: controlValue,
                            textId: currentIdText,
                            dropdownId: currentIdDropdown
                        }));
                }
            }
        }

        // set the new value
        DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[elementIndex].value = parameterValue;
    });
}

/**
 * Dataverse Execute - Bind Parameter Collection Value
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindParameterCollectionValue = function (id) {
    $("#" + id).on("change", function (e) {
        var controlValue = $(this).val();// get control value
        var controlName = $(this).attr('id'); // get control name
        var index = DRB.Common.ExtractIndexFromControlName(controlName); // get index
        if (index === -1) { return; } // if index not found do nothing
        var collectionIndex = DRB.Common.ExtractPreviousIndexFromControlName(controlName); // get collection index
        if (collectionIndex === -1) { return; } // if collection index not found do nothing

        // get current value
        var currentValue = DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value;

        // Guid, String, Int32, Int64, Decimal, Double
        if (controlName.indexOf("txt_") === 0) { currentValue[collectionIndex] = controlValue; }
        // Boolan
        if (controlName.indexOf("cbx1_") === 0) {
            if (controlValue === "yes") { currentValue[collectionIndex] = true; }
            else { currentValue[collectionIndex] = false; }
        }
        // mscrm.baseentity (id)
        if (controlName.indexOf("txt2_") === 0) { currentValue[collectionIndex].id = controlValue; }
        // mscrm.baseentity (entityType, primaryIdField)
        if (controlName.indexOf("cbx2_") === 0) {
            currentValue[collectionIndex].entityType = controlValue;
            //
            var primaryIdAttribute = "";
            var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, controlValue);
            if (DRB.Utilities.HasValue(checkTable)) { primaryIdAttribute = checkTable.PrimaryIdAttribute; }
            currentValue[collectionIndex].primaryIdField = primaryIdAttribute;

            // additional check for BaseEntity
            if (DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].type === "Collection(mscrm.crmbaseentity)") {
                if (DRB.Utilities.HasValue(controlValue)) {
                    var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                    var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                    var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;

                    $("#" + currentIdLookup).remove();
                    $("#" + DRB.DOM.DataverseParameters.DivCollectionControlValue.Id + collectionIndex + "_" + index).append(DRB.UI.CreateLookup(currentIdLookup, DRB.UI.OpenLookup,
                        {
                            openBaseEntity: true,
                            defaultEntityType: controlValue,
                            textId: currentIdText,
                            dropdownId: currentIdDropdown
                        }));
                }
            }
            //
        }
    });
}

/**
 * Dataverse Execute - Refresh Collection Arrows
 */
DRB.Logic.DataverseExecute.RefreshCollectionArrows = function () {
    DRB.Metadata.CurrentNode.data.configuration.dataverseParameters.forEach(function (parameter, parameterIndex) {
        if (!Array.isArray(parameter.value)) { return; }// refresh the arrows only if the value is an array
        if (parameter.value.length === 0) { return; } // if no items do nothing

        // set the arrow for the first and the last collection
        var firstIndex = 0 + "_" + parameterIndex;
        var lastIndex = (parameter.value.length - 1) + "_" + parameterIndex;

        $("#" + DRB.DOM.ArrowUp.Id + lastIndex).show();
        $("#" + DRB.DOM.ArrowDown.Id + firstIndex).show();
        $("#" + DRB.DOM.ArrowUp.Id + firstIndex).hide();
        $("#" + DRB.DOM.ArrowDown.Id + lastIndex).hide();

        $("#" + DRB.DOM.ArrowBeforeUp.Id + firstIndex).show();
        $("#" + DRB.DOM.ArrowAfterDown.Id + firstIndex).hide();
        $("#" + DRB.DOM.ArrowBeforeUp.Id + lastIndex).hide();
        $("#" + DRB.DOM.ArrowAfterDown.Id + lastIndex).show();

        // set the arrows for the items in the middle
        for (var i = 1; i < parameter.value.length - 1; i++) {
            var uniqueIndex = i + "_" + parameterIndex;
            $("#" + DRB.DOM.ArrowUp.Id + uniqueIndex).show();
            $("#" + DRB.DOM.ArrowDown.Id + uniqueIndex).show();
            $("#" + DRB.DOM.ArrowBeforeUp.Id + uniqueIndex).hide();
            $("#" + DRB.DOM.ArrowAfterDown.Id + uniqueIndex).hide();
        }
    });
}

/**
 * Dataverse Execute - Move Collection Item
 * @param {string} direction Direction
 * @param {number} index Index
 * @param {number} collectionIndex Collection Index
 * @param {string} parameterType Parameter Type
 */
DRB.Logic.DataverseExecute.MoveCollectionItem = function (direction, index, collectionIndex, parameterType) {
    // if value is empty do nothing
    var currentParameter = DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index];
    if (currentParameter.value.length === 0) { return; }

    // direction, default is "up"
    var diff = -1;
    if (direction === "down") { diff = 1; }


    if (parameterType.indexOf("Collection(mscrm.") === 0 && parameterType !== "Collection(mscrm.crmbaseentity)") {
        parameterType = "Collection(mscrm.crmbaseentity)";
    }

    switch (parameterType) {
        case "Collection(Edm.Guid)":
        case "Collection(Edm.String)":
        case "Collection(Edm.Int32)":
        case "Collection(Edm.Int64)":
        case "Collection(Edm.Decimal)":
        case "Collection(Edm.Double)":
            var currentItem = currentParameter.value[collectionIndex];
            var swapItem = currentParameter.value[collectionIndex + diff];
            $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index).val(swapItem).change().trigger("input");
            $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + (collectionIndex + diff) + "_" + index).val(currentItem).change().trigger("input");
            break
        case "Collection(Edm.Boolean)":
            var currentItem = currentParameter.value[collectionIndex];
            var swapItem = currentParameter.value[collectionIndex + diff];
            var newCurrentValue = "no";
            if (currentItem === true) { newCurrentValue = "yes"; }
            var newSwapValue = "no";
            if (swapItem === true) { newSwapValue = "yes"; }
            $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index).val(newSwapValue).change();
            $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + (collectionIndex + diff) + "_" + index).val(newCurrentValue).change();
            break;
        case "Collection(mscrm.crmbaseentity)":
            var currentId = currentParameter.value[collectionIndex].id;
            var currentEntityType = currentParameter.value[collectionIndex].entityType;
            var swapId = currentParameter.value[collectionIndex + diff].id;
            var swapEntityType = currentParameter.value[collectionIndex + diff].entityType;

            $("#" + "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index).val(swapId).change().trigger("input");
            $("#" + "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + (collectionIndex + diff) + "_" + index).val(currentId).change().trigger("input");

            $("#" + "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index).val(swapEntityType).change();
            $("#" + "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + (collectionIndex + diff) + "_" + index).val(currentEntityType).change();
            break;
    }
}

/**
 * Dataverse Execute - Remove Collection Value
 * @param {number} index Index
 * @param {number} collectionIndex Collection Index
 * @param {string} parameterType Parameter Type
 */
DRB.Logic.DataverseExecute.RemoveCollectionValue = function (index, collectionIndex, parameterType) {
    var lastCollectionIndex = DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.length - 1;

    if (parameterType.indexOf("Collection(mscrm.") === 0 && parameterType !== "Collection(mscrm.crmbaseentity)") {
        parameterType = "Collection(mscrm.crmbaseentity)";
    }

    for (var i = collectionIndex; i < lastCollectionIndex; i++) {
        switch (parameterType) {
            case "Collection(mscrm.crmbaseentity)":
                var nextValueId = $("#" + "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + (i + 1) + "_" + index).val();
                $("#" + "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + i + "_" + index).val(nextValueId).change();
                var nextValueEntityType = $("#" + "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + (i + 1) + "_" + index).val();
                $("#" + "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + i + "_" + index).val(nextValueEntityType).change();
                break;

            case "Collection(Edm.Boolean)":
                var nextValue = $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + (i + 1) + "_" + index).val();
                $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + i + "_" + index).val(nextValue).change();
                break;

            case "Collection(Edm.Guid)":
            case "Collection(Edm.String)":
            case "Collection(Edm.Int32)":
            case "Collection(Edm.Int64)":
            case "Collection(Edm.Decimal)":
            case "Collection(Edm.Double)":
                var nextValue = $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + (i + 1) + "_" + index).val();
                $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + i + "_" + index).val(nextValue).change();
                break;
        }
    }

    var lastCollectionControlDiv = DRB.DOM.DataverseParameters.DivCollectionControlValue.Id + lastCollectionIndex + "_" + index;
    $("#" + lastCollectionControlDiv).remove();
    DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.pop();
    DRB.Logic.DataverseExecute.RefreshCollectionArrows();
}

/**
 * Dataverse Execute - Add Collection Value
 * @param {number} index Index
 * @param {string} parameterType Parameter Type
 */
DRB.Logic.DataverseExecute.AddCollectionValue = function (index, parameterType) {
    var collectionIndex = DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.length;

    var checkOtherParameterTypes = true;
    if (parameterType.indexOf("Collection(mscrm.") === 0 && parameterType !== "Collection(mscrm.crmbaseentity)") {
        checkOtherParameterTypes = false;
        DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.push({ id: "", entityType: "", primaryIdField: "" });
    }

    if (checkOtherParameterTypes === true) {
        switch (parameterType) {
            case "Collection(Edm.Guid)":
            case "Collection(Edm.String)":
            case "Collection(Edm.Boolean)":
            case "Collection(Edm.Int32)":
            case "Collection(Edm.Int64)":
            case "Collection(Edm.Decimal)":
            case "Collection(Edm.Double)":
                DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.push("");
                break;
            case "Collection(mscrm.crmbaseentity)":
                DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.push({ id: "", entityType: "", primaryIdField: "" });
                break;
        }
    }

    var currentCollectionControlDiv = DRB.DOM.DataverseParameters.DivCollectionControlValue.Id + collectionIndex + "_" + index;
    $("#" + DRB.DOM.DataverseParameters.DivCollectionValue.Id + index).append(DRB.UI.CreateEmptyDiv(currentCollectionControlDiv, DRB.DOM.DataverseParameters.DivCollectionControlValue.Class));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateRemoveButton(DRB.Logic.DataverseExecute.RemoveCollectionValue, index, collectionIndex, parameterType));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateEmptyArrowButton(DRB.DOM.ArrowBeforeUp.Id + collectionIndex + "_" + index));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateUpButton(DRB.DOM.ArrowUp.Id + collectionIndex + "_" + index, DRB.Logic.DataverseExecute.MoveCollectionItem, "up", index, collectionIndex, parameterType));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateDownButton(DRB.DOM.ArrowDown.Id + collectionIndex + "_" + index, DRB.Logic.DataverseExecute.MoveCollectionItem, "down", index, collectionIndex, parameterType));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateEmptyArrowButton(DRB.DOM.ArrowAfterDown.Id + collectionIndex + "_" + index));

    if (checkOtherParameterTypes === false) {
        var tableLogicalName = parameterType.substring(17, parameterType.length - 1);
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);

        var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
        var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
        var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
        $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputGuid(currentIdText));
        DRB.Common.BindGuid(currentIdText);
        DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentIdText);
        $("#" + currentCollectionControlDiv).append(DRB.UI.CreateSimpleDropdown(currentIdDropdown));
        DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentIdDropdown);

        var targets = [new DRB.Models.Table(tableLogicalName, checkTable.Name)];
        DRB.UI.FillDropdown(currentIdDropdown, "", new DRB.Models.Records(targets).ToDropdown());
        $("#" + currentCollectionControlDiv).append(DRB.UI.CreateLookup(currentIdLookup, DRB.UI.OpenLookup,
            {
                openCustom: true,
                defaultEntityType: tableLogicalName,
                entityTypes: [tableLogicalName],
                textId: currentIdText,
                dropdownId: currentIdDropdown
            }));
        $("#" + currentIdDropdown).val(targets[0].Id).change();
    }

    if (checkOtherParameterTypes === true) {
        switch (parameterType) {
            case "Collection(Edm.Guid)":
                var currentCollectionId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputGuid(currentCollectionId));
                DRB.Common.BindGuid(currentCollectionId);
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(Edm.String)":
                var currentCollectionId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputString(currentCollectionId));
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(Edm.Boolean)":
                var currentCollectionId = "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateDropdown(currentCollectionId));
                DRB.UI.FillDropdown(currentCollectionId, "Select Value", new DRB.Models.Records(DRB.Settings.OptionsTrueFalse).ToDropdown());
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(Edm.Int32)":
            case "Collection(Edm.Int64)":
                var currentCollectionId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputNumber(currentCollectionId));
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(Edm.Decimal)":
            case "Collection(Edm.Double)":
                var currentCollectionId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputNumber(currentCollectionId, parameterType.substring(15)));
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(mscrm.crmbaseentity)":
                var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputGuid(currentIdText));
                DRB.Common.BindGuid(currentIdText);
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentIdText);
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateDropdown(currentIdDropdown));
                DRB.UI.FillDropdown(currentIdDropdown, "Select Table", new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentIdDropdown);
                break;
        }
    }

    DRB.Logic.DataverseExecute.RefreshCollectionArrows();
}

/**
 * Dataverse Execute - After Function Loaded
 * @param {DRB.Models.DataverseExecute} dvExecute Dataverse Execute
 */
DRB.Logic.DataverseExecute.AfterExecuteLoaded = function (dvExecute) {
    // #region Operation Type
    var operationType = 0;
    if (dvExecute.Type === "Function") { operationType = 1; }
    if (dvExecute.Type === "CustomAPI" && dvExecute.IsFunction === true) { operationType = 1; }
    DRB.Metadata.CurrentNode.data.configuration.dataverseOperationType = operationType;
    // #endregion

    // #region Parameters
    $("#" + DRB.DOM.DataverseParameters.Div.Id).empty();

    var parameters = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.dataverseParameters));
    DRB.Metadata.CurrentNode.data.configuration.dataverseParameters = [];
    if (dvExecute.Parameters.length > 0) {
        // create the table structure for the parameters
        $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateTable(DRB.DOM.DataverseParameters.Table.Id));
        $("#" + DRB.DOM.DataverseParameters.Table.Id).append(DRB.UI.CreateTr(DRB.DOM.DataverseParameters.Tr.Id));

        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdOptional.Id));
        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdInclude.Id));
        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdName.Id));
        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdType.Id));
        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdValue.Id));

        $("#" + DRB.DOM.DataverseParameters.TdOptional.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdOptional.Id, DRB.DOM.DataverseParameters.TdOptional.Name));
        $("#" + DRB.DOM.DataverseParameters.TdInclude.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdInclude.Id, DRB.DOM.DataverseParameters.TdInclude.Name));
        $("#" + DRB.DOM.DataverseParameters.TdName.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdName.Id, DRB.DOM.DataverseParameters.TdName.Name));
        $("#" + DRB.DOM.DataverseParameters.TdType.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdType.Id, DRB.DOM.DataverseParameters.TdType.Name));
        $("#" + DRB.DOM.DataverseParameters.TdValue.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdValue.Id, DRB.DOM.DataverseParameters.TdValue.Name));

        // if the stored parameters are the same number of the Execute Parameters and their names are also the same
        // then try to parse the include and the value
        var matchParameters = true;
        if (parameters.length === dvExecute.Parameters.length) {
            for (var j = 0; j < parameters.length; j++) {
                if (parameters[j].name !== dvExecute.Parameters[j].Name) {
                    matchParameters = false;
                    break;
                }
            }
        } else { matchParameters = false; }

        // parse the parameters
        for (var index = 0; index < dvExecute.Parameters.length; index++) {
            var parameter = dvExecute.Parameters[index];
            $("#" + DRB.DOM.DataverseParameters.Table.Id).append(DRB.UI.CreateTr(DRB.DOM.DataverseParameters.Tr.Id + index));

            if (index % 2 !== 0) { $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).prop("style", "background: #f0f7ff;"); }

            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdOptional.Id + index));
            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdInclude.Id + index));
            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdName.Id + index));
            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdType.Id + index));
            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdValue.Id + index));

            var optionalText = "No";
            if (parameter.Optional === true) { optionalText = "Yes"; }

            $("#" + DRB.DOM.DataverseParameters.TdOptional.Id + index).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdOptional.Id + index, optionalText));

            var parameterInclude = !parameter.Optional;

            if (matchParameters === true) { parameterInclude = parameters[index].include; }

            $("#" + DRB.DOM.DataverseParameters.TdInclude.Id + index).append(DRB.UI.CreateCheckbox(DRB.DOM.DataverseParameters.CheckboxInclude.Id + index, "&nbsp;&nbsp;&nbsp;", "checkboxinclude", parameterInclude));
            DRB.Logic.DataverseExecute.BindParameterInclude(DRB.DOM.DataverseParameters.CheckboxInclude.Id + index);

            if (parameter.Optional !== true) { $("#" + DRB.DOM.DataverseParameters.CheckboxInclude.Id + index).prop("disabled", "true"); }

            $("#" + DRB.DOM.DataverseParameters.TdName.Id + index).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdName.Id + index, parameter.Name));
            $("#" + DRB.DOM.DataverseParameters.TdType.Id + index).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdType.Id + index, parameter.Type));

            var divValue = DRB.UI.CreateEmptyDiv(DRB.DOM.DataverseParameters.DivValue.Id + index);
            $("#" + DRB.DOM.DataverseParameters.TdValue.Id + index).append(divValue);


            // hide if is not included
            if (parameterInclude === false) { divValue.hide(); }

            var parameterValue = null;
            if (parameter.Type.indexOf("Collection(") === 0) { parameterValue = []; }
            if (matchParameters === true) { parameterValue = parameters[index].value; }

            DRB.Metadata.CurrentNode.data.configuration.dataverseParameters.push({ name: parameter.Name, type: parameter.Type, optional: parameter.Optional, include: parameterInclude, value: parameterValue });

            var typeFound = false;

            if (typeFound === false && parameter.Type.indexOf("Collection(") === 0) {
                typeFound = true;
                // Collection can be of anything, mscrm.crmbaseentity, table, complex type or Edm
                if (DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName !== "none" && index === 0 && parameter.Name === "entityset") {
                    // do nothing, first parameter of entityset bounded to an entity
                } else {
                    var collectionTypeFound = false;

                    if (parameter.Type.indexOf("Collection(mscrm.") === 0 && parameter.Type !== "Collection(mscrm.crmbaseentity)") {
                        // extract the name and check if is a table
                        var tableLogicalName = parameter.Type.substring(17, parameter.Type.length - 1);
                        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                        if (DRB.Utilities.HasValue(checkTable)) {
                            collectionTypeFound = true;

                            divValue.append(DRB.UI.CreateEmptyDiv(DRB.DOM.DataverseParameters.DivCollectionValue.Id + index));
                            divValue.append(DRB.UI.CreateSpacer());
                            divValue.append(DRB.UI.CreateButton(DRB.DOM.DataverseParameters.AddButton.Id, DRB.DOM.DataverseParameters.AddButton.Name, DRB.DOM.DataverseParameters.AddButton.Class, DRB.Logic.DataverseExecute.AddCollectionValue, index, parameter.Type));

                            if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) {
                                var newParameterValue = JSON.parse(JSON.stringify(parameterValue));
                                DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value = [];
                                newParameterValue.forEach(function (v, vIndex) {
                                    DRB.Logic.DataverseExecute.AddCollectionValue(index, parameter.Type);

                                    var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index;
                                    var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index;
                                    $("#" + currentIdText).val(v.id).change().trigger("input");
                                    $("#" + currentIdDropdown).val(v.entityType).change();

                                });
                            }
                        }
                    }


                    switch (parameter.Type) {
                        case "Collection(Edm.Boolean)":
                        case "Collection(Edm.Guid)":
                        case "Collection(Edm.String)":
                        case "Collection(Edm.Int32)":
                        case "Collection(Edm.Int64)":
                        case "Collection(Edm.Decimal)":
                        case "Collection(Edm.Double)":
                        case "Collection(mscrm.crmbaseentity)":
                            collectionTypeFound = true;
                            divValue.append(DRB.UI.CreateEmptyDiv(DRB.DOM.DataverseParameters.DivCollectionValue.Id + index));
                            divValue.append(DRB.UI.CreateSpacer());
                            divValue.append(DRB.UI.CreateButton(DRB.DOM.DataverseParameters.AddButton.Id, DRB.DOM.DataverseParameters.AddButton.Name, DRB.DOM.DataverseParameters.AddButton.Class, DRB.Logic.DataverseExecute.AddCollectionValue, index, parameter.Type));

                            if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) {
                                var newParameterValue = JSON.parse(JSON.stringify(parameterValue));
                                DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value = [];
                                newParameterValue.forEach(function (v, vIndex) {
                                    DRB.Logic.DataverseExecute.AddCollectionValue(index, parameter.Type);

                                    switch (parameter.Type) {
                                        case "Collection(Edm.Boolean)":
                                            var dropdownValue = "no";
                                            if (v === true) { dropdownValue = "yes"; }
                                            $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index).val(dropdownValue).change();
                                            break;
                                        case "Collection(mscrm.crmbaseentity)":
                                            var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index;
                                            var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index;

                                            $("#" + currentIdText).val(v.id).change().trigger("input");
                                            $("#" + currentIdDropdown).val(v.entityType).change();
                                            break;
                                        default:
                                            $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index).val(v).change().trigger("input");
                                            break;
                                    }
                                });
                            }
                            break;
                    }

                    if (collectionTypeFound === false) {
                        divValue.append(DRB.UI.CreateSpan("", "&nbsp;&nbsp;&nbsp;Collection Type not supported"));
                        DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[DRB.Metadata.CurrentNode.data.configuration.dataverseParameters.length - 1].value = null;
                    }
                }
            }

            if (typeFound === false && parameter.Type === "mscrm.crmbaseentity") {
                typeFound = true;
                var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                // entityreference with any entity in the system
                divValue.append(DRB.UI.CreateInputGuid(currentIdText));
                DRB.Common.BindGuid(currentIdText);
                DRB.Logic.DataverseExecute.BindParameterValue(currentIdText);
                if (matchParameters === true && DRB.Utilities.HasValue(parameterValue) && DRB.Utilities.HasValue(parameterValue.id)) { $("#" + currentIdText).val(parameterValue.id).change().trigger("input"); }

                divValue.append(DRB.UI.CreateDropdown(currentIdDropdown));
                DRB.UI.FillDropdown(currentIdDropdown, "Select Table", new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());

                // extract all table logical names
                var allEntityTypes = [];
                DRB.Metadata.Tables.forEach(function (table) { allEntityTypes.push(table.LogicalName); });

                DRB.Logic.DataverseExecute.BindParameterValue(currentIdDropdown);
                if (matchParameters === true && DRB.Utilities.HasValue(parameterValue) && DRB.Utilities.HasValue(parameterValue.entityType)) { $("#" + currentIdDropdown).val(parameterValue.entityType).change(); }
                else {
                    $("#" + currentIdDropdown).val("null").change();
                }
            }

            if (typeFound === false && parameter.Type.indexOf("mscrm.") === 0) {
                // mscrm. can be a table or a complex type
                var parameterType = parameter.Type;
                typeFound = true;

                var exactTypeFound = false;
                // extract the name and check if is a table
                var tableLogicalName = parameterType.substring(6);
                var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                if (DRB.Utilities.HasValue(checkTable)) {
                    exactTypeFound = true;
                    // #region Create Lookup
                    var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                    var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                    var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                    divValue.append(DRB.UI.CreateInputGuid(currentIdText));
                    DRB.Common.BindGuid(currentIdText);
                    DRB.Logic.DataverseExecute.BindParameterValue(currentIdText);

                    if (matchParameters === true && DRB.Utilities.HasValue(parameterValue) && DRB.Utilities.HasValue(parameterValue.id)) { $("#" + currentIdText).val(parameterValue.id).change().trigger("input"); }

                    divValue.append(DRB.UI.CreateSimpleDropdown(currentIdDropdown));

                    var targets = [new DRB.Models.Table(tableLogicalName, checkTable.Name)];
                    DRB.UI.FillDropdown(currentIdDropdown, "", new DRB.Models.Records(targets).ToDropdown());
                    divValue.append(DRB.UI.CreateLookup(currentIdLookup, DRB.UI.OpenLookup,
                        {
                            openCustom: true,
                            defaultEntityType: tableLogicalName,
                            entityTypes: [tableLogicalName],
                            textId: currentIdText,
                            dropdownId: currentIdDropdown
                        }));

                    DRB.Logic.DataverseExecute.BindParameterValue(currentIdDropdown);
                    if (matchParameters === true && DRB.Utilities.HasValue(parameterValue) && DRB.Utilities.HasValue(parameterValue.entityType)) { $("#" + currentIdDropdown).val(parameterValue.entityType).change(); }
                    else {
                        $("#" + currentIdDropdown).val(targets[0].Id).change();
                    }
                    // #endregion
                } else {
                    // if is not a table check if it is a Complex Type
                    var checkComplexType = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseComplexTypes, parameterType);
                    if (DRB.Utilities.HasValue(checkComplexType)) {
                        exactTypeFound = true;
                        divValue.append(DRB.UI.CreateSpan("", "&nbsp;&nbsp;&nbsp;" + parameterType + " (Complex Type) not supported"));
                    }
                }

                // not able to recognize this type
                if (exactTypeFound === false) {
                    divValue.append(DRB.UI.CreateSpan("", "&nbsp;&nbsp;&nbsp;" + parameterType + " (unknown) not supported"));
                }
            }

            // #region Edm Types
            if (typeFound === false && parameter.Type.indexOf("Edm.") === 0) {
                typeFound = true;
                var parameterType = parameter.Type;
                switch (parameterType) {
                    case "Edm.Binary":
                        divValue.append(DRB.UI.CreateSpan("", "&nbsp;&nbsp;&nbsp;Edm.Binary not supported"));
                        break;

                    case "Edm.Boolean":
                        var currentId = "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateDropdown(currentId));
                        DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(DRB.Settings.OptionsTrueFalse).ToDropdown());
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);

                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) {
                            var booleanDropdownValue = "no";
                            if (parameterValue === true) { booleanDropdownValue = "yes"; }
                            $("#" + currentId).val(booleanDropdownValue).change();
                        }
                        break;

                    case "Edm.Guid":
                        var currentId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputGuid(currentId));
                        DRB.Common.BindGuid(currentId);
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change().trigger("input"); }
                        break;

                    case "Edm.String":
                        var currentId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputString(currentId));
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change().trigger("input"); }
                        break;

                    case "Edm.Int32":
                    case "Edm.Int64":
                        var currentId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputNumber(currentId));
                        DRB.Common.BindInteger(currentId);
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change().trigger("input"); }
                        break;

                    case "Edm.Decimal":
                    case "Edm.Double":
                        var currentId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputNumber(currentId, parameterType.substring(4)));
                        DRB.Common.BindNumber(currentId);
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change().trigger("input"); }
                        break;

                    case "Edm.DateTimeOffset":
                        var pickerFormat = "YYYY-MM-DD HH:mm";
                        var currentId = "txtd_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputDateTime(currentId));
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change(); }
                        $("#" + currentId).datetimepicker({ format: pickerFormat, ignoreReadonly: true, showClear: true, showTodayButton: true }).on('dp.change', function (e) { $(e.target).change(); });
                        break;
                }
            }
            // #endregion
        }
    } else {
        $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.DataverseParameters.SpanName.Id, "<b>No Parameters</b>"));
    }
    // #endregion

    $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpacer());
    $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateHr());
    $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpacer());

    // #region Return Type
    if (dvExecute.HasReturnType === true) {
        DRB.Metadata.CurrentNode.data.configuration.dataverseReturnType = { type: dvExecute.ReturnType, outputParameters: [] };
        var retunTypeText = "<b>Return Type:</b> " + dvExecute.ReturnType;
        $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.DataverseReturnType.Span.Id, retunTypeText));
        if (dvExecute.ReturnType.indexOf("mscrm.") === 0) {
            // check if is a complex type
            var complexType = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseComplexTypes, dvExecute.ReturnType);
            if (DRB.Utilities.HasValue(complexType)) {
                $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateTable(DRB.DOM.DataverseReturnType.Table.Id));
                $("#" + DRB.DOM.DataverseReturnType.Table.Id).append(DRB.UI.CreateTr(DRB.DOM.DataverseReturnType.Tr.Id));
                $("#" + DRB.DOM.DataverseReturnType.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseReturnType.TdName.Id));
                $("#" + DRB.DOM.DataverseReturnType.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseReturnType.TdType.Id));
                $("#" + DRB.DOM.DataverseReturnType.TdName.Id).html(DRB.DOM.DataverseReturnType.TdName.Name);
                $("#" + DRB.DOM.DataverseReturnType.TdType.Id).html(DRB.DOM.DataverseReturnType.TdType.Name);

                complexType.Properties.forEach(function (dvProperty, dvPropertyIndex) {
                    DRB.Metadata.CurrentNode.data.configuration.dataverseReturnType.outputParameters.push({ name: dvProperty.Name, type: dvProperty.Type });
                    $("#" + DRB.DOM.DataverseReturnType.Table.Id).append(DRB.UI.CreateTr(DRB.DOM.DataverseReturnType.Tr.Id + dvPropertyIndex));
                    $("#" + DRB.DOM.DataverseReturnType.Tr.Id + dvPropertyIndex).append(DRB.UI.CreateTd(DRB.DOM.DataverseReturnType.TdName.Id + dvPropertyIndex));
                    $("#" + DRB.DOM.DataverseReturnType.Tr.Id + dvPropertyIndex).append(DRB.UI.CreateTd(DRB.DOM.DataverseReturnType.TdType.Id + dvPropertyIndex));
                    $("#" + DRB.DOM.DataverseReturnType.TdName.Id + dvPropertyIndex).html(dvProperty.Name);
                    $("#" + DRB.DOM.DataverseReturnType.TdType.Id + dvPropertyIndex).html(dvProperty.Type);
                });
            }
        }
    }
    else {
        DRB.Metadata.CurrentNode.data.configuration.dataverseReturnType = null;
        $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.DataverseParameters.SpanName.Id + "rt", "<b>No Return Type</b>"));
    }
    // #endregion
}

/**
 * Dataverse Execute - Bind Dataverse
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindDataverseExecute = function (id) {
    $("#" + id).on("change", function (e) {
        var dvExecuteName = $(this).val();
        var dvExecute = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentDataverseExecutes, dvExecuteName);
        if (DRB.Utilities.HasValue(dvExecute)) {
            // dataverseExecute
            DRB.Metadata.CurrentNode.data.configuration.dataverseExecute = dvExecuteName;
            $("#" + DRB.DOM.DataverseParameters.Div.Id).empty();
            $("#" + DRB.DOM.DataverseParameters.Div.Id).show();
            DRB.Logic.DataverseExecute.AfterExecuteLoaded(dvExecute);
        } else {
            DRB.Metadata.CurrentNode.data.configuration.dataverseExecute = "";
        }
    });
}

/**
 * Dataverse Execute - Start
 */
DRB.Logic.DataverseExecute.Start = function (requestType) {
    if (requestType === "executecustomapi") {
        // download Dataverse Custom APIs if not loaded
        if (DRB.Metadata.DataverseCustomAPIsLoaded !== true) { DRB.Logic.DataverseExecute.DownloadDataverseCustomAPIs(requestType); return; }
    }

    if (requestType === "executecustomaction") {
        // download Dataverse Custom Actions if not loaded
        if (DRB.Metadata.DataverseCustomActionsLoaded !== true) { DRB.Logic.DataverseExecute.DownloadDataverseCustomActions(requestType); return; }
    }

    if (requestType === "executeaction" || requestType === "executefunction") {
        // download Dataverse Metadata if not loaded
        if (DRB.Metadata.DataverseMetadataLoaded !== true) { DRB.Logic.DataverseExecute.DownloadDataverseMetadata(requestType); return; }
    }

    switch (requestType) {
        case "executecustomapi":
            // DOM
            DRB.DOM.DataverseExecute.Span.Name = DRB.DOM.DataverseCustomAPI.Span.Name;
            DRB.DOM.DataverseExecute.Dropdown.Name = DRB.DOM.DataverseCustomAPI.Dropdown.Name;
            // Metadata
            DRB.Metadata.DataverseTables = DRB.Metadata.DataverseCustomAPITables;
            DRB.Metadata.DataverseComplexTypes = DRB.Metadata.DataverseCustomAPIComplexTypes;
            break;
        case "executecustomaction":
            // DOM
            DRB.DOM.DataverseExecute.Span.Name = DRB.DOM.DataverseCustomAction.Span.Name;
            DRB.DOM.DataverseExecute.Dropdown.Name = DRB.DOM.DataverseCustomAction.Dropdown.Name;
            // Metadata
            DRB.Metadata.DataverseTables = DRB.Metadata.DataverseCustomActionTables;
            DRB.Metadata.DataverseComplexTypes = DRB.Metadata.DataverseCustomActionComplexTypes;
            break;
        case "executeaction":
            // DOM
            DRB.DOM.DataverseExecute.Span.Name = DRB.DOM.DataverseAction.Span.Name;
            DRB.DOM.DataverseExecute.Dropdown.Name = DRB.DOM.DataverseAction.Dropdown.Name;
            // Metadata
            DRB.Metadata.DataverseTables = DRB.Metadata.DataverseActionTables;
            DRB.Metadata.DataverseComplexTypes = DRB.Metadata.DataverseActionFunctionComplexTypes;
            break;
        case "executefunction":
            // DOM
            DRB.DOM.DataverseExecute.Span.Name = DRB.DOM.DataverseFunction.Span.Name;
            DRB.DOM.DataverseExecute.Dropdown.Name = DRB.DOM.DataverseFunction.Dropdown.Name;
            // Metadata
            DRB.Metadata.DataverseTables = DRB.Metadata.DataverseFunctionTables;
            DRB.Metadata.DataverseComplexTypes = DRB.Metadata.DataverseActionFunctionComplexTypes;
            break;
    }

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();

    // #region Dataverse Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.DataverseTables).ToDropdown());
    DRB.Logic.DataverseExecute.BindDataverseTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    // #region Dataverse Execute
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.DataverseExecute.Span.Id, DRB.DOM.DataverseExecute.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.DataverseExecute.Dropdown.Id));
    DRB.UI.ResetDropdown(DRB.DOM.DataverseExecute.Dropdown.Id, DRB.DOM.DataverseExecute.Dropdown.Name);
    DRB.Logic.DataverseExecute.BindDataverseExecute(DRB.DOM.DataverseExecute.Dropdown.Id);
    // #endregion

    // add link to Microsoft Docs for Action and Function
    switch (requestType) {
        case "executeaction":
            $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateExternalLink("https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/actions", "Web API Action Reference"));
            break;
        case "executefunction":
            $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateExternalLink("https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/functions", "Web API Function Reference"));
            break;
    }

    DRB.CustomUI.AddSpacer();

    // #region Dataverse Parameters
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.DataverseParameters.Div.Id, DRB.DOM.DataverseParameters.Div.Class));
    $("#" + DRB.DOM.DataverseParameters.Div.Id).hide();
    // #endregion

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseTables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.dataverseExecute = "";
        } else {
            // trigger change with table logical name
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }
    // #endregion
}
// #endregion