// #region DRB.GenerateCode
/**
 * Generate Code - Set Code Editors
 * @param {string[]} codeXrmWebApi Code Xrm.WebApi
 * @param {string[]} codeXrmWebApiExecute Code Xrm.WebApi Execute
 * @param {string[]} codejQuery Code jQuery
 * @param {string[]} codeXMLHttpRequest Code XMLHttpRequest
 * @param {string[]} codePortals Code Portals
 */
DRB.GenerateCode.SetCodeEditors = function (codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codePortals) {
    if (!DRB.Utilities.HasValue(codeXrmWebApi)) { codeXrmWebApi = []; }
    if (!DRB.Utilities.HasValue(codeXrmWebApiExecute)) { codeXrmWebApiExecute = []; } // Xrm.WebApi execute is available only for Retrieve Single, Create, Update, Delete
    if (!DRB.Utilities.HasValue(codejQuery)) { codejQuery = []; }
    if (!DRB.Utilities.HasValue(codeXMLHttpRequest)) { codeXMLHttpRequest = []; }
    if (!DRB.Utilities.HasValue(codePortals)) { codePortals = []; } // Portals is available only for Retrieve Single, Retrieve Multiple, Create, Update, Delete, Associate, Disassociate

    // Insert the code inside the editors
    DRB.Settings.XrmWebApiEditor.session.setValue(codeXrmWebApi.join('\n'));
    DRB.Settings.XrmWebApiExecuteEditor.session.setValue(codeXrmWebApiExecute.join('\n'));
    DRB.Settings.jQueryEditor.session.setValue(codejQuery.join('\n'));
    DRB.Settings.XMLHttpRequestEditor.session.setValue(codeXMLHttpRequest.join('\n'));
    DRB.Settings.PortalsEditor.session.setValue(codePortals.join('\n'));
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

    settings.manyToOne.forEach(function (ManyToOne) {
        var relFieldLogicalNames = ManyToOne.fields.map(function (field) { return field.oDataName; });
        urlFields += ManyToOne.navigationProperty + '($select=' + relFieldLogicalNames.join() + '),';
    });

    settings.manyToMany.forEach(function (ManyToMany) {
        var relFieldLogicalNames = ManyToMany.fields.map(function (field) { return field.oDataName; });
        urlFields += ManyToMany.schemaName + '($select=' + relFieldLogicalNames.join() + '),';
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
                                parameter.value.forEach(function (v) { printedArray += encodeURIComponent('"' + v + '"') + ', '; });
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
                            if (DRB.Utilities.HasValue(parameter.value)) { value = "'" + encodeURIComponent(parameter.value) + "'"; }
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
            configurationObject.filterFields.forEach(function (filterField) {
                if (JSON.stringify(filterField) !== JSON.stringify({})) {
                    partialQuery += " " + filterFieldsLogic + " ";
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
                                operatorFound = true;
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + filterField.logicalName + "')";
                                break;
                        }
                        if (operatorFound === false) {
                            // default syntax
                            partialQuery += filterField.oDataName + " " + filterField.operator;
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
                                }
                                partialQuery += filterField.operator + "(" + filterField.oDataName + ",'" + clearedValue + "')";
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
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + filterField.oDataName + "',PropertyValues=[" + clearedValue + "])";
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
                            case "NextXFiscalPeriods": // Microsoft.Dynamics.CRM.NextXFiscalPeriods(PropertyName='createdon',PropertyValue=1)
                            case "LastXFiscalPeriods": // Microsoft.Dynamics.CRM.LastXFiscalPeriods(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXMinutes": // Microsoft.Dynamics.CRM.OlderThanXMinutes(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXHours": // Microsoft.Dynamics.CRM.OlderThanXHours(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXDays": // Microsoft.Dynamics.CRM.OlderThanXDays(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXWeeks": // Microsoft.Dynamics.CRM.OlderThanXWeeks(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXMonths": // Microsoft.Dynamics.CRM.OlderThanXMonths(PropertyName='createdon',PropertyValue=1)
                            case "OlderThanXYears": // Microsoft.Dynamics.CRM.OlderThanXYears(PropertyName='createdon',PropertyValue=1)
                                operatorFound = true;
                                var clearedValue = filterField.value;
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + filterField.oDataName + "',PropertyValue=" + clearedValue + ")";
                                break;
                        }
                        if (operatorFound === false) {
                            // default syntax: fieldname operator value
                            var clearedValue = "";
                            if (DRB.Utilities.HasValue(filterField.value)) { clearedValue = filterField.value; }
                            if (filterField.type === "String" || filterField.type === "Memo") {
                                clearedValue = clearedValue.replace(/"/g, '\\"');
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
                            partialQuery += filterField.oDataName + " " + filterField.operator + " " + clearedValue;
                        }
                    }
                }
            });

        }
        // remove initial logic filter
        if (partialQuery !== "") { partialQuery = partialQuery.substring((" " + filterFieldsLogic + " ").length); }
        query += partialQuery;
        return query;
    }

    if (configurationObject.filterType === "groups") {
        var filterGroupsLogic = "and";
        if (configurationObject.hasOwnProperty("filterGroupsLogic")) { filterGroupsLogic = configurationObject.filterGroupsLogic; }

        configurationObject.filterGroups.forEach(function (filterGroup, filterGroupIndex) {
            if (JSON.stringify(filterGroup) !== JSON.stringify({})) {
                // use "{" and "}" for differentiate groups from fields, they will replaced inside GetFilterFields function
                if (filterGroupIndex === 0) { query += "{"; }
                else { query += " " + filterGroupsLogic + " {"; }
                query = DRB.GenerateCode.ParseFilterCriteria(query, filterGroup);
                query += "}";
            }
        });
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

    // clear filterFields (removing empty clauses, change {} to () and remove empty logic operators)
    if (filterFields !== "") {
        // replace {} with '', while due to situations like {{{}}} 
        var countEmpty = (filterFields.match(/{}/g) || []).length;
        while (countEmpty > 0) {
            filterFields = filterFields.replace(/{}/g, "");
            countEmpty = (filterFields.match(/{}/g) || []).length;
        }

        filterFields = filterFields.replace(/{/g, "("); // replace "{" to "("
        filterFields = filterFields.replace(/}/g, ")"); // replace "}" to ")"

        filterFields = filterFields.replace(/or  or/g, "or"); // replace "or  or" with "or"
        filterFields = filterFields.replace(/and  and/g, "and"); // replace "and  and" with "and"

        if (filterFields.indexOf(" or ") === 0) { filterFields = filterFields.substring(4); } // remove wrong initial " or "
        if (filterFields.indexOf(" and ") === 0) { filterFields = filterFields.substring(5); } // remove wrong initial " and "

        // check final " or "
        if (filterFields.length > 3) {
            var finalString = filterFields.substring(filterFields.length - 4);
            if (finalString === " or ") { filterFields = filterFields.substring(0, filterFields.length - 4); }
        }
        // check final " and "
        if (filterFields.length > 4) {
            var finalString = filterFields.substring(filterFields.length - 5);
            if (finalString === " and ") { filterFields = filterFields.substring(0, filterFields.length - 5); }
        }
    }

    if (filterFields !== "") {
        // clear () if they are the only one at first char and last char
        if (filterFields.lastIndexOf("(") === 0 && filterFields.indexOf(")") === filterFields.length - 1) {
            filterFields = filterFields.substring(1, filterFields.length - 1);
        }
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
        if (JSON.stringify(field) !== JSON.stringify({})) { orderFields += field.oDataName + ' ' + field.value + ','; }
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
 * Generate Code - Get Request Headers
 * @param {any} settings Configuration
 */
DRB.GenerateCode.GetRequestHeaders = function (settings) {
    // Request Headers
    var headers = [];
    headers.push('req.setRequestHeader("OData-MaxVersion", "4.0");');
    headers.push('req.setRequestHeader("OData-Version", "4.0");');
    headers.push('req.setRequestHeader("Accept", "application/json");');

    // Formatted Values and Return Record
    if (settings.hasOwnProperty("formattedValues")) {
        if (!settings.hasOwnProperty("returnRecord") && !settings.hasOwnProperty("topCount")) {
            if (settings.formattedValues === true) { headers.push('req.setRequestHeader("Prefer", "odata.include-annotations=\\"*\\"");'); }
        }
        else {
            if (settings.hasOwnProperty("returnRecord")) {
                if (settings.formattedValues === true && settings.returnRecord !== true) { headers.push('req.setRequestHeader("Prefer", "odata.include-annotations=\\"*\\"");'); }
                if (settings.formattedValues !== true && settings.returnRecord === true) { headers.push('req.setRequestHeader("Prefer", "return=representation");'); }
                if (settings.formattedValues === true && settings.returnRecord === true) { headers.push('req.setRequestHeader("Prefer", "odata.include-annotations=\\"*\\",return=representation");'); }
            }
            if (settings.hasOwnProperty("topCount")) {
                var hasTopCount = DRB.Utilities.HasValue(settings.topCount);
                if (settings.formattedValues === true && hasTopCount !== true) { headers.push('req.setRequestHeader("Prefer", "odata.include-annotations=\\"*\\"");'); }
                if (settings.formattedValues !== true && hasTopCount === true) { headers.push('req.setRequestHeader("Prefer", "odata.maxpagesize=' + settings.topCount + '");'); }
                if (settings.formattedValues === true && hasTopCount === true) { headers.push('req.setRequestHeader("Prefer", "odata.include-annotations=\\"*\\",odata.maxpagesize=' + settings.topCount + '");'); }
            }
        }
    }

    // Token Header
    if (settings.hasOwnProperty("tokenHeader") && settings.tokenHeader === true) {
        headers.push('var token = ""; // Set token value');
        headers.push('req.setRequestHeader("Authorization", "Bearer " + token);');
    }

    // Impersonate
    if (settings.hasOwnProperty("impersonate") && settings.impersonate === true) {
        var impersonateId = "";
        if (DRB.Utilities.HasValue(settings.impersonateId)) { impersonateId = settings.impersonateId; }
        headers.push('req.setRequestHeader("MSCRMCallerID", "' + impersonateId + '");');
    }

    // Detect Changes
    if (settings.hasOwnProperty("detectChanges") && settings.detectChanges === true) { headers.push('req.setRequestHeader("If-None-Match", "W\\\/\\"000000\\""); // Change 000000 to your value'); }

    // Detect Duplicates
    if (settings.hasOwnProperty("detectDuplicates") && settings.detectDuplicates === true) { headers.push('req.setRequestHeader("MSCRM.SuppressDuplicateDetection", "false");'); }

    // Prevent
    if (settings.hasOwnProperty("prevent")) {
        if (settings.prevent === "create") { headers.push('req.setRequestHeader("If-Match", "*");'); }
        if (settings.prevent === "update") { headers.push('req.setRequestHeader("If-None-Match", "*");'); }
    }
    return headers;
}


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
        codeFields.push('for (var i = 0; i < result.' + oneToMany.schemaName + '.length; i++) {');
        codeFieldsFormatted.push('for (var i = 0; i < result.' + oneToMany.schemaName + '.length; i++) {');
        oneToMany.fields.forEach(function (field) {

            var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);

            codeFields.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + ' = result.' + oneToMany.schemaName + '[i]["' + field.oDataName + '"]; // ' + renamedFieldType);
            codeFieldsFormatted.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + ' = result.' + oneToMany.schemaName + '[i]["' + field.oDataName + '"]; // ' + renamedFieldType);
            if (formattedTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + '_formatted = result.' + oneToMany.schemaName + '[i]["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
            }
            if (logicalNameTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + oneToMany.schemaName + '_' + field.logicalName + '_lookuplogicalname = result.' + oneToMany.schemaName + '[i]["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
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
        codeFields.push('if (result.hasOwnProperty("' + manyToOne.navigationProperty + '")) {');
        codeFieldsFormatted.push('if (result.hasOwnProperty("' + manyToOne.navigationProperty + '")) {');
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
    settings.manyToMany.forEach(function (ManyToMany) {
        codeFields.push('for (var i = 0; i < result.' + ManyToMany.schemaName + '.length; i++) {');
        codeFieldsFormatted.push('for (var i = 0; i < result.' + ManyToMany.schemaName + '.length; i++) {');
        ManyToMany.fields.forEach(function (field) {

            var renamedFieldType = DRB.GenerateCode.ConvertFieldType(field.type);

            codeFields.push('\tvar ' + ManyToMany.schemaName + '_' + field.logicalName + ' = result.' + ManyToMany.schemaName + '[i]["' + field.oDataName + '"]; // ' + renamedFieldType);
            codeFieldsFormatted.push('\tvar ' + ManyToMany.schemaName + '_' + field.logicalName + ' = result.' + ManyToMany.schemaName + '[i]["' + field.oDataName + '"]; // ' + renamedFieldType);
            if (formattedTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + ManyToMany.schemaName + '_' + field.logicalName + '_formatted = result.' + ManyToMany.schemaName + '[i]["' + field.oDataName + '@OData.Community.Display.V1.FormattedValue"];');
            }
            if (logicalNameTypes.indexOf(field.type) > -1) {
                codeFieldsFormatted.push('\tvar ' + ManyToMany.schemaName + '_' + field.logicalName + '_lookuplogicalname = result.' + ManyToMany.schemaName + '[i]["' + field.oDataName + '@Microsoft.Dynamics.CRM.lookuplogicalname"];');
            }
        });
        codeFields.push('}');
        codeFieldsFormatted.push('}');
    });
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
    if (includeExpandWarning === true) { warnings.push("// WARNING: Xrm.WebApi.online.execute doesn't support $expand"); }

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
    code.push("// IMPORTANT NOTE! Web API operations in Portals is a PREVIEW feature, please read the following documentation:");
    code.push('// https://docs.microsoft.com/en-us/powerapps/maker/portals/web-api-overview');
    code.push('// "webapi.safeAjax" wrapper is based on the code from this page:');
    code.push('// https://docs.microsoft.com/en-us/powerapps/maker/portals/web-api-http-requests-handle-errors');
    code.push('');

    if (settings.hasOwnProperty("async") && settings.async === false) { warnings.push("// WARNING: Portals doesn't support Synchronous mode"); }
    if (settings.hasOwnProperty("tokenHeader") && settings.tokenHeader === true) { warnings.push("// WARNING: Portals doesn't support Token Header"); }
    if (settings.hasOwnProperty("impersonate") && settings.impersonate === true) { warnings.push("// WARNING: Portals doesn't support Impersonation"); }
    if (settings.hasOwnProperty("formattedValues") && settings.formattedValues === true) { warnings.push("// WARNING: Portals doesn't support Formatted Values"); }
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
 * Generate Code - Retrieve Single
 */
DRB.GenerateCode.RetrieveSingle = function () {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codeXrmWebApiExecute = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];
    var codePortals = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codePortals);
        return;
    }

    var urlFields = DRB.GenerateCode.GetUrlFields(settings);

    var entityCriteria = settings.primaryId;
    if (settings.useAlternateKey === true) { entityCriteria = DRB.GenerateCode.GetAlternateKeys(settings); }


    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")" + urlFields;
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")" + urlFields;

    // Request Headers
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

    // Code Fields
    var getCodeFields = DRB.GenerateCode.GetCodeFields(settings);
    var codeFields = getCodeFields[0];
    var codeFieldsFormatted = getCodeFields[1];
    var codeFieldsFormattedOnlyRecord = getCodeFields[2];

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);

    codeXrmWebApi.push('// NOTE: retrieveRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.retrieveRecord');
    codeXrmWebApi.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');
    var entityCriteriaXrmWebApi = entityCriteria;
    if (settings.useAlternateKey === true) { entityCriteriaXrmWebApi = ""; }
    var urlFieldsXrmWebApi = urlFields;
    if (urlFields !== '') { urlFieldsXrmWebApi = ', "' + urlFields + '"'; }
    codeXrmWebApi.push('Xrm.WebApi.online.retrieveRecord("' + settings.primaryEntity.logicalName + '", "' + entityCriteriaXrmWebApi + '"' + urlFieldsXrmWebApi + ').then(');
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
    codeXrmWebApiExecute.push('// NOTE: you can use Xrm.WebApi.online.execute if this request needs to be part of an executeMultiple collection');
    codeXrmWebApiExecute.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple');

    codeXrmWebApiExecute.push('var retrieveRequest = {');
    codeXrmWebApiExecute.push('\tentityReference: { entityType: "' + settings.primaryEntity.logicalName + '", id: "' + entityCriteriaXrmWebApi + '" },');

    var executeColumns = '';
    if (settings.fields.length > 0) {
        settings.fields.forEach(function (field) { executeColumns += '"' + field.logicalName + '", '; });
        executeColumns = executeColumns.slice(0, -2);
    }

    codeXrmWebApiExecute.push('\tcolumns: [' + executeColumns + '],');
    codeXrmWebApiExecute.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Retrieve" }; }');
    codeXrmWebApiExecute.push('};');
    codeXrmWebApiExecute.push('');

    codeXrmWebApiExecute.push('Xrm.WebApi.online.execute(retrieveRequest).then(');
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
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tbeforeSend: function (req) {');

    var requestHeadersJQuery = [];
    requestHeaders.forEach(function (reqHeader) { requestHeadersJQuery.push('\t\t' + reqHeader); });
    codejQuery.push(requestHeadersJQuery.join('\n'));

    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    var codejQueryIndent = '\t\t';
    if (settings.detectChanges === true) {
        codejQueryIndent += '\t';
        codejQuery.push('\t\tif (xhr.status === 304) {');
        codejQuery.push('\t\t\t// Handle data not changed');
        codejQuery.push('\t\t} else {');
    }

    codejQuery.push(codejQueryIndent + 'var result = data;');
    codejQuery.push(codejQueryIndent + 'console.log(result);');
    var codeFieldsJQuery = [];
    if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codeFieldsJQuery.push(codejQueryIndent + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codeFieldsJQuery.push(codejQueryIndent + codeField); });
    }
    codejQuery.push(codeFieldsJQuery.join('\n'));
    if (settings.detectChanges === true) { codejQuery.push('\t\t}'); }
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr.responseText);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(requestHeaders.join('\n'));

    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
    codeXMLHttpRequest.push('\t\t\tvar result = JSON.parse(this.response);');
    codeXMLHttpRequest.push('\t\t\tconsole.log(result);');
    var codeFieldsXmlHttp = [];
    if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codeFieldsXmlHttp.push('\t\t\t' + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codeFieldsXmlHttp.push('\t\t\t' + codeField); });
    }
    codeXMLHttpRequest.push(codeFieldsXmlHttp.join('\n'));
    if (settings.detectChanges === true) {
        codeXMLHttpRequest.push('\t\t} else if (this.status === 304) {');
        codeXMLHttpRequest.push('\t\t\t// Handle data not changed');
    }
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // #endregion

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "GET",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tcontentType: "application/json",');
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tvar result = data;');
    codePortals.push('\t\tconsole.log(result);');

    var codeFieldsPortals = [];
    codeFields.forEach(function (codeField) { codeFieldsPortals.push('\t\t' + codeField); });
    codePortals.push(codeFieldsPortals.join('\n'));

    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codePortals);
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
    var codePortals = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codePortals);
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
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

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
    codeXrmWebApi.push('// NOTE: retrieveMultipleRecords is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.retrieveMultipleRecords');
    codeXrmWebApi.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');
    codeXrmWebApi.push('Xrm.WebApi.online.retrieveMultipleRecords("' + settings.primaryEntity.logicalName + '"' + urlFieldsXrmWebApi + ').then(');
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
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tbeforeSend: function (req) {');

    var requestHeadersJQuery = [];
    requestHeaders.forEach(function (reqHeader) { requestHeadersJQuery.push('\t\t' + reqHeader); });
    codejQuery.push(requestHeadersJQuery.join('\n'));

    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');

    codejQuery.push('\t\tvar results = data;');
    codejQuery.push('\t\tconsole.log(results);');
    if (settings.retrieveCount === true) { codejQuery.push('\t\tvar odata_count = results["@odata.count"];'); }
    if (DRB.Utilities.HasValue(settings.topCount)) { codejQuery.push('\t\tvar odata_nextlink = results["@odata.nextLink"];'); }
    codejQuery.push('\t\tfor (var i = 0; i < results.value.length; i++) {');
    codejQuery.push('\t\t\tvar result = results.value[i];');
    var codeFieldsJQuery = [];
    if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codeFieldsJQuery.push('\t\t\t' + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codeFieldsJQuery.push('\t\t\t' + codeField); });
    }
    codejQuery.push(codeFieldsJQuery.join('\n'));

    codejQuery.push('\t\t}');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr.responseText);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // End jQuery

    // XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(requestHeaders.join('\n'));

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
    var codeFieldsXmlHttp = [];
    if (settings.formattedValues === true) {
        codeFieldsFormatted.forEach(function (codeField) { codeFieldsXmlHttp.push('\t\t\t\t' + codeField); });
    } else {
        codeFields.forEach(function (codeField) { codeFieldsXmlHttp.push('\t\t\t\t' + codeField); });
    }
    codeXMLHttpRequest.push(codeFieldsXmlHttp.join('\n'));
    codeXMLHttpRequest.push('\t\t\t}');
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // End XMLHttpRequest

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "GET",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tcontentType: "application/json",');
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tvar results = data;');
    codePortals.push('\t\tconsole.log(results);');
    if (settings.retrieveCount === true) { codePortals.push('\t\tvar odata_count = results["@odata.count"];'); }
    codePortals.push('\t\tfor (var i = 0; i < results.value.length; i++) {');
    codePortals.push('\t\t\tvar result = results.value[i];');
    var codeFieldsPortals = [];
    codeFields.forEach(function (codeField) { codeFieldsPortals.push('\t\t\t' + codeField); });
    codePortals.push(codeFieldsPortals.join('\n'));
    codePortals.push('\t\t}');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codePortals);
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
    var codePortals = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codePortals);
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
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

    // Code Entity
    var codeEntity = DRB.GenerateCode.GetCodeEntity(settings);

    // Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('// NOTE: createRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.createRecord');
    codeXrmWebApi.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');

    // add Code Entity
    codeEntity.forEach(function (line) { codeXrmWebApi.push(line); });

    codeXrmWebApi.push('Xrm.WebApi.online.createRecord("' + settings.primaryEntity.logicalName + '", record).then(');
    codeXrmWebApi.push('\tfunction success(result) {');
    codeXrmWebApi.push('\t\tvar newId = result.id;');
    codeXrmWebApi.push('\t\tconsole.log(newId);');
    codeXrmWebApi.push('\t},');
    codeXrmWebApi.push('\tfunction(error) {');
    codeXrmWebApi.push('\t\tconsole.log(error.message);');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(');');
    // End Xrm.WebApi


    // Xrm.WebApi.execute
    codeXrmWebApiExecute = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApiExecute.push('// NOTE: you can use Xrm.WebApi.online.execute if this request needs to be part of an executeMultiple collection');
    codeXrmWebApiExecute.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple');
    // add Code Entity
    codeEntity.forEach(function (line) { codeXrmWebApiExecute.push(line); });
    codeXrmWebApiExecute.push('var createRequest = {');
    codeXrmWebApiExecute.push('\tetn: "' + settings.primaryEntity.logicalName + '",');
    codeXrmWebApiExecute.push('\tpayload: record,');
    codeXrmWebApiExecute.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Create" }; }');
    codeXrmWebApiExecute.push('};');
    codeXrmWebApiExecute.push('');

    codeXrmWebApiExecute.push('Xrm.WebApi.online.execute(createRequest).then(');
    codeXrmWebApiExecute.push('\tfunction success(response) {');
    codeXrmWebApiExecute.push('\t\tif (response.ok) {');
    codeXrmWebApiExecute.push('\t\t\tconsole.log("Record created");');
    codeXrmWebApiExecute.push('\t\t}');
    codeXrmWebApiExecute.push('\t}');

    codeXrmWebApiExecute.push(').catch(function (error) {');
    codeXrmWebApiExecute.push('\tconsole.log(error.message);');
    codeXrmWebApiExecute.push('});');
    // End Xrm.WebApi.execute


    // jQuery
    // add Code Entity
    codeEntity.forEach(function (line) { codejQuery.push(line); });

    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "POST",');
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tdata: JSON.stringify(record),');
    codejQuery.push('\tbeforeSend: function (req) {');

    var requestHeadersJQuery = [];
    requestHeaders.forEach(function (reqHeader) { requestHeadersJQuery.push('\t\t' + reqHeader); });
    codejQuery.push(requestHeadersJQuery.join('\n'));

    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
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
        codejQuery.push('\t\tvar uri = xhr.getResponseHeader("OData-EntityId");');
        codejQuery.push('\t\tvar regExp = /\\(([^)]+)\\)/;');
        codejQuery.push('\t\tvar matches = regExp.exec(uri);');
        codejQuery.push('\t\tvar newId = matches[1];');
        codejQuery.push('\t\tconsole.log(newId);');
    }
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr.responseText);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // End jQuery

    // XMLHttpRequest
    codeEntity.forEach(function (line) { codeXMLHttpRequest.push(line); });

    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(requestHeaders.join('\n'));
    codeXMLHttpRequest.push('req.setRequestHeader("Content-Type", "application/json; charset=utf-8");'); // request is POST, add this additional header only for XMLHttpRequest
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');

    if (settings.returnRecord === true) {
        codeXMLHttpRequest.push('\t\tif (this.status === 201) {');
        codeXMLHttpRequest.push('\t\t\tvar result = JSON.parse(this.response);');
        codeXMLHttpRequest.push('\t\t\tconsole.log(result);');
        var codeFieldsXMLHttpRequest = [];
        if (settings.formattedValues === true) {
            codeFieldsFormatted.forEach(function (codeField) { codeFieldsXMLHttpRequest.push('\t\t\t' + codeField); });
        } else {
            codeFields.forEach(function (codeField) { codeFieldsXMLHttpRequest.push('\t\t\t' + codeField); });
        }
        codeXMLHttpRequest.push(codeFieldsXMLHttpRequest.join('\n'));
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
    // End XMLHttpRequest

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
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codePortals);
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
    var codePortals = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codePortals);
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
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

    // Code Entity
    var codeEntity = DRB.GenerateCode.GetCodeEntity(settings);

    // Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('// NOTE: updateRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.updateRecord');
    codeXrmWebApi.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');

    // add Code Entity
    codeEntity.forEach(function (line) { codeXrmWebApi.push(line); });
    var entityCriteriaXrmWebApi = entityCriteria;
    if (settings.useAlternateKey === true) { entityCriteriaXrmWebApi = ""; }
    codeXrmWebApi.push('Xrm.WebApi.online.updateRecord("' + settings.primaryEntity.logicalName + '", "' + entityCriteriaXrmWebApi + '", record).then(');
    codeXrmWebApi.push('\tfunction success(result) {');
    codeXrmWebApi.push('\t\tvar updatedId = result.id;');
    codeXrmWebApi.push('\t\tconsole.log(updatedId);');
    codeXrmWebApi.push('\t},');
    codeXrmWebApi.push('\tfunction(error) {');
    codeXrmWebApi.push('\t\tconsole.log(error.message);');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(');');
    // End Xrm.WebApi

    // Xrm.WebApi.execute
    codeXrmWebApiExecute = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApiExecute.push('// NOTE: you can use Xrm.WebApi.online.execute if this request needs to be part of an executeMultiple collection');
    codeXrmWebApiExecute.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple');
    // add Code Entity
    codeEntity.forEach(function (line) { codeXrmWebApiExecute.push(line); });
    codeXrmWebApiExecute.push('var updateRequest = {');
    codeXrmWebApiExecute.push('\tetn: "' + settings.primaryEntity.logicalName + '",');
    codeXrmWebApiExecute.push('\tid: "' + entityCriteriaXrmWebApi + '",');
    codeXrmWebApiExecute.push('\tpayload: record,');
    codeXrmWebApiExecute.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Update" }; }');
    codeXrmWebApiExecute.push('};');
    codeXrmWebApiExecute.push('');

    codeXrmWebApiExecute.push('Xrm.WebApi.online.execute(updateRequest).then(');
    codeXrmWebApiExecute.push('\tfunction success(response) {');
    codeXrmWebApiExecute.push('\t\tif (response.ok) {');
    codeXrmWebApiExecute.push('\t\t\tconsole.log("Record updated");');
    codeXrmWebApiExecute.push('\t\t}');
    codeXrmWebApiExecute.push('\t}');

    codeXrmWebApiExecute.push(').catch(function (error) {');
    codeXrmWebApiExecute.push('\tconsole.log(error.message);');
    codeXrmWebApiExecute.push('});');
    // End Xrm.WebApi.execute




    // jQuery
    // add Code Entity
    codeEntity.forEach(function (line) { codejQuery.push(line); });

    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "PATCH",');
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tdata: JSON.stringify(record),');
    codejQuery.push('\tbeforeSend: function (req) {');

    var requestHeadersJQuery = [];
    requestHeaders.forEach(function (reqHeader) { requestHeadersJQuery.push('\t\t' + reqHeader); });
    codejQuery.push(requestHeadersJQuery.join('\n'));

    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
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
    codejQuery.push('\t\tconsole.log(xhr.responseText);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // End jQuery

    // XMLHttpRequest
    codeEntity.forEach(function (line) { codeXMLHttpRequest.push(line); });

    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("PATCH", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(requestHeaders.join('\n'));
    codeXMLHttpRequest.push('req.setRequestHeader("Content-Type", "application/json; charset=utf-8");'); // request is PATCH, add this additional header only for XMLHttpRequest
    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');

    if (settings.returnRecord === true) {
        codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
        codeXMLHttpRequest.push('\t\t\tvar result = JSON.parse(this.response);');
        codeXMLHttpRequest.push('\t\t\tconsole.log(result);');
        var codeFieldsXMLHttpRequest = [];
        if (settings.formattedValues === true) {
            codeFieldsFormatted.forEach(function (codeField) { codeFieldsXMLHttpRequest.push('\t\t\t' + codeField); });
        } else {
            codeFields.forEach(function (codeField) { codeFieldsXMLHttpRequest.push('\t\t\t' + codeField); });
        }
        codeXMLHttpRequest.push(codeFieldsXMLHttpRequest.join('\n'));
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
    // End XMLHttpRequest

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
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codePortals);
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
    var codePortals = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codePortals);
        return;
    }

    var entityCriteria = settings.primaryId;
    if (settings.useAlternateKey === true) { entityCriteria = DRB.GenerateCode.GetAlternateKeys(settings); }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")";
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")";

    // Request Headers
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApi.push('// NOTE: deleteRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.deleteRecord');
    codeXrmWebApi.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');
    var entityCriteriaXrmWebApi = entityCriteria;
    if (settings.useAlternateKey === true) { entityCriteriaXrmWebApi = ""; }
    codeXrmWebApi.push('Xrm.WebApi.online.deleteRecord("' + settings.primaryEntity.logicalName + '", "' + entityCriteriaXrmWebApi + '").then(');
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
    codeXrmWebApiExecute.push('// NOTE: you can use Xrm.WebApi.online.execute if this request needs to be part of an executeMultiple collection');
    codeXrmWebApiExecute.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple');
    codeXrmWebApiExecute.push('var deleteRequest = {');
    codeXrmWebApiExecute.push('\tentityReference: { entityType: "' + settings.primaryEntity.logicalName + '", id: "' + entityCriteriaXrmWebApi + '" },');
    codeXrmWebApiExecute.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Delete" }; }');
    codeXrmWebApiExecute.push('};');
    codeXrmWebApiExecute.push('');
    codeXrmWebApiExecute.push('Xrm.WebApi.online.execute(deleteRequest).then(');
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
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tbeforeSend: function (req) {');
    requestHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tconsole.log("Record deleted");');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr.responseText);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("DELETE", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(requestHeaders.join('\n'));
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

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "DELETE",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tcontentType: "application/json",');
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tconsole.log("Record deleted");');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codePortals);
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
    var codePortals = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.secondaryEntity)) {
        // Don't generate the code if a table is not selected

        var errorMessage = "";
        if (!DRB.Utilities.HasValue(settings.primaryEntity)) { errorMessage = "// Select a Parent Table first"; }
        else { errorMessage = "// Select a Child Table first"; }

        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codePortals);
        return;
    }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "/$ref";
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "/$ref";

    // Request Headers
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

    // Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);

    codeXrmWebApi.push("// NOTE: Associate Request in Xrm.WebApi supports multiple children, you can add them inside the relatedEntities array");
    codeXrmWebApi.push('var associateRequest = {');
    codeXrmWebApi.push('\ttarget: { entityType: "' + settings.primaryEntity.logicalName + '", id: "' + settings.primaryId + '" },');
    codeXrmWebApi.push('\trelatedEntities: [');

    var codeXrmWebApiSecondaryIds = [];
    settings.secondaryIds.forEach(function (secondaryId) {
        codeXrmWebApiSecondaryIds.push('\t\t\t{ entityType: "' + settings.secondaryEntity.logicalName + '", id: "' + secondaryId + '" }');
    });
    codeXrmWebApi.push(codeXrmWebApiSecondaryIds.join(',\n'));

    codeXrmWebApi.push('\t],');
    codeXrmWebApi.push('\trelationship: "' + settings.relationship + '",');
    codeXrmWebApi.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Associate" }; }');
    codeXrmWebApi.push('};');
    codeXrmWebApi.push('');
    codeXrmWebApi.push('Xrm.WebApi.online.execute(associateRequest).then(');
    codeXrmWebApi.push('\tfunction success(response) {');
    codeXrmWebApi.push('\t\tif (response.ok) {');
    codeXrmWebApi.push('\t\t\tconsole.log("Success");');
    codeXrmWebApi.push('\t\t}');
    codeXrmWebApi.push('\t}');
    codeXrmWebApi.push(').catch(function (error) {');
    codeXrmWebApi.push('\tconsole.log(error.message);');
    codeXrmWebApi.push('});');

    var codeAssociated = [];
    codeAssociated.push('var association = {');
    codeAssociated.push('\t"@odata.id": Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/' + settings.version + '/' + settings.secondaryEntity.entitySetName + '(' + settings.secondaryIds[0] + ')"');
    codeAssociated.push('};');

    // jQuery
    codeAssociated.forEach(function (associated) { codejQuery.push(associated); });
    codejQuery.push('');

    codejQuery.push('$.ajax({');
    codejQuery.push('\ttype: "POST",');
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tdata: JSON.stringify(association),');
    codejQuery.push('\tbeforeSend: function (req) {');

    var requestHeadersJQuery = [];
    requestHeaders.forEach(function (reqHeader) { requestHeadersJQuery.push('\t\t' + reqHeader); });
    codejQuery.push(requestHeadersJQuery.join('\n'));

    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tconsole.log("Success");');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(textStatus);');
    codejQuery.push('\t}');
    codejQuery.push('});');

    // XMLHttpRequest
    codeAssociated.forEach(function (associated) { codeXMLHttpRequest.push(associated); });
    codeXMLHttpRequest.push('');

    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(requestHeaders.join('\n'));
    codeXMLHttpRequest.push('req.setRequestHeader("Content-Type", "application/json; charset=utf-8");'); // request is POST, add this additional header only for XMLHttpRequest
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
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codePortals);
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
    var codePortals = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.secondaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "";
        if (!DRB.Utilities.HasValue(settings.primaryEntity)) { errorMessage = "// Select a Parent Table first"; }
        else { errorMessage = "// Select a Child Table first"; }

        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codePortals);
        return;
    }

    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "(" + settings.secondaryIds[0] + ")/$ref";
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + settings.primaryId + ")/" + settings.relationship + "(" + settings.secondaryIds[0] + ")/$ref";

    // Request Headers
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);

    codeXrmWebApi.push('var disassociateRequest = {');
    codeXrmWebApi.push('\ttarget: { entityType: "' + settings.primaryEntity.logicalName + '", id: "' + settings.primaryId + '" },');
    codeXrmWebApi.push('\trelatedEntityId : "' + settings.secondaryIds[0] + '",');
    codeXrmWebApi.push('\trelationship: "' + settings.relationship + '",');
    codeXrmWebApi.push('\tgetMetadata: function () { return { boundParameter: null, parameterTypes: {}, operationType: 2, operationName: "Disassociate" }; }');
    codeXrmWebApi.push('};');
    codeXrmWebApi.push('');
    codeXrmWebApi.push('Xrm.WebApi.online.execute(disassociateRequest).then(');
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
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tbeforeSend: function (req) {');

    var requestHeadersJQuery = [];
    requestHeaders.forEach(function (reqHeader) { requestHeadersJQuery.push('\t\t' + reqHeader); });
    codejQuery.push(requestHeadersJQuery.join('\n'));

    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tconsole.log("Success");');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(textStatus);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("DELETE", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(requestHeaders.join('\n'));
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

    // #region Portals
    codePortals = DRB.GenerateCode.GetPortalsWarnings(settings);
    codePortals.push('webapi.safeAjax({');
    codePortals.push('\ttype: "DELETE",');
    codePortals.push('\turl: "' + portalsUrl + '",');
    codePortals.push('\tcontentType: "application/json",');
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tconsole.log("Success");');
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codePortals);
}

