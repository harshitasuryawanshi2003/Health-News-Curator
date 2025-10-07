# Health News Curator 📰🤖

An AI-powered web application that summarizes, and simplifies health-related news articles.  
Built with **React (frontend)** and **Node.js/Express (backend)**, with integration of Google Gemini AI API.

---

## 🚀 Features
- AI-generated **summaries & simplified versions**
- Multi-language support
- Responsive UI with Tailwind CSS
- Separate backend service for AI calls

---

## 📂 Project Structure
├── public/ # Static files
├── src/ # Frontend React code
│ ├── components/ # UI Components
│ ├── config/ # Config files (languages, settings)
│ ├── data/ # Mock/test data
│ └── services/ # API service functions
├── server/ # Backend (Express + Gemini API)
│ ├── controllers/
│ ├── routes/
│ └── services/
└── .env # API keys (not committed) 


---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/harshitasuryawanshi2003/Health-News-Curator.git
cd Health-News-Curator
```

2. Install dependencies
    Frontend:
    ```bash
    npm install
    ```
    Backend:
    ```bash
    cd server
    npm install
    ```

3. Set up environment variables
Create .env files in both root and /server:

Root .env
```bash
REACT_APP_BACKEND_URL=http://localhost:4000
```
Server .env
```bash
 GEMINI_API_KEY=your_api_key_here
 PORT=4000
 ```
4. Running the Project
Development

Run both frontend and backend together with:
```bash
npm run dev
```
This will use concurrently to start:

-React frontend (default on http://localhost:3000)

-Express backend (default on http://localhost:4000)

Backend only
```bash
cd server
npm run server
```
Frontend only
```bash
npm start
```

🛠️ Tech Stack

-Frontend: React, Tailwind CSS

-Backend: Node.js, Express

-AI: Google Gemini API

-State/Data Handling: Axios for API requests

📌 TODO / Improvements

 -Replace mock data with real API integration

 -Add authentication (JWT-based login/signup)

 -Add error boundaries in frontend for better UX

 -Improve backend logging & error handling