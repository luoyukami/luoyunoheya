'use strict'

var path = require('path')
var util = require('./libs/util')
var wechat_file = path.join(__dirname,'./config/wechat.txt')

var config = {
  wechat:{
    appID:'wxb5515478cb25bcc5',
    appSecret:'a3ee2c9a7c7083e05e13af1a10db5fe7',
    token:'luoyukaminoheya9zhangjin',
    getAccessToken: function() {
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken: function(data) {
      data = JSON.stringify(data)
      return util.writeFileAsync(wechat_file,data)
    }
  }
}

module.exports = config