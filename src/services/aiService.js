import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function generateSummary(articleText, language) {
  const response = await axios.post(`${BACKEND_URL}/api/ai/generate-summary`, { articleText,language });
  return { tldr: response.data.tldr, keyTakeaways: response.data.takeaways };
}

export async function generateSimplifiedRewrite(articleText, language) {
  const response = await axios.post(`${BACKEND_URL}/api/ai/simplify`, { articleText,language });
  return response.data;
}
