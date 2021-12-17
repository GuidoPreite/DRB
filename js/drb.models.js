// #region DRB.Models
/**
 * Models - Dropdown Option
 * @param {any} value Value
 * @param {string} label Label
 * @param {string} subText Sub Text
 * @param {string} subText2 Sub Text 2
 */
DRB.Models.DropdownOption = function (value, label, subText, subText2) {
    this.Value = value;
    this.Label = label;
    this.SubText = subText;
    this.SubText2 = subText2;
}

/**
 * Models - Records
 * @param {any} records Records
 */
DRB.Models.Records = function (records) {
    this.Records = records;

    this.ToDropdown = function () {
        var recordsDropdown = [];
        this.Records.forEach(function (record) { recordsDropdown.push(record.ToDropdownOption()); });
        return recordsDropdown;
    }
}

/**
 * Models - Id Value
 * @param {any} id Id
 * @param {any} value Value
 */
DRB.Models.IdValue = function (id, value) {
    this.Id = id;
    this.Value = value;

    this.ToDropdownOption = function () { return new DRB.Models.DropdownOption(this.Id, this.Value); }
}

/**
 * Models - Option Set Value
 * @param {any} value Value
 * @param {string} label Label
 */
DRB.Models.OptionSetValue = function (value, label) {
    this.Value = value;
    this.Label = label;

    this.ToDropdownOption = function () {
        return new DRB.Models.DropdownOption(this.Value, this.Label, this.Value);
    }
}

/**
 * Models - Relationship
 * @param {string} schemaName Schema Name
 * @param {string} type Type
 * @param {string} sourceTable Source Table
 * @param {string} targetTable Target Table
 * @param {string} navigationProperty Navigation Property
 * @param {string} navigationAttribute Navigation Attribute
 */
DRB.Models.Relationship = function (schemaName, type, sourceTable, targetTable, navigationProperty, navigationAttribute, isHierarchical) {
    this.Id = schemaName;
    this.Name = schemaName;
    this.SchemaName = schemaName;
    this.Type = type;
    this.SourceTable = sourceTable;
    this.TargetTable = targetTable;
    this.TargetTableName = "";
    this.NavigationProperty = navigationProperty;
    this.NavigationAttribute = navigationAttribute;
    this.NavigationAttributeName = "";
    this.IsHierarchical = isHierarchical;

    this.Columns = [];
    this.ToDropdownOption = function () {
        var subText = "Table: " + this.TargetTableName + " (" + this.TargetTable + ")";
        switch (this.Type) {
            case "OneToMany":
                subText += " - Target: " + this.NavigationAttributeName + " (" + this.NavigationAttribute + ")"; break;
            case "ManyToOne":
                subText += " - Source: " + this.NavigationAttributeName + " (" + this.NavigationAttribute + ")"; break;
        }
        return new DRB.Models.DropdownOption(this.Id, this.SchemaName, subText);
    }
}

/**
 * Models - Simple Relationship
 * @param {string} schemaName Schema Name
 * @param {string} type Type
 * @param {string} sourceTable Source Table
 * @param {string} targetTable Target Table
 * @param {string} navigationProperty Navigation Property
 * @param {string} navigationAttribute Navigation Attribute
 * @param {string} navigationAttributeName Navigation Attribute Name
 */
DRB.Models.SimpleRelationship = function (schemaName, type, sourceTable, targetTable, navigationAttribute, navigationAttributeName) {
    this.Id = schemaName;
    this.Name = schemaName;
    this.SchemaName = schemaName;
    this.Type = type;
    this.SourceTable = sourceTable;
    this.TargetTable = targetTable;
    this.NavigationAttribute = navigationAttribute;
    this.NavigationAttributeName = navigationAttributeName;

    if (!DRB.Utilities.HasValue(this.NavigationAttribute)) { this.NavigationAttribute = ""; }

    this.Columns = [];
    this.ToDropdownOption = function () {
        var subText = "";
        var subText2 = "";
        switch (this.Type) {
            case "OneToMany":
                subText = "(1:N) One To Many Relationships";
                subText2 = "(1:N) Target: " + this.NavigationAttributeName + " (" + this.NavigationAttribute + ")";
                break;
            case "ManyToOne":
                subText = "(N:1) Many To One Relationships";
                subText2 = "(N:1) Source: " + this.NavigationAttributeName + " (" + this.NavigationAttribute + ")";
                break;
            case "ManyToMany":
                subText = "(N:N) Many To Many Relationships";
                subText2 = "(N:N)";
                break;
        }
        return new DRB.Models.DropdownOption(this.Id, this.SchemaName, subText, subText2);
    }
}

