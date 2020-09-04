import express from "express";

import { BingTranslate } from "./bing";
import { DeeplTranslate } from "./deepl";
import { GoogleTranslate } from "./google";

const app = express();
const PORT = process.env.PORT || 3000;

const OK = (text: string) => {
  return { code: 200, text: text };
};
const BadRequest = {
  code: 400,
  text: "Bad Request",
};
const InternalServerError = {
  code: 500,
  text: "Internal Server Error",
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => res.json(OK("Express + TypeScript Server")));

app.get("/bing", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json(BadRequest);
    return;
  }
  try {
    const result = await BingTranslate(text);
    res.json(OK(result));
    return;
  } catch (e) {
    console.error(e);
    res.json(InternalServerError);
  }
});

app.get("/deepl", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json(BadRequest);
    return;
  }
  try {
    const result = await DeeplTranslate(text);
    res.json(OK(result));
    return;
  } catch (e) {
    console.error(e);
    res.json(InternalServerError);
  }
});

app.get("/google", async (req, res) => {
  const text = req.query.text as string;
  if (text === "") {
    res.json(BadRequest);
    return;
  }
  try {
    const result = await GoogleTranslate(text);
    res.json(OK(result));
    return;
  } catch (e) {
    console.error(e);
    res.json(InternalServerError);
  }
});

app.get("/*", (req, res) => res.json(BadRequest));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
