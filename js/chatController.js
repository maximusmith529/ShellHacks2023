class Message {
    from;
    content;
    constructor(from, content) {
        this.from = from == "user" ? "user" : "system";
        this.content = content;
    }
}
var messages = [new Message("system", "Hello, I am a bot. I am here to help you with your queries. Please type your query in the text box below and I will try to answer it for you."),
new Message("system", "You can ask me about the following topics:"), new Message("user", "What topics!!!")];



function messageBuilder(messageData) {
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