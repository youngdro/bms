// 根据查询名查询其借阅的书籍信息
module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    
    var findData = {};
    if(!(req.body.findType=="all" && req.body.findValue=="")){
        findData[req.body.findType] = req.body.findValue;
    }
    // console.log(findData);
    connectMySql(res, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        var borrowitem = selectTable.borrow(db);
        if (borrowitem) {
            // 在借阅表中查询
            borrowitem.find(findData, function(errs, data) {
                if (errs) {
                    throw errs;
                } else {
                    if(data.length > 0){
                        res.json(data);
                    }else{
                        res.json([]);
                    }  
                }
            });
        }
    });
}
