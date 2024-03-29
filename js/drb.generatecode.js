// #region DRB.GenerateCode
/**
 * Generate Code - Set Code Editors
 * @param {string[]} codeXrmWebApi Code Xrm.WebApi
 * @param {string[]} codeXrmWebApiExecute Code Xrm.WebApi Execute
 * @param {string[]} codejQuery Code jQuery
 * @param {string[]} codeXMLHttpRequest Code XMLHttpRequest
 * @param {string[]} codeFetchAPI Code Fetch API
 * @param {string[]} codePortals Code Portals
 */
DRB.GenerateCode.SetCodeEditors = function (codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, codeFetchXML, codeSDK) {
    if (!DRB.Utilities.HasValue(codeXrmWebApi)) { codeXrmWebApi = []; }
    if (!DRB.Utilities.HasValue(codeXrmWebApiExecute)) { codeXrmWebApiExecute = []; } // Xrm.WebApi execute is available only for Retrieve Single, Create, Update, Delete
    if (!DRB.Utilities.HasValue(codejQuery)) { codejQuery = []; }
    if (!DRB.Utilities.HasValue(codeXMLHttpRequest)) { codeXMLHttpRequest = []; }
    if (!DRB.Utilities.HasValue(codeFetchAPI)) { codeFetchAPI = []; }
    if (!DRB.Utilities.HasValue(codePortals)) { codePortals = []; } // Portals is available only for Retrieve Single, Retrieve Multiple, Create, Update, Delete, Associate, Disassociate
    if (!DRB.Utilities.HasValue(codeFetchXML)) { codeFetchXML = []; }
	if (!DRB.Utilities.HasValue(codeSDK)) { codeSDK = []; }

    DRB.Settings.Editors["code_xrmwebapi"].session.setValue(codeXrmWebApi.join('\n'));
    DRB.Settings.Editors["code_xrmwebapiexecute"].session.setValue(codeXrmWebApiExecute.join('\n'));
    DRB.Settings.Editors["code_fetchapi"].session.setValue(codeFetchAPI.join('\n'));
    DRB.Settings.Editors["code_jquery"].session.setValue(codejQuery.join('\n'));
    DRB.Settings.Editors["code_xmlhttprequest"].session.setValue(codeXMLHttpRequest.join('\n'));
    DRB.Settings.Editors["code_portals"].session.setValue(codePortals.join('\n'));
    DRB.Settings.Editors["code_fetchxml"].session.setValue(codeFetchXML.join('\n'));
	DRB.Settings.Editors["code_sdk"].session.setValue(codeSDK.join('\n'));
}

/**
 * Generate Code - Get Url Fields
 * Used in Retrieve Single, Retrieve Multiple, Create, Update
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetUrlFields = function (settings) {
    var urlFields = '';
    // main fields
    var fieldLogicalNames = settings.fields.map(function (field) { return field.oDataName; });
    if (settings.fields.length > 0) { urlFields = '$select=' + fieldLogicalNames.join(); }

    // check relationships
    if (settings.oneToMany.length > 0 || settings.manyToOne.length > 0 || settings.manyToMany.length > 0) {
        if (urlFields !== '') { urlFields += '&'; }
        urlFields += '$expand=';
    }

    settings.oneToMany.forEach(function (oneToMany) {
        var relFieldLogicalNames = oneToMany.fields.map(function (field) { return field.oDataName; });
        urlFields += oneToMany.schemaName + '($select=' + relFieldLogicalNames.join() + '),';
    });

    settings.manyToOne.forEach(function (manyToOne) {
        var relFieldLogicalNames = manyToOne.fields.map(function (field) { return field.oDataName; });
        urlFields += manyToOne.navigationProperty + '($select=' + relFieldLogicalNames.join() + '),';
    });

    settings.manyToMany.forEach(function (manyToMany) {
        var relFieldLogicalNames = manyToMany.fields.map(function (field) { return field.oDataName; });
        urlFields += manyToMany.schemaName + '($select=' + relFieldLogicalNames.join() + '),';
    });

    if (urlFields !== '') {
        urlFields = '?' + urlFields;
        if (urlFields.slice(-1) === ',') { urlFields = urlFields.slice(0, -1); }
    }
    return urlFields;
}

/**
 * Generate Code - Get Function Url
 * Used in Dataverse Execute
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFunctionUrl = function (settings) {
    var functionUrl = '(';
    // #region Main Url
    // for xhr the parameters are inside the url
    var addedUrlParameter = false;
    settings.dataverseParameters.forEach(function (parameter, parameterIndex) {
        if (parameter.include === true) {
            if (parameterIndex === 0) { if (parameter.name === "entity" || parameter.name === "entityset") { return; } }
            functionUrl += parameter.name + "=@" + parameter.name + ",";
            addedUrlParameter = true;
        }
    });
    if (addedUrlParameter === true) { functionUrl = functionUrl.slice(0, -1); } // remove the last ","
    functionUrl += ")";
    if (addedUrlParameter === true) { functionUrl += "?"; }

    if (addedUrlParameter === true) {
        settings.dataverseParameters.forEach(function (parameter, parameterIndex) {
            if (parameter.include === true) {
                if (parameterIndex === 0) { if (parameter.name === "entity" || parameter.name === "entityset") { return; } }
                var value = null;

                var typeFound = false;

                if (typeFound === false && parameter.type.indexOf("Collection(") === 0) {
                    // Collection can be of anything: Edm.*, mscrm.crmbaseentity, mscrm.*Table, mscrm.*ComplexType
                    // not supported: Collection(Edm.Binary), Collection(Edm.DateTimeOffset), Collection(mscrm.*ComplexType)
                    var printedArray = '';


                    var checkOtherParameterTypes = true;
                    if (parameter.type.indexOf("Collection(mscrm.") === 0 && parameter.type !== "Collection(mscrm.crmbaseentity)" && Array.isArray(parameter.value)) {
                        // because the value is an array we assume is a valid Collection(mscrm.*Table);
                        checkOtherParameterTypes = false;
                        typeFound = true;
                        parameter.value.forEach(function (v) {
                            var clearedValue = '{ "@odata.type": "Microsoft.Dynamics.CRM.' + v.entityType + '", ' + v.primaryIdField + ' : "' + v.id + '" }';
                            printedArray += encodeURIComponent(clearedValue) + ', ';
                        });
                    }

                    if (checkOtherParameterTypes === true) {

                        switch (parameter.type) {
                            case "Collection(Edm.Guid)":
                            case "Collection(Edm.String)":
                                typeFound = true;
                                parameter.value.forEach(function (v) {
                                    var encodedV = v.replace(/'/g, "''");
                                    printedArray += encodeURIComponent('"' + encodedV + '"') + ', ';
                                });
                                break;

                            case "Collection(Edm.Boolean)":
                            case "Collection(Edm.Int32)":
                            case "Collection(Edm.Int64)":
                            case "Collection(Edm.Decimal)":
                            case "Collection(Edm.Double)":
                                typeFound = true;
                                parameter.value.forEach(function (v) { printedArray += v + ', '; });
                                break;

                            case "Collection(mscrm.crmbaseentity)":
                                typeFound = true;
                                parameter.value.forEach(function (v) {
                                    var clearedValue = '{ "@odata.type": "Microsoft.Dynamics.CRM.' + v.entityType + '", ' + v.primaryIdField + ' : "' + v.id + '" }';
                                    printedArray += encodeURIComponent(clearedValue) + ', ';
                                });
                                break;
                        }
                    }

                    if (typeFound === true) {
                        if (parameter.value.length > 0) { printedArray = printedArray.slice(0, -2); }
                        printedArray = '[' + printedArray + ']';
                        value = printedArray;
                    }
                    // Not supported
                }

                if (typeFound === false && parameter.type === "mscrm.crmbaseentity") {
                    typeFound = true;
                    if (DRB.Utilities.HasValue(parameter.value.id) && DRB.Utilities.HasValue(parameter.value.entityType)) {
                        var clearedValue = '{ "@odata.type": "Microsoft.Dynamics.CRM.' + parameter.value.entityType + '", ' + parameter.value.primaryIdField + ' : "' + parameter.value.id + '" }';
                        value = encodeURIComponent(clearedValue);
                    }
                }

                if (typeFound === false && parameter.type.indexOf("mscrm.") === 0) {
                    typeFound = true;
                    if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.id) && DRB.Utilities.HasValue(parameter.value.entityType)) {
                        var clearedValue = '{ "@odata.type": "Microsoft.Dynamics.CRM.' + parameter.value.entityType + '", ' + parameter.value.primaryIdField + ' : "' + parameter.value.id + '" }';
                        value = encodeURIComponent(clearedValue);
                    }
                    if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.memberName) && DRB.Utilities.HasValue(parameter.value.memberValue)) {
                        var replacedType = parameter.type.replace("mscrm.", "Microsoft.Dynamics.CRM.");
                        value = replacedType + "'" + parameter.value.memberName + "'";
                    }
                    if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.members) && Array.isArray(parameter.value.members)) {
                        var replacedType = parameter.type.replace("mscrm.", "Microsoft.Dynamics.CRM.");
                        var calculatedMemberName = [];
                        parameter.value.members.forEach(function (member) {
                            calculatedMemberName.push(member.name);
                        });
                        value = replacedType + "'" + calculatedMemberName.join(",") + "'";
                    }
                }

                if (typeFound === false && parameter.type.indexOf("Edm.") === 0) {
                    switch (parameter.type) {
                        case "Edm.Binary":
                            // Not supported
                            break;
                        case "Edm.Guid":
                            if (DRB.Utilities.HasValue(parameter.value)) { value = parameter.value; }
                            break;
                        case "Edm.String":
                            if (DRB.Utilities.HasValue(parameter.value)) {
                                var encodedValue = encodeURIComponent(parameter.value);
                                encodedValue = encodedValue.replace(/'/g, "''");
                                value = "'" + encodedValue + "'";
                            }
                            break;
                        case "Edm.Int32":
                        case "Edm.Int64":
                        case "Edm.Decimal":
                        case "Edm.Double":
                        case "Edm.Boolean":
                            if (DRB.Utilities.HasValue(parameter.value)) { value = parameter.value; }
                            value = parameter.value;
                            break;
                        case "Edm.DateTimeOffset":
                            if (DRB.Utilities.HasValue(parameter.value)) { value = new Date(parameter.value).toISOString(); }
                            break;
                    }
                }
                functionUrl += "@" + parameter.name + "=" + value + "&"; // assign the value, default is null if the parameter type is not supported
            }
        });
        functionUrl = functionUrl.slice(0, -1); // remove the last "&"
    }
    // #endregion
    return functionUrl;
}

/**
 * Generate Code - Parse Filter Criteria
 * @param {any} configurationObject Configuration Object
 */
