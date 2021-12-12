// #region DRB.CustomUI
/**
 * Add Spacer
 */
DRB.CustomUI.AddSpacer = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpacer());
}

/**
 * Add Version
 */
DRB.CustomUI.AddVersion = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Version.Span.Id, DRB.DOM.Version.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.Version.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Version.Dropdown.Id, DRB.DOM.Version.Dropdown.Name, new DRB.Models.Records(DRB.Settings.Versions).ToDropdown());
    DRB.Logic.BindPropertyValue(DRB.DOM.Version.Dropdown.Id, "version");
    var selectedVersion = DRB.Settings.Versions[DRB.Settings.Versions.length - 1].Id;
    var versionExists = DRB.Utilities.GetRecordById(DRB.Settings.Versions, DRB.Metadata.CurrentNode.data.configuration.version);
    if (DRB.Utilities.HasValue(versionExists)) { selectedVersion = versionExists.Id; }
    $("#" + DRB.DOM.Version.Dropdown.Id).val(selectedVersion).change();
}

/**
 * Add Process
 */
DRB.CustomUI.AddProcess = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Process.Span.Id, DRB.DOM.Process.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.Process.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Process.Dropdown.Id, DRB.DOM.Process.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsAyncSync).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.Process.Dropdown.Id, "async");
    var processValue = "yes";
    if (DRB.Metadata.CurrentNode.data.configuration.async === false) { processValue = "no"; }
    $("#" + DRB.DOM.Process.Dropdown.Id).val(processValue).change();
}

/**
 * Add Token Header
 */
DRB.CustomUI.AddTokenHeader = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.TokenHeader.Span.Id, DRB.DOM.TokenHeader.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.TokenHeader.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.TokenHeader.Dropdown.Id, DRB.DOM.TokenHeader.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.TokenHeader.Dropdown.Id, "tokenHeader");
    var tokenHeaderValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.tokenHeader === true) { tokenHeaderValue = "yes"; }
    $("#" + DRB.DOM.TokenHeader.Dropdown.Id).val(tokenHeaderValue).change();
}

/**
 * Add Impersonate Dropdown
 */
DRB.CustomUI.AddImpersonate = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Impersonate.Span.Id, DRB.DOM.Impersonate.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.Impersonate.Dropdown.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.ImpersonateId.Div.Id, DRB.DOM.ImpersonateId.Div.Class));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.ImpersonateId.TypeSpan.Id, DRB.DOM.ImpersonateId.TypeSpan.Name));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.ImpersonateId.Dropdown.Id));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.ImpersonateId.Span.Id, DRB.DOM.ImpersonateId.Span.Name));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateInputGuid(DRB.DOM.ImpersonateId.Input.Id));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateLookup(DRB.DOM.ImpersonateId.Lookup.Id, DRB.UI.OpenLookup, { openUser: true, textId: DRB.DOM.ImpersonateId.Input.Id }));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).hide();

    DRB.UI.FillDropdown(DRB.DOM.Impersonate.Dropdown.Id, DRB.DOM.Impersonate.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindImpersonate(DRB.DOM.Impersonate.Dropdown.Id);
    DRB.UI.FillDropdown(DRB.DOM.ImpersonateId.Dropdown.Id, DRB.DOM.ImpersonateId.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsImpersonation).ToDropdown());
    DRB.Logic.BindImpersonateType(DRB.DOM.ImpersonateId.Dropdown.Id);
    DRB.Logic.BindImpersonateId(DRB.DOM.ImpersonateId.Input.Id);
    DRB.Common.BindGuid(DRB.DOM.ImpersonateId.Input.Id);
    var impersonateValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.impersonate === true) { impersonateValue = "yes"; }
    $("#" + DRB.DOM.Impersonate.Dropdown.Id).val(impersonateValue).change();

    var impersonateType = "mscrmcallerid";
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.impersonateType)) { impersonateType = DRB.Metadata.CurrentNode.data.configuration.impersonateType; }
    $("#" + DRB.DOM.ImpersonateId.Dropdown.Id).val(impersonateType).change();

    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.impersonateId)) {
        $("#" + DRB.DOM.ImpersonateId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.impersonateId).trigger("input");
    }
}

/**
 * Add Formatted Values
 */
DRB.CustomUI.AddFormattedValues = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.FormattedValues.Span.Id, DRB.DOM.FormattedValues.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.FormattedValues.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.FormattedValues.Dropdown.Id, DRB.DOM.FormattedValues.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.FormattedValues.Dropdown.Id, "formattedValues");
    var formattedValuesValue = "yes";
    if (DRB.Metadata.CurrentNode.data.configuration.formattedValues === false) { formattedValuesValue = "no"; }
    $("#" + DRB.DOM.FormattedValues.Dropdown.Id).val(formattedValuesValue).change();
}

/**
 * Add Detect Changes
 */
