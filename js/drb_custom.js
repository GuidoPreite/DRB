// #region DRB.Namespaces
var DRB = {}; // Application Namespace
DRB.DOM = {}; // DOM
DRB.Common = {}; // Common Functions
DRB.Metadata = {}; // Store temporarily the retrieved Metadata
DRB.Models = {}; // Models used by the Application
DRB.Settings = {}; // Settings used by the Application
DRB.UI = {}; // Functions to manage UI elements
DRB.Utilities = {}; // Utilities Functions
DRB.Xrm = {}; // Xrm Functions
DRB.Collection = {}; // Collection Functions
DRB.CustomUI = {}; // Custom UI Functions
DRB.GenerateCode = {}; // Generate Code Functions
DRB.GeneratePostman = {}; // Generate Postman Functions

DRB.Logic = {}; // Functions defined for each operation
DRB.Logic.RetrieveSingle = {}; // Retrieve Single Functions
DRB.Logic.RetrieveMultiple = {}; // Retrieve Multiple Functions
DRB.Logic.Create = {}; // Create Functions
DRB.Logic.Update = {}; // Update Functions
DRB.Logic.Delete = {}; // Delete Functions
DRB.Logic.Association = {}; // Associate, Disassociate Functions
DRB.Logic.RetrieveNextLink = {}; // Retrieve NextLink Functions
DRB.Logic.PredefinedQuery = {}; // Predefined Query Functions
DRB.Logic.DataverseExecute = {}; // Dataverse Action, Dataverse Function Functions
DRB.Logic.ExecuteWorkflow = {}; // Execute Workflow Functions
DRB.Logic.ManageFileImageData = {}; // Manage File Image Data Functions
// #endregion  
 
// #region DRB.DOM
// Main Content
DRB.DOM.MainBody = { Id: "main_body" }; // defined also inside index.htm
DRB.DOM.MainContent = { Id: "main_content" };
DRB.DOM.VersionSpan = { Id: "span_drbversion" };
DRB.DOM.ContextSpan = { Id: "span_context" };

// Notice
DRB.DOM.Notice = {};
DRB.DOM.Notice.Div = { Id: "div_notice" };
DRB.DOM.Notice.Button = { Id: "btn_notice" };

// Split
DRB.DOM.Split = {};
DRB.DOM.Split.Menu = { Id: "div_menu" };
DRB.DOM.Split.Content = { Id: "div_content" };

// jsTree
DRB.DOM.TreeView = { Id: "div_collection" };

// Configure Content
DRB.DOM.ConfigureContent = { Id: "configure_settings" };

// Tabs
DRB.DOM.TabsRequest = { Id: "tabs_request" };
DRB.DOM.TabsContent = { Id: "tabs_content" };
DRB.DOM.TabsWarning = { Id: "tabs_warning_" };

// Collection
DRB.DOM.Collection = {};
DRB.DOM.Collection.Menu = { Id: "mnu_file" };
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

// File Column
DRB.DOM.FileColumn = {};
DRB.DOM.FileColumn.Div = { Id: "div_filecolumn", Class: "sameline" };
DRB.DOM.FileColumn.Span = { Id: "span_filecolumn", Name: "File Column" };
DRB.DOM.FileColumn.Dropdown = { Id: "cbx_filecolumn", Name: "Select File Column" };

// Image Column
DRB.DOM.ImageColumn = {};
DRB.DOM.ImageColumn.Span = { Name: "Image Column" };
DRB.DOM.ImageColumn.Dropdown = { Name: "Select Image Column" };

// File Operation
DRB.DOM.FileOperation = {};
DRB.DOM.FileOperation.Span = { Id: "span_fileoperation", Name: "Operation" };
DRB.DOM.FileOperation.Dropdown = { Id: "cbx_fileoperation", Name: "Select Operation" };

// File Name
DRB.DOM.FileName = {};
DRB.DOM.FileName.Div = { Id: "div_filename" };
DRB.DOM.FileName.Span = { Id: "span_filename", Name: "File Name" };
DRB.DOM.FileName.Input = { Id: "txt_filename" };

// File Full Size
DRB.DOM.FileFullSize = {};
DRB.DOM.FileFullSize.Div = { Id: "div_filefullsize", Class: "sameline" };
DRB.DOM.FileFullSize.Span = { Id: "span_filefullsize", Name: "&nbsp;Full Size" };
DRB.DOM.FileFullSize.CheckBox = { Id: "chk_filefullsize" };

// Image Buttons
DRB.DOM.FileContent = {};
DRB.DOM.FileContent.Div = { Id: "div_filecontent" };
DRB.DOM.FileContent.LoadInput = { Id: "inp_loadfile_" };
DRB.DOM.FileContent.LoadButton = { Id: "btn_loadfile_", Name: "Load", Class: "btn-outline-secondary" };
DRB.DOM.FileContent.ShowButton = { Id: "btn_showfile_", Name: "Show", Class: "btn-outline-secondary" };
DRB.DOM.FileContent.DownloadButton = { Id: "btn_downloadfile_", Name: "Download", Class: "btn-outline-secondary" };
DRB.DOM.FileContent.RemoveButton = { Id: "btn_removefile_", Name: "Remove", Class: "btn-outline-secondary" };


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
DRB.DOM.ImpersonateId.TypeSpan = { Id: "span_impersonatetype", Name: "Type" };
DRB.DOM.ImpersonateId.Dropdown = { Id: "cbx_impersonatetype", Name: "Type" };
DRB.DOM.ImpersonateId.Span = { Id: "span_impersonateid", Name: "Id" };
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
DRB.DOM.FetchXML.Editor = { Id: "editor_fetchxml", Class: "code_editor" };
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
DRB.DOM.WorkflowId = {};
DRB.DOM.WorkflowId.Span = { Id: "span_workflowid", Name: "Workflow Id" };
DRB.DOM.WorkflowId.Input = { Id: "txt_workflowid" };
DRB.DOM.WorkflowId.Lookup = { Id: "lkp_workflowid" };
// #endregion

// #region Power Automate
DRB.DOM.PowerAutomate = {};

DRB.DOM.PowerAutomate.Table = { Id: "table_powerautomate" };
DRB.DOM.PowerAutomate.Tr = { Id: "tr_pa_" };
DRB.DOM.PowerAutomate.TdLabel = { Id: "td_pa_label_" };
DRB.DOM.PowerAutomate.TdValue = { Id: "td_pa_value_" };
DRB.DOM.PowerAutomate.TdCopy = { Id: "td_pa_copy_" };

DRB.DOM.PowerAutomate.ButtonCopy = { Id: "btn_pa_copy_", Name: "Copy", Class: "btn-secondary" };

DRB.DOM.PowerAutomate.SpanTitleRetrieveSingle = { Id: "span_title", Name: "Get a row by ID", Class: "font-weight-bold" };
DRB.DOM.PowerAutomate.SpanTitleRetrieveMultiple = { Id: "span_title", Name: "List rows", Class: "font-weight-bold" };

DRB.DOM.PowerAutomate.TableNameSpan = { Id: "span_tablename", Name: "Table name" };
DRB.DOM.PowerAutomate.TableNameInput = { Id: "txt_tablename" };
DRB.DOM.PowerAutomate.RowIDSpan = { Id: "span_rowid", Name: "Row ID" };
DRB.DOM.PowerAutomate.RowIDInput = { Id: "txt_rowid" };
DRB.DOM.PowerAutomate.SelectColumnsSpan = { Id: "span_selectcolumns", Name: "Select columns" };
DRB.DOM.PowerAutomate.SelectColumnsInput = { Id: "txt_selectcolumns" };
DRB.DOM.PowerAutomate.ExpandQuerySpan = { Id: "span_expandquery", Name: "Expand Query" };
DRB.DOM.PowerAutomate.ExpandQueryInput = { Id: "txt_expandquery" };
DRB.DOM.PowerAutomate.FilterRowsSpan = { Id: "span_filterrows", Name: "Filter rows" };
DRB.DOM.PowerAutomate.FilterRowsInput = { Id: "txt_filterrows" };
DRB.DOM.PowerAutomate.SortBySpan = { Id: "span_sortby", Name: "Sort By" };
DRB.DOM.PowerAutomate.SortByInput = { Id: "txt_sortby" };
DRB.DOM.PowerAutomate.RowCountSpan = { Id: "span_rowcount", Name: "Row count" };
DRB.DOM.PowerAutomate.RowCountInput = { Id: "txt_rowcount" };
// #endregion

// #region Lookup
DRB.DOM.Lookup = {};
DRB.DOM.Lookup.Div = { Id: "div_lookup" };
DRB.DOM.Lookup.TableSpan = { Id: "span_tablelookup", Name: "Table" };
DRB.DOM.Lookup.TableDropdown = { Id: "cbx_tablelookup" };
DRB.DOM.Lookup.InputSpan = { Id: "span_inputlookup", Name: "Primary Column" };
DRB.DOM.Lookup.Input = { Id: "cbx_inputlookup" };
DRB.DOM.Lookup.SearchButton = { Id: "btn_searchlookup", Name: "Search", Class: "btn-secondary" };
DRB.DOM.Lookup.Table = { Id: "table_lookup" };
DRB.DOM.Lookup.Tr = { Id: "tr_lookup_" };
DRB.DOM.Lookup.TdLabel = { Id: "td_lookup_label_" };
DRB.DOM.Lookup.TdValue = { Id: "td_lookup_value_" };

DRB.DOM.Lookup.HeaderIDSpan = { Id: "span_lookup_header_id", Name: "<b>ID</b>" };
DRB.DOM.Lookup.HeaderPrimaryColumnSpan = { Id: "span_lookup_header_primarycolumn", Name: "<b>Primary Column</b>" };
DRB.DOM.Lookup.SelectButton = { Id: "btn_selectlookup_", Name: "Select", Class: "btn-outline-secondary" };
DRB.DOM.Lookup.NoRecordsSpan = { Id: "span_norecordslookup", Name: "No Records" };
// #endregion
// #endregion  
 
﻿// #region DRB.Utilities
/**
 * Utilities - Has Value
 * Returns true if a parameter is not undefined, not null and not an empty string, otherwise returns false
 * @param {any} parameter Parameter to check
 */
DRB.Utilities.HasValue = function (parameter) {
    if (parameter !== undefined && parameter !== null && parameter !== "") { return true; } else { return false; }
}

/**
 * Utilities - Local Storage Available
 * Check if localStorage is available
 */
DRB.Utilities.LocalStorageAvailable = function () {
    try {
        localStorage.setItem("DRB_CheckLocalStorage", "DRB");
        localStorage.removeItem("DRB_CheckLocalStorage");
        return true;
    } catch (e) { return false; }
}

/**
 * Utilities - Generate Guid
 * Returns a Random Guid with options to add Braces or Upper Case
 * @param {boolean} braces if the Guid contains braces
 * @param {boolean} upperCase if the Guid is returned as Upper Case
 */
DRB.Utilities.GenerateGuid = function (braces, upperCase) {
    var randomGuid = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/x/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    if (braces === true) { randomGuid = "{" + randomGuid + "}"; }
    if (upperCase === true) { randomGuid = randomGuid.toUpperCase(); }
    return randomGuid;
}

/**
 * Utilities - Remove Duplicates From Array
 * Returns a new Array without duplicates
 * @param {any[]} array Array to check
 */
DRB.Utilities.RemoveDuplicatesFromArray = function (array) {
    var values = array.filter(function (item, pos) { return array.indexOf(item) === pos; });
    return values;
}

/**
 * Utilities - Get Record By Property
 * Returns a Record matching the property and the value passed
 * @param {any[]} records Records
 * @param {string} propertyName Property Name
 * @param {any} propertyValue Property Value
 */
DRB.Utilities.GetRecordByProperty = function (records, propertyName, propertyValue) {
    if (Array.isArray(records)) {
        for (var count = 0; count < records.length; count++) {
            if (records[count].hasOwnProperty(propertyName) && records[count][propertyName] == propertyValue) { return records[count]; }
        }
    }
    return null;
}

/**
 * Utilities - Get Record By Id
 * Returns a record matching the id
 * @param {any[]} records Records
 * @param {any} id Id
 */
DRB.Utilities.GetRecordById = function (records, id) {
    return DRB.Utilities.GetRecordByProperty(records, "Id", id);
}

/**
 * Utilities - Custom Sort
 * sort an array on a specific property, minus sign (-) in front of the property defines a reverse sort
 * @param {string} property Property Name
 */
DRB.Utilities.CustomSort = function (property) {
    var sortOrder = 1;
    if (property[0] === "-") { sortOrder = -1; property = property.substr(1); }

    return function (a, b) {
        var result = (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0;
        return result * sortOrder;
    }
}
// #endregion  
 
﻿// #region DRB.Xrm.GetDemoData
/**
 * Get Demo Data based on parameters
 * @param {any[]} queries Queries
 */
DRB.Xrm.GetDemoDataBatch = function (queries) {
    var fakeHeaderStart = ['--batchresponse_00000000-0000-0000-0000-000000000000', 'Content-Type: application/http', 'Content-Transfer-Encoding: binary', '', 'HTTP/1.1 200 OK', 'Content-Type: application/json; odata.metadata=minimal', 'OData-Version: 4.0', 'Preference-Applied: odata.include-annotations="*"', ''].join("\r\n");
    var fakeHeaderEnd = '--batchresponse_00000000-0000-0000-0000-000000000000--';
    var emptyLine = ['', ''].join("\r\n");

    var entity_Contact = { SchemaName: "Contact", LogicalName: "contact", EntitySetName: "contacts", PrimaryIdAttribute: "contactid", PrimaryNameAttribute: "fullname" };
    var entity_Team = { SchemaName: "Team", LogicalName: "team", EntitySetName: "teams", PrimaryIdAttribute: "teamid", PrimaryNameAttribute: "name" };
    var entity_User = { SchemaName: "SystemUser", LogicalName: "systemuser", EntitySetName: "systemusers", PrimaryIdAttribute: "systemuserid", PrimaryNameAttribute: "fullname", DisplayName: { UserLocalizedLabel: { Label: "User" } } };
    var entity_CustomTable = { SchemaName: "sample_CustomTable", LogicalName: "sample_customtable", EntitySetName: "sample_customtables", PrimaryIdAttribute: "sample_customtableid", PrimaryNameAttribute: "sample_name", DisplayName: { UserLocalizedLabel: { Label: "Custom Table" } } };
    var entity_CustomTable2 = { SchemaName: "new_CustomTable", LogicalName: "new_customtable", EntitySetName: "new_customtables", PrimaryIdAttribute: "new_customtableid", PrimaryNameAttribute: "new_name", DisplayName: { UserLocalizedLabel: { Label: "Custom Table (New)" } } };

    var entity_Account = { SchemaName: "Account", LogicalName: "account", EntitySetName: "accounts", PrimaryIdAttribute: "accountid", PrimaryNameAttribute: "name" };

    var columns_Contact = [];
    columns_Contact.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "FirstName", LogicalName: "firstname", AttributeType: "String", IsPrimaryId: false, IsPrimaryName: false, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 100, DisplayName: { UserLocalizedLabel: { Label: "First Name" } } });
    columns_Contact.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "FullName", LogicalName: "fullname", AttributeType: "String", IsPrimaryId: false, IsPrimaryName: true, IsValidForRead: true, IsValidForCreate: false, IsValidForUpdate: false, DisplayName: { UserLocalizedLabel: { Label: "Full Name" } } });
    columns_Contact.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "LastName", LogicalName: "lastname", AttributeType: "String", IsPrimaryId: false, IsPrimaryName: false, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 100, DisplayName: { UserLocalizedLabel: { Label: "Last Name" } } });
    columns_Contact.push({ SchemaName: "ContactId", LogicalName: "contactid", AttributeType: "Uniqueidentifier", IsPrimaryId: true, IsPrimaryName: false, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: false, DisplayName: { UserLocalizedLabel: { Label: "Contact" } } });

    var columns_Team = [];
    columns_Team.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "Name", LogicalName: "name", AttributeType: "String", IsPrimaryId: false, IsPrimaryName: true, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Name" } } });
    columns_Team.push({ SchemaName: "TeamId", LogicalName: "teamid", AttributeType: "Uniqueidentifier", IsPrimaryId: true, IsPrimaryName: false, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: false, DisplayName: { UserLocalizedLabel: { Label: "Team" } } });

    var columns_Account = [];
    columns_Account.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "Name", LogicalName: "name", AttributeType: "String", IsPrimaryId: false, IsPrimaryName: true, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 100, DisplayName: { UserLocalizedLabel: { Label: "Name" } } });
    columns_Account.push({ SchemaName: "AccountId", LogicalName: "accountid", AttributeType: "Uniqueidentifier", IsPrimaryId: true, IsPrimaryName: false, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: false, DisplayName: { UserLocalizedLabel: { Label: "Account" } } });

    //columns_Account = [{ "LogicalName": "preferredcontactmethodcodename", "SchemaName": "PreferredContactMethodCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "preferredcontactmethodcode", "MetadataId": "8663b910-af86-4dea-826e-8222706372f4", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "emailaddress3", "SchemaName": "EMailAddress3", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "97fb4aae-ea5d-427f-9b2b-9a6b9754286e", "DisplayName": { "LocalizedLabels": [{ "Label": "Email Address 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1ee8af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Email Address 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1ee8af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "emailaddress2", "SchemaName": "EMailAddress2", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "98b09426-95ab-4f21-87a0-f6775f2b4210", "DisplayName": { "LocalizedLabels": [{ "Label": "Email Address 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d999ba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Email Address 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d999ba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "emailaddress1", "SchemaName": "EMailAddress1", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "b254ab69-de5a-4edb-8059-bdeb6863c544", "DisplayName": { "LocalizedLabels": [{ "Label": "Email", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d452c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Email", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d452c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "masteraccountidyominame", "SchemaName": "MasterAccountIdYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "masterid", "MetadataId": "a15dedfc-9382-43ac-8d10-7773aa3eefeb", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_city", "SchemaName": "Address1_City", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "ca8d0a94-8569-4154-b511-718e11635449", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: City", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "02d7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: City", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "02d7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "slaid", "SchemaName": "SLAId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "6bdcd7f1-5865-4fef-91b0-676824b18641", "DisplayName": { "LocalizedLabels": [{ "Label": "SLA", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "826c8195-c750-4e24-971e-6215c86b34d6", "HasChanged": null }], "UserLocalizedLabel": { "Label": "SLA", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "826c8195-c750-4e24-971e-6215c86b34d6", "HasChanged": null } } }, { "LogicalName": "address2_freighttermscodename", "SchemaName": "Address2_FreightTermsCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "address2_freighttermscode", "MetadataId": "0e5266fe-a4c0-4dfa-abcc-698ad97d6fb1", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata", "LogicalName": "modifiedon", "SchemaName": "ModifiedOn", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "DateTime", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "47f8395d-1604-414d-b03d-7fde25b5911b", "DisplayName": { "LocalizedLabels": [{ "Label": "Modified On", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f5e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Modified On", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f5e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "aging90", "SchemaName": "Aging90", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "66c49a64-dd29-47fd-998c-7abd5ff3c317", "DisplayName": { "LocalizedLabels": [{ "Label": "Aging 90", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "5f1c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Aging 90", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "5f1c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata", "LogicalName": "overriddencreatedon", "SchemaName": "OverriddenCreatedOn", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "DateTime", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "23a69301-1d4e-41bc-adbc-d4c129bb13cf", "DisplayName": { "LocalizedLabels": [{ "Label": "Record Created On", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6f36cd93-ec7b-4e4a-8814-6a22ca8d749a", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Record Created On", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6f36cd93-ec7b-4e4a-8814-6a22ca8d749a", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "websiteurl", "SchemaName": "WebSiteURL", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "536a48f0-657b-4029-95cd-9472059fc44a", "DisplayName": { "LocalizedLabels": [{ "Label": "Website", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "544901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Website", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "544901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DoubleAttributeMetadata", "LogicalName": "address1_longitude", "SchemaName": "Address1_Longitude", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Double", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "789b772d-99aa-4d96-b463-a75024d33935", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Longitude", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e199f6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Longitude", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e199f6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "donotpostalmail", "SchemaName": "DoNotPostalMail", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "5a476574-a083-4dc5-ba40-b909fe4890f8", "DisplayName": { "LocalizedLabels": [{ "Label": "Do not allow Mails", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d326e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Do not allow Mails", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d326e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "createdbyexternalpartyname", "SchemaName": "CreatedByExternalPartyName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "createdbyexternalparty", "MetadataId": "a9ced733-f64e-44a4-8924-c73a79d46a75", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "address1_addresstypecode", "SchemaName": "Address1_AddressTypeCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "4e51f924-e47d-4f69-811a-cd387c9750d4", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Address Type", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "bb41b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Address Type", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "bb41b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "transactioncurrencyid", "SchemaName": "TransactionCurrencyId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "6d36e3a6-3e08-4fbc-aaa7-247eba2ab9f5", "DisplayName": { "LocalizedLabels": [{ "Label": "Currency", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b2d8473e-6978-4b44-b667-3c1f5668aac6", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Currency", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b2d8473e-6978-4b44-b667-3c1f5668aac6", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "sharesoutstanding", "SchemaName": "SharesOutstanding", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "c4a20223-61b2-4694-996e-7c02f02efc9e", "DisplayName": { "LocalizedLabels": [{ "Label": "Shares Outstanding", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ef98ba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Shares Outstanding", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ef98ba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "donotsendmm", "SchemaName": "DoNotSendMM", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "e282748e-3c74-4cdd-8f21-93fe92faee94", "DisplayName": { "LocalizedLabels": [{ "Label": "Send Marketing Materials", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4052c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Send Marketing Materials", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4052c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "createdbyexternalparty", "SchemaName": "CreatedByExternalParty", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "827e9002-b547-49fc-9e8d-a6b1cfcef33b", "DisplayName": { "LocalizedLabels": [{ "Label": "Created By (External Party)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c72d726a-8f5d-412c-9618-7cc99d8308c8", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Created By (External Party)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c72d726a-8f5d-412c-9618-7cc99d8308c8", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "creditonhold", "SchemaName": "CreditOnHold", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "cc7229b4-bb8b-49a3-a7f8-77e7d89201d7", "DisplayName": { "LocalizedLabels": [{ "Label": "Credit Hold", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ab40b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Credit Hold", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ab40b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "transactioncurrencyidname", "SchemaName": "TransactionCurrencyIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "transactioncurrencyid", "MetadataId": "3fbc7028-f637-4074-87f5-97cc29ee11d2", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "aging30", "SchemaName": "Aging30", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "2b4ffdf4-1bf8-4d3d-a075-d123b4ed65ba", "DisplayName": { "LocalizedLabels": [{ "Label": "Aging 30", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "569aba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Aging 30", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "569aba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "donotbulkpostalmail", "SchemaName": "DoNotBulkPostalMail", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "824be9eb-f68e-4db9-9db2-479c1ba4b48b", "DisplayName": { "LocalizedLabels": [{ "Label": "Do not allow Bulk Mails", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "7c64cfee-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Do not allow Bulk Mails", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "7c64cfee-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "yominame", "SchemaName": "YomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "26016ae7-16b4-4cbe-bc34-84ae19e7d6b2", "DisplayName": { "LocalizedLabels": [{ "Label": "Yomi Account Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "5095733d-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Yomi Account Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "5095733d-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "preferredsystemuseridyominame", "SchemaName": "PreferredSystemUserIdYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "preferredsystemuserid", "MetadataId": "fa1b1667-91a5-45a6-9852-305e46ba280a", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "address1_shippingmethodcode", "SchemaName": "Address1_ShippingMethodCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "064a6cf1-ec3d-4e57-bfb7-011e168cf35f", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Shipping Method", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "af26e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Shipping Method", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "af26e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "paymenttermscode", "SchemaName": "PaymentTermsCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "94afe94b-4ca6-4d62-9585-ab4670012dfb", "DisplayName": { "LocalizedLabels": [{ "Label": "Payment Terms", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "35d7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Payment Terms", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "35d7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "slainvokedid", "SchemaName": "SLAInvokedId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "9888d31b-1944-4a65-8856-76234861beb0", "DisplayName": { "LocalizedLabels": [{ "Label": "Last SLA applied", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e9c7c65d-98c8-4484-a6a7-f81d279ed578", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Last SLA applied", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e9c7c65d-98c8-4484-a6a7-f81d279ed578", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata", "LogicalName": "opendeals_date", "SchemaName": "OpenDeals_Date", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "DateTime", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "c29a00fc-911a-4389-82b5-aba921d633b5", "DisplayName": { "LocalizedLabels": [{ "Label": "Open Deals (Last Updated On)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0a8d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Open Deals (Last Updated On)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0a8d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "modifiedbyexternalpartyyominame", "SchemaName": "ModifiedByExternalPartyYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "modifiedbyexternalparty", "MetadataId": "9e1d3899-ce30-4a4b-b43c-be1557591c23", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "businesstypecodename", "SchemaName": "BusinessTypeCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "businesstypecode", "MetadataId": "3d56b072-cd70-496c-aba7-d2427fd0d19a", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "originatingleadid", "SchemaName": "OriginatingLeadId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "7bf7ed76-77bb-4b70-8086-312df7727588", "DisplayName": { "LocalizedLabels": [{ "Label": "Originating Lead", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2475ec74-f66b-48e3-85ee-f6e90672b8de", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Originating Lead", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2475ec74-f66b-48e3-85ee-f6e90672b8de", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "masteraccountidname", "SchemaName": "MasterAccountIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "masterid", "MetadataId": "192b1df4-81a8-45e2-a061-fe10cda6c62e", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "preferredsystemuseridname", "SchemaName": "PreferredSystemUserIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "preferredsystemuserid", "MetadataId": "c39956b9-f294-466a-8c41-aca97375aad6", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "accountcategorycode", "SchemaName": "AccountCategoryCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "118771ca-6fb9-4f60-8fd4-99b6124b63ad", "DisplayName": { "LocalizedLabels": [{ "Label": "Category", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "08d8a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Category", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "08d8a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "openrevenue", "SchemaName": "OpenRevenue", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "306845ef-446a-42e5-8df8-11c31bafaded", "DisplayName": { "LocalizedLabels": [{ "Label": "Open Revenue", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f68ff3da-33f2-45b4-813b-b13cb563b02b", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Open Revenue", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f68ff3da-33f2-45b4-813b-b13cb563b02b", "HasChanged": null } } }, { "LogicalName": "preferredappointmentdaycodename", "SchemaName": "PreferredAppointmentDayCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "preferredappointmentdaycode", "MetadataId": "2401dd40-d2df-4726-bb6c-cb0338557bc5", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_stateorprovince", "SchemaName": "Address2_StateOrProvince", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "38d65451-2d18-4927-9773-5a7023dccd3d", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: State\/Province", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "90aac7f4-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: State\/Province", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "90aac7f4-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "participatesinworkflowname", "SchemaName": "ParticipatesInWorkflowName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "participatesinworkflow", "MetadataId": "916834ae-6e57-4f14-b02a-b2a57b4f6bf0", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "territoryid", "SchemaName": "TerritoryId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "952b5e27-4020-48da-bcf1-f174c67803e8", "DisplayName": { "LocalizedLabels": [{ "Label": "Territory", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6fb5af72-f4ea-4c0b-b800-9ffd1ec1dbb7", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Territory", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6fb5af72-f4ea-4c0b-b800-9ffd1ec1dbb7", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_country", "SchemaName": "Address2_Country", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "95176315-078e-4722-a378-272c9322dc3c", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Country\/Region", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2fd8a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Country\/Region", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2fd8a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "accountcategorycodename", "SchemaName": "AccountCategoryCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "accountcategorycode", "MetadataId": "c3239726-00d7-4000-9135-f06ea24a423f", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_line2", "SchemaName": "Address2_Line2", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "064c0b65-d6c5-4a89-bfc1-24d01001a051", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Street 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "84d8a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Street 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "84d8a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "aging60_base", "SchemaName": "Aging60_Base", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "3ccb47fd-354b-4085-a50f-173e4cb0d41b", "DisplayName": { "LocalizedLabels": [{ "Label": "Aging 60 (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d1364f36-6283-4e63-880e-1e787ab2a649", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Aging 60 (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d1364f36-6283-4e63-880e-1e787ab2a649", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "preferredserviceid", "SchemaName": "PreferredServiceId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "ba916f06-fc34-4127-9dc6-9b9ec92adf5f", "DisplayName": { "LocalizedLabels": [{ "Label": "Preferred Service", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "26920c0f-38c5-46e3-8b59-e826a597473f", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Preferred Service", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "26920c0f-38c5-46e3-8b59-e826a597473f", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_line3", "SchemaName": "Address1_Line3", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "bb0f0f6e-c4a4-4124-a7c3-b579ac0dfae0", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Street 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "3741b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Street 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "3741b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "onholdtime", "SchemaName": "OnHoldTime", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "fc486055-74dd-4b6c-8005-8aec67ffe0df", "DisplayName": { "LocalizedLabels": [{ "Label": "On Hold Time (Minutes)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "3e94b927-619d-4b64-853a-c4ec80b64bbb", "HasChanged": null }], "UserLocalizedLabel": { "Label": "On Hold Time (Minutes)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "3e94b927-619d-4b64-853a-c4ec80b64bbb", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "address1_freighttermscode", "SchemaName": "Address1_FreightTermsCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "e7c8f2bf-c314-4d3d-bb8e-83726acf99e8", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Freight Terms", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "67d6a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Freight Terms", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "67d6a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "creditlimit", "SchemaName": "CreditLimit", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "a961ec67-dbad-4932-9b4a-62931d394485", "DisplayName": { "LocalizedLabels": [{ "Label": "Credit Limit", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b0cde1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Credit Limit", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b0cde1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "originatingleadidname", "SchemaName": "OriginatingLeadIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "originatingleadid", "MetadataId": "6ef4dd95-df51-4b0e-b52b-0ee699025d3e", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "parentaccountidname", "SchemaName": "ParentAccountIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "parentaccountid", "MetadataId": "a3e8b064-8cc2-470e-97f7-1322ba69b23d", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "accountratingcode", "SchemaName": "AccountRatingCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "28ef681e-b91f-4988-9647-10eea2f33bd0", "DisplayName": { "LocalizedLabels": [{ "Label": "Account Rating", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "444901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Account Rating", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "444901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "address1_utcoffset", "SchemaName": "Address1_UTCOffset", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "168ea93d-ad1b-453c-9f57-646a947c9ccd", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: UTC Offset", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0c40b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: UTC Offset", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0c40b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "preferredappointmenttimecode", "SchemaName": "PreferredAppointmentTimeCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "80ed630f-d6f9-4fa4-96b1-e1b17522015d", "DisplayName": { "LocalizedLabels": [{ "Label": "Preferred Time", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "a5abc7f4-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Preferred Time", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "a5abc7f4-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "donotsendmarketingmaterialname", "SchemaName": "DoNotSendMarketingMaterialName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "donotsendmm", "MetadataId": "6b8aaf94-a450-4319-abf7-296a8791c0bf", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "numberofemployees", "SchemaName": "NumberOfEmployees", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "b2820e7c-a271-4298-8c65-7c9593240ea2", "DisplayName": { "LocalizedLabels": [{ "Label": "Number of Employees", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "181ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Number of Employees", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "181ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "modifiedbyexternalpartyname", "SchemaName": "ModifiedByExternalPartyName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "modifiedbyexternalparty", "MetadataId": "30c84691-43fb-4e9b-a8a9-5ed8fe8e86f5", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "statecodename", "SchemaName": "StateCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "statecode", "MetadataId": "d5ef8b43-fc5e-48dd-8bff-708a30c1576a", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "accountclassificationcode", "SchemaName": "AccountClassificationCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "1344497c-e863-48d4-ab7c-2c068aacd5c6", "DisplayName": { "LocalizedLabels": [{ "Label": "Classification", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0f92aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Classification", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0f92aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "revenue", "SchemaName": "Revenue", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "9485cdfc-ad92-4758-b61d-f3705c82a85e", "DisplayName": { "LocalizedLabels": [{ "Label": "Annual Revenue", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ded7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Annual Revenue", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ded7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "customertypecode", "SchemaName": "CustomerTypeCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "4e33af09-ba43-4365-a747-c7e4f9992172", "DisplayName": { "LocalizedLabels": [{ "Label": "Relationship Type", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6954c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Relationship Type", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6954c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "donotbulkpostalmailname", "SchemaName": "DoNotBulkPostalMailName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "donotbulkpostalmail", "MetadataId": "e2e4b3c3-6016-459f-9d1f-b42ee454f0a9", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DecimalAttributeMetadata", "LogicalName": "exchangerate", "SchemaName": "ExchangeRate", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Decimal", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "5c346e62-9f48-4250-a58c-53a22200657f", "DisplayName": { "LocalizedLabels": [{ "Label": "Exchange Rate", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fc17d4a2-5617-4dc3-9bae-73aa237e799d", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Exchange Rate", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fc17d4a2-5617-4dc3-9bae-73aa237e799d", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_county", "SchemaName": "Address2_County", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "9ffd362a-3bc1-4f40-ac9a-a14bb2e70504", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: County", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6691aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: County", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6691aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "isprivate", "SchemaName": "IsPrivate", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": false, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "c2e9efb0-6bea-4741-b7b9-94d5267743fb", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "primarycontactid", "SchemaName": "PrimaryContactId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "dcf69df9-5aa5-4ff0-8f7d-edbe5b7aea7c", "DisplayName": { "LocalizedLabels": [{ "Label": "Primary Contact", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b641b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Primary Contact", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b641b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "telephone3", "SchemaName": "Telephone3", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "038bafa0-4d34-45b0-8fc5-85d7f147192e", "DisplayName": { "LocalizedLabels": [{ "Label": "Telephone 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e51ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Telephone 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e51ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "parentaccountid", "SchemaName": "ParentAccountId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "218eaefa-b657-4eee-933e-aa39fa8ae5c6", "DisplayName": { "LocalizedLabels": [{ "Label": "Parent Account", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f751c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Parent Account", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f751c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_city", "SchemaName": "Address2_City", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "c1730fd8-059b-4804-b44e-1365fd5fe1a8", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: City", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6f9aba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: City", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6f9aba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StatusAttributeMetadata", "LogicalName": "statuscode", "SchemaName": "StatusCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Status", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "f99371c3-b1e1-4645-b2c3-c3db0f59ecf0", "DisplayName": { "LocalizedLabels": [{ "Label": "Status Reason", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d11c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Status Reason", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d11c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "address1_addresstypecodename", "SchemaName": "Address1_AddressTypeCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "address1_addresstypecode", "MetadataId": "ae7ac149-a80b-4aad-bd5c-fdbe4f255c85", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DoubleAttributeMetadata", "LogicalName": "address2_latitude", "SchemaName": "Address2_Latitude", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Double", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "526057cd-3db1-4be6-a7ee-85a6018ad6fb", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Latitude", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e8f1fbc4-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Latitude", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e8f1fbc4-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata", "LogicalName": "createdon", "SchemaName": "CreatedOn", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "DateTime", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "b952981e-515f-40ba-9a99-99ccf4a9666d", "DisplayName": { "LocalizedLabels": [{ "Label": "Created On", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "bcaac7f4-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Created On", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "bcaac7f4-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "donotbulkemail", "SchemaName": "DoNotBulkEMail", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "d80bc199-9dd4-493a-9932-d1fab5590e1a", "DisplayName": { "LocalizedLabels": [{ "Label": "Do not allow Bulk Emails", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c71ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Do not allow Bulk Emails", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c71ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "donotfax", "SchemaName": "DoNotFax", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "616c80e2-b5c6-4927-990a-0cb1b05b5eae", "DisplayName": { "LocalizedLabels": [{ "Label": "Do not allow Faxes", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d798ba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Do not allow Faxes", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d798ba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "marketcap", "SchemaName": "MarketCap", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "7c4e2f3f-41ee-435a-ba53-bde48af703a2", "DisplayName": { "LocalizedLabels": [{ "Label": "Market Capitalization", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d741b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Market Capitalization", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "d741b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "openrevenue_base", "SchemaName": "OpenRevenue_Base", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "9bf59f26-ec1b-4f91-a735-c4c4a6bab3f6", "DisplayName": { "LocalizedLabels": [{ "Label": "Open Revenue (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "138d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Open Revenue (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "138d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MemoAttributeMetadata", "LogicalName": "address1_composite", "SchemaName": "Address1_Composite", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Memo", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "7ffa2f83-c47c-49da-81de-e41829c856ba", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f195532f-e18a-4a4e-a720-f341a54cba8a", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f195532f-e18a-4a4e-a720-f341a54cba8a", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "ownershipcode", "SchemaName": "OwnershipCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "7be79e9c-1a22-45b2-b09f-1e37cba95bfa", "DisplayName": { "LocalizedLabels": [{ "Label": "Ownership", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e840b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Ownership", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e840b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "opendeals_state", "SchemaName": "OpenDeals_State", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "5394b6f5-5f24-4939-b750-9002a68d1b1a", "DisplayName": { "LocalizedLabels": [{ "Label": "Open Deals (State)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0e8d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Open Deals (State)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0e8d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null } } }, { "LogicalName": "statuscodename", "SchemaName": "StatusCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "statuscode", "MetadataId": "ee82e6f8-45f0-4420-8942-04e55174b3c7", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "owningbusinessunit", "SchemaName": "OwningBusinessUnit", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "80e6486e-17f9-4623-b179-6f86778663ce", "DisplayName": { "LocalizedLabels": [{ "Label": "Owning Business Unit", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ec63cfee-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Owning Business Unit", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ec63cfee-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "preferredappointmenttimecodename", "SchemaName": "PreferredAppointmentTimeCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "preferredappointmenttimecode", "MetadataId": "8d3209c0-a0ba-429c-b96e-d9295f74aff9", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_postalcode", "SchemaName": "Address2_PostalCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "9df02683-1835-4c45-9840-945d40758b1d", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: ZIP\/Postal Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c8d6a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: ZIP\/Postal Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c8d6a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata", "LogicalName": "lastusedincampaign", "SchemaName": "LastUsedInCampaign", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "DateTime", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "bc247de2-6d37-4ea1-9db8-3de2beef935c", "DisplayName": { "LocalizedLabels": [{ "Label": "Last Date Included in Campaign", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "649af6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Last Date Included in Campaign", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "649af6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "paymenttermscodename", "SchemaName": "PaymentTermsCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "paymenttermscode", "MetadataId": "31588d1c-b4c2-4414-ba65-abc038c71c4c", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "industrycodename", "SchemaName": "IndustryCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "industrycode", "MetadataId": "15750b8c-52eb-48df-843f-dc1710d994cd", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "processid", "SchemaName": "ProcessId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Uniqueidentifier", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "bac14cb9-202f-4037-82f3-5b0a570b40ed", "DisplayName": { "LocalizedLabels": [{ "Label": "Process", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c76b75b9-274a-4f7a-b093-38d5322ef82a", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Process", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c76b75b9-274a-4f7a-b093-38d5322ef82a", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "owneridyominame", "SchemaName": "OwnerIdYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "ownerid", "MetadataId": "1e5bcca6-1ebd-4e6d-9fd2-c837d17d5eb7", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "entityimage_url", "SchemaName": "EntityImage_URL", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "entityimageid", "MetadataId": "e8f8979f-d83a-420a-918a-b2a2f28f09bf", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "teamsfollowed", "SchemaName": "TeamsFollowed", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "8b937ebc-615e-48c1-b057-df9e63567dd1", "DisplayName": { "LocalizedLabels": [{ "Label": "TeamsFollowed", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "aef266fa-06ee-4e80-94be-8d7ca01229be", "HasChanged": null }], "UserLocalizedLabel": { "Label": "TeamsFollowed", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "aef266fa-06ee-4e80-94be-8d7ca01229be", "HasChanged": null } } }, { "LogicalName": "address2_shippingmethodcodename", "SchemaName": "Address2_ShippingMethodCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "address2_shippingmethodcode", "MetadataId": "2130e3c1-c554-4b10-a287-8e31951dc4d6", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_line3", "SchemaName": "Address2_Line3", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "ba99202d-aaad-4e62-af78-9695b7c8b5ca", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Street 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "33e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Street 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "33e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MemoAttributeMetadata", "LogicalName": "description", "SchemaName": "Description", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Memo", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "c6000ee7-3aa3-4bfc-afc2-0cff33de5a03", "DisplayName": { "LocalizedLabels": [{ "Label": "Description", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ebcee1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Description", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ebcee1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "modifiedby", "SchemaName": "ModifiedBy", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "2e19a39f-63d9-4fb1-9353-b725eb311de0", "DisplayName": { "LocalizedLabels": [{ "Label": "Modified By", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4e53c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Modified By", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4e53c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "timezoneruleversionnumber", "SchemaName": "TimeZoneRuleVersionNumber", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "2aabdd56-34c3-4664-bc23-3d538f4c2b2f", "DisplayName": { "LocalizedLabels": [{ "Label": "Time Zone Rule Version Number", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2fcbaed5-b6ad-4579-aa36-836311d4ad99", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Time Zone Rule Version Number", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2fcbaed5-b6ad-4579-aa36-836311d4ad99", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_county", "SchemaName": "Address1_County", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "13874392-d3f9-4021-93db-7bb2b048a404", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: County", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "da1c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: County", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "da1c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "createdbyname", "SchemaName": "CreatedByName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "createdby", "MetadataId": "2b80d9de-77b0-4ba5-9d47-f6adb778a61e", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "shippingmethodcodename", "SchemaName": "ShippingMethodCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "shippingmethodcode", "MetadataId": "6e3901fa-8d93-4b28-8997-eace7d5a81e8", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "preferredcontactmethodcode", "SchemaName": "PreferredContactMethodCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "cc5719c0-4fcd-44d3-b1ff-ad77073344e2", "DisplayName": { "LocalizedLabels": [{ "Label": "Preferred Method of Contact", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "7753c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Preferred Method of Contact", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "7753c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "modifiedonbehalfby", "SchemaName": "ModifiedOnBehalfBy", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "e9b339b9-b07c-44fb-b53d-795721d2f520", "DisplayName": { "LocalizedLabels": [{ "Label": "Modified By (Delegate)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e859a486-70dd-4585-aaa9-3de2774a4537", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Modified By (Delegate)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e859a486-70dd-4585-aaa9-3de2774a4537", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_line1", "SchemaName": "Address1_Line1", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "7b3459e2-4b97-44b9-9cb7-6248689dd151", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Street 1", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c5e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Street 1", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c5e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "donotemail", "SchemaName": "DoNotEMail", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "e4c0ddc5-d87e-438d-8c97-927ddae50adf", "DisplayName": { "LocalizedLabels": [{ "Label": "Do not allow Emails", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "cb40b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Do not allow Emails", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "cb40b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "territorycode", "SchemaName": "TerritoryCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "204767ee-9219-458d-a78e-c0295e724fab", "DisplayName": { "LocalizedLabels": [{ "Label": "Territory Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "9125e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Territory Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "9125e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "donotphonename", "SchemaName": "DoNotPhoneName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "donotphone", "MetadataId": "ca244852-c3b8-4fea-ae31-68317fa11bf8", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_postofficebox", "SchemaName": "Address2_PostOfficeBox", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "64b24860-5c1b-46a2-96a5-299ef09a870d", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Post Office Box", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2ecfe1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Post Office Box", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2ecfe1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_telephone1", "SchemaName": "Address2_Telephone1", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "46c47251-be48-4e66-96da-7019322003ad", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Telephone 1", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "dc90aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Telephone 1", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "dc90aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_telephone2", "SchemaName": "Address2_Telephone2", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "626eb7d3-333e-439d-adca-cc7e8d253afc", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Telephone 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "85f1fbc4-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Telephone 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "85f1fbc4-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_telephone3", "SchemaName": "Address2_Telephone3", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "80f36ff1-22b5-43e5-ac4f-7cbf40a3f1f6", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Telephone 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4c53c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Telephone 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4c53c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "originatingleadidyominame", "SchemaName": "OriginatingLeadIdYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "originatingleadid", "MetadataId": "1ecea20b-9bb7-4895-9e9a-34a4a4f240be", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "preferredequipmentidname", "SchemaName": "PreferredEquipmentIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "preferredequipmentid", "MetadataId": "42418791-c37e-4e61-98c3-8d583d1fb3de", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "address1_addressid", "SchemaName": "Address1_AddressId", "IsPrimaryId": true, "IsPrimaryName": false, "AttributeType": "Uniqueidentifier", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "330e9d6e-2ca2-4694-a892-3fbb53d656fd", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1052c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1052c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "traversedpath", "SchemaName": "TraversedPath", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "b5922123-0ba7-45f6-98d4-ba666a45e3c4", "DisplayName": { "LocalizedLabels": [{ "Label": "(Deprecated) Traversed Path", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "33457f57-609d-4cfd-9738-e9606852c4fb", "HasChanged": null }], "UserLocalizedLabel": { "Label": "(Deprecated) Traversed Path", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "33457f57-609d-4cfd-9738-e9606852c4fb", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "territoryidname", "SchemaName": "TerritoryIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "territoryid", "MetadataId": "9cc42b72-6df7-4b91-b5d8-273a870f8bb3", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "territorycodename", "SchemaName": "TerritoryCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "territorycode", "MetadataId": "c9d08ebd-9205-48fb-93e2-fd95b5718d4c", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "followemailname", "SchemaName": "FollowEmailName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "followemail", "MetadataId": "29d77334-70c4-47d8-bacf-b733911a6fe2", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_telephone2", "SchemaName": "Address1_Telephone2", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "dc212cad-707c-42ef-b2b6-5b5e5bd10065", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Telephone 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "37e8af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Telephone 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "37e8af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "createdonbehalfbyname", "SchemaName": "CreatedOnBehalfByName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "createdonbehalfby", "MetadataId": "714467af-a2fe-456c-9951-b88dcc92ed2e", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "owninguser", "SchemaName": "OwningUser", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "510089a8-713a-4d49-a993-6af37d5641d0", "DisplayName": { "LocalizedLabels": [{ "Label": "Owning User", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "abdb0c5b-0863-4c29-be96-45b4ee4f8bcf", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Owning User", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "abdb0c5b-0863-4c29-be96-45b4ee4f8bcf", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "industrycode", "SchemaName": "IndustryCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "ae00233e-70c0-4a1f-803f-03ff723e5440", "DisplayName": { "LocalizedLabels": [{ "Label": "Industry", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6498ba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Industry", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6498ba00-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_name", "SchemaName": "Address2_Name", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "6688b5e5-126a-4b64-a6ce-dbbca074bd89", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0992aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0992aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "openrevenue_state", "SchemaName": "OpenRevenue_State", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "6787750d-7f5b-4ab8-bddc-c48edda0fca2", "DisplayName": { "LocalizedLabels": [{ "Label": "Open Revenue (State)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1b8d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Open Revenue (State)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1b8d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "primarysatoriid", "SchemaName": "PrimarySatoriId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "974ecfad-669a-422d-a081-d222d604353f", "DisplayName": { "LocalizedLabels": [{ "Label": "Primary Satori ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "23f2a113-7beb-4754-bb44-0f7566adbbbf", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Primary Satori ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "23f2a113-7beb-4754-bb44-0f7566adbbbf", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "name", "SchemaName": "Name", "IsPrimaryId": false, "IsPrimaryName": true, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "a1965545-44bc-4b7b-b1ae-93074d0e3f2a", "DisplayName": { "LocalizedLabels": [{ "Label": "Account Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "58f1fbc4-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Account Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "58f1fbc4-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "entityimageid", "SchemaName": "EntityImageId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Uniqueidentifier", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "ddf6ebc7-8159-4f16-bf87-4523af5f2264", "DisplayName": { "LocalizedLabels": [{ "Label": "Entity Image Id", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "127b152b-4a4c-4148-8242-da7ec58ec346", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Entity Image Id", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "127b152b-4a4c-4148-8242-da7ec58ec346", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "aging60", "SchemaName": "Aging60", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "002902f9-14b4-4825-bcbe-ba7a2f9500fd", "DisplayName": { "LocalizedLabels": [{ "Label": "Aging 60", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "8491aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Aging 60", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "8491aa12-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "timespentbymeonemailandmeetings", "SchemaName": "TimeSpentByMeOnEmailAndMeetings", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "2b8f1a55-04f9-468f-b431-bdc0e59e6019", "DisplayName": { "LocalizedLabels": [{ "Label": "Time Spent by me", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6c72169b-6f22-45c5-849c-d98629a3bb0c", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Time Spent by me", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "6c72169b-6f22-45c5-849c-d98629a3bb0c", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "businesstypecode", "SchemaName": "BusinessTypeCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "088101ce-83c4-40cd-9b8b-97bdb52bdcfa", "DisplayName": { "LocalizedLabels": [{ "Label": "Business Type", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "79e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Business Type", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "79e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "primarytwitterid", "SchemaName": "PrimaryTwitterId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "14ad1176-d742-47bf-836a-6567170a1405", "DisplayName": { "LocalizedLabels": [{ "Label": "Primary Twitter ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "a5bd4993-c40b-4ab3-be39-2c248c11ccb5", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Primary Twitter ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "a5bd4993-c40b-4ab3-be39-2c248c11ccb5", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "owneridname", "SchemaName": "OwnerIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "ownerid", "MetadataId": "0375b41e-124c-4efd-9c52-fbafc69e07b0", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.ImageAttributeMetadata", "LogicalName": "entityimage", "SchemaName": "EntityImage", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": "entityimageid", "MetadataId": "4fabce42-db27-4076-ba0b-2538c71b8a74", "DisplayName": { "LocalizedLabels": [{ "Label": "Default Image", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "84ee563d-1094-4445-b96e-d6d291e8e2e8", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Default Image", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "84ee563d-1094-4445-b96e-d6d291e8e2e8", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BigIntAttributeMetadata", "LogicalName": "entityimage_timestamp", "SchemaName": "EntityImage_Timestamp", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "BigInt", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "entityimageid", "MetadataId": "6a6170af-5a93-4396-9283-4a02c95bce3d", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "createdonbehalfbyyominame", "SchemaName": "CreatedOnBehalfByYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "createdonbehalfby", "MetadataId": "71efbac2-84a2-4301-a5a9-b40a08ebba30", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MemoAttributeMetadata", "LogicalName": "address2_composite", "SchemaName": "Address2_Composite", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Memo", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "05dda970-1693-42e1-9037-68fef8cedf5c", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "69a77bc9-d34c-4d81-8bef-8a7290470eaa", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "69a77bc9-d34c-4d81-8bef-8a7290470eaa", "HasChanged": null } } }, { "LogicalName": "accountratingcodename", "SchemaName": "AccountRatingCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "accountratingcode", "MetadataId": "7bd106f2-53d5-466e-a521-9f29737afb82", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "shippingmethodcode", "SchemaName": "ShippingMethodCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "cf1bf1d3-9c27-4f72-af83-7f96f56ecd14", "DisplayName": { "LocalizedLabels": [{ "Label": "Shipping Method", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e599f6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Shipping Method", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e599f6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_country", "SchemaName": "Address1_Country", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "1326c13d-8797-4905-9540-47fa9ae8ef57", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Country\/Region", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f026e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Country\/Region", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f026e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "customertypecodename", "SchemaName": "CustomerTypeCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "customertypecode", "MetadataId": "93348ddc-b15e-4b89-9486-2064f3270693", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "owningteam", "SchemaName": "OwningTeam", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "aadfb126-cadd-4195-ada8-e739a404ba7e", "DisplayName": { "LocalizedLabels": [{ "Label": "Owning Team", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "25972789-f835-42fa-9222-40801fd112ce", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Owning Team", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "25972789-f835-42fa-9222-40801fd112ce", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_stateorprovince", "SchemaName": "Address1_StateOrProvince", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "8857cdf3-2e77-4c95-aae3-d08107779f21", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: State\/Province", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b241b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: State\/Province", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b241b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "isprivatename", "SchemaName": "IsPrivateName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "isprivate", "MetadataId": "31aa40c1-13a8-4e05-aad6-52b69a67ee43", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "preferredserviceidname", "SchemaName": "PreferredServiceIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "preferredserviceid", "MetadataId": "cd85ab19-eba2-4d3c-8030-cda5f4fe364c", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "marketingonly", "SchemaName": "MarketingOnly", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "c88f7cd9-19be-48c7-8a33-8473d070297a", "DisplayName": { "LocalizedLabels": [{ "Label": "Marketing Only", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fc98ffdc-17ed-45dd-a3a0-ee59dd6d89d9", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Marketing Only", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fc98ffdc-17ed-45dd-a3a0-ee59dd6d89d9", "HasChanged": null } } }, { "LogicalName": "creditonholdname", "SchemaName": "CreditOnHoldName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "creditonhold", "MetadataId": "33505b21-2a74-47b1-91f0-a52aeab80c78", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "modifiedonbehalfbyname", "SchemaName": "ModifiedOnBehalfByName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "modifiedonbehalfby", "MetadataId": "44d88398-4929-4bbf-9616-ea3014f585d8", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "preferredequipmentid", "SchemaName": "PreferredEquipmentId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "d5f8e679-3885-41ce-b945-65c5b621efbc", "DisplayName": { "LocalizedLabels": [{ "Label": "Preferred Facility\/Equipment", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "5afe2680-606e-4811-9882-932148d17b38", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Preferred Facility\/Equipment", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "5afe2680-606e-4811-9882-932148d17b38", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "createdbyexternalpartyyominame", "SchemaName": "CreatedByExternalPartyYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "createdbyexternalparty", "MetadataId": "12f3c6f1-477e-4cc1-add2-4538f08cfac6", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "address1_freighttermscodename", "SchemaName": "Address1_FreightTermsCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "address1_freighttermscode", "MetadataId": "7cd017f5-ca70-4b11-b6eb-c3d89c61a689", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "createdonbehalfby", "SchemaName": "CreatedOnBehalfBy", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "90aa9edb-4009-48f9-9b21-2675a055c3fc", "DisplayName": { "LocalizedLabels": [{ "Label": "Created By (Delegate)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "9e465c90-fa69-426a-b448-5547a32124e1", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Created By (Delegate)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "9e465c90-fa69-426a-b448-5547a32124e1", "HasChanged": null } } }, { "LogicalName": "marketingonlyname", "SchemaName": "MarketingOnlyName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "marketingonly", "MetadataId": "f1cdde41-5701-4970-92a0-14ffaa8438ac", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_line1", "SchemaName": "Address2_Line1", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "9493ed2f-b55d-46ac-8dc5-8b1b7192cbba", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Street 1", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "8e26e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Street 1", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "8e26e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_telephone1", "SchemaName": "Address1_Telephone1", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "b9dc178d-394b-439e-90f2-17b84a279357", "DisplayName": { "LocalizedLabels": [{ "Label": "Address Phone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "29abc7f4-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address Phone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "29abc7f4-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "primarycontactidname", "SchemaName": "PrimaryContactIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "primarycontactid", "MetadataId": "ab294895-72ed-4f18-854d-0aaf8d7a8b7d", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_telephone3", "SchemaName": "Address1_Telephone3", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "96278824-686d-4602-a592-943cdb667bea", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Telephone 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b053c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Telephone 3", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b053c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_postofficebox", "SchemaName": "Address1_PostOfficeBox", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "a95a22b3-2197-4dfd-bdaf-d89125162dc3", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Post Office Box", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "50e0eed0-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Post Office Box", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "50e0eed0-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "followemail", "SchemaName": "FollowEmail", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "401eed95-62b1-4dd4-8ca2-c5a2bee16481", "DisplayName": { "LocalizedLabels": [{ "Label": "Follow Email Activity", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "a02f7882-abd3-4b61-945d-1f24ffab2e5d", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Follow Email Activity", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "a02f7882-abd3-4b61-945d-1f24ffab2e5d", "HasChanged": null } } }, { "LogicalName": "donotemailname", "SchemaName": "DoNotEMailName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "donotemail", "MetadataId": "490f2da2-242d-45c9-95bc-9cfc23564567", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "slainvokedidname", "SchemaName": "SLAInvokedIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "slainvokedid", "MetadataId": "6499c30b-9a7f-49af-a169-8183cef8f73f", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "fax", "SchemaName": "Fax", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "9811cb32-482f-4dd3-9b5d-5340236dcd61", "DisplayName": { "LocalizedLabels": [{ "Label": "Fax", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "301c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Fax", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "301c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "masterid", "SchemaName": "MasterId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "7af8cc57-303f-4c0c-92d6-53c278e067a0", "DisplayName": { "LocalizedLabels": [{ "Label": "Master ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1c1c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Master ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1c1c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "sic", "SchemaName": "SIC", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "1534a09c-3313-4189-8fec-a132d69f9a0d", "DisplayName": { "LocalizedLabels": [{ "Label": "SIC Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1f1c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "SIC Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1f1c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "ownerid", "SchemaName": "OwnerId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Owner", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "3343d9f8-8b3b-45de-881f-4501a34e29de", "DisplayName": { "LocalizedLabels": [{ "Label": "Owner", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4a4901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Owner", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4a4901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "address2_utcoffset", "SchemaName": "Address2_UTCOffset", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "ca119f3b-e098-49c3-9355-891eb5c1785f", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: UTC Offset", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "8353c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: UTC Offset", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "8353c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "stageid", "SchemaName": "StageId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Uniqueidentifier", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "3c69a2f7-b6c5-47ba-9966-b04a4693bcfc", "DisplayName": { "LocalizedLabels": [{ "Label": "(Deprecated) Process Stage", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ac13ae4b-3820-4276-8e8f-28af41ef2158", "HasChanged": null }], "UserLocalizedLabel": { "Label": "(Deprecated) Process Stage", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ac13ae4b-3820-4276-8e8f-28af41ef2158", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "accountnumber", "SchemaName": "AccountNumber", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "7c21feaa-f59c-422d-858d-6d630d23446c", "DisplayName": { "LocalizedLabels": [{ "Label": "Account Number", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "609af6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Account Number", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "609af6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "creditlimit_base", "SchemaName": "CreditLimit_Base", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "0e844ab4-638f-41a6-b17b-ce948b5129f5", "DisplayName": { "LocalizedLabels": [{ "Label": "Credit Limit (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "93efad2e-9ed7-454d-87bb-01afb2a1def6", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Credit Limit (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "93efad2e-9ed7-454d-87bb-01afb2a1def6", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_fax", "SchemaName": "Address2_Fax", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "ee64e0d6-7c95-4cd4-bda7-05386f47cf7f", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Fax", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "86d7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Fax", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "86d7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "revenue_base", "SchemaName": "Revenue_Base", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "74177cf1-9a05-4c38-9e82-396f3199bac2", "DisplayName": { "LocalizedLabels": [{ "Label": "Annual Revenue (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "65ab2173-0c8c-4800-be47-93ecdfb18c01", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Annual Revenue (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "65ab2173-0c8c-4800-be47-93ecdfb18c01", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "merged", "SchemaName": "Merged", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "2e0892db-cc6e-4688-994e-a0a06ba319df", "DisplayName": { "LocalizedLabels": [{ "Label": "Merged", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4d1ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Merged", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4d1ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.EntityNameAttributeMetadata", "LogicalName": "owneridtype", "SchemaName": "OwnerIdType", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "EntityName", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": "ownerid", "MetadataId": "95e946b0-c222-48eb-916f-0e98b446747c", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DoubleAttributeMetadata", "LogicalName": "address2_longitude", "SchemaName": "Address2_Longitude", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Double", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "1420757b-5096-4d35-b490-daf9797d65eb", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Longitude", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "799af6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Longitude", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "799af6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "modifiedbyexternalparty", "SchemaName": "ModifiedByExternalParty", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "f8e8ceaf-a9e3-4108-9942-5d382f564f97", "DisplayName": { "LocalizedLabels": [{ "Label": "Modified By (External Party)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "7a03aad7-6c69-47f8-8c71-0a8d97303e9a", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Modified By (External Party)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "7a03aad7-6c69-47f8-8c71-0a8d97303e9a", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "defaultpricelevelid", "SchemaName": "DefaultPriceLevelId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "dde3fc28-c8f5-41df-b0bd-004ce1cc353a", "DisplayName": { "LocalizedLabels": [{ "Label": "Price List", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e9522aa2-e7c0-4c9f-936b-b9daf8e2cded", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Price List", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e9522aa2-e7c0-4c9f-936b-b9daf8e2cded", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "ftpsiteurl", "SchemaName": "FtpSiteURL", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "22ada637-2f87-4ed4-8766-eade94f3b668", "DisplayName": { "LocalizedLabels": [{ "Label": "FTP Site", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "10d9dee2-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "FTP Site", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "10d9dee2-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "donotpostalmailname", "SchemaName": "DoNotPostalMailName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "donotpostalmail", "MetadataId": "03f84fdc-836b-4cc5-bfd6-fbb75c81ecaf", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "aging90_base", "SchemaName": "Aging90_Base", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "d2f94d60-6641-49dd-a76d-bfc8a234ac24", "DisplayName": { "LocalizedLabels": [{ "Label": "Aging 90 (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f72d56f7-1182-4fda-9808-43625378abd9", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Aging 90 (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f72d56f7-1182-4fda-9808-43625378abd9", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "donotphone", "SchemaName": "DoNotPhone", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "a4561f83-3630-4f3c-9a36-1cdfff96a97a", "DisplayName": { "LocalizedLabels": [{ "Label": "Do not allow Phone Calls", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "9ae9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Do not allow Phone Calls", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "9ae9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "address1_shippingmethodcodename", "SchemaName": "Address1_ShippingMethodCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "address1_shippingmethodcode", "MetadataId": "be8db669-4365-4721-a050-900f599023cb", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_primarycontactname", "SchemaName": "Address1_PrimaryContactName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "bbaa86d0-ba0f-4c0d-93ed-670e49628e75", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Primary Contact Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "df99f6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Primary Contact Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "df99f6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "modifiedbyyominame", "SchemaName": "ModifiedByYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "modifiedby", "MetadataId": "8b16e0ff-53e1-4371-86c1-65a25e3ba7c5", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata", "LogicalName": "lastonholdtime", "SchemaName": "LastOnHoldTime", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "DateTime", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "d8841e6e-5099-4320-aa8b-682e329702c4", "DisplayName": { "LocalizedLabels": [{ "Label": "Last On Hold Time", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "66634992-89d9-4da8-8e22-c1ec85dd4a72", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Last On Hold Time", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "66634992-89d9-4da8-8e22-c1ec85dd4a72", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_line2", "SchemaName": "Address1_Line2", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "69e4d8a3-cbdf-4e4a-8521-c7d3d6deb53f", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Street 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4341b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Street 2", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "4341b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "modifiedonbehalfbyyominame", "SchemaName": "ModifiedOnBehalfByYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "modifiedonbehalfby", "MetadataId": "04a08ad9-eb9e-4ae2-8b1e-2a65199e143f", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "createdby", "SchemaName": "CreatedBy", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "b863fe8a-6393-42ec-a540-972d3b45bd7b", "DisplayName": { "LocalizedLabels": [{ "Label": "Created By", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c099f6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Created By", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "c099f6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "address2_addresstypecode", "SchemaName": "Address2_AddressTypeCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "e0007867-4731-4d30-8efe-dea46640c1bb", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Address Type", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "26e0eed0-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Address Type", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "26e0eed0-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata", "LogicalName": "openrevenue_date", "SchemaName": "OpenRevenue_Date", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "DateTime", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "53475a30-98e5-453a-af44-b0c00b88e17d", "DisplayName": { "LocalizedLabels": [{ "Label": "Open Revenue (Last Updated On)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "178d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Open Revenue (Last Updated On)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "178d9876-f712-ec11-b6e5-0022489c25ba", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_upszone", "SchemaName": "Address2_UPSZone", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "89d2579d-a4ec-4344-a791-13b10a87517f", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: UPS Zone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "504901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: UPS Zone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "504901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "donotfaxname", "SchemaName": "DoNotFaxName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "donotfax", "MetadataId": "b69dbac9-d722-4314-9a53-99363390c1d9", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "marketcap_base", "SchemaName": "MarketCap_Base", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "92721ea9-a118-44f6-87ed-de5a501fc8a9", "DisplayName": { "LocalizedLabels": [{ "Label": "Market Capitalization (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "eb1613b8-ec25-4557-b62c-b375b3841066", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Market Capitalization (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "eb1613b8-ec25-4557-b62c-b375b3841066", "HasChanged": null } } }, { "LogicalName": "address2_addresstypecodename", "SchemaName": "Address2_AddressTypeCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "address2_addresstypecode", "MetadataId": "56f2a829-2711-4b43-ba20-a378e8ea97e0", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "ownershipcodename", "SchemaName": "OwnershipCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "ownershipcode", "MetadataId": "047756df-f439-4c61-8f90-2a8db1795b05", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_postalcode", "SchemaName": "Address1_PostalCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "9f4f6b3f-ecbb-4f82-9efa-4f02ded49686", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: ZIP\/Postal Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1c1ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: ZIP\/Postal Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1c1ed7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "tickersymbol", "SchemaName": "TickerSymbol", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "b0448516-5677-4b9f-945d-36017bbffd97", "DisplayName": { "LocalizedLabels": [{ "Label": "Ticker Symbol", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e0cde1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Ticker Symbol", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "e0cde1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "customersizecode", "SchemaName": "CustomerSizeCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "9c6b1499-24b3-4f63-a8c2-4b263ae49ac9", "DisplayName": { "LocalizedLabels": [{ "Label": "Customer Size", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "83dfeed0-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Customer Size", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "83dfeed0-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "utcconversiontimezonecode", "SchemaName": "UTCConversionTimeZoneCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "e914126d-4c9e-41ab-89a2-4f7d758f4016", "DisplayName": { "LocalizedLabels": [{ "Label": "UTC Conversion Time Zone Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fb51f00b-de40-492c-8afb-a9ebb000a814", "HasChanged": null }], "UserLocalizedLabel": { "Label": "UTC Conversion Time Zone Code", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fb51f00b-de40-492c-8afb-a9ebb000a814", "HasChanged": null } } }, { "LogicalName": "donotbulkemailname", "SchemaName": "DoNotBulkEMailName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "donotbulkemail", "MetadataId": "713cf6a1-750b-4cb4-a892-e52a0b206de8", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "defaultpricelevelidname", "SchemaName": "DefaultPriceLevelIdName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "defaultpricelevelid", "MetadataId": "b086279a-a937-41f0-8703-71d87c5a45da", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", "LogicalName": "participatesinworkflow", "SchemaName": "ParticipatesInWorkflow", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Boolean", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "b7a4c83e-1ff9-403b-aabb-bc50d608d4da", "DisplayName": { "LocalizedLabels": [{ "Label": "Participates in Workflow", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "84e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Participates in Workflow", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "84e9af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "stockexchange", "SchemaName": "StockExchange", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "0b24a82f-e3aa-4a51-bc98-da99c732a313", "DisplayName": { "LocalizedLabels": [{ "Label": "Stock Exchange", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fe63cfee-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Stock Exchange", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fe63cfee-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "customersizecodename", "SchemaName": "CustomerSizeCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "customersizecode", "MetadataId": "cd5073c6-1b65-42ad-8c4a-9582ad7119db", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "importsequencenumber", "SchemaName": "ImportSequenceNumber", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "6aef0e41-4d16-48ca-aac3-354233738b5d", "DisplayName": { "LocalizedLabels": [{ "Label": "Import Sequence Number", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "27b4904e-3a65-4155-b56c-d84faae22513", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Import Sequence Number", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "27b4904e-3a65-4155-b56c-d84faae22513", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "telephone2", "SchemaName": "Telephone2", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "c370ed23-eb71-4c25-b8ed-9a469f6f99b4", "DisplayName": { "LocalizedLabels": [{ "Label": "Other Phone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0553c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Other Phone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0553c2fa-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "mergedname", "SchemaName": "MergedName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "merged", "MetadataId": "99879032-92ce-4188-b303-c9eca16994c3", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.BigIntAttributeMetadata", "LogicalName": "versionnumber", "SchemaName": "VersionNumber", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "BigInt", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "60362493-831c-4ed6-a82a-e51f3ce1e670", "DisplayName": { "LocalizedLabels": [{ "Label": "Version Number", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b71f65b8-f9ed-45db-bccd-e1dd85cf5971", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Version Number", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "b71f65b8-f9ed-45db-bccd-e1dd85cf5971", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", "LogicalName": "preferredsystemuserid", "SchemaName": "PreferredSystemUserId", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Lookup", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "ea8697f0-8274-4b49-a6a4-dba3f48b3679", "DisplayName": { "LocalizedLabels": [{ "Label": "Preferred User", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "021c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Preferred User", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "021c9b1e-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "accountid", "SchemaName": "AccountId", "IsPrimaryId": true, "IsPrimaryName": false, "AttributeType": "Uniqueidentifier", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "f8cd5db9-cee8-4845-8cdd-cd4f504957e7", "DisplayName": { "LocalizedLabels": [{ "Label": "Account", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "5cd8a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Account", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "5cd8a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "telephone1", "SchemaName": "Telephone1", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "4f8dae72-5905-4130-987a-6fc85e450466", "DisplayName": { "LocalizedLabels": [{ "Label": "Main Phone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1be0eed0-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Main Phone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1be0eed0-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", "LogicalName": "aging30_base", "SchemaName": "Aging30_Base", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Money", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "80934a27-2d97-4104-8663-29afa4532cad", "DisplayName": { "LocalizedLabels": [{ "Label": "Aging 30 (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "76fd225d-95fb-4279-99fc-a0827c82c7ed", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Aging 30 (Base)", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "76fd225d-95fb-4279-99fc-a0827c82c7ed", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_name", "SchemaName": "Address1_Name", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "c1f41980-4d65-4150-8a28-38f0f4117f4d", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0c1fd7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "0c1fd7e8-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_fax", "SchemaName": "Address1_Fax", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "4d8847bf-14f9-4a42-91e4-22dca4efa448", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Fax", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "99e8af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Fax", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "99e8af0c-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.DoubleAttributeMetadata", "LogicalName": "address1_latitude", "SchemaName": "Address1_Latitude", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Double", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "a153ec66-4ddd-4a74-bd1e-40119efdd781", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: Latitude", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fa40b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: Latitude", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "fa40b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "address2_shippingmethodcode", "SchemaName": "Address2_ShippingMethodCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "042dbe8b-f24d-450e-8b36-d75421012a3f", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Shipping Method", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "81cee1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Shipping Method", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "81cee1dc-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "primarycontactidyominame", "SchemaName": "PrimaryContactIdYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "primarycontactid", "MetadataId": "70eaa97b-6ab9-40b8-b736-e91fa3ec05ef", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "LogicalName": "accountclassificationcodename", "SchemaName": "AccountClassificationCodeName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Virtual", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "accountclassificationcode", "MetadataId": "33ec532a-887e-4f83-8e89-83d646167dba", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "preferredappointmentdaycode", "SchemaName": "PreferredAppointmentDayCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "5967e7cc-afbb-4c10-bf7e-e7ef430c52be", "DisplayName": { "LocalizedLabels": [{ "Label": "Preferred Day", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1ed6a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Preferred Day", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1ed6a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "modifiedbyname", "SchemaName": "ModifiedByName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "modifiedby", "MetadataId": "dc200f64-cf5e-4a58-a51f-a512dcc993a1", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "createdbyyominame", "SchemaName": "CreatedByYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "createdby", "MetadataId": "0df21d8f-9405-4c96-9cc7-6f15db11ae0a", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", "LogicalName": "address2_freighttermscode", "SchemaName": "Address2_FreightTermsCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Picklist", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "d4bde505-3332-439a-9cff-98074e8dd32e", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Freight Terms", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "61d7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Freight Terms", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "61d7a218-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address1_upszone", "SchemaName": "Address1_UPSZone", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "884421e3-3da2-4f94-8e8a-d8a209ce3d69", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 1: UPS Zone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ca4901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 1: UPS Zone", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "ca4901bf-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "LogicalName": "address2_addressid", "SchemaName": "Address2_AddressId", "IsPrimaryId": true, "IsPrimaryName": false, "AttributeType": "Uniqueidentifier", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "4e6b416b-cbce-4524-b194-bf8b3ed46b3e", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f825e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: ID", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "f825e7d6-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "slaname", "SchemaName": "SLAName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "slaid", "MetadataId": "5c0f7ba6-40ca-4cc8-8e17-6beece2dbaf1", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "parentaccountidyominame", "SchemaName": "ParentAccountIdYomiName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": "parentaccountid", "MetadataId": "a2ec861a-ee3f-4a3e-bdac-0e57a1775b4e", "DisplayName": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", "LogicalName": "address2_primarycontactname", "SchemaName": "Address2_PrimaryContactName", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "String", "IsValidForRead": true, "IsValidForCreate": true, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "ab3b6f3b-f839-48df-9598-ae52652e4fd9", "DisplayName": { "LocalizedLabels": [{ "Label": "Address 2: Primary Contact Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1b9af6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Address 2: Primary Contact Name", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1b9af6ca-2241-db11-898a-0007e9e17ebd", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", "LogicalName": "opendeals", "SchemaName": "OpenDeals", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "Integer", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": false, "AttributeOf": null, "MetadataId": "e10cdd44-5c7f-4ac8-a5d1-b2118926f2bd", "DisplayName": { "LocalizedLabels": [{ "Label": "Open Deals", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2061c3ec-b437-4789-a0a0-adb0fa72f505", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Open Deals", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "2061c3ec-b437-4789-a0a0-adb0fa72f505", "HasChanged": null } } }, { "@odata.type": "#Microsoft.Dynamics.CRM.StateAttributeMetadata", "LogicalName": "statecode", "SchemaName": "StateCode", "IsPrimaryId": false, "IsPrimaryName": false, "AttributeType": "State", "IsValidForRead": true, "IsValidForCreate": false, "IsValidForUpdate": true, "AttributeOf": null, "MetadataId": "27f3c67a-f274-4034-9f0f-5d708bcd78f7", "DisplayName": { "LocalizedLabels": [{ "Label": "Status", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1a41b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null }], "UserLocalizedLabel": { "Label": "Status", "LanguageCode": 1033, "IsManaged": true, "MetadataId": "1a41b506-2341-db11-898a-0007e9e17ebd", "HasChanged": null } } }];


    var oneToMany_Account = [];
    oneToMany_Account.push({ SchemaName: "account_Team", ReferencingEntity: "team", ReferencedEntity: "account", ReferencingAttribute: "teamid", ReferencedAttribute: "accountid", ReferencingEntityNavigationPropertyName: "team", ReferencedEntityNavigationPropertyName: "account_Team" });
    oneToMany_Account.push({ SchemaName: "Team_account", ReferencingEntity: "team", ReferencedEntity: "account", ReferencingAttribute: "teamid2", ReferencedAttribute: "accountid", ReferencingEntityNavigationPropertyName: "Team2", ReferencedEntityNavigationPropertyName: "Team_account" });


    var columns_User = [];
    columns_User.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "FirstName", LogicalName: "firstname", AttributeType: "String", IsPrimaryId: false, IsPrimaryName: false, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 50, DisplayName: { UserLocalizedLabel: { Label: "First Name" } } });
    columns_User.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "FullName", LogicalName: "fullname", AttributeType: "String", IsPrimaryId: false, IsPrimaryName: true, IsValidForRead: true, IsValidForCreate: false, IsValidForUpdate: false, DisplayName: { UserLocalizedLabel: { Label: "Full Name" } } });
    columns_User.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "LastName", LogicalName: "lastname", AttributeType: "String", IsPrimaryId: false, IsPrimaryName: false, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 50, DisplayName: { UserLocalizedLabel: { Label: "Last Name" } } });
    columns_User.push({ SchemaName: "SystemUserId", LogicalName: "systemuserid", AttributeType: "Uniqueidentifier", IsPrimaryId: true, IsPrimaryName: false, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: false, DisplayName: { UserLocalizedLabel: { Label: "User" } } });

    var columns_CustomTable = [];
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.DecimalAttributeMetadata", SchemaName: "sample_Decimal", LogicalName: "sample_decimal", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Decimal", MinValue: 700, MaxValue: 800, Precision: 2, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Decimal" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", SchemaName: "sample_Money", LogicalName: "sample_money", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Money", MinValue: 0, MaxValue: 1000, Precision: 2, PrecisionSource: 4, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Money" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", SchemaName: "sample_Choice", LogicalName: "sample_choice", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Picklist", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Choice" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.BigIntAttributeMetadata", SchemaName: "VersionNumber", LogicalName: "versionnumber", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "BigInt", MinValue: -1000, MaxValue: 1000, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Version Number" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StatusAttributeMetadata", SchemaName: "statuscode", LogicalName: "statuscode", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Status", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Status Reason" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.DateTimeAttributeMetadata", SchemaName: "sample_DateAndTime", LogicalName: "sample_dateandtime", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "DateTime", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Date And Time" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StateAttributeMetadata", SchemaName: "statecode", LogicalName: "statecode", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "State", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Status" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.IntegerAttributeMetadata", SchemaName: "sample_WholeNumber", LogicalName: "sample_wholenumber", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Integer", MinValue: 20, MaxValue: 40, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Whole Number" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.MoneyAttributeMetadata", SchemaName: "sample_Money_Base", LogicalName: "sample_money_base", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Money", MinValue: 0, MaxValue: 1000, Precision: 2, PrecisionSource: 4, IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: false, DisplayName: { UserLocalizedLabel: { Label: "Money (Base)" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "sample_Name", LogicalName: "sample_name", IsPrimaryId: false, IsPrimaryName: true, AttributeType: "String", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 90, DisplayName: { UserLocalizedLabel: { Label: "Name" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "sample_Name2", LogicalName: "sample_name2", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "String", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 91, DisplayName: { UserLocalizedLabel: { Label: "Name 2" } } });
    columns_CustomTable.push({ SchemaName: "sample_customtableId", LogicalName: "sample_customtableid", IsPrimaryId: true, IsPrimaryName: false, AttributeType: "Uniqueidentifier", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: false, DisplayName: { UserLocalizedLabel: { Label: "Custom Table" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", SchemaName: "sample_PolyId", LogicalName: "sample_polyid", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Lookup", Targets: ["contact", "team"], IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Polymorphic Lookup (Contact, Team)" } } });

    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.EntityNameAttributeMetadata", SchemaName: "sample_PolyIdType", LogicalName: "sample_polyidtype", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "EntityName", AttributeOf: "sample_polyid", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true });


    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", SchemaName: "OwnerId", LogicalName: "ownerid", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Owner", Targets: ["systemuser", "team"], IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Owner" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.MemoAttributeMetadata", SchemaName: "sample_MultipleLines", LogicalName: "sample_multiplelines", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Memo", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 500, DisplayName: { UserLocalizedLabel: { Label: "Multiple Lines" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", SchemaName: "sample_ContactId", LogicalName: "sample_contactid", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Lookup", Targets: ["contact"], IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Lookup (Contact)" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata", SchemaName: "sample_CustomerId", LogicalName: "sample_customerid", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Customer", Targets: ["account", "contact"], IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Customer Lookup" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.DoubleAttributeMetadata", SchemaName: "sample_Float", LogicalName: "sample_float", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Double", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MinValue: 5, MaxValue: 10, Precision: 3, DisplayName: { UserLocalizedLabel: { Label: "Float" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.ImageAttributeMetadata", SchemaName: "sample_Image", LogicalName: "sample_image", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Virtual", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxSizeInKB: 10240, CanStoreFullImage: true, DisplayName: { UserLocalizedLabel: { Label: "Image" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.ImageAttributeMetadata", SchemaName: "sample_Image2", LogicalName: "sample_image2", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Virtual", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxSizeInKB: 1024, CanStoreFullImage: false, DisplayName: { UserLocalizedLabel: { Label: "Image 2" } } });


    var sample_Boolean_Values = { "OptionSetType": "Boolean", "TrueOption": { "Value": true, "Label": { "UserLocalizedLabel": { "Label": "Yes" } } }, "FalseOption": { "Value": false, "Label": { "UserLocalizedLabel": { "Label": "No" } } } };
    var sample_Boolean = { "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", EntityLogicalName: "sample_customtable", LogicalName: "sample_boolean", AttributeType: "Boolean", OptionSet: sample_Boolean_Values };
    var columns_values_CustomTable = [sample_Boolean];

    var sample_Choices_Values = { "OptionSetType": "MultiPicklist", "Options": [{ "Value": 1, "Label": { "UserLocalizedLabel": { "Label": "Option 1" } } }, { "Value": 2, "Label": { "UserLocalizedLabel": { "Label": "Option 2" } } }, { "Value": 3, "Label": { "UserLocalizedLabel": { "Label": "Option 3" } } }] };
    var sample_Choices = { "@odata.type": "#Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata", EntityLogicalName: "sample_customtable", LogicalName: "sample_choices", AttributeType: "MultiPicklist", OptionSet: sample_Choices_Values };
    var columns_values_CustomTable1 = [sample_Choices];

    var sample_Choice_Values = { "OptionSetType": "Picklist", "Options": [{ "Value": 0, "Label": { "UserLocalizedLabel": { "Label": "A" } } }, { "Value": 727000001, "Label": { "UserLocalizedLabel": { "Label": "B" } } }, { "Value": 727000002, "Label": { "UserLocalizedLabel": { "Label": "C" } } }] };
    var sample_Choice = { "@odata.type": "#Microsoft.Dynamics.CRM.PicklistAttributeMetadata", EntityLogicalName: "sample_customtable", LogicalName: "sample_choice", AttributeType: "Picklist", OptionSet: sample_Choice_Values };
    var columns_values_CustomTable2 = [sample_Choice];

    var sample_State_Values = { "OptionSetType": "State", "Options": [{ "Value": 0, "Label": { "UserLocalizedLabel": { "Label": "Active" } } }, { "Value": 1, "Label": { "UserLocalizedLabel": { "Label": "Inactive" } } }] };
    var sample_State = { "@odata.type": "#Microsoft.Dynamics.CRM.StateAttributeMetadata", EntityLogicalName: "sample_customtable", LogicalName: "statecode", AttributeType: "State", OptionSet: sample_State_Values };
    var columns_values_CustomTable3 = [sample_State];

    var sample_Status_Values = { "OptionSetType": "Status", "Options": [{ "Value": 1, "Label": { "UserLocalizedLabel": { "Label": "Active" } } }, { "Value": 2, "Label": { "UserLocalizedLabel": { "Label": "Inactive" } } }] };
    var sample_Status = { "@odata.type": "#Microsoft.Dynamics.CRM.StatusAttributeMetadata", EntityLogicalName: "sample_customtable", LogicalName: "statuscode", AttributeType: "State", OptionSet: sample_Status_Values };
    var columns_values_CustomTable4 = [sample_Status];


    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.BooleanAttributeMetadata", SchemaName: "sample_Boolean", LogicalName: "sample_boolean", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Boolean", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Two Options" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata", SchemaName: "sample_Choices", LogicalName: "sample_choices", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Virtual", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, DisplayName: { UserLocalizedLabel: { Label: "Choices" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.FileAttributeMetadata", SchemaName: "sample_File", LogicalName: "sample_file", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Virtual", IsValidForRead: true, IsValidForCreate: false, IsValidForUpdate: false, MaxSizeInKB: 32768, DisplayName: { UserLocalizedLabel: { Label: "File" } } });
    columns_CustomTable.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "sample_File_Name", LogicalName: "sample_file_name", AttributeOf: "sample_file", AttributeType: "String", IsValidForCreate: false, IsValidForRead: true, IsValidForUpdate: false });

    columns_CustomTable.push({ SchemaName: "sample_ImageId", LogicalName: "sample_imageid", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Uniqueidentifier", IsValidForRead: true, IsValidForCreate: false, IsValidForUpdate: false });
    columns_CustomTable.push({ SchemaName: "sample_Image2Id", LogicalName: "sample_image2id", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "Uniqueidentifier", IsValidForRead: true, IsValidForCreate: false, IsValidForUpdate: false });

    var keys_CustomTable = [];
    keys_CustomTable.push({ SchemaName: "sample_SampleKey1", LogicalName: "sample_samplekey1", EntityKeyIndexStatus: "Active", KeyAttributes: ["sample_name"], DisplayName: { UserLocalizedLabel: { Label: "Sample Key 1" } } });
    keys_CustomTable.push({ SchemaName: "sample_SampleKey2", LogicalName: "sample_samplekey2", EntityKeyIndexStatus: "Active", KeyAttributes: ["sample_name", "sample_name2"], DisplayName: { UserLocalizedLabel: { Label: "Sample Key 2" } } });
    keys_CustomTable.push({ SchemaName: "sample_SampleKey3", LogicalName: "sample_samplekey3", EntityKeyIndexStatus: "Active", KeyAttributes: ["sample_name2", "sample_choice", "sample_wholenumber", "sample_contactid", "sample_decimal", "sample_dateandtime"], DisplayName: { UserLocalizedLabel: { Label: "Sample Key 3" } } });

    var oneToMany_CustomTable = [];
    oneToMany_CustomTable.push({ SchemaName: "sample_sample_customtable_Team", ReferencingEntity: "team", ReferencedEntity: "sample_customtable", ReferencingAttribute: "sample_customtableid", ReferencedAttribute: "sample_customtableid", ReferencingEntityNavigationPropertyName: "sample_CustomTableId", ReferencedEntityNavigationPropertyName: "sample_sample_customtable_Team" });
    oneToMany_CustomTable.push({ SchemaName: "sample_sample_customtable_team_CustomTable2", ReferencingEntity: "team", ReferencedEntity: "sample_customtable", ReferencingAttribute: "sample_customtable2", ReferencedAttribute: "sample_customtableid", ReferencingEntityNavigationPropertyName: "sample_CustomTable2", ReferencedEntityNavigationPropertyName: "sample_sample_customtable_team_CustomTable2" });
    oneToMany_CustomTable.push({ SchemaName: "sample_sample_customtable_Account", ReferencingEntity: "account", ReferencedEntity: "sample_customtable", ReferencingAttribute: "sample_customtableid", ReferencedAttribute: "sample_customtableid", ReferencingEntityNavigationPropertyName: "sample_CustomTableId", ReferencedEntityNavigationPropertyName: "sample_sample_customtable_Account" });

    var manyToOne_CustomTable = [];
    manyToOne_CustomTable.push({ SchemaName: "sample_account_sample_customtable_Customer", ReferencingEntity: "sample_customtable", ReferencedEntity: "account", ReferencingAttribute: "sample_customerid", ReferencedAttribute: "accountid", ReferencingEntityNavigationPropertyName: "sample_CustomerId_account", ReferencedEntityNavigationPropertyName: "sample_account_sample_customtable_Customer" });
    manyToOne_CustomTable.push({ SchemaName: "sample_contact_sample_customtable_Customer", ReferencingEntity: "sample_customtable", ReferencedEntity: "contact", ReferencingAttribute: "sample_customerid", ReferencedAttribute: "contactid", ReferencingEntityNavigationPropertyName: "sample_CustomerId_contact", ReferencedEntityNavigationPropertyName: "sample_contact_sample_customtable_Customer" });

    var manyToMany_CustomTable = [];
    manyToMany_CustomTable.push({ Entity1LogicalName: "sample_customtable", Entity2LogicalName: "sample_customtable", Entity1NavigationPropertyName: "sample_sample_customtable_sample_Customtable1", Entity2NavigationPropertyName: "sample_sample_customtable_sample_Customtable1", SchemaName: "sample_sample_customtable_sample_Customtable1" });
    manyToMany_CustomTable.push({ Entity1LogicalName: "sample_customtable", Entity2LogicalName: "contact", Entity1NavigationPropertyName: "sample_sample_customtable_Contact1", Entity2NavigationPropertyName: "sample_sample_customtable_Contact1", SchemaName: "sample_sample_customtable_Contact1" });
    manyToMany_CustomTable.push({ Entity1LogicalName: "account", Entity2LogicalName: "sample_customtable", Entity1NavigationPropertyName: "sample_account_sample_customTable1", Entity2NavigationPropertyName: "sample_account_sample_customTable1", SchemaName: "sample_account_sample_customTable1" });

    var columns_CustomTable2 = [];

    columns_CustomTable2.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "new_Name", LogicalName: "new_name", IsPrimaryId: false, IsPrimaryName: true, AttributeType: "String", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 80, DisplayName: { UserLocalizedLabel: { Label: "Name (New)" } } });
    columns_CustomTable2.push({ "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata", SchemaName: "new_Name2", LogicalName: "new_name2", IsPrimaryId: false, IsPrimaryName: false, AttributeType: "String", IsValidForRead: true, IsValidForCreate: true, IsValidForUpdate: true, MaxLength: 80, DisplayName: { UserLocalizedLabel: { Label: "New Name 2 (New)" } } });

    var keys_CustomTable2 = [];
    keys_CustomTable2.push({ SchemaName: "new_SampleKey1", LogicalName: "new_samplekey1", EntityKeyIndexStatus: "Active", KeyAttributes: ["new_name"], DisplayName: { UserLocalizedLabel: { Label: "Sample Key 1 (New)" } } });
    keys_CustomTable2.push({ SchemaName: "new_SampleKey2", LogicalName: "new_samplekey2", EntityKeyIndexStatus: "Active", KeyAttributes: ["new_name", "new_name2"], DisplayName: { UserLocalizedLabel: { Label: "Sample Key 2 (New)" } } });

    var fakeData = "";
    queries.forEach(function (query) {
        if (query.EntitySetName.indexOf("contact") > -1) {
            var fakeDataQuery = JSON.parse(JSON.stringify(entity_Contact));
            var fakeColumns = [];
            columns_Contact.forEach(function (column) { fakeColumns.push(column); });
            fakeDataQuery.Attributes = fakeColumns;
            fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
        }

        if (query.EntitySetName.indexOf("team") > -1) {
            var fakeDataQuery = JSON.parse(JSON.stringify(entity_Team));
            var fakeColumns = [];
            columns_Team.forEach(function (column) { fakeColumns.push(column); });
            fakeDataQuery.Attributes = fakeColumns;
            fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
        }

        if (query.EntitySetName.indexOf("account") > -1) {
            var fakeDataQuery = JSON.parse(JSON.stringify(entity_Account));
            var fakeColumns = [];
            columns_Account.forEach(function (column) { fakeColumns.push(column); });
            fakeDataQuery.Attributes = fakeColumns;
            var fakeOneToMany = [];
            oneToMany_Account.forEach(function (relationship) { fakeOneToMany.push(relationship); });
            fakeDataQuery.OneToManyRelationships = fakeOneToMany;
            fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
        }

        if (query.EntitySetName.indexOf("systemuser") > -1) {
            var fakeDataQuery = JSON.parse(JSON.stringify(entity_User));
            var fakeColumns = [];
            columns_User.forEach(function (column) { fakeColumns.push(column); });
            fakeDataQuery.Attributes = fakeColumns;
            fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
        }

        if (query.EntitySetName.indexOf("sample_customtable") > -1) {

            if (query.Filters.indexOf("$expand=OptionSet") === -1) {
                var fakeDataQuery = JSON.parse(JSON.stringify(entity_CustomTable));
                var fakeColumns = [];
                columns_CustomTable.forEach(function (column) { fakeColumns.push(column); });
                fakeDataQuery.Attributes = fakeColumns;
                var fakeKeys = [];
                keys_CustomTable.forEach(function (key) { fakeKeys.push(key); });
                fakeDataQuery.Keys = fakeKeys;
                var fakeOneToMany = [];
                oneToMany_CustomTable.forEach(function (relationship) { fakeOneToMany.push(relationship); });
                fakeDataQuery.OneToManyRelationships = fakeOneToMany;
                var fakeManyToOne = [];
                manyToOne_CustomTable.forEach(function (relationship) { fakeManyToOne.push(relationship); });
                fakeDataQuery.ManyToOneRelationships = fakeManyToOne;
                var fakeManyToMany = [];
                manyToMany_CustomTable.forEach(function (relationship) { fakeManyToMany.push(relationship); });
                fakeDataQuery.ManyToManyRelationships = fakeManyToMany;

                fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
            } else {
                if (query.EntitySetName.indexOf("BooleanAttributeMetadata") > -1) {
                    var fakeDataQuery = { value: columns_values_CustomTable };
                    fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
                }

                if (query.EntitySetName.indexOf("Dynamics.CRM.MultiSelectPicklistAttributeMetadata") > -1) {
                    var fakeDataQuery = { value: columns_values_CustomTable1 };
                    fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
                }

                if (query.EntitySetName.indexOf("Dynamics.CRM.PicklistAttributeMetadata") > -1) {
                    var fakeDataQuery = { value: columns_values_CustomTable2 };
                    fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
                }
                if (query.EntitySetName.indexOf("Dynamics.CRM.StateAttributeMetadata") > -1) {
                    var fakeDataQuery = { value: columns_values_CustomTable3 };
                    fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
                }
                if (query.EntitySetName.indexOf("Dynamics.CRM.StatusAttributeMetadata") > -1) {
                    var fakeDataQuery = { value: columns_values_CustomTable4 };
                    fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
                }
            }
        }

        if (query.EntitySetName.indexOf("new_customtable") > -1) {
            var fakeDataQuery = JSON.parse(JSON.stringify(entity_CustomTable2));
            var fakeColumns = [];
            columns_CustomTable2.forEach(function (column) { fakeColumns.push(column); });
            fakeDataQuery.Attributes = fakeColumns;
            var fakeKeys = [];
            keys_CustomTable2.forEach(function (key) { fakeKeys.push(key); });
            fakeDataQuery.Keys = fakeKeys;
            fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
        }

        // #region Demo Data for Custom APIs
        if (query.EntitySetName.indexOf("customapis") > -1) {
            var fakeDataQuery = {
                value: [
                    { bindingtype: 0, boundentitylogicalname: null, name: "FetchXMLToSQL", uniquename: "FetchXMLToSQL", isfunction: true }
                ]
            };
            fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
        }
        if (query.EntitySetName.indexOf("customapirequestparameters") > -1) {
            var fakeDataQuery = {
                value: [
                    { isoptional: false, name: "FetchXml", type: 10, uniquename: "FetchXml", CustomAPIId: { uniquename: "FetchXMLToSQL" } },
                    { isoptional: true, name: "SubqueryCompatible", type: 0, uniquename: "SubqueryCompatible", CustomAPIId: { uniquename: "FetchXMLToSQL" } }
                ]
            };

            fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
        }
        if (query.EntitySetName.indexOf("customapiresponseproperties") > -1) {
            var fakeDataQuery = {
                value: [{ name: "Response", type: 10, uniquename: "Response", CustomAPIId: { uniquename: "FetchXMLToSQL" } }]
            };
            fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
        }
        // #endregion

        // #region Demo Data for Custom Actions
        if (query.EntitySetName.indexOf("workflows") > -1) {
            // TODO
        }
        if (query.EntitySetName.indexOf("sdkmessagerequestfields") > -1) {
            // TODO
        }
        if (query.EntitySetName.indexOf("sdkmessageresponsefields") > -1) {
            // TODO
        }
        // #endregion

        // #region Demo Data for System Views
        if (query.EntitySetName.indexOf("savedqueries") > -1) {
            var systemView_Demo = { value: [] };
            if (query.Filters.indexOf("account") > -1) { systemView_Demo.value.push({ savedqueryid: "56b534ca-beab-46e6-af0f-07489eaa1585", name: "Account System View", returnedtypecode: "account", isdefault: true, layoutxml: '<cell name="name" width="300" />' }); }
            if (query.Filters.indexOf("contact") > -1) { systemView_Demo.value.push({ savedqueryid: "509ec83b-b35b-44e5-9b77-084fdd240f2c", name: "Contact System View", returnedtypecode: "contact", isdefault: true, layoutxml: '<cell name="fullname" width="300" /><cell name="firstname" width="300" /><cell name="lastname" width="300" />' }); }
            if (query.Filters.indexOf("sample_customtable") > -1) { systemView_Demo.value.push({ savedqueryid: "bc336447-e902-4a08-9b98-b8b57ef71dce", name: "Custom Table System View", returnedtypecode: "sample_customtable", isdefault: true, layoutxml: '<cell name="sample_name" width="300" /><cell name="sample_name2" width="300" />' }); }
            if (query.Filters.indexOf("systemuser") > -1) { systemView_Demo.value.push({ savedqueryid: "7a89a602-b556-456d-b28b-ca6eb6bebc44", name: "User System View", returnedtypecode: "systemuser", isdefault: true, layoutxml: '<cell name="fullname" width="300" /><cell name="firstname" width="300" /><cell name="lastname" width="300" />' }); }
            if (query.Filters.indexOf("team") > -1) { systemView_Demo.value.push({ savedqueryid: "0dfa59de-eb8b-4fa3-ae22-b89c4eabaf34", name: "Team System View", returnedtypecode: "team", isdefault: true, layoutxml: '<cell name="name" width="300" />' }); }

            var fakeDataQuery = JSON.parse(JSON.stringify(systemView_Demo));
            fakeData += fakeHeaderStart + JSON.stringify(fakeDataQuery) + emptyLine;
        }
        // #endregion
    });

    fakeData += fakeHeaderEnd;
    // check if the response is empty, we add the start header
    if (fakeData === fakeHeaderEnd) { fakeData = fakeHeaderStart + emptyLine + fakeHeaderEnd; }

    return fakeData;
}

/**
 * Get Demo Data based on parameters
 * @param {string} entitySetName Entity Set Name
 * @param {string} filters Filter
 * @param {boolean} singleRecord If the demo is of a single record
 */
DRB.Xrm.GetDemoData = function (entitySetName, filters, singleRecord) {
    var fakeData = { value: [] };

    switch (entitySetName) {
        case "EntityDefinitions":
            fakeData.value.push({ ObjectTypeCode: 2, SchemaName: "Contact", LogicalName: "contact", EntitySetName: "contacts", PrimaryIdAttribute: "contactid", PrimaryNameAttribute: "fullname" });
            fakeData.value.push({ ObjectTypeCode: 9, SchemaName: "Team", LogicalName: "team", EntitySetName: "teams", PrimaryIdAttribute: "teamid", PrimaryNameAttribute: "name" });
            fakeData.value.push({ ObjectTypeCode: 8, SchemaName: "SystemUser", LogicalName: "systemuser", EntitySetName: "systemusers", PrimaryIdAttribute: "systemuserid", PrimaryNameAttribute: "fullname", DisplayName: { UserLocalizedLabel: { Label: "User" } } });
            fakeData.value.push({ ObjectTypeCode: 10001, SchemaName: "sample_CustomTable", LogicalName: "sample_customtable", EntitySetName: "sample_customtables", PrimaryIdAttribute: "sample_customtableid", PrimaryNameAttribute: "sample_name", DisplayName: { UserLocalizedLabel: { Label: "Custom Table" } } });
            // fakeData.value.push({ ObjectTypeCode: 10002, SchemaName: "new_CustomTable", LogicalName: "new_customtable", EntitySetName: "new_customtables", PrimaryIdAttribute: "new_customtableid", PrimaryNameAttribute: "new_name", DisplayName: { UserLocalizedLabel: { Label: "Custom Table (New)" } } });
            fakeData.value.push({ ObjectTypeCode: 1, SchemaName: "Account", LogicalName: "account", EntitySetName: "accounts", PrimaryIdAttribute: "accountid", PrimaryNameAttribute: "name" });
            break;
        case "systemusers":
            fakeData.value.push({ systemuserid: "11111111-1111-1111-1111-111111111111", fullname: "User 1", azureactivedirectoryobjectid: "22222222-2222-2222-2222-222222222222" });
            break;
        case "userqueries":
            fakeData.value.push({ userqueryid: "9650cd65-fe3e-4d71-b1ef-e2e2e61edcdb", name: "Contact Personal View", returnedtypecode: "contact" });
            fakeData.value.push({ userqueryid: "8470fc1b-220c-4353-a4e8-e9c91ebf8185", name: "Custom Table Personal View", returnedtypecode: "sample_customtable" });
            fakeData.value.push({ userqueryid: "cd8757ee-731f-46f2-ba19-97f7a608cb4a", name: "Account Personal View", returnedtypecode: "account" });
            break;
    }

    return fakeData;
}

DRB.Xrm.GetDemoMetadata = function () {
    return `<?xml version="1.0" encoding="utf-8"?>
<Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
    <ComplexType Name="ImportSolutionAsyncResponse">
        <Property Name="ImportJobKey" Type="Edm.String" Unicode="false" />
        <Property Name="AsyncOperationId" Type="Edm.Guid" />
    </ComplexType>
    <Action Name="ImportSolutionAsync">
        <Parameter Name="OverwriteUnmanagedCustomizations" Type="Edm.Boolean" Nullable="false" />
        <Parameter Name="PublishWorkflows" Type="Edm.Boolean" Nullable="false" />
        <Parameter Name="CustomizationFile" Type="Edm.Binary" />
        <Parameter Name="ConvertToManaged" Type="Edm.Boolean" />
        <Parameter Name="SkipProductUpdateDependencies" Type="Edm.Boolean" />
        <Parameter Name="HoldingSolution" Type="Edm.Boolean" />
        <Parameter Name="SkipQueueRibbonJob" Type="Edm.Boolean" />
        <Parameter Name="LayerDesiredOrder" Type="mscrm.LayerDesiredOrder" />
        <Parameter Name="AsyncRibbonProcessing" Type="Edm.Boolean" />
        <Parameter Name="ComponentParameters" Type="Collection(mscrm.crmbaseentity)" />
        <Parameter Name="SolutionParameters" Type="mscrm.SolutionParameters" />
        <Parameter Name="IsTemplateMode" Type="Edm.Boolean" />
        <Parameter Name="TemplateSuffix" Type="Edm.String" Unicode="false" />
        <ReturnType Type="mscrm.ImportSolutionAsyncResponse" Nullable="false" />
    </Action>
    <Action Name="ConvertOwnerTeamToAccessTeam" IsBound="true">
        <Parameter Name="entity" Type="mscrm.team" Nullable="false" />
    </Action>
    <Action Name="AddMembersTeam" IsBound="true">
        <Parameter Name="entity" Type="mscrm.team" Nullable="false" />
        <Parameter Name="Members" Type="Collection(mscrm.systemuser)" Nullable="false" />
    </Action>
    <Action Name="RemoveMembersTeam" IsBound="true">
        <Parameter Name="entity" Type="mscrm.team" Nullable="false" />
        <Parameter Name="Members" Type="Collection(mscrm.systemuser)" Nullable="false" />
    </Action>
    <ComplexType Name="AddUserToRecordTeamResponse">
        <Property Name="AccessTeamId" Type="Edm.Guid" />
    </ComplexType>
    <Action Name="AddUserToRecordTeam" IsBound="true">
        <Parameter Name="entity" Type="mscrm.systemuser" Nullable="false" />
        <Parameter Name="Record" Type="mscrm.crmbaseentity" Nullable="false" />
        <Parameter Name="TeamTemplate" Type="mscrm.teamtemplate" Nullable="false" />
        <ReturnType Type="mscrm.AddUserToRecordTeamResponse" Nullable="false" />
    </Action>
    <ComplexType Name="RetrieveTeamPrivilegesResponse">
        <Property Name="RolePrivileges" Type="Collection(mscrm.RolePrivilege)" />
    </ComplexType>
    <Function Name="RetrieveTeamPrivileges" IsBound="true">
        <Parameter Name="entity" Type="mscrm.team" Nullable="false" />
        <ReturnType Type="mscrm.RetrieveTeamPrivilegesResponse" Nullable="false" />
    </Function>
    <ComplexType Name="RetrievePrincipalAccessResponse">
        <Property Name="AccessRights" Type="mscrm.AccessRights" />
    </ComplexType>
    <Function Name="RetrievePrincipalAccess" IsBound="true">
        <Parameter Name="entity" Type="mscrm.systemuser" Nullable="false" />
        <Parameter Name="Target" Type="mscrm.crmbaseentity" Nullable="false" />
        <ReturnType Type="mscrm.RetrievePrincipalAccessResponse" Nullable="false" />
    </Function>
    <ComplexType Name="FetchXmlToQueryExpressionResponse">
        <Property Name="Query" Type="mscrm.QueryExpression" />
    </ComplexType>
    <Function Name="FetchXmlToQueryExpression">
        <Parameter Name="FetchXml" Type="Edm.String" Nullable="false" Unicode="false" />
        <ReturnType Type="mscrm.FetchXmlToQueryExpressionResponse" Nullable="false" />
    </Function>
    <ComplexType Name="WhoAmIResponse">
        <Property Name="BusinessUnitId" Type="Edm.Guid" />
        <Property Name="UserId" Type="Edm.Guid" />
        <Property Name="OrganizationId" Type="Edm.Guid" />
    </ComplexType>
    <Function Name="WhoAmI">
        <ReturnType Type="mscrm.WhoAmIResponse" Nullable="false" />
    </Function>
    <ComplexType Name="RetrieveCurrentOrganizationResponse">
        <Property Name="Detail" Type="mscrm.OrganizationDetail"/>
    </ComplexType>
    <Function Name="RetrieveCurrentOrganization">
        <Parameter Name="AccessType" Type="mscrm.EndpointAccessType" Nullable="false"/>
        <ReturnType Type="mscrm.RetrieveCurrentOrganizationResponse" Nullable="false"/>
    </Function>
    <EnumType Name="EndpointAccessType">
        <Member Name="Default" Value="0"/>
        <Member Name="Internet" Value="1"/>
        <Member Name="Intranet" Value="2"/>
    </EnumType>
    <EnumType Name="EntityFilters" IsFlags="true">
        <Member Name="Entity" Value="1"/>
        <Member Name="Attributes" Value="2"/>
        <Member Name="Privileges" Value="4"/>
        <Member Name="Relationships" Value="8"/>
        <Member Name="All" Value="15"/>
    </EnumType>
    <ComplexType Name="RetrieveEntityResponse">
        <Property Name="EntityMetadata" Type="mscrm.ComplexEntityMetadata"/>
    </ComplexType>
    <Function Name="RetrieveEntity">
        <Parameter Name="EntityFilters" Type="mscrm.EntityFilters" Nullable="false"/>
        <Parameter Name="LogicalName" Type="Edm.String" Unicode="false">
            <Annotation Term="Org.OData.Core.V1.OptionalParameter"/>
        </Parameter>
        <Parameter Name="MetadataId" Type="Edm.Guid" Nullable="false"/>
        <Parameter Name="RetrieveAsIfPublished" Type="Edm.Boolean" Nullable="false"/>
        <ReturnType Type="mscrm.RetrieveEntityResponse" Nullable="false"/>
    </Function>
    <Function Name="Between">
        <Parameter Name="PropertyName" Type="Edm.String" Nullable="false" Unicode="false" />
        <Parameter Name="PropertyValues" Type="Collection(Edm.String)" Nullable="false" Unicode="false" />
        <ReturnType Type="Edm.Boolean" Nullable="false" />
    </Function>  
</Schema>`;
}
// #endregion  
 
﻿// #region DRB.Models
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

        case "ManagedProperty":
            this.OptionValues = [];
            this.OptionValues.push(new DRB.Models.OptionSetValue(false, "False"));
            this.OptionValues.push(new DRB.Models.OptionSetValue(true, "True"));
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

    this.SystemViews = [];
    this.PersonalViews = [];
    this.HasHierarchy = false;

    this.ColumnsLoaded = false;
    this.RelationshipsLoaded = false;
    this.AlternateKeysLoaded = false;
    this.SystemViewsLoaded = false;
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
 * Models - System View
 * @param {string} id Id
 * @param {string} name Name
 * @param {string} tableLogicalName Table Logical Name
 * @param {bool} isDefault Is Default
 * @param {string} layoutXml Layout XML
 */
DRB.Models.SystemView = function (id, name, tableLogicalName, isDefault, layoutXml) {
    this.Id = id;
    this.Name = name;
    this.TableLogicalName = tableLogicalName;
    this.IsDefault = isDefault;
    this.LayoutXml = layoutXml;

    this.ToDropdownOption = function () { return new DRB.Models.DropdownOption(this.Id, this.Name, this.TableLogicalName); }
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
 
// #region DRB.UI
// #region bootstrap-select Functions
/**
 * Refresh a dropdown
 * @param {string} id Id
 */
DRB.UI.RefreshDropdown = function (id) {
    $("#" + id).selectpicker("refresh");
}

/**
 * Lock a dropdown
 * @param {string} id Id
 */
DRB.UI.LockDropdown = function (id) {
    $("#" + id).prop("disabled", "true");
    DRB.UI.RefreshDropdown(id);
}

/**
 * Unlock a dropdown
 * @param {string} id Id
 */
DRB.UI.UnlockDropdown = function (id) {
    $("#" + id).prop("disabled", "");
    DRB.UI.RefreshDropdown(id);
}

/**
 * Unselect a dropdown
 * @param {string} id Id
 */
DRB.UI.UnselectDropdown = function (id) {
    $("#" + id).val(null).change();
    DRB.UI.RefreshDropdown(id);
}

/**
 * Render a dropdown as disabled
 * @param {string} id Id
 * @param {string} title Title
 */
DRB.UI.ResetDropdown = function (id, title) {
    // empty() required for a strange bug on the update of title when no entries are selected in a multiselect optionset
    $("#" + id).empty();
    $("#" + id).selectpicker("destroy").prop("title", title);
    DRB.UI.LockDropdown(id);
}

/**
 * Fill a dropdown as enabled
 * @param {string} id Id
 * @param {string} title Title
 * @param {any} options Options
 * @param {boolean} disabledOptions If options are disabled
 * @param {boolean} showGroups If groups are shown
 * @param {boolean} hideSubText if Sub Text is hidden
 */
DRB.UI.FillDropdown = function (id, title, options, disabledOptions, showGroups, hideSubText, size) {
    var htmlOptions = "";
    var subTextProperty = "SubText";

    var groups = [];
    if (showGroups === true) {
        subTextProperty = "SubText2";
        options.forEach(function (dropOption) { if (groups.indexOf(dropOption.SubText) === -1) { groups.push(dropOption.SubText); } });
        groups.sort();
    } else { groups.push("No Groups"); } // we need at least an element for the next forEach

    groups.forEach(function (group) {
        if (showGroups === true) { htmlOptions += '<optgroup label="' + group + '">'; }
        options.forEach(function (dropOption) {
            if (dropOption.SubText == group || showGroups !== true) {
                htmlOptions += '<option value="' + dropOption.Value + '"';
                var showSubText = false;
                if (DRB.Utilities.HasValue(dropOption[subTextProperty])) { showSubText = true; }

                if (showSubText === true && hideSubText !== true) { htmlOptions += ' data-subtext="' + dropOption[subTextProperty] + '"'; }
                if (disabledOptions === true) { htmlOptions += ' disabled'; }
                htmlOptions += '>' + dropOption.Label + '</option>';
            }
        });
        if (showGroups === true) { htmlOptions += "</optgroup>"; }
    });

    $("#" + id).empty();
    if (htmlOptions !== "") { $("#" + id).html(htmlOptions); }
    if (DRB.Utilities.HasValue(size)) {
        $("#" + id).selectpicker({ title: title, size: size });
    } else {
        $("#" + id).selectpicker({ title: title, size: 10 });
    }
    DRB.UI.UnlockDropdown(id);
}

/**
 * Fill a Dropdown with Groups defined by the SubText Property
 * @param {string} id Id
 * @param {string} title Title
 * @param {any} options Options
 * @param {boolean} disabled If options are disabled
 */
DRB.UI.FillDropdownWithGroups = function (id, title, options, disabled) {
    DRB.UI.FillDropdown(id, title, options, disabled, true);
}
// #endregion

// #region bootbox.js Functions
/**
 * Display Dialog (internal function)
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} className Class Name
 * @param {string} size Size
 * @param {Function} okCallBack Function to call when OK is pressed
 * @param {boolean} askQuestion If show the dialog as a question
 */
DRB.UI.DisplayDialog = function (title, message, className, size, okCallBack, askQuestion, confirmLabel, cancelLabel) {
    bootbox.hideAll();
    var properties = { message: message, centerVertical: true, buttons: { ok: { label: "OK", className: className } } };
    if (DRB.Utilities.HasValue(title)) { properties.title = title; }
    if (DRB.Utilities.HasValue(size)) { properties.size = size; }

    if (!DRB.Utilities.HasValue(className)) { properties.closeButton = false; properties.buttons = {}; }

    if (DRB.Utilities.HasValue(okCallBack) && askQuestion !== true) {
        properties.closeButton = false;
        properties.buttons = { ok: { label: "OK", className: className, callback: okCallBack } }
    }

    if (DRB.Utilities.HasValue(okCallBack) && askQuestion === true) {
        properties.closeButton = true;
        if (!DRB.Utilities.HasValue(confirmLabel)) { confirmLabel = "Yes"; }
        if (!DRB.Utilities.HasValue(cancelLabel)) { cancelLabel = "No"; }
        properties.buttons = { cancel: { label: cancelLabel }, confirm: { label: confirmLabel, className: className } };
        properties.callback = function (result) { if (result === true) { okCallBack(); } };
        bootbox.confirm(properties);
    } else {
        bootbox.dialog(properties);
    }
}

/**
 * Show a message
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} size Size
 * @param {Function} okCallBack Function to call when OK is pressed
 */
DRB.UI.Show = function (title, message, size, okCallBack) {
    DRB.UI.DisplayDialog("<span class='text-primary'>" + title + "</span>", message, "btn-primary", size, okCallBack);
}

/**
 * Show an error message
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} size Size
 * @param {Function} okCallBack Function to call when OK is pressed
 */
DRB.UI.ShowError = function (title, message, size, okCallBack) {
    DRB.UI.DisplayDialog("<span class='text-danger'>" + title + "</span>", message, "btn-danger", size, okCallBack);
}

/**
 * Show a loading message
 * @param {string} message Message
 * @param {string} size Size
 */
DRB.UI.ShowLoading = function (message, size) {
    var loadingMessage = '<p class="text-center mb-0">' + message + '</p><br /><div class="d-flex justify-content-center"><div class="spinner-border spinner-border-sm" role="status"><span class="sr-only"></span></div></div>';
    DRB.UI.DisplayDialog(null, loadingMessage, null, size);
}

/**
 * Show a loading message
 * @param {string} message Message
 * @param {string} size Size
 */
DRB.UI.ShowMessage = function (message, size) {
    var loadingMessage = '<p class="text-center mb-0">' + message + '</p>';
    DRB.UI.DisplayDialog(null, loadingMessage, null, size);
}

/**
 * Show a question
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} size Size
 * @param {Function} comfirmCallBack Function to call when Yes is pressed
 */
DRB.UI.ShowQuestion = function (title, message, size, comfirmCallBack) {
    DRB.UI.DisplayDialog("<span class='text-danger'>" + title + "</span>", message, "btn-danger", size, comfirmCallBack, true);
}

/**
 * Show a question
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} size Size
 * @param {Function} comfirmCallBack Function to call when Yes is pressed
 */
DRB.UI.ShowExport = function (title, message, size, comfirmCallBack) {
    DRB.UI.DisplayDialog("<span class='text-primary'>" + title + "</span>", message, "btn-primary", size, comfirmCallBack, true, "Export", "Cancel");
}

/**
 * Hide Loading
 */
DRB.UI.HideLoading = function () {
    bootbox.hideAll();
}
// #endregion

// #region HTML Helpers
/**
 * UI - Create a spacer 
 */
DRB.UI.CreateSpacer = function () {
    return $("<div>", { class: "spacer" });
}

/**
 * UI - Create External Link
 * @param {string} link Link
 * @param {string} name Name
 * @param {string} className Class Name
 */
DRB.UI.CreateExternalLink = function (link, name, className) {
    if (!DRB.Utilities.HasValue(className)) { className = ""; }
    return $("<a>", { target: "_blank", href: link, text: name, class: className });
}

DRB.UI.CreateSpacing = function () {
    return $("<div>", { html: "<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />" });
}

/**
 * Create an Input File
 * @param {string} id Id
 * @param {boolean} hidden Hidden
 * @param {Function} event Function to call when the button is clicked
 */
DRB.UI.CreateInputFile = function (id, hidden, event) {
    var displayStyle = "block";
    if (hidden === true) { displayStyle = "none"; }
    return $("<input>", { id: id, type: "file", style: "display: " + displayStyle }).on("change", function (e) { event(e); });
}

/**
 * Create a Checkbox
 * @param {string} id Id
 * @param {string} text Text
 * @param {boolean} checked Checkbox status
 */
DRB.UI.CreateCheckbox = function (id, text, className, checked) {
    return $("<label>", { html: text + " " }).append($("<input>", { id: id, type: "checkbox", class: className, checked: checked }));
}

/**
 * Create a Button
 * @param {string} id Id
 * @param {string} text Text
 * @param {string} className Class Name
 * @param {Function} event Function to call when the button is clicked
 * @param {Function} parameter Parameter passed to the function
 */
DRB.UI.CreateButton = function (id, text, className, event, parameter, parameter2, parameter3, parameter4, parameter5, parameter6) {
    if (!DRB.Utilities.HasValue(className)) { className = "btn-primary"; }
    return $("<button>", { id: id, html: text, class: "btn " + className }).click(function () {
        if (DRB.Utilities.HasValue(event)) {
            event(parameter, parameter2, parameter3, parameter4, parameter5, parameter6);
        }
    });
}

/**
 * Create a Lookup
 * @param {string} id Id
 * @param {Function} event Function to call when the button is clicked
 * @param {Function} parameter Parameter passed to the function
 */
DRB.UI.CreateLookup = function (id, event, parameter) {
    return $("<button>", { id: id, class: "searchbutton" }).click(function () { event(parameter); }).append($("<span>", { "aria-hidden": true, html: "&telrec;" }));
}

/**
 * Create a Close Button
 * @param {Function} event Function to call when the button is clicked
 * @param {any} parameter Parameter of the event
 */
DRB.UI.CreateCloseButton = function (event, parameter, parameter2, parameter3) {
    return $("<button>", { class: "close", "aria-label": "Close" }).click(function () { event(parameter, parameter2, parameter3); }).append($("<span>", { "aria-hidden": true, html: "&times;" }));
}

DRB.UI.CreateRemoveButton = function (event, parameter, parameter2, parameter3, parameter4, parameter5, parameter6) {
    return $("<button>", { class: "closebutton" }).click(function (e) { e.stopPropagation(); event(parameter, parameter2, parameter3, parameter4, parameter5, parameter6); }).append($("<span>", { html: "&times;" }));
}

DRB.UI.CreateUpButton = function (id, event, parameter, parameter2, parameter3, parameter4, parameter5, parameter6) {
    return $("<button>", { id: id, class: "closebutton" }).click(function () { event(parameter, parameter2, parameter3, parameter4, parameter5, parameter6); }).append($("<span>", { html: "&uarr;" }));
}

DRB.UI.CreateDownButton = function (id, event, parameter, parameter2, parameter3, parameter4, parameter5, parameter6) {
    return $("<button>", { id: id, class: "closebutton" }).click(function () { event(parameter, parameter2, parameter3, parameter4, parameter5, parameter6); }).append($("<span>", { html: "&darr;" }));
}

DRB.UI.CreateEmptyArrowButton = function (id) {
    return $("<button>", { id: id, class: "disabledclose" }).append($("<span>", { html: "&darr;" }));
}

DRB.UI.CreateEmptyRemoveButton = function () {
    return $("<button>", { class: "disabledclose" }).append($("<span>", { html: "&times;" }));
}

/**
 * Create a textarea
 * @param {string} id Id
 * @param {string} className Class Name
 */
DRB.UI.CreateTextArea = function (id, className) {
    var textAreaProperties = {};
    if (DRB.Utilities.HasValue(id)) { textAreaProperties.id = id; }
    if (DRB.Utilities.HasValue(className)) { textAreaProperties.class = className; }
    return $("<textarea>", textAreaProperties);
}

/**
 * Create an empty div
 * @param {string} id Id
 * @param {string} className Class Name
 */
DRB.UI.CreateEmptyDiv = function (id, className) {
    var divProperties = {};
    if (DRB.Utilities.HasValue(id)) { divProperties.id = id; }
    if (DRB.Utilities.HasValue(className)) { divProperties.class = className; }
    return $("<div>", divProperties);
}

/**
 * Create a container (half screen)
 * @param {string} title Title
 */
DRB.UI.CreateHalfContainer = function (title) {
    return DRB.UI.CreateEmptyDiv(null, "col-lg-6").append($("<h4>", { text: title }));
}

/**
 * Create a container (full screen)
 * @param {string} title Title
 */
DRB.UI.CreateWideContainerWithId = function (id, title) {
    return DRB.UI.CreateEmptyDiv(null, "col-lg-12").append($("<h4>", { id: id, text: title }));
}

/**
 * Create a container (full screen)
 * @param {string} title Title
 */
DRB.UI.CreateWideContainer = function (title) {
    return DRB.UI.CreateEmptyDiv(null, "col-lg-12").append($("<h4>", { text: title }));
}

/**
 * Create a sub container
 * @param {string} title Title
 */
DRB.UI.CreateSubContainerWithId = function (id, title) {
    return DRB.UI.CreateEmptyDiv().append($("<h5>", { id: id, text: title }));
}

/**
 * Create a sub container
 * @param {string} title Title
 */
DRB.UI.CreateSubContainer = function (title) {
    return DRB.UI.CreateEmptyDiv().append($("<h5>", { text: title }));
}

/**
 * Create a paragraph
 * @param {string} text
 */
DRB.UI.CreateParagraph = function (text) {
    return $("<p>", { html: text });
}

/**
 * Create an empty paragraph
 * @param {string} id
 */
DRB.UI.CreateEmptyParagraph = function (id) {
    return $("<p>", { id: id });
}

/**
 * Create a hr
 */
DRB.UI.CreateHr = function () {
    return $("<hr>");
}

/**
 * Create a br
 */
DRB.UI.CreateBr = function () {
    return $("<br />");
}

/**
 * Create a span
 * @param {string} id Id
 * @param {string} text Text
 * @param {string} smallText Small Text
 * @param {string} className Class Name
 */
DRB.UI.CreateSpan = function (id, text, smallText, className) {
    if (DRB.Utilities.HasValue(smallText)) {
        if (smallText.indexOf("{{") === 0) {
            text = text + " <small>" + smallText + "</small>";
        } else {
            text = text + " <small>(" + smallText + ")</small>";
        }
    }
    if (!DRB.Utilities.HasValue(className)) { className = ""; }
    return $("<span>", { id: id, html: text, class: className });
}

/**
 * Create an input
 * @param {string} id Id
 * @param {number} maxLength Max Length
 */
DRB.UI.CreateInput = function (id, placeholder, maxLength, width) {
    if (!DRB.Utilities.HasValue(maxLength)) { maxLength = 100; };
    if (!DRB.Utilities.HasValue(width)) { width = "100%"; };
    return $("<input>", { id: id, class: "form-control", style: "width: " + width, type: "text", autocomplete: "off", maxlength: maxLength, placeholder: placeholder });
}

/**
 * Create an input for Guid
 * @param {string} id Id
 * @param {number} maxLength Max Length
 */
DRB.UI.CreateInputGuid = function (id) {
    return $("<input>", { id: id, class: "form-control", style: "width: 340px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", maxlength: 36, title: "Guid", placeholder: "00000000-0000-0000-0000-000000000000" });
}

DRB.UI.CreateInputString = function (id, maxLength, placeholder) {
    var inputProperties = { id: id, class: "form-control", style: "width: 340px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", placeholder: "Text" };
    if (DRB.Utilities.HasValue(maxLength)) { inputProperties.maxLength = maxLength; }
    if (DRB.Utilities.HasValue(placeholder)) { inputProperties.placeholder = placeholder; }
    return $("<input>", inputProperties);
}

DRB.UI.CreateInputLongString = function (id, maxLength, placeholder) {
    var inputProperties = { id: id, class: "form-control", style: "width: 540px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", placeholder: "Text" };
    if (DRB.Utilities.HasValue(maxLength)) { inputProperties.maxLength = maxLength; }
    if (DRB.Utilities.HasValue(placeholder)) { inputProperties.placeholder = placeholder; }
    return $("<input>", inputProperties);
}

DRB.UI.CreateInputStringPowerAutomate = function (id) {
    return $("<input>", { id: id, readonly: "readonly", class: "form-control", style: "width: 600px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off" });
}

DRB.UI.CreateInputDateTime = function (id, behavior, placeholder) {
    if (!DRB.Utilities.HasValue(placeholder)) { placeholder = "Date Time"; }
    return $("<input>", { id: id, readonly: "readonly", "data-datetimebehavior": behavior, class: "form-control", style: "width: 340px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", title: placeholder, placeholder: placeholder });
}

DRB.UI.CreateInputMemo = function (id, maxLength, placeholder) {
    if (!DRB.Utilities.HasValue(maxLength)) { maxLength = 100; }
    if (!DRB.Utilities.HasValue(placeholder)) { placeholder = "Multiline Text"; }
    return $("<textarea>", { id: id, class: "form-control", style: "width: 340px; height: 34px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", maxlength: maxLength, title: placeholder, placeholder: placeholder });
}

DRB.UI.CreateInputNumber = function (id, placeholder) {
    if (!DRB.Utilities.HasValue(placeholder)) { placeholder = "Integer"; }
    return $("<input>", { id: id, class: "form-control", style: "width: 340px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", title: placeholder, placeholder: placeholder });
}

DRB.UI.CreateInputTopCount = function (id) {
    var placeholder = "Max 5000";
    return $("<input>", { id: id, class: "form-control", style: "width: 100px; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", title: placeholder, placeholder: placeholder });
}

DRB.UI.CreateInputNextLink = function (id) {
    return $("<input>", { id: id, class: "form-control", style: "width: 90%; height: 28px; margin-left: 10px; display: inline;", type: "text", autocomplete: "off", title: "@odata.nextLink url", placeholder: "@odata.nextLink url" });
}

DRB.UI.CreateImage = function (id, content) {
    return $("<img>", { id: id, src: content, style: "max-width: 768px;" });
}

/**
 * Create an input with a prefix
 * @param {string} id Id
 * @param {string} prefixId Prefix Id
 * @param {string} prefix Prefix
 * @param {number} maxLength Max Length
 */
DRB.UI.CreateInputWithPrefix = function (id, prefixId, prefix, maxLength) {
    var div = $("<div>", { class: "input-group" });
    var divPrefix = $("<div>", { class: "input-group-prepend" });
    var span = DRB.UI.CreateSpan(prefixId, prefix, null, "input-group-text");
    var input = DRB.UI.CreateInput(id, maxLength);

    divPrefix.append(span);
    div.append(divPrefix);
    div.append(input);
    return div;
}

/**
 * Create a dropdown (without search and without sub text)
 * @param {string} id Id
 */
DRB.UI.CreateSimpleDropdown = function (id) {
    return $("<select>", { id: id, class: "selectpicker", "data-width": "fit", "data-dropup-auto": "false" });
}

/**
 * Create a dropdown
 * @param {string} id Id
 * @param {boolean} multiSelect If the dropdown allows multi selection
 * @param {boolean} actionBox if action buttons (Select All, Deselect All) should be visible
 */
DRB.UI.CreateDropdown = function (id, multiSelect, actionBox) {
    var selectProperties = { id: id, class: "selectpicker", "data-live-search": "true", "data-width": "fit", "data-show-subtext": "true", "data-dropup-auto": "false" };
    if (multiSelect === true) {
        selectProperties["multiple"] = "multiple";
        selectProperties["data-selected-text-format"] = "count > 0";
        if (actionBox === true) { selectProperties["data-actions-box"] = "true"; }
    }
    return $("<select>", selectProperties);
}

DRB.UI.CreateTabs = function (id, tabs) {
    var ul = $("<ul>", { id: id, class: "nav nav-tabs" });
    tabs.forEach(function (tab, tabIndex) {
        var aClass = "nav-link";
        if (tabIndex === 0) { aClass += " active"; }
        var a = $("<a>", { id: "a_" + tab.Id, class: aClass, "data-bs-toggle": "tab", href: "#" + tab.Id, text: tab.Name });
        var li = $('<li>', { class: "nav-item" }).html(a);
        ul.append(li);
    });
    return ul;
}

DRB.UI.CreateTabContents = function (id, tabs) {
    var div = $("<div>", { id: id, class: "tab-content" });
    tabs.forEach(function (tab, tabIndex) {
        var subDivClass = "tab-pane";
        if (tabIndex === 0) { subDivClass += " active show"; }
        var subDiv = $("<div>", { id: tab.Id, class: subDivClass });
        div.append(subDiv);
    });
    return div;
}

DRB.UI.CreateTable = function (id) {
    return $("<table>", { id: id, class: "tablefix" });
}

DRB.UI.CreateTr = function (id) {
    return $("<tr>", { id: id });
}

DRB.UI.CreateTd = function (id) {
    return $("<td>", { id: id });
}
// #endregion

// #region Model Driven Apps helper
DRB.UI.OpenLookup = function (settings) {
    // set lookupOptions
    var lookupOptions = null;
    if (settings.openView === true) {
        if (DRB.Utilities.HasValue(DRB.Metadata.QueryObjectTypeCode)) {
            lookupOptions = {
                defaultEntityType: "savedquery", entityTypes: ["savedquery"], allowMultiSelect: false,
                filters: [{ filterXml: "<filter type='and'><condition attribute='returnedtypecode' operator='eq' value='" + DRB.Metadata.QueryObjectTypeCode + "' /></filter>", entityLogicalName: "savedquery" }]
            };
        }
    }

    if (settings.openWorkflow === true) {
        if (DRB.Utilities.HasValue(DRB.Metadata.QueryObjectTypeCode)) {
            lookupOptions = {
                defaultEntityType: "workflow", entityTypes: ["workflow"], allowMultiSelect: false,
                filters: [{ filterXml: "<filter type='and'><condition attribute='statecode' operator='eq' value='1' /><condition attribute='ondemand' operator='eq' value='1' /><condition attribute='primaryentity' operator='eq' value='" + DRB.Metadata.QueryObjectTypeCode + "' /></filter>", entityLogicalName: "workflow" }]
            };
        }
    }

    if (settings.openUser === true) {
        lookupOptions = { defaultEntityType: "systemuser", entityTypes: ["systemuser"], allowMultiSelect: false };
    }

    if (settings.openPrimaryEntity === true) {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
            var entityLogicalName = DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName;
            lookupOptions = { defaultEntityType: entityLogicalName, entityTypes: [entityLogicalName], allowMultiSelect: false };
        }
    }

    if (settings.openSecondaryEntity === true) {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.secondaryEntity)) {
            var entityLogicalName = DRB.Metadata.CurrentNode.data.configuration.secondaryEntity.logicalName;
            lookupOptions = { defaultEntityType: entityLogicalName, entityTypes: [entityLogicalName], allowMultiSelect: false };
        }
    }

    if (settings.openCustom === true) {
        if (DRB.Utilities.HasValue(settings.defaultEntityType) && DRB.Utilities.HasValue(settings.entityTypes)) {
            lookupOptions = { defaultEntityType: settings.defaultEntityType, entityTypes: settings.entityTypes, allowMultiSelect: false };
        }
    }

    if (settings.openBaseEntity === true) {
        if (DRB.Utilities.HasValue(settings.defaultEntityType)) {
            lookupOptions = { defaultEntityType: settings.defaultEntityType, entityTypes: [settings.defaultEntityType], allowMultiSelect: false };
        }
    }

    // if lookupOptions is valid show the selection, otherwise show the error
    if (DRB.Utilities.HasValue(lookupOptions)) {
        // XTB Mode
        if (DRB.Xrm.IsXTBMode()) {
            DRB.UI.Show("XrmToolBox Mode", "Lookup is not available inside XrmToolBox.<br />A random Guid has been generated.");
            $("#" + settings.textId).val(DRB.Utilities.GenerateGuid()).trigger("input").change();
            return;
        }

        // JWT Mode
        if (DRB.Xrm.IsJWTMode()) {
            DRB.UI.Show("JWT Mode", "Lookup is not available in JWT Mode.<br />A random Guid has been generated.");
            $("#" + settings.textId).val(DRB.Utilities.GenerateGuid()).trigger("input").change();
            return;
        }

        // DVDT Mode
        if (DRB.Xrm.IsDVDTMode()) {
            DRB.UI.Show("DVDT Mode", "Lookup is not available inside DVDT.<br />A random Guid has been generated.");
            $("#" + settings.textId).val(DRB.Utilities.GenerateGuid()).trigger("input").change();
            return;
        }

        // Demo Mode
        if (DRB.Xrm.IsDemoMode()) {
            DRB.UI.Show("Demo Mode", "Lookup is not available in Demo Mode.<br />A random Guid has been generated.");
            $("#" + settings.textId).val(DRB.Utilities.GenerateGuid()).trigger("input").change();
            return;
        }

        DRB.Xrm.GetXrmObject().Utility.lookupObjects(lookupOptions).then(
            function (success) {
                if (success.length > 0) {
                    $("#" + settings.textId).val(success[0].id).trigger("input").change();
                    if (DRB.Utilities.HasValue(settings.dropdownId)) {
                        $("#" + settings.dropdownId).val(success[0].entityType).change();
                        DRB.UI.RefreshDropdown(settings.dropdownId);
                    }
                }
            },
            function (error) { DRB.UI.ShowError("Xrm.Utility.lookupObjects Error", error); });
    } else {
        DRB.UI.ShowError("Table not selected", "Please select a Table first");
    }
}
// #endregion
// #endregion  
 
﻿// #region DRB.Xrm
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
 * Xrm - Is DVDT Mode
 */
DRB.Xrm.IsDVDTMode = function () {
    return DRB.Settings.DVDTContext;
}

/**
 * Xrm - Is Demo Mode
 */
DRB.Xrm.IsDemoMode = function () {
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode()) { return false; }
    return typeof DRB.Xrm.GetXrmObject() === "undefined";
}

/**
 * Xrm - Is Instance Mode
 */
DRB.Xrm.IsInstanceMode = function () {
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode() || DRB.Xrm.IsDemoMode()) { return false; }
    return typeof DRB.Xrm.GetXrmObject() !== "undefined";
}

/**
 * Xrm - Get Client Url
 */
DRB.Xrm.GetClientUrl = function () {
    if (DRB.Xrm.IsXTBMode()) { return DRB.Settings.XTBUrl; }
    if (DRB.Xrm.IsJWTMode()) { return DRB.Settings.JWTUrl; }
    if (DRB.Xrm.IsDVDTMode()) { return DRB.Settings.DVDTUrl; }
    if (DRB.Xrm.IsInstanceMode()) { return DRB.Xrm.GetXrmObject().Utility.getGlobalContext().getClientUrl(); }
    if (DRB.Xrm.IsDemoMode()) { return "https://democall"; }
}

/**
 * Xrm - Get Context
 */
DRB.Xrm.GetContext = function () {
    var context = "Demo";
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode() || DRB.Xrm.IsInstanceMode()) { context = DRB.Xrm.GetClientUrl(); }
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
    if (DRB.Xrm.IsDVDTMode()) { currentVersion = DRB.Settings.DVDTVersion; }
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

    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode() || DRB.Xrm.IsInstanceMode()) {
        var token = "";
        if (DRB.Xrm.IsXTBMode()) { token = DRB.Settings.XTBToken; }
        if (DRB.Xrm.IsJWTMode()) { token = DRB.Settings.JWTToken; }
        if (DRB.Xrm.IsDVDTMode()) { token = DRB.Settings.DVDTToken; }
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
                if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode()) { xhr.setRequestHeader("Authorization", "Bearer " + token); }
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

    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode() || DRB.Xrm.IsInstanceMode()) {
        var token = "";
        if (DRB.Xrm.IsXTBMode()) { token = DRB.Settings.XTBToken; }
        if (DRB.Xrm.IsJWTMode()) { token = DRB.Settings.JWTToken; }
        if (DRB.Xrm.IsDVDTMode()) { token = DRB.Settings.DVDTToken; }
        return $.ajax({
            method: "POST",
            data: payload,
            async: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "multipart/mixed;boundary=" + batchDescription);
                xhr.setRequestHeader("OData-MaxVersion", "4.0");
                xhr.setRequestHeader("OData-Version", "4.0");
                xhr.setRequestHeader("Accept", "application/json");
                if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode()) { xhr.setRequestHeader("Authorization", "Bearer " + token); }
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
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode() || DRB.Xrm.IsInstanceMode()) {
        var token = "";
        if (DRB.Xrm.IsXTBMode()) { token = DRB.Settings.XTBToken; }
        if (DRB.Xrm.IsJWTMode()) { token = DRB.Settings.JWTToken; }
        if (DRB.Xrm.IsDVDTMode()) { token = DRB.Settings.DVDTToken; }
        return $.ajax({
            type: "GET",
            datatype: "xml",
            async: true,
            beforeSend: function (xhr) {
                if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode()) { xhr.setRequestHeader("Authorization", "Bearer " + token); }
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
 * Common - Map Users
 * @param {any} data Data to parse
 * @param {string} sortProperty Sort Property
 */
DRB.Common.MapUsers = function (data, sortProperty) {
    // create the array
    var users = [];
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var id = record.systemuserid;
            var name = record.fullname;
            var aadObjectId = record.azureactivedirectoryobjectid;
            users.push(new DRB.Models.User(id, name, aadObjectId));
        });
        // sort the array based on the provided sortProperty
        if (DRB.Utilities.HasValue(sortProperty)) { users.sort(DRB.Utilities.CustomSort(sortProperty)); }
    }
    // return the array
    return users;
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
            var maxSizeInKB = record.MaxSizeInKB; // Image, File
            var canStoreFullImage = record.CanStoreFullImage; // Image
            var dateTimeFormat = record.Format; // DateTime
            var dateTimeBehavior = ""; // DateTime

            if (DRB.Utilities.HasValue(record.DateTimeBehavior) && DRB.Utilities.HasValue(record.DateTimeBehavior.Value)) { dateTimeBehavior = record.DateTimeBehavior.Value; }
            var additionalProperties = { MaxLength: maxLength, MinValue: minValue, MaxValue: maxValue, Targets: targets, IsPolymorphic: isPolymorphic, Precision: precision, PrecisionSource: precisionSource, MaxSizeInKB: maxSizeInKB, CanStoreFullImage: canStoreFullImage, DateTimeFormat: dateTimeFormat, DateTimeBehavior: dateTimeBehavior };

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
 * Common - Map System Views
 * @param {any} data Data to parse
 * @param {string} sortProperty Sort Property
 */
DRB.Common.MapSystemViews = function (data, sortProperty) {
    // create the array
    var views = [];
    // parse data
    if (Array.isArray(data.value)) {
        data.value.forEach(function (record) {
            var id = record.savedqueryid;
            var name = record.name;
            var tableLogicalName = record.returnedtypecode;
            var isDefault = record.isdefault;
            var layoutXml = record.layoutxml;
            views.push(new DRB.Models.SystemView(id, name, tableLogicalName, isDefault, layoutXml));
        });
        // sort the array based on the provided sortProperty
        if (DRB.Utilities.HasValue(sortProperty)) { views.sort(DRB.Utilities.CustomSort(sortProperty)); }
    }
    return views;
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
 
// #region DRB.Common
/**
 * Common - Get Error Message
 * Get the error message from an xhr object
 * @param {any} xhr xhr Object
 */
DRB.Common.GetErrorMessage = function (xhr) {
    try {
        var printedContent = JSON.stringify(xhr.responseText, null, "!!").replace(/!!/g, "&nbsp;&nbsp;").replace(/(?:\r\n|\r|\n)/g, '<br />');
        return printedContent;
    }
    catch (e) {
        console.log(xhr);
        return "Unable to parse the error, logged it inside the browser console";
    }
}

/**
 * Common - Extract Index From Control Name
 * @param {string} controlName Control Name
 */
DRB.Common.ExtractIndexFromControlName = function (controlName) {
    // if the string is like custom_controlname_number, return number
    if (!DRB.Utilities.HasValue(controlName)) { return -1; }
    var lastUnderscore = controlName.lastIndexOf("_");
    if (lastUnderscore > -1 && lastUnderscore + 1 < controlName.length) { return parseInt(controlName.substring(lastUnderscore + 1)); } else { return -1; }
}

DRB.Common.ExtractPreviousIndexFromControlName = function (controlName) {
    // if the string is like custom_controlname_number1_number2, return number1
    if (!DRB.Utilities.HasValue(controlName)) { return -1; }
    var lastUnderscore = controlName.lastIndexOf("_");
    if (lastUnderscore > -1) {
        var strippedControlName = controlName.substring(0, lastUnderscore);
        return DRB.Common.ExtractIndexFromControlName(strippedControlName);
    } else { return -1; }
}

/**
 * Common - Bind Guid
 * Bind the input event to check if it is a valid Guid
 * @param {string} id Element Id
 */
DRB.Common.BindGuid = function (id) {
    $("#" + id).on("input", function (e) {
        $(this).val(function (i, v) {
            var cleared = v.replace(/[^0-9AaBbCcDdEeFf]/g, "").toLowerCase();
            var finalGuid = cleared;
            if (finalGuid.length > 8) { finalGuid = finalGuid.substring(0, 8) + "-" + finalGuid.substring(8); }
            if (finalGuid.length > 13) { finalGuid = finalGuid.substring(0, 13) + "-" + finalGuid.substring(13); }
            if (finalGuid.length > 18) { finalGuid = finalGuid.substring(0, 18) + "-" + finalGuid.substring(18); }
            if (finalGuid.length > 23) { finalGuid = finalGuid.substring(0, 23) + "-" + finalGuid.substring(23); }
            if (finalGuid.length === 36) { $(this).removeClass("is-invalid"); $(this).addClass("is-valid"); }
            else {
                if (finalGuid.length > 0) {
                    $(this).removeClass("is-valid"); $(this).addClass("is-invalid");
                } else { $(this).removeClass("is-valid"); $(this).removeClass("is-invalid"); }
            }
            return finalGuid;
        });
    });
}

/**
 * Common - Bind Integer
 * Bind the input event to check if it is a valid Integer
 * @param {string} id Element Id
 */
DRB.Common.BindInteger = function (id, minValue, maxValue) {
    $("#" + id).on("input", function (e) {
        $(this).val(function (i, v) {
            var finalNumber = v.replace(/[^0-9-]/g, "");
            if (finalNumber.lastIndexOf("-") > 0) {
                finalNumber = finalNumber.charAt(0) + finalNumber.substring(1).replace(/-/g, "");
            }
            if (finalNumber < minValue || finalNumber > maxValue || finalNumber == "-") { $(this).removeClass("is-valid"); $(this).addClass("is-invalid"); }
            else { $(this).removeClass("is-invalid"); $(this).addClass("is-valid"); }
            return finalNumber;
        });
    });
}

/**
 * Common - Bind Top Count Number
 * Bind the input event to check if it is a valid Top Count (between 1 and 5000)
 * @param {string} id Element Id
 */
DRB.Common.BindTopCountNumber = function (id) {
    $("#" + id).on("input", function (e) {
        var minValue = 1;
        var maxValue = 5000;
        $(this).val(function (i, v) {
            var finalNumber = v.replace(/[^0-9]/g, "");
            if (DRB.Utilities.HasValue(finalNumber)) {
                if (finalNumber < minValue) { finalNumber = 1; }
                if (finalNumber > maxValue) { finalNumber = 5000; }
            }
            return finalNumber;
        });
    });
}

/**
 * Common - Bind File Name
 * Bind the input event to check if it is a valid file name
 * @param {string} id Element Id
 */
DRB.Common.BindFileName = function (id) {
    $("#" + id).on("input", function (e) {
        $(this).val(function (i, v) {
            // \/:*?"<>| these chars are not allowed inside a file name
            var finalName = v.replace(/\\/g, "");
            finalName = finalName.replace(/\//g, "");
            finalName = finalName.replace(/:/g, "");
            finalName = finalName.replace(/\*/g, "");
            finalName = finalName.replace(/\?/g, "");
            finalName = finalName.replace(/"/g, "");
            finalName = finalName.replace(/</g, "");
            finalName = finalName.replace(/>/g, "");
            finalName = finalName.replace(/\|/g, "");
            return finalName;
        });
    });
}

/**
 * Common - Bind Number
 * Bind the input event to check if it is a valid Number
 * @param {string} id Element Id
 */
DRB.Common.BindNumber = function (id, minValue, maxValue) {
    $("#" + id).on("input", function (e) {
        $(this).val(function (i, v) {
            var finalNumber = v.replace(/[^0-9-.]/g, "");
            if (finalNumber.lastIndexOf("-") > 0) {
                finalNumber = finalNumber.charAt(0) + finalNumber.substring(1).replace(/-/g, "");
            }

            if (finalNumber.indexOf(".") > -1 && finalNumber.indexOf(".") !== finalNumber.lastIndexOf(".")) {
                finalNumber = finalNumber.substring(0, finalNumber.indexOf(".") + 1) + "" + finalNumber.substring(finalNumber.indexOf(".") + 1).replace(/\./g, "");
            }

            if (finalNumber < minValue || finalNumber > maxValue || finalNumber == "-" || finalNumber == "." || finalNumber == "-.") { $(this).removeClass("is-valid"); $(this).addClass("is-invalid"); }
            else { $(this).removeClass("is-invalid"); $(this).addClass("is-valid"); }
            return finalNumber;
        });
    });
}

/**
 * Common - Parse JWT
 * @param {string} token Token
 */
DRB.Common.ParseJWT = function (token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

/**
 * Common - Refresh XTB Token
 * @param {string} token Token
 */
DRB.Common.RefreshXTBToken = function (token) {
    if (!DRB.Xrm.IsXTBMode()) { console.log("This method id available only with XTB Mode"); return; }
    if (!DRB.Utilities.HasValue(token)) { console.log("Received XTB token is not valid"); return; }
    DRB.Settings.XTBToken = token;
    console.log("Refreshed token from XTB");
}

/**
 * Common - Refresh DVDT Token
 * @param {string} token Token
 */
DRB.Common.RefreshDVDTToken = function (token) {
    if (!DRB.Xrm.IsDVDTMode()) { console.log("This method id available only with DVDT Mode"); return; }
    if (!DRB.Utilities.HasValue(token)) { console.log("Received DVDT token is not valid"); return; }
    DRB.Settings.DVDTToken = token;
    console.log("Refreshed token from DVDT");
}

/**
 * Common - Listener for DVDT
 */
window.addEventListener("message", (event) => {
    const message = event.data;
    switch (message.command) {
        case "dvdt_connection":
            var token = message.token;
            var parsedToken = DRB.Common.ParseJWT(token);
            if (DRB.Utilities.HasValue(parsedToken)) {
                var tokenUrl = parsedToken.aud;
                var tokenExpireDate = parsedToken.exp * 1000;
                var now = new Date().getTime();
                if (DRB.Utilities.HasValue(tokenUrl) && tokenExpireDate > now) {
                    tokenUrl = tokenUrl.replace(/\/$/, ""); // clean url from trailing slash
                    DRB.UI.ShowLoading("Checking Token Settings...");

                    DRB.Xrm.GetServerVersion(tokenUrl, token)
                        .done(function (data) {
                            DRB.Settings.DVDTToken = token;
                            DRB.Settings.DVDTUrl = tokenUrl;
                            DRB.Settings.DVDTVersion = data.Version;
                            DRB.Settings.DVDTContext = true;

                            DRB.UI.HideLoading();
                            DRB.Logic.CompleteInitialize();
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Xrm.GetServerVersion Error", DRB.Common.GetErrorMessage(xhr)); });
                } else { DRB.UI.ShowError("DVDT Connection Error", "The token from DVDT is not valid"); }
            } else { DRB.UI.ShowError("DVDT Connection Error", "Failed to parse the token from DVDT"); }
            break;

        case "dvdt_refreshtoken":
            var token = message.token;
            DRB.Common.RefreshDVDTToken(token);
            break;
    }
});
// #endregion  
 
// #region DRB.Logic
/**
 * Logic - Console To Results Editor
 * @param {any} message Message
*/
DRB.Logic.ConsoleToResultsEditor = function (message) {
    console.log(message);
    var indentedMessage = message;
    try { indentedMessage = JSON.parse(indentedMessage); } catch { }
    indentedMessage = JSON.stringify(indentedMessage, null, 2);
    var resultsValue = DRB.Settings.Editors[DRB.Settings.TabResults].session.getValue();
    if (!DRB.Utilities.HasValue(resultsValue)) { resultsValue = indentedMessage; }
    else { resultsValue += "\n" + indentedMessage; }
    if (resultsValue === undefined) { resultsValue = ""; }
    DRB.Settings.Editors[DRB.Settings.TabResults].session.setValue(resultsValue);
}

/**
 * Logic - Execute Code From Editor
*/
DRB.Logic.ExecuteCodeFromEditor = function () {
    DRB.Settings.Editors[DRB.Settings.TabResults].session.setValue("");
    var now = new Date();
    DRB.Logic.ConsoleToResultsEditor("Execution Start: " + now.toLocaleString("sv"));
    var codeValue = DRB.Settings.Editors[DRB.Settings.TabExecute].session.getValue();

    var preCode = [];
    if (DRB.Xrm.IsInstanceMode()) {
        preCode.push('let Xrm = parent.Xrm;');
    }
    preCode.push('let webapi = {};');
    preCode.push('webapi.safeAjax = function(ajaxOptions) {');
    preCode.push('\tlet ajaxUrl = ajaxOptions.url;');
    preCode.push('\tif (ajaxUrl.indexOf("/_api/") === 0) {');
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode()) {
        preCode.push('\t\tajaxOptions.url = ajaxUrl.replace("/_api/", DRB.Xrm.GetClientUrl() + "/api/data/v9.0/");');
    } else {
        preCode.push('\t\tajaxOptions.url = ajaxUrl.replace("/_api/", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/");');
    }
    preCode.push('\tajaxOptions.beforeSend = function (req) {');
    preCode.push('\t\treq.setRequestHeader("OData-MaxVersion", "4.0");');
    preCode.push('\t\treq.setRequestHeader("OData-Version", "4.0");');
    preCode.push('\t\treq.setRequestHeader("Content-Type", "application/json; charset=utf-8");');
    preCode.push('\t\treq.setRequestHeader("Accept", "application/json");');
    if (DRB.Xrm.IsXTBMode()) {
        preCode.push('\t\treq.setRequestHeader("Authorization", "Bearer " + DRB.Settings.XTBToken);');
    }
    if (DRB.Xrm.IsJWTMode()) {
        preCode.push('\t\treq.setRequestHeader("Authorization", "Bearer " + DRB.Settings.JWTToken);');
    }
    if (DRB.Xrm.IsDVDTMode()) {
        preCode.push('\t\treq.setRequestHeader("Authorization", "Bearer " + DRB.Settings.DVDToken);');
    }

    preCode.push('\t};');
    preCode.push('\t}');
    preCode.push('\t$.ajax(ajaxOptions);');
    preCode.push('}');
    preCode.push('');

    codeValue = preCode.join('\n') + codeValue;

    // Portals replace for portalUri + "/_api" syntax (association)
    var replacePortalUri = 'Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/';
    if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode()) {
        replacePortalUri = 'DRB.Xrm.GetClientUrl() + "/api/data/v9.0/';
    }
    codeValue = codeValue.replace(/portalUri \+\ "\/_api\//gi, replacePortalUri);
    codeValue = codeValue.replace(/portalUri\+\ "\/_api\//gi, replacePortalUri);
    codeValue = codeValue.replace(/portalUri \+\"\/_api\//gi, replacePortalUri);
    codeValue = codeValue.replace(/portalUri\+\"\/_api\//gi, replacePortalUri);

    codeValue = codeValue.replace(/console.log/gi, "DRB.Logic.ConsoleToResultsEditor");

    if (DRB.Xrm.IsXTBMode()) {
        codeValue = codeValue.replace(/Xrm.Utility.getGlobalContext\(\).getClientUrl\(\)/gi, "DRB.Xrm.GetClientUrl()");
        codeValue = codeValue.replace(/headers: {/gi, 'headers: { "Authorization": "Bearer " + DRB.Settings.XTBToken,');
        codeValue = codeValue.replace(/req.setRequestHeader\("OData-MaxVersion", "4.0"\);/gi, 'req.setRequestHeader("OData-MaxVersion", "4.0"); req.setRequestHeader("Authorization", "Bearer " + DRB.Settings.XTBToken);');
    }

    if (DRB.Xrm.IsJWTMode()) {
        codeValue = codeValue.replace(/Xrm.Utility.getGlobalContext\(\).getClientUrl\(\)/gi, "DRB.Xrm.GetClientUrl()");
        codeValue = codeValue.replace(/headers: {/gi, 'headers: { "Authorization": "Bearer " + DRB.Settings.JWTToken,');
        codeValue = codeValue.replace(/req.setRequestHeader\("OData-MaxVersion", "4.0"\);/gi, 'req.setRequestHeader("OData-MaxVersion", "4.0"); req.setRequestHeader("Authorization", "Bearer " + DRB.Settings.JWTToken);');
    }

    if (DRB.Xrm.IsDVDTMode()) {
        codeValue = codeValue.replace(/Xrm.Utility.getGlobalContext\(\).getClientUrl\(\)/gi, "DRB.Xrm.GetClientUrl()");
        codeValue = codeValue.replace(/headers: {/gi, 'headers: { "Authorization": "Bearer " + DRB.Settings.DVDTToken,');
        codeValue = codeValue.replace(/req.setRequestHeader\("OData-MaxVersion", "4.0"\);/gi, 'req.setRequestHeader("OData-MaxVersion", "4.0"); req.setRequestHeader("Authorization", "Bearer " + DRB.Settings.DVDTToken);');
    }

    DRB.UI.ShowLoading("Executing code...");
    setTimeout(function () {
        try {
            eval(codeValue);
            $("#a_" + DRB.Settings.TabResults).click();
            DRB.UI.HideLoading();
        } catch (ex) {
            DRB.UI.ShowError("Execute Code Error", ex.message);
        }
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Logic - Move Code To Main Editor
 * @param {string} sectionName Section Name
*/
DRB.Logic.MoveCodeToMainEditor = function (sectionName) {
    var codeValue = "";

    var checkTab = DRB.Utilities.GetRecordById(DRB.Settings.Tabs, sectionName);
    if (DRB.Utilities.HasValue(checkTab)) {
        if (checkTab.MoveToEditor === true) { codeValue = DRB.Settings.Editors[checkTab.Id].session.getValue(); }
    }

    DRB.Settings.Editors[DRB.Settings.TabExecute].session.setValue(codeValue);
    $("#a_" + DRB.Settings.TabExecute).click();
}

/**
 * Logic - Copy Code From Editor
 * @param {string} sectionName Section Name
*/
DRB.Logic.CopyCodeFromEditor = function (sectionName) {
    var codeValue = "";
    var contentText = "Code";

    var checkTab = DRB.Utilities.GetRecordById(DRB.Settings.Tabs, sectionName);
    if (DRB.Utilities.HasValue(checkTab)) {
        if (checkTab.CopyCode === true) {
            codeValue = DRB.Settings.Editors[checkTab.Id].session.getValue();
        }
        if (checkTab.Results === true) { contentText = "Results"; }
    }

    // copy to clipboard
    if (DRB.Utilities.HasValue(navigator.clipboard)) {
        // modern browser code
        navigator.clipboard.writeText(codeValue);
    } else {
        // old code for IE
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(codeValue).select();
        document.execCommand("copy");
        $temp.remove();
    }

    // show message to the user
    DRB.UI.ShowMessage(contentText + " copied to Clipboard");
    setTimeout(function () { DRB.UI.HideLoading(); }, DRB.Settings.TimeoutDelay * 1.5);
}

DRB.Logic.CopyCodeForPowerAutomate = function (id, name) {
    var codeValue = $("#" + DRB.DOM.PowerAutomate[id + "Input"].Id).val();
    // copy to clipboard
    if (DRB.Utilities.HasValue(navigator.clipboard)) {
        // modern browser code
        navigator.clipboard.writeText(codeValue);
    } else {
        // old code for IE
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(codeValue).select();
        document.execCommand("copy");
        $temp.remove();
    }

    // show message to the user
    DRB.UI.ShowMessage(name + " copied to Clipboard");
    setTimeout(function () { DRB.UI.HideLoading(); }, DRB.Settings.TimeoutDelay * 1.5);
}

/**
 * Logic - Complete Initialize
 */
DRB.Logic.CompleteInitialize = function () {
    DRB.Metadata = {}; // Empty DRB.Metadata
    DRB.Metadata.CurrentNode = null; // set CurrentNode as null
    DRB.Metadata.DataverseCustomAPIsLoaded = false; // set DataverseCustomAPILoaded as false
    DRB.Metadata.DataverseCustomActionsLoaded = false; // set DataverseCustomActionLoaded as false
    DRB.Metadata.DataverseMetadataLoaded = false; // set DataverseMetadataLoaded as false

    // hide the main content because CurrentNode is now null
    $("#" + DRB.DOM.MainContent.Id).hide();

    // set URL to be visible
    $("#" + DRB.DOM.ContextSpan.Id).html(DRB.Xrm.GetContext());

    // retrieve tables
    DRB.UI.ShowLoading("Retrieving Tables and Users...");
    setTimeout(function () {
        DRB.Common.RetrieveTables()
            .done(function (data) {
                DRB.Metadata.Tables = DRB.Common.MapTables(data, "Name");
                DRB.Common.RetrieveUsers()
                    .done(function (data2) {
                        DRB.Metadata.Users = DRB.Common.MapUsers(data2, "Name");
                        // create an empty data structure
                        var currentNodes = [];

                        // Check localStorage
                        if (DRB.Settings.LocalStorageAvailable === true) {
                            var storedJson = localStorage.getItem("DRB_" + DRB.Xrm.GetClientUrl());
                            if (storedJson !== null) {
                                try {
                                    var parsedContent = JSON.parse(storedJson);
                                    // version check
                                    if (parsedContent.version > 1) {
                                        // version not compatible, remove the localStorage item
                                        localStorage.removeItem("DRB_" + DRB.Xrm.GetClientUrl());
                                    } else {
                                        currentNodes = [{}];
                                        // import jsTree nodes to the new data structure
                                        DRB.Collection.ImportNodes(parsedContent, currentNodes[0]);
                                    }
                                } catch (e) {
                                    // something went wrong when parsing the file, remove the localStorage item
                                    localStorage.removeItem("DRB_" + DRB.Xrm.GetClientUrl());
                                }
                            }
                        }
                        // load nodes
                        DRB.Collection.LoadNodes(currentNodes);

                        // Set Tabs Warnings
                        var warningXrmWebApi = "";
                        var warningClientUrl = "";
                        var warningPortals = "NOTE: Inside DRB, Portals endpoint (<i>/_api/</i>) is routed to the default Web API endpoint";
                        var warningEditor = "NOTE: console.log messages will appear inside the Results tab";
                        var warningResults = "NOTE: Due to asynchronous calls the output can appear later";

                        if (DRB.Xrm.IsXTBMode() || DRB.Xrm.IsJWTMode() || DRB.Xrm.IsDVDTMode()) {

                            if (DRB.Xrm.IsXTBMode()) {
                                warningXrmWebApi = "NOTE: Xrm.WebApi is not available when DRB is executed inside XrmToolBox";
                                warningClientUrl = "NOTE: Inside DRB for XrmToolBox, Xrm.Utility.getGlobalContext().getClientUrl() is routed to the Instance URL";
                            }

                            if (DRB.Xrm.IsJWTMode()) {
                                warningXrmWebApi = "NOTE: Xrm.WebApi is not available when DRB is in JWT Mode";
                                warningClientUrl = "NOTE: Inside DRB JWT Mode, Xrm.Utility.getGlobalContext().getClientUrl() is routed to the Instance URL";
                            }

                            if (DRB.Xrm.IsDVDTMode()) {
                                warningXrmWebApi = "NOTE: Xrm.WebApi is not available when DRB is executed inside DVDT";
                                warningClientUrl = "NOTE: Inside DRB for DVDT, Xrm.Utility.getGlobalContext().getClientUrl() is routed to the Instance URL";
                            }
                        }
                        DRB.Settings.Tabs.forEach(function (tab) {
                            if (DRB.Utilities.HasValue(tab.ShowWarning) && tab.ShowWarning === true) {
                                if (DRB.Utilities.HasValue(tab.WarningXrmWebApi) && tab.WarningXrmWebApi === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningXrmWebApi);
                                }
                                if (DRB.Utilities.HasValue(tab.WarningClientUrl) && tab.WarningClientUrl === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningClientUrl);
                                }
                                if (DRB.Utilities.HasValue(tab.WarningPortals) && tab.WarningPortals === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningPortals);
                                }
                                if (DRB.Utilities.HasValue(tab.WarningEditor) && tab.WarningEditor === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningEditor);
                                }
                                if (DRB.Utilities.HasValue(tab.WarningResults) && tab.WarningResults === true) {
                                    $("#" + DRB.DOM.TabsWarning.Id + tab.Id).html(warningResults);
                                }
                            }
                        });
                        DRB.UI.HideLoading();
                    })
                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveUsers Error", DRB.Common.GetErrorMessage(xhr)); });
            })
            .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTables Error", DRB.Common.GetErrorMessage(xhr)); });
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Logic - Edit Request
 * @param {any} node Node
 */
DRB.Logic.EditRequest = function (node) {
    if (node.type === "request") {
        DRB.Metadata.CurrentNode = node;
        // check if the Metadata CurrentNode has all the correct generic properties (endpoint, requestType, configuration)
        if (!DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data)) { DRB.Metadata.CurrentNode.data = { endpoint: "webapi", requestType: "", configuration: {} }; }
        if (!DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.requestType)) { DRB.Metadata.CurrentNode.data.requestType = ""; DRB.Metadata.CurrentNode.data.configuration = {}; }
        if (!DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration)) { DRB.Metadata.CurrentNode.data.configuration = {}; }

        $("#" + DRB.DOM.RequestType.Div.Id).text(DRB.Metadata.CurrentNode.text); // Set the request name inside the main content
        $("#" + DRB.DOM.RequestType.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.requestType).change(); // trigger the Request Type dropdown
        $("#" + DRB.DOM.MainContent.Id).show(); // Show the main content
    }
}

/**
 * Logic - Set Configuration Properties
 * @param {any} nodeConfiguration Node Configuration
 * @param {string[]} properties Properties
 */
DRB.Logic.SetNodeConfigurationProperties = function (nodeConfiguration, properties) {
    var updatedNodeConfiguration = {};
    properties.forEach(function (property) {
        updatedNodeConfiguration[property] = JSON.parse(JSON.stringify(nodeConfiguration[property]));
    });
    return updatedNodeConfiguration;
}

/**
 * Logic - Bind Request Type
 * @param {string} id Id
 */
DRB.Logic.BindRequestType = function (id) {
    $("#" + id).on("change", function (e) {
        var requestTypeValue = $(this).val();
        var showTabs = false;
        if (DRB.Utilities.HasValue(requestTypeValue)) { showTabs = true; }
        $("#" + DRB.DOM.ConfigureContent.Id).empty();
        $("#a_" + DRB.Settings.Tabs[0].Id).click();

        DRB.Settings.Tabs.forEach(function (tab) {
            var showDefaultTab = true;
            if (DRB.Utilities.HasValue(tab.EnabledRequests) && tab.EnabledRequests.length > 0) {
                showDefaultTab = false;
                if (tab.EnabledRequests.indexOf(requestTypeValue) > -1) { $("#a_" + tab.Id).show(); } else { $("#a_" + tab.Id).hide(); }
            }

            if (DRB.Utilities.HasValue(tab.DisabledRequests) && tab.DisabledRequests.length > 0) {
                showDefaultTab = false;
                if (tab.DisabledRequests.indexOf(requestTypeValue) > -1) { $("#a_" + tab.Id).hide(); } else { $("#a_" + tab.Id).show(); }
            }

            if (showDefaultTab === true) { $("#a_" + tab.Id).show(); }
        });

        // Set the Metadata CurrentNode generic values
        DRB.Metadata.CurrentNode.data.requestType = requestTypeValue;
        // reset all the values to the default if missing
        var nodeConfiguration = DRB.Metadata.CurrentNode.data.configuration;

        // set default values if a property is missing
        if (!DRB.Utilities.HasValue(nodeConfiguration.version)) { nodeConfiguration.version = DRB.Settings.Versions[DRB.Settings.Versions.length - 1].Id; } // All except Retrieve NextLink
        if (!DRB.Utilities.HasValue(nodeConfiguration.async)) { nodeConfiguration.async = true; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.tokenHeader)) { nodeConfiguration.tokenHeader = false; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.impersonate)) { nodeConfiguration.impersonate = false; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.impersonateType)) { nodeConfiguration.impersonateType = "mscrmcallerid"; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.impersonateId)) { nodeConfiguration.impersonateId = ""; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.formattedValues)) { nodeConfiguration.formattedValues = true; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.returnRecord)) { nodeConfiguration.returnRecord = false; } // Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.detectDuplicates)) { nodeConfiguration.detectDuplicates = false; } // Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.detectChanges)) { nodeConfiguration.detectChanges = false; } // Retrieve Single, Retrieve NextLink
        if (!DRB.Utilities.HasValue(nodeConfiguration.retrieveCount)) { nodeConfiguration.retrieveCount = false; } // Retrieve Multiple, Retrieve NextLink, Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.prevent)) { nodeConfiguration.prevent = "none"; } // Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.topCount)) { nodeConfiguration.topCount = ""; } // Retrieve Multiple
        if (!DRB.Utilities.HasValue(nodeConfiguration.primaryEntity)) { nodeConfiguration.primaryEntity = null; } // All
        if (!DRB.Utilities.HasValue(nodeConfiguration.primaryIdField)) { nodeConfiguration.primaryIdField = ""; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.useAlternateKey)) { nodeConfiguration.useAlternateKey = false; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.primaryId)) { nodeConfiguration.primaryId = ""; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.alternateKeyName)) { nodeConfiguration.alternateKeyName = ""; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.alternateKeyFields)) { nodeConfiguration.alternateKeyFields = []; }
        if (!DRB.Utilities.HasValue(nodeConfiguration.fields)) { nodeConfiguration.fields = []; } // Retrieve Single, Retrieve Multiple, Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.setFields)) { nodeConfiguration.setFields = []; } // Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.oneToMany)) { nodeConfiguration.oneToMany = []; } // Retrieve Single, Retrieve Multiple, Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.manyToOne)) { nodeConfiguration.manyToOne = []; } // Retrieve Single, Retrieve Multiple, Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.manyToMany)) { nodeConfiguration.manyToMany = []; } // Retrieve Single, Retrieve Multiple, Create, Update
        if (!DRB.Utilities.HasValue(nodeConfiguration.filterCriteria)) { nodeConfiguration.filterCriteria = {}; } // Retrieve Multiple
        if (!DRB.Utilities.HasValue(nodeConfiguration.orderFields)) { nodeConfiguration.orderFields = []; } // Retrieve Multiple
        if (!DRB.Utilities.HasValue(nodeConfiguration.secondaryEntity)) { nodeConfiguration.secondaryEntity = null; } // Association
        if (!Array.isArray(nodeConfiguration.secondaryIds)) { nodeConfiguration.secondaryIds = [""]; } // Association
        if (!DRB.Utilities.HasValue(nodeConfiguration.relationship)) { nodeConfiguration.relationship = ""; } // Association
        if (!DRB.Utilities.HasValue(nodeConfiguration.nextLink)) { nodeConfiguration.nextLink = ""; }  // Retrieve NextLink
        if (!DRB.Utilities.HasValue(nodeConfiguration.queryType)) { nodeConfiguration.queryType = ""; } // Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.systemViewId)) { nodeConfiguration.systemViewId = ""; } // Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.personalViewId)) { nodeConfiguration.personalViewId = ""; } // Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.fetchXML)) { nodeConfiguration.fetchXML = ""; } // Predefined Query
        if (!DRB.Utilities.HasValue(nodeConfiguration.workflowId)) { nodeConfiguration.workflowId = ""; } // Execute Workflow
        if (!DRB.Utilities.HasValue(nodeConfiguration.dataverseExecute)) { nodeConfiguration.dataverseExecute = ""; } // Dataverse Execute
        if (!DRB.Utilities.HasValue(nodeConfiguration.dataverseOperationType)) { nodeConfiguration.dataverseOperationType = 0; } // Dataverse Execute
        if (!DRB.Utilities.HasValue(nodeConfiguration.dataverseParameters)) { nodeConfiguration.dataverseParameters = []; } // Dataverse Execute
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileField)) { nodeConfiguration.fileField = null; } // Manage File Data, Manage Image Data
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileOperation)) { nodeConfiguration.fileOperation = ""; } // Manage File Data, Manage Image Data
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileName)) { nodeConfiguration.fileName = ""; } // Manage File Data, Manage Image Data
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileContent)) { nodeConfiguration.fileContent = null; } // Manage File Data, Manage Image Data
        if (!DRB.Utilities.HasValue(nodeConfiguration.fileFullSize)) { nodeConfiguration.fileFullSize = false; } // Manage Image Data

        // Check the selected Request Type
        switch (requestTypeValue) {
            case "retrievesingle": // Retrieve Single
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "detectChanges", "primaryEntity", "useAlternateKey", "alternateKeyName", "alternateKeyFields",
                    "primaryId", "primaryIdField", "fields", "oneToMany", "manyToOne", "manyToMany"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.RetrieveSingle.Start();
                break;

            case "retrievemultiple": // Retrieve Multiple
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "retrieveCount", "topCount", "primaryEntity", "primaryIdField", "fields", "oneToMany", "manyToOne", "manyToMany",
                    "filterCriteria", "orderFields"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.RetrieveMultiple.Start();
                break;

            case "create": // Create
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "returnRecord", "detectDuplicates", "primaryEntity", "primaryIdField", "fields", "setFields", "oneToMany", "manyToOne", "manyToMany"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Create.Start();
                break;

            case "update": // Update
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "returnRecord", "detectDuplicates", "prevent", "primaryEntity", "useAlternateKey", "alternateKeyName", "alternateKeyFields",
                    "primaryId", "primaryIdField", "fields", "setFields", "oneToMany", "manyToOne", "manyToMany"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Update.Start();
                break;

            case "delete": // Delete
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "useAlternateKey", "alternateKeyName", "alternateKeyFields", "primaryId"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Delete.Start();
                break;

            // Associate and Disassociate have the same configuration
            case "associate": // Associate
            case "disassociate": // Disassociate
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "primaryId", "secondaryEntity", "secondaryIds", "relationship"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.Association.Start();
                break;

            case "retrievenextlink": // Retrieve NextLink
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "detectChanges", "primaryEntity", "retrieveCount", "nextLink"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null; // primaryEntity starts always empty as we parse the NextLink
                DRB.Logic.RetrieveNextLink.Start();
                break;

            case "predefinedquery": // Predefined Query
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId", "formattedValues",
                    "retrieveCount", "primaryEntity", "queryType", "systemViewId", "personalViewId", "fetchXML"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.PredefinedQuery.Start();
                break;

            // Custom API, Custom Action, Action and Function have the same configuration
            case "executecustomapi": // Execute Custom API
            case "executecustomaction": // Execute Custom Action
            case "executeaction": // Execute Action
            case "executefunction": // Execute Function
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "dataverseExecute", "dataverseOperationType", "dataverseParameters"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.DataverseExecute.Start(requestTypeValue);
                break;

            case "executeworkflow": // Execute Workflow
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "primaryId", "workflowId"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.ExecuteWorkflow.Start();
                break;

            case "managefiledata": // Manage File Data
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "primaryId", "fileField", "fileOperation", "fileName", "fileContent"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.ManageFileImageData.Start(requestTypeValue);
                break;

            case "manageimagedata": // Manage Image Data
                var properties = ["version", "async", "tokenHeader", "impersonate", "impersonateType", "impersonateId",
                    "primaryEntity", "primaryId", "fileField", "fileOperation", "fileName", "fileContent", "fileFullSize"];

                DRB.Metadata.CurrentNode.data.configuration = DRB.Logic.SetNodeConfigurationProperties(nodeConfiguration, properties);
                DRB.Logic.ManageFileImageData.Start(requestTypeValue);
                break;
        }

        if (showTabs) { $("#" + DRB.DOM.TabsRequest.Id).show(); } else { $("#" + DRB.DOM.TabsRequest.Id).hide(); }

        DRB.Settings.Editors.forEach(function (editor) { editor.session.setValue(""); });
    });
}

/**
 * Logic - Export Relationships
 * @param {any[]} values Values (from a dropdown)
 * @param {any[]} relationshipMetadata Metadata relationship array
*/
DRB.Logic.ExportRelationships = function (values, relationshipMetadata) {
    // array containing the result
    var relationshipExports = [];

    // first extract all relationships
    var relationships = [];
    values.forEach(function (value) { relationships.push(value.split('|')[0]); });
    relationships = DRB.Utilities.RemoveDuplicatesFromArray(relationships);

    // Create the list of fields for each relationship
    relationships.forEach(function (relationship) {
        var relationshipExport = { schemaName: relationship, fields: [] };
        values.forEach(function (selectedRelationshipColumn) {
            var splitted = selectedRelationshipColumn.split('|');
            if (splitted[0] === relationship) { relationshipExport.fields.push({ logicalName: splitted[1] }); }
        });
        relationshipExports.push(relationshipExport);
    });

    // fill the other properties from the Metadata
    relationshipExports.forEach(function (relationshipExport) {
        var relationship = DRB.Utilities.GetRecordById(relationshipMetadata, relationshipExport.schemaName);
        if (DRB.Utilities.HasValue(relationship)) {
            relationshipExport.navigationProperty = relationship.NavigationProperty;
            var relationshipTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, relationship.TargetTable);
            if (DRB.Utilities.HasValue(relationshipTable)) {
                relationshipExport.targetEntity = relationshipTable.LogicalName;
                relationshipExport.targetEntityLabel = relationshipTable.Name;
                relationshipExport.fields.forEach(function (relationshipExportField) {
                    var relationshipTableColumn = DRB.Utilities.GetRecordById(relationshipTable.Columns, relationshipExportField.logicalName);
                    relationshipExportField.schemaName = relationshipTableColumn.SchemaName;
                    relationshipExportField.label = relationshipTableColumn.Name;
                    relationshipExportField.type = relationshipTableColumn.AttributeType;
                    relationshipExportField.oDataName = relationshipTableColumn.ODataName;
                });
            }
        }
    });
    return relationshipExports;
}

/**
 * Logic - Fill Current Metadata
 * @param {DRB.Models.Table} table Table
 */
DRB.Logic.FillCurrentMetadata = function (table) {
    // when a table is selected, fill Current Metadata with table properties (Columns, Relationships, Alternate Keys)
    DRB.Metadata.CurrentColumns = table.Columns;
    DRB.Metadata.CurrentOneToMany = table.OneToManyRelationships;
    DRB.Metadata.CurrentManyToOne = table.ManyToOneRelationships;
    DRB.Metadata.CurrentManyToMany = table.ManyToManyRelationships;
    DRB.Metadata.CurrentAlternateKeys = table.AlternateKeys;
}

/**
 * Logic - Fill Columns
 */
DRB.Logic.FillColumns = function () {
    if (DRB.Metadata.CurrentColumns.length === 0) {
        DRB.UI.ResetDropdown(DRB.DOM.Columns.Dropdown.Id, DRB.DOM.Columns.Dropdown.Name);
    } else {
        var readColumns = [];
        DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
            if (currentColumn.IsValidForRead === true) { readColumns.push(currentColumn); }
        });
        DRB.UI.FillDropdown(DRB.DOM.Columns.Dropdown.Id, DRB.DOM.Columns.Dropdown.Name, new DRB.Models.Records(readColumns).ToDropdown());
        var columnsValues = [];
        DRB.Metadata.CurrentNode.data.configuration.fields.forEach(function (field) { columnsValues.push(field.logicalName); });
        if (columnsValues.length > 0) { $("#" + DRB.DOM.Columns.Dropdown.Id).val(columnsValues).change(); }
    }
}

/**
 * Logic - Fill Relationships Columns
 */
DRB.Logic.FillRelationshipsColumns = function () {
    var currentRelationships = ["CurrentOneToMany", "CurrentManyToOne", "CurrentManyToMany"];
    currentRelationships.forEach(function (currentRelationship) {
        DRB.Metadata[currentRelationship].forEach(function (relationship) {
            var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, relationship.TargetTable);
            if (DRB.Utilities.HasValue(targetTable)) {
                relationship.TargetTableName = targetTable.Name;
                relationship.Columns = [];

                // take NavigationAttributeName from the related table columns
                if (DRB.Utilities.HasValue(relationship.NavigationAttribute)) {
                    if (currentRelationship === "CurrentOneToMany") {
                        var relColumn = DRB.Utilities.GetRecordById(targetTable.Columns, relationship.NavigationAttribute);
                        if (DRB.Utilities.HasValue(relColumn)) { relationship.NavigationAttributeName = relColumn.Name; }
                    }

                    if (currentRelationship === "CurrentManyToOne") {
                        var sourceTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, relationship.SourceTable);
                        if (DRB.Utilities.HasValue(sourceTable)) {
                            var relColumn = DRB.Utilities.GetRecordById(sourceTable.Columns, relationship.NavigationAttribute);
                            if (DRB.Utilities.HasValue(relColumn)) { relationship.NavigationAttributeName = relColumn.Name; }
                        }
                    }
                }

                targetTable.Columns.forEach(function (targetColumn) {
                    relationship.Columns.push(new DRB.Models.RelationshipColumn(relationship.SchemaName, relationship.Type, relationship.NavigationProperty, relationship.NavigationAttribute, relationship.NavigationAttributeName, relationship.TargetTable, targetTable.Name, targetColumn.LogicalName, targetColumn.Name, targetColumn.SchemaName, targetColumn.AttributeType, targetColumn.IsPrimaryIdAttribute, targetColumn.IsPrimaryNameAttribute, targetColumn.RequiredLevel, targetColumn.IsValidForRead, targetColumn.IsValidForCreate, targetColumn.IsValidForUpdate, targetColumn.AdditionalProperties));
                });
            }
        });
    });
}

/**
 * Logic - Fill Relationships
 */
DRB.Logic.FillRelationships = function () {
    var currentRelationships = ["CurrentOneToMany", "CurrentManyToOne", "CurrentManyToMany"];
    currentRelationships.forEach(function (currentRelationship) {
        var shortRel = currentRelationship.replace("Current", "");
        var configRel = shortRel.charAt(0).toLowerCase() + shortRel.substring(1);
        if (DRB.Metadata[currentRelationship].length === 0) {
            $("#" + DRB.DOM.Relationship[shortRel].Button.Id).hide();
            DRB.UI.ResetDropdown(DRB.DOM.Relationship[shortRel].Dropdown.Id, DRB.DOM.Relationship[shortRel].Dropdown.Name);
            DRB.Metadata.CurrentNode.data.configuration[configRel] = [];
        } else {
            $("#" + DRB.DOM.Relationship[shortRel].Button.Id).show();
            var relRecords = [];
            var configurationRelRecords = [];
            DRB.Metadata.CurrentNode.data.configuration[configRel].forEach(function (relationship) {
                var checkRelationship = DRB.Utilities.GetRecordById(DRB.Metadata[currentRelationship], relationship.schemaName);
                if (DRB.Utilities.HasValue(checkRelationship)) {
                    relationship.fields.forEach(function (relationshipField) {
                        var checkColumn = DRB.Utilities.GetRecordByProperty(checkRelationship.Columns, "ColumnLogicalName", relationshipField.logicalName);
                        if (DRB.Utilities.HasValue(checkColumn)) { relRecords.push(checkColumn); configurationRelRecords.push(checkColumn.Id); }
                    });
                }
            });

            DRB.Metadata.CurrentNode.data.configuration[configRel] = DRB.Logic.ExportRelationships(configurationRelRecords, DRB.Metadata[currentRelationship]);
            DRB.UI.FillDropdownWithGroups(DRB.DOM.Relationship[shortRel].Dropdown.Id, DRB.DOM.Relationship[shortRel].Dropdown.Name, new DRB.Models.Records(relRecords).ToDropdown(), false);
        }
    });
}

/**
 * Logic - Fill Alternate Keys
 */
DRB.Logic.FillAlternateKeys = function () {
    // Fill Alternate Keys
    if (DRB.Metadata.CurrentAlternateKeys.length === 0) {
        // this table has no Alternate Keys, "Use Alternate Key" is No
        DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        DRB.UI.ResetDropdown(DRB.DOM.AlternateKey.Dropdown.Id, DRB.DOM.AlternateKey.Dropdown.Name);
        $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("no").change();
    } else {
        // this table has Alternate Keys
        DRB.UI.UnlockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        DRB.UI.FillDropdown(DRB.DOM.AlternateKey.Dropdown.Id, DRB.DOM.AlternateKey.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.CurrentAlternateKeys).ToDropdown());
        if (DRB.Metadata.CurrentNode.data.configuration.useAlternateKey === true) { $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("yes").change(); }
    }
}

/**
 * Logic - Parse Image
 * @param {event} e Event
 */
DRB.Logic.ParseImage = function (e) {
    var file = e.target.files[0];
    if (!file) {
        DRB.UI.ShowError("Load Image Error", "Error loading the selected file");
    } else {
        if (/\.(jpe?g|png|gif|bmp)$/i.test(file.name)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                try {
                    var fileContent = e.target.result;
                    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentImageIndex)) {
                        // get full Metadata and configuration path
                        var refMetadata = DRB.Metadata;
                        var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

                        // get full Metadata and configuration path
                        DRB.Metadata.CurrentMetadataPath.split("_").forEach(function (path) {
                            if (isNaN(parseInt(path))) {
                                if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                                if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
                            } else {
                                // is a position number
                                var metadataIndex = parseInt(path);
                                refMetadata.forEach(function (refItem, refItemIndex) {
                                    if (refItem.Id === metadataIndex) {
                                        // this is the correct path to follow
                                        refMetadata = refMetadata[refItemIndex];
                                        refConfiguration = refConfiguration[refItemIndex];
                                    }
                                });
                            }
                        });

                        refMetadata.forEach(function (column, columnIndex) {
                            if (column.Id === DRB.Metadata.CurrentImageIndex) {
                                var currentField = JSON.parse(JSON.stringify(column.Value));
                                currentField.value = fileContent.split(",")[1];
                                column.Value = currentField;
                                refConfiguration[columnIndex] = currentField;

                                $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[DRB.Metadata.CurrentDomObject].ControlValue.Id + DRB.Metadata.CurrentMetadataPath + "_" + DRB.Metadata.CurrentImageIndex).show();
                                $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[DRB.Metadata.CurrentDomObject].ControlValue.Id + DRB.Metadata.CurrentMetadataPath + "_" + DRB.Metadata.CurrentImageIndex).show();
                            }
                        });
                    }
                } catch (e) { DRB.UI.ShowError("Load Image Error", "Failed to parse the selected file"); }
            };
            reader.readAsDataURL(file);
        } else {
            DRB.UI.ShowError("Load Image Error", "Supported file extensions: gif, png, bmp, jpg, jpeg");
        }
    }
    // reset the File Input (necessary if we load the same file again)
    $(e.target).val("");
}

/**
 * Logic - Load Image
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 * @param {number} elementIndex Element Index
 */
DRB.Logic.LoadImage = function (domObject, metadataPath, elementIndex) {
    DRB.Metadata.CurrentDomObject = domObject;
    DRB.Metadata.CurrentMetadataPath = metadataPath;
    DRB.Metadata.CurrentImageIndex = elementIndex;
    $("#" + DRB.DOM.Image.LoadInput.Id + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + elementIndex).trigger("click");
}

/**
 * Logic - Show Image
 * @param {string} metadataPath Metadata Path
 * @param {number} elementIndex Element Index
 */
DRB.Logic.ShowImage = function (metadataPath, elementIndex) {
    try {
        var refMetadata = DRB.Metadata;
        // get full Metadata and configuration path
        metadataPath.split("_").forEach(function (path) {
            if (isNaN(parseInt(path))) {
                if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            } else {
                // is a position number
                var metadataIndex = parseInt(path);
                refMetadata.forEach(function (refItem, refItemIndex) {
                    if (refItem.Id === metadataIndex) {
                        // this is the correct path to follow
                        refMetadata = refMetadata[refItemIndex];
                    }
                });
            }
        });


        var imageContent = null;
        refMetadata.forEach(function (column) {
            if (column.Id === elementIndex) {
                var field = JSON.parse(JSON.stringify(column.Value));
                imageContent = field.value;
            }
        });

        var base64Prefix = "data:image/jpeg;base64,";
        var finalImage = base64Prefix + imageContent;

        var showContent = DRB.UI.CreateEmptyDiv("div_showimage", "centercontent");
        showContent.append(DRB.UI.CreateImage("preview", finalImage));
        DRB.UI.Show("Show Image", showContent, "large");
    } catch (e) {
        DRB.UI.ShowError("Image Error", "Unable to show the image");
    }
}

/**
 * Logic - Remove Image
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 * @param {number} elementIndex Element Index
 */
DRB.Logic.RemoveImage = function (domObject, metadataPath, elementIndex) {
    // get full Metadata and configuration path
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
    // get full Metadata and configuration path
    metadataPath.split("_").forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    refMetadata.forEach(function (column, columnIndex) {
        if (column.Id === elementIndex) {
            var field = JSON.parse(JSON.stringify(column.Value));
            field.value = null;
            column.Value = field;
            refConfiguration[columnIndex] = field;

            $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + elementIndex).hide();
            $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + elementIndex).hide();
        }
    });
}
// #endregion  
 
// #region DRB.Logic.Bindings
/**
 * Logic - Bind Property Boolean Value
 * @param {string} id Id
 * @param {string} property Property
 */
DRB.Logic.BindPropertyBooleanValue = function (id, property) {
    $("#" + id).on("change", function (e) {
        var propertyBooleanValue = $(this).val();
        if (propertyBooleanValue === "yes") { DRB.Metadata.CurrentNode.data.configuration[property] = true; } else { DRB.Metadata.CurrentNode.data.configuration[property] = false; }
    });
}

/**
 * Logic - Bind Property Value
 * @param {string} id Id
 * @param {string} property Property
 */
DRB.Logic.BindPropertyValue = function (id, property) {
    $("#" + id).on("change", function (e) {
        var propertyValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration[property] = propertyValue;
    });
}

/**
 * Logic - Bind Impersonate
 * @param {string} id Id
 */
DRB.Logic.BindImpersonate = function (id) {
    $("#" + id).on("change", function (e) {
        var impersonateValue = $(this).val();
        if (impersonateValue === "yes") {
            DRB.Metadata.CurrentNode.data.configuration.impersonate = true;
            $("#" + DRB.DOM.ImpersonateId.Div.Id).show();
        } else {
            DRB.Metadata.CurrentNode.data.configuration.impersonate = false;
            $("#" + DRB.DOM.ImpersonateId.Div.Id).hide();
        }
    });
}

/**
 * Logic - Bind Impersonate Type
 * @param {string} id Id
 */
DRB.Logic.BindImpersonateType = function (id) {
    $("#" + id).on("change", function (e) {
        var impersonateTypeValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.impersonateType = impersonateTypeValue;
        var impersonateIdValue = DRB.Metadata.CurrentNode.data.configuration.impersonateId;
        if (DRB.Utilities.HasValue(impersonateTypeValue) && DRB.Utilities.HasValue(impersonateIdValue)) {
            var checkUser = null;
            var newImpersonateId = "";
            switch (impersonateTypeValue) {
                case "mscrmcallerid":
                    checkUser = DRB.Utilities.GetRecordByProperty(DRB.Metadata.Users, "AADObjectId", impersonateIdValue);
                    if (DRB.Utilities.HasValue(checkUser)) { newImpersonateId = checkUser.Id; }
                    break;
                case "callerobjectid":
                    checkUser = DRB.Utilities.GetRecordById(DRB.Metadata.Users, impersonateIdValue);
                    if (DRB.Utilities.HasValue(checkUser)) { newImpersonateId = checkUser.AADObjectId; }
                    break;
            }
            if (DRB.Utilities.HasValue(newImpersonateId)) {
                $("#" + DRB.DOM.ImpersonateId.Input.Id).val(newImpersonateId).trigger("input").change();
            }
        }
    });
}

/**
 * Logic - Bind Impersonate Id
 * @param {string} id Id
 */
DRB.Logic.BindImpersonateId = function (id) {
    $("#" + id).on("change", function (e) {
        var impersonateIdValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.impersonateId = impersonateIdValue;
        var impersonateTypeValue = DRB.Metadata.CurrentNode.data.configuration.impersonateType;
        if (impersonateTypeValue === "callerobjectid") { $("#" + DRB.DOM.ImpersonateId.Dropdown.Id).val(impersonateTypeValue).change(); }
    });
}

/**
 * Logic - Bind Return Record
 * @param {string} id Id
 */
DRB.Logic.BindReturnRecord = function (id) {
    $("#" + id).on("change", function (e) {
        var returnRecordValue = $(this).val();
        if (returnRecordValue === "yes") {
            DRB.Metadata.CurrentNode.data.configuration.returnRecord = true;
            $("#" + DRB.DOM.Columns.Div.Id).show();
            $("#" + DRB.DOM.DivRelationship.Id).show();
        } else {
            DRB.Metadata.CurrentNode.data.configuration.returnRecord = false;
            $("#" + DRB.DOM.Columns.Div.Id).hide();
            $("#" + DRB.DOM.DivRelationship.Id).hide();
        }
    });
}

/**
 * Logic - Bind Use Alternate Key
 * @param {string} id Id
 */
DRB.Logic.BindUseAlternateKey = function (id) {
    $("#" + id).on("change", function (e) {
        var useAlternateKeyValue = $(this).val();
        if (useAlternateKeyValue === "yes") {
            // Selected Yes
            $("#" + DRB.DOM.PrimaryId.Div.Id).hide();
            $("#" + DRB.DOM.AlternateKey.Div.Id).show();
            DRB.Metadata.CurrentNode.data.configuration.useAlternateKey = true;
            if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.alternateKeyName)) {
                // Alternate Key Name present, we trigger the binding of Alternate Key dropdown
                $("#" + DRB.DOM.AlternateKey.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.alternateKeyName).change();
            } else {
                // Alternate Key Name not present, we trigger the binding of Alternate Key dropdown
                $("#" + DRB.DOM.AlternateKey.Dropdown.Id).val("").change();
            }
        } else {
            // Selected No, update configuration values
            $("#" + DRB.DOM.AlternateKey.Div.Id).hide();
            $("#" + DRB.DOM.PrimaryId.Div.Id).show();
            DRB.Metadata.CurrentNode.data.configuration.useAlternateKey = false;
            // we trigger the binding of Alternate Key dropdown
            $("#" + DRB.DOM.AlternateKey.Dropdown.Id).val("").change();
        }
    });
}

/**
 * Logic - Bind Alternate Key Value
 * @param {string} id Id
 */
DRB.Logic.BindAlternateKeyValue = function (id) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        var currentField = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields[elementIndex]));
        // if normal textbox save to the value property
        if (controlName.indexOf("txt_") === 0) { currentField.value = controlValue; }
        // if normal drodpown save to the value property and hide/show the X
        if (controlName.indexOf("cbx1_") === 0) {
            currentField.value = controlValue;
            if (DRB.Utilities.HasValue(controlValue)) { $('[data-id="' + controlName + '"]').children().last().show(); }
            else { $('[data-id="' + controlName + '"]').children().last().hide(); }
        }
        // datetime
        if (controlName.indexOf("txtd_") === 0) {
            currentField.value = controlValue;
            currentField.dateTimeBehavior = $("#" + controlName).attr("data-datetimebehavior");
        }
        // if textbox belonging to a lookup save to the value.id property
        if (controlName.indexOf("txt2_") === 0) {
            if (!DRB.Utilities.HasValue(currentField.value)) { currentField.value = {}; }
            currentField.value.id = controlValue;
        }
        if (controlName.indexOf("cbx2_") === 0) {
            if (!DRB.Utilities.HasValue(currentField.value)) { currentField.value = {}; }
            currentField.value.entityType = controlValue;
            var tableSetName = "";
            var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, controlValue);
            if (DRB.Utilities.HasValue(checkTable)) { tableSetName = checkTable.EntitySetName; }
            currentField.value.entitySetName = tableSetName;
        }
        DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields[elementIndex] = currentField;
    });
}

/**
 * Logic - Bind Alternate Key
 * @param {string} id Id
 */
DRB.Logic.BindAlternateKey = function (id) {
    $("#" + id).on("change", function (e) {
        var alternateKeyLogicalName = $(this).val();
        var keyHasPolymorphicLookup = false;
        DRB.Metadata.CurrentNode.data.configuration.alternateKeyName = alternateKeyLogicalName;
        var key = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentAlternateKeys, alternateKeyLogicalName);
        if (DRB.Utilities.HasValue(key)) {
            var keyFields = [];
            var allowedKeyTypes = ["Uniqueidentifier", "String", "Integer", "Decimal", "Picklist", "Lookup", "DateTime"];
            key.KeyAttributes.forEach(function (keyAttribute) {
                var keyColumn = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, keyAttribute);
                if (DRB.Utilities.HasValue(keyColumn)) {
                    if (allowedKeyTypes.indexOf(keyColumn.AttributeType) > -1) {
                        if (keyColumn.AdditionalProperties.IsPolymorphic === true) { keyHasPolymorphicLookup = true; }
                        var keyField = DRB.Utilities.GetRecordByProperty(DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields, "logicalName", keyColumn.LogicalName);
                        var keyColumnValue = null;
                        if (DRB.Utilities.HasValue(keyField)) {
                            // lookup store the value in a different ways than others key types
                            if (keyColumn.AttributeType === "Lookup") {
                                var lookupValue = { entityType: "", entitySetName: "", id: "" };
                                if (DRB.Utilities.HasValue(keyField.value)) {
                                    if (DRB.Utilities.HasValue(keyField.value.id)) { lookupValue.id = keyField.value.id; }
                                    if (DRB.Utilities.HasValue(keyField.value.entityType)) { lookupValue.entityType = keyField.value.entityType; }
                                    if (DRB.Utilities.HasValue(keyField.value.entitySetName)) { lookupValue.entitySetName = keyField.value.entitySetName; }
                                }
                                keyColumnValue = lookupValue;
                            } else {
                                keyColumnValue = keyField.value;
                            }
                        }
                        keyFields.push({ logicalName: keyColumn.LogicalName, schemaName: keyColumn.SchemaName, oDataName: keyColumn.ODataName, label: keyColumn.Name, type: keyColumn.AttributeType, value: keyColumnValue });
                    }
                }
            });
            DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields = keyFields;
        } else {
            DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields = [];
        }

        $("#" + DRB.DOM.AlternateKey.DivColumns.Id).empty();

        if (keyHasPolymorphicLookup === true) {
            DRB.UI.ShowError("Unsupported Alternate Key", "This Alternate Key uses a Polymorphic Lookup");
            $(this).val("");
            DRB.UI.RefreshDropdown($(this).attr('id'));
            $(this).change();
            return;
        }

        if (DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields.length > 0) {
            // create the HTML table containing the Key Columns 
            $("#" + DRB.DOM.AlternateKey.DivColumns.Id).append(DRB.UI.CreateSpacer());
            var divTable = DRB.UI.CreateTable(DRB.DOM.AlternateKey.Table.Id);
            $("#" + DRB.DOM.AlternateKey.DivColumns.Id).append(divTable);
            DRB.Metadata.CurrentNode.data.configuration.alternateKeyFields.forEach(function (field, fieldIndex) {

                var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, field.logicalName);
                if (DRB.Utilities.HasValue(column)) {
                    var tr = DRB.UI.CreateTr(DRB.DOM.AlternateKey.Tr.Id + fieldIndex);
                    var tdColumn = DRB.UI.CreateTd(DRB.DOM.AlternateKey.TdColumn.Id + fieldIndex);
                    var divValue = DRB.UI.CreateTd(DRB.DOM.AlternateKey.TdValue.Id + fieldIndex);
                    divTable.append(tr);
                    tr.append(tdColumn);
                    tr.append(divValue);
                    // set label
                    tdColumn.append(DRB.UI.CreateSpan("span_" + DRB.DOM.AlternateKey.TdColumn.Id + fieldIndex, field.label, field.logicalName));

                    switch (field.type) {
                        case "Uniqueidentifier":
                            divValue.append(DRB.UI.CreateInputGuid("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex));
                            DRB.Common.BindGuid("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            DRB.Logic.BindAlternateKeyValue("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change();
                            break;
                        case "String":
                            divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                            DRB.Logic.BindAlternateKeyValue("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change();
                            break;
                        case "Integer":
                            divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue));
                            DRB.Common.BindInteger("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                            DRB.Logic.BindAlternateKeyValue("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change().trigger("input");
                            break;
                        case "Decimal":
                            divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue + " - Precision: " + column.AdditionalProperties.Precision));
                            DRB.Common.BindNumber("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                            DRB.Logic.BindAlternateKeyValue("txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txt_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change().trigger("input");
                            break;
                        case "Picklist":
                            var currentId = "cbx1_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex;
                            divValue.append(DRB.UI.CreateDropdown(currentId));
                            var options = [];
                            if (DRB.Utilities.HasValue(column.OptionValues)) {
                                column.OptionValues.forEach(function (option) {
                                    options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                                });
                            }
                            DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                            $('[data-id="' + currentId + '"]').append(DRB.UI.CreateRemoveButton(DRB.UI.UnselectDropdown, currentId));
                            $('[data-id="' + currentId + '"]').children().last().hide();
                            DRB.Logic.BindAlternateKeyValue("cbx1_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#cbx1_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change();
                            break;

                        case "Lookup":
                            divValue.append(DRB.UI.CreateInputGuid("txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex));
                            DRB.Common.BindGuid("txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            DRB.Logic.BindAlternateKeyValue("txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);

                            if (DRB.Utilities.HasValue(field.value) && DRB.Utilities.HasValue(field.value.id)) {
                                $("#txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value.id).change();
                            }
                            $("#txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).trigger("input");
                            if (column.AdditionalProperties.Targets.length > 0) {
                                divValue.append(DRB.UI.CreateSimpleDropdown("cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex));
                                var targets = [];
                                column.AdditionalProperties.Targets.forEach(function (target) {
                                    var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                                    if (DRB.Utilities.HasValue(targetTable)) {
                                        targets.push(new DRB.Models.Table(target, targetTable.Name));
                                    }
                                });
                                DRB.UI.FillDropdown("cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, "", new DRB.Models.Records(targets).ToDropdown());
                                divValue.append(DRB.UI.CreateLookup("lkp_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, DRB.UI.OpenLookup,
                                    {
                                        openCustom: true,
                                        defaultEntityType: column.AdditionalProperties.Targets[0],
                                        entityTypes: column.AdditionalProperties.Targets,
                                        textId: "txt2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex,
                                        dropdownId: "cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex
                                    }));

                                DRB.Logic.BindAlternateKeyValue("cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                                if (DRB.Utilities.HasValue(field.value) && DRB.Utilities.HasValue(field.value.entityType)) {
                                    $("#cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value.entityType).change();
                                } else {
                                    $("#cbx2_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(targets[0].Id).change();
                                }
                            }
                            break;

                        case "DateTime":
                            var clearedDateTimeFormat = "";
                            var pickerFormat = "YYYY-MM-DD HH:mm";
                            if (DRB.Utilities.HasValue(column.AdditionalProperties.DateTimeFormat)) {
                                if (column.AdditionalProperties.DateTimeFormat === "DateOnly") { pickerFormat = "YYYY-MM-DD"; }
                                clearedDateTimeFormat = column.AdditionalProperties.DateTimeFormat.replace(/([A-Z])/g, ' $1').trim();
                            }

                            var dateTimeBehavior = "ND"; // not defined
                            var clearedDateTimeBehavior = "";
                            if (DRB.Utilities.HasValue(column.AdditionalProperties.DateTimeBehavior)) {
                                dateTimeBehavior = column.AdditionalProperties.DateTimeBehavior;
                                clearedDateTimeBehavior = column.AdditionalProperties.DateTimeBehavior.replace(/([A-Z])/g, ' $1').trim();
                            }

                            if (clearedDateTimeBehavior === "Time Zone Independent") { clearedDateTimeBehavior = "TZI"; }
                            divValue.append(DRB.UI.CreateInputDateTime("txtd_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex, dateTimeBehavior, "Behavior: " + clearedDateTimeBehavior + " - Format: " + clearedDateTimeFormat));
                            DRB.Logic.BindAlternateKeyValue("txtd_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex);
                            $("#txtd_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).val(field.value).change();
                            $("#txtd_" + DRB.DOM.AlternateKey.ControlValue.Id + fieldIndex).datetimepicker({ format: pickerFormat, ignoreReadonly: true, showClear: true, showTodayButton: true }).on('dp.change', function (e) { $(e.target).change(); });
                            break;
                    }
                }
            });
        }
    });
}

/**
 * Logic - Bind Columns
 * @param {string} id Id
*/
DRB.Logic.BindColumns = function (id) {
    $("#" + id).on("change", function (e) {
        DRB.Metadata.CurrentNode.data.configuration.fields = [];
        var selectedColumns = $(this).val();
        selectedColumns.forEach(function (selectedColumn) {
            var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, selectedColumn);
            if (DRB.Utilities.HasValue(column)) {
                DRB.Metadata.CurrentNode.data.configuration.fields.push({ logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName });
            }
        });
    });
}

/**
 * Logic - Bind Select Relationship
 * @param {string} id Id
*/
DRB.Logic.BindSelectRelationship = function (id, metadataRelationship, domSelectColumnsDropdown, domRelationshipDropdown) {
    $("#" + id).on("change", function (e) {
        var selectedRelationshipValue = $(this).val();
        var selectedRelationship = DRB.Utilities.GetRecordById(metadataRelationship, selectedRelationshipValue);
        if (DRB.Utilities.HasValue(selectedRelationship)) {

            var columns = [];
            selectedRelationship.Columns.forEach(function (rc) {
                var rcColumn = new DRB.Models.Column(rc.ColumnLogicalName, rc.Name, rc.ColumnSchemaName, rc.ColumnAttributeType, rc.ColumnIsPrimaryIdAttribute, rc.ColumnIsPrimaryNameAttribute, rc.ColumnRequiredLevel, rc.ColumnIsValidForRead, rc.ColumnIsValidForCreate, rc.ColumnIsValidForUpdate, rc.ColumnAdditionalProperties);
                rcColumn.Id = rc.Id;
                columns.push(rcColumn);
            });

            DRB.UI.FillDropdown(domSelectColumnsDropdown.Id, domSelectColumnsDropdown.Name, new DRB.Models.Records(columns).ToDropdown(), false, false, false, 6);
            // get all the values in the main dropdown
            var relationshipColumsValues = $.map($("#" + domRelationshipDropdown.Id + " option"), function (option) { return option.value; });
            var alreadySelectedColumns = [];
            relationshipColumsValues.forEach(function (relationshipColumsValue) {
                if (relationshipColumsValue.indexOf(selectedRelationship.SchemaName + "|") === 0) { alreadySelectedColumns.push(relationshipColumsValue); }
            });
            $("#" + domSelectColumnsDropdown.Id).val(alreadySelectedColumns);
            DRB.UI.RefreshDropdown(domSelectColumnsDropdown.Id);
        }
    });
}

/**
 * Logic - Bind Select Relationship Columns
 * @param {string} id Id
*/
DRB.Logic.BindSelectRelationshipColumns = function (id, relationshipType, relationshipMetadata) {
    $("#" + id).on("change", function (e) {
        var selectedColumnsValue = $(this).val();
        // Get the relationship
        var selectedRelationshipValue = $("#" + DRB.DOM.RelationshipSelect.Relationship.Dropdown.Id).val();
        if (DRB.Utilities.HasValue(selectedRelationshipValue)) {

            var newRelationshipColumns = []; // array to store the selection
            // get the already filled columns
            var fullRelationshipColumns = $.map($("#" + DRB.DOM.Relationship[relationshipType].Dropdown.Id + " option"), function (option) { return option.value; });

            // we add the other relationship columns except the current one
            fullRelationshipColumns.forEach(function (fullOneToManyColumn) {
                if (fullOneToManyColumn.indexOf(selectedRelationshipValue + "|") !== 0) { newRelationshipColumns.push(fullOneToManyColumn); }
            });

            // we add to the new columns list the selected one
            selectedColumnsValue.forEach(function (selectedColumnValue) { newRelationshipColumns.push(selectedColumnValue); });

            var relationshipRecords = [];
            newRelationshipColumns.forEach(function (rlColumn) {
                var rlColumnSplit = rlColumn.split("|");
                if (rlColumnSplit.length === 2) {
                    var relationship = DRB.Utilities.GetRecordById(relationshipMetadata, rlColumnSplit[0]);
                    if (DRB.Utilities.HasValue(relationship)) {
                        var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, relationship.TargetTable);
                        if (DRB.Utilities.HasValue(targetTable)) {
                            var targetColumns = targetTable.Columns;
                            targetColumns.forEach(function (targetColumn) {
                                if (targetColumn.LogicalName === rlColumnSplit[1]) {
                                    relationshipRecords.push(new DRB.Models.RelationshipColumn(relationship.SchemaName, relationship.Type, relationship.NavigationProperty, relationship.NavigationAttribute, relationship.NavigationAttributeName, relationship.TargetTable, targetTable.Name, targetColumn.LogicalName, targetColumn.Name, targetColumn.SchemaName, targetColumn.AttributeType, targetColumn.IsPrimaryIdAttribute, targetColumn.IsPrimaryNameAttribute, targetColumn.RequiredLevel, targetColumn.IsValidForRead, targetColumn.IsValidForCreate, targetColumn.IsValidForUpdate, targetColumn.AdditionalProperties));
                                }
                            });
                        }
                    }
                }
            });
            // refresh the main relationship dropdown
            DRB.UI.FillDropdownWithGroups(DRB.DOM.Relationship[relationshipType].Dropdown.Id, DRB.DOM.Relationship[relationshipType].Dropdown.Name, new DRB.Models.Records(relationshipRecords).ToDropdown(), true);
            // refresh also the CurrentNode
            var refreshedRelationshipColumns = $.map($("#" + DRB.DOM.Relationship[relationshipType].Dropdown.Id + " option"), function (option) { return option.value; });
            var parsedResult = DRB.Logic.ExportRelationships(refreshedRelationshipColumns, relationshipMetadata);

            switch (relationshipType) {
                case "OneToMany": DRB.Metadata.CurrentNode.data.configuration.oneToMany = parsedResult; break;
                case "ManyToOne": DRB.Metadata.CurrentNode.data.configuration.manyToOne = parsedResult; break;
                case "ManyToMany": DRB.Metadata.CurrentNode.data.configuration.manyToMany = parsedResult; break;
            }
        }
    });
}

/**
 * Logic - Click Select Relationship Columns
 * @param {string} relationshipType Relationship Type
*/
DRB.Logic.ClickSelectRelationshipColumns = function (relationshipType) {
    var relationshipMetadata = null;
    var popupTitle = DRB.DOM.Relationship[relationshipType].Span.Name;
    switch (relationshipType) {
        case "OneToMany": relationshipMetadata = DRB.Metadata.CurrentOneToMany; break;
        case "ManyToOne": relationshipMetadata = DRB.Metadata.CurrentManyToOne; break;
        case "ManyToMany": relationshipMetadata = DRB.Metadata.CurrentManyToMany; break;
    }

    var selectDOM = DRB.DOM.RelationshipSelect;
    var relationshipSelectionDiv = DRB.UI.CreateEmptyDiv(selectDOM.Div.Id);

    relationshipSelectionDiv.append(DRB.UI.CreateSpan(selectDOM.Relationship.Span.Id, selectDOM.Relationship.Span.Name));
    relationshipSelectionDiv.append(DRB.UI.CreateDropdown(selectDOM.Relationship.Dropdown.Id));
    relationshipSelectionDiv.append(DRB.UI.CreateSpacer());
    relationshipSelectionDiv.append(DRB.UI.CreateSpan(selectDOM.Columns.Span.Id, selectDOM.Columns.Span.Name));
    relationshipSelectionDiv.append(DRB.UI.CreateDropdown(selectDOM.Columns.Dropdown.Id, true));
    relationshipSelectionDiv.append(DRB.UI.CreateSpacing());

    DRB.UI.Show(popupTitle, relationshipSelectionDiv, "xl");
    DRB.UI.FillDropdown(selectDOM.Relationship.Dropdown.Id, selectDOM.Relationship.Dropdown.Name, new DRB.Models.Records(relationshipMetadata).ToDropdown(), false, false, false, 6);

    // Make text bold on the relationships where at least a column is selected    
    var currentRelationshipValues = $.map($("#" + DRB.DOM.Relationship[relationshipType].Dropdown.Id + " option"), function (option) { return option.value; });
    var currentRelationshipNames = [];
    currentRelationshipValues.forEach(function (currentRelationshipValue) {
        var relationshipSplit = currentRelationshipValue.split("|");
        if (relationshipSplit.length === 2) { currentRelationshipNames.push(relationshipSplit[0]); }
    });
    currentRelationshipNames = DRB.Utilities.RemoveDuplicatesFromArray(currentRelationshipNames); // remove duplicates

    if (currentRelationshipNames.length > 0) {
        var relationshipOptions = $.map($("#" + selectDOM.Relationship.Dropdown.Id + " option"), function (option) { return option; });
        relationshipOptions.forEach(function (relationshipOption) {
            if (currentRelationshipNames.indexOf(relationshipOption.value) > -1) { relationshipOption.style = "font-weight: bold;"; }
        });
        DRB.UI.RefreshDropdown(selectDOM.Relationship.Dropdown.Id);
    }

    DRB.UI.ResetDropdown(selectDOM.Columns.Dropdown.Id, selectDOM.Columns.Dropdown.Name);
    // Bindings
    DRB.Logic.BindSelectRelationship(selectDOM.Relationship.Dropdown.Id, relationshipMetadata, selectDOM.Columns.Dropdown, DRB.DOM.Relationship[relationshipType].Dropdown);
    DRB.Logic.BindSelectRelationshipColumns(selectDOM.Columns.Dropdown.Id, relationshipType, relationshipMetadata);
}
// #endregion  
 
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
DRB.GenerateCode.SetCodeEditors = function (codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals) {
    if (!DRB.Utilities.HasValue(codeXrmWebApi)) { codeXrmWebApi = []; }
    if (!DRB.Utilities.HasValue(codeXrmWebApiExecute)) { codeXrmWebApiExecute = []; } // Xrm.WebApi execute is available only for Retrieve Single, Create, Update, Delete
    if (!DRB.Utilities.HasValue(codejQuery)) { codejQuery = []; }
    if (!DRB.Utilities.HasValue(codeXMLHttpRequest)) { codeXMLHttpRequest = []; }
    if (!DRB.Utilities.HasValue(codeFetchAPI)) { codeFetchAPI = []; }
    if (!DRB.Utilities.HasValue(codePortals)) { codePortals = []; } // Portals is available only for Retrieve Single, Retrieve Multiple, Create, Update, Delete, Associate, Disassociate

    DRB.Settings.Editors["code_xrmwebapi"].session.setValue(codeXrmWebApi.join('\n'));
    DRB.Settings.Editors["code_xrmwebapiexecute"].session.setValue(codeXrmWebApiExecute.join('\n'));
    DRB.Settings.Editors["code_fetchapi"].session.setValue(codeFetchAPI.join('\n'));
    DRB.Settings.Editors["code_jquery"].session.setValue(codejQuery.join('\n'));
    DRB.Settings.Editors["code_xmlhttprequest"].session.setValue(codeXMLHttpRequest.join('\n'));
    DRB.Settings.Editors["code_portals"].session.setValue(codePortals.join('\n'));
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

                            case "Above": // Microsoft.Dynamics.CRM.Above(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                            case "AboveOrEqual": // Microsoft.Dynamics.CRM.AboveOrEqual(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                            case "NotUnder": // Microsoft.Dynamics.CRM.NotUnder(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                            case "Under": // Microsoft.Dynamics.CRM.Under(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                            case "UnderOrEqual": // Microsoft.Dynamics.CRM.UnderOrEqual(PropertyName='accountid',PropertyValue='51de97a6-f82e-1472-376d-11949cb13d52')
                                operatorFound = true;
                                var clearedValue = filterField.value;
                                partialQuery += "Microsoft.Dynamics.CRM." + filterField.operator + "(PropertyName='" + filterField.oDataName + "',PropertyValue='" + clearedValue + "')";
                                break;
                        }
                        if (operatorFound === false) {
                            // default syntax: fieldname operator value
                            var clearedValue = "";
                            var fieldName = filterField.oDataName;

                            if (DRB.Utilities.HasValue(filterField.value)) { clearedValue = filterField.value; }
                            if (filterField.type === "EntityName" || filterField.type === "String" || filterField.type === "Memo") {
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

                            if (filterField.type === "ManagedProperty") {
                                fieldName = filterField.oDataName + "/Value";
                            }

                            partialQuery += fieldName + " " + filterField.operator + " " + clearedValue;

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
    var codeFetchAPI = [];
    var codePortals = [];

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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
    codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
    codePortals.push('\t\tvar result = data;');
    codePortals.push('\t\tconsole.log(result);');

    var codeFieldsPortals = [];
    codeFields.forEach(function (codeField) { codeFieldsPortals.push('\t\t' + codeField); });
    codePortals.push(codeFieldsPortals.join('\n'));

    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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
    codeXrmWebApi.push('// NOTE: createRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.createRecord');
    codeXrmWebApi.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');

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
    // #endregion

    // #region Xrm.WebApi.execute
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
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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
    codeXrmWebApi.push('// NOTE: updateRecord is available in offline mode, if you need this functionality change the call to Xrm.WebApi.offline.updateRecord');
    codeXrmWebApi.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/offline');

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
    // #endregion

    // #region Xrm.WebApi.execute
    codeXrmWebApiExecute = DRB.GenerateCode.GetXrmWebApiWarnings(settings);
    codeXrmWebApiExecute.push('// NOTE: you can use Xrm.WebApi.online.execute if this request needs to be part of an executeMultiple collection');
    codeXrmWebApiExecute.push('// https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/executemultiple');

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
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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

    if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
        // Don't generate the code if a table is not selected
        var errorMessage = "// Select a Table first";
        codeXrmWebApi.push(errorMessage);
        codeXrmWebApiExecute.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        codePortals.push(errorMessage);

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, codeXrmWebApiExecute, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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
    codeXrmWebApi.push('Xrm.WebApi.online.execute(associateRequest).then(');
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
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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

        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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
    codePortals.push('\t}');
    codePortals.push('});');
    // #endregion

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.queryType)) {
        // Don't generate the code if a table or a query type is not selected
        var errorMessage = "";
        if (!DRB.Utilities.HasValue(settings.primaryEntity)) { errorMessage = "// Select a Table first"; }
        else { errorMessage = "// Select a Query Type first"; }

        codeXrmWebApi.push(errorMessage);
        codejQuery.push(errorMessage);
        codeXMLHttpRequest.push(errorMessage);
        codeFetchAPI.push(errorMessage);
        DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, null);
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

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, null);
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
        codeFetchAPI.push('\t},');
        codeFetchAPI.push('\tbody: JSON.stringify(parameters)');
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

    DRB.GenerateCode.SetCodeEditors(codeXrmWebApi, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, null);
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

    if (!DRB.Utilities.HasValue(settings.primaryEntity) || !DRB.Utilities.HasValue(settings.fileField) || !DRB.Utilities.HasValue(settings.fileOperation)) {
        var errorMessage = "";

        if (!DRB.Utilities.HasValue(settings.primaryEntity)) {
            // Don't generate the code if a table is not selected
            errorMessage = "// Select a Table first";
            codejQuery.push(errorMessage);
            codeXMLHttpRequest.push(errorMessage);
            codeFetchAPI.push(errorMessage);
            codePortals.push(errorMessage);
        }

        if (!DRB.Utilities.HasValue(settings.fileField)) {
            // Don't generate the code if a table is not selected
            errorMessage = "// Select a Column first";
            codejQuery.push(errorMessage);
            codeXMLHttpRequest.push(errorMessage);
            codeFetchAPI.push(errorMessage);
            codePortals.push(errorMessage);
        }

        if (!DRB.Utilities.HasValue(settings.fileOperation)) {
            // Don't generate the code if a table is not selected
            errorMessage = "// Select an Operation first";
            codejQuery.push(errorMessage);
            codeXMLHttpRequest.push(errorMessage);
            codeFetchAPI.push(errorMessage);
            codePortals.push(errorMessage);
        }

        DRB.GenerateCode.SetCodeEditors(null, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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

    var entityCriteria = settings.primaryId;
    var field = "";
    if (DRB.Utilities.HasValue(settings.fileField)) { field = settings.fileField.logicalName; }
    var mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")";
    var portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")";
    switch (settings.fileOperation) {
        case "retrieve":
            mainUrl = "/api/data/" + settings.version + "/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field + "/$value";
            portalsUrl = "/_api/" + settings.primaryEntity.entitySetName + "(" + entityCriteria + ")/" + field + "/$value";
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

            var downloadFileCode = [];
            downloadFileCode.push('// NOTE: Uncomment the following lines to download the file');
            downloadFileCode.push('// var saveFile = new Blob([fileContent], { type: "application/octet-stream" });');
            downloadFileCode.push('// var customLink = document.createElement("a");');
            downloadFileCode.push('// customLink.href = URL.createObjectURL(saveFile);');
            downloadFileCode.push('// customLink.download = fileName;');
            downloadFileCode.push('// customLink.click();');

            var downloadFileCodeFetchAPI = [];
            downloadFileCodeFetchAPI.push('// NOTE: Uncomment the following lines to download the file');
            downloadFileCodeFetchAPI.push('// var saveFile = fileContent;');
            downloadFileCodeFetchAPI.push('// var customLink = document.createElement("a");');
            downloadFileCodeFetchAPI.push('// customLink.href = URL.createObjectURL(saveFile);');
            downloadFileCodeFetchAPI.push('// customLink.download = fileName;');
            downloadFileCodeFetchAPI.push('// customLink.click();');

            // #region jQuery
            codejQuery.push('$.ajax({');
            codejQuery.push('\ttype: "GET",');
            codejQuery.push('\txhr: function() { var xhr = new XMLHttpRequest(); xhr.responseType = "blob"; return xhr; },');
            codejQuery.push('\turl: Xrm.Utility.getGlobalContext().getClientUrl() + "' + mainUrl + '",');
            codejQuery.push('\tasync: ' + settings.async + ',');
            codejQuery.push('\theaders: {');
            jQueryHeaders.forEach(function (reqHeader) { codejQuery.push('\t\t' + reqHeader); });
            codejQuery.push('\t},');
            codejQuery.push('\tsuccess: function (data, textStatus, xhr) {');
            codejQuery.push('\t\tif (xhr.status === 200) {');
            codejQuery.push('\t\t\tvar fileContent = data;');
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
            codeXMLHttpRequest.push('req.responseType = "blob";');
            codeXMLHttpRequest.push('req.onreadystatechange = function () {');
            codeXMLHttpRequest.push('\tif (this.readyState === 4) {');
            codeXMLHttpRequest.push('\t\treq.onreadystatechange = null;');
            codeXMLHttpRequest.push('\t\tif (this.status === 200) {');
            codeXMLHttpRequest.push('\t\t\tvar fileContent = this.response;');
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
            codeFetchAPI.push('\t\tif (response.ok) {');
            codeFetchAPI.push('\t\t\treturn response.blob().then((blob) => { return [response, blob]; });');
            codeFetchAPI.push('\t\t} else {');
            codeFetchAPI.push('\t\t\treturn response.json().then((json) => { throw json.error; });');
            codeFetchAPI.push('\t\t}');
            codeFetchAPI.push('\t}');
            codeFetchAPI.push(').then(function (responseObjects) {');
            codeFetchAPI.push('\tvar response = responseObjects[0];');
            codeFetchAPI.push('\tvar responseBlob = responseObjects[1];');
            codeFetchAPI.push('\tif (response.status === 200) {');
            codeFetchAPI.push('\t\tvar fileContent = responseBlob;');
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
            codePortals.push('\txhr: function() { var xhr = new XMLHttpRequest(); xhr.responseType = "blob"; return xhr; },');
            codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
            codePortals.push('\t\tvar fileContent = data;');
            codePortals.push('\t\tvar fileName = "' + defaultFileName + '"; // default name');
            if (fileFullSize === true) {
                fullSizeCodejQuery.forEach(function (line) { codePortals.push('\t\t' + line); });
                fullSizeCode.forEach(function (line) { codePortals.push('\t\t' + line); });
            }
            codePortals.push('');
            codePortals.push('\t\tconsole.log("' + currentType + ' retrieved. Name: " + fileName);');
            codePortals.push('');
            downloadFileCode.forEach(function (line) { codePortals.push('\t\t' + line); });
            codePortals.push('\t}');
            codePortals.push('});');
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
            uploadCode.push('for (var i = 0; i < byteCharacters.length; i++) {');
            uploadCode.push('\tbyteNumbers[i] = byteCharacters.charCodeAt(i);');
            uploadCode.push('}');
            uploadCode.push('var fileContent = new Uint8Array(byteNumbers);');
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
            codePortals.push('\ttype: "PATCH",');
            codePortals.push('\turl: "' + portalsUrl + '" + fileName,');
            codePortals.push('\tcontentType: "application/octet-stream",'); // Binary upload
            codePortals.push('\tdata: fileContent,');
            codePortals.push('\tprocessData: false,');
            codePortals.push('\tsuccess: function (data, textStatus, xhr) {');
            codePortals.push('\t\tconsole.log("' + currentType + ' uploaded");');
            codePortals.push('\t}');
            codePortals.push('});');
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
            codePortals.push('\t}');
            codePortals.push('});');
            // #endregion
            break;
    }
    DRB.GenerateCode.SetCodeEditors(null, null, codejQuery, codeXMLHttpRequest, codeFetchAPI, codePortals);
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
    var postmanHeader = DRB.GeneratePostman.GetRequestHeaders(settings, isBinary);
    return { postmanMethod: method, postmanUrl: postmanUrl, postmanHeader: postmanHeader, postmanBody: postmanBody };
}

/**
 * Generate Postman - Get Request Headers
 * @param {any} settings Configuration
 */
DRB.GeneratePostman.GetRequestHeaders = function (settings, isBinary) {
    // Request Headers
    var headers = [];
    var headerValues = DRB.GenerateCode.GetRequestHeaderValues(settings, isBinary);
    Object.keys(headerValues).forEach(function (headerKey) {
        headers.push({ key: headerKey, value: headerValues[headerKey], type: "text" });
        if (headerKey === "If-None-Match" && headerValues[headerKey] === "W/\\\"000000\\\"") {
            headers[headers.length - 1] = { key: headerKey, value: 'W/"000000"', type: "text" };
        }
    });
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
            case "EntityName":
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

            case "ManagedProperty":
                var clearedValue = field.value;
                if (!DRB.Utilities.HasValue(clearedValue)) { clearedValue = null; }
                upsertBody.push('\t"' + field.logicalName + '": { Value: ' + clearedValue + ' },');
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
        var fileName = "file.bin";
        if (DRB.Utilities.HasValue(settings.fileName)) { fileName = encodeURIComponent(settings.fileName); }

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
 
// #region DRB.CustomUI
/**
 * Add Spacer
 */
DRB.CustomUI.AddSpacer = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpacer());
}

/**
 * Add Version
 */
DRB.CustomUI.AddVersion = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Version.Span.Id, DRB.DOM.Version.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.Version.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Version.Dropdown.Id, DRB.DOM.Version.Dropdown.Name, new DRB.Models.Records(DRB.Settings.Versions).ToDropdown());
    DRB.Logic.BindPropertyValue(DRB.DOM.Version.Dropdown.Id, "version");
    var selectedVersion = DRB.Settings.Versions[DRB.Settings.Versions.length - 1].Id;
    var versionExists = DRB.Utilities.GetRecordById(DRB.Settings.Versions, DRB.Metadata.CurrentNode.data.configuration.version);
    if (DRB.Utilities.HasValue(versionExists)) { selectedVersion = versionExists.Id; }
    $("#" + DRB.DOM.Version.Dropdown.Id).val(selectedVersion).change();
}

/**
 * Add Process
 */
DRB.CustomUI.AddProcess = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Process.Span.Id, DRB.DOM.Process.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.Process.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Process.Dropdown.Id, DRB.DOM.Process.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsAyncSync).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.Process.Dropdown.Id, "async");
    var processValue = "yes";
    if (DRB.Metadata.CurrentNode.data.configuration.async === false) { processValue = "no"; }
    $("#" + DRB.DOM.Process.Dropdown.Id).val(processValue).change();
}

/**
 * Add Token Header
 */
DRB.CustomUI.AddTokenHeader = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.TokenHeader.Span.Id, DRB.DOM.TokenHeader.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.TokenHeader.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.TokenHeader.Dropdown.Id, DRB.DOM.TokenHeader.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.TokenHeader.Dropdown.Id, "tokenHeader");
    var tokenHeaderValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.tokenHeader === true) { tokenHeaderValue = "yes"; }
    $("#" + DRB.DOM.TokenHeader.Dropdown.Id).val(tokenHeaderValue).change();
}

/**
 * Add Impersonate Dropdown
 */
DRB.CustomUI.AddImpersonate = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Impersonate.Span.Id, DRB.DOM.Impersonate.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.Impersonate.Dropdown.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.ImpersonateId.Div.Id, DRB.DOM.ImpersonateId.Div.Class));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.ImpersonateId.TypeSpan.Id, DRB.DOM.ImpersonateId.TypeSpan.Name));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.ImpersonateId.Dropdown.Id));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.ImpersonateId.Span.Id, DRB.DOM.ImpersonateId.Span.Name));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateInputGuid(DRB.DOM.ImpersonateId.Input.Id));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).append(DRB.UI.CreateLookup(DRB.DOM.ImpersonateId.Lookup.Id, DRB.UI.OpenLookup, { openUser: true, textId: DRB.DOM.ImpersonateId.Input.Id }));
    $("#" + DRB.DOM.ImpersonateId.Div.Id).hide();

    DRB.UI.FillDropdown(DRB.DOM.Impersonate.Dropdown.Id, DRB.DOM.Impersonate.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindImpersonate(DRB.DOM.Impersonate.Dropdown.Id);
    DRB.UI.FillDropdown(DRB.DOM.ImpersonateId.Dropdown.Id, DRB.DOM.ImpersonateId.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsImpersonation).ToDropdown());
    DRB.Logic.BindImpersonateType(DRB.DOM.ImpersonateId.Dropdown.Id);
    DRB.Logic.BindImpersonateId(DRB.DOM.ImpersonateId.Input.Id);
    DRB.Common.BindGuid(DRB.DOM.ImpersonateId.Input.Id);
    var impersonateValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.impersonate === true) { impersonateValue = "yes"; }
    $("#" + DRB.DOM.Impersonate.Dropdown.Id).val(impersonateValue).change();

    var impersonateType = "mscrmcallerid";
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.impersonateType)) { impersonateType = DRB.Metadata.CurrentNode.data.configuration.impersonateType; }
    $("#" + DRB.DOM.ImpersonateId.Dropdown.Id).val(impersonateType).change();

    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.impersonateId)) {
        $("#" + DRB.DOM.ImpersonateId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.impersonateId).trigger("input");
    }
}

/**
 * Add Formatted Values
 */
DRB.CustomUI.AddFormattedValues = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.FormattedValues.Span.Id, DRB.DOM.FormattedValues.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.FormattedValues.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.FormattedValues.Dropdown.Id, DRB.DOM.FormattedValues.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.FormattedValues.Dropdown.Id, "formattedValues");
    var formattedValuesValue = "yes";
    if (DRB.Metadata.CurrentNode.data.configuration.formattedValues === false) { formattedValuesValue = "no"; }
    $("#" + DRB.DOM.FormattedValues.Dropdown.Id).val(formattedValuesValue).change();
}

/**
 * Add Detect Changes
 */
DRB.CustomUI.AddDetectChanges = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.DetectChanges.Span.Id, DRB.DOM.DetectChanges.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.DetectChanges.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.DetectChanges.Dropdown.Id, DRB.DOM.DetectChanges.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.DetectChanges.Dropdown.Id, "detectChanges");
    var detectChangesValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.detectChanges === true) { detectChangesValue = "yes"; }
    $("#" + DRB.DOM.DetectChanges.Dropdown.Id).val(detectChangesValue).change();
}

/**
 * Add Detect Duplicates
 */
DRB.CustomUI.AddDetectDuplicates = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.DetectDuplicates.Span.Id, DRB.DOM.DetectDuplicates.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.DetectDuplicates.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.DetectDuplicates.Dropdown.Id, DRB.DOM.DetectDuplicates.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.DetectDuplicates.Dropdown.Id, "detectDuplicates");
    var detectDuplicatesValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.detectDuplicates === true) { detectDuplicatesValue = "yes"; }
    $("#" + DRB.DOM.DetectDuplicates.Dropdown.Id).val(detectDuplicatesValue).change();
}

/**
 * Add Retrieve Count
 */
DRB.CustomUI.AddRetrieveCount = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.RetrieveCount.Span.Id, DRB.DOM.RetrieveCount.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.RetrieveCount.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.RetrieveCount.Dropdown.Id, DRB.DOM.RetrieveCount.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindPropertyBooleanValue(DRB.DOM.RetrieveCount.Dropdown.Id, "retrieveCount");
    var retrieveCountValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.retrieveCount === true) { retrieveCountValue = "yes"; }
    $("#" + DRB.DOM.RetrieveCount.Dropdown.Id).val(retrieveCountValue).change();
}

/**
 * Add Prevent
 */
DRB.CustomUI.AddPrevent = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Prevent.Span.Id, DRB.DOM.Prevent.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.Prevent.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Prevent.Dropdown.Id, DRB.DOM.Prevent.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsPrevent).ToDropdown());
    DRB.Logic.BindPropertyValue(DRB.DOM.Prevent.Dropdown.Id, "prevent");
    var preventValue = "none";
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.prevent)) { preventValue = DRB.Metadata.CurrentNode.data.configuration.prevent; }
    $("#" + DRB.DOM.Prevent.Dropdown.Id).val(preventValue).change();
}

/**
 * Add Top Count
 */
DRB.CustomUI.AddTopCount = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.TopCount.Span.Id, DRB.DOM.TopCount.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateInputTopCount(DRB.DOM.TopCount.Input.Id));
    DRB.Logic.BindPropertyValue(DRB.DOM.TopCount.Input.Id, "topCount");
    DRB.Common.BindTopCountNumber(DRB.DOM.TopCount.Input.Id);
    var topCountValue = "";
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.topCount)) { topCountValue = DRB.Metadata.CurrentNode.data.configuration.topCount; }
    $("#" + DRB.DOM.TopCount.Input.Id).val(topCountValue).change();
}

/**
 * Add Use Alternate Key
 */
DRB.CustomUI.AddUseAlternateKey = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.UseAlternateKey.Span.Id, DRB.DOM.UseAlternateKey.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id, DRB.DOM.UseAlternateKey.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindUseAlternateKey(DRB.DOM.UseAlternateKey.Dropdown.Id);
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddPrimaryId(true);

    var divAlternateKey = DRB.UI.CreateEmptyDiv(DRB.DOM.AlternateKey.Div.Id);
    divAlternateKey.append(DRB.UI.CreateSpan(DRB.DOM.AlternateKey.Span.Id, DRB.DOM.AlternateKey.Span.Name));
    divAlternateKey.append(DRB.UI.CreateDropdown(DRB.DOM.AlternateKey.Dropdown.Id));
    divAlternateKey.append(DRB.UI.CreateEmptyDiv(DRB.DOM.AlternateKey.DivColumns.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divAlternateKey);
    DRB.UI.ResetDropdown(DRB.DOM.AlternateKey.Dropdown.Id, DRB.DOM.AlternateKey.Dropdown.Name);
    DRB.Logic.BindAlternateKey(DRB.DOM.AlternateKey.Dropdown.Id);
    divAlternateKey.hide();

    var useAlternateKeyValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.useAlternateKey === true) { useAlternateKeyValue = "yes"; }
    if (useAlternateKeyValue === "no") { $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val(useAlternateKeyValue).change(); }
}

/**
 * Add Primary Id
 */
DRB.CustomUI.AddPrimaryId = function (hide, container) {
    if (!DRB.Utilities.HasValue(container)) { container = DRB.DOM.ConfigureContent.Id };
    var divPrimaryId = DRB.UI.CreateEmptyDiv(DRB.DOM.PrimaryId.Div.Id);
    divPrimaryId.append(DRB.UI.CreateSpan(DRB.DOM.PrimaryId.Span.Id, DRB.DOM.PrimaryId.Span.Name));
    divPrimaryId.append(DRB.UI.CreateInputGuid(DRB.DOM.PrimaryId.Input.Id));
    divPrimaryId.append(DRB.UI.CreateLookup(DRB.DOM.PrimaryId.Lookup.Id, DRB.UI.OpenLookup, { openPrimaryEntity: true, textId: DRB.DOM.PrimaryId.Input.Id }));
    $("#" + container).append(divPrimaryId);
    DRB.Logic.BindPropertyValue(DRB.DOM.PrimaryId.Input.Id, "primaryId");
    DRB.Common.BindGuid(DRB.DOM.PrimaryId.Input.Id);
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryId)) {
        $("#" + DRB.DOM.PrimaryId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryId).trigger("input");
    }
    if (hide === true) { divPrimaryId.hide(); }
}

/**
 * Add Columns
 */
DRB.CustomUI.AddColumns = function () {
    var divColumns = DRB.UI.CreateEmptyDiv(DRB.DOM.Columns.Div.Id, DRB.DOM.Columns.Div.Class);
    divColumns.append(DRB.UI.CreateSpan(DRB.DOM.Columns.Span.Id, DRB.DOM.Columns.Span.Name));
    divColumns.append(DRB.UI.CreateDropdown(DRB.DOM.Columns.Dropdown.Id, true));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divColumns);
    DRB.UI.ResetDropdown(DRB.DOM.Columns.Dropdown.Id, DRB.DOM.Columns.Dropdown.Name);
    DRB.Logic.BindColumns(DRB.DOM.Columns.Dropdown.Id);
}

/**
 * Add Relationships
 */
DRB.CustomUI.AddRelationships = function () {
    var divRelationships = DRB.UI.CreateEmptyDiv(DRB.DOM.DivRelationship.Id);
    $("#" + DRB.DOM.ConfigureContent.Id).append(divRelationships);
    Object.keys(DRB.DOM.Relationship).forEach(function (relationshipType) {
        var relDOM = DRB.DOM.Relationship[relationshipType];
        divRelationships.append(DRB.UI.CreateSpan(relDOM.Span.Id, relDOM.Span.Name));
        divRelationships.append(DRB.UI.CreateDropdown(relDOM.Dropdown.Id, true));
        divRelationships.append(DRB.UI.CreateButton(relDOM.Button.Id, relDOM.Button.Name, relDOM.Button.Class, DRB.Logic.ClickSelectRelationshipColumns, relationshipType));
        divRelationships.append(DRB.UI.CreateSpacer());
        $("#" + relDOM.Button.Id).hide();
        DRB.UI.ResetDropdown(relDOM.Dropdown.Id, relDOM.Dropdown.Name);
    });
}

/**
 * Add Workflow Id
 */
DRB.CustomUI.AddWorkflowId = function () {
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.WorkflowId.Span.Id, DRB.DOM.WorkflowId.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateInputGuid(DRB.DOM.WorkflowId.Input.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateLookup(DRB.DOM.WorkflowId.Lookup.Id, DRB.UI.OpenLookup, { openWorkflow: true, textId: DRB.DOM.WorkflowId.Input.Id }));
    DRB.Logic.BindPropertyValue(DRB.DOM.WorkflowId.Input.Id, "workflowId");
    DRB.Common.BindGuid(DRB.DOM.WorkflowId.Input.Id);
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.workflowId)) {
        $("#" + DRB.DOM.WorkflowId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.workflowId).trigger("input");
    }
}

/**
 * Add Type Columns
 */
DRB.CustomUI.AddTypeColumns = function (container, columnType, domObject, metadataPath) {
    // create main div, span title
    $("#" + container).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].MainDiv.Id + metadataPath, DRB.DOM[domObject].MainDiv.Class));
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateSpan(DRB.DOM[domObject].MainSpan.Id, DRB.DOM[domObject].MainSpan.Name));

    // create the div and the table inside
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].Div.Id + metadataPath));
    $("#" + DRB.DOM[domObject].Div.Id + metadataPath).append(DRB.UI.CreateTable(DRB.DOM[domObject].Table.Id + metadataPath));
    $("#" + DRB.DOM[domObject].Table.Id + metadataPath).append(DRB.UI.CreateTr(DRB.DOM[domObject].Tr.Id + metadataPath));
    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).hide();
    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).append(DRB.UI.CreateTd(DRB.DOM[domObject].TdColumn.Id + metadataPath));
    $("#" + DRB.DOM[domObject].TdColumn.Id + metadataPath).html(DRB.DOM[domObject].TdColumn.Name);

    if (columnType === "IsValidForFilter") {
        $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).append(DRB.UI.CreateTd(DRB.DOM[domObject].TdOperator.Id + metadataPath));
        $("#" + DRB.DOM[domObject].TdOperator.Id + metadataPath).html(DRB.DOM[domObject].TdOperator.Name);
    }

    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).append(DRB.UI.CreateTd(DRB.DOM[domObject].TdValue.Id + metadataPath));
    $("#" + DRB.DOM[domObject].TdValue.Id + metadataPath).html(DRB.DOM[domObject].TdValue.Name);
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateSpacer());

    // "Add" button
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateButton(DRB.DOM[domObject].AddButton.Id + metadataPath, DRB.DOM[domObject].AddButton.Name, DRB.DOM[domObject].AddButton.Class, DRB.Logic.AddColumn, columnType, domObject, metadataPath));

    // hide by default
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).hide();
}
// #endregion  
 
// #region DRB.Logic.RetrieveSingle
/**
 * Retrieve Single - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.RetrieveSingle.AfterTableLoaded = function (table) {
    DRB.Logic.FillCurrentMetadata(table); // Fill Current Metadata
    DRB.Logic.FillRelationshipsColumns(); // Fill Relationships Columns
    DRB.Logic.FillColumns(); // Fill Columns
    DRB.Logic.FillRelationships(); // Fill Relationships
    DRB.Logic.FillAlternateKeys(); // Fill Alternate Keys

    // Fill data.configuration (primaryEntity, PrimaryIdField)
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
    DRB.Metadata.CurrentNode.data.configuration.primaryIdField = table.PrimaryIdAttribute;
}

/**
 * Retrieve Single - Bind Table
 * @param {string} id Id
*/
DRB.Logic.RetrieveSingle.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            if (table.ColumnsLoaded === false || table.RelationshipsLoaded === false || table.AlternateKeysLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    // retrieve the Entity Fields
                    DRB.Common.RetrieveTablesDetails([tableLogicalName], true, true)
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables, true, true);
                            var tableLogicalNames = [];
                            table.OneToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToOneRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            tableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(tableLogicalNames); // remove duplicates

                            var tablesToRetrieve = [];
                            tableLogicalNames.forEach(function (checkTableLogicalName) {
                                var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, checkTableLogicalName);
                                if (DRB.Utilities.HasValue(checkTable) && checkTable.ColumnsLoaded === false) { tablesToRetrieve.push(checkTableLogicalName); }
                            });
                            if (tablesToRetrieve.length > 0) {
                                DRB.Common.RetrieveTablesDetails(tablesToRetrieve, false, true)
                                    .done(function () {
                                        DRB.Common.SetTables(arguments, DRB.Metadata.Tables, false, true);
                                        DRB.Logic.RetrieveSingle.AfterTableLoaded(table);
                                        DRB.UI.HideLoading();
                                    })
                                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                            } else {
                                DRB.Logic.RetrieveSingle.AfterTableLoaded(table);
                                DRB.UI.HideLoading();
                            }
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.RetrieveSingle.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Retrieve Single - Start 
 */
DRB.Logic.RetrieveSingle.Start = function () {
    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();
    DRB.CustomUI.AddDetectChanges();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.RetrieveSingle.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddColumns();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddRelationships();
    DRB.CustomUI.AddUseAlternateKey();
    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists, if not we set the alternate key to No if was yes
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryIdField = "";
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";
            DRB.Metadata.CurrentNode.data.configuration.fields = [];
            DRB.Metadata.CurrentNode.data.configuration.oneToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToOne = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToMany = [];
            // end reset
            $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("no").change();
            DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        } else {
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    } else { DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id); }
    // #endregion
}
// #endregion  
 
// #region DRB.Logic.Column
// Columns Functions, used by Set Columns (Create, Update) Order Columns (Retrieve Multiple), Filter Columns (Retrieve Multiple)

/**
 * Logic - Refresh Arrows
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.RefreshArrows = function (metadataPath) {
    var refMetadata = DRB.Metadata;
    // get full Metadata and configuration path
    metadataPath.split("_").forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                }
            });
        }
    });


    if (refMetadata.length > 0) {
        // set the arrow for the first and the last column
        var firstIndex = metadataPath + "_" + refMetadata[0].Id;
        var lastIndex = metadataPath + "_" + refMetadata[refMetadata.length - 1].Id;

        $("#" + DRB.DOM.ArrowUp.Id + lastIndex).show();
        $("#" + DRB.DOM.ArrowDown.Id + firstIndex).show();
        $("#" + DRB.DOM.ArrowUp.Id + firstIndex).hide();
        $("#" + DRB.DOM.ArrowDown.Id + lastIndex).hide();

        $("#" + DRB.DOM.ArrowBeforeUp.Id + firstIndex).show();
        $("#" + DRB.DOM.ArrowAfterDown.Id + firstIndex).hide();
        $("#" + DRB.DOM.ArrowBeforeUp.Id + lastIndex).hide();
        $("#" + DRB.DOM.ArrowAfterDown.Id + lastIndex).show();

        // set the arrows for the columns in the middle (exclude first and exclude last)
        for (var count = 1; count < refMetadata.length - 1; count++) {
            var uniqueIndex = metadataPath + "_" + refMetadata[count].Id;
            $("#" + DRB.DOM.ArrowUp.Id + uniqueIndex).show();
            $("#" + DRB.DOM.ArrowDown.Id + uniqueIndex).show();
            $("#" + DRB.DOM.ArrowBeforeUp.Id + uniqueIndex).hide();
            $("#" + DRB.DOM.ArrowAfterDown.Id + uniqueIndex).hide();
        }
    }
}

/**
 * Logic - Move Column
 * @param {number} index Index
 * @param {string} direction Direction ("up" or "down")
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.MoveColumn = function (index, direction, domObject, metadataPath) {

    // get full Metadata and configuration path
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
    // get full Metadata and configuration path
    metadataPath.split("_").forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    // if DRB.Metadata[metadataPath] is empty do nothing
    if (refMetadata.length === 0) { return; }

    // variables, default is up
    var positionToCheck = 0;
    var countStart = 1;
    var countEnd = refMetadata.length;
    var diff = -1;
    if (direction === "down") {
        positionToCheck = refMetadata.length - 1;
        countStart = 0;
        countEnd = refMetadata.length - 1;
        diff = 1;
    }

    //  check if it's not the first position (if up) or the last position (if down)
    if (refMetadata[positionToCheck].Id != index) {

        // find the position of the passed index
        var posIndex = -1;
        for (var count = countStart; count < countEnd; count++) { if (refMetadata[count].Id == index) { posIndex = count; break; } }

        // index not found, do nothing
        if (posIndex === -1) { return; }

        // swap DRB.Metadata
        var currentElementMetadata = refMetadata[posIndex];
        refMetadata[posIndex] = refMetadata[posIndex + diff];
        refMetadata[posIndex + diff] = currentElementMetadata;

        // swap data.configuration
        var currentElementNode = refConfiguration[posIndex];
        refConfiguration[posIndex] = refConfiguration[posIndex + diff];
        refConfiguration[posIndex + diff] = currentElementNode;

        // swap tr
        if (direction === "down") { $("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index).next().after($("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index)); }
        else { $("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index).prev().before($("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index)); }

        // refresh arrows
        DRB.Logic.RefreshArrows(metadataPath);
    }
}

/**
 * Logic - Refresh Columns
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.RefreshColumns = function (columnType, domObject, metadataPath) {
    // get logicalName of used columns
    var usedColumnsNames = [];
    var refMetadata = DRB.Metadata;
    // get full Metadata and configuration path
    metadataPath.split("_").forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                }
            });
        }
    });

    refMetadata.forEach(function (column) {
        if (DRB.Utilities.HasValue(column.Value) && DRB.Utilities.HasValue(column.Value.logicalName)) {
            usedColumnsNames.push(column.Value.logicalName);
        }
    });

    // check for the logic operator at column level for filtering

    if (columnType === "IsValidForFilter") {
        if (refMetadata.length > 1) {
            $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).show();
        } else {
            $("#" + DRB.DOM[domObject].DropdownLogic.Id + metadataPath).val(DRB.Settings.OptionsAndOr[0].Id).change();
            $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).hide();
        }
    }

    // refresh all the dropdowns
    refMetadata.forEach(function (metadataColumn) {
        var uniqueIndex = metadataPath + "_" + metadataColumn.Id;
        var originalColumnName = $("#" + DRB.DOM[domObject].Dropdown.Id + uniqueIndex).val();

        // create the columns to fill the dropdown
        var availableColumns = [];
        if (columnType !== "IsValidForFilter") {
            // add the column already selected for this dropdown
            DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
                if ((currentColumn[columnType] === true && usedColumnsNames.indexOf(currentColumn.LogicalName) === -1)
                    || currentColumn.LogicalName === originalColumnName) {
                    availableColumns.push(currentColumn);
                }
            });
        } else {
            // For Filtering all the columns enabled for filtering must be shown, regardeless if they were used before
            availableColumns = [];
            DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
                if (currentColumn[columnType] === true) { availableColumns.push(currentColumn); }
            });
        }

        // fill dropdown
        DRB.UI.FillDropdown(DRB.DOM[domObject].Dropdown.Id + uniqueIndex, DRB.DOM[domObject].Dropdown.Name, new DRB.Models.Records(availableColumns).ToDropdown());
        // set the previous value
        $("#" + DRB.DOM[domObject].Dropdown.Id + uniqueIndex).val(originalColumnName);
        // refresh dropdown
        DRB.UI.RefreshDropdown(DRB.DOM[domObject].Dropdown.Id + uniqueIndex);
    });
}

/**
 * Logic - Remove Column
 * @param {number} index Index
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.RemoveColumn = function (index, columnType, domObject, metadataPath) {
    // remove tr
    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath + "_" + index).remove();

    // get full Metadata and configuration path
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
    // get full Metadata and configuration path
    metadataPath.split("_").forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    // refresh DRB.Metadata[metadataPath] with all columns except the one removed
    var newMetadataColumns = [];
    var indexToRemove = -1;
    refMetadata.forEach(function (column, columnIndex) {
        if (column.Id == index) { indexToRemove = columnIndex; } else { newMetadataColumns.push(column); }
    });

    refMetadata.length = 0;
    newMetadataColumns.forEach(function (newMetadataColumn) { refMetadata.push(newMetadataColumn); });

    // refresh data.configuration using indexToRemove found in the previous for cycle
    if (indexToRemove > -1) {
        var newFields = [];
        refConfiguration.forEach(function (field, fieldIndex) {
            if (fieldIndex !== indexToRemove) { newFields.push(field); }
        });
        refConfiguration.length = 0;
        newFields.forEach(function (newField) { refConfiguration.push(newField); });
    }

    // hide the first tr (header) if there are no columns
    if (refMetadata.length === 0) { $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).hide(); }

    // Refresh arrows
    DRB.Logic.RefreshArrows(metadataPath);

    // Refresh Columns
    DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);
}

/**
 * Logic - Add Column
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.AddColumn = function (columnType, domObject, metadataPath) {
    // show the first tr (header)
    $("#" + DRB.DOM[domObject].Tr.Id + metadataPath).show();

    // initialize index
    var index = 0;

    // get full Metadata and configuration path
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
    // get full Metadata and configuration path
    metadataPath.split("_").forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    // if DRB.Metadata[metadataPath] has values get the higher index and add 1
    if (refMetadata.length > 0) {
        var maxValue = 0;
        refMetadata.forEach(function (setColumn) { if (setColumn.Id > maxValue) { maxValue = setColumn.Id; } });
        index = maxValue + 1;
    }
    var uniqueIndex = metadataPath + "_" + index;
    // create tr
    var tr = DRB.UI.CreateTr(DRB.DOM[domObject].Tr.Id + uniqueIndex);
    var tdColumn = DRB.UI.CreateTd(DRB.DOM[domObject].TdColumn.Id + uniqueIndex);
    var tdOperator = null;
    if (columnType === "IsValidForFilter") { tdOperator = DRB.UI.CreateTd(DRB.DOM[domObject].TdOperator.Id + uniqueIndex); }
    var tdValue = DRB.UI.CreateTd(DRB.DOM[domObject].TdValue.Id + uniqueIndex);
    $("#" + DRB.DOM[domObject].Table.Id + metadataPath).append(tr);
    tr.append(tdColumn);
    if (columnType === "IsValidForFilter") { tr.append(tdOperator); }
    tr.append(tdValue);

    // append close, arrow up and arrow down buttons (plus empty arrow button for spacing)
    tdColumn.append(DRB.UI.CreateRemoveButton(DRB.Logic.RemoveColumn, index, columnType, domObject, metadataPath));
    tdColumn.append(DRB.UI.CreateEmptyArrowButton(DRB.DOM.ArrowBeforeUp.Id + uniqueIndex));
    tdColumn.append(DRB.UI.CreateUpButton(DRB.DOM.ArrowUp.Id + uniqueIndex, DRB.Logic.MoveColumn, index, "up", domObject, metadataPath));
    tdColumn.append(DRB.UI.CreateDownButton(DRB.DOM.ArrowDown.Id + uniqueIndex, DRB.Logic.MoveColumn, index, "down", domObject, metadataPath));
    tdColumn.append(DRB.UI.CreateEmptyArrowButton(DRB.DOM.ArrowAfterDown.Id + uniqueIndex));

    // create column dropdown selection
    tdColumn.append(DRB.UI.CreateDropdown(DRB.DOM[domObject].Dropdown.Id + uniqueIndex));

    // add only column values for the selected column type
    var columnRecords = [];
    DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
        if (currentColumn[columnType] === true) { columnRecords.push(currentColumn); }
    });

    switch (columnType) {
        case "IsValidForOrder":
            DRB.Logic.BindOrderColumn(DRB.DOM[domObject].Dropdown.Id + uniqueIndex, columnType, domObject, metadataPath);
            break;
        case "IsValidForFilter":
            DRB.Logic.BindFilterColumn(DRB.DOM[domObject].Dropdown.Id + uniqueIndex, columnType, domObject, metadataPath);
            break;
        case "IsValidForCreate":
        case "IsValidForUpdate":
            DRB.Logic.BindSetColumn(DRB.DOM[domObject].Dropdown.Id + uniqueIndex, columnType, domObject, metadataPath);
            break;
    }

    // add to DRB.Metadata and to data.configuration
    var field = {};
    refMetadata.push(new DRB.Models.IdValue(index, field));
    refConfiguration.push(field);

    // refresh columns
    DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);

    // refresh arrows
    DRB.Logic.RefreshArrows(metadataPath);
}
// #endregion  
 
// #region DRB.Logic.Filter
// Filter Columns Functions (used in Retrieve Multiple)
/**
 * Logic - Bind Set Column Value
 * @param {string} id Id
 * @param {string} domObject DOM Object
 * @param {string} domIndex DOM Index
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindFilterColumnValue = function (id) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        // update DRB.Metadata and data.configuration with the new value
        var refMetadata = DRB.Metadata;
        var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

        var splittedControlName = controlName.split("_");
        // remove the first entries until we find "filterCriteria"
        while (splittedControlName.length > 0 && splittedControlName[0] !== "filterCriteria") { splittedControlName.shift(); }
        var currentIndex = splittedControlName.pop(); // remove index

        // get full Metadata and configuration path
        splittedControlName.forEach(function (path) {
            if (isNaN(parseInt(path))) {
                if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
            } else {
                // is a position number
                var metadataIndex = parseInt(path);
                refMetadata.forEach(function (refItem, refItemIndex) {
                    if (refItem.Id === metadataIndex) {
                        // this is the correct path to follow
                        refMetadata = refMetadata[refItemIndex];
                        refConfiguration = refConfiguration[refItemIndex];
                    }
                });
            }
        });

        refMetadata.forEach(function (setColumn, columnIndex) {
            if (setColumn.Id === elementIndex) {
                // save the current column properties
                var currentField = JSON.parse(JSON.stringify(setColumn.Value));

                // if normal textbox save to the value property
                if (controlName.indexOf("txt_") === 0) { currentField.value = controlValue; }

                // choice/choices
                if (controlName.indexOf("cbx1_") === 0) { currentField.value = controlValue; }
                if (controlName.indexOf("cbxm_") === 0) { currentField.value = controlValue; }

                // datetime
                if (controlName.indexOf("txtd_") === 0) {
                    currentField.value = controlValue;
                    currentField.dateTimeBehavior = $("#" + controlName).attr("data-datetimebehavior");
                }

                // if textbox belonging to a lookup save to the value.id property
                if (controlName.indexOf("txt2_") === 0) {
                    if (!DRB.Utilities.HasValue(currentField.value)) { currentField.value = {}; }
                    currentField.value.id = controlValue;
                }
                if (controlName.indexOf("cbx2_") === 0) {
                    if (!DRB.Utilities.HasValue(currentField.value)) { currentField.value = {}; }
                    currentField.value.entityType = controlValue;
                }

                // update DRB.Metadata and data.configuration
                setColumn.Value = currentField;
                refConfiguration[columnIndex] = currentField;
            }
        });
    });
}

/**
 * Logic - Bind Filter Column Operator
 * @param {string} id Id
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindFilterColumnOperator = function (id, domObject) {
    $("#" + id).on("change", function (e) {
        var operator = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        var refMetadata = DRB.Metadata;
        var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

        var splittedControlName = controlName.split("_");
        // remove the first entries until we find "filterCriteria"
        while (splittedControlName.length > 0 && splittedControlName[0] !== "filterCriteria") { splittedControlName.shift(); }
        var currentIndex = splittedControlName.pop(); // remove index
        // get full Metadata and configuration path
        splittedControlName.forEach(function (path) {
            if (isNaN(parseInt(path))) {
                if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
            } else {
                // is a position number
                var metadataIndex = parseInt(path);
                refMetadata.forEach(function (refItem, refItemIndex) {
                    if (refItem.Id === metadataIndex) {
                        // this is the correct path to follow
                        refMetadata = refMetadata[refItemIndex];
                        refConfiguration = refConfiguration[refItemIndex];
                    }
                });
            }
        });

        var columnLogicalName = "";
        var requiredValue = true;
        refMetadata.forEach(function (setColumn, columnIndex) {
            if (setColumn.Id === elementIndex) {
                DRB.Settings.OperatorsToStop.forEach(function (operatorToStop) { if (operator === operatorToStop.Id) { requiredValue = false; } });
                columnLogicalName = setColumn.Value.logicalName;
                setColumn.Value.operator = operator;
                setColumn.Value.requiredValue = requiredValue;
                setColumn.Value.value = null;
                refConfiguration[columnIndex].operator = operator;
                refConfiguration[columnIndex].value = null;
                refConfiguration[columnIndex].requiredValue = requiredValue;
            }
        });

        var metadataPath = splittedControlName.join("_");
        metadataPath += "_" + currentIndex;

        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnLogicalName);
        if (DRB.Utilities.HasValue(column)) {
            $("#" + DRB.DOM[domObject].TdValue.Id + metadataPath).html(""); // empty the cell

            if (requiredValue === true) {
                var divValue = DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivValue.Id + metadataPath);
                $("#" + DRB.DOM[domObject].TdValue.Id + metadataPath).append(divValue);
                switch (column.AttributeType) {
                    case "Uniqueidentifier":
                        divValue.append(DRB.UI.CreateInputGuid("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath));
                        DRB.Common.BindGuid("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        if (column.IsPrimaryIdAttribute === true) {
                            var target = DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName;
                            var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                            if (DRB.Utilities.HasValue(targetTable)) {
                                var targets = [];
                                targets.push(new DRB.Models.Table(target, targetTable.Name));
                                divValue.append(DRB.UI.CreateSimpleDropdown("cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath));
                                DRB.UI.FillDropdown("cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "", new DRB.Models.Records(targets).ToDropdown());
                                divValue.append(DRB.UI.CreateLookup("lkp_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, DRB.UI.OpenLookup,
                                    {
                                        openCustom: true,
                                        defaultEntityType: target,
                                        entityTypes: [target],
                                        textId: "txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath,
                                        dropdownId: "cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath
                                    }));

                                DRB.Logic.BindFilterColumnValue("cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                                $("#cbxg_" + DRB.DOM[domObject].ControlValue.Id + metadataPath).val(targets[0].Id).change();
                            }
                        }
                        break;

                    case "EntityName":
                        divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath));
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "String":
                        divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "Memo":
                        divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "Integer":
                    case "BigInt":
                        divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue));
                        DRB.Common.BindInteger("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "Decimal":
                    case "Double":
                    case "Money":
                        divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue + " - Precision: " + column.AdditionalProperties.Precision));
                        DRB.Common.BindNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                        DRB.Logic.BindFilterColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "ManagedProperty":
                    case "Boolean":
                    case "Picklist":
                    case "State":
                    case "Status":
                        var currentId = "cbx1_" + DRB.DOM[domObject].ControlValue.Id + metadataPath;
                        divValue.append(DRB.UI.CreateDropdown(currentId));
                        var options = [];
                        if (DRB.Utilities.HasValue(column.OptionValues)) {
                            column.OptionValues.forEach(function (option) {
                                options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                            });
                        }
                        DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                        DRB.Logic.BindFilterColumnValue("cbx1_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "MultiPicklist":
                        var currentId = "cbxm_" + DRB.DOM[domObject].ControlValue.Id + metadataPath;
                        divValue.append(DRB.UI.CreateDropdown(currentId, true));
                        var options = [];
                        if (DRB.Utilities.HasValue(column.OptionValues)) {
                            column.OptionValues.forEach(function (option) {
                                options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                            });
                        }
                        DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                        DRB.Logic.BindFilterColumnValue("cbxm_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        break;

                    case "Lookup":
                    case "Owner":
                    case "Customer":
                        divValue.append(DRB.UI.CreateInputGuid("txt2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath));
                        DRB.Common.BindGuid("txt2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        DRB.Logic.BindFilterColumnValue("txt2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        if (column.AdditionalProperties.Targets.length > 0) {
                            divValue.append(DRB.UI.CreateSimpleDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath));
                            var targets = [];
                            column.AdditionalProperties.Targets.forEach(function (target) {
                                var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                                if (DRB.Utilities.HasValue(targetTable)) {
                                    targets.push(new DRB.Models.Table(target, targetTable.Name));
                                }
                            });
                            DRB.UI.FillDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "", new DRB.Models.Records(targets).ToDropdown());


                            divValue.append(DRB.UI.CreateLookup("lkp_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, DRB.UI.OpenLookup,
                                {
                                    openCustom: true,
                                    defaultEntityType: column.AdditionalProperties.Targets[0],
                                    entityTypes: column.AdditionalProperties.Targets,
                                    textId: "txt2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath,
                                    dropdownId: "cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath
                                }));

                            DRB.Logic.BindFilterColumnValue("cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                            $("#cbx2_" + DRB.DOM[domObject].ControlValue.Id + metadataPath).val(targets[0].Id).change();
                        }
                        break;
                    case "DateTime":
                        var datetimeOperatorFound = false;
                        var operatorMinValue = 0;
                        var operatorMaxValue = 0;
                        switch (operator) {
                            case "NextXHours": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 2000; break;
                            case "LastXHours": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 2000; break;
                            case "NextXDays": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 500; break;
                            case "LastXDays": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 500; break;
                            case "NextXWeeks": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXWeeks": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "NextXMonths": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXMonths": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "NextXYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "NextXFiscalYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXFiscalYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "NextXFiscalPeriods": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "LastXFiscalPeriods": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "OlderThanXMinutes": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 1440; break;
                            case "OlderThanXHours": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 2000; break;
                            case "OlderThanXDays": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 500; break;
                            case "OlderThanXWeeks": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "OlderThanXMonths": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                            case "OlderThanXYears": datetimeOperatorFound = true; operatorMinValue = 1; operatorMaxValue = 100; break;
                        }
                        if (datetimeOperatorFound === true) {
                            divValue.append(DRB.UI.CreateInputNumber("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, "Min Value: " + operatorMinValue + " - Max Value: " + operatorMaxValue));
                            DRB.Common.BindInteger("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, operatorMinValue, operatorMaxValue);
                            DRB.Logic.BindFilterColumnValue("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                        }
                        if (datetimeOperatorFound === false) {
                            var clearedDateTimeFormat = "";
                            var pickerFormat = "YYYY-MM-DD HH:mm";
                            if (DRB.Utilities.HasValue(column.AdditionalProperties.DateTimeFormat)) {
                                if (column.AdditionalProperties.DateTimeFormat === "DateOnly") { pickerFormat = "YYYY-MM-DD"; }
                                clearedDateTimeFormat = column.AdditionalProperties.DateTimeFormat.replace(/([A-Z])/g, ' $1').trim();
                            }

                            var dateTimeBehavior = "ND"; // not defined
                            var clearedDateTimeBehavior = "";
                            if (DRB.Utilities.HasValue(column.AdditionalProperties.DateTimeBehavior)) {
                                dateTimeBehavior = column.AdditionalProperties.DateTimeBehavior;
                                clearedDateTimeBehavior = column.AdditionalProperties.DateTimeBehavior.replace(/([A-Z])/g, ' $1').trim();
                            }

                            if (clearedDateTimeBehavior === "Time Zone Independent") { clearedDateTimeBehavior = "TZI"; }
                            divValue.append(DRB.UI.CreateInputDateTime("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath, dateTimeBehavior, "Behavior: " + clearedDateTimeBehavior + " - Format: " + clearedDateTimeFormat));
                            DRB.Logic.BindFilterColumnValue("txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath);
                            $("#txtd_" + DRB.DOM[domObject].ControlValue.Id + metadataPath).datetimepicker({ format: pickerFormat, ignoreReadonly: true, showClear: true, showTodayButton: true }).on('dp.change', function (e) { $(e.target).change(); });
                        }
                        break;
                }
            }
        }
    });
}

/**
 * Logic - Bind Filter Column
 * @param {string} id Id
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindFilterColumn = function (id, columnType, domObject, metadataPath) {
    $("#" + id).on("change", function (e) {
        var columnLogicalName = $(this).val();
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnLogicalName);
        if (DRB.Utilities.HasValue(column)) {
            // define field
            var field = { logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName, operator: null, requiredValue: false, value: null };

            // extract the index from the control name
            var controlName = $(this).attr('id');
            var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
            if (elementIndex === -1) { return; } // if index not found do nothing

            // get full Metadata and configuration path
            var refMetadata = DRB.Metadata;
            var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
            // get full Metadata and configuration path
            metadataPath.split("_").forEach(function (path) {
                if (isNaN(parseInt(path))) {
                    if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                    if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
                } else {
                    // is a position number
                    var metadataIndex = parseInt(path);
                    refMetadata.forEach(function (refItem, refItemIndex) {
                        if (refItem.Id === metadataIndex) {
                            // this is the correct path to follow
                            refMetadata = refMetadata[refItemIndex];
                            refConfiguration = refConfiguration[refItemIndex];
                        }
                    });
                }
            });

            // update Metadata and configuration
            for (var i = 0; i < refMetadata.length; i++) {
                if (refMetadata[i].Id === elementIndex) {
                    refMetadata[i].Value = field;
                    refConfiguration[i] = field;
                    break;
                }
            }

            var uniqueIndex = metadataPath + "_" + elementIndex;

            $("#" + DRB.DOM[domObject].TdOperator.Id + uniqueIndex).html(""); // empty the cell
            $("#" + DRB.DOM[domObject].TdValue.Id + uniqueIndex).html(""); // empty the cell
            var divOperator = DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivOperator.Id + uniqueIndex);
            $("#" + DRB.DOM[domObject].TdOperator.Id + uniqueIndex).append(divOperator);

            var currentId = DRB.DOM[domObject].ControlOperator.Id + uniqueIndex;
            divOperator.append(DRB.UI.CreateSimpleDropdown(currentId));

            var optionsOperator = DRB.Settings.OptionsOperatorBasic;

            switch (field.type) {
                case "Owner": optionsOperator = DRB.Settings.OptionsOperatorOwner; break;
                case "String": optionsOperator = DRB.Settings.OptionsOperatorString; break;
                case "Memo": optionsOperator = DRB.Settings.OptionsOperatorMemo; break;
                case "DateTime": optionsOperator = DRB.Settings.OptionsOperatorDateTime; break;
                case "MultiPicklist": optionsOperator = DRB.Settings.OptionsOperatorMultiPicklist; break;
                case "BigInt":
                case "Integer":
                case "Decimal":
                case "Double":
                case "Money":
                    optionsOperator = DRB.Settings.OptionsOperatorNumber;
                    break;
            }

            if (field.type === "Uniqueidentifier" && column.IsPrimaryIdAttribute === true) {
                var target = DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName;
                var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                if (DRB.Utilities.HasValue(targetTable)) {
                    if (targetTable.HasHierarchy === true) {
                        optionsOperator = DRB.Settings.OptionsOperatorHierarchyPrimaryKey;
                    }
                }
            }

            if (field.type === "Lookup") {
                if (column.AdditionalProperties.Targets.length === 1) {
                    var target = column.AdditionalProperties.Targets[0];
                    var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                    if (DRB.Utilities.HasValue(targetTable)) {
                        switch (target) {
                            case "systemuser": optionsOperator = DRB.Settings.OptionsOperatorLookupUser; break;
                            case "businessunit": optionsOperator = DRB.Settings.OptionsOperatorLookupBusinessUnit; break;
                        }
                    }
                }
            }

            DRB.UI.FillDropdown(currentId, "Select Operator", new DRB.Models.Records(optionsOperator).ToDropdown());
            DRB.Logic.BindFilterColumnOperator(currentId, domObject);
        }
        DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);
    });
}
// #endregion  
 
// #region DRB.Logic.Order
// Order Columns Functions (used in Retrieve Multiple)

/**
 * Logic - Bind Order Column Value
 * @param {string} id Id
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindOrderColumnValue = function (id, metadataPath) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        // get full Metadata and configuration path
        var refMetadata = DRB.Metadata;
        var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
        // get full Metadata and configuration path
        metadataPath.split("_").forEach(function (path) {
            if (isNaN(parseInt(path))) {
                if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
            } else {
                // is a position number
                var metadataIndex = parseInt(path);
                refMetadata.forEach(function (refItem, refItemIndex) {
                    if (refItem.Id === metadataIndex) {
                        // this is the correct path to follow
                        refMetadata = refMetadata[refItemIndex];
                        refConfiguration = refConfiguration[refItemIndex];
                    }
                });
            }
        });


        // update DRB.Metadata.OrderColumns and configuration.orderFields with the new value
        refMetadata.forEach(function (column, columnIndex) {
            if (column.Id === elementIndex) {
                // save the current column properties
                var field = JSON.parse(JSON.stringify(column.Value));
                if (controlName.indexOf("cbx_") === 0) { field.value = controlValue; }

                // update refMetadata and refConfiguration
                column.Value = field;
                refConfiguration[columnIndex] = field;
            }
        });
    });
}

/**
 * Logic - Bind Order Column
 * @param {string} id Id
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindOrderColumn = function (id, columnType, domObject, metadataPath) {
    $("#" + id).on("change", function (e) {
        var columnLogicalName = $(this).val();
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnLogicalName);
        if (DRB.Utilities.HasValue(column)) {
            // define field
            var field = { logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName, value: null };
            // extract the index from the control name
            var controlName = $(this).attr('id');
            var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
            if (elementIndex === -1) { return; } // if index not found do nothing

            // get full Metadata and configuration path
            var refMetadata = DRB.Metadata;
            var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
            // get full Metadata and configuration path
            metadataPath.split("_").forEach(function (path) {
                if (isNaN(parseInt(path))) {
                    if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                    if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
                } else {
                    // is a position number
                    var metadataIndex = parseInt(path);
                    refMetadata.forEach(function (refItem, refItemIndex) {
                        if (refItem.Id === metadataIndex) {
                            // this is the correct path to follow
                            refMetadata = refMetadata[refItemIndex];
                            refConfiguration = refConfiguration[refItemIndex];
                        }
                    });
                }
            });

            // update Metadata and configuration
            for (var i = 0; i < refMetadata.length; i++) {
                if (refMetadata[i].Id === elementIndex) {
                    refMetadata[i].Value = field;
                    refConfiguration[i] = field;
                    break;
                }
            }

            var uniqueIndex = metadataPath + "_" + elementIndex;
            $("#" + DRB.DOM[domObject].TdValue.Id + uniqueIndex).html(""); // empty the cell
            var divValue = DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivValue.Id + uniqueIndex);
            $("#" + DRB.DOM[domObject].TdValue.Id + uniqueIndex).append(divValue);

            var currentId = "cbx_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex;
            divValue.append(DRB.UI.CreateSimpleDropdown(currentId));
            DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(DRB.Settings.OptionsOrder).ToDropdown());
            DRB.Logic.BindOrderColumnValue("cbx_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, metadataPath);
            $("#" + currentId).val(DRB.Settings.OptionsOrder[0].Id).change();

        }
        DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);
    });
}
// #endregion  
 
// #region DRB.Logic.RetrieveMultiple
/**
 * Retrieve Multiple - Refresh Dropdown Logic
 * @param {string} logicValue Logic Value ("and", "or")
 * @param {string} controlName Control Name
 * @param {boolean} isGroupLogic Is Group Logic
*/
DRB.Logic.RetrieveMultiple.RefreshDropdownLogic = function (logicValue, controlName, isGroupLogic) {
    // if filterFields control name is like
    // cbx_fc_filterCriteria_filterFields
    // cbx_fc_filterCriteria_filterGroups_0_filterFields
    // cbx_fc_filterCriteria_filterGroups_1_filterGroups_5_filterFields

    // if filterGroups control name is like
    // cbx_fg_filterCriteria_filterGroups
    // cbx_fg_filterCriteria_filterGroups_0_filterGroups
    // cbx_fg_filterCriteria_filterGroups_0_filterGroups_2_filterGroups

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    // from the control name navigate to the right path but paying attention to the id of the group
    var splittedControlName = controlName.split("_");
    // remove the first entries until we find "filterCriteria"
    while (splittedControlName.length > 0 && splittedControlName[0] !== "filterCriteria") { splittedControlName.shift(); }
    // "filterFields" or "filterGroups" is always the last, remove it
    if (splittedControlName.length > 0) { splittedControlName.pop(); }

    splittedControlName.forEach(function (path) {
        if (isNaN(parseInt(path))) {
            // not a number
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    if (isGroupLogic === false) {
        // filterFields
        // set the logic value to the metadata
        refMetadata.filterFieldsLogic = logicValue;
        refConfiguration.filterFieldsLogic = logicValue;
    } else {
        // filterGroups
        // set the logic value to the metadata
        refMetadata.filterGroupsLogic = logicValue;
        refConfiguration.filterGroupsLogic = logicValue;
        // refresh the middle spans
        var spanClass = splittedControlName.join("_") + "_" + "filterGroups";
        $("." + spanClass).each(function (i, span) { $(span).html(logicValue); });
    }
}
/**
 * Retrieve Multiple - Bind Columns Logic
 * @param {string} id Id
*/
DRB.Logic.RetrieveMultiple.BindColumnsLogic = function (id) {
    $("#" + id).on("change", function (e) {
        // get value and control name
        var logicValue = $(this).val();
        var controlName = $(this).attr('id');
        DRB.Logic.RetrieveMultiple.RefreshDropdownLogic(logicValue, controlName, false);
    });
}

/**
 * Retrieve Multiple - Bind Groups Logic
 * @param {string} id Id
*/
DRB.Logic.RetrieveMultiple.BindGroupsLogic = function (id) {
    $("#" + id).on("change", function (e) {
        // get value and control name
        var logicValue = $(this).val();
        var controlName = $(this).attr('id');
        DRB.Logic.RetrieveMultiple.RefreshDropdownLogic(logicValue, controlName, true);
    });
}

/**
 * Retrieve Multiple - Hide Previous Add Button
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.HidePreviousAddButton = function (metadataPath) {
    $("#" + DRB.DOM.FilterGroups.DivChoice.Id + metadataPath).hide();
}

/**
 * Retrieve Multiple - Show Previous Add Button
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.ShowPreviousAddButton = function (metadataPath) {
    var splittedMetadataPath = metadataPath.split("_");
    splittedMetadataPath.pop(); // remove last item (filterFields or filterGroups)
    var previousMetadataPath = splittedMetadataPath.join("_");
    $("#" + DRB.DOM.FilterGroups.DivChoice.Id + previousMetadataPath).show();
}

/**
 * Retrieve Multiple - Add Filter Group
 * @param {string} container Container
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddFilterGroup = function (container, domObject, metadataPath) {
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");
    splittedMetadataPath.forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    var index = 0;
    if (refMetadata.length > 0) {
        var maxValue = -1;
        refMetadata.forEach(function (item) { if (item.Id > maxValue) { maxValue = item.Id; } });
        index = maxValue + 1;
    }

    refMetadata.push({ Id: index });
    refConfiguration.push({});

    var metadataPathIndex = metadataPath + "_" + index;


    if (refMetadata.length > 1) {
        // extract the logic value
        var logicValue = $("#" + DRB.DOM[domObject].DropdownLogic.Id + metadataPath).val();
        $("#" + container).append(DRB.UI.CreateSpan("", logicValue, null, metadataPath + " filterspan"));
        $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).show();
    }

    $("#" + container).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].MainDiv.Id + metadataPathIndex, "mapping-container0"));

    // Div Choice
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPathIndex).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivChoice.Id + metadataPathIndex));
    // add the close button inside the Div Choice
    $("#" + DRB.DOM[domObject].DivChoice.Id + metadataPathIndex).append(DRB.UI.CreateCloseButton(DRB.Logic.RetrieveMultiple.RemoveFilterGroup, domObject, metadataPathIndex));
    $("#" + DRB.DOM[domObject].DivChoice.Id + metadataPathIndex).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivChoice.Id + metadataPathIndex + "_dropdown", "dropdown shortdropdown"));
    $("#" + DRB.DOM[domObject].DivChoice.Id + metadataPathIndex + "_dropdown").append(DRB.UI.CreateButton(DRB.DOM[domObject].ButtonChoice.Id + metadataPathIndex, DRB.DOM[domObject].ButtonChoice.Name, DRB.DOM[domObject].ButtonChoice.Class));
    $("#" + DRB.DOM[domObject].ButtonChoice.Id + metadataPathIndex).attr("data-toggle", "dropdown");
    $("#" + DRB.DOM[domObject].ButtonChoice.Id + metadataPathIndex).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivDropdownChoice.Id + metadataPathIndex, DRB.DOM[domObject].DivDropdownChoice.Class));
    $("#" + DRB.DOM[domObject].DivDropdownChoice.Id + metadataPathIndex).append(DRB.UI.CreateButton(DRB.DOM[domObject].ButtonChoiceColumns.Id + metadataPathIndex, DRB.DOM[domObject].ButtonChoiceColumns.Name, DRB.DOM[domObject].ButtonChoiceColumns.Class, DRB.Logic.RetrieveMultiple.AddManuallyFilterColumns, "FilterColumns", metadataPathIndex));
    $("#" + DRB.DOM[domObject].DivDropdownChoice.Id + metadataPathIndex).append(DRB.UI.CreateButton(DRB.DOM[domObject].ButtonChoiceGroups.Id + metadataPathIndex, DRB.DOM[domObject].ButtonChoiceGroups.Name, DRB.DOM[domObject].ButtonChoiceGroups.Class, DRB.Logic.RetrieveMultiple.AddManuallyFilterGroups, "FilterGroups", metadataPathIndex));
}

/**
 * Retrieve Multiple - Remove Filter Group
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.RemoveFilterGroup = function (domObject, metadataPath) {
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");
    var indexToRemove = parseInt(splittedMetadataPath.pop()); // last path is always a number
    // navigate to the deepest path, refConfiguration goes by the index and not by path when path is a number
    splittedMetadataPath.forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    // remove the item from metadata and configuration
    for (var i = 0; i < refMetadata.length; i++) {
        if (refMetadata[i].Id === indexToRemove) {
            refMetadata.splice(i, 1);
            refConfiguration.splice(i, 1);

            if (i > 0) {
                // remove the previous span if is not the first element
                $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).prev().remove();
            }
            else {
                // first element, remove the span after
                $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).next().remove();
            }
            // remove from UI
            $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).remove();
            break;
        }
    }
    if (refMetadata.length < 2) {
        var previousMetadataPath = splittedMetadataPath.join("_"); // previously pop the index so the previousMetadataPath will be xyz_filterGroups
        if (refMetadata.length === 1) {
            $("#" + DRB.DOM[domObject].DivLogic.Id + previousMetadataPath).hide();
            // set the logic to AND
            $("#" + DRB.DOM[domObject].DropdownLogic.Id + previousMetadataPath).val(DRB.Settings.OptionsAndOr[0].Id).change();
        }

        if (refMetadata.length === 0) {
            DRB.Logic.RetrieveMultiple.RemoveFilterGroups(domObject, previousMetadataPath);
        }
    }
}

/**
 * Retrieve Multiple - Start Add Filter
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.StartAddFilter = function (domObjectGroups, domObjectColumns, metadataPath) {
    DRB.Logic.RetrieveMultiple.AddManuallyFilterGroups(domObjectGroups, metadataPath);
    DRB.Logic.RetrieveMultiple.AddManuallyFilterColumns(domObjectColumns, metadataPath + "_filterGroups_0");
}

/**
 * Retrieve Multiple - Add Manually Filter Groups
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddManuallyFilterGroups = function (domObject, metadataPath) {
    DRB.Logic.RetrieveMultiple.AddFilterGroups(domObject, metadataPath);
    DRB.Logic.RetrieveMultiple.AddFilterGroup(DRB.DOM[domObject].DivGroups.Id + metadataPath + "_filterGroups", domObject, metadataPath + "_filterGroups");
}

/**
 * Retrieve Multiple - Add Filter Groups
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddFilterGroups = function (domObject, metadataPath) {
    DRB.Logic.RetrieveMultiple.HidePreviousAddButton(metadataPath);
    var container = DRB.DOM.FilterBy.MainDiv.Id;
    if (metadataPath !== "filterCriteria") { container = DRB.DOM[domObject].MainDiv.Id + metadataPath; }

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    // navigate to the deepest path, refConfiguration goes by the index and not by path when path is a number
    var splittedMetadataPath = metadataPath.split("_");
    splittedMetadataPath.forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    refMetadata.filterType = "groups";
    refConfiguration.filterType = "groups";
    if (!refMetadata.hasOwnProperty("filterGroupsLogic")) { refMetadata.filterGroupsLogic = "and"; }
    if (!refConfiguration.hasOwnProperty("filterGroupsLogic")) { refConfiguration.filterGroupsLogic = "and"; }

    if (!refMetadata.hasOwnProperty("filterGroups")) { refMetadata.filterGroups = []; }
    if (!refConfiguration.hasOwnProperty("filterGroups")) { refConfiguration.filterGroups = []; }

    metadataPath += "_filterGroups";
    $("#" + container).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivGroups.Id + metadataPath));

    $("#" + container).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivOptions.Id + metadataPath));
    // add group button
    $("#" + DRB.DOM[domObject].DivOptions.Id + metadataPath).append(DRB.UI.CreateSpacer());
    $("#" + DRB.DOM[domObject].DivOptions.Id + metadataPath).append(DRB.UI.CreateButton(DRB.DOM[domObject].AddButton.Id + metadataPath, DRB.DOM[domObject].AddButton.Name, DRB.DOM[domObject].AddButton.Class, DRB.Logic.RetrieveMultiple.AddFilterGroup, DRB.DOM[domObject].DivGroups.Id + metadataPath, domObject, metadataPath));

    // add logic dropdown
    $("#" + DRB.DOM[domObject].DivOptions.Id + metadataPath).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivLogic.Id + metadataPath, DRB.DOM[domObject].DivLogic.Class));
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).append(DRB.UI.CreateSpan(DRB.DOM[domObject].SpanLogic.Id + metadataPath, DRB.DOM[domObject].SpanLogic.Name));
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).append(DRB.UI.CreateSimpleDropdown(DRB.DOM[domObject].DropdownLogic.Id + metadataPath));
    DRB.UI.FillDropdown(DRB.DOM[domObject].DropdownLogic.Id + metadataPath, DRB.DOM[domObject].DropdownLogic.Name, new DRB.Models.Records(DRB.Settings.OptionsAndOr).ToDropdown());
    DRB.Logic.RetrieveMultiple.BindGroupsLogic(DRB.DOM[domObject].DropdownLogic.Id + metadataPath);
    $("#" + DRB.DOM[domObject].DropdownLogic.Id + metadataPath).val(refMetadata.filterGroupsLogic).change();
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).hide(); // hide filter logic by default
}

/**
 * Retrieve Multiple - Add Manually Filter Columns
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddManuallyFilterColumns = function (domObject, metadataPath) {
    DRB.Logic.RetrieveMultiple.AddFilterColumns(domObject, metadataPath);
    DRB.Logic.AddColumn("IsValidForFilter", domObject, metadataPath + "_filterFields");
}

/**
 * Retrieve Multiple - Add Filter Columns
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.AddFilterColumns = function (domObject, metadataPath) {
    DRB.Logic.RetrieveMultiple.HidePreviousAddButton(metadataPath);
    var container = DRB.DOM.FilterBy.MainDiv.Id;
    if (metadataPath !== "filterCriteria") { container = DRB.DOM.FilterGroups.MainDiv.Id + metadataPath; } // host of a Filter Columns is the base or a group

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    // navigate to the deepest path, refConfiguration goes by the index and not by path when path is a number
    var splittedMetadataPath = metadataPath.split("_");
    splittedMetadataPath.forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    // FilterColumns are always leaves
    refMetadata.filterType = "fields";
    refConfiguration.filterType = "fields";
    if (!refMetadata.hasOwnProperty("filterFieldsLogic")) { refMetadata.filterFieldsLogic = "and"; }
    if (!refConfiguration.hasOwnProperty("filterFieldsLogic")) { refConfiguration.filterFieldsLogic = "and"; }
    if (!refMetadata.hasOwnProperty("filterFields")) { refMetadata.filterFields = []; }
    if (!refConfiguration.hasOwnProperty("filterFields")) { refConfiguration.filterFields = []; }

    var columnsCriteria = "IsValidForFilter";
    metadataPath += "_filterFields";

    DRB.CustomUI.AddTypeColumns(container, columnsCriteria, domObject, metadataPath);

    // add close button for the field container
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).prepend(DRB.UI.CreateCloseButton(DRB.Logic.RetrieveMultiple.RemoveFilterColumns, domObject, metadataPath));

    // add logic dropdown
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).append(DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivLogic.Id + metadataPath, DRB.DOM[domObject].DivLogic.Class));
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).append(DRB.UI.CreateSpan(DRB.DOM[domObject].SpanLogic.Id + metadataPath, DRB.DOM[domObject].SpanLogic.Name));
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).append(DRB.UI.CreateSimpleDropdown(DRB.DOM[domObject].DropdownLogic.Id + metadataPath));
    DRB.UI.FillDropdown(DRB.DOM[domObject].DropdownLogic.Id + metadataPath, DRB.DOM[domObject].DropdownLogic.Name, new DRB.Models.Records(DRB.Settings.OptionsAndOr).ToDropdown());
    DRB.Logic.RetrieveMultiple.BindColumnsLogic(DRB.DOM[domObject].DropdownLogic.Id + metadataPath);
    $("#" + DRB.DOM[domObject].DropdownLogic.Id + metadataPath).val(refMetadata.filterFieldsLogic).change();
    $("#" + DRB.DOM[domObject].DivLogic.Id + metadataPath).hide(); // hide filter logic by default

    // verify if the fields exist
    var fields = JSON.parse(JSON.stringify(refMetadata.filterFields));
    var clearedFields = [];
    fields.forEach(function (field) {
        var checkColumn = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, field.logicalName);
        if (DRB.Utilities.HasValue(checkColumn)) { clearedFields.push(field); }
    });

    // reset Metadata and configuration arrays
    refMetadata.filterFields = [];
    refConfiguration.filterFields = [];

    clearedFields.forEach(function (field, fieldIndex) {
        DRB.Logic.AddColumn(columnsCriteria, domObject, metadataPath);
        $("#" + DRB.DOM[domObject].Dropdown.Id + metadataPath + "_" + fieldIndex).val(field.logicalName).change();
        // set operator
        $("#" + DRB.DOM[domObject].ControlOperator.Id + metadataPath + "_" + fieldIndex).val(field.operator).change();
        // set value
        var controlPrefix = "";
        var controlPrefixLookup = "cbx2_";
        switch (field.type) {
            case "Uniqueidentifier":
            case "EntityName":
            case "String":
            case "Memo":
            case "Integer":
            case "BigInt":
            case "Decimal":
            case "Double":
            case "Money":
                controlPrefix = "txt_";
                break;

            case "ManagedProperty":
            case "Boolean":
            case "Picklist":
            case "State":
            case "Status":
                controlPrefix = "cbx1_";
                break;

            case "MultiPicklist":
                controlPrefix = "cbxm_";
                break;

            case "Lookup":
            case "Owner":
            case "Customer":
                controlPrefix = "txt2_";
                break;

            case "DateTime":
                controlPrefix = "txtd_";
                break;
        }

        switch (field.type) {
            case "Lookup":
            case "Owner":
            case "Customer":
                if (DRB.Utilities.HasValue(field.value)) {
                    $("#" + controlPrefix + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + fieldIndex).val(field.value.id).change();
                    $("#" + controlPrefixLookup + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + fieldIndex).val(field.value.entityType).change();
                }
                break;
            default:
                $("#" + controlPrefix + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + fieldIndex).val(field.value).change();
                break;
        }

    });
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).show();
}

/**
 * Retrieve Multiple - Remove Filter Groups
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.RemoveFilterGroups = function (domObject, metadataPath) {
    // now remove from the metadata
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");
    if (splittedMetadataPath.length > 0) { splittedMetadataPath.pop(); }

    splittedMetadataPath.forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    var metadataKeys = Object.keys(refMetadata);
    metadataKeys.forEach(function (key) { if (key !== "Id") { delete refMetadata[key]; } });
    var configurationKeys = Object.keys(refConfiguration);
    configurationKeys.forEach(function (key) { delete refConfiguration[key]; });

    // remove from UI
    $("#" + DRB.DOM[domObject].DivGroups.Id + metadataPath).remove();
    $("#" + DRB.DOM[domObject].DivOptions.Id + metadataPath).remove();
    // show previous Add button
    DRB.Logic.RetrieveMultiple.ShowPreviousAddButton(metadataPath);
}

/**
 * Retrieve Multiple - Remove Filter Columns
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
*/
DRB.Logic.RetrieveMultiple.RemoveFilterColumns = function (domObject, metadataPath) {
    // when removing a filterFields, metadataPath looks like:
    // filterCriteria_filterGroups_2_filterGroups_0_filterFields
    // filterCriteria_filterGroups_1_filterFields
    // filterCriteria_filterFields
    // indexes refer to the metadata object (because they are added based on the UI, not from the data.configuration array)
    // so can happen "filterGroups_5_filterFields" because other groups have been previously removed, the filterGroups array contains just a single item
    // 5 is stored inside the Id property

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");
    if (splittedMetadataPath.length > 0) { splittedMetadataPath.pop(); } // remove "filterFields" (is always the last one)

    if (splittedMetadataPath.length > 1) {
        var metadataIndexToRemove = parseInt(splittedMetadataPath.pop()); // store metadataIndex To Remove
        // navigate to the deepest path, refConfiguration goes by the index and not by path when path is a number
        splittedMetadataPath.forEach(function (path) {
            if (isNaN(parseInt(path))) {
                if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
            } else {
                // is a position number
                var metadataIndex = parseInt(path);
                refMetadata.forEach(function (refItem, refItemIndex) {
                    if (refItem.Id === metadataIndex) {
                        // this is the correct path to follow
                        refMetadata = refMetadata[refItemIndex];
                        refConfiguration = refConfiguration[refItemIndex];
                    }
                });
            }
        });

        // remove the item from metadata and configuration
        for (var i = 0; i < refMetadata.length; i++) {
            if (refMetadata[i].Id === metadataIndexToRemove) {
                refMetadata[i] = { Id: metadataIndexToRemove };
                refConfiguration[i] = {};
                break;
            }
        }
    } else {
        // shorter scenario, no groups to verify, the filterFields is attached to the root
        DRB.Metadata.filterCriteria = {};
        DRB.Metadata.CurrentNode.data.configuration.filterCriteria = {};
    }
    // remove from UI
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).remove();
    // show previous Add button
    DRB.Logic.RetrieveMultiple.ShowPreviousAddButton(metadataPath);
}

DRB.Logic.RetrieveMultiple.ParseFilterCriteria = function (filterCriteria, metadataPath) {
    // recursive function to parse configuration.filterCriteria into Metadata.filterCriteria

    // filterType must be "fields" or "groups", otherwise return
    if (!filterCriteria.hasOwnProperty("filterType")) { return; }
    if (filterCriteria.filterType !== "fields" && filterCriteria.filterType !== "groups") { return; }

    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;

    var splittedMetadataPath = metadataPath.split("_");

    splittedMetadataPath.forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    // filterFields
    if (filterCriteria.filterType === "fields") {
        refMetadata.filterFields = filterCriteria.filterFields;
        refConfiguration.filterFields = filterCriteria.filterFields;
        DRB.Logic.RetrieveMultiple.AddFilterColumns("FilterColumns", metadataPath);
        // after the "AddFilterColumns" is completed we assign the original filterFieldsLogic and trigger it
        refMetadata.filterFieldsLogic = filterCriteria.filterFieldsLogic;
        refConfiguration.filterFieldsLogic = filterCriteria.filterFieldsLogic;
        $("#" + DRB.DOM.FilterColumns.DropdownLogic.Id + metadataPath + "_filterFields").val(refMetadata.filterFieldsLogic).change();
        return;
    }

    // filterGroups
    if (filterCriteria.filterType === "groups") {
        DRB.Logic.RetrieveMultiple.AddFilterGroups("FilterGroups", metadataPath);
        filterCriteria.filterGroups.forEach(function (filterGroup, filterGroupIndex) {
            DRB.Logic.RetrieveMultiple.AddFilterGroup(DRB.DOM.FilterGroups.DivGroups.Id + metadataPath + "_filterGroups", "FilterGroups", metadataPath + "_filterGroups");
            // hollaback
            DRB.Logic.RetrieveMultiple.ParseFilterCriteria(filterGroup, metadataPath + "_filterGroups" + "_" + filterGroupIndex);
        });

        // after the "AddFilterGroups"/"AddFilterGroup" is completed we assign the original filterFieldsLogic and trigger it
        refMetadata.filterGroupsLogic = filterCriteria.filterGroupsLogic;
        refConfiguration.filterGroupsLogic = filterCriteria.filterGroupsLogic;
        $("#" + DRB.DOM.FilterGroups.DropdownLogic.Id + metadataPath + "_filterGroups").val(refMetadata.filterGroupsLogic).change();
        return;
    }
}

/**
 * Retrieve Multiple - Configure Filter By
*/
DRB.Logic.RetrieveMultiple.ConfigureFilterBy = function () {
    // show main FilterBy div and the "Add" choice button
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).empty();
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).append(DRB.UI.CreateSpan(DRB.DOM.FilterBy.MainSpan.Id, DRB.DOM.FilterBy.MainSpan.Name));
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).append(DRB.UI.CreateSpacer());
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.FilterGroups.DivChoice.Id + "filterCriteria"));
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).show();

    var metadataPath = "filterCriteria";
    $("#" + DRB.DOM.FilterGroups.DivChoice.Id + metadataPath).append(DRB.UI.CreateButton(DRB.DOM.FilterBy.StartButton.Id, DRB.DOM.FilterBy.StartButton.Name, DRB.DOM.FilterBy.StartButton.Class, DRB.Logic.RetrieveMultiple.StartAddFilter, "FilterGroups", "FilterColumns", metadataPath));

    var filterCriteria = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.filterCriteria));
    DRB.Metadata.filterCriteria = {};
    DRB.Metadata.CurrentNode.data.configuration.filterCriteria = {};
    DRB.Logic.RetrieveMultiple.ParseFilterCriteria(filterCriteria, metadataPath);
}

/**
 * Retrieve Multiple - Configure Order Columns
*/
DRB.Logic.RetrieveMultiple.ConfigureOrderColumns = function () {
    var columnsCriteria = "IsValidForOrder";
    var domObject = "OrderColumns";
    var metadataPath = "orderFields";

    // get full Metadata and configuration path
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
    metadataPath.split("_").forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    // show the DOM
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).show();
    $('#' + DRB.DOM[domObject].Table.Id + metadataPath + ' tr').remove();

    // verify if the fields exist
    var fields = JSON.parse(JSON.stringify(refConfiguration));
    var clearedFields = [];
    fields.forEach(function (field) {
        var checkColumn = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, field.logicalName);
        if (DRB.Utilities.HasValue(checkColumn)) { clearedFields.push(field); }
    });

    // reset Metadata and configuration arrays
    refMetadata.length = 0;
    refConfiguration.length = 0;

    clearedFields.forEach(function (field, fieldIndex) {
        DRB.Logic.AddColumn(columnsCriteria, domObject, metadataPath);
        $("#" + DRB.DOM[domObject].Dropdown.Id + metadataPath + "_" + fieldIndex).val(field.logicalName).change();
        $("#cbx_" + DRB.DOM[domObject].ControlValue.Id + metadataPath + "_" + fieldIndex).val(field.value).change();
    });
}

/**
 * Retrieve Multiple - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.RetrieveMultiple.AfterTableLoaded = function (table) {
    // Fill Current Metadata
    DRB.Logic.FillCurrentMetadata(table);
    // Fill Relationships Columns
    DRB.Logic.FillRelationshipsColumns();
    // Fill Columns
    DRB.Logic.FillColumns();
    // Fill Relationships
    DRB.Logic.FillRelationships();
    // Fill Alternate Keys
    DRB.Logic.FillAlternateKeys();

    // Fill primaryEntity and PrimaryIdField
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
    DRB.Metadata.CurrentNode.data.configuration.primaryIdField = table.PrimaryIdAttribute;

    DRB.Logic.RetrieveMultiple.ConfigureFilterBy();
    DRB.Logic.RetrieveMultiple.ConfigureOrderColumns();
}

/**
 * Retrieve Multiple - Bind Table
 * @param {string} id Id
*/
DRB.Logic.RetrieveMultiple.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            if (table.ColumnsLoaded === false || table.RelationshipsLoaded === false || table.AlternateKeysLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    DRB.Common.RetrieveTablesDetails([tableLogicalName], true, true)
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables, true, true);
                            var tableLogicalNames = [];
                            table.OneToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToOneRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            tableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(tableLogicalNames); // remove duplicates

                            var tablesToRetrieve = [];
                            tableLogicalNames.forEach(function (checkTableLogicalName) {
                                var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, checkTableLogicalName);
                                if (DRB.Utilities.HasValue(checkTable) && checkTable.ColumnsLoaded === false) { tablesToRetrieve.push(checkTableLogicalName); }
                            });
                            if (tablesToRetrieve.length > 0) {
                                DRB.Common.RetrieveTablesDetails(tablesToRetrieve, false, true)
                                    .done(function () {
                                        DRB.Common.SetTables(arguments, DRB.Metadata.Tables, false, true);
                                        DRB.Logic.RetrieveMultiple.AfterTableLoaded(table);
                                        DRB.UI.HideLoading();
                                    })
                                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                            } else {
                                DRB.Logic.RetrieveMultiple.AfterTableLoaded(table);
                                DRB.UI.HideLoading();
                            }
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.RetrieveMultiple.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Retrieve Multiple - Start 
 */
DRB.Logic.RetrieveMultiple.Start = function () {
    // Metadata
    DRB.Metadata["filterCriteria"] = {};
    DRB.Metadata["orderFields"] = [];

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();
    DRB.CustomUI.AddRetrieveCount();
    DRB.CustomUI.AddTopCount();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.RetrieveMultiple.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddColumns();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddRelationships();

    // #region Add Filter By
    // create FilterBy main div and span
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.FilterBy.MainDiv.Id, DRB.DOM.FilterBy.MainDiv.Class));
    $("#" + DRB.DOM.FilterBy.MainDiv.Id).hide(); // hide by default
    // #endregion

    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddTypeColumns(DRB.DOM.ConfigureContent.Id, "IsValidForOrder", "OrderColumns", "orderFields");
    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryIdField = "";
            DRB.Metadata.CurrentNode.data.configuration.fields = [];
            DRB.Metadata.CurrentNode.data.configuration.oneToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToOne = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.filterCriteria = {};
            DRB.Metadata.CurrentNode.data.configuration.orderFields = [];
        } else {
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }
    // #endregion
}
// #endregion  
 
// #region DRB.Logic.SetColumns
// Set Functions (used in Create, Update)

/**
 * Logic - Bind Set Column Value
 * @param {string} id Id
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindSetColumnValue = function (id, domObject, metadataPath) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        // get full Metadata and configuration path
        var refMetadata = DRB.Metadata;
        var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
        // get full Metadata and configuration path
        metadataPath.split("_").forEach(function (path) {
            if (isNaN(parseInt(path))) {
                if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
            } else {
                // is a position number
                var metadataIndex = parseInt(path);
                refMetadata.forEach(function (refItem, refItemIndex) {
                    if (refItem.Id === metadataIndex) {
                        // this is the correct path to follow
                        refMetadata = refMetadata[refItemIndex];
                        refConfiguration = refConfiguration[refItemIndex];
                    }
                });
            }
        });

        refMetadata.forEach(function (column, columnIndex) {
            if (column.Id === elementIndex) {
                var field = JSON.parse(JSON.stringify(column.Value));
                // Text
                if (controlName.indexOf("txt_") === 0) { field.value = controlValue; }
                // Picklist
                if (controlName.indexOf("cbx1_") === 0) {
                    field.value = controlValue;
                    if (DRB.Utilities.HasValue(controlValue)) { $('[data-id="' + controlName + '"]').children().last().show(); }
                    else { $('[data-id="' + controlName + '"]').children().last().hide(); }
                }
                // MultiPicklist
                if (controlName.indexOf("cbxm_") === 0) { field.value = controlValue; }
                // datetime
                if (controlName.indexOf("txtd_") === 0) {
                    field.value = controlValue;
                    field.dateTimeBehavior = $("#" + controlName).attr("data-datetimebehavior");
                }
                // if textbox belonging to a lookup save to the value.id property
                if (controlName.indexOf("txt2_") === 0) {
                    if (!DRB.Utilities.HasValue(field.value)) { field.value = {}; }
                    field.value.id = controlValue;
                }
                if (controlName.indexOf("cbx2_") === 0) {
                    if (!DRB.Utilities.HasValue(field.value)) { field.value = {}; }
                    field.value.entityType = controlValue;
                    var tableSetName = "";
                    var navigationProperty = "";
                    var sourceColumn = $("#" + DRB.DOM[domObject].Dropdown.Id + metadataPath + "_" + elementIndex).val();
                    var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, controlValue);
                    if (DRB.Utilities.HasValue(checkTable)) { tableSetName = checkTable.EntitySetName; }
                    // Navigation Property
                    for (var relCount = 0; relCount < DRB.Metadata.CurrentManyToOne.length; relCount++) {
                        if (DRB.Metadata.CurrentManyToOne[relCount].NavigationAttribute === sourceColumn)
                            if (DRB.Metadata.CurrentManyToOne[relCount].TargetTable === controlValue ||
                                DRB.Metadata.CurrentManyToOne[relCount].TargetTable === "owner") {
                                navigationProperty = DRB.Metadata.CurrentManyToOne[relCount].NavigationProperty;
                                break;
                            }
                    }
                    field.value.entitySetName = tableSetName;
                    field.value.navigationProperty = navigationProperty;
                }
                // update refMetadata and refConfiguration
                column.Value = field;
                refConfiguration[columnIndex] = field;
            }
        });
    });
}

/**
 * Logic - Bind Set Column
 * @param {string} id Id
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindSetColumn = function (id, columnType, domObject, metadataPath) {
    $("#" + id).on("change", function (e) {
        var columnLogicalName = $(this).val();
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnLogicalName);
        if (DRB.Utilities.HasValue(column)) {
            // define field
            var field = { logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName, value: null };
            // extract the index from the control name
            var controlName = $(this).attr('id');
            var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
            if (elementIndex === -1) { return; } // if index not found do nothing

            // get full Metadata and configuration path
            var refMetadata = DRB.Metadata;
            var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
            // get full Metadata and configuration path
            metadataPath.split("_").forEach(function (path) {
                if (isNaN(parseInt(path))) {
                    if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
                    if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
                } else {
                    // is a position number
                    var metadataIndex = parseInt(path);
                    refMetadata.forEach(function (refItem, refItemIndex) {
                        if (refItem.Id === metadataIndex) {
                            // this is the correct path to follow
                            refMetadata = refMetadata[refItemIndex];
                            refConfiguration = refConfiguration[refItemIndex];
                        }
                    });
                }
            });

            // update Metadata and configuration
            for (var i = 0; i < refMetadata.length; i++) {
                if (refMetadata[i].Id === elementIndex) {
                    refMetadata[i].Value = field;
                    refConfiguration[i] = field;
                    break;
                }
            }

            var uniqueIndex = metadataPath + "_" + elementIndex;
            $("#" + DRB.DOM[domObject].TdValue.Id + uniqueIndex).html(""); // empty the cell
            var divValue = DRB.UI.CreateEmptyDiv(DRB.DOM[domObject].DivValue.Id + uniqueIndex);
            $("#" + DRB.DOM[domObject].TdValue.Id + uniqueIndex).append(divValue);
            switch (column.AttributeType) {
                case "Uniqueidentifier":
                    divValue.append(DRB.UI.CreateInputGuid("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex));
                    DRB.Common.BindGuid("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "EntityName":
                    divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex));
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "String":
                    divValue.append(DRB.UI.CreateInputString("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "Memo":
                    divValue.append(DRB.UI.CreateInputMemo("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, column.AdditionalProperties.MaxLength, "Max Length: " + column.AdditionalProperties.MaxLength));
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "Integer":
                case "BigInt":
                    divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue));
                    DRB.Common.BindInteger("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "Decimal":
                case "Double":
                case "Money":
                    divValue.append(DRB.UI.CreateInputNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, "Min Value: " + column.AdditionalProperties.MinValue + " - Max Value: " + column.AdditionalProperties.MaxValue + " - Precision: " + column.AdditionalProperties.Precision));
                    DRB.Common.BindNumber("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, column.AdditionalProperties.MinValue, column.AdditionalProperties.MaxValue);
                    DRB.Logic.BindSetColumnValue("txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "ManagedProperty":
                case "Boolean":
                case "Picklist":
                case "State":
                case "Status":
                    var currentId = "cbx1_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex;
                    divValue.append(DRB.UI.CreateDropdown(currentId));
                    var options = [];
                    if (DRB.Utilities.HasValue(column.OptionValues)) {
                        column.OptionValues.forEach(function (option) {
                            options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                        });
                    }
                    DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                    // after the render add the X button
                    $('[data-id="' + currentId + '"]').append(DRB.UI.CreateRemoveButton(DRB.UI.UnselectDropdown, currentId));
                    $('[data-id="' + currentId + '"]').children().last().hide();
                    DRB.Logic.BindSetColumnValue("cbx1_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "MultiPicklist":
                    var currentId = "cbxm_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex;
                    divValue.append(DRB.UI.CreateDropdown(currentId, true));
                    var options = [];
                    if (DRB.Utilities.HasValue(column.OptionValues)) {
                        column.OptionValues.forEach(function (option) {
                            options.push(new DRB.Models.OptionSetValue(option.Value, option.Label));
                        });
                    }
                    DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(options).ToDropdown());
                    DRB.Logic.BindSetColumnValue("cbxm_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    break;

                case "Lookup":
                case "Owner":
                case "Customer":
                    divValue.append(DRB.UI.CreateInputGuid("txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex));
                    DRB.Common.BindGuid("txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                    DRB.Logic.BindSetColumnValue("txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    if (column.AdditionalProperties.Targets.length > 0) {
                        divValue.append(DRB.UI.CreateSimpleDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex));
                        var targets = [];
                        column.AdditionalProperties.Targets.forEach(function (target) {
                            var targetTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, target);
                            if (DRB.Utilities.HasValue(targetTable)) {
                                targets.push(new DRB.Models.Table(target, targetTable.Name));
                            }
                        });
                        DRB.UI.FillDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, "", new DRB.Models.Records(targets).ToDropdown());
                        divValue.append(DRB.UI.CreateLookup("lkp_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, DRB.UI.OpenLookup,
                            {
                                openCustom: true,
                                defaultEntityType: column.AdditionalProperties.Targets[0],
                                entityTypes: column.AdditionalProperties.Targets,
                                textId: "txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex,
                                dropdownId: "cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex
                            }));

                        DRB.Logic.BindSetColumnValue("cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                        $("#cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(targets[0].Id).change();
                    }
                    break;

                case "DateTime":
                    var clearedDateTimeFormat = "";
                    var pickerFormat = "YYYY-MM-DD HH:mm";
                    if (DRB.Utilities.HasValue(column.AdditionalProperties.DateTimeFormat)) {
                        if (column.AdditionalProperties.DateTimeFormat === "DateOnly") { pickerFormat = "YYYY-MM-DD"; }
                        clearedDateTimeFormat = column.AdditionalProperties.DateTimeFormat.replace(/([A-Z])/g, ' $1').trim();
                    }
                    var dateTimeBehavior = "ND"; // not defined
                    var clearedDateTimeBehavior = "";
                    if (DRB.Utilities.HasValue(column.AdditionalProperties.DateTimeBehavior)) {
                        dateTimeBehavior = column.AdditionalProperties.DateTimeBehavior;
                        clearedDateTimeBehavior = column.AdditionalProperties.DateTimeBehavior.replace(/([A-Z])/g, ' $1').trim();
                    }
                    if (clearedDateTimeBehavior === "Time Zone Independent") { clearedDateTimeBehavior = "TZI"; }
                    divValue.append(DRB.UI.CreateInputDateTime("txtd_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, dateTimeBehavior, "Behavior: " + clearedDateTimeBehavior + " - Format: " + clearedDateTimeFormat));
                    DRB.Logic.BindSetColumnValue("txtd_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, domObject, metadataPath);
                    $("#txtd_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).datetimepicker({ format: pickerFormat, ignoreReadonly: true, showClear: true, showTodayButton: true }).on('dp.change', function (e) { $(e.target).change(); });
                    break;

                case "Image":
                    divValue.append(DRB.UI.CreateInputFile(DRB.DOM.Image.LoadInput.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, true, DRB.Logic.ParseImage));
                    divValue.append(DRB.UI.CreateButton(DRB.DOM.Image.LoadButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, DRB.DOM.Image.LoadButton.Name, DRB.DOM.Image.LoadButton.Class, DRB.Logic.LoadImage, domObject, metadataPath, elementIndex));
                    divValue.append(DRB.UI.CreateButton(DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, DRB.DOM.Image.ShowButton.Name, DRB.DOM.Image.ShowButton.Class, DRB.Logic.ShowImage, metadataPath, elementIndex));
                    divValue.append(DRB.UI.CreateButton(DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex, DRB.DOM.Image.RemoveButton.Name, DRB.DOM.Image.RemoveButton.Class, DRB.Logic.RemoveImage, domObject, metadataPath, elementIndex));
                    $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).hide();
                    $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).hide();
                    break;
            }

        }
        DRB.Logic.RefreshColumns(columnType, domObject, metadataPath);
    });
}

/**
 * Logic - After Set Table Loaded
 * @param {DRB.Models.Table} table Table
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.AfterSetTableLoaded = function (table, columnType, domObject, metadataPath) {
    // Fill Current Metadata
    DRB.Logic.FillCurrentMetadata(table);
    // Fill Relationships Columns
    DRB.Logic.FillRelationshipsColumns();
    // Fill Columns
    DRB.Logic.FillColumns();
    // Fill Relationships
    DRB.Logic.FillRelationships();
    // Fill Alternate Keys for Update
    if (columnType === "IsValidForUpdate") { DRB.Logic.FillAlternateKeys(); }

    // Fill primaryEntity and PrimaryIdField
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
    DRB.Metadata.CurrentNode.data.configuration.primaryIdField = table.PrimaryIdAttribute;

    // get full Metadata and configuration path
    var refMetadata = DRB.Metadata;
    var refConfiguration = DRB.Metadata.CurrentNode.data.configuration;
    // get full Metadata and configuration path
    metadataPath.split("_").forEach(function (path) {
        if (isNaN(parseInt(path))) {
            if (refMetadata.hasOwnProperty(path)) { refMetadata = refMetadata[path]; }
            if (refConfiguration.hasOwnProperty(path)) { refConfiguration = refConfiguration[path]; }
        } else {
            // is a position number
            var metadataIndex = parseInt(path);
            refMetadata.forEach(function (refItem, refItemIndex) {
                if (refItem.Id === metadataIndex) {
                    // this is the correct path to follow
                    refMetadata = refMetadata[refItemIndex];
                    refConfiguration = refConfiguration[refItemIndex];
                }
            });
        }
    });

    // show the DOM
    $("#" + DRB.DOM[domObject].MainDiv.Id + metadataPath).show();
    $('#' + DRB.DOM[domObject].Table.Id + metadataPath + ' tr').slice(1).remove();

    // verify if the fields exist
    var fields = JSON.parse(JSON.stringify(refConfiguration));
    var clearedFields = [];
    fields.forEach(function (field) {
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, field.logicalName);
        if (DRB.Utilities.HasValue(column)) { clearedFields.push(field); }
    });

    // reset Metadata and configuration arrays
    refMetadata.length = 0;
    refConfiguration.length = 0;

    clearedFields.forEach(function (field, fieldIndex) {
        var uniqueIndex = metadataPath + "_" + fieldIndex;
        DRB.Logic.AddColumn(columnType, domObject, metadataPath);
        $("#" + DRB.DOM[domObject].Dropdown.Id + uniqueIndex).val(field.logicalName).change();

        switch (field.type) {
            case "EntityName":
            case "String":
            case "Memo":
                $("#txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).change();
                break;

            case "Uniqueidentifier":
            case "Integer":
            case "BigInt":
            case "Decimal":
            case "Double":
            case "Money":
                $("#txt_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).trigger("input").change();
                break;

            case "ManagedProperty":
            case "Boolean":
            case "Picklist":
            case "State":
            case "Status":
                $("#cbx1_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).change();
                DRB.UI.RefreshDropdown("cbx1_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                break;

            case "MultiPicklist":
                $("#cbxm_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).change();
                DRB.UI.RefreshDropdown("cbxm_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                break;

            case "Lookup":
            case "Owner":
            case "Customer":
                var idValue = null;
                var entityTypeValue = null;
                if (DRB.Utilities.HasValue(field.value)) { idValue = field.value.id; entityTypeValue = field.value.entityType; }
                $("#txt2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(idValue).trigger("input").change();
                $("#cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(entityTypeValue).change();
                DRB.UI.RefreshDropdown("cbx2_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex);
                break;

            case "DateTime":
                $("#txtd_" + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).val(field.value).change();
                break;

            case "Image":
                if (!DRB.Utilities.HasValue(field.value)) {
                    $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).hide();
                    $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).hide();
                } else {
                    refConfiguration[fieldIndex].value = field.value;
                    $("#" + DRB.DOM.Image.ShowButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).show();
                    $("#" + DRB.DOM.Image.RemoveButton.Id + DRB.DOM[domObject].ControlValue.Id + uniqueIndex).show();
                }
                break;
        }
    });

    // if no [metadataPath] trigger the AddColumn
    if (refMetadata.length === 0) { DRB.Logic.AddColumn(columnType, domObject, metadataPath); }
}

/**
 * Logic - Bind Set Table
 * @param {string} id Id
 * @param {string} columnType Column Type
 * @param {string} domObject DOM Object
 * @param {string} metadataPath Metadata Path
 */
DRB.Logic.BindSetTable = function (id, columnType, domObject, metadataPath) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            if (table.ColumnsLoaded === false || table.RelationshipsLoaded === false || table.AlternateKeysLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    DRB.Common.RetrieveTablesDetails([tableLogicalName], true, true)
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables, true, true);
                            var tableLogicalNames = [];
                            table.OneToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToOneRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.SourceTable); tableLogicalNames.push(relationship.TargetTable); });
                            tableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(tableLogicalNames); // remove duplicates

                            var tablesToRetrieve = [];
                            tableLogicalNames.forEach(function (checkTableLogicalName) {
                                var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, checkTableLogicalName);
                                if (DRB.Utilities.HasValue(checkTable)) {
                                    if (checkTable.ColumnsLoaded === false || checkTable.RelationshipsLoaded === false || checkTable.AlternateKeysLoaded === false) {
                                        tablesToRetrieve.push(checkTableLogicalName);
                                    }
                                }
                            });
                            if (tablesToRetrieve.length > 0) {
                                DRB.Common.RetrieveTablesDetails(tablesToRetrieve, true, true)
                                    .done(function () {
                                        DRB.Common.SetTables(arguments, DRB.Metadata.Tables, true, true);
                                        DRB.Logic.AfterSetTableLoaded(table, columnType, domObject, metadataPath);
                                        DRB.UI.HideLoading();
                                    })
                                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                            } else {
                                DRB.Logic.AfterSetTableLoaded(table, columnType, domObject, metadataPath);
                                DRB.UI.HideLoading();
                            }
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else { DRB.Logic.AfterSetTableLoaded(table, columnType, domObject, metadataPath); }
        }
    });
}
// #endregion  
 
// #region DRB.Logic.Create
/**
 * Create - Start 
 */
DRB.Logic.Create.Start = function () {
    // default settings
    var columnsCriteria = "IsValidForCreate";
    var domObject = "SetColumns";
    var metadataPath = "setFields";

    // Metadata
    DRB.Metadata[metadataPath] = [];

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();

    // #region Return Record
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.ReturnRecord.Span.Id, DRB.DOM.ReturnRecord.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.ReturnRecord.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.ReturnRecord.Dropdown.Id, DRB.DOM.ReturnRecord.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindReturnRecord(DRB.DOM.ReturnRecord.Dropdown.Id);
    var returnRecordValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.returnRecord === true) { returnRecordValue = "yes"; }
    // trigger later
    // #endregion

    DRB.CustomUI.AddDetectDuplicates();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.BindSetTable(DRB.DOM.Table.Dropdown.Id, columnsCriteria, domObject, metadataPath);
    // #endregion

    DRB.CustomUI.AddColumns();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddRelationships();
    DRB.CustomUI.AddTypeColumns(DRB.DOM.ConfigureContent.Id, columnsCriteria, domObject, metadataPath);
    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the connected values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryIdField = "";
            DRB.Metadata.CurrentNode.data.configuration.fields = [];
            DRB.Metadata.CurrentNode.data.configuration.oneToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToOne = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.setFields = [];
        } else {
            // trigger change with table logical name
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }

    // Return Record
    $("#" + DRB.DOM.ReturnRecord.Dropdown.Id).val(returnRecordValue).change();
    // #endregion
}
// #endregion  
 
// #region DRB.Logic.Update
/**
 * Update - Start
 */
DRB.Logic.Update.Start = function () {
    // default settings
    var columnsCriteria = "IsValidForUpdate";
    var domObject = "SetColumns";
    var metadataPath = "setFields";

    // Metadata
    DRB.Metadata[metadataPath] = [];

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();

    // #region Return Record
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.ReturnRecord.Span.Id, DRB.DOM.ReturnRecord.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSimpleDropdown(DRB.DOM.ReturnRecord.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.ReturnRecord.Dropdown.Id, DRB.DOM.ReturnRecord.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsYesNo).ToDropdown());
    DRB.Logic.BindReturnRecord(DRB.DOM.ReturnRecord.Dropdown.Id);
    var returnRecordValue = "no";
    if (DRB.Metadata.CurrentNode.data.configuration.returnRecord === true) { returnRecordValue = "yes"; }
    // trigger later
    // #endregion

    DRB.CustomUI.AddDetectDuplicates();
    DRB.CustomUI.AddPrevent();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.BindSetTable(DRB.DOM.Table.Dropdown.Id, columnsCriteria, domObject, metadataPath);
    // #endregion

    DRB.CustomUI.AddColumns();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddRelationships();
    DRB.CustomUI.AddUseAlternateKey();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddTypeColumns(DRB.DOM.ConfigureContent.Id, columnsCriteria, domObject, metadataPath);
    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the connected values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryIdField = "";
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";
            DRB.Metadata.CurrentNode.data.configuration.fields = [];
            DRB.Metadata.CurrentNode.data.configuration.oneToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToOne = [];
            DRB.Metadata.CurrentNode.data.configuration.manyToMany = [];
            DRB.Metadata.CurrentNode.data.configuration.setFields = [];

            $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("no").change();
            DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        } else {
            // trigger change with table logical name
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    } else { DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id); }

    // Return Record
    $("#" + DRB.DOM.ReturnRecord.Dropdown.Id).val(returnRecordValue).change();
    // #endregion
}
// #endregion  
 
// #region DRB.Logic.Delete
/**
 * Delete - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.Delete.AfterTableLoaded = function (table) {
    DRB.Logic.FillCurrentMetadata(table); // Fill Current Metadata    
    DRB.Logic.FillAlternateKeys(); // Fill Alternate Keys

    // Fill data.configuration (primaryEntity, PrimaryIdField)
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
    DRB.Metadata.CurrentNode.data.configuration.primaryIdField = table.PrimaryIdAttribute;
}

/**
 * Delete - Bind Table
 * @param {string} id Id
*/
DRB.Logic.Delete.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            if (table.ColumnsLoaded === false || table.AlternateKeysLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    DRB.Common.RetrieveTablesDetails([tableLogicalName], false, true)
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables, false, true);
                            DRB.Logic.Delete.AfterTableLoaded(table);
                            DRB.UI.HideLoading();
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.Delete.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Delete - Start
 */
DRB.Logic.Delete.Start = function () {
    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.Logic.Delete.BindTable(DRB.DOM.Table.Dropdown.Id);
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    // #endregion

    DRB.CustomUI.AddUseAlternateKey();
    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryIdField = "";
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";

            $("#" + DRB.DOM.UseAlternateKey.Dropdown.Id).val("no").change();
            DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id);
        } else {
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    } else { DRB.UI.LockDropdown(DRB.DOM.UseAlternateKey.Dropdown.Id); }
    // #endregion
}
// #endregion  
 
// #region DRB.Logic.Association
/**
 * Association - Remove Child Id
 * @param {string} index Index
 */
DRB.Logic.Association.RemoveChildId = function (index) {
    $("#" + DRB.DOM.ChildId.DivPrefix.Id + index).remove();

    var newMetadataSecondaryIds = [];
    var indexToRemove = -1;
    DRB.Metadata.SecondaryIds.forEach(function (secondaryId, secondaryIndex) {
        if (secondaryId.Id == index) { indexToRemove = secondaryIndex; } else { newMetadataSecondaryIds.push(secondaryId); }
    });
    DRB.Metadata.SecondaryIds = newMetadataSecondaryIds;

    if (indexToRemove > -1) {
        var newSecondaryIds = [];
        DRB.Metadata.CurrentNode.data.configuration.secondaryIds.forEach(function (secondaryId, secondaryIndex) {
            if (secondaryIndex != indexToRemove) { newSecondaryIds.push(secondaryId); }
        });
        DRB.Metadata.CurrentNode.data.configuration.secondaryIds = newSecondaryIds;
    }
}

/**
 * Association - Add Child Id
 * @param {string} idValue Id Value
 */
DRB.Logic.Association.AddChildId = function (idValue) {
    if (!DRB.Utilities.HasValue(idValue)) { idValue = ""; }
    var index = 0;
    if (DRB.Metadata.SecondaryIds.length > 0) { index = DRB.Metadata.SecondaryIds[DRB.Metadata.SecondaryIds.length - 1].Id + 1; }
    // Take Logic from Create if necessary to rearrange

    var divChildId_ = DRB.UI.CreateEmptyDiv(DRB.DOM.ChildId.DivPrefix.Id + index);
    if (index == 0) {
        //divChildId_.append(DRB.UI.CreateEmptyRemoveButton());
    } else {
        divChildId_.append(DRB.UI.CreateRemoveButton(DRB.Logic.Association.RemoveChildId, index));
    }
    divChildId_.append(DRB.UI.CreateSpan(DRB.DOM.ChildId.SpanPrefix.Id + index, DRB.DOM.ChildId.SpanPrefix.Name));
    divChildId_.append(DRB.UI.CreateInputGuid(DRB.DOM.ChildId.InputPrefix.Id + index));
    divChildId_.append(DRB.UI.CreateLookup(DRB.DOM.ChildId.LookupPrefix.Id + index, DRB.UI.OpenLookup, { openSecondaryEntity: true, textId: DRB.DOM.ChildId.InputPrefix.Id + index }));
    divChildId_.append(DRB.UI.CreateSpacer());
    $("#" + DRB.DOM.ChildId.Div.Id).append(divChildId_);
    DRB.Common.BindGuid(DRB.DOM.ChildId.InputPrefix.Id + index);
    DRB.Logic.Association.BindChildId(DRB.DOM.ChildId.InputPrefix.Id + index);
    DRB.Metadata.SecondaryIds.push(new DRB.Models.IdValue(index, idValue));
    DRB.Metadata.CurrentNode.data.configuration.secondaryIds.push(idValue);
}

/**
 * Association - After Table Loaded
 * @param {DRB.Models.Table} table Table
 */
DRB.Logic.Association.AfterTableLoaded = function (table) {
    DRB.Logic.FillCurrentMetadata(table); // Fill Current Metadata    
    DRB.Logic.FillRelationshipsColumns(); // Fill Relationships Columns

    var tableLogicalNames = [];
    table.OneToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.TargetTable); });
    table.ManyToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.TargetTable); });
    tableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(tableLogicalNames); // remove duplicates

    var childTables = [];
    tableLogicalNames.forEach(function (tableLogicalName) {
        var childTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(childTable)) { childTables.push(childTable); }
    });
    childTables.sort(DRB.Utilities.CustomSort("Name"));
    DRB.UI.FillDropdown(DRB.DOM.ChildTable.Dropdown.Id, DRB.DOM.ChildTable.Dropdown.Name, new DRB.Models.Records(childTables).ToDropdown());

    var childTable = "";
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.secondaryEntity)) {
        childTable = DRB.Metadata.CurrentNode.data.configuration.secondaryEntity.logicalName;
    }
    $("#" + DRB.DOM.ChildTable.Dropdown.Id).val(childTable).change();

    // Fill data.configuration (primaryEntity)
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
}

/**
 * Association - Bind Parent Table
 * @param {string} id Id
 */
DRB.Logic.Association.BindParentTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            if (table.RelationshipsLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    // retrieve the Entity Fields
                    DRB.Common.RetrieveTablesDetails([tableLogicalName], true)
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables, true);
                            var tableLogicalNames = [];
                            table.OneToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.TargetTable); });
                            table.ManyToManyRelationships.forEach(function (relationship) { tableLogicalNames.push(relationship.TargetTable); });
                            tableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(tableLogicalNames); // remove duplicates

                            var tablesToRetrieve = [];
                            tableLogicalNames.forEach(function (checkTableLogicalName) {
                                var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, checkTableLogicalName);
                                if (DRB.Utilities.HasValue(checkTable) && checkTable.ColumnsLoaded === false) { tablesToRetrieve.push(checkTableLogicalName); }
                            });
                            if (tablesToRetrieve.length > 0) {
                                DRB.Common.RetrieveTablesDetails(tablesToRetrieve)
                                    .done(function () {
                                        DRB.Common.SetTables(arguments, DRB.Metadata.Tables);
                                        DRB.Logic.Association.AfterTableLoaded(table);
                                        DRB.UI.HideLoading();
                                    })
                                    .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                            } else {
                                DRB.Logic.Association.AfterTableLoaded(table);
                                DRB.UI.HideLoading();
                            }
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.Association.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Association - Bind Child Table
 * @param {string} id Id
 */
DRB.Logic.Association.BindChildTable = function (id) {
    $("#" + id).on("change", function (e) {
        DRB.Metadata.CurrentNode.data.configuration.secondaryEntity = null;
        DRB.UI.ResetDropdown(DRB.DOM.ParentRelationship.Dropdown.Id, DRB.DOM.ParentRelationship.Dropdown.Name);
        var parentTableLogicalName = $("#" + DRB.DOM.ParentTable.Dropdown.Id).val();
        var childTableLogicalName = $(this).val();
        var parentTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, parentTableLogicalName);
        var childTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, childTableLogicalName);
        if (DRB.Utilities.HasValue(parentTable) && DRB.Utilities.HasValue(childTable)) {
            var relationships = [];
            parentTable.OneToManyRelationships.forEach(function (relationship) {
                if (relationship.TargetTable === childTableLogicalName) {
                    relationships.push(new DRB.Models.SimpleRelationship(relationship.SchemaName, relationship.Type, relationship.SourceTable, relationship.TargetTable, relationship.NavigationAttribute, relationship.NavigationAttributeName));
                }
            });
            parentTable.ManyToManyRelationships.forEach(function (relationship) {
                if (relationship.TargetTable === childTableLogicalName) {
                    relationships.push(new DRB.Models.SimpleRelationship(relationship.SchemaName, relationship.Type, relationship.SourceTable, relationship.TargetTable, relationship.NavigationAttribute, relationship.NavigationAttributeName));
                }
            });
            DRB.UI.FillDropdownWithGroups(DRB.DOM.ParentRelationship.Dropdown.Id, DRB.DOM.ParentRelationship.Dropdown.Name, new DRB.Models.Records(relationships).ToDropdown());
            var relationship = "";
            if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.relationship)) {
                relationship = DRB.Metadata.CurrentNode.data.configuration.relationship;
            }
            $("#" + DRB.DOM.ParentRelationship.Dropdown.Id).val(relationship).change();

            DRB.Metadata.CurrentNode.data.configuration.secondaryEntity = { logicalName: childTable.LogicalName, schemaName: childTable.SchemaName, label: childTable.Name, entitySetName: childTable.EntitySetName };
        }
    });
}

/**
 * Association - Bind Child Id
 * @param {string} id Id
 */
DRB.Logic.Association.BindChildId = function (id) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        DRB.Metadata.SecondaryIds.forEach(function (secondaryId, secondaryIndex) {
            if (secondaryId.Id === elementIndex) {
                secondaryId.Value = controlValue;
                DRB.Metadata.CurrentNode.data.configuration.secondaryIds[secondaryIndex] = controlValue;
            }
        });
    });
}

/**
 * Association - Bind Parent Relationship
 * @param {string} id Id
 */
DRB.Logic.Association.BindParentRelationship = function (id) {
    $("#" + id).on("change", function (e) {
        var relationshipValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.relationship = relationshipValue;
    });
}

/**
 * Association - Start
 */
DRB.Logic.Association.Start = function () {
    // Metadata
    DRB.Metadata.SecondaryIds = [];

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();

    // #region Parent Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.ParentTable.Span.Id, DRB.DOM.ParentTable.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.ParentTable.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.ParentTable.Dropdown.Id, DRB.DOM.ParentTable.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.Association.BindParentTable(DRB.DOM.ParentTable.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddPrimaryId();
    DRB.CustomUI.AddSpacer();

    // #region Child Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.ChildTable.Span.Id, DRB.DOM.ChildTable.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.ChildTable.Dropdown.Id));
    DRB.UI.ResetDropdown(DRB.DOM.ChildTable.Dropdown.Id, DRB.DOM.ChildTable.Dropdown.Name);
    DRB.Logic.Association.BindChildTable(DRB.DOM.ChildTable.Dropdown.Id);
    // #endregion

    // #region Parent Relationship
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.ParentRelationship.Span.Id, DRB.DOM.ParentRelationship.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.ParentRelationship.Dropdown.Id));
    DRB.UI.ResetDropdown(DRB.DOM.ParentRelationship.Dropdown.Id, DRB.DOM.ParentRelationship.Dropdown.Name);
    DRB.Logic.Association.BindParentRelationship(DRB.DOM.ParentRelationship.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region Secondary Ids
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.ChildId.Div.Id));
    // #endregion

    DRB.CustomUI.AddSpacer();

    // $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateButton(DRB.DOM.ChildId.AddButton.Id, DRB.DOM.ChildId.AddButton.Name, DRB.DOM.ChildId.AddButton.Class, DRB.Logic.Association.AddChildId));

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";
            DRB.Metadata.CurrentNode.data.configuration.secondaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.secondaryIds = [""];
        } else {
            $("#" + DRB.DOM.ParentTable.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }

    // Secondary Ids
    if (Array.isArray(DRB.Metadata.CurrentNode.data.configuration.secondaryIds)) {
        var secondaryIds = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.secondaryIds));
        DRB.Metadata.CurrentNode.data.configuration.secondaryIds = [];
        secondaryIds.forEach(function (secondaryId, secondaryIndex) {
            DRB.Logic.Association.AddChildId(secondaryId);
            $("#" + DRB.DOM.ChildId.InputPrefix.Id + secondaryIndex).val(secondaryId).trigger("input");
        });
    }
    // #endregion
}
// #endregion  
 
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
 
// #region DRB.Logic.PredefinedQuery
/**
 * Predefined Query - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.PredefinedQuery.AfterTableLoaded = function (table) {
    // Fill data.configuration (primaryEntity)
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };

    DRB.UI.FillDropdown(DRB.DOM.PersonalViewId.Dropdown.Id, DRB.DOM.PersonalViewId.Dropdown.Name, new DRB.Models.Records(table.PersonalViews).ToDropdown(), false, false, true);
    $("#" + DRB.DOM.QueryType.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.queryType).change();
    $("#" + DRB.DOM.PersonalViewId.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.personalViewId);
    DRB.UI.RefreshDropdown(DRB.DOM.PersonalViewId.Dropdown.Id);
    DRB.Metadata.XMLEditor.session.setValue(DRB.Metadata.CurrentNode.data.configuration.fetchXML);
}

/**
 * Predefined Query - Bind Table
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        DRB.Metadata.QueryObjectTypeCode = null;
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            DRB.UI.UnlockDropdown(DRB.DOM.QueryType.Dropdown.Id);
            DRB.Metadata.QueryObjectTypeCode = table.ObjectTypeCode;
            if (table.PersonalViewsLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Personal Views...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    DRB.Common.RetrievePersonalViews()
                        .done(function (data) {
                            var personalViews = DRB.Common.MapPersonalViews(data, "Name");
                            personalViews.forEach(function (personalView) {
                                var viewTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, personalView.TableLogicalName);
                                if (DRB.Utilities.HasValue(viewTable)) { viewTable.PersonalViews.push(personalView); }
                            });
                            // set the personal views loaded as true for all the tables
                            DRB.Metadata.Tables.forEach(function (setTable) { setTable.PersonalViewsLoaded = true; });
                            DRB.Logic.PredefinedQuery.AfterTableLoaded(table);
                            DRB.UI.HideLoading();
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrievePersonalViews Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.PredefinedQuery.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Predefined Query - Bind Query Type
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindQueryType = function (id) {
    $("#" + id).on("change", function (e) {
        var queryTypeValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.queryType = queryTypeValue;
        // hide all sections
        $("#" + DRB.DOM.SystemViewId.Div.Id).hide();
        $("#" + DRB.DOM.PersonalViewId.Div.Id).hide();
        $("#" + DRB.DOM.FetchXML.Div.Id).hide();

        // show correct section based on queryTypeValue
        switch (queryTypeValue) {
            case "savedquery": $("#" + DRB.DOM.SystemViewId.Div.Id).show(); break;
            case "userquery": $("#" + DRB.DOM.PersonalViewId.Div.Id).show(); break;
            case "fetchxml": $("#" + DRB.DOM.FetchXML.Div.Id).show(); break;
        }
    });
}

/**
 * Predefined Query - Bind System View Id
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindSystemViewId = function (id) {
    $("#" + id).on("change", function (e) {
        var systemViewIdValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.systemViewId = systemViewIdValue;
    });
}

/**
 * Predefined Query - Bind Personal View Id
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindPersonalViewId = function (id) {
    $("#" + id).on("change", function (e) {
        var personalViewIdValue = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.personalViewId = personalViewIdValue;
    });
}

/**
 * Predefined Query - Bind Personal View
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindPersonalView = function (id) {
    $("#" + id).on("change", function (e) {
        var personalViewValue = $(this).val();
        $("#" + DRB.DOM.PersonalViewId.Input.Id).val(personalViewValue).trigger("input").change();
    });
}

/**
 * Predefined Query - Bind FetchXML
 * @param {string} id Id
*/
DRB.Logic.PredefinedQuery.BindFetchXML = function (id) {
    id.getSession().on("change", function (e) {
        var fetchXMLValue = DRB.Metadata.XMLEditor.session.getValue();
        DRB.Metadata.CurrentNode.data.configuration.fetchXML = fetchXMLValue;
    });
}

/**
 * Predefined Query - Start
 */
DRB.Logic.PredefinedQuery.Start = function () {
    // Metadata
    DRB.Metadata.QueryObjectTypeCode = null;
    DRB.Metadata.XMLEditor = null;

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddFormattedValues();
    DRB.CustomUI.AddRetrieveCount();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.PredefinedQuery.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    // #region Query Type
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.QueryType.Span.Id, DRB.DOM.QueryType.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.QueryType.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.QueryType.Dropdown.Id, DRB.DOM.QueryType.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsViews).ToDropdown());
    DRB.Logic.PredefinedQuery.BindQueryType(DRB.DOM.QueryType.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region System View Id
    var divSystemViewId = DRB.UI.CreateEmptyDiv(DRB.DOM.SystemViewId.Div.Id);
    divSystemViewId.append(DRB.UI.CreateSpan(DRB.DOM.SystemViewId.Span.Id, DRB.DOM.SystemViewId.Span.Name));
    divSystemViewId.append(DRB.UI.CreateInputGuid(DRB.DOM.SystemViewId.Input.Id));
    divSystemViewId.append(DRB.UI.CreateLookup(DRB.DOM.SystemViewId.Lookup.Id, DRB.UI.OpenLookup, { openView: true, textId: DRB.DOM.SystemViewId.Input.Id }));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divSystemViewId);
    DRB.Logic.PredefinedQuery.BindSystemViewId(DRB.DOM.SystemViewId.Input.Id);
    DRB.Common.BindGuid(DRB.DOM.SystemViewId.Input.Id);
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.systemViewId)) {
        $("#" + DRB.DOM.SystemViewId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.systemViewId).trigger("input");
    }
    divSystemViewId.hide();
    // #endregion

    // #region Personal View
    var divPersonalViewId = DRB.UI.CreateEmptyDiv(DRB.DOM.PersonalViewId.Div.Id);
    divPersonalViewId.append(DRB.UI.CreateSpan(DRB.DOM.PersonalViewId.SpanDropdown.Id, DRB.DOM.PersonalViewId.SpanDropdown.Name));
    divPersonalViewId.append(DRB.UI.CreateDropdown(DRB.DOM.PersonalViewId.Dropdown.Id));
    divPersonalViewId.append(DRB.UI.CreateSpacer());
    divPersonalViewId.append(DRB.UI.CreateSpan(DRB.DOM.PersonalViewId.Span.Id, DRB.DOM.PersonalViewId.Span.Name));
    divPersonalViewId.append(DRB.UI.CreateInputGuid(DRB.DOM.PersonalViewId.Input.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divPersonalViewId);
    DRB.Logic.PredefinedQuery.BindPersonalViewId(DRB.DOM.PersonalViewId.Input.Id);
    DRB.Logic.PredefinedQuery.BindPersonalView(DRB.DOM.PersonalViewId.Dropdown.Id);
    DRB.Common.BindGuid(DRB.DOM.PersonalViewId.Input.Id);
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.personalViewId)) {
        $("#" + DRB.DOM.PersonalViewId.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.personalViewId).trigger("input");
    }
    divPersonalViewId.hide();
    // #endregion

    // #region FetchXML
    var divFetchXML = DRB.UI.CreateEmptyDiv(DRB.DOM.FetchXML.Div.Id);
    divFetchXML.append(DRB.UI.CreateSpan(DRB.DOM.FetchXML.Span.Id, DRB.DOM.FetchXML.Span.Name));
    divFetchXML.append(DRB.UI.CreateEmptyDiv(DRB.DOM.FetchXML.Editor.Id, DRB.DOM.FetchXML.Editor.Class));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFetchXML);

    DRB.Metadata.XMLEditor = ace.edit(DRB.DOM.FetchXML.Editor.Id, { useWorker: false });
    DRB.Metadata.XMLEditor.session.setMode("ace/mode/xml");
    DRB.Metadata.XMLEditor.setShowPrintMargin(false);
    DRB.Logic.PredefinedQuery.BindFetchXML(DRB.Metadata.XMLEditor);
    divFetchXML.hide();
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.UI.LockDropdown(DRB.DOM.QueryType.Dropdown.Id);
        } else {
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    } else { DRB.UI.LockDropdown(DRB.DOM.QueryType.Dropdown.Id); }
    // #endregion
}
// #endregion  
 
// #region DRB.Logic.DataverseExecute
/**
 * Dataverse Execute - Download Dataverse Custom APIs
 * @param {string} sourceRequestType Source Request Type
 */
DRB.Logic.DataverseExecute.DownloadDataverseCustomAPIs = function (sourceRequestType) {
    // DRB.Metadata arrays
    DRB.Metadata.DataverseCustomAPITables = [];
    DRB.Metadata.DataverseCustomAPIComplexTypes = [];
    DRB.Metadata.DataverseCustomAPIEnumTypes = [];

    DRB.UI.ShowLoading("Retrieving Custom APIs...<br /><b>This is a long-running operation</b>");
    setTimeout(function () {
        DRB.Common.RetrieveCustomAPIs()
            .done(function (data) {
                var customAPIs = DRB.Common.SetCustomAPITables(data);

                // create the response (ComplexType)
                customAPIs.forEach(function (customAPI) {
                    if (customAPI.Properties.length > 0) {
                        var returnTypeName = "mscrm." + customAPI.Id + "Response";
                        DRB.Metadata.DataverseCustomAPIComplexTypes.push(new DRB.Models.DataverseComplexType(returnTypeName, customAPI.Properties));
                        customAPI.HasReturnType = true;
                        customAPI.ReturnType = returnTypeName;
                    }
                });
                customAPIs.sort(DRB.Utilities.CustomSort("Name"));
                var customAPITableLogicalNames = [];
                customAPIs.forEach(function (customAPI) { customAPITableLogicalNames.push(customAPI.LogicalName); });
                customAPITableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(customAPITableLogicalNames); // remove duplicates

                customAPITableLogicalNames.forEach(function (tableLogicalName) {
                    var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                    if (DRB.Utilities.HasValue(table)) {
                        DRB.Metadata.DataverseCustomAPITables.push(new DRB.Models.DataverseTable(table.LogicalName, table.Name, table.SchemaName, table.EntitySetName, table.PrimaryIdAttribute, table.PrimaryNameAttribute, table.ObjectTypeCode));
                    }
                });
                DRB.Metadata.DataverseCustomAPITables.sort(DRB.Utilities.CustomSort("Name"));
                DRB.Metadata.DataverseCustomAPITables.unshift(new DRB.Models.DataverseTable("none", "(Unbound)", "None", "nones", "noneid", "name", 0));

                DRB.Metadata.DataverseCustomAPITables.forEach(function (customAPITable) {
                    customAPIs.forEach(function (customAPI) {
                        if (customAPI.LogicalName === customAPITable.LogicalName) { customAPITable.DataverseExecutes.push(customAPI); }
                    });
                });

                DRB.Metadata.DataverseCustomAPIsLoaded = true;
                $("#" + DRB.DOM.ConfigureContent.Id).empty();
                DRB.Logic.DataverseExecute.Start(sourceRequestType);
                DRB.UI.HideLoading();
            })
            .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveCustomAPIs Error", DRB.Common.GetErrorMessage(xhr)); });
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Dataverse Execute - Download Dataverse Custom API
 * @param {string} sourceRequestType Source Request Type
 */
DRB.Logic.DataverseExecute.DownloadDataverseCustomActions = function (sourceRequestType) {
    // DRB.Metadata arrays
    DRB.Metadata.DataverseCustomActionTables = [];
    DRB.Metadata.DataverseCustomActionComplexTypes = [];
    DRB.Metadata.DataverseCustomActionEnumTypes = [];

    DRB.UI.ShowLoading("Retrieving Custom Actions...<br /><b>This is a long-running operation</b>");
    setTimeout(function () {
        DRB.Common.RetrieveCustomActions()
            .done(function (data) {
                var customActions = DRB.Common.SetCustomActionTables(data);

                // create the response (ComplexType)
                customActions.forEach(function (customAction) {
                    if (customAction.Properties.length > 0) {
                        var returnTypeName = "mscrm." + customAction.Id + "Response";
                        DRB.Metadata.DataverseCustomActionComplexTypes.push(new DRB.Models.DataverseComplexType(returnTypeName, customAction.Properties));
                        customAction.HasReturnType = true;
                        customAction.ReturnType = returnTypeName;
                    }
                });
                customActions.sort(DRB.Utilities.CustomSort("Name"));
                var customActionTableLogicalNames = [];
                customActions.forEach(function (customAction) { customActionTableLogicalNames.push(customAction.LogicalName); });
                customActionTableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(customActionTableLogicalNames); // remove duplicates

                customActionTableLogicalNames.forEach(function (tableLogicalName) {
                    var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                    if (DRB.Utilities.HasValue(table)) {
                        DRB.Metadata.DataverseCustomActionTables.push(new DRB.Models.DataverseTable(table.LogicalName, table.Name, table.SchemaName, table.EntitySetName, table.PrimaryIdAttribute, table.PrimaryNameAttribute, table.ObjectTypeCode));
                    }
                });
                DRB.Metadata.DataverseCustomActionTables.sort(DRB.Utilities.CustomSort("Name"));
                DRB.Metadata.DataverseCustomActionTables.unshift(new DRB.Models.DataverseTable("none", "(Unbound)", "None", "nones", "noneid", "name", 0));

                DRB.Metadata.DataverseCustomActionTables.forEach(function (customActionTable) {
                    customActions.forEach(function (customAction) {
                        if (customAction.LogicalName === customActionTable.LogicalName) { customActionTable.DataverseExecutes.push(customAction); }
                    });
                });

                DRB.Metadata.DataverseCustomActionsLoaded = true;
                $("#" + DRB.DOM.ConfigureContent.Id).empty();
                DRB.Logic.DataverseExecute.Start(sourceRequestType);
                DRB.UI.HideLoading();
            })
            .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveCustomActions Error", DRB.Common.GetErrorMessage(xhr)); });
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Dataverse Execute - Download Dataverse Metadata
 * @param {string} sourceRequestType Source Request Type
 */
DRB.Logic.DataverseExecute.DownloadDataverseMetadata = function (sourceRequestType) {
    // DRB.Metadata arrays
    DRB.Metadata.DataverseActionTables = [];
    DRB.Metadata.DataverseFunctionTables = [];
    DRB.Metadata.DataverseActionFunctionComplexTypes = [];
    DRB.Metadata.DataverseActionFunctionEnumTypes = [];

    DRB.UI.ShowLoading("Retrieving Metadata...<br /><b>This is a long-running operation</b>");
    setTimeout(function () {
        DRB.Common.RetrieveMetadata()
            .done(function (data) {
                // Metadata format is XML, parse Complex Types, Enum Types, Actions, Functions

                // #region Complex Types
                var dvComplexTypes = [];
                var xmlComplexTypes = $(data).find("ComplexType").toArray();
                xmlComplexTypes.forEach(function (xmlComplexType) {
                    var name = "mscrm." + $(xmlComplexType).attr("Name");
                    var properties = [];
                    var xmlProperties = $(xmlComplexType).find("Property").toArray();
                    xmlProperties.forEach(function (xmlProperty, xmlPropertyIndex) {
                        var propertyName = $(xmlProperty).attr("Name");
                        var propertyType = $(xmlProperty).attr("Type");
                        properties.push(new DRB.Models.DataverseProperty(propertyName, propertyType, xmlPropertyIndex, null));
                    });

                    var xmlNavigationProperties = $(xmlComplexType).find("NavigationProperty").toArray();
                    xmlNavigationProperties.forEach(function (xmlProperty, xmlPropertyIndex) {
                        var propertyName = $(xmlProperty).attr("Name");
                        var propertyType = $(xmlProperty).attr("Type");
                        properties.push(new DRB.Models.DataverseProperty(propertyName, propertyType, xmlPropertyIndex, null));
                    });

                    dvComplexTypes.push(new DRB.Models.DataverseComplexType(name, properties));
                });
                DRB.Metadata.DataverseActionFunctionComplexTypes = dvComplexTypes;
                // #endregion

                // #region Enum Types
                var dvEnumTypes = [];
                var xmlEnumTypes = $(data).find("EnumType").toArray();
                xmlEnumTypes.forEach(function (xmlEnumType) {
                    var name = "mscrm." + $(xmlEnumType).attr("Name");
                    var isFlags = $(xmlEnumType).attr("IsFlags");
                    if (!DRB.Utilities.HasValue(isFlags)) { isFlags = false; } else { isFlags = true; }
                    var members = [];
                    var xmlMembers = $(xmlEnumType).find("Member").toArray();
                    xmlMembers.forEach(function (xmlMember) {
                        var memberName = $(xmlMember).attr("Name");
                        var memberValue = $(xmlMember).attr("Value");
                        members.push(new DRB.Models.DataverseMember(memberName, memberValue));
                    });

                    dvEnumTypes.push(new DRB.Models.DataverseEnumType(name, isFlags, members));
                });
                DRB.Metadata.DataverseActionFunctionEnumTypes = dvEnumTypes;
                // #endregion

                // #region Actions
                var xmlActions = $(data).find("Action").toArray();
                var dvActions = [];
                xmlActions.forEach(function (xmlAction) {
                    // extract ReturnType
                    var xmlReturnTypes = $(xmlAction).find("ReturnType").toArray();
                    // can have an empty ReturnType
                    var hasReturnType = false;
                    var returnType = "";
                    if (xmlReturnTypes.length === 1) {
                        hasReturnType = true;
                        returnType = $(xmlReturnTypes[0]).attr("Type");
                    }
                    // extract Actions details
                    var name = $(xmlAction).attr("Name");
                    var isBound = false;
                    if (DRB.Utilities.HasValue($(xmlAction).attr("IsBound"))) { isBound = true; }
                    var logicalName = "none";
                    var isCollectionBound = false;

                    // extract parameters
                    var parameters = [];
                    var xmlParameters = $(xmlAction).find("Parameter").toArray();
                    xmlParameters.forEach(function (xmlParameter, xmlParameterIndex) {
                        var parameterName = $(xmlParameter).attr("Name");
                        var parameterType = $(xmlParameter).attr("Type");
                        var parameterOptional = true;
                        if (DRB.Utilities.HasValue($(xmlParameter).attr("Nullable"))) { parameterOptional = false; }

                        if (parameterName === "entity") {
                            logicalName = parameterType.replace("mscrm.", "");
                        }
                        if (parameterName === "entityset") {
                            logicalName = parameterType.replace("Collection(mscrm.", "").replace(")", "");
                            isCollectionBound = true;
                        }
                        parameters.push(new DRB.Models.DataverseParameter(parameterName, parameterType, parameterOptional, xmlParameterIndex, null));
                    });

                    dvActions.push(new DRB.Models.DataverseExecute("Action", name, name, isBound, logicalName, isCollectionBound, false, hasReturnType, returnType, parameters));
                });
                dvActions.sort(DRB.Utilities.CustomSort("Name"));
                var actionTableLogicalNames = [];
                dvActions.forEach(function (dvAction) { actionTableLogicalNames.push(dvAction.LogicalName); });
                actionTableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(actionTableLogicalNames); // remove duplicates

                actionTableLogicalNames.forEach(function (tableLogicalName) {
                    var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                    if (DRB.Utilities.HasValue(table)) {
                        DRB.Metadata.DataverseActionTables.push(new DRB.Models.DataverseTable(table.LogicalName, table.Name, table.SchemaName, table.EntitySetName, table.PrimaryIdAttribute, table.PrimaryNameAttribute, table.ObjectTypeCode));
                    }
                });
                DRB.Metadata.DataverseActionTables.sort(DRB.Utilities.CustomSort("Name"));
                DRB.Metadata.DataverseActionTables.unshift(new DRB.Models.DataverseTable("none", "(Unbound)", "None", "nones", "noneid", "name", 0));

                DRB.Metadata.DataverseActionTables.forEach(function (dvActionTable) {
                    dvActions.forEach(function (dvAction) {
                        if (dvAction.LogicalName === dvActionTable.LogicalName) { dvActionTable.DataverseExecutes.push(dvAction); }
                    });
                });
                // #endregion

                // #region Functions
                var xmlFunctions = $(data).find("Function").toArray();
                var dvFunctions = [];
                xmlFunctions.forEach(function (xmlFunction) {
                    // extract ReturnType
                    var xmlReturnTypes = $(xmlFunction).find("ReturnType").toArray();
                    // must have a single ReturnType
                    if (xmlReturnTypes.length === 1) {
                        // check if Type from ReturnType is not a Boolean
                        var returnType = $(xmlReturnTypes[0]).attr("Type");
                        if (returnType !== "Edm.Boolean") {
                            // extract Function details
                            var name = $(xmlFunction).attr("Name");
                            var isBound = false;
                            if (DRB.Utilities.HasValue($(xmlFunction).attr("IsBound"))) { isBound = true; }
                            var logicalName = "none";
                            var isCollectionBound = false;

                            // extract parameters
                            var parameters = [];
                            var xmlParameters = $(xmlFunction).find("Parameter").toArray();
                            xmlParameters.forEach(function (xmlParameter, xmlParameterIndex) {
                                var parameterName = $(xmlParameter).attr("Name");
                                var parameterType = $(xmlParameter).attr("Type");
                                var parameterOptional = true;
                                if (DRB.Utilities.HasValue($(xmlParameter).attr("Nullable"))) { parameterOptional = false; }

                                if (parameterName === "entity") {
                                    logicalName = parameterType.replace("mscrm.", "");
                                }
                                if (parameterName === "entityset") {
                                    logicalName = parameterType.replace("Collection(mscrm.", "").replace(")", "");
                                    isCollectionBound = true;
                                }
                                parameters.push(new DRB.Models.DataverseParameter(parameterName, parameterType, parameterOptional, xmlParameterIndex, null));
                            });

                            dvFunctions.push(new DRB.Models.DataverseExecute("Function", name, name, isBound, logicalName, isCollectionBound, true, true, returnType, parameters));
                        }
                    }
                });
                dvFunctions.sort(DRB.Utilities.CustomSort("Name"));
                var functionTableLogicalNames = [];
                dvFunctions.forEach(function (dataverseFunction) { functionTableLogicalNames.push(dataverseFunction.LogicalName); });
                functionTableLogicalNames = DRB.Utilities.RemoveDuplicatesFromArray(functionTableLogicalNames); // remove duplicates

                functionTableLogicalNames.forEach(function (tableLogicalName) {
                    var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                    if (DRB.Utilities.HasValue(table)) {
                        DRB.Metadata.DataverseFunctionTables.push(new DRB.Models.DataverseTable(table.LogicalName, table.Name, table.SchemaName, table.EntitySetName, table.PrimaryIdAttribute, table.PrimaryNameAttribute, table.ObjectTypeCode));
                    }
                });
                DRB.Metadata.DataverseFunctionTables.sort(DRB.Utilities.CustomSort("Name"));
                DRB.Metadata.DataverseFunctionTables.unshift(new DRB.Models.DataverseTable("none", "(Unbound)", "None", "nones", "noneid", "name", 0));

                DRB.Metadata.DataverseFunctionTables.forEach(function (dvFunctionTable) {
                    dvFunctions.forEach(function (dvFunction) {
                        if (dvFunction.LogicalName === dvFunctionTable.LogicalName) { dvFunctionTable.DataverseExecutes.push(dvFunction); }
                    });
                });
                // #endregion

                DRB.Metadata.DataverseMetadataLoaded = true;

                $("#" + DRB.DOM.ConfigureContent.Id).empty();
                DRB.Logic.DataverseExecute.Start(sourceRequestType);
                DRB.UI.HideLoading();
            })
            .fail(function (xhr) {
                var metadataLink = DRB.Xrm.GetMetadataUrl();
                var errorMessage = "Metadata Download failed.<br />Please try to refresh the Metadata from this link and try again:<br/>";
                errorMessage += '<a target="_blank" href="' + metadataLink + '">' + metadataLink + '</a>';
                DRB.UI.ShowError("DRB.Common.RetrieveMetadata Error", errorMessage);
            });
    }, DRB.Settings.TimeoutDelay);
}

/**
 * Dataverse Execute - Bind Dataverse Table
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindDataverseTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();

        // clear DOM
        $("#" + DRB.DOM.DataverseParameters.Div.Id).hide();
        $("#" + DRB.DOM.DataverseParameters.Div.Id).empty();

        var table = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseTables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            DRB.Metadata.CurrentDataverseExecutes = table.DataverseExecutes;
            if (table.DataverseExecutes.length === 0) {
                DRB.UI.ResetDropdown(DRB.DOM.DataverseExecute.Dropdown.Id, DRB.DOM.DataverseExecute.Dropdown.Name);
            } else {
                DRB.UI.FillDropdown(DRB.DOM.DataverseExecute.Dropdown.Id, DRB.DOM.DataverseExecute.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.CurrentDataverseExecutes).ToDropdown());
                var dvExecute = DRB.Metadata.CurrentNode.data.configuration.dataverseExecute;
                $("#" + DRB.DOM.DataverseExecute.Dropdown.Id).val(dvExecute).change();
            }

            // Fill primaryEntity
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
        }
    });
}

/**
 * Dataverse Execute - Bind Parameter Include
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindParameterInclude = function (id) {
    $("#" + id).on("change", function (e) {
        // extract the index from the control name
        var elementIndex = DRB.Common.ExtractIndexFromControlName($(this).attr('id'));
        if (elementIndex === -1) { return; } // if index not found do nothing

        // get checkbox status (checked = true, not checked = false)
        var includeValue = $(this).is(':checked');
        // set inside data.configuration
        DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[elementIndex].include = includeValue;
        // show or hide the value based on the checkbox status
        var divValue = DRB.DOM.DataverseParameters.DivValue.Id + elementIndex;
        if (includeValue === true) { $("#" + divValue).show(); } else { $("#" + divValue).hide(); }
    });
}

/**
 * Dataverse Execute - Bind Parameter Value
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindParameterValue = function (id) {
    $("#" + id).on("change", function (e) {
        // get control value
        var controlValue = $(this).val();
        // extract the index from the control name
        var controlName = $(this).attr('id');
        var elementIndex = DRB.Common.ExtractIndexFromControlName(controlName);
        if (elementIndex === -1) { return; } // if index not found do nothing

        var parameterValue = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[elementIndex].value));
        // Enum Type
        if (controlName.indexOf("cbx3_") === 0) {
            if (!DRB.Utilities.HasValue(parameterValue)) { parameterValue = {}; }
            var memberType = DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[elementIndex].type;
            var checkEnumType = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseEnumTypes, memberType);
            if (DRB.Utilities.HasValue(checkEnumType)) {
                if (checkEnumType.IsFlags === false) {
                    var checkMember = DRB.Utilities.GetRecordById(checkEnumType.Members, controlValue);
                    if (DRB.Utilities.HasValue(checkMember)) {
                        parameterValue.memberName = checkMember.Name;
                        parameterValue.memberValue = controlValue;
                    }
                } else {
                    if (Array.isArray(controlValue)) {
                        parameterValue.members = [];
                        controlValue.forEach(function (cValue) {
                            var checkMember = DRB.Utilities.GetRecordById(checkEnumType.Members, cValue);
                            if (DRB.Utilities.HasValue(checkMember)) {
                                parameterValue.members.push({ name: checkMember.Name, value: cValue });
                            }
                        });
                    }
                }
            }
        }
        // Edm.Boolean
        if (controlName.indexOf("cbx1_") === 0) { parameterValue = false; if (controlValue === "yes") { parameterValue = true; } }
        // Edm.DateTimeOffset
        if (controlName.indexOf("txtd_") === 0) { parameterValue = controlValue; }
        // Edm.Guid, Edm.String, Edm.Int32, Edm.Int64, Edm.Decimal, Edm.Double
        if (controlName.indexOf("txt_") === 0) { parameterValue = controlValue; }

        if (controlName.indexOf("txt2_") === 0) {
            if (!DRB.Utilities.HasValue(parameterValue)) { parameterValue = {}; }
            parameterValue.id = controlValue;
        }

        if (controlName.indexOf("cbx2_") === 0) {
            if (!DRB.Utilities.HasValue(parameterValue)) { parameterValue = {}; }
            parameterValue.entityType = controlValue;
            var primaryIdAttribute = "";
            var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, controlValue);
            if (DRB.Utilities.HasValue(checkTable)) { primaryIdAttribute = checkTable.PrimaryIdAttribute; }
            parameterValue.primaryIdField = primaryIdAttribute;

            // additional check for BaseEntity
            if (DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[elementIndex].type === "mscrm.crmbaseentity") {
                if (DRB.Utilities.HasValue(controlValue)) {
                    var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + elementIndex;
                    var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + elementIndex;
                    var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + elementIndex;

                    $("#" + currentIdLookup).remove();
                    $("#" + DRB.DOM.DataverseParameters.DivValue.Id + elementIndex).append(DRB.UI.CreateLookup(currentIdLookup, DRB.UI.OpenLookup,
                        {
                            openBaseEntity: true,
                            defaultEntityType: controlValue,
                            textId: currentIdText,
                            dropdownId: currentIdDropdown
                        }));
                }
            }
        }

        // set the new value
        DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[elementIndex].value = parameterValue;
    });
}

/**
 * Dataverse Execute - Bind Parameter Collection Value
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindParameterCollectionValue = function (id) {
    $("#" + id).on("change", function (e) {
        var controlValue = $(this).val();// get control value
        var controlName = $(this).attr('id'); // get control name
        var index = DRB.Common.ExtractIndexFromControlName(controlName); // get index
        if (index === -1) { return; } // if index not found do nothing
        var collectionIndex = DRB.Common.ExtractPreviousIndexFromControlName(controlName); // get collection index
        if (collectionIndex === -1) { return; } // if collection index not found do nothing

        // get current value
        var currentValue = DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value;

        // Guid, String, Int32, Int64, Decimal, Double
        if (controlName.indexOf("txt_") === 0) { currentValue[collectionIndex] = controlValue; }
        // Boolan
        if (controlName.indexOf("cbx1_") === 0) {
            if (controlValue === "yes") { currentValue[collectionIndex] = true; }
            else { currentValue[collectionIndex] = false; }
        }
        // mscrm.baseentity (id)
        if (controlName.indexOf("txt2_") === 0) { currentValue[collectionIndex].id = controlValue; }
        // mscrm.baseentity (entityType, primaryIdField)
        if (controlName.indexOf("cbx2_") === 0) {
            currentValue[collectionIndex].entityType = controlValue;
            //
            var primaryIdAttribute = "";
            var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, controlValue);
            if (DRB.Utilities.HasValue(checkTable)) { primaryIdAttribute = checkTable.PrimaryIdAttribute; }
            currentValue[collectionIndex].primaryIdField = primaryIdAttribute;

            // additional check for BaseEntity
            if (DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].type === "Collection(mscrm.crmbaseentity)") {
                if (DRB.Utilities.HasValue(controlValue)) {
                    var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                    var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                    var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;

                    $("#" + currentIdLookup).remove();
                    $("#" + DRB.DOM.DataverseParameters.DivCollectionControlValue.Id + collectionIndex + "_" + index).append(DRB.UI.CreateLookup(currentIdLookup, DRB.UI.OpenLookup,
                        {
                            openBaseEntity: true,
                            defaultEntityType: controlValue,
                            textId: currentIdText,
                            dropdownId: currentIdDropdown
                        }));
                }
            }
            //
        }
    });
}

/**
 * Dataverse Execute - Refresh Collection Arrows
 */
DRB.Logic.DataverseExecute.RefreshCollectionArrows = function () {
    DRB.Metadata.CurrentNode.data.configuration.dataverseParameters.forEach(function (parameter, parameterIndex) {
        if (!Array.isArray(parameter.value)) { return; }// refresh the arrows only if the value is an array
        if (parameter.value.length === 0) { return; } // if no items do nothing

        // set the arrow for the first and the last collection
        var firstIndex = 0 + "_" + parameterIndex;
        var lastIndex = (parameter.value.length - 1) + "_" + parameterIndex;

        $("#" + DRB.DOM.ArrowUp.Id + lastIndex).show();
        $("#" + DRB.DOM.ArrowDown.Id + firstIndex).show();
        $("#" + DRB.DOM.ArrowUp.Id + firstIndex).hide();
        $("#" + DRB.DOM.ArrowDown.Id + lastIndex).hide();

        $("#" + DRB.DOM.ArrowBeforeUp.Id + firstIndex).show();
        $("#" + DRB.DOM.ArrowAfterDown.Id + firstIndex).hide();
        $("#" + DRB.DOM.ArrowBeforeUp.Id + lastIndex).hide();
        $("#" + DRB.DOM.ArrowAfterDown.Id + lastIndex).show();

        // set the arrows for the items in the middle
        for (var i = 1; i < parameter.value.length - 1; i++) {
            var uniqueIndex = i + "_" + parameterIndex;
            $("#" + DRB.DOM.ArrowUp.Id + uniqueIndex).show();
            $("#" + DRB.DOM.ArrowDown.Id + uniqueIndex).show();
            $("#" + DRB.DOM.ArrowBeforeUp.Id + uniqueIndex).hide();
            $("#" + DRB.DOM.ArrowAfterDown.Id + uniqueIndex).hide();
        }
    });
}

/**
 * Dataverse Execute - Move Collection Item
 * @param {string} direction Direction
 * @param {number} index Index
 * @param {number} collectionIndex Collection Index
 * @param {string} parameterType Parameter Type
 */
DRB.Logic.DataverseExecute.MoveCollectionItem = function (direction, index, collectionIndex, parameterType) {
    // if value is empty do nothing
    var currentParameter = DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index];
    if (currentParameter.value.length === 0) { return; }

    // direction, default is "up"
    var diff = -1;
    if (direction === "down") { diff = 1; }


    if (parameterType.indexOf("Collection(mscrm.") === 0 && parameterType !== "Collection(mscrm.crmbaseentity)") {
        parameterType = "Collection(mscrm.crmbaseentity)";
    }

    switch (parameterType) {
        case "Collection(Edm.Guid)":
        case "Collection(Edm.String)":
        case "Collection(Edm.Int32)":
        case "Collection(Edm.Int64)":
        case "Collection(Edm.Decimal)":
        case "Collection(Edm.Double)":
            var currentItem = currentParameter.value[collectionIndex];
            var swapItem = currentParameter.value[collectionIndex + diff];
            $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index).val(swapItem).change().trigger("input");
            $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + (collectionIndex + diff) + "_" + index).val(currentItem).change().trigger("input");
            break
        case "Collection(Edm.Boolean)":
            var currentItem = currentParameter.value[collectionIndex];
            var swapItem = currentParameter.value[collectionIndex + diff];
            var newCurrentValue = "no";
            if (currentItem === true) { newCurrentValue = "yes"; }
            var newSwapValue = "no";
            if (swapItem === true) { newSwapValue = "yes"; }
            $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index).val(newSwapValue).change();
            $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + (collectionIndex + diff) + "_" + index).val(newCurrentValue).change();
            break;
        case "Collection(mscrm.crmbaseentity)":
            var currentId = currentParameter.value[collectionIndex].id;
            var currentEntityType = currentParameter.value[collectionIndex].entityType;
            var swapId = currentParameter.value[collectionIndex + diff].id;
            var swapEntityType = currentParameter.value[collectionIndex + diff].entityType;

            $("#" + "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index).val(swapId).change().trigger("input");
            $("#" + "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + (collectionIndex + diff) + "_" + index).val(currentId).change().trigger("input");

            $("#" + "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index).val(swapEntityType).change();
            $("#" + "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + (collectionIndex + diff) + "_" + index).val(currentEntityType).change();
            break;
    }
}

/**
 * Dataverse Execute - Remove Collection Value
 * @param {number} index Index
 * @param {number} collectionIndex Collection Index
 * @param {string} parameterType Parameter Type
 */
DRB.Logic.DataverseExecute.RemoveCollectionValue = function (index, collectionIndex, parameterType) {
    var lastCollectionIndex = DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.length - 1;

    if (parameterType.indexOf("Collection(mscrm.") === 0 && parameterType !== "Collection(mscrm.crmbaseentity)") {
        parameterType = "Collection(mscrm.crmbaseentity)";
    }

    for (var i = collectionIndex; i < lastCollectionIndex; i++) {
        switch (parameterType) {
            case "Collection(mscrm.crmbaseentity)":
                var nextValueId = $("#" + "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + (i + 1) + "_" + index).val();
                $("#" + "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + i + "_" + index).val(nextValueId).change();
                var nextValueEntityType = $("#" + "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + (i + 1) + "_" + index).val();
                $("#" + "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + i + "_" + index).val(nextValueEntityType).change();
                break;

            case "Collection(Edm.Boolean)":
                var nextValue = $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + (i + 1) + "_" + index).val();
                $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + i + "_" + index).val(nextValue).change();
                break;

            case "Collection(Edm.Guid)":
            case "Collection(Edm.String)":
            case "Collection(Edm.Int32)":
            case "Collection(Edm.Int64)":
            case "Collection(Edm.Decimal)":
            case "Collection(Edm.Double)":
                var nextValue = $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + (i + 1) + "_" + index).val();
                $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + i + "_" + index).val(nextValue).change();
                break;
        }
    }

    var lastCollectionControlDiv = DRB.DOM.DataverseParameters.DivCollectionControlValue.Id + lastCollectionIndex + "_" + index;
    $("#" + lastCollectionControlDiv).remove();
    DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.pop();
    DRB.Logic.DataverseExecute.RefreshCollectionArrows();
}

/**
 * Dataverse Execute - Add Collection Value
 * @param {number} index Index
 * @param {string} parameterType Parameter Type
 */
DRB.Logic.DataverseExecute.AddCollectionValue = function (index, parameterType) {
    var collectionIndex = DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.length;

    var checkOtherParameterTypes = true;
    if (parameterType.indexOf("Collection(mscrm.") === 0 && parameterType !== "Collection(mscrm.crmbaseentity)") {
        checkOtherParameterTypes = false;
        DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.push({ id: "", entityType: "", primaryIdField: "" });
    }

    if (checkOtherParameterTypes === true) {
        switch (parameterType) {
            case "Collection(Edm.Guid)":
            case "Collection(Edm.String)":
            case "Collection(Edm.Boolean)":
            case "Collection(Edm.Int32)":
            case "Collection(Edm.Int64)":
            case "Collection(Edm.Decimal)":
            case "Collection(Edm.Double)":
                DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.push("");
                break;
            case "Collection(mscrm.crmbaseentity)":
                DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value.push({ id: "", entityType: "", primaryIdField: "" });
                break;
        }
    }

    var currentCollectionControlDiv = DRB.DOM.DataverseParameters.DivCollectionControlValue.Id + collectionIndex + "_" + index;
    $("#" + DRB.DOM.DataverseParameters.DivCollectionValue.Id + index).append(DRB.UI.CreateEmptyDiv(currentCollectionControlDiv, DRB.DOM.DataverseParameters.DivCollectionControlValue.Class));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateRemoveButton(DRB.Logic.DataverseExecute.RemoveCollectionValue, index, collectionIndex, parameterType));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateEmptyArrowButton(DRB.DOM.ArrowBeforeUp.Id + collectionIndex + "_" + index));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateUpButton(DRB.DOM.ArrowUp.Id + collectionIndex + "_" + index, DRB.Logic.DataverseExecute.MoveCollectionItem, "up", index, collectionIndex, parameterType));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateDownButton(DRB.DOM.ArrowDown.Id + collectionIndex + "_" + index, DRB.Logic.DataverseExecute.MoveCollectionItem, "down", index, collectionIndex, parameterType));
    $("#" + currentCollectionControlDiv).append(DRB.UI.CreateEmptyArrowButton(DRB.DOM.ArrowAfterDown.Id + collectionIndex + "_" + index));

    if (checkOtherParameterTypes === false) {
        var tableLogicalName = parameterType.substring(17, parameterType.length - 1);
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);

        var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
        var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
        var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
        $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputGuid(currentIdText));
        DRB.Common.BindGuid(currentIdText);
        DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentIdText);
        $("#" + currentCollectionControlDiv).append(DRB.UI.CreateSimpleDropdown(currentIdDropdown));
        DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentIdDropdown);

        var targets = [new DRB.Models.Table(tableLogicalName, checkTable.Name)];
        DRB.UI.FillDropdown(currentIdDropdown, "", new DRB.Models.Records(targets).ToDropdown());
        $("#" + currentCollectionControlDiv).append(DRB.UI.CreateLookup(currentIdLookup, DRB.UI.OpenLookup,
            {
                openCustom: true,
                defaultEntityType: tableLogicalName,
                entityTypes: [tableLogicalName],
                textId: currentIdText,
                dropdownId: currentIdDropdown
            }));
        $("#" + currentIdDropdown).val(targets[0].Id).change();
    }

    if (checkOtherParameterTypes === true) {
        switch (parameterType) {
            case "Collection(Edm.Guid)":
                var currentCollectionId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputGuid(currentCollectionId));
                DRB.Common.BindGuid(currentCollectionId);
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(Edm.String)":
                var currentCollectionId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputString(currentCollectionId));
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(Edm.Boolean)":
                var currentCollectionId = "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateDropdown(currentCollectionId));
                DRB.UI.FillDropdown(currentCollectionId, "Select Value", new DRB.Models.Records(DRB.Settings.OptionsTrueFalse).ToDropdown());
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(Edm.Int32)":
            case "Collection(Edm.Int64)":
                var currentCollectionId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputNumber(currentCollectionId));
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(Edm.Decimal)":
            case "Collection(Edm.Double)":
                var currentCollectionId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputNumber(currentCollectionId, parameterType.substring(15)));
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentCollectionId);
                break;
            case "Collection(mscrm.crmbaseentity)":
                var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + collectionIndex + "_" + index;
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateInputGuid(currentIdText));
                DRB.Common.BindGuid(currentIdText);
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentIdText);
                $("#" + currentCollectionControlDiv).append(DRB.UI.CreateDropdown(currentIdDropdown));
                DRB.UI.FillDropdown(currentIdDropdown, "Select Table", new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
                DRB.Logic.DataverseExecute.BindParameterCollectionValue(currentIdDropdown);
                break;
        }
    }

    DRB.Logic.DataverseExecute.RefreshCollectionArrows();
}

/**
 * Dataverse Execute - After Function Loaded
 * @param {DRB.Models.DataverseExecute} dvExecute Dataverse Execute
 */
DRB.Logic.DataverseExecute.AfterExecuteLoaded = function (dvExecute) {
    // #region Operation Type
    var operationType = 0;
    if (dvExecute.Type === "Function") { operationType = 1; }
    if (dvExecute.Type === "CustomAPI" && dvExecute.IsFunction === true) { operationType = 1; }
    DRB.Metadata.CurrentNode.data.configuration.dataverseOperationType = operationType;
    // #endregion

    // #region Parameters
    $("#" + DRB.DOM.DataverseParameters.Div.Id).empty();

    var parameters = JSON.parse(JSON.stringify(DRB.Metadata.CurrentNode.data.configuration.dataverseParameters));
    DRB.Metadata.CurrentNode.data.configuration.dataverseParameters = [];
    if (dvExecute.Parameters.length > 0) {
        // create the table structure for the parameters
        $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateTable(DRB.DOM.DataverseParameters.Table.Id));
        $("#" + DRB.DOM.DataverseParameters.Table.Id).append(DRB.UI.CreateTr(DRB.DOM.DataverseParameters.Tr.Id));

        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdOptional.Id));
        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdInclude.Id));
        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdName.Id));
        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdType.Id));
        $("#" + DRB.DOM.DataverseParameters.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdValue.Id));

        $("#" + DRB.DOM.DataverseParameters.TdOptional.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdOptional.Id, DRB.DOM.DataverseParameters.TdOptional.Name));
        $("#" + DRB.DOM.DataverseParameters.TdInclude.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdInclude.Id, DRB.DOM.DataverseParameters.TdInclude.Name));
        $("#" + DRB.DOM.DataverseParameters.TdName.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdName.Id, DRB.DOM.DataverseParameters.TdName.Name));
        $("#" + DRB.DOM.DataverseParameters.TdType.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdType.Id, DRB.DOM.DataverseParameters.TdType.Name));
        $("#" + DRB.DOM.DataverseParameters.TdValue.Id).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdValue.Id, DRB.DOM.DataverseParameters.TdValue.Name));

        // if the stored parameters are the same number of the Execute Parameters and their names are also the same
        // then try to parse the include and the value
        var matchParameters = true;
        if (parameters.length === dvExecute.Parameters.length) {
            for (var j = 0; j < parameters.length; j++) {
                if (parameters[j].name !== dvExecute.Parameters[j].Name) {
                    matchParameters = false;
                    break;
                }
            }
        } else { matchParameters = false; }

        // parse the parameters
        for (var index = 0; index < dvExecute.Parameters.length; index++) {
            var parameter = dvExecute.Parameters[index];
            $("#" + DRB.DOM.DataverseParameters.Table.Id).append(DRB.UI.CreateTr(DRB.DOM.DataverseParameters.Tr.Id + index));

            if (index % 2 !== 0) { $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).prop("style", "background: #f0f7ff;"); }

            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdOptional.Id + index));
            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdInclude.Id + index));
            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdName.Id + index));
            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdType.Id + index));
            $("#" + DRB.DOM.DataverseParameters.Tr.Id + index).append(DRB.UI.CreateTd(DRB.DOM.DataverseParameters.TdValue.Id + index));

            var optionalText = "No";
            if (parameter.Optional === true) { optionalText = "Yes"; }

            $("#" + DRB.DOM.DataverseParameters.TdOptional.Id + index).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdOptional.Id + index, optionalText));

            var parameterInclude = !parameter.Optional;

            if (matchParameters === true) { parameterInclude = parameters[index].include; }

            $("#" + DRB.DOM.DataverseParameters.TdInclude.Id + index).append(DRB.UI.CreateCheckbox(DRB.DOM.DataverseParameters.CheckboxInclude.Id + index, "&nbsp;&nbsp;&nbsp;", "checkboxinclude", parameterInclude));
            DRB.Logic.DataverseExecute.BindParameterInclude(DRB.DOM.DataverseParameters.CheckboxInclude.Id + index);

            if (parameter.Optional !== true) { $("#" + DRB.DOM.DataverseParameters.CheckboxInclude.Id + index).prop("disabled", "true"); }

            $("#" + DRB.DOM.DataverseParameters.TdName.Id + index).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdName.Id + index, parameter.Name));
            $("#" + DRB.DOM.DataverseParameters.TdType.Id + index).append(DRB.UI.CreateSpan("span_" + DRB.DOM.DataverseParameters.TdType.Id + index, parameter.Type));

            var divValue = DRB.UI.CreateEmptyDiv(DRB.DOM.DataverseParameters.DivValue.Id + index);
            $("#" + DRB.DOM.DataverseParameters.TdValue.Id + index).append(divValue);


            // hide if is not included
            if (parameterInclude === false) { divValue.hide(); }

            var parameterValue = null;
            if (parameter.Type.indexOf("Collection(") === 0) { parameterValue = []; }
            if (matchParameters === true) { parameterValue = parameters[index].value; }

            DRB.Metadata.CurrentNode.data.configuration.dataverseParameters.push({ name: parameter.Name, type: parameter.Type, optional: parameter.Optional, include: parameterInclude, value: parameterValue });

            var typeFound = false;

            if (typeFound === false && parameter.Type.indexOf("Collection(") === 0) {
                typeFound = true;
                // Collection can be of anything, mscrm.crmbaseentity, table, complex type or Edm
                if (DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName !== "none" && index === 0 && parameter.Name === "entityset") {
                    // do nothing, first parameter of entityset bounded to an entity
                } else {
                    var collectionTypeFound = false;

                    if (parameter.Type.indexOf("Collection(mscrm.") === 0 && parameter.Type !== "Collection(mscrm.crmbaseentity)") {
                        // extract the name and check if is a table
                        var tableLogicalName = parameter.Type.substring(17, parameter.Type.length - 1);
                        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                        if (DRB.Utilities.HasValue(checkTable)) {
                            collectionTypeFound = true;

                            divValue.append(DRB.UI.CreateEmptyDiv(DRB.DOM.DataverseParameters.DivCollectionValue.Id + index));
                            divValue.append(DRB.UI.CreateSpacer());
                            divValue.append(DRB.UI.CreateButton(DRB.DOM.DataverseParameters.AddButton.Id, DRB.DOM.DataverseParameters.AddButton.Name, DRB.DOM.DataverseParameters.AddButton.Class, DRB.Logic.DataverseExecute.AddCollectionValue, index, parameter.Type));

                            if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) {
                                var newParameterValue = JSON.parse(JSON.stringify(parameterValue));
                                DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value = [];
                                newParameterValue.forEach(function (v, vIndex) {
                                    DRB.Logic.DataverseExecute.AddCollectionValue(index, parameter.Type);

                                    var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index;
                                    var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index;
                                    $("#" + currentIdText).val(v.id).change().trigger("input");
                                    $("#" + currentIdDropdown).val(v.entityType).change();

                                });
                            }
                        }
                    }


                    switch (parameter.Type) {
                        case "Collection(Edm.Boolean)":
                        case "Collection(Edm.Guid)":
                        case "Collection(Edm.String)":
                        case "Collection(Edm.Int32)":
                        case "Collection(Edm.Int64)":
                        case "Collection(Edm.Decimal)":
                        case "Collection(Edm.Double)":
                        case "Collection(mscrm.crmbaseentity)":
                            collectionTypeFound = true;
                            divValue.append(DRB.UI.CreateEmptyDiv(DRB.DOM.DataverseParameters.DivCollectionValue.Id + index));
                            divValue.append(DRB.UI.CreateSpacer());
                            divValue.append(DRB.UI.CreateButton(DRB.DOM.DataverseParameters.AddButton.Id, DRB.DOM.DataverseParameters.AddButton.Name, DRB.DOM.DataverseParameters.AddButton.Class, DRB.Logic.DataverseExecute.AddCollectionValue, index, parameter.Type));

                            if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) {
                                var newParameterValue = JSON.parse(JSON.stringify(parameterValue));
                                DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[index].value = [];
                                newParameterValue.forEach(function (v, vIndex) {
                                    DRB.Logic.DataverseExecute.AddCollectionValue(index, parameter.Type);

                                    switch (parameter.Type) {
                                        case "Collection(Edm.Boolean)":
                                            var dropdownValue = "no";
                                            if (v === true) { dropdownValue = "yes"; }
                                            $("#" + "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index).val(dropdownValue).change();
                                            break;
                                        case "Collection(mscrm.crmbaseentity)":
                                            var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index;
                                            var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index;

                                            $("#" + currentIdText).val(v.id).change().trigger("input");
                                            $("#" + currentIdDropdown).val(v.entityType).change();
                                            break;
                                        default:
                                            $("#" + "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + vIndex + "_" + index).val(v).change().trigger("input");
                                            break;
                                    }
                                });
                            }
                            break;
                    }

                    if (collectionTypeFound === false) {
                        divValue.append(DRB.UI.CreateSpan("", "&nbsp;&nbsp;&nbsp;Collection Type not supported"));
                        DRB.Metadata.CurrentNode.data.configuration.dataverseParameters[DRB.Metadata.CurrentNode.data.configuration.dataverseParameters.length - 1].value = null;
                    }
                }
            }

            if (typeFound === false && parameter.Type === "mscrm.crmbaseentity") {
                typeFound = true;
                var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                // entityreference with any entity in the system
                divValue.append(DRB.UI.CreateInputGuid(currentIdText));
                DRB.Common.BindGuid(currentIdText);
                DRB.Logic.DataverseExecute.BindParameterValue(currentIdText);
                if (matchParameters === true && DRB.Utilities.HasValue(parameterValue) && DRB.Utilities.HasValue(parameterValue.id)) { $("#" + currentIdText).val(parameterValue.id).change().trigger("input"); }

                divValue.append(DRB.UI.CreateDropdown(currentIdDropdown));
                DRB.UI.FillDropdown(currentIdDropdown, "Select Table", new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());

                // extract all table logical names
                var allEntityTypes = [];
                DRB.Metadata.Tables.forEach(function (table) { allEntityTypes.push(table.LogicalName); });

                DRB.Logic.DataverseExecute.BindParameterValue(currentIdDropdown);
                if (matchParameters === true && DRB.Utilities.HasValue(parameterValue) && DRB.Utilities.HasValue(parameterValue.entityType)) { $("#" + currentIdDropdown).val(parameterValue.entityType).change(); }
                else {
                    $("#" + currentIdDropdown).val("null").change();
                }
            }

            if (typeFound === false && parameter.Type.indexOf("mscrm.") === 0) {
                // mscrm. can be a table or a complex type
                var parameterType = parameter.Type;
                typeFound = true;

                var exactTypeFound = false;
                // extract the name and check if is a table
                var tableLogicalName = parameterType.substring(6);
                var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
                if (DRB.Utilities.HasValue(checkTable)) {
                    exactTypeFound = true;
                    // #region Create Lookup
                    var currentIdText = "txt2_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                    var currentIdDropdown = "cbx2_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                    var currentIdLookup = "lkp_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                    divValue.append(DRB.UI.CreateInputGuid(currentIdText));
                    DRB.Common.BindGuid(currentIdText);
                    DRB.Logic.DataverseExecute.BindParameterValue(currentIdText);

                    if (matchParameters === true && DRB.Utilities.HasValue(parameterValue) && DRB.Utilities.HasValue(parameterValue.id)) { $("#" + currentIdText).val(parameterValue.id).change().trigger("input"); }

                    divValue.append(DRB.UI.CreateSimpleDropdown(currentIdDropdown));

                    var targets = [new DRB.Models.Table(tableLogicalName, checkTable.Name)];
                    DRB.UI.FillDropdown(currentIdDropdown, "", new DRB.Models.Records(targets).ToDropdown());
                    divValue.append(DRB.UI.CreateLookup(currentIdLookup, DRB.UI.OpenLookup,
                        {
                            openCustom: true,
                            defaultEntityType: tableLogicalName,
                            entityTypes: [tableLogicalName],
                            textId: currentIdText,
                            dropdownId: currentIdDropdown
                        }));

                    DRB.Logic.DataverseExecute.BindParameterValue(currentIdDropdown);
                    if (matchParameters === true && DRB.Utilities.HasValue(parameterValue) && DRB.Utilities.HasValue(parameterValue.entityType)) { $("#" + currentIdDropdown).val(parameterValue.entityType).change(); }
                    else {
                        $("#" + currentIdDropdown).val(targets[0].Id).change();
                    }
                    // #endregion
                } else {
                    // if is not a table check if it is a Complex Type
                    var checkComplexType = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseComplexTypes, parameterType);
                    if (DRB.Utilities.HasValue(checkComplexType)) {
                        exactTypeFound = true;
                        divValue.append(DRB.UI.CreateSpan("", "&nbsp;&nbsp;&nbsp;" + parameterType + " (Complex Type) not supported"));
                    } else {
                        // Check if is an Enum Type
                        var checkEnumType = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseEnumTypes, parameterType);
                        if (DRB.Utilities.HasValue(checkEnumType)) {
                            exactTypeFound = true;

                            var currentId = "cbx3_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                            divValue.append(DRB.UI.CreateDropdown(currentId, checkEnumType.IsFlags));
                            DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(checkEnumType.Members).ToDropdown());
                            DRB.Logic.DataverseExecute.BindParameterValue(currentId);

                            if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) {
                                var foundMemberValue = null;
                                if (DRB.Utilities.HasValue(parameterValue.memberValue)) { foundMemberValue = parameterValue.memberValue; }
                                if (DRB.Utilities.HasValue(parameterValue.members)) {
                                    foundMemberValue = [];
                                    if (Array.isArray(parameterValue.members)) {
                                        parameterValue.members.forEach(function (member) { foundMemberValue.push(member.value); });
                                    }
                                }
                                $("#" + currentId).val(foundMemberValue).change();
                            }
                        }
                    }
                }

                // not able to recognize this type
                if (exactTypeFound === false) {
                    divValue.append(DRB.UI.CreateSpan("", "&nbsp;&nbsp;&nbsp;" + parameterType + " (unknown) not supported"));
                }
            }

            // #region Edm Types
            if (typeFound === false && parameter.Type.indexOf("Edm.") === 0) {
                typeFound = true;
                var parameterType = parameter.Type;
                switch (parameterType) {
                    case "Edm.Binary":
                        divValue.append(DRB.UI.CreateSpan("", "&nbsp;&nbsp;&nbsp;Edm.Binary not supported"));
                        break;

                    case "Edm.Boolean":
                        var currentId = "cbx1_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateDropdown(currentId));
                        DRB.UI.FillDropdown(currentId, "Select Value", new DRB.Models.Records(DRB.Settings.OptionsTrueFalse).ToDropdown());
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);

                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) {
                            var booleanDropdownValue = "no";
                            if (parameterValue === true) { booleanDropdownValue = "yes"; }
                            $("#" + currentId).val(booleanDropdownValue).change();
                        }
                        break;

                    case "Edm.Guid":
                        var currentId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputGuid(currentId));
                        DRB.Common.BindGuid(currentId);
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change().trigger("input"); }
                        break;

                    case "Edm.String":
                        var currentId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputString(currentId));
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change().trigger("input"); }
                        break;

                    case "Edm.Int32":
                    case "Edm.Int64":
                        var currentId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputNumber(currentId));
                        DRB.Common.BindInteger(currentId);
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change().trigger("input"); }
                        break;

                    case "Edm.Decimal":
                    case "Edm.Double":
                        var currentId = "txt_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputNumber(currentId, parameterType.substring(4)));
                        DRB.Common.BindNumber(currentId);
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change().trigger("input"); }
                        break;

                    case "Edm.DateTimeOffset":
                        var pickerFormat = "YYYY-MM-DD HH:mm";
                        var currentId = "txtd_" + DRB.DOM.DataverseParameters.ControlValue.Id + index;
                        divValue.append(DRB.UI.CreateInputDateTime(currentId));
                        DRB.Logic.DataverseExecute.BindParameterValue(currentId);
                        if (matchParameters === true && DRB.Utilities.HasValue(parameterValue)) { $("#" + currentId).val(parameterValue).change(); }
                        $("#" + currentId).datetimepicker({ format: pickerFormat, ignoreReadonly: true, showClear: true, showTodayButton: true }).on('dp.change', function (e) { $(e.target).change(); });
                        break;
                }
            }
            // #endregion
        }
    } else {
        $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.DataverseParameters.SpanName.Id, "<b>No Parameters</b>"));
    }
    // #endregion

    $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpacer());
    $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateHr());
    $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpacer());

    // #region Return Type
    if (dvExecute.HasReturnType === true) {
        DRB.Metadata.CurrentNode.data.configuration.dataverseReturnType = { type: dvExecute.ReturnType, outputParameters: [] };
        var retunTypeText = "<b>Return Type:</b> " + dvExecute.ReturnType;
        $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.DataverseReturnType.Span.Id, retunTypeText));
        if (dvExecute.ReturnType.indexOf("mscrm.") === 0) {
            // check if is a complex type
            var complexType = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseComplexTypes, dvExecute.ReturnType);
            if (DRB.Utilities.HasValue(complexType)) {
                $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateTable(DRB.DOM.DataverseReturnType.Table.Id));
                $("#" + DRB.DOM.DataverseReturnType.Table.Id).append(DRB.UI.CreateTr(DRB.DOM.DataverseReturnType.Tr.Id));
                $("#" + DRB.DOM.DataverseReturnType.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseReturnType.TdName.Id));
                $("#" + DRB.DOM.DataverseReturnType.Tr.Id).append(DRB.UI.CreateTd(DRB.DOM.DataverseReturnType.TdType.Id));
                $("#" + DRB.DOM.DataverseReturnType.TdName.Id).html(DRB.DOM.DataverseReturnType.TdName.Name);
                $("#" + DRB.DOM.DataverseReturnType.TdType.Id).html(DRB.DOM.DataverseReturnType.TdType.Name);

                complexType.Properties.forEach(function (dvProperty, dvPropertyIndex) {
                    DRB.Metadata.CurrentNode.data.configuration.dataverseReturnType.outputParameters.push({ name: dvProperty.Name, type: dvProperty.Type });
                    $("#" + DRB.DOM.DataverseReturnType.Table.Id).append(DRB.UI.CreateTr(DRB.DOM.DataverseReturnType.Tr.Id + dvPropertyIndex));
                    $("#" + DRB.DOM.DataverseReturnType.Tr.Id + dvPropertyIndex).append(DRB.UI.CreateTd(DRB.DOM.DataverseReturnType.TdName.Id + dvPropertyIndex));
                    $("#" + DRB.DOM.DataverseReturnType.Tr.Id + dvPropertyIndex).append(DRB.UI.CreateTd(DRB.DOM.DataverseReturnType.TdType.Id + dvPropertyIndex));
                    $("#" + DRB.DOM.DataverseReturnType.TdName.Id + dvPropertyIndex).html(dvProperty.Name);
                    $("#" + DRB.DOM.DataverseReturnType.TdType.Id + dvPropertyIndex).html(dvProperty.Type);
                });
            }
        }
    }
    else {
        DRB.Metadata.CurrentNode.data.configuration.dataverseReturnType = null;
        $("#" + DRB.DOM.DataverseParameters.Div.Id).append(DRB.UI.CreateSpan(DRB.DOM.DataverseParameters.SpanName.Id + "rt", "<b>No Return Type</b>"));
    }
    // #endregion
}

/**
 * Dataverse Execute - Bind Dataverse
 * @param {string} id Id
 */
DRB.Logic.DataverseExecute.BindDataverseExecute = function (id) {
    $("#" + id).on("change", function (e) {
        var dvExecuteName = $(this).val();
        var dvExecute = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentDataverseExecutes, dvExecuteName);
        if (DRB.Utilities.HasValue(dvExecute)) {
            // dataverseExecute
            DRB.Metadata.CurrentNode.data.configuration.dataverseExecute = dvExecuteName;
            $("#" + DRB.DOM.DataverseParameters.Div.Id).empty();
            $("#" + DRB.DOM.DataverseParameters.Div.Id).show();
            DRB.Logic.DataverseExecute.AfterExecuteLoaded(dvExecute);
        } else {
            DRB.Metadata.CurrentNode.data.configuration.dataverseExecute = "";
        }
    });
}

/**
 * Dataverse Execute - Start
 */
DRB.Logic.DataverseExecute.Start = function (requestType) {
    if (requestType === "executecustomapi") {
        // download Dataverse Custom APIs if not loaded
        if (DRB.Metadata.DataverseCustomAPIsLoaded !== true) { DRB.Logic.DataverseExecute.DownloadDataverseCustomAPIs(requestType); return; }
    }

    if (requestType === "executecustomaction") {
        // download Dataverse Custom Actions if not loaded
        if (DRB.Metadata.DataverseCustomActionsLoaded !== true) { DRB.Logic.DataverseExecute.DownloadDataverseCustomActions(requestType); return; }
    }

    if (requestType === "executeaction" || requestType === "executefunction") {
        // download Dataverse Metadata if not loaded
        if (DRB.Metadata.DataverseMetadataLoaded !== true) { DRB.Logic.DataverseExecute.DownloadDataverseMetadata(requestType); return; }
    }

    switch (requestType) {
        case "executecustomapi":
            // DOM
            DRB.DOM.DataverseExecute.Span.Name = DRB.DOM.DataverseCustomAPI.Span.Name;
            DRB.DOM.DataverseExecute.Dropdown.Name = DRB.DOM.DataverseCustomAPI.Dropdown.Name;
            // Metadata
            DRB.Metadata.DataverseTables = DRB.Metadata.DataverseCustomAPITables;
            DRB.Metadata.DataverseComplexTypes = DRB.Metadata.DataverseCustomAPIComplexTypes;
            DRB.Metadata.DataverseEnumTypes = DRB.Metadata.DataverseCustomAPIEnumTypes;
            break;
        case "executecustomaction":
            // DOM
            DRB.DOM.DataverseExecute.Span.Name = DRB.DOM.DataverseCustomAction.Span.Name;
            DRB.DOM.DataverseExecute.Dropdown.Name = DRB.DOM.DataverseCustomAction.Dropdown.Name;
            // Metadata
            DRB.Metadata.DataverseTables = DRB.Metadata.DataverseCustomActionTables;
            DRB.Metadata.DataverseComplexTypes = DRB.Metadata.DataverseCustomActionComplexTypes;
            DRB.Metadata.DataverseEnumTypes = DRB.Metadata.DataverseCustomActionEnumTypes;
            break;
        case "executeaction":
            // DOM
            DRB.DOM.DataverseExecute.Span.Name = DRB.DOM.DataverseAction.Span.Name;
            DRB.DOM.DataverseExecute.Dropdown.Name = DRB.DOM.DataverseAction.Dropdown.Name;
            // Metadata
            DRB.Metadata.DataverseTables = DRB.Metadata.DataverseActionTables;
            DRB.Metadata.DataverseComplexTypes = DRB.Metadata.DataverseActionFunctionComplexTypes;
            DRB.Metadata.DataverseEnumTypes = DRB.Metadata.DataverseActionFunctionEnumTypes;
            break;
        case "executefunction":
            // DOM
            DRB.DOM.DataverseExecute.Span.Name = DRB.DOM.DataverseFunction.Span.Name;
            DRB.DOM.DataverseExecute.Dropdown.Name = DRB.DOM.DataverseFunction.Dropdown.Name;
            // Metadata
            DRB.Metadata.DataverseTables = DRB.Metadata.DataverseFunctionTables;
            DRB.Metadata.DataverseComplexTypes = DRB.Metadata.DataverseActionFunctionComplexTypes;
            DRB.Metadata.DataverseEnumTypes = DRB.Metadata.DataverseActionFunctionEnumTypes;
            break;
    }

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();

    // #region Dataverse Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.DataverseTables).ToDropdown());
    DRB.Logic.DataverseExecute.BindDataverseTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    // #region Dataverse Execute
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.DataverseExecute.Span.Id, DRB.DOM.DataverseExecute.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.DataverseExecute.Dropdown.Id));
    DRB.UI.ResetDropdown(DRB.DOM.DataverseExecute.Dropdown.Id, DRB.DOM.DataverseExecute.Dropdown.Name);
    DRB.Logic.DataverseExecute.BindDataverseExecute(DRB.DOM.DataverseExecute.Dropdown.Id);
    // #endregion

    // add link to Microsoft Docs for Action and Function
    switch (requestType) {
        case "executeaction":
            $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateExternalLink("https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/actions", "Web API Action Reference"));
            break;
        case "executefunction":
            $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateExternalLink("https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/functions", "Web API Function Reference"));
            break;
    }

    DRB.CustomUI.AddSpacer();

    // #region Dataverse Parameters
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.DataverseParameters.Div.Id, DRB.DOM.DataverseParameters.Div.Class));
    $("#" + DRB.DOM.DataverseParameters.Div.Id).hide();
    // #endregion

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.DataverseTables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.dataverseExecute = "";
        } else {
            // trigger change with table logical name
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }
    // #endregion
}
// #endregion  
 
// #region DRB.Logic.ExecuteWorkflow
/**
 * Execute Workflow - Bind Table
 * @param {string} id Id
*/
DRB.Logic.ExecuteWorkflow.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        DRB.Metadata.QueryObjectTypeCode = null;
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            // Fill data.configuration (primaryEntity)
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
            // Metadata
            DRB.Metadata.QueryObjectTypeCode = table.ObjectTypeCode;
        }
    });
}

/**
 * Execute Workflow - Start
 */
DRB.Logic.ExecuteWorkflow.Start = function () {
    // Metadata
    DRB.Metadata.QueryObjectTypeCode = null;

    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.ExecuteWorkflow.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddPrimaryId();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddWorkflowId();
    DRB.CustomUI.AddSpacer();

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";
            DRB.Metadata.CurrentNode.data.configuration.workflowId = "";
        } else {
            // trigger change with table logical name
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }
    // #endregion
}
// #endregion  
 
// #region DRB.Logic.ManageFileImageData
/**
 * Manage File Image Data - After Table Loaded
 * @param {DRB.Models.Table} table Table
*/
DRB.Logic.ManageFileImageData.AfterTableLoaded = function (table) {
    DRB.Logic.FillCurrentMetadata(table); // Fill Current Metadata

    var selectedColumns = [];
    var fileColumnDropdownName = "";
    var columnAttributeType = "";

    if (DRB.Metadata.ManageDataType === "managefiledata") {
        columnAttributeType = "File";
        fileColumnDropdownName = DRB.DOM.FileColumn.Dropdown.Name;
    }

    if (DRB.Metadata.ManageDataType === "manageimagedata") {
        columnAttributeType = "Image";
        fileColumnDropdownName = DRB.DOM.ImageColumn.Dropdown.Name;
    }

    DRB.Metadata.CurrentColumns.forEach(function (currentColumn) {
        if (currentColumn.AttributeType === columnAttributeType) { selectedColumns.push(currentColumn); }
    });

    if (selectedColumns.length === 0) {
        DRB.UI.ResetDropdown(DRB.DOM.FileColumn.Dropdown.Id, fileColumnDropdownName);
        DRB.Metadata.CurrentNode.data.configuration.fileField = null;
    } else {
        DRB.UI.FillDropdown(DRB.DOM.FileColumn.Dropdown.Id, fileColumnDropdownName, new DRB.Models.Records(selectedColumns).ToDropdown());
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileField)) {
            $("#" + DRB.DOM.FileColumn.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.fileField.logicalName).change();
        }
    }

    // Fill data.configuration
    DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
}

/**
 * Manage File Image Data - Bind File Column
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindFileColumn = function (id) {
    $("#" + id).on("change", function (e) {
        var columnName = $(this).val();
        var column = DRB.Utilities.GetRecordById(DRB.Metadata.CurrentColumns, columnName);
        if (DRB.Utilities.HasValue(column)) {
            DRB.Metadata.CurrentNode.data.configuration.fileField = { logicalName: column.LogicalName, schemaName: column.SchemaName, label: column.Name, type: column.AttributeType, oDataName: column.ODataName };
            if (DRB.Metadata.ManageDataType === "manageimagedata") {
                if (column.AdditionalProperties.CanStoreFullImage !== true) {
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', false).change();
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop("disabled", "true");
                } else {
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop("disabled", "");
                }
            }
        } else {
            DRB.Metadata.CurrentNode.data.configuration.fileField = null;
            if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', false).change(); }
        }
    });
}

/**
 * Manage File Image Data - Bind File Operation
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindFileOperation = function (id) {
    $("#" + id).on("change", function (e) {
        var operation = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.fileOperation = operation;

        switch (operation) {
            case "retrieve":
                $("#" + DRB.DOM.FileName.Div.Id).hide();
                $("#" + DRB.DOM.FileName.Input.Id).val("");
                if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileFullSize.Div.Id).show(); }
                $("#" + DRB.DOM.FileContent.Div.Id).hide();
                DRB.Metadata.CurrentNode.data.configuration.fileContent = null;
                break;

            case "upload":
                $("#" + DRB.DOM.FileName.Div.Id).show();
                if (DRB.Metadata.ManageDataType === "manageimagedata") {
                    $("#" + DRB.DOM.FileFullSize.Div.Id).hide();
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', false).change();
                }
                $("#" + DRB.DOM.FileContent.Div.Id).show();
                if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileContent)) {
                    if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).show(); }
                    $("#" + DRB.DOM.FileContent.DownloadButton.Id).show();
                    $("#" + DRB.DOM.FileContent.RemoveButton.Id).show();
                } else {
                    if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).hide(); }
                    $("#" + DRB.DOM.FileContent.DownloadButton.Id).hide();
                    $("#" + DRB.DOM.FileContent.RemoveButton.Id).hide();
                }
                break;

            case "delete":
                $("#" + DRB.DOM.FileName.Div.Id).hide();
                $("#" + DRB.DOM.FileName.Input.Id).val("");
                if (DRB.Metadata.ManageDataType === "manageimagedata") {
                    $("#" + DRB.DOM.FileFullSize.Div.Id).hide();
                    $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', false).change();
                }
                $("#" + DRB.DOM.FileContent.Div.Id).hide();
                DRB.Metadata.CurrentNode.data.configuration.fileContent = null;
                break;
        }

        if (operation === "upload") { $("#" + DRB.DOM.FileName.Div.Id).show(); }
        else {
            $("#" + DRB.DOM.FileName.Div.Id).hide();
            $("#" + DRB.DOM.FileName.Input.Id).val("");
        }
    });
}

/**
 * Manage File Image Data - Bind File Name
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindFileName = function (id) {
    $("#" + id).on("change", function (e) {
        var fileName = $(this).val();
        DRB.Metadata.CurrentNode.data.configuration.fileName = fileName;
    });
}

/**
 * Manage File Image Data - Bind File Full Size
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindFileFullSize = function (id) {
    $("#" + id).on("change", function (e) {
        var fullSizeValue = $(this).is(':checked');
        DRB.Metadata.CurrentNode.data.configuration.fileFullSize = fullSizeValue;
    });
}

/**
 *  * Manage File Image Data - Parse File
 * @param {event} e Event
 */
DRB.Logic.ManageFileImageData.ParseFile = function (e) {
    var file = e.target.files[0];
    if (!file) {
        DRB.UI.ShowError("Load File Error", "Error loading the selected file");
    } else {
        if (DRB.Metadata.ManageDataType === "managefiledata" || /\.(jpe?g|png|gif|bmp)$/i.test(file.name)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                try {
                    var fileContent = e.target.result;
                    DRB.Metadata.CurrentNode.data.configuration.fileContent = fileContent.split(",")[1];
                    if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).show(); }
                    $("#" + DRB.DOM.FileContent.DownloadButton.Id).show();
                    $("#" + DRB.DOM.FileContent.RemoveButton.Id).show();
                    $("#" + DRB.DOM.FileName.Input.Id).val(file.name).change(); // File Name

                } catch (e) { DRB.UI.ShowError("Load File Error", "Failed to parse the selected file"); }
            };
            reader.readAsDataURL(file);
        } else {
            DRB.UI.ShowError("Load File Error", "Supported file extensions: gif, png, bmp, jpg, jpeg");
        }
    }
    // reset the File Input (necessary if we load the same file again)
    $(e.target).val("");
}

/**
 * Manage File Image Data - Load File
 */
DRB.Logic.ManageFileImageData.LoadFile = function () {
    $("#" + DRB.DOM.FileContent.LoadInput.Id).trigger("click");
}

/**
 * Manage File Image Data - Show File
 */
DRB.Logic.ManageFileImageData.ShowFile = function () {
    try {
        var imageContent = DRB.Metadata.CurrentNode.data.configuration.fileContent;
        var base64Prefix = "data:image/jpeg;base64,";
        var finalImage = base64Prefix + imageContent;

        var showContent = DRB.UI.CreateEmptyDiv("div_showimage", "centercontent");
        showContent.append(DRB.UI.CreateImage("preview", finalImage));
        DRB.UI.Show("Show Image", showContent, "large");
    } catch (e) {
        DRB.UI.ShowError("Image Error", "Unable to show the image");
    }
}

/**
 * Manage File Image Data - Download File
 */
DRB.Logic.ManageFileImageData.DownloadFile = function () {
    try {
        var base64Content = DRB.Metadata.CurrentNode.data.configuration.fileContent;
        var byteCharacters = atob(base64Content);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var fileName = "file.bin";
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileName)) { fileName = DRB.Metadata.CurrentNode.data.configuration.fileName; }
        var fileContent = new Uint8Array(byteNumbers);
        var saveFile = new Blob([fileContent], { type: "application/octet-stream" });
        var customLink = document.createElement("a");
        customLink.href = URL.createObjectURL(saveFile);
        customLink.download = fileName;
        customLink.click();
        URL.revokeObjectURL(saveFile);
    } catch (e) {
        DRB.UI.ShowError("Download Error", "Unable to download the file");
    }
}

/**
 * Manage File Image Data - Remove File
 */
DRB.Logic.ManageFileImageData.RemoveFile = function () {
    DRB.Metadata.CurrentNode.data.configuration.fileContent = null;
    if (DRB.Metadata.ManageDataType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).hide(); }
    $("#" + DRB.DOM.FileContent.DownloadButton.Id).hide();
    $("#" + DRB.DOM.FileContent.RemoveButton.Id).hide();
}

/**
 * Manage File Image Data - Bind Table
 * @param {string} id Id
*/
DRB.Logic.ManageFileImageData.BindTable = function (id) {
    $("#" + id).on("change", function (e) {
        var tableLogicalName = $(this).val();
        var table = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(table)) {
            // Fill data.configuration (primaryEntity)
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = { logicalName: table.LogicalName, schemaName: table.SchemaName, label: table.Name, entitySetName: table.EntitySetName };
            if (table.ColumnsLoaded === false) {
                DRB.UI.ShowLoading("Retrieving Table information...<br /><b>This is a long-running operation</b>");
                setTimeout(function () {
                    // retrieve the Entity Fields
                    DRB.Common.RetrieveTablesDetails([tableLogicalName])
                        .done(function () {
                            DRB.Common.SetTables(arguments, DRB.Metadata.Tables);
                            DRB.Logic.ManageFileImageData.AfterTableLoaded(table);
                            DRB.UI.HideLoading();
                        })
                        .fail(function (xhr) { DRB.UI.ShowError("DRB.Common.RetrieveTablesDetails Error", DRB.Common.GetErrorMessage(xhr)); });
                }, DRB.Settings.TimeoutDelay);
            } else {
                DRB.Logic.ManageFileImageData.AfterTableLoaded(table);
            }
        }
    });
}

/**
 * Manage File Data - Start
 */
DRB.Logic.ManageFileImageData.Start = function (requestType) {
    DRB.Metadata.ManageDataType = requestType;
    // create DOM and bindings
    DRB.CustomUI.AddVersion();
    DRB.CustomUI.AddProcess();
    DRB.CustomUI.AddTokenHeader();
    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddImpersonate();
    DRB.CustomUI.AddSpacer();

    // #region Table
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.Table.Span.Id, DRB.DOM.Table.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.Table.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.Table.Dropdown.Id, DRB.DOM.Table.Dropdown.Name, new DRB.Models.Records(DRB.Metadata.Tables).ToDropdown());
    DRB.Logic.ManageFileImageData.BindTable(DRB.DOM.Table.Dropdown.Id);
    // #endregion

    // #region File Column
    var divFileColumn = DRB.UI.CreateEmptyDiv(DRB.DOM.FileColumn.Div.Id, DRB.DOM.FileColumn.Div.Class);
    var fileColumnSpanName = "";
    var fileColumnDropdownName = "";
    switch (requestType) {
        case "managefiledata":
            fileColumnSpanName = DRB.DOM.FileColumn.Span.Name;
            fileColumnDropdownName = DRB.DOM.FileColumn.Dropdown.Name;
            break;
        case "manageimagedata":
            fileColumnSpanName = DRB.DOM.ImageColumn.Span.Name;
            fileColumnDropdownName = DRB.DOM.ImageColumn.Dropdown.Name;
            break;
    }
    divFileColumn.append(DRB.UI.CreateSpan(DRB.DOM.FileColumn.Span.Id, fileColumnSpanName));
    divFileColumn.append(DRB.UI.CreateDropdown(DRB.DOM.FileColumn.Dropdown.Id));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFileColumn);
    DRB.UI.ResetDropdown(DRB.DOM.FileColumn.Dropdown.Id, fileColumnDropdownName);
    DRB.Logic.ManageFileImageData.BindFileColumn(DRB.DOM.FileColumn.Dropdown.Id);
    // #endregion

    DRB.CustomUI.AddSpacer();
    DRB.CustomUI.AddPrimaryId();
    DRB.CustomUI.AddSpacer();

    // #region File Operation
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateSpan(DRB.DOM.FileOperation.Span.Id, DRB.DOM.FileOperation.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(DRB.UI.CreateDropdown(DRB.DOM.FileOperation.Dropdown.Id));
    DRB.UI.FillDropdown(DRB.DOM.FileOperation.Dropdown.Id, DRB.DOM.FileOperation.Dropdown.Name, new DRB.Models.Records(DRB.Settings.OptionsManageFile).ToDropdown());
    DRB.Logic.ManageFileImageData.BindFileOperation(DRB.DOM.FileOperation.Dropdown.Id);
    // #endregion

    // #region Full Size
    if (requestType === "manageimagedata") {
        var divFileFullSize = DRB.UI.CreateEmptyDiv(DRB.DOM.FileFullSize.Div.Id, DRB.DOM.FileFullSize.Div.Class);
        divFileFullSize.append(DRB.UI.CreateCheckbox(DRB.DOM.FileFullSize.CheckBox.Id, "", "", false));
        divFileFullSize.append(DRB.UI.CreateSpan(DRB.DOM.FileFullSize.Span.Id, DRB.DOM.FileFullSize.Span.Name));
        $("#" + DRB.DOM.ConfigureContent.Id).append(divFileFullSize);
        DRB.Logic.ManageFileImageData.BindFileFullSize(DRB.DOM.FileFullSize.CheckBox.Id);
        $("#" + DRB.DOM.FileFullSize.Div.Id).hide();

    }
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region File Name
    var divFileName = DRB.UI.CreateEmptyDiv(DRB.DOM.FileName.Div.Id, DRB.DOM.FileName.Div.Class);
    divFileName.append(DRB.UI.CreateSpan(DRB.DOM.FileName.Span.Id, DRB.DOM.FileName.Span.Name));
    divFileName.append(DRB.UI.CreateInputString(DRB.DOM.FileName.Input.Id, 100, DRB.DOM.FileName.Span.Name));
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFileName);
    DRB.Common.BindFileName(DRB.DOM.FileName.Input.Id);
    DRB.Logic.ManageFileImageData.BindFileName(DRB.DOM.FileName.Input.Id);
    $("#" + DRB.DOM.FileName.Div.Id).hide();
    // #endregion

    DRB.CustomUI.AddSpacer();

    // #region File Content
    var divFileContent = DRB.UI.CreateEmptyDiv(DRB.DOM.FileContent.Div.Id);
    $("#" + DRB.DOM.ConfigureContent.Id).append(divFileContent);
    divFileContent.append(DRB.UI.CreateInputFile(DRB.DOM.FileContent.LoadInput.Id, true, DRB.Logic.ManageFileImageData.ParseFile));
    divFileContent.append(DRB.UI.CreateButton(DRB.DOM.FileContent.LoadButton.Id, DRB.DOM.FileContent.LoadButton.Name, DRB.DOM.FileContent.LoadButton.Class, DRB.Logic.ManageFileImageData.LoadFile));
    if (requestType === "manageimagedata") {
        divFileContent.append(DRB.UI.CreateButton(DRB.DOM.FileContent.ShowButton.Id, DRB.DOM.FileContent.ShowButton.Name, DRB.DOM.FileContent.ShowButton.Class, DRB.Logic.ManageFileImageData.ShowFile));
        $("#" + DRB.DOM.FileContent.ShowButton.Id).hide();
    }
    divFileContent.append(DRB.UI.CreateButton(DRB.DOM.FileContent.DownloadButton.Id, DRB.DOM.FileContent.DownloadButton.Name, DRB.DOM.FileContent.DownloadButton.Class, DRB.Logic.ManageFileImageData.DownloadFile));
    $("#" + DRB.DOM.FileContent.RemoveButton.Id).hide();
    divFileContent.append(DRB.UI.CreateButton(DRB.DOM.FileContent.RemoveButton.Id, DRB.DOM.FileContent.RemoveButton.Name, DRB.DOM.FileContent.RemoveButton.Class, DRB.Logic.ManageFileImageData.RemoveFile));
    $("#" + DRB.DOM.FileContent.RemoveButton.Id).hide();
    $("#" + DRB.DOM.FileContent.Div.Id).hide();
    // #endregion

    // #region Triggers
    // events triggered after due to DOM connections to other elements

    // Table
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.primaryEntity)) {
        // check if the table exists
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName);
        if (!DRB.Utilities.HasValue(checkTable)) {
            // if the table doesn't exist reset the relevant values
            DRB.Metadata.CurrentNode.data.configuration.primaryEntity = null;
            DRB.Metadata.CurrentNode.data.configuration.primaryId = "";
        } else {
            // trigger change with table logical name
            $("#" + DRB.DOM.Table.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.primaryEntity.logicalName).change();
        }
    }
    // File Operation
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileOperation)) {
        $("#" + DRB.DOM.FileOperation.Dropdown.Id).val(DRB.Metadata.CurrentNode.data.configuration.fileOperation).change();
    }

    // File Name 
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileName)) {
        $("#" + DRB.DOM.FileName.Input.Id).val(DRB.Metadata.CurrentNode.data.configuration.fileName).change();
    }

    // File Full Size
    if (requestType === "manageimagedata") {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileFullSize)) {
            $("#" + DRB.DOM.FileFullSize.CheckBox.Id).prop('checked', DRB.Metadata.CurrentNode.data.configuration.fileFullSize).change();
        }
    }
    // File Content
    if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode.data.configuration.fileContent)) {
        if (requestType === "manageimagedata") { $("#" + DRB.DOM.FileContent.ShowButton.Id).show(); }
        $("#" + DRB.DOM.FileContent.DownloadButton.Id).show();
        $("#" + DRB.DOM.FileContent.RemoveButton.Id).show();
    }
    // #endregion
}
// #endregion  
 
// #region DRB.Collection
/**
 * Collection - Load Nodes
 * @param {any} nodes Nodes
 */
DRB.Collection.LoadNodes = function (nodes) {
    // set Metadata.CurrentNode as null
    DRB.Metadata.CurrentNode = null;
    // hide Main Content
    $("#" + DRB.DOM.MainContent.Id).hide();
    // refresh jsTree with new data structure
    $("#" + DRB.DOM.TreeView.Id).jstree().deselect_all(true);
    $("#" + DRB.DOM.TreeView.Id).jstree(true).settings.core.data = nodes;
    $("#" + DRB.DOM.TreeView.Id).jstree(true).refresh();
}

/**
 * Collection - Create Default
 */
DRB.Collection.CreateDefault = function () {
    // create default jsTree data structure (collection -> request)
    var currentNodes = [{ type: "collection", text: "New Collection", state: { opened: true }, children: [{ type: "request", text: "New Request", icon: "jstree-file" }] }];
    // load nodes
    DRB.Collection.LoadNodes(currentNodes);
}

/**
 * Collection - New
 */
DRB.Collection.New = function () {
    // get jsTree data structure
    var currentNodes = $("#" + DRB.DOM.TreeView.Id).jstree(true).get_json("#");
    // if no nodes then create default
    if (currentNodes.length === 0) { DRB.Collection.CreateDefault(); }
    // else ask user if wants to discard current collection before proceeding
    else { DRB.UI.ShowQuestion("New Collection", "Are you sure to create a new Collection?<br/>The existing one will be discarded", null, function () { DRB.Collection.CreateDefault(); }); }
}

/**
 * Collection - Import Nodes
 * @param {any} importNode Import Node
 * @param {any} currentNode Current Node
 */
DRB.Collection.ImportNodes = function (importNode, currentNode) {
    // recursive function to convert a DRB collection node to a jsTree node
    currentNode.text = importNode.name;
    currentNode.type = importNode.type;
    currentNode.children = [];
    if (importNode.type === "collection" || importNode.type === "folder") {
        currentNode.state = { opened: true }; // set "collection" and "folder" as opened
    }
    if (importNode.type === "request") {
        currentNode.data = importNode.properties; // fill "request" data
        currentNode.icon = "jstree-file"; // "request" has file icon
    }
    if (importNode.items.length === 0) { return; }
    for (var count = 0; count < importNode.items.length; count++) {
        currentNode.children.push({});
        DRB.Collection.ImportNodes(importNode.items[count], currentNode.children[count]);
    }
}

/**
 * Collection - Parse
 * @param {event} e Event
 */
DRB.Collection.Parse = function (e) {
    // get the loaded file
    var file = e.target.files[0];
    if (!file) {
        // something went wrong, show error
        DRB.UI.ShowError("Load Collection Error", "Error loading the selected file");
    } else {
        // initialize reader
        var reader = new FileReader();
        // define onload event after the file is read
        reader.onload = function (e) {
            try {
                // get file content
                var fileContent = e.target.result;
                // parse file content as json
                var parsedContent = JSON.parse(fileContent);
                // version check
                if (parsedContent.version > 1) {
                    DRB.UI.ShowError("Load Collection Error", "This file has been created for a newer version of Dataverse REST Builder");
                } else {
                    // create an empty data structure
                    var currentNodes = [{}];
                    // import jsTree nodes to the new data structure
                    DRB.Collection.ImportNodes(parsedContent, currentNodes[0]);
                    // load nodes
                    DRB.Collection.LoadNodes(currentNodes);
                }
            } catch (e) {
                // something went wrong when parsing the file, show error
                DRB.UI.ShowError("Load Collection Error", "Failed to parse the selected file. Make sure the file is a collection for Dataverse REST Builder");
            }
        };
        // read the file as text
        reader.readAsText(file);
    }
    // reset the File Input (necessary if load again the same file name)
    $(e.target).val("");
}

/**
* Collection - Load
*/
DRB.Collection.Load = function () {
    // get jsTree data structure
    var currentNodes = $("#" + DRB.DOM.TreeView.Id).jstree(true).get_json("#");
    // if no nodes then trigger load file
    if (currentNodes.length === 0) { $("#" + DRB.DOM.Collection.LoadInput.Id).trigger("click"); }
    // else ask user if wants to discard current collection before proceeding
    else { DRB.UI.ShowQuestion("Load Collection", "Are you sure to load a Collection?<br/>The existing one will be discarded", null, function () { $("#" + DRB.DOM.Collection.LoadInput.Id).trigger("click"); }); }
}

/**
 * Collection - Export Nodes
 * @param {any} currentNode Current Node
 * @param {any} exportNode Export Node
 */
DRB.Collection.ExportNodes = function (currentNode, exportNode) {
    // recursive function to convert a jsTree node to a DRB collection node
    exportNode.name = currentNode.text;
    exportNode.type = currentNode.type;
    exportNode.items = [];
    if (currentNode.type === "request") { exportNode.properties = currentNode.data; }
    if (currentNode.children.length === 0) { return; }
    for (var count = 0; count < currentNode.children.length; count++) {
        exportNode.items.push({});
        DRB.Collection.ExportNodes(currentNode.children[count], exportNode.items[count]);
    }
}

/**
 * Collection - Export Nodes Postman
 * @param {any} currentNode Current Node
 * @param {any} exportNode Export Node
 */
DRB.Collection.ExportNodesPostman = function (currentNode, exportNode) {
    // recursive function to convert a jsTree node to a Postman collection node
    if (currentNode.type === "collection" || currentNode.type === "folder") { exportNode.item = []; }
    if (currentNode.type === "folder" || currentNode.type === "request") { exportNode.name = currentNode.text; }
    if (currentNode.type === "request") {
        exportNode.request = { method: "GET", header: [], url: null };

        if (DRB.Utilities.HasValue(currentNode.data.requestType)) {
            var postmanSettings = DRB.GeneratePostman.Start(currentNode.data.requestType, currentNode.data.configuration);
            exportNode.request.method = postmanSettings.postmanMethod;
            exportNode.request.url = postmanSettings.postmanUrl;
            exportNode.request.header = postmanSettings.postmanHeader;
            if (postmanSettings.postmanMethod === "POST" || postmanSettings.postmanMethod === "PATCH") {
                exportNode.request.body = postmanSettings.postmanBody;
            }
        }

        exportNode.response = [];
    }
    if (currentNode.children.length === 0) { return; }
    for (var count = 0; count < currentNode.children.length; count++) {
        exportNode.item.push({});
        DRB.Collection.ExportNodesPostman(currentNode.children[count], exportNode.item[count]);
    }
}

/**
 * Collection - Save 
 */
DRB.Collection.Save = function () {
    // get jsTree data structure
    var currentNodes = $("#" + DRB.DOM.TreeView.Id).jstree(true).get_json("#");
    // if no nodes then show error
    if (currentNodes.length === 0) { DRB.UI.ShowError("Save Collection", "Create or Load a Collection before Save"); }
    else {
        // get current DateTime
        var now = new Date();
        // create json collection
        var collection = {};
        collection.created_on = now.toJSON(); // current DateTime as json 
        collection.version = 1; // collection version
        // export jsTree nodes to the json collection
        DRB.Collection.ExportNodes(currentNodes[0], collection);
        // create fileName and fileDate (coming from current DateTime) to be used inside a valid filename
        var fileName = currentNodes[0].text.replace(/[^a-z0-9]/gi, "_");
        var fileDate = now.toLocaleString("sv").replace(/ /g, "_").replace(/-/g, "").replace(/:/g, "");
        // create the blob content holding the json collection
        var saveFile = new Blob([JSON.stringify(collection, null, "\t")], { type: "application/json" });
        // download the blob content with the provided filename
        var customLink = document.createElement("a");
        customLink.href = URL.createObjectURL(saveFile);
        customLink.download = fileName + "_" + fileDate + ".json";
        customLink.click();
    }
}

/**
 * Collection - Bind Postman Endpoint
 * @param {string} id Id
*/
DRB.Collection.BindPostmanEndpoint = function (id) {
    $("#" + id).on("change", function (e) {
        var endpoint = $(this).val();
        var postmanDOM = DRB.DOM.Collection.Postman;
        switch (endpoint) {
            case "v1":
                $("#" + postmanDOM.ScopeInput.Id).val("");
                $("#" + postmanDOM.ResourceInput.Id).val("{{url}}");
                $("#" + postmanDOM.AccessTokenInput.Id).val("https://login.microsoftonline.com/{{tenantid}}/oauth2/token");
                break;
            case "v2":
                $("#" + postmanDOM.ScopeInput.Id).val("{{url}}/.default");
                $("#" + postmanDOM.ResourceInput.Id).val("");
                $("#" + postmanDOM.AccessTokenInput.Id).val("https://login.microsoftonline.com/{{tenantid}}/oauth2/v2.0/token");
                break;
        }
    });
}
/**
 * Collection - Bind Postman Grant Type
 * @param {string} id Id
*/
DRB.Collection.BindPostmanGrantType = function (id) {
    $("#" + id).on("change", function (e) {
        var grantType = $(this).val();
        var postmanDOM = DRB.DOM.Collection.Postman;
        $("#" + postmanDOM.SettingsDiv.Id).empty();
        var divTable = DRB.UI.CreateTable(postmanDOM.Table.Id);
        $("#" + postmanDOM.SettingsDiv.Id).append(divTable);

        switch (grantType) {
            case "implicit":
                var implicitSettings = ["Url", "ClientId", "AuthUrl", "CallbackUrl"];
                implicitSettings.forEach(function (setting) {
                    var tr = DRB.UI.CreateTr(postmanDOM.Tr.Id + postmanDOM[setting + "Span"].Id);
                    var tdLabel = DRB.UI.CreateTd(postmanDOM.TdLabel.Id + postmanDOM[setting + "Span"].Id);
                    var tdValue = DRB.UI.CreateTd(postmanDOM.TdValue.Id + postmanDOM[setting + "Span"].Id);
                    divTable.append(tr);
                    tr.append(tdLabel);
                    tr.append(tdValue);

                    tdLabel.append(DRB.UI.CreateSpan(postmanDOM[setting + "Span"].Id, postmanDOM[setting + "Span"].Name, postmanDOM[setting + "Span"].SmallText));
                    tdValue.append(DRB.UI.CreateInputLongString(postmanDOM[setting + "Input"].Id, null, postmanDOM[setting + "Span"].Name));
                });
                $("#" + postmanDOM.UrlInput.Id).val(DRB.Xrm.GetClientUrl());
                $("#" + postmanDOM.ClientIdInput.Id).val("51f81489-12ee-4a9e-aaae-a2591f45987d");
                $("#" + postmanDOM.AuthUrlInput.Id).val("https://login.microsoftonline.com/common/oauth2/authorize?resource={{url}}");
                $("#" + postmanDOM.CallbackUrlInput.Id).val("https://callbackurl");

                break;

            case "client_credentials":
                var clientCredentialSettings = ["Url", "ClientId", "ClientSecret", "TenantId", "Endpoint", "AccessToken", "Scope", "Resource"];
                clientCredentialSettings.forEach(function (setting) {
                    var tr = DRB.UI.CreateTr(postmanDOM.Tr.Id + postmanDOM[setting + "Span"].Id);
                    var tdLabel = DRB.UI.CreateTd(postmanDOM.TdLabel.Id + postmanDOM[setting + "Span"].Id);
                    var tdValue = DRB.UI.CreateTd(postmanDOM.TdValue.Id + postmanDOM[setting + "Span"].Id);
                    divTable.append(tr);
                    tr.append(tdLabel);
                    tr.append(tdValue);

                    tdLabel.append(DRB.UI.CreateSpan(postmanDOM[setting + "Span"].Id, postmanDOM[setting + "Span"].Name, postmanDOM[setting + "Span"].SmallText));
                    if (setting === "Endpoint") {
                        tdValue.append(DRB.UI.CreateSimpleDropdown(postmanDOM.EndpointDropdown.Id));

                    } else {
                        tdValue.append(DRB.UI.CreateInputLongString(postmanDOM[setting + "Input"].Id, null, postmanDOM[setting + "Span"].Name));
                    }
                });
                $("#" + postmanDOM.UrlInput.Id).val(DRB.Xrm.GetClientUrl());
                DRB.UI.FillDropdown(postmanDOM.EndpointDropdown.Id, postmanDOM.EndpointDropdown.Name, new DRB.Models.Records(DRB.Settings.PostmanEndpoint).ToDropdown());
                DRB.Collection.BindPostmanEndpoint(postmanDOM.EndpointDropdown.Id);
                $("#" + postmanDOM.EndpointDropdown.Id).val(DRB.Settings.PostmanEndpoint[1].Id).change();
                break;
        }
    });
}

/**
 * Collection - Export Postman File
 */
DRB.Collection.ExportPostmanFile = function () {
    // get jsTree data structure
    var currentNodes = $("#" + DRB.DOM.TreeView.Id).jstree(true).get_json("#");
    var postmanDOM = DRB.DOM.Collection.Postman;
    var grantType = $("#" + postmanDOM.GrantTypeDropdown.Id).val();
    // get current DateTime
    var now = new Date();
    // create json collection
    var collection = { info: {}, auth: {}, event: [], variable: [] };

    // #region info
    collection.info._postman_id = DRB.Utilities.GenerateGuid();
    collection.info.name = currentNodes[0].text;
    collection.info.schema = "https://schema.getpostman.com/json/collection/v2.1.0/collection.json";
    // #endregion

    // #region auth
    collection.auth.type = "oauth2";
    collection.auth.oauth2 = [];
    collection.auth.oauth2.push({ key: "grant_type", value: grantType, type: "string" });
    collection.auth.oauth2.push({ key: "addTokenTo", value: "header", type: "string" });
    collection.auth.oauth2.push({ key: "client_authentication", value: "header", type: "string" });
    collection.auth.oauth2.push({ key: "challengeAlgorithm", value: "S256", type: "string" });
    collection.auth.oauth2.push({ key: "tokenName", value: "Dataverse Token", type: "string" });

    switch (grantType) {
        case "implicit":
            collection.auth.oauth2.push({ key: "redirect_uri", value: "{{callback}}", type: "string" });
            collection.auth.oauth2.push({ key: "clientId", value: "{{clientid}}", type: "string" });
            collection.auth.oauth2.push({ key: "authUrl", value: "{{authurl}}", type: "string" });
            break;
        case "client_credentials":
            collection.auth.oauth2.push({ key: "clientId", value: "{{clientid}}", type: "string" });
            collection.auth.oauth2.push({ key: "clientSecret", value: "{{clientsecret}}", type: "string" });
            collection.auth.oauth2.push({ key: "scope", value: $("#" + postmanDOM.ScopeInput.Id).val(), type: "string" });
            collection.auth.oauth2.push({ key: "accessTokenUrl", value: $("#" + postmanDOM.AccessTokenInput.Id).val(), type: "string" });
            var resourceValue = $("#" + postmanDOM.ResourceInput.Id).val();
            if (DRB.Utilities.HasValue(resourceValue)) {
                var resourceKey = { key: "resource", value: {}, type: "any" };
                var newGuid = DRB.Utilities.GenerateGuid();
                resourceKey.value[newGuid] = resourceValue;
                collection.auth.oauth2.push(resourceKey);
            }
            break;
    }
    // #endregion

    // #region event
    collection.event.push({ listen: "prerequest", script: { type: "text/javascript", exec: [""] } });
    collection.event.push({ listen: "test", script: { type: "text/javascript", exec: [""] } });
    // #endregion

    // #region variable
    collection.variable.push({ key: "url", value: $("#" + postmanDOM.UrlInput.Id).val() });
    switch (grantType) {
        case "implicit":
            collection.variable.push({ key: "clientid", value: $("#" + postmanDOM.ClientIdInput.Id).val() });
            collection.variable.push({ key: "authurl", value: $("#" + postmanDOM.AuthUrlInput.Id).val() });
            collection.variable.push({ key: "callback", value: $("#" + postmanDOM.CallbackUrlInput.Id).val() });
            break;
        case "client_credentials":
            collection.variable.push({ key: "clientid", value: $("#" + postmanDOM.ClientIdInput.Id).val() });
            collection.variable.push({ key: "clientsecret", value: $("#" + postmanDOM.ClientSecretInput.Id).val() });
            collection.variable.push({ key: "tenantid", value: $("#" + postmanDOM.TenantIdInput.Id).val() });
            break;
    }
    // #endregion

    // export jsTree nodes to the json collection
    DRB.Collection.ExportNodesPostman(currentNodes[0], collection);
    // create fileName and fileDate (coming from current DateTime) to be used inside a valid filename
    var fileName = currentNodes[0].text.replace(/[^a-z0-9]/gi, "_");
    var fileDate = now.toLocaleString("sv").replace(/ /g, "_").replace(/-/g, "").replace(/:/g, "");
    // create the blob content holding the json collection
    var saveFile = new Blob([JSON.stringify(collection, null, "\t")], { type: "application/json" });
    // download the blob content with the provided filename
    var customLink = document.createElement("a");
    customLink.href = URL.createObjectURL(saveFile);
    customLink.download = fileName + "_" + fileDate + ".postman_collection.json";
    customLink.click();
}

/**
 * Collection - Export Postman 
 */
DRB.Collection.ExportPostman = function () {
    // get jsTree data structure
    var currentNodes = $("#" + DRB.DOM.TreeView.Id).jstree(true).get_json("#");
    // if no nodes then show error
    if (currentNodes.length === 0) { DRB.UI.ShowError("Export Postman Collection", "Create or Load a Collection before Export"); }
    else {
        var postmanDOM = DRB.DOM.Collection.Postman;
        var postmanDiv = DRB.UI.CreateEmptyDiv(postmanDOM.Div.Id);

        postmanDiv.append(DRB.UI.CreateSpan(postmanDOM.GrantTypeSpan.Id, postmanDOM.GrantTypeSpan.Name));
        postmanDiv.append(DRB.UI.CreateSimpleDropdown(postmanDOM.GrantTypeDropdown.Id));
        postmanDiv.append(DRB.UI.CreateSpacer());
        postmanDiv.append(DRB.UI.CreateEmptyDiv(postmanDOM.SettingsDiv.Id));
        DRB.UI.ShowExport("Export as Postman Collection", postmanDiv, "large", DRB.Collection.ExportPostmanFile);
        DRB.UI.FillDropdown(postmanDOM.GrantTypeDropdown.Id, postmanDOM.GrantTypeDropdown.Name, new DRB.Models.Records(DRB.Settings.PostmanGrantType).ToDropdown());
        DRB.Collection.BindPostmanGrantType(postmanDOM.GrantTypeDropdown.Id);
        $("#" + postmanDOM.GrantTypeDropdown.Id).val(DRB.Settings.PostmanGrantType[0].Id).change();
    }
}
// #endregion  
 
// #region DRB.Initialize
/**
 * Set Default Settings
 */
DRB.SetDefaultSettings = function () {
    // #region Request Types
    var requests = [{ Id: "retrievesingle", Name: "Retrieve Single" },
    { Id: "retrievemultiple", Name: "Retrieve Multiple" },
    { Id: "create", Name: "Create" },
    { Id: "update", Name: "Update" },
    { Id: "delete", Name: "Delete" },
    { Id: "associate", Name: "Associate" },
    { Id: "disassociate", Name: "Disassociate" },
    { Id: "retrievenextlink", Name: "Retrieve NextLink" },
    { Id: "predefinedquery", Name: "Predefined Query" },
    { Id: "executecustomapi", Name: "Execute Custom API" },
    { Id: "executecustomaction", Name: "Execute Custom Action" },
    { Id: "executeaction", Name: "Execute Action" },
    { Id: "executefunction", Name: "Execute Function" },
    { Id: "executeworkflow", Name: "Execute Workflow" },
    { Id: "managefiledata", Name: "Manage File Data" },
    { Id: "manageimagedata", Name: "Manage Image Data" }];
    DRB.Settings.RequestTypes = [];
    requests.forEach(function (request) { DRB.Settings.RequestTypes.push(new DRB.Models.IdValue(request.Id, request.Name)); });
    // #endregion

    // #region Versions
    var versions = ["9.0", "9.1", "9.2"];
    var currentVersion = DRB.Xrm.GetVersion();
    DRB.Settings.Versions = [];
    for (var versionCount = 0; versionCount < versions.length; versionCount++) {
        DRB.Settings.Versions.push(new DRB.Models.IdValue("v" + versions[versionCount], versions[versionCount]));
        if (!DRB.Utilities.HasValue(currentVersion) || currentVersion === versions[versionCount]) { break; }
    }
    // #endregion

    // #region General    
    DRB.Settings.OptionsAyncSync = [new DRB.Models.IdValue("yes", "Asynchronous"), new DRB.Models.IdValue("no", "Synchronous")];
    DRB.Settings.OptionsYesNo = [new DRB.Models.IdValue("yes", "Yes"), new DRB.Models.IdValue("no", "No")];
    DRB.Settings.OptionsViews = [new DRB.Models.IdValue("savedquery", "System View"), new DRB.Models.IdValue("userquery", "Personal View"), new DRB.Models.IdValue("fetchxml", "FetchXML")]; // Predefined Query
    DRB.Settings.OptionsPrevent = [new DRB.Models.IdValue("none", "None"), new DRB.Models.IdValue("create", "Prevent Create"), new DRB.Models.IdValue("update", "Prevent Update")]; // Update
    DRB.Settings.OptionsOrder = [new DRB.Models.IdValue("asc", "Ascending"), new DRB.Models.IdValue("desc", "Descending")]; // Retrieve Multiple
    DRB.Settings.OptionsAndOr = [new DRB.Models.IdValue("and", "And"), new DRB.Models.IdValue("or", "Or")]; // Retrieve Multiple
    DRB.Settings.OptionsTrueFalse = [new DRB.Models.IdValue("yes", "True"), new DRB.Models.IdValue("no", "False")]; // Dataverse Execute
    DRB.Settings.OptionsManageFile = [new DRB.Models.IdValue("retrieve", "Retrieve"), new DRB.Models.IdValue("upload", "Upload"), new DRB.Models.IdValue("delete", "Delete")]; // Manage File Data
    DRB.Settings.OptionsImpersonation = [new DRB.Models.IdValue("mscrmcallerid", "SystemUser Id"), new DRB.Models.IdValue("callerobjectid", "AAD Object Id")]; // Impersonation
    // #endregion

    // #region Operators
    var optNeNull = new DRB.Models.IdValue("ne null", "Contains Data");
    var optEqNull = new DRB.Models.IdValue("eq null", "Does Not Contain Data");

    var optEq = new DRB.Models.IdValue("eq", "Equals");
    var optNe = new DRB.Models.IdValue("ne", "Does Not Equal");

    var optContain = new DRB.Models.IdValue("contains", "Contains");
    var optNotContain = new DRB.Models.IdValue("not contains", "Does Not Contain");

    var optBegin = new DRB.Models.IdValue("startswith", "Begins With");
    var optNotBegin = new DRB.Models.IdValue("not startswith", "Does Not Begin With");

    var optEnd = new DRB.Models.IdValue("endswith", "Ends With");
    var optNotEnd = new DRB.Models.IdValue("not endswith", "Does Not End With");

    var optGreater = new DRB.Models.IdValue("gt", "Is Greater Than");
    var optGreaterEqual = new DRB.Models.IdValue("ge", "Is Greater Than or Equal To");
    var optLess = new DRB.Models.IdValue("lt", "Is Less Than");
    var optLessEqual = new DRB.Models.IdValue("le", "Is Less Than or Equal To");

    var optOn = new DRB.Models.IdValue("eq", "On");
    var optNotOn = new DRB.Models.IdValue("ne", "Not On");
    var optAfter = new DRB.Models.IdValue("gt", "After");
    var optOnOrAfter = new DRB.Models.IdValue("ge", "On or After");
    var optBefore = new DRB.Models.IdValue("lt", "Before");
    var optOnOrBefore = new DRB.Models.IdValue("le", "On or Before");

    var optIn = new DRB.Models.IdValue("In", "Equals");
    var optNotIn = new DRB.Models.IdValue("NotIn", "Does Not Equal");
    var optContainValues = new DRB.Models.IdValue("ContainValues", "Contain Values");
    var optNotContainValues = new DRB.Models.IdValue("DoesNotContainValues", "Does Not Contain Values");

    var optEqCurrentUser = new DRB.Models.IdValue("EqualUserId", "Equals Current User");
    var optNeCurrentUser = new DRB.Models.IdValue("NotEqualUserId", "Does Not Equal Current User");
    var optEqCurrentUserHierarchy = new DRB.Models.IdValue("EqualUserOrUserHierarchy", "Equals Current User Or Their Reporting Hierarchy");
    var optEqCurrentUserHierarchyAndTeams = new DRB.Models.IdValue("EqualUserOrUserHierarchyAndTeams", "Equals Current User And Their Teams Or Their Reporting Hierarchy And Their Teams");
    var optEqCurrentUserTeams = new DRB.Models.IdValue("EqualUserTeams", "Equals Current User's Teams");
    var optEqCurrentUserOrTeams = new DRB.Models.IdValue("EqualUserOrUserTeams", "Equals Current User Or User's Teams");
    var optEqCurrentBusinessUnit = new DRB.Models.IdValue("EqualBusinessId", "Equals Current Business Unit");
    var optNeCurrentBusinessUnit = new DRB.Models.IdValue("NotEqualBusinessId", "Does Not Equal Business Unit");

    // Datetime operators (no required value)
    var optYesterday = new DRB.Models.IdValue("Yesterday", "Yesterday");
    var optToday = new DRB.Models.IdValue("Today", "Today");
    var optTomorrow = new DRB.Models.IdValue("Tomorrow", "Tomorrow");
    var optNext7Days = new DRB.Models.IdValue("Next7Days", "Next 7 Days");
    var optLast7Days = new DRB.Models.IdValue("Last7Days", "Last 7 Days");
    var optNextWeek = new DRB.Models.IdValue("NextWeek", "Next Week");
    var optLastWeek = new DRB.Models.IdValue("LastWeek", "Last Week");
    var optThisWeek = new DRB.Models.IdValue("ThisWeek", "This Week");
    var optNextMonth = new DRB.Models.IdValue("NextMonth", "Next Month");
    var optLastMonth = new DRB.Models.IdValue("LastMonth", "Last Month");
    var optThisMonth = new DRB.Models.IdValue("ThisMonth", "This Month");
    var optNextYear = new DRB.Models.IdValue("NextYear", "Next Year");
    var optLastYear = new DRB.Models.IdValue("LastYear", "Last Year");
    var optThisYear = new DRB.Models.IdValue("ThisYear", "This Year");
    var optNextFiscalYear = new DRB.Models.IdValue("NextFiscalYear", "Next Fiscal Year");
    var optLastFiscalYear = new DRB.Models.IdValue("LastFiscalYear", "Last Fiscal Year");
    var optThisFiscalYear = new DRB.Models.IdValue("ThisFiscalYear", "This Fiscal Year");
    var optNextFiscalPeriod = new DRB.Models.IdValue("NextFiscalPeriod", "Next Fiscal Period");
    var optLastFiscalPeriod = new DRB.Models.IdValue("LastFiscalPeriod", "Last Fiscal Period");
    var optThisFiscalPeriod = new DRB.Models.IdValue("ThisFiscalPeriod", "This Fiscal Period");

    // Datetime operators (required value)
    var optNextXHours = new DRB.Models.IdValue("NextXHours", "Next X Hours");
    var optLastXHours = new DRB.Models.IdValue("LastXHours", "Last X Hours");
    var optNextXDays = new DRB.Models.IdValue("NextXDays", "Next X Days");
    var optLastXDays = new DRB.Models.IdValue("LastXDays", "Last X Days");
    var optNextXWeeks = new DRB.Models.IdValue("NextXWeeks", "Next X Weeks");
    var optLastXWeeks = new DRB.Models.IdValue("LastXWeeks", "Last X Weeks");
    var optNextXMonths = new DRB.Models.IdValue("NextXMonths", "Next X Months");
    var optLastXMonths = new DRB.Models.IdValue("LastXMonths", "Last X Months");
    var optNextXYears = new DRB.Models.IdValue("NextXYears", "Next X Years");
    var optLastXYears = new DRB.Models.IdValue("LastXYears", "Last X Years");
    var optNextXFiscalYears = new DRB.Models.IdValue("NextXFiscalYears", "Next X Fiscal Years");
    var optLastXFiscalYears = new DRB.Models.IdValue("LastXFiscalYears", "Last X Fiscal Years");
    var optNextXFiscalPeriods = new DRB.Models.IdValue("NextXFiscalPeriods", "Next X Fiscal Periods");
    var optLastXFiscalPeriods = new DRB.Models.IdValue("LastXFiscalPeriods", "Last X Fiscal Periods");
    var optOlderThanXMinutes = new DRB.Models.IdValue("OlderThanXMinutes", "Older Than X Minutes");
    var optOlderThanXHours = new DRB.Models.IdValue("OlderThanXHours", "Older Than X Hours");
    var optOlderThanXDays = new DRB.Models.IdValue("OlderThanXDays", "Older Than X Days");
    var optOlderThanXWeeks = new DRB.Models.IdValue("OlderThanXWeeks", "Older Than X Weeks");
    var optOlderThanXMonths = new DRB.Models.IdValue("OlderThanXMonths", "Older Than X Months");
    var optOlderThanXYears = new DRB.Models.IdValue("OlderThanXYears", "Older Than X Years");

    // Hierarchy Primary Key operators
    var optAbove = new DRB.Models.IdValue("Above", "Above");
    var optAboveOrEqual = new DRB.Models.IdValue("AboveOrEqual", "Above Or Equals");
    var optNotUnder = new DRB.Models.IdValue("NotUnder", "Not Under");
    var optUnder = new DRB.Models.IdValue("Under", "Under");
    var optUnderOrEqual = new DRB.Models.IdValue("UnderOrEqual", "Under Or Equals");

    DRB.Settings.OptionsOperatorBasic = [optEq, optNe, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorHierarchyPrimaryKey = [optEq, optNe, optNeNull, optEqNull, optAbove, optAboveOrEqual, optNotUnder, optUnder, optUnderOrEqual];
    DRB.Settings.OptionsOperatorLookupBusinessUnit = [optEq, optNe, optNeNull, optEqNull, optEqCurrentBusinessUnit, optNeCurrentBusinessUnit];
    DRB.Settings.OptionsOperatorLookupUser = [optEq, optNe, optNeNull, optEqNull, optEqCurrentUser, optNeCurrentUser];
    DRB.Settings.OptionsOperatorOwner = [optEq, optNe, optNeNull, optEqNull, optEqCurrentUser, optNeCurrentUser, optEqCurrentUserHierarchy, optEqCurrentUserHierarchyAndTeams, optEqCurrentUserTeams, optEqCurrentUserOrTeams];
    DRB.Settings.OptionsOperatorString = [optEq, optNe, optContain, optNotContain, optBegin, optNotBegin, optEnd, optNotEnd, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorMemo = [optContain, optNotContain, optBegin, optNotBegin, optEnd, optNotEnd, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorPicklist = [optEq, optNe, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorMultiPicklist = [optIn, optNotIn, optContainValues, optNotContainValues, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorNumber = [optEq, optNe, optGreater, optGreaterEqual, optLess, optLessEqual, optNeNull, optEqNull];
    DRB.Settings.OptionsOperatorDateTime = [optOn, optNotOn, optAfter, optOnOrAfter, optBefore, optOnOrBefore, optNeNull, optEqNull,
        optYesterday, optToday, optTomorrow, optNext7Days, optLast7Days, optNextWeek, optLastWeek, optThisWeek, optNextMonth, optLastMonth, optThisMonth, optNextYear, optLastYear, optThisYear, optNextFiscalYear, optLastFiscalYear, optThisFiscalYear, optNextFiscalPeriod, optLastFiscalPeriod, optThisFiscalPeriod,
        optNextXHours, optLastXHours, optNextXDays, optLastXDays, optNextXWeeks, optLastXWeeks, optNextXMonths, optLastXMonths, optNextXYears, optLastXYears, optNextXFiscalYears, optLastXFiscalYears, optNextXFiscalPeriods, optLastXFiscalPeriods,
        optOlderThanXMinutes, optOlderThanXHours, optOlderThanXDays, optOlderThanXWeeks, optOlderThanXMonths, optOlderThanXYears];

    DRB.Settings.OperatorsToStop = [optNeNull, optEqNull, optEqCurrentUser, optNeCurrentUser, optEqCurrentUserHierarchy, optEqCurrentUserHierarchyAndTeams, optEqCurrentUserTeams, optEqCurrentUserOrTeams, optEqCurrentBusinessUnit, optNeCurrentBusinessUnit,
        optYesterday, optToday, optTomorrow, optNext7Days, optLast7Days, optNextWeek, optLastWeek, optThisWeek, optNextMonth, optLastMonth, optThisMonth, optNextYear, optLastYear, optThisYear, optNextFiscalYear, optLastFiscalYear, optThisFiscalYear, optNextFiscalPeriod, optLastFiscalPeriod, optThisFiscalPeriod];
    // #endregion

    // #region Postman Export Settings
    DRB.Settings.PostmanGrantType = [new DRB.Models.IdValue("implicit", "Implicit"), new DRB.Models.IdValue("client_credentials", "Client Credentials")];
    DRB.Settings.PostmanEndpoint = [new DRB.Models.IdValue("v1", "Token Endpoint V1"), new DRB.Models.IdValue("v2", "Token Endpoint V2")];
    // #endregion

    DRB.Settings.TimeoutDelay = 500; // used in the setTimout calls
}

/**
 * Define Operations
 */
DRB.DefineOperations = function () {
    // #region Menu
    var inp_LoadFile = DRB.UI.CreateInputFile(DRB.DOM.Collection.LoadInput.Id, true, DRB.Collection.Parse);
    var btn_NewCollection = DRB.UI.CreateButton(DRB.DOM.Collection.NewButton.Id, DRB.DOM.Collection.NewButton.Name, DRB.DOM.Collection.NewButton.Class, DRB.Collection.New);
    var btn_LoadCollection = DRB.UI.CreateButton(DRB.DOM.Collection.LoadButton.Id, DRB.DOM.Collection.LoadButton.Name, DRB.DOM.Collection.LoadButton.Class, DRB.Collection.Load);
    var btn_SaveCollection = DRB.UI.CreateButton(DRB.DOM.Collection.SaveButton.Id, DRB.DOM.Collection.SaveButton.Name, DRB.DOM.Collection.SaveButton.Class, DRB.Collection.Save);
    var btn_ExportPostmanCollection = DRB.UI.CreateButton(DRB.DOM.Collection.ExportPostmanButton.Id, DRB.DOM.Collection.ExportPostmanButton.Name, DRB.DOM.Collection.ExportPostmanButton.Class, DRB.Collection.ExportPostman);

    var menu = $("#" + DRB.DOM.Collection.Menu.Id);
    menu.append(inp_LoadFile);
    menu.append(btn_NewCollection);
    menu.append(btn_LoadCollection);
    menu.append(btn_SaveCollection);
    menu.append(DRB.UI.CreateEmptyDiv(DRB.DOM.Collection.Separator.Id, DRB.DOM.Collection.Separator.Class));
    menu.append(btn_ExportPostmanCollection);
    // #endregion

    // #region jsTree
    $("#" + DRB.DOM.TreeView.Id).jstree({
        "core": { "data": [], "themes": { "dots": false }, "check_callback": true }, // default settings
        "contextmenu": { // right click menu
            "select_node": false,
            "items": function (node) {
                var customItems = {
                    "createrequest": {
                        "label": "Create Request",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            inst.create_node(obj, { "type": "request", "text": "New Request" }, "last", function (new_node) {
                                try { inst.edit(new_node); } catch (ex) { setTimeout(function () { inst.edit(new_node); }, 0); }
                            });
                        }
                    },
                    "createfolder": {
                        "label": "Create Folder",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            inst.create_node(obj, { "type": "folder", "text": "New Folder" }, "last", function (new_node) {
                                try { inst.edit(new_node); } catch (ex) { setTimeout(function () { inst.edit(new_node); }, 0); }
                            });
                        }
                    },
                    "duplicaterequest": {
                        "label": "Duplicate",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            var position = $.inArray(obj.id, inst.get_node(obj.parent).children);
                            inst.create_node(obj.parent, { "type": "request", "data": obj.data, "text": obj.text + " - Copy" }, position + 1);
                        }
                    },
                    "duplicatefolder": {
                        "label": "Duplicate",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            var position = $.inArray(obj.id, inst.get_node(obj.parent).children);
                            inst.create_node(obj.parent, { "type": "folder", "text": obj.text + " - Copy" }, position + 1, function (new_node) {
                                function deep_duplicate(childNode, parentNode) {
                                    if (childNode.children.length === 0) { return; }
                                    for (var count = 0; count < childNode.children.length; count++) {
                                        var objChild = inst.get_node(childNode.children[count]);
                                        inst.create_node(parentNode, { "type": objChild.type, "data": objChild.data, "text": objChild.text });
                                        deep_duplicate(inst.get_node(childNode.children[count]), inst.get_node(parentNode.children[count]));
                                    }
                                }
                                deep_duplicate(obj, new_node);
                            });
                        }
                    },
                    "rename": {
                        "label": "Rename",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            inst.edit(obj);
                        }
                    },
                    "remove": {
                        "label": "Delete",
                        "action": function (data) {
                            var questionTitle = "";
                            var questionText = "";
                            switch (node.type) {
                                case "collection":
                                    questionTitle = "Delete Collection";
                                    questionText = "Are you sure to delete the collection?<br/><u>All the folders and requests will be deleted</u>";
                                    break;
                                case "folder":
                                    questionTitle = "Delete Folder";
                                    questionText = "Are you sure to delete the folder <b>" + node.text + "</b>?<br/><u>All the folders and requests inside this folder will be deleted</u>";
                                    break;
                                case "request":
                                    questionTitle = "Delete Request";
                                    questionText = "Are you sure to delete the request <b>" + node.text + "</b>?";
                                    break;
                            }
                            DRB.UI.ShowQuestion(questionTitle, questionText, null,
                                function () {
                                    var inst = $.jstree.reference(data.reference);
                                    var obj = inst.get_node(data.reference);
                                    if (inst.is_selected(obj)) { inst.delete_node(inst.get_selected()); } else { inst.delete_node(obj); }
                                    if (node.type === "collection" && DRB.Settings.LocalStorageAvailable === true) {
                                        localStorage.removeItem("DRB_" + DRB.Xrm.GetClientUrl());
                                    }
                                });
                        }
                    },
                    "savestate": {
                        "separator_before": true,
                        "label": "Save State",
                        "action": function (data) {
                            var inst = $.jstree.reference(data.reference);
                            var currentNodes = inst.get_json("#");
                            var now = new Date(); // get current DateTime
                            var collection = {}; // create json collection
                            collection.created_on = now.toJSON(); // current DateTime as json 
                            collection.version = 1; // collection version                            
                            DRB.Collection.ExportNodes(currentNodes[0], collection); // export jsTree nodes to the json collection
                            localStorage.setItem("DRB_" + DRB.Xrm.GetClientUrl(), JSON.stringify(collection));
                        }
                    }
                };
                // delete entries based on the node type
                if (node.type === "collection") {
                    delete customItems.duplicaterequest; delete customItems.duplicatefolder;
                    if (DRB.Settings.LocalStorageAvailable !== true) {
                        delete customItems.savestate;
                    }
                }
                if (node.type === "folder") { delete customItems.duplicaterequest; delete customItems.savestate; }
                if (node.type === "request") { delete customItems.createfolder; delete customItems.duplicatefolder; delete customItems.createrequest; delete customItems.savestate; }
                return customItems;
            }
        },
        "types": { // node types
            "#": { "valid_children": ["collection"] }, // "root" can have only "collection" nodes
            "collection": { "icon": "hide-icon", "valid_children": ["folder", "request"] }, // "collection" can have only "folder" and "request" nodes, no icon
            "folder": { "valid_children": ["folder", "request"] }, // "folder" can have only "folder" and "request" nodes, default icon
            "request": { "icon": "jstree-file", "valid_children": [] } // "request" can't have nodes, file icon
        },
        "plugins": ["dnd", "types", "contextmenu"] // drag and drop, node types, right click menu 
    });

    $("#" + DRB.DOM.TreeView.Id).on("select_node.jstree", function (e, data) {
        data.instance.toggle_node(data.selected);  // single click to expand
        DRB.Logic.EditRequest(data.node);
    });

    $("#" + DRB.DOM.TreeView.Id).on("rename_node.jstree", function (e, obj) {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode)) {
            if (DRB.Metadata.CurrentNode.type === "request" && DRB.Metadata.CurrentNode.id === obj.node.id) {
                $("#" + DRB.DOM.RequestType.Div.Id).text(obj.node.text);
            }
        }
    });

    $("#" + DRB.DOM.TreeView.Id).on("delete_node.jstree", function (e, obj) {
        if (DRB.Utilities.HasValue(DRB.Metadata.CurrentNode)) {
            if (DRB.Metadata.CurrentNode.id === obj.node.id || DRB.Metadata.CurrentNode.parents.indexOf(obj.node.id) > -1) {
                DRB.Metadata.CurrentNode = null;
                $("#" + DRB.DOM.MainContent.Id).hide();
            }
        }
    });
    // #endregion

    // #region Request Type
    var container = DRB.UI.CreateWideContainerWithId(DRB.DOM.RequestType.Div.Id, DRB.DOM.RequestType.Div.Name);
    $("#" + DRB.DOM.MainContent.Id).append(container);
    container.append(DRB.UI.CreateSpan(DRB.DOM.RequestType.Span.Id, DRB.DOM.RequestType.Span.Name));
    container.append(DRB.UI.CreateSimpleDropdown(DRB.DOM.RequestType.Dropdown.Id));
    container.append(DRB.UI.CreateSpacer());
    DRB.UI.FillDropdown(DRB.DOM.RequestType.Dropdown.Id, DRB.DOM.RequestType.Dropdown.Name, new DRB.Models.Records(DRB.Settings.RequestTypes).ToDropdown(), false, false, false, 16);
    DRB.Logic.BindRequestType(DRB.DOM.RequestType.Dropdown.Id);
    // #endregion

    // #region Tabs
    DRB.Settings.Tabs = [];
    DRB.Settings.Tabs.push({ Id: "configure", Name: "Configure", ConfigureContent: true });
    DRB.Settings.Tabs.push({ Id: "code_xrmwebapi", Name: "Xrm.WebApi", GenerateCode: true, ShowEditor: true, EditorMode: "javascript", CopyCode: true, MoveToEditor: true, ShowWarning: true, WarningXrmWebApi: true, DisabledRequests: ["managefiledata", "manageimagedata"] });
    DRB.Settings.Tabs.push({ Id: "code_xrmwebapiexecute", Name: "Xrm.WebApi execute", GenerateCode: true, ShowEditor: true, EditorMode: "javascript", CopyCode: true, MoveToEditor: true, ShowWarning: true, WarningXrmWebApi: true, EnabledRequests: ["retrievesingle", "create", "update", "delete"] });
    DRB.Settings.Tabs.push({ Id: "code_fetchapi", Name: "Fetch", GenerateCode: true, ShowEditor: true, EditorMode: "javascript", CopyCode: true, MoveToEditor: true, ShowWarning: true, WarningClientUrl: true });
    DRB.Settings.Tabs.push({ Id: "code_jquery", Name: "jQuery", GenerateCode: true, ShowEditor: true, EditorMode: "javascript", CopyCode: true, MoveToEditor: true, ShowWarning: true, WarningClientUrl: true });
    DRB.Settings.Tabs.push({ Id: "code_xmlhttprequest", Name: "XHR", ShowEditor: true, EditorMode: "javascript", GenerateCode: true, CopyCode: true, MoveToEditor: true, ShowWarning: true, WarningClientUrl: true });
    DRB.Settings.Tabs.push({ Id: "code_portals", Name: "Portals", GenerateCode: true, ShowEditor: true, EditorMode: "javascript", CopyCode: true, MoveToEditor: true, ShowWarning: true, WarningPortals: true, EnabledRequests: ["retrievesingle", "retrievemultiple", "create", "update", "delete", "associate", "disassociate"] });
    DRB.Settings.Tabs.push({ Id: "code_editor", Name: "Editor", ShowEditor: true, EditorMode: "javascript", CopyCode: true, Execute: true, ShowWarning: true, WarningEditor: true });
    DRB.Settings.Tabs.push({ Id: "code_results", Name: "Results", ShowEditor: true, EditorMode: "json", CopyCode: true, Results: true, ShowWarning: true, WarningResults: true });
    // DRB.Settings.Tabs.push({ Id: "code_typescript", Name: "TypeScript", GenerateCode: true, ShowEditor: true, EditorMode: "typescript", CopyCode: true, ShowWarning: true, WarningClientUrl: true });
    DRB.Settings.Tabs.push({ Id: "code_powerautomate", Name: "Power Automate", GenerateCode: true, EmptyDiv: true, EnabledRequests: ["retrievesingle", "retrievemultiple"] });

    var tabs_Request = DRB.UI.CreateTabs(DRB.DOM.TabsRequest.Id, DRB.Settings.Tabs);
    var tabs_Content = DRB.UI.CreateTabContents(DRB.DOM.TabsContent.Id, DRB.Settings.Tabs);

    $("#" + DRB.DOM.MainContent.Id).append(tabs_Request);
    $("#" + DRB.DOM.MainContent.Id).append(tabs_Content);

    DRB.Settings.Tabs.forEach(function (tab) {
        $("#" + tab.Id).append(DRB.UI.CreateSpacer());

        if (DRB.Utilities.HasValue(tab.ConfigureContent) && tab.ConfigureContent === true) {
            $("#" + tab.Id).append(DRB.UI.CreateEmptyDiv(DRB.DOM.ConfigureContent.Id));
        }

        if (DRB.Utilities.HasValue(tab.CopyCode) && tab.CopyCode === true) {
            if (DRB.Utilities.HasValue(tab.Results) && tab.Results === true) {
                var btn_copyResults = DRB.UI.CreateButton("btn_" + tab.Id + "_copy", "Copy Results", "btn-secondary", DRB.Logic.CopyCodeFromEditor, tab.Id);
                $("#" + tab.Id).append(btn_copyResults);
            } else {
                var btn_copyCode = DRB.UI.CreateButton("btn_" + tab.Id + "_copy", "Copy Code", "btn-secondary", DRB.Logic.CopyCodeFromEditor, tab.Id);
                $("#" + tab.Id).append(btn_copyCode);
            }
        }

        if (DRB.Utilities.HasValue(tab.MoveToEditor) && tab.MoveToEditor === true) {
            var btn_moveCode = DRB.UI.CreateButton("btn_" + tab.Id + "_move", "Move Code to Editor", "btn-secondary", DRB.Logic.MoveCodeToMainEditor, tab.Id);
            $("#" + tab.Id).append(btn_moveCode);
        }

        if (DRB.Utilities.HasValue(tab.Execute) && tab.Execute === true) {
            var btn_executeCode = DRB.UI.CreateButton("btn_" + tab.Id + "_execute", "Execute Code", "btn-danger", DRB.Logic.ExecuteCodeFromEditor);
            $("#" + tab.Id).append(btn_executeCode);
        }

        if (DRB.Utilities.HasValue(tab.ShowWarning) && tab.ShowWarning === true) {
            $("#" + tab.Id).append(DRB.UI.CreateSpan(DRB.DOM.TabsWarning.Id + tab.Id, ""));
        }

        if (DRB.Utilities.HasValue(tab.ShowEditor) && tab.ShowEditor === true) {
            $("#" + tab.Id).append(DRB.UI.CreateSpacer());
            $("#" + tab.Id).append(DRB.UI.CreateEmptyDiv(tab.Id + "_editor", "code_editor"));
        }

        if (DRB.Utilities.HasValue(tab.EmptyDiv) && tab.EmptyDiv === true) {
            $("#" + tab.Id).append(DRB.UI.CreateEmptyDiv(tab.Id + "_div"));
        }
    });
    // #endregion

    // #region Editors
    DRB.Settings.Editors = [];
    DRB.Settings.TabExecute = "";
    DRB.Settings.TabResults = "";

    DRB.Settings.Tabs.forEach(function (tab) {
        if (DRB.Utilities.HasValue(tab.Execute) && tab.Execute === true) { DRB.Settings.TabExecute = tab.Id; }
        if (DRB.Utilities.HasValue(tab.Results) && tab.Results === true) { DRB.Settings.TabResults = tab.Id; }

        if (DRB.Utilities.HasValue(tab.ShowEditor) && tab.ShowEditor === true) {
            DRB.Settings.Editors[tab.Id] = ace.edit(tab.Id + "_editor", { useWorker: false });
            DRB.Settings.Editors[tab.Id].setShowPrintMargin(false);
            if (DRB.Utilities.HasValue(tab.EditorMode)) { DRB.Settings.Editors[tab.Id].session.setMode("ace/mode/" + tab.EditorMode); }
            if (DRB.Utilities.HasValue(tab.GenerateCode) && tab.GenerateCode === true) {
                DRB.Settings.Editors[tab.Id].setOptions({ readOnly: true });
            }
        }
    });
    // #endregion
}

/**
 * Hide Notice
 */
DRB.HideNotice = function () {
    $("#" + DRB.DOM.Notice.Div.Id).hide();
    $("#" + DRB.DOM.Notice.Button.Id).attr("onclick", "DRB.ShowNotice()").text("Show Notice");
}

/**
 * Show Notice
 */
DRB.ShowNotice = function () {
    $("#" + DRB.DOM.Notice.Div.Id).fadeIn();
    $("#" + DRB.DOM.Notice.Button.Id).attr("onclick", "DRB.HideNotice()").text("Hide Notice");
}

DRB.InsertMainBodyContent = function () {
    $("#" + DRB.DOM.MainBody.Id).html(`<div class="mainlayout col-lg-12">
            <div class="mainheader">
                <h3>Dataverse REST Builder <span id="` + DRB.DOM.VersionSpan.Id + `"></span> <span id="` + DRB.DOM.ContextSpan.Id + `"></span></h3>
                Created by Guido Preite <a target="_blank" href="https://www.twitter.com/crmanswers">Twitter</a> - <a target="_blank" href="https://www.linkedin.com/in/guidopreite/">LinkedIn</a> - <a target="_blank" href="https://github.com/GuidoPreite">GitHub</a> - <a target="_blank" href="https://www.crmanswers.net">Blog</a>
            </div>
            <div class="topborder maincontent split">
                <div id="` + DRB.DOM.Split.Menu.Id + `" style="margin-top: 10px; margin-right: 24px;">
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="btn_file" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">File</button>
                        <div class="dropdown-menu" aria-labelledby="btn_file" id="` + DRB.DOM.Collection.Menu.Id + `"></div>
                        <button id="` + DRB.DOM.Notice.Button.Id + `" type="button" class="btn btn-secondary">Show Notice</button>
                    </div>
                    <br />
                    <div id="` + DRB.DOM.TreeView.Id + `"></div>
                </div>
                <div id="` + DRB.DOM.Split.Content.Id + `" style="margin-left: 10px; margin-top: 10px;">
                    <div id="` + DRB.DOM.Notice.Div.Id + `" class="notice" style="display: none;">
                        The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
                        <br />
                        <br />
                        Dataverse REST Builder is able to create, update and execute requests against the Dataverse Web API endpoint.<br />
                        <span class="notice-red">Many of the requests generated inside this tool can modify the data if they are executed, please proceed with caution.</span>
                        <br /><br />
                    </div>
                    <div id="` + DRB.DOM.MainContent.Id + `" style="display: none;"></div>
                </div>
            </div>
        </div>`);
}

/**
 * Main function called by the Index
 */
DRB.Initialize = async function () {
    // DRB Version
    var drbVersion = "1.0.0.22";
    document.title = document.title + " " + drbVersion;
    $("#" + DRB.DOM.VersionSpan.Id).html(drbVersion);

    // localStorage
    DRB.Settings.LocalStorageAvailable = DRB.Utilities.LocalStorageAvailable();

    // #region XTB
    DRB.Settings.XTBContext = false;
    var xtbSettings = null;
    try {
        if (DRB.Utilities.HasValue(chrome) && DRB.Utilities.HasValue(chrome.webview) && DRB.Utilities.HasValue(chrome.webview.hostObjects)) {
            xtbSettings = chrome.webview.hostObjects.xtbSettings;
        }
    } catch { }

    if (DRB.Utilities.HasValue(xtbSettings)) {
        DRB.Settings.XTBToken = await xtbSettings.Token;
        DRB.Settings.XTBUrl = await xtbSettings.Url;
        DRB.Settings.XTBVersion = await xtbSettings.Version;
        if (DRB.Utilities.HasValue(DRB.Settings.XTBToken) && DRB.Utilities.HasValue(DRB.Settings.XTBUrl) && DRB.Utilities.HasValue(DRB.Settings.XTBVersion)) {
            DRB.Settings.XTBUrl = DRB.Settings.XTBUrl.replace(/\/$/, ""); // clean url from trailing slash
            DRB.Settings.XTBContext = true;
        }
    }
    // #endregion

    // #region JWT
    DRB.Settings.JWTContext = false;
    if (DRB.Xrm.IsXTBMode() === false && DRB.Settings.LocalStorageAvailable === true) {
        try {
            if (localStorage.getItem("DRB_JWT") !== null) {
                var removeToken = true;
                var token = localStorage.getItem("DRB_JWT");
                var parsedToken = DRB.Common.ParseJWT(token);
                if (DRB.Utilities.HasValue(parsedToken)) {
                    var jwtUrl = parsedToken.aud;
                    var jwtExpireDate = parsedToken.exp * 1000;
                    var now = new Date().getTime();
                    if (DRB.Utilities.HasValue(jwtUrl) && jwtExpireDate > now) {
                        jwtUrl = jwtUrl.replace(/\/$/, ""); // clean url from trailing slash
                        DRB.UI.ShowLoading("Checking JWT Settings...");
                        try {
                            await DRB.Xrm.GetServerVersion(jwtUrl, token).done(function (data) {
                                DRB.Settings.JWTToken = token;
                                DRB.Settings.JWTUrl = jwtUrl;
                                DRB.Settings.JWTVersion = data.Version;
                                DRB.Settings.JWTContext = true;
                                removeToken = false;
                            });
                        } catch { }
                        DRB.UI.HideLoading();
                    }
                }
                if (removeToken === true) { localStorage.removeItem("DRB_JWT"); }
            }
        } catch {
            // something went wrong, remove the token
            localStorage.removeItem("DRB_JWT");
        }
    }
    // #endregion

    // #region DVDT
    DRB.Settings.DVDTContext = false;
    // #endregion

    DRB.HideNotice();
    Split(["#" + DRB.DOM.Split.Menu.Id, "#" + DRB.DOM.Split.Content.Id], { sizes: [10, 90], minSize: 200, gutterSize: 5 }); // Split
    DRB.SetDefaultSettings();
    DRB.DefineOperations();

    // Tab script
    $(document).ready(function () {
        $("#" + DRB.DOM.TabsRequest.Id + " a").click(function (e) {
            e.preventDefault();
            if (e.target.id.length > 2 && e.target.id.indexOf("a_") === 0) {
                var tabName = e.target.id.substring(2);
                var checkTab = DRB.Utilities.GetRecordById(DRB.Settings.Tabs, tabName);
                if (DRB.Utilities.HasValue(checkTab) && checkTab.GenerateCode === true) {
                    DRB.GenerateCode.Start();
                }
            }
            $(this).tab('show');
        });
    });

    // Complete Initialize
    DRB.Logic.CompleteInitialize();
}
// #endregion  
 
