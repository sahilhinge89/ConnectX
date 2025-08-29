
# ConnectX

ConnectX is a fully functional, ed-tech platform designed to provide a seamless and interactive learning experience. Built on the powerful MERN stack (MongoDB, Express.js, React.js, Node.js), it empowers instructors to create and manage high-quality educational content, and enables students to access, consume, and rate that content from anywhere in the world. 🌍

This platform aims to bridge the gap between learners and educators by providing a robust, scalable, and user-friendly environment for online education.



## 🛠️ Tech Stack
 Frontend: React, Vite, Tailwind CSS.

Backend & Database: Node.js, Express.js, MongoDB.



## 📁 File Structure
```bash
connectx/
├── frontend/         # React (Vite) Frontend Application
│   ├── src/
│   ├── public/
│   └── package.json
├── server/           # Node.js (Express) Backend Server
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── package.json
└── package.json      # Root package to run both servers concurrently

```
## 🚀 Run Locally

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You need to have the following software installed on your system:

Node.js (v18.x or higher)

npm 

MongoDB installed and running, or a MongoDB Atlas connection string.

Installation

```bash
 git clone https://github.com/sahilhinge89/ConnectX.git

```

Go to the project directory

```bash
 cd ConnectX
```

Install root dependency 
  


```bash
  npm install
```

Install backend dependencies

```bash
 npm install --prefix server

```

 Install frontend dependencies

```bash
 npm install --prefix frontend

```
# 🔑 Environment Variable

### Server Port
PORT=4000

## MongoDB Connection String from MongoDB Atlas 

MONGODB_URI="your_mongodb_connection_string"

## JWT Secret for signing tokens (use a long, random string)
JWT_SECRET="your_super_secret_key"

## Cloudinary API Credentials for file uploads 
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

## Razorpay API Keys from your Razorpay dashboard
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_SECRET="your_razorpay_secret_key"

## Nodemailer Credentials for sending emails
#### IMPORTANT: For Gmail, it's highly recommended to use an "App Password"
#### if you have 2-Factor Authentication enabled.
MAIL_HOST="smtp.gmail.com"
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your_gmail_app_password"


## Frontend URL (for CORS)
CORS_ORIGIN="http://localhost:5173"
## Running Tests

To run tests, run the following command

```bash
  npm run dev
```