DRB.GenerateCode.ParseFilterCriteria = function (query, configurationObject) {
    // filterType must be "fields" or "groups", otherwise return
    if (!configurationObject.hasOwnProperty("filterType")) { return ""; }
    if (configurationObject.filterType !== "fields" && configurationObject.filterType !== "groups") { return ""; }

    // fields are always leaves
    if (configurationObject.filterType === "fields") {
        var filterFieldsLogic = "and";
        if (configurationObject.hasOwnProperty("filterFieldsLogic")) { filterFieldsLogic = configurationObject.filterFieldsLogic; }

        var partialQuery = "";
        if (configurationObject.filterFields.length > 0) {
            if (configurationObject.filterFields.length > 1) { partialQuery += "("; }

            configurationObject.filterFields.forEach(function (filterField, filterFieldIndex) {
                if (JSON.stringify(filterField) !== JSON.stringify({})) {
                    if (filterFieldIndex !== 0) { partialQuery += " " + filterFieldsLogic + " "; }
                    var completefieldLogicalName = filterField.logicalName;
                    var completefieldODataName = filterField.oDataName;

                    if (DRB.Utilities.HasValue(filterField.relationship)) {
                        completefieldLogicalName = filterField.relationship.navigationProperty + "/" + completefieldLogicalName;
                        completefieldODataName = filterField.relationship.navigationProperty + "/" + completefieldODataName;
                    }

                    if (filterField.requiredValue === false) {
                        var operatorFound = false;
                        // check for specific operators with the following syntax
                        switch (filterField.operator) {
                            case "EqualUserId": // Microsoft.Dynamics.CRM.EqualUserId(PropertyName='ownerid')
                            case "NotEqualUserId": // Microsoft.Dynamics.CRM.NotEqualUserId(PropertyName='ownerid')
                            case "EqualUserOrUserHierarchy": // Microsoft.Dynamics.CRM.EqualUserOrUserHierarchy(PropertyName='ownerid')
                            case "EqualUserOrUserHierarchyAndTeams": // Microsoft.Dynamics.CRM.EqualUserOrUserHierarchyAndTeams(PropertyName='ownerid')
                            case "EqualUserTeams": // Microsoft.Dynamics.CRM.EqualUserTeams(PropertyName='ownerid')
                            case "EqualUserOrUserTeams": // Microsoft.Dynamics.CRM.EqualUserOrUserTeams(PropertyName='ownerid')
                            case "EqualBusinessId": // Microsoft.Dynamics.CRM.EqualBusinessId(PropertyName='owningbusinessunit')
                            case "NotEqualBusinessId": // Microsoft.Dynamics.CRM.NotEqualBusinessId(PropertyName='owningbusinessunit')
                            case "Yesterday": // Microsoft.Dynamics.CRM.Yesterday(PropertyName='createdon')
                            case "Today": // Microsoft.Dynamics.CRM.Today(PropertyName='createdon')
                            case "Tomorrow": // Microsoft.Dynamics.CRM.Tomorrow(PropertyName='createdon')
                            case "Next7Days": // Microsoft.Dynamics.CRM.Next7Days(PropertyName='createdon')
                            case "Last7Days": // Microsoft.Dynamics.CRM.Last7Days(PropertyName='createdon')
                            case "NextWeek": // Microsoft.Dynamics.CRM.NextWeek(PropertyName='createdon')
                            case "LastWeek": // Microsoft.Dynamics.CRM.LastWeek(PropertyName='createdon')
                            case "ThisWeek": // Microsoft.Dynamics.CRM.ThisWeek(PropertyName='createdon')
                            case "NextMonth": // Microsoft.Dynamics.CRM.NextMonth(PropertyName='createdon')
                            case "LastMonth": // Microsoft.Dynamics.CRM.LastMonth(PropertyName='createdon')
                            case "ThisMonth": // Microsoft.Dynamics.CRM.ThisMonth(PropertyName='createdon')
                            case "NextYear": // Microsoft.Dynamics.CRM.NextYear(PropertyName='createdon')
                            case "LastYear": // Microsoft.Dynamics.CRM.LastYear(PropertyName='createdon')
                            case "ThisYear": // Microsoft.Dynamics.CRM.ThisYear(PropertyName='createdon')
                            case "NextFiscalYear": // Microsoft.Dynamics.CRM.NextFiscalYear(PropertyName='createdon')
                            case "LastFiscalYear": // Microsoft.Dynamics.CRM.LastFiscalYear(PropertyName='createdon')
                            case "ThisFiscalYear": // Microsoft.Dynamics.CRM.ThisFiscalYear(PropertyName='createdon')
                            case "NextFiscalPeriod": // Microsoft.Dynamics.CRM.NextFiscalPeriod(PropertyName='createdon')
                            case "LastFiscalPeriod": // Microsoft.Dynamics.CRM.LastFiscalPeriod(PropertyName='createdon')
                            case "ThisFiscalPeriod": // Microsoft.Dynamics.CRM.ThisFiscalPeriod(PropertyName='createdon')
                            case "EqualUserLanguage": // Microsoft.Dynamics.CRM.EqualUserLanguage(PropertyName='new_wholenumber')
                                operatorFound = true;
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + completefieldLogicalName + "')";
                                break;
                        }
                        if (operatorFound === false) {
                            // default syntax
                            partialQuery += completefieldODataName + " " + filterField.operator;
                        }
                    }

                    if (filterField.requiredValue === true) {
                        var operatorFound = false;
                        // check for specific operators with this syntax: operator(fieldname,value)
                        switch (filterField.operator) {
                            case "contains":
                            case "not contains":
                            case "startswith":
                            case "not startswith":
                            case "endswith":
                            case "not endswith":
                                operatorFound = true;
                                var clearedValue = "";
                                if (DRB.Utilities.HasValue(filterField.value)) {
                                    clearedValue = filterField.value.replace(/"/g, '\\"');
                                    clearedValue = clearedValue.replace(/'/g, "''");
                                }
                                partialQuery += filterField.operator + "(" + completefieldODataName + ",'" + clearedValue + "')";
                                break;
                            case "In": // Microsoft.Dynamics.CRM.ContainValues(PropertyName='sample_choices',PropertyValues=['1','2'])
                            case "NotIn": // Microsoft.Dynamics.CRM.ContainValues(PropertyName='sample_choices',PropertyValues=['1','2'])
                            case "ContainValues": // Microsoft.Dynamics.CRM.ContainValues(PropertyName='sample_choices',PropertyValues=['1','2'])
                            case "DoesNotContainValues": // Microsoft.Dynamics.CRM.DoesNotContainValues(PropertyName='sample_choices',PropertyValues=['1','2'])
                                operatorFound = true;
                                var clearedValue = "";
                                if (Array.isArray(filterField.value)) {
                                    filterField.value.forEach(function (v) {
                                        clearedValue += "'" + v + "',";
                                    });
                                    if (filterField.value.length > 0) { clearedValue = clearedValue.slice(0, -1); }
                                }
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + completefieldODataName + "',PropertyValues=[" + clearedValue + "])";
                                break;

                            case "NextXHours": // Microsoft.Dynamics.CRM.NextXHours(PropertyName='createdon',PropertyValue=1)
                            case "LastXHours": // Microsoft.Dynamics.CRM.LastXHours(PropertyName='createdon',PropertyValue=1)
                            case "NextXDays": // Microsoft.Dynamics.CRM.NextXDays(PropertyName='createdon',PropertyValue=1)
                            case "LastXDays": // Microsoft.Dynamics.CRM.LastXDays(PropertyName='createdon',PropertyValue=1)
                            case "NextXWeeks": // Microsoft.Dynamics.CRM.NextXWeeks(PropertyName='createdon',PropertyValue=1)
                            case "LastXWeeks": // Microsoft.Dynamics.CRM.LastXWeeks(PropertyName='createdon',PropertyValue=1)
                            case "NextXMonths": // Microsoft.Dynamics.CRM.NextXMonths(PropertyName='createdon',PropertyValue=1)
                            case "LastXMonths": // Microsoft.Dynamics.CRM.LastXMonths(PropertyName='createdon',PropertyValue=1)
                            case "NextXYears": // Microsoft.Dynamics.CRM.NextXYears(PropertyName='createdon',PropertyValue=1)
                            case "LastXYears": // Microsoft.Dynamics.CRM.LastXYears(PropertyName='createdon',PropertyValue=1)
                            case "NextXFiscalYears": // Microsoft.Dynamics.CRM.NextXFiscalYears(PropertyName='createdon',PropertyValue=1)
                            case "LastXFiscalYears": // Microsoft.Dynamics.CRM.LastXFiscalYears(PropertyName='createdon',PropertyValue=1)
                            case "InFiscalYear": // Microsoft.Dynamics.CRM.InFiscalYear(PropertyName='createdon',PropertyValue=2021)
                            case "NextXFiscalPeriods": // Microsoft.Dynamics.CRM.NextXFiscalPeriods(PropertyName='createdon',PropertyValue=1)
                            case "LastXFiscalPeriods": // Microsoft.Dynamics.CRM.LastXFiscalPeriods(PropertyName='createdon',PropertyValue=1)
                            case "InFiscalPeriod": // Microsoft.Dynamics.CRM.InFiscalPeriod(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXMinutes": // Microsoft.Dynamics.CRM.OlderThanXMinutes(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXHours": // Microsoft.Dynamics.CRM.OlderThanXHours(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXDays": // Microsoft.Dynamics.CRM.OlderThanXDays(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXWeeks": // Microsoft.Dynamics.CRM.OlderThanXWeeks(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXMonths": // Microsoft.Dynamics.CRM.OlderThanXMonths(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXYears": // Microsoft.Dynamics.CRM.OlderThanXYears(PropertyName='createdon',PropertyValue=1)
                                operatorFound = true;
                                var clearedValue = filterField.value;
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + completefieldODataName + "',PropertyValue=" + clearedValue + ")";
                                break;

                            case "Above": // Microsoft.Dynamics.CRM.Above(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                            case "AboveOrEqual": // Microsoft.Dynamics.CRM.AboveOrEqual(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                            case "NotUnder": // Microsoft.Dynamics.CRM.NotUnder(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                            case "Under": // Microsoft.Dynamics.CRM.Under(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                            case "UnderOrEqual": // Microsoft.Dynamics.CRM.UnderOrEqual(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                                operatorFound = true;
                                var clearedValue = filterField.value;
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + completefieldODataName + "',PropertyValue='" + clearedValue + "')";
                                break;

                            case "On": // Microsoft.Dynamics.CRM.On(PropertyName='createdon',PropertyValue='2022-01-01')
                            case "OnOrAfter": // Microsoft.Dynamics.CRM.OnOrAfter(PropertyName='createdon',PropertyValue='2022-01-01')
                            case "OnOrBefore": // Microsoft.Dynamics.CRM.OnOrBefore(PropertyName='createdon',PropertyValue='2022-01-01')
                                operatorFound = true;
                                var clearedValue = filterField.value;
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + completefieldODataName + "',PropertyValue='" + clearedValue + "')";
                                break;

                            case "InFiscalPeriodAndYear":
                            case "InOrAfterFiscalPeriodAndYear":
                            case "InOrBeforeFiscalPeriodAndYear":
                                operatorFound = true;
                                var clearedValue = filterField.value;
                                var clearedValue2 = filterField.value2;
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + completefieldODataName + "',PropertyValue1=" + clearedValue + ",PropertyValue2=" + clearedValue2 + ")";
                                break;

                            case "Between":
                            case "NotBetween":
                                operatorFound = true;
                                var clearedValue = filterField.value;
                                var clearedValue2 = filterField.value2;
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + completefieldODataName + "',PropertyValues=['" + clearedValue + "','" + clearedValue2 + "'])";
                                break;
                        }
                        if (operatorFound === false) {
                            // default syntax: fieldname operator value
                            var clearedValue = "";
                            var fieldName = completefieldODataName;

                            if (DRB.Utilities.HasValue(filterField.value)) { clearedValue = filterField.value; }
                            if (filterField.type === "EntityName" || filterField.type === "String" || filterField.type === "Memo") {
                                clearedValue = clearedValue.replace(/"/g, '\\"');
                                clearedValue = clearedValue.replace(/'/g, "''");
                                clearedValue = "'" + clearedValue + "'";
                            }

                            if (filterField.type === "DateTime") {
                                if (filterField.dateTimeBehavior === "DateOnly") {
                                    clearedValue = clearedValue; // for DateOnly don't add the '' at the string
                                }
                                else {
                                    clearedValue = new Date(clearedValue).toISOString();
                                }
                            }

                            if (filterField.type === "Owner" || filterField.type === "Lookup" || filterField.type === "Customer") {
                                if (DRB.Utilities.HasValue(filterField.value.id)) {
                                    clearedValue = filterField.value.id;
                                }
                            }

                            if (filterField.type === "ManagedProperty") {
                                fieldName = completefieldODataName + "/Value";
                            }

                            partialQuery += fieldName + " " + filterField.operator + " " + clearedValue;

                        }
                    }
                }
            });
            if (configurationObject.filterFields.length > 1) { partialQuery += ")"; }
        }
        query += partialQuery;
        return query;
    }

    if (configurationObject.filterType === "groups") {
        var filterGroupsLogic = "and";
        if (configurationObject.hasOwnProperty("filterGroupsLogic")) { filterGroupsLogic = configurationObject.filterGroupsLogic; }

        var skipGrouping = false;
        if (configurationObject.filterGroups.length === 1) { skipGrouping = true; }
        if (skipGrouping === false) { query += "("; }
        configurationObject.filterGroups.forEach(function (filterItem, filterItemIndex) {
            if (JSON.stringify(filterItem) !== JSON.stringify({})) {
                if (filterItemIndex > 0) {
                    query += " " + filterGroupsLogic + " ";
                }
                query = DRB.GenerateCode.ParseFilterCriteria(query, filterItem);
            }
        });
        if (skipGrouping === false) { query += ")"; }

    }
    return query;
}

/**
 * Generate Code - Get Filter Fields
 * Used in Retrieve Multiple
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFilterFields = function (settings) {
    // parse filterCriteria
    var filterFields = DRB.GenerateCode.ParseFilterCriteria("", settings.filterCriteria);
    if (filterFields !== "") {
        // add $filter= clause
        filterFields = '$filter=' + filterFields;
    }
    return filterFields;
}

/**
 * Generate Code - Get Order Fields
 * Used in Retrieve Multiple
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetOrderFields = function (settings) {
    var orderFields = '';
    settings.orderFields.forEach(function (field) {
        if (JSON.stringify(field) !== JSON.stringify({})) {
            if (field.type === "ManagedProperty") {
                orderFields += field.oDataName + '/Value ' + field.value + ',';
            } else {
                orderFields += field.oDataName + ' ' + field.value + ',';
            }
        }
    });

    if (orderFields !== '') {
        orderFields = '$orderby=' + orderFields;
        if (orderFields.slice(-1) === ',') { orderFields = orderFields.slice(0, -1); }
    }
    return orderFields;
}

/**
 * Generate Code - Get Alternate Keys
 * Used in Retrieve Single, Retrieve Multiple, Update, Delete
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetAlternateKeys = function (settings) {
    var criteria = '';
    settings.alternateKeyFields.forEach(function (field) {
        var keyValue = field.value;
        if (keyValue === "" || keyValue === null) {
            criteria += field.logicalName + "=null,";
        } else {
            switch (field.type) {
                case "Uniqueidentifier":
                case "Picklist":
                case "Integer":
                case "Decimal":
                    criteria += field.logicalName + "=" + keyValue + ",";
                    break;
                case "String":
                    keyValue = keyValue.replace(/"/g, '\\"');
                    criteria += field.logicalName + "='" + keyValue + "',";
                    break;
                case "DateTime":
                    if (field.dateTimeBehavior === "DateOnly") { criteria += field.logicalName + "=" + keyValue + ","; }
                    else {
                        try {
                            var isoString = new Date(keyValue).toISOString();
                            criteria += field.logicalName + "=" + isoString + ",";
                        } catch { criteria += field.logicalName + "=" + keyValue + ","; }
                    }
                    break;
                case "Lookup":
                    if (DRB.Utilities.HasValue(field.value.id)) { criteria += field.oDataName + "=" + field.value.id + ","; }
                    else { criteria += field.oDataName + "=null," }
                    break;
            }
        }
    });
    if (criteria.slice(-1) === ',') { criteria = criteria.slice(0, -1); }
    return criteria;
}

/**
 * Generate Code - Get SDK Alternate Keys
 * Used in Retrieve Single, Retrieve Multiple, Update, Delete
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetSDKAlternateKeys = function (settings) {
    var criteria = [];
	criteria.push('KeyAttributeCollection alternateKey = new KeyAttributeCollection();');
	
    settings.alternateKeyFields.forEach(function (field) {
		var keyRow = 'alternateKey.Add("' + field.logicalName + '", ';
        var keyValue = field.value;
		
        if (keyValue === "" || keyValue === null) {
			criteria.push(keyRow + 'null);');
        } else {
            switch (field.type) {
                case "Uniqueidentifier":
					criteria.push(keyRow + 'new Guid("' + keyValue + '"));');
					break;
                case "Picklist":
					criteria.push(keyRow + 'new OptionSetValue(' + keyValue + '));');
					break;
                case "Integer":
				criteria.push(keyRow + keyValue + ');');
                    break;
                case "Decimal":
					criteria.push(keyRow + keyValue + 'm);');
                    break;
                case "String":
                    keyValue = keyValue.replace(/"/g, '\\"');
                    criteria.push(keyRow + '"' + keyValue + '");');
                    break;
                case "DateTime":
                    if (field.dateTimeBehavior === "DateOnly") {
						criteria.push(keyRow + 'new DateTime("' + keyValue + '"));');
					}
                    else {
                        try {
                            var isoString = new Date(keyValue).toISOString();
							criteria.push(keyRow + 'DateTime.Parse("' + isoString + '"));');
                        } catch { criteria.push(keyRow + '"' + keyValue + '");'); }
                    }
                    break;
                case "Lookup":
                    if (DRB.Utilities.HasValue(field.value.id)) { 
						criteria.push(keyRow + 'new EntityReference("' + field.value.entityType + '", new Guid("' + field.value.id + '")));');
					}
                    else {
						criteria.push(keyRow + 'null);');
					}
                    break;
            }
        }
    });
	criteria.push('');
    return criteria;
}

/**
 * Generate Code - Get Request Header Values
 * @param {any} settings Configuration
 * @param {bool} isBinary Is Binary
 */
DRB.GenerateCode.GetRequestHeaderValues = function (settings, isBinary) {
    // Default Headers
    var headers = {};
    headers["OData-MaxVersion"] = "4.0";
    headers["OData-Version"] = "4.0";
    if (isBinary === true) { headers["Content-Type"] = "application/octet-stream"; }
    else { headers["Content-Type"] = "application/json; charset=utf-8"; }
    headers["Accept"] = "application/json";

    // Formatted Values and Return Record
    if (settings.hasOwnProperty("formattedValues")) {
        if (!settings.hasOwnProperty("returnRecord") && !settings.hasOwnProperty("topCount")) {
            if (settings.formattedValues === true) { headers["Prefer"] = "odata.include-annotations=*"; }
        }
        else {
            if (settings.hasOwnProperty("returnRecord")) {
                if (settings.formattedValues === true && settings.returnRecord !== true) { headers["Prefer"] = "odata.include-annotations=*"; }
                if (settings.formattedValues !== true && settings.returnRecord === true) { headers["Prefer"] = "return=representation"; }
                if (settings.formattedValues === true && settings.returnRecord === true) { headers["Prefer"] = "odata.include-annotations=*,return=representation"; }
            }
            if (settings.hasOwnProperty("topCount")) {
                var hasTopCount = DRB.Utilities.HasValue(settings.topCount);
                if (settings.formattedValues === true && hasTopCount !== true) { headers["Prefer"] = "odata.include-annotations=*"; }
                if (settings.formattedValues !== true && hasTopCount === true) { headers["Prefer"] = "odata.maxpagesize=" + settings.topCount; }
                if (settings.formattedValues === true && hasTopCount === true) { headers["Prefer"] = "odata.include-annotations=*,odata.maxpagesize=" + settings.topCount; }
            }
        }
    }

    // Token Header
    if (settings.hasOwnProperty("tokenHeader") && settings.tokenHeader === true) {
        headers["Authorization"] = "Bearer ";
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
        headers[impersonateHeader] = impersonateId;
    }

    // Detect Changes
    if (settings.hasOwnProperty("detectChanges") && settings.detectChanges === true) { headers["If-None-Match"] = "W/\\\"000000\\\""; }

    // Detect Duplicates
    if (settings.hasOwnProperty("detectDuplicates") && settings.detectDuplicates === true) { headers["MSCRM.SuppressDuplicateDetection"] = "false"; }

    // Prevent
    if (settings.hasOwnProperty("prevent")) {
        if (settings.prevent === "create") { headers["If-Match"] = "*"; }
        if (settings.prevent === "update") { headers["If-None-Match"] = "*"; }
    }
    return headers;
}

/**
 * Generate Code - Get jQuery Request Headers
 * @param {any} settings Configuration
 * @param {bool} isBinary Is Binary
 */
DRB.GenerateCode.GetJQueryRequestHeaders = function (settings, isBinary) {
    // Request Headers
    var headers = [];
    var headerValues = DRB.GenerateCode.GetRequestHeaderValues(settings, isBinary);
    Object.keys(headerValues).forEach(function (key) {
        headers.push('"' + key + '": "' + headerValues[key] + '",');
        if (key === "Authorization") { headers[headers.length - 1] = headers[headers.length - 1] + " // Set token value"; }
        if (key === "If-None-Match" && headerValues[key] === "W/\\\"000000\\\"") { headers[headers.length - 1] = headers[headers.length - 1] + " // Change 000000 to your value"; }
    });
    if (headers[headers.length - 1].slice(-1) === ',') {
        headers[headers.length - 1] = headers[headers.length - 1].slice(0, -1); // remove the last ","
    } else {
        var lastCommaPos = headers[headers.length - 1].lastIndexOf("/") - 3;
        if (lastCommaPos >= 0 && headers[headers.length - 1].charAt(lastCommaPos) === ",") {
            headers[headers.length - 1] = headers[headers.length - 1].substring(0, lastCommaPos) + headers[headers.length - 1].substring(lastCommaPos + 1);
        }
    }
    return headers;
}

/**
 * Generate Code - Get XHR Request Headers
 * @param {any} settings Configuration
 * @param {bool} isBinary Is Binary
 */
DRB.GenerateCode.GetXHRRequestHeaders = function (settings, isBinary) {
    var headers = [];
    var headerValues = DRB.GenerateCode.GetRequestHeaderValues(settings, isBinary);
    Object.keys(headerValues).forEach(function (key) {
        headers.push('req.setRequestHeader("' + key + '", "' + headerValues[key] + '");');
        if (key === "Authorization") { headers[headers.length - 1] = headers[headers.length - 1] + " // Set token value"; }
        if (key === "If-None-Match" && headerValues[key] === "W/\\\"000000\\\"") { headers[headers.length - 1] = headers[headers.length - 1] + " // Change 000000 to your value"; }
    });
    return headers;
}

/**
 * Generate Code - Get Portals Request Headers
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetPortalsRequestHeaders = function (settings) {
    // Default Headers
    var headerValues = {};

    // Formatted Values and Return Record
    if (settings.hasOwnProperty("formattedValues")) {
        if (!settings.hasOwnProperty("topCount")) {
            if (settings.formattedValues === true) { headerValues["Prefer"] = "odata.include-annotations=*"; }
        }
        else {
            if (settings.hasOwnProperty("topCount")) {
                var hasTopCount = DRB.Utilities.HasValue(settings.topCount);
                if (settings.formattedValues === true && hasTopCount !== true) { headerValues["Prefer"] = "odata.include-annotations=*"; }
                if (settings.formattedValues !== true && hasTopCount === true) { headerValues["Prefer"] = "odata.maxpagesize=" + settings.topCount; }
                if (settings.formattedValues === true && hasTopCount === true) { headerValues["Prefer"] = "odata.include-annotations=*,odata.maxpagesize=" + settings.topCount; }
            }
        }
    }

    // Request Headers
    var headers = [];
    Object.keys(headerValues).forEach(function (key) {
        headers.push('"' + key + '": "' + headerValues[key] + '",');
        if (key === "Authorization") { headers[headers.length - 1] = headers[headers.length - 1] + " // Set token value"; }
        if (key === "If-None-Match" && headerValues[key] === "W/\\\"000000\\\"") { headers[headers.length - 1] = headers[headers.length - 1] + " // Change 000000 to your value"; }
    });
	if (headers.length > 0) {
		if (headers[headers.length - 1].slice(-1) === ',') {
			headers[headers.length - 1] = headers[headers.length - 1].slice(0, -1); // remove the last ","
		} else {
			var lastCommaPos = headers[headers.length - 1].lastIndexOf("/") - 3;
			if (lastCommaPos >= 0 && headers[headers.length - 1].charAt(lastCommaPos) === ",") {
				headers[headers.length - 1] = headers[headers.length - 1].substring(0, lastCommaPos) + headers[headers.length - 1].substring(lastCommaPos + 1);
			}
		}
	}
    return headers;
}

/**
 * Generate Code - Get SDK Impersonation
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetSDKImpersonation = function (settings) {
    var impersonation = [];
	
	// Impersonate
    if (settings.hasOwnProperty("impersonate") && settings.impersonate === true) {
        var impersonateId = "";
        var propertyName = "CallerId";
        if (DRB.Utilities.HasValue(settings.impersonateType)) {
            switch (settings.impersonateType) {
                case "mscrmcallerid": propertyName = "CallerId"; break;
                case "callerobjectid": propertyName = "CallerAADObjectId"; break;
            }
        }
        if (DRB.Utilities.HasValue(settings.impersonateId)) { impersonateId = settings.impersonateId; }
		impersonation.push('service.' + propertyName + ' = new Guid("' + impersonateId + '");');
    }
    return impersonation;
}

/**
 * Generate Code - Convert Field Type
 * @param {string} fieldType Field Type
 */
DRB.GenerateCode.ConvertFieldType = function (fieldType) {
    var renamedFieldType = fieldType;
    switch (fieldType) {
        case "Uniqueidentifier": renamedFieldType = "Guid"; break;
        case "Picklist": renamedFieldType = "Choice"; break;
        case "MultiPicklist": renamedFieldType = "Choices"; break;
        case "DateTime": renamedFieldType = "Date Time"; break;
        case "Double": renamedFieldType = "Float"; break;
        case "Integer": renamedFieldType = "Whole Number"; break;
        case "Memo": renamedFieldType = "Multiline Text"; break;
        case "String": renamedFieldType = "Text"; break;
        case "Money": renamedFieldType = "Currency"; break;
        case "BigInt": renamedFieldType = "Big Integer"; break;
    }
    return renamedFieldType;
}

/**
 * Generate Code - Get Code Fields
 * Used in Retrieve Single, Create, Update
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetCodeFields = function (settings) {
    // Code Fields
    var codeFields = [];
    var codeFieldsFormatted = [];
    var codeFieldsFormattedOnlyRecord = [];

    var formattedTypes = ["Picklist", "MultiPicklist", "State", "Status", "DateTime", "Owner", "Lookup", "Customer", "Boolean", "Decimal", "BigInt", "Integer", "EntityName", "Double"];
    var logicalNameTypes = ["Lookup", "Owner", "Customer"];

    var fieldLogicalNames = settings.fields.map(function (field) { return field.oDataName; });
    codeFields.push('// Columns');
    codeFieldsFormatted.push('// Columns');
    codeFieldsFormattedOnlyRecord.push('// Columns');
    var mainFields = JSON.parse(JSON.stringify(settings.fields));
    if (fieldLogicalNames.indexOf(settings.primaryIdField) === -1) { mainFields.unshift({ logicalName: settings.primaryIdField, oDataName: settings.primaryIdField, type: "Uniqueidentifier" }); }

    mainFields.forEach(function (field) {

        var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);

        codeFields.push('var ' + field.logicalName + ' = result["' + field.oDataName + '"]; // ' + renamedFieldType);
        codeFieldsFormatted.push('var ' + field.logicalName + ' = result["' + field.oDataName + '"]; // ' + renamedFieldType);
        codeFieldsFormattedOnlyRecord.push('var ' + field.logicalName + ' = result["' + field.oDataName + '"]; // ' + renamedFieldType);
        if (formattedTypes.indexOf(field.type) > -1) {
            codeFieldsFormatted.push('var ' + field.logicalName + '_formatted = result["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
            codeFieldsFormattedOnlyRecord.push('var ' + field.logicalName + '_formatted = result["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
        }
        if (logicalNameTypes.indexOf(field.type) > -1) {
            codeFieldsFormatted.push('var ' + field.logicalName + '_lookuplogicalname = result["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
            codeFieldsFormattedOnlyRecord.push('var ' + field.logicalName + '_lookuplogicalname = result["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
        }
    });

    if (settings.oneToMany.length > 0) {
        codeFields.push('');
        codeFields.push('// One To Many Relationships');
        codeFieldsFormatted.push('');
        codeFieldsFormatted.push('// One To Many Relationships');
    }
    settings.oneToMany.forEach(function (oneToMany) {
        codeFields.push('for (var j = 0; j < result.' + oneToMany.schemaName + '.length; j++) {');
        codeFieldsFormatted.push('for (var j = 0; j < result.' + oneToMany.schemaName + '.length; j++) {');
        oneToMany.fields.forEach(function (field) {

            var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);

            codeFields.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + ' = result.' + oneToMany.schemaName + '[j]["' + field.oDataName + '"]; // ' + renamedFieldType);
            codeFieldsFormatted.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + ' = result.' + oneToMany.schemaName + '[j]["' + field.oDataName + '"]; // ' + renamedFieldType);
            if (formattedTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + '_formatted = result.' + oneToMany.schemaName + '[j]["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
            }
            if (logicalNameTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + '_lookuplogicalname = result.' + oneToMany.schemaName + '[j]["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
            }
        });
        codeFields.push('}');
        codeFieldsFormatted.push('}');
    });

    if (settings.manyToOne.length > 0) {
        codeFields.push('');
        codeFields.push('// Many To One Relationships');
        codeFieldsFormatted.push('');
        codeFieldsFormatted.push('// Many To One Relationships');
    }
    settings.manyToOne.forEach(function (manyToOne) {
        codeFields.push('if (result.hasOwnProperty("' + manyToOne.navigationProperty + '") && result["' + manyToOne.navigationProperty + '"] !== null) {');
        codeFieldsFormatted.push('if (result.hasOwnProperty("' + manyToOne.navigationProperty + '") && result["' + manyToOne.navigationProperty + '"] !== null) {');
        manyToOne.fields.forEach(function (field) {

            var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);

            codeFields.push('\tvar ' + manyToOne.navigationProperty + '_' + field.logicalName + ' = result["' + manyToOne.navigationProperty + '"]["' + field.oDataName + '"]; // ' + renamedFieldType);
            codeFieldsFormatted.push('\tvar ' + manyToOne.navigationProperty + '_' + field.logicalName + ' = result["' + manyToOne.navigationProperty + '"]["' + field.oDataName + '"]; // ' + renamedFieldType);
            if (formattedTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + manyToOne.navigationProperty + '_' + field.logicalName + '_formatted = result["' + manyToOne.navigationProperty + '"]["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
            }
            if (logicalNameTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + manyToOne.navigationProperty + '_' + field.logicalName + '_lookuplogicalname = result["' + manyToOne.navigationProperty + '"]["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
            }
        });
        codeFields.push('}');
        codeFieldsFormatted.push('}');
    });

    if (settings.manyToMany.length > 0) {
        codeFields.push('');
        codeFields.push('// Many To Many Relationships');
        codeFieldsFormatted.push('');
        codeFieldsFormatted.push('// Many To Many Relationships');
    }
    settings.manyToMany.forEach(function (manyToMany) {
        codeFields.push('for (var j = 0; j < result.' + manyToMany.schemaName + '.length; j++) {');
        codeFieldsFormatted.push('for (var j = 0; j < result.' + manyToMany.schemaName + '.length; j++) {');
        manyToMany.fields.forEach(function (field) {

            var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);

            codeFields.push('\tvar ' + manyToMany.schemaName + '_' + field.logicalName + ' = result.' + manyToMany.schemaName + '[j]["' + field.oDataName + '"]; // ' + renamedFieldType);
            codeFieldsFormatted.push('\tvar ' + manyToMany.schemaName + '_' + field.logicalName + ' = result.' + manyToMany.schemaName + '[j]["' + field.oDataName + '"]; // ' + renamedFieldType);
            if (formattedTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + manyToMany.schemaName + '_' + field.logicalName + '_formatted = result.' + manyToMany.schemaName + '[j]["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
            }
            if (logicalNameTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + manyToMany.schemaName + '_' + field.logicalName + '_lookuplogicalname = result.' + manyToMany.schemaName + '[j]["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
            }
        });
        codeFields.push('}');
        codeFieldsFormatted.push('}');
    });
    return [codeFields, codeFieldsFormatted, codeFieldsFormattedOnlyRecord];
}

/**
 * Generate Code - Get SDK Code Fields
 * Used in Retrieve Single, Create, Update
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetSDKCodeFields = function (settings, requestType) {
    // Code Fields
    var codeFields = [];
	var codeFieldsFormatted = [];
	var codeFieldsFormattedOnlyRecord = [];
	
    var formattedTypes = ["Picklist", "MultiPicklist", "State", "Status", "DateTime", "Owner", "Lookup", "Customer", "Boolean", "Decimal", "BigInt", "Integer", "EntityName", "Double"];
    var logicalNameTypes = ["Lookup", "Owner", "Customer"];

    var fieldLogicalNames = settings.fields.map(function (field) { return field.logicalName; });
    codeFields.push('// Columns');
    var mainFields = JSON.parse(JSON.stringify(settings.fields));
    if (fieldLogicalNames.indexOf(settings.primaryIdField) === -1) { mainFields.unshift({ logicalName: settings.primaryIdField, oDataName: settings.primaryIdField, type: "Uniqueidentifier" }); }

    mainFields.forEach(function (field) {
        var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);
		var sdkType = "";
		
		switch(field.type) {
			case "Uniqueidentifier": sdkType = "Guid"; break;
			case "Picklist": sdkType = "OptionSetValue"; break;
			case "MultiPicklist": sdkType = "OptionSetValueCollection"; break;
			case "Customer": sdkType = "EntityReference"; break;
			case "DateTime": sdkType = "DateTime"; break;
			case "Decimal": sdkType = "decimal"; break;
			case "File": sdkType = "Guid"; break;
			case "String": sdkType = "string"; break;
			case "Double": sdkType = "double"; break;
			case "Image": sdkType = "byte[]"; break;
			case "Lookup": sdkType = "EntityReference"; break;
			case "Money": sdkType = "Money"; break;
			case "Memo": sdkType = "string"; break;
			case "Owner": sdkType = "EntityReference"; break;
			case "State": sdkType = "OptionSetValue"; break;
			case "Status": sdkType = "OptionSetValue"; break;
			case "Boolean": sdkType = "bool"; break;
			case "BigInt": sdkType = "Int64"; break;
			case "Integer": sdkType = "int"; break;
		}
		
        codeFields.push(sdkType + ' ' + field.logicalName + ' = result.GetAttributeValue<' + sdkType + '>("' + field.logicalName + '"); // ' + renamedFieldType);
    });
	
	if (requestType !== "retrievesingle") {
		if (settings.oneToMany.length > 0) {
			codeFields.push('');
			codeFields.push('// One To Many Relationships');
			codeFieldsFormatted.push('');
			codeFieldsFormatted.push('// One To Many Relationships');
		}
		settings.oneToMany.forEach(function (oneToMany) {
			codeFields.push('for (var j = 0; j < result.' + oneToMany.schemaName + '.length; j++) {');
			codeFieldsFormatted.push('for (var j = 0; j < result.' + oneToMany.schemaName + '.length; j++) {');
			oneToMany.fields.forEach(function (field) {
	
				var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);
	
				codeFields.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + ' = result.' + oneToMany.schemaName + '[j]["' + field.oDataName + '"]; // ' + renamedFieldType);
				codeFieldsFormatted.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + ' = result.' + oneToMany.schemaName + '[j]["' + field.oDataName + '"]; // ' + renamedFieldType);
				if (formattedTypes.indexOf(field.type) > -1) {
					codeFieldsFormatted.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + '_formatted = result.' + oneToMany.schemaName + '[j]["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
				}
				if (logicalNameTypes.indexOf(field.type) > -1) {
					codeFieldsFormatted.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + '_lookuplogicalname = result.' + oneToMany.schemaName + '[j]["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
				}
			});
			codeFields.push('}');
			codeFieldsFormatted.push('}');
		});
	
		if (settings.manyToOne.length > 0) {
			codeFields.push('');
			codeFields.push('// Many To One Relationships');
			codeFieldsFormatted.push('');
			codeFieldsFormatted.push('// Many To One Relationships');
		}
		settings.manyToOne.forEach(function (manyToOne) {
			codeFields.push('if (result.hasOwnProperty("' + manyToOne.navigationProperty + '") && result["' + manyToOne.navigationProperty + '"] !== null) {');
			codeFieldsFormatted.push('if (result.hasOwnProperty("' + manyToOne.navigationProperty + '") && result["' + manyToOne.navigationProperty + '"] !== null) {');
			manyToOne.fields.forEach(function (field) {
	
				var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);
	
				codeFields.push('\tvar ' + manyToOne.navigationProperty + '_' + field.logicalName + ' = result["' + manyToOne.navigationProperty + '"]["' + field.oDataName + '"]; // ' + renamedFieldType);
				codeFieldsFormatted.push('\tvar ' + manyToOne.navigationProperty + '_' + field.logicalName + ' = result["' + manyToOne.navigationProperty + '"]["' + field.oDataName + '"]; // ' + renamedFieldType);
				if (formattedTypes.indexOf(field.type) > -1) {
					codeFieldsFormatted.push('\tvar ' + manyToOne.navigationProperty + '_' + field.logicalName + '_formatted = result["' + manyToOne.navigationProperty + '"]["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
				}
				if (logicalNameTypes.indexOf(field.type) > -1) {
					codeFieldsFormatted.push('\tvar ' + manyToOne.navigationProperty + '_' + field.logicalName + '_lookuplogicalname = result["' + manyToOne.navigationProperty + '"]["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
				}
			});
			codeFields.push('}');
			codeFieldsFormatted.push('}');
		});
	
		if (settings.manyToMany.length > 0) {
			codeFields.push('');
			codeFields.push('// Many To Many Relationships');
			codeFieldsFormatted.push('');
			codeFieldsFormatted.push('// Many To Many Relationships');
		}
		settings.manyToMany.forEach(function (manyToMany) {
			codeFields.push('for (var j = 0; j < result.' + manyToMany.schemaName + '.length; j++) {');
			codeFieldsFormatted.push('for (var j = 0; j < result.' + manyToMany.schemaName + '.length; j++) {');
			manyToMany.fields.forEach(function (field) {
	
				var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);
	
				codeFields.push('\tvar ' + manyToMany.schemaName + '_' + field.logicalName + ' = result.' + manyToMany.schemaName + '[j]["' + field.oDataName + '"]; // ' + renamedFieldType);
				codeFieldsFormatted.push('\tvar ' + manyToMany.schemaName + '_' + field.logicalName + ' = result.' + manyToMany.schemaName + '[j]["' + field.oDataName + '"]; // ' + renamedFieldType);
				if (formattedTypes.indexOf(field.type) > -1) {
					codeFieldsFormatted.push('\tvar ' + manyToMany.schemaName + '_' + field.logicalName + '_formatted = result.' + manyToMany.schemaName + '[j]["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
				}
				if (logicalNameTypes.indexOf(field.type) > -1) {
					codeFieldsFormatted.push('\tvar ' + manyToMany.schemaName + '_' + field.logicalName + '_lookuplogicalname = result.' + manyToMany.schemaName + '[j]["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
				}
			});
			codeFields.push('}');
			codeFieldsFormatted.push('}');
		});
	}
    return [codeFields, codeFieldsFormatted, codeFieldsFormattedOnlyRecord];
}

DRB.GenerateCode.GetXrmWebApiDefinitionParameters = function (settings, isBound, isCollectionBound, xrmWebApiAddedParameters) {
    var definitionParameters = [];

    definitionParameters.push('\tgetMetadata: function () {');
    definitionParameters.push('\t\treturn {');
    if (isBound === true) {
        if (isCollectionBound === true) { definitionParameters.push('\t\t\tboundParameter: "entityset",'); }
        else { definitionParameters.push('\t\t\tboundParameter: "entity",'); }
    } else { definitionParameters.push('\t\t\tboundParameter: null,'); }

    if (xrmWebApiAddedParameters === false) {
        definitionParameters.push('\t\t\tparameterTypes: {},');
    } else {
        definitionParameters.push('\t\t\tparameterTypes: {');
        settings.dataverseParameters.forEach(function (parameter, parameterIndex) {
            if (parameter.include === true) {
                if (parameterIndex === 0 && parameter.name === "entityset") {
                    var clearedType = parameter.type.replace("Collection(", "").replace(")", "");
                    definitionParameters.push('\t\t\t\t' + parameter.name + ': { typeName: "' + clearedType + '", structuralProperty: 4 },');
                } else {
                    // structuralProperty definition: https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/execute
                    var structuralProperty = 0; // 0: Unknown

                    if (parameter.type.indexOf("Edm.") === 0) { structuralProperty = 1; } // 1: PrimitiveType
                    if (parameter.type.indexOf("Collection(") === 0) { structuralProperty = 4; } // 4: Collection

                    if (parameter.type.indexOf("mscrm.") === 0) {
                        // can be ComplexType, Enum Type or EntityType
                        structuralProperty = 2; // 2: ComplexType                        
                        structuralProperty = 5; // 5: EntityType

                        if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.memberName) && DRB.Utilities.HasValue(parameter.value.memberValue)) {
                            structuralProperty = 3; // 3: EnumType
                        }
                        if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.members)) {
                            structuralProperty = 3; // 3: EnumType
                        }
                    }
                    if (structuralProperty !== 3) {
                        definitionParameters.push('\t\t\t\t' + parameter.name + ': { typeName: "' + parameter.type + '", structuralProperty: ' + structuralProperty + ' },');
                    } else {
                        var replacedType = parameter.type.replace("mscrm.", "Microsoft.Dynamics.CRM.");

                        if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.memberName) && DRB.Utilities.HasValue(parameter.value.memberValue)) {
                            definitionParameters.push('\t\t\t\t' + parameter.name + ': { typeName: "' + replacedType + '", structuralProperty: ' + structuralProperty + ', enumProperties: [{name: "' + parameter.value.memberName + '", value: ' + parameter.value.memberValue + '}] },');
                        }

                        if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.members)) {
                            var calculatedMemberName = [];
                            var calculatedMemberValue = 0;
                            if (Array.isArray(parameter.value.members)) {
                                parameter.value.members.forEach(function (member) {
                                    calculatedMemberName.push(member.name);
                                    calculatedMemberValue += parseInt(member.value);
                                });
                            }
                            definitionParameters.push('\t\t\t\t' + parameter.name + ': { typeName: "' + replacedType + '", structuralProperty: ' + structuralProperty + ', enumProperties: [{name: "' + calculatedMemberName.join(",") + '", value: ' + calculatedMemberValue + '}] },');
                        }
                    }
                }
            }
        });
        definitionParameters[definitionParameters.length - 1] = definitionParameters[definitionParameters.length - 1].slice(0, -1); // remove the "," from the last property added
        definitionParameters.push('\t\t\t},');
    }
    return definitionParameters;
}

/**
 * Generate Code - Get Code Parameters
 * Used in Dataverse Execute
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetCodeParameters = function (settings, xrmWebApiStyle) {
    var codeParameters = [];
    var prefix = "\t";
    var setter = ":";
    var endSetter = ",";
    if (xrmWebApiStyle !== true) {
        codeParameters.push('// Parameters');
        codeParameters.push('var parameters = {};');
        prefix = "parameters.";
        setter = " =";
        endSetter = ";";
    }

    var isBound = false;
    if (settings.primaryEntity.logicalName !== "none") { isBound = true; }

    settings.dataverseParameters.forEach(function (parameter, parameterIndex) {
        if (xrmWebApiStyle !== true && isBound === true && parameterIndex === 0) { return; } // skip the first parameter if is not for Xrm.WebApi and the request is bound

        if (xrmWebApiStyle === true && isBound === true && parameterIndex === 0) {
            // first parameter bounded requires different syntax
            if (parameter.name === "entity") {
                var clearedValue = "";
                if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.id)) { clearedValue = parameter.value.id; }
                codeParameters.push(prefix + parameter.name + setter + ' { entityType: "' + settings.primaryEntity.logicalName + '", id: "' + clearedValue + '" }' + endSetter + ' // ' + parameter.name);
            }
            if (parameter.name === "entityset") {
                // do nothing, don't include it
            }
            return; // skip rest of the code
        }

        if (parameter.include === true) {
            var renamedParameterType = parameter.type; // TBD implement DRB.GenerateCode.ConvertParameterType(parameter.type);

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
                        printedArray += '{ "@odata.type": "Microsoft.Dynamics.CRM.' + v.entityType + '", ' + v.primaryIdField + ' : "' + v.id + '" }, ';
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
                                printedArray += '{ "@odata.type": "Microsoft.Dynamics.CRM.' + v.entityType + '", ' + v.primaryIdField + ' : "' + v.id + '" }, ';
                            });
                            break;
                    }
                }
                if (collectionTypeFound === true) {
                    if (parameter.value.length > 0) { printedArray = printedArray.slice(0, -2); }
                    printedArray = '[' + printedArray + ']';
                    codeParameters.push(prefix + parameter.name + setter + ' ' + printedArray + endSetter + ' // ' + renamedParameterType);
                } else {
                    codeParameters.push(prefix + parameter.name + setter + ' null' + endSetter + ' // ' + renamedParameterType + ' NOTE: Collection Type not supported');
                }
            }

            if (typeFound === false && parameter.type === "mscrm.crmbaseentity") {
                typeFound = true;
                if (DRB.Utilities.HasValue(parameter.value.id) && DRB.Utilities.HasValue(parameter.value.entityType)) {
                    var clearedValue = '{ "@odata.type": "Microsoft.Dynamics.CRM.' + parameter.value.entityType + '", ' + parameter.value.primaryIdField + ' : "' + parameter.value.id + '" }';
                    codeParameters.push(prefix + parameter.name + setter + ' ' + clearedValue + endSetter + ' // ' + renamedParameterType);
                } else {
                    codeParameters.push(prefix + parameter.name + setter + ' null' + endSetter + ' // ' + renamedParameterType);
                }
            }

            if (typeFound === false && parameter.type.indexOf("mscrm.") === 0) {
                typeFound = true;
                var exactTypeFound = false;
                if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.id) && DRB.Utilities.HasValue(parameter.value.entityType)) {
                    exactTypeFound = true;
                    var clearedValue = '{ "@odata.type": "Microsoft.Dynamics.CRM.' + parameter.value.entityType + '", ' + parameter.value.primaryIdField + ' : "' + parameter.value.id + '" }';
                    codeParameters.push(prefix + parameter.name + setter + ' ' + clearedValue + endSetter + ' // ' + renamedParameterType);
                }

                if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.memberName) && DRB.Utilities.HasValue(parameter.value.memberValue)) {
                    exactTypeFound = true;
                    var clearedValue = parameter.value.memberValue;
                    codeParameters.push(prefix + parameter.name + setter + ' ' + clearedValue + endSetter + ' // ' + renamedParameterType);
                }

                if (DRB.Utilities.HasValue(parameter.value) && DRB.Utilities.HasValue(parameter.value.members) && Array.isArray(parameter.value.members)) {
                    exactTypeFound = true;
                    var clearedValue = 0;
                    parameter.value.members.forEach(function (member) {
                        clearedValue += parseInt(member.value);
                    });
                    codeParameters.push(prefix + parameter.name + setter + ' ' + clearedValue + endSetter + ' // ' + renamedParameterType);
                }

                if (exactTypeFound === false) {
                    codeParameters.push(prefix + parameter.name + setter + ' null' + endSetter + ' // ' + renamedParameterType);
                }
            }

            if (typeFound === false && parameter.type.indexOf("Edm.") === 0) {
                switch (parameter.type) {
                    case "Edm.Binary":
                        codeParameters.push(prefix + parameter.name + setter + ' null' + endSetter + ' // ' + renamedParameterType + ' NOTE: Edm.Binary not supported');
                        break;
                    case "Edm.Guid":
                        var clearedValue = parameter.value;
                        if (DRB.Utilities.HasValue(clearedValue)) {
                            clearedValue = parameter.value.replace(/"/g, '\\"');
                            clearedValue = clearedValue.replace(/\r?\n/g, "\\n");
                        }
                        if (xrmWebApiStyle === true) {
                            if (!DRB.Utilities.HasValue(clearedValue)) {
                                codeParameters.push(prefix + parameter.name + setter + ' { guid: null }' + endSetter + ' // ' + renamedParameterType);
                            }
                            else {
                                codeParameters.push(prefix + parameter.name + setter + ' {guid: "' + clearedValue + '" }' + endSetter + ' // ' + renamedParameterType);
                            }
                        } else {
                            if (!DRB.Utilities.HasValue(clearedValue)) {
                                codeParameters.push(prefix + parameter.name + setter + ' null' + endSetter + ' // ' + renamedParameterType);
                            }
                            else {
                                codeParameters.push(prefix + parameter.name + setter + ' "' + clearedValue + '"' + endSetter + ' // ' + renamedParameterType);
                            }
                        }
                        break;
                    case "Edm.String":
                        var clearedValue = parameter.value;
                        if (DRB.Utilities.HasValue(clearedValue)) {
                            clearedValue = parameter.value.replace(/"/g, '\\"');
                            clearedValue = clearedValue.replace(/\r?\n/g, "\\n");
                        }
                        if (!DRB.Utilities.HasValue(clearedValue)) { codeParameters.push(prefix + parameter.name + setter + ' null' + endSetter + ' // ' + renamedParameterType); }
                        else {
                            codeParameters.push(prefix + parameter.name + setter + ' "' + clearedValue + '"' + endSetter + ' // ' + renamedParameterType);
                        }
                        break;
                    case "Edm.Int32":
                    case "Edm.Int64":
                    case "Edm.Decimal":
                    case "Edm.Double":
                    case "Edm.Boolean":
                        var clearedValue = parameter.value;
                        if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
                        codeParameters.push(prefix + parameter.name + setter + ' ' + clearedValue + endSetter + ' // ' + renamedParameterType);
                        break;
                    case "Edm.DateTimeOffset":
                        var clearedValue = parameter.value;
                        if (!DRB.Utilities.HasValue(clearedValue)) { codeParameters.push(prefix + parameter.name + setter + ' null' + endSetter + ' // ' + renamedParameterType); }
                        else {
                            codeParameters.push(prefix + parameter.name + setter + ' new Date("' + clearedValue + '").toISOString()' + endSetter + ' // ' + renamedParameterType);
                        }
                        break;
                }
            }
        }
    });
    if (xrmWebApiStyle === true) {
        if (codeParameters.length > 0) { codeParameters.unshift(prefix + '// Parameters'); codeParameters.push(''); }
    } else {
        codeParameters.push('');
    }
    return codeParameters;
}

/**
 * Generate Code - Get Code Entity
 * Used in Create, Update
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetCodeEntity = function (settings) {
    var codeEntity = [];
    codeEntity.push('var record = {};');
    settings.setFields.forEach(function (field) {

        var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);

        switch (field.type) {
            case "Uniqueidentifier":
            case "EntityName":
            case "String":
            case "Memo":
                var clearedValue = field.value;
                if (DRB.Utilities.HasValue(clearedValue)) {
                    clearedValue = field.value.replace(/"/g, '\\"');
                    clearedValue = clearedValue.replace(/\r?\n/g, "\\n");
                }
                if (!DRB.Utilities.HasValue(clearedValue)) { codeEntity.push('record.' + field.logicalName + ' = null; // ' + renamedFieldType); }
                else { codeEntity.push('record.' + field.logicalName + ' = "' + clearedValue + '"; // ' + renamedFieldType); }
                break;
            case "ManagedProperty":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
                codeEntity.push('record.' + field.logicalName + ' = { Value: ' + clearedValue + ' }; // ' + renamedFieldType);
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
                codeEntity.push('record.' + field.logicalName + ' = ' + clearedValue + '; // ' + renamedFieldType);
                break;
            case "Money":
                var clearedValue = field.value;
                if (DRB.Utilities.HasValue(clearedValue)) {
                    clearedValue = 'Number(parseFloat(' + clearedValue + ').toFixed(4))';
                } else { clearedValue = null; }
                codeEntity.push('record.' + field.logicalName + ' = ' + clearedValue + '; // ' + renamedFieldType);
                break;
            case "MultiPicklist":
                var clearedValue = null;
                if (DRB.Utilities.HasValue(field.value)) {
                    if (field.value.length === 0) { clearedValue = null; }
                    else { clearedValue = '"' + field.value.join(",") + '"'; }
                }
                codeEntity.push('record.' + field.logicalName + ' = ' + clearedValue + '; // ' + renamedFieldType);
                break;
            case "Lookup":
            case "Owner":
            case "Customer":
                if (DRB.Utilities.HasValue(field.value)) {
                    var clearedValue = null;
                    if (DRB.Utilities.HasValue(field.value.id)) {
                        clearedValue = '"/' + field.value.entitySetName + '(' + field.value.id + ')"';
                    }
                    codeEntity.push('record["' + field.value.navigationProperty + '@odata.bind"] = ' + clearedValue + '; // ' + renamedFieldType);
                }
                break;
            case "DateTime":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { codeEntity.push('record.' + field.logicalName + ' = null; // ' + renamedFieldType); }
                else {
                    if (field.dateTimeBehavior === "DateOnly") {
                        codeEntity.push('record.' + field.logicalName + ' = "' + clearedValue + '"; // ' + renamedFieldType);
                    }
                    else { codeEntity.push('record.' + field.logicalName + ' = new Date("' + clearedValue + '").toISOString(); // ' + renamedFieldType); }
                }
                break;
            case "Image":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { codeEntity.push('record.' + field.logicalName + ' = null; // ' + renamedFieldType); }
                else { codeEntity.push('record.' + field.logicalName + ' = "' + clearedValue + '"; // ' + renamedFieldType); }
                break;
        }
    });
    codeEntity.push('');
    return codeEntity;
}

/**
 * Generate Code - Get SDK Code Entity
 * Used in Create, Update
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetSDKCodeEntity = function (settings) {
    var codeEntity = [];
    settings.setFields.forEach(function (field) {

        var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);

        switch (field.type) {
            case "Uniqueidentifier":
				var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
				else { clearedValue = 'new Guid("' + field.value + '")'; }
                codeEntity.push('record["' + field.logicalName + '"] = ' + clearedValue + '; // ' + renamedFieldType);
                break;
            case "EntityName":
            case "String":
            case "Memo":
                var clearedValue = field.value;
                if (DRB.Utilities.HasValue(clearedValue)) {
                    clearedValue = field.value.replace(/"/g, '\\"');
                    clearedValue = clearedValue.replace(/\r?\n/g, "\\n");
                }
                if (!DRB.Utilities.HasValue(clearedValue)) { codeEntity.push('record["' + field.logicalName + '"] = null; // ' + renamedFieldType); }
                else { codeEntity.push('record["' + field.logicalName + '"] = "' + clearedValue + '"; // ' + renamedFieldType); }
                break;
            case "ManagedProperty":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
                codeEntity.push('record["' + field.logicalName + '"] = "' + clearedValue + '"; // ' + renamedFieldType);
                break;
            case "BigInt":
            case "Integer":
			case "Boolean":
				var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
                codeEntity.push('record["' + field.logicalName + '"] = ' + clearedValue + '; // ' + renamedFieldType);
                break;
            case "Decimal":
			    var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
                codeEntity.push('record["' + field.logicalName + '"] = ' + clearedValue + 'm; // ' + renamedFieldType);
                break;
            case "Double":
			    var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
                codeEntity.push('record["' + field.logicalName + '"] = ' + clearedValue + 'd; // ' + renamedFieldType);
                break;
			
            case "Picklist":
            case "State":
            case "Status":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
				else { clearedValue = 'new OptionSetValue(' + field.value + ')'; }
                codeEntity.push('record["' + field.logicalName + '"] = ' + clearedValue + '; // ' + renamedFieldType);
                break;
            case "Money":
                var clearedValue = field.value;
                if (DRB.Utilities.HasValue(clearedValue)) {
                    clearedValue = 'new Money(' + clearedValue + 'm)';
                } else { clearedValue = null; }
                codeEntity.push('record["' + field.logicalName + '"] = ' + clearedValue + '; // ' + renamedFieldType);
                break;
            case "MultiPicklist":
                var clearedValue = null;
                if (DRB.Utilities.HasValue(field.value)) {
                    if (field.value.length === 0) { clearedValue = null; }
                    else {
						var multiValue = [];
						var pre = 'new OptionSetValue(';
						var preList = (pre + field.value.join(')|' + pre)).split('|');
						clearedValue = 'new OptionSetValueCollection { ' + preList.join(", ") + ') }';
					}
                }
                codeEntity.push('record["' + field.logicalName + '"] = ' + clearedValue + '; // ' + renamedFieldType);
                break;
            case "Lookup":
            case "Owner":
            case "Customer":
                if (DRB.Utilities.HasValue(field.value)) {
                    var clearedValue = null;
                    if (DRB.Utilities.HasValue(field.value.id)) {
                        clearedValue = 'new EntityReference("' + field.value.entityType + '", new Guid("'+ field.value.id + '"))';
                    }
                    codeEntity.push('record["' + field.logicalName + '"] = ' + clearedValue + '; // ' + renamedFieldType);
                }
                break;
            case "DateTime":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { codeEntity.push('record["' + field.logicalName + '"] = null; // ' + renamedFieldType); }
                else {
                    if (field.dateTimeBehavior === "DateOnly") {
                        codeEntity.push('record["' + field.logicalName + '"] = DateTime.Parse("' + clearedValue + '"); // ' + renamedFieldType);
                    }
                    else { codeEntity.push('record["' + field.logicalName + '"] = DateTime.Parse("' + clearedValue + '"); // ' + renamedFieldType); }
                }
                break;
            case "Image":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { codeEntity.push('record["' + field.logicalName + '"] = null; // ' + renamedFieldType); }
                else { codeEntity.push('record["' + field.logicalName + '"] = "' + clearedValue + '"; // ' + renamedFieldType); }
                break;
        }
    });
    return codeEntity;
}

/**
 * Generate Code - Get Xrm.WebApi Warnings
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetXrmWebApiWarnings = function (settings, includeExpandWarning) {
    var code = [];
    var warnings = [];
    if (settings.hasOwnProperty("async") && settings.async === false) { warnings.push("// WARNING: Xrm.WebApi doesn't support Synchronous mode"); }
    if (settings.hasOwnProperty("tokenHeader") && settings.tokenHeader === true) { warnings.push("// WARNING: Xrm.WebApi doesn't support Token Header"); }
    if (settings.hasOwnProperty("impersonate") && settings.impersonate === true) { warnings.push("// WARNING: Xrm.WebApi doesn't support Impersonation"); }
    if (settings.hasOwnProperty("formattedValues") && settings.formattedValues === false) { warnings.push("// WARNING: Xrm.WebApi always returns Formatted Values"); }
    if (settings.hasOwnProperty("detectChanges") && settings.detectChanges === true) { warnings.push("// WARNING: Xrm.WebApi doesn't support Detect Changes"); }
    if (settings.hasOwnProperty("retrieveCount") && settings.retrieveCount === true) { warnings.push("// WARNING: Xrm.WebApi doesn't support Retrieve Count"); }
    if (settings.hasOwnProperty("returnRecord") && settings.returnRecord === true) { warnings.push("// WARNING: Xrm.WebApi doesn't support Return Record"); }
    if (settings.hasOwnProperty("detectDuplicates") && settings.detectDuplicates === true) { warnings.push("// WARNING: Xrm.WebApi doesn't support Detect Duplicates"); }
    if (settings.hasOwnProperty("prevent") && settings.prevent !== "none") { warnings.push("// WARNING: Xrm.WebApi doesn't support Prevent"); }
    if (settings.hasOwnProperty("useAlternateKey") && settings.useAlternateKey === true) { warnings.push("// WARNING: Xrm.WebApi doesn't support Alternate Key"); }
    if (includeExpandWarning === true) { warnings.push("// WARNING: Xrm.WebApi.execute doesn't support $expand"); }

    if (warnings.length > 0) {
        warnings.push("// THE CODE HAS BEEN GENERATED CONSIDERING THESE WARNINGS");
        code.push(warnings.join('\n'));
        code.push('');
    }
    return code;
}

/**
 * Generate Code - Get Fetch API Warnings
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFetchAPIWarnings = function (settings) {
    var code = [];
    var warnings = [];
    if (settings.hasOwnProperty("async") && settings.async === false) { warnings.push("// WARNING: Fetch API doesn't support Synchronous mode"); }
    if (warnings.length > 0) {
        warnings.push("// THE CODE HAS BEEN GENERATED CONSIDERING THESE WARNINGS");
        code.push(warnings.join('\n'));
        code.push('');
    }
    return code;
}

/**
 * Generate Code - Get Portals Warnings
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetPortalsWarnings = function (settings) {
    var code = [];
    var warnings = [];
    code.push("// IMPORTANT NOTE! please read the following documentation regarding Portals Web API:");
    code.push('// https://learn.microsoft.com/en-us/power-apps/maker/portals/web-api-overview');
    code.push('// "webapi.safeAjax" wrapper is based on the code from this page:');
    code.push('// https://learn.microsoft.com/en-us/power-apps/maker/portals/web-api-http-requests-handle-errors');
    code.push('');

    if (settings.hasOwnProperty("async") && settings.async === false) { warnings.push("// WARNING: Portals doesn't support Synchronous mode"); }
    if (settings.hasOwnProperty("tokenHeader") && settings.tokenHeader === true) { warnings.push("// WARNING: Portals doesn't support Token Header"); }
    if (settings.hasOwnProperty("impersonate") && settings.impersonate === true) { warnings.push("// WARNING: Portals doesn't support Impersonation"); }
    if (settings.hasOwnProperty("detectChanges") && settings.detectChanges === true) { warnings.push("// WARNING: Portals doesn't support Detect Changes"); }
    if (settings.hasOwnProperty("returnRecord") && settings.returnRecord === true) { warnings.push("// WARNING: Portals doesn't support Return Record"); }
    if (settings.hasOwnProperty("detectDuplicates") && settings.detectDuplicates === true) { warnings.push("// WARNING: Portals doesn't support Detect Duplicates"); }
    if (settings.hasOwnProperty("prevent") && settings.prevent !== "none") { warnings.push("// WARNING: Portals doesn't support Prevent"); }

    if (warnings.length > 0) {
        code.push("// NOTE: The following warnings may not be correct");
        code.push(warnings.join('\n'));
        code.push('');
    }

    return code;
}

/**
 * Generate Code - Get SDK Warnings
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetSDKWarnings = function (settings) {
    var code = [];
    var warnings = [];

    if (settings.hasOwnProperty("tokenHeader") && settings.tokenHeader === true) { warnings.push("// WARNING: C# SDK doesn't support Token Header"); }
	if (settings.hasOwnProperty("retrieveCount") && settings.retrieveCount === true) { warnings.push("// WARNING: C# SDK doesn't support Retrieve Count"); }
    if (settings.hasOwnProperty("formattedValues") && settings.formattedValues === true) { warnings.push("// WARNING: C# SDK doesn't support Formatted Values"); }
    if (settings.hasOwnProperty("detectChanges") && settings.detectChanges === true) { warnings.push("// WARNING: C# SDK doesn't support Detect Changes"); }
    if (settings.hasOwnProperty("returnRecord") && settings.returnRecord === true) { warnings.push("// WARNING: C# SDK doesn't support Return Record"); }
    if (settings.hasOwnProperty("detectDuplicates") && settings.detectDuplicates === true) { warnings.push("// WARNING: C# SDK doesn't support Detect Duplicates"); }
    if (settings.hasOwnProperty("prevent") && settings.prevent !== "none") { warnings.push("// WARNING: C# SDK doesn't support Prevent"); }

    if (warnings.length > 0) {
        code.push("// NOTE: The following warnings may not be correct");
        code.push(warnings.join('\n'));
        code.push('');
    }
	if (settings.hasOwnProperty("async") && settings.async === true) { code.push("// NOTE: Asynchronous is only supported with the Microsoft.PowerPlatform.Dataverse.Client package"); }
    return code;
}

/**
 * Generate Code - Get Return Type
 * Used in Dataverse Execute
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetReturnType = function (settings) {
    var returnType = [];

    if (settings.dataverseReturnType === null) { returnType.push("// No Return Type"); }
    else {
        returnType.push("// Return Type: " + settings.dataverseReturnType.type);
        if (settings.dataverseReturnType.outputParameters.length > 0) {
            returnType.push("// Output Parameters");
            settings.dataverseReturnType.outputParameters.forEach(function (outputParameter) {
                returnType.push('var ' + outputParameter.name.toLowerCase() + ' = result["' + outputParameter.name + '"]; // ' + outputParameter.type);
            });
        }
    }
    return returnType;
}

/**
 * Generate Code - Get FetchXML Begin Table
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFetchXMLBeginTable = function (settings) {
    var fetchXMLBeginTable = [];
    var topCountSyntax = "";
    var retrieveCountSyntax = "";
    if (DRB.Utilities.HasValue(settings.topCount)) {
        topCountSyntax = ' top="' + settings.topCount + '"';
    }
    if (DRB.Utilities.HasValue(settings.retrieveCount) && settings.retrieveCount === true) {
        retrieveCountSyntax = ' returntotalrecordcount="true"';
    }

    fetchXMLBeginTable.push('<fetch' + topCountSyntax + retrieveCountSyntax + '>');
    fetchXMLBeginTable.push('\t<!-- Table -->');
    fetchXMLBeginTable.push('\t<entity name="' + settings.primaryEntity.logicalName + '">');

    return fetchXMLBeginTable;
}

/**
 * Generate Code - Get FetchXML End Table
 */
DRB.GenerateCode.GetFetchXMLEndTable = function () {
    var fetchXMLEndTable = [];
    fetchXMLEndTable.push('\t</entity>');
    fetchXMLEndTable.push('</fetch>');
    return fetchXMLEndTable;
}

/**
 * Generate Code - Get FetchXML Full Columns
  * @param {any} settings Configuration
  * @param {any} fields Fields
 */
DRB.GenerateCode.GetFetchXMLFullColumns = function (settings, fields, spacing) {
    var fetchXMLFullColumns = [];
    var formattedTypes = ["Picklist", "MultiPicklist", "State", "Status", "Owner", "Lookup", "Customer", "Boolean"];
    //var lookupTypes = ["Owner", "Customer"]; // Lookup should be done only for Polymorphic, needs to check
    fields.forEach(function (field) {
        fetchXMLFullColumns.push(spacing + '<attribute name="' + field.logicalName + '" />');
        if (settings.hasOwnProperty("formattedValues") && settings.formattedValues === true) {
            if (formattedTypes.indexOf(field.type) > -1) {
                fetchXMLFullColumns.push(spacing + '<attribute name="' + field.logicalName + 'name" />');
            }
            //if (lookupTypes.indexOf(field.type) > -1) {
            //    fetchXMLFullColumns.push(spacing + '<attribute name="' + field.logicalName + 'type" />');
            //}
        }
    });
    return fetchXMLFullColumns;
}

/**
 * Generate Code - Get FetchXML Columns
  * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFetchXMLColumns = function (settings) {
    var fetchXMLColumns = [];
    if (settings.fields.length > 0) {
        fetchXMLColumns.push('<!-- Columns -->');
        var fieldLogicalNames = settings.fields.map(function (field) { return field.logicalName; });
        if (fieldLogicalNames.indexOf(settings.primaryIdField) === -1) {
            fetchXMLColumns.push('<attribute name="' + settings.primaryIdField + '" />');
        }
        var fetchXMLFullColumns = DRB.GenerateCode.GetFetchXMLFullColumns(settings, settings.fields, "");
        fetchXMLFullColumns.forEach(function (fetchXMLFullColumn) { fetchXMLColumns.push(fetchXMLFullColumn); });
    }
    return fetchXMLColumns;
}

/**
 * Generate Code - Get FetchXML Primary Filter
  * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFetchXMLPrimaryFilter = function (settings) {
    var fetchXMLPrimaryFilter = [];

    fetchXMLPrimaryFilter.push('<filter type="and">');
    if (settings.useAlternateKey === false) {
        fetchXMLPrimaryFilter.push('\t<!-- Primary Id -->');
        fetchXMLPrimaryFilter.push('\t<condition attribute="' + settings.primaryIdField + '" operator="eq" value="' + settings.primaryId + '" />');
    } else {
        fetchXMLPrimaryFilter.push('\t<!-- Alternate Key -->');
        settings.alternateKeyFields.forEach(function (field) {

            var keyValue = field.value;
            if (keyValue === "" || keyValue === null) {
                keyValue = "";
            } else {
                switch (field.type) {
                    case "String":
                        keyValue = keyValue.replace(/"/g, '&quot;');
                        break;
                    case "DateTime":
                        if (field.dateTimeBehavior !== "DateOnly") {
                            try {
                                var isoString = new Date(keyValue).toISOString();
                                keyValue = isoString;
                            } catch { }
                        }
                        break;
                    case "Lookup":
                        if (DRB.Utilities.HasValue(field.value.id)) { keyValue = field.value.id; }
                        else { keyValue = ""; }
                        break;
                }
            }
            fetchXMLPrimaryFilter.push('\t<condition attribute="' + field.logicalName + '" operator="eq" value="' + keyValue + '" />');
        });
    }

    fetchXMLPrimaryFilter.push('</filter>');

    return fetchXMLPrimaryFilter;
}
/**
 * Generate Code - Get FetchXML Operator
 * @param {string} webApiOperator Web API Operator
 */
DRB.GenerateCode.GetFetchXMLOperator = function (webApiOperator) {
    var fetchXMLOperator = "";
    switch (webApiOperator) {
        case "ne null": fetchXMLOperator = "not-null"; break;
        case "eq null": fetchXMLOperator = "null"; break;
        case "eq": fetchXMLOperator = "eq"; break;
        case "ne": fetchXMLOperator = "ne"; break;
        case "contains": fetchXMLOperator = "like"; break;
        case "not contains": fetchXMLOperator = "not-like"; break;
        case "startswith": fetchXMLOperator = "begins-with"; break;
        case "not startswith": fetchXMLOperator = "not-begin-with"; break;
        case "endswith": fetchXMLOperator = "ends-with"; break;
        case "not endswith": fetchXMLOperator = "not-end-with"; break;
        case "gt": fetchXMLOperator = "gt"; break;
        case "ge": fetchXMLOperator = "ge"; break;
        case "lt": fetchXMLOperator = "lt"; break;
        case "le": fetchXMLOperator = "le"; break;
        case "In": fetchXMLOperator = "in"; break;
        case "NotIn": fetchXMLOperator = "not-in"; break;
        case "ContainValues": fetchXMLOperator = "contain-values"; break;
        case "DoesNotContainValues": fetchXMLOperator = "does-not-contain-values"; break;
        case "EqualUserId": fetchXMLOperator = "eq-userid"; break;
        case "NotEqualUserId": fetchXMLOperator = "ne-userid"; break;
        case "EqualUserOrUserHierarchy": fetchXMLOperator = "eq-useroruserhierarchy"; break;
        case "EqualUserOrUserHierarchyAndTeams": fetchXMLOperator = "eq-useroruserhierarchyandteams"; break;
        case "EqualUserTeams": fetchXMLOperator = "eq-userteams"; break;
        case "EqualUserOrUserTeams": fetchXMLOperator = "eq-useroruserteams"; break;
        case "EqualBusinessId": fetchXMLOperator = "eq-businessid"; break;
        case "NotEqualBusinessId": fetchXMLOperator = "ne-businessid"; break;
        case "Yesterday": fetchXMLOperator = "yesterday"; break;
        case "Today": fetchXMLOperator = "today"; break;
        case "Tomorrow": fetchXMLOperator = "tomorrow"; break;
        case "Next7Days": fetchXMLOperator = "next-seven-days"; break;
        case "Last7Days": fetchXMLOperator = "last-seven-days"; break;
        case "NextWeek": fetchXMLOperator = "next-week"; break;
        case "LastWeek": fetchXMLOperator = "last-week"; break;
        case "ThisWeek": fetchXMLOperator = "this-week"; break;
        case "NextMonth": fetchXMLOperator = "next-month"; break;
        case "LastMonth": fetchXMLOperator = "last-month"; break;
        case "ThisMonth": fetchXMLOperator = "this-month"; break;
        case "NextYear": fetchXMLOperator = "next-year"; break;
        case "LastYear": fetchXMLOperator = "last-year"; break;
        case "ThisYear": fetchXMLOperator = "this-year"; break;
        case "NextFiscalYear": fetchXMLOperator = "next-fiscal-year"; break;
        case "LastFiscalYear": fetchXMLOperator = "last-fiscal-year"; break;
        case "ThisFiscalYear": fetchXMLOperator = "this-fiscal-year"; break;
        case "NextFiscalPeriod": fetchXMLOperator = "next-fiscal-period"; break;
        case "LastFiscalPeriod": fetchXMLOperator = "last-fiscal-period"; break;
        case "ThisFiscalPeriod": fetchXMLOperator = "this-fiscal-period"; break;
        case "On": fetchXMLOperator = "on"; break;
        case "OnOrAfter": fetchXMLOperator = "on-or-after"; break;
        case "OnOrBefore": fetchXMLOperator = "on-or-before"; break;
        case "NextXHours": fetchXMLOperator = "next-x-hours"; break;
        case "LastXHours": fetchXMLOperator = "last-x-hours"; break;
        case "NextXDays": fetchXMLOperator = "next-x-days"; break;
        case "LastXDays": fetchXMLOperator = "last-x-days"; break;
        case "NextXWeeks": fetchXMLOperator = "next-x-weeks"; break;
        case "LastXWeeks": fetchXMLOperator = "last-x-weeks"; break;
        case "NextXMonths": fetchXMLOperator = "next-x-months"; break;
        case "LastXMonths": fetchXMLOperator = "last-x-months"; break;
        case "NextXYears": fetchXMLOperator = "next-x-years"; break;
        case "LastXYears": fetchXMLOperator = "last-x-years"; break;
        case "NextXFiscalYears": fetchXMLOperator = "next-x-fiscal-years"; break;
        case "LastXFiscalYears": fetchXMLOperator = "last-x-fiscal-years"; break;
        case "InFiscalYear": fetchXMLOperator = "in-fiscal-year"; break;
        case "NextXFiscalPeriods": fetchXMLOperator = "next-x-fiscal-periods"; break;
        case "LastXFiscalPeriods": fetchXMLOperator = "last-x-fiscal-periods"; break;
        case "InFiscalPeriod": fetchXMLOperator = "in-fiscal-period"; break;
        case "InFiscalPeriodAndYear": fetchXMLOperator = "in-fiscal-period-and-year"; break;
        case "InOrAfterFiscalPeriodAndYear": fetchXMLOperator = "in-or-after-fiscal-period-and-year"; break;
        case "InOrBeforeFiscalPeriodAndYear": fetchXMLOperator = "in-or-before-fiscal-period-and-year"; break;
        case "OlderThanXMinutes": fetchXMLOperator = "olderthan-x-minutes"; break;
        case "OlderThanXHours": fetchXMLOperator = "olderthan-x-hours"; break;
        case "OlderThanXDays": fetchXMLOperator = "olderthan-x-days"; break;
        case "OlderThanXWeeks": fetchXMLOperator = "olderthan-x-weeks"; break;
        case "OlderThanXMonths": fetchXMLOperator = "olderthan-x-months"; break;
        case "OlderThanXYears": fetchXMLOperator = "olderthan-x-years"; break;
        case "Above": fetchXMLOperator = "above"; break;
        case "AboveOrEqual": fetchXMLOperator = "eq-or-above"; break;
        case "NotUnder": fetchXMLOperator = "not-under"; break;
        case "Under": fetchXMLOperator = "under"; break;
        case "UnderOrEqual": fetchXMLOperator = "eq-or-under"; break;
        case "EqualUserLanguage": fetchXMLOperator = "eq-userlanguage"; break;
        case "Between": fetchXMLOperator = "between"; break;
        case "NotBetween": fetchXMLOperator = "not-between"; break;
    }
    return fetchXMLOperator;
}

/**
 * Generate Code - FetchXML Parse Filter Criteria
 * @param {any} configurationObject Configuration Object
 */
DRB.GenerateCode.FetchXMLParseFilterCriteria = function (query, configurationObject, depth) {
    // filterType must be "fields" or "groups", otherwise return
    if (!configurationObject.hasOwnProperty("filterType")) { return []; }
    if (configurationObject.filterType !== "fields" && configurationObject.filterType !== "groups") { return []; }

    var spacing = Array(depth + 1).join('\t');

    // fields are always leaves
    if (configurationObject.filterType === "fields") {
        var filterFieldsLogic = "and";
        if (configurationObject.hasOwnProperty("filterFieldsLogic")) { filterFieldsLogic = configurationObject.filterFieldsLogic; }
        var partialQuery = [];
        if (configurationObject.filterFields.length > 0) {
            if (configurationObject.filterFields.length > 1) { partialQuery.push(spacing + '<filter type="' + filterFieldsLogic + '">'); }
            configurationObject.filterFields.forEach(function (filterField) {
                if (JSON.stringify(filterField) !== JSON.stringify({})) {
                    var fetchXMLOperator = DRB.GenerateCode.GetFetchXMLOperator(filterField.operator);
                    var partialCondition = '';
                    if (configurationObject.filterFields.length > 1) {
                        partialCondition = spacing + '\t<condition';
                    } else {
                        partialCondition = spacing + '<condition';
                    }
                    if (DRB.Utilities.HasValue(filterField.relationship)) { partialCondition += ' entityname="' + filterField.relationship.navigationProperty + '"'; }
                    partialCondition += ' attribute="' + filterField.logicalName + '" operator="' + fetchXMLOperator + '"';
                    if (filterField.requiredValue === false) {
                        partialCondition += ' />';
                        partialQuery.push(partialCondition);
                    }
                    if (filterField.requiredValue === true) {
                        var operatorFound = false;

                        switch (filterField.operator) {
                            case "Between":
                            case "NotBetween":
                            case "InFiscalPeriodAndYear":
                            case "InOrAfterFiscalPeriodAndYear":
                            case "InOrBeforeFiscalPeriodAndYear":
                                operatorFound = true;
                                partialCondition += '>';
                                partialQuery.push(partialCondition);
                                partialQuery.push(spacing + '\t\t<value>' + filterField.value + '</value>');
                                partialQuery.push(spacing + '\t\t<value>' + filterField.value2 + '</value>');
                                partialQuery.push(spacing + '\t</condition>');
                                break;
                            case "In":
                            case "NotIn":
                            case "ContainValues":
                            case "DoesNotContainValues":
                                operatorFound = true;
                                partialCondition += '>';
                                partialQuery.push(partialCondition);
                                filterField.value.forEach(function (currentValue) {
                                    partialQuery.push(spacing + '\t\t<value>' + currentValue + '</value>');
                                });
                                partialQuery.push(spacing + '\t</condition>');
                                break;
                        }

                        if (operatorFound === false) {
                            partialCondition += ' value="';
                            var clearedValue = "";

                            if (filterField.type === "Owner" || filterField.type === "Lookup" || filterField.type === "Customer") {
                                if (DRB.Utilities.HasValue(filterField.value.id)) { clearedValue = filterField.value.id; }
                            } else {
                                if (DRB.Utilities.HasValue(filterField.value)) {
                                    clearedValue = filterField.value.replace(/"/g, '&quot;');
                                }
                            }

                            if (filterField.type === "ManagedProperty" || filterField.type === "Boolean") {
                                if (clearedValue === "false") { clearedValue = "0"; }
                                if (clearedValue === "true") { clearedValue = "1"; }
                            }

                            if (filterField.operator === "contains" || filterField.operator === "not contains") {
                                clearedValue = "%" + clearedValue + "%";
                            }

                            partialCondition += clearedValue + '" />';
                            partialQuery.push(partialCondition);
                        }
                    }
                }
            });
            if (configurationObject.filterFields.length > 1) { partialQuery.push(spacing + '</filter>'); }
        }
        partialQuery.forEach(function (partial) { query.push(partial); });
    }

    if (configurationObject.filterType === "groups") {
        var filterGroupsLogic = "and";
        if (configurationObject.hasOwnProperty("filterGroupsLogic")) { filterGroupsLogic = configurationObject.filterGroupsLogic; }
        var skipGrouping = false;
        if (configurationObject.filterGroups.length === 1) { skipGrouping = true; }
        if (skipGrouping === false) {
            query.push(spacing + '<filter type="' + filterGroupsLogic + '">');
            depth++;
        }
        configurationObject.filterGroups.forEach(function (filterItem) {
            if (JSON.stringify(filterItem) !== JSON.stringify({})) {
                DRB.GenerateCode.FetchXMLParseFilterCriteria(query, filterItem, depth);
            }
        });
        if (skipGrouping === false) { query.push(spacing + '</filter>'); }
    }
    return query;
}

/**
 * Generate Code - Get FetchXML Filters
 * Used in Retrieve Multiple
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFetchXMLFilters = function (settings) {
    var fetchXMLFilters = [];
    var filterFields = DRB.GenerateCode.FetchXMLParseFilterCriteria([], settings.filterCriteria, 0);
    if (filterFields.length > 0) { fetchXMLFilters.push('<!-- Filter By -->'); }
    if (filterFields.length === 1) {
        // add at least one filter around the unique condition
        filterFields[0] = '\t' + filterFields[0];
        filterFields.push('</filter>');
        filterFields.unshift('<filter type="and">');
    }
    filterFields.forEach(function (filterField) { fetchXMLFilters.push(filterField); });
    return fetchXMLFilters;
}

/**
 * Generate Code - FetchXML Parse Filter Relationships Criteria
 * @param {any} configurationObject Configuration Object
 */
DRB.GenerateCode.FetchXMLParseFilterRelationshipsCriteria = function (query, configurationObject) {
    // filterType must be "fields" or "groups", otherwise return
    if (!configurationObject.hasOwnProperty("filterType")) { return ""; }
    if (configurationObject.filterType !== "fields" && configurationObject.filterType !== "groups") { return ""; }

    // fields are always leaves
    if (configurationObject.filterType === "fields") {
        configurationObject.filterFields.forEach(function (filterField) {
            if (JSON.stringify(filterField) !== JSON.stringify({})) {
                if (DRB.Utilities.HasValue(filterField.relationship)) {
                    query.push(filterField.relationship);
                }
            }
        });
    }

    if (configurationObject.filterType === "groups") {
        configurationObject.filterGroups.forEach(function (filterItem) {
            if (JSON.stringify(filterItem) !== JSON.stringify({})) {
                DRB.GenerateCode.FetchXMLParseFilterRelationshipsCriteria(query, filterItem);
            }
        });
    }
    return query;
}

/**
 * Generate Code - Get FetchXML Filter Relationships
 * Used in Retrieve Multiple
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFetchXMLFilterRelationships = function (settings) {
    var fetchXMLFilterRelationships = DRB.GenerateCode.FetchXMLParseFilterRelationshipsCriteria([], settings.filterCriteria);
    return fetchXMLFilterRelationships;
}

/**
 * Generate Code - Get FetchXML Relationships
  * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFetchXMLRelationships = function (settings, asOuter) {
    var fetchXMLRelationships = [];
    var outerSyntax = "";
    if (asOuter === true) { outerSyntax = ' link-type="outer"'; }
    if (settings.oneToMany.length > 0) { fetchXMLRelationships.push('<!-- One To Many Relationships -->'); }
    settings.oneToMany.forEach(function (oneToMany) {
        var linkName = oneToMany.targetEntity;
        var linkFrom = oneToMany.navigationAttribute;
        var linkTo = settings.primaryIdField;
        var linkAlias = oneToMany.navigationProperty;
        fetchXMLRelationships.push('<link-entity name="' + linkName + '" from="' + linkFrom + '" to="' + linkTo + '" alias="' + linkAlias + '"' + outerSyntax + '>');
        var fetchXMLFullColumns = DRB.GenerateCode.GetFetchXMLFullColumns(settings, oneToMany.fields, "\t");
        fetchXMLFullColumns.forEach(function (fetchXMLFullColumn) { fetchXMLRelationships.push(fetchXMLFullColumn); });
        fetchXMLRelationships.push('</link-entity>');
    });

    if (settings.manyToOne.length > 0) { fetchXMLRelationships.push('<!-- Many To One Relationships -->'); }
    settings.manyToOne.forEach(function (manyToOne) {
        var linkName = manyToOne.targetEntity;
        var linkFrom = manyToOne.targetEntityPrimaryIdField;
        var linkTo = manyToOne.navigationAttribute;
        var linkAlias = manyToOne.navigationProperty;
        fetchXMLRelationships.push('<link-entity name="' + linkName + '" from="' + linkFrom + '" to="' + linkTo + '" alias="' + linkAlias + '"' + outerSyntax + '>');
        var fetchXMLFullColumns = DRB.GenerateCode.GetFetchXMLFullColumns(settings, manyToOne.fields, "\t");
        fetchXMLFullColumns.forEach(function (fetchXMLFullColumn) { fetchXMLRelationships.push(fetchXMLFullColumn); });
        fetchXMLRelationships.push('</link-entity>');
    });

    if (settings.manyToMany.length > 0) { fetchXMLRelationships.push('<!-- Many To Many Relationships -->'); }
    settings.manyToMany.forEach(function (manyToMany) {
        var linkName = manyToMany.navigationAttribute;
        var linkFrom = settings.primaryIdField;
        var linkTo = settings.primaryIdField;
        var linkInnerName = manyToMany.targetEntity;
        var linkInnerFrom = manyToMany.targetEntityPrimaryIdField;
        var linkInnerTo = manyToMany.targetEntityPrimaryIdField;
        var linkInnerAlias = manyToMany.navigationProperty;

        if (settings.primaryEntity.logicalName === manyToMany.targetEntity) {
            linkFrom += "one";
            linkInnerTo += "two";
        }

        fetchXMLRelationships.push('<link-entity name="' + linkName + '" from="' + linkFrom + '" to="' + linkTo + '"' + outerSyntax + ' intersect="true">');
        fetchXMLRelationships.push('\t<link-entity name="' + linkInnerName + '" from="' + linkInnerFrom + '" to="' + linkInnerTo + '" alias="' + linkInnerAlias + '"' + outerSyntax + ' intersect="true">');
        var fetchXMLFullColumns = DRB.GenerateCode.GetFetchXMLFullColumns(settings, manyToMany.fields, "\t\t");
        fetchXMLFullColumns.forEach(function (fetchXMLFullColumn) { fetchXMLRelationships.push(fetchXMLFullColumn); });
        fetchXMLRelationships.push('\t</link-entity>');
        fetchXMLRelationships.push('</link-entity>');
    });

    return fetchXMLRelationships;
}

/**
 * Generate Code - Get FetchXML Order By
  * @param {any} settings Configuration
 */
DRB.GenerateCode.GetFetchXMLOrderBy = function (settings) {
    var fetchXMLOrderBy = [];

    if (settings.orderFields.length > 0) {
        fetchXMLOrderBy.push('<!-- Order By -->');
    }

    settings.orderFields.forEach(function (orderField) {
        if (orderField.value === "desc") {
            fetchXMLOrderBy.push('<order attribute="' + orderField.logicalName + '" descending="true" />');
        } else {
            fetchXMLOrderBy.push('<order attribute="' + orderField.logicalName + '" />');
        }
    });
    return fetchXMLOrderBy;
}

/**
 * Generate Code - Retrieve Single
 */
DRB.GenerateCode.RetrieveSingle = function () {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codeXrmWebApiExecute = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
    var codePortals = [];
    var codeFetchXML = [];
	var codeSDK = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);
        codeFetchXML.push(errorMessage);
		codeSDK.push(errorMessage);
		
        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, codeFetchXML, codeSDK);
        return;
    }

    var urlFields = DRB.GenerateCode.GetUrlFields(settings);

    var entityCriteria = settings.primaryId;
    if (settings.useAlternateKey === true) { entityCriteria = DRB.GenerateCode.GetAlternateKeys(settings); }


    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")" + urlFields;
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")" + urlFields;

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);
	var portalsHeaders = DRB.GenerateCode.GetPortalsRequestHeaders(settings);
    // Code Fields
    var getCodeFields = DRB.GenerateCode.GetCodeFields(settings);
    var codeFields = getCodeFields[0];
    var codeFieldsFormatted = getCodeFields[1];
    var codeFieldsFormattedOnlyRecord = getCodeFields[2];

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('// NOTE: retrieveRecord is available in online mode, if you need this functionality change the call to Xrm.WebApi.online.retrieveRecord');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online');
    codeXrmWebApi.push('// NOTE: retrieveRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.retrieveRecord');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');
    var entityCriteriaXrmWebApi = entityCriteria;
    if (settings.useAlternateKey === true) { entityCriteriaXrmWebApi = ""; }
    var urlFieldsXrmWebApi = urlFields;
    if (urlFields !== '') { urlFieldsXrmWebApi = ', "' + urlFields + '"'; }
    codeXrmWebApi.push('Xrm.WebApi.retrieveRecord("' + settings.primaryEntity.logicalName + '", "' + entityCriteriaXrmWebApi + '"' + urlFieldsXrmWebApi + ').then(');
    codeXrmWebApi.push('\tfunction success(result) {');
    codeXrmWebApi.push('\t\tconsole.log(result);');
    var codeFieldsXrmWebApi = [];
    codeFieldsFormatted.forEach(function (codeField) { codeFieldsXrmWebApi.push('\t\t' + codeField); });
    codeXrmWebApi.push(codeFieldsXrmWebApi.join('\n'));

    codeXrmWebApi.push('\t},');
    codeXrmWebApi.push('\tfunction(error) {');
    codeXrmWebApi.push('\t\tconsole.log(error.message);');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(');');
    // #endregion

    // #region Xrm.WebApi.execute
    var urlHasExpand = false;
    if (urlFields.indexOf("$expand") > -1) { urlHasExpand = true; }
    codeXrmWebApiExecute = DRB.GenerateCode.GetXrmWebApiWarnings(settings, urlHasExpand);
    codeXrmWebApiExecute.push('// NOTE: you can use Xrm.WebApi.execute if this request needs to be part of an executeMultiple collection');
    codeXrmWebApiExecute.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple');

    codeXrmWebApiExecute.push('var retrieveRequest = {');
    codeXrmWebApiExecute.push('\tentityReference: { entityType: "' + settings.primaryEntity.logicalName + '", id: "' + entityCriteriaXrmWebApi + '" },');

    var executeColumns = '';
    if (settings.fields.length > 0) {
        settings.fields.forEach(function (field) { executeColumns += '"' + field.logicalName + '", '; });
        executeColumns = executeColumns.slice(0, -2);
    } else {
        executeColumns += '"' + settings.primaryIdField + '"';
    }

    codeXrmWebApiExecute.push('\tcolumns: [' + executeColumns + '],');
    codeXrmWebApiExecute.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Retrieve" }; }');
    codeXrmWebApiExecute.push('};');
    codeXrmWebApiExecute.push('');

    codeXrmWebApiExecute.push('Xrm.WebApi.execute(retrieveRequest).then(');
    codeXrmWebApiExecute.push('\tfunction success(response) {');
    codeXrmWebApiExecute.push('\t\tif (response.ok) { return response.json(); }');
    codeXrmWebApiExecute.push('\t}');
    codeXrmWebApiExecute.push(').then(function (responseBody) {');
    codeXrmWebApiExecute.push('\tvar result = responseBody;');
    codeXrmWebApiExecute.push('\tconsole.log(result);');

    var codeFieldsXrmWebApiExecute = [];
    codeFieldsFormattedOnlyRecord.forEach(function (codeField) { codeFieldsXrmWebApiExecute.push('\t' + codeField); });
    codeXrmWebApiExecute.push(codeFieldsXrmWebApiExecute.join('\n'));

    codeXrmWebApiExecute.push('}).catch(function (error) {');
    codeXrmWebApiExecute.push('\tconsole.log(error.message);');
    codeXrmWebApiExecute.push('});');
    // #endregion

    // #region jQuery
    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "GET",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    var codejQueryIndent = '\t\t';
    if (settings.detectChanges === true) {
        codejQueryIndent += '\t';
        codejQuery.push('\t\tif (xhr.status === 304) {');
        codejQuery.push('\t\t\t// Handle data not changed');
        codejQuery.push('\t\t\tconsole.log("Record not changed");');
        codejQuery.push('\t\t} else {');
    }

    codejQuery.push(codejQueryIndent + 'var result = data;');
    codejQuery.push(codejQueryIndent + 'console.log(result);');
    if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codejQuery.push(codejQueryIndent + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codejQuery.push(codejQueryIndent + codeField); });
    }
    if (settings.detectChanges === true) { codejQuery.push('\t\t}'); }
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
    codeXMLHttpRequest.push('\t\t\tvar result = JSON.parse(this.response);');
    codeXMLHttpRequest.push('\t\t\tconsole.log(result);');
    if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codeXMLHttpRequest.push('\t\t\t' + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codeXMLHttpRequest.push('\t\t\t' + codeField); });
    }
    if (settings.detectChanges === true) {
        codeXMLHttpRequest.push('\t\t} else if (this.status === 304) {');
        codeXMLHttpRequest.push('\t\t\t// Handle data not changed');
        codeXMLHttpRequest.push('\t\t\tconsole.log("Record not changed");');
    }
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    codeFetchAPI.push('\tmethod: "GET",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t}');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
    codeFetchAPI.push('\t}');
    codeFetchAPI.push(').then(function (responseObjects) {');
    codeFetchAPI.push('\tvar response = responseObjects[0];');
    codeFetchAPI.push('\tvar responseBody = responseObjects[1];');

    if (settings.detectChanges === true) {
        codeFetchAPI.push('\tif (response.status === 304) {');
        codeFetchAPI.push('\t\t// Handle data not changed');
        codeFetchAPI.push('\t\tconsole.log("Record not changed");');
        codeFetchAPI.push('\t} else {');
        codeFetchAPI.push('\t\tvar result = responseBody;');
        codeFetchAPI.push('\t\tconsole.log(result);');
        if (settings.formattedValues === true) {
            codeFieldsFormatted.forEach(function (codeField) { codeFetchAPI.push('\t\t' + codeField); });
        } else {
            codeFields.forEach(function (codeField) { codeFetchAPI.push('\t\t' + codeField); });
        }
        codeFetchAPI.push('\t}');
    } else {
        codeFetchAPI.push('\tvar result = responseBody;');
        codeFetchAPI.push('\tconsole.log(result);');
        if (settings.formattedValues === true) {
            codeFieldsFormatted.forEach(function (codeField) { codeFetchAPI.push('\t' + codeField); });
        } else {
            codeFields.forEach(function (codeField) { codeFetchAPI.push('\t' + codeField); });
        }
    }
    codeFetchAPI.push('}).catch(function (error) {');
    codeFetchAPI.push('\tconsole.log(error.message);');
    codeFetchAPI.push('});');
    // #endregion

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "GET",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tcontentType: "application/json",');
	if (portalsHeaders.length > 0) {
	    codePortals.push('\theaders: {');
		portalsHeaders.forEach(function (reqHeader) { codePortals.push('\t\t' + reqHeader); });
		codePortals.push('\t},');
	}
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tvar result = data;');
    codePortals.push('\t\tconsole.log(result);');

	if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codePortals.push('\t\t' + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codePortals.push('\t\t' + codeField); });
    }

    codePortals.push('\t},');
    codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
    codePortals.push('\t\tconsole.log(xhr);');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    // #region FetchXML
    var fetchXMLBeginTable = DRB.GenerateCode.GetFetchXMLBeginTable(settings);
    fetchXMLBeginTable.forEach(function (beginTable) { codeFetchXML.push(beginTable); });

    var fetchXMLColumns = DRB.GenerateCode.GetFetchXMLColumns(settings);
    fetchXMLColumns.forEach(function (fetchXMLColumn) { codeFetchXML.push('\t\t' + fetchXMLColumn); });

    var fetchXMLPrimaryFilter = DRB.GenerateCode.GetFetchXMLPrimaryFilter(settings);
    fetchXMLPrimaryFilter.forEach(function (primaryFilter) { codeFetchXML.push('\t\t' + primaryFilter); });

    var fetchXMLRelationships = DRB.GenerateCode.GetFetchXMLRelationships(settings, true);
    fetchXMLRelationships.forEach(function (fetchXMLRelationship) { codeFetchXML.push('\t\t' + fetchXMLRelationship); });

    var fetchXMLEndTable = DRB.GenerateCode.GetFetchXMLEndTable();
    fetchXMLEndTable.forEach(function (endTable) { codeFetchXML.push(endTable); });
    // #endregion
	
	// #region SDK
	var methodCode = "service.Retrieve";
	if (settings.async === true) { methodCode = "await service.RetrieveAsync"; }
	var methodCodeAlternate = "service.Execute";
	if (settings.async === true) { methodCodeAlternate = "await service.ExecuteAsync"; }
	
	codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
	
	if (settings.oneToMany.length > 0) { codeSDK.push("// NOTE: C# SDK doesn't support One To Many Relationships with the Retrieve request"); }
	if (settings.manyToOne.length > 0) { codeSDK.push("// NOTE: C# SDK doesn't support Many To One Relationships with the Retrieve request"); }
	if (settings.manyToMany.length > 0) { codeSDK.push("// NOTE: C# SDK doesn't support Many To Many Relationships with the Retrieve request"); }
	
	var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
	if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }
	
	var pre = '"';
	var fieldLogicalNames = settings.fields.map(function (field) { return field.logicalName; });
	var preList = (pre + fieldLogicalNames.join('"|' + pre)).split('|');
	var columnsValue = 'ColumnSet columns = new ColumnSet(' + preList.join(", ") + '");';
	
	if (settings.useAlternateKey === true) {
		var alternateKey = DRB.GenerateCode.GetSDKAlternateKeys(settings);
		codeSDK = codeSDK.concat(alternateKey);
		codeSDK.push(columnsValue);
		codeSDK.push('');
		codeSDK.push('RetrieveRequest retrieveRequest = new RetrieveRequest');
		codeSDK.push('{');
		codeSDK.push('\tColumnSet = columns,');
		codeSDK.push('\tTarget = new EntityReference("' + settings.primaryEntity.logicalName + '", alternateKey)');
		codeSDK.push('};');
		codeSDK.push('RetrieveResponse retrieveResponse = (RetrieveResponse)' + methodCodeAlternate + '(retrieveRequest);');
		codeSDK.push('Entity result = retrieveResponse.Entity;');
		
	} else {
		codeSDK.push('Guid id = new Guid("' + settings.primaryId + '");');
		codeSDK.push(columnsValue);
		codeSDK.push('Entity result = ' + methodCode + '("' + settings.primaryEntity.logicalName + '", id, columns);');
	}
	
	// Code Fields
    var getCodeFields = DRB.GenerateCode.GetSDKCodeFields(settings, "retrievesingle");
    var codeFields = getCodeFields[0];
	codeSDK.push(codeFields.join('\n'));
	// #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, codeFetchXML, codeSDK);
}

