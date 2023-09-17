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
    if(messageData.from == "INFO")
        return;
    var message = $("<div></div>").addClass("message");
    messages.push(messageData);
    var messageContent = $("<div></div>").addClass("messageContent").addClass("frosted");
    if (messageData.from == "system") {
        messageContent.addClass("botMessage");
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
    messageBuilder(message);
    $("#chatInputBox").val("");
    messages.push(message);

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