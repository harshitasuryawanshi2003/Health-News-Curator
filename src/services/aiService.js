import axios from 'axios';

const BACKEND_URL = `https://health-news-curator-backend.onrender.com`;

export async function generateSummary(articleText, language) {
  const response = await axios.post(`${BACKEND_URL}/api/ai/generate-summary`, { articleText,language });
  return { tldr: response.data.tldr, keyTakeaways: response.data.takeaways };
}

export async function generateSimplifiedRewrite(articleText, language) {
  const response = await axios.post(`${BACKEND_URL}/api/ai/simplify`, { articleText,language });
  return response.data;
}