/**
 * Generate Code - Retrieve Multiple
 */
DRB.GenerateCode.RetrieveMultiple = function () {
    // Get the settings of the request
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
    var codePortals = [];
    var codeFetchXML = [];
	var codeSDK = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);
        codeFetchXML.push(errorMessage);
		codeSDK.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, codeFetchXML, codeSDK);
        return;
    }

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

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);
	var portalsHeaders = DRB.GenerateCode.GetPortalsRequestHeaders(settings);
    // Code Fields
    var getCodeFields = DRB.GenerateCode.GetCodeFields(settings);
    var codeFields = getCodeFields[0];
    var codeFieldsFormatted = getCodeFields[1];

    // Xrm.WebApi url parameter
    var urlFieldsXrmWebApi = '';
    if (urlFields !== '') { urlFieldsXrmWebApi = ', "' + urlFields; }

    if (DRB.Utilities.HasValue(settings.topCount)) {
        if (urlFieldsXrmWebApi === '') { urlFieldsXrmWebApi += ', "?'; } else { urlFieldsXrmWebApi += '&'; }
        urlFieldsXrmWebApi += '$top=' + settings.topCount;
    }
    if (urlFieldsXrmWebApi !== '') { urlFieldsXrmWebApi += '"'; }

    // Main Url for jQuery/XMLHttpRequest (after the Xrm.WebApi url parameter)
    if (settings.retrieveCount === true) {
        if (urlFields === '') { urlFields = '?'; } else { urlFields += '&'; }
        urlFields += '$count=true';
    }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + urlFields;
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + urlFields;

    // Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('// NOTE: retrieveMultipleRecords is available in online mode, if you need this functionality change the call to Xrm.WebApi.online.retrieveMultipleRecords');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online');
    codeXrmWebApi.push('// NOTE: retrieveMultipleRecords is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.retrieveMultipleRecords');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');
    codeXrmWebApi.push('Xrm.WebApi.retrieveMultipleRecords("' + settings.primaryEntity.logicalName + '"' + urlFieldsXrmWebApi + ').then(');
    codeXrmWebApi.push('\tfunction success(results) {');
    codeXrmWebApi.push('\t\tconsole.log(results);');
    codeXrmWebApi.push('\t\tfor (var i = 0; i < results.entities.length; i++) {');
    codeXrmWebApi.push('\t\t\tvar result = results.entities[i];');
    var codeFieldsXrmWebApi = [];
    codeFieldsFormatted.forEach(function (codeField) { codeFieldsXrmWebApi.push('\t\t\t' + codeField); });
    codeXrmWebApi.push(codeFieldsXrmWebApi.join('\n'));
    codeXrmWebApi.push('\t\t}');
    codeXrmWebApi.push('\t},');
    codeXrmWebApi.push('\tfunction(error) {');
    codeXrmWebApi.push('\t\tconsole.log(error.message);');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(');');
    // End Xrm.WebApi

    // jQuery
    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "GET",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tvar results = data;');
    codejQuery.push('\t\tconsole.log(results);');
    if (settings.retrieveCount === true) { codejQuery.push('\t\tvar odata_count = results["@odata.count"];'); }
    if (DRB.Utilities.HasValue(settings.topCount)) { codejQuery.push('\t\tvar odata_nextlink = results["@odata.nextLink"];'); }
    codejQuery.push('\t\tfor (var i = 0; i < results.value.length; i++) {');
    codejQuery.push('\t\t\tvar result = results.value[i];');
    if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codejQuery.push('\t\t\t' + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codejQuery.push('\t\t\t' + codeField); });
    }
    codejQuery.push('\t\t}');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // End jQuery

    // XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
    codeXMLHttpRequest.push('\t\t\tvar results = JSON.parse(this.response);');
    codeXMLHttpRequest.push('\t\t\tconsole.log(results);');
    if (settings.retrieveCount === true) { codeXMLHttpRequest.push('\t\t\tvar odata_count = results["@odata.count"];'); }
    if (DRB.Utilities.HasValue(settings.topCount)) { codeXMLHttpRequest.push('\t\t\tvar odata_nextlink = results["@odata.nextLink"];'); }
    codeXMLHttpRequest.push('\t\t\tfor (var i = 0; i < results.value.length; i++) {');
    codeXMLHttpRequest.push('\t\t\t\tvar result = results.value[i];');
    if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codeXMLHttpRequest.push('\t\t\t\t' + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codeXMLHttpRequest.push('\t\t\t\t' + codeField); });
    }
    codeXMLHttpRequest.push('\t\t\t}');
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // End XMLHttpRequest

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    codeFetchAPI.push('\tmethod: "GET",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t}');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
    codeFetchAPI.push('\t}');
    codeFetchAPI.push(').then(function (responseObjects) {');
    codeFetchAPI.push('\tvar response = responseObjects[0];');
    codeFetchAPI.push('\tvar responseBody = responseObjects[1];');
    codeFetchAPI.push('\tvar results = responseBody;');
    codeFetchAPI.push('\tconsole.log(results);');
    if (settings.retrieveCount === true) { codeFetchAPI.push('\tvar odata_count = results["@odata.count"];'); }
    if (DRB.Utilities.HasValue(settings.topCount)) { codeFetchAPI.push('\tvar odata_nextlink = results["@odata.nextLink"];'); }
    codeFetchAPI.push('\tfor (var i = 0; i < results.value.length; i++) {');
    codeFetchAPI.push('\t\tvar result = results.value[i];');
    if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codeFetchAPI.push('\t\t' + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codeFetchAPI.push('\t\t' + codeField); });
    }
    codeFetchAPI.push('\t}');
    codeFetchAPI.push('}).catch(function (error) {');
    codeFetchAPI.push('\tconsole.log(error.message);');
    codeFetchAPI.push('});');
    // #endregion

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "GET",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tcontentType: "application/json",');
	if (portalsHeaders.length > 0) {
	    codePortals.push('\theaders: {');
		portalsHeaders.forEach(function (reqHeader) { codePortals.push('\t\t' + reqHeader); });
		codePortals.push('\t},');
	}
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tvar results = data;');
    codePortals.push('\t\tconsole.log(results);');
    if (settings.retrieveCount === true) { codePortals.push('\t\tvar odata_count = results["@odata.count"];'); }
    codePortals.push('\t\tfor (var i = 0; i < results.value.length; i++) {');
    codePortals.push('\t\t\tvar result = results.value[i];');
	
	if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codePortals.push('\t\t\t' + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codePortals.push('\t\t\t' + codeField); });
    }
    codePortals.push('\t\t}');
    codePortals.push('\t},');
    codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
    codePortals.push('\t\tconsole.log(xhr);');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    // #region FetchXML
    var fetchXMLBeginTable = DRB.GenerateCode.GetFetchXMLBeginTable(settings);
    fetchXMLBeginTable.forEach(function (beginTable) { codeFetchXML.push(beginTable); });

    var fetchXMLColumns = DRB.GenerateCode.GetFetchXMLColumns(settings);
    fetchXMLColumns.forEach(function (fetchXMLColumn) { codeFetchXML.push('\t\t' + fetchXMLColumn); });

    var fetchXMLFilters = DRB.GenerateCode.GetFetchXMLFilters(settings);
    fetchXMLFilters.forEach(function (fetchXMLFilter) { codeFetchXML.push('\t\t' + fetchXMLFilter); });

    var requiredRelationships = DRB.GenerateCode.GetFetchXMLFilterRelationships(settings);
    var clonedSettings = JSON.parse(JSON.stringify(settings));

    if (requiredRelationships.length > 0) {
        requiredRelationships.forEach(function (requiredRelationship) {
            var relationshipFound = false;
            clonedSettings.manyToOne.forEach(function (manyToOne) {
                if (requiredRelationship.schemaName === manyToOne.schemaName) { relationshipFound = true; }
            });

            if (relationshipFound === false) {
                clonedSettings.manyToOne.push({ fields: [{ logicalName: requiredRelationship.targetEntityPrimaryIdField }], targetEntity: requiredRelationship.targetEntity, targetEntityPrimaryIdField: requiredRelationship.targetEntityPrimaryIdField, navigationAttribute: requiredRelationship.navigationAttribute, navigationProperty: requiredRelationship.navigationProperty });
            }
        });
    }

    var fetchXMLRelationships = DRB.GenerateCode.GetFetchXMLRelationships(clonedSettings, true);
    fetchXMLRelationships.forEach(function (fetchXMLRelationship) { codeFetchXML.push('\t\t' + fetchXMLRelationship); });

    var fetchXMLOrderBy = DRB.GenerateCode.GetFetchXMLOrderBy(settings);
    fetchXMLOrderBy.forEach(function (orderBy) { codeFetchXML.push('\t\t' + orderBy); });

    var fetchXMLEndTable = DRB.GenerateCode.GetFetchXMLEndTable();
    fetchXMLEndTable.forEach(function (endTable) { codeFetchXML.push(endTable); });
    // #endregion
	
	
		// #region SDK
	var methodCode = "service.RetrieveMultiple";
	if (settings.async === true) { methodCode = "await service.RetrieveMultipleAsync"; }
	
	codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
	var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
	if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }
	
	var pre = '"';
	var fieldLogicalNames = settings.fields.map(function (field) { return field.logicalName; });
	var preList = (pre + fieldLogicalNames.join('"|' + pre)).split('|');
	var columnsValue = 'query.ColumnSet = new ColumnSet(' + preList.join(", ") + '");';
	
	codeSDK.push('QueryExpression query = new QueryExpression("' + settings.primaryEntity.logicalName + '");');
	if (DRB.Utilities.HasValue(settings.topCount)) {
		codeSDK.push('query.TopCount = '+ settings.topCount + ';');
	}
	codeSDK.push(columnsValue);
	
	if (settings.oneToMany.length > 0) { codeSDK.push('// One To Many Relationships'); }
	settings.oneToMany.forEach(function (rel) {
		codeSDK.push('// - ' + rel.schemaName);
		var preColumn = '"';
		var fieldColumnLogicalNames = rel.fields.map(function (field) { return field.logicalName; });
		var preColumnList = (preColumn + fieldColumnLogicalNames.join('"|' + preColumn)).split('|');
		var relColumnsValue = '1n_' + rel.schemaName + '.Columns.AddColumns(' + preColumnList.join(", ") + '");';
		codeSDK.push('LinkEntity 1n_' + rel.schemaName + ' = query.AddLink("' + rel.targetEntity + '", "' + settings.primaryIdField + '", " ' + rel.targetEntityPrimaryIdField + '");');
		codeSDK.push('1n_' + rel.schemaName + '.EntityAlias = "1n_' + rel.schemaName + '";');
		codeSDK.push(relColumnsValue);
	});
	
	if (settings.manyToOne.length > 0) { codeSDK.push('// Many To One Relationships'); }
	settings.manyToOne.forEach(function (rel) {
		codeSDK.push('// - ' + rel.schemaName);
		var preColumn = '"';
		var fieldColumnLogicalNames = rel.fields.map(function (field) { return field.logicalName; });
		var preColumnList = (preColumn + fieldColumnLogicalNames.join('"|' + preColumn)).split('|');
		var relColumnsValue = 'n1_' + rel.schemaName + '.Columns.AddColumns(' + preColumnList.join(", ") + '");';
		codeSDK.push('LinkEntity n1_' + rel.schemaName + ' = query.AddLink("' + rel.targetEntity + '", "' + rel.navigationAttribute + '", " ' + rel.targetEntityPrimaryIdField + '");');
		codeSDK.push('n1_' + rel.schemaName + '.EntityAlias = "n1_' + rel.schemaName + '";');
		codeSDK.push(relColumnsValue);
	});

	if (settings.manyToMany.length > 0) { codeSDK.push('// Many To Many Relationships'); }
	settings.manyToMany.forEach(function (rel) {
		codeSDK.push('// - ' + rel.schemaName);
		var preColumn = '"';
		var fieldColumnLogicalNames = rel.fields.map(function (field) { return field.logicalName; });
		var preColumnList = (preColumn + fieldColumnLogicalNames.join('"|' + preColumn)).split('|');
		var relColumnsValue = 'nn_' + rel.schemaName + '.Columns.AddColumns(' + preColumnList.join(", ") + '");';
		codeSDK.push('LinkEntity nn_' + rel.schemaName + ' = query.AddLink("' + rel.targetEntity + '", "' + settings.primaryIdField + '", " ' + rel.targetEntityPrimaryIdField + '");');
		codeSDK.push('nn_' + rel.schemaName + '.EntityAlias = "nn_' + rel.schemaName + '";');
		codeSDK.push(relColumnsValue);
	});
	
	if (settings.orderFields.length > 0) { codeSDK.push('// Orders'); }
	settings.orderFields.forEach(function (orderField) {
		var order = "OrderType.Ascending";
		if (orderField.value === "desc") { order = "OrderType.Descending"; }
		codeSDK.push('query.AddOrder("' + orderField.logicalName + '", ' + order + ');');
	});
	
	codeSDK.push('EntityCollection resultCollection = ' + methodCode + '(query);');
	codeSDK.push('');
	codeSDK.push('foreach (Entity result in resultCollection.Entities) {');
	
	// Code Fields
    var getCodeFields = DRB.GenerateCode.GetSDKCodeFields(settings, "retrievesingle");
    var codeFields = getCodeFields[0];
    codeFields.forEach(function (codeField) { codeSDK.push('\t' + codeField); });
	codeSDK.push('}');
	// #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, codeFetchXML, codeSDK);
}

