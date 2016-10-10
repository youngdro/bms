// 申请归还书籍，将申请信息添加至申请表
module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();

    connectMySql(res, function(err, db) {
        var applyitem = selectTable.apply(db);
        if (err) {
            console.log(err);
            res.json("申请失败");
            throw err;
        }
        if (applyitem) {
            // 查询申请归还记录
            if(isEmptyObject(req.body)){
                applyitem.find({}).run(function(err1,data){
                    if (err1) {
                        console.log(err1);
                        res.json("查询申请记录失败");
                        throw err1;
                    } else {
                        res.json(data);
                    }
                });
            }else{
                // 添加申请归还记录
                applyitem.create(req.body, function(err1, data) {
                    if (err1) {
                        console.log(err1);
                        res.json("申请失败");
                        throw err1;
                    } else {
                        res.json("申请成功，等待管理员确认");
                    }
                });
            }
        }
    });

    // 判断对象是否为空
    function isEmptyObject(e) {  
        var t;  
        for (t in e)  
            return !1;  
        return !0  
    }  
}
