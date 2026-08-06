# 💬 ChatWaves-Real-time-chat-app


**ChatWaves** is a real-time web chat application built using the **MERN stack** and **Socket.IO**. It enables users to chat with each other in real-time, view online users, search for others, and maintain chat history — all with a clean, responsive interface.

---

## 🚀 Features

- 🔐 User Authentication (Login & Register)
- 📡 Real-time Messaging with Socket.IO
- 🟢 Online User Detection
- 💬 Conversation History
- 🔍 User Search Functionality
- 🔔 Sound Notification on New Message
- 🎨 Clean and Responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js (with Vite)
- Tailwind CSS
- Axios
- React Router DOM
- Socket.IO Client

### 🔹 Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Socket.IO Server
- JWT for Authentication
- Cookie-based Session Handling

---

## 📦 Installation Guide

### ✅ Prerequisites

Make sure you have the following installed:

- Node.js >= 16.x
- npm or yarn
- MongoDB (Local or MongoDB Atlas)

---

### 🔧 Step-by-Step Setup

#### 1. Clone the Repository


git clone https://github.com/your-username/ChatWaves-Real-time-chat-app.git
cd ChatWaves-Real-time-chat-app
2. Backend Setup (/backend)



cd backend
npm install
Create a .env file in the backend folder:

env file
PORT=4001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key


Start the backend server:


npm start
Server will run at: http://localhost:4001

3. Frontend Setup (/frontend)

cd ../frontend
npm install
Start the frontend development server:


npm run dev
Client will run at: http://localhost:5173

📁 Folder Structure

📦 ChatWaves-Real-time-chat-app
├── 📂 backend
│   ├── 📂 controller
│   ├── 📂 models
│   ├── 📂 routes
│   ├── 📄 server.js
│   └── 📄 .env
├── 📂 frontend
│   ├── 📂 public
│   ├── 📂 src
│   │   ├── 📂 assets
│   │   ├── 📂 components
│   │   │   ├── ChatUser.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Type.jsx
│   │   │   ├── Search.jsx
│   │   ├── 📂 context
│   │   │   ├── AuthProvider.jsx
│   │   │   ├── SocketContext.jsx
│   │   ├── 📂 statemanage
│   │   │   ├── useConversation.js
│   │   ├── 📄 App.jsx
│   │   ├── 📄 main.jsx
│   └── 📄 index.css
└── 📄 README.md



🧪 How to Test
Open two browser windows or tabs.

Login with two different user accounts.

Start a chat between them.

Verify the following:

✅ Online user status updates in real-time

✅ Messages are sent and received instantly

✅ Message history is preserved on refresh

✅ Sound notification on new messages

✅ User search shows correct results

🧠 Possible Future Improvements
📸 Add profile pictures & media sharing

🧵 Group Chat Support

✅ Message read receipts

🌍 Internationalization

🧩 Admin dashboard (moderation, stats)

👨‍💻 Author
Lavkush (lavkumarnimcet2023@gmail.com)



💪 My Efforts & Gratitude
Building ChatWaves-Real-time-chat-app wasn’t just a coding project — it was a journey filled with:

Sleepless nights, debugging mysterious errors,

Endless trial-and-error while syncing real-time communication,

And deep dives into documentation to master new tools & concepts.

I took complete ownership of the app — from designing the user interface to wiring up the backend logic, managing user sessions, and enabling seamless socket communication. Every line of code reflects my passion for building something real and useful.

I didn’t just want to build a chat app — I wanted to build an experience that feels smooth, fast, and human.

🙏 Thank You!
Thank you for checking out or using the ChatWaves.
Your time and interest mean a lot. I hope you enjoy chatting as much as I enjoyed creating it.

If you liked it or found it useful, feel free to give it a ⭐ on GitHub or share your feedback — it really motivates me to keep building better.

