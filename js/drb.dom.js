// #region DRB.DOM
// Main Content
DRB.DOM.MainContent = { Id: "main_content" }; // defined also inside index.htm

// jsTree
DRB.DOM.TreeView = { Id: "div_collection" }; // defined also inside index.htm

// Configure Content
DRB.DOM.ConfigureContent = { Id: "configure_settings" };

// Tabs
DRB.DOM.TabsRequest = { Id: "tabs_request" };
DRB.DOM.TabsContent = { Id: "tabs_content" };

// Collection
DRB.DOM.Collection = {};
DRB.DOM.Collection.Menu = { Id: "mnu_file" }; // defined also inside index.htm
DRB.DOM.Collection.Separator = { Id: "", Class: "dropdown-divider" };
DRB.DOM.Collection.LoadInput = { Id: "inp_loadfile" };
DRB.DOM.Collection.NewButton = { Id: "btn_newcollection", Name: "New Collection", Class: "dropdown-item" };
DRB.DOM.Collection.LoadButton = { Id: "btn_loadcollection", Name: "Load Collection", Class: "dropdown-item" };
DRB.DOM.Collection.SaveButton = { Id: "btn_savecollection", Name: "Save Collection", Class: "dropdown-item" };
DRB.DOM.Collection.ExportPostmanButton = { Id: "btn_exportpostmancollection", Name: "Export as Postman Collection (2.1)", Class: "dropdown-item" };

DRB.DOM.Collection.Postman = {};
DRB.DOM.Collection.Postman.Div = { Id: "div_export_postman" };
DRB.DOM.Collection.Postman.GrantTypeSpan = { Id: "span_postman_granttype", Name: "Grant Type" };
DRB.DOM.Collection.Postman.GrantTypeDropdown = { Id: "cbx_postman_granttype", Name: "Select Grant Type" };
DRB.DOM.Collection.Postman.SettingsDiv = { Id: "div_export_postman_setting" };

DRB.DOM.Collection.Postman.Table = { Id: "table_postman" };
DRB.DOM.Collection.Postman.Tr = { Id: "tr_postman_" };
DRB.DOM.Collection.Postman.TdLabel = { Id: "td_postman_label_" };
DRB.DOM.Collection.Postman.TdValue = { Id: "td_postman_value_" };

DRB.DOM.Collection.Postman.EndpointSpan = { Id: "span_postman_endpoint", Name: "Endpoint" };
DRB.DOM.Collection.Postman.EndpointDropdown = { Id: "cbx_postman_endpoint", Name: "Select Endpoint" };

DRB.DOM.Collection.Postman.UrlSpan = { Id: "span_postman_url", Name: "URL", SmallText: "{{url}}" };
DRB.DOM.Collection.Postman.UrlInput = { Id: "txt_postman_url" };

DRB.DOM.Collection.Postman.AuthUrlSpan = { Id: "span_postman_authurl", Name: "Auth URL", SmallText: "{{authurl}}" };
DRB.DOM.Collection.Postman.AuthUrlInput = { Id: "txt_postman_authurl" };
DRB.DOM.Collection.Postman.CallbackUrlSpan = { Id: "span_postman_callbackurl", Name: "Callback URL", SmallText: "{{callback}}" };
DRB.DOM.Collection.Postman.CallbackUrlInput = { Id: "txt_postman_callbackurl" };

DRB.DOM.Collection.Postman.ClientIdSpan = { Id: "span_postman_clientid", Name: "Client ID", SmallText: "{{clientid}}" };
DRB.DOM.Collection.Postman.ClientIdInput = { Id: "txt_postman_clientid" };
DRB.DOM.Collection.Postman.ClientSecretSpan = { Id: "span_postman_clientsecret", Name: "Client Secret", SmallText: "{{clientsecret}}" };
DRB.DOM.Collection.Postman.ClientSecretInput = { Id: "txt_postman_clientsecret" };
DRB.DOM.Collection.Postman.TenantIdSpan = { Id: "span_postman_tenantid", Name: "Tenant ID", SmallText: "{{tenantid}}" };
DRB.DOM.Collection.Postman.TenantIdInput = { Id: "txt_postman_tenantid" };
DRB.DOM.Collection.Postman.AccessTokenSpan = { Id: "span_postman_accesstoken", Name: "Access Token URL" };
DRB.DOM.Collection.Postman.AccessTokenInput = { Id: "txt_postman_accesstoken" };
DRB.DOM.Collection.Postman.ScopeSpan = { Id: "span_postman_scope", Name: "Scope" };
DRB.DOM.Collection.Postman.ScopeInput = { Id: "txt_postman_scope" };
DRB.DOM.Collection.Postman.ResourceSpan = { Id: "span_postman_resource", Name: "Resource" };
DRB.DOM.Collection.Postman.ResourceInput = { Id: "txt_postman_resource" };


