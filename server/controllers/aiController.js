const { callGemini } = require('../services/geminiService');

// Generate summary + key takeaways
async function generateSummary(req, res) {
  const { articleText } = req.body;
  const {language} = req.body;
  console.log('Received body:', req.body);

  if (!articleText) return res.status(400).json({ error: 'Missing articleText' });

   const langInstruction = language
    ? `Please provide your response in ${language}.`
    : `Please provide your response in English.`

  const prompt = `
You are an AI Health News Curator.

Tasks:
1. Summarize the article in 2 lines (TL;DR).
2. Provide 3 key takeaways in simple, friendly language.

Article:
${articleText}
${langInstruction}

Format:
### TL;DR
[2-line summary]

### Key Takeaways
1. ...
2. ...
3. ...
`;

  try {
    const textOutput = await callGemini(prompt);
    const [tldrSection, takeawaysSection] = textOutput.split("### Key Takeaways");

    const tldr = tldrSection.replace("### TL;DR", "").trim();
    const takeaways = takeawaysSection
      ? takeawaysSection.split("\n").filter(line => line.match(/^\d\./)).map(line => line.trim())
      : [];
    
    res.json({ tldr, takeaways });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function simplifyArticle(req, res) {
  const { articleText } = req.body;
  const {language} = req.body;

  if (!articleText) return res.status(400).json({ error: 'Missing articleText' });

  const langInstruction = language
    ? `Please provide your response in ${language}.`
    : `Please provide your response in English.`;


  const prompt = `
    You are an AI Health News Curator.
    Rewrite the following health article in a simple, friendly tone suitable for general readers:

    Article:
    ${articleText}
    ${langInstruction}
    `;
  try {
    const simplifiedText = await callGemini(prompt);
    console.log(simplifiedText)
    res.json({ simplifiedText });
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { generateSummary, simplifyArticle };
