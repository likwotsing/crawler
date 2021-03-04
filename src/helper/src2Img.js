const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)

module.exports = async (src, dir) => {
  if(/\.(jpeg|jpg|png|gif)$/.test(src)) {
    await urlToImg(src, dir)
  } else {
    await base64ToImg(src, dir)
  }
}

// url => image
const urlToImg = promisify((url, dir, cb) => {
  const mod = /^https:/.test(url) ? https : http
  const ext = path.extname(url) // 扩展名，带点的
  const file = path.join(dir, `${Date.now()}${ext}`)
  mod.get(url, res => {
    res.pipe(fs.createWriteStream(file))
      .on('finish', () => {
        cb() // 通知完成
      })
  })
})

// base64 => image
const base64ToImg = async (base64Str, dir) => {
  // data:image/jpeg;base64,/asdfasd
  const matches = base64Str.match(/^data:(.+?);base64,(.+)$/)
  try {
    const ext = matches[1].split('/')[1]
      .replace('jpeg', 'jpg')
    const file = path.join(dir, `${Date.now()}.${ext}`)
    console.log('file', file)
    await writeFile(file, matches[2], 'base64')
  } catch(e) {
    console.log('非法 base64 字符');
  }
}