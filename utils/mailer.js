const sgMail = require('@sendgrid/mail');
require('dotenv').config(); // ✅ Load environment variables

// ✅ Set API key from .env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ Send Verification Email Function
const sendVerificationEmail = async (to, verificationLink) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL, // ✅ Safer: use .env value
    subject: 'Email Verification - Valkyrrie Meds',
    html: `
      <h2>Welcome to Valkyrrie Meds</h2>
      <p>Thank you for registering.</p>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
      <br />
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Verification email sent to:', to);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    if (error.response) {
      console.error('SendGrid Response Error:', error.response.body);
    }
  }
};

// 🔸 Function to send a simple notification email (like login info)
const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Email sent');
  } catch (error) {
    console.error('❌ Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = { sendVerificationEmail, sendEmail };

