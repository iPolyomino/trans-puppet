import puppeteer from "puppeteer";

export const GoogleTranslate = async (text: string) => {
  const LAUNCH_OPTION = process.env.DYNO
    ? { headless: false }
    : { args: ["--no-sandbox", "--disable-setuid-sandbox"] };
  const browser = await puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();
  await page.goto(
    "https://translate.google.co.jp/#view=home&op=translate&sl=ja&tl=en"
  );
  await page.type("#source", text);

  await page.waitFor(".translation");

  const element = await page.$(".translation");
  if (element == null) {
    await browser.close();
    return "";
  }

  const result = await element.evaluate((el: any) => el.textContent);

  await browser.close();
  return result;
};