// Request Type
DRB.DOM.RequestType = {};
DRB.DOM.RequestType.Div = { Id: "request_name", Name: "Request Name" };
DRB.DOM.RequestType.Span = { Id: "span_request", Name: "Request Type" };
DRB.DOM.RequestType.Dropdown = { Id: "cbx_requesttype", Name: "Select a Request Type" };

// Table
DRB.DOM.Table = {};
DRB.DOM.Table.Span = { Id: "span_table", Name: "Table" };
DRB.DOM.Table.Dropdown = { Id: "cbx_table", Name: "Select a Table" };

// Columns
DRB.DOM.Columns = {};
DRB.DOM.Columns.Div = { Id: "div_columns", Class: "sameline" };
DRB.DOM.Columns.Button = { Id: "btn_columns", Name: "Select Columns" };
DRB.DOM.Columns.Span = { Id: "span_columns", Name: "Columns" };
DRB.DOM.Columns.Dropdown = { Id: "cbx_columns", Name: "Select Columns" };

// Relationships
DRB.DOM.DivRelationship = { Id: "div_relationships" };
DRB.DOM.Relationship = {};
DRB.DOM.Relationship.OneToMany = {};
DRB.DOM.Relationship.OneToMany.Span = { Id: "span_onetomany", Name: "One To Many Relationships&nbsp;&nbsp;" };
DRB.DOM.Relationship.OneToMany.Dropdown = { Id: "cbx_onetomany", Name: "Selected Columns" };
DRB.DOM.Relationship.OneToMany.Button = { Id: "btn_onetomany", Name: "Select", Class: "btn-outline-secondary" };
DRB.DOM.Relationship.ManyToOne = {};
DRB.DOM.Relationship.ManyToOne.Span = { Id: "span_manytoone", Name: "Many To One Relationships&nbsp;&nbsp;" };
DRB.DOM.Relationship.ManyToOne.Dropdown = { Id: "cbx_manytoone", Name: "Selected Columns" };
DRB.DOM.Relationship.ManyToOne.Button = { Id: "btn_manytoone", Name: "Select", Class: "btn-outline-secondary" };
DRB.DOM.Relationship.ManyToMany = {};
DRB.DOM.Relationship.ManyToMany.Span = { Id: "span_manytomany", Name: "Many To Many Relationships" };
DRB.DOM.Relationship.ManyToMany.Dropdown = { Id: "cbx_manytomany", Name: "Selected Columns" };
DRB.DOM.Relationship.ManyToMany.Button = { Id: "btn_manytomany", Name: "Select", Class: "btn-outline-secondary" };

// Relationship Selection
DRB.DOM.RelationshipSelect = {};
DRB.DOM.RelationshipSelect.Div = { Id: "div_relationshipselect" };
DRB.DOM.RelationshipSelect.Relationship = {};
DRB.DOM.RelationshipSelect.Relationship.Span = { Id: "span_relationshipselect", Name: "Relationship" };
DRB.DOM.RelationshipSelect.Relationship.Dropdown = { Id: "cbx_relationshipselect", Name: "Select a Relationship" };
DRB.DOM.RelationshipSelect.Columns = {};
DRB.DOM.RelationshipSelect.Columns.Span = { Id: "span_relationshipselectcolumns", Name: "Columns" };
DRB.DOM.RelationshipSelect.Columns.Dropdown = { Id: "cbx_relationshipselectcolumns", Name: "Select Columns" };

// Version
DRB.DOM.Version = {};
DRB.DOM.Version.Span = { Id: "span_version", Name: "Version" };
DRB.DOM.Version.Dropdown = { Id: "cbx_version", Name: "Version" };