DRB.CustomUI.AddDetectChanges = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.DetectChanges.Span.Id, DRB.DOM.DetectChanges.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.DetectChanges.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.DetectChanges.Dropdown.Id, DRB.DOM.DetectChanges.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.DetectChanges.Dropdown.Id, "detectChanges");
    var detectChangesValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.detectChanges === true) { detectChangesValue = "yes"; }
    $("#" + DRB.DOM.DetectChanges.Dropdown.Id).val(detectChangesValue).change();
}

/**
 * Add Detect Duplicates
 */
DRB.CustomUI.AddDetectDuplicates = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.DetectDuplicates.Span.Id, DRB.DOM.DetectDuplicates.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.DetectDuplicates.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.DetectDuplicates.Dropdown.Id, DRB.DOM.DetectDuplicates.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.DetectDuplicates.Dropdown.Id, "detectDuplicates");
    var detectDuplicatesValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.detectDuplicates === true) { detectDuplicatesValue = "yes"; }
    $("#" + DRB.DOM.DetectDuplicates.Dropdown.Id).val(detectDuplicatesValue).change();
}

/**
 * Add Retrieve Count
 */
DRB.CustomUI.AddRetrieveCount = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.RetrieveCount.Span.Id, DRB.DOM.RetrieveCount.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.RetrieveCount.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.RetrieveCount.Dropdown.Id, DRB.DOM.RetrieveCount.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.RetrieveCount.Dropdown.Id, "retrieveCount");
    var retrieveCountValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.retrieveCount === true) { retrieveCountValue = "yes"; }
    $("#" + DRB.DOM.RetrieveCount.Dropdown.Id).val(retrieveCountValue).change();
}

/**
 * Add Prevent
 */
DRB.CustomUI.AddPrevent = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Prevent.Span.Id, DRB.DOM.Prevent.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.Prevent.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Prevent.Dropdown.Id, DRB.DOM.Prevent.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsPrevent).ToDropdown());
    DRB.Logic.BindPropertyValue(DRB.DOM.Prevent.Dropdown.Id, "prevent");
    var preventValue = "none";
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.prevent)) { preventValue = DRB.Metadata.CurrentNode.data.configuration.prevent; }
    $("#" + DRB.DOM.Prevent.Dropdown.Id).val(preventValue).change();
}

/**
 * Add Top Count
 */
DRB.CustomUI.AddTopCount = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.TopCount.Span.Id, DRB.DOM.TopCount.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateInputTopCount(DRB.DOM.TopCount.Input.Id));
    DRB.Logic.BindPropertyValue(DRB.DOM.TopCount.Input.Id, "topCount");
    DRB.Common.BindTopCountNumber(DRB.DOM.TopCount.Input.Id);
    var topCountValue = "";
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.topCount)) { topCountValue = DRB.Metadata.CurrentNode.data.configuration.topCount; }
    $("#" + DRB.DOM.TopCount.Input.Id).val(topCountValue).change();
}

/**
 * Add Use Alternate Key
 */
DRB.CustomUI.AddUseAlternateKey = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.UseAlternateKey.Span.Id, DRB.DOM.UseAlternateKey.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id, DRB.DOM.UseAlternateKey.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindUseAlternateKey(DRB.DOM.UseAlternateKey.Dropdown.Id);
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddPrimaryId(true);

    var divAlternateKey = DRB.UI.CreateEmptyDiv(DRB.DOM.AlternateKey.Div.Id);
    divAlternateKey.append(DRB.UI.CreateSpan(DRB.DOM.AlternateKey.Span.Id, DRB.DOM.AlternateKey.Span.Name));
    divAlternateKey.append(DRB.UI.CreateDropdown(DRB.DOM.AlternateKey.Dropdown.Id));
    divAlternateKey.append(DRB.UI.CreateEmptyDiv(DRB.DOM.AlternateKey.DivColumns.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divAlternateKey);
    DRB.UI.ResetDropdown(DRB.DOM.AlternateKey.Dropdown.Id, DRB.DOM.AlternateKey.Dropdown.Name);
    DRB.Logic.BindAlternateKey(DRB.DOM.AlternateKey.Dropdown.Id);
    divAlternateKey.hide();

    var useAlternateKeyValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.useAlternateKey === true) { useAlternateKeyValue = "yes"; }
    if (useAlternateKeyValue === "no") { $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val(useAlternateKeyValue).change(); }
}

/**
 * Add Primary Id
 */
DRB.CustomUI.AddPrimaryId = function (hide, container) {
    if (!DRB.Utilities.HasValue(container)) { container = DRB.DOM.ConfigureContent.Id };
    var divPrimaryId = DRB.UI.CreateEmptyDiv(DRB.DOM.PrimaryId.Div.Id);
    divPrimaryId.append(DRB.UI.CreateSpan(DRB.DOM.PrimaryId.Span.Id, DRB.DOM.PrimaryId.Span.Name));
    divPrimaryId.append(DRB.UI.CreateInputGuid(DRB.DOM.PrimaryId.Input.Id));
    divPrimaryId.append(DRB.UI.CreateLookup(DRB.DOM.PrimaryId.Lookup.Id, DRB.UI.OpenLookup, { openPrimaryEntity: true, textId: DRB.DOM.PrimaryId.Input.Id }));
    $("#" + container).append(divPrimaryId);
    DRB.Logic.BindPropertyValue(DRB.DOM.PrimaryId.Input.Id, "primaryId");
    DRB.Common.BindGuid(DRB.DOM.PrimaryId.Input.Id);
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryId)) {
        $("#" + DRB.DOM.PrimaryId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryId).trigger("input");
    }
    if (hide === true) { divPrimaryId.hide(); }
}

