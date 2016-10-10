// 删除对应的申请归还记录
module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    var findData = {
        borrow_number: req.body.borrow_number,
        uid: req.body.borrow_uid
    }
    connectMySql(res, function(err, db) {
        var applyitem = selectTable.apply(db);
        if (err) {
            console.log(err);
            res.json("删除申还记录失败");
            throw err;
        }
        if (applyitem) {
            applyitem.find(findData).remove(function(err1, data) {
                if (err1) {
                    console.log("delete err");
                    res.json("删除申还记录失败");
                    throw errs;
                } else {
                   res.json("删除申还记录成功");
                }
            });
        }
    });
}
