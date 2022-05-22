$(function() {
    getUserInfo ();

    // 获取 layer
    const layer = layui.layer;
    $("#btnLogout").click(() => {
        layer.confirm("确认是否退出", { icon: 3, title: ""}, function (index) {
            localStorage.removeItem("token");
            location.href = "/login.html";
        });
    });
});

const layer = layui.layer;

// 获取用户信息
function getUserInfo () {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // 在请求头里面注入 token
        // headers: {
        //     Authorization: localStorage.getItem("token"),
        // },
        success: (res) => {
            console.log(res);
            if (res.status !== 0) return layer.msg("获取用户信息失败！");
            layer.msg("获取用户信息成功！");
            // 调用渲染头像函数
            randerAvatar(res.data);
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: (res) => {
        //     console.log(res);
        //     if (
        //         res.responseJSON.status === 1 && 
        //         res.responseJSON.message === "身份验证失败！"
        //     ) {
        //         // console.log(1);
        //         // 清空 token
        //         localStorage.removeItem("token");
        //         location.href = "/login.html";
        //     }
        // },
    });
};

// 渲染头像函数
const randerAvatar = (user) => {
    // 获取名字
    const name = user.nickname || user.username;
    // 设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`);
    // 按需渲染头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        const firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName).show();
    }
};

function change () {
    $("#art_list").addClass("layui-this").next().removeClass("layui-this");
};