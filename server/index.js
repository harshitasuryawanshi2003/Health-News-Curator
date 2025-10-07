require('dotenv').config();
const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api', aiRoutes);
app.get('/', (req, res) => {
  res.send('Server is running');
});
console.log('Gemini key:', process.env.GEMINI_API_KEY ? 'FOUND' : 'MISSING');


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

