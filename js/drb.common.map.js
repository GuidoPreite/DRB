// #region DRB.Common.Map
/**
 * Common - Map Tables
 * @param {any} data Data to parse
 * @param {string} sortProperty Sort Property
 */
DRB.Common.MapTables = function (data, sortProperty) {
    // create the array
    var tables = [];
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var logicalName = record.LogicalName;
            var name = record.SchemaName;
            if (DRB.Utilities.HasValue(record.DisplayName) && DRB.Utilities.HasValue(record.DisplayName.UserLocalizedLabel) && DRB.Utilities.HasValue(record.DisplayName.UserLocalizedLabel.Label)) { name = record.DisplayName.UserLocalizedLabel.Label; }
            var schemaName = record.SchemaName;
            var entitySetName = record.EntitySetName;
            var primaryIdAttribute = record.PrimaryIdAttribute;
            var primaryNameAttribute = record.PrimaryNameAttribute;
            var objectTypeCode = record.ObjectTypeCode;
            tables.push(new DRB.Models.Table(logicalName, name, schemaName, entitySetName, primaryIdAttribute, primaryNameAttribute, objectTypeCode));
        });
        // sort the array based on the provided sortProperty
        if (DRB.Utilities.HasValue(sortProperty)) { tables.sort(DRB.Utilities.CustomSort(sortProperty)); }
    }
    // return the array
    return tables;
}

/**
 * Common - Map Columns
 * @param {any} data Data to parse
 * @param {string} sortProperty Sort Property
 */
