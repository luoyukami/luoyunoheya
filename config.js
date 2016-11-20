var path = require('path')
var util = require('./libs/util')
var access_token_file = path.join(__dirname,'./config/access_token.txt')
var config = {
  wechat: {
    appID: 'wx1ccb8627505e81ba',
    token: 'luoyukaminoheya9zhangjin',
    appSecret: '2ad09f337a839a06f7b57aa266c7aba2',
    getAccessToken: function() {
      return util.readFileAsync(access_token_file)
    },
    saveAccessToken: function(data) {
      data = JSON.stringify(data)
      return util.writeFileAsync(access_token_file,data)
    }
  }
}

module.exports = config