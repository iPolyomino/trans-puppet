const puppeteer = require("puppeteer");

const inputText = "こんにちは";

(async () => {
  const browser = await puppeteer.launch({
    headless : false,
    slowMo : 200,
    args : [ "--no-sandbox", "--disable-setuid-sandbox" ]
  });
  const page = await browser.newPage();
  await page.goto(
      `https://translate.yandex.com/?lang=ja-en&text=${encodeURI(inputText)}`);

  await page.waitForFunction(
      'document.getElementById("translation").textContent != ""');

  const element = await page.$("#translation");
  const texts = await element.evaluate(el => el.value);

  console.log(texts);

  await browser.close();
})();