DRB.Common.MapColumns = function (data, primaryIdAttribute, primaryNameAttribute, sortProperty) {
    // create the array
    var columns = [];
    // parse data
    if (Array.isArray(data)) {
        var primaryIdColumn = null;
        var fileColumns = [];
        var imageColumns = [];
        var imageNameColumns = [];
        var polyTypeColumns = [];
        data.forEach(function (record) {
            var logicalName = record.LogicalName;
            var schemaName = record.SchemaName;
            var attributeType = record.AttributeType;
            var attributeOf = record.AttributeOf;
            var name = record.SchemaName;
            if (DRB.Utilities.HasValue(record.DisplayName) && DRB.Utilities.HasValue(record.DisplayName.UserLocalizedLabel) && DRB.Utilities.HasValue(record.DisplayName.UserLocalizedLabel.Label)) { name = record.DisplayName.UserLocalizedLabel.Label; }
            var isValidForRead = record.IsValidForRead;
            var isValidForCreate = record.IsValidForCreate;
            var isValidForUpdate = record.IsValidForUpdate;

            var requiredLevel = "None";
            if (DRB.Utilities.HasValue(record.RequiredLevel) && DRB.Utilities.HasValue(record.RequiredLevel.Value)) { requiredLevel = record.RequiredLevel.Value; }

            // additional properties for specific column type
            var maxLength = record.MaxLength; // String, Memo
            var minValue = record.MinValue; // Integer, Decimal, Float, BigInt, Money
            var maxValue = record.MaxValue; // Integer, Decimal, Float, BigInt, Money
            var targets = record.Targets; // Lookup, Owner, Customer, Polymorphic Lookup
            var isPolymorphic = false; // Polymorphic Lookup
            var precision = record.Precision; // Decimal, Money
            var precisionSource = record.PrecisionSource; // Money
            var maxSizeInKB = record.MaxSizeInKB; // Image
            var dateTimeFormat = record.Format; // DateTime
            var dateTimeBehavior = ""; // DateTime

            if (DRB.Utilities.HasValue(record.DateTimeBehavior) && DRB.Utilities.HasValue(record.DateTimeBehavior.Value)) { dateTimeBehavior = record.DateTimeBehavior.Value; }
            var additionalProperties = { MaxLength: maxLength, MinValue: minValue, MaxValue: maxValue, Targets: targets, IsPolymorphic: isPolymorphic, Precision: precision, PrecisionSource: precisionSource, MaxSizeInKB: maxSizeInKB, DateTimeFormat: dateTimeFormat, DateTimeBehavior: dateTimeBehavior };

            // fix for type fields appearing as Virtual
            var oDataType = record["@odata.type"];
            if (oDataType === "#Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata") { attributeType = "MultiPicklist"; }
            if (oDataType === "#Microsoft.Dynamics.CRM.FileAttributeMetadata") { attributeType = "File"; fileColumns.push(logicalName); }
            if (oDataType === "#Microsoft.Dynamics.CRM.EntityNameAttributeMetadata") {
                // check if logical name ends with "type"
                if (logicalName.length > 4 && logicalName.substring(logicalName.length - 4) === "type") { polyTypeColumns.push(attributeOf); }
            }
            if (oDataType === "#Microsoft.Dynamics.CRM.ImageAttributeMetadata") { attributeType = "Image"; imageColumns.push(attributeOf); imageNameColumns.push(name); attributeOf = null; }

            if (logicalName === primaryIdAttribute) {
                name = "(" + name + " ID)";
                primaryIdColumn = new DRB.Models.Column(logicalName, name, schemaName, attributeType, true, false, requiredLevel, isValidForRead, isValidForCreate, isValidForUpdate, additionalProperties);
            } else {
                var isPrimaryNameAttribute = false;
                if (logicalName === primaryNameAttribute) { isPrimaryNameAttribute = true; }
                var newColumn = new DRB.Models.Column(logicalName, name, schemaName, attributeType, false, isPrimaryNameAttribute, requiredLevel, isValidForRead, isValidForCreate, isValidForUpdate, additionalProperties);
                newColumn.AttributeOf = attributeOf;
                columns.push(newColumn);
            }
        });

        var selectedColumns = [];
        columns.forEach(function (column) {
            if (column.AttributeType !== "PartyList") {
                if (column.AttributeOf == null) { // TBD why not ===
                    if (imageColumns.indexOf(column.LogicalName) > -1) { column.Name = imageNameColumns[imageColumns.indexOf(column.LogicalName)] + " (ID)"; }
                    selectedColumns.push(column);
                }
                else {
                    // File
                    if (fileColumns.indexOf(column.AttributeOf) > -1) {
                        var fileColumn = DRB.Utilities.GetRecordById(columns, column.AttributeOf);
                        if (DRB.Utilities.HasValue(fileColumn)) {
                            var additionalProperty = "";
                            if (column.Name.lastIndexOf("_") > -1 && column.Name.length - 1 > column.Name.lastIndexOf("_")) { additionalProperty = column.Name.substring(column.Name.lastIndexOf("_") + 1); }
                            column.Name = fileColumn.Name + " (" + additionalProperty + ")";
                        }
                        selectedColumns.push(column);
                    }
                    // Image
                    if (imageColumns.indexOf(column.AttributeOf) > -1) {
                        var imageColumnName = imageNameColumns[imageColumns.indexOf(column.AttributeOf)];
                        var additionalProperty = "";
                        if (column.Name.lastIndexOf("_") > -1 && column.Name.length - 1 > column.Name.lastIndexOf("_")) { additionalProperty = column.Name.substring(column.Name.lastIndexOf("_") + 1); }
                        column.Name = imageColumnName + " (" + additionalProperty + ")";
                        selectedColumns.push(column);
                    }
                }
            }
        });

        // check if there are polymporphic lookups
        selectedColumns.forEach(function (column) {
            if (column.AttributeType === "Lookup" && polyTypeColumns.indexOf(column.LogicalName) > -1) { column.AdditionalProperties.IsPolymorphic = true; }
        });

        // sort the array based on the provided sortProperty
        if (DRB.Utilities.HasValue(sortProperty)) { selectedColumns.sort(DRB.Utilities.CustomSort(sortProperty)); }
        // add Primary Id column to the top of the list
        if (DRB.Utilities.HasValue(primaryIdColumn)) { selectedColumns.unshift(primaryIdColumn); }
    }
    // return the array
    return selectedColumns;
}

/**
 * Common - Map Option Values
 * @param {any} data Data to parse
 * @param {string} sortProperty Sort Property
 */
