import puppeteer from "puppeteer";

export const DeeplTranslate = async (text: string) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(`https://www.deepl.com/translator#ja/en/${encodeURI(text)}`);

  try {
    await page.waitForFunction(
      'document.getElementsByClassName("lmt__target_textarea")[0].value != ""',
      { timeout: 5000 }
    );
  } catch (e) {
    return "Internal Server Error";
  }

  const element = await page.$(".lmt__target_textarea");
  if (element == null) {
    await browser.close();
    return "";
  }
  const result = await element.evaluate((el: any) => el.value);

  await browser.close();
  return result;
};
