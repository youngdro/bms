// 用户信息查询及删除
module.exports = function(req,res,next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    var findData = {};

    connectMySql(res, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        var useritem = selectTable.user(db);
        // 用户信息查询
        if(req.body.type == "find"){
            if(req.body.findKey != "all"){
                findData[req.body.findKey] = req.body.findVal;
            }
            useritem.find(findData).run(function(err1, data) {
                if (err1) {
                    console.log(err1);
                    throw err1;
                } else {
                    if (data.length > 0) {
                        res.json(data);
                    } else {
                        res.json("not exist");
                    }
                }
            });
            // 删除用户信息
        }else if(req.body.type == "delete"){
            findData[req.body.findKey] = req.body.findVal;
            useritem.find(findData).remove(function(err1, data) {
                if (err1) {
                    console.log(err1);
                    throw err1;
                } else {
                    if (data.length > 0) {
                        res.json("删除成功");
                    } else {
                        res.json("删除失败");
                    }
                }
            });
        }
        

    });
}