DRB.Common.MapOptionValues = function (data) {
    data.forEach(function (contextValue) {
        if (DRB.Utilities.HasValue(contextValue.EntityLogicalName)) {
            var currentTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, contextValue.EntityLogicalName);
            if (DRB.Utilities.HasValue(currentTable)) {
                var currentColumn = DRB.Utilities.GetRecordById(currentTable.Columns, contextValue.LogicalName);
                if (DRB.Utilities.HasValue(currentColumn)) {
                    currentColumn.OptionValues = [];
                    if (currentColumn.AttributeType === "Boolean") {
                        var falseLabel = "No";
                        if (DRB.Utilities.HasValue(contextValue.OptionSet.FalseOption) && DRB.Utilities.HasValue(contextValue.OptionSet.FalseOption.Label) && DRB.Utilities.HasValue(contextValue.OptionSet.FalseOption.Label.UserLocalizedLabel) && DRB.Utilities.HasValue(contextValue.OptionSet.FalseOption.Label.UserLocalizedLabel.Label)) { falseLabel = contextValue.OptionSet.FalseOption.Label.UserLocalizedLabel.Label; }

                        var trueLabel = "Yes";
                        if (DRB.Utilities.HasValue(contextValue.OptionSet.TrueOption) && DRB.Utilities.HasValue(contextValue.OptionSet.TrueOption.Label) && DRB.Utilities.HasValue(contextValue.OptionSet.TrueOption.Label.UserLocalizedLabel) && DRB.Utilities.HasValue(contextValue.OptionSet.TrueOption.Label.UserLocalizedLabel.Label)) { trueLabel = contextValue.OptionSet.TrueOption.Label.UserLocalizedLabel.Label; }

                        currentColumn.OptionValues.push(new DRB.Models.OptionSetValue(false, falseLabel));
                        currentColumn.OptionValues.push(new DRB.Models.OptionSetValue(true, trueLabel));
                    } else {
                        contextValue.OptionSet.Options.forEach(function (contextValueOption) {
                            var optionValue = contextValueOption.Value;
                            var optionLabel = contextValueOption.Value.toString();
                            if (DRB.Utilities.HasValue(contextValueOption.Label) && DRB.Utilities.HasValue(contextValueOption.Label.UserLocalizedLabel) && DRB.Utilities.HasValue(contextValueOption.Label.UserLocalizedLabel.Label)) { optionLabel = contextValueOption.Label.UserLocalizedLabel.Label; }

                            currentColumn.OptionValues.push(new DRB.Models.OptionSetValue(optionValue, optionLabel));
                        });
                    }
                }
            }
        }
    });
}

/**
 * Common - Map Alternate Keys
 * @param {any} data Data to parse
 * @param {string} sortProperty Sort Property
 */
DRB.Common.MapAlternateKeys = function (data, sortProperty) {
    // create the array
    var alternateKeys = [];
    // parse data
    if (Array.isArray(data)) {
        data.forEach(function (record) {
            if (record.EntityKeyIndexStatus === "Active") {
                var logicalName = record.LogicalName;
                var name = record.SchemaName;
                if (DRB.Utilities.HasValue(record.DisplayName) && DRB.Utilities.HasValue(record.DisplayName.UserLocalizedLabel) && DRB.Utilities.HasValue(record.DisplayName.UserLocalizedLabel.Label)) { name = record.DisplayName.UserLocalizedLabel.Label; }
                var schemaName = record.SchemaName;
                var keyAttributes = record.KeyAttributes;
                alternateKeys.push(new DRB.Models.AlternateKey(logicalName, name, schemaName, keyAttributes));
            }
        });
        // sort the array based on the provided sortProperty
        if (DRB.Utilities.HasValue(sortProperty)) { alternateKeys.sort(DRB.Utilities.CustomSort(sortProperty)); }
    }
    // return the array
    return alternateKeys;
}

/**
 * Common - Map Relationships
 * @param {any} data Data to parse
 * @param {string} type Type
 * @param {string} sortProperty Sort Property
 * @param {string} sourceTable Source Table
 */
DRB.Common.MapRelationships = function (data, type, sortProperty, sourceTable) {
    // create the array
    var relationships = [];
    // parse data
    if (Array.isArray(data)) {
        data.forEach(function (record) {
            var schemaName = record.SchemaName;
            var referencingEntity = record.ReferencingEntity;
            var referencedEntity = record.ReferencedEntity;
            var referencingAttribute = record.ReferencingAttribute;
            var referencedAttribute = record.ReferencedAttribute;
            var referencingEntityNavigationPropertyName = record.ReferencingEntityNavigationPropertyName;
            var referencedEntityNavigationPropertyName = record.ReferencedEntityNavigationPropertyName;
            var entity1LogicalName = record.Entity1LogicalName;
            var entity2LogicalName = record.Entity2LogicalName;
            var entity1NavigationPropertyName = record.Entity1NavigationPropertyName;
            var entity2NavigationPropertyName = record.Entity2NavigationPropertyName;
            var isHierarchical = record.IsHierarchical;
            switch (type) {
                case "OneToMany":
                    relationships.push(new DRB.Models.Relationship(schemaName, type, sourceTable, referencingEntity, referencedEntityNavigationPropertyName, referencingAttribute, isHierarchical));
                    break;
                case "ManyToOne":
                    relationships.push(new DRB.Models.Relationship(schemaName, type, sourceTable, referencedEntity, referencingEntityNavigationPropertyName, referencingAttribute));
                    break;
                case "ManyToMany":
                    var targetTable = entity2LogicalName;
                    if (targetTable === sourceTable) { targetTable = entity1LogicalName; }
                    relationships.push(new DRB.Models.Relationship(schemaName, type, sourceTable, targetTable, schemaName));
                    break;
            }
        });
        // sort the array based on the provided sortProperty
        if (DRB.Utilities.HasValue(sortProperty)) { relationships.sort(DRB.Utilities.CustomSort(sortProperty)); }
    }
    // return the array
    return relationships;
}

