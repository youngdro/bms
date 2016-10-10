var app = angular.module('myApp', []);
// 存储用户身份信息
var userData;
app.controller('readerCtrl', function($scope, $http) {
    $scope.username = Cookie.getCookie("reader_username");
    $scope.password = Cookie.getCookie("reader_password");
    // 默认选择全部书籍
    $scope.filter_category = "all";
    // 验证用户身份
    $http.post("http://127.0.0.1:3900/verifyUser", { username: Cookie.getCookie("reader_username"), password: Cookie.getCookie("reader_password"), usertype: "reader" })
        .error(function(err) {
            console.log(err);
        })
        .success(function(data) {
            if (data == "error") {
                alert("非法的用户");
                window.location = "../index.html";
            } else {
                // 获取到用户数据
                userData = data[0];
                $scope.id = userData.id;
                $scope.uid = userData.uid;
                $scope.name = userData.name;
                $scope.phone = userData.phone;
                // 查询借阅记录
                $http.post("http://127.0.0.1:3900/borrowFind", { findType: "borrow_uid", findValue: userData.uid })
                    .error(function(err) {
                        console.log(err);
                    })
                    .success(function(finddata) {
                        checkBorrowStatus(finddata);
                        $scope.borrowRecord = finddata;
                    });
                // 查询申请归还记录
                $http.post("http://127.0.0.1:3900/applyReturn", {})
                    .error(function(err) {
                        console.log(err);
                        salert("查询申请归还记录失败", "alert-red");
                    })
                    .success(function(data) {
                        checkApplyStatus(data);
                    });
            }
        });
    // 获取所有书籍信息
    $http.get("http://127.0.0.1:3900/getBooks/0")
        .error(function(err) {
            console.log(err);
        })
        .success(function(data) {
            if (data == "error") {
                alert("书籍信息请求错误");
            } else {
                $scope.bookData = dealNullImg(data);
                // 无图书信息时显示提示
                if (data.length == 0) {
                    $("#book-borrow-box .info-notify").show();
                } else {
                    $("#book-borrow-box .info-notify").hide();
                }

            }
        });

    // 书籍借阅点击
    $scope.borrow = function(event) {
        var which = $(event.target).parent();
        var nowDay = getNowDate();
        $scope.borrowLength = "15";
        $scope.startDay = nowDay.now;
        $scope.returnDay = $scope.getReturnDay(nowDay.now, parseInt($scope.borrowLength));
        $scope.book_title = which.find(".book-title").text();
        $scope.book_category = which.find(".book-category").text();
        $scope.book_number = which.find(".book-number").text();
        $scope.borrowWhich = which;
    };
    // 确认借阅
    $scope.toBorrow = function() {
        var borrowData = {
            borrow_number: $scope.book_number,
            borrow_title: $scope.book_title,
            borrow_user: $scope.name,
            borrow_uid: $scope.uid,
            borrow_phone: $scope.phone,
            borrow_starttime: $scope.startDay,
            borrow_length: parseInt($scope.borrowLength),
            borrow_status: "借阅中",
            borrow_returntime: ""
        };
        $http.post("http://127.0.0.1:3900/borrow", borrowData)
            .error(function(err) {
                console.log(err);
            })
            .success(function(data) {
                salert(data, "");
                // alert(data);
                // 修改显示数据进行伪局部刷新
                $('#bookBorrowDialog').modal('hide');
                var bookCount = parseInt($scope.borrowWhich.find(".book-count").text());
                bookCount--;
                $scope.borrowWhich.find(".book-count").text(bookCount + "本");
                $scope.borrowWhich.find(".btn").text("已借阅");
                $scope.borrowWhich.find(".btn").attr("disabled", "true");
            });
    };
    // 书籍详情点击
    $scope.bookDetails = function(event) {
        var which = $(event.target).parent();
        $scope.book_title = which.find(".book-title").text();
        $scope.book_author = which.find(".book-author").text();
        $scope.book_img = which.find(".book-img").attr("src");
        $scope.book_category = which.find(".book-category").text();
        $scope.book_publisher = which.find(".book-publisher").text();
        $scope.book_number = which.find(".book-number").text();
        $scope.book_count = which.find(".book-count").text();
        $scope.book_content = which.find(".book-content").text();
    };

    // 借阅时长改变
    $scope.returnDayChange = function() {
        $scope.returnDay = $scope.getReturnDay(getNowDate().now, parseInt($scope.borrowLength));
    };

    // 图书分类筛选
    $scope.filterCategory = function(event) {
        var isExist = false;
        var which = $(event.target).parent();
        var category = which.text();
        $(".choose-category-box span").removeClass("category-select");
        which.addClass("category-select");
        var borrowBox = $("#book-borrow-box .book-item-box");
        $.each(borrowBox, function(n, value) {
            if (category == "全部") {
                $(value).show();
                isExist = true;
            } else {
                if (category == $(value).find(".book-category").text()) {
                    $(value).show();
                    isExist = true;
                } else {
                    $(value).hide();
                }
            }
        });
        if (isExist) {
            borrowBox.parent().find(".info-notify").hide();
        } else {
            borrowBox.parent().find(".info-notify").show();
        }
    };
    // 根据借阅天数计算出归还日期
    $scope.getReturnDay = function(dd, dadd) {
        dadd = parseInt(dadd);
        var a = new Date(dd)
        a = a.valueOf()
        a = a + dadd * 24 * 60 * 60 * 1000
        a = new Date(a);
        var m = a.getMonth() + 1;
        if (m.toString().length == 1) {
            m = '0' + m;
        }
        var d = a.getDate();
        if (d.toString().length == 1) {
            d = '0' + d;
        }
        return a.getFullYear() + "-" + m + "-" + d;
    };
    // 判断对象是否为空
    $scope.isEmptyObject = function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        }
        // 提交修改密码信息
    $scope.changePassword = function() {
        if ($scope.newPassword && $scope.confirmPassord) {
            if ($scope.newPassword != $scope.confirmPassord) {
                $("#passwordDialog .password-notify").text("* 两次输入的密码不一致").show();
            } else {
                $("#passwordDialog .modal-body > p:last-child").text("").hide();
                $http.post("http://127.0.0.1:3900/passwordChange", {
                        "username": userData.username,
                        "oldPassword": $scope.oldPassord,
                        "newPassword": $scope.newPassword
                    }).error(function(error) {
                        console.log(error);
                    })
                    .success(function(response) {
                        if (response == "password wrong") {
                            $("#passwordDialog .password-notify").text("* 原密码错误").show();
                        } else {
                            // 修改密码成功
                            $("#passwordDialog").modal('toggle');
                            Cookie.setCookie("reader_password", hex_md5($scope.newPassword), 1);
                            salert("修改成功", "");
                        }
                    });
            }
        } else {
            $("#passwordDialog .password-notify").text("* 设定密码不能为空").show();
        }
    };
    // 注销
    $scope.logOut = function() {
        // 删除cookie
        if (confirm("确认注销并退出该页面？")) {
            Cookie.deleteCookie("reader_username", 0);
            Cookie.deleteCookie("reader_password", 0);
            window.location = "../index.html";
        }
    };

    // 申请归还书籍
    $scope.applyReturn = function(event) {
        var target = $(event.target);
        var item = target.parent().parent();
        // 取得该条借阅信息
        var applyData = {
            borrow_number: item.find(".item-borrow-number").text(),
            borrow_title: item.find(".item-borrow-title").text().replace("《", "").replace("》", ""),
            uid: userData.uid,
            name: userData.name,
            borrow_starttime: item.find(".item-borrow-starttime").text(),
            borrow_length: parseInt(item.find(".item-borrow-length").text()),
            apply_time: getNowDate().now
        }
        $http.post("http://127.0.0.1:3900/applyReturn", applyData)
            .error(function(err) {
                console.log(err);
                salert("申请归还失败", "alert-red");
            })
            .success(function(data) {
                salert(data, "");
                target.text("等待确认");
                target.attr("disabled", "true");
            });
    };
});

// 查询当前用户借阅的书籍，已借阅还未归还的书籍暂时不能借阅
function checkBorrowStatus(data) {
    var borrowBox = $("#book-borrow-box .book-item-box");
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            $.each(borrowBox, function(n, value) {
                if (data[i].borrow_number == $(value).find(".book-number").text() && data[i].borrow_status == "借阅中") {
                    $(value).find(".borrow-btn").text("已借阅");
                    $(value).find(".borrow-btn").attr("disabled", "true");
                }
            });
        }
    }
}

// 根据查询的申请归还记录，改变按钮状态
function checkApplyStatus(data) {
    var borrowitem = $("#borrow-record-box tbody tr");
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            $.each(borrowitem, function(n, value) {
                if (data[i].borrow_number == $(value).find(".item-borrow-number").text() && data[i].uid == userData.uid && $(value).find(".item-borrow-status").text() == "借阅中") {
                    $(value).find(".btn").text("等待确认");
                    $(value).find(".btn").attr("disabled", "true");
                }
            });
        }
    }
}
