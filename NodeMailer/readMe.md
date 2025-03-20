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
