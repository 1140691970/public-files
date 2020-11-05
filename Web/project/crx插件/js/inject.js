/*
 * @Author: your name
 * @Date: 2020-11-04 18:00:11
 * @LastEditTime: 2020-11-05 14:28:57
 * @LastEditors: Please set LastEditors
 * @Description: 浏览器注入js 普通页面能够直接访问的插件资源列表，要在manifest里设置，如果不设置是无法直接访问的  "web_accessible_resources": ["js/inject.js"],
 * @FilePath: \crx插件\js\inject.js
 */

//  点击筛选按钮
$('#pluginMianBtn').on('click', function () {
    var videoBlocks = $('.content-body--29zhI .video-card--1404D') || []

    let data = [] //视频列表数据
    
    videoBlocks.length !== 0 && videoBlocks.forEach(item => {
        let videoTime = $($(item).find('.badge--1NU_M')[0]).html() //视频时间

        let tempStr = $(item).find('.video-card-cover--2Y2HT')[0].style.backgroundImage 
        let videoUrl = tempStr.substring(5, tempStr.length - 2) //视频背景封面图

        let title = $($(item).find('.info-title-text--kEYth')[0]).html() //标题
        let playVolume = $($(item).find('.info-figure-text--2K5OJ')[0]).html() //播放量
        let commentVolume = $($(item).find('.info-figure-text--2K5OJ')[1]).html() //评论量
        let loveVolume = $($(item).find('.info-figure-text--2K5OJ')[2]).html() //点心，点赞量
        let releaseTime = $($(item).find('.info-time--1PtPa')[0]).html() //发布时间

        data.push({
            videoTime,
            videoUrl,
            title,
            playVolume,
            commentVolume,
            loveVolume,
            releaseTime,
        })
    });
    console.log(data)
})