// #region DRB.Logic.ManageFileImageData
/**
 * Manage File Image Data - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.ManageFileImageData.AfterTableLoaded = function (table) {
    DRB.Logic.FillCurrentMetadata(table); // Fill Current Metadata

    var selectedColumns = [];
    var fileColumnDropdownName = "";
    var columnAttributeType = "";

    if (DRB.Metadata.ManageDataType === "managefiledata") {
        columnAttributeType = "File";
        fileColumnDropdownName = DRB.DOM.FileColumn.Dropdown.Name;
    }

    if (DRB.Metadata.ManageDataType === "manageimagedata") {
        columnAttributeType = "Image";
        fileColumnDropdownName = DRB.DOM.ImageColumn.Dropdown.Name;
    }

    DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
        if (currentColumn.AttributeType === columnAttributeType) { selectedColumns.push(currentColumn); }
    });

    if (selectedColumns.length === 0) {
        DRB.UI.ResetDropdown(DRB.DOM.FileColumn.Dropdown.Id, fileColumnDropdownName);
        DRB.Metadata.CurrentNode.data.configuration.fileField = null;
    } else {
        DRB.UI.FillDropdown(DRB.DOM.FileColumn.Dropdown.Id, fileColumnDropdownName, new DRB.Models.Records(selectedColumns).ToDropdown());
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileField)) {
            $("#" + DRB.DOM.FileColumn.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.fileField.logicalName).change();
        }
    }

    // Fill data.configuration
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
}

/**
 * Manage File Image Data - Bind File Column
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindFileColumn = function (id) {
    $("#" + id).on("change", function (e) {
        var columnName = $(this).val();
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnName);
        if (DRB.Utilities.HasValue(column)) {
            DRB.Metadata.CurrentNode.data.configuration.fileField = { logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName };
            if (DRB.Metadata.ManageDataType === "manageimagedata") {
                if (column.AdditionalProperties.CanStoreFullImage !== true) {
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', false).change();
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop("disabled", "true");
                } else {
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop("disabled", "");
                }
            }
        } else {
            DRB.Metadata.CurrentNode.data.configuration.fileField = null;
            if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', false).change(); }
        }
    });
}

/**
 * Manage File Image Data - Bind File Operation
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindFileOperation = function (id) {
    $("#" + id).on("change", function (e) {
        var operation = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.fileOperation = operation;

        switch (operation) {
            case "retrieve":
                $("#" + DRB.DOM.FileName.Div.Id).hide();
                $("#" + DRB.DOM.FileName.Input.Id).val("");
                if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileFullSize.Div.Id).show(); }
                $("#" + DRB.DOM.FileContent.Div.Id).hide();
                DRB.Metadata.CurrentNode.data.configuration.fileContent = null;
                break;

            case "upload":
                $("#" + DRB.DOM.FileName.Div.Id).show();
                if (DRB.Metadata.ManageDataType === "manageimagedata") {
                    $("#" + DRB.DOM.FileFullSize.Div.Id).hide();
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', false).change();
                }
                $("#" + DRB.DOM.FileContent.Div.Id).show();
                if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileContent)) {
                    if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).show(); }
                    $("#" + DRB.DOM.FileContent.DownloadButton.Id).show();
                    $("#" + DRB.DOM.FileContent.RemoveButton.Id).show();
                } else {
                    if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).hide(); }
                    $("#" + DRB.DOM.FileContent.DownloadButton.Id).hide();
                    $("#" + DRB.DOM.FileContent.RemoveButton.Id).hide();
                }
                break;

            case "delete":
                $("#" + DRB.DOM.FileName.Div.Id).hide();
                $("#" + DRB.DOM.FileName.Input.Id).val("");
                if (DRB.Metadata.ManageDataType === "manageimagedata") {
                    $("#" + DRB.DOM.FileFullSize.Div.Id).hide();
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', false).change();
                }
                $("#" + DRB.DOM.FileContent.Div.Id).hide();
                DRB.Metadata.CurrentNode.data.configuration.fileContent = null;
                break;
        }

        if (operation === "upload") { $("#" + DRB.DOM.FileName.Div.Id).show(); }
        else {
            $("#" + DRB.DOM.FileName.Div.Id).hide();
            $("#" + DRB.DOM.FileName.Input.Id).val("");
        }
    });
}

/**
 * Manage File Image Data - Bind File Name
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindFileName = function (id) {
    $("#" + id).on("change", function (e) {
        var fileName = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.fileName = fileName;
    });
}

/**
 * Manage File Image Data - Bind File Full Size
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindFileFullSize = function (id) {
    $("#" + id).on("change", function (e) {
        var fullSizeValue = $(this).is(':checked');
        DRB.Metadata.CurrentNode.data.configuration.fileFullSize = fullSizeValue;
    });
}

/**
 *  * Manage File Image Data - Parse File
 * @param {event} e Event
 */