/**
 * Common - Map Personal Views
 * @param {any} data Data to parse
 * @param {string} sortProperty Sort Property
 */
DRB.Common.MapPersonalViews = function (data, sortProperty) {
    // create the array
    var views = [];
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var id = record.userqueryid;
            var name = record.name;
            var tableLogicalName = record.returnedtypecode;
            views.push(new DRB.Models.PersonalView(id, name, tableLogicalName));
        });
        // sort the array based on the provided sortProperty
        if (DRB.Utilities.HasValue(sortProperty)) { views.sort(DRB.Utilities.CustomSort(sortProperty)); }
    }
    // return the array
    return views;
}

/**
 * Common - Map Custom APIs
 * @param {any} data Data to parse
 * @param {string} sortProperty Sort Property
 */
DRB.Common.MapCustomAPIs = function (data, sortProperty) {
    // create the array
    var customAPIs = [];
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var id = record.uniquename;
            var name = record.name;
            var isBound = false;
            var isCollectionBound = false;
            var logicalName = "none";
            var bindingType = record.bindingtype;
            if (bindingType === 1 || bindingType === 2) { isBound = true; logicalName = record.boundentitylogicalname; }
            if (bindingType === 2) { isCollectionBound = true; }
            var isFunction = record.isfunction;
            var hasReturnType = false;
            var returnType = "";
            var parameters = [];
            // bindingtype,boundentitylogicalname,isprivate,name,uniquename
            customAPIs.push(new DRB.Models.DataverseExecute("CustomAPI", id, name, isBound, logicalName, isCollectionBound, isFunction, hasReturnType, returnType, parameters));
        });
        // sort the array based on the provided sortProperty
        if (DRB.Utilities.HasValue(sortProperty)) { customAPIs.sort(DRB.Utilities.CustomSort(sortProperty)); }
    }
    // return the array
    return customAPIs;
}

/**
 * Common - Map Custom API Request Parameters
 * @param {any} data Data to parse
 * @param {any} customAPIs Custom APIs
 */
