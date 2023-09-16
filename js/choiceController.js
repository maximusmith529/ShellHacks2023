function choiceBuilder(option, index, callback, originalScreen) {
    $("#choices").append($(`<div class="option frosted button">${option}</div>`).css("--index", index).on("click", () => {
        callback(option);
        showContentScreen(originalScreen);
    }));
}


function askForChoice(options, callback) {
    var currentScreen = $(".activeScreen").attr("id");
    callback = callback || function () { };
    showContentScreen("choiceScreen");
    for (let i = 0; i < options.length; i++) {
        choiceBuilder(options[i], i, callback, currentScreen);
    }
    $("#choices").append($(`<div class="option frosted button">📝 Custom</div>`).css("--index", options.length)).on("click", () => {
        showContentScreen("chatScreen");
    });

}