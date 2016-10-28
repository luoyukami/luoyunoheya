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
    else if (message.Event === 'LOCATION') {
      this.body = '你上报的位置是： ' + message.Latitude + '/' + message.Longitude + '-' + message.Precision
    }
    else if (message.Event === 'CLICK') {
      this.body = '你点击了菜单: ' + message.EventKey
    }
    else if (message.Event === 'SCAN') {
      console.log('关注后扫二维码' + message.EventKey + ' ' + message.Ticket)

      this.body = '你扫了下二维码呢'
    }
    else if (message.Event === 'VIEW') {
      this.body = '你点击了菜单中的链接：' + message.EventKey 
    }
  }
  else if(message.Msgtype === 'text') {
    var content = message.Content
    var reply = '你说的' + message.Content + '我听不懂呢'

    if (content === '你好') {
      reply = '你好，我的子民'
    }
    else if(content === '福利') {
      reply = [{
        title: '福利哦',
        description:'没什么好描述的',
        picUrl:'https://acgmoon.org/wp-content/uploads/2016/10/20161024_102109.png',
        url:'https://acgmoon.org/82754.html'
      }]
    }
    this.body = reply
  }

  yield next
}