/**
 * Generate Code - Create
 */
DRB.GenerateCode.Create = function () {
    // get settings from configuration
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codeXrmWebApiExecute = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
    var codePortals = [];
	var codeSDK = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);
		codeSDK.push(errorMessage);
		
        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
        return;
    }

    var urlFields = '';
    var codeFields = [];
    var codeFieldsFormatted = [];

    if (settings.returnRecord === true) {
        urlFields = DRB.GenerateCode.GetUrlFields(settings);
        var getCodeFields = DRB.GenerateCode.GetCodeFields(settings);
        codeFields = getCodeFields[0];
        codeFieldsFormatted = getCodeFields[1];
    }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + urlFields;
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + urlFields;

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);
    // Code Entity
    var codeEntity = DRB.GenerateCode.GetCodeEntity(settings);

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('// NOTE: createRecord is available in online mode, if you need this functionality change the call to Xrm.WebApi.online.createRecord');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online');
    codeXrmWebApi.push('// NOTE: createRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.createRecord');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');

    codeEntity.forEach(function (line) { codeXrmWebApi.push(line); });
    codeXrmWebApi.push('Xrm.WebApi.createRecord("' + settings.primaryEntity.logicalName + '", record).then(');
    codeXrmWebApi.push('\tfunction success(result) {');
    codeXrmWebApi.push('\t\tvar newId = result.id;');
    codeXrmWebApi.push('\t\tconsole.log(newId);');
    codeXrmWebApi.push('\t},');
    codeXrmWebApi.push('\tfunction(error) {');
    codeXrmWebApi.push('\t\tconsole.log(error.message);');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(');');
    // #endregion

    // #region Xrm.WebApi.execute
    codeXrmWebApiExecute = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApiExecute.push('// NOTE: you can use Xrm.WebApi.execute if this request needs to be part of an executeMultiple collection');
    codeXrmWebApiExecute.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple');
    // add Code Entity
    codeEntity.forEach(function (line) { codeXrmWebApiExecute.push(line); });
    codeXrmWebApiExecute.push('var createRequest = {');
    codeXrmWebApiExecute.push('\tetn: "' + settings.primaryEntity.logicalName + '",');
    codeXrmWebApiExecute.push('\tpayload: record,');
    codeXrmWebApiExecute.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Create" }; }');
    codeXrmWebApiExecute.push('};');
    codeXrmWebApiExecute.push('');

    codeXrmWebApiExecute.push('Xrm.WebApi.execute(createRequest).then(');
    codeXrmWebApiExecute.push('\tfunction success(response) {');
    codeXrmWebApiExecute.push('\t\tif (response.ok) {');
    codeXrmWebApiExecute.push('\t\t\tconsole.log("Record created");');
    codeXrmWebApiExecute.push('\t\t}');
    codeXrmWebApiExecute.push('\t}');

    codeXrmWebApiExecute.push(').catch(function (error) {');
    codeXrmWebApiExecute.push('\tconsole.log(error.message);');
    codeXrmWebApiExecute.push('});');
    // #endregion

    // #region jQuery
    codeEntity.forEach(function (line) { codejQuery.push(line); });
    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "POST",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tdata: JSON.stringify(record),');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');

    if (settings.returnRecord === true) {
        codejQuery.push('\t\tvar result = data;');
        codejQuery.push('\t\tconsole.log(result);');
        if (settings.formattedValues === true) { codeFieldsFormatted.forEach(function (codeField) { codejQuery.push('\t\t' + codeField); }); }
        else { codeFields.forEach(function (codeField) { codejQuery.push('\t\t' + codeField); }); }
    } else {
        codejQuery.push('\t\tvar uri = xhr.getResponseHeader("OData-EntityId");');
        codejQuery.push('\t\tvar regExp = /\\(([^)]+)\\)/;');
        codejQuery.push('\t\tvar matches = regExp.exec(uri);');
        codejQuery.push('\t\tvar newId = matches[1];');
        codejQuery.push('\t\tconsole.log(newId);');
    }
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeEntity.forEach(function (line) { codeXMLHttpRequest.push(line); });
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');

    if (settings.returnRecord === true) {
        codeXMLHttpRequest.push('\t\tif (this.status === 201) {');
        codeXMLHttpRequest.push('\t\t\tvar result = JSON.parse(this.response);');
        codeXMLHttpRequest.push('\t\t\tconsole.log(result);');
        if (settings.formattedValues === true) { codeFieldsFormatted.forEach(function (codeField) { codeXMLHttpRequest.push('\t\t\t' + codeField); }); }
        else { codeFields.forEach(function (codeField) { codeXMLHttpRequest.push('\t\t\t' + codeField); }); }
    } else {
        codeXMLHttpRequest.push('\t\tif (this.status === 204) {');
        codeXMLHttpRequest.push('\t\t\tvar uri = req.getResponseHeader("OData-EntityId");');
        codeXMLHttpRequest.push('\t\t\tvar regExp = /\\(([^)]+)\\)/;');
        codeXMLHttpRequest.push('\t\t\tvar matches = regExp.exec(uri);');
        codeXMLHttpRequest.push('\t\t\tvar newId = matches[1];');
        codeXMLHttpRequest.push('\t\t\tconsole.log(newId);');
    }

    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send(JSON.stringify(record));');
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    codeEntity.forEach(function (line) { codeFetchAPI.push(line); });
    codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    codeFetchAPI.push('\tmethod: "POST",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t},');
    codeFetchAPI.push('\tbody: JSON.stringify(record)');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    if (settings.returnRecord === true) {
        codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
        codeFetchAPI.push('\t}');
        codeFetchAPI.push(').then(function (responseObjects) {');
        codeFetchAPI.push('\tvar response = responseObjects[0];');
        codeFetchAPI.push('\tvar responseBody = responseObjects[1];');
        codeFetchAPI.push('\tvar result = responseBody;');
        codeFetchAPI.push('\tconsole.log(result);');

        if (settings.formattedValues === true) {
            codeFieldsFormatted.forEach(function (codeField) { codeFetchAPI.push('\t' + codeField); });
        } else {
            codeFields.forEach(function (codeField) { codeFetchAPI.push('\t' + codeField); });
        }

        codeFetchAPI.push('}).catch(function (error) {');
        codeFetchAPI.push('\tconsole.log(error.message);');
        codeFetchAPI.push('});');
    } else {
        codeFetchAPI.push('\t\tif (response.ok) {');
        codeFetchAPI.push('\t\t\tvar uri = response.headers.get("OData-EntityId");');
        codeFetchAPI.push('\t\t\tvar regExp = /\\(([^)]+)\\)/;');
        codeFetchAPI.push('\t\t\tvar matches = regExp.exec(uri);');
        codeFetchAPI.push('\t\t\tvar newId = matches[1];');
        codeFetchAPI.push('\t\t\tconsole.log(newId);');
        codeFetchAPI.push('\t\t} else {');
        codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
        codeFetchAPI.push('\t\t}');
        codeFetchAPI.push('\t}');
        codeFetchAPI.push(').catch(function (error) {');
        codeFetchAPI.push('\tconsole.log(error.message);');
        codeFetchAPI.push('});');
    }
    // #endregion

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codeEntity.forEach(function (line) { codePortals.push(line); });
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "POST",');
    codePortals.push('\tcontentType: "application/json",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tdata: JSON.stringify(record),');
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tvar newId = xhr.getResponseHeader("entityid");');
    codePortals.push('\t\tconsole.log(newId);');
    codePortals.push('\t},');
    codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
    codePortals.push('\t\tconsole.log(xhr);');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion
	
	// #region SDK
	var methodCode = "service.Create";
	if (settings.async === true) { methodCode = "await service.CreateAsync"; }
	
	codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
	var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
	if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }
	
	codeSDK.push('Entity record = new Entity("' + settings.primaryEntity.logicalName + '");');
	var codeEntity = DRB.GenerateCode.GetSDKCodeEntity(settings);
	codeSDK = codeSDK.concat(codeEntity);
	codeSDK.push('Guid id = ' + methodCode + '(record);');
	// #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
}

