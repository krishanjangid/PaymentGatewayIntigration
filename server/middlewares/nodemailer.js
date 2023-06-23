import nodemailer from 'nodemailer';
import dotenc from 'dotenv';

dotenc.config();
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

export default transporter;