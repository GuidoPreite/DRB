// #region DRB.Logic.ManageFileData
/**
 * Manage File Data - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.ManageFileData.AfterTableLoaded = function (table) {
    DRB.Logic.FillCurrentMetadata(table); // Fill Current Metadata

    var fileColumns = [];
    DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
        if (currentColumn.AttributeType === "File") { fileColumns.push(currentColumn); }
    });
    if (fileColumns.length === 0) {
        DRB.UI.ResetDropdown(DRB.DOM.FileColumn.Dropdown.Id, DRB.DOM.FileColumn.Dropdown.Name);
        DRB.Metadata.CurrentNode.data.configuration.fileField = null;
    } else {
        DRB.UI.FillDropdown(DRB.DOM.FileColumn.Dropdown.Id, DRB.DOM.FileColumn.Dropdown.Name, new DRB.Models.Records(fileColumns).ToDropdown());
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileField)) {
            $("#" + DRB.DOM.FileColumn.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.fileField.logicalName).change();
        }
    }

    // Fill data.configuration
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
}

/**
 * Manage File Data - Bind File Column
 * @param {string} id Id
*/
DRB.Logic.ManageFileData.BindFileColumn = function (id) {
    $("#" + id).on("change", function (e) {
        var columnName = $(this).val();
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnName);
        if (DRB.Utilities.HasValue(column)) {
            DRB.Metadata.CurrentNode.data.configuration.fileField = { logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName };
        }
    });
}

/**
 * Manage File Data - Bind File Operation
 * @param {string} id Id
*/
DRB.Logic.ManageFileData.BindFileOperation = function (id) {
    $("#" + id).on("change", function (e) {
        var operation = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.fileOperation = operation;       
        if (operation === "upload") { $("#" + DRB.DOM.FileName.Div.Id).show(); }
        else {
            $("#" + DRB.DOM.FileName.Div.Id).hide();
            $("#" + DRB.DOM.FileName.Input.Id).val("");
        }
    });
}

/**
 * Manage File Data - Bind File Name
 * @param {string} id Id
*/
DRB.Logic.ManageFileData.BindFileName = function (id) {
    $("#" + id).on("change", function (e) {
        var fileName = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.fileName = fileName;
    });
}

/**
 * Manage File Data - Bind Table
 * @param {string} id Id
*/
DRB.Logic.ManageFileData.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            // Fill data.configuration (primaryEntity)
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
            if (table.ColumnsLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    // retrieve the Entity Fields
                    DRB.Common.RetrieveTablesDetails([tableLogicalName])
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables);
                            DRB.Logic.ManageFileData.AfterTableLoaded(table);
                            DRB.UI.HideLoading();
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.ManageFileData.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Manage File Data - Start
 */
DRB.Logic.ManageFileData.Start = function () {
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
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.ManageFileData.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    // #region File Column
    var divFileColumn = DRB.UI.CreateEmptyDiv(DRB.DOM.FileColumn.Div.Id, DRB.DOM.FileColumn.Div.Class);
    divFileColumn.append(DRB.UI.CreateSpan(DRB.DOM.FileColumn.Span.Id, DRB.DOM.FileColumn.Span.Name));
    divFileColumn.append(DRB.UI.CreateDropdown(DRB.DOM.FileColumn.Dropdown.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFileColumn);
    DRB.UI.ResetDropdown(DRB.DOM.FileColumn.Dropdown.Id, DRB.DOM.FileColumn.Dropdown.Name);
    DRB.Logic.ManageFileData.BindFileColumn(DRB.DOM.FileColumn.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddPrimaryId();
    DRB.CustomUI.AddSpacer();

    // #region File Operation
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.FileOperation.Span.Id, DRB.DOM.FileOperation.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.FileOperation.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.FileOperation.Dropdown.Id, DRB.DOM.FileOperation.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsManageFile).ToDropdown());
    DRB.Logic.ManageFileData.BindFileOperation(DRB.DOM.FileOperation.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region File Name
    var divFileName = DRB.UI.CreateEmptyDiv(DRB.DOM.FileName.Div.Id, DRB.DOM.FileName.Div.Class);
    divFileName.append(DRB.UI.CreateSpan(DRB.DOM.FileName.Span.Id, DRB.DOM.FileName.Span.Name));
    divFileName.append(DRB.UI.CreateInputString(DRB.DOM.FileName.Input.Id, 100, DRB.DOM.FileName.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFileName);
    DRB.Common.BindFileName(DRB.DOM.FileName.Input.Id);
    DRB.Logic.ManageFileData.BindFileName(DRB.DOM.FileName.Input.Id);
    $("#" + DRB.DOM.FileName.Div.Id).hide();
    // #endregion

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";
        } else {
            // trigger change with table logical name
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }
    // File Operation
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileOperation)) {
        $("#" + DRB.DOM.FileOperation.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.fileOperation).change();
    }

    // File Name 
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileName)) {
        $("#" + DRB.DOM.FileName.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.fileName).change();
    }
    // #endregion
}
// #endregion