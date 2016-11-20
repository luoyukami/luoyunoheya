'use strict'

var sha1 = require('sha1')
var getRawBody = require('raw-body')
var util = require('./util_xml')
var Wechat = require('./wechat')

// 暴露出去的promise对象
module.exports = function(opts, handler) {

  var wechat = new Wechat(opts)

  return function* (next) {
    var token = opts.token
    var signature = this.query.signature
    var nonce = this.query.nonce
    var timestamp = this.query.timestamp
    var echostr = this.query.echostr
    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str) 

    if (this.method === 'GET') {
      if (sha === signature) {
        this.body = echostr
      }
      else {
        this.body = 'wrong GET'
      }
    }
    else if(this.method == 'POST') {
      if (sha !== signature) {
        this.body = 'wrong POST'
        return false
      }

      // 获得微信服务器发过来的xml数据
      var data = yield getRawBody(this.req, {
        length: this.length,
        limit: '1mb',
        encoding: this.charset
      })

      // 通过util的方法解析xml数据
      var content = yield util.parseXMLAsync(data)

      // 通过util的方法格式化content的内容
      var message = util.formatMessage(content.xml)

      // 显示下发送过来的数据
      console.log(message)

      // 把信息绑定到this的微信上
      this.weixin = message

      // 用handler处理回复
      yield handler.call(this, next)

      // 编辑回复内容
      var xml = util.tpl(content, message)

      // 调用回复方法
      wechat.replay.call(this)
    }
  }
}