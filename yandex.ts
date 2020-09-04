import puppeteer from "puppeteer";

export const YandexTranslate = async (text: string) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(
    `https://translate.yandex.com/?lang=ja-en&text=${encodeURI(text)}`
  );

  try {
    await page.waitForFunction(
      'document.getElementById("translation").textContent != ""',
      { timeout: 5000 }
    );
  } catch (e) {
    return "Internal Server Error";
  }

  const element = await page.$("#translation");

  if (element == null) {
    await browser.close();
    return "";
  }
  const result = await element.evaluate((el: any) => el.value);

  await browser.close();
  return result;
};
