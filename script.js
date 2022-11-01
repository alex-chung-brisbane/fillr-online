const re = /`([A-Za-z0-9_-]*)`/g;

let vars = [];
let curVar = null;
let stringBuilder = "";

$(document).ready(function () {
    $("#input").keydown(function (evt) {
        if (evt.which === 13) {
            evt.preventDefault();
            InsertVal();
        }
    });
});

function InsertVal() {
    stringBuilder = stringBuilder.replaceAll("`" + vars[curVar] + "`", $("#input").val());
    if (curVar < vars.length - 1) {
        curVar++;
    } else {
        $("#output-area").val($("#output-area").val() + stringBuilder);
        curVar = 0;
        stringBuilder = $('#input-area').val();
    }
    $('#variables').val(vars[curVar]);
    $("#input").val("");
}

function UpdateVars() {
    $('#variables').empty();
    $("#output-area").val("");
    vars = [];
    curVar = null;
    stringBuilder = "";

    if ($('#input-area').val().match(re)) {
        $('#input-area').val().match(re).forEach(function (varName) {
            varName = varName.substring(1, varName.length - 1);
            if (varName.trim().length > 0 && !vars.includes(varName)) vars.push(varName);
        });
        vars.forEach(function (varName) {
            $('#variables').append(`<option value=\"${varName}\">${varName}</option>`);
        });
    }

    if (vars.length === 0) {
        $('#variables').append("<option value=\"\">Use ` to surround your vars in template text - e.g. `var_1`</option>");
    } else {
        curVar = 0;
        $('#variables').val(vars[0] ? vars[0] : "");
        stringBuilder = $('#input-area').val();
    }

    $('#variables').attr("size", Math.max(vars.length + 1, 2));
}