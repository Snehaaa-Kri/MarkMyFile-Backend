# MarkMyFile Backend
### AI-Powered Lab Experiment Submission & Evaluation System  
**Developed by: Sneha Kumari**

---

## Overview
This repository contains the **backend** of the project **MarkMyFile**, which provides APIs for:

- User authentication (JWT)
- Role-based authorization (Student / Faculty)
- Lab and assignment management
- File uploads
- Integration with a Machine Learning plagiarism detection API
- Student–faculty workflow management

This backend strictly follows the **MVC folder structure**.

---

## Project Structure (MVC)

src/
│── config/ # Database & environment setup
│── controllers/ # API logic
│── middlewares/ # JWT, role check, file upload
│── models/ # MongoDB schemas
│── routes/ # All API routes
│── services/ # ML plagiarism service
│── utils/ # Helper functions
│── app.js # Express app configuration
index.js # Main server file

---

## Tech Stack
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Cloudinary (for file uploads)  
- External ML API (Python FastAPI)

---

## 🚀 Getting Started

1. Clone the Repository
```bash
git clone https://github.com/Snehaaa-Kri/MarkMyFile-Backend.git
cd MarkMyFile-Backend
2. Install Dependencies
npm install

3️. Create .env File
PORT=5001
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
ML_API_URL=your-ml-api

4️. Start the Server
npm run dev


Backend will start at:

http://localhost:5001

👩‍💻 Author

Sneha Kumari
CSE, IIIT Una
Backend Developer – MarkMyFile Project