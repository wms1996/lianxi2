// 注意：每次调用ajax函数时都会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我么给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 再发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);

    
    // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果没有找到匹配的字符串则返回 -1。
    // 注意： indexOf() 方法区分大小写。
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载 comolete 回调函数
    options.complete=function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token');
            // 2.强制跳回到登录页面
            location.href='/login.html';
        }
    }
})