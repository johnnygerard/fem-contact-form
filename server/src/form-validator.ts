import { Ajv, JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import { ContactForm } from "./types/contact-form";
import { ContactFormQuery } from "./types/contact-form.enum";

const ajv = new Ajv();
addFormats.default(ajv);

// JSON Schema draft-07 (https://ajv.js.org/json-schema.html)
const schema: JSONSchemaType<ContactForm> = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    query: {
      type: "number",
      enum: [
        ContactFormQuery.GENERAL_INQUIRY,
        ContactFormQuery.SUPPORT_REQUEST,
      ],
    },
    message: { type: "string" },
  },
  required: ["firstName", "lastName", "email", "query", "message"],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
