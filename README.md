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

Clone the repository:

git clone https://github.com/thalisbdrago/page-admin.git

cd page-admin

### 🔧 Setup

#### Frontend (admin)

cd admin

npm install

npm run dev

#### Backend (backend)

cd backend
npm install
npm run dev


Create a `.env` file in the `/backend` folder:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
