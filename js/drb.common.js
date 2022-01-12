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

DRB.Common.LookupSelect = function (settings, tableLogicalName, recordId) {
    $("#" + settings.textId).val(recordId).trigger("input").change();
    if (DRB.Utilities.HasValue(settings.dropdownId)) {
        $("#" + settings.dropdownId).val(tableLogicalName).change();
        DRB.UI.RefreshDropdown(settings.dropdownId);
    }
    DRB.UI.HideLoading();
}

DRB.Common.LookupSearch = function (settings) {
    var tableLogicalName = $("#" + DRB.DOM.Lookup.TableDropdown.Id).val();
    var text = $("#" + DRB.DOM.Lookup.Input.Id).val();
    if (!DRB.Utilities.HasValue(tableLogicalName) || !DRB.Utilities.HasValue(text)) { return; }

    var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
    if (DRB.Utilities.HasValue(checkTable)) {
        $("#" + DRB.DOM.Lookup.DivResults.Id).empty();
        $("#" + DRB.DOM.Lookup.DivResults.Id).append(DRB.UI.CreateSpan("", "Retrieving Records..."));
        DRB.Xrm.Retrieve(checkTable.EntitySetName, "$select=" + checkTable.PrimaryNameAttribute + "&$filter=contains(" + checkTable.PrimaryNameAttribute + ",'" + text + "')&$orderby=" + checkTable.PrimaryNameAttribute + " asc&$top=5")
            .done(function (data) {
                $("#" + DRB.DOM.Lookup.DivResults.Id).empty();
                if (data.value.length > 0) {
                    // Create Table to show the results
                    var divTable = DRB.UI.CreateTable(DRB.DOM.Lookup.Table.Id);
                    var thHeader = DRB.UI.CreateTr(DRB.DOM.Lookup.Tr.Id + "header");
                    var tdLabelHeaderSelect = DRB.UI.CreateTd(DRB.DOM.Lookup.TdLabel.Id + "header_select");
                    var tdLabelHeaderID = DRB.UI.CreateTd(DRB.DOM.Lookup.TdLabel.Id + "header_id");
                    var tdLabelHeaderPrimaryColumn = DRB.UI.CreateTd(DRB.DOM.Lookup.TdLabel.Id + "header_primarycolumn");
                    divTable.append(thHeader);
                    thHeader.append(tdLabelHeaderSelect);
                    thHeader.append(tdLabelHeaderID);
                    thHeader.append(tdLabelHeaderPrimaryColumn);
                    tdLabelHeaderID.append(DRB.UI.CreateSpan(DRB.DOM.Lookup.HeaderIDSpan.Id, DRB.DOM.Lookup.HeaderIDSpan.Name));
                    tdLabelHeaderPrimaryColumn.append(DRB.UI.CreateSpan(DRB.DOM.Lookup.HeaderPrimaryColumnSpan.Id, DRB.DOM.Lookup.HeaderPrimaryColumnSpan.Name));

                    var searchResults = [];

                    data.value.forEach(function (record) {
                        searchResults.push({ Id: record[checkTable.PrimaryIdAttribute], PrimaryColumn: record[checkTable.PrimaryNameAttribute] });
                    });

                    searchResults.forEach(function (searchResult, searchResultIndex) {
                        var tr = DRB.UI.CreateTr(DRB.DOM.Lookup.Tr.Id + searchResultIndex);
                        var tdValueSelect = DRB.UI.CreateTd(DRB.DOM.Lookup.TdValue.Id + searchResultIndex + "_select");
                        var tdValueID = DRB.UI.CreateTd(DRB.DOM.Lookup.TdValue.Id + searchResultIndex + "_id");
                        var tdValuePrimaryColumn = DRB.UI.CreateTd(DRB.DOM.Lookup.TdValue.Id + searchResultIndex + "_primarycolumn");

                        divTable.append(tr);
                        tr.append(tdValueSelect);
                        tr.append(tdValueID);
                        tr.append(tdValuePrimaryColumn);
                        tdValueSelect.append(DRB.UI.CreateButton(DRB.DOM.Lookup.SelectButton.Id + searchResultIndex, DRB.DOM.Lookup.SelectButton.Name, DRB.DOM.Lookup.SelectButton.Class, DRB.Common.LookupSelect, settings, checkTable.LogicalName, searchResult.Id));
                        tdValueID.append(DRB.UI.CreateSpan("", searchResult.Id));
                        tdValuePrimaryColumn.append(DRB.UI.CreateSpan("", searchResult.PrimaryColumn));
                    });
                    $("#" + DRB.DOM.Lookup.DivResults.Id).append(divTable);
                } else {
                    $("#" + DRB.DOM.Lookup.DivResults.Id).append(DRB.UI.CreateSpan("", "No Records"));
                }
            })
            .fail(function (xhr) {
                $("#" + DRB.DOM.Lookup.DivResults.Id).empty();
                $("#" + DRB.DOM.Lookup.DivResults.Id).append(DRB.UI.CreateSpan("", "Error retrieving Records"));
            });
    }
}

