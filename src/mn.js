const puppeteer = require('puppeteer');
const { mn } = require('./config/default');
const src2Img = require('./helper/src2Img');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://image.baidu.com');
  console.log('goto http://image.baidu.com')

  // 设置视图大小
  await page.setViewport({
    width: 1920,
    height: 1080
  })
  console.log('set viewport')

  await page.focus('#kw')
  console.log('focus input')

  page.keyboard.sendCharacter('狗');
  page.click('.s_newBtn')

  page.on('load', async () => {
    console.log('page loading done, start fetch...');
    const srcs = await page.evaluate(() => {
      const images = document.querySelectorAll('img.main_img')
      return Array.prototype.map.call(images, img => img.src)
    })

    console.log(`get ${srcs.length} images, start download...`);

    srcs.forEach(async src => {
      await page.waitForTimeout(200)
      await src2Img(src, mn)
    })

    browser.close()
  })
})();