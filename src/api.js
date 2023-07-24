import axios from 'axios';

// Function to get ChatGPT response from the API
const api = async (userInput) => {
  try {
    const apiEndpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const apiKey = 'API_KEY'; // Replace with your actual API key
    const prompt = userInput;
    const maxTokens = 150;
    const stop = '\n'; // Stop generating tokens when a new line is encountered

    const response = await axios.post(apiEndpoint, {
      prompt,
      max_tokens: maxTokens,
      stop,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.log('Error fetching response:', error);
    return 'Error fetching response from ChatGPT.';
  }
};

export default api;
