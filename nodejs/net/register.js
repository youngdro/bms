module.exports = function() {
    // 用户注册
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();

    function userRegister(req, res, next) {
        var record = [];
        var id;
        req.body.uid = "";
        // 密码加密
        req.body.password = toMd5(req.body.password);
        record.push(req.body);
        connectMySql(res, function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            var useritem = selectTable.user(db);
            useritem.create(record, function(errs, results) {
                if (errs) {
                    console.log(errs);
                    throw errs;
                } else {
                    useritem.find({ username: req.body.username }).run(function(err1, data) {
                        id = data[0].id;
                        useritem.get(parseInt(id), function(err2, item) {
                            item.uid = idToUid(id);
                            item.save(function() {
                                console.log("Register success");
                            });
                            res.json({
                                result: "ok",
                                data: {
                                    msg: "注册成功"
                                }
                            });
                        });
                    });
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
    // id号转换为相应编号
    function idToUid(id) {
        var length = id.toString().length;
        var zero = "";
        for (var i = 0; i < 8 - length; i++) {
            zero = zero + "0";
        }
        return zero + id;
    }
    // 接口
    return {
        userRegister: userRegister
    }
}