// Process
DRB.DOM.Process = {};
DRB.DOM.Process.Span = { Id: "span_process", Name: "Process" };
DRB.DOM.Process.Dropdown = { Id: "cbx_process", Name: "Process" };

// Token Header
DRB.DOM.TokenHeader = {};
DRB.DOM.TokenHeader.Span = { Id: "span_tokenheader", Name: "Token Header" };
DRB.DOM.TokenHeader.Dropdown = { Id: "cbx_tokenheader", Name: "Token Header" };

// Impersonate
DRB.DOM.Impersonate = {};
DRB.DOM.Impersonate.Span = { Id: "span_impersonate", Name: "Impersonate" };
DRB.DOM.Impersonate.Dropdown = { Id: "cbx_impersonate", Name: "Impersonate" };

// Impersonate Id 
DRB.DOM.ImpersonateId = {};
DRB.DOM.ImpersonateId.Div = { Id: "div_impersonateid", Class: "sameline" };
DRB.DOM.ImpersonateId.Span = { Id: "span_impersonateid", Name: "Impersonate Id" };
DRB.DOM.ImpersonateId.Input = { Id: "txt_impersonateid" };
DRB.DOM.ImpersonateId.Lookup = { Id: "lkp_impersonateid" };

// Formatted Values
DRB.DOM.FormattedValues = {};
DRB.DOM.FormattedValues.Span = { Id: "span_formattedvalues", Name: "Formatted Values" };
DRB.DOM.FormattedValues.Dropdown = { Id: "cbx_formattedvalues", Name: "Formatted Values" };

// Detect Changes
DRB.DOM.DetectChanges = {};
DRB.DOM.DetectChanges.Span = { Id: "span_detectchanges", Name: "Detect Changes" };
DRB.DOM.DetectChanges.Dropdown = { Id: "cbx_detectchanges", Name: "Detect Changes" };

// Return Record
DRB.DOM.ReturnRecord = {};
DRB.DOM.ReturnRecord.Span = { Id: "span_returnrecord", Name: "Return Record" };
DRB.DOM.ReturnRecord.Dropdown = { Id: "cbx_returnrecord", Name: "Return Record" };

// Detect Duplicates
DRB.DOM.DetectDuplicates = {};
DRB.DOM.DetectDuplicates.Span = { Id: "span_detectduplicates", Name: "Detect Duplicates" };
DRB.DOM.DetectDuplicates.Dropdown = { Id: "cbx_detectduplicates", Name: "Detect Duplicates" };

// Prevent
DRB.DOM.Prevent = {};
DRB.DOM.Prevent.Span = { Id: "span_prevent", Name: "Prevent" };
DRB.DOM.Prevent.Dropdown = { Id: "cbx_prevent", Name: "Prevent" };

// Retrieve Count
DRB.DOM.RetrieveCount = {};
DRB.DOM.RetrieveCount.Span = { Id: "span_retrievecount", Name: "Retrieve Count" };
DRB.DOM.RetrieveCount.Dropdown = { Id: "cbx_retrievecount", Name: "Retrieve Count" };

// Top Count
DRB.DOM.TopCount = {};
DRB.DOM.TopCount.Span = { Id: "span_topcount", Name: "Top Count" };
DRB.DOM.TopCount.Input = { Id: "txt_topcount" };

// Primary Id
DRB.DOM.PrimaryId = {};
DRB.DOM.PrimaryId.Div = { Id: "div_primaryid" };
DRB.DOM.PrimaryId.Span = { Id: "span_primaryid", Name: "Primary Id" };
DRB.DOM.PrimaryId.Input = { Id: "txt_primaryid" };
DRB.DOM.PrimaryId.Lookup = { Id: "lkp_primaryid" };

// Use Alternate Key
DRB.DOM.UseAlternateKey = {};
DRB.DOM.UseAlternateKey.Span = { Id: "span_usealternatekey", Name: "Use Alternate Key" };
DRB.DOM.UseAlternateKey.Dropdown = { Id: "cbx_usealternatekey", Name: "Use Alternate Key" };

