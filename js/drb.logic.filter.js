// #region DRB.Logic.Filter
// Filter Columns Functions (used in Retrieve Multiple)
/**
 * Logic - Bind Set Column Value
 * @param {string} id Id
 * @param {string} domObject DOM Object
 * @param {string} domIndex DOM Index
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindFilterColumnValue = function (id) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        // update DRB.Metadata and data.configuration with the new value
        var refMetadata = DRB.Metadata;
        var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

        var splittedControlName = controlName.split("_");
        // remove the first entries until we find "filterCriteria"
        while (splittedControlName.length > 0 && splittedControlName[0] !== "filterCriteria") { splittedControlName.shift(); }
        var currentIndex = splittedControlName.pop(); // remove index

        // get full Metadata and configuration path
        splittedControlName.forEach(function (path) {
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

        refMetadata.forEach(function (setColumn, columnIndex) {
            if (setColumn.Id === elementIndex) {
                // save the current column properties
                var currentField = JSON.parse(JSON.stringify(setColumn.Value));

                // if normal textbox save to the value property
                if (controlName.indexOf("txt_") === 0) { currentField.value = controlValue; }

                // choice/choices
                if (controlName.indexOf("cbx1_") === 0) { currentField.value = controlValue; }
                if (controlName.indexOf("cbxm_") === 0) { currentField.value = controlValue; }

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
                }

                // update DRB.Metadata and data.configuration
                setColumn.Value = currentField;
                refConfiguration[columnIndex] = currentField;
            }
        });
    });
}

/**
 * Logic - Bind Filter Column Operator
 * @param {string} id Id
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindFilterColumnOperator = function (id, domObject) {
    $("#" + id).on("change", function (e) {
        var operator = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        var refMetadata = DRB.Metadata;
        var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

        var splittedControlName = controlName.split("_");
        // remove the first entries until we find "filterCriteria"
        while (splittedControlName.length > 0 && splittedControlName[0] !== "filterCriteria") { splittedControlName.shift(); }
        var currentIndex = splittedControlName.pop(); // remove index
        // get full Metadata and configuration path
        splittedControlName.forEach(function (path) {
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

        var columnLogicalName = "";
        var requiredValue = true;
        refMetadata.forEach(function (setColumn, columnIndex) {
            if (setColumn.Id === elementIndex) {
                DRB.Settings.OperatorsToStop.forEach(function (operatorToStop) { if (operator === operatorToStop.Id) { requiredValue = false; } });
                columnLogicalName = setColumn.Value.logicalName;
                setColumn.Value.operator = operator;
                setColumn.Value.requiredValue = requiredValue;
                setColumn.Value.value = null;
                refConfiguration[columnIndex].operator = operator;
                refConfiguration[columnIndex].value = null;
                refConfiguration[columnIndex].requiredValue = requiredValue;
            }
        });

        var metadataPath = splittedControlName.join("_");
        metadataPath += "_" + currentIndex;

        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnLogicalName);
        if (DRB.Utilities.HasValue(column)) {
            $("#" + DRB.DOM[domObject].TdValue.Id + metadataPath).html(""); // empty the cell

            if (requiredValue === true) {
                var divValue = DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivValue.Id + metadataPath);
                $("#" + DRB.DOM[domObject].TdValue.Id + metadataPath).append(divValue);
                switch (column.AttributeType) {
                    case "Uniqueidentifier":
                        divValue.append(DRB.UI.CreateInputGuid("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath));
                        DRB.Common.BindGuid("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        if (column.IsPrimaryIdAttribute === true) {
                            var target = DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName;
                            var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                            if (DRB.Utilities.HasValue(targetTable)) {
                                var targets = [];
                                targets.push(new DRB.Models.Table(target, targetTable.Name));
                                divValue.append(DRB.UI.CreateSimpleDropdown("cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath));
                                DRB.UI.FillDropdown("cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "", new DRB.Models.Records(targets).ToDropdown());
                                divValue.append(DRB.UI.CreateLookup("lkp_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, DRB.UI.OpenLookup,
                                    {
                                        openCustom: true,
                                        defaultEntityType: target,
                                        entityTypes: [target],
                                        textId: "txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath,
                                        dropdownId: "cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath
                                    }));

                                DRB.Logic.BindFilterColumnValue("cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                                $("#cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath).val(targets[0].Id).change();
                            }
                        }
                        break;

                    case "String":
                        divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "Memo":
                        divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "Integer":
                    case "BigInt":
                        divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue));
                        DRB.Common.BindInteger("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "Decimal":
                    case "Double":
                    case "Money":
                        divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue + " - Precision: " + column.AdditionalProperties.Precision));
                        DRB.Common.BindNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "Boolean":
                    case "Picklist":
                    case "State":
                    case "Status":
                        var currentId = "cbx1_" + DRB.DOM[domObject].ControlValue.Id + metadataPath;
                        divValue.append(DRB.UI.CreateDropdown(currentId));
                        var options = [];
                        if (DRB.Utilities.HasValue(column.OptionValues)) {
                            column.OptionValues.forEach(function (option) {
                                options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                            });
                        }
                        DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                        DRB.Logic.BindFilterColumnValue("cbx1_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "MultiPicklist":
                        var currentId = "cbxm_" + DRB.DOM[domObject].ControlValue.Id + metadataPath;
                        divValue.append(DRB.UI.CreateDropdown(currentId, true));
                        var options = [];
                        if (DRB.Utilities.HasValue(column.OptionValues)) {
                            column.OptionValues.forEach(function (option) {
                                options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                            });
                        }
                        DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                        DRB.Logic.BindFilterColumnValue("cbxm_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "Lookup":
                    case "Owner":
                    case "Customer":
                        divValue.append(DRB.UI.CreateInputGuid("txt2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath));
                        DRB.Common.BindGuid("txt2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        DRB.Logic.BindFilterColumnValue("txt2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        if (column.AdditionalProperties.Targets.length > 0) {
                            divValue.append(DRB.UI.CreateSimpleDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath));
                            var targets = [];
                            column.AdditionalProperties.Targets.forEach(function (target) {
                                var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                                if (DRB.Utilities.HasValue(targetTable)) {
                                    targets.push(new DRB.Models.Table(target, targetTable.Name));
                                }
                            });
                            DRB.UI.FillDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "", new DRB.Models.Records(targets).ToDropdown());


                            divValue.append(DRB.UI.CreateLookup("lkp_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, DRB.UI.OpenLookup,
                                {
                                    openCustom: true,
                                    defaultEntityType: column.AdditionalProperties.Targets[0],
                                    entityTypes: column.AdditionalProperties.Targets,
                                    textId: "txt2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath,
                                    dropdownId: "cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath
                                }));

                            DRB.Logic.BindFilterColumnValue("cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                            $("#cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath).val(targets[0].Id).change();
                        }
                        break;
                    case "DateTime":
                        var datetimeOperatorFound = false;
                        var operatorMinValue = 0;
                        var operatorMaxValue = 0;
                        switch (operator) {
                            case "NextXHours": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 2000; break;
                            case "LastXHours": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 2000; break;
                            case "NextXDays": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 500; break;
                            case "LastXDays": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 500; break;
                            case "NextXWeeks": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXWeeks": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "NextXMonths": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXMonths": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "NextXYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "NextXFiscalYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXFiscalYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "NextXFiscalPeriods": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXFiscalPeriods": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "OlderThanXMinutes": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 1440; break;
                            case "OlderThanXHours": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 2000; break;
                            case "OlderThanXDays": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 500; break;
                            case "OlderThanXWeeks": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "OlderThanXMonths": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "OlderThanXYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                        }
                        if (datetimeOperatorFound === true) {
                            divValue.append(DRB.UI.CreateInputNumber("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "Min Value: " + operatorMinValue + " - Max Value: " + operatorMaxValue));
                            DRB.Common.BindInteger("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, operatorMinValue, operatorMaxValue);
                            DRB.Logic.BindFilterColumnValue("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        }
                        if (datetimeOperatorFound === false) {
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
                            divValue.append(DRB.UI.CreateInputDateTime("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, dateTimeBehavior, "Behavior: " + clearedDateTimeBehavior + " - Format: " + clearedDateTimeFormat));
                            DRB.Logic.BindFilterColumnValue("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                            $("#txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath).datetimepicker({ format: pickerFormat, ignoreReadonly: true, showClear: true, showTodayButton: true }).on('dp.change', function (e) { $(e.target).change(); });
                        }
                        break;
                }
            }
        }
    });
}

/**
 * Logic - Bind Filter Column
 * @param {string} id Id
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindFilterColumn = function (id, columnType, domObject, metadataPath) {
    $("#" + id).on("change", function (e) {
        var columnLogicalName = $(this).val();
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnLogicalName);
        if (DRB.Utilities.HasValue(column)) {
            // define field
            var field = { logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName, operator: null, requiredValue: false, value: null };

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

            $("#" + DRB.DOM[domObject].TdOperator.Id + uniqueIndex).html(""); // empty the cell
            $("#" + DRB.DOM[domObject].TdValue.Id + uniqueIndex).html(""); // empty the cell
            var divOperator = DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivOperator.Id + uniqueIndex);
            $("#" + DRB.DOM[domObject].TdOperator.Id + uniqueIndex).append(divOperator);

            var currentId = DRB.DOM[domObject].ControlOperator.Id + uniqueIndex;
            divOperator.append(DRB.UI.CreateSimpleDropdown(currentId));

            var optionsOperator = DRB.Settings.OptionsOperatorBasic;

            switch (field.type) {
                case "Owner": optionsOperator = DRB.Settings.OptionsOperatorOwner; break;
                case "String": optionsOperator = DRB.Settings.OptionsOperatorString; break;
                case "Memo": optionsOperator = DRB.Settings.OptionsOperatorMemo; break;
                case "DateTime": optionsOperator = DRB.Settings.OptionsOperatorDateTime; break;
                case "MultiPicklist": optionsOperator = DRB.Settings.OptionsOperatorMultiPicklist; break;
                case "BigInt":
                case "Integer":
                case "Decimal":
                case "Double":
                case "Money":
                    optionsOperator = DRB.Settings.OptionsOperatorNumber;
                    break;
            }

            if (field.type === "Uniqueidentifier" && column.IsPrimaryIdAttribute === true) {
                var target = DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName;
                var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                if (DRB.Utilities.HasValue(targetTable)) {
                    if (targetTable.HasHierarchy === true) {
                        optionsOperator = DRB.Settings.OptionsOperatorHierarchyPrimaryKey;
                    }
                }
            }

            if (field.type === "Lookup") {
                if (column.AdditionalProperties.Targets.length === 1) {
                    var target = column.AdditionalProperties.Targets[0];
                    var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                    if (DRB.Utilities.HasValue(targetTable)) {
                        switch (target) {
                            case "systemuser": optionsOperator = DRB.Settings.OptionsOperatorLookupUser; break;
                            case "businessunit": optionsOperator = DRB.Settings.OptionsOperatorLookupBusinessUnit; break;
                        }
                    }
                }
            }

            DRB.UI.FillDropdown(currentId, "Select Operator", new DRB.Models.Records(optionsOperator).ToDropdown());
            DRB.Logic.BindFilterColumnOperator(currentId, domObject);
        }
        DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);
    });
}
// #endregion