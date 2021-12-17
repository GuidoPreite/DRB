// #region DRB.Logic.Bindings
/**
 * Logic - Bind Property Boolean Value
 * @param {string} id Id
 * @param {string} property Property
 */
DRB.Logic.BindPropertyBooleanValue = function (id, property) {
    $("#" + id).on("change", function (e) {
        var propertyBooleanValue = $(this).val();
        if (propertyBooleanValue === "yes") { DRB.Metadata.CurrentNode.data.configuration[property] = true; } else { DRB.Metadata.CurrentNode.data.configuration[property] = false; }
    });
}

/**
 * Logic - Bind Property Value
 * @param {string} id Id
 * @param {string} property Property
 */
DRB.Logic.BindPropertyValue = function (id, property) {
    $("#" + id).on("change", function (e) {
        var propertyValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration[property] = propertyValue;
    });
}

/**
 * Logic - Bind Impersonate
 * @param {string} id Id
 */
DRB.Logic.BindImpersonate = function (id) {
    $("#" + id).on("change", function (e) {
        var impersonateValue = $(this).val();
        if (impersonateValue === "yes") {
            DRB.Metadata.CurrentNode.data.configuration.impersonate = true;
            $("#" + DRB.DOM.ImpersonateId.Div.Id).show();
        } else {
            DRB.Metadata.CurrentNode.data.configuration.impersonate = false;
            $("#" + DRB.DOM.ImpersonateId.Div.Id).hide();
        }
    });
}

/**
 * Logic - Bind Impersonate Type
 * @param {string} id Id
 */
DRB.Logic.BindImpersonateType = function (id) {
    $("#" + id).on("change", function (e) {
        var impersonateTypeValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.impersonateType = impersonateTypeValue;
        var impersonateIdValue = DRB.Metadata.CurrentNode.data.configuration.impersonateId;
        if (DRB.Utilities.HasValue(impersonateTypeValue) && DRB.Utilities.HasValue(impersonateIdValue)) {
            var checkUser = null;
            var newImpersonateId = "";
            switch (impersonateTypeValue) {
                case "mscrmcallerid":
                    checkUser = DRB.Utilities.GetRecordByProperty(DRB.Metadata.Users, "AADObjectId", impersonateIdValue);
                    if (DRB.Utilities.HasValue(checkUser)) { newImpersonateId = checkUser.Id; }
                    break;
                case "callerobjectid":
                    checkUser = DRB.Utilities.GetRecordById(DRB.Metadata.Users, impersonateIdValue);
                    if (DRB.Utilities.HasValue(checkUser)) { newImpersonateId = checkUser.AADObjectId; }
                    break;
            }
            if (DRB.Utilities.HasValue(newImpersonateId)) {
                $("#" + DRB.DOM.ImpersonateId.Input.Id).val(newImpersonateId).trigger("input").change();
            }
        }
    });
}

/**
 * Logic - Bind Impersonate Id
 * @param {string} id Id
 */
DRB.Logic.BindImpersonateId = function (id) {
    $("#" + id).on("change", function (e) {
        var impersonateIdValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.impersonateId = impersonateIdValue;
        var impersonateTypeValue = DRB.Metadata.CurrentNode.data.configuration.impersonateType;
        if (impersonateTypeValue === "callerobjectid") { $("#" + DRB.DOM.ImpersonateId.Dropdown.Id).val(impersonateTypeValue).change(); }
    });
}

/**
 * Logic - Bind Return Record
 * @param {string} id Id
 */
DRB.Logic.BindReturnRecord = function (id) {
    $("#" + id).on("change", function (e) {
        var returnRecordValue = $(this).val();
        if (returnRecordValue === "yes") {
            DRB.Metadata.CurrentNode.data.configuration.returnRecord = true;
            $("#" + DRB.DOM.Columns.Div.Id).show();
            $("#" + DRB.DOM.DivRelationship.Id).show();
        } else {
            DRB.Metadata.CurrentNode.data.configuration.returnRecord = false;
            $("#" + DRB.DOM.Columns.Div.Id).hide();
            $("#" + DRB.DOM.DivRelationship.Id).hide();
        }
    });
}

