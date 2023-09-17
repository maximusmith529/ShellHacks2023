let sidebarName = $("#name");
let sidebarHealth = $("#health .value");
let sidebarClass = $("#class .value");
let sidebarRace = $("#race .value");
let sidebarStatsContainer = $("#statsContainer");

function updateSidebar() {
    sidebarName.text(characterInformation.name);
    sidebarHealth.text(characterInformation.health);
    sidebarClass.text(characterInformation.class);
    sidebarRace.text(characterInformation.race);

    sidebarStatsContainer.children().each(function() {
        let stat = $(this);
        switch (stat.attr("stat")) {
            case "Strength":
                stat.children(".value").text(characterInformation.stats.strength);
                break;
            case "Dexterity":
                stat.children(".value").text(characterInformation.stats.dexterity);
                break;
            case "Constitution":
                stat.children(".value").text(characterInformation.stats.constitution);
                break;
            case "Intelligence":
                stat.children(".value").text(characterInformation.stats.intelligence);
                break;
            case "Wisdom":
                stat.children(".value").text(characterInformation.stats.wisdom);
                break;
            case "Charisma":
                stat.children(".value").text(characterInformation.stats.charisma);
                break;
        }
    });
}