DRB.Common.MapCustomAPIRequestParameters = function (data, customAPIs) {
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var customAPIUniqueName = record["CustomAPIId"]["uniquename"];
            var customAPI = DRB.Utilities.GetRecordById(customAPIs, customAPIUniqueName);
            if (DRB.Utilities.HasValue(customAPI)) {
                var parameterName = record.uniquename; // record.name;
                var parameterOptional = record.isoptional;
                var parameterPosition = record.position;
                var parameterType = record.type;
                var parameterBinding = record.logicalentityname;

                switch (parameterType) {
                    case 0: parameterType = "Edm.Boolean"; break;
                    case 1: parameterType = "Edm.DateTimeOffset"; break;
                    case 2: parameterType = "Edm.Decimal"; break;
                    case 3: parameterType = "mscrm.crmbaseentity"; break; // Entity
                    case 4: parameterType = "Collection(mscrm.crmbaseentity)"; break; // EntityCollection
                    case 5: parameterType = "mscrm.crmbaseentity"; break; // EntityReference
                    case 6: parameterType = "Edm.Double"; break;
                    case 7: parameterType = "Edm.Int32"; break;
                    case 8: parameterType = "Edm.Decimal"; break; // Money
                    case 9: parameterType = "Edm.Int32"; break; // Picklist
                    case 10: parameterType = "Edm.String"; break;
                    case 11: parameterType = "Collection(Edm.String)"; break; // StringArray
                    case 12: parameterType = "Edm.Guid"; break;

                }

                customAPI.Parameters.push(new DRB.Models.DataverseParameter(parameterName, parameterType, parameterOptional, parameterPosition, parameterBinding));
            }
        });

        // check for Parameters (duplicate position)
        customAPIs.forEach(function (customAPI) {
            var parameters = JSON.parse(JSON.stringify(customAPI.Parameters));
            var newParameters = [];
            // parse Binding
            parameters.forEach(function (parameter) {
                if (DRB.Utilities.HasValue(parameter.Binding)) {
                    var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, parameter.Binding);
                    if (DRB.Utilities.HasValue(checkTable)) {
                        parameter.Type = "mscrm." + checkTable.LogicalName;
                    }
                    newParameters.push(parameter);
                } else {
                    newParameters.push(parameter);
                }
            });
            customAPI.Parameters = newParameters;
        });

    }
    // add entity as first Parameter if the custom action is bound
    customAPIs.forEach(function (customAPI) {
        if (customAPI.IsBound === true) {
            if (customAPI.IsCollectionBound === false) {
                customAPI.Parameters.unshift(new DRB.Models.DataverseParameter("entity", "mscrm." + customAPI.LogicalName, false, 0, null));
            } else {
                customAPI.Parameters.unshift(new DRB.Models.DataverseParameter("entityset", "Collection(mscrm." + customAPI.LogicalName + ")", false, 0, null));
            }
        }
    });
}

/**
 * Common - Map Custom API Response Properties
 * @param {any} data Data to parse
 * @param {any} customAPIs Custom APIs
 */
DRB.Common.MapCustomAPIResponseProperties = function (data, customAPIs) {
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var customAPIUniqueName = record["CustomAPIId"]["uniquename"];
            var customAPI = DRB.Utilities.GetRecordById(customAPIs, customAPIUniqueName);
            if (DRB.Utilities.HasValue(customAPI)) {
                var propertyName = record.uniquename; // record.name;
                var propertyPosition = record.position;
                var propertyType = record.type;
                var propertyBinding = record.logicalentityname;

                switch (propertyType) {
                    case 0: propertyType = "Edm.Boolean"; break;
                    case 1: propertyType = "Edm.DateTimeOffset"; break;
                    case 2: propertyType = "Edm.Decimal"; break;
                    case 3: propertyType = "mscrm.crmbaseentity"; break; // Entity
                    case 4: propertyType = "Collection(mscrm.crmbaseentity)"; break; // EntityCollection
                    case 5: propertyType = "mscrm.crmbaseentity"; break; // EntityReference
                    case 6: propertyType = "Edm.Double"; break;
                    case 7: propertyType = "Edm.Int32"; break;
                    case 8: propertyType = "Edm.Decimal"; break; // Money
                    case 9: propertyType = "Edm.Int32"; break; // Picklist
                    case 10: propertyType = "Edm.String"; break;
                    case 11: propertyType = "Collection(Edm.String)"; break; // StringArray
                    case 12: propertyType = "Edm.Guid"; break;
                }

                customAPI.Properties.push(new DRB.Models.DataverseProperty(propertyName, propertyType, propertyPosition, propertyBinding));
            }
        });

        // check for Properties
        customAPIs.forEach(function (customAPI) {
            var properties = JSON.parse(JSON.stringify(customAPI.Properties));
            var newProperties = [];
            // parse Binding
            properties.forEach(function (property) {
                if (DRB.Utilities.HasValue(property.Binding)) {
                    // parse entity logical name
                    var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, property.Binding);
                    if (DRB.Utilities.HasValue(checkTable)) {
                        property.Type = "mscrm." + checkTable.LogicalName;
                    }
                    newProperties.push(property);
                } else {
                    newProperties.push(property);
                }
            });
            customAPI.Properties = newProperties;
        });
    }
}

/**
 * Common - Map Custom Actions
 * @param {any} data Data to parse
 * @param {string} sortProperty Sort Property
 */
