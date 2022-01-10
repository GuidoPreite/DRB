// #region DRB.Common.Xrm
/**
 * Retrieve Tables
 */
DRB.Common.RetrieveTables = function () {
    return DRB.Xrm.Retrieve("EntityDefinitions", "$select=LogicalName,SchemaName,DisplayName,EntitySetName,PrimaryIdAttribute,PrimaryNameAttribute,ObjectTypeCode");
}

/**
 * Retrieve Users
 */
DRB.Common.RetrieveUsers = function () {
    return DRB.Xrm.Retrieve("systemusers", "$select=systemuserid,fullname,azureactivedirectoryobjectid&$filter=azureactivedirectoryobjectid ne null");
}

/**
 * Retrieve System Views
 * @param {string[]} tableLogicalNames Table Logical Names
 */
DRB.Common.RetrieveSystemViews = function (tableLogicalNames) {
    var queries = [];
    tableLogicalNames.forEach(function (tableLogicalName) {
        var query = {};
        query.EntitySetName = "savedqueries";
        query.Filters = "$select=savedqueryid,name,returnedtypecode,isdefault,layoutxml&$filter=returnedtypecode eq '" + tableLogicalName + "'";
        queries.push(query);
    });
    return DRB.Xrm.RetrieveBatch(queries);
}

/**
 * Retrieve Personal Views
 */
DRB.Common.RetrievePersonalViews = function () {
    return DRB.Xrm.Retrieve("userqueries", "$select=name,returnedtypecode,userqueryid");
}

/**
 * Retrieve Custom APIs
 */
DRB.Common.RetrieveCustomAPIs = function () {
    var queries = [];
    // Custom APIs
    var queryCustomAPIs = {};
    queryCustomAPIs.EntitySetName = "customapis";
    queryCustomAPIs.Filters = "$select=bindingtype,boundentitylogicalname,name,uniquename,isfunction&$filter=statuscode eq 1";
    queries.push(queryCustomAPIs);

    // Custom API Request Parameters
    var queryRequestParameters = {};
    queryRequestParameters.EntitySetName = "customapirequestparameters";
    queryRequestParameters.Filters = "$select=isoptional,name,type,uniquename,logicalentityname&$expand=CustomAPIId($select=uniquename)&$filter=statuscode eq 1";
    queries.push(queryRequestParameters);

    // Custom API Response Properties
    var queryResponseProperties = {};
    queryResponseProperties.EntitySetName = "customapiresponseproperties";
    queryResponseProperties.Filters = "$select=name,type,uniquename,logicalentityname&$expand=CustomAPIId($select=uniquename)&$filter=statuscode eq 1";
    queries.push(queryResponseProperties);

    return DRB.Xrm.RetrieveBatch(queries);
}

/**
 * Retrieve Custom Actions
 */