/**
 * Generate Code - Update
 */
DRB.GenerateCode.Update = function () {
    // get settings from configuration
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codeXrmWebApiExecute = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
    var codePortals = [];
	var codeSDK = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);
		codeSDK.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
        return;
    }
    var urlFields = '';
    var codeFields = [];
    var codeFieldsFormatted = [];

    if (settings.returnRecord === true) {
        urlFields = DRB.GenerateCode.GetUrlFields(settings);
        var getCodeFields = DRB.GenerateCode.GetCodeFields(settings);
        codeFields = getCodeFields[0];
        codeFieldsFormatted = getCodeFields[1];
    }
    var entityCriteria = settings.primaryId;
    if (settings.useAlternateKey === true) { entityCriteria = DRB.GenerateCode.GetAlternateKeys(settings); }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")" + urlFields;
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")" + urlFields;

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);
    // Code Entity
    var codeEntity = DRB.GenerateCode.GetCodeEntity(settings);

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('// NOTE: updateRecord is available in online mode, if you need this functionality change the call to Xrm.WebApi.online.updateRecord');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online');
    codeXrmWebApi.push('// NOTE: updateRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.updateRecord');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');

    codeEntity.forEach(function (line) { codeXrmWebApi.push(line); });
    var entityCriteriaXrmWebApi = entityCriteria;
    if (settings.useAlternateKey === true) { entityCriteriaXrmWebApi = ""; }
    codeXrmWebApi.push('Xrm.WebApi.updateRecord("' + settings.primaryEntity.logicalName + '", "' + entityCriteriaXrmWebApi + '", record).then(');
    codeXrmWebApi.push('\tfunction success(result) {');
    codeXrmWebApi.push('\t\tvar updatedId = result.id;');
    codeXrmWebApi.push('\t\tconsole.log(updatedId);');
    codeXrmWebApi.push('\t},');
    codeXrmWebApi.push('\tfunction(error) {');
    codeXrmWebApi.push('\t\tconsole.log(error.message);');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(');');
    // #endregion

    // #region Xrm.WebApi.execute
    codeXrmWebApiExecute = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApiExecute.push('// NOTE: you can use Xrm.WebApi.execute if this request needs to be part of an executeMultiple collection');
    codeXrmWebApiExecute.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple');

    codeEntity.forEach(function (line) { codeXrmWebApiExecute.push(line); });
    codeXrmWebApiExecute.push('var updateRequest = {');
    codeXrmWebApiExecute.push('\tetn: "' + settings.primaryEntity.logicalName + '",');
    codeXrmWebApiExecute.push('\tid: "' + entityCriteriaXrmWebApi + '",');
    codeXrmWebApiExecute.push('\tpayload: record,');
    codeXrmWebApiExecute.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Update" }; }');
    codeXrmWebApiExecute.push('};');
    codeXrmWebApiExecute.push('');
    codeXrmWebApiExecute.push('Xrm.WebApi.execute(updateRequest).then(');
    codeXrmWebApiExecute.push('\tfunction success(response) {');
    codeXrmWebApiExecute.push('\t\tif (response.ok) {');
    codeXrmWebApiExecute.push('\t\t\tconsole.log("Record updated");');
    codeXrmWebApiExecute.push('\t\t}');
    codeXrmWebApiExecute.push('\t}');
    codeXrmWebApiExecute.push(').catch(function (error) {');
    codeXrmWebApiExecute.push('\tconsole.log(error.message);');
    codeXrmWebApiExecute.push('});');
    // #endregion

    // #region jQuery
    codeEntity.forEach(function (line) { codejQuery.push(line); });

    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "PATCH",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tdata: JSON.stringify(record),');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    if (settings.returnRecord === true) {
        codejQuery.push('\t\tvar result = data;');
        codejQuery.push('\t\tconsole.log(result);');
        var codeFieldsJQuery = [];
        if (settings.formattedValues === true) {
            codeFieldsFormatted.forEach(function (codeField) { codeFieldsJQuery.push('\t\t' + codeField); });
        } else {
            codeFields.forEach(function (codeField) { codeFieldsJQuery.push('\t\t' + codeField); });
        }
        codejQuery.push(codeFieldsJQuery.join('\n'));
    } else {
        codejQuery.push('\t\tconsole.log("Record updated");');
    }
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeEntity.forEach(function (line) { codeXMLHttpRequest.push(line); });

    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("PATCH", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');

    if (settings.returnRecord === true) {
        codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
        codeXMLHttpRequest.push('\t\t\tvar result = JSON.parse(this.response);');
        codeXMLHttpRequest.push('\t\t\tconsole.log(result);');
        if (settings.formattedValues === true) {
            codeFieldsFormatted.forEach(function (codeField) { codeXMLHttpRequest.push('\t\t\t' + codeField); });
        } else {
            codeFields.forEach(function (codeField) { codeXMLHttpRequest.push('\t\t\t' + codeField); });
        }
    } else {
        codeXMLHttpRequest.push('\t\tif (this.status === 204) {');
        codeXMLHttpRequest.push('\t\t\tconsole.log("Record updated");');
    }
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send(JSON.stringify(record));');
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    codeEntity.forEach(function (line) { codeFetchAPI.push(line); });
    codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    codeFetchAPI.push('\tmethod: "PATCH",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t},');
    codeFetchAPI.push('\tbody: JSON.stringify(record)');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    if (settings.returnRecord === true) {
        codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
        codeFetchAPI.push('\t}');
        codeFetchAPI.push(').then(function (responseObjects) {');
        codeFetchAPI.push('\tvar response = responseObjects[0];');
        codeFetchAPI.push('\tvar responseBody = responseObjects[1];');
        codeFetchAPI.push('\tvar result = responseBody;');
        codeFetchAPI.push('\tconsole.log(result);');

        if (settings.formattedValues === true) {
            codeFieldsFormatted.forEach(function (codeField) { codeFetchAPI.push('\t' + codeField); });
        } else {
            codeFields.forEach(function (codeField) { codeFetchAPI.push('\t' + codeField); });
        }

        codeFetchAPI.push('}).catch(function (error) {');
        codeFetchAPI.push('\tconsole.log(error.message);');
        codeFetchAPI.push('});');
    } else {
        codeFetchAPI.push('\t\tif (response.ok) {');
        codeFetchAPI.push('\t\t\tconsole.log("Record updated");');
        codeFetchAPI.push('\t\t} else {');
        codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
        codeFetchAPI.push('\t\t}');
        codeFetchAPI.push('\t}');
        codeFetchAPI.push(').catch(function (error) {');
        codeFetchAPI.push('\tconsole.log(error.message);');
        codeFetchAPI.push('});');
    }
    // #endregion

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codeEntity.forEach(function (line) { codePortals.push(line); });
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "PATCH",');
    codePortals.push('\tcontentType: "application/json",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tdata: JSON.stringify(record),');
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tconsole.log("Record updated");');
    codePortals.push('\t},');
    codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
    codePortals.push('\t\tconsole.log(xhr);');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion
	
	// #region SDK
	var methodCode = "service.Update";
	if (settings.async === true) { methodCode = "await service.UpdateAsync"; }
	
	codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
	var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
	if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }
	
	if (settings.useAlternateKey === true) {
		var alternateKey = DRB.GenerateCode.GetSDKAlternateKeys(settings);
		codeSDK = codeSDK.concat(alternateKey);
		codeSDK.push('Entity record = new Entity("' + settings.primaryEntity.logicalName + '", alternateKey)');
		
	} else {
		codeSDK.push('Entity record = new Entity("' + settings.primaryEntity.logicalName + '", new Guid("' + settings.primaryId + '"));');
	}
	
	var codeEntity = DRB.GenerateCode.GetSDKCodeEntity(settings);
	codeSDK = codeSDK.concat(codeEntity);
	codeSDK.push(methodCode + '(record);');
	// #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
}

/**
 * Generate Code - Delete
 */
DRB.GenerateCode.Delete = function () {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codeXrmWebApiExecute = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
    var codePortals = [];
	var codeSDK = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);
		codeSDK.push(errorMessage);
        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
        return;
    }

    var entityCriteria = settings.primaryId;
    if (settings.useAlternateKey === true) { entityCriteria = DRB.GenerateCode.GetAlternateKeys(settings); }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")";
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")";

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('// NOTE: deleteRecord is available in online mode, if you need this functionality change the call to Xrm.WebApi.online.deleteRecord');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online');
    codeXrmWebApi.push('// NOTE: deleteRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.deleteRecord');
    codeXrmWebApi.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');
    var entityCriteriaXrmWebApi = entityCriteria;
    if (settings.useAlternateKey === true) { entityCriteriaXrmWebApi = ""; }
    codeXrmWebApi.push('Xrm.WebApi.deleteRecord("' + settings.primaryEntity.logicalName + '", "' + entityCriteriaXrmWebApi + '").then(');
    codeXrmWebApi.push('\tfunction success(result) {');
    codeXrmWebApi.push('\t\tconsole.log(result);');
    codeXrmWebApi.push('\t},');
    codeXrmWebApi.push('\tfunction(error) {');
    codeXrmWebApi.push('\t\tconsole.log(error.message);');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(');');
    // #endregion

    // #region Xrm.WebApi.execute
    codeXrmWebApiExecute = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApiExecute.push('// NOTE: you can use Xrm.WebApi.execute if this request needs to be part of an executeMultiple collection');
    codeXrmWebApiExecute.push('// https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple');
    codeXrmWebApiExecute.push('var deleteRequest = {');
    codeXrmWebApiExecute.push('\tentityReference: { entityType: "' + settings.primaryEntity.logicalName + '", id: "' + entityCriteriaXrmWebApi + '" },');
    codeXrmWebApiExecute.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Delete" }; }');
    codeXrmWebApiExecute.push('};');
    codeXrmWebApiExecute.push('');
    codeXrmWebApiExecute.push('Xrm.WebApi.execute(deleteRequest).then(');
    codeXrmWebApiExecute.push('\tfunction success(response) {');
    codeXrmWebApiExecute.push('\t\tif (response.ok) {');
    codeXrmWebApiExecute.push('\t\t\tconsole.log("Record deleted");');
    codeXrmWebApiExecute.push('\t\t}');
    codeXrmWebApiExecute.push('\t}');
    codeXrmWebApiExecute.push(').catch(function (error) {');
    codeXrmWebApiExecute.push('\tconsole.log(error.message);');
    codeXrmWebApiExecute.push('});');
    // #endregion

    // #region jQuery
    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "DELETE",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tconsole.log("Record deleted");');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("DELETE", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 204 || this.status === 1223) {');
    codeXMLHttpRequest.push('\t\t\tconsole.log("Record deleted");');
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    codeFetchAPI.push('\tmethod: "DELETE",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t}');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    codeFetchAPI.push('\t\tif (response.ok) {');
    codeFetchAPI.push('\t\t\tconsole.log("Record deleted");');
    codeFetchAPI.push('\t\t} else {');
    codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
    codeFetchAPI.push('\t\t}');
    codeFetchAPI.push('\t}');
    codeFetchAPI.push(').catch(function (error) {');
    codeFetchAPI.push('\tconsole.log(error.message);');
    codeFetchAPI.push('});');
    // #endregion

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "DELETE",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tcontentType: "application/json",');
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tconsole.log("Record deleted");');
    codePortals.push('\t},');
    codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
    codePortals.push('\t\tconsole.log(xhr);');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion
	
	// #region SDK
	var methodCode = "service.Delete";
	if (settings.async === true) { methodCode = "await service.DeleteAsync"; }
	var methodCodeAlternate = "service.Execute";
	if (settings.async === true) { methodCodeAlternate = "await service.ExecuteAsync"; }
	
	codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
	var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
	if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }
	
	if (settings.useAlternateKey === true) {
		var alternateKey = DRB.GenerateCode.GetSDKAlternateKeys(settings);
		codeSDK = codeSDK.concat(alternateKey);
		codeSDK.push('DeleteRequest deleteRequest = new DeleteRequest');
		codeSDK.push('{');
		codeSDK.push('\tTarget = new EntityReference("' + settings.primaryEntity.logicalName + '", alternateKey)');
		codeSDK.push('};');
		codeSDK.push('DeleteResponse deleteResponse = (DeleteResponse)' + methodCodeAlternate + '(deleteRequest);');
		
	} else {
		codeSDK.push('Guid id = new Guid("' + settings.primaryId + '");');
		codeSDK.push(methodCode + '("' + settings.primaryEntity.logicalName + '", id);');
	}
	// #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
}

/**
 * Generate Code - Associate
 */
DRB.GenerateCode.Associate = function () {
    // Get the settings of the request
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
    var codePortals = [];
	var codeSDK = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.secondaryEntity)) {
        // Don't generate the code if a table is not selected

        var errorMessage = "";
        if (!DRB.Utilities.HasValue(settings.primaryEntity)) { errorMessage = "// Select a Parent Table first"; }
        else { errorMessage = "// Select a Child Table first"; }

        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);
		codeSDK.push(errorMessage);
        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
        return;
    }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "/$ref";
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "/$ref";

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);

    var codeAssociated = [];
    codeAssociated.push('var association = {');
    codeAssociated.push('\t"@odata.id": Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/' + settings.version + '/' + settings.secondaryEntity.entitySetName + '(' + settings.secondaryIds[0] + ')"');
    codeAssociated.push('};');

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);

    codeXrmWebApi.push("// NOTE: Associate Request in Xrm.WebApi supports multiple children, you can add them inside the relatedEntities array");
    codeXrmWebApi.push('var associateRequest = {');
    codeXrmWebApi.push('\ttarget: { entityType: "' + settings.primaryEntity.logicalName + '", id: "' + settings.primaryId + '" },');
    codeXrmWebApi.push('\trelatedEntities: [');
    settings.secondaryIds.forEach(function (secondaryId) {
        codeXrmWebApi.push('\t\t\t{ entityType: "' + settings.secondaryEntity.logicalName + '", id: "' + secondaryId + '" }');
    });
    codeXrmWebApi.push('\t],');
    codeXrmWebApi.push('\trelationship: "' + settings.relationship + '",');
    codeXrmWebApi.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Associate" }; }');
    codeXrmWebApi.push('};');
    codeXrmWebApi.push('');
    codeXrmWebApi.push('Xrm.WebApi.execute(associateRequest).then(');
    codeXrmWebApi.push('\tfunction success(response) {');
    codeXrmWebApi.push('\t\tif (response.ok) {');
    codeXrmWebApi.push('\t\t\tconsole.log("Success");');
    codeXrmWebApi.push('\t\t}');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(').catch(function (error) {');
    codeXrmWebApi.push('\tconsole.log(error.message);');
    codeXrmWebApi.push('});');
    // #endregion

    // #region jQuery
    codeAssociated.forEach(function (associated) { codejQuery.push(associated); });
    codejQuery.push('');

    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "POST",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tdata: JSON.stringify(association),');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tconsole.log("Success");');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeAssociated.forEach(function (associated) { codeXMLHttpRequest.push(associated); });
    codeXMLHttpRequest.push('');

    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 204 || this.status === 1223) {');
    codeXMLHttpRequest.push('\t\t\tconsole.log("Success");');
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.statusText);'); // CHECK
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send(JSON.stringify(association));');
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    codeAssociated.forEach(function (associated) { codeFetchAPI.push(associated); });
    codeFetchAPI.push('');

    codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    codeFetchAPI.push('\tmethod: "POST",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t},');
    codeFetchAPI.push('\tbody: JSON.stringify(association)');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    codeFetchAPI.push('\t\tif (response.ok) {');
    codeFetchAPI.push('\t\t\tconsole.log("Success");');
    codeFetchAPI.push('\t\t} else {');
    codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
    codeFetchAPI.push('\t\t}');
    codeFetchAPI.push('\t}');
    codeFetchAPI.push(').catch(function (error) {');
    codeFetchAPI.push('\tconsole.log(error.message);');
    codeFetchAPI.push('});');
    // #endregion

    // #region Portals
    var portalsCodeAssociated = [];
    portalsCodeAssociated.push('var association = {');
    portalsCodeAssociated.push('\t"@odata.id": portalUri + "/_api/' + settings.secondaryEntity.entitySetName + '(' + settings.secondaryIds[0] + ')"');
    portalsCodeAssociated.push('};');

    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    portalsCodeAssociated.forEach(function (associated) { codePortals.push(associated); });
    codePortals.push('');
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "POST",');
    codePortals.push('\tcontentType: "application/json",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tdata: JSON.stringify(association),');
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tconsole.log("Success");');
    codePortals.push('\t},');
    codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
    codePortals.push('\t\tconsole.log(xhr);');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion
	
	// #region SDK
	codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
	codeSDK.push("// NOTE: Associate Request in C# SDK supports multiple children, you can add them inside the relatedReferences object");
	
	var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
	if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }
	
	
	codeSDK.push('Guid primaryId = new Guid("' + settings.primaryId + '");');
	codeSDK.push('Relationship relationship = new Relationship("' + settings.relationship + '");');
	codeSDK.push('EntityReferenceCollection relatedReferences = new EntityReferenceCollection();');
	codeSDK.push('relatedReferences.Add(new EntityReference("' + settings.secondaryEntity.logicalName + '", new Guid("' + settings.secondaryIds[0] + '"));');
	var methodCode = "service.Associate";
	if (settings.async === true) { methodCode = "await service.AssociateAsync"; }
	codeSDK.push(methodCode + '("' + settings.primaryEntity.logicalName + '", primaryId, relationship, relatedReferences);');
	// #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
}

/**
 * Generate Code - Disassociate
 */
DRB.GenerateCode.Disassociate = function () {
    // Get the settings of the request
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
    var codePortals = [];
	var codeSDK = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.secondaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "";
        if (!DRB.Utilities.HasValue(settings.primaryEntity)) { errorMessage = "// Select a Parent Table first"; }
        else { errorMessage = "// Select a Child Table first"; }

        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);
		codeSDK.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
        return;
    }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "(" + settings.secondaryIds[0] + ")/$ref";
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "(" + settings.secondaryIds[0] + ")/$ref";

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);
    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);

    codeXrmWebApi.push('var disassociateRequest = {');
    codeXrmWebApi.push('\ttarget: { entityType: "' + settings.primaryEntity.logicalName + '", id: "' + settings.primaryId + '" },');
    codeXrmWebApi.push('\trelatedEntityId : "' + settings.secondaryIds[0] + '",');
    codeXrmWebApi.push('\trelationship: "' + settings.relationship + '",');
    codeXrmWebApi.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Disassociate" }; }');
    codeXrmWebApi.push('};');
    codeXrmWebApi.push('');
    codeXrmWebApi.push('Xrm.WebApi.execute(disassociateRequest).then(');
    codeXrmWebApi.push('\tfunction success(response) {');
    codeXrmWebApi.push('\t\tif (response.ok) {');
    codeXrmWebApi.push('\t\t\tconsole.log("Success");');
    codeXrmWebApi.push('\t\t}');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(').catch(function (error) {');
    codeXrmWebApi.push('\tconsole.log(error.message);');
    codeXrmWebApi.push('});');
    // #endregion

    // #region jQuery
    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "DELETE",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tconsole.log("Success");');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("DELETE", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 204 || this.status === 1223) {');
    codeXMLHttpRequest.push('\t\t\tconsole.log("Success");');
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.statusText);'); // CHECK
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    codeFetchAPI.push('\tmethod: "DELETE",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t}');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    codeFetchAPI.push('\t\tif (response.ok) {');
    codeFetchAPI.push('\t\t\tconsole.log("Success");');
    codeFetchAPI.push('\t\t} else {');
    codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
    codeFetchAPI.push('\t\t}');
    codeFetchAPI.push('\t}');
    codeFetchAPI.push(').catch(function (error) {');
    codeFetchAPI.push('\tconsole.log(error.message);');
    codeFetchAPI.push('});');
    // #endregion

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "DELETE",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tcontentType: "application/json",');
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tconsole.log("Success");');
    codePortals.push('\t},');
    codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
    codePortals.push('\t\tconsole.log(xhr);');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion
	
		// #region SDK
	codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
	codeSDK.push("// NOTE: Disassociate Request in C# SDK supports multiple children, you can add them inside the relatedReferences object");
	
	var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
	if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }
	
	
	codeSDK.push('Guid primaryId = new Guid("' + settings.primaryId + '");');
	codeSDK.push('Relationship relationship = new Relationship("' + settings.relationship + '");');
	codeSDK.push('EntityReferenceCollection relatedReferences = new EntityReferenceCollection();');
	codeSDK.push('relatedReferences.Add(new EntityReference("' + settings.secondaryEntity.logicalName + '", new Guid("' + settings.secondaryIds[0] + '"));');
	var methodCode = "service.Disassociate";
	if (settings.async === true) { methodCode = "await service.DisassociateAsync"; }
	codeSDK.push(methodCode + '("' + settings.primaryEntity.logicalName + '", primaryId, relationship, relatedReferences);');
	// #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
}

/**
 * Generate Code - Retrieve NextLink
 */
DRB.GenerateCode.RetrieveNextLink = function () {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];

    var xrmWebApiUrl = settings.nextLink;
    if (xrmWebApiUrl.indexOf("?") > -1) {
        xrmWebApiUrl = xrmWebApiUrl.substring(xrmWebApiUrl.indexOf("?"));
    } else { xrmWebApiUrl = ""; }

    var mainUrl = settings.nextLink;
    if (settings.retrieveCount === true && mainUrl.indexOf("$count=true") === -1) {
        if (mainUrl.indexOf("?") === -1) { mainUrl += "?$count=true"; }
        else { mainUrl += "&$count=true"; }
    }

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);
    var primaryEntityName = '';
    if (DRB.Utilities.HasValue(settings.primaryEntity)) {
        primaryEntityName = settings.primaryEntity.logicalName;
    }
    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('Xrm.WebApi.retrieveMultipleRecords("' + primaryEntityName + '", "' + xrmWebApiUrl + '").then(');
    codeXrmWebApi.push('\tfunction success(result) {');
    codeXrmWebApi.push('\t\tconsole.log(result);');
    codeXrmWebApi.push('\t},');
    codeXrmWebApi.push('\tfunction (error) {');
    codeXrmWebApi.push('\t\tconsole.log(error.message);');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(');');
    // #endregion

    // #region jQuery
    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "GET",');
    codejQuery.push('\turl: "' + mainUrl + '",');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    var codejQueryIndent = '\t\t';
    if (settings.detectChanges === true) {
        codejQueryIndent += '\t';
        codejQuery.push('\t\tif (xhr.status === 304) {');
        codejQuery.push('\t\t\t// Handle data not changed');
        codejQuery.push('\t\t\tconsole.log("Record not changed");');
        codejQuery.push('\t\t} else {');
    }
    codejQuery.push(codejQueryIndent + 'var results = data;');
    codejQuery.push(codejQueryIndent + 'console.log(results);');
    if (settings.retrieveCount === true) { codejQuery.push(codejQueryIndent + 'var odata_count = results["@odata.count"];'); }
    if (settings.detectChanges === true) { codejQuery.push('\t\t}'); }
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("GET", "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
    codeXMLHttpRequest.push('\t\t\tvar results = JSON.parse(this.response);');
    codeXMLHttpRequest.push('\t\t\tconsole.log(results);');
    if (settings.retrieveCount === true) { codeXMLHttpRequest.push('\t\t\tvar odata_count = results["@odata.count"];'); }
    if (settings.detectChanges === true) {
        codeXMLHttpRequest.push('\t\t} else if (this.status === 304) {');
        codeXMLHttpRequest.push('\t\t\t// Handle data not changed');
        codeXMLHttpRequest.push('\t\t\tconsole.log("Record not changed");');
    }
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    codeFetchAPI.push('\tmethod: "GET",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t}');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
    codeFetchAPI.push('\t}');
    codeFetchAPI.push(').then(function (responseObjects) {');
    codeFetchAPI.push('\tvar response = responseObjects[0];');
    codeFetchAPI.push('\tvar responseBody = responseObjects[1];');

    if (settings.detectChanges === true) {
        codeFetchAPI.push('\tif (response.status === 304) {');
        codeFetchAPI.push('\t\t// Handle data not changed');
        codeFetchAPI.push('\t\tconsole.log("Record not changed");');
        codeFetchAPI.push('\t} else {');
        codeFetchAPI.push('\t\tvar results = responseBody;');
        codeFetchAPI.push('\t\tconsole.log(results);');
        if (settings.retrieveCount === true) { codeFetchAPI.push('\t\tvar odata_count = results["@odata.count"];'); }
        codeFetchAPI.push('\t}');
    } else {
        codeFetchAPI.push('\tvar results = responseBody;');
        codeFetchAPI.push('\tconsole.log(results);');
        if (settings.retrieveCount === true) { codeFetchAPI.push('\tvar odata_count = results["@odata.count"];'); }
    }

    codeFetchAPI.push('}).catch(function (error) {');
    codeFetchAPI.push('\tconsole.log(error.message);');
    codeFetchAPI.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, null);
}

/**
 * Generate Code - Predefined Query
 */
