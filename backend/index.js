//StoryForge
//Shellhacks 2023
//Backend team: Seth Lenhof, Maximus Smith


async function sendMessage() {
  const userMessage = "How are you doing today";
  const requestBody = {
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      "messages": [{"role": "user", "content": userMessage}]
  };

  try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer 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', // Replace with your API key
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      return data.choices[0].message;
  } catch (error) {
  console.error('Error calling the ChatGPT API:', error);
  return 'Error getting response.';
}
}

async function main() {
  const message = await sendMessage();
  console.log(message);
}