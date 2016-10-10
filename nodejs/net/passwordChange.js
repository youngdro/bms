// 密码修改
module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    connectMySql(res, function(err, db) {
        var useritem = selectTable.user(db);
        if (err) {
            console.log(err);
            throw err;
        }
        if (useritem) {
            useritem.find({username:req.body.username, password:toMd5(req.body.oldPassword)}).run(function(err1, data) {
                if (err1) {
                    console.log(err1);
                    throw err1;
                } else {
                    if (data.length > 0) {
                        var userdata = data[0];
                        userdata.password = toMd5(req.body.newPassword);
                        userdata.save();
                        res.json("change success");
                    } else {
                        res.json("password wrong");
                    }
                }
            });
        }
    });
    //md5加密
    function toMd5(content) {
        var crypto = require('crypto');
        var md5 = crypto.createHash('md5');
        md5.update(content);
        return md5.digest('hex');
    }
}