import { env } from "node:process";
import nodemailer from "nodemailer";
import { ContactForm } from "./types/contact-form.js";

export const MSGID_REGEX = /MSGID=(?<msgId>[^\]]+)/;

if (!env.ETHEREAL_PWD) {
  throw Error("Missing environment variable: ETHEREAL_PWD");
}

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "mazie3@ethereal.email",
    pass: env.ETHEREAL_PWD,
  },
});

export function createPlainTextEmail(form: ContactForm): string {
  return `Dear ${form.firstName} ${form.lastName},

Thank you for reaching out to us. Our team will review your request and get back to you as soon as possible.

Here is a summary of your request:

> ${form.message}

Best regards,
The Customer Service Team`;
}
