'use strict'

var Koa = require('koa')

var app = new Koa()

app.use(function *() {
  this.body = 'hello!'
})

app.listen(3000)
console.log('Listening: 3000')