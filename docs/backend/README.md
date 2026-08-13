# AI Job Tracker Backend (README Draft)

> This draft is prepared from the live backend repository code at `Pratyush-18-hub/ai-job-tracker-backend` so it can be copied into that repository as `README.md`.

## Project Overview

FastAPI backend service for AI Job Tracker. It provides:
- job application CRUD-lite routes used by the frontend
- user signup/login
- AI resume analysis
- AI-generated resume improvement and downloadable PDF output

## Features and Endpoint Overview

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Health check / service message |
| `GET` | `/jobs` | Fetch all jobs |
| `POST` | `/jobs` | Add a job (`company`, `role`, `status`) |
| `POST` | `/signup` | Register a user |
| `POST` | `/login` | Authenticate user and return token |
| `POST` | `/analyze` | Analyze uploaded resume against job description |
| `POST` | `/improve-resume` | Generate improved resume PDF |

## Tech Stack

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL (via `DATABASE_URL`)
- `python-jose` for JWT creation
- `passlib`/`bcrypt` for password hashing
- Google Gemini API (`google-generativeai`)
- `pypdf` for PDF text extraction
- `reportlab` for PDF generation

## Local Setup

### 1) Clone and install dependencies

```bash
git clone https://github.com/Pratyush-18-hub/ai-job-tracker-backend.git
cd ai-job-tracker-backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2) Configure environment variables

Create `.env`:

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
GOOGLE_API_KEY=<your_google_ai_key>
```

## Running the API

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Default local URL: `http://localhost:8000`

## Deployment Notes

- Ensure `DATABASE_URL` and `GOOGLE_API_KEY` are set in deployment environment.
- Use managed Postgres in production.
- Restrict CORS origins to known frontend domains.
- Replace hardcoded JWT secret in `auth_token.py` with an environment variable before production use.

## Integration with Frontend

Frontend repository:
- `https://github.com/Pratyush-18-hub/ai-job-tracker`

Frontend expects the backend base URL through `VITE_API_BASE_URL` and calls:
- `/jobs`
- `/signup`
- `/login`
- `/analyze`
- `/improve-resume`
