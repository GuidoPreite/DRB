// #region DRB.Logic.Update
/**
 * Update - Start
 */
DRB.Logic.Update.Start = function () {
    // default settings
    var columnsCriteria = "IsValidForUpdate";
    var domObject = "SetColumns";
    var metadataPath = "setFields";

    // Metadata
    DRB.Metadata[metadataPath] = [];

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();

    // #region Return Record
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.ReturnRecord.Span.Id, DRB.DOM.ReturnRecord.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.ReturnRecord.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.ReturnRecord.Dropdown.Id, DRB.DOM.ReturnRecord.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindReturnRecord(DRB.DOM.ReturnRecord.Dropdown.Id);
    var returnRecordValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.returnRecord === true) { returnRecordValue = "yes"; }
    // trigger later
    // #endregion

    DRB.CustomUI.AddDetectDuplicates();
    DRB.CustomUI.AddPrevent();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.BindSetTable(DRB.DOM.Table.Dropdown.Id, columnsCriteria, domObject, metadataPath);
    // #endregion

    DRB.CustomUI.AddColumns();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddRelationships();
    DRB.CustomUI.AddUseAlternateKey();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddTypeColumns(DRB.DOM.ConfigureContent.Id, columnsCriteria, domObject, metadataPath);
    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the connected values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryIdField = "";
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";
            DRB.Metadata.CurrentNode.data.configuration.fields = [];
            DRB.Metadata.CurrentNode.data.configuration.oneToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToOne = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.setFields = [];

            $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("no").change();
            DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        } else {
            // trigger change with table logical name
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    } else { DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id); }

    // Return Record
    $("#" + DRB.DOM.ReturnRecord.Dropdown.Id).val(returnRecordValue).change();
    // #endregion
}
// #endregion