// #region DRB.GeneratePostman
/**
 * Generate Postman - Return Values
 * @param {string} url Url
 * @param {any[]} headers Headers
 * @param {string} body Body
 */
DRB.GeneratePostman.ReturnValues = function (settings, method, url, body, isBinary) {
    var postmanUrl = { raw: "{{url}}" + url, host: ["{{url}}" + url] };
    var postmanBody = { mode: "raw", raw: body, options: { raw: { language: "json" } } };
    if (isBinary === true) { postmanBody = { mode: "file", file: { src: "" } }; }
    var postmanHeader = DRB.GeneratePostman.GetRequestHeaders(settings, method, isBinary);
    return { postmanMethod: method, postmanUrl: postmanUrl, postmanHeader: postmanHeader, postmanBody: postmanBody };
}

/**
 * Generate Postman - Get Request Headers
 * @param {any} settings Configuration
 */
DRB.GeneratePostman.GetRequestHeaders = function (settings, method, isBinary) {
    // Request Headers
    var headers = [];

    headers.push({ key: "OData-MaxVersion", value: "4.0", type: "text" });
    headers.push({ key: "OData-Version", value: "4.0", type: "text" });
    headers.push({ key: "Accept", value: "application/json", type: "text" });

    if (method === "POST" || method === "PATCH") {
        if (isBinary === true) {
            headers.push({ key: "Content-Type", value: "application/octet-stream", type: "text" });
        } else {
            headers.push({ key: "Content-Type", value: "application/json; charset=utf-8", type: "text" });
        }
    }

    // Formatted Values and Return Record
    if (settings.hasOwnProperty("formattedValues")) {
        if (!settings.hasOwnProperty("returnRecord") && !settings.hasOwnProperty("topCount")) {
            if (settings.formattedValues === true) { headers.push({ key: "Prefer", value: 'odata.include-annotations="*"', type: "text" }); }
        }
        else {
            if (settings.hasOwnProperty("returnRecord")) {
                if (settings.formattedValues === true && settings.returnRecord !== true) { headers.push({ key: "Prefer", value: 'odata.include-annotations="*"', type: "text" }); }
                if (settings.formattedValues !== true && settings.returnRecord === true) { headers.push({ key: "Prefer", value: 'return=representation', type: "text" }); }
                if (settings.formattedValues === true && settings.returnRecord === true) { headers.push({ key: "Prefer", value: 'odata.include-annotations="*",return=representation', type: "text" }); }
            }
            if (settings.hasOwnProperty("topCount")) {
                var hasTopCount = DRB.Utilities.HasValue(settings.topCount);
                if (settings.formattedValues === true && hasTopCount !== true) { headers.push({ key: "Prefer", value: 'odata.include-annotations="*"', type: "text" }); }
                if (settings.formattedValues !== true && hasTopCount === true) { headers.push({ key: "Prefer", value: 'odata.maxpagesize=' + settings.topCount, type: "text" }); }
                if (settings.formattedValues === true && hasTopCount === true) { headers.push({ key: "Prefer", value: 'odata.include-annotations="*",odata.maxpagesize=' + settings.topCount, type: "text" }); }
            }
        }
    }

    // Token Header
    if (settings.hasOwnProperty("tokenHeader") && settings.tokenHeader === true) {
        headers.push({ key: "Authorization", value: "Bearer ", type: "text" });
    }

    // Impersonate
    if (settings.hasOwnProperty("impersonate") && settings.impersonate === true) {
        var impersonateId = "";
        var impersonateHeader = "MSCRMCallerID";
        if (DRB.Utilities.HasValue(settings.impersonateType)) {
            switch (settings.impersonateType) {
                case "mscrmcallerid": impersonateHeader = "MSCRMCallerID"; break;
                case "callerobjectid": impersonateHeader = "CallerObjectId"; break;
            }
        }
        if (DRB.Utilities.HasValue(settings.impersonateId)) { impersonateId = settings.impersonateId; }
        headers.push({ key: impersonateHeader, value: impersonateId, type: "text" });
    }

    // Detect Changes
    if (settings.hasOwnProperty("detectChanges") && settings.detectChanges === true) { headers.push({ key: "If-None-Match", value: 'W/"000000', type: "text" }); }

    // Detect Duplicates
    if (settings.hasOwnProperty("detectDuplicates") && settings.detectDuplicates === true) { headers.push({ key: "MSCRM.SuppressDuplicateDetection", value: "false", type: "text" }); }

    // Prevent
    if (settings.hasOwnProperty("prevent")) {
        if (settings.prevent === "create") { headers.push({ key: "If-Match", value: "*", type: "text" }); }
        if (settings.prevent === "update") { headers.push({ key: "If-None-Match", value: "*", type: "text" }); }
    }
    return headers;
}