DRB.GenerateCode.PredefinedQuery = function () {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
	var codeSDK = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.queryType)) {
        // Don't generate the code if a table or a query type is not selected
        var errorMessage = "";
        if (!DRB.Utilities.HasValue(settings.primaryEntity)) { errorMessage = "// Select a Table first"; }
        else { errorMessage = "// Select a Query Type first"; }

        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
		codeSDK.push(errorMessage);
        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, null, null, codeSDK);
        return;
    }

    var queryParameter = "";
    switch (settings.queryType) {
        case "savedquery": queryParameter = '?savedQuery=' + settings.systemViewId; break;
        case "userquery": queryParameter = '?userQuery=' + settings.personalViewId; break;
        case "fetchxml": queryParameter = '?fetchXml=" + escapedFetchXML'; break;
    }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + queryParameter;

    if (settings.retrieveCount === true) {
        if (settings.queryType === "fetchxml") { mainUrl += " + \"&$count=true"; }
        else { mainUrl += "&$count=true"; }
    }

    var codeFetchXML = [];
    codeFetchXML.push('var originalFetchXML = `' + settings.fetchXML + '`;');
    codeFetchXML.push('var escapedFetchXML = encodeURIComponent(originalFetchXML);');

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);
    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    if (settings.queryType === "fetchxml") {
        codeFetchXML.forEach(function (lineFetchXML) { codeXrmWebApi.push(lineFetchXML); });
        codeXrmWebApi.push('');
    }
    if (settings.queryType !== "fetchxml") { queryParameter += '"'; }
    codeXrmWebApi.push('Xrm.WebApi.retrieveMultipleRecords("' + settings.primaryEntity.logicalName + '", "' + queryParameter + ').then(');
    codeXrmWebApi.push('\tfunction success(results) {');
    codeXrmWebApi.push('\t\tconsole.log(results);');
    codeXrmWebApi.push('\t},');
    codeXrmWebApi.push('\tfunction (error) {');
    codeXrmWebApi.push('\t\tconsole.log(error.message);');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(');');
    // #endregion

    // #region jQuery
    if (settings.queryType === "fetchxml") {
        codeFetchXML.forEach(function (lineFetchXML) { codejQuery.push(lineFetchXML); });
        codejQuery.push('');
    }
    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "GET",');
    if (settings.queryType === "fetchxml" && settings.retrieveCount !== true) {
        codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + ',');
    } else {
        codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    }
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tvar results = data;');
    if (settings.retrieveCount === true) { codejQuery.push('\t\tvar odata_count = results["@odata.count"];'); }
    codejQuery.push('\t\tconsole.log(results);');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    if (settings.queryType === "fetchxml") {
        codeFetchXML.forEach(function (lineFetchXML) { codeXMLHttpRequest.push(lineFetchXML); });
        codeXMLHttpRequest.push('');
    }
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    if (settings.queryType === "fetchxml" && settings.retrieveCount !== true) {
        codeXMLHttpRequest.push('req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + ', ' + settings.async + ');');
    } else {
        codeXMLHttpRequest.push('req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    }
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));

    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
    codeXMLHttpRequest.push('\t\t\tvar results = JSON.parse(this.response);');
    if (settings.retrieveCount === true) { codeXMLHttpRequest.push('\t\t\tvar odata_count = results["@odata.count"];'); }
    codeXMLHttpRequest.push('\t\t\tconsole.log(results);');
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    if (settings.queryType === "fetchxml") {
        codeFetchXML.forEach(function (lineFetchXML) { codeFetchAPI.push(lineFetchXML); });
        codeFetchAPI.push('');
    }
    if (settings.queryType === "fetchxml" && settings.retrieveCount !== true) {
        codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + ', {');
    } else {
        codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    }
    codeFetchAPI.push('\tmethod: "GET",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t}');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
    codeFetchAPI.push('\t}');
    codeFetchAPI.push(').then(function (responseObjects) {');
    codeFetchAPI.push('\tvar response = responseObjects[0];');
    codeFetchAPI.push('\tvar responseBody = responseObjects[1];');
    codeFetchAPI.push('\tvar result = responseBody;');
    codeFetchAPI.push('\tconsole.log(result);');
    codeFetchAPI.push('}).catch(function (error) {');
    codeFetchAPI.push('\tconsole.log(error.message);');
    codeFetchAPI.push('});');
    // #endregion
	
	// #region SDK
	codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
	var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
	if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }
	
	var methodCode = "service.RetrieveMultiple";
	var methodCodeView = "service.Retrieve";
	if (settings.async === true) {
		methodCode = "await service.RetrieveMultipleAsync";
		methodCodeView = "await service.RetrieveAsync";
	}
	
	var entityView = "";
	var entityId = "";
	
	switch (settings.queryType) {
        case "savedquery":
			entityView = "savedquery";
			entityId = settings.systemViewId;
			break;
        case "userquery":
		entityView = "userquery";
		entityId = settings.personalViewId;
		break;
    }
	
	if (entityView !== "") {
		codeSDK.push('Entity view = ' + methodCodeView + '("' + entityView + '", new Guid("' + entityId + '"), new ColumnSet("fetchxml"));');
		codeSDK.push('string fetchXML = view.GetAttributeValue<string>("fetchxml");');
	} else {
		var escapedQuoteFetchXML = settings.fetchXML.replaceAll('"', '""');
		codeSDK.push('string fetchXML = @"' + escapedQuoteFetchXML + '";');
	}
	codeSDK.push('');
	codeSDK.push('EntityCollection collection = ' + methodCode + '(new FetchExpression(fetchXML));');
	// #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, null, null, codeSDK);
}

/**
 * Generate Code - Dataverse Execute
 */
DRB.GenerateCode.DataverseExecute = function (requestType) {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.dataverseExecute)) {
        var errorMessage = "// Select a Table first";
        if (DRB.Utilities.HasValue(settings.primaryEntity) && !DRB.Utilities.HasValue(settings.dataverseExecute)) {
            switch (requestType) {
                case "executecustomapi": errorMessage = "// Select a Custom API first"; break;
                case "executecustomaction": errorMessage = "// Select a Custom Action first"; break;
                case "executeaction": errorMessage = "// Select an Action first"; break;
                case "executefunction": errorMessage = "// Select a Function first"; break;
            }
        }
        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, null);
        return;
    }

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);
    // isBound and isCollectionBound
    var isBound = false;
    var isCollectionBound = false;
    if (settings.primaryEntity.logicalName !== "none") { isBound = true; }
    // if the action is bounded and the first parameter is "entityset" then is "collection bound"
    // NOTE: this is a valid check because if a Custom Action is bounded to an entity (making isBound to true) the first parameter in that case is "entity" and not "entityset"
    if (isBound === true && settings.dataverseParameters.length > 0 && settings.dataverseParameters[0].name === "entityset") { isCollectionBound = true; }

    // check if there is at least one parameter
    // for jQuery and XMLHttpRequest (xhr) in case the request is bound the first parameter is inside the url and not inside the parameters list
    var xrmWebApiAddedParameters = false;
    var xhrAddedParameters = false;
    for (var i = 0; i < settings.dataverseParameters.length; i++) { if (settings.dataverseParameters[i].include === true) { xrmWebApiAddedParameters = true; break; } }
    if (isBound === false) { xhrAddedParameters = xrmWebApiAddedParameters; }
    else { for (var i = 1; i < settings.dataverseParameters.length; i++) { if (settings.dataverseParameters[i].include === true) { xhrAddedParameters = true; break; } } }

    // OperationType
    var operationType = settings.dataverseOperationType;

    //  mainUrl
    var mainUrl = "/api/data/" + settings.version + "/";
    if (isBound === true) {
        if (isCollectionBound === false) {
            var primaryId = "";
            if (DRB.Utilities.HasValue(settings.dataverseParameters[0].value.id)) { primaryId = settings.dataverseParameters[0].value.id; }
            mainUrl += settings.primaryEntity.entitySetName + "(" + primaryId + ")/Microsoft.Dynamics.CRM." + settings.dataverseExecute;
        }
        else { mainUrl += settings.primaryEntity.entitySetName + "/Microsoft.Dynamics.CRM." + settings.dataverseExecute; }
    } else { mainUrl += settings.dataverseExecute; }

    if (operationType === 1) {
        mainUrl += DRB.GenerateCode.GetFunctionUrl(settings);
    }

    // ReturnType
    var returnType = DRB.GenerateCode.GetReturnType(settings);

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('var execute_' + settings.dataverseExecute + '_Request = {');

    // parameters parsing for Xrm.WebApi
    if (xrmWebApiAddedParameters === true) {
        var codeParameters = DRB.GenerateCode.GetCodeParameters(settings, true);
        codeParameters.forEach(function (line) { codeXrmWebApi.push(line); });
    }

    var definitionParameters = DRB.GenerateCode.GetXrmWebApiDefinitionParameters(settings, isBound, isCollectionBound, xrmWebApiAddedParameters);
    definitionParameters.forEach(function (line) { codeXrmWebApi.push(line); });

    codeXrmWebApi.push('\t\t\toperationType: ' + operationType + ', operationName: "' + settings.dataverseExecute + '"');
    codeXrmWebApi.push('\t\t};');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push('};');
    codeXrmWebApi.push('');
    codeXrmWebApi.push('Xrm.WebApi.execute(execute_' + settings.dataverseExecute + '_Request).then(');
    codeXrmWebApi.push('\tfunction success(response) {');

    if (settings.dataverseReturnType !== null) {
        codeXrmWebApi.push('\t\tif (response.ok) { return response.json(); }');
        codeXrmWebApi.push('\t}');
        codeXrmWebApi.push(').then(function (responseBody) {');
        codeXrmWebApi.push('\tvar result = responseBody;');
        codeXrmWebApi.push('\tconsole.log(result);');

        returnType.forEach(function (line) { codeXrmWebApi.push('\t' + line); });

        codeXrmWebApi.push('}).catch(function (error) {');
        codeXrmWebApi.push('\tconsole.log(error.message);');
        codeXrmWebApi.push('});');
    } else {
        codeXrmWebApi.push('\t\tif (response.ok) { console.log("Success"); }');
        codeXrmWebApi.push('\t}');
        codeXrmWebApi.push(').catch(function (error) {');
        codeXrmWebApi.push('\tconsole.log(error.message);');
        codeXrmWebApi.push('});');
    }
    // #endregion

    // #region jQuery
    // Action, Custom Action, Custom API Action
    if (operationType === 0) {
        if (xhrAddedParameters === true) {
            var codeParameters = DRB.GenerateCode.GetCodeParameters(settings);
            codeParameters.forEach(function (line) { codejQuery.push(line); });
        }

        codejQuery.push('$.ajax({');
        codejQuery.push('\ttype: "POST",');
        codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
        codejQuery.push('\tasync: ' + settings.async + ',');
        codejQuery.push('\theaders: {');
        jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
        codejQuery.push('\t},');
        if (xhrAddedParameters === true) { codejQuery.push('\tdata: JSON.stringify(parameters),'); }
        codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
        if (settings.dataverseReturnType !== null) {
            codejQuery.push('\t\tvar result = data;');
            codejQuery.push('\t\tconsole.log(result);');
            returnType.forEach(function (line) { codejQuery.push('\t\t' + line); });
        } else {
            codejQuery.push('\t\tconsole.log("Success");');
        }
        codejQuery.push('\t},');
        codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
        codejQuery.push('\t\tconsole.log(xhr);');
        codejQuery.push('\t}');
        codejQuery.push('});');
    }

    // Function, Custom API Function
    if (operationType === 1) {
        codejQuery.push('$.ajax({');
        codejQuery.push('\ttype: "GET",');
        codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
        codejQuery.push('\tasync: ' + settings.async + ',');
        codejQuery.push('\theaders: {');
        jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
        codejQuery.push('\t},');
        codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
        if (settings.dataverseReturnType !== null) {
            codejQuery.push('\t\tvar result = data;');
            codejQuery.push('\t\tconsole.log(result);');
            returnType.forEach(function (line) { codejQuery.push('\t\t' + line); });
        } else {
            codejQuery.push('\t\tconsole.log("Success");');
        }
        codejQuery.push('\t},');
        codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
        codejQuery.push('\t\tconsole.log(xhr);');
        codejQuery.push('\t}');
        codejQuery.push('});');
    }
    // #endregion

    // #region XMLHttpRequest
    // Action, Custom Action, Custom API Action
    if (operationType === 0) {
        if (xhrAddedParameters === true) {
            var codeParameters = DRB.GenerateCode.GetCodeParameters(settings);
            codeParameters.forEach(function (line) { codeXMLHttpRequest.push(line); });
        }

        codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
        codeXMLHttpRequest.push('req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
        codeXMLHttpRequest.push(xhrHeaders.join('\n'));
        codeXMLHttpRequest.push('req.onreadystatechange = function () {');
        codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
        codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
        codeXMLHttpRequest.push('\t\tif (this.status === 200 || this.status === 204) {'); // 200 if there is returnType, 204 if no returnType

        if (settings.dataverseReturnType !== null) {
            codeXMLHttpRequest.push('\t\t\tvar result = JSON.parse(this.response);');
            codeXMLHttpRequest.push('\t\t\tconsole.log(result);');
            returnType.forEach(function (line) { codeXMLHttpRequest.push('\t\t\t' + line); });
        } else {
            codeXMLHttpRequest.push('\t\t\tconsole.log("Success");');
        }
        codeXMLHttpRequest.push('\t\t} else {');
        codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
        codeXMLHttpRequest.push('\t\t}');
        codeXMLHttpRequest.push('\t}');
        codeXMLHttpRequest.push('};');
        if (xhrAddedParameters === true) {
            codeXMLHttpRequest.push('req.send(JSON.stringify(parameters));');
        } else {
            codeXMLHttpRequest.push('req.send();');
        }
    }

    // Function, Custom API Function
    if (operationType === 1) {
        codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
        codeXMLHttpRequest.push('req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
        codeXMLHttpRequest.push(xhrHeaders.join('\n'));
        codeXMLHttpRequest.push('req.onreadystatechange = function () {');
        codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
        codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
        codeXMLHttpRequest.push('\t\tif (this.status === 200) {');

        if (settings.dataverseReturnType !== null) {
            codeXMLHttpRequest.push('\t\t\tvar result = JSON.parse(this.response);');
            codeXMLHttpRequest.push('\t\t\tconsole.log(result);');
            returnType.forEach(function (line) { codeXMLHttpRequest.push('\t\t\t' + line); });
        } else {
            codeXMLHttpRequest.push('\t\t\tconsole.log("Success");');
        }

        codeXMLHttpRequest.push('\t\t} else {');
        codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
        codeXMLHttpRequest.push('\t\t}');
        codeXMLHttpRequest.push('\t}');
        codeXMLHttpRequest.push('};');
        codeXMLHttpRequest.push('req.send();');
    }
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    // Action, Custom Action, Custom API Action
    if (operationType === 0) {
        if (xhrAddedParameters === true) {
            var codeParameters = DRB.GenerateCode.GetCodeParameters(settings);
            codeParameters.forEach(function (line) { codeFetchAPI.push(line); });
        }

        codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
        codeFetchAPI.push('\tmethod: "POST",');
        codeFetchAPI.push('\theaders: {');
        jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
		if (xhrAddedParameters === true) {
			codeFetchAPI.push('\t},');
			codeFetchAPI.push('\tbody: JSON.stringify(parameters)');
		} else {
			codeFetchAPI.push('\t}');			
		}
        codeFetchAPI.push('}).then(');
        codeFetchAPI.push('\tfunction success(response) {');
        if (settings.dataverseReturnType !== null) {
            codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
            codeFetchAPI.push('\t}');
            codeFetchAPI.push(').then(function (responseObjects) {');
            codeFetchAPI.push('\tvar response = responseObjects[0];');
            codeFetchAPI.push('\tvar responseBody = responseObjects[1];');
            codeFetchAPI.push('\tvar result = responseBody;');
            codeFetchAPI.push('\tconsole.log(result);');
            returnType.forEach(function (line) { codeFetchAPI.push('\t' + line); });
            codeFetchAPI.push('}).catch(function (error) {');
            codeFetchAPI.push('\tconsole.log(error.message);');
            codeFetchAPI.push('});');
        } else {
            codeFetchAPI.push('\t\tif (response.ok) {');
            codeFetchAPI.push('\t\t\tconsole.log("Success");');
            codeFetchAPI.push('\t\t} else {');
            codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
            codeFetchAPI.push('\t\t}');
            codeFetchAPI.push('\t}');
            codeFetchAPI.push(').catch(function (error) {');
            codeFetchAPI.push('\tconsole.log(error.message);');
            codeFetchAPI.push('});');
        }
    }

    // Function, Custom API Function
    if (operationType === 1) {
        codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
        codeFetchAPI.push('\tmethod: "GET",');
        codeFetchAPI.push('\theaders: {');
        jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
        codeFetchAPI.push('\t}');
        codeFetchAPI.push('}).then(');
        codeFetchAPI.push('\tfunction success(response) {');
        if (settings.dataverseReturnType !== null) {
            codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
            codeFetchAPI.push('\t}');
            codeFetchAPI.push(').then(function (responseObjects) {');
            codeFetchAPI.push('\tvar response = responseObjects[0];');
            codeFetchAPI.push('\tvar responseBody = responseObjects[1];');
            codeFetchAPI.push('\tvar result = responseBody;');
            codeFetchAPI.push('\tconsole.log(result);');
            returnType.forEach(function (line) { codeFetchAPI.push('\t' + line); });
            codeFetchAPI.push('}).catch(function (error) {');
            codeFetchAPI.push('\tconsole.log(error.message);');
            codeFetchAPI.push('});');
        } else {
            codeFetchAPI.push('\t\tif (response.ok) {');
            codeFetchAPI.push('\t\t\tconsole.log("Success");');
            codeFetchAPI.push('\t\t} else {');
            codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
            codeFetchAPI.push('\t\t}');
            codeFetchAPI.push('\t}');
            codeFetchAPI.push(').catch(function (error) {');
            codeFetchAPI.push('\tconsole.log(error.message);');
            codeFetchAPI.push('});');
        }
    }
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, null);
}

/**
 * Generate Code - Execute Workflow
 */
DRB.GenerateCode.ExecuteWorkflow = function () {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
	var codeSDK = [];

    // #region XHR settings
    // Main Url
    var mainUrl = "/api/data/" + settings.version + "/workflows(" + settings.workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);

    // Parameters
    var codeParameters = 'var parameters = { EntityId: "' + settings.primaryId + '" };';
    // #endregion

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('var executeWorkflowRequest = {');
    codeXrmWebApi.push('\tentity: { entityType: "workflow", id: "' + settings.workflowId + '" },');
    codeXrmWebApi.push('\tEntityId: { guid: "' + settings.primaryId + '" },');
    codeXrmWebApi.push('');
    codeXrmWebApi.push('\tgetMetadata: function () {');
    codeXrmWebApi.push('\t\treturn {');
    codeXrmWebApi.push('\t\t\tboundParameter: "entity",');
    codeXrmWebApi.push('\t\t\tparameterTypes: {');
    codeXrmWebApi.push('\t\t\t\tentity: { typeName: "mscrm.workflow", structuralProperty: 5 },');
    codeXrmWebApi.push('\t\t\t\tEntityId: { typeName: "Edm.Guid", structuralProperty: 1 }');
    codeXrmWebApi.push('\t\t\t},');
    codeXrmWebApi.push('\t\t\toperationType: 0, operationName: "ExecuteWorkflow"');
    codeXrmWebApi.push('\t\t};');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push('};');
    codeXrmWebApi.push('');
    codeXrmWebApi.push('Xrm.WebApi.execute(executeWorkflowRequest).then(');
    codeXrmWebApi.push('\tfunction success(response) {');
    codeXrmWebApi.push('\t\tif (response.ok) { return response.json(); }');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(').then(function (responseBody) {');
    codeXrmWebApi.push('\tvar result = responseBody;');
    codeXrmWebApi.push('\tconsole.log(result);');
    codeXrmWebApi.push('}).catch(function (error) {');
    codeXrmWebApi.push('\tconsole.log(error.message);');
    codeXrmWebApi.push('});');
    // #endregion

    // #region jQuery
    codejQuery.push(codeParameters);
    codejQuery.push('');
    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "POST",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tdata: JSON.stringify(parameters),');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tvar result = data;');
    codejQuery.push('\t\tconsole.log(result);');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push(codeParameters);
    codeXMLHttpRequest.push('');
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(xhrHeaders.join('\n'));
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
    codeXMLHttpRequest.push('\t\t\tvar result = JSON.parse(this.response);');
    codeXMLHttpRequest.push('\t\t\tconsole.log(result);');
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send(JSON.stringify(parameters));');
    // #endregion

    // #region Fetch API
    codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
    codeFetchAPI.push(codeParameters);
    codeFetchAPI.push('');

    codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
    codeFetchAPI.push('\tmethod: "POST",');
    codeFetchAPI.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
    codeFetchAPI.push('\t},');
    codeFetchAPI.push('\tbody: JSON.stringify(parameters)');
    codeFetchAPI.push('}).then(');
    codeFetchAPI.push('\tfunction success(response) {');
    codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
    codeFetchAPI.push('\t}');
    codeFetchAPI.push(').then(function (responseObjects) {');
    codeFetchAPI.push('\tvar response = responseObjects[0];');
    codeFetchAPI.push('\tvar responseBody = responseObjects[1];');
    codeFetchAPI.push('\tvar result = responseBody;');
    codeFetchAPI.push('\tconsole.log(result);');
    codeFetchAPI.push('}).catch(function (error) {');
    codeFetchAPI.push('\tconsole.log(error.message);');
    codeFetchAPI.push('});');
    // #endregion
	
	// #region SDK
	codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
	var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
	if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }

	
	var methodCode = "service.Execute";
	if (settings.async === true) { methodCode = "await service.ExecuteAsync"; }

	codeSDK.push('ExecuteWorkflowRequest executeWorkflowRequest = new ExecuteWorkflowRequest');
	codeSDK.push('{');
	codeSDK.push('\tWorkflowId = new Guid("' + settings.workflowId + '"),');
	codeSDK.push('\tEntityId = new Guid("' + settings.primaryId + '")');
	codeSDK.push('};');
	codeSDK.push('ExecuteWorkflowResponse executeWorkflowResponse = (ExecuteWorkflowResponse)' + methodCode + '(executeWorkflowRequest);');
	// #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, null, null, codeSDK);
}

/**
 * Generate Code - Manage File Image Data
 */