// Alternate Key
DRB.DOM.AlternateKey = {};
DRB.DOM.AlternateKey.Div = { Id: "div_alternatekey" };
DRB.DOM.AlternateKey.Span = { Id: "span_alternatekey", Name: "Alternate Key" };
DRB.DOM.AlternateKey.Dropdown = { Id: "cbx_alternatekey", Name: "Select an Alternate Key" };
DRB.DOM.AlternateKey.DivColumns = { Id: "div_alternatekeycolumns" };

// Alternate Key Table, Tr, Td, Control
DRB.DOM.AlternateKey.Table = { Id: "table_alternatekey" };
DRB.DOM.AlternateKey.Tr = { Id: "tr_alternatekey_" };
DRB.DOM.AlternateKey.TdColumn = { Id: "td_alternatekey_column_" };
DRB.DOM.AlternateKey.TdValue = { Id: "td_alternatekey_value_" };
DRB.DOM.AlternateKey.ControlValue = { Id: "alternatekey_value_" };

// #region Retrieve Multiple
// Filter By
DRB.DOM.FilterBy = {};
DRB.DOM.FilterBy.MainDiv = { Id: "div_main_fb", Class: "mapping-container" };
DRB.DOM.FilterBy.MainSpan = { Id: "span_main_fb", Name: "<b>Filter By</b>" };
DRB.DOM.FilterBy.StartButton = { Id: "btn_startfb_", Name: "Start", Class: "btn-primary" };
// Filter Groups
DRB.DOM.FilterGroups = {};
DRB.DOM.FilterGroups.MainDiv = { Id: "div_main_fg_", Class: "mapping-container" };
DRB.DOM.FilterGroups.MainSpan = { Id: "span_main_fg_", Name: "" };
DRB.DOM.FilterGroups.DivGroups = { Id: "div_fg_groups_" };
DRB.DOM.FilterGroups.Div = { Id: "div_fg_", Class: "mapping-container" };

DRB.DOM.FilterGroups.DivOptions = { Id: "div_fg_options_" };
DRB.DOM.FilterGroups.AddButton = { Id: "btn_addfg_", Name: "Add Group", Class: "btn-primary" };
DRB.DOM.FilterGroups.DivLogic = { Id: "div_fg_fl_", Class: "sameline" };
DRB.DOM.FilterGroups.SpanLogic = { Id: "span_fg_", Name: "Logic between Groups" };
DRB.DOM.FilterGroups.DropdownLogic = { Id: "cbx_fg_", Name: "Select Operator" };

DRB.DOM.FilterGroups.DivChoice = { Id: "div_fg_choice_" };
DRB.DOM.FilterGroups.ButtonChoice = { Id: "btn_fg_choice_", Name: "Add", Class: "btn-danger dropdown-toggle" };
DRB.DOM.FilterGroups.DivDropdownChoice = { Id: "div_fg_dropdownchoice_", Class: "dropdown-menu" };
DRB.DOM.FilterGroups.ButtonChoiceColumns = { Id: "btn_fg_addcolumns_", Name: "Filter Columns", Class: "dropdown-item" };
DRB.DOM.FilterGroups.ButtonChoiceGroups = { Id: "btn_fg_addgroups_", Name: "Filter Groups", Class: "dropdown-item" };

// Filter Columns table, tr, td
DRB.DOM.FilterColumns = {};
DRB.DOM.FilterColumns.MainDiv = { Id: "div_main_fc_", Class: "mapping-container3" };
DRB.DOM.FilterColumns.MainSpan = { Id: "span_main_fc_", Name: "" };
DRB.DOM.FilterColumns.Div = { Id: "div_fc_" };
DRB.DOM.FilterColumns.Table = { Id: "table_fc_" };
DRB.DOM.FilterColumns.Tr = { Id: "tr_fc_" };
DRB.DOM.FilterColumns.Dropdown = { Id: "cbx_fc_", Name: "Select Column" };
DRB.DOM.FilterColumns.TdColumn = { Id: "td_fclabel_", Name: "<b>Filter Column</b>" };
DRB.DOM.FilterColumns.TdOperator = { Id: "td_fcoperator_", Name: "<b>Operator</b>" };
DRB.DOM.FilterColumns.TdValue = { Id: "td_fcvalue_", Name: "<b>Value</b>" };
DRB.DOM.FilterColumns.DivOperator = { Id: "div_fc_operator_" };
DRB.DOM.FilterColumns.ControlOperator = { Id: "fc_operator_" };
DRB.DOM.FilterColumns.DivValue = { Id: "div_fc_value_" };
DRB.DOM.FilterColumns.ControlValue = { Id: "fc_value_" };

