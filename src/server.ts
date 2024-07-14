import express from "express";
import { env } from "node:process";
import { MSGID_REGEX, transporter } from "./mail.js";
import { validate } from "./form-validator.js";
import { ContactForm } from "./types/contact-form.js";
import { ContactFormQuery } from "./types/contact-form.enum.js";

const PORT: number = +(env.PORT ?? 3000);
const isProduction: boolean = env.NODE_ENV === "production";

const app = express();
const jsonParser = express.json();

app.get("/", (_req, res) => {
  res.send("Hello, world!\n");
});

app.post("/contact-us", jsonParser, async (req, res, next) => {
  try {
    const isValid = validate(req.body);

    if (!isValid) {
      next(JSON.stringify(validate.errors));
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
      text: form.message,
    });

    const msgId = info.response.match(MSGID_REGEX)?.groups?.msgId;
    if (!msgId) throw Error("Failed to extract message ID");

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
