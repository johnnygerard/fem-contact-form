import express from "express";
import { env } from "node:process";

const PORT: number = +(env.PORT ?? 3000);
const isProduction: boolean = env.NODE_ENV === "production";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello, world!\n");
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
