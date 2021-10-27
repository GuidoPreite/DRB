// #region DRB.Xrm
/**
 * Xrm - Get Xrm Object
 */
DRB.Xrm.GetXrmObject = function () {
    return parent.Xrm;
}

/**
 * Xrm - Is Demo Mode
 */
DRB.Xrm.IsDemoMode = function () {
    return typeof DRB.Xrm.GetXrmObject() === "undefined";
}

/**
 * Xrm - Get Client Url
 */
DRB.Xrm.GetClientUrl = function () {
    if (DRB.Xrm.IsDemoMode()) {
        return "https://democall";
    } else {
        return DRB.Xrm.GetXrmObject().Utility.getGlobalContext().getClientUrl();
    }
}

/**
 * Xrm - Get Metadata Url
 */
DRB.Xrm.GetMetadataUrl = function () {
    if (DRB.Xrm.IsDemoMode()) {
        return "https://democall/api/data/v9.0/$metadata";
    } else {
        return DRB.Xrm.GetClientUrl() + "/api/data/v9.0/$metadata";
    }
}

/**
 * Xrm - Get Version
 */
DRB.Xrm.GetVersion = function () {
    if (DRB.Xrm.IsDemoMode()) { return "9.1"; }
    else {
        try {
            var currentVersion = DRB.Xrm.GetXrmObject().Utility.getGlobalContext().getVersion();
            if (!DRB.Utilities.HasValue(currentVersion)) { return ""; }
            var versionArray = currentVersion.split(".");
            if (versionArray.length < 2) { return ""; }
            return versionArray[0] + "." + versionArray[1];
        } catch (ex) { return ""; }
    }
}

/**
 * Xrm - Retrieve
 * @param {string} entitySetName Entity Set Name
 * @param {string} filters Filters
 */
DRB.Xrm.Retrieve = function (entitySetName, filters) {
    if (DRB.Xrm.IsDemoMode()) {
        return $.when(DRB.Xrm.GetDemoData(entitySetName, filters));
    } else {
        var retrieveUrl = encodeURI(DRB.Xrm.GetClientUrl() + "/api/data/v9.0/" + entitySetName + "?" + filters);
        return $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("OData-MaxVersion", "4.0");
                xhr.setRequestHeader("OData-Version", "4.0");
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            },
            url: retrieveUrl
        });
    }
}

/**
 * Xrm - Retrieve Batch
 * @param {any[]} queries Queries
 */
DRB.Xrm.RetrieveBatch = function (queries) {
    if (DRB.Xrm.IsDemoMode()) {
        return $.when(DRB.Xrm.GetDemoDataBatch(queries));
    } else {
        var batchDescription = "batch_" + DRB.Utilities.GenerateGuid();
        var data = [];
        queries.forEach(function (query) {
            var retrieveUrl = DRB.Xrm.GetClientUrl() + "/api/data/v9.0/" + query.EntitySetName + "?" + query.Filters;
            data.push("--" + batchDescription);
            data.push("Content-Type: application/http");
            data.push("Content-Transfer-Encoding: binary");
            data.push("");
            data.push("GET " + retrieveUrl + " HTTP/1.1");
            data.push("Content-Type: application/json");
            data.push("OData-Version: 4.0");
            data.push("OData-MaxVersion: 4.0");
            data.push("Prefer: odata.include-annotations=\"*\"");
            data.push("");
        });
        data.push("--" + batchDescription + "--");
        var payload = data.join("\r\n");

        return $.ajax({
            method: "POST",
            data: payload,
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "multipart/mixed;boundary=" + batchDescription);
                xhr.setRequestHeader("OData-MaxVersion", "4.0");
                xhr.setRequestHeader("OData-Version", "4.0");
                xhr.setRequestHeader("Accept", "application/json");
            },
            url: DRB.Xrm.GetClientUrl() + "/api/data/v9.0/$batch"
        });
    }
}

/**
 * Xrm - Retrieve Metadata
 * Get $metadata content (XML)
 */
DRB.Xrm.RetrieveMetadata = function () {
    if (DRB.Xrm.IsDemoMode()) {
        return $.when(DRB.Xrm.GetDemoMetadata());
    } else {
        var metadataUrl = DRB.Xrm.GetClientUrl() + "/api/data/v9.0/$metadata";
        return $.ajax({
            type: "GET",
            datatype: "xml",
            async: true,
            url: metadataUrl
        });
    }
}
// #endregion