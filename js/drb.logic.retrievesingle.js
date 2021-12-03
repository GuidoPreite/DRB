// #region DRB.Logic.RetrieveSingle
/**
 * Retrieve Single - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.RetrieveSingle.AfterTableLoaded = function (table) {
    DRB.Logic.FillCurrentMetadata(table); // Fill Current Metadata
    DRB.Logic.FillRelationshipsColumns(); // Fill Relationships Columns
    DRB.Logic.FillColumns(); // Fill Columns
    DRB.Logic.FillRelationships(); // Fill Relationships
    DRB.Logic.FillAlternateKeys(); // Fill Alternate Keys

    // Fill data.configuration (primaryEntity, PrimaryIdField)
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
    DRB.Metadata.CurrentNode.data.configuration.primaryIdField = table.PrimaryIdAttribute;
}

/**
 * Retrieve Single - Bind Table
 * @param {string} id Id
*/
DRB.Logic.RetrieveSingle.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            if (table.ColumnsLoaded === false || table.RelationshipsLoaded === false || table.AlternateKeysLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    // retrieve the Entity Fields
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
                                        DRB.Logic.RetrieveSingle.AfterTableLoaded(table);
                                        DRB.UI.HideLoading();
                                    })
                                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                            } else {
                                DRB.Logic.RetrieveSingle.AfterTableLoaded(table);
                                DRB.UI.HideLoading();
                            }
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.RetrieveSingle.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Retrieve Single - Start 
 */
DRB.Logic.RetrieveSingle.Start = function () {
    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();
    DRB.CustomUI.AddDetectChanges();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.RetrieveSingle.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddColumns();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddRelationships();
    DRB.CustomUI.AddUseAlternateKey();
    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists, if not we set the alternate key to No if was yes
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryIdField = "";
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";
            DRB.Metadata.CurrentNode.data.configuration.fields = [];
            DRB.Metadata.CurrentNode.data.configuration.oneToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToOne = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToMany = [];
            // end reset
            $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("no").change();
            DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        } else {
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    } else { DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id); }
    // #endregion
}
// #endregion