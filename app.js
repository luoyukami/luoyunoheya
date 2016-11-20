'use strict'

var Koa = require('koa')
var path = require('path')
var wechat = require('./wechat/g')
var util = require('./libs/util')
var config = require('./config')
var weixin = require('./weixin')
var access_token_file = path.join(__dirname,'./config/access_token.txt')

var app = new Koa()

app.use(wechat(config.wechat, weixin.reply))

app.listen(3000)
console.log('Listening: 3000')