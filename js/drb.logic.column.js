// #region DRB.Logic.Column
// Columns Functions, used by Set Columns (Create, Update) Order Columns (Retrieve Multiple), Filter Columns (Retrieve Multiple)

/**
 * Logic - Refresh Arrows
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.RefreshArrows = function (metadataPath) {
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


    if (refMetadata.length > 0) {
        // set the arrow for the first and the last column
        var firstIndex = metadataPath + "_" + refMetadata[0].Id;
        var lastIndex = metadataPath + "_" + refMetadata[refMetadata.length - 1].Id;

        $("#" + DRB.DOM.ArrowUp.Id + lastIndex).show();
        $("#" + DRB.DOM.ArrowDown.Id + firstIndex).show();
        $("#" + DRB.DOM.ArrowUp.Id + firstIndex).hide();
        $("#" + DRB.DOM.ArrowDown.Id + lastIndex).hide();

        $("#" + DRB.DOM.ArrowBeforeUp.Id + firstIndex).show();
        $("#" + DRB.DOM.ArrowAfterDown.Id + firstIndex).hide();
        $("#" + DRB.DOM.ArrowBeforeUp.Id + lastIndex).hide();
        $("#" + DRB.DOM.ArrowAfterDown.Id + lastIndex).show();

        // set the arrows for the columns in the middle (exclude first and exclude last)
        for (var count = 1; count < refMetadata.length - 1; count++) {
            var uniqueIndex = metadataPath + "_" + refMetadata[count].Id;
            $("#" + DRB.DOM.ArrowUp.Id + uniqueIndex).show();
            $("#" + DRB.DOM.ArrowDown.Id + uniqueIndex).show();
            $("#" + DRB.DOM.ArrowBeforeUp.Id + uniqueIndex).hide();
            $("#" + DRB.DOM.ArrowAfterDown.Id + uniqueIndex).hide();
        }
    }
}

/**
 * Logic - Move Column
 * @param {number} index Index
 * @param {string} direction Direction ("up" or "down")
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.MoveColumn = function (index, direction, domObject, metadataPath) {

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

    // if DRB.Metadata[metadataPath] is empty do nothing
    if (refMetadata.length === 0) { return; }

    // variables, default is up
    var positionToCheck = 0;
    var countStart = 1;
    var countEnd = refMetadata.length;
    var diff = -1;
    if (direction === "down") {
        positionToCheck = refMetadata.length - 1;
        countStart = 0;
        countEnd = refMetadata.length - 1;
        diff = 1;
    }

    //  check if it's not the first position (if up) or the last position (if down)
    if (refMetadata[positionToCheck].Id != index) {

        // find the position of the passed index
        var posIndex = -1;
        for (var count = countStart; count < countEnd; count++) { if (refMetadata[count].Id == index) { posIndex = count; break; } }

        // index not found, do nothing
        if (posIndex === -1) { return; }

        // swap DRB.Metadata
        var currentElementMetadata = refMetadata[posIndex];
        refMetadata[posIndex] = refMetadata[posIndex + diff];
        refMetadata[posIndex + diff] = currentElementMetadata;

        // swap data.configuration
        var currentElementNode = refConfiguration[posIndex];
        refConfiguration[posIndex] = refConfiguration[posIndex + diff];
        refConfiguration[posIndex + diff] = currentElementNode;

        // swap tr
        if (direction === "down") { $("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index).next().after($("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index)); }
        else { $("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index).prev().before($("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index)); }

        // refresh arrows
        DRB.Logic.RefreshArrows(metadataPath);
    }
}

/**
 * Logic - Refresh Columns
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.RefreshColumns = function (columnType, domObject, metadataPath) {
    // get logicalName of used columns
    var usedColumnsNames = [];
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

    refMetadata.forEach(function (column) {
        if (DRB.Utilities.HasValue(column.Value) && DRB.Utilities.HasValue(column.Value.logicalName)) {
            usedColumnsNames.push(column.Value.logicalName);
        }
    });

    // check for the logic operator at column level for filtering

    if (columnType === "IsValidForFilter") {
        if (refMetadata.length > 1) {
            $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).show();
        } else {
            $("#" + DRB.DOM[domObject].DropdownLogic.Id + metadataPath).val(DRB.Settings.OptionsAndOr[0].Id).change();
            $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).hide();
        }
    }

    // refresh all the dropdowns
    refMetadata.forEach(function (metadataColumn) {
        var uniqueIndex = metadataPath + "_" + metadataColumn.Id;
        var originalColumnName = $("#" + DRB.DOM[domObject].Dropdown.Id + uniqueIndex).val();

        // create the columns to fill the dropdown
        var availableColumns = [];
        if (columnType !== "IsValidForFilter") {
            // add the column already selected for this dropdown
            DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
                if ((currentColumn[columnType] === true && usedColumnsNames.indexOf(currentColumn.LogicalName) === -1)
                    || currentColumn.LogicalName === originalColumnName) {
                    availableColumns.push(currentColumn);
                }
            });
        } else {
            // For Filtering all the columns enabled for filtering must be shown, regardeless if they were used before
            if ($("#" + DRB.DOM[domObject].LookupRelationshipDropdown.Id + uniqueIndex).length === 0) {
                DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
                    if (currentColumn[columnType] === true) { availableColumns.push(currentColumn); }
                });
            }
        }
        // #region Relationships
        if (columnType === "IsValidForFilter" && $("#" + DRB.DOM[domObject].LookupRelationshipDropdown.Id + uniqueIndex).length > 0) {
            var relationshipName = $("#" + DRB.DOM[domObject].LookupRelationshipDropdown.Id + uniqueIndex).val();
            // create the relationships to fill the dropdown
            var availableRelationships = [];
            DRB.Metadata.CurrentManyToOne.forEach(function (currentRelationship) { availableRelationships.push(new DRB.Models.RelationshipLookup(currentRelationship)); });
            availableRelationships.sort(DRB.Utilities.CustomSort("NavigationAttribute"));
            // fill dropdown
            DRB.UI.FillDropdown(DRB.DOM[domObject].LookupRelationshipDropdown.Id + uniqueIndex, DRB.DOM[domObject].LookupRelationshipDropdown.Name, new DRB.Models.Records(availableRelationships).ToDropdown());
            // set the previous value
            $("#" + DRB.DOM[domObject].LookupRelationshipDropdown.Id + uniqueIndex).val(relationshipName);
            // refresh dropdown
            DRB.UI.RefreshDropdown(DRB.DOM[domObject].LookupRelationshipDropdown.Id + uniqueIndex);

            var relationship = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentManyToOne, relationshipName);
            if (DRB.Utilities.HasValue(relationship)) {
                var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, relationship.TargetTable);
                if (DRB.Utilities.HasValue(table)) {
                    table.Columns.forEach(function (currentColumn) {
                        if (currentColumn[columnType] === true) { availableColumns.push(currentColumn); }
                    });
                }
            }
        }
        // #endregion

        // fill dropdown
        DRB.UI.FillDropdown(DRB.DOM[domObject].Dropdown.Id + uniqueIndex, DRB.DOM[domObject].Dropdown.Name, new DRB.Models.Records(availableColumns).ToDropdown());
        // set the previous value
        $("#" + DRB.DOM[domObject].Dropdown.Id + uniqueIndex).val(originalColumnName);
        // refresh dropdown
        DRB.UI.RefreshDropdown(DRB.DOM[domObject].Dropdown.Id + uniqueIndex);

        // if no columns available (for example relationship dropdown has not been selected) disable the dropdown
        if (availableColumns.length === 0) {
            DRB.UI.ResetDropdown(DRB.DOM[domObject].Dropdown.Id + uniqueIndex, DRB.DOM[domObject].Dropdown.Name);
        }
    });
}

/**
 * Logic - Remove Column
 * @param {number} index Index
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.RemoveColumn = function (index, columnType, domObject, metadataPath) {
    // remove tr
    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index).remove();

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

    // refresh DRB.Metadata[metadataPath] with all columns except the one removed
    var newMetadataColumns = [];
    var indexToRemove = -1;
    refMetadata.forEach(function (column, columnIndex) {
        if (column.Id == index) { indexToRemove = columnIndex; } else { newMetadataColumns.push(column); }
    });

    refMetadata.length = 0;
    newMetadataColumns.forEach(function (newMetadataColumn) { refMetadata.push(newMetadataColumn); });

    // refresh data.configuration using indexToRemove found in the previous for cycle
    if (indexToRemove > -1) {
        var newFields = [];
        refConfiguration.forEach(function (field, fieldIndex) {
            if (fieldIndex !== indexToRemove) { newFields.push(field); }
        });
        refConfiguration.length = 0;
        newFields.forEach(function (newField) { refConfiguration.push(newField); });
    }

    // hide the first tr (header) if there are no columns
    if (refMetadata.length === 0) { $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).hide(); }

    // Refresh arrows
    DRB.Logic.RefreshArrows(metadataPath);

    // Refresh Columns
    DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);
}

/**
 * Logic - Add Column
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.AddColumn = function (columnType, domObject, metadataPath, fromRelationship) {
    // show the first tr (header)
    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).show();

    // initialize index
    var index = 0;

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

    // if DRB.Metadata[metadataPath] has values get the higher index and add 1
    if (refMetadata.length > 0) {
        var maxValue = 0;
        refMetadata.forEach(function (setColumn) { if (setColumn.Id > maxValue) { maxValue = setColumn.Id; } });
        index = maxValue + 1;
    }
    var uniqueIndex = metadataPath + "_" + index;
    // create tr
    var tr = DRB.UI.CreateTr(DRB.DOM[domObject].Tr.Id + uniqueIndex);
    var tdColumn = DRB.UI.CreateTd(DRB.DOM[domObject].TdColumn.Id + uniqueIndex);
    var tdOperator = null;
    if (columnType === "IsValidForFilter") { tdOperator = DRB.UI.CreateTd(DRB.DOM[domObject].TdOperator.Id + uniqueIndex); }
    var tdValue = DRB.UI.CreateTd(DRB.DOM[domObject].TdValue.Id + uniqueIndex);
    $("#" + DRB.DOM[domObject].Table.Id + metadataPath).append(tr);

    tr.append(tdColumn);
    if (columnType === "IsValidForFilter") { tr.append(tdOperator); }
    tr.append(tdValue);

    // append close, arrow up and arrow down buttons (plus empty arrow button for spacing)
    tdColumn.append(DRB.UI.CreateRemoveButton(DRB.Logic.RemoveColumn, index, columnType, domObject, metadataPath));
    tdColumn.append(DRB.UI.CreateEmptyArrowButton(DRB.DOM.ArrowBeforeUp.Id + uniqueIndex));
    tdColumn.append(DRB.UI.CreateUpButton(DRB.DOM.ArrowUp.Id + uniqueIndex, DRB.Logic.MoveColumn, index, "up", domObject, metadataPath));
    tdColumn.append(DRB.UI.CreateDownButton(DRB.DOM.ArrowDown.Id + uniqueIndex, DRB.Logic.MoveColumn, index, "down", domObject, metadataPath));
    tdColumn.append(DRB.UI.CreateEmptyArrowButton(DRB.DOM.ArrowAfterDown.Id + uniqueIndex));

    // create column dropdown selection

    if (fromRelationship === true) {
        $("#" + DRB.DOM[domObject].Tr.Id + uniqueIndex).prop("style", "background: #f0f7ff;");
        tdColumn.append(DRB.UI.CreateDropdown(DRB.DOM[domObject].LookupRelationshipDropdown.Id + uniqueIndex));
        tdColumn.append(DRB.UI.CreateSpacer());
        tdColumn.append(DRB.UI.CreateEmptyRemoveButton(""));
        tdColumn.append(DRB.UI.CreateEmptyArrowButton(""));
        tdColumn.append(DRB.UI.CreateEmptyArrowButton(""));
    }

    tdColumn.append(DRB.UI.CreateDropdown(DRB.DOM[domObject].Dropdown.Id + uniqueIndex));

    switch (columnType) {
        case "IsValidForOrder":
            DRB.Logic.BindOrderColumn(DRB.DOM[domObject].Dropdown.Id + uniqueIndex, columnType, domObject, metadataPath);
            break;
        case "IsValidForFilter":
            DRB.Logic.BindFilterColumn(DRB.DOM[domObject].Dropdown.Id + uniqueIndex, columnType, domObject, metadataPath);
            if (fromRelationship === true) {
                DRB.Logic.BindFilterLookupRelationship(DRB.DOM[domObject].LookupRelationshipDropdown.Id + uniqueIndex, columnType, domObject, metadataPath);
            }
            break;
        case "IsValidForCreate":
        case "IsValidForUpdate":
            DRB.Logic.BindSetColumn(DRB.DOM[domObject].Dropdown.Id + uniqueIndex, columnType, domObject, metadataPath);
            break;
    }

    // add to DRB.Metadata and to data.configuration
    var field = {};
    refMetadata.push(new DRB.Models.IdValue(index, field));
    refConfiguration.push(field);

    // refresh columns
    DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);

    // refresh arrows
    DRB.Logic.RefreshArrows(metadataPath);
}
// #endregion