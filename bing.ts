import puppeteer from "puppeteer";

export const BingTranslate = async (text: string) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(`https://www.bing.com/Translator`);

  await page.click("#tta_input_ta");
  await page.type("#tta_input_ta", text);

  page.setDefaultTimeout(5000);
  await page.waitForFunction(
    'document.getElementById("tta_output_ta").value != " ..."'
  );

  const element = await page.$("#tta_output_ta");
  if (element == null) {
    await browser.close();
    return "";
  }
  const result = await element.evaluate((el: any) => el.value);

  await browser.close();
  return result;
};