DRB.Common.MapCustomActions = function (data, sortProperty) {
    // create the array
    var customActions = [];
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var id = record["sdkmessage.name"];
            var name = record.name;
            var isBound = false;
            var isCollectionBound = false;
            var logicalName = record.primaryentity;
            if (logicalName !== "none") { isBound = true; }
            var hasReturnType = false;
            var returnType = "";
            var parameters = [];
            // bindingtype,boundentitylogicalname,isprivate,name,uniquename
            customActions.push(new DRB.Models.DataverseExecute("CustomAction", id, name, isBound, logicalName, isCollectionBound, false, hasReturnType, returnType, parameters));
        });
        // sort the array based on the provided sortProperty
        if (DRB.Utilities.HasValue(sortProperty)) { customActions.sort(DRB.Utilities.CustomSort(sortProperty)); }
    }
    // return the array
    return customActions;
}

/**
 * Common - Map Custom Action Request Parameters
 * @param {any} data Data to parse
 * @param {any} customActions Custom Actions
 */
DRB.Common.MapCustomActionRequestParameters = function (data, customActions) {
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var customActionUniqueName = record["sdkmessage.name"];
            var customAction = DRB.Utilities.GetRecordById(customActions, customActionUniqueName);
            if (DRB.Utilities.HasValue(customAction)) {
                var parameterName = record.name;
                var parameterOptional = record.optional;
                var parameterPosition = record.position;
                var parameterBinding = record.parameterbindinginformation;
                var parameterType = record.parser;
                parameterType = parameterType.split(",")[0];

                switch (parameterType) {
                    case "System.Boolean": parameterType = "Edm.Boolean"; break;
                    case "System.DateTime": parameterType = "Edm.DateTimeOffset"; break;
                    case "System.Decimal": parameterType = "Edm.Decimal"; break;
                    case "System.Double": parameterType = "Edm.Double"; break;
                    case "System.Int32": parameterType = "Edm.Int32"; break;
                    case "System.String": parameterType = "Edm.String"; break;
                    case "Microsoft.Xrm.Sdk.OptionSetValue": parameterType = "Edm.Int32"; break;
                    case "Microsoft.Xrm.Sdk.Money": parameterType = "Edm.Decimal"; break;
                    case "Microsoft.Xrm.Sdk.Entity": parameterType = "mscrm.crmbaseentity"; break;
                    case "Microsoft.Xrm.Sdk.EntityCollection": parameterType = "Collection(mscrm.crmbaseentity)"; break;
                    case "Microsoft.Xrm.Sdk.EntityReference": parameterType = "mscrm.crmbaseentity"; break;
                }


                customAction.Parameters.push(new DRB.Models.DataverseParameter(parameterName, parameterType, parameterOptional, parameterPosition, parameterBinding));
            }
        });

        // check for Parameters (duplicate position)
        customActions.forEach(function (customAction) {

            var parameters = JSON.parse(JSON.stringify(customAction.Parameters));

            // copy Binding if position is the same
            for (var i = 0; i <= parameters.length - 2; i++) {
                var currentParameter = parameters[i];
                var nextParameter = parameters[i + 1];
                if (currentParameter.Position === nextParameter.Position) {
                    // found a duplicate, copy the binding if one of them is empty
                    if (DRB.Utilities.HasValue(currentParameter.Binding) && !DRB.Utilities.HasValue(nextParameter.Binding)) {
                        nextParameter.Binding = currentParameter.Binding;
                    }

                    if (!DRB.Utilities.HasValue(currentParameter.Binding) && DRB.Utilities.HasValue(nextParameter.Binding)) {
                        currentParameter.Binding = nextParameter.Binding;
                    }
                }
            }

            var newParameters = [];
            parameters.forEach(function (parameter, parameterIndex) {
                if (parameterIndex > 0) {
                    // check if the current position is different from the last stored inside newParameters
                    if (newParameters[newParameters.length - 1].Position !== parameter.Position) { newParameters.push(parameter); }
                } else {
                    // first element copy directly
                    newParameters.push(parameter);
                }
            });

            var orderedParameters = [];
            var targetParameter = null;
            // parse Binding
            newParameters.forEach(function (parameter) {
                if (DRB.Utilities.HasValue(parameter.Binding)) {
                    if (parameter.Binding === "Bound:TRUE" && parameter.Name === "Target") {
                        targetParameter = parameter;
                    } else {
                        // parse OTC
                        var splittedBinding = parameter.Binding.split(":");
                        if (splittedBinding.length === 2) {
                            var otc = splittedBinding[1];
                            var checkTable = DRB.Utilities.GetRecordByProperty(DRB.Metadata.Tables, "ObjectTypeCode", otc);
                            if (DRB.Utilities.HasValue(checkTable)) {
                                parameter.Type = "mscrm." + checkTable.LogicalName;
                            }
                        }
                        orderedParameters.push(parameter);
                    }
                } else {
                    orderedParameters.push(parameter);
                }
            });

            // put the Target as first position and rename it as "entity" and set the correct type
            if (targetParameter !== null) {
                targetParameter.Type = "mscrm." + customAction.LogicalName;
                targetParameter.Id = "entity";
                targetParameter.Name = "entity";
                orderedParameters.unshift(targetParameter);
            }

            customAction.Parameters = orderedParameters;
        });


    }
}