DRB.DOM.FilterColumns.AddButton = { Id: "btn_addfc_", Name: "Add Column", Class: "btn-primary" };
DRB.DOM.FilterColumns.DivLogic = { Id: "div_fc_fl_", Class: "sameline" };
DRB.DOM.FilterColumns.SpanLogic = { Id: "span_fc_", Name: "Logic between Columns" };
DRB.DOM.FilterColumns.DropdownLogic = { Id: "cbx_fc_", Name: "Select Operator" };

// Order Columns table, tr, td
DRB.DOM.OrderColumns = {};
DRB.DOM.OrderColumns.MainDiv = { Id: "div_main_oc", Class: "mapping-container" };
DRB.DOM.OrderColumns.MainSpan = { Id: "span_main_oc", Name: "<b>Order By</b>" };
DRB.DOM.OrderColumns.Div = { Id: "div_oc_" };
DRB.DOM.OrderColumns.Table = { Id: "table_oc_" };
DRB.DOM.OrderColumns.Tr = { Id: "tr_oc_" };
DRB.DOM.OrderColumns.Dropdown = { Id: "cbx_oc_", Name: "Select Column" };
DRB.DOM.OrderColumns.TdColumn = { Id: "td_oclabel_", Name: "<b>Column</b>" };
DRB.DOM.OrderColumns.TdValue = { Id: "td_ocvalue_", Name: "<b>Value</b>" };
DRB.DOM.OrderColumns.DivValue = { Id: "div_oc_value_" };
DRB.DOM.OrderColumns.ControlValue = { Id: "oc_value_" };
DRB.DOM.OrderColumns.AddButton = { Id: "btn_addoc_", Name: "Add Column", Class: "btn-primary" };

// Set Columns table, tr, td
DRB.DOM.SetColumns = {};
DRB.DOM.SetColumns.MainDiv = { Id: "div_main_sc", Class: "mapping-container" };
DRB.DOM.SetColumns.MainSpan = { Id: "span_main_sc", Name: "" };
DRB.DOM.SetColumns.Div = { Id: "div_sc_" };
DRB.DOM.SetColumns.Table = { Id: "table_sc_" };
DRB.DOM.SetColumns.Tr = { Id: "tr_sc_" };
DRB.DOM.SetColumns.Dropdown = { Id: "cbx_sc_", Name: "Select Column" };
DRB.DOM.SetColumns.TdColumn = { Id: "td_sclabel_", Name: "<b>Column</b>" };
DRB.DOM.SetColumns.TdValue = { Id: "td_scvalue_", Name: "<b>Value</b>" };
DRB.DOM.SetColumns.DivValue = { Id: "div_sc_value_" };
DRB.DOM.SetColumns.ControlValue = { Id: "sc_value_" };
DRB.DOM.SetColumns.AddButton = { Id: "btn_addsc_", Name: "Add Column", Class: "btn-primary" };
// #endregion

// Arrows
DRB.DOM.ArrowUp = { Id: "btn_up_" };
DRB.DOM.ArrowBeforeUp = { Id: "btn_beforeup_" };
DRB.DOM.ArrowDown = { Id: "btn_down_" };
DRB.DOM.ArrowAfterDown = { Id: "btn_afterdown_" };

// Image Buttons
DRB.DOM.Image = {};
DRB.DOM.Image.LoadInput = { Id: "inp_loadimage_" };
DRB.DOM.Image.LoadButton = { Id: "btn_loadimage_", Name: "Load", Class: "btn-outline-secondary columnbutton" };
DRB.DOM.Image.ShowButton = { Id: "btn_showimage_", Name: "Show", Class: "btn-outline-secondary" };
DRB.DOM.Image.RemoveButton = { Id: "btn_removeimage_", Name: "Remove", Class: "btn-outline-secondary" };