/**
 * Models - Relationship Column
 * @param {string} relationshipSchemaName Relationship Schema Name
 * @param {string} relationshipType Relationship Type
 * @param {string} relationshipNavigationProperty Relationship Navigation Property
 * @param {string} relationshipNavigationAttribute Relationship Navigation Attribute
 * @param {string} relationshipNavigationAttributeName Relationship Navigation Attribute Name
 * @param {string} targetTableLogicalName Target Table Logical Name
 * @param {string} targetTableName Target Table Name
 * @param {string} columnLogicalName Column Logical Name
 * @param {string} columnName Column Name
 * @param {string} columnSchemaName Column Schema Name
 * @param {string} columnAttributeType Column Attribute Type
 * @param {string} columnIsPrimaryIdAttribute Column Is Primary Id Attribute
 * @param {string} columnIsPrimaryNameAttribute Column Is Primary Name Attribute
 * @param {string} columnRequiredLevel Column Required Level
 * @param {boolean} columnIsValidForRead Column Is Valid For Read
 * @param {boolean} columnIsValidForCreate Column Is Valid For Create
 * @param {boolean} columnIsValidForUpdate Column Is Valid For Update
 */
DRB.Models.RelationshipColumn = function (relationshipSchemaName, relationshipType, relationshipNavigationProperty,
    relationshipNavigationAttribute, relationshipNavigationAttributeName, targetTableLogicalName, targetTableName,
    columnLogicalName, columnName, columnSchemaName, columnAttributeType, columnIsPrimaryIdAttribute, columnIsPrimaryNameAttribute,
    columnRequiredLevel, columnIsValidForRead, columnIsValidForCreate, columnIsValidForUpdate, columnAdditionalProperties) {
    this.Id = relationshipSchemaName + "|" + columnLogicalName;
    this.RelationshipSchemaName = relationshipSchemaName;
    this.RelationshipType = relationshipType;
    this.RelationshipNavigationProperty = relationshipNavigationProperty;
    this.RelationshipNavigationAttribute = relationshipNavigationAttribute;
    this.RelationshipNavigationAttributeName = relationshipNavigationAttributeName;
    this.TargetTableLogicalName = targetTableLogicalName;
    this.TargetTableName = targetTableName;
    this.ColumnLogicalName = columnLogicalName;
    this.Name = columnName;
    this.ColumnSchemaName = columnSchemaName;
    this.ColumnAttributeType = columnAttributeType;
    this.ColumnIsPrimaryIdAttribute = columnIsPrimaryIdAttribute;
    this.ColumnIsPrimaryNameAttribute = columnIsPrimaryNameAttribute;
    this.ColumnRequiredLevel = columnRequiredLevel;
    this.ColumnIsValidForRead = columnIsValidForRead;
    this.ColumnIsValidForCreate = columnIsValidForCreate;
    this.ColumnIsValidForUpdate = columnIsValidForUpdate;
    this.ColumnAdditionalProperties = columnAdditionalProperties;

    this.ToDropdownOption = function () {
        var subText = this.ColumnLogicalName + " (" + this.ColumnAttributeType + ")";
        var subText2 = "Relationship: " + this.RelationshipSchemaName + " - Table: " + this.TargetTableName + " (" + this.TargetTableLogicalName + ")";
        switch (this.RelationshipType) {
            case "OneToMany":
                subText2 += " - Target: " + this.RelationshipNavigationAttributeName + " (" + this.RelationshipNavigationAttribute + ")"; break;
            case "ManyToOne":
                subText2 += " - Source: " + this.RelationshipNavigationAttributeName + " (" + this.RelationshipNavigationAttribute + ")"; break;
        }
        return new DRB.Models.DropdownOption(this.Id, this.Name, subText2, subText);
    }
}

/**
 * Models - Column
 * @param {string} logicalName Logical Name
 * @param {string} name Name
 * @param {string} schemaName Schema Name
 * @param {string} attributeType Attribute Type
 * @param {boolean} isValidForCreate Is Valid For Read
 * @param {boolean} isValidForCreate Is Valid For Create
 * @param {boolean} isValidForUpdate Is Valid For Update
 * @param {any} additionalProperties Additional Properties
 */
