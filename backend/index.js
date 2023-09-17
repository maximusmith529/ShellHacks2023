//StoryForge
//Shellhacks 2023
//Backend team: Seth Lenhof, Maximus Smith

async function askGPT(message) {
    const systemPrompt = "You are a Dungeon Master for a table-top based game that you created. Speak to me as if I was your player. The game system should be dungeons and dragons based with rolls to determine outcomes.\n\nThe dungeon master should ask before rolling and then generate a random roll with proficiencies. \n\nWhen describing the game and assisting the player in non-cinematic or non-roleplaying scenarios your responses should be short and concise. Otherwise, when describing scenes and dialogues you can use more words, but again do not add too many extraneous words.\n\nThe setting in which you have the game should be low fantasy\n\nYour responses should follow this format. Do not repeat (OPTIONAL) values that do not change for example the stats.\n\n{\n    \"messageToPlayer (REQUIRED)\": \"String\",\n    \"requiredRollStat + DC (OPTIONAL)\": \"String\",\n    \"potentialActions [MAX LENGTH: 3]\": [\n        \"STRING\"\n    ],\n    \"environmentalEffects\": {\n        \"inForest (OPTIONAL)\": \"Boolean\",\n        \"inCave (OPTIONAL)\": \"Boolean\",\n        \"inTown (OPTIONAL)\": \"Boolean\",\n        \"inDungeon (OPTIONAL)\": \"Boolean\",\n        \"lightLevel (OPTIONAL)\": \"Int\",\n        \"isRaining (OPTIONAL)\": \"Boolean\",\n        \"isSnowing (OPTIONAL)\": \"Boolean\"\n    },\n    \"characterStats\":{\n        \"strength (OPTIONAL)\": \"Int\",\n        \"health (OPTIONAL)\": \"Int\",\n        \"intelligence (OPTIONAL)\": \"Int\",\n        \"dexterity (OPTIONAL)\": \"Int\",\n        \"charisma (OPTIONAL)\": \"Int\",\n        \"wisdom (OPTIONAL)\": \"Int\",\n        \"constitution (OPTIONAL)\": \"Int\"\n    }\n}";
    var tempMessages = [{ "role": "system", "content": systemPrompt }].concat(messages.map(
        message => {
            return { "role": message.from, "content": message.content };
        }
    )).concat([{ "role": "user", "content": message }]);
    const requestBody = {
        model: "gpt-4",
        max_tokens: 256,
        temperature: 1,
        top_p: 0,
        frequency_penalty: 0,
        presence_penalty: 0,
        messages: tempMessages
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log(data)
        messageBuilder(new Message("system", JSON.parse(data.choices[0].message.content).messageToPlayer));
        return data.choices[0].message;
    } catch (error) {
        console.error('Error calling the ChatGPT API:', error);
        return 'Error getting response.';
    }
}
//funciton for testing
// async function main() {
//   const answer = await sendMessage("hello");
//   console.log(answer);
// }