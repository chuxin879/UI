

function logout() {
    var sessionId = $.cookie("sessionId")
    //异步请求退出
    $.ajax({
        headers:{"Authorization": sessionId},
        url: lemon.config.global.admin + "/user/logout",
        type: "GET",
        success:function(ret){
            if (ret.status == 1 && ret.message == "account is not login"){
                location.href = lemon.config.global.rootUrl + "/html/login.html";
            }
        }
    });
}