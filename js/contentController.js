$("#content > * ").hide();


function showContentView(id) {
    $("#content > * ").hide();
    $("#" + id).show();
    // Add a class to the view that is being shown
    $("#content > * ").removeClass("activeView");
    $("#" + id).addClass("activeView");
}