const puppeteer = require("puppeteer");

const inputText = "こんにちは";

(async () => {
  const browser = await puppeteer.launch(
      {args : [ "--no-sandbox", "--disable-setuid-sandbox" ]});
  const page = await browser.newPage();
  await page.goto(`https://www.bing.com/Translator`);

  await page.click("#tta_input_ta");
  await page.type("#tta_input_ta", inputText);

  await page.waitForFunction(
      'document.getElementById("tta_output_ta").value != " ..."');

  const element = await page.$("#tta_output_ta");
  const texts = await element.evaluate(el => el.value);

  console.log(texts);

  await browser.close();
})();
