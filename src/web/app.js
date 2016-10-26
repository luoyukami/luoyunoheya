'use strict'

var Koa = require('koa')
var sha1 = require('sha1')
var config = {
  wechat:{
    appId:'wxb5515478cb25bcc5',
    appSecret:'a3ee2c9a7c7083e05e13af1a10db5fe7',
    token:'luoyukaminoheya9zhangjin'
  }
}

var app = new Koa()

app.use(function *(next) {
  console.log(this.query)

  var token = wechat.token
  var signature = this.query.signature
  var nonce = this.query.nonce
  var timestamp = this.query.timestamp
  var ecostr = this.query.ecostr


  var str = [token,timestamp,nonce].sort().join('')
  var sha = sha1(str)

  if(sha === signature){
    this.body = ecostr + ''
  }
  else{
    this.body = 'wrong'
  }
})

app.listen(80)
console.log('Listening:80')