DRB.Logic.ManageFileImageData.ParseFile = function (e) {
    var file = e.target.files[0];
    if (!file) {
        DRB.UI.ShowError("Load File Error", "Error loading the selected file");
    } else {
        if (DRB.Metadata.ManageDataType === "managefiledata" || /\.(jpe?g|png|gif|bmp)$/i.test(file.name)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                try {
                    var fileContent = e.target.result;
                    DRB.Metadata.CurrentNode.data.configuration.fileContent = fileContent.split(",")[1];
                    if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).show(); }
                    $("#" + DRB.DOM.FileContent.DownloadButton.Id).show();
                    $("#" + DRB.DOM.FileContent.RemoveButton.Id).show();
                    $("#" + DRB.DOM.FileName.Input.Id).val(file.name).change(); // File Name

                } catch (e) { DRB.UI.ShowError("Load File Error", "Failed to parse the selected file"); }
            };
            reader.readAsDataURL(file);
        } else {
            DRB.UI.ShowError("Load File Error", "Supported file extensions: gif, png, bmp, jpg, jpeg");
        }
    }
    // reset the File Input (necessary if we load the same file again)
    $(e.target).val("");
}

/**
 * Manage File Image Data - Load File
 */
DRB.Logic.ManageFileImageData.LoadFile = function () {
    $("#" + DRB.DOM.FileContent.LoadInput.Id).trigger("click");
}

/**
 * Manage File Image Data - Show File
 */
DRB.Logic.ManageFileImageData.ShowFile = function () {
    try {
        var imageContent = DRB.Metadata.CurrentNode.data.configuration.fileContent;
        var base64Prefix = "data:image/jpeg;base64,";
        var finalImage = base64Prefix + imageContent;

        var showContent = DRB.UI.CreateEmptyDiv("div_showimage", "centercontent");
        showContent.append(DRB.UI.CreateImage("preview", finalImage));
        DRB.UI.Show("Show Image", showContent, "large");
    } catch (e) {
        DRB.UI.ShowError("Image Error", "Unable to show the image");
    }
}

/**
 * Manage File Image Data - Download File
 */
DRB.Logic.ManageFileImageData.DownloadFile = function () {
    try {
        var base64Content = DRB.Metadata.CurrentNode.data.configuration.fileContent;
        var byteCharacters = atob(base64Content);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var fileName = "file.bin";
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileName)) { fileName = DRB.Metadata.CurrentNode.data.configuration.fileName; }
        var fileContent = new Uint8Array(byteNumbers);
        var saveFile = new Blob([fileContent], { type: "application/octet-stream" });
        var customLink = document.createElement("a");
        customLink.href = URL.createObjectURL(saveFile);
        customLink.download = fileName;
        customLink.click();
        URL.revokeObjectURL(saveFile);
    } catch (e) {
        DRB.UI.ShowError("Download Error", "Unable to download the file");
    }
}

/**
 * Manage File Image Data - Remove File
 */
DRB.Logic.ManageFileImageData.RemoveFile = function () {
    DRB.Metadata.CurrentNode.data.configuration.fileContent = null;
    if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).hide(); }
    $("#" + DRB.DOM.FileContent.DownloadButton.Id).hide();
    $("#" + DRB.DOM.FileContent.RemoveButton.Id).hide();
}

/**
 * Manage File Image Data - Bind Table
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindTable = function (id) {
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
                            DRB.Logic.ManageFileImageData.AfterTableLoaded(table);
                            DRB.UI.HideLoading();
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.ManageFileImageData.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Manage File Data - Start
 */
