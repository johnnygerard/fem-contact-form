import { env } from "node:process";
import nodemailer from "nodemailer";

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
