# 爬虫练习

[puppeteer官网](https://github.com/puppeteer/puppeteer)

1. 入门练习

   /src/screenshot.js

2. 百度图片下载

   /src/mn.js



## 爬虫

按照一定规则自动抓取网络信息的程序

## 反爬虫

- User-Agent，Refer，验证码
- 单位时间访问次数
- 关键信息使用图片混淆（sprit图）
- 异步加载



## 常见爬虫

### superagent+cheerio

superagent：请求目标页面，发送请求得到html

cheerio：node端的jquery，可以转换html对象，方便获取对象信息

缺点：html可能是异步加载实现的