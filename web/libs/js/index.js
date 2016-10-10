var app = angular.module('myApp', []);
app.controller('loginCtrl', function($scope, $http) {

    // 默认为学员角色登录
    $scope.usertype = "reader";
    /*切换登录或注册*/
    $scope.tologin = function() {
        $scope.which = "login";
    }
    $scope.toregister = function(e) {
            $scope.which = "register";
        }
        // 登录
    $scope.login = function() {
            // console.log($scope.usertype);
            if ($scope.username != undefined && $scope.password != undefined) {
                if ($scope.usertype == "reader") {
                    $http.post("http://127.0.0.1:3900/userlogin", {
                            "username": $scope.username,
                            "password": $scope.password
                        }).error(function(error) {
                            // console.log("login error!!");
                            console.log(error);
                        })
                        .success(function(response) {
                            console.log(response);
                            if (response.result == "ok") {
                                Cookie.setCookie("reader_username", $scope.username, 1);
                                Cookie.setCookie("reader_password", hex_md5($scope.password), 1);
                                window.location = "./web/reader.html";
                            } else {
                                salert("用户名或密码错误");
                            }

                        });
                } else if ($scope.usertype == "admin") {
                    $http.post("http://127.0.0.1:3900/adminlogin", {
                            "username": $scope.username,
                            "password": $scope.password
                        }).error(function(error) {
                            console.log("login error");
                            console.log(error);
                        })
                        .success(function(response) {
                            // console.log(response);
                            if (response.result == "ok") {
                                Cookie.setCookie("admin_username", $scope.username, 1);
                                Cookie.setCookie("admin_password", hex_md5($scope.password), 1);
                                window.location = "./web/admin.html";
                            } else {
                                salert("用户名或密码错误");
                            }
                        });
                }
            }
        }
        // 注册
    $scope.register = function() {
        var phoneReg = /^0?1[3|4|5|8][0-9]\d{8}$/;
        var allowed = true;

        if ($scope.new_username == undefined) {
            notifyShow($("#new_username"), "用户名必填");
            allowed = false;
        } else {
            if ($scope.new_password == undefined) {
                notifyShow($("#new_password"), "密码必填");
                allowed = false;
            }
            if ($scope.new_password != $scope.new_password2) {
                notifyShow($("#new_password2"), "密码不一致");
                allowed = false;
            }
            if ($scope.name == undefined) {
                notifyShow($("#name"), "姓名必填");
                allowed = false;
            }
            if ($scope.phone == undefined) {
                notifyShow($("#phone"), "手机必填");
                allowed = false;
            } else {
                if (!phoneReg.test($scope.phone)) {
                    notifyShow($("#phone"), "格式错误");
                    allowed = false;
                }
            }
            // 检查用户名是否重复
            $http.get("http://127.0.0.1:3900/checkUsername/" + $scope.new_username)
                .error(function(error) {
                    notifyShow($("#new_username"), "用户名出错");
                    allowed = false;
                    console.log(error);
                })
                .success(function(response) {
                    console.log(response);
                    if (response.result == "fail") {
                        notifyShow($("#new_username"), response.data.msg);
                        allowed = false;
                    } else {
                        // 检查手机号是否存在
                        $http.get("http://127.0.0.1:3900/checkPhone/" + $scope.phone)
                            .error(function(error) {
                                notifyShow($("#phone"), "手机出错");
                                allowed = false;
                                console.log(error);
                            })
                            .success(function(response) {
                                if (response.result == "fail") {
                                    notifyShow($("#phone"), response.data.msg);
                                    allowed = false;
                                }
                                if (allowed) {
                                    // 正式注册
                                    $http.post("http://127.0.0.1:3900/register", {
                                        "username": $scope.new_username,
                                        "password": $scope.new_password,
                                        "name": $scope.name,
                                        "phone": $scope.phone
                                    }).error(function(error) {
                                        console.log("register error");
                                        console.log(error);
                                        salert("注册失败");
                                    }).success(function(response) {
                                        console.log(response);
                                        if (response.result == "ok") {
                                            salert(response.data.msg);
                                            setTimeout(function() { window.location.reload(); }, 1500);
                                        }
                                    });
                                }
                            });
                    }

                });
        }


    }

});

$(".choicebox .register form .inputs input").focus(function(e) {
    notifyHide($(e.target));
});

function notifyShow(target, info) {
    target.next().css("width", "30%");
    target.css("width", "50%");
    target.next().text(info);
}

function notifyHide(target) {
    target.next().css("width", "0%");
    target.css("width", "80%");
    target.next().text("");
}
// 弹出框
function salert(str) {
    var alert_box = $('<span class="beauty-alert" style="opacity:0;"></span>');
    alert_box.text(str);
    $("body").append(alert_box);
    setTimeout(function() {
        alert_box.css("opacity", 1);
    }, 1);

    setTimeout(function() {
        alert_box.css("opacity", 0);
    }, 1000);
    setTimeout(function() {
        alert_box.remove();
    }, 3000);
}
