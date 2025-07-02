# 📊 Admin Dashboard – Full Stack Management System

In the past few days, I developed a full-featured system for managing administrative tasks, focused on performance, usability, and real-time data visualization.

The project was built using **React.js with Vite**, **TailwindCSS**, **Shadcn/UI**, **Recharts**, **Node.js**, **Express**, and **MongoDB**.

---

## 🎯 Goal

To create a modern and efficient admin environment for companies to track actions, tasks, and demands, with automated reports and charts that support strategic decisions.

---

## 🛠️ Main Features

✅ **Interactive Dashboard (Recharts)**  
Real-time bar and line charts showing pending, in-progress, and completed actions.

✅ **PDF Reports (jsPDF + autoTable)**  
Automatic professional reports with status summary and completion percentages.

✅ **Action Management**  
Store actions with full details (name, date, description, status) in MongoDB.

✅ **Admin Login System**  
Access control via Node.js + Express backend.

✅ **Clean & Responsive Design**  
UI optimized with TailwindCSS + Shadcn/UI for smooth usability.

---

## 🧪 Getting Started

### 🔗 Clone the repository:

```
git clone https://github.com/thalisbdrago/page-admin.git
cd page-admin
```

---

### 🔧 Setup

#### 🔹 Frontend (admin)

```
cd admin
npm install
npm run dev
```

#### 🔹 Backend (backend)

```
cd backend
npm install
npm run dev
```

Create a `.env` file inside the `/backend` folder with the following variables:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

---

### 🧩 Admin User Setup (MongoDB)

Before accessing the system, you must manually insert an admin user into the MongoDB collection:

1. Open **MongoDB Compass** and navigate to the collection:  
   `admP > admin > adminUser`

2. Click on **"Add Data" → "Insert Document"**

3. Use the following format:

```json
{
  "email": "admin",
  "password": "securepassword"
}
```

> ⚠️ The password is stored as plain text (for demo purposes only). For production, implement proper hashing (e.g. bcrypt).

---

Now the system is ready to use!
