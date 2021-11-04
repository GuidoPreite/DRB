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
                // // something went wrong when parsing the file, show error
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