DRB.Common.RetrieveCustomActions = function () {
    var queries = [];
    // Custom APIs
    var queryCustomActions = {};
    queryCustomActions.EntitySetName = "workflows";
    var fetchCustomActions = `<fetch>
  <entity name="workflow">
    <attribute name="name" />
    <attribute name="primaryentity" />
    <filter type="and">
      <condition attribute="category" operator="eq" value="3" />
      <condition attribute="type" operator="eq" value="1" />
      <condition attribute="componentstate" operator="eq" value="0" />
      <condition attribute="statuscode" operator="eq" value="2" />
    </filter>
    <link-entity name="sdkmessage" from="sdkmessageid" to="sdkmessageid" link-type="inner" alias="sdkmessage">
      <attribute name="name" />
    </link-entity>
  </entity>
</fetch>`;
    //queryCustomActions.Filters = "$select=name,uniquename,primaryentity&$filter=category eq 3 and type eq 1 and componentstate eq 0 and statuscode eq 2";
    queryCustomActions.Filters = "fetchXml=" + encodeURIComponent(fetchCustomActions);
    queries.push(queryCustomActions);

    // Custom Actions Request Parameters
    var queryRequestParameters = {};
    queryRequestParameters.EntitySetName = "sdkmessagerequestfields";

    var fetchRequestParameters = `<fetch distinct="true">
  <entity name="sdkmessagerequestfield">
    <attribute name="name" />
    <attribute name="parameterbindinginformation" />
    <attribute name="optional" />
    <attribute name="position" />
    <attribute name="fieldmask" />
    <attribute name="parser" />
    <order attribute="position" />
    <link-entity name="sdkmessagerequest" from="sdkmessagerequestid" to="sdkmessagerequestid">
      <link-entity name="sdkmessagepair" from="sdkmessagepairid" to="sdkmessagepairid">
        <link-entity name="sdkmessage" from="sdkmessageid" to="sdkmessageid" alias="sdkmessage">
          <attribute name="name" />
        </link-entity>
      </link-entity>
    </link-entity>
  </entity>
</fetch>`;

    queryRequestParameters.Filters = "fetchXml=" + encodeURIComponent(fetchRequestParameters);
    queries.push(queryRequestParameters);

    // Custom Actions Response Properties
    var queryResponseProperties = {};
    queryResponseProperties.EntitySetName = "sdkmessageresponsefields";

    var fetchResponseProperties = `<fetch distinct="true">
  <entity name="sdkmessageresponsefield">
    <attribute name="name" />
    <attribute name="parameterbindinginformation" />
    <attribute name="position" />
    <attribute name="formatter" />
    <attribute name="publicname" />
    <order attribute="position" />
    <link-entity name="sdkmessageresponse" from="sdkmessageresponseid" to="sdkmessageresponseid">
      <link-entity name="sdkmessagerequest" from="sdkmessagerequestid" to="sdkmessagerequestid">
        <link-entity name="sdkmessagepair" from="sdkmessagepairid" to="sdkmessagepairid">
          <link-entity name="sdkmessage" from="sdkmessageid" to="sdkmessageid" alias="sdkmessage">
            <attribute name="name" />
          </link-entity>
        </link-entity>
      </link-entity>
    </link-entity>
  </entity>
</fetch>`;

    queryResponseProperties.Filters = "fetchXml=" + encodeURIComponent(fetchResponseProperties);
    queries.push(queryResponseProperties);

    return DRB.Xrm.RetrieveBatch(queries);
}

/**
 * Retrieve Metadata
 */
DRB.Common.RetrieveMetadata = function () {
    return DRB.Xrm.RetrieveMetadata();
}

/**
 * Retrieve Tables Details
 * @param {string[]} tableLogicalNames Table Logical Names
 * @param {boolean} includeRelationships Include Relationships
 * @param {boolean} includeAlternateKeys Include Alternate Keys
 */
DRB.Common.RetrieveTablesDetails = function (tableLogicalNames, includeRelationships, includeAlternateKeys) {
    var includeOptionValues = false;
    if (includeAlternateKeys === true) { includeOptionValues = true; } // Alternate Key supports Picklist, retrieving Option Values is required

    var batchedQueries = [];
    var tableBatchSize = 150; // 150 tables each batch request, because there are a max of 6 requests for each table (150 x 6 = 900 < 1000)

    batchedTableLogicalNames = [];
    for (var count = 0; count < tableLogicalNames.length; count++) {
        if (count % tableBatchSize === 0) { batchedTableLogicalNames.push([]); }
        batchedTableLogicalNames[batchedTableLogicalNames.length - 1].push(tableLogicalNames[count]);
    }

    batchedTableLogicalNames.forEach(function (batchedTableLogicalName) {
        batchedQueries.push([]);
        batchedTableLogicalName.forEach(function (tableLogicalName) {
            var queryTable = {};
            queryTable.EntitySetName = "EntityDefinitions(LogicalName='" + tableLogicalName + "')";
            queryTable.Filters = "$select=LogicalName&$expand=Attributes"; // retrieve all Attributes due to "Additional Properties" mapping
            if (includeRelationships === true) {
                queryTable.Filters +=
                    ",OneToManyRelationships($select=SchemaName,ReferencingEntity,ReferencedEntity,ReferencingAttribute,ReferencedAttribute,ReferencingEntityNavigationPropertyName,ReferencedEntityNavigationPropertyName,IsHierarchical)" +
                    ",ManyToOneRelationships($select=SchemaName,ReferencingEntity,ReferencedEntity,ReferencingAttribute,ReferencedAttribute,ReferencingEntityNavigationPropertyName,ReferencedEntityNavigationPropertyName)" +
                    ",ManyToManyRelationships($select=Entity1LogicalName,Entity2LogicalName,Entity1NavigationPropertyName,Entity2NavigationPropertyName,SchemaName)";
            }

            if (includeAlternateKeys === true) {
                queryTable.Filters += ",Keys($select=LogicalName,SchemaName,KeyAttributes,EntityKeyIndexStatus,DisplayName)";
            }
            batchedQueries[batchedQueries.length - 1].push(queryTable);

            if (includeOptionValues === true) {
                var metadataAttributes = ["PicklistAttributeMetadata", "MultiSelectPicklistAttributeMetadata", "BooleanAttributeMetadata", "StateAttributeMetadata", "StatusAttributeMetadata"];
                metadataAttributes.forEach(function (metadataAttribute) {
                    var retrieveMetadataAttribute = {};
                    retrieveMetadataAttribute.EntitySetName = "EntityDefinitions(LogicalName='" + tableLogicalName + "')/Attributes/Microsoft.Dynamics.CRM." + metadataAttribute;
                    retrieveMetadataAttribute.Filters = "$select=EntityLogicalName,LogicalName,AttributeType&$expand=OptionSet";
                    batchedQueries[batchedQueries.length - 1].push(retrieveMetadataAttribute);
                });
            }
        });
    });

    return DRB.Xrm.RetrieveBatches(batchedQueries);
}