DRB.Models.Column = function (logicalName, name, schemaName, attributeType, isPrimaryIdAttribute, isPrimaryNameAttribute, requiredLevel, isValidForRead, isValidForCreate, isValidForUpdate, additionalProperties) {
    this.Id = logicalName;
    this.LogicalName = logicalName;
    this.Name = name;
    this.SchemaName = schemaName;
    this.AttributeType = attributeType;
    this.IsPrimaryIdAttribute = isPrimaryIdAttribute;
    this.IsPrimaryNameAttribute = isPrimaryNameAttribute;
    this.RequiredLevel = requiredLevel;
    this.IsValidForRead = isValidForRead;
    this.IsValidForCreate = isValidForCreate;
    this.IsValidForUpdate = isValidForUpdate;
    this.IsValidForFilter = true;
    this.IsValidForOrder = true;
    this.AdditionalProperties = additionalProperties;

    // additional properties
    this.ODataName = logicalName;
    this.AttributeOf = null;
    this.OptionValues = null;

    // if column is not valid for read it can't be used for filter or order
    if (this.IsValidForRead === false) {
        this.IsValidForFilter = false;
        this.IsValidForOrder = false;
    }

    // check attribute type for setting some specific properties
    switch (attributeType) {
        case "Lookup":
        case "Customer":
        case "Owner":
            this.ODataName = "_" + logicalName + "_value";
            break;

        case "Image":
        case "File":
            this.IsValidForFilter = false;
            this.IsValidForOrder = false;
            break;
    }

    this.ToDropdownOption = function () {
        // subText renaming
        var renamedAttributeType = this.AttributeType;
        switch (this.AttributeType) {
            case "Uniqueidentifier": renamedAttributeType = "Guid"; break;
            case "Picklist": renamedAttributeType = "Choice"; break;
            case "MultiPicklist": renamedAttributeType = "Choices"; break;
            case "DateTime": renamedAttributeType = "Date Time"; break;
            case "Double": renamedAttributeType = "Float"; break;
            case "Integer": renamedAttributeType = "Whole Number"; break;
            case "Memo": renamedAttributeType = "Multiline Text"; break;
            case "String": renamedAttributeType = "Text"; break;
            case "Money": renamedAttributeType = "Currency"; break;
            case "BigInt": renamedAttributeType = "Big Integer"; break;
        }

        if (this.AttributeType === "Lookup" && this.AdditionalProperties.IsPolymorphic === true) { renamedAttributeType = "Polymorphic Lookup"; }

        var subText = this.LogicalName + " (" + renamedAttributeType + ")";
        if (this.RequiredLevel === "Recommended") { subText += " +"; }
        if (this.RequiredLevel === "ApplicationRequired" || this.RequiredLevel === "SystemRequired") { subText += " *"; }
        if (this.IsPrimaryNameAttribute === true) { subText += " (Primary Column)"; }
        if (this.AttributeType === "Image" && this.AdditionalProperties.CanStoreFullImage === true) { subText += " (Can Store Full Image)"; }
        return new DRB.Models.DropdownOption(this.Id, this.Name, subText);
    }
}

/**
 * Models - Alternate Key
 * @param {string} logicalName Logical Name
 * @param {string} name Name
 * @param {string} schemaName Schema Name
 * @param {string} keyAttributes Key Attributes
 *    
 */
DRB.Models.AlternateKey = function (logicalName, name, schemaName, keyAttributes) {
    this.Id = logicalName;
    this.Name = name;
    this.LogicalName = logicalName;
    this.SchemaName = schemaName;
    this.KeyAttributes = keyAttributes;

    this.ToDropdownOption = function () { return new DRB.Models.DropdownOption(this.Id, this.Name, this.LogicalName); }
}

/**
 * Models - Table
 * @param {string} logicalName Logical Name
 * @param {string} name Name
 * @param {string} schemaName Schema Name
 * @param {string} entitySetName EtitySet Name
 * @param {string} primaryIdAttribute Primary Id Attribute
 * @param {string} primaryNameAttribute Primary Name Attribute
 * @param {number} objectTypeCode Object Type Code
 */
DRB.Models.Table = function (logicalName, name, schemaName, entitySetName, primaryIdAttribute, primaryNameAttribute, objectTypeCode) {
    this.Id = logicalName;
    this.Name = name;
    this.LogicalName = logicalName;
    this.SchemaName = schemaName;
    this.EntitySetName = entitySetName;
    this.PrimaryIdAttribute = primaryIdAttribute;
    this.PrimaryNameAttribute = primaryNameAttribute;
    this.ObjectTypeCode = objectTypeCode;

    // additional properties
    this.Columns = [];
    this.OneToManyRelationships = [];
    this.ManyToOneRelationships = [];
    this.ManyToManyRelationships = [];
    this.AlternateKeys = [];
    this.PersonalViews = [];
    this.HasHierarchy = false;

    this.ColumnsLoaded = false;
    this.RelationshipsLoaded = false;
    this.AlternateKeysLoaded = false;
    this.PersonalViewsLoaded = false;

    this.ToDropdownOption = function () { return new DRB.Models.DropdownOption(this.Id, this.Name, this.LogicalName); }
}

/**
 * Models - User
 * @param {string} id Id
 * @param {string} name Name
 * @param {string} aadObjectId AAD Object Id
 */
DRB.Models.User = function (id, name, aadObjectId) {
    this.Id = id;
    this.Name = name;
    this.AADObjectId = aadObjectId;
}

