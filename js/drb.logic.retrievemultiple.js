// #region DRB.Logic.RetrieveMultiple
/**
 * Retrieve Multiple - Refresh Dropdown Logic
 * @param {string} logicValue Logic Value ("and", "or")
 * @param {string} controlName Control Name
 * @param {boolean} isGroupLogic Is Group Logic
*/
DRB.Logic.RetrieveMultiple.RefreshDropdownLogic = function (logicValue, controlName, isGroupLogic) {
    // if filterFields control name is like
    // cbx_fc_filterCriteria_filterFields
    // cbx_fc_filterCriteria_filterGroups_0_filterFields
    // cbx_fc_filterCriteria_filterGroups_1_filterGroups_5_filterFields

    // if filterGroups control name is like
    // cbx_fg_filterCriteria_filterGroups
    // cbx_fg_filterCriteria_filterGroups_0_filterGroups
    // cbx_fg_filterCriteria_filterGroups_0_filterGroups_2_filterGroups

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    // from the control name navigate to the right path but paying attention to the id of the group
    var splittedControlName = controlName.split("_");
    // remove the first entries until we find "filterCriteria"
    while (splittedControlName.length > 0 && splittedControlName[0] !== "filterCriteria") { splittedControlName.shift(); }
    // "filterFields" or "filterGroups" is always the last, remove it
    if (splittedControlName.length > 0) { splittedControlName.pop(); }

    splittedControlName.forEach(function (path) {
        if (isNaN(parseInt(path))) {
            // not a number
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    if (isGroupLogic === false) {
        // filterFields
        // set the logic value to the metadata
        refMetadata.filterFieldsLogic = logicValue;
        refConfiguration.filterFieldsLogic = logicValue;
    } else {
        // filterGroups
        // set the logic value to the metadata
        refMetadata.filterGroupsLogic = logicValue;
        refConfiguration.filterGroupsLogic = logicValue;
        // refresh the middle spans
        var spanClass = splittedControlName.join("_") + "_" + "filterGroups";
        $("." + spanClass).each(function (i, span) { $(span).html(logicValue); });
    }
}
/**
 * Retrieve Multiple - Bind Columns Logic
 * @param {string} id Id
*/
DRB.Logic.RetrieveMultiple.BindColumnsLogic = function (id) {
    $("#" + id).on("change", function (e) {
        // get value and control name
        var logicValue = $(this).val();
        var controlName = $(this).attr('id');
        DRB.Logic.RetrieveMultiple.RefreshDropdownLogic(logicValue, controlName, false);
    });
}

/**
 * Retrieve Multiple - Bind Groups Logic
 * @param {string} id Id
*/
DRB.Logic.RetrieveMultiple.BindGroupsLogic = function (id) {
    $("#" + id).on("change", function (e) {
        // get value and control name
        var logicValue = $(this).val();
        var controlName = $(this).attr('id');
        DRB.Logic.RetrieveMultiple.RefreshDropdownLogic(logicValue, controlName, true);
    });
}

/**
 * Retrieve Multiple - Hide Previous Add Button
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.HidePreviousAddButton = function (metadataPath) {
    $("#" + DRB.DOM.FilterGroups.DivChoice.Id + metadataPath).hide();
}

/**
 * Retrieve Multiple - Show Previous Add Button
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.ShowPreviousAddButton = function (metadataPath) {
    var splittedMetadataPath = metadataPath.split("_");
    splittedMetadataPath.pop(); // remove last item (filterFields or filterGroups)
    var previousMetadataPath = splittedMetadataPath.join("_");
    $("#" + DRB.DOM.FilterGroups.DivChoice.Id + previousMetadataPath).show();
}

/**
 * Retrieve Multiple - Add Filter Group
 * @param {string} container Container
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddFilterGroup = function (container, domObject, metadataPath) {
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");
    splittedMetadataPath.forEach(function (path) {
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

    var index = 0;
    if (refMetadata.length > 0) {
        var maxValue = -1;
        refMetadata.forEach(function (item) { if (item.Id > maxValue) { maxValue = item.Id; } });
        index = maxValue + 1;
    }

    refMetadata.push({ Id: index });
    refConfiguration.push({});

    var metadataPathIndex = metadataPath + "_" + index;


    if (refMetadata.length > 1) {
        // extract the logic value
        var logicValue = $("#" + DRB.DOM[domObject].DropdownLogic.Id + metadataPath).val();
        $("#" + container).append(DRB.UI.CreateSpan("", logicValue, null, metadataPath + " filterspan"));
        $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).show();
    }

    $("#" + container).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].MainDiv.Id + metadataPathIndex, "mapping-container0"));

    // Div Choice
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPathIndex).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivChoice.Id + metadataPathIndex));
    // add the close button inside the Div Choice
    $("#" + DRB.DOM[domObject].DivChoice.Id + metadataPathIndex).append(DRB.UI.CreateCloseButton(DRB.Logic.RetrieveMultiple.RemoveFilterGroup, domObject, metadataPathIndex));
    $("#" + DRB.DOM[domObject].DivChoice.Id + metadataPathIndex).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivChoice.Id + metadataPathIndex + "_dropdown", "dropdown shortdropdown"));
    $("#" + DRB.DOM[domObject].DivChoice.Id + metadataPathIndex + "_dropdown").append(DRB.UI.CreateButton(DRB.DOM[domObject].ButtonChoice.Id + metadataPathIndex, DRB.DOM[domObject].ButtonChoice.Name, DRB.DOM[domObject].ButtonChoice.Class));
    $("#" + DRB.DOM[domObject].ButtonChoice.Id + metadataPathIndex).attr("data-toggle", "dropdown");
    $("#" + DRB.DOM[domObject].ButtonChoice.Id + metadataPathIndex).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivDropdownChoice.Id + metadataPathIndex, DRB.DOM[domObject].DivDropdownChoice.Class));
    $("#" + DRB.DOM[domObject].DivDropdownChoice.Id + metadataPathIndex).append(DRB.UI.CreateButton(DRB.DOM[domObject].ButtonChoiceColumns.Id + metadataPathIndex, DRB.DOM[domObject].ButtonChoiceColumns.Name, DRB.DOM[domObject].ButtonChoiceColumns.Class, DRB.Logic.RetrieveMultiple.AddManuallyFilterColumns, "FilterColumns", metadataPathIndex));
    $("#" + DRB.DOM[domObject].DivDropdownChoice.Id + metadataPathIndex).append(DRB.UI.CreateButton(DRB.DOM[domObject].ButtonChoiceGroups.Id + metadataPathIndex, DRB.DOM[domObject].ButtonChoiceGroups.Name, DRB.DOM[domObject].ButtonChoiceGroups.Class, DRB.Logic.RetrieveMultiple.AddManuallyFilterGroups, "FilterGroups", metadataPathIndex));
}

/**
 * Retrieve Multiple - Remove Filter Group
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.RemoveFilterGroup = function (domObject, metadataPath) {
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");
    var indexToRemove = parseInt(splittedMetadataPath.pop()); // last path is always a number
    // navigate to the deepest path, refConfiguration goes by the index and not by path when path is a number
    splittedMetadataPath.forEach(function (path) {
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

    // remove the item from metadata and configuration
    for (var i = 0; i < refMetadata.length; i++) {
        if (refMetadata[i].Id === indexToRemove) {
            refMetadata.splice(i, 1);
            refConfiguration.splice(i, 1);

            if (i > 0) {
                // remove the previous span if is not the first element
                $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).prev().remove();
            }
            else {
                // first element, remove the span after
                $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).next().remove();
            }
            // remove from UI
            $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).remove();
            break;
        }
    }
    if (refMetadata.length < 2) {
        var previousMetadataPath = splittedMetadataPath.join("_"); // previously pop the index so the previousMetadataPath will be xyz_filterGroups
        if (refMetadata.length === 1) {
            $("#" + DRB.DOM[domObject].DivLogic.Id + previousMetadataPath).hide();
            // set the logic to AND
            $("#" + DRB.DOM[domObject].DropdownLogic.Id + previousMetadataPath).val(DRB.Settings.OptionsAndOr[0].Id).change();
        }

        if (refMetadata.length === 0) {
            DRB.Logic.RetrieveMultiple.RemoveFilterGroups(domObject, previousMetadataPath);
        }
    }
}

/**
 * Retrieve Multiple - Start Add Filter
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.StartAddFilter = function (domObjectGroups, domObjectColumns, metadataPath) {
    DRB.Logic.RetrieveMultiple.AddManuallyFilterGroups(domObjectGroups, metadataPath);
    DRB.Logic.RetrieveMultiple.AddManuallyFilterColumns(domObjectColumns, metadataPath + "_filterGroups_0");
}

/**
 * Retrieve Multiple - Add Manually Filter Groups
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddManuallyFilterGroups = function (domObject, metadataPath) {
    DRB.Logic.RetrieveMultiple.AddFilterGroups(domObject, metadataPath);
    DRB.Logic.RetrieveMultiple.AddFilterGroup(DRB.DOM[domObject].DivGroups.Id + metadataPath + "_filterGroups", domObject, metadataPath + "_filterGroups");
}

/**
 * Retrieve Multiple - Add Filter Groups
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddFilterGroups = function (domObject, metadataPath) {
    DRB.Logic.RetrieveMultiple.HidePreviousAddButton(metadataPath);
    var container = DRB.DOM.FilterBy.MainDiv.Id;
    if (metadataPath !== "filterCriteria") { container = DRB.DOM[domObject].MainDiv.Id + metadataPath; }

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    // navigate to the deepest path, refConfiguration goes by the index and not by path when path is a number
    var splittedMetadataPath = metadataPath.split("_");
    splittedMetadataPath.forEach(function (path) {
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

    refMetadata.filterType = "groups";
    refConfiguration.filterType = "groups";
    if (!refMetadata.hasOwnProperty("filterGroupsLogic")) { refMetadata.filterGroupsLogic = "and"; }
    if (!refConfiguration.hasOwnProperty("filterGroupsLogic")) { refConfiguration.filterGroupsLogic = "and"; }

    if (!refMetadata.hasOwnProperty("filterGroups")) { refMetadata.filterGroups = []; }
    if (!refConfiguration.hasOwnProperty("filterGroups")) { refConfiguration.filterGroups = []; }

    metadataPath += "_filterGroups";
    $("#" + container).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivGroups.Id + metadataPath));

    $("#" + container).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivOptions.Id + metadataPath));
    // add group button
    $("#" + DRB.DOM[domObject].DivOptions.Id + metadataPath).append(DRB.UI.CreateSpacer());
    $("#" + DRB.DOM[domObject].DivOptions.Id + metadataPath).append(DRB.UI.CreateButton(DRB.DOM[domObject].AddButton.Id + metadataPath, DRB.DOM[domObject].AddButton.Name, DRB.DOM[domObject].AddButton.Class, DRB.Logic.RetrieveMultiple.AddFilterGroup, DRB.DOM[domObject].DivGroups.Id + metadataPath, domObject, metadataPath));

    // add logic dropdown
    $("#" + DRB.DOM[domObject].DivOptions.Id + metadataPath).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivLogic.Id + metadataPath, DRB.DOM[domObject].DivLogic.Class));
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).append(DRB.UI.CreateSpan(DRB.DOM[domObject].SpanLogic.Id + metadataPath, DRB.DOM[domObject].SpanLogic.Name));
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).append(DRB.UI.CreateSimpleDropdown(DRB.DOM[domObject].DropdownLogic.Id + metadataPath));
    DRB.UI.FillDropdown(DRB.DOM[domObject].DropdownLogic.Id + metadataPath, DRB.DOM[domObject].DropdownLogic.Name, new DRB.Models.Records(DRB.Settings.OptionsAndOr).ToDropdown());
    DRB.Logic.RetrieveMultiple.BindGroupsLogic(DRB.DOM[domObject].DropdownLogic.Id + metadataPath);
    $("#" + DRB.DOM[domObject].DropdownLogic.Id + metadataPath).val(refMetadata.filterGroupsLogic).change();
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).hide(); // hide filter logic by default
}

/**
 * Retrieve Multiple - Add Manually Filter Columns
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddManuallyFilterColumns = function (domObject, metadataPath) {
    DRB.Logic.RetrieveMultiple.AddFilterColumns(domObject, metadataPath);
    DRB.Logic.AddColumn("IsValidForFilter", domObject, metadataPath + "_filterFields");
}

/**
 * Retrieve Multiple - Add Filter Columns
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddFilterColumns = function (domObject, metadataPath) {
    DRB.Logic.RetrieveMultiple.HidePreviousAddButton(metadataPath);
    var container = DRB.DOM.FilterBy.MainDiv.Id;
    if (metadataPath !== "filterCriteria") { container = DRB.DOM.FilterGroups.MainDiv.Id + metadataPath; } // host of a Filter Columns is the base or a group

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    // navigate to the deepest path, refConfiguration goes by the index and not by path when path is a number
    var splittedMetadataPath = metadataPath.split("_");
    splittedMetadataPath.forEach(function (path) {
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

    // FilterColumns are always leaves
    refMetadata.filterType = "fields";
    refConfiguration.filterType = "fields";
    if (!refMetadata.hasOwnProperty("filterFieldsLogic")) { refMetadata.filterFieldsLogic = "and"; }
    if (!refConfiguration.hasOwnProperty("filterFieldsLogic")) { refConfiguration.filterFieldsLogic = "and"; }
    if (!refMetadata.hasOwnProperty("filterFields")) { refMetadata.filterFields = []; }
    if (!refConfiguration.hasOwnProperty("filterFields")) { refConfiguration.filterFields = []; }

    var columnsCriteria = "IsValidForFilter";
    metadataPath += "_filterFields";

    DRB.CustomUI.AddTypeColumns(container, columnsCriteria, domObject, metadataPath);

    // add close button for the field container
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).prepend(DRB.UI.CreateCloseButton(DRB.Logic.RetrieveMultiple.RemoveFilterColumns, domObject, metadataPath));

    // add logic dropdown
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivLogic.Id + metadataPath, DRB.DOM[domObject].DivLogic.Class));
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).append(DRB.UI.CreateSpan(DRB.DOM[domObject].SpanLogic.Id + metadataPath, DRB.DOM[domObject].SpanLogic.Name));
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).append(DRB.UI.CreateSimpleDropdown(DRB.DOM[domObject].DropdownLogic.Id + metadataPath));
    DRB.UI.FillDropdown(DRB.DOM[domObject].DropdownLogic.Id + metadataPath, DRB.DOM[domObject].DropdownLogic.Name, new DRB.Models.Records(DRB.Settings.OptionsAndOr).ToDropdown());
    DRB.Logic.RetrieveMultiple.BindColumnsLogic(DRB.DOM[domObject].DropdownLogic.Id + metadataPath);
    $("#" + DRB.DOM[domObject].DropdownLogic.Id + metadataPath).val(refMetadata.filterFieldsLogic).change();
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).hide(); // hide filter logic by default

    // verify if the fields exist
    var fields = JSON.parse(JSON.stringify(refMetadata.filterFields));
    var clearedFields = [];
    fields.forEach(function (field) {
        var checkColumn = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, field.logicalName);
        if (DRB.Utilities.HasValue(checkColumn)) { clearedFields.push(field); }
    });

    // reset Metadata and configuration arrays
    refMetadata.filterFields = [];
    refConfiguration.filterFields = [];

    clearedFields.forEach(function (field, fieldIndex) {
        DRB.Logic.AddColumn(columnsCriteria, domObject, metadataPath);
        $("#" + DRB.DOM[domObject].Dropdown.Id + metadataPath + "_" + fieldIndex).val(field.logicalName).change();
        // set operator
        $("#" + DRB.DOM[domObject].ControlOperator.Id + metadataPath + "_" + fieldIndex).val(field.operator).change();
        // set value
        var controlPrefix = "";
        var controlPrefixLookup = "cbx2_";
        switch (field.type) {
            case "Uniqueidentifier":
            case "String":
            case "Memo":
            case "Integer":
            case "BigInt":
            case "Decimal":
            case "Double":
            case "Money":
                controlPrefix = "txt_";
                break;

            case "Boolean":
            case "Picklist":
            case "State":
            case "Status":
                controlPrefix = "cbx1_";
                break;

            case "MultiPicklist":
                controlPrefix = "cbxm_";
                break;

            case "Lookup":
            case "Owner":
            case "Customer":
                controlPrefix = "txt2_";
                break;

            case "DateTime":
                controlPrefix = "txtd_";
                break;
        }

        switch (field.type) {
            case "Lookup":
            case "Owner":
            case "Customer":
                if (DRB.Utilities.HasValue(field.value)) {
                    $("#" + controlPrefix + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + fieldIndex).val(field.value.id).change();
                    $("#" + controlPrefixLookup + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + fieldIndex).val(field.value.entityType).change();
                }
                break;
            default:
                $("#" + controlPrefix + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + fieldIndex).val(field.value).change();
                break;
        }

    });
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).show();
}

/**
 * Retrieve Multiple - Remove Filter Groups
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.RemoveFilterGroups = function (domObject, metadataPath) {
    // now remove from the metadata
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");
    if (splittedMetadataPath.length > 0) { splittedMetadataPath.pop(); }

    splittedMetadataPath.forEach(function (path) {
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

    var metadataKeys = Object.keys(refMetadata);
    metadataKeys.forEach(function (key) { if (key !== "Id") { delete refMetadata[key]; } });
    var configurationKeys = Object.keys(refConfiguration);
    configurationKeys.forEach(function (key) { delete refConfiguration[key]; });

    // remove from UI
    $("#" + DRB.DOM[domObject].DivGroups.Id + metadataPath).remove();
    $("#" + DRB.DOM[domObject].DivOptions.Id + metadataPath).remove();
    // show previous Add button
    DRB.Logic.RetrieveMultiple.ShowPreviousAddButton(metadataPath);
}

/**
 * Retrieve Multiple - Remove Filter Columns
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.RemoveFilterColumns = function (domObject, metadataPath) {
    // when removing a filterFields, metadataPath looks like:
    // filterCriteria_filterGroups_2_filterGroups_0_filterFields
    // filterCriteria_filterGroups_1_filterFields
    // filterCriteria_filterFields
    // indexes refer to the metadata object (because they are added based on the UI, not from the data.configuration array)
    // so can happen "filterGroups_5_filterFields" because other groups have been previously removed, the filterGroups array contains just a single item
    // 5 is stored inside the Id property

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");
    if (splittedMetadataPath.length > 0) { splittedMetadataPath.pop(); } // remove "filterFields" (is always the last one)

    if (splittedMetadataPath.length > 1) {
        var metadataIndexToRemove = parseInt(splittedMetadataPath.pop()); // store metadataIndex To Remove
        // navigate to the deepest path, refConfiguration goes by the index and not by path when path is a number
        splittedMetadataPath.forEach(function (path) {
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

        // remove the item from metadata and configuration
        for (var i = 0; i < refMetadata.length; i++) {
            if (refMetadata[i].Id === metadataIndexToRemove) {
                refMetadata[i] = { Id: metadataIndexToRemove };
                refConfiguration[i] = {};
                break;
            }
        }
    } else {
        // shorter scenario, no groups to verify, the filterFields is attached to the root
        DRB.Metadata.filterCriteria = {};
        DRB.Metadata.CurrentNode.data.configuration.filterCriteria = {};
    }
    // remove from UI
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).remove();
    // show previous Add button
    DRB.Logic.RetrieveMultiple.ShowPreviousAddButton(metadataPath);
}

DRB.Logic.RetrieveMultiple.ParseFilterCriteria = function (filterCriteria, metadataPath) {
    // recursive function to parse configuration.filterCriteria into Metadata.filterCriteria

    // filterType must be "fields" or "groups", otherwise return
    if (!filterCriteria.hasOwnProperty("filterType")) { return; }
    if (filterCriteria.filterType !== "fields" && filterCriteria.filterType !== "groups") { return; }

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");

    splittedMetadataPath.forEach(function (path) {
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

    // filterFields
    if (filterCriteria.filterType === "fields") {
        refMetadata.filterFields = filterCriteria.filterFields;
        refConfiguration.filterFields = filterCriteria.filterFields;
        DRB.Logic.RetrieveMultiple.AddFilterColumns("FilterColumns", metadataPath);
        // after the "AddFilterColumns" is completed we assign the original filterFieldsLogic and trigger it
        refMetadata.filterFieldsLogic = filterCriteria.filterFieldsLogic;
        refConfiguration.filterFieldsLogic = filterCriteria.filterFieldsLogic;
        $("#" + DRB.DOM.FilterColumns.DropdownLogic.Id + metadataPath + "_filterFields").val(refMetadata.filterFieldsLogic).change();
        return;
    }

    // filterGroups
    if (filterCriteria.filterType === "groups") {
        DRB.Logic.RetrieveMultiple.AddFilterGroups("FilterGroups", metadataPath);
        filterCriteria.filterGroups.forEach(function (filterGroup, filterGroupIndex) {
            DRB.Logic.RetrieveMultiple.AddFilterGroup(DRB.DOM.FilterGroups.DivGroups.Id + metadataPath + "_filterGroups", "FilterGroups", metadataPath + "_filterGroups");
            // hollaback
            DRB.Logic.RetrieveMultiple.ParseFilterCriteria(filterGroup, metadataPath + "_filterGroups" + "_" + filterGroupIndex);
        });

        // after the "AddFilterGroups"/"AddFilterGroup" is completed we assign the original filterFieldsLogic and trigger it
        refMetadata.filterGroupsLogic = filterCriteria.filterGroupsLogic;
        refConfiguration.filterGroupsLogic = filterCriteria.filterGroupsLogic;
        $("#" + DRB.DOM.FilterGroups.DropdownLogic.Id + metadataPath + "_filterGroups").val(refMetadata.filterGroupsLogic).change();
        return;
    }
}

/**
 * Retrieve Multiple - Configure Filter By
*/
DRB.Logic.RetrieveMultiple.ConfigureFilterBy = function () {
    // show main FilterBy div and the "Add" choice button
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).empty();
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).append(DRB.UI.CreateSpan(DRB.DOM.FilterBy.MainSpan.Id, DRB.DOM.FilterBy.MainSpan.Name));
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).append(DRB.UI.CreateSpacer());
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.FilterGroups.DivChoice.Id + "filterCriteria"));
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).show();

    var metadataPath = "filterCriteria";
    $("#" + DRB.DOM.FilterGroups.DivChoice.Id + metadataPath).append(DRB.UI.CreateButton(DRB.DOM.FilterBy.StartButton.Id, DRB.DOM.FilterBy.StartButton.Name, DRB.DOM.FilterBy.StartButton.Class, DRB.Logic.RetrieveMultiple.StartAddFilter, "FilterGroups", "FilterColumns", metadataPath));

    var filterCriteria = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.filterCriteria));
    DRB.Metadata.filterCriteria = {};
    DRB.Metadata.CurrentNode.data.configuration.filterCriteria = {};
    DRB.Logic.RetrieveMultiple.ParseFilterCriteria(filterCriteria, metadataPath);
}

