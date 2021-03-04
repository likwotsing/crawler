const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://pan.kdbaidu.com/')
  console.log('go to https://pan.kdbaidu.com/')

  await page.setViewport({
    width: 1920,
    height: 1280
  })

  await page.focus('input[name=surl]')

  page.keyboard.sendCharacter(`链接：https://pan.baidu.com/s/1KUcizb9szvDRvgSqDGaziA 
  提取码：p1xm 
  复制这段内容后打开百度网盘手机App，操作更方便哦`);

  page.click('[type=submit]')

  page.on('load', async () => {
    console.log('page loading donw, start fetch...')

    page.click('.list-group-item a')
    page.on('load', async () => {
      console.log('二级目录')
    })
  })

})();