/**
 * Models - Personal View
 * @param {string} id Id
 * @param {string} name Name
 * @param {string} tableLogicalName Table Logical Name
 *    
 */
DRB.Models.PersonalView = function (id, name, tableLogicalName) {
    this.Id = id;
    this.Name = name;
    this.TableLogicalName = tableLogicalName;

    this.ToDropdownOption = function () { return new DRB.Models.DropdownOption(this.Id, this.Name, this.TableLogicalName); }
}

/**
 * Models - Dataverse Execute
 * @param {string} name Name
 * @param {boolean} isBound Is Bound
 * @param {string} logicalName Logical Name
 * @param {boolean} isCollectionBound Is Collection Bound
 * @param {boolean} isCustom Is Custom
 * @param {boolean} hasReturnType Has Return Type
 * @param {string} returnType Return Type
 * @param {boolean} returnOptional Return Optional
 * @param {DRB.Models.DataverseParameter[]} parameters Parameters
 */
DRB.Models.DataverseExecute = function (type, id, name, isBound, logicalName, isCollectionBound, isFunction, hasReturnType, returnType, parameters) {
    this.Type = type;
    this.Id = id;
    this.Name = name;
    this.IsBound = isBound;
    this.LogicalName = logicalName;
    this.IsCollectionBound = isCollectionBound;
    this.IsFunction = isFunction;
    this.HasReturnType = hasReturnType;
    this.ReturnType = returnType;
    this.Parameters = parameters;
    this.Properties = [];
    var subText = "";
    if (this.Id !== this.Name) { subText = this.Id; }

    if (this.IsCollectionBound === true) {
        if (subText !== "") { subText += " "; }
        subText += "(Collection Bound)";
    }

    if (this.Type === "CustomAPI" && this.IsFunction === true) {
        if (subText !== "") { subText += " "; }
        subText += "(Function)";
    }
    this.ToDropdownOption = function () { return new DRB.Models.DropdownOption(this.Id, this.Name, subText); }
}

/**
 * Models - Dataverse Parameter
 * @param {string} name Name
 * @param {string} type Type
 * @param {boolean} optional Optional
 */
DRB.Models.DataverseParameter = function (name, type, optional, position, binding) {
    this.Id = name;
    this.Name = name;
    this.Type = type;
    this.Optional = optional;
    this.Position = position;
    this.Binding = binding;
}

/**
 * Models - Dataverse Property
 * @param {string} name Name
 * @param {string} type Type
 */
DRB.Models.DataverseProperty = function (name, type, position, binding) {
    this.Id = name;
    this.Name = name;
    this.Type = type;
    this.Position = position;
    this.Binding = binding;
}

/**
 * Models - Dataverse Complex Type
 * @param {string} name Name
 * @param {DRB.Models.DataverseProperty[]} properties Properties
 */
DRB.Models.DataverseComplexType = function (name, properties) {
    this.Id = name;
    this.Name = name;
    this.Properties = properties;
}

/**
 * Models - Dataverse Member
 * @param {string} name Name
 * @param {string} value Value
 */
DRB.Models.DataverseMember = function (name, value) {
    this.Id = value;
    this.Name = name;
    this.Value = value;

    this.ToDropdownOption = function () { return new DRB.Models.DropdownOption(this.Id, this.Name, this.Value); }
}

/**
 * Models - Dataverse Enum Type
 * @param {string} name Name
 * @param {DRB.Models.DataverseMember[]} members Members
 */
DRB.Models.DataverseEnumType = function (name, isFlags, members) {
    this.Id = name;
    this.Name = name;
    this.IsFlags = isFlags;
    this.Members = members;
}

/**
 * Models - Dataverse Table
 * @param {string} logicalName Logical Name
 * @param {string} name Name
 * @param {string} schemaName Schema Name
 * @param {string} entitySetName EtitySet Name
 * @param {string} primaryIdAttribute Primary Id Attribute
 * @param {string} primaryNameAttribute Primary Name Attribute
 * @param {number} objectTypeCode Object Type Code
 */
DRB.Models.DataverseTable = function (logicalName, name, schemaName, entitySetName, primaryIdAttribute, primaryNameAttribute, objectTypeCode) {
    this.Id = logicalName;
    this.Name = name;
    this.LogicalName = logicalName;
    this.SchemaName = schemaName;
    this.EntitySetName = entitySetName;
    this.PrimaryIdAttribute = primaryIdAttribute;
    this.PrimaryNameAttribute = primaryNameAttribute;
    this.ObjectTypeCode = objectTypeCode;

    // additional properties
    this.DataverseExecutes = [];

    this.ToDropdownOption = function () { return new DRB.Models.DropdownOption(this.Id, this.Name, this.LogicalName); }
}
// #endregion