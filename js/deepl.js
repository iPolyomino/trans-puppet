const puppeteer = require("puppeteer");

const inputText = "こんにちは";

(async () => {
  const browser = await puppeteer.launch(
      {args : [ "--no-sandbox", "--disable-setuid-sandbox" ]});
  const page = await browser.newPage();
  await page.goto(
      `https://www.deepl.com/translator#ja/en/${encodeURI(inputText)}`);

  await page.waitForFunction(
      'document.getElementsByClassName("lmt__target_textarea")[0].value != ""');

  const element = await page.$(".lmt__target_textarea");
  const texts = await element.evaluate(el => el.value);

  console.log(texts);

  await browser.close();
})();