DRB.Logic.ManageFileImageData.Start = function (requestType) {
    DRB.Metadata.ManageDataType = requestType;
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
    DRB.Logic.ManageFileImageData.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    // #region File Column
    var divFileColumn = DRB.UI.CreateEmptyDiv(DRB.DOM.FileColumn.Div.Id, DRB.DOM.FileColumn.Div.Class);
    var fileColumnSpanName = "";
    var fileColumnDropdownName = "";
    switch (requestType) {
        case "managefiledata":
            fileColumnSpanName = DRB.DOM.FileColumn.Span.Name;
            fileColumnDropdownName = DRB.DOM.FileColumn.Dropdown.Name;
            break;
        case "manageimagedata":
            fileColumnSpanName = DRB.DOM.ImageColumn.Span.Name;
            fileColumnDropdownName = DRB.DOM.ImageColumn.Dropdown.Name;
            break;
    }
    divFileColumn.append(DRB.UI.CreateSpan(DRB.DOM.FileColumn.Span.Id, fileColumnSpanName));
    divFileColumn.append(DRB.UI.CreateDropdown(DRB.DOM.FileColumn.Dropdown.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFileColumn);
    DRB.UI.ResetDropdown(DRB.DOM.FileColumn.Dropdown.Id, fileColumnDropdownName);
    DRB.Logic.ManageFileImageData.BindFileColumn(DRB.DOM.FileColumn.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddPrimaryId();
    DRB.CustomUI.AddSpacer();

    // #region File Operation
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.FileOperation.Span.Id, DRB.DOM.FileOperation.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.FileOperation.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.FileOperation.Dropdown.Id, DRB.DOM.FileOperation.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsManageFile).ToDropdown());
    DRB.Logic.ManageFileImageData.BindFileOperation(DRB.DOM.FileOperation.Dropdown.Id);
    // #endregion

    // #region Full Size
    if (requestType === "manageimagedata") {
        var divFileFullSize = DRB.UI.CreateEmptyDiv(DRB.DOM.FileFullSize.Div.Id, DRB.DOM.FileFullSize.Div.Class);
        divFileFullSize.append(DRB.UI.CreateCheckbox(DRB.DOM.FileFullSize.CheckBox.Id, "", "", false));
        divFileFullSize.append(DRB.UI.CreateSpan(DRB.DOM.FileFullSize.Span.Id, DRB.DOM.FileFullSize.Span.Name));
        $("#" + DRB.DOM.ConfigureContent.Id).append(divFileFullSize);
        DRB.Logic.ManageFileImageData.BindFileFullSize(DRB.DOM.FileFullSize.CheckBox.Id);
        $("#" + DRB.DOM.FileFullSize.Div.Id).hide();

    }
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region File Name
    var divFileName = DRB.UI.CreateEmptyDiv(DRB.DOM.FileName.Div.Id, DRB.DOM.FileName.Div.Class);
    divFileName.append(DRB.UI.CreateSpan(DRB.DOM.FileName.Span.Id, DRB.DOM.FileName.Span.Name));
    divFileName.append(DRB.UI.CreateInputString(DRB.DOM.FileName.Input.Id, 100, DRB.DOM.FileName.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFileName);
    DRB.Common.BindFileName(DRB.DOM.FileName.Input.Id);
    DRB.Logic.ManageFileImageData.BindFileName(DRB.DOM.FileName.Input.Id);
    $("#" + DRB.DOM.FileName.Div.Id).hide();
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region File Content
    var divFileContent = DRB.UI.CreateEmptyDiv(DRB.DOM.FileContent.Div.Id);
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFileContent);
    divFileContent.append(DRB.UI.CreateInputFile(DRB.DOM.FileContent.LoadInput.Id, true, DRB.Logic.ManageFileImageData.ParseFile));
    divFileContent.append(DRB.UI.CreateButton(DRB.DOM.FileContent.LoadButton.Id, DRB.DOM.FileContent.LoadButton.Name, DRB.DOM.FileContent.LoadButton.Class, DRB.Logic.ManageFileImageData.LoadFile));
    if (requestType === "manageimagedata") {
        divFileContent.append(DRB.UI.CreateButton(DRB.DOM.FileContent.ShowButton.Id, DRB.DOM.FileContent.ShowButton.Name, DRB.DOM.FileContent.ShowButton.Class, DRB.Logic.ManageFileImageData.ShowFile));
        $("#" + DRB.DOM.FileContent.ShowButton.Id).hide();
    }
    divFileContent.append(DRB.UI.CreateButton(DRB.DOM.FileContent.DownloadButton.Id, DRB.DOM.FileContent.DownloadButton.Name, DRB.DOM.FileContent.DownloadButton.Class, DRB.Logic.ManageFileImageData.DownloadFile));
    $("#" + DRB.DOM.FileContent.RemoveButton.Id).hide();
    divFileContent.append(DRB.UI.CreateButton(DRB.DOM.FileContent.RemoveButton.Id, DRB.DOM.FileContent.RemoveButton.Name, DRB.DOM.FileContent.RemoveButton.Class, DRB.Logic.ManageFileImageData.RemoveFile));
    $("#" + DRB.DOM.FileContent.RemoveButton.Id).hide();
    $("#" + DRB.DOM.FileContent.Div.Id).hide();
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

    // File Full Size
    if (requestType === "manageimagedata") {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileFullSize)) {
            $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', DRB.Metadata.CurrentNode.data.configuration.fileFullSize).change();
        }
    }
    // File Content
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileContent)) {
        if (requestType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).show(); }
        $("#" + DRB.DOM.FileContent.DownloadButton.Id).show();
        $("#" + DRB.DOM.FileContent.RemoveButton.Id).show();
    }
    // #endregion
}
// #endregion