/**
 * Add Columns
 */
DRB.CustomUI.AddColumns = function () {
    var divColumns = DRB.UI.CreateEmptyDiv(DRB.DOM.Columns.Div.Id, DRB.DOM.Columns.Div.Class);
    divColumns.append(DRB.UI.CreateSpan(DRB.DOM.Columns.Span.Id, DRB.DOM.Columns.Span.Name));
    divColumns.append(DRB.UI.CreateDropdown(DRB.DOM.Columns.Dropdown.Id, true));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divColumns);
    DRB.UI.ResetDropdown(DRB.DOM.Columns.Dropdown.Id, DRB.DOM.Columns.Dropdown.Name);
    DRB.Logic.BindColumns(DRB.DOM.Columns.Dropdown.Id);
}

/**
 * Add Relationships
 */
DRB.CustomUI.AddRelationships = function () {
    var divRelationships = DRB.UI.CreateEmptyDiv(DRB.DOM.DivRelationship.Id);
    $("#" + DRB.DOM.ConfigureContent.Id).append(divRelationships);
    Object.keys(DRB.DOM.Relationship).forEach(function (relationshipType) {
        var relDOM = DRB.DOM.Relationship[relationshipType];
        divRelationships.append(DRB.UI.CreateSpan(relDOM.Span.Id, relDOM.Span.Name));
        divRelationships.append(DRB.UI.CreateDropdown(relDOM.Dropdown.Id, true));
        divRelationships.append(DRB.UI.CreateButton(relDOM.Button.Id, relDOM.Button.Name, relDOM.Button.Class, DRB.Logic.ClickSelectRelationshipColumns, relationshipType));
        divRelationships.append(DRB.UI.CreateSpacer());
        $("#" + relDOM.Button.Id).hide();
        DRB.UI.ResetDropdown(relDOM.Dropdown.Id, relDOM.Dropdown.Name);
    });
}

/**
 * Add Workflow Id
 */
DRB.CustomUI.AddWorkflowId = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.WorkflowId.Span.Id, DRB.DOM.WorkflowId.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateInputGuid(DRB.DOM.WorkflowId.Input.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateLookup(DRB.DOM.WorkflowId.Lookup.Id, DRB.UI.OpenLookup, { openWorkflow: true, textId: DRB.DOM.WorkflowId.Input.Id }));
    DRB.Logic.BindPropertyValue(DRB.DOM.WorkflowId.Input.Id, "workflowId");
    DRB.Common.BindGuid(DRB.DOM.WorkflowId.Input.Id);
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.workflowId)) {
        $("#" + DRB.DOM.WorkflowId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.workflowId).trigger("input");
    }
}

/**
 * Add Type Columns
 */
DRB.CustomUI.AddTypeColumns = function (container, columnType, domObject, metadataPath) {
    // create main div, span title
    $("#" + container).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].MainDiv.Id + metadataPath, DRB.DOM[domObject].MainDiv.Class));
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateSpan(DRB.DOM[domObject].MainSpan.Id, DRB.DOM[domObject].MainSpan.Name));

    // create the div and the table inside
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].Div.Id + metadataPath));
    $("#" + DRB.DOM[domObject].Div.Id + metadataPath).append(DRB.UI.CreateTable(DRB.DOM[domObject].Table.Id + metadataPath));
    $("#" + DRB.DOM[domObject].Table.Id + metadataPath).append(DRB.UI.CreateTr(DRB.DOM[domObject].Tr.Id + metadataPath));
    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).hide();
    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).append(DRB.UI.CreateTd(DRB.DOM[domObject].TdColumn.Id + metadataPath));
    $("#" + DRB.DOM[domObject].TdColumn.Id + metadataPath).html(DRB.DOM[domObject].TdColumn.Name);

    if (columnType === "IsValidForFilter") {
        $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).append(DRB.UI.CreateTd(DRB.DOM[domObject].TdOperator.Id + metadataPath));
        $("#" + DRB.DOM[domObject].TdOperator.Id + metadataPath).html(DRB.DOM[domObject].TdOperator.Name);
    }

    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).append(DRB.UI.CreateTd(DRB.DOM[domObject].TdValue.Id + metadataPath));
    $("#" + DRB.DOM[domObject].TdValue.Id + metadataPath).html(DRB.DOM[domObject].TdValue.Name);
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateSpacer());

    // "Add" button
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateButton(DRB.DOM[domObject].AddButton.Id + metadataPath, DRB.DOM[domObject].AddButton.Name, DRB.DOM[domObject].AddButton.Class, DRB.Logic.AddColumn, columnType, domObject, metadataPath));

    // hide by default
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).hide();
}
// #endregion