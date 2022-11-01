$(document).ready(function () {
    $("#input").keydown(function (evt) {
        if (evt.which === 13) {
            evt.preventDefault();
            InsertVal();
        }
    });
});

function InsertVal() {

    $("#input").val("");
}