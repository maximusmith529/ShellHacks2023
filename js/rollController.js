// Desc: This file contains the functions for rolling dice and displaying the results

const dice = {
    4: {
        name: "d4",
        shape: "polygon(50% 0%, 0% 100%, 100% 100%)",
        color: "red"
    },
    6: {
        name: "d6",
        shape: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        color: "blue"
    },
    8: {
        name: "d8",
        shape: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        color: "green"
    },
    10: {
        name: "d10",
        shape: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        color: "yellow"
    },

    12: {
        name: "d12",
        shape: "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
        color: "purple"
    },
    20: {
        name: "d20",
        shape: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        color: "orange"
    }
}


function rollDice(diceNumber) {
    // Calculate the dice roll
    var rollResult = Math.floor(Math.random() * diceNumber) + 1;



    return rollResult;
}


// Gets run after the roll is calculated but before the dice is rolled
var currentDiceNumber = 20;
var currentOldScreen = document.querySelector(".activeScreen").id;

function promptToRoll(diceNumber) {
    currentOldScreen = document.querySelector(".activeScreen").id;
    showContentScreen("rollScreen");

    var dicePreview = document.getElementById("dicePreview");
    dicePreview.style.clipPath = dice[diceNumber].shape;
    dicePreview.textContent = diceNumber;
    dicePreview.style.backgroundColor = dice[diceNumber].color;

    // Update the global variables
    currentDiceNumber = diceNumber;
}

function handleRollButtonClick() {
    if (currentDiceNumber && currentOldScreen) {
        let rollResult = Math.floor(Math.random() * currentDiceNumber) + 1;
        skillCheckRoll(rollResult);
        visualRollDice(rollResult, currentDiceNumber, currentOldScreen);
    }
}


var previewCreated = false;
function visualRollDice(rollResult, diceNumber, oldScreen) {
    // Swap between numbers randomly from 1 to the dice number and after 10 times stop on the roll result
    var rollCount = 0;
    let rollButton = $("#rollPromptButton");
    previewCreated = false;
    rollButton.addClass("disabled");
    var rollInterval = setInterval(function () {
        rollCount++;
        $("#dicePreview").text(Math.floor(Math.random() * diceNumber) + 1);
        if (rollCount > 10) {
            clearInterval(rollInterval);
            $("#dicePreview").text(rollResult);
            if (!previewCreated) {
                previewCreated = true;
                var messagePreviewMessage = $("<div></div>").attr("id", "messagePreviewMessage").addClass("message");
                var messagePreview = $("<div></div>").attr("id", "messagePreview").addClass("frosted")
                // Add 3 dots, each with a css variable for their index
                for (var i = 0; i < 3; i++) {
                    var dot = $("<div></div>").addClass("dot").css("--dot-index", i);
                    messagePreview.append(dot);
                }

                messagePreviewMessage.append(messagePreview);
                $("#messages").append(messagePreviewMessage);
            }
            setTimeout(function () {
                showContentScreen(oldScreen);
                rollButton.removeClass("disabled");
            }, 1000);
        }
    }, 100);

}

function skillCheckRoll(generatedRoll) {
    if (gptData == null) return;
    if (gptData.choices == null) return;
    if (gptData.choices.length == 0) return;
    if (gptData.choices[0] == null) return;
    if (gptData.choices[0].message.content == null) return;

    let tmpData = JSON.parse(gptData.choices[0].message.content);

    if (tmpData.requiredRollStat == null) return;

    let skillOffset = 0;
    switch (tmpData.requiredRollStat.toLowerCase()) {
        case "strength":
            skillOffset += (characterInformation.stats.strength - 10) / 2;
            break;
        case "dexterity":
            skillOffset += (characterInformation.stats.dexterity - 10) / 2;
            break;
        case "constitution":
            skillOffset += (characterInformation.stats.constitution - 10) / 2;
            break;
        case "intelligence":
            skillOffset += (characterInformation.stats.intelligence - 10) / 2;
            break;
        case "wisdom":
            skillOffset += (characterInformation.stats.wisdom - 10) / 2;
            break;
        case "charisma":
            skillOffset += (characterInformation.stats.charisma - 10) / 2;
            break;
    }

    let tmpString = ("I rolled a " + ((generatedRoll == 1 || generatedRoll == 20) ? generatedRoll : Math.floor(generatedRoll + skillOffset)));
    messageBuilder(new Message("user", tmpString));
    messages.push(new Message("user", tmpString));

    askGPT(tmpString);
}

$("#diceRollButton").click(() => promptToRoll(20));
$("#diceRollClose").click(() => showContentScreen("chatScreen"));