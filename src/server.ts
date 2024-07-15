import express from "express";
import { env } from "node:process";
import { createPlainTextEmail, MSGID_REGEX, transporter } from "./mail.js";
import { validate } from "./form-validator.js";
import { ContactForm } from "./types/contact-form.js";
import { ContactFormQuery } from "./types/contact-form.enum.js";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from "./types/http-status-code.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT: number = +(env.PORT ?? 3000);
const isProduction: boolean = env.NODE_ENV === "production";
const app = express();
const jsonParser = express.json();
const staticRoot: string = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public",
);

// Serve static assets
app.use(express.static(staticRoot));

// Serve single-page application (Angular client-side routing)
app.get("*", (_req, res) => {
  res.sendFile("index.html", { root: staticRoot });
});

app.post("/api/contact-us", jsonParser, async (req, res, next) => {
  try {
    const isValid = validate(req.body);

    if (!isValid) {
      res.status(BAD_REQUEST).json(validate.errors);
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
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ error: "Failed to extract message ID" });
      return;
    }

    const publicUrl = `https://ethereal.email/message/${msgId}`;
    res.send(`Message sent! Public URL: ${publicUrl}\n`);
  } catch (err) {
    next(err);
  }
});

if (isProduction) {
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
