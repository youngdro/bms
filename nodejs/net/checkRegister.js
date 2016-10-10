module.exports = function() {
    // 检查用户注册
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    // 检查用户名是否存在
    function checkUsername(req, res, next) {
        connectMySql(res, function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            var useritem = selectTable.user(db);
            useritem.find({ username: req.params.username}).run(function(err1, data) {
                if (err1) {
                    console.log(err1);
                    throw err1;
                } else {
                    if (data.length > 0) {
                        res.json({
                            result:"fail",
                            data:{
                                msg:"用户已存在"
                            }
                        });
                    } else {
                        res.json({
                            result:"ok",
                            data:{
                                msg:"用户名可用"
                            }
                        });
                    }
                }


            });

        });
    }

    // 检查手机号是否被注册过
    function checkPhone(req, res, next) {
        connectMySql(res, function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            var useritem = selectTable.user(db);
            useritem.find({ phone: req.params.phone}).run(function(err1, data) {
                if (err1) {
                    console.log(err1);
                    throw err1;
                } else {
                    if (data.length > 0) {
                        res.json({
                            result:"fail",
                            data:{
                                msg:"手机已注册"
                            }
                        });
                    } else {
                        res.json({
                            result:"ok",
                            data:{
                                msg:"可用的手机"
                            }
                        });
                    }
                }
            });
        });
    }
    // 接口
    return {
        checkUsername: checkUsername,
        checkPhone: checkPhone
    }
}
