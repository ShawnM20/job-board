# JobBoard 🧑‍💼

A full-stack job board web application built as a portfolio project. Employers can post and manage job listings, and applicants can browse openings and submit applications with resume uploads — all backed by a RESTful API with JWT authentication.

---

## 🚀 Features

- **Browse Job Listings** — publicly accessible job board with search/filter by title and company
- **User Authentication** — register and login with JWT-based auth, sessions persist via localStorage
- **Post & Delete Jobs** — authenticated users can create and remove job listings
- **Apply for Jobs** — applicants can submit their name, email, and upload a resume (PDF, DOC, DOCX)
- **View Applications** — logged-in users can view all incoming applications for posted jobs
- **Responsive UI** — clean, modern interface built with Tailwind CSS

---

## 🛠 Tech Stack

**Frontend**
- React 19
- React Router v7
- Tailwind CSS v4
- Vite

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- Multer for resume file uploads

---

## 📸 Screenshots

> _Add screenshots here by dragging images into this file on GitHub_

| Job Listings | Job Details | Apply Modal |
|---|---|---|
| ![Job Listings](screenshots/jobs.png) | ![Job Details](screenshots/details.png) | ![Apply](screenshots/apply.png) |

---

## ⚙️ Running Locally

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account (free tier works)

### 1. Clone the repo
```bash
git clone https://github.com/ShawnM20/job-board.git
cd job-board
```

### 2. Set up the backend
```bash
cd job-board-backend
npm install
```

Create a `.env` file in the backend root:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:
```bash
npm run dev
```

### 3. Set up the frontend
```bash
cd job-board-frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📁 Project Structure

```
job-board-backend/
├── config/          # Database connection
├── controllers/     # Route logic (auth, jobs, applications)
├── middleware/      # JWT auth middleware
├── models/          # Mongoose schemas (User, Job, Application)
├── routes/          # Express route definitions
├── uploads/         # Uploaded resumes (gitignored)
├── job-board-frontend/
│   └── src/
│       ├── components/  # ApplyModal
│       ├── context/     # AuthContext
│       └── pages/       # JobList, JobDetails, CreateJob, Applications, Login
└── server.js
```

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the backend runs on (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |

---

Built by [Shawn Martin](https://github.com/ShawnM20)
