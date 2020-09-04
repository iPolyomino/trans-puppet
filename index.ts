import express from "express";

import { BingTranslate } from "./bing";
import { DeeplTranslate } from "./deepl";
import { GoogleTranslate } from "./google";
import { YandexTranslate } from "./yandex";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => res.json({ text: "Express + TypeScript Server" }));

app.get("/google", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json({ text: "" });
    return;
  }
  try {
    const result = await GoogleTranslate(text);
    res.json({ text: result });
    return;
  } catch (e) {
    console.error(e);
  }
  res.json({ text: "error" });
});

app.get("/deepl", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json({ text: "" });
    return;
  }
  try {
    const result = await DeeplTranslate(text);
    res.json({ text: result });
    return;
  } catch (e) {
    console.error(e);
  }
  res.json({ text: "error" });
});

app.get("/bing", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json({ text: "" });
    return;
  }
  try {
    const result = await BingTranslate(text);
    res.json({ text: result });
    return;
  } catch (e) {
    console.error(e);
  }
  res.json({ text: "error" });
});

app.get("/yandex", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json({ text: "" });
    return;
  }
  try {
    const result = await YandexTranslate(text);
    res.json({ text: result });
    return;
  } catch (e) {
    console.error(e);
  }
  res.json({ text: "error" });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
