$("#choicePrompt").addClass("hidden");

function choiceBuilder(option, index, callback) {
    $("#choices").append($(`<div class="option frosted button">${option}</div>`).css("--index", index).on("click", () => {
        $("#choicePrompt").addClass("hidden");
        var message = new Message("user", option)
        messageBuilder(message);
        messages.push(message);
        askGPT(option)

        var messagePreviewMessage = $("<div></div>").attr("id", "messagePreviewMessage").addClass("message");
        var messagePreview = $("<div></div>").attr("id", "messagePreview").addClass("frosted")
        // Add 3 dots, each with a css variable for their index
        for (var i = 0; i < 3; i++) {
            var dot = $("<div></div>").addClass("dot").css("--dot-index", i);
            messagePreview.append(dot);
        }

        messagePreviewMessage.append(messagePreview);
        $("#messages").append(messagePreviewMessage);

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
