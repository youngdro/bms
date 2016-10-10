module.exports = function(req, res, next) {
    
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();

    connectMySql(res, function(err, db) {
        if (req.body.usertype == "reader") {
            var useritem = selectTable.user(db);
        } else if (req.body.usertype == "admin") {
            var useritem = selectTable.admin(db);
        }
        if (err) {
            console.log(err);
            throw err;
        }
        if (useritem) {
        	// 根据用户名密码验证用户真实性
            useritem.find({ username: req.body.username, password: req.body.password }).run(function(err1, data) {
                if (err1) {
                    console.log(err1);
                    throw err1;
                } else {
                    if (data.length > 0) {
                        res.json(data);
                    } else {
                        res.json("error");
                    }
                }
            });
        }
    });
}
