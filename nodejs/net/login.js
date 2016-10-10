// 用户登录
module.exports = function() {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    function userLogin(req, res, next) {
        // // 密码加密
        req.body.password = toMd5(req.body.password);
        connectMySql(res, function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            var useritem = selectTable.user(db);
            useritem.find({ username: req.body.username, password: req.body.password }).run(function(err1, data) {
                if (err1) {
                    console.log(err1);
                    throw err1;
                } else {
                    if (data.length > 0) {
                        res.json({
                            result:"ok",
                            data:{
                                msg:"登陆成功"
                            }
                        });
                    } else {
                        res.json({
                            result:"fail",
                            data:{
                                msg:"登陆失败"
                            }
                        });
                    }
                }


            });

        });
    }
    function adminLogin(req, res, next) {
        // // 密码加密
        req.body.password = toMd5(req.body.password);
        // console.log(req.body);  
        connectMySql(res, function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            var adminitem = selectTable.admin(db);
            adminitem.find({ username: req.body.username, password: req.body.password }).run(function(err1, data) {
                if (err1) {
                    console.log(err1);
                    throw err1;
                } else {
                    if (data.length > 0) {
                        // res.json("admin login success");
                        res.json({
                            result:"ok",
                            data:{
                                msg:"登陆成功"
                            }
                        });
                    } else {
                        // res.json("admin login error");
                        res.json({
                            result:"fail",
                            data:{
                                msg:"登陆失败"
                            }
                        });
                    }
                }
            });

        });

    }
    //md5加密
    function toMd5(content) {
        var crypto = require('crypto');
        var md5 = crypto.createHash('md5');
        md5.update(content);
        return md5.digest('hex');
    }
    // 接口
    return {
        userLogin: userLogin,
        adminLogin: adminLogin
    }
}