DRB.Common.BindLookupInput = function (id) {
    $("#" + id).on("change keyup", function (e) {
        var text = $(this).val();
        var disableButton = false;
        if (!DRB.Utilities.HasValue(text)) { disableButton = true; }
        $("#" + DRB.DOM.Lookup.SearchButton.Id).prop("disabled", disableButton);
    });
}

DRB.Common.BindLookupTable = function (id) {
    $("#" + id).on("change", function (e) {
        $("#" + DRB.DOM.Lookup.Input.Id).val("").trigger("input").change();
        $("#" + DRB.DOM.Lookup.DivResults.Id).empty();
    });
}

DRB.Common.OpenLookup = function (lookupOptions, settings) {
    var lookupTables = [];
    lookupOptions.entityTypes.forEach(function (tableLogicalName) {
        var checkTable = DRB.Utilities.GetRecordById(DRB.Metadata.Tables, tableLogicalName);
        if (DRB.Utilities.HasValue(checkTable)) { lookupTables.push(checkTable); }
    });

    var lookupDiv = DRB.UI.CreateEmptyDiv(DRB.DOM.Lookup.Div.Id);
    lookupDiv.append(DRB.UI.CreateSpan(DRB.DOM.Lookup.TableSpan.Id, DRB.DOM.Lookup.TableSpan.Name));
    lookupDiv.append(DRB.UI.CreateDropdown(DRB.DOM.Lookup.TableDropdown.Id));
    lookupDiv.append(DRB.UI.CreateSpan("", "NOTE: maximum 5 records are returned"));
    lookupDiv.append(DRB.UI.CreateSpacer());
    lookupDiv.append(DRB.UI.CreateSpan(DRB.DOM.Lookup.InputSpan.Id, DRB.DOM.Lookup.InputSpan.Name));
    lookupDiv.append(DRB.UI.CreateInputString(DRB.DOM.Lookup.Input.Id));
    lookupDiv.append(DRB.UI.CreateSpan(null, " "));
    lookupDiv.append(DRB.UI.CreateButton(DRB.DOM.Lookup.SearchButton.Id, DRB.DOM.Lookup.SearchButton.Name, DRB.DOM.Lookup.SearchButton.Class, DRB.Common.LookupSearch, settings));
    lookupDiv.append(DRB.UI.CreateSpacer());
    lookupDiv.append(DRB.UI.CreateEmptyDiv(DRB.DOM.Lookup.DivResults.Id, DRB.DOM.Lookup.DivResults.Class));
    DRB.UI.Show("Lookup", lookupDiv, "large");
    $(".modal-footer").remove();
    DRB.UI.FillDropdown(DRB.DOM.Lookup.TableDropdown.Id, DRB.DOM.Lookup.TableDropdown.Name, new DRB.Models.Records(lookupTables).ToDropdown());
    DRB.Common.BindLookupTable(DRB.DOM.Lookup.TableDropdown.Id);
    DRB.Common.BindLookupInput(DRB.DOM.Lookup.Input.Id);
    $("#" + DRB.DOM.Lookup.Input.Id).val("").trigger("input").change();
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