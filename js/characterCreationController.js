const races = [
    "Dragonborn",
    "Dwarf",
    "Elf",
    "Gnome",
    "Half-Elf",
    "Halfling",
    "Half-Orc",
    "Human",
    "Tiefling"
]

const classes = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard"
]

const stats = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma"
]

let classesContainer = $("#characterClassButtons");
let racesContainer = $("#characterRaceButtons");
let statsContainer = $("#statFieldsContainer");
let pointsLeft = $("#pointsLeft");

let currentClass = "Barbarian";
let currentRace = "Dragonborn";

for (let i = 0; i < classes.length; i++) {
    let button = $("<div>");
    button.addClass("button frosted");
    button.text(classes[i]);
    classesContainer.append(button);

    button.click(function () {
        setActiveClass(button);
    });
}

for (i = 0; i < races.length; i++) {
    let button = $("<div>");
    button.addClass("button frosted");
    button.text(races[i]);
    racesContainer.append(button);

    button.click(function () {
        setActiveRace(button)
    });
}

for (i = 0; i < stats.length; i++) {
    let stat = $("<div>");
    stat.addClass("statField");
    stat.attr("value", 10);
    stat.attr("id", stats[i]);
    statsContainer.append(stat);

    let label = $("<label>");
    label.text(stats[i]);
    stat.append(label);

    let statValue = $("<div>");
    statValue.addClass("statValueField");
    stat.append(statValue);

    let statValueText = $("<div>");
    statValueText.text(stat.attr("value")).addClass("statValueFieldValue");

    let decrement = $("<div>");
    decrement.addClass("button");
    decrement.text("-");
    decrement.click(function () {
        decrementStat(stat, statValueText);
    });
    statValue.append(decrement);

    statValue.append(statValueText);

    let increment = $("<div>");
    increment.addClass("button");
    increment.text("+");
    increment.click(function () {
        incrementStat(stat, statValueText);
    });
    statValue.append(increment);
}

let characterInformation;

$("#characterCreateButton").click(function () {
    characterInformation = {
        name: $("#characterNameInput").val() ? $("#characterNameInput").val() : "Unnamed",
        health: 20,
        class: currentClass,
        race: currentRace,
        stats: {
            strength: $("#Strength").attr("value"),
            dexterity: $("#Dexterity").attr("value"),
            constitution: $("#Constitution").attr("value"),
            intelligence: $("#Intelligence").attr("value"),
            wisdom: $("#Wisdom").attr("value"),
            charisma: $("#Charisma").attr("value")
        }
    }

    $("#characterCreationScreen").hide();
    updateSidebar();

    askGPT("Lets start the adventure!")
    var messagePreviewMessage = $("<div></div>").attr("id", "messagePreviewMessage").addClass("message");
    var messagePreview = $("<div></div>").attr("id", "messagePreview").addClass("frosted")
    // Add 3 dots, each with a css variable for their index
    for (var i = 0; i < 3; i++) {
        var dot = $("<div></div>").addClass("dot").css("--dot-index", i);
        messagePreview.append(dot);
    }

    messagePreviewMessage.append(messagePreview);
    $("#messages").append(messagePreviewMessage);

});

function setActiveClass(selection) {
    $(selection).addClass("selected");
    $(selection).siblings().removeClass("selected");
    currentClass = $(selection).text();
}

function setActiveRace(selection) {
    $(selection).addClass("selected");
    $(selection).siblings().removeClass("selected");
    currentRace = $(selection).text();
}

let availablePoints = 20;
updatePointsLeft();

function decrementStat(selection, text) {
    if (selection.attr("value") < 9)
        return;

    let cost = 1;
    if (selection.attr("value") > 14)
        cost++;

    selection.attr("value", parseInt(selection.attr("value"), 10) - 1);
    text.text(selection.attr("value"));
    availablePoints += cost;

    updatePointsLeft();
}

function incrementStat(selection, text) {
    if (selection.attr("value") > 19)
        return;

    let cost = 1;
    if (selection.attr("value") > 14)
        cost++;

    if (availablePoints < cost)
        return;

    selection.attr("value", parseInt(selection.attr("value"), 10) + 1);
    text.text(selection.attr("value"));
    availablePoints -= cost;

    updatePointsLeft();
}

function updatePointsLeft() {
    pointsLeft.text("Points left: " + availablePoints);
}