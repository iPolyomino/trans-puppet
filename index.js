const puppeteer = require("puppeteer");

const inputText = "こんにちは";

(async () => {
  const browser = await puppeteer.launch({
    // headless : false,
    // slowMo : 200,
    args : [ "--no-sandbox", "--disable-setuid-sandbox" ]
  });
  const page = await browser.newPage();
  await page.goto(
      "https://translate.google.co.jp/#view=home&op=translate&sl=ja&tl=en");
  await page.type("#source", inputText);

  await page.waitFor(".translation");

  const element = await page.$(".translation");
  const texts = await element.evaluate(el => el.textContent);

  console.log(texts);

  await browser.close();
})();
