const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://yun.kdbaidu.com')
  console.log('go to https://pan.kdbaidu.com/')
  // https://www.kdbaidu.com
  // https://pan.kdbaidu.com/
  // https://yun.kdbaidu.com


  await page.setViewport({
    width: 1920,
    height: 1280
  })

  await page.focus('input[name=surl]')

  page.keyboard.sendCharacter(`链接：https://pan.baidu.com/s/1cO7MlTe5-PNpXsXaDuKOoQ 
  提取码：83ug 
  复制这段内容后打开百度网盘手机App，操作更方便哦`);

  /**
   * 一层文件夹
   链接：https://pan.baidu.com/s/1xNdfM3Pz6UgtTUWSH05KGg 
提取码：1lbj 
复制这段内容后打开百度网盘手机App，操作更方便哦
   */

   /**
    * 单个文件
  链接：https://pan.baidu.com/s/1cO7MlTe5-PNpXsXaDuKOoQ 
提取码：83ug 
复制这段内容后打开百度网盘手机App，操作更方便哦

    */

  page.click('[type=submit]')

  page.on('load', async () => {
    console.log('page loading donw, start fetch...')
    const result = {}
    // 判断第一层是否是文件夹
    let children = await page.$$('li.py-2')
    let items = await page.$$('li.list-group-item:not(.py-2)')
    // 如果children的长度为0，则是文件
    let newChildren = children.map(async item => {
      return await page.$eval('li.py-2 a', el => {
        return el.innerHTML
      })
    })
    if (items.length) {
      let name = await page.$eval('.list-group:not(.py-2) a', el => {
        return el.innerHTML
      })
      console.log(name);
      const link = await page.$('.list-group .float-right a:nth-child(2)')
      const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
      link.click()
      const newPage = await newPagePromise
      const divCount = await newPage.$eval('.alert-primary .card-text:nth-of-type(3)', el => {
        // const matches = el.innerHTML.match(/^Aria2下载参数：<b><br>(.+?)<\/b>$/)
        // return matches[1]
        return el.innerHTML
      })
      console.log(divCount)
      // const title = await newPage.$$eval('.alert .card-text', el => {
      //   console.log('--------------------------------', el.length)
      //   // document.querySelector()
      //   return el.innerHTML
      // })
      // console.log(title);
      
      
      // let ariaPage = await page.click('.list-group .float-right a:nth-child(2)')

      // page.waitForNavigation({
      //   waitUntil: ['load']
      // })
      // const title = await page.$eval('.alert-heading', el => {
      //   return el.innerHTML
      // })
      // console.log(title);
    }
    console.log(children.length)
    console.log(items.length)
    console.log(newChildren)
    // 因为可能有嵌套文件夹，
    // 根据li.py-2判断是否为文件夹



    // 按照文件夹目录结构进行存储
    // let obj = {}
    // let items = await page.$$('li.list-group-item:not(.py-2)')
    // let name = await page.$eval('li.py-2 a', el => {
    //   return el.innerHTML
    // })
    // obj.name = name
    // obj.isDir = dirs.length !== 0
    // obj.aria2 = obj.isDir ? '' : '还未获取'
    // obj.children = obj.isDir ? '还未获取' : []


    // page.click('.list-group-item.py-2 a')
    // 获取文件夹数组
  })

})();