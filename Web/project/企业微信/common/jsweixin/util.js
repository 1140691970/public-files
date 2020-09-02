// 获取浏览地址指定参数值
export const getQueryString = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}


// 转拼接字符串参数方法
export const toSpliceUrl = (data) => {
	var objNew = []
	for (let i in data) {
		objNew.push(i + '=' + data[i])
	}
	return objNew.join('&')
}


export const ajax = (type = 'GET', url, data, headers, success, error) => {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject();
	}
	if (type == 'OPTIONS') {
		return console.log(type);
	}

	// get请求将data请求参数拼接到路径后头
	if (type == 'GET' && data) {
		url = url + '?' + toSpliceUrl(data);
	}

	const headKeyArr = Object.keys(headers)

	// 初始化一个请求
	xhr.open(type, url, true);

	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')

	if (type == 'GET') {
		xhr.send(null);
	} else {
		var upObj = new URLSearchParams()
		xhr.send(upObj);
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var res = JSON.parse(xhr.responseText)
				success && success(res);
			} else {
				// error && error(JSON.parse(xhr.responseText))
			}
		}
	}
}
