import { ContactFormQuery } from "./contact-form.enum.js";

export type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  query: ContactFormQuery;
  message: string;
};
