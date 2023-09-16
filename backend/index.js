//StoryForge
//Shellhacks 2023
//Team: Seth Lenhof, Maximus Smith


import OpenAI from "openai";

const openai = new OpenAI();

//sample function for chatgpt post request
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();