/**
 * Generate Code - Retrieve NextLink
 */
DRB.GenerateCode.RetrieveNextLink = function () {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];


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
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

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
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    codejQuery.push('\turl: "' + mainUrl + '",');
    codejQuery.push('\tbeforeSend: function (req) {');
    requestHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    var codejQueryIndent = '\t\t';
    if (settings.detectChanges === true) {
        codejQueryIndent += '\t';
        codejQuery.push('\t\tif (xhr.status === 304) {');
        codejQuery.push('\t\t\t// Handle data not changed');
        codejQuery.push('\t\t} else {');
    }
    codejQuery.push(codejQueryIndent + 'var results = data;');
    codejQuery.push(codejQueryIndent + 'console.log(results);');
    if (settings.retrieveCount === true) { codejQuery.push(codejQueryIndent + 'var odata_count = results["@odata.count"];'); }
    if (settings.detectChanges === true) { codejQuery.push('\t\t}'); }
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr.responseText);');
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("GET", "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(requestHeaders.join('\n'));
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
    }
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, null);
}

/**
 * Generate Code - Predefined Query
 */
DRB.GenerateCode.PredefinedQuery = function () {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.queryType)) {
        // Don't generate the code if a table or a query type is not selected
        var errorMessage = "";
        if (!DRB.Utilities.HasValue(settings.primaryEntity)) { errorMessage = "// Select a Table first"; }
        else { errorMessage = "// Select a Query Type first"; }

        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, null);
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
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

    // #region Xrm.WebApi
    codeXrmWebApi = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    if (settings.queryType === "fetchxml") {
        codeFetchXML.forEach(function (lineFetchXML) { codeXrmWebApi.push(lineFetchXML); });
        codeXrmWebApi.push('');
    }
    if (settings.queryType !== "fetchxml") { queryParameter += '"'; }
    codeXrmWebApi.push('Xrm.WebApi.online.retrieveMultipleRecords("' + settings.primaryEntity.logicalName + '", "' + queryParameter + ').then(');
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
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    if (settings.queryType === "fetchxml" && settings.retrieveCount !== true) {
        codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + ',');
    } else {
        codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    }
    codejQuery.push('\tbeforeSend: function (req) {');

    var requestHeadersJQuery = [];
    requestHeaders.forEach(function (reqHeader) { requestHeadersJQuery.push('\t\t' + reqHeader); });
    codejQuery.push(requestHeadersJQuery.join('\n'));

    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tvar results = data;');
    if (settings.retrieveCount === true) {
        codejQuery.push('\t\tvar odata_count = results["@odata.count"];');
    }
    codejQuery.push('\t\tconsole.log(results);');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr.responseText);');
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
    codeXMLHttpRequest.push(requestHeaders.join('\n'));

    codeXMLHttpRequest.push('req.onreadystatechange = function () {');
    codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
    codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
    codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
    codeXMLHttpRequest.push('\t\t\tvar results = JSON.parse(this.response);');
    if (settings.retrieveCount === true) {
        codeXMLHttpRequest.push('\t\t\tvar odata_count = results["@odata.count"];');
    }
    codeXMLHttpRequest.push('\t\t\tconsole.log(results);');
    codeXMLHttpRequest.push('\t\t} else {');
    codeXMLHttpRequest.push('\t\t\tconsole.log(this.responseText);');
    codeXMLHttpRequest.push('\t\t}');
    codeXMLHttpRequest.push('\t}');
    codeXMLHttpRequest.push('};');
    codeXMLHttpRequest.push('req.send();');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, null);
}