/**
 * Retrieve Multiple - Configure Order Columns
*/
DRB.Logic.RetrieveMultiple.ConfigureOrderColumns = function () {
    var columnsCriteria = "IsValidForOrder";
    var domObject = "OrderColumns";
    var metadataPath = "orderFields";

    // get full Metadata and configuration path
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
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
    $('#' + DRB.DOM[domObject].Table.Id + metadataPath + ' tr').remove();

    // verify if the fields exist
    var fields = JSON.parse(JSON.stringify(refConfiguration));
    var clearedFields = [];
    fields.forEach(function (field) {
        var checkColumn = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, field.logicalName);
        if (DRB.Utilities.HasValue(checkColumn)) { clearedFields.push(field); }
    });

    // reset Metadata and configuration arrays
    refMetadata.length = 0;
    refConfiguration.length = 0;

    clearedFields.forEach(function (field, fieldIndex) {
        DRB.Logic.AddColumn(columnsCriteria, domObject, metadataPath);
        $("#" + DRB.DOM[domObject].Dropdown.Id + metadataPath + "_" + fieldIndex).val(field.logicalName).change();
        $("#cbx_" + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + fieldIndex).val(field.value).change();
    });
}

/**
 * Retrieve Multiple - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.RetrieveMultiple.AfterTableLoaded = function (table) {
    // Fill Current Metadata
    DRB.Logic.FillCurrentMetadata(table);
    // Fill Relationships Columns
    DRB.Logic.FillRelationshipsColumns();
    // Fill Columns
    DRB.Logic.FillColumns();
    // Fill Relationships
    DRB.Logic.FillRelationships();
    // Fill Alternate Keys
    DRB.Logic.FillAlternateKeys();

    // Fill primaryEntity and PrimaryIdField
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
    DRB.Metadata.CurrentNode.data.configuration.primaryIdField = table.PrimaryIdAttribute;

    DRB.Logic.RetrieveMultiple.ConfigureFilterBy();
    DRB.Logic.RetrieveMultiple.ConfigureOrderColumns();
}

/**
 * Retrieve Multiple - Bind Table
 * @param {string} id Id
*/
DRB.Logic.RetrieveMultiple.BindTable = function (id) {
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
                                if (DRB.Utilities.HasValue(checkTable) && checkTable.ColumnsLoaded === false) { tablesToRetrieve.push(checkTableLogicalName); }
                            });
                            if (tablesToRetrieve.length > 0) {
                                DRB.Common.RetrieveTablesDetails(tablesToRetrieve, false, true)
                                    .done(function () {
                                        DRB.Common.SetTables(arguments, DRB.Metadata.Tables, false, true);
                                        DRB.Logic.RetrieveMultiple.AfterTableLoaded(table);
                                        DRB.UI.HideLoading();
                                    })
                                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                            } else {
                                DRB.Logic.RetrieveMultiple.AfterTableLoaded(table);
                                DRB.UI.HideLoading();
                            }
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.RetrieveMultiple.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Retrieve Multiple - Start 
 */
DRB.Logic.RetrieveMultiple.Start = function () {
    // Metadata
    DRB.Metadata["filterCriteria"] = {};
    DRB.Metadata["orderFields"] = [];

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();
    DRB.CustomUI.AddRetrieveCount();
    DRB.CustomUI.AddTopCount();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.RetrieveMultiple.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddColumns();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddRelationships();

    // #region Add Filter By
    // create FilterBy main div and span
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.FilterBy.MainDiv.Id, DRB.DOM.FilterBy.MainDiv.Class));
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).hide(); // hide by default
    // #endregion

    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddTypeColumns(DRB.DOM.ConfigureContent.Id, "IsValidForOrder", "OrderColumns", "orderFields");
    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryIdField = "";
            DRB.Metadata.CurrentNode.data.configuration.fields = [];
            DRB.Metadata.CurrentNode.data.configuration.oneToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToOne = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.filterCriteria = {};
            DRB.Metadata.CurrentNode.data.configuration.orderFields = [];
        } else {
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }
    // #endregion
}
// #endregion