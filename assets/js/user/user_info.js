$(function () {
    var form = layui.form;
    var layer = layui.layer;

    // 验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称必须在1~6个字符之间！'
            }
        }
    });

    // 调用函数
    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo() {

        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)

                // 调用 form.val('lay-filter的值'，对象) 快速为表单赋值
                form.val("formUserInfo",res.data)
            }
        });

    }

    // 重置表单的数据
    $('#btnReset').on('click',function(e) {
        e.preventDefault();
        // 重新调用 initUserInfo() 函数，重新获取用户信息
        initUserInfo();
    })


    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e) {
        e.preventDefault();
        // 发起ajax数据请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('更新用户信息成功！')

                // 调用父页面中的方达重新渲染用户的头像和信息
                window.parent.getUserInfo();
            }
        });
    })


    /* -------------------------------------------------- */
})