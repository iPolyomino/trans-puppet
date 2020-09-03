import express from "express";

import { GoogleTranslate } from "./google";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Express + TypeScript Server"));

app.get("/google", async (req, res) => {
  const result = await GoogleTranslate("こんにちは");
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
