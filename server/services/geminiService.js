const axios = require('axios');

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const MODEL_ID = 'gemini-2.5-pro';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_KEY}`;

async function callGemini(prompt) {
  if (!GEMINI_KEY) {
    throw new Error('Missing Gemini API key');
  }

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PostmanRuntime/7.32.0'
        },
        // timeout: 30000,
      }
    );

    console.log('Gemini API responded');
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw new Error('Failed to call Gemini API');
  }
}

module.exports = { callGemini };



