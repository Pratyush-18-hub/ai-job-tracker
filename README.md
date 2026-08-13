# AI Job Tracker (Frontend)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Frontend client for an AI-powered job search workflow. This app combines job application tracking with resume analysis and resume improvement flows backed by the companion API service.

## Project Overview

This React + Vite application helps candidates:
- track job applications by company, role, and status
- sign up and log in
- upload a resume and compare it against a job description
- download an AI-improved PDF resume draft

## Features

- Authentication UI (sign up / login)
- Job tracking dashboard with status insights:
  - Applied
  - Interview
  - Offer
  - Rejected
- Resume analyzer with ATS-style scoring and suggestions
- Resume improvement + PDF download flow
- Backend API integration (Railway-hosted service by default)

## Screenshots

> Add project screenshots here as they become available.

- `docs/screenshots/login.png` (placeholder)
- `docs/screenshots/dashboard.png` (placeholder)
- `docs/screenshots/analyzer.png` (placeholder)

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Axios
- ESLint

## Local Setup

### 1) Clone and install

```bash
git clone https://github.com/Pratyush-18-hub/ai-job-tracker.git
cd ai-job-tracker
npm install
```

### 2) Configure environment

Create a `.env` file in the project root (or use `.env.local`) and set:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

If not set, the frontend falls back to:

`https://ai-job-tracker-backend-production-ab23.up.railway.app`

### 3) Run locally

```bash
npm run dev
```

Open the app at `http://localhost:5173`.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | No | Base URL for the backend API. |

## API / Backend Connection Notes

The frontend expects these backend routes:

- `GET /jobs`
- `POST /jobs`
- `POST /signup`
- `POST /login`
- `POST /analyze`
- `POST /improve-resume`

For the companion backend repository, see:
`https://github.com/Pratyush-18-hub/ai-job-tracker-backend`

## Deployment Notes

- Frontend can be deployed on Vercel/Netlify.
- Ensure `VITE_API_BASE_URL` points to your deployed backend.
- Backend CORS must allow your frontend deployment domain.

## Folder Structure

```text
ai-job-tracker/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── package.json
└── vite.config.js
```

## Future Improvements

- Persist authentication token in secure storage/session handling
- Add route-based architecture and protected routes
- Add robust API error handling and loading states
- Add automated unit/integration tests
- Add CI checks for lint/build/test

## Contributing

Please review [CONTRIBUTING.md](./CONTRIBUTING.md) before opening issues or pull requests.

## Backend README Template

A production-ready backend README draft (based on the current backend code) is provided at:

`./docs/backend/README.md`
