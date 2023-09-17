class Message {
    from;
    content;
    constructor(from, content) {
        this.from = from;
        this.content = content;
    }

    toJSON() {
        return {
            "role": this.from,
            "content": this.content
        }
    }
}
var messages = [];



function messageBuilder(messageData) {
    if (messageData.from == "INFO")
        return;
    var message = $("<div></div>").addClass("message");
    messages.push(messageData);
    var messageContent = $("<div></div>").addClass("messageContent").addClass("frosted");
    if (messageData.from == "system") {
        messageContent.addClass("botMessage");
        // Remove messagePreview
        $("#messagePreviewMessage").remove();
    }
    else {
        messageContent.addClass("userMessage");
    }

    messageContent.text(messageData.content);
    message.append(messageContent);
    $("#messages").append(message);
}

function sendMessage() {
    var message = new Message("user", $("#chatInputBox").val());
    if (message.content == "") {
        return;
    }
    if ($("#messagePreviewMessage").attr("id") != null) {
        return;
    }

    messageBuilder(message);
    $("#chatInputBox").val("");
    messages.push(message);
    var messagePreviewMessage = $("<div></div>").attr("id", "messagePreviewMessage").addClass("message");
    var messagePreview = $("<div></div>").attr("id", "messagePreview").addClass("frosted")
    // Add 3 dots, each with a css variable for their index
    for (var i = 0; i < 3; i++) {
        var dot = $("<div></div>").addClass("dot").css("--dot-index", i);
        messagePreview.append(dot);
    }

    messagePreviewMessage.append(messagePreview);
    $("#messages").append(messagePreviewMessage);
    askGPT(message.content)
}


function displayMessages() {
    messages.forEach(message => {
        messageBuilder(message);
    });
}

displayMessages()


$("#chatInputBox").on("keyup", function (event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});

// Do the same thing if chatSendButton is clicked
$("#chatSendButton").on("click", sendMessage);