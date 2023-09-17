//StoryForge
//Shellhacks 2023
//Backend team: Seth Lenhof, Maximus Smith

async function askGPT(message) {
  const systemPrompt = "You are a Dungeon Master for a table-top based game. The game system should be dungeons and dragons based with rolls to determine outcomes. The setting in which you have the game should be low fantasy\n\nYour responses should follow this format. Do not repeat (OPTIONAL) values that do not change for example the stats. Always include at least one option. DO NOT HAVE ANYTHING OUTSIDE OF THE JSON. \n\n{\n    \"messageToPlayer (REQUIRED)\": \"String\",\n    \"requiredRollStat + DC (OPTIONAL)\": \"String\",\n    \"potentialActions [MAX LENGTH: 3]\": [\n        \"STRING\"\n    ],\n    \"environmentalEffects\": {\n        \"inForest (OPTIONAL)\": \"Boolean\",\n        \"inCave (OPTIONAL)\": \"Boolean\",\n        \"inTown (OPTIONAL)\": \"Boolean\",\n        \"inDungeon (OPTIONAL)\": \"Boolean\",\n        \"lightLevel (OPTIONAL)\": \"Int\",\n        \"isRaining (OPTIONAL)\": \"Boolean\",\n        \"isSnowing (OPTIONAL)\": \"Boolean\"\n    },\n    \"characterStats\":{\n        \"strength (OPTIONAL)\": \"Int\",\n        \"health (OPTIONAL)\": \"Int\",\n        \"intelligence (OPTIONAL)\": \"Int\",\n        \"dexterity (OPTIONAL)\": \"Int\",\n        \"charisma (OPTIONAL)\": \"Int\",\n        \"wisdom (OPTIONAL)\": \"Int\",\n        \"constitution (OPTIONAL)\": \"Int\"\n    }\n}";
  var tempMessages = [{ "role": "system", "content": systemPrompt }].concat(messages.map(
    message => {
      return { "role": message.from, "content": message.content };
    }
  )).concat([{ "role": "user", "content": message }]);
  let requestBody = {
    model: "gpt-4",
    max_tokens: 256,
    temperature: 1,
    top_p: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
    messages: tempMessages
  };
    try
    {
      let response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer KEY', // Replace with your API key
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      console.log(data)
      environmentalEffects = false;
      try
      {
        console.log(JSON.parse(data.choices[0].message.content))
        messageBuilder(new Message("system", JSON.parse(data.choices[0].message.content).messageToPlayer));
        askForChoice(JSON.parse(data.choices[0].message.content).potentialActions);       
        //set the environmental factors
        environmentalEffects = JSON.parse(data.choices[0].message.content).environmentalEffects;
        setBackgroundFromEffects(environmentalEffects);
      }
      catch (error) {
        try{
          messageBuilder(new Message("system", data.messageToPlayer));
        }
        catch{
          messageBuilder(new Message("system", data.choices[0].message.content));
          console.error("FORMAT FAILED FAILBACK: NO JSON 2");
        }
        console.error("FORMAT FAILED FAILBACK: NO JSON");
      }
      return data.choices[0].message;
    } catch (error) {
      console.error('Error calling the ChatGPT API:', error);
      return 'Error getting response.';
    }
}