/**
 * Generate Code - Dataverse Execute
 */
DRB.GenerateCode.DataverseExecute = function (requestType) {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];

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
        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, null);
        return;
    }

    // Request Headers
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);

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
    codeXrmWebApi.push('Xrm.WebApi.online.execute(execute_' + settings.dataverseExecute + '_Request).then(');
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
        codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
        codejQuery.push('\tdatatype: "json",');
        if (xhrAddedParameters === true) { codejQuery.push('\tdata: JSON.stringify(parameters),'); }
        codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
        codejQuery.push('\tbeforeSend: function (req) {');

        var requestHeadersJQuery = [];
        requestHeaders.forEach(function (reqHeader) { requestHeadersJQuery.push('\t\t' + reqHeader); });
        codejQuery.push(requestHeadersJQuery.join('\n'));

        codejQuery.push('\t},');
        codejQuery.push('\tasync: ' + settings.async + ',');
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
        codejQuery.push('\t\tconsole.log(xhr.responseText);'); // CHECK
        codejQuery.push('\t}');
        codejQuery.push('});');
    }

    // Function, Custom API Function
    if (operationType === 1) {
        codejQuery.push('$.ajax({');
        codejQuery.push('\ttype: "GET",');
        codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
        codejQuery.push('\tdatatype: "json",');
        codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
        codejQuery.push('\tbeforeSend: function (req) {');

        var requestHeadersJQuery = [];
        requestHeaders.forEach(function (reqHeader) { requestHeadersJQuery.push('\t\t' + reqHeader); });
        codejQuery.push(requestHeadersJQuery.join('\n'));

        codejQuery.push('\t},');
        codejQuery.push('\tasync: ' + settings.async + ',');
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
        codejQuery.push('\t\tconsole.log(xhr.responseText);'); // CHECK
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
        codeXMLHttpRequest.push(requestHeaders.join('\n'));
        codeXMLHttpRequest.push('req.setRequestHeader("Content-Type", "application/json; charset=utf-8");'); // POST request
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
        codeXMLHttpRequest.push(requestHeaders.join('\n'));
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

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, null);
}

