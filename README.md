# QuickBazzar – Frontend

🌐 **Live Demo:** [https://quickbazzar.vercel.app/](https://quickbazzar.vercel.app/)

This repository contains the **frontend application for QuickBazzar**, a modern e-commerce platform. The frontend is built with **React** and focuses on performance, clean UI, and seamless integration with the Express backend APIs.

---

## 🚀 Features

* 🔐 User authentication (Login / Register)
* 🛍️ Product listing & product details
* 🛒 Cart management
* 📦 Order placement & order tracking
* 📱 Responsive UI for mobile & desktop
* 🔄 API integration with backend services
* 🌍 Environment-based configuration

---

## 🛠️ Tech Stack

* **Framework:** React.js
* **Language:** JavaScript
* **Styling:** CSS / Bootstrap
* **State Management:** Context API / Redux (as used)
* **HTTP Client:** Axios / Fetch API
* **Deployment:** Vercel
* **Version Control:** Git & GitHub

---

## 📂 Project Structure

```
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/          # Images & static files
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── services/        # API service calls
│   ├── context/         # Global state management
│   ├── utils/           # Helper functions
│   ├── App.js
│   └── index.js
│
├── .env.example         # Sample environment variables
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_BASE_URL=https://your-backend-api-url
```

Example:

```env
REACT_APP_BASE_URL=https://backend-quickbazzar.onrender.com
```

> ⚠️ Do not commit your actual `.env` file.

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/QuickBazzar/frontend.git
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the application

```bash
npm start
```

App will run on:

```
http://localhost:3000
```

---

## 🔗 Backend Integration

This frontend consumes APIs from the **QuickBazzar Express Backend**.

Key integrations include:

* Authentication APIs
* Product & category APIs
* Order & order item APIs

Ensure the backend is running and the `REACT_APP_BASE_URL` is correctly set.

---

## ☁️ Deployment (Vercel)

The application is deployed on **Vercel**.

Deployment steps:

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

Live URL:
👉 [https://frontend-quick-bazzar.vercel.app/](https://frontend-quick-bazzar.vercel.app/)

---

## 👥 Contributors

* **Aditya Kotame**
* **Abhishek Pagar** 
* **Anuprita Borude** 

---

## 📌 Notes

* Ensure CORS is enabled on backend
* Match backend API routes correctly
* Keep environment variables in sync between local & production

---

## 📜 License

This project is for **educational and project use**.

---

⭐ If you like this project, don’t forget to give it a star on GitHub!
