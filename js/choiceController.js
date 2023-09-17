$("#choicePrompt").addClass("hidden");

function choiceBuilder(option, index, callback) {
    $("#choices").append($(`<div class="option frosted button">${option}</div>`).css("--index", index).on("click", () => {
        $("#choicePrompt").addClass("hidden");
        var message = new Message("user", option)
        messageBuilder(message);
        messages.push(message);
        askGPT(option)
        callback(option);
    }));
}


function askForChoice(options, callback) {
    callback = callback || function () { };
    $("#choices").empty();

    $("#choicePrompt").removeClass("hidden");

    for (let i = 0; i < options.length; i++) {
        choiceBuilder(options[i], i, callback);
    }


}
