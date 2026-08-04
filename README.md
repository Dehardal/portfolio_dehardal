# 🚀 Premium Full-Stack Portfolio: Deepankar Dayal

This is the state-of-the-art, interactive full-stack developer portfolio and SaaS architect showcase built for **Deepankar Dayal**.

Positioned as: **“Full Stack Developer • Product Thinker • Innovation-Focused Problem Solver”**.

---

## 🛠️ Technology Stack

### Frontend Architecture
- **React + Vite**: High-performance component bundling.
- **Tailwind CSS**: Glassmorphic styling, neon glows, and dark/light color modes.
- **Lucide Icons**: Fluid iconography dashboard integration.
- **Canvas Particles Background**: Custom interactive float-elements background layer.
- **Cursor Rings Trailer**: Custom interactive dampened cursor trail.

### Backend Infrastructure
- **Node.js & Express.js**: REST API routing.
- **Mongoose / MongoDB**: Robust indexing schema setups for Projects, Blogs, and Skills.
- **JSON Fallback Core DB**: Dynamic in-memory JSON fallback if local MongoDB is absent, ensuring 100% instant operational capability out-of-the-box.
- **JWT Authorization Shield**: Secure route middleware validation.

---

## 📂 Project Architecture

```text
portfolio-deepankar/
├── package.json               # Root package file for concurrent operations
├── README.md                  # Comprehensive workspace documentation
├── backend/                   # Node.js + Express API Backend
│   ├── .env                   # Environmental variables
│   ├── .env.example           # Variables template
│   ├── server.js              # Server entry point
│   ├── config/
│   │   └── db.js              # Mongoose DB connector with JSON fallback
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   ├── projectController.js
│   │   └── skillController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT validation protection
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Blog.js
│   │   ├── Project.js
│   │   └── Skill.js
│   └── routes/
│       ├── authRoutes.js
│       ├── blogRoutes.js
│       ├── projectRoutes.js
│       └── skillRoutes.js
└── frontend/                  # React + Vite Frontend
    ├── index.html             # Google fonts & SEO parameters template
    ├── package.json           # Frontend dependencies config
    ├── postcss.config.js
    ├── tailwind.config.js     # Glowing box-shadows, animations, and HSL custom colors
    ├── vite.config.js         # API endpoint proxy settings (Proxy to :5000)
    └── src/
        ├── App.jsx            # Core routing and globally integrated contexts
        ├── index.css          # Futuristic custom rounded scrollbars, grids, cursors
        ├── main.jsx
        └── pages/             # 12+ Premium Views
            ├── Home.jsx       # Terminal CLI console text typewriter & metrics
            ├── About.jsx      # Storytelling Vertical Connector Timelines
            ├── Skills.jsx     # Tab-filtered technical gauges progress lines
            ├── Projects.jsx   # Search grids, list-toggles, detail modal highlights
            ├── RealWorldProblems.jsx # Problem-vs-Solution slide indicators
            ├── InnovationLab.jsx     # Roadmap nodes & future research concepts
            ├── Experience.jsx        # Deep-dive timeline at Prits IT Solutions
            ├── Blog.jsx       # Read-duration index & list routing triggers
            ├── BlogDetail.jsx # Text markdown parser & viewport progress tracking
            ├── GithubIntegration.jsx # Contribution heat grids & repo highlights
            ├── Contact.jsx    # Alert validated transaction panels
            ├── AdminLogin.jsx # Security dashboard login forms
            └── AdminDashboard.jsx # JWT secured CRUD list controllers
```

---

## ⚡ Quickstart Setup Guide

Follow these steps to launch the entire stack on your local workspace:

### 1. Prerequisite Installations
Ensure you have **Node.js (v18+)** and **npm** installed on your operating system.

### 2. Install Workspace Dependencies
Open a command terminal at the root workspace directory `C:\Users\ddaya\.gemini\antigravity-ide\scratch\portfolio-deepankar` and execute:
```bash
npm run install-all
```
This triggers package installations for both backend and frontend subfolders in one single sweep.

### 3. Launch Development Environments
Once installations conclude successfully, initiate the unified concurrent runner command:
```bash
npm run dev
```
This concurrently fires the Express API on port `5000` and the React Vite client on port `3000`.

### 4. Admin Access Credentials
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) in your browser:
- **Default Username**: `admin`
- **Default Password**: `adminPassword123`

---

## 🛡️ Production Deployment

### 1. Build Client Bundle
Generate high-speed, minified static browser bundles:
```bash
npm run build
```
The client output compiles into `frontend/dist`.

### 2. Establish Environmental Variables
Configure variables in your hosting environment (e.g. Render, Vercel, Heroku):
- `MONGO_URI`: Your MongoDB Atlas deployment string.
- `JWT_SECRET`: A high-entropy signing string key.
- `ADMIN_USER` & `ADMIN_PASSWORD`: Your custom login entries.
- `PORT`: `5000`
