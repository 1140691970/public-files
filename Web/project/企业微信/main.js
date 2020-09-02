import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 一些工具方法都在 util 里头
let util = require('./common/jsweixin/util.js')
Vue.prototype.util = util

//  wechat.js 定义为为 vue 全局属性，方便后面使用。
let wechat = require('./common/jsweixin/wechat.js')
Vue.prototype.$wechat = wechat

// 日期库
let dayjs = require('./common/dayjs.min.js')
Vue.prototype.dayjs = dayjs
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

export const app = new Vue({
	...App
})

app.$mount()