/**
 * Common - Map Custom Action Response Properties
 * @param {any} data Data to parse
 * @param {any} customActions Custom Actions
 */
DRB.Common.MapCustomActionResponseProperties = function (data, customActions) {
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var customActionUniqueName = record["sdkmessage.name"];
            var customAction = DRB.Utilities.GetRecordById(customActions, customActionUniqueName);
            if (DRB.Utilities.HasValue(customAction)) {
                var propertyName = record.name;
                var propertyPosition = record.position;
                var propertyBinding = record.parameterbindinginformation;
                var propertyType = record.formatter;
                propertyType = propertyType.split(",")[0];

                switch (propertyType) {
                    case "System.Boolean": propertyType = "Edm.Boolean"; break;
                    case "System.DateTime": propertyType = "Edm.DateTimeOffset"; break;
                    case "System.Decimal": propertyType = "Edm.Decimal"; break;
                    case "System.Double": propertyType = "Edm.Double"; break;
                    case "System.Int32": propertyType = "Edm.Int32"; break;
                    case "System.String": propertyType = "Edm.String"; break;
                    case "Microsoft.Xrm.Sdk.OptionSetValue": propertyType = "Edm.Int32"; break;
                    case "Microsoft.Xrm.Sdk.Money": propertyType = "Edm.Decimal"; break;
                    case "Microsoft.Xrm.Sdk.Entity": propertyType = "mscrm.crmbaseentity"; break;
                    case "Microsoft.Xrm.Sdk.EntityCollection": propertyType = "Collection(mscrm.crmbaseentity)"; break;
                    case "Microsoft.Xrm.Sdk.EntityReference": propertyType = "mscrm.crmbaseentity"; break;
                }

                customAction.Properties.push(new DRB.Models.DataverseProperty(propertyName, propertyType, propertyPosition, propertyBinding));
            }
        });

        // check for Properties (duplicate position)
        customActions.forEach(function (customAction) {
            var properties = JSON.parse(JSON.stringify(customAction.Properties));

            // copy Binding if position is the same
            for (var i = 0; i <= properties.length - 2; i++) {
                var currentProperty = properties[i];
                var nextProperty = properties[i + 1];
                if (currentProperty.Position === nextProperty.Position) {
                    // found a duplicate, copy the binding if one of them is empty
                    if (DRB.Utilities.HasValue(currentProperty.Binding) && !DRB.Utilities.HasValue(nextProperty.Binding)) {
                        nextProperty.Binding = currentProperty.Binding;
                    }

                    if (!DRB.Utilities.HasValue(currentProperty.Binding) && DRB.Utilities.HasValue(nextProperty.Binding)) {
                        currentProperty.Binding = nextProperty.Binding;
                    }
                }
            }

            var newProperties = [];
            properties.forEach(function (property, propertyIndex) {
                if (propertyIndex > 0) {
                    // check if the current position is different from the last stored inside newParameters
                    if (newProperties[newProperties.length - 1].Position !== property.Position) { newProperties.push(property); }
                } else {
                    // first element copy directly
                    newProperties.push(property);
                }
            });

            var orderedProperties = [];
            // parse Binding
            newProperties.forEach(function (property) {
                if (DRB.Utilities.HasValue(property.Binding)) {
                    // parse OTC
                    var splittedBinding = property.Binding.split(":");
                    if (splittedBinding.length === 2) {
                        var otc = splittedBinding[1];
                        var checkTable = DRB.Utilities.GetRecordByProperty(DRB.Metadata.Tables, "ObjectTypeCode", otc);
                        if (DRB.Utilities.HasValue(checkTable)) {
                            property.Type = "mscrm." + checkTable.LogicalName;
                        }
                    }
                    orderedProperties.push(property);

                } else {
                    orderedProperties.push(property);
                }
            });

            customAction.Properties = orderedProperties;
        });
    }
}
// #endregion