/**
 * Generate Postman - Get Body
 * Used in Create, Update
 * @param {any} settings Configuration
 */
DRB.GeneratePostman.GetUpsertBody = function (settings) {
    var upsertBody = [];
    settings.setFields.forEach(function (field) {
        switch (field.type) {
            case "Uniqueidentifier":
            case "String":
            case "Memo":
                var clearedValue = field.value;
                if (DRB.Utilities.HasValue(clearedValue)) {
                    clearedValue = field.value.replace(/"/g, '\\"');
                    clearedValue = clearedValue.replace(/\r?\n/g, "\\n");
                }
                if (!DRB.Utilities.HasValue(clearedValue)) { upsertBody.push('\t"' + field.logicalName + '": null,'); }
                else { upsertBody.push('\t"' + field.logicalName + '": "' + clearedValue + '",'); }
                break;
            case "BigInt":
            case "Integer":
            case "Decimal":
            case "Double":
            case "Boolean":
            case "Picklist":
            case "State":
            case "Status":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
                upsertBody.push('\t"' + field.logicalName + '": ' + clearedValue + ',');
                break;
            case "Money":
                var clearedValue = field.value;
                if (DRB.Utilities.HasValue(clearedValue)) {
                    clearedValue = Number(parseFloat(clearedValue).toFixed(4));
                } else { clearedValue = null; }
                upsertBody.push('\t"' + field.logicalName + '": ' + clearedValue + ',');
                break;
            case "MultiPicklist":
                var clearedValue = null;
                if (DRB.Utilities.HasValue(field.value)) {
                    if (field.value.length === 0) { clearedValue = null; }
                    else { clearedValue = '"' + field.value.join(",") + '"'; }
                }
                upsertBody.push('\t"' + field.logicalName + '": ' + clearedValue + ',');
                break;
            case "Lookup":
            case "Owner":
            case "Customer":
                if (DRB.Utilities.HasValue(field.value)) {
                    var clearedValue = null;
                    if (DRB.Utilities.HasValue(field.value.id)) {
                        clearedValue = '"/' + field.value.entitySetName + '(' + field.value.id + ')"';
                    }
                    upsertBody.push('\t"' + field.value.navigationProperty + '@odata.bind": ' + clearedValue + ',');
                }
                break;
            case "DateTime":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { upsertBody.push('\t"' + field.logicalName + '": null,'); }
                else {
                    if (field.dateTimeBehavior === "DateOnly") { upsertBody.push('\t"' + field.logicalName + '": "' + clearedValue + '",'); }
                    else {
                        clearedValue = new Date(clearedValue).toISOString();
                        upsertBody.push('\t"' + field.logicalName + '": "' + clearedValue + '",');
                    }
                }
                break;
            case "Image":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { upsertBody.push('\t"' + field.logicalName + '": null,'); }
                else { upsertBody.push('\t"' + field.logicalName + '": "' + clearedValue + '",'); }
                break;
        }
    });
    if (upsertBody.length > 0) {
        var lastComma = upsertBody[upsertBody.length - 1].lastIndexOf(",");
        if (lastComma > -1) { upsertBody[upsertBody.length - 1] = upsertBody[upsertBody.length - 1].slice(0, lastComma); }
    }
    upsertBody.unshift('{');
    upsertBody.push('}');
    return upsertBody.join("\n");
}

/**
 * Generate Postman - Get Execute Parameters
 * Used in Execute Action, Execute Function
 * @param {any} settings Configuration
 */
DRB.GeneratePostman.GetExecuteParameters = function (settings) {
    var executeParameters = [];

    var isBound = false;
    if (settings.primaryEntity.logicalName !== "none") { isBound = true; }

    settings.dataverseParameters.forEach(function (parameter, parameterIndex) {
        if (isBound === true && parameterIndex === 0) { return; } // skip the first parameter if the request is bound

        if (parameter.include === true) {
            var typeFound = false;

            if (typeFound === false && parameter.type.indexOf("Collection(") === 0) {
                typeFound = true;
                // Collection can be of anything: Edm.*, mscrm.crmbaseentity, mscrm.*Table, mscrm.*ComplexType
                // not supported: Collection(Edm.Binary), Collection(Edm.DateTimeOffset), Collection(mscrm.*ComplexType)
                var collectionTypeFound = false;
                var printedArray = '';

                var checkOtherParameterTypes = true;
                if (parameter.type.indexOf("Collection(mscrm.") === 0 && parameter.type !== "Collection(mscrm.crmbaseentity)" && Array.isArray(parameter.value)) {
                    // because the value is an array we assume is a valid Collection(mscrm.*Table);
                    checkOtherParameterTypes = false;
                    collectionTypeFound = true;
                    parameter.value.forEach(function (v) {
                        printedArray += '{ "@odata.type": "Microsoft.Dynamics.CRM.' + v.entityType + '", "' + v.primaryIdField + '": "' + v.id + '" }, ';
                    });
                }

                if (checkOtherParameterTypes === true) {
                    switch (parameter.type) {
                        case "Collection(Edm.Guid)":
                        case "Collection(Edm.String)":
                            collectionTypeFound = true;
                            parameter.value.forEach(function (v) {
                                var clearedValue = v.replace(/"/g, '\\"');
                                clearedValue = clearedValue.replace(/\r?\n/g, "\\n");
                                printedArray += '"' + clearedValue + '", ';
                            });
                            break;
                        case "Collection(Edm.Boolean)":
                        case "Collection(Edm.Int32)":
                        case "Collection(Edm.Int64)":
                        case "Collection(Edm.Decimal)":
                        case "Collection(Edm.Double)":
                            collectionTypeFound = true;
                            parameter.value.forEach(function (v) { printedArray += v + ', '; });
                            break;
                        case "Collection(mscrm.crmbaseentity)":
                            collectionTypeFound = true;
                            parameter.value.forEach(function (v) {
                                printedArray += '{ "@odata.type": "Microsoft.Dynamics.CRM.' + v.entityType + '", "' + v.primaryIdField + '": "' + v.id + '" }, ';
                            });
                            break;
                    }
                }
                if (collectionTypeFound === true) {
                    if (parameter.value.length > 0) { printedArray = printedArray.slice(0, -2); }
                    printedArray = '[' + printedArray + ']';
                    executeParameters.push('\t"' + parameter.name + '": ' + printedArray + ',');
                } else {
                    executeParameters.push('\t"' + parameter.name + '": null,');
                }
            }

            if (typeFound === false && parameter.type === "mscrm.crmbaseentity") {
                typeFound = true;
                if (DRB.Utilities.HasValue(parameter.value.id) && DRB.Utilities.HasValue(parameter.value.entityType)) {
                    var clearedValue = '{ "@odata.type": "Microsoft.Dynamics.CRM.' + parameter.value.entityType + '", "' + parameter.value.primaryIdField + '": "' + parameter.value.id + '" }';
                    executeParameters.push('\t"' + parameter.name + '": ' + clearedValue + ',');
                } else {
                    executeParameters.push('\t"' + parameter.name + '": null,');
                }
            }

            if (typeFound === false && parameter.type.indexOf("mscrm.") === 0) {
                typeFound = true;
                if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.id) && DRB.Utilities.HasValue(parameter.value.entityType)) {
                    var clearedValue = '{ "@odata.type": "Microsoft.Dynamics.CRM.' + parameter.value.entityType + '", "' + parameter.value.primaryIdField + '": "' + parameter.value.id + '" }';
                    executeParameters.push('\t"' + parameter.name + '": ' + clearedValue + ',');
                } else {
                    executeParameters.push('\t"' + parameter.name + '": null,');
                }
            }

            if (typeFound === false && parameter.type.indexOf("Edm.") === 0) {
                switch (parameter.type) {
                    case "Edm.Binary":
                        executeParameters.push('\t"' + parameter.name + '": null');
                        break;
                    case "Edm.Guid":
                        var clearedValue = parameter.value;
                        if (DRB.Utilities.HasValue(clearedValue)) {
                            clearedValue = parameter.value.replace(/"/g, '\\"');
                            clearedValue = clearedValue.replace(/\r?\n/g, "\\n");
                        }

                        if (!DRB.Utilities.HasValue(clearedValue)) {
                            executeParameters.push('\t"' + parameter.name + '": null,');
                        }
                        else {
                            executeParameters.push('\t"' + parameter.name + '": "' + clearedValue + '"' + ',');
                        }
                        break;
                    case "Edm.String":
                        var clearedValue = parameter.value;
                        if (DRB.Utilities.HasValue(clearedValue)) {
                            clearedValue = parameter.value.replace(/"/g, '\\"');
                            clearedValue = clearedValue.replace(/\r?\n/g, "\\n");
                        }
                        if (!DRB.Utilities.HasValue(clearedValue)) { executeParameters.push('\t"' + parameter.name + '": null,'); }
                        else {
                            executeParameters.push('\t"' + parameter.name + '": "' + clearedValue + '"' + ',');
                        }
                        break;
                    case "Edm.Int32":
                    case "Edm.Int64":
                    case "Edm.Decimal":
                    case "Edm.Double":
                    case "Edm.Boolean":
                        var clearedValue = parameter.value;
                        if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
                        executeParameters.push('\t"' + parameter.name + '": ' + clearedValue + ',');
                        break;
                    case "Edm.DateTimeOffset":
                        var clearedValue = parameter.value;
                        if (!DRB.Utilities.HasValue(clearedValue)) { executeParameters.push('\t"' + parameter.name + '": null,'); }
                        else {
                            clearedValue = new Date(clearedValue).toISOString();
                            executeParameters.push('\t"' + parameter.name + '": ' + clearedValue + ',');
                        }
                        break;
                }
            }
        }
    });

    if (executeParameters.length > 0) {
        var lastComma = executeParameters[executeParameters.length - 1].lastIndexOf(",");
        if (lastComma > -1) { executeParameters[executeParameters.length - 1] = executeParameters[executeParameters.length - 1].slice(0, lastComma); }
    }

    executeParameters.unshift('{');
    executeParameters.push('}');

    return executeParameters.join("\n");
}

/**
 * Generate Postman - Retrieve Single
 */
DRB.GeneratePostman.RetrieveSingle = function (settings) {
    var url = "";
    var body = "";

    if (DRB.Utilities.HasValue(settings.primaryEntity)) {
        var urlFields = DRB.GenerateCode.GetUrlFields(settings);
        var entityCriteria = settings.primaryId;
        if (settings.useAlternateKey === true) { entityCriteria = DRB.GenerateCode.GetAlternateKeys(settings); }

        // Url
        url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")" + urlFields;
    }
    return DRB.GeneratePostman.ReturnValues(settings, "GET", url, body);
}

/**
 * Generate Postman - Retrieve Multiple
 */
DRB.GeneratePostman.RetrieveMultiple = function (settings) {
    var url = "";
    var body = "";

    if (DRB.Utilities.HasValue(settings.primaryEntity)) {
        var urlFields = DRB.GenerateCode.GetUrlFields(settings);
        var filterFields = DRB.GenerateCode.GetFilterFields(settings);
        var orderFields = DRB.GenerateCode.GetOrderFields(settings);

        if (filterFields !== '') {
            if (urlFields === '') { filterFields = '?' + filterFields; } else { filterFields = '&' + filterFields; }
            urlFields = urlFields + filterFields;
        }

        if (orderFields !== '') {
            if (urlFields === '') { orderFields = '?' + orderFields; } else { orderFields = '&' + orderFields; }
            urlFields = urlFields + orderFields;
        }

        if (settings.retrieveCount === true) {
            if (urlFields === '') { urlFields = '?'; } else { urlFields += '&'; }
            urlFields += '$count=true';
        }
        // Url
        url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + urlFields;

    }
    return DRB.GeneratePostman.ReturnValues(settings, "GET", url, body);
}

/**
 * Generate Postman - Create
 */
DRB.GeneratePostman.Create = function (settings) {
    var url = "";
    var body = "";

    if (DRB.Utilities.HasValue(settings.primaryEntity)) {
        var urlFields = '';
        if (settings.returnRecord === true) {
            urlFields = DRB.GenerateCode.GetUrlFields(settings);
        }
        // Url
        url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + urlFields;

        // Body
        body = DRB.GeneratePostman.GetUpsertBody(settings, "POST");
    }
    return DRB.GeneratePostman.ReturnValues(settings, "POST", url, body);
}

/**
 * Generate Postman - Update
 */
DRB.GeneratePostman.Update = function (settings) {
    var url = "";
    var body = "";

    if (DRB.Utilities.HasValue(settings.primaryEntity)) {
        var urlFields = '';
        if (settings.returnRecord === true) {
            urlFields = DRB.GenerateCode.GetUrlFields(settings);
        }
        var entityCriteria = settings.primaryId;
        if (settings.useAlternateKey === true) { entityCriteria = DRB.GenerateCode.GetAlternateKeys(settings); }
        // Url
        url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")" + urlFields;

        // Body
        body = DRB.GeneratePostman.GetUpsertBody(settings, "PATCH");
    }
    return DRB.GeneratePostman.ReturnValues(settings, "PATCH", url, body);
}

/**
 * Generate Postman - Delete
 */
DRB.GeneratePostman.Delete = function (settings) {
    var url = "";
    var body = "";

    if (DRB.Utilities.HasValue(settings.primaryEntity)) {
        var entityCriteria = settings.primaryId;
        if (settings.useAlternateKey === true) { entityCriteria = DRB.GenerateCode.GetAlternateKeys(settings); }
        // Url
        url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")";
    }
    return DRB.GeneratePostman.ReturnValues(settings, "DELETE", url, body);
}

/**
 * Generate Postman - Associate
 */
DRB.GeneratePostman.Associate = function (settings) {
    var url = "";
    var body = "";

    if (DRB.Utilities.HasValue(settings.primaryEntity) && DRB.Utilities.HasValue(settings.primaryEntity) && DRB.Utilities.HasValue(settings.relationship)) {
        // Url
        url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "/$ref";

        var clientUrl = DRB.Xrm.GetClientUrl();
        body = '{ "@odata.id": "' + clientUrl + '/api/data/' + settings.version + '/' + settings.secondaryEntity.entitySetName + '(' + settings.secondaryIds[0] + ')" }';
    }
    return DRB.GeneratePostman.ReturnValues(settings, "POST", url, body);
}

/**
 * Generate Postman - Disassociate
 */
DRB.GeneratePostman.Disassociate = function (settings) {
    var url = "";
    var body = "";

    if (DRB.Utilities.HasValue(settings.primaryEntity) && DRB.Utilities.HasValue(settings.primaryEntity) && DRB.Utilities.HasValue(settings.relationship)) {
        // Url
        url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "(" + settings.secondaryIds[0] + ")/$ref";
    }
    return DRB.GeneratePostman.ReturnValues(settings, "DELETE", url, body);
}

/**
 * Generate Postman - Retrieve NextLink
 */
DRB.GeneratePostman.RetrieveNextLink = function (settings) {
    var url = "";
    var body = "";

    if (DRB.Utilities.HasValue(settings.nextLink)) {
        // Url
        var mainUrl = settings.nextLink;
        if (settings.retrieveCount === true && mainUrl.indexOf("$count=true") === -1) {
            if (mainUrl.indexOf("?") === -1) { mainUrl += "?$count=true"; }
            else { mainUrl += "&$count=true"; }
        }
        url = mainUrl;
    }
    return DRB.GeneratePostman.ReturnValues(settings, "GET", url, body);
}

/**
 * Generate Postman - Predefined Query
 */
DRB.GeneratePostman.PredefinedQuery = function (settings) {
    var url = "";
    var body = "";

    if (DRB.Utilities.HasValue(settings.primaryEntity) && DRB.Utilities.HasValue(settings.queryType)) {

        var queryParameter = "";
        switch (settings.queryType) {
            case "savedquery": queryParameter = '?savedQuery=' + settings.systemViewId; break;
            case "userquery": queryParameter = '?userQuery=' + settings.personalViewId; break;
            case "fetchxml":
                var escapedFetchXML = encodeURIComponent(settings.fetchXML);
                queryParameter = '?fetchXml=' + escapedFetchXML;
                break;
        }
        // Url
        var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + queryParameter;

        if (settings.retrieveCount === true) {
            if (settings.queryType === "fetchxml") { mainUrl += " + \"&$count=true"; }
            else { mainUrl += "&$count=true"; }
        }
        url = mainUrl;
    }
    return DRB.GeneratePostman.ReturnValues(settings, "GET", url, body);
}

/**
 * Generate Postman - Dataverse Execute
 */
DRB.GeneratePostman.DataverseExecute = function (settings) {
    var url = "";
    var body = "";
    if (DRB.Utilities.HasValue(settings.primaryEntity) && DRB.Utilities.HasValue(settings.dataverseExecute)) {
        // isBound and isCollectionBound
        var isBound = false;
        var isCollectionBound = false;
        if (settings.primaryEntity.logicalName !== "none") { isBound = true; }
        // if the action is bounded and the first parameter is "entityset" then is "collection bound"
        // NOTE: this is a valid check because if a Custom Action is bounded to an entity (making isBound to true) the first parameter in that case is "entity" and not "entityset"
        if (isBound === true && settings.dataverseParameters.length > 0 && settings.dataverseParameters[0].name === "entityset") { isCollectionBound = true; }


        var mainUrl = "/api/data/" + settings.version + "/";
        if (isBound === true) {
            if (isCollectionBound === false) {
                var primaryId = "";
                if (DRB.Utilities.HasValue(settings.dataverseParameters[0].value.id)) { primaryId = settings.dataverseParameters[0].value.id; }
                mainUrl += settings.primaryEntity.entitySetName + "(" + primaryId + ")/Microsoft.Dynamics.CRM." + settings.dataverseExecute;
            }
            else { mainUrl += settings.primaryEntity.entitySetName + "/Microsoft.Dynamics.CRM." + settings.dataverseExecute; }
        } else { mainUrl += settings.dataverseExecute; }

        // OperationType
        var method = "POST";
        var operationType = settings.dataverseOperationType;
        if (operationType === 1) {
            method = "GET";
            mainUrl += DRB.GenerateCode.GetFunctionUrl(settings);
        }

        // Url
        url = mainUrl;

        if (method === "POST") {
            body = DRB.GeneratePostman.GetExecuteParameters(settings);
        }
    }
    return DRB.GeneratePostman.ReturnValues(settings, method, url, body);
}

/**
 * Generate Postman - Execute Workflow
 */
DRB.GeneratePostman.ExecuteWorkflow = function (settings) {
    var url = "";
    var body = "";

    // Url
    url = "/api/data/" + settings.version + "/workflows(" + settings.workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";

    // Body
    body = '{ "EntityId": "' + settings.primaryId + '" }';

    return DRB.GeneratePostman.ReturnValues(settings, "POST", url, body);
}

/**
 * Generate Postman - Manage File Image Data
 */
DRB.GeneratePostman.ManageFileImageData = function (settings, requestType) {
    var url = "";
    var body = "";
    var isBinary = false;
    var operation = "GET";
    if (DRB.Utilities.HasValue(settings.primaryEntity)) {
        var entityCriteria = settings.primaryId;
        var field = "";
        if (DRB.Utilities.HasValue(settings.fileField)) { field = settings.fileField.logicalName; }
        var fileName = encodeURIComponent(settings.fileName);

        switch (settings.fileOperation) {
            case "retrieve":
                operation = "GET";
                url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field + "/$value";
                if (requestType === "manageimagedata" && settings.fileFullSize === true) { url += "?size=full"; }
                break;
            case "upload":
                operation = "PATCH";
                url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field + "?x-ms-file-name=" + fileName;
                isBinary = true;
                break;
            case "delete":
                operation = "DELETE";
                url = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field;
                break;
        }
    }
    return DRB.GeneratePostman.ReturnValues(settings, operation, url, body, isBinary);
}

/**
 * Generate Postman - Start
 */
DRB.GeneratePostman.Start = function (requestType, settings) {
    switch (requestType) {
        case "retrievesingle": return DRB.GeneratePostman.RetrieveSingle(settings); break;
        case "retrievemultiple": return DRB.GeneratePostman.RetrieveMultiple(settings); break;
        case "create": return DRB.GeneratePostman.Create(settings); break;
        case "update": return DRB.GeneratePostman.Update(settings); break;
        case "delete": return DRB.GeneratePostman.Delete(settings); break;
        case "associate": return DRB.GeneratePostman.Associate(settings); break;
        case "disassociate": return DRB.GeneratePostman.Disassociate(settings); break;
        case "retrievenextlink": return DRB.GeneratePostman.RetrieveNextLink(settings); break;
        case "predefinedquery": return DRB.GeneratePostman.PredefinedQuery(settings); break;
        case "executeworkflow": return DRB.GeneratePostman.ExecuteWorkflow(settings); break;

        // Manage File Data and Manage Image Data share the same code
        case "managefiledata":
        case "manageimagedata":
            return DRB.GeneratePostman.ManageFileImageData(settings, requestType);
            break;

        // Custom API, Custom Action, Action, Function share the same code
        case "executecustomapi":
        case "executecustomaction":
        case "executeaction":
        case "executefunction":
            return DRB.GeneratePostman.DataverseExecute(settings);
            break;
    }
}
// #endregion