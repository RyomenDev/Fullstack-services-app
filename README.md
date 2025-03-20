# FullStack Services App

## Description

A full-stack application integrating various services such as **Nodemailer** for email functionalities, **Cloudinary** for image storage, **Multer** for file uploads, and **JWT authentication**. Built with **React.js (frontend)** and **Node.js/Express (backend)**, using MongoDB as the database.

## Features

✅ User Authentication with JWT (Login, Signup, Password Reset)
✅ Nodemailer for email notifications and verification
✅ Cloudinary integration for secure image storage
✅ Multer for handling file uploads (profile images, documents, etc.)
✅ MongoDB with Mongoose for database management
✅ React.js with Redux for frontend state management
✅ Express.js for building RESTful APIs
✅ Tailwind CSS for modern UI styling

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Services:** Nodemailer, Cloudinary, Multer, JWT

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```


## Usage

- Users can sign up, log in, and reset passwords.
- Upload profile images/documents using Multer and Cloudinary.
- Receive email notifications via Nodemailer.
- Secure authentication with JWT tokens.

## Contributions

Contributions are welcome! Feel free to fork this repository, open issues, or submit pull requests.

## License

This project is licensed under the MIT License.
