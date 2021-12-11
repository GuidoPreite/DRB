// #region DRB.Logic.Association
/**
 * Association - Remove Child Id
 * @param {string} index Index
 */
DRB.Logic.Association.RemoveChildId = function (index) {
    $("#" + DRB.DOM.ChildId.DivPrefix.Id + index).remove();

    var newMetadataSecondaryIds = [];
    var indexToRemove = -1;
    DRB.Metadata.SecondaryIds.forEach(function (secondaryId, secondaryIndex) {
        if (secondaryId.Id == index) { indexToRemove = secondaryIndex; } else { newMetadataSecondaryIds.push(secondaryId); }
    });
    DRB.Metadata.SecondaryIds = newMetadataSecondaryIds;

    if (indexToRemove > -1) {
        var newSecondaryIds = [];
        DRB.Metadata.CurrentNode.data.configuration.secondaryIds.forEach(function (secondaryId, secondaryIndex) {
            if (secondaryIndex != indexToRemove) { newSecondaryIds.push(secondaryId); }
        });
        DRB.Metadata.CurrentNode.data.configuration.secondaryIds = newSecondaryIds;
    }
}

/**
 * Association - Add Child Id
 * @param {string} idValue Id Value
 */
DRB.Logic.Association.AddChildId = function (idValue) {
    if (!DRB.Utilities.HasValue(idValue)) { idValue = ""; }
    var index = 0;
    if (DRB.Metadata.SecondaryIds.length > 0) { index = DRB.Metadata.SecondaryIds[DRB.Metadata.SecondaryIds.length - 1].Id + 1; }
    // Take Logic from Create if necessary to rearrange

    var divChildId_ = DRB.UI.CreateEmptyDiv(DRB.DOM.ChildId.DivPrefix.Id + index);
    if (index == 0) {
        //divChildId_.append(DRB.UI.CreateEmptyRemoveButton());
    } else {
        divChildId_.append(DRB.UI.CreateRemoveButton(DRB.Logic.Association.RemoveChildId, index));
    }
    divChildId_.append(DRB.UI.CreateSpan(DRB.DOM.ChildId.SpanPrefix.Id + index, DRB.DOM.ChildId.SpanPrefix.Name));
    divChildId_.append(DRB.UI.CreateInputGuid(DRB.DOM.ChildId.InputPrefix.Id + index));
    divChildId_.append(DRB.UI.CreateLookup(DRB.DOM.ChildId.LookupPrefix.Id + index, DRB.UI.OpenLookup, { openSecondaryEntity: true, textId: DRB.DOM.ChildId.InputPrefix.Id + index }));
    divChildId_.append(DRB.UI.CreateSpacer());
    $("#" + DRB.DOM.ChildId.Div.Id).append(divChildId_);
    DRB.Common.BindGuid(DRB.DOM.ChildId.InputPrefix.Id + index);
    DRB.Logic.Association.BindChildId(DRB.DOM.ChildId.InputPrefix.Id + index);
    DRB.Metadata.SecondaryIds.push(new DRB.Models.IdValue(index, idValue));
    DRB.Metadata.CurrentNode.data.configuration.secondaryIds.push(idValue);
}

/**
 * Association - After Table Loaded
 * @param {DRB.Models.Table} table Table
 */
DRB.Logic.Association.AfterTableLoaded = function (table) {
    DRB.Logic.FillCurrentMetadata(table); // Fill Current Metadata    
    DRB.Logic.FillRelationshipsColumns(); // Fill Relationships Columns

    var tableLogicalNames = [];
    table.OneToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.TargetTable); });
    table.ManyToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.TargetTable); });
    tableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(tableLogicalNames); // remove duplicates

    var childTables = [];
    tableLogicalNames.forEach(function (tableLogicalName) {
        var childTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(childTable)) { childTables.push(childTable); }
    });
    childTables.sort(DRB.Utilities.CustomSort("Name"));
    DRB.UI.FillDropdown(DRB.DOM.ChildTable.Dropdown.Id, DRB.DOM.ChildTable.Dropdown.Name, new DRB.Models.Records(childTables).ToDropdown());

    var childTable = "";
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.secondaryEntity)) {
        childTable = DRB.Metadata.CurrentNode.data.configuration.secondaryEntity.logicalName;
    }
    $("#" + DRB.DOM.ChildTable.Dropdown.Id).val(childTable).change();

    // Fill data.configuration (primaryEntity)
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
}

/**
 * Association - Bind Parent Table
 * @param {string} id Id
 */
DRB.Logic.Association.BindParentTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            if (table.RelationshipsLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    // retrieve the Entity Fields
                    DRB.Common.RetrieveTablesDetails([tableLogicalName], true)
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables, true);
                            var tableLogicalNames = [];
                            table.OneToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.TargetTable); });
                            tableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(tableLogicalNames); // remove duplicates

                            var tablesToRetrieve = [];
                            tableLogicalNames.forEach(function (checkTableLogicalName) {
                                var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, checkTableLogicalName);
                                if (DRB.Utilities.HasValue(checkTable) && checkTable.ColumnsLoaded === false) { tablesToRetrieve.push(checkTableLogicalName); }
                            });
                            if (tablesToRetrieve.length > 0) {
                                DRB.Common.RetrieveTablesDetails(tablesToRetrieve)
                                    .done(function () {
                                        DRB.Common.SetTables(arguments, DRB.Metadata.Tables);
                                        DRB.Logic.Association.AfterTableLoaded(table);
                                        DRB.UI.HideLoading();
                                    })
                                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                            } else {
                                DRB.Logic.Association.AfterTableLoaded(table);
                                DRB.UI.HideLoading();
                            }
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.Association.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Association - Bind Child Table
 * @param {string} id Id
 */