/**
 * Generate Code - Execute Workflow
 */
DRB.GenerateCode.ExecuteWorkflow = function () {
    var settings = DRB.Metadata.CurrentNode.data.configuration;

    var codeXrmWebApi = [];
    var codejQuery = [];
    var codeXMLHttpRequest = [];

    // #region XHR settings
    // Main Url
    var mainUrl = "/api/data/" + settings.version + "/workflows(" + settings.workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
    // Request Headers
    var requestHeaders = DRB.GenerateCode.GetRequestHeaders(settings);
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
    codeXrmWebApi.push('Xrm.WebApi.online.execute(executeWorkflowRequest).then(');
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
    codejQuery.push('\tcontentType: "application/json; charset=utf-8",');
    codejQuery.push('\tdatatype: "json",');
    codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
    codejQuery.push('\tdata: JSON.stringify(parameters),');
    codejQuery.push('\tbeforeSend: function (req) {');
    requestHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
    codejQuery.push('\t},');
    codejQuery.push('\tasync: ' + settings.async + ',');
    codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
    codejQuery.push('\t\tvar result = data;');
    codejQuery.push('\t\tconsole.log(result);');
    codejQuery.push('\t},');
    codejQuery.push('\terror: function (xhr, textStatus, errorThrown) {');
    codejQuery.push('\t\tconsole.log(xhr.responseText);'); // CHECK
    codejQuery.push('\t}');
    codejQuery.push('});');
    // #endregion

    // #region XMLHttpRequest
    codeXMLHttpRequest.push(codeParameters);
    codeXMLHttpRequest.push('');
    codeXMLHttpRequest.push('var req = new XMLHttpRequest();');
    codeXMLHttpRequest.push('req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '", ' + settings.async + ');');
    codeXMLHttpRequest.push(requestHeaders.join('\n'));
    codeXMLHttpRequest.push('req.setRequestHeader("Content-Type", "application/json; charset=utf-8");'); // POST request
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

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, null);
}

