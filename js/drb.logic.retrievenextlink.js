// #region DRB.Logic.RetrieveNextLink
/**
 * Retrieve NextLink - Bind NextLink
 * @param {string} id Id
 */
DRB.Logic.RetrieveNextLink.BindNextLink = function (id) {
    $("#" + id).on("change", function (e) {
        var nextLinkValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.nextLink = nextLinkValue;
        // try to extract Table from the link
        DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
        var parseLink = nextLinkValue;
        if (parseLink.indexOf("?") > -1) { parseLink = parseLink.substring(0, parseLink.indexOf("?")); }
        if (parseLink.lastIndexOf("/") > -1 && parseLink.length > parseLink.lastIndexOf("/")) {
            parseLink = parseLink.substring(parseLink.lastIndexOf("/") + 1);
            var table = DRB.Utilities.GetRecordByProperty(DRB.Metadata.Tables, "EntitySetName", parseLink);
            if (DRB.Utilities.HasValue(table)) {
                DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
            }
        }
    });
}

/**
 * Retrieve NextLink - Start
 */
DRB.Logic.RetrieveNextLink.Start = function () {
    // create DOM and bindings
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();
    DRB.CustomUI.AddDetectChanges();
    DRB.CustomUI.AddRetrieveCount();
    DRB.CustomUI.AddSpacer();

    // #region NextLink
    var divNextLink = DRB.UI.CreateEmptyDiv(DRB.DOM.NextLink.Div.Id);
    divNextLink.append(DRB.UI.CreateSpan(DRB.DOM.NextLink.Span.Id, DRB.DOM.NextLink.Span.Name));
    divNextLink.append(DRB.UI.CreateInputNextLink(DRB.DOM.NextLink.Input.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divNextLink);
    DRB.Logic.RetrieveNextLink.BindNextLink(DRB.DOM.NextLink.Input.Id);
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.nextLink)) {
        $("#" + DRB.DOM.NextLink.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.nextLink).change();
    }
    // #endregion

    DRB.CustomUI.AddSpacer();
}
// #endregion