/**
 * Common - Set Custom API Tables
 * @param {any} data Data to process
 */
DRB.Common.SetCustomAPITables = function (data) {
    var dataResponses = [];
    // clear the response
    var firstRowData = data.split('\r\n', 1)[0];
    var splittedData = data.split(firstRowData);
    splittedData.forEach(function (segment) { if (segment.indexOf("{") > -1) { dataResponses.push(segment); } });
    // end clear the response
    var contexts = [];
    dataResponses.forEach(function (dataResponse) {
        var contextRegion = dataResponse.substring(dataResponse.indexOf('{'), dataResponse.lastIndexOf('}') + 1);
        contexts.push(JSON.parse(contextRegion));
    });

    if (contexts.length !== 3) { return []; }

    var customAPIs = DRB.Common.MapCustomAPIs(contexts[0]);
    DRB.Common.MapCustomAPIRequestParameters(contexts[1], customAPIs);
    DRB.Common.MapCustomAPIResponseProperties(contexts[2], customAPIs);
    return customAPIs;
}

/**
 * Common - Set Custom Action Tables
 * @param {any} data Data to process
 */
DRB.Common.SetCustomActionTables = function (data) {
    var dataResponses = [];
    // clear the response
    var firstRowData = data.split('\r\n', 1)[0];
    var splittedData = data.split(firstRowData);
    splittedData.forEach(function (segment) { if (segment.indexOf("{") > -1) { dataResponses.push(segment); } });
    // end clear the response
    var contexts = [];
    dataResponses.forEach(function (dataResponse) {
        var contextRegion = dataResponse.substring(dataResponse.indexOf('{'), dataResponse.lastIndexOf('}') + 1);
        contexts.push(JSON.parse(contextRegion));
    });

    if (contexts.length !== 3) { return []; }

    var customActions = DRB.Common.MapCustomActions(contexts[0], "Name");
    DRB.Common.MapCustomActionRequestParameters(contexts[1], customActions);
    DRB.Common.MapCustomActionResponseProperties(contexts[2], customActions);
    return customActions;
}

/**
 * Common - Set System Views
 * @param {any} data Data to process
 */