DRB.Logic.Association.BindChildTable = function (id) {
    $("#" + id).on("change", function (e) {
        DRB.Metadata.CurrentNode.data.configuration.secondaryEntity = null;
        DRB.UI.ResetDropdown(DRB.DOM.ParentRelationship.Dropdown.Id, DRB.DOM.ParentRelationship.Dropdown.Name);
        var parentTableLogicalName = $("#" + DRB.DOM.ParentTable.Dropdown.Id).val();
        var childTableLogicalName = $(this).val();
        var parentTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, parentTableLogicalName);
        var childTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, childTableLogicalName);
        if (DRB.Utilities.HasValue(parentTable) && DRB.Utilities.HasValue(childTable)) {
            var relationships = [];
            parentTable.OneToManyRelationships.forEach(function (relationship) {
                if (relationship.TargetTable === childTableLogicalName) {
                    relationships.push(new DRB.Models.SimpleRelationship(relationship.SchemaName, relationship.Type, relationship.SourceTable, relationship.TargetTable, relationship.NavigationAttribute, relationship.NavigationAttributeName));
                }
            });
            parentTable.ManyToManyRelationships.forEach(function (relationship) {
                if (relationship.TargetTable === childTableLogicalName) {
                    relationships.push(new DRB.Models.SimpleRelationship(relationship.SchemaName, relationship.Type, relationship.SourceTable, relationship.TargetTable, relationship.NavigationAttribute, relationship.NavigationAttributeName));
                }
            });
            DRB.UI.FillDropdownWithGroups(DRB.DOM.ParentRelationship.Dropdown.Id, DRB.DOM.ParentRelationship.Dropdown.Name, new DRB.Models.Records(relationships).ToDropdown());
            var relationship = "";
            if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.relationship)) {
                relationship = DRB.Metadata.CurrentNode.data.configuration.relationship;
            }
            $("#" + DRB.DOM.ParentRelationship.Dropdown.Id).val(relationship).change();

            DRB.Metadata.CurrentNode.data.configuration.secondaryEntity = { logicalName: childTable.LogicalName, schemaName: childTable.SchemaName, label: childTable.Name, entitySetName: childTable.EntitySetName };
        }
    });
}

/**
 * Association - Bind Child Id
 * @param {string} id Id
 */
DRB.Logic.Association.BindChildId = function (id) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        DRB.Metadata.SecondaryIds.forEach(function (secondaryId, secondaryIndex) {
            if (secondaryId.Id === elementIndex) {
                secondaryId.Value = controlValue;
                DRB.Metadata.CurrentNode.data.configuration.secondaryIds[secondaryIndex] = controlValue;
            }
        });
    });
}

/**
 * Association - Bind Parent Relationship
 * @param {string} id Id
 */
DRB.Logic.Association.BindParentRelationship = function (id) {
    $("#" + id).on("change", function (e) {
        var relationshipValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.relationship = relationshipValue;
    });
}

/**
 * Association - Start
 */
DRB.Logic.Association.Start = function () {
    // Metadata
    DRB.Metadata.SecondaryIds = [];

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();

    // #region Parent Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.ParentTable.Span.Id, DRB.DOM.ParentTable.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.ParentTable.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.ParentTable.Dropdown.Id, DRB.DOM.ParentTable.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.Association.BindParentTable(DRB.DOM.ParentTable.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddPrimaryId();
    DRB.CustomUI.AddSpacer();

    // #region Child Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.ChildTable.Span.Id, DRB.DOM.ChildTable.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.ChildTable.Dropdown.Id));
    DRB.UI.ResetDropdown(DRB.DOM.ChildTable.Dropdown.Id, DRB.DOM.ChildTable.Dropdown.Name);
    DRB.Logic.Association.BindChildTable(DRB.DOM.ChildTable.Dropdown.Id);
    // #endregion

    // #region Parent Relationship
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.ParentRelationship.Span.Id, DRB.DOM.ParentRelationship.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.ParentRelationship.Dropdown.Id));
    DRB.UI.ResetDropdown(DRB.DOM.ParentRelationship.Dropdown.Id, DRB.DOM.ParentRelationship.Dropdown.Name);
    DRB.Logic.Association.BindParentRelationship(DRB.DOM.ParentRelationship.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region Secondary Ids
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.ChildId.Div.Id));
    // #endregion

    DRB.CustomUI.AddSpacer();

    // $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateButton(DRB.DOM.ChildId.AddButton.Id, DRB.DOM.ChildId.AddButton.Name, DRB.DOM.ChildId.AddButton.Class, DRB.Logic.Association.AddChildId));

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";
            DRB.Metadata.CurrentNode.data.configuration.secondaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.secondaryIds = [""];
        } else {
            $("#" + DRB.DOM.ParentTable.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }

    // Secondary Ids
    if (Array.isArray(DRB.Metadata.CurrentNode.data.configuration.secondaryIds)) {
        var secondaryIds = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.secondaryIds));
        DRB.Metadata.CurrentNode.data.configuration.secondaryIds = [];
        secondaryIds.forEach(function (secondaryId, secondaryIndex) {
            DRB.Logic.Association.AddChildId(secondaryId);
            $("#" + DRB.DOM.ChildId.InputPrefix.Id + secondaryIndex).val(secondaryId).trigger("input");
        });
    }
    // #endregion
}
// #endregion