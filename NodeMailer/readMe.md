### Flow of "Forgot Password"

1. User clicks "Forgot Password?" on the login page.
2. User enters their email → API generates a reset token and sends a reset link via email.
3. User receives an email with a reset link (http://localhost:5173/reset-password/TOKEN). (or 4 .client url)
4. User enters a new password on the Reset Password page.
5. Password is updated in the database, and the user can log in with the new password.

### Security Considerations

- ✅ Use bcrypt to hash passwords before storing them.
- ✅ Use crypto for generating secure password reset tokens.
- ✅ Set an expiration time for reset tokens (e.g., 1 hour).
- ✅ Use nodemailer to send the reset link securely.
- ✅ Always validate inputs to prevent SQL injection & XSS attacks.

---

---

**To get EMAIL_USER and EMAIL_PASS, follow these steps based on your email provider.**

### 1️⃣ Gmail (Recommended: Use App Passwords)

If you're using **Gmail**, you CANNOT use your regular password. Instead, generate an **App Password**:

#### 🔹 Steps to Generate App Password for Gmail

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)   _(Login if required)_
2. Select **"Mail"** as the App _(or create own)_
3. Select "Device" _(Choose any, e.g., "Windows Computer")_
4. Click **"Generate"**
5. Copy the 16-character password _(without spaces)_
6. Use it in your `.env `file as `EMAIL_PASS`

✅ Your .env file should look like this:

```ini
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2️⃣ Outlook (Hotmail, Live)

For **Outlook** users, you need to generate an **App Password**:

1. Go to [Microsoft Security Settings](https://account.live.com/proofs/manage) 
2. Click **"Create a new app password"**
3. Use the generated password as `EMAIL_PASS`

✅ Your .env file should look like this:

```ini
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-app-password
```

### 3️⃣ Yahoo Mail

For **Yahoo Mail**, generate an **App Password**:

1. Visit [Yahoo Account Security](https://login.yahoo.com/account/security)
2. Click **"Generate App Password"**
3. Use the generated password as `EMAIL_PASS`

✅ Your .env file should look like this:

```ini
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

### 4️⃣ Custom SMTP (e.g., Zoho, AWS SES)

For other email providers, check their SMTP settings.
Example (**Zoho Mail**):

```ini
EMAIL_USER=your-email@zoho.com
EMAIL_PASS=your-password
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
```

#### Final Step: Load .env in Your Project

Make sure your server loads environment variables by adding this at the top of your `server.js` or `index.js`:

```js
require("dotenv").config();
```

[Email Me](mailto:ai.akash.mishra@gmail.com)
