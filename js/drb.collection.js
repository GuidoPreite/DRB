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

// #region Postman
/**
 * Collection - Bind Postman Endpoint
 * @param {string} id Id
*/
DRB.Collection.BindPostmanEndpoint = function (id) {
    $("#" + id).on("change", function (e) {
        var endpoint = $(this).val();
        var dom = DRB.DOM.Collection.Postman;
        switch (endpoint) {
            case "v1":
                $("#" + dom.ScopeInput.Id).val("");
                $("#" + dom.ResourceInput.Id).val("{{url}}");
                $("#" + dom.AccessTokenInput.Id).val("https://login.microsoftonline.com/{{tenantid}}/oauth2/token");
                break;
            case "v2":
                $("#" + dom.ScopeInput.Id).val("{{url}}/.default");
                $("#" + dom.ResourceInput.Id).val("");
                $("#" + dom.AccessTokenInput.Id).val("https://login.microsoftonline.com/{{tenantid}}/oauth2/v2.0/token");
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
        var dom = DRB.DOM.Collection.Postman;
        $("#" + dom.SettingsDiv.Id).empty();
        var divTable = DRB.UI.CreateTable(dom.Table.Id);
        $("#" + dom.SettingsDiv.Id).append(divTable);

        switch (grantType) {
            case "implicit":
                var implicitSettings = ["Url", "ClientId", "AuthUrl", "CallbackUrl"];
                implicitSettings.forEach(function (setting) {
                    var tr = DRB.UI.CreateTr(dom.Tr.Id + dom[setting + "Span"].Id);
                    var tdLabel = DRB.UI.CreateTd(dom.TdLabel.Id + dom[setting + "Span"].Id);
                    var tdValue = DRB.UI.CreateTd(dom.TdValue.Id + dom[setting + "Span"].Id);
                    divTable.append(tr);
                    tr.append(tdLabel);
                    tr.append(tdValue);

                    tdLabel.append(DRB.UI.CreateSpan(dom[setting + "Span"].Id, dom[setting + "Span"].Name, dom[setting + "Span"].SmallText));
                    tdValue.append(DRB.UI.CreateInputLongString(dom[setting + "Input"].Id, null, dom[setting + "Span"].Name));
                });
                $("#" + dom.UrlInput.Id).val(DRB.Xrm.GetClientUrl());
                $("#" + dom.ClientIdInput.Id).val("51f81489-12ee-4a9e-aaae-a2591f45987d");
                $("#" + dom.AuthUrlInput.Id).val("https://login.microsoftonline.com/common/oauth2/authorize?resource={{url}}");
                $("#" + dom.CallbackUrlInput.Id).val("https://callbackurl");

                break;

            case "client_credentials":
                var clientCredentialSettings = ["Url", "ClientId", "ClientSecret", "TenantId", "Endpoint", "AccessToken", "Scope", "Resource"];
                clientCredentialSettings.forEach(function (setting) {
                    var tr = DRB.UI.CreateTr(dom.Tr.Id + dom[setting + "Span"].Id);
                    var tdLabel = DRB.UI.CreateTd(dom.TdLabel.Id + dom[setting + "Span"].Id);
                    var tdValue = DRB.UI.CreateTd(dom.TdValue.Id + dom[setting + "Span"].Id);
                    divTable.append(tr);
                    tr.append(tdLabel);
                    tr.append(tdValue);

                    tdLabel.append(DRB.UI.CreateSpan(dom[setting + "Span"].Id, dom[setting + "Span"].Name, dom[setting + "Span"].SmallText));
                    if (setting === "Endpoint") {
                        tdValue.append(DRB.UI.CreateSimpleDropdown(dom.EndpointDropdown.Id));

                    } else {
                        tdValue.append(DRB.UI.CreateInputLongString(dom[setting + "Input"].Id, null, dom[setting + "Span"].Name));
                    }
                });
                $("#" + dom.UrlInput.Id).val(DRB.Xrm.GetClientUrl());
                DRB.UI.FillDropdown(dom.EndpointDropdown.Id, dom.EndpointDropdown.Name, new DRB.Models.Records(DRB.Settings.PostmanEndpoint).ToDropdown());
                DRB.Collection.BindPostmanEndpoint(dom.EndpointDropdown.Id);
                $("#" + dom.EndpointDropdown.Id).val(DRB.Settings.PostmanEndpoint[1].Id).change();
                break;
        }
    });
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
 * Collection - Export Postman File
 */
DRB.Collection.ExportPostmanFile = function () {
    // get jsTree data structure
    var currentNodes = $("#" + DRB.DOM.TreeView.Id).jstree(true).get_json("#");
    var dom = DRB.DOM.Collection.Postman;
    var grantType = $("#" + dom.GrantTypeDropdown.Id).val();
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
            collection.auth.oauth2.push({ key: "scope", value: $("#" + dom.ScopeInput.Id).val(), type: "string" });
            collection.auth.oauth2.push({ key: "accessTokenUrl", value: $("#" + dom.AccessTokenInput.Id).val(), type: "string" });
            var resourceValue = $("#" + dom.ResourceInput.Id).val();
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
    collection.variable.push({ key: "url", value: $("#" + dom.UrlInput.Id).val() });
    switch (grantType) {
        case "implicit":
            collection.variable.push({ key: "clientid", value: $("#" + dom.ClientIdInput.Id).val() });
            collection.variable.push({ key: "authurl", value: $("#" + dom.AuthUrlInput.Id).val() });
            collection.variable.push({ key: "callback", value: $("#" + dom.CallbackUrlInput.Id).val() });
            break;
        case "client_credentials":
            collection.variable.push({ key: "clientid", value: $("#" + dom.ClientIdInput.Id).val() });
            collection.variable.push({ key: "clientsecret", value: $("#" + dom.ClientSecretInput.Id).val() });
            collection.variable.push({ key: "tenantid", value: $("#" + dom.TenantIdInput.Id).val() });
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
    if (currentNodes.length === 0) { DRB.UI.ShowError("Export as Postman Collection", "Create or Load a Collection before Export"); }
    else {
        var dom = DRB.DOM.Collection.Postman;
        var exportDiv = DRB.UI.CreateEmptyDiv(dom.Div.Id);

        exportDiv.append(DRB.UI.CreateSpan(dom.GrantTypeSpan.Id, dom.GrantTypeSpan.Name));
        exportDiv.append(DRB.UI.CreateSimpleDropdown(dom.GrantTypeDropdown.Id));
        exportDiv.append(DRB.UI.CreateSpacer());
        exportDiv.append(DRB.UI.CreateEmptyDiv(dom.SettingsDiv.Id));
        DRB.UI.ShowExport("Export as Postman Collection", exportDiv, "large", DRB.Collection.ExportPostmanFile);
        DRB.UI.FillDropdown(dom.GrantTypeDropdown.Id, dom.GrantTypeDropdown.Name, new DRB.Models.Records(DRB.Settings.PostmanGrantType).ToDropdown());
        DRB.Collection.BindPostmanGrantType(dom.GrantTypeDropdown.Id);
        $("#" + dom.GrantTypeDropdown.Id).val(DRB.Settings.PostmanGrantType[0].Id).change();
    }
}
// #endregion

// #region REST Client
/**
 * Collection - Bind REST Client Endpoint
 * @param {string} id Id
*/
DRB.Collection.BindRESTClientEndpoint = function (id) {
    $("#" + id).on("change", function (e) {
        var endpoint = $(this).val();
        var dom = DRB.DOM.Collection.RESTClient;
        switch (endpoint) {
            case "v1":
                $("#" + dom.ScopeInput.Id).val("");
                $("#" + dom.ResourceInput.Id).val("{{url}}");
                $("#" + dom.AccessTokenInput.Id).val("https://login.microsoftonline.com/{{tenantid}}/oauth2/token");
                break;
            case "v2":
                $("#" + dom.ScopeInput.Id).val("{{url}}/.default");
                $("#" + dom.ResourceInput.Id).val("");
                $("#" + dom.AccessTokenInput.Id).val("https://login.microsoftonline.com/{{tenantid}}/oauth2/v2.0/token");
                break;
        }
    });
}

/**
 * Collection - Export REST Client Environment File
 */
DRB.Collection.ExportRESTClientEnvironmentFile = function () {
    var dom = DRB.DOM.Collection.RESTClient;
    // get current DateTime
    var now = new Date();

    // create json environment
    var environment = {
        "rest-client.environmentVariables": {
            "$shared": {}, "DRB_Environment": {
                "url": $("#" + dom.UrlInput.Id).val(),
                "clientid": $("#" + dom.ClientIdInput.Id).val(),
                "clientsecret": $("#" + dom.ClientSecretInput.Id).val(),
                "tenantid": $("#" + dom.TenantIdInput.Id).val()
            }
        }
    };

    // create fileDate (coming from current DateTime) to be used inside a valid filename
    var fileDate = now.toLocaleString("sv").replace(/ /g, "_").replace(/-/g, "").replace(/:/g, "");
    // create the blob content holding the json collection
    var saveFile = new Blob([JSON.stringify(environment, null, "\t")], { type: "application/json" });
    // download the blob content with the provided filename
    var customLink = document.createElement("a");
    customLink.href = URL.createObjectURL(saveFile);
    customLink.download = "DRB_Environment_" + fileDate + ".settings.json";
    customLink.click();
}

/**
 * Collection - Export REST Client Environment 
 */
DRB.Collection.ExportRESTClientEnvironment = function () {
    var dom = DRB.DOM.Collection.RESTClient;
    var exportDiv = DRB.UI.CreateEmptyDiv(dom.Div.Id);
    exportDiv.append(DRB.UI.CreateEmptyDiv(dom.SettingsDiv.Id));

    DRB.UI.ShowExport("Export REST Client Environment", exportDiv, "large", DRB.Collection.ExportRESTClientEnvironmentFile);

    $("#" + dom.SettingsDiv.Id).append(DRB.UI.CreateSpan("", "NOTE: the exported settings.json should be considered a sample, please refer to <a href='https://github.com/Huachao/vscode-restclient#environments' target='_blank'>REST Client documentation</a>"));
    $("#" + dom.SettingsDiv.Id).append(DRB.UI.CreateSpacer());

    var divTable = DRB.UI.CreateTable(dom.Table.Id);
    $("#" + dom.SettingsDiv.Id).append(divTable);
    var enviromentSettings = ["Url", "ClientId", "ClientSecret", "TenantId"];

    enviromentSettings.forEach(function (setting) {
        var tr = DRB.UI.CreateTr(dom.Tr.Id + dom[setting + "Span"].Id);
        var tdLabel = DRB.UI.CreateTd(dom.TdLabel.Id + dom[setting + "Span"].Id);
        var tdValue = DRB.UI.CreateTd(dom.TdValue.Id + dom[setting + "Span"].Id);
        divTable.append(tr);
        tr.append(tdLabel);
        tr.append(tdValue);

        tdLabel.append(DRB.UI.CreateSpan(dom[setting + "Span"].Id, dom[setting + "Span"].Name, dom[setting + "Span"].SmallText));
        tdValue.append(DRB.UI.CreateInputLongString(dom[setting + "Input"].Id, null, dom[setting + "Span"].Name));
    });

    $("#" + dom.UrlInput.Id).val(DRB.Xrm.GetClientUrl());
}

/**
 * Collection - Export Nodes REST Client
 * @param {any} currentNode Current Node
 * @param {string[]} lines Lines
 */
DRB.Collection.ExportNodesRESTClient = function (currentNode, lines) {
    // recursive function to convert a jsTree node to a REST Client collection node
    //if (currentNode.type === "collection" || currentNode.type === "folder") { exportNode.item = []; }
    // if (currentNode.type === "folder" || currentNode.type === "request") { exportNode.name = currentNode.text; }
    if (currentNode.type === "request") {
        if (DRB.Utilities.HasValue(currentNode.data.requestType)) {
            lines.push("### " + currentNode.text);
            var postmanSettings = DRB.GeneratePostman.Start(currentNode.data.requestType, currentNode.data.configuration);
            lines.push(postmanSettings.postmanMethod + " " + postmanSettings.postmanUrl.raw);
            lines.push("Authorization: Bearer {{token}}");
            postmanSettings.postmanHeader.forEach(function (header) {
                lines.push(header.key + ": " + header.value);
            });
            if (postmanSettings.postmanMethod === "POST" || postmanSettings.postmanMethod === "PATCH") {
                lines.push("");
                lines.push(postmanSettings.postmanBody.raw);
            }
            lines.push("");
        }
    }
    if (currentNode.children.length === 0) { return; }
    for (var count = 0; count < currentNode.children.length; count++) {
        DRB.Collection.ExportNodesRESTClient(currentNode.children[count], lines);
    }
}

/**
 * Collection - Export REST Client Collection File
 */
DRB.Collection.ExportRESTClientCollectionFile = function () {
    // get jsTree data structure
    var currentNodes = $("#" + DRB.DOM.TreeView.Id).jstree(true).get_json("#");

    var dom = DRB.DOM.Collection.RESTClient;
    var endpointType = $("#" + dom.EndpointDropdown.Id).val();
    // get current DateTime
    var now = new Date();

    var lines = [];
    lines.push("### Get Access Token");
    lines.push("# @name getAADToken");
    lines.push("POST " + $("#" + dom.AccessTokenInput.Id).val());
    lines.push("Content-Type: application/x-www-form-urlencoded");
    lines.push("");
    switch (endpointType) {
        case "v1":
            lines.push("grant_type=client_credentials&client_id={{clientid}}&client_secret={{clientsecret}}&resource=" + $("#" + dom.ResourceInput.Id).val());
            break;
        case "v2":
            lines.push("grant_type=client_credentials&client_id={{clientid}}&client_secret={{clientsecret}}&scope=" + $("#" + dom.ScopeInput.Id).val());
            break;
    }

    lines.push("");
    lines.push("### Extract access token from getAADToken request");
    lines.push("@token = {{getAADToken.response.body.access_token}}");
    lines.push("");

    // export jsTree nodes to the json collection
    DRB.Collection.ExportNodesRESTClient(currentNodes[0], lines);
    var collection = lines.join("\r\n");

    // create fileName and fileDate (coming from current DateTime) to be used inside a valid filename
    var fileName = currentNodes[0].text.replace(/[^a-z0-9]/gi, "_");
    var fileDate = now.toLocaleString("sv").replace(/ /g, "_").replace(/-/g, "").replace(/:/g, "");
    // create the blob content holding the json collection
    var saveFile = new Blob([collection]);
    // download the blob content with the provided filename
    var customLink = document.createElement("a");
    customLink.href = URL.createObjectURL(saveFile);
    customLink.download = fileName + "_" + fileDate + ".http";
    customLink.click();
}

/**
 * Collection - Export REST Client Collection
 */
DRB.Collection.ExportRESTClientCollection = function () {
    // get jsTree data structure
    var currentNodes = $("#" + DRB.DOM.TreeView.Id).jstree(true).get_json("#");
    // if no nodes then show error
    if (currentNodes.length === 0) { DRB.UI.ShowError("Export as REST Client Collection", "Create or Load a Collection before Export"); }
    else {
        var dom = DRB.DOM.Collection.RESTClient;
        var restClientDiv = DRB.UI.CreateEmptyDiv(dom.Div.Id);
        restClientDiv.append(DRB.UI.CreateEmptyDiv(dom.SettingsDiv.Id));
        DRB.UI.ShowExport("Export as REST Client Collection", restClientDiv, "large", DRB.Collection.ExportRESTClientCollectionFile);

        var divTable = DRB.UI.CreateTable(dom.Table.Id);
        $("#" + dom.SettingsDiv.Id).append(divTable);
        var collectionSettings = ["Endpoint", "AccessToken", "Scope", "Resource"];
        collectionSettings.forEach(function (setting) {
            var tr = DRB.UI.CreateTr(dom.Tr.Id + dom[setting + "Span"].Id);
            var tdLabel = DRB.UI.CreateTd(dom.TdLabel.Id + dom[setting + "Span"].Id);
            var tdValue = DRB.UI.CreateTd(dom.TdValue.Id + dom[setting + "Span"].Id);
            divTable.append(tr);
            tr.append(tdLabel);
            tr.append(tdValue);

            tdLabel.append(DRB.UI.CreateSpan(dom[setting + "Span"].Id, dom[setting + "Span"].Name, dom[setting + "Span"].SmallText));
            if (setting === "Endpoint") {
                tdValue.append(DRB.UI.CreateSimpleDropdown(dom.EndpointDropdown.Id));

            } else {
                tdValue.append(DRB.UI.CreateInputLongString(dom[setting + "Input"].Id, null, dom[setting + "Span"].Name));
            }
        });

        DRB.UI.FillDropdown(dom.EndpointDropdown.Id, dom.EndpointDropdown.Name, new DRB.Models.Records(DRB.Settings.RESTClientEndpoint).ToDropdown());
        DRB.Collection.BindRESTClientEndpoint(dom.EndpointDropdown.Id);
        $("#" + dom.EndpointDropdown.Id).val(DRB.Settings.RESTClientEndpoint[1].Id).change();

        $("#" + dom.UrlInput.Id).val(DRB.Xrm.GetClientUrl());
    }
}
// #endregion

// #region Thunder Client
/**
 * Collection - Export Thunder Client Environment File
 */
DRB.Collection.ExportThunderClientEnvironmentFile = function () {
    var dom = DRB.DOM.Collection.ThunderClient;
    // get current DateTime
    var now = new Date();
    var enviromentUrl = $("#" + dom.UrlInput.Id).val();
    // create json environment
    var environment = { client: "Thunder Client", environmentName: "DRB - " + enviromentUrl, dateExported: now.toJSON(), version: "1.0", variables: [] };

    environment.variables.push({ name: "url", value: enviromentUrl });
    environment.variables.push({ name: "clientid", value: $("#" + dom.ClientIdInput.Id).val() });
    environment.variables.push({ name: "clientsecret", value: $("#" + dom.ClientSecretInput.Id).val() });
    environment.variables.push({ name: "tenantid", value: $("#" + dom.TenantIdInput.Id).val() });

    // create fileDate (coming from current DateTime) to be used inside a valid filename
    var fileDate = now.toLocaleString("sv").replace(/ /g, "_").replace(/-/g, "").replace(/:/g, "");
    // create the blob content holding the json collection
    var saveFile = new Blob([JSON.stringify(environment, null, "\t")], { type: "application/json" });
    // download the blob content with the provided filename
    var customLink = document.createElement("a");
    customLink.href = URL.createObjectURL(saveFile);
    customLink.download = "DRB_" + fileDate + ".thunder_environment.json";
    customLink.click();
}

/**
 * Collection - Export Thunder Client Environment 
 */
DRB.Collection.ExportThunderClientEnvironment = function () {
    var dom = DRB.DOM.Collection.ThunderClient;
    var exportDiv = DRB.UI.CreateEmptyDiv(dom.Div.Id);
    exportDiv.append(DRB.UI.CreateEmptyDiv(dom.SettingsDiv.Id));

    DRB.UI.ShowExport("Export Thunder Client Environment", exportDiv, "large", DRB.Collection.ExportThunderClientEnvironmentFile);

    var divTable = DRB.UI.CreateTable(dom.Table.Id);
    $("#" + dom.SettingsDiv.Id).append(divTable);
    var enviromentSettings = ["Url", "ClientId", "ClientSecret", "TenantId"];

    enviromentSettings.forEach(function (setting) {
        var tr = DRB.UI.CreateTr(dom.Tr.Id + dom[setting + "Span"].Id);
        var tdLabel = DRB.UI.CreateTd(dom.TdLabel.Id + dom[setting + "Span"].Id);
        var tdValue = DRB.UI.CreateTd(dom.TdValue.Id + dom[setting + "Span"].Id);
        divTable.append(tr);
        tr.append(tdLabel);
        tr.append(tdValue);

        tdLabel.append(DRB.UI.CreateSpan(dom[setting + "Span"].Id, dom[setting + "Span"].Name, dom[setting + "Span"].SmallText));
        tdValue.append(DRB.UI.CreateInputLongString(dom[setting + "Input"].Id, null, dom[setting + "Span"].Name));
    });

    $("#" + dom.UrlInput.Id).val(DRB.Xrm.GetClientUrl());
}

/**
 * Collection - Export Thunder Client Collection File
 */
DRB.Collection.ExportThunderClientCollectionFile = function () {
    // TO BE COMPLETED
    // get current DateTime
    var now = new Date();
    // create json environment
    var collection = { client: "Thunder Client", collectionName: "", dateExported: now.toJSON(), version: "1.1", folders: [], requests: [], settings: { headers: [], auth: { type: "oauth2", oauth2: {} }, tests: [] } };

    collection.settings.auth.oauth2.accessToken = "";
    collection.settings.auth.oauth2.grantType = "client_credentials";
    collection.settings.auth.oauth2.callbackUrl = "";
    collection.settings.auth.oauth2.authUrl = "";
    collection.settings.auth.oauth2.tokenUrl = "https://login.microsoftonline.com/{{tenantid}}/oauth2/v2.0/token";
    collection.settings.auth.oauth2.clientId = "{{clientid}}";
    collection.settings.auth.oauth2.clientSecret = "{{clientsecret}}";
    collection.settings.auth.oauth2.scope = "{{url}}/.default";
    collection.settings.auth.oauth2.state = "";
    collection.settings.auth.oauth2.username = "";
    collection.settings.auth.oauth2.password = "";
    collection.settings.auth.oauth2.clientAuth = "in-header";

    // create fileDate (coming from current DateTime) to be used inside a valid filename
    var fileDate = now.toLocaleString("sv").replace(/ /g, "_").replace(/-/g, "").replace(/:/g, "");
    // create the blob content holding the json collection
    var saveFile = new Blob([JSON.stringify(collection, null, "\t")], { type: "application/json" });
    // download the blob content with the provided filename
    var customLink = document.createElement("a");
    customLink.href = URL.createObjectURL(saveFile);
    customLink.download = "COLL_" + fileDate + ".thunder_collection.json";
    customLink.click();
}

/**
 * Collection - Export Thunder Client Collection 
 */
DRB.Collection.ExportThunderClientCollection = function () {
    // get jsTree data structure
    var currentNodes = $("#" + DRB.DOM.TreeView.Id).jstree(true).get_json("#");
    // if no nodes then show error
    if (currentNodes.length === 0) { DRB.UI.ShowError("Export as Thunder Client Collection", "Create or Load a Collection before Export"); }
    else {
        DRB.Collection.ExportThunderClientCollectionFile();
    }
}
// #endregion
// #endregion