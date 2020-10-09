$(function () {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相通！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    });

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('更新密码成功，2秒后跳转到登录页面！');

                // 这时重置表单,重置表单 reset 属于原生的form表单
                $('.layui-form')[0].reset();

                setTimeout(function () {
                    // 跳转到login
                    window.parent.location.href = '/login.html'
                }, 2000)
            }
        });
    })


    /* ------------------------------------------------------- */
})