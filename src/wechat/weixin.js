'ues strict'

exports.reply = function* (next) {
  var message = this.weixin

  if (message.Msgtype === 'event') {
    if (message.Event === 'subscribe') {
      if (message.EventKey) {
        console.log('扫二维码进入:' + message.EventKey + ' ' + message.ticket)
      }

      this.body = 'ようこそ我がくに！'
    }
    else if (message.Event === 'unsubscribe') {
      console.log('有人跑辣')
      this.body = ''
    }
  }
  else if(message.Msgtype === 'text') {
    if (message.content === '你好') {
      this.body = '你好，我的子民'
    }
  }

  yield next
}