// #region DRB.Logic.Order
// Order Columns Functions (used in Retrieve Multiple)

/**
 * Logic - Bind Order Column Value
 * @param {string} id Id
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindOrderColumnValue = function (id, metadataPath) {
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


        // update DRB.Metadata.OrderColumns and configuration.orderFields with the new value
        refMetadata.forEach(function (column, columnIndex) {
            if (column.Id === elementIndex) {
                // save the current column properties
                var field = JSON.parse(JSON.stringify(column.Value));
                if (controlName.indexOf("cbx_") === 0) { field.value = controlValue; }

                // update refMetadata and refConfiguration
                column.Value = field;
                refConfiguration[columnIndex] = field;
            }
        });
    });
}

/**
 * Logic - Bind Order Column
 * @param {string} id Id
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindOrderColumn = function (id, columnType, domObject, metadataPath) {
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

            var currentId = "cbx_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex;
            divValue.append(DRB.UI.CreateSimpleDropdown(currentId));
            DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(DRB.Settings.OptionsOrder).ToDropdown());
            DRB.Logic.BindOrderColumnValue("cbx_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, metadataPath);
            $("#" + currentId).val(DRB.Settings.OptionsOrder[0].Id).change();

        }
        DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);
    });
}
// #endregion