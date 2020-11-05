/*
 * @Author: your name
 * @Date: 2020-11-04 09:52:49
 * @LastEditTime: 2020-11-05 14:23:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \crx插件\js\content_scripts.js
 */
console.log('插件已注入到页面...')

// 向页面注入JS
function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
    document.head.appendChild(temp);
    console.log('injectCustomJs...')
}

//监听消息
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        injectCustomJs()

        if (request.action === "copy") {
            //收到copy信息，开始获取当前页面id为sb_form_q的值

            $('body').append('<div id="pluginMianBtn">筛选数据</div>')

            var ctrl = $("img");

            if (ctrl.length > 0) {
                //获取页面所有得图片路径 urls
                let urls = []
                for (let index = 0; index < ctrl.length; index++) {
                    urls.push(ctrl[index].src)
                }

                // 如果获取的值不为空则返回数据到popup.js的回调函数
                if (sendResponse) sendResponse(urls);
            }
        }

        if (request.action === "paste") {
            // 收到paste消息和之前抓取的值
            var ctrl = $("#search-blog-words");
            if (ctrl.length > 0) {
                // 将值放入目标网页的id为input的输入框中
                ctrl.val(request.data);
                sendResponse("OK");
            }
        }

    }
);