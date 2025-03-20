# 📤 Cloudinary Image Upload with Node.js & Multer

## 🚀 Overview

This project demonstrates how to upload images to **Cloudinary** using **Node.js, Express, Multer, and Cloudinary SDK**.

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **Multer** (for handling file uploads)
- **Cloudinary SDK** (for cloud storage)

## 📌 Prerequisites

1. **Cloudinary Account** – Sign up at [Cloudinary](https://cloudinary.com/).
2. **Node.js Installed** – Download from [Node.js official site](https://nodejs.org/).

## 🔧 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/cloudinary-upload.git
   cd cloudinary-upload
   ```
2. Install dependencies:
   ```sh
   npm install express multer cloudinary dotenv
   ```
3. Create a `.env` file and add your **Cloudinary credentials**:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## 📤 Uploading an Image

### 1️⃣ Configure Multer & Cloudinary in `server.js`:

```javascript
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

app.listen(5000, () => console.log("Server running on port 5000"));
```

### 2️⃣ Test with Postman:

- **Endpoint:** `POST http://localhost:5000/upload`
- **Body:** Choose `form-data`, add `image` as `File`

## 🎯 Expected Response

```json
{
  "imageUrl": "https://res.cloudinary.com/your_cloud_name/image/upload/v12345678/sample.jpg"
}
```

## 📜 License

This project is open-source under the **MIT License**.
