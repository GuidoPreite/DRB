// #region DRB.Logic.PredefinedQuery
/**
 * Predefined Query - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.PredefinedQuery.AfterTableLoaded = function (table) {
    // Fill data.configuration (primaryEntity)
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };

    DRB.UI.FillDropdown(DRB.DOM.PersonalViewId.Dropdown.Id, DRB.DOM.PersonalViewId.Dropdown.Name, new DRB.Models.Records(table.PersonalViews).ToDropdown(), false, false, true);
    $("#" + DRB.DOM.QueryType.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.queryType).change();
    $("#" + DRB.DOM.PersonalViewId.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.personalViewId);
    DRB.UI.RefreshDropdown(DRB.DOM.PersonalViewId.Dropdown.Id);
    DRB.Metadata.XMLEditor.session.setValue(DRB.Metadata.CurrentNode.data.configuration.fetchXML);
}

/**
 * Predefined Query - Bind Table
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        DRB.Metadata.QueryObjectTypeCode = null;
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            DRB.UI.UnlockDropdown(DRB.DOM.QueryType.Dropdown.Id);
            DRB.Metadata.QueryObjectTypeCode = table.ObjectTypeCode;
            if (table.PersonalViewsLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Personal Views...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    DRB.Common.RetrievePersonalViews()
                        .done(function (data) {
                            var personalViews = DRB.Common.MapPersonalViews(data, "Name");
                            personalViews.forEach(function (personalView) {
                                var viewTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, personalView.TableLogicalName);
                                if (DRB.Utilities.HasValue(viewTable)) { viewTable.PersonalViews.push(personalView); }
                            });
                            // set the personal views loaded as true for all the tables
                            DRB.Metadata.Tables.forEach(function (setTable) { setTable.PersonalViewsLoaded = true; });
                            DRB.Logic.PredefinedQuery.AfterTableLoaded(table);
                            DRB.UI.HideLoading();
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrievePersonalViews Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.PredefinedQuery.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Predefined Query - Bind Query Type
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindQueryType = function (id) {
    $("#" + id).on("change", function (e) {
        var queryTypeValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.queryType = queryTypeValue;
        // hide all sections
        $("#" + DRB.DOM.SystemViewId.Div.Id).hide();
        $("#" + DRB.DOM.PersonalViewId.Div.Id).hide();
        $("#" + DRB.DOM.FetchXML.Div.Id).hide();

        // show correct section based on queryTypeValue
        switch (queryTypeValue) {
            case "savedquery": $("#" + DRB.DOM.SystemViewId.Div.Id).show(); break;
            case "userquery": $("#" + DRB.DOM.PersonalViewId.Div.Id).show(); break;
            case "fetchxml": $("#" + DRB.DOM.FetchXML.Div.Id).show(); break;
        }
    });
}

/**
 * Predefined Query - Bind System View Id
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindSystemViewId = function (id) {
    $("#" + id).on("change", function (e) {
        var systemViewIdValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.systemViewId = systemViewIdValue;
    });
}

/**
 * Predefined Query - Bind Personal View Id
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindPersonalViewId = function (id) {
    $("#" + id).on("change", function (e) {
        var personalViewIdValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.personalViewId = personalViewIdValue;
    });
}

/**
 * Predefined Query - Bind Personal View
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindPersonalView = function (id) {
    $("#" + id).on("change", function (e) {
        var personalViewValue = $(this).val();
        $("#" + DRB.DOM.PersonalViewId.Input.Id).val(personalViewValue).trigger("input").change();
    });
}

/**
 * Predefined Query - Bind FetchXML
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindFetchXML = function (id) {
    id.getSession().on("change", function (e) {
        var fetchXMLValue = DRB.Metadata.XMLEditor.session.getValue();
        DRB.Metadata.CurrentNode.data.configuration.fetchXML = fetchXMLValue;
    });
}

/**
 * Predefined Query - Start
 */