DRB.GenerateCode.ManageFileImageData = function (requestType) {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codeFetchAPI = [];
    var codePortals = [];
	var codeSDK = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.fileField) || !DRB.Utilities.HasValue(settings.fileOperation)) {
        var errorMessage = "";

        if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
            // Don't generate the code if a table is not selected
            errorMessage = "// Select a Table first";
            codejQuery.push(errorMessage);
            codeXMLHttpRequest.push(errorMessage);
            codeFetchAPI.push(errorMessage);
            codePortals.push(errorMessage);
			codeSDK.push(errorMessage);
        }

        if (!DRB.Utilities.HasValue(settings.fileField)) {
            // Don't generate the code if a table is not selected
            errorMessage = "// Select a Column first";
            codejQuery.push(errorMessage);
            codeXMLHttpRequest.push(errorMessage);
            codeFetchAPI.push(errorMessage);
            codePortals.push(errorMessage);
			codeSDK.push(errorMessage);
        }

        if (!DRB.Utilities.HasValue(settings.fileOperation)) {
            // Don't generate the code if a table is not selected
            errorMessage = "// Select an Operation first";
            codejQuery.push(errorMessage);
            codeXMLHttpRequest.push(errorMessage);
            codeFetchAPI.push(errorMessage);
            codePortals.push(errorMessage);
			codeSDK.push(errorMessage);
        }

        DRB.GenerateCode.SetCodeEditors(null, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
        return;
    }

    var currentType = "";
    var defaultFileName = "";
    var fileFullSize = false;
    switch (requestType) {
        case "managefiledata": currentType = "File";
            defaultFileName = "file.bin";
            fileFullSize = true;
            break;
        case "manageimagedata": currentType = "Image";
            defaultFileName = "file.jpg";
            if (settings.fileFullSize === true) { fileFullSize = true; }
            break;
    }
    var fileBase64 = false;
    var binaryValue = "/$value";
    var dataComment = " // Binary";
    if (settings.fileBase64 === true) { fileBase64 = true; binaryValue = ""; dataComment = " // Base 64"; }

    var entityCriteria = settings.primaryId;
    var field = "";
    if (DRB.Utilities.HasValue(settings.fileField)) { field = settings.fileField.logicalName; }
    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")";
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")";
    switch (settings.fileOperation) {
        case "retrieve":
            mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field + binaryValue;
            portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field + binaryValue;
            if (requestType === "manageimagedata" && fileFullSize === true) { mainUrl += "?size=full"; portalsUrl += "?size=full"; }
            break;
        case "upload":
            mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field + "?x-ms-file-name=";
            portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field + "?x-ms-file-name=";
            break;
        case "delete":
            mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field;
            portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field;
            break;
    }

    // Request Headers
    var jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);
    var xhrHeaders = DRB.GenerateCode.GetXHRRequestHeaders(settings);
    var jQueryHeadersBinary = DRB.GenerateCode.GetJQueryRequestHeaders(settings, true);
    var xhrHeadersBinary = DRB.GenerateCode.GetXHRRequestHeaders(settings, true);

    switch (settings.fileOperation) {
        case "retrieve":
            var fullSizeCodejQuery = [];
            fullSizeCodejQuery.push('');
            fullSizeCodejQuery.push('// NOTE: the following code decodes the file name from the header');
            fullSizeCodejQuery.push('var contentDisposition = xhr.getResponseHeader("Content-Disposition");');

            var fullSizeCodeXMLHttpRequest = [];
            fullSizeCodeXMLHttpRequest.push('');
            fullSizeCodeXMLHttpRequest.push('// NOTE: the following code decodes the file name from the header');
            fullSizeCodeXMLHttpRequest.push('var contentDisposition = req.getResponseHeader("Content-Disposition");');

            var fullSizeCodeFetchAPI = [];
            fullSizeCodeFetchAPI.push('');
            fullSizeCodeFetchAPI.push('// NOTE: the following code decodes the file name from the header');
            fullSizeCodeFetchAPI.push('var contentDisposition = response.headers.get("Content-Disposition");');

            var fullSizeCode = [];
            fullSizeCode.push('try {');
            fullSizeCode.push('\tvar strToCheck = "filename=";');
            fullSizeCode.push('\tvar mimeEncodingCheck = "\\"=?utf-8?B?";');
            fullSizeCode.push('\tif (contentDisposition.indexOf(strToCheck) > 0) {');
            fullSizeCode.push('\t\tvar parseFileName = contentDisposition.substring(contentDisposition.indexOf(strToCheck) + strToCheck.length);');
            fullSizeCode.push('\t\tif (parseFileName.indexOf(mimeEncodingCheck) === -1) { fileName = parseFileName; }');
            fullSizeCode.push('\t\telse {');
            fullSizeCode.push('\t\t\tvar parseFileNameBase64 = parseFileName.substring(parseFileName.indexOf(mimeEncodingCheck) + mimeEncodingCheck.length, parseFileName.length - 3);');
            fullSizeCode.push('\t\t\tfileName = decodeURIComponent(atob(parseFileNameBase64).split("").map(function (c) { return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2); }).join(""));');
            fullSizeCode.push('\t\t}');
            fullSizeCode.push('\t}');
            fullSizeCode.push('} catch {}');

            // when the file/image is returned as Base 64 there is no header to get the name
            if (fileBase64 === true) {
                fullSizeCodejQuery = [];
                fullSizeCodeXMLHttpRequest = [];
                fullSizeCodeFetchAPI = [];
                fullSizeCode = [];
            }

            var downloadFileCode = [];
            if (fileBase64 === false) {
                downloadFileCode.push('// NOTE: If you need to convert fileContent to Base 64, check FileReader API "readAsDataURL" passing the Binary content as Blob');
                downloadFileCode.push('');
            }
            downloadFileCode.push('// NOTE: Uncomment the following lines to download the file');
            if (fileBase64 === true) {
                downloadFileCode.push('// NOTE: fileContent is Base64, convert to blob first');
                downloadFileCode.push('// var byteCharacters = atob(fileContent);');
                downloadFileCode.push('// var byteNumbers = new Array(byteCharacters.length);');
                downloadFileCode.push('// for (var i = 0; i < byteCharacters.length; i++) { byteNumbers[i] = byteCharacters.charCodeAt(i); }');
                downloadFileCode.push('// var blobContent = new Uint8Array(byteNumbers);');
                downloadFileCode.push('// var saveFile = new Blob([blobContent], { type: "application/octet-stream" });');
            } else {
                downloadFileCode.push('// var saveFile = new Blob([fileContent], { type: "application/octet-stream" });');
            }
            downloadFileCode.push('// var customLink = document.createElement("a");');
            downloadFileCode.push('// customLink.href = URL.createObjectURL(saveFile);');
            downloadFileCode.push('// customLink.download = fileName;');
            downloadFileCode.push('// customLink.click();');

            var downloadFileCodeFetchAPI = [];
            if (fileBase64 === false) {
                downloadFileCodeFetchAPI.push('// NOTE: If you need to convert fileContent to Base 64, check FileReader API "readAsDataURL" passing the Binary content as Blob');
                downloadFileCodeFetchAPI.push('');
            }
            downloadFileCodeFetchAPI.push('// NOTE: Uncomment the following lines to download the file');
            if (fileBase64 === true) {
                downloadFileCodeFetchAPI.push('// NOTE: fileContent is Base64, convert to blob first');
                downloadFileCodeFetchAPI.push('// var byteCharacters = atob(fileContent);');
                downloadFileCodeFetchAPI.push('// var byteNumbers = new Array(byteCharacters.length);');
                downloadFileCodeFetchAPI.push('// for (var i = 0; i < byteCharacters.length; i++) { byteNumbers[i] = byteCharacters.charCodeAt(i); }');
                downloadFileCodeFetchAPI.push('// var blobContent = new Uint8Array(byteNumbers);');
                downloadFileCodeFetchAPI.push('// var saveFile = new Blob([blobContent], { type: "application/octet-stream" });');
            } else {
                downloadFileCodeFetchAPI.push('// var saveFile = fileContent;');
            }
            downloadFileCodeFetchAPI.push('// var customLink = document.createElement("a");');
            downloadFileCodeFetchAPI.push('// customLink.href = URL.createObjectURL(saveFile);');
            downloadFileCodeFetchAPI.push('// customLink.download = fileName;');
            downloadFileCodeFetchAPI.push('// customLink.click();');

            // #region jQuery
            codejQuery.push('$.ajax({');
            codejQuery.push('\ttype: "GET",');
            if (fileBase64 === false) {
                codejQuery.push('\txhr: function() { var xhr = new XMLHttpRequest(); xhr.responseType = "blob"; return xhr; },');
            }
            codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
            codejQuery.push('\tasync: ' + settings.async + ',');
            codejQuery.push('\theaders: {');
            jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
            codejQuery.push('\t},');
            codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
            codejQuery.push('\t\tif (xhr.status === 200) {');
            if (fileBase64 === true) {
                codejQuery.push('\t\t\tvar fileContent = data["value"];' + dataComment);
            } else {
                codejQuery.push('\t\t\tvar fileContent = data;' + dataComment);
            }
            codejQuery.push('\t\t\tvar fileName = "' + defaultFileName + '"; // default name');
            if (fileFullSize === true) {
                fullSizeCodejQuery.forEach(function (line) { codejQuery.push('\t\t\t' + line); });
                fullSizeCode.forEach(function (line) { codejQuery.push('\t\t\t' + line); });
            }
            codejQuery.push('');
            codejQuery.push('\t\t\tconsole.log("' + currentType + ' retrieved. Name: " + fileName);');
            codejQuery.push('');
            downloadFileCode.forEach(function (line) { codejQuery.push('\t\t\t' + line); });
            codejQuery.push('\t\t} else {');
            codejQuery.push('\t\t\tconsole.log("' + currentType + ' not found");');
            codejQuery.push('\t\t}');
            codejQuery.push('\t},');
            codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
            codejQuery.push('\t\tconsole.log(xhr);');
            codejQuery.push('\t}');
            codejQuery.push('});');
            // #endregion

            // #region XMLHttpRequest
            codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
            codeXMLHttpRequest.push('req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
            codeXMLHttpRequest.push(xhrHeaders.join('\n'));
            if (fileBase64 === false) {
                codeXMLHttpRequest.push('req.responseType = "blob";');
            }
            codeXMLHttpRequest.push('req.onreadystatechange = function () {');
            codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
            codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
            codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
            if (fileBase64 === true) {
                codeXMLHttpRequest.push('\t\t\tvar fileContent = JSON.parse(this.response)["value"];' + dataComment);
            } else {
                codeXMLHttpRequest.push('\t\t\tvar fileContent = this.response;' + dataComment);
            }
            codeXMLHttpRequest.push('\t\t\tvar fileName = "' + defaultFileName + '"; // default name');
            if (fileFullSize === true) {
                fullSizeCodeXMLHttpRequest.forEach(function (line) { codeXMLHttpRequest.push('\t\t\t' + line); });
                fullSizeCode.forEach(function (line) { codeXMLHttpRequest.push('\t\t\t' + line); });
            }
            codeXMLHttpRequest.push('');
            codeXMLHttpRequest.push('\t\t\tconsole.log("' + currentType + ' retrieved. Name: " + fileName);');
            codeXMLHttpRequest.push('');
            downloadFileCode.forEach(function (line) { codeXMLHttpRequest.push('\t\t\t' + line); });
            codeXMLHttpRequest.push('\t\t} else {');
            codeXMLHttpRequest.push('\t\t\tconsole.log("' + currentType + ' not found");');
            codeXMLHttpRequest.push('\t\t}');
            codeXMLHttpRequest.push('\t}');
            codeXMLHttpRequest.push('};');
            codeXMLHttpRequest.push('req.send();');
            // #endregion

            // #region Fetch API
            codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
            codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
            codeFetchAPI.push('\tmethod: "GET",');
            codeFetchAPI.push('\theaders: {');
            jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
            codeFetchAPI.push('\t}');
            codeFetchAPI.push('}).then(');
            codeFetchAPI.push('\tfunction success(response) {');
            if (fileBase64 === true) {
                codeFetchAPI.push('\t\treturn response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });');
            } else {
                codeFetchAPI.push('\t\tif (response.ok) {');
                codeFetchAPI.push('\t\t\treturn response.blob().then((blob) => { return [response, blob]; });');
                codeFetchAPI.push('\t\t} else {');
                codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
                codeFetchAPI.push('\t\t}');
            }
            codeFetchAPI.push('\t}');
            codeFetchAPI.push(').then(function (responseObjects) {');
            codeFetchAPI.push('\tvar response = responseObjects[0];');

            if (fileBase64 === true) {
                codeFetchAPI.push('\tvar responseBody = responseObjects[1];');
                codeFetchAPI.push('\tif (response.status === 200) {');
                codeFetchAPI.push('\t\tvar fileContent = responseBody["value"];' + dataComment);
            } else {
                codeFetchAPI.push('\tvar responseBlob = responseObjects[1];');
                codeFetchAPI.push('\tif (response.status === 200) {');
                codeFetchAPI.push('\t\tvar fileContent = responseBlob;' + dataComment);
            }
            codeFetchAPI.push('\t\tvar fileName = "' + defaultFileName + '"; // default name');
            if (fileFullSize === true) {
                fullSizeCodeFetchAPI.forEach(function (line) { codeFetchAPI.push('\t\t' + line); });
                fullSizeCode.forEach(function (line) { codeFetchAPI.push('\t\t' + line); });
            }
            codeFetchAPI.push('');
            codeFetchAPI.push('\t\tconsole.log("' + currentType + ' retrieved. Name: " + fileName);');
            codeFetchAPI.push('');
            downloadFileCodeFetchAPI.forEach(function (line) { codeFetchAPI.push('\t\t' + line); });
            codeFetchAPI.push('\t} else {');
            codeFetchAPI.push('\t\tconsole.log("' + currentType + ' not found");');
            codeFetchAPI.push('\t}');
            codeFetchAPI.push('}).catch(function (error) {');
            codeFetchAPI.push('\tconsole.log(error.message);');
            codeFetchAPI.push('});');
            // #endregion

            // #region Portals
            codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
            codePortals.push('webapi.safeAjax({');
            codePortals.push('\ttype: "GET",');
            codePortals.push('\turl: "' + portalsUrl + '",');
            codePortals.push('\tcontentType: "application/json",');
            if (fileBase64 === false) {
                codePortals.push('\txhr: function() { var xhr = new XMLHttpRequest(); xhr.responseType = "blob"; return xhr; },');
            }
            codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
            if (fileBase64 === true) {
                codePortals.push('\t\tvar fileContent = data["value"];' + dataComment);
            } else {
                codePortals.push('\t\tvar fileContent = data;' + dataComment);
            }
            codePortals.push('\t\tvar fileName = "' + defaultFileName + '"; // default name');
            if (fileFullSize === true) {
                fullSizeCodejQuery.forEach(function (line) { codePortals.push('\t\t' + line); });
                fullSizeCode.forEach(function (line) { codePortals.push('\t\t' + line); });
            }
            codePortals.push('');
            codePortals.push('\t\tconsole.log("' + currentType + ' retrieved. Name: " + fileName);');
            codePortals.push('');
            downloadFileCode.forEach(function (line) { codePortals.push('\t\t' + line); });
            codePortals.push('\t},');
            codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
            codePortals.push('\t\tconsole.log(xhr);');
            codePortals.push('\t}');
            codePortals.push('});');
            // #endregion
			
			// #region SDK
			var methodCodeExecute = "service.Execute";
			if (settings.async === true) { methodCodeExecute = "await service.ExecuteAsync"; }
			var methodCodeRetrieve = "service.Retrieve";
			if (settings.async === true) { methodCodeRetrieve = "await service.RetrieveAsync"; }
			var methodCodeUpdate = "service.Update";
			if (settings.async === true) { methodCodeUpdate = "await service.UpdateAsync"; }
			
            codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
			var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
			if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }

			codeSDK.push('Guid id = new Guid("' + settings.primaryId + '");');
			
			if (requestType === "manageimagedata") {
				if (fileFullSize === true) {
					codeSDK.push('InitializeFileBlocksDownloadRequest initializeFileBlocksDownloadRequest = new InitializeFileBlocksDownloadRequest');
					codeSDK.push('{');
					codeSDK.push('\tTarget = new EntityReference("' + settings.primaryEntity.logicalName + '", id),');
					codeSDK.push('\tFileAttributeName = "' + settings.fileField.logicalName + '"');
					codeSDK.push('};');
					codeSDK.push('');
					codeSDK.push('InitializeFileBlocksDownloadResponse initializeFileBlocksDownloadResponse = (InitializeFileBlocksDownloadResponse)' + methodCodeExecute + '(initializeFileBlocksDownloadRequest);');
					codeSDK.push('DownloadBlockRequest downloadBlockRequest = new DownloadBlockRequest { FileContinuationToken = initializeFileBlocksDownloadResponse.FileContinuationToken };');
					codeSDK.push('DownloadBlockResponse downloadBlockResponse = (DownloadBlockResponse)' + methodCodeExecute + '(downloadBlockRequest);');
					codeSDK.push('string fileName = initializeFileBlocksDownloadResponse.FileName;');
					codeSDK.push('byte[] fileContent = downloadBlockResponse.Data;');
					if (fileBase64 === true) {
						codeSDK.push('string fileContentBase64 = Convert.ToBase64String(fileContent);');
					}
				} else {
					codeSDK.push('Entity record = ' + methodCodeRetrieve + '("' + settings.primaryEntity.logicalName + '", id, new ColumnSet("' + settings.fileField.logicalName + '"));');
					codeSDK.push('byte[] fileContent = record.GetAttributeValue<byte[]>("' + settings.fileField.logicalName + '");');
					if (fileBase64 === true) {
						codeSDK.push('string fileContentBase64 = Convert.ToBase64String(fileContent);');
					}
				}
			}
	
			if (requestType === "managefiledata") {
				codeSDK.push('InitializeFileBlocksDownloadRequest initializeFileBlocksDownloadRequest = new InitializeFileBlocksDownloadRequest');
				codeSDK.push('{');
				codeSDK.push('\tTarget = new EntityReference("' + settings.primaryEntity.logicalName + '", id),');
				codeSDK.push('\tFileAttributeName = "' + settings.fileField.logicalName + '"');
				codeSDK.push('};');
				codeSDK.push('');
				codeSDK.push('InitializeFileBlocksDownloadResponse initializeFileBlocksDownloadResponse = (InitializeFileBlocksDownloadResponse)' + methodCodeExecute + '(initializeFileBlocksDownloadRequest);');
				codeSDK.push('DownloadBlockRequest downloadBlockRequest = new DownloadBlockRequest { FileContinuationToken = initializeFileBlocksDownloadResponse.FileContinuationToken };');
				codeSDK.push('DownloadBlockResponse downloadBlockResponse = (DownloadBlockResponse)' + methodCodeExecute + '(downloadBlockRequest);');
				codeSDK.push('string fileName = initializeFileBlocksDownloadResponse.FileName;');
				codeSDK.push('byte[] fileContent = downloadBlockResponse.Data;');
				if (fileBase64 === true) {
					codeSDK.push('string fileContentBase64 = Convert.ToBase64String(fileContent);');
				}
			}
            // #endregion
            break;

        case "upload":
            var uploadCode = [];
            uploadCode.push('var fileName = encodeURIComponent("' + settings.fileName + '"); // The following characters are not allowed inside a file name: \\ / : * ? " < > |');
            uploadCode.push('');
            uploadCode.push('// NOTE: the following code converts a Base 64 encoded string to binary data');
            var fileContent = settings.fileContent;
            if (!DRB.Utilities.HasValue(fileContent)) { fileContent = ""; }
            uploadCode.push('var base64Content = "' + fileContent + '";');
            uploadCode.push('var byteCharacters = atob(base64Content);');
            uploadCode.push('var byteNumbers = new Array(byteCharacters.length);');
            uploadCode.push('for (var i = 0; i < byteCharacters.length; i++) { byteNumbers[i] = byteCharacters.charCodeAt(i); }');
            uploadCode.push('var fileContent = new Uint8Array(byteNumbers);');
            uploadCode.push('');
            uploadCode.push('// NOTE: if you get the file using FileReader API "readAsArrayBuffer" the Base 64 conversion is not required');
            uploadCode.push('// var fileContent = new Uint8Array(e.target.result);');
            uploadCode.push('');
            // #region jQuery
            uploadCode.forEach(function (line) { codejQuery.push(line); });
            codejQuery.push('$.ajax({');
            codejQuery.push('\ttype: "PATCH",');
            codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '" + fileName,');
            codejQuery.push('\tasync: ' + settings.async + ',');
            codejQuery.push('\theaders: {');
            jQueryHeadersBinary.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
            codejQuery.push('\t},');
            codejQuery.push('\tdata: fileContent,');
            codejQuery.push('\tprocessData: false,');
            codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
            codejQuery.push('\t\tconsole.log("' + currentType + ' uploaded");');
            codejQuery.push('\t},');
            codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
            codejQuery.push('\t\tconsole.log(xhr);');
            codejQuery.push('\t}');
            codejQuery.push('});');
            // #endregion

            // #region XMLHttpRequest
            uploadCode.forEach(function (line) { codeXMLHttpRequest.push(line); });
            codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
            codeXMLHttpRequest.push('req.open("PATCH", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '" + fileName, ' + settings.async + ');');
            codeXMLHttpRequest.push(xhrHeadersBinary.join('\n'));
            codeXMLHttpRequest.push('req.onreadystatechange = function () {');
            codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
            codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
            codeXMLHttpRequest.push('\t\tif (this.status === 204) {');
            codeXMLHttpRequest.push('\t\t\tconsole.log("' + currentType + ' uploaded");');
            codeXMLHttpRequest.push('\t\t} else {');
            codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
            codeXMLHttpRequest.push('\t\t}');
            codeXMLHttpRequest.push('\t}');
            codeXMLHttpRequest.push('};');
            codeXMLHttpRequest.push('req.send(fileContent);');
            // #endregion

            // #region Fetch API
            codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
            uploadCode.forEach(function (line) { codeFetchAPI.push(line); });
            codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '" + fileName, {');
            codeFetchAPI.push('\tmethod: "PATCH",');
            codeFetchAPI.push('\theaders: {');
            jQueryHeadersBinary.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
            codeFetchAPI.push('\t},');
            codeFetchAPI.push('\tbody: fileContent');
            codeFetchAPI.push('}).then(');
            codeFetchAPI.push('\tfunction success(response) {');
            codeFetchAPI.push('\t\tif (response.ok) {');
            codeFetchAPI.push('\t\t\tconsole.log("' + currentType + ' uploaded");');
            codeFetchAPI.push('\t\t} else {');
            codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
            codeFetchAPI.push('\t\t}');
            codeFetchAPI.push('\t}');
            codeFetchAPI.push(').catch(function (error) {');
            codeFetchAPI.push('\tconsole.log(error.message);');
            codeFetchAPI.push('});');
            // #endregion

            // #region Portals
            codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
            uploadCode.forEach(function (line) { codePortals.push(line); });
            codePortals.push('webapi.safeAjax({');
            codePortals.push('\ttype: "PUT", // NOTE: right now Portals requires PUT instead of PATCH for the upload');
            codePortals.push('\turl: "' + portalsUrl + '" + fileName,');
            codePortals.push('\tcontentType: "application/octet-stream",'); // Binary upload
            codePortals.push('\tdata: fileContent,');
            codePortals.push('\tprocessData: false,');
            codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
            codePortals.push('\t\tconsole.log("' + currentType + ' uploaded");');
            codePortals.push('\t},');
            codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
            codePortals.push('\t\tconsole.log(xhr);');
            codePortals.push('\t}');
            codePortals.push('});');
            // #endregion
			
			// #region SDK
			var methodCodeExecute = "service.Execute";
			if (settings.async === true) { methodCodeExecute = "await service.ExecuteAsync"; }
			var methodCodeUpdate = "service.Update";
			if (settings.async === true) { methodCodeUpdate = "await service.UpdateAsync"; }
			
            codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
			var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
			if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }

			
			
			if (requestType === "manageimagedata") {
				codeSDK.push('string fileContentBase64 = "' + fileContent + '";');
				codeSDK.push('byte[] fileContent = Convert.FromBase64String(fileContentBase64);');
				codeSDK.push('');
				codeSDK.push('Guid id = new Guid("' + settings.primaryId + '");');
				codeSDK.push('Entity record = new Entity("' + settings.primaryEntity.logicalName + '", id);');
				codeSDK.push('record["' + settings.fileField.logicalName + '"] = fileContent;');
				codeSDK.push(methodCodeUpdate + '(record);');
			}
	
			if (requestType === "managefiledata") {
				codeSDK.push('string fileContentBase64 = "' + fileContent + '";');
				codeSDK.push('byte[] fileContent = Convert.FromBase64String(fileContentBase64);');
				codeSDK.push('string fileName = "' + settings.fileName + '";');
				codeSDK.push('int blockSize = 4194304; // 4 MB');
				codeSDK.push('int numBlocks = fileContent.Length / blockSize;');
				codeSDK.push('if (fileContent.Length % blockSize > 0) { numBlocks++; }');
				codeSDK.push('');
				codeSDK.push('Guid id = new Guid("' + settings.primaryId + '");');
				codeSDK.push('InitializeFileBlocksUploadRequest initializeFileBlocksUploadRequest = new InitializeFileBlocksUploadRequest');
				codeSDK.push('{');
				codeSDK.push('\tTarget = new EntityReference("' + settings.primaryEntity.logicalName + '", id),');
				codeSDK.push('\tFileAttributeName = "' + settings.fileField.logicalName + '",');
				codeSDK.push('\tFileName = fileName');
				codeSDK.push('};');
				codeSDK.push('');
				codeSDK.push('InitializeFileBlocksUploadResponse initializeFileBlocksUploadResponse = (InitializeFileBlocksUploadResponse)' + methodCodeExecute + '(initializeFileBlocksUploadRequest);');
				codeSDK.push('');
				codeSDK.push('List<string> blockList = new List<string>();');
				codeSDK.push('for (int i = 0; i < numBlocks; i++)');
				codeSDK.push('{');
				codeSDK.push('\tbyte[] buffer = fileContent.Skip(i * blockSize).Take(blockSize).ToArray();');
				codeSDK.push('');
				codeSDK.push('\tUploadBlockRequest uploadBlockRequest = new UploadBlockRequest');
				codeSDK.push('\t{');
				codeSDK.push('\t\tBlockData = buffer,');
				codeSDK.push('\t\tBlockId = Convert.ToBase64String(Encoding.UTF8.GetBytes(Guid.NewGuid().ToString())),');
				codeSDK.push('\t\tFileContinuationToken = initializeFileBlocksUploadResponse.FileContinuationToken');
				codeSDK.push('\t};');
				codeSDK.push('');
				codeSDK.push('\t' + methodCodeExecute + '(uploadBlockRequest);');
				codeSDK.push('\tblockList.Add(uploadBlockRequest.BlockId);');
				codeSDK.push('}');
				codeSDK.push('');
				codeSDK.push('CommitFileBlocksUploadRequest commitFileBlocksUploadRequest = new CommitFileBlocksUploadRequest');
				codeSDK.push('{');
				codeSDK.push('\tBlockList = blockList.ToArray(),');
				codeSDK.push('\tFileContinuationToken = initializeFileBlocksUploadResponse.FileContinuationToken,');
				codeSDK.push('\tFileName = initializeFileBlocksUploadRequest.FileName,');
				codeSDK.push('\tMimeType = System.Web.MimeMapping.GetMimeMapping(fileName)');
				codeSDK.push('};');
				codeSDK.push('');
				codeSDK.push('CommitFileBlocksUploadResponse commitFileBlocksUploadResponse = (CommitFileBlocksUploadResponse)' + methodCodeExecute + '(commitFileBlocksUploadRequest);');
				codeSDK.push('Guid fileId = commitFileBlocksUploadResponse.FileId;');
			}
            // #endregion
            break;

        case "delete":
            // #region jQuery
            codejQuery.push('$.ajax({');
            codejQuery.push('\ttype: "DELETE",');
            codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
            codejQuery.push('\tasync: ' + settings.async + ',');
            codejQuery.push('\theaders: {');
            jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
            codejQuery.push('\t},');
            codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
            codejQuery.push('\t\tconsole.log("' + currentType + ' deleted");');
            codejQuery.push('\t},');
            codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
            codejQuery.push('\t\tconsole.log(xhr);');
            codejQuery.push('\t}');
            codejQuery.push('});');
            // #endregion

            // #region XMLHttpRequest
            codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
            codeXMLHttpRequest.push('req.open("DELETE", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
            codeXMLHttpRequest.push(xhrHeaders.join('\n'));
            codeXMLHttpRequest.push('req.onreadystatechange = function () {');
            codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
            codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
            codeXMLHttpRequest.push('\t\tif (this.status === 204 || this.status === 1223) {');
            codeXMLHttpRequest.push('\t\t\tconsole.log("' + currentType + ' deleted");');
            codeXMLHttpRequest.push('\t\t} else {');
            codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
            codeXMLHttpRequest.push('\t\t}');
            codeXMLHttpRequest.push('\t}');
            codeXMLHttpRequest.push('};');
            codeXMLHttpRequest.push('req.send();');
            // #endregion

            // #region Fetch API
            codeFetchAPI = DRB.GenerateCode.GetFetchAPIWarnings(settings);
            codeFetchAPI.push('fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", {');
            codeFetchAPI.push('\tmethod: "DELETE",');
            codeFetchAPI.push('\theaders: {');
            jQueryHeaders.forEach(function (reqHeader) { codeFetchAPI.push('\t\t' + reqHeader); });
            codeFetchAPI.push('\t}');
            codeFetchAPI.push('}).then(');
            codeFetchAPI.push('\tfunction success(response) {');
            codeFetchAPI.push('\t\tif (response.ok) {');
            codeFetchAPI.push('\t\t\tconsole.log("' + currentType + ' deleted");');
            codeFetchAPI.push('\t\t} else {');
            codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
            codeFetchAPI.push('\t\t}');
            codeFetchAPI.push('\t}');
            codeFetchAPI.push(').catch(function (error) {');
            codeFetchAPI.push('\tconsole.log(error.message);');
            codeFetchAPI.push('});');
            // #endregion

            // #region Portals
            codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
            codePortals.push('webapi.safeAjax({');
            codePortals.push('\ttype: "DELETE",');
            codePortals.push('\turl: "' + portalsUrl + '",');
            codePortals.push('\tcontentType: "application/json",');
            codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
            codePortals.push('\t\tconsole.log("' + currentType + ' deleted");');
            codePortals.push('\t},');
            codePortals.push('\terror: function (xhr, textStatus, errorThrown) {');
            codePortals.push('\t\tconsole.log(xhr);');
            codePortals.push('\t}');
            codePortals.push('});');
            // #endregion
			
			// #region SDK
			var methodCodeExecute = "service.Execute";
			if (settings.async === true) { methodCodeExecute = "await service.ExecuteAsync"; }
			var methodCodeRetrieve = "service.Retrieve";
			if (settings.async === true) { methodCodeRetrieve = "await service.RetrieveAsync"; }
			var methodCodeUpdate = "service.Update";
			if (settings.async === true) { methodCodeUpdate = "await service.UpdateAsync"; }
			
            codeSDK = DRB.GenerateCode.GetSDKWarnings(settings);
			var impersonation = DRB.GenerateCode.GetSDKImpersonation(settings);
			if (impersonation.length > 0) { codeSDK = codeSDK.concat(impersonation); }

			codeSDK.push('Guid id = new Guid("' + settings.primaryId + '");');
			
			if (requestType === "manageimagedata") {
				codeSDK.push('Entity record = ' + methodCodeRetrieve + '("' + settings.primaryEntity.logicalName + '", id);');
				codeSDK.push('record["' + settings.fileField.logicalName + '"] = null;');
				codeSDK.push(methodCodeUpdate + '(record);');
			}
	
			if (requestType === "managefiledata") {
				codeSDK.push('Entity record = ' + methodCodeRetrieve + '("' + settings.primaryEntity.logicalName + '", id, new ColumnSet("' + settings.fileField.logicalName + '"));');
				codeSDK.push('Guid fileId = record.GetAttributeValue<Guid>("' + settings.fileField.logicalName + '");');
				codeSDK.push('');
				codeSDK.push('DeleteFileRequest deleteFileRequest = new DeleteFileRequest');
				codeSDK.push('{');
				codeSDK.push('\tFileId =  fileId');
				codeSDK.push('};');
				codeSDK.push('DeleteFileResponse deleteFileResponse = (DeleteFileResponse)' + methodCodeExecute + '(deleteFileRequest);');
			}
            // #endregion
            break;
    }
    DRB.GenerateCode.SetCodeEditors(null, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals, null, codeSDK);
}

/**
 * Generate Code - Power Automate
 */
DRB.GenerateCode.PowerAutomate = function (requestType) {
    if (requestType !== "retrievesingle" && requestType !== "retrievemultiple") { return; }
    var paDiv = "code_powerautomate_div";
    $("#" + paDiv).empty();
    switch (requestType) {
        case "retrievesingle":
            $("#" + paDiv).append(DRB.UI.CreateSpan(DRB.DOM.PowerAutomate.SpanTitleRetrieveSingle.Id, DRB.DOM.PowerAutomate.SpanTitleRetrieveSingle.Name, null, DRB.DOM.PowerAutomate.SpanTitleRetrieveSingle.Class));
            break;
        case "retrievemultiple":
            $("#" + paDiv).append(DRB.UI.CreateSpan(DRB.DOM.PowerAutomate.SpanTitleRetrieveMultiple.Id, DRB.DOM.PowerAutomate.SpanTitleRetrieveMultiple.Name, null, DRB.DOM.PowerAutomate.SpanTitleRetrieveMultiple.Class));
            break;
    }
    $("#" + paDiv).append(DRB.UI.CreateSpacer());
    var divTable = DRB.UI.CreateTable(DRB.DOM.PowerAutomate.Table.Id);
    $("#" + paDiv).append(divTable);

    var paSettings = [];

    switch (requestType) {
        case "retrievesingle": paSettings = ["TableName", "RowID", "SelectColumns", "ExpandQuery"]; break;
        case "retrievemultiple": paSettings = ["TableName", "SelectColumns", "FilterRows", "SortBy", "ExpandQuery", "RowCount"]; break;
    }

    paSettings.forEach(function (setting, settingIndex) {
        var tr = DRB.UI.CreateTr(DRB.DOM.PowerAutomate.Tr.Id + DRB.DOM.PowerAutomate[setting + "Span"].Id);
        var tdLabel = DRB.UI.CreateTd(DRB.DOM.PowerAutomate.TdLabel.Id + DRB.DOM.PowerAutomate[setting + "Span"].Id);
        var tdValue = DRB.UI.CreateTd(DRB.DOM.PowerAutomate.TdValue.Id + DRB.DOM.PowerAutomate[setting + "Span"].Id);
        var tdCopy = DRB.UI.CreateTd(DRB.DOM.PowerAutomate.TdCopy.Id + DRB.DOM.PowerAutomate[setting + "Span"].Id);
        divTable.append(tr);
        tr.append(tdLabel);
        tr.append(tdValue);
        tr.append(tdCopy);

        tdLabel.append(DRB.UI.CreateSpan(DRB.DOM.PowerAutomate[setting + "Span"].Id, DRB.DOM.PowerAutomate[setting + "Span"].Name));
        tdValue.append(DRB.UI.CreateInputStringPowerAutomate(DRB.DOM.PowerAutomate[setting + "Input"].Id));
        if (settingIndex > 0) {
            tdCopy.append(DRB.UI.CreateButton(DRB.DOM.PowerAutomate.ButtonCopy.Id + DRB.DOM.PowerAutomate[setting + "Span"].Id, DRB.DOM.PowerAutomate.ButtonCopy.Name, DRB.DOM.PowerAutomate.ButtonCopy.Class, DRB.Logic.CopyCodeForPowerAutomate, setting, DRB.DOM.PowerAutomate[setting + "Span"].Name));
        }
    });

    var settings = DRB.Metadata.CurrentNode.data.configuration;
    if (!DRB.Utilities.HasValue(settings.primaryEntity)) { return; }

    var tableName = settings.primaryEntity.label + " (" + settings.primaryEntity.logicalName + ")";
    var selectColumns = "";
    var fieldLogicalNames = settings.fields.map(function (field) { return field.oDataName; });
    if (settings.fields.length > 0) { selectColumns = fieldLogicalNames.join(); }

    var expandQuery = "";
    // #region Expand Query
    if (settings.oneToMany.length > 0 || settings.manyToOne.length > 0 || settings.manyToMany.length > 0) {
        settings.oneToMany.forEach(function (oneToMany) {
            var relFieldLogicalNames = oneToMany.fields.map(function (field) { return field.oDataName; });
            expandQuery += oneToMany.schemaName + '($select=' + relFieldLogicalNames.join() + '),';
        });

        settings.manyToOne.forEach(function (manyToOne) {
            var relFieldLogicalNames = manyToOne.fields.map(function (field) { return field.oDataName; });
            expandQuery += manyToOne.navigationProperty + '($select=' + relFieldLogicalNames.join() + '),';
        });

        settings.manyToMany.forEach(function (manyToMany) {
            var relFieldLogicalNames = manyToMany.fields.map(function (field) { return field.oDataName; });
            expandQuery += manyToMany.schemaName + '($select=' + relFieldLogicalNames.join() + '),';
        });

        if (expandQuery.slice(-1) === ',') { expandQuery = expandQuery.slice(0, -1); }
    }
    // #endregion

    switch (requestType) {
        case "retrievesingle":
            var rowId = settings.primaryId;
            if (settings.useAlternateKey === true) { rowId = ""; }

            $("#" + DRB.DOM.PowerAutomate.TableNameInput.Id).val(tableName);
            $("#" + DRB.DOM.PowerAutomate.RowIDInput.Id).val(rowId);
            $("#" + DRB.DOM.PowerAutomate.SelectColumnsInput.Id).val(selectColumns);
            $("#" + DRB.DOM.PowerAutomate.ExpandQueryInput.Id).val(expandQuery);
            break;
        case "retrievemultiple":
            var rowCount = "";
            if (DRB.Utilities.HasValue(settings.topCount)) { rowCount = settings.topCount; }
            var filterRows = DRB.GenerateCode.GetFilterFields(settings);
            if (DRB.Utilities.HasValue(filterRows)) { filterRows = filterRows.replace("$filter=", ""); }
            var sortBy = DRB.GenerateCode.GetOrderFields(settings);
            if (DRB.Utilities.HasValue(sortBy)) { sortBy = sortBy.replace("$orderby=", ""); }
            $("#" + DRB.DOM.PowerAutomate.TableNameInput.Id).val(tableName);
            $("#" + DRB.DOM.PowerAutomate.SelectColumnsInput.Id).val(selectColumns);
            $("#" + DRB.DOM.PowerAutomate.FilterRowsInput.Id).val(filterRows);
            $("#" + DRB.DOM.PowerAutomate.SortByInput.Id).val(sortBy);
            $("#" + DRB.DOM.PowerAutomate.ExpandQueryInput.Id).val(expandQuery);
            $("#" + DRB.DOM.PowerAutomate.RowCountInput.Id).val(rowCount);
            break;
    }
}

DRB.GenerateCode.BindPowerQueryColumn = function (id) {
    $("#" + id).on("change", function (e) {
        var columnLogicalName = $(this).val();
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnLogicalName);
        if (DRB.Utilities.HasValue(column)) {
            var settings = DRB.Metadata.CurrentNode.data.configuration;

            var optionSetConversionEnd = `
\t#"Option Table" = Table.FromList(Options, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
\t#"Expand Columns" = Table.ExpandRecordColumn(#"Option Table", "Column1", {"Value", "Label", "Description", "Color"}, {"Value", "Option.Label", "Option.Description", "Color"}),
\t#"Expand Label" = Table.ExpandRecordColumn(#"Expand Columns", "Option.Label", {"UserLocalizedLabel"}, {"Label.UserLocalizedLabel"}),
\t#"Expand Label UserLocalizedLabel" = Table.ExpandRecordColumn(#"Expand Label", "Label.UserLocalizedLabel", {"Label"}, {"Label"}),
\t#"Expand Description" = Table.ExpandRecordColumn(#"Expand Label UserLocalizedLabel", "Option.Description", {"UserLocalizedLabel"}, {"Description.UserLocalizedLabel"}),
\t#"Expand Description UserLocalizedLabel" = Table.ExpandRecordColumn(#"Expand Description", "Description.UserLocalizedLabel", {"Label"}, {"Description"})
in
\t#"Expand Description UserLocalizedLabel"`;

            var optionSetConversionTypeTemplate = `let
\tSource = Json.Document(Web.Contents(DataverseUrl, [RelativePath="/api/data/__apiversion__/EntityDefinitions(LogicalName='__entityname__')/Attributes(LogicalName='__fieldname__')/Microsoft.Dynamics.CRM.__fieldtype__?$select=LogicalName&$expand=OptionSet($select=__fieldexpand__)"])),
\tOptionSet = Source[OptionSet],
\tOptions = __options__,`;

            var optionSetTypes = ["Boolean", "Picklist", "MultiPicklist", "State", "Status"];
            if (optionSetTypes.indexOf(column.AttributeType) > -1) {
                var optionSetConversionType = optionSetConversionTypeTemplate.replace("__apiversion__", settings.version);
                optionSetConversionType = optionSetConversionType.replace("__entityname__", settings.primaryEntity.logicalName);
                optionSetConversionType = optionSetConversionType.replace("__fieldname__", column.LogicalName);
                var fieldType = "";
                var fieldExpand = "Options";
                var fieldOptions = "OptionSet[Options]";
                switch (column.AttributeType) {
                    case "Boolean": fieldType = "BooleanAttributeMetadata"; fieldExpand = "FalseOption,TrueOption"; fieldOptions = "{OptionSet[FalseOption], OptionSet[TrueOption]}"; break;
                    case "Picklist": fieldType = "PicklistAttributeMetadata"; break;
                    case "MultiPicklist": fieldType = "MultiSelectPicklistAttributeMetadata"; break;
                    case "State": fieldType = "StateAttributeMetadata"; break;
                    case "Status": fieldType = "StatusAttributeMetadata"; break;
                }

                optionSetConversionType = optionSetConversionType.replace("__fieldtype__", fieldType);
                optionSetConversionType = optionSetConversionType.replace("__fieldexpand__", fieldExpand);
                optionSetConversionType = optionSetConversionType.replace("__options__", fieldOptions);

                DRB.Settings.Editors["code_powerquery2"].session.setValue(optionSetConversionType + optionSetConversionEnd);
            }
        }
    });
}

