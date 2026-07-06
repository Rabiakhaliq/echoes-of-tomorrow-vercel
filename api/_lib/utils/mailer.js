import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null; // email is optional — the app still works without credentials, it just logs instead
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // use a Gmail App Password, not your normal password
    },
  });

  return transporter;
}

export async function sendLetterArrivedEmail(toEmail, letterTitle) {
  const mailer = getTransporter();

  if (!mailer) {
    console.log(`[mailer] (no email configured) Would notify ${toEmail}: "${letterTitle}" has arrived`);
    return;
  }

  await mailer.sendMail({
    from: `"Echoes of Tomorrow" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your letter has arrived!',
    text: `A letter you wrote to yourself, "${letterTitle}", has reached its open date. Log in to read it.`,
  });
}