/**
 * Generate Code - Power Automate
 */
DRB.GenerateCode.PowerAutomate = function (requestType) {
    if (requestType !== "retrievesingle" && requestType !== "retrievemultiple") { return; }
    var pa_editor = "code_powerautomate_editor";
    $("#" + pa_editor).empty();
    switch (requestType) {
        case "retrievesingle":
            $("#" + pa_editor).append(DRB.UI.CreateSpan(DRB.DOM.PowerAutomate.SpanTitleRetrieveSingle.Id, DRB.DOM.PowerAutomate.SpanTitleRetrieveSingle.Name, null, DRB.DOM.PowerAutomate.SpanTitleRetrieveSingle.Class));
            break;
        case "retrievemultiple":
            $("#" + pa_editor).append(DRB.UI.CreateSpan(DRB.DOM.PowerAutomate.SpanTitleRetrieveMultiple.Id, DRB.DOM.PowerAutomate.SpanTitleRetrieveMultiple.Name, null, DRB.DOM.PowerAutomate.SpanTitleRetrieveMultiple.Class));
            break;
    }
    $("#" + pa_editor).append(DRB.UI.CreateSpacer());
    var divTable = DRB.UI.CreateTable(DRB.DOM.PowerAutomate.Table.Id);
    $("#" + pa_editor).append(divTable);

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
            tdCopy.append(DRB.UI.CreateButton(DRB.DOM.PowerAutomate.ButtonCopy.Id + DRB.DOM.PowerAutomate[setting + "Span"].Id, DRB.DOM.PowerAutomate.ButtonCopy.Name, DRB.DOM.PowerAutomate.ButtonCopy.Class, DRB.Logic.CopyCodeForPowerautomate, setting, DRB.DOM.PowerAutomate[setting + "Span"].Name));
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

        settings.manyToOne.forEach(function (ManyToOne) {
            var relFieldLogicalNames = ManyToOne.fields.map(function (field) { return field.oDataName; });
            expandQuery += ManyToOne.navigationProperty + '($select=' + relFieldLogicalNames.join() + '),';
        });

        settings.manyToMany.forEach(function (ManyToMany) {
            var relFieldLogicalNames = ManyToMany.fields.map(function (field) { return field.oDataName; });
            expandQuery += ManyToMany.schemaName + '($select=' + relFieldLogicalNames.join() + '),';
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

/**
 * Generate Code - Start
 */
DRB.GenerateCode.Start = function () {
    var requestType = $("#" + DRB.DOM.RequestType.Dropdown.Id).val();
    DRB.GenerateCode.PowerAutomate(requestType);
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