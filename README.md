# 🚀 BookIt Backend (Node.js + TypeScript + MongoDB)

This is the backend service for the **BookIt** adventure experience booking application. It provides robust APIs for managing experiences, bookings, promo codes, and adventure slots.

## ✨ Features at a Glance

* ✅ **Experience Management:** Fetch and display all available experiences.
* ✅ **Booking System:** Book an adventure slot for a specific experience.
* ✅ **Promo Codes:** Validate and apply promotional codes during booking.
* ✅ **Capacity Control:** Update and manage the capacity of adventure slots.
* ✅ **Duplicate Prevention:** Prevent duplicate bookings based on a unique `name` + `email` combination.
* ✅ **Deployment:** Seamlessly deployed on **Render**.

---

## ⚙️ Tech Stack

The project is built on a modern, type-safe stack for robust development and scalability.

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment. |
| **Express.js** | Fast, unopinionated, minimalist web framework. |
| **TypeScript** | Adds static typing for safer, more scalable code. |
| **MongoDB + Mongoose** | NoSQL database and an elegant MongoDB object modeling tool. |
| **dotenv** | Loads environment variables from a `.env` file. |
| **CORS** | Middleware to enable Cross-Origin Resource Sharing. |
| **Render** | Deployment and hosting platform. |
| **nodemon** | Utility for development (auto-reloads on file changes). |

---

## 📁 Project Structure

The codebase follows a standard MVC-like pattern for clear separation of concerns.

---

## 🧰 Setup Instructions

Follow these steps to get a local copy of the project up and running.

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/](https://github.com/)<your-username>/<your-repo-name>.git
cd Backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## 🧪 Running the Project Locally

### 🟢 Development Mode (with auto-reload)
```bash
npm run dev
```

### 🟢 Build the Project
```bash
npm run build
```

### 🟢 Start project
```bash
npm start
```