DRB.Common.SetSystemViews = function (data, tables) {
    var dataResponses = [];
    // clear the response
    var firstRowData = data.split('\r\n', 1)[0];
    var splittedData = data.split(firstRowData);
    splittedData.forEach(function (segment) { if (segment.indexOf("{") > -1) { dataResponses.push(segment); } });
    // end clear the response
    var contexts = [];
    dataResponses.forEach(function (dataResponse) {
        var contextRegion = dataResponse.substring(dataResponse.indexOf('{'), dataResponse.lastIndexOf('}') + 1);
        contexts.push(JSON.parse(contextRegion));
    });

    contexts.forEach(function (context) {
        var systemViews = DRB.Common.MapSystemViews(context, "Name");
        if (systemViews.length > 0) {
            var tableLogicalName = systemViews[0].TableLogicalName;
            var currentTable = DRB.Utilities.GetRecordById(tables, tableLogicalName);
            if (DRB.Utilities.HasValue(currentTable)) {
                currentTable.SystemViews = systemViews;
                currentTable.SystemViewsLoaded = true;
            }
        }
    });
}

/**
 * Common - Set Tables
 * @param {any} args Data to process
 * @param {DRB.Models.Table[]} tables Tables
 * @param {boolean} mapRelationships Map Relationships
 * @param {boolean} mapAlternateKeys Map Alternate Keys
 */
DRB.Common.SetTables = function (args, tables, mapRelationships, mapAlternateKeys) {
    var mapOptionValues = false;
    if (mapAlternateKeys === true) { mapOptionValues = true; } // if map Alternate Keys map also Option Values (Alternate Key supports Picklist)

    var datas = [];
    if (Array.isArray(args[0])) {
        // multiple batches
        for (var count = 0; count < args.length; count++) { datas.push(args[count][0]); }
    } else {
        // single batch
        datas.push(args[0]);
    }

    datas.forEach(function (data) {
        var dataResponses = [];
        // clear the response
        var firstRowData = data.split('\r\n', 1)[0];
        var splittedData = data.split(firstRowData);
        splittedData.forEach(function (segment) { if (segment.indexOf("{") > -1) { dataResponses.push(segment); } });
        // end clear the response
        var contexts = [];
        dataResponses.forEach(function (dataResponse) {
            var contextRegion = dataResponse.substring(dataResponse.indexOf('{'), dataResponse.lastIndexOf('}') + 1);
            contexts.push(JSON.parse(contextRegion));
        });
        var contextsToCheckOptionValues = [];
        contexts.forEach(function (context) {
            var tableLogicalName = context.LogicalName;
            // if LogicalName is present assume it's a query of columns, relationships, keys
            if (DRB.Utilities.HasValue(tableLogicalName)) {
                var currentTable = DRB.Utilities.GetRecordById(tables, tableLogicalName);
                if (DRB.Utilities.HasValue(currentTable)) {
                    currentTable.Columns = DRB.Common.MapColumns(context.Attributes, currentTable.PrimaryIdAttribute, currentTable.PrimaryNameAttribute, "Name");
                    currentTable.ColumnsLoaded = true;
                    if (mapRelationships === true) {
                        currentTable.OneToManyRelationships = DRB.Common.MapRelationships(context.OneToManyRelationships, "OneToMany", "Name", tableLogicalName);
                        currentTable.ManyToOneRelationships = DRB.Common.MapRelationships(context.ManyToOneRelationships, "ManyToOne", "Name", tableLogicalName);
                        currentTable.ManyToManyRelationships = DRB.Common.MapRelationships(context.ManyToManyRelationships, "ManyToMany", "Name", tableLogicalName);
                        currentTable.RelationshipsLoaded = true;

                        // check Hierarchy
                        for (var countRel = 0; countRel < currentTable.OneToManyRelationships.length; countRel++) {
                            if (currentTable.OneToManyRelationships[countRel].IsHierarchical === true) {
                                currentTable.HasHierarchy = true;
                                break;
                            }
                        }
                    }

                    if (mapAlternateKeys === true) {
                        currentTable.AlternateKeys = DRB.Common.MapAlternateKeys(context.Keys, "Name");
                        currentTable.AlternateKeysLoaded = true;
                    }
                }
            } else { contextsToCheckOptionValues.push(context); }
        });

        if (mapOptionValues === true) {
            contextsToCheckOptionValues.forEach(function (context) {
                if (DRB.Utilities.HasValue(context.value)) { DRB.Common.MapOptionValues(context.value); }
            });
        }
    });
}
// #endregion