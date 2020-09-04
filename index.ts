import express from "express";

import { GoogleTranslate } from "./google";
import { DeeplTranslate } from "./deepl";
import { BingTranslate } from "./bing";
import { YandexTranslate } from "./yandex";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.json({ text: "Express + TypeScript Server" }));

app.get("/google", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json({ text: "" });
    return;
  }
  const result = await GoogleTranslate(text);
  res.json({ text: result });
});

app.get("/deepl", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json({ text: "" });
    return;
  }
  const result = await DeeplTranslate(text);
  res.json({ text: result });
});

app.get("/bing", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json({ text: "" });
    return;
  }
  const result = await BingTranslate(text);
  res.json({ text: result });
});

app.get("/yandex", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json({ text: "" });
    return;
  }
  const result = await YandexTranslate(text);
  res.json({ text: result });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
