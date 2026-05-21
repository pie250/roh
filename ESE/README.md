# 🛠️ AI-Based Smart Complaint Management System

A full-stack MERN application that allows users to register and track complaints online. The system uses AI (via OpenRouter) to automatically classify complaint priority, suggest the responsible department, generate automated responses, and summarize complaints.

---

## 🌐 Live Links

| Service | URL |
|---------|-----|
| **Frontend** | https://roh-1.onrender.com/ |
| **Backend API** | https://roh-8xj1.onrender.com|

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js (Vite), Tailwind CSS, React Router v6 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Authentication | JWT (JSON Web Tokens), bcryptjs |
| AI Integration | OpenRouter API (`baidu/cobuddy:free`) |
| Deployment | Render (Frontend as Static Site, Backend as Web Service) |

---

## 📁 Folder Structure

```
complaint-management/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js               # Axios instance with JWT interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Navigation bar
│   │   │   ├── PrivateRoute.jsx       # Route protection
│   │   │   └── AIResultCard.jsx       # AI analysis display card
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ComplaintForm.jsx      # Register new complaint
│   │   │   ├── ComplaintList.jsx      # View all complaints
│   │   │   ├── ComplaintDetail.jsx    # View single complaint + AI result
│   │   │   └── UpdateStatus.jsx       # Update complaint status
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── vite.config.js
│
└── backend/
    ├── config/
    │   └── db.js                      # MongoDB connection
    ├── controllers/
    │   ├── authController.js
    │   ├── complaintController.js
    │   └── aiController.js
    ├── models/
    │   ├── User.js
    │   └── Complaint.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── complaintRoutes.js
    │   └── aiRoutes.js
    ├── middleware/
    │   ├── authMiddleware.js           # JWT verification
    │   └── errorMiddleware.js          # Global error handler
    ├── .env
    └── index.js
```

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- OpenRouter API Key (https://openrouter.ai)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/complaint-management.git
cd complaint-management
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```dotenv
PORT=5002
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=baidu/cobuddy:free
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
node index.js
```

Backend runs at: `http://localhost:5002`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```dotenv
VITE_API_BASE_URL=http://localhost:5002
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

### 🔐 Auth APIs (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user, returns JWT token |
| POST | `/api/auth/login` | Login with email & password, returns JWT token |

### 📋 Complaint APIs (Protected — Bearer Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/complaints` | Submit a new complaint (auto-triggers AI analysis) |
| GET | `/api/complaints` | Get all complaints |
| GET | `/api/complaints/:id` | Get a single complaint by ID |
| PUT | `/api/complaints/:id` | Update complaint status |
| DELETE | `/api/complaints/:id` | Delete a complaint |
| GET | `/api/complaints/search?location=Ghaziabad` | Search complaints by location |
| GET | `/api/complaints/filter?category=Water Supply` | Filter complaints by category |

**Add Complaint Request Body:**
```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "title": "Water Leakage Issue",
  "description": "Water pipeline is damaged near the main market area.",
  "category": "Water Supply",
  "location": "Ghaziabad"
}
```

**Update Status Request Body:**
```json
{
  "status": "In Progress"
}
```

---

### 🤖 AI API (Protected — Bearer Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/analyze` | Analyze a complaint description using AI |

**Request Body:**
```json
{
  "description": "There is no electricity in our area since last 3 days."
}
```

**Response:**
```json
{
  "urgency": "Critical",
  "department": "Electricity",
  "summary": "Electricity outage for 3 days due to damaged transformers.",
  "autoResponse": "We sincerely apologize for the inconvenience. Our Electricity department has been notified and will resolve this on priority."
}
```

---

## 🤖 AI Features

The system integrates **OpenRouter AI** to automatically:

| Feature | Description |
|---------|-------------|
| **Priority Detection** | Classifies urgency as Low / Medium / High / Critical |
| **Department Recommendation** | Suggests the responsible department (Water Supply, Electricity, Sanitation, Roads, Health, Other) |
| **Complaint Summary** | Generates a one-line summary of the complaint |
| **Auto Response** | Generates a polite, professional reply to send back to the complainant |

AI analysis is triggered automatically when a complaint is submitted and the result is stored in MongoDB alongside the complaint.

---

## 🔐 Authentication & Security

- Passwords are hashed using **bcryptjs** (salt rounds: 10)
- **JWT tokens** are issued on signup and login (expiry: 7 days)
- All complaint and AI routes are protected with JWT middleware
- CORS is configured to allow only the frontend origin

---

## 🧪 Test Cases

| Action | Expected Result |
|--------|----------------|
| Signup with valid data | Token returned, redirected to complaints |
| Login with valid credentials | Token returned |
| Login with wrong password | 401 Unauthorized error |
| Access protected route without token | 401 Access denied |
| Submit complaint with all fields | Complaint saved with AI analysis |
| Submit complaint with missing title | 400 Validation error |
| Submit complaint with invalid email | 400 Validation error |
| Get all complaints | List of all complaints returned |
| Filter by category | Only matching complaints returned |
| Search by location | Only matching complaints returned |
| Update complaint status | Status updated successfully |
| Delete complaint | Complaint removed from database |
| AI analyze water leakage | Water Supply department suggested |
| AI analyze electricity issue | High/Critical urgency returned |
| AI analyze garbage complaint | Sanitation department suggested |

---

## 🚀 Deployment on Render

### Backend (Web Service)
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- Set all environment variables in Render dashboard

### Frontend (Static Site)
- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- Set `VITE_API_BASE_URL` to the backend Render URL in Render dashboard

> ⚠️ After deploying both, update `CLIENT_URL` in the backend environment variables to the live frontend URL and redeploy the backend.

---

## 📦 MongoDB Schema

### Complaint
```js
{
  name: String,          // required
  email: String,         // required, validated format
  title: String,         // required
  description: String,   // required
  category: String,      // required
  location: String,      // required
  status: String,        // default: "Pending"
  aiAnalysis: {
    urgency: String,
    department: String,
    summary: String,
    autoResponse: String
  },
  createdAt: Date        // default: Date.now
}
```

### User
```js
{
  name: String,          // required
  email: String,         // required, unique
  password: String       // bcrypt hashed
}
```

---

## 👨‍💻 Author

**Yash Varshney**