DRB.GenerateCode.GetMFields = function (settings) {
    var formattedTypes = ["Picklist", "MultiPicklist", "State", "Status", "DateTime", "Owner", "Lookup", "Customer", "Boolean", "Decimal", "BigInt", "Integer", "EntityName", "Double"];
    var logicalNameTypes = ["Lookup", "Owner", "Customer"];

    if (settings.formattedValues === false) { formattedTypes = []; logicalNameTypes = []; }

    var mFields = '';
    settings.fields.forEach(function (field) {
        mFields += '"' + field.oDataName + '", ';
        if (formattedTypes.indexOf(field.type) > -1) { mFields += '"' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", '; }
        if (logicalNameTypes.indexOf(field.type) > -1) { mFields += '"' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", '; }
    });

    var fieldLogicalNames = settings.fields.map(function (field) { return field.oDataName; });
    if (fieldLogicalNames.indexOf(settings.primaryIdField) < 0) { mFields = '"' + settings.primaryIdField + '", ' + mFields; }

    settings.oneToMany.forEach(function (oneToMany) { mFields += '"' + oneToMany.schemaName + '", '; });
    settings.manyToOne.forEach(function (manyToOne) { mFields += '"' + manyToOne.navigationProperty + '", '; });
    settings.manyToMany.forEach(function (manyToMany) { mFields += '"' + manyToMany.schemaName + '", '; });

    if (mFields.slice(-2) === ', ') { mFields = mFields.slice(0, -2); }

    mFields = '{' + mFields + '},\n\t\t{' + mFields + '}';
    return mFields;
}

DRB.GenerateCode.GetMRelationships = function (settings) {
    var formattedTypes = ["Picklist", "MultiPicklist", "State", "Status", "DateTime", "Owner", "Lookup", "Customer", "Boolean", "Decimal", "BigInt", "Integer", "EntityName", "Double"];
    var logicalNameTypes = ["Lookup", "Owner", "Customer"];

    if (settings.formattedValues === false) { formattedTypes = []; logicalNameTypes = []; }

    var mRelationships = '';
    var previousSource = '#"Add Columns"';
    var currentSource = '';
    var currentSourceColumns = '';
    if (settings.oneToMany.length > 0) {
        mRelationships += '// 1:N Relationships\n\t';
        settings.oneToMany.forEach(function (oneToMany, oneToManyIndex) {
            currentSource = '#"Add 1:N Relationship - Count ' + oneToManyIndex + '"';
            currentSourceColumns = '#"Add 1:N Relationship - Count ' + oneToManyIndex + ' Columns"';
            mRelationships += '// ' + oneToMany.schemaName + '\n\t';
            mRelationships += currentSource + ' = Table.ExpandListColumn(' + previousSource + ', "' + oneToMany.schemaName + '"),\n\t';
            mRelationships += currentSourceColumns + ' = Table.ExpandRecordColumn(' + currentSource + ', "' + oneToMany.schemaName + '",\n\t\t';

            var mFields = '';
            var mFields2 = '';
            oneToMany.fields.forEach(function (field) {
                mFields += '"' + field.oDataName + '", ';
                mFields2 += '"' + oneToMany.schemaName + '.' + field.oDataName + '", ';
                if (formattedTypes.indexOf(field.type) > -1) {
                    mFields += '"' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
                    mFields2 += '"' + oneToMany.schemaName + '.' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
                }
                if (logicalNameTypes.indexOf(field.type) > -1) {
                    mFields += '"' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
                    mFields2 += '"' + oneToMany.schemaName + '.' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
                }
            });
            if (mFields.slice(-2) === ', ') { mFields = mFields.slice(0, -2); }
            if (mFields2.slice(-2) === ', ') { mFields2 = mFields2.slice(0, -2); }

            mFields = '{' + mFields + '},\n\t\t{' + mFields2 + '}),\n\t\n\t';
            mRelationships += mFields;

            previousSource = currentSourceColumns;
        });
    }


    if (settings.manyToOne.length > 0) {
        mRelationships += '// N:1 Relationships\n\t';
        settings.manyToOne.forEach(function (manyToOne, manyToOneIndex) {
            currentSourceColumns = '#"Add N:1 Relationship - Count ' + manyToOneIndex + ' Columns"';
            mRelationships += '// ' + manyToOne.navigationProperty + '\n\t';
            mRelationships += currentSourceColumns + ' = Table.ExpandRecordColumn(' + previousSource + ', "' + manyToOne.navigationProperty + '",\n\t\t';

            var mFields = '';
            var mFields2 = '';
            manyToOne.fields.forEach(function (field) {
                mFields += '"' + field.oDataName + '", ';
                mFields2 += '"' + manyToOne.navigationProperty + '.' + field.oDataName + '", ';
                if (formattedTypes.indexOf(field.type) > -1) {
                    mFields += '"' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
                    mFields2 += '"' + manyToOne.navigationProperty + '.' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
                }
                if (logicalNameTypes.indexOf(field.type) > -1) {
                    mFields += '"' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
                    mFields2 += '"' + manyToOne.navigationProperty + '.' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
                }
            });
            if (mFields.slice(-2) === ', ') { mFields = mFields.slice(0, -2); }
            if (mFields2.slice(-2) === ', ') { mFields2 = mFields2.slice(0, -2); }
            mFields = '{' + mFields + '},\n\t\t{' + mFields2 + '}),\n\t\n\t';
            mRelationships += mFields;

            previousSource = currentSourceColumns;
        });
    }

    if (settings.manyToMany.length > 0) {
        mRelationships += '// N:N Relationships\n\t';
        settings.manyToMany.forEach(function (manyToMany, manyToManyIndex) {
            currentSource = '#"Add N:N Relationship - Count ' + manyToManyIndex + '"';
            currentSourceColumns = '#"Add N:N Relationship - Count ' + manyToManyIndex + ' Columns"';
            mRelationships += '// ' + manyToMany.schemaName + '\n\t';
            mRelationships += currentSource + ' = Table.ExpandListColumn(' + previousSource + ', "' + manyToMany.schemaName + '"),\n\t';
            mRelationships += currentSourceColumns + ' = Table.ExpandRecordColumn(' + currentSource + ', "' + manyToMany.schemaName + '",\n\t\t';

            var mFields = '';
            var mFields2 = '';
            manyToMany.fields.forEach(function (field) {
                mFields += '"' + field.oDataName + '", ';
                mFields2 += '"' + manyToMany.schemaName + '.' + field.oDataName + '", ';
                if (formattedTypes.indexOf(field.type) > -1) {
                    mFields += '"' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
                    mFields2 += '"' + manyToMany.schemaName + '.' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
                }
                if (logicalNameTypes.indexOf(field.type) > -1) {
                    mFields += '"' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
                    mFields2 += '"' + manyToMany.schemaName + '.' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
                }
            });
            if (mFields.slice(-2) === ', ') { mFields = mFields.slice(0, -2); }
            if (mFields2.slice(-2) === ', ') { mFields2 = mFields2.slice(0, -2); }
            mFields = '{' + mFields + '},\n\t\t{' + mFields2 + '}),\n\t\n\t';
            mRelationships += mFields;

            previousSource = currentSourceColumns;
        });
    }
    mRelationships += '#"Before Rename" = ' + previousSource;
    return mRelationships;
}

DRB.GenerateCode.GetMRenameColumns = function (settings) {

    var formattedTypes = ["Picklist", "MultiPicklist", "State", "Status", "DateTime", "Owner", "Lookup", "Customer", "Boolean", "Decimal", "BigInt", "Integer", "EntityName", "Double"];
    var logicalNameTypes = ["Lookup", "Owner", "Customer"];
    if (settings.formattedValues === false) { formattedTypes = []; logicalNameTypes = []; }

    var mRenameColumns = '// Rename\n\t';
    mRenameColumns += '// Rename Columns\n\t';

    var previousSource = '#"Before Rename"';
    var currentSource = '#"Renamed Columns"';
    mRenameColumns += currentSource + ' = Table.RenameColumns(' + previousSource + ', {\n\t\t';


    var mFields = '';
    settings.fields.forEach(function (field) {
        var fieldLabel = field.label;
        fieldLabel = fieldLabel.replace(/"/g, '""');

        // the primary id doesn't get renamed (it will be used for the link)
        if (field.oDataName === settings.primaryIdField) { fieldLabel = field.oDataName; }

        mFields += '{"' + field.oDataName + '", "' + fieldLabel + '"}, ';
        if (formattedTypes.indexOf(field.type) > -1) { mFields += '{"' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", "' + fieldLabel + ' (Formatted)"}, '; }
        if (logicalNameTypes.indexOf(field.type) > -1) { mFields += '{"' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", "' + fieldLabel + ' (Table)"}, '; }
    });

    if (mFields.slice(-2) === ', ') { mFields = mFields.slice(0, -2); }
    mRenameColumns += mFields;
    mRenameColumns += '}),\n\n\t';

    if (settings.oneToMany.length > 0) {
        mRenameColumns += '// Rename 1:N Relationships Columns\n\t';
        settings.oneToMany.forEach(function (oneToMany, oneToManyIndex) {
            mRenameColumns += '// ' + oneToMany.schemaName + '\n\t';

            previousSource = currentSource;
            currentSource = '#"Rename 1:N Relationship - Count ' + oneToManyIndex + ' Columns"';
            mRenameColumns += currentSource + ' = Table.RenameColumns(' + previousSource + ', {\n\t\t';

            var mFields = '';
            oneToMany.fields.forEach(function (field) {
                var fieldLabel = oneToMany.schemaName + '.' + field.label;
                fieldLabel = fieldLabel.replace(/"/g, '""');
                mFields += '{"' + oneToMany.schemaName + '.' + field.oDataName + '", "' + fieldLabel + '"}, ';
                if (formattedTypes.indexOf(field.type) > -1) { mFields += '{"' + oneToMany.schemaName + '.' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", "' + fieldLabel + ' (Formatted)"}, '; }
                if (logicalNameTypes.indexOf(field.type) > -1) { mFields += '{"' + oneToMany.schemaName + '.' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", "' + fieldLabel + ' (Table)"}, '; };
            });
            if (mFields.slice(-2) === ', ') { mFields = mFields.slice(0, -2); }
            mRenameColumns += mFields;
            mRenameColumns += '}),\n\n\t';
        });
    }

    if (settings.manyToOne.length > 0) {
        mRenameColumns += '// Rename N:1 Relationships Columns\n\t';
        settings.manyToOne.forEach(function (manyToOne, manyToOneIndex) {
            mRenameColumns += '// ' + manyToOne.navigationProperty + '\n\t';

            previousSource = currentSource;
            currentSource = '#"Rename N:1 Relationship - Count ' + manyToOneIndex + ' Columns"';
            mRenameColumns += currentSource + ' = Table.RenameColumns(' + previousSource + ', {\n\t\t';

            var mFields = '';
            manyToOne.fields.forEach(function (field) {
                var fieldLabel = manyToOne.navigationProperty + '.' + field.label;
                fieldLabel = fieldLabel.replace(/"/g, '""');
                mFields += '{"' + manyToOne.navigationProperty + '.' + field.oDataName + '", "' + fieldLabel + '"}, ';
                if (formattedTypes.indexOf(field.type) > -1) { mFields += '{"' + manyToOne.navigationProperty + '.' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", "' + fieldLabel + ' (Formatted)"}, '; }
                if (logicalNameTypes.indexOf(field.type) > -1) { mFields += '{"' + manyToOne.navigationProperty + '.' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", "' + fieldLabel + ' (Table)"}, '; };
            });
            if (mFields.slice(-2) === ', ') { mFields = mFields.slice(0, -2); }
            mRenameColumns += mFields;
            mRenameColumns += '}),\n\n\t';
        });
    }

    if (settings.manyToMany.length > 0) {
        mRenameColumns += '// Rename N:N Relationships Columns\n\t';
        settings.manyToMany.forEach(function (manyToMany, manyToManyIndex) {
            mRenameColumns += '// ' + manyToMany.schemaName + '\n\t';

            previousSource = currentSource;
            currentSource = '#"Rename N:N Relationship - Count ' + manyToManyIndex + ' Columns"';
            mRenameColumns += currentSource + ' = Table.RenameColumns(' + previousSource + ', {\n\t\t';

            var mFields = '';
            manyToMany.fields.forEach(function (field) {
                var fieldLabel = manyToMany.schemaName + '.' + field.label;
                fieldLabel = fieldLabel.replace(/"/g, '""');
                mFields += '{"' + manyToMany.schemaName + '.' + field.oDataName + '", "' + fieldLabel + '"}, ';
                if (formattedTypes.indexOf(field.type) > -1) { mFields += '{"' + manyToMany.schemaName + '.' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", "' + fieldLabel + ' (Formatted)"}, '; }
                if (logicalNameTypes.indexOf(field.type) > -1) { mFields += '{"' + manyToMany.schemaName + '.' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", "' + fieldLabel + ' (Table)"}, '; };
            });
            if (mFields.slice(-2) === ', ') { mFields = mFields.slice(0, -2); }
            mRenameColumns += mFields;
            mRenameColumns += '}),\n\n\t';
        });
    }

    mRenameColumns += '#"Full Table" = ' + currentSource + ',\n\t';
    mRenameColumns += "// Comment the previous line and uncomment the next if you don't need the renamed columns\n\t";
    mRenameColumns += '// #"Full Table" = #"Before Rename"';
    return mRenameColumns;
}

DRB.GenerateCode.GetMLink = function (settings) {
    var mLink = '// Add Link\n\t';
    mLink += '#"Full Table With Link" = Table.AddColumn(#"Full Table", "Dataverse Link", each DataverseUrl & "/main.aspx?etn=' + settings.primaryEntity.logicalName + '&pagetype=entityrecord&id=%7b" & [' + settings.primaryIdField + '] & "%7d"),';
    return mLink;
}

DRB.GenerateCode.GetMEmptyTable = function (settings) {
    var mBeginTable = '#table(type table[';
    var mContentTable = '';
    var mContentTableRenamed = '';
    var mEndTable = '],{})\n\t';

    var formattedTypes = ["Picklist", "MultiPicklist", "State", "Status", "DateTime", "Owner", "Lookup", "Customer", "Boolean", "Decimal", "BigInt", "Integer", "EntityName", "Double"];
    var logicalNameTypes = ["Lookup", "Owner", "Customer"];

    if (settings.formattedValues === false) { formattedTypes = []; logicalNameTypes = []; }

    var mFields = '';
    var mFieldsRenamed = '';
    settings.fields.forEach(function (field) {
        var fieldLabel = field.label;
        fieldLabel = fieldLabel.replace(/"/g, '""');

        // the primary id doesn't get renamed (it will be used for the link)
        if (field.oDataName === settings.primaryIdField) { fieldLabel = field.oDataName; }

        mFields += '#"' + field.oDataName + '", ';
        mFieldsRenamed += '#"' + fieldLabel + '", ';
        if (formattedTypes.indexOf(field.type) > -1) {
            mFields += '#"' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
            mFieldsRenamed += '#"' + fieldLabel + ' (Formatted)", ';
        }
        if (logicalNameTypes.indexOf(field.type) > -1) {
            mFields += '#"' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
            mFieldsRenamed += '#"' + fieldLabel + ' (Table)", ';
        }
    });

    var fieldLogicalNames = settings.fields.map(function (field) { return field.oDataName; });
    if (fieldLogicalNames.indexOf(settings.primaryIdField) < 0) {
        mFields = '#"' + settings.primaryIdField + '", ' + mFields;
        mFieldsRenamed = '#"' + settings.primaryIdField + '", ' + mFieldsRenamed;
    }


    settings.oneToMany.forEach(function (oneToMany) {
        var mFields2 = '';
        var mFields2Renamed = '';
        oneToMany.fields.forEach(function (field) {
            var fieldLabel = field.label;
            fieldLabel = fieldLabel.replace(/"/g, '""');
            mFields2 += '#"' + oneToMany.schemaName + '.' + field.oDataName + '", ';
            mFields2Renamed += '#"' + oneToMany.schemaName + '.' + fieldLabel + '", ';
            if (formattedTypes.indexOf(field.type) > -1) {
                mFields2 += '#"' + oneToMany.schemaName + '.' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
                mFields2Renamed += '#"' + oneToMany.schemaName + '.' + fieldLabel + ' (Formatted)", ';
            }
            if (logicalNameTypes.indexOf(field.type) > -1) {
                mFields2 += '#"' + oneToMany.schemaName + '.' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
                mFields2Renamed += '#"' + oneToMany.schemaName + '.' + fieldLabel + ' (Table)", ';
            }
        });
        mFields += mFields2;
        mFieldsRenamed += mFields2Renamed;
    });

    settings.manyToOne.forEach(function (manyToOne) {
        var mFields2 = '';
        var mFields2Renamed = '';
        manyToOne.fields.forEach(function (field) {
            var fieldLabel = field.label;
            fieldLabel = fieldLabel.replace(/"/g, '""');
            mFields2 += '#"' + manyToOne.navigationProperty + '.' + field.oDataName + '", ';
            mFields2Renamed += '#"' + manyToOne.navigationProperty + '.' + fieldLabel + '", ';
            if (formattedTypes.indexOf(field.type) > -1) {
                mFields2 += '#"' + manyToOne.navigationProperty + '.' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
                mFields2Renamed += '#"' + manyToOne.navigationProperty + '.' + fieldLabel + ' (Formatted)", ';
            }
            if (logicalNameTypes.indexOf(field.type) > -1) {
                mFields2 += '#"' + manyToOne.navigationProperty + '.' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
                mFields2Renamed += '#"' + manyToOne.navigationProperty + '.' + fieldLabel + ' (Table)", ';
            }
        });
        mFields += mFields2;
        mFieldsRenamed += mFields2Renamed;
    });

    settings.manyToMany.forEach(function (manyToMany) {
        var mFields2 = '';
        var mFields2Renamed = '';
        manyToMany.fields.forEach(function (field) {
            var fieldLabel = field.label;
            fieldLabel = fieldLabel.replace(/"/g, '""');
            mFields2 += '#"' + manyToMany.schemaName + '.' + field.oDataName + '", ';
            mFields2Renamed += '#"' + manyToMany.schemaName + '.' + fieldLabel + '", ';
            if (formattedTypes.indexOf(field.type) > -1) {
                mFields2 += '#"' + manyToMany.schemaName + '.' + field.oDataName + '@OData.Community.Display.V1.FormattedValue", ';
                mFields2Renamed += '#"' + manyToMany.schemaName + '.' + fieldLabel + ' (Formatted)", ';
            }
            if (logicalNameTypes.indexOf(field.type) > -1) {
                mFields2 += '#"' + manyToMany.schemaName + '.' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname", ';
                mFields2Renamed += '#"' + manyToMany.schemaName + '.' + fieldLabel + ' (Table)", ';
            }
        });
        mFields += mFields2;
        mFieldsRenamed += mFields2Renamed;
    });

    mContentTable += mFields + '#"Dataverse Link"';
    mContentTableRenamed += mFieldsRenamed + '#"Dataverse Link"';

    var mEmptyTable = mBeginTable + mContentTableRenamed + mEndTable;
    mEmptyTable += "\t\t// Comment the previous line and uncomment the next if you don't need the renamed columns\n\t\t\t// ";
    mEmptyTable += mBeginTable + mContentTable + mEndTable;
    return mEmptyTable;
}

DRB.GenerateCode.CreateMCode = function (settings) {
    var m_code = `let
\t// GetODataFeed Function
\tGetODataFeed = (url as text) =>
\t\tlet
\t\t\tRelativeUrl = Text.Replace(url, DataverseUrl, ""),
\t\t\tODataContent = Json.Document(Web.Contents(DataverseUrl, [RelativePath=RelativeUrl, Headers=[Prefer="__includeannotations__odata.maxpagesize=5000"]])),
\t\t\tODataNextLink = try ODataContent[#"@odata.nextLink"] otherwise null,
\t\t\tODataResult = if ODataNextLink <> null
\t\t\t\tthen
\t\t\t\t\tList.Combine({ODataContent[value],@GetODataFeed(ODataNextLink)})
\t\t\t\telse
\t\t\t\tODataContent[value]
\t\tin
\t\t\tODataResult,
\t#"OData List" = GetODataFeed("__mainurl__"),

\t#"OData Check" = if List.IsEmpty(#"OData List")
\t\tthen
\t\t\t__emptytable__
\t\telse #"OData Table",

\t// Table
\t#"OData Table" = Table.FromList(#"OData List", Splitter.SplitByNothing(), null, null, ExtraValues.Error),

\t// Columns
\t#"Add Columns" = Table.ExpandRecordColumn(#"OData Table", "Column1",
\t\t__mainfieldsandrelationships__),

\t__relationships__,

\t__renamecolumns__,

\t__addlink__
\t#"Final Result" = if List.IsEmpty(#"OData List") then #"OData Check" else #"Full Table With Link"
in
\t#"Final Result"`;

    var includeAnnotationsCode = 'odata.include-annotations=*,';
    if (settings.formattedValues === false) { includeAnnotationsCode = ''; }

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
    var mainUrl = '/api/data/' + settings.version + '/' + settings.primaryEntity.entitySetName + urlFields;

    var mEmptyTable = DRB.GenerateCode.GetMEmptyTable(settings);
    var mFields = DRB.GenerateCode.GetMFields(settings);
    var mRelationships = DRB.GenerateCode.GetMRelationships(settings);
    var mRenameColumns = DRB.GenerateCode.GetMRenameColumns(settings);
    var mLink = DRB.GenerateCode.GetMLink(settings);

    m_code = m_code.replace('__includeannotations__', includeAnnotationsCode);
    m_code = m_code.replace('__mainurl__', mainUrl);
    m_code = m_code.replace('__emptytable__', mEmptyTable);
    m_code = m_code.replace('__mainfieldsandrelationships__', mFields);
    m_code = m_code.replace('__relationships__', mRelationships);
    m_code = m_code.replace('__renamecolumns__', mRenameColumns);
    m_code = m_code.replace('__addlink__', mLink);
    return m_code;
}

/**
 * Generate Code - Power Query
 */
DRB.GenerateCode.PowerQuery = function (requestType) {
    if (requestType !== "retrievemultiple") { return; }

    var tabName = "code_powerquery";
    var tabName2 = "code_powerquery2";

    var pqDiv = tabName + "_div";
    $("#" + pqDiv).empty();

    $("#" + pqDiv).append(DRB.UI.CreateSpacer());
    var divTable = DRB.UI.CreateTable(DRB.DOM.PowerQuery.Table.Id);
    $("#" + pqDiv).append(divTable);

    var pqSettings = [];

    switch (requestType) {
        case "retrievemultiple":
            pqSettings = ["BaseUrl"]; break;
    }

    pqSettings.forEach(function (setting) {
        var tr = DRB.UI.CreateTr(DRB.DOM.PowerQuery.Tr.Id + DRB.DOM.PowerQuery[setting + "Span"].Id);
        var tdLabel = DRB.UI.CreateTd(DRB.DOM.PowerQuery.TdLabel.Id + DRB.DOM.PowerQuery[setting + "Span"].Id);
        var tdValue = DRB.UI.CreateTd(DRB.DOM.PowerQuery.TdValue.Id + DRB.DOM.PowerQuery[setting + "Span"].Id);
        var tdCopy = DRB.UI.CreateTd(DRB.DOM.PowerQuery.TdCopy.Id + DRB.DOM.PowerQuery[setting + "Span"].Id);
        divTable.append(tr);
        tr.append(tdLabel);
        tr.append(tdValue);
        tr.append(tdCopy);

        tdLabel.append(DRB.UI.CreateSpan(DRB.DOM.PowerQuery[setting + "Span"].Id, DRB.DOM.PowerQuery[setting + "Span"].Name));
        tdValue.append(DRB.UI.CreateInputStringPowerAutomate(DRB.DOM.PowerQuery[setting + "Input"].Id));
        tdCopy.append(DRB.UI.CreateButton(DRB.DOM.PowerQuery.ButtonCopy.Id + DRB.DOM.PowerQuery[setting + "Span"].Id, DRB.DOM.PowerQuery.ButtonCopy.Name, DRB.DOM.PowerQuery.ButtonCopy.Class, DRB.Logic.CopyCodeForPowerQuery, setting, DRB.DOM.PowerQuery[setting + "Span"].Name));

    });

    var settings = DRB.Metadata.CurrentNode.data.configuration;


    var baseUrl = DRB.Xrm.GetClientUrl();

    switch (requestType) {
        case "retrievemultiple":
            $("#" + DRB.DOM.PowerQuery.BaseUrlInput.Id).val(baseUrl);
            break;
    }

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) { return; }

    $("#" + pqDiv).append(DRB.UI.CreateSpacer());
    var btn_copyCode = DRB.UI.CreateButton("btn_" + tabName + "_copy", "Copy Code", "btn-secondary", DRB.Logic.CopyCodeFromEditorByTabName, tabName);
    $("#" + pqDiv).append(btn_copyCode);
    $("#" + pqDiv).append(DRB.UI.CreateSpacer());
    $("#" + pqDiv).append(DRB.UI.CreateEmptyDiv(tabName + "_editor", "code_editor"));
    DRB.Settings.Editors[tabName] = ace.edit(tabName + "_editor", { useWorker: false });
    DRB.Settings.Editors[tabName].setShowPrintMargin(false);
    DRB.Settings.Editors[tabName].session.setMode("ace/mode/javascript");
    DRB.Settings.Editors[tabName].setOptions({ readOnly: true });

    var mCode = DRB.GenerateCode.CreateMCode(settings);
    DRB.Settings.Editors[tabName].session.setValue(mCode);

    $("#" + pqDiv).append(DRB.UI.CreateSpacer());
    $("#" + pqDiv).append(DRB.UI.CreateSpan(DRB.DOM.PowerQuery.SpanOptionSetDropdown.Id, DRB.DOM.PowerQuery.SpanOptionSetDropdown.Name));
    $("#" + pqDiv).append(DRB.UI.CreateDropdown(DRB.DOM.PowerQuery.OptionSetDropdown.Id));
    var queryColumns = [];
    settings.fields.forEach(function (field) {
        if (field.type === "Boolean" || field.type === "Picklist" || field.type === "MultiPicklist" || field.type === "State" || field.type === "Status") {
            var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, field.logicalName);
            if (DRB.Utilities.HasValue(column)) { queryColumns.push(column); }
        }
    });
    DRB.UI.FillDropdown(DRB.DOM.PowerQuery.OptionSetDropdown.Id, DRB.DOM.PowerQuery.OptionSetDropdown.Name, new DRB.Models.Records(queryColumns).ToDropdown());
    DRB.GenerateCode.BindPowerQueryColumn(DRB.DOM.PowerQuery.OptionSetDropdown.Id);
    $("#" + pqDiv).append(DRB.UI.CreateSpacer());
    var btn_copyCodeQueryColumn = DRB.UI.CreateButton("btn_" + tabName2 + "_querycolumn_copy", "Copy Code", "btn-secondary", DRB.Logic.CopyCodeFromEditorByTabName, tabName2);
    $("#" + pqDiv).append(btn_copyCodeQueryColumn);
    $("#" + pqDiv).append(DRB.UI.CreateSpacer());
    $("#" + pqDiv).append(DRB.UI.CreateEmptyDiv(tabName2 + "_editor", "code_editor"));
    DRB.Settings.Editors[tabName2] = ace.edit(tabName2 + "_editor", { useWorker: false });
    DRB.Settings.Editors[tabName2].setShowPrintMargin(false);
    DRB.Settings.Editors[tabName2].session.setMode("ace/mode/javascript");
    DRB.Settings.Editors[tabName2].setOptions({ readOnly: true });

    $("#" + pqDiv).append(DRB.UI.CreateSpacer());
}

/**
 * Generate Code - Grid
 */
DRB.GenerateCode.Grid = function (requestType) {
    if (requestType !== "retrievesingle" && requestType !== "retrievemultiple") { return; }

    let settings = DRB.Metadata.CurrentNode.data.configuration;
    let baseUrl = DRB.Xrm.GetClientUrl();
    let mainUrl = '';
    let urlFields = DRB.GenerateCode.GetUrlFields(settings);
    let jQueryHeaders = DRB.GenerateCode.GetJQueryRequestHeaders(settings);

    if (requestType === "retrievesingle") {
        let entityCriteria = settings.primaryId;
        if (settings.useAlternateKey === true) { entityCriteria = DRB.GenerateCode.GetAlternateKeys(settings); }
        mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")" + urlFields;
    }

    if (requestType === "retrievemultiple") {
        let filterFields = DRB.GenerateCode.GetFilterFields(settings);
        let orderFields = DRB.GenerateCode.GetOrderFields(settings);

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
        mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + urlFields;
    }

    // jQuery
    let codejQuery = [];
    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "GET",');
    codejQuery.push('\turl: "' + baseUrl + mainUrl + '",');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\theaders: {');
    jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    if (requestType === "retrievesingle") {
        codejQuery.push('\t\tvar values = data;');
        codejQuery.push('\t\tvar totalRecords = 1;');
    }
    if (requestType === "retrievemultiple") {
        codejQuery.push('\t\tvar values = data.value;');
        codejQuery.push('\t\tvar totalRecords = values.length;');
    }
    codejQuery.push('\t\tvar saveDate = new Date();');
    codejQuery.push('\t\tDRB.Metadata.GridResults = { Values: values, SaveDate: saveDate, EntitySetName: "' + settings.primaryEntity.entitySetName + '"  }');
    codejQuery.push('\t\tlet convertedTable = DRB.Logic.GridCreateTable(DRB.Metadata.GridResults.Values, false, "gridresults");');
    codejQuery.push(`\t\tlet headerContent = '<b>Table: ` + settings.primaryEntity.label + ` (` + settings.primaryEntity.logicalName + `) | Records: ' + totalRecords + ' | Date: ' + saveDate.toLocaleString("sv") + ' | <button id="b_expandall" type="button" class="gridexpand" onclick="DRB.Logic.GridExpandAllTables();">Expand All</button> | <button id="b_collapseall" type="button" class="gridexpand" onclick="DRB.Logic.GridCollapseAllTables();">Collapse All</button> | <button id="b_downloadcsv" type="button" class="gridexpand" onclick="DRB.Logic.GridDownloadCSV();">Download CSV</button></b>';`);
    codejQuery.push('\t\t$("#' + DRB.DOM.Grid.DivHeader.Id + '").html(headerContent);');
    codejQuery.push('\t\t$("#' + DRB.DOM.Grid.DivDetails.Id + '").html(convertedTable);');
    codejQuery.push('\t\tDRB.UI.HideLoading();');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tDRB.UI.ShowError("Grid Error", "Error retrieving the results");');
    codejQuery.push('\t}');
    codejQuery.push('});');

    var codeToExecute = codejQuery.join('\n');

    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsBEMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode()) {
        let token = DRB.Xrm.GetCurrentAccessToken();
        if (DRB.Utilities.HasValue(token)) {
            codeToExecute = codeToExecute.replace(/headers: {/gi, 'headers: { "Authorization": "Bearer ' + token + '",');
        }
    }
    DRB.UI.ShowLoading("Refreshing Grid...");
    setTimeout(function () {
        try {
            eval(codeToExecute);
        } catch (ex) {
            DRB.UI.ShowError("Grid Error", "Error executing code");
        }
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Generate Code - Start
 */
DRB.GenerateCode.Start = function () {
    var requestType = $("#" + DRB.DOM.RequestType.Dropdown.Id).val();
    DRB.GenerateCode.PowerAutomate(requestType);
    try { DRB.GenerateCode.PowerQuery(requestType); } catch (e) { console.log(e); }
    switch (requestType) {
        case "retrievesingle": DRB.GenerateCode.RetrieveSingle(); break;
        case "retrievemultiple": DRB.GenerateCode.RetrieveMultiple(); break;
        case "create": DRB.GenerateCode.Create(); break;
        case "update": DRB.GenerateCode.Update(); break;
        case "delete": DRB.GenerateCode.Delete(); break;
        case "associate": DRB.GenerateCode.Associate(); break;
        case "disassociate": DRB.GenerateCode.Disassociate(); break;
        case "retrievenextlink": DRB.GenerateCode.RetrieveNextLink(); break;
        case "predefinedquery": DRB.GenerateCode.PredefinedQuery(); break;
        case "executeworkflow": DRB.GenerateCode.ExecuteWorkflow(); break;

        // Manage File Data and Manage Image Data share the same code
        case "managefiledata":
        case "manageimagedata":
            DRB.GenerateCode.ManageFileImageData(requestType);
            break;

        // Custom API, Custom Action, Action, Function share the same code
        case "executecustomapi":
        case "executecustomaction":
        case "executeaction":
        case "executefunction":
            DRB.GenerateCode.DataverseExecute(requestType);
            break;
    }
}
// #endregion