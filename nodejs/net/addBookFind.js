// 查询所有的添书记录
module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    var findData = {};
    connectMySql(res, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        var addbookitem = selectTable.addbook(db);
        if (addbookitem) {
            // 在借阅表中查询
            addbookitem.find(findData, function(errs, data) {
                if (errs) {
                    throw errs;
                } else {
                    if(data.length > 0){
                        res.json(data);
                    }else{
                        res.json("not exists");
                    }  
                }
            });
        }
    });
}
