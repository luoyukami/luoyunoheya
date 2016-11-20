'ues strict'

var path = require('path')
var config = require('./config')
var Wechat = require('./wechat/wechat')
// 用于调用构造函数上的对应方法
var wechatApi = new Wechat(config.wechat)

// 设定各种自动回复内容
exports.reply = function* (next) {
  var message = this.weixin

  if (message.MsgType === 'event') {
    var reply = '喵喵喵？'
    if (message.Event === 'subscribe') {
      if (message.EventKey) {
        console.log('扫二维码进入:' + message.EventKey + ' ' + message.ticket)
      }
      reply = 'ようこそ我がくに！'
    }
    else if (message.Event === 'unsubscribe') {
      console.log('有人跑辣')
      reply = ''
    }
    else if (message.Event === 'LOCATION') {
      reply = '你上报的位置是： ' + message.Latitude + '/' + message.Longitude + '-' + message.Precision
    }
    else if (message.Event === 'CLICK') {
      reply = '你点击了菜单: ' + message.EventKey
    }
    else if (message.Event === 'SCAN') {
      console.log('关注后扫二维码' + message.EventKey + ' ' + message.Ticket)

      reply = '你扫了下二维码呢'
    }
    else if (message.Event === 'VIEW') {
      reply = '你点击了菜单中的链接：' + message.EventKey 
    }
    this.body = reply
  }
  else if(message.MsgType === 'text') {
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
        url:'http://114.215.140.183:8080/yds'
      }]
    }
    else if (content === '5') {
      var data = yield wechatApi.uploadMaterial('image', path.join(__dirname, '/2.jpeg'))
      reply = {
        type: 'image',
        mediaId: data.media_id
      }
    }
    else if (content === '6') {
      var data = yield wechatApi.uploadMaterial('video', path.join(__dirname, '/6.mp4'))
      reply = {
        type: 'video',
        title: '回复视频内容',
        description: '特斯拉！',
        mediaId: data.media_id
      }
    }
    else if (content === '7') {
      var data = yield wechatApi.uploadMaterial('image', path.join(__dirname, '/2.jpeg'))

      reply = {
        type: 'music',
        title: '回复音乐内容',
        description: '放松一下！',
        musicUrl: 'http://music.163.com/#/m/song?id=744722&userid=73365790',
        thumbMediaId: data.media_id
      }
    }
    else if (content === '8') {
      var data = yield wechatApi.uploadMaterial('image', path.join(__dirname, '/2.jpeg'), {type: 'image'})

      reply = {
        type: 'image',
        mediaId: data.media_id
      }
    }
    else if (content === '9') {
      var data = yield wechatApi.uploadMaterial('video', path.join(__dirname, '/6.mp4'), {type: 'video', description: '{"title": "Really a nice place", "introduction": "Never think it so easy"}'})

      console.log(data)

      reply = {
        type: 'video',
        title: '回复视频内容',
        description: 'zzz',
        mediaId: data.media_id
      }
    }
    else if (content === '10') {
      var picData = yield wechatApi.uploadMaterial('image', path.join(__dirname, '/2.jpeg'), {})

      var media = {
        articles: [{
          title: 'tututu4',
          thumb_media_id: picData.media_id,
          author: 'luoyu',
          digest: '没有摘要',
          show_cover_pic: 1,
          content: '没有内容',
          content_source_url: 'https://github.com'
        }, {
          title: 'tututu5',
          thumb_media_id: picData.media_id,
          author: 'luoyu',
          digest: '没有摘要',
          show_cover_pic: 1,
          content: '没有内容',
          content_source_url: 'https://github.com'
        }]
      }

      data = yield wechatApi.uploadMaterial('news', media, {})
      data = yield wechatApi.fetchMaterial(data.media_id, 'news', {})

      console.log(data)

      var items = data.news_item
      var news = []

      items.forEach(function(item) {
        news.push({
          title: item.title,
          decription: item.digest,
          picUrl: picData.url,
          url: item.url
        })
      })

      reply = news
    }
    else if (content === '11') {
      var counts = yield wechatApi.countMaterial()

      console.log(JSON.stringify(counts))

      var results = yield [
        wechatApi.batchMaterial({
          type: 'image',
          offset: 0,
          count: 10
        }),
        wechatApi.batchMaterial({
          type: 'video',
          offset: 0,
          count: 10
        }),
        wechatApi.batchMaterial({
          type: 'voice',
          offset: 0,
          count: 10
        }),
        wechatApi.batchMaterial({
          type: 'news',
          offset: 0,
          count: 10
        })
      ]

      // console.log(JSON.stringify(results))

      reply = 'ok'
    }

    this.body = reply
  }


  yield next
}