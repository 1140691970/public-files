// 引入jssdk
var wx = require('./index.js');

// 调用时间方法
var dayjs = require('../dayjs.min.js')

// 获取vue实例
var MAIN = require('../../main.js')

var util = require('./util.js')

// 是否在微信客户端
const isWechat = () => {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/micromessenger/i) == 'micromessenger') {
		// console.log('是微信客户端')
		return true;
	} else {
		// console.log('不是微信客户端')
		return false;
	}
}

// 判断是否是苹果 true/false
const isIphone = (/iphone|ipad/gi).test(navigator.appVersion);


//初始化sdk配置
const init_jssdk = (callback, url) => {
	let nonceStr = 'boss'
	let timestamp = dayjs('2019-01-25').unix()
	
	//这里调用了后台接口，后台处理获取签名
	MAIN.app.$u.api.getSignature({
		url,
		timestamp,
		noncestr: nonceStr,
	}).then(res => {
		if (res.data) {
			wx.config({
				beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
				debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: 'ww.....', // 必填，企业微信的corpID
				timestamp: timestamp, // 必填，生成签名的时间戳
				nonceStr: nonceStr, // 必填，生成签名的随机串
				signature: res.data, // 必填，签名，见 附录-JS-SDK使用权限签名算法
				jsApiList: ['checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'getLocation',
					'closeWindow',
				] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
			});
		}
		if (callback) {
			callback(res)
		}
	})
}

// 获取定位
const getLocation = (data, url) => {
	url = url ? url : window.location.href;
	if (!isWechat()) {
		return;
	}
	//每次都需要重新初始化配置，才可以进行分享  
	init_jssdk(signData => {
		console.log('signData==>', JSON.stringify(signData))
		wx.getLocation({
			type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: function(res) {
				console.log('res==>', res)
			},
			fail: (res) => {
				console.log('获取信息失败res==>', res)
			}
		});
	}, url);
}

// 关闭当前网页窗口接口
const closeWindow = (url) => {
	url = url ? url : window.location.href;
	if (!isWechat()) {
		return;
	}
	//每次都需要重新初始化配置
	init_jssdk(signData => {
		wx.closeWindow();
	}, url);
}

// 微信授权
const wxAuthorize = () => {
	// 已经授权登录过的就不用再授权了
	if (MAIN.app.vuex_logoInfo) return;

	let code = util.getQueryString('code')

	// 如果拿到code，可以调用授权接口，没有拿到就跳转微信授权链接获取
	if (!!code) {
		// 这里可以调用后台接口，授权
	} else {
		let appid = 'ww.........'; //ww开头的appid

		let uri = encodeURIComponent(window.location.href);

		let scope = 'snsapi_base'; // 静默授权
		// let scope = 'snsapi_userinfo'; // 获取用户信息

		let agentid = 1000006;  //agentid

		let authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=10000#wechat_redirect`;
		window.location.href = authURL;
	}
}

export {
	isWechat,
	isIphone,
	getLocation,
	closeWindow,
	wxAuthorize,
}
