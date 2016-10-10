var app = angular.module('myApp', []);
app.controller('adminCtrl', function($scope, $http) {
    $scope.username = Cookie.getCookie("admin_username");
    $scope.password = Cookie.getCookie("admin_password");
    // 验证管理员身份
    $http.post("http://127.0.0.1:3900/verifyUser", { username: $scope.username, password: $scope.password, usertype: "admin" })
        .error(function(err) {
            console.log(err);
        })
        .success(function(data) {
            if (data == "error") {
                alert("非法的用户");
                window.location = "../index.html";
            } else {
                // 获取借阅记录
                $http.post("http://127.0.0.1:3900/borrowFind", { findType: "all", findValue: "" })
                    .error(function(err) {
                        console.log(err);
                    })
                    .success(function(finddata) {
                        $scope.borrowRecord = finddata;
                    });
                // 获取书籍记录
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
                                // $("#book-borrow-box .info-notify").show();
                            } else {
                                // $("#book-borrow-box .info-notify").hide();
                            }

                        }
                    });
                // 获取添书记录
                $http.post("http://127.0.0.1:3900/addBookFind", {})
                    .error(function(err) {
                        console.log(err);
                    })
                    .success(function(finddata) {
                        $scope.addBookRecord = finddata;
                    });
                // 查询申请归还记录
                $http.post("http://127.0.0.1:3900/applyReturn", {})
                    .error(function(err) {
                        console.log(err);
                        salert("查询申请归还记录失败", "alert-red");
                    })
                    .success(function(data) {
                        $scope.applyReturnData = data;
                    });
                // 查询所有学员信息
                $http.post("http://127.0.0.1:3900/userFind", { type: "find", findKey: "all" })
                    .error(function(err) {
                        console.log(err);
                        salert("查询用户信息失败", "alert-red");
                    })
                    .success(function(data) {
                        $scope.allUserData = data;
                    });

            }
        });
    // 确认归还点击
    $scope.sureReturn = function(event) {
            var target = $(event.target);
            var item = target.parent().parent();
            $scope.sureReturnUser = item.find(".item-borrow-user").text();
            $scope.sureReturnStarttime = item.find(".item-borrow-starttime").text();
            $scope.sureReturnBooktitle = item.find(".item-borrow-title").text();
            $scope.sureReturnEndtime = getNowDate().now;
            $scope.sureReturnUid = item.find(".item-borrow-uid").text();
            $scope.sureReturnBooknum = item.find(".item-borrow-number").text();
            $scope.returnWhich = item; //记录是哪项记录归还
        }
        // 再次确认归还点击
    $scope.sureReturnAgain = function() {
        var findData = {
            borrow_number: $scope.sureReturnBooknum,
            borrow_uid: $scope.sureReturnUid,
            borrow_returntime: $scope.sureReturnEndtime
        };
        $http.post("http://127.0.0.1:3900/return", findData)
            .error(function(err) {
                console.log(err);
            })
            .success(function(data) {
                salert(data, "");
                $('#sureReturnDialog').modal('hide');
                if ($scope.returnWhich.hasClass("borrow-item")) {
                    $scope.returnWhich.find(".item-borrow-returntime").find("button").remove();
                    $scope.returnWhich.find(".item-borrow-returntime").text($scope.sureReturnEndtime);
                    $scope.returnWhich.find(".item-borrow-status").text("已归还");
                } else if ($scope.returnWhich.hasClass("apply-item")) {
                    $http.post("http://127.0.0.1:3900/deleteApply", findData)
                        .error(function(err) {
                            console.log(err);
                        })
                        .success(function(data) {
                            $scope.returnWhich.remove();
                        });
                }

            });
    }

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
    }
    $(".test-btn").click(function() {
        // $scope.borrowRecord = {};
    });

    // 新增与修改书籍
    $scope.addBook = function() {
        var choice = $("#addBookPage .add-book-btn").text();
        if (choice == "新增") {
            $scope.editBook("http://127.0.0.1:3900/addBook");
        } else if (choice == "保存") {
            $scope.editBook("http://127.0.0.1:3900/changeBook");
        }
    }
    $scope.editBook = function(url) {
            // 检验必填信息完整
            if ($scope.add_book_number && $scope.add_book_title && $scope.add_book_author && $scope.add_book_category && $scope.add_book_publisher && $scope.add_book_count) {
                var formData = new FormData($("#add_form")[0]);
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    dataType: 'json',
                    processData: false,
                    error: function(returndata) {
                        console.log(returndata);
                    },
                    success: function(returndata) {
                        var theme = "";
                        if (returndata != "新增成功" && returndata != "修改成功") {
                            theme = "alert-red";
                        } else {
                            // 提交成功后重载数据
                            setTimeout(function() { window.location.reload(); }, 1000);
                        }
                        salert(returndata, theme);
                    }
                });
            } else {
                salert("必填信息未填写完整", "alert-red");
            }
        }
        // 删除书籍
    $scope.deleteBookInfo = function(event) {
        var target = $(event.target);
        var item = target.parent().parent();
        var bookNum = item.find(".item-book-number").text();
        if (confirm("确认删除该书籍？")) {
            $http.post("http://127.0.0.1:3900/deleteBook", { book_number: bookNum })
                .error(function(err) {
                    console.log(err);
                })
                .success(function(data) {
                    salert(data, "");
                    item.remove();
                });
        }
    };
    // 修改书籍信息
    $scope.changeBookInfo = function(event) {
        var target = $(event.target);
        var item = target.parent().parent();
        var bookNum = item.find(".item-book-number").text();
        $http.get("http://127.0.0.1:3900/getBooks/" + bookNum)
            .error(function(err) {
                console.log(err);
            })
            .success(function(data) {

                if (data == "error") {
                    alert("书籍信息请求错误");
                } else {
                    var bookdata = data[0];
                    $scope.add_book_number = bookdata.book_number;
                    $scope.add_book_title = bookdata.book_title;
                    $scope.add_book_author = bookdata.book_author;
                    $scope.add_book_category = bookdata.book_category;
                    $scope.add_book_publisher = bookdata.book_publisher;
                    $scope.add_book_count = bookdata.book_count;
                    $scope.add_book_content = bookdata.book_content;
                    $('.nav-pills a[href="#addBookPage"]').trigger("click");
                    $("#addBookPage .add-book-btn").text("保存");
                    $("#addBookPage #add_book_number").attr("readonly", "readonly");
                    $("#addBookPage .add-back-btn").removeClass("hide");
                }
            });
    };
    // 取消修改书籍信息，返回查看书籍页面
    $scope.cancelChange = function() {
        $("#add_form")[0].reset();
        $('.nav-pills a[href="#checkBookPage"]').trigger("click");
    };

    // 删除学员账号
    $scope.userDelete = function(event) {
        var target = $(event.target);
        var item = target.parent().parent();
        var deleteUid = item.find(".item-user-uid").text();
        if (confirm("确认删除该学员？")) {
            $http.post("http://127.0.0.1:3900/userFind", { type: "delete", findKey: "uid", findVal: deleteUid })
                .error(function(err) {
                    console.log(err);
                    salert("删除学员失败", "alert-red");
                })
                .success(function(data) {
                    salert("删除学员成功", "");
                    item.remove();
                });
        }
    };
    // 管理员密码修改
    $scope.changeAdminPassword = function() {
        if ($scope.newPassword && $scope.confirmPassord) {
            if ($scope.newPassword != $scope.confirmPassord) {
                salert("两次输入的密码不一致", "alert-red");
            } else {
                $http.post("http://127.0.0.1:3900/adminPasswordChange", {
                        "username": "admin",
                        "oldPassword": $scope.oldPassord,
                        "newPassword": $scope.newPassword
                    }).error(function(error) {
                        console.log(error);
                    })
                    .success(function(response) {
                        if (response == "password wrong") {
                            salert("原密码错误", "alert-red");
                        } else {
                            // 修改密码成功
                            $("#passwordDialog").modal('toggle');
                            Cookie.setCookie("admin_password", hex_md5($scope.newPassword), 1);
                            salert("修改成功", "");
                            $scope.oldPassord = "";
                            $scope.newPassword = "";
                            $scope.confirmPassord = "";
                        }
                    });
            }
        } else {
            salert("设定密码不能为空", "alert-red");
        }
    };
    $scope.logOut = function() {
        // 删除cookie
        if (confirm("确认注销并退出该页面？")) {
            Cookie.deleteCookie("admin_username", 0);
            Cookie.deleteCookie("admin_password", 0);
            window.location = "../index.html";
        }
    };
    $scope.nowDate = getNowDate().now;
    // 发送短信提醒
    $scope.sendMessage = function(event) {
        var target = $(event.target);
        var item = target.parent().parent();
        var findUid = item.find(".item-borrow-uid").text();
        $http.post("http://127.0.0.1:3900/userFind", { type: "find", findKey: "uid", findVal: findUid })
            .error(function(err) {
                console.log(err);
            })
            .success(function(data) {
                // 获得发送号码和发送内容
                var sendPhone = data[0].phone;
                var sendStr = "【云智图书管理系统】" + item.find(".item-borrow-user").text() + "，您借阅的书籍" + item.find(".item-borrow-title").text() + "即将到期，请及时归还";
                $http.post("http://127.0.0.1:3900/sendMessage", { phone: sendPhone, content: sendStr })
                    .error(function(err) {
                        console.log(err);
                    })
                    .success(function(data) {
                        salert(data, "");
                    });

            });
    }
});

// 点击新增新闻tab时的设置
$('.nav-pills a[href="#addBookPage"]').click(function() {
    $("#addBookPage .add-book-btn").text("新增");
    $("#addBookPage #add_book_number").removeAttr("readonly");
    $("#addBookPage .add-back-btn").addClass("hide");
});
