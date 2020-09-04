import puppeteer from "puppeteer";

export const GoogleTranslate = async (text: string) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(
    "https://translate.google.co.jp/#view=home&op=translate&sl=ja&tl=en"
  );
  await page.type("#source", text);

  try {
    await page.waitFor(".translation", { timeout: 5000 });
  } catch (e) {
    return "Internal Server Error";
  }

  const element = await page.$(".translation");
  if (element == null) {
    await browser.close();
    return "";
  }

  const result = await element.evaluate((el: any) => el.textContent);

  await browser.close();
  return result;
};
