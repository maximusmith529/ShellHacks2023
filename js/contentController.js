$("#content > * ").hide();


function showContentScreen(id) {
    $("#content > * ").hide();
    $("#" + id).show();
    // Add a class to the view that is being shown
    $("#content > * ").removeClass("activeScreen");
    $("#" + id).addClass("activeScreen");
}