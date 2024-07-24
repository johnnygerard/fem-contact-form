import type { ErrorRequestHandler } from "express";
import express from "express";
import { env } from "node:process";
import { createPlainTextEmail, MSGID_REGEX, transporter } from "./mail.js";
import { validate } from "./form-validator.js";
import { ContactForm } from "./types/contact-form.js";
import { ContactFormQuery } from "./types/contact-form.enum.js";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
} from "./types/http-status-code.js";
import cors from "cors";

const CLIENT_ORIGIN = "https://fem-contact-form-jgerard.vercel.app";
const PORT: number = +(env.PORT ?? 3000);
const app = express();
const jsonParser = express.json();

// Enable CORS for the Angular client
app.use(
  cors({
    allowedHeaders: "Content-Type",
    maxAge: 86400,
    methods: "POST",
    optionsSuccessStatus: NO_CONTENT,
    origin: env.HEROKU_ENV === "production" ? CLIENT_ORIGIN : "*",
    preflightContinue: false,
  }),
);

app.post("/api/contact-us", jsonParser, async (req, res, next) => {
  try {
    const isValid = validate(req.body);

    if (!isValid) {
      res.status(BAD_REQUEST).json({
        error: validate.errors,
        message: "Sorry, the form data is invalid. Please try again.",
      });
      return;
    }

    const form = req.body as ContactForm;
    const info = await transporter.sendMail({
      from: '"Mazie Breitenberg" <mazie3@ethereal.email>',
      to: `"${form.firstName} ${form.lastName}" <${form.email}>`,
      subject:
        form.query === ContactFormQuery.GENERAL_INQUIRY
          ? "General Inquiry"
          : "Support Request",
      text: createPlainTextEmail(form),
    });

    const msgId = info.response.match(MSGID_REGEX)?.groups?.msgId;

    if (!msgId) {
      res.status(INTERNAL_SERVER_ERROR).send({
        error: "Failed to extract message ID",
        message:
          "Your message was sent, but we couldn't retrieve its public URL.",
      });
      return;
    }

    const publicUrl = `https://ethereal.email/message/${msgId}`;
    res.send({ publicUrl });
  } catch (err) {
    next(err);
  }
});

const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.error("Error object:", err);
  res.status(INTERNAL_SERVER_ERROR).send({
    message:
      "Sorry, an unexpected error occurred on our end.\n" +
      "Please try again later.\n\n" +
      "If the problem persists, send us an email at support@example.com.",
  });
};

app.use(defaultErrorHandler);

if (env.NODE_ENV === "production") {
  // Omitted host defaults to 0.0.0.0 or [::] if IPv6 is supported
  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
} else {
  const HOST = "localhost";

  app.listen(PORT, HOST, () => {
    console.log(`Server listening at http://${HOST}:${PORT}`);
  });
}