/**
 * Logic - Bind Use Alternate Key
 * @param {string} id Id
 */
DRB.Logic.BindUseAlternateKey = function (id) {
    $("#" + id).on("change", function (e) {
        var useAlternateKeyValue = $(this).val();
        if (useAlternateKeyValue === "yes") {
            // Selected Yes
            $("#" + DRB.DOM.PrimaryId.Div.Id).hide();
            $("#" + DRB.DOM.AlternateKey.Div.Id).show();
            DRB.Metadata.CurrentNode.data.configuration.useAlternateKey = true;
            if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.alternateKeyName)) {
                // Alternate Key Name present, we trigger the binding of Alternate Key dropdown
                $("#" + DRB.DOM.AlternateKey.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.alternateKeyName).change();
            } else {
                // Alternate Key Name not present, we trigger the binding of Alternate Key dropdown
                $("#" + DRB.DOM.AlternateKey.Dropdown.Id).val("").change();
            }
        } else {
            // Selected No, update configuration values
            $("#" + DRB.DOM.AlternateKey.Div.Id).hide();
            $("#" + DRB.DOM.PrimaryId.Div.Id).show();
            DRB.Metadata.CurrentNode.data.configuration.useAlternateKey = false;
            // we trigger the binding of Alternate Key dropdown
            $("#" + DRB.DOM.AlternateKey.Dropdown.Id).val("").change();
        }
    });
}

/**
 * Logic - Bind Alternate Key Value
 * @param {string} id Id
 */
DRB.Logic.BindAlternateKeyValue = function (id) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        var currentField = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields[elementIndex]));
        // if normal textbox save to the value property
        if (controlName.indexOf("txt_") === 0) { currentField.value = controlValue; }
        // if normal drodpown save to the value property and hide/show the X
        if (controlName.indexOf("cbx1_") === 0) {
            currentField.value = controlValue;
            if (DRB.Utilities.HasValue(controlValue)) { $('[data-id="' + controlName + '"]').children().last().show(); }
            else { $('[data-id="' + controlName + '"]').children().last().hide(); }
        }
        // datetime
        if (controlName.indexOf("txtd_") === 0) {
            currentField.value = controlValue;
            currentField.dateTimeBehavior = $("#" + controlName).attr("data-datetimebehavior");
        }
        // if textbox belonging to a lookup save to the value.id property
        if (controlName.indexOf("txt2_") === 0) {
            if (!DRB.Utilities.HasValue(currentField.value)) { currentField.value = {}; }
            currentField.value.id = controlValue;
        }
        if (controlName.indexOf("cbx2_") === 0) {
            if (!DRB.Utilities.HasValue(currentField.value)) { currentField.value = {}; }
            currentField.value.entityType = controlValue;
            var tableSetName = "";
            var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, controlValue);
            if (DRB.Utilities.HasValue(checkTable)) { tableSetName = checkTable.EntitySetName; }
            currentField.value.entitySetName = tableSetName;
        }
        DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields[elementIndex] = currentField;
    });
}

/**
 * Logic - Bind Alternate Key
 * @param {string} id Id
 */
