# 💼 AI Job Tracker — Frontend

The frontend for **AI Job Tracker**, a full-stack application designed to help users manage and track their job applications through a modern web interface.

This application is built with **React, Vite, Tailwind CSS, and Axios** and communicates with a separate FastAPI backend through REST APIs.

## ✨ Features

* 🎨 Modern React-based user interface
* 💼 Job application management interface
* 👤 User-focused application experience
* 📊 Job tracking interface
* 🤖 Integration with AI-powered backend features
* 📡 REST API communication using Axios
* 📱 Responsive UI
* ⚡ Fast development and production builds using Vite
* 🎨 Utility-first styling with Tailwind CSS

## 🛠️ Tech Stack

* **React 19**
* **JavaScript / JSX**
* **Vite**
* **Tailwind CSS**
* **Axios**
* **ESLint**

The current project dependencies confirm React, React DOM, Vite, Tailwind CSS, and Axios as the main frontend technologies.

## 🏗️ Architecture

The frontend acts as the **client** of the AI Job Tracker system.

```text
                AI Job Tracker
                     │
              React Frontend
                     │
              Axios HTTP Requests
                     │
                     ▼
            FastAPI Backend API
                     │
          ┌──────────┴──────────┐
          │                     │
     PostgreSQL             Google AI
```

The frontend is responsible for:

* Rendering the user interface
* Collecting user input
* Displaying job information
* Sending requests to the backend
* Receiving and displaying API responses

Business logic, authentication, database operations, and AI processing are handled by the backend.

## 📂 Project Structure

```text
ai-job-tracker/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── .gitignore
```

The current repository contains the main React application in `src/App.jsx`, with styling and application entry-point files alongside it.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pratyush-18-hub/ai-job-tracker.git
```

Navigate into the project:

```bash
cd ai-job-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL, normally:

```text
http://localhost:5173
```

## 📦 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Preview

```bash
npm run preview
```

Runs the production build locally for preview.

### Lint

```bash
npm run lint
```

Runs ESLint against the project.

These scripts are defined in the project's `package.json`.

## 🔗 Backend

This frontend communicates with a separate FastAPI backend.

### Backend Repository

[AI Job Tracker — Backend](https://github.com/Pratyush-18-hub/ai-job-tracker-backend?utm_source=chatgpt.com)

The backend is responsible for:

* REST API endpoints
* Authentication
* Database operations
* AI analysis
* PostgreSQL integration
* Server-side business logic

## 🔄 Frontend → Backend Flow

```text
User
 │
 ▼
React UI
 │
 │ Axios
 ▼
FastAPI API
 │
 ├── Authentication
 │
 ├── Job Data
 │
 ├── AI Analysis
 │
 └── Database
 │
 ▼
Response
 │
 ▼
React UI
```

## 🌐 Deployment

The frontend can be deployed independently from the backend.

A typical deployment architecture is:

```text
                 Internet
                    │
                    ▼
             React Frontend
                    │
                    │ HTTPS API Requests
                    ▼
             FastAPI Backend
                    │
              ┌─────┴─────┐
              ▼           ▼
          PostgreSQL    Google AI
```

## 🎯 Learning Outcomes

This frontend project provided practical experience with:

* React component development
* Modern frontend architecture
* API integration
* Axios
* Vite
* Tailwind CSS
* JavaScript / JSX
* Frontend/backend separation
* REST API communication
* Production frontend deployment

## 🔮 Future Improvements

Potential improvements include:

* [ ] Advanced job search and filtering
* [ ] Improved dashboard analytics
* [ ] Better mobile responsiveness
* [ ] Job recommendation interface
* [ ] Resume-job matching interface
* [ ] Application reminders
* [ ] Enhanced UI animations
* [ ] Improved loading and error states

## 👨‍💻 Author

**Pratyush Sahoo**

GitHub: [Pratyush-18-hub](https://github.com/Pratyush-18-hub?utm_source=chatgpt.com)

## 📄 License

This project is intended for educational and portfolio purposes.