DRB.Logic.PredefinedQuery.Start = function () {
    // Metadata
    DRB.Metadata.QueryObjectTypeCode = null;
    DRB.Metadata.XMLEditor = null;

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();
    DRB.CustomUI.AddRetrieveCount();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.PredefinedQuery.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    // #region Query Type
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.QueryType.Span.Id, DRB.DOM.QueryType.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.QueryType.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.QueryType.Dropdown.Id, DRB.DOM.QueryType.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsViews).ToDropdown());
    DRB.Logic.PredefinedQuery.BindQueryType(DRB.DOM.QueryType.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region System View Id
    var divSystemViewId = DRB.UI.CreateEmptyDiv(DRB.DOM.SystemViewId.Div.Id);
    divSystemViewId.append(DRB.UI.CreateSpan(DRB.DOM.SystemViewId.Span.Id, DRB.DOM.SystemViewId.Span.Name));
    divSystemViewId.append(DRB.UI.CreateInputGuid(DRB.DOM.SystemViewId.Input.Id));
    divSystemViewId.append(DRB.UI.CreateLookup(DRB.DOM.SystemViewId.Lookup.Id, DRB.UI.OpenLookup, { openView: true, textId: DRB.DOM.SystemViewId.Input.Id }));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divSystemViewId);
    DRB.Logic.PredefinedQuery.BindSystemViewId(DRB.DOM.SystemViewId.Input.Id);
    DRB.Common.BindGuid(DRB.DOM.SystemViewId.Input.Id);
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.systemViewId)) {
        $("#" + DRB.DOM.SystemViewId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.systemViewId).trigger("input");
    }
    divSystemViewId.hide();
    // #endregion

    // #region Personal View
    var divPersonalViewId = DRB.UI.CreateEmptyDiv(DRB.DOM.PersonalViewId.Div.Id);
    divPersonalViewId.append(DRB.UI.CreateSpan(DRB.DOM.PersonalViewId.SpanDropdown.Id, DRB.DOM.PersonalViewId.SpanDropdown.Name));
    divPersonalViewId.append(DRB.UI.CreateDropdown(DRB.DOM.PersonalViewId.Dropdown.Id));
    divPersonalViewId.append(DRB.UI.CreateSpacer());
    divPersonalViewId.append(DRB.UI.CreateSpan(DRB.DOM.PersonalViewId.Span.Id, DRB.DOM.PersonalViewId.Span.Name));
    divPersonalViewId.append(DRB.UI.CreateInputGuid(DRB.DOM.PersonalViewId.Input.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divPersonalViewId);
    DRB.Logic.PredefinedQuery.BindPersonalViewId(DRB.DOM.PersonalViewId.Input.Id);
    DRB.Logic.PredefinedQuery.BindPersonalView(DRB.DOM.PersonalViewId.Dropdown.Id);
    DRB.Common.BindGuid(DRB.DOM.PersonalViewId.Input.Id);
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.personalViewId)) {
        $("#" + DRB.DOM.PersonalViewId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.personalViewId).trigger("input");
    }
    divPersonalViewId.hide();
    // #endregion

    // #region FetchXML
    var divFetchXML = DRB.UI.CreateEmptyDiv(DRB.DOM.FetchXML.Div.Id);
    divFetchXML.append(DRB.UI.CreateSpan(DRB.DOM.FetchXML.Span.Id, DRB.DOM.FetchXML.Span.Name));
    divFetchXML.append(DRB.UI.CreateEmptyDiv(DRB.DOM.FetchXML.Editor.Id, "code_editor"));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFetchXML);

    DRB.Metadata.XMLEditor = ace.edit(DRB.DOM.FetchXML.Editor.Id, { useWorker: false });
    DRB.Metadata.XMLEditor.session.setMode("ace/mode/xml");
    DRB.Metadata.XMLEditor.setShowPrintMargin(false);
    //DRB.Metadata.XMLEditor.setOptions({ maxLines: Infinity });
    DRB.Logic.PredefinedQuery.BindFetchXML(DRB.Metadata.XMLEditor);
    divFetchXML.hide();
    // #endregion

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
            DRB.UI.LockDropdown(DRB.DOM.QueryType.Dropdown.Id);
        } else {
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    } else { DRB.UI.LockDropdown(DRB.DOM.QueryType.Dropdown.Id); }
    // #endregion
}
// #endregion