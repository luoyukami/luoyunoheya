'use strict'

var Koa = require('koa')
var wechat = require('./wechat/g')
var config = {
  wechat:{
    appId:'wxb5515478cb25bcc5',
    appSecret:'a3ee2c9a7c7083e05e13af1a10db5fe7',
    token:'luoyukaminoheya9zhangjin'
  }
}

var app = new Koa()

app.use(wechat(config.wechat))

app.listen(80)
console.log('Listening:80')