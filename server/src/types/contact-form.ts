import { ContactFormQuery } from "./contact-form.enum";

export type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  query: ContactFormQuery;
  message: string;
};
