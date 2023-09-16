$("#content > * ").addClass("firstTimers");


function showContentScreen(id) {
    $(".contentScreen").addClass("hidden");
    $("#" + id).removeClass("hidden");
    // Add a class to the view that is being shown
    // $("#content > * ").removeClass("activeScreen");
    // $("#" + id).addClass("activeScreen");
}

showContentScreen("chatScreen");
setTimeout(() => {
    $("#content > * ").removeClass("firstTimers");
}, 1000);