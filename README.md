# NC News

## 🌍 Live Demo

The application is deployed and accessible at:
[NC News Live on Netlify](https://nc-news-zdvman.netlify.app/)

## 📖 Project Overview

NC News is a full-stack news platform where users can browse articles on different topics, read article details, comment on them, and vote on articles. The application features interactive sorting, topic filtering, error handling, and smooth user experience through animations and UI feedback.

### 🛠 Features

- View a list of all articles
- View an individual article and its associated comments
- Post a new comment on an article
- Delete comments (only if posted by the user)
- Vote on articles
- View a separate page for each topic with related articles
- Sort articles by date, comments number, author, topics, and votes
- Order in ascending and descending
- Handle errors gracefully with user-friendly messages

## 🚀 Repositories

- **Frontend Repository**: [NC News Frontend](https://github.com/zdvman/nc-news)
- **Backend Repository**: [NC News API](https://github.com/zdvman/be-nc-news)
- **Backend API Base URL**: [NC News API](https://be-nc-news-m90v.onrender.com/api)

## 🏗 Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, React Router
- **Backend**: Node.js, Express.js, PostgreSQL, SupaBase
- **Deployment**: Netlify (Frontend), Render (Backend)
- **Libraries**: Axios, Headless UI, Heroicons, Framer Motion, TailwindUI components

## 🛠 Minimum Requirements

- **Node.js**: v18+ (Recommended)
- **NPM**: v9+ (Recommended)

Check your Node version:

```sh
node --version
npm --version
```

## 📥 Installation & Running Locally

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/zdvman/nc-news.git
cd nc-news
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Run the Development Server

```sh
npm run dev
```

This will start the Vite development server. You can now access the application at `http://localhost:5173`.

## 📦 Build for Production

To generate a production build:

```sh
npm run build
```

This will create an optimized production-ready version of the app inside the `dist/` directory.

## 🚀 Deploying to Netlify

If you want to deploy the project on Netlify manually, follow these steps:

1. Run `npm run build` to generate the static files.
2. Create a new site on [Netlify](https://www.netlify.com/).
3. Connect your GitHub repository and deploy the `./dist` folder.
4. Set environment variables in Netlify if needed.

## ⚙️ API Configuration

The API base URL is **hardcoded** in `src/services/api.js`:

```js
import axios from 'axios';

const baseURL = 'https://be-nc-news-m90v.onrender.com/api';

const ncNewsAPI = axios.create({
  baseURL,
});
```

If you prefer using `.env`, modify `api.js` to:

```js
const baseURL =
  process.env.REACT_APP_API_URL || 'https://be-nc-news-m90v.onrender.com/api';
```

Then, create a `.env` file:

```sh
echo "REACT_APP_API_URL=http://localhost:9090/api" > .env
```

## ❌ Error Handling

The application has robust error handling mechanisms:

- Displays a user-friendly error message for invalid API requests (e.g., non-existent articles, topics, etc.).
- Shows a popup alert when an operation fails.
- Handles API errors such as missing required fields when posting a comment.
- Uses React Router's `useNavigate()` to redirect users from error pages to the homepage.

## 📝 Attributions

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).

## 📜 License

This project is open-source and available under the MIT License.
