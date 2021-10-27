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
// #endregion