DRB.Logic.BindAlternateKey = function (id) {
    $("#" + id).on("change", function (e) {
        var alternateKeyLogicalName = $(this).val();
        var keyHasPolymorphicLookup = false;
        DRB.Metadata.CurrentNode.data.configuration.alternateKeyName = alternateKeyLogicalName;
        var key = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentAlternateKeys, alternateKeyLogicalName);
        if (DRB.Utilities.HasValue(key)) {
            var keyFields = [];
            var allowedKeyTypes = ["Uniqueidentifier", "String", "Integer", "Decimal", "Picklist", "Lookup", "DateTime"];
            key.KeyAttributes.forEach(function (keyAttribute) {
                var keyColumn = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, keyAttribute);
                if (DRB.Utilities.HasValue(keyColumn)) {
                    if (allowedKeyTypes.indexOf(keyColumn.AttributeType) > -1) {
                        if (keyColumn.AdditionalProperties.IsPolymorphic === true) { keyHasPolymorphicLookup = true; }
                        var keyField = DRB.Utilities.GetRecordByProperty(DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields, "logicalName", keyColumn.LogicalName);
                        var keyColumnValue = null;
                        if (DRB.Utilities.HasValue(keyField)) {
                            // lookup store the value in a different ways than others key types
                            if (keyColumn.AttributeType === "Lookup") {
                                var lookupValue = { entityType: "", entitySetName: "", id: "" };
                                if (DRB.Utilities.HasValue(keyField.value)) {
                                    if (DRB.Utilities.HasValue(keyField.value.id)) { lookupValue.id = keyField.value.id; }
                                    if (DRB.Utilities.HasValue(keyField.value.entityType)) { lookupValue.entityType = keyField.value.entityType; }
                                    if (DRB.Utilities.HasValue(keyField.value.entitySetName)) { lookupValue.entitySetName = keyField.value.entitySetName; }
                                }
                                keyColumnValue = lookupValue;
                            } else {
                                keyColumnValue = keyField.value;
                            }
                        }
                        keyFields.push({ logicalName: keyColumn.LogicalName, schemaName: keyColumn.SchemaName, oDataName: keyColumn.ODataName, label: keyColumn.Name, type: keyColumn.AttributeType, value: keyColumnValue });
                    }
                }
            });
            DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields = keyFields;
        } else {
            DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields = [];
        }

        $("#" + DRB.DOM.AlternateKey.DivColumns.Id).empty();

        if (keyHasPolymorphicLookup === true) {
            DRB.UI.ShowError("Unsupported Alternate Key", "This Alternate Key uses a Polymorphic Lookup");
            $(this).val("");
            DRB.UI.RefreshDropdown($(this).attr('id'));
            $(this).change();
            return;
        }

        if (DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields.length > 0) {
            // create the HTML table containing the Key Columns 
            $("#" + DRB.DOM.AlternateKey.DivColumns.Id).append(DRB.UI.CreateSpacer());
            var divTable = DRB.UI.CreateTable(DRB.DOM.AlternateKey.Table.Id);
            $("#" + DRB.DOM.AlternateKey.DivColumns.Id).append(divTable);
            DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields.forEach(function (field, fieldIndex) {

                var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, field.logicalName);
                if (DRB.Utilities.HasValue(column)) {
                    var tr = DRB.UI.CreateTr(DRB.DOM.AlternateKey.Tr.Id + fieldIndex);
                    var tdColumn = DRB.UI.CreateTd(DRB.DOM.AlternateKey.TdColumn.Id + fieldIndex);
                    var divValue = DRB.UI.CreateTd(DRB.DOM.AlternateKey.TdValue.Id + fieldIndex);
                    divTable.append(tr);
                    tr.append(tdColumn);
                    tr.append(divValue);
                    // set label
                    tdColumn.append(DRB.UI.CreateSpan("span_" + DRB.DOM.AlternateKey.TdColumn.Id + fieldIndex, field.label, field.logicalName));

                    switch (field.type) {
                        case "Uniqueidentifier":
                            divValue.append(DRB.UI.CreateInputGuid("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex));
                            DRB.Common.BindGuid("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            DRB.Logic.BindAlternateKeyValue("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change();
                            break;
                        case "String":
                            divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                            DRB.Logic.BindAlternateKeyValue("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change();
                            break;
                        case "Integer":
                            divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue));
                            DRB.Common.BindInteger("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                            DRB.Logic.BindAlternateKeyValue("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change().trigger("input");
                            break;
                        case "Decimal":
                            divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue + " - Precision: " + column.AdditionalProperties.Precision));
                            DRB.Common.BindNumber("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                            DRB.Logic.BindAlternateKeyValue("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change().trigger("input");
                            break;
                        case "Picklist":
                            var currentId = "cbx1_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex;
                            divValue.append(DRB.UI.CreateDropdown(currentId));
                            var options = [];
                            if (DRB.Utilities.HasValue(column.OptionValues)) {
                                column.OptionValues.forEach(function (option) {
                                    options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                                });
                            }
                            DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                            $('[data-id="' + currentId + '"]').append(DRB.UI.CreateRemoveButton(DRB.UI.UnselectDropdown, currentId));
                            $('[data-id="' + currentId + '"]').children().last().hide();
                            DRB.Logic.BindAlternateKeyValue("cbx1_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#cbx1_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change();
                            break;

                        case "Lookup":
                            divValue.append(DRB.UI.CreateInputGuid("txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex));
                            DRB.Common.BindGuid("txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            DRB.Logic.BindAlternateKeyValue("txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);

                            if (DRB.Utilities.HasValue(field.value) && DRB.Utilities.HasValue(field.value.id)) {
                                $("#txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value.id).change();
                            }
                            $("#txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).trigger("input");
                            if (column.AdditionalProperties.Targets.length > 0) {
                                divValue.append(DRB.UI.CreateSimpleDropdown("cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex));
                                var targets = [];
                                column.AdditionalProperties.Targets.forEach(function (target) {
                                    var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                                    if (DRB.Utilities.HasValue(targetTable)) {
                                        targets.push(new DRB.Models.Table(target, targetTable.Name));
                                    }
                                });
                                DRB.UI.FillDropdown("cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, "", new DRB.Models.Records(targets).ToDropdown());
                                divValue.append(DRB.UI.CreateLookup("lkp_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, DRB.UI.OpenLookup,
                                    {
                                        openCustom: true,
                                        defaultEntityType: column.AdditionalProperties.Targets[0],
                                        entityTypes: column.AdditionalProperties.Targets,
                                        textId: "txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex,
                                        dropdownId: "cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex
                                    }));

                                DRB.Logic.BindAlternateKeyValue("cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                                if (DRB.Utilities.HasValue(field.value) && DRB.Utilities.HasValue(field.value.entityType)) {
                                    $("#cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value.entityType).change();
                                } else {
                                    $("#cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(targets[0].Id).change();
                                }
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
                            divValue.append(DRB.UI.CreateInputDateTime("txtd_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, dateTimeBehavior, "Behavior: " + clearedDateTimeBehavior + " - Format: " + clearedDateTimeFormat));
                            DRB.Logic.BindAlternateKeyValue("txtd_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txtd_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change();
                            $("#txtd_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).datetimepicker({ format: pickerFormat, ignoreReadonly: true, showClear: true, showTodayButton: true }).on('dp.change', function (e) { $(e.target).change(); });
                            break;
                    }
                }
            });
        }
    });
}

/**
 * Logic - Bind Columns
 * @param {string} id Id
*/
DRB.Logic.BindColumns = function (id) {
    $("#" + id).on("change", function (e) {
        DRB.Metadata.CurrentNode.data.configuration.fields = [];
        var selectedColumns = $(this).val();
        selectedColumns.forEach(function (selectedColumn) {
            var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, selectedColumn);
            if (DRB.Utilities.HasValue(column)) {
                DRB.Metadata.CurrentNode.data.configuration.fields.push({ logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName });
            }
        });
    });
}

/**
 * Logic - Bind Select Relationship
 * @param {string} id Id
*/
DRB.Logic.BindSelectRelationship = function (id, metadataRelationship, domSelectColumnsDropdown, domRelationshipDropdown) {
    $("#" + id).on("change", function (e) {
        var selectedRelationshipValue = $(this).val();
        var selectedRelationship = DRB.Utilities.GetRecordById(metadataRelationship, selectedRelationshipValue);
        if (DRB.Utilities.HasValue(selectedRelationship)) {

            var columns = [];
            selectedRelationship.Columns.forEach(function (rc) {
                var rcColumn = new DRB.Models.Column(rc.ColumnLogicalName, rc.Name, rc.ColumnSchemaName, rc.ColumnAttributeType, rc.ColumnIsPrimaryIdAttribute, rc.ColumnIsPrimaryNameAttribute, rc.ColumnRequiredLevel, rc.ColumnIsValidForRead, rc.ColumnIsValidForCreate, rc.ColumnIsValidForUpdate, rc.ColumnAdditionalProperties);
                rcColumn.Id = rc.Id;
                columns.push(rcColumn);
            });

            DRB.UI.FillDropdown(domSelectColumnsDropdown.Id, domSelectColumnsDropdown.Name, new DRB.Models.Records(columns).ToDropdown(), false, false, false, 6);
            // get all the values in the main dropdown
            var relationshipColumsValues = $.map($("#" + domRelationshipDropdown.Id + " option"), function (option) { return option.value; });
            var alreadySelectedColumns = [];
            relationshipColumsValues.forEach(function (relationshipColumsValue) {
                if (relationshipColumsValue.indexOf(selectedRelationship.SchemaName + "|") === 0) { alreadySelectedColumns.push(relationshipColumsValue); }
            });
            $("#" + domSelectColumnsDropdown.Id).val(alreadySelectedColumns);
            DRB.UI.RefreshDropdown(domSelectColumnsDropdown.Id);
        }
    });
}

/**
 * Logic - Bind Select Relationship Columns
 * @param {string} id Id
*/
DRB.Logic.BindSelectRelationshipColumns = function (id, relationshipType, relationshipMetadata) {
    $("#" + id).on("change", function (e) {
        var selectedColumnsValue = $(this).val();
        // Get the relationship
        var selectedRelationshipValue = $("#" + DRB.DOM.RelationshipSelect.Relationship.Dropdown.Id).val();
        if (DRB.Utilities.HasValue(selectedRelationshipValue)) {

            var newRelationshipColumns = []; // array to store the selection
            // get the already filled columns
            var fullRelationshipColumns = $.map($("#" + DRB.DOM.Relationship[relationshipType].Dropdown.Id + " option"), function (option) { return option.value; });

            // we add the other relationship columns except the current one
            fullRelationshipColumns.forEach(function (fullOneToManyColumn) {
                if (fullOneToManyColumn.indexOf(selectedRelationshipValue + "|") !== 0) { newRelationshipColumns.push(fullOneToManyColumn); }
            });

            // we add to the new columns list the selected one
            selectedColumnsValue.forEach(function (selectedColumnValue) { newRelationshipColumns.push(selectedColumnValue); });

            var relationshipRecords = [];
            newRelationshipColumns.forEach(function (rlColumn) {
                var rlColumnSplit = rlColumn.split("|");
                if (rlColumnSplit.length === 2) {
                    var relationship = DRB.Utilities.GetRecordById(relationshipMetadata, rlColumnSplit[0]);
                    if (DRB.Utilities.HasValue(relationship)) {
                        var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, relationship.TargetTable);
                        if (DRB.Utilities.HasValue(targetTable)) {
                            var targetColumns = targetTable.Columns;
                            targetColumns.forEach(function (targetColumn) {
                                if (targetColumn.LogicalName === rlColumnSplit[1]) {
                                    relationshipRecords.push(new DRB.Models.RelationshipColumn(relationship.SchemaName, relationship.Type, relationship.NavigationProperty, relationship.NavigationAttribute, relationship.NavigationAttributeName, relationship.TargetTable, targetTable.Name, targetColumn.LogicalName, targetColumn.Name, targetColumn.SchemaName, targetColumn.AttributeType, targetColumn.IsPrimaryIdAttribute, targetColumn.IsPrimaryNameAttribute, targetColumn.RequiredLevel, targetColumn.IsValidForRead, targetColumn.IsValidForCreate, targetColumn.IsValidForUpdate, targetColumn.AdditionalProperties));
                                }
                            });
                        }
                    }
                }
            });
            // refresh the main relationship dropdown
            DRB.UI.FillDropdownWithGroups(DRB.DOM.Relationship[relationshipType].Dropdown.Id, DRB.DOM.Relationship[relationshipType].Dropdown.Name, new DRB.Models.Records(relationshipRecords).ToDropdown(), true);
            // refresh also the CurrentNode
            var refreshedRelationshipColumns = $.map($("#" + DRB.DOM.Relationship[relationshipType].Dropdown.Id + " option"), function (option) { return option.value; });
            var parsedResult = DRB.Logic.ExportRelationships(refreshedRelationshipColumns, relationshipMetadata);

            switch (relationshipType) {
                case "OneToMany": DRB.Metadata.CurrentNode.data.configuration.oneToMany = parsedResult; break;
                case "ManyToOne": DRB.Metadata.CurrentNode.data.configuration.manyToOne = parsedResult; break;
                case "ManyToMany": DRB.Metadata.CurrentNode.data.configuration.manyToMany = parsedResult; break;
            }
        }
    });
}

/**
 * Logic - Click Select Relationship Columns
 * @param {string} relationshipType Relationship Type
*/
DRB.Logic.ClickSelectRelationshipColumns = function (relationshipType) {
    var relationshipMetadata = null;
    var popupTitle = DRB.DOM.Relationship[relationshipType].Span.Name;
    switch (relationshipType) {
        case "OneToMany": relationshipMetadata = DRB.Metadata.CurrentOneToMany; break;
        case "ManyToOne": relationshipMetadata = DRB.Metadata.CurrentManyToOne; break;
        case "ManyToMany": relationshipMetadata = DRB.Metadata.CurrentManyToMany; break;
    }

    var selectDOM = DRB.DOM.RelationshipSelect;
    var relationshipSelectionDiv = DRB.UI.CreateEmptyDiv(selectDOM.Div.Id);

    relationshipSelectionDiv.append(DRB.UI.CreateSpan(selectDOM.Relationship.Span.Id, selectDOM.Relationship.Span.Name));
    relationshipSelectionDiv.append(DRB.UI.CreateDropdown(selectDOM.Relationship.Dropdown.Id));
    relationshipSelectionDiv.append(DRB.UI.CreateSpacer());
    relationshipSelectionDiv.append(DRB.UI.CreateSpan(selectDOM.Columns.Span.Id, selectDOM.Columns.Span.Name));
    relationshipSelectionDiv.append(DRB.UI.CreateDropdown(selectDOM.Columns.Dropdown.Id, true));
    relationshipSelectionDiv.append(DRB.UI.CreateSpacing());

    DRB.UI.Show(popupTitle, relationshipSelectionDiv, "xl");
    DRB.UI.FillDropdown(selectDOM.Relationship.Dropdown.Id, selectDOM.Relationship.Dropdown.Name, new DRB.Models.Records(relationshipMetadata).ToDropdown(), false, false, false, 6);

    // Make text bold on the relationships where at least a column is selected    
    var currentRelationshipValues = $.map($("#" + DRB.DOM.Relationship[relationshipType].Dropdown.Id + " option"), function (option) { return option.value; });
    var currentRelationshipNames = [];
    currentRelationshipValues.forEach(function (currentRelationshipValue) {
        var relationshipSplit = currentRelationshipValue.split("|");
        if (relationshipSplit.length === 2) { currentRelationshipNames.push(relationshipSplit[0]); }
    });
    currentRelationshipNames = DRB.Utilities.RemoveDuplicatesFromArray(currentRelationshipNames); // remove duplicates

    if (currentRelationshipNames.length > 0) {
        var relationshipOptions = $.map($("#" + selectDOM.Relationship.Dropdown.Id + " option"), function (option) { return option; });
        relationshipOptions.forEach(function (relationshipOption) {
            if (currentRelationshipNames.indexOf(relationshipOption.value) > -1) { relationshipOption.style = "font-weight: bold;"; }
        });
        DRB.UI.RefreshDropdown(selectDOM.Relationship.Dropdown.Id);
    }

    DRB.UI.ResetDropdown(selectDOM.Columns.Dropdown.Id, selectDOM.Columns.Dropdown.Name);
    // Bindings
    DRB.Logic.BindSelectRelationship(selectDOM.Relationship.Dropdown.Id, relationshipMetadata, selectDOM.Columns.Dropdown, DRB.DOM.Relationship[relationshipType].Dropdown);
    DRB.Logic.BindSelectRelationshipColumns(selectDOM.Columns.Dropdown.Id, relationshipType, relationshipMetadata);
}
// #endregion