// #region Association
// Parent Table
DRB.DOM.ParentTable = {};
DRB.DOM.ParentTable.Span = { Id: "span_parenttable", Name: "Parent Table" };
DRB.DOM.ParentTable.Dropdown = { Id: "cbx_parenttable", Name: "Select a Table" };

// Child Table
DRB.DOM.ChildTable = {};
DRB.DOM.ChildTable.Span = { Id: "span_childtable", Name: "Child Table" };
DRB.DOM.ChildTable.Dropdown = { Id: "cbx_childtable", Name: "Select a Table" };

// Parent Relationship
DRB.DOM.ParentRelationship = {};
DRB.DOM.ParentRelationship.Span = { Id: "span_parentrelationship", Name: "Relationship" };
DRB.DOM.ParentRelationship.Dropdown = { Id: "cbx_parentrelationship", Name: "Select a Relationship" };

// Child Id
DRB.DOM.ChildId = {};
DRB.DOM.ChildId.Div = { Id: "div_childid" };
DRB.DOM.ChildId.DivPrefix = { Id: "div_childid_" };
DRB.DOM.ChildId.SpanPrefix = { Id: "span_childid_", Name: "Child Id" };
DRB.DOM.ChildId.InputPrefix = { Id: "txt_childid_" };
DRB.DOM.ChildId.LookupPrefix = { Id: "lkp_childid_" };
DRB.DOM.ChildId.RemoveButtonPrefix = { Id: "btn_childidremove_", Name: "x", Class: "btn-outline-secondary closebutton" };
DRB.DOM.ChildId.AddButton = { Id: "btn_childidadd", Name: "Add Child Id", Class: "btn-outline-secondary" };
// #endregion

// #region NextLink
// NextLink
DRB.DOM.NextLink = {};
DRB.DOM.NextLink.Div = { Id: "div_nextlink" };
DRB.DOM.NextLink.Span = { Id: "span_nextlink", Name: "Next Link" };
DRB.DOM.NextLink.Input = { Id: "txt_nextlink" };

// NextLink Parsed
DRB.DOM.NextLink.Parsed = {};
DRB.DOM.NextLink.Parsed.Div = { Id: "div_parsed" };
DRB.DOM.NextLink.Parsed.MainSpan = { Id: "span_mainparsed", Name: "" };
DRB.DOM.NextLink.Parsed.Span = { Id: "span_parsed", Name: "Columns" };
DRB.DOM.NextLink.Parsed.Dropdown = { Id: "cbx_parsed", Name: "Columns" };
// #endregion

// #region Predefined Query
//  Query Type
DRB.DOM.QueryType = {};
DRB.DOM.QueryType.Span = { Id: "span_querytype", Name: "Query Type" };
DRB.DOM.QueryType.Dropdown = { Id: "cbx_querytype", Name: "Query Type" };

// System View Id
DRB.DOM.SystemViewId = {};
DRB.DOM.SystemViewId.Div = { Id: "div_systemviewid" };
DRB.DOM.SystemViewId.Span = { Id: "span_systemviewid", Name: "View Id" };
DRB.DOM.SystemViewId.Input = { Id: "txt_systemviewid" };
DRB.DOM.SystemViewId.Lookup = { Id: "lkp_systemviewid" };

// Personal View Id
DRB.DOM.PersonalViewId = {};
DRB.DOM.PersonalViewId.Div = { Id: "div_personalviewid" };
DRB.DOM.PersonalViewId.Span = { Id: "span_personalviewid", Name: "View Id" };
DRB.DOM.PersonalViewId.SpanDropdown = { Id: "span_personalview", Name: "Personal View" };
DRB.DOM.PersonalViewId.Dropdown = { Id: "cbx_personalview", Name: "Select Personal View" };
DRB.DOM.PersonalViewId.Input = { Id: "txt_personalviewid" };

// FetchXML
DRB.DOM.FetchXML = {};
DRB.DOM.FetchXML.Div = { Id: "div_fetchxml" };
DRB.DOM.FetchXML.Span = { Id: "span_fetchxml", Name: "Fetch XML" };
DRB.DOM.FetchXML.Editor = { Id: "editor_fetchxml" };
// #endregion

