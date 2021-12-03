// #region DRB.Logic.Delete
/**
 * Delete - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.Delete.AfterTableLoaded = function (table) {
    DRB.Logic.FillCurrentMetadata(table); // Fill Current Metadata    
    DRB.Logic.FillAlternateKeys(); // Fill Alternate Keys

    // Fill data.configuration (primaryEntity, PrimaryIdField)
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
    DRB.Metadata.CurrentNode.data.configuration.primaryIdField = table.PrimaryIdAttribute;
}

/**
 * Delete - Bind Table
 * @param {string} id Id
*/
DRB.Logic.Delete.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            if (table.ColumnsLoaded === false || table.AlternateKeysLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    DRB.Common.RetrieveTablesDetails([tableLogicalName], false, true)
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables, false, true);
                            DRB.Logic.Delete.AfterTableLoaded(table);
                            DRB.UI.HideLoading();
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.Delete.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Delete - Start
 */
DRB.Logic.Delete.Start = function () {
    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.Logic.Delete.BindTable(DRB.DOM.Table.Dropdown.Id);
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    // #endregion

    DRB.CustomUI.AddUseAlternateKey();
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
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";

            $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("no").change();
            DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        } else {
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    } else { DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id); }
    // #endregion
}
// #endregion