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
// #endregion