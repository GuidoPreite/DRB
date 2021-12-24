// #region DRB.Logic.SetColumns
// Set Functions (used in Create, Update)

/**
 * Logic - Bind Set Column Value
 * @param {string} id Id
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindSetColumnValue = function (id, domObject, metadataPath) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

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
                // Text
                if (controlName.indexOf("txt_") === 0) { field.value = controlValue; }
                // Picklist
                if (controlName.indexOf("cbx1_") === 0) {
                    field.value = controlValue;
                    if (DRB.Utilities.HasValue(controlValue)) { $('[data-id="' + controlName + '"]').children().last().show(); }
                    else { $('[data-id="' + controlName + '"]').children().last().hide(); }
                }
                // MultiPicklist
                if (controlName.indexOf("cbxm_") === 0) { field.value = controlValue; }
                // datetime
                if (controlName.indexOf("txtd_") === 0) {
                    field.value = controlValue;
                    field.dateTimeBehavior = $("#" + controlName).attr("data-datetimebehavior");
                }
                // if textbox belonging to a lookup save to the value.id property
                if (controlName.indexOf("txt2_") === 0) {
                    if (!DRB.Utilities.HasValue(field.value)) { field.value = {}; }
                    field.value.id = controlValue;
                }
                if (controlName.indexOf("cbx2_") === 0) {
                    if (!DRB.Utilities.HasValue(field.value)) { field.value = {}; }
                    field.value.entityType = controlValue;
                    var tableSetName = "";
                    var navigationProperty = "";
                    var sourceColumn = $("#" + DRB.DOM[domObject].Dropdown.Id + metadataPath + "_" + elementIndex).val();
                    var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, controlValue);
                    if (DRB.Utilities.HasValue(checkTable)) { tableSetName = checkTable.EntitySetName; }
                    // Navigation Property
                    for (var relCount = 0; relCount < DRB.Metadata.CurrentManyToOne.length; relCount++) {
                        if (DRB.Metadata.CurrentManyToOne[relCount].NavigationAttribute === sourceColumn)
                            if (DRB.Metadata.CurrentManyToOne[relCount].TargetTable === controlValue ||
                                DRB.Metadata.CurrentManyToOne[relCount].TargetTable === "owner") {
                                navigationProperty = DRB.Metadata.CurrentManyToOne[relCount].NavigationProperty;
                                break;
                            }
                    }
                    field.value.entitySetName = tableSetName;
                    field.value.navigationProperty = navigationProperty;
                }
                // update refMetadata and refConfiguration
                column.Value = field;
                refConfiguration[columnIndex] = field;
            }
        });
    });
}

/**
 * Logic - Bind Set Column
 * @param {string} id Id
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindSetColumn = function (id, columnType, domObject, metadataPath) {
    $("#" + id).on("change", function (e) {
        var columnLogicalName = $(this).val();
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnLogicalName);
        if (DRB.Utilities.HasValue(column)) {
            // define field
            var field = { logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName, value: null };
            // extract the index from the control name
            var controlName = $(this).attr('id');
            var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
            if (elementIndex === -1) { return; } // if index not found do nothing

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

            // update Metadata and configuration
            for (var i = 0; i < refMetadata.length; i++) {
                if (refMetadata[i].Id === elementIndex) {
                    refMetadata[i].Value = field;
                    refConfiguration[i] = field;
                    break;
                }
            }

            var uniqueIndex = metadataPath + "_" + elementIndex;
            $("#" + DRB.DOM[domObject].TdValue.Id + uniqueIndex).html(""); // empty the cell
            var divValue = DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivValue.Id + uniqueIndex);
            $("#" + DRB.DOM[domObject].TdValue.Id + uniqueIndex).append(divValue);
            switch (column.AttributeType) {
                case "Uniqueidentifier":
                    divValue.append(DRB.UI.CreateInputGuid("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex));
                    DRB.Common.BindGuid("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "EntityName":
                    divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex));
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "String":
                    divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "Memo":
                    divValue.append(DRB.UI.CreateInputMemo("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "Integer":
                case "BigInt":
                    divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue));
                    DRB.Common.BindInteger("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "Decimal":
                case "Double":
                case "Money":
                    divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue + " - Precision: " + column.AdditionalProperties.Precision));
                    DRB.Common.BindNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "ManagedProperty":
                case "Boolean":
                case "Picklist":
                case "State":
                case "Status":
                    var currentId = "cbx1_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex;
                    divValue.append(DRB.UI.CreateDropdown(currentId));
                    var options = [];
                    if (DRB.Utilities.HasValue(column.OptionValues)) {
                        column.OptionValues.forEach(function (option) {
                            options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                        });
                    }
                    DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                    // after the render add the X button
                    $('[data-id="' + currentId + '"]').append(DRB.UI.CreateRemoveButton(DRB.UI.UnselectDropdown, currentId));
                    $('[data-id="' + currentId + '"]').children().last().hide();
                    DRB.Logic.BindSetColumnValue("cbx1_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "MultiPicklist":
                    var currentId = "cbxm_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex;
                    divValue.append(DRB.UI.CreateDropdown(currentId, true));
                    var options = [];
                    if (DRB.Utilities.HasValue(column.OptionValues)) {
                        column.OptionValues.forEach(function (option) {
                            options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                        });
                    }
                    DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                    DRB.Logic.BindSetColumnValue("cbxm_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "Lookup":
                case "Owner":
                case "Customer":
                    divValue.append(DRB.UI.CreateInputGuid("txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex));
                    DRB.Common.BindGuid("txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                    DRB.Logic.BindSetColumnValue("txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    if (column.AdditionalProperties.Targets.length > 0) {
                        divValue.append(DRB.UI.CreateSimpleDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex));
                        var targets = [];
                        column.AdditionalProperties.Targets.forEach(function (target) {
                            var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                            if (DRB.Utilities.HasValue(targetTable)) {
                                targets.push(new DRB.Models.Table(target, targetTable.Name));
                            }
                        });
                        DRB.UI.FillDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, "", new DRB.Models.Records(targets).ToDropdown());
                        divValue.append(DRB.UI.CreateLookup("lkp_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, DRB.UI.OpenLookup,
                            {
                                openCustom: true,
                                defaultEntityType: column.AdditionalProperties.Targets[0],
                                entityTypes: column.AdditionalProperties.Targets,
                                textId: "txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex,
                                dropdownId: "cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex
                            }));

                        DRB.Logic.BindSetColumnValue("cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                        $("#cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(targets[0].Id).change();
                    }
                    break;

                case "DateTime":
                    var clearedDateTimeFormat = "";
                    var pickerFormat = "YYYY-MM-DD HH:mm";
                    if (DRB.Utilities.HasValue(column.AdditionalProperties.DateTimeFormat)) {
                        if (column.AdditionalProperties.DateTimeFormat === "DateOnly") { pickerFormat = "YYYY-MM-DD"; }
                        clearedDateTimeFormat = column.AdditionalProperties.DateTimeFormat.replace(/([A-Z])/g, ' $1').trim();
                    }
                    var dateTimeBehavior = "ND"; // not defined
                    var clearedDateTimeBehavior = "";
                    if (DRB.Utilities.HasValue(column.AdditionalProperties.DateTimeBehavior)) {
                        dateTimeBehavior = column.AdditionalProperties.DateTimeBehavior;
                        clearedDateTimeBehavior = column.AdditionalProperties.DateTimeBehavior.replace(/([A-Z])/g, ' $1').trim();
                    }
                    if (clearedDateTimeBehavior === "Time Zone Independent") { clearedDateTimeBehavior = "TZI"; }
                    divValue.append(DRB.UI.CreateInputDateTime("txtd_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, dateTimeBehavior, "Behavior: " + clearedDateTimeBehavior + " - Format: " + clearedDateTimeFormat));
                    DRB.Logic.BindSetColumnValue("txtd_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    $("#txtd_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).datetimepicker({ format: pickerFormat, ignoreReadonly: true, showClear: true, showTodayButton: true }).on('dp.change', function (e) { $(e.target).change(); });
                    break;

                case "Image":
                    divValue.append(DRB.UI.CreateInputFile(DRB.DOM.Image.LoadInput.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, true, DRB.Logic.ParseImage));
                    divValue.append(DRB.UI.CreateButton(DRB.DOM.Image.LoadButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, DRB.DOM.Image.LoadButton.Name, DRB.DOM.Image.LoadButton.Class, DRB.Logic.LoadImage, domObject, metadataPath, elementIndex));
                    divValue.append(DRB.UI.CreateButton(DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, DRB.DOM.Image.ShowButton.Name, DRB.DOM.Image.ShowButton.Class, DRB.Logic.ShowImage, metadataPath, elementIndex));
                    divValue.append(DRB.UI.CreateButton(DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, DRB.DOM.Image.RemoveButton.Name, DRB.DOM.Image.RemoveButton.Class, DRB.Logic.RemoveImage, domObject, metadataPath, elementIndex));
                    $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).hide();
                    $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).hide();
                    break;
            }

        }
        DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);
    });
}

/**
 * Logic - After Set Table Loaded
 * @param {DRB.Models.Table} table Table
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.AfterSetTableLoaded = function (table, columnType, domObject, metadataPath) {
    // Fill Current Metadata
    DRB.Logic.FillCurrentMetadata(table);
    // Fill Relationships Columns
    DRB.Logic.FillRelationshipsColumns();
    // Fill Columns
    DRB.Logic.FillColumns();
    // Fill Relationships
    DRB.Logic.FillRelationships();
    // Fill Alternate Keys for Update
    if (columnType === "IsValidForUpdate") { DRB.Logic.FillAlternateKeys(); }

    // Fill primaryEntity and PrimaryIdField
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
    DRB.Metadata.CurrentNode.data.configuration.primaryIdField = table.PrimaryIdAttribute;

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

    // show the DOM
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).show();
    $('#' + DRB.DOM[domObject].Table.Id + metadataPath + ' tr').slice(1).remove();

    // verify if the fields exist
    var fields = JSON.parse(JSON.stringify(refConfiguration));
    var clearedFields = [];
    fields.forEach(function (field) {
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, field.logicalName);
        if (DRB.Utilities.HasValue(column)) { clearedFields.push(field); }
    });

    // reset Metadata and configuration arrays
    refMetadata.length = 0;
    refConfiguration.length = 0;

    clearedFields.forEach(function (field, fieldIndex) {
        var uniqueIndex = metadataPath + "_" + fieldIndex;
        DRB.Logic.AddColumn(columnType, domObject, metadataPath);
        $("#" + DRB.DOM[domObject].Dropdown.Id + uniqueIndex).val(field.logicalName).change();

        switch (field.type) {
            case "EntityName":
            case "String":
            case "Memo":
                $("#txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).change();
                break;

            case "Uniqueidentifier":
            case "Integer":
            case "BigInt":
            case "Decimal":
            case "Double":
            case "Money":
                $("#txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).trigger("input").change();
                break;

            case "ManagedProperty":
            case "Boolean":
            case "Picklist":
            case "State":
            case "Status":
                $("#cbx1_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).change();
                DRB.UI.RefreshDropdown("cbx1_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                break;

            case "MultiPicklist":
                $("#cbxm_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).change();
                DRB.UI.RefreshDropdown("cbxm_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                break;

            case "Lookup":
            case "Owner":
            case "Customer":
                var idValue = null;
                var entityTypeValue = null;
                if (DRB.Utilities.HasValue(field.value)) { idValue = field.value.id; entityTypeValue = field.value.entityType; }
                $("#txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(idValue).trigger("input").change();
                $("#cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(entityTypeValue).change();
                DRB.UI.RefreshDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                break;

            case "DateTime":
                $("#txtd_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).change();
                break;

            case "Image":
                if (!DRB.Utilities.HasValue(field.value)) {
                    $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).hide();
                    $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).hide();
                } else {
                    refConfiguration[fieldIndex].value = field.value;
                    $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).show();
                    $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).show();
                }
                break;
        }
    });

    // if no [metadataPath] trigger the AddColumn
    if (refMetadata.length === 0) { DRB.Logic.AddColumn(columnType, domObject, metadataPath); }
}

/**
 * Logic - Bind Set Table
 * @param {string} id Id
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindSetTable = function (id, columnType, domObject, metadataPath) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            if (table.ColumnsLoaded === false || table.RelationshipsLoaded === false || table.AlternateKeysLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    DRB.Common.RetrieveTablesDetails([tableLogicalName], true, true)
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables, true, true);
                            var tableLogicalNames = [];
                            table.OneToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToOneRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            tableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(tableLogicalNames); // remove duplicates

                            var tablesToRetrieve = [];
                            tableLogicalNames.forEach(function (checkTableLogicalName) {
                                var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, checkTableLogicalName);
                                if (DRB.Utilities.HasValue(checkTable)) {
                                    if (checkTable.ColumnsLoaded === false || checkTable.RelationshipsLoaded === false || checkTable.AlternateKeysLoaded === false) {
                                        tablesToRetrieve.push(checkTableLogicalName);
                                    }
                                }
                            });
                            if (tablesToRetrieve.length > 0) {
                                DRB.Common.RetrieveTablesDetails(tablesToRetrieve, true, true)
                                    .done(function () {
                                        DRB.Common.SetTables(arguments, DRB.Metadata.Tables, true, true);
                                        DRB.Logic.AfterSetTableLoaded(table, columnType, domObject, metadataPath);
                                        DRB.UI.HideLoading();
                                    })
                                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                            } else {
                                DRB.Logic.AfterSetTableLoaded(table, columnType, domObject, metadataPath);
                                DRB.UI.HideLoading();
                            }
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else { DRB.Logic.AfterSetTableLoaded(table, columnType, domObject, metadataPath); }
        }
    });
}
// #endregion