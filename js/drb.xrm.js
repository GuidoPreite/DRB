// #region DRB.Xrm
/**
 * Xrm - Get Xrm Object
 */
DRB.Xrm.GetXrmObject = function () {
    if (typeof parent !== "undefined") { return parent.Xrm; } else { return undefined; }
}

/**
 * Xrm - Is XTB Mode
 */
DRB.Xrm.IsXTBMode = function () {
    return DRB.Settings.XTBContext;
}

/**
 * Xrm - Is JWT Mode
 */
DRB.Xrm.IsJWTMode = function () {
    return DRB.Settings.JWTContext;
}

/**
 * Xrm - Is Demo Mode
 */
DRB.Xrm.IsDemoMode = function () {
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode()) { return false; }
    return typeof DRB.Xrm.GetXrmObject() === "undefined";
}

/**
 * Xrm - Is Instance Mode
 */
DRB.Xrm.IsInstanceMode = function () {
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDemoMode()) { return false; }
    return typeof DRB.Xrm.GetXrmObject() !== "undefined";
}

/**
 * Xrm - Get Client Url
 */
DRB.Xrm.GetClientUrl = function () {
    if (DRB.Xrm.IsXTBMode()) { return DRB.Settings.XTBUrl; }
    if (DRB.Xrm.IsJWTMode()) { return DRB.Settings.JWTUrl; }
    if (DRB.Xrm.IsInstanceMode()) { return DRB.Xrm.GetXrmObject().Utility.getGlobalContext().getClientUrl(); }
    if (DRB.Xrm.IsDemoMode()) { return "https://democall"; }
}

/**
 * Xrm - Get Context
 */
DRB.Xrm.GetContext = function () {
    var context = "Demo";
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsInstanceMode()) { context = DRB.Xrm.GetClientUrl(); }
    return "<small>(" + context + ")</small>";
}

/**
 * Xrm - Get Metadata Url
 */
DRB.Xrm.GetMetadataUrl = function () {
    return DRB.Xrm.GetClientUrl() + "/api/data/v9.0/$metadata";
}

/**
 * Xrm - Get Version
 */
DRB.Xrm.GetVersion = function () {
    var currentVersion = "";
    if (DRB.Xrm.IsXTBMode()) { currentVersion = DRB.Settings.XTBVersion; }
    if (DRB.Xrm.IsJWTMode()) { currentVersion = DRB.Settings.JWTVersion; }
    if (DRB.Xrm.IsInstanceMode()) { currentVersion = DRB.Xrm.GetXrmObject().Utility.getGlobalContext().getVersion(); }
    if (DRB.Xrm.IsDemoMode()) { currentVersion = "9.1.0.0"; }

    if (!DRB.Utilities.HasValue(currentVersion)) { return ""; }
    var versionArray = currentVersion.split(".");
    if (versionArray.length < 2) { return ""; }
    return versionArray[0] + "." + versionArray[1];
}

/**
 * Xrm - Retrieve
 * @param {string} entitySetName Entity Set Name
 * @param {string} filters Filters
 */
DRB.Xrm.Retrieve = function (entitySetName, filters) {
    var retrieveUrl = encodeURI(DRB.Xrm.GetClientUrl() + "/api/data/v9.0/" + entitySetName + "?" + filters);

    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsInstanceMode()) {
        var token = "";
        if (DRB.Xrm.IsXTBMode()) { token = DRB.Settings.XTBToken; }
        if (DRB.Xrm.IsJWTMode()) { token = DRB.Settings.JWTToken; }
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
                if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode()) { xhr.setRequestHeader("Authorization", "Bearer " + token); }
            },
            url: retrieveUrl
        });
    }

    if (DRB.Xrm.IsDemoMode()) { return $.when(DRB.Xrm.GetDemoData(entitySetName, filters)); }
}

/**
 * Xrm - Retrieve Batch
 * @param {any[]} queries Queries
 */
DRB.Xrm.RetrieveBatch = function (queries) {
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

    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsInstanceMode()) {
        var token = "";
        if (DRB.Xrm.IsXTBMode()) { token = DRB.Settings.XTBToken; }
        if (DRB.Xrm.IsJWTMode()) { token = DRB.Settings.JWTToken; }
        return $.ajax({
            method: "POST",
            data: payload,
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "multipart/mixed;boundary=" + batchDescription);
                xhr.setRequestHeader("OData-MaxVersion", "4.0");
                xhr.setRequestHeader("OData-Version", "4.0");
                xhr.setRequestHeader("Accept", "application/json");
                if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode()) { xhr.setRequestHeader("Authorization", "Bearer " + token); }
            },
            url: DRB.Xrm.GetClientUrl() + "/api/data/v9.0/$batch"
        });
    }

    if (DRB.Xrm.IsDemoMode()) { return $.when(DRB.Xrm.GetDemoDataBatch(queries)); }
}

/**
 * Xrm - Retrieve Batches
 * @param {any[]} batchedQueries Batched Queries
 */
DRB.Xrm.RetrieveBatches = function (batchedQueries) {
    var xrmCalls = [];
    batchedQueries.forEach(function (batchedQuery) {
        var queries = [];
        batchedQuery.forEach(function (query) { queries.push(query); });
        xrmCalls.push(DRB.Xrm.RetrieveBatch(queries));
    });
    return $.when.apply($, xrmCalls);
}

/**
 * Xrm - Retrieve Metadata
 * Get $metadata content (XML)
 */
DRB.Xrm.RetrieveMetadata = function () {
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsInstanceMode()) {
        var token = "";
        if (DRB.Xrm.IsXTBMode()) { token = DRB.Settings.XTBToken; }
        if (DRB.Xrm.IsJWTMode()) { token = DRB.Settings.JWTToken; }
        return $.ajax({
            type: "GET",
            datatype: "xml",
            async: true,
            beforeSend: function (xhr) {
                if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode()) { xhr.setRequestHeader("Authorization", "Bearer " + token); }
            },
            url: DRB.Xrm.GetMetadataUrl()
        });
    }

    if (DRB.Xrm.IsDemoMode()) { return $.when(DRB.Xrm.GetDemoMetadata()); }
}

/**
 * Xrm - Get Server Version
 * @param {string} serverUrl Server Url
 * @param {string} token Token
 */
DRB.Xrm.GetServerVersion = function (serverUrl, token) {
    return $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("OData-MaxVersion", "4.0");
            xhr.setRequestHeader("OData-Version", "4.0");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        url: serverUrl + "/api/data/v9.0/RetrieveVersion()"
    });
}
// #endregion