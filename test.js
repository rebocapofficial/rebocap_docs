const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://d:/rebocap/00 RBC doc/test_carousel.html');
  console.log("Initial active:", await page.evaluate(() => document.querySelector('input:checked').id));
  await page.click('.html-carousel-arrows:nth-of-type(3) label:visible');
  console.log("After 1 click on right arrow:", await page.evaluate(() => document.querySelector('input:checked').id));
  await page.waitForTimeout(500);
  await page.click('.html-carousel-arrows:nth-of-type(3) label:visible');
  console.log("After 2 clicks on right arrow:", await page.evaluate(() => document.querySelector('input:checked').id));
  await browser.close();
})();
