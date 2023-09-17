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
    promptToRoll(rollResult, diceNumber);
    return rollResult;
}


// Gets run after the roll is calculated but before the dice is rolled
function promptToRoll(rollResult, diceNumber) {
    var oldScreen = $(".activeScreen").attr("id");
    showContentScreen("rollScreen");
    $("#rollPromptText .value").text(dice[diceNumber].name);
    $("#dicePreview").css("clip-path", dice[diceNumber].shape);
    $("#dicePreview").text(diceNumber);
    $("#dicePreview").css("background-color", dice[diceNumber].color);

    $("#rollPromptButton").click(() => {
        // Roll the dice
        visualRollDice(rollResult, diceNumber, oldScreen);
        let tmpData = JSON.parse(data.choices[0].message.content);
        askGPT(skillCheckRoll(rollResult, tmpData.requiredRollStat, tmpData.requiredDifficultyClass) ? "I passed the skill check" : "I failed the skill check");
    });
}


function visualRollDice(rollResult, diceNumber, oldScreen) {
    // Swap between numbers randomly from 1 to the dice number and after 10 times stop on the roll result
    var rollCount = 0;
    var rollInterval = setInterval(function () {
        rollCount++;
        $("#dicePreview").text(Math.floor(Math.random() * diceNumber) + 1);
        if (rollCount > 10) {
            clearInterval(rollInterval);
            $("#dicePreview").text(rollResult);
            setTimeout(function () { 
                showContentScreen(oldScreen);
            }, 1000);
        }
    }, 100);

}

function skillCheckRoll(generatedRoll, rolltype, difficultyClass) {
    switch (rolltype)
    {
        case "Strength":
            generatedRoll += characterInformation.stats.strength - 10;
            break;
        case "Dexterity":
            generatedRoll += characterInformation.stats.dexterity - 10;
            break;
        case "Constitution":
            generatedRoll += characterInformation.stats.constitution - 10;
            break;
        case "Intelligence":
            generatedRoll += characterInformation.stats.intelligence - 10;
            break;
        case "Wisdom":
            generatedRoll += characterInformation.stats.wisdom - 10;
            break;
        case "Charisma":
            generatedRoll += characterInformation.stats.charisma - 10;
            break;
    }

    return generatedRoll >= difficultyClass;
}

$("#diceRollButton").click(() => rollDice(20));