// #region Dataverse Execute
// Dataverse Custom API
DRB.DOM.DataverseCustomAPI = {};
DRB.DOM.DataverseCustomAPI.Span = { Name: "Custom API" };
DRB.DOM.DataverseCustomAPI.Dropdown = { Name: "Select a Custom API" };

// Dataverse Custom Action
DRB.DOM.DataverseCustomAction = {};
DRB.DOM.DataverseCustomAction.Span = { Name: "Custom Action" };
DRB.DOM.DataverseCustomAction.Dropdown = { Name: "Select a Custom Action" };

// Dataverse Action
DRB.DOM.DataverseAction = {};
DRB.DOM.DataverseAction.Span = { Name: "Action" };
DRB.DOM.DataverseAction.Dropdown = { Name: "Select an Action" };

// Dataverse Function
DRB.DOM.DataverseFunction = {};
DRB.DOM.DataverseFunction.Span = { Name: "Function" };
DRB.DOM.DataverseFunction.Dropdown = { Name: "Select a Function" };

// Dataverse Execute
DRB.DOM.DataverseExecute = {};
DRB.DOM.DataverseExecute.Span = { Id: "span_dvexecute", Name: "" };
DRB.DOM.DataverseExecute.Dropdown = { Id: "cbx_dvexecute", Name: "" };

// Dataverse Parameters
DRB.DOM.DataverseParameters = {};
DRB.DOM.DataverseParameters.Div = { Id: "div_dvparameters", Class: "mapping-container" };

// Dataverse Properties Table, Tr, Td
DRB.DOM.DataverseParameters.Table = { Id: "table_dvproperties" };
DRB.DOM.DataverseParameters.Tr = { Id: "tr_dvp_" };
DRB.DOM.DataverseParameters.TdOptional = { Id: "td_dvp_optional_", Name: "<b>Optional</b>" };
DRB.DOM.DataverseParameters.TdInclude = { Id: "td_dvp_include_", Name: "<b>Include</b>" };
DRB.DOM.DataverseParameters.CheckboxInclude = { Id: "chk_dvp_include_" };

DRB.DOM.DataverseParameters.TdName = { Id: "td_dvp_name_", Name: "<b>Parameter</b>" };
DRB.DOM.DataverseParameters.TdType = { Id: "td_dvp_type_", Name: "<b>Type</b>" };
DRB.DOM.DataverseParameters.TdValue = { Id: "td_dvp_value_", Name: "<b>Value</b>" };
DRB.DOM.DataverseParameters.SpanName = { Id: "td_dvp_name_" };
DRB.DOM.DataverseParameters.DivValue = { Id: "div_dvp_value_" };
DRB.DOM.DataverseParameters.ControlValue = { Id: "dvp_value_" };
DRB.DOM.DataverseParameters.DivCollectionValue = { Id: "div_dvp_collectionvalue_" };
DRB.DOM.DataverseParameters.DivCollectionControlValue = { Id: "div_dvp_collectioncontrolvalue_", Class: "collectioncontroldiv" };
DRB.DOM.DataverseParameters.AddButton = { Id: "btn_dvp_add_", Name: "Add", Class: "btn-primary columnbutton" };

// Dataverse ReturnType
DRB.DOM.DataverseReturnType = {};
DRB.DOM.DataverseReturnType.Span = { Id: "span_dvreturntype" };

// Dataverse ReturnType Table, Tr, Td
DRB.DOM.DataverseReturnType.Table = { Id: "table_dvreturntype" };
DRB.DOM.DataverseReturnType.Tr = { Id: "tr_dvrt_" };
DRB.DOM.DataverseReturnType.TdName = { Id: "td_dvrt_name_", Name: "<b>Name</b>" };
DRB.DOM.DataverseReturnType.TdType = { Id: "td_dvrt_type_", Name: "<b>Type</b>" };
// #endregion

// #region Execute Workflow
// Workflow Id
DRB.DOM.WorkflowId = {};
DRB.DOM.WorkflowId.Span = { Id: "span_workflowid", Name: "Workflow Id" };
DRB.DOM.WorkflowId.Input = { Id: "txt_workflowid" };
DRB.DOM.WorkflowId.Lookup = { Id: "lkp_workflowid" };
// #endregion
// #endregion