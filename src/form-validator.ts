import { Ajv, JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats.default(ajv);

enum ContactFormQuery {
  GENERAL_INQUIRY,
  SUPPORT_REQUEST,
}

type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  query: ContactFormQuery;
  message: string;
};

// JSON Schema draft-07 (https://ajv.js.org/json-schema.html)
const schema: JSONSchemaType<ContactForm> = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    query: { type: "number", enum: [0, 1] },
    message: { type: "string" },
  },
  required: ["firstName", "lastName", "email", "query", "message"],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
