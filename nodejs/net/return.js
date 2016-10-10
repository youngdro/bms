// 书籍归还
module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    var findData = {
        borrow_number: req.body.borrow_number,
        borrow_uid: req.body.borrow_uid,
    };
    connectMySql(res, function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        var borrowitem = selectTable.borrow(db);
        if (borrowitem) {
            borrowitem.find(findData, function(err3, item) {
                if (err3) {
                    console.log(err3);
                    throw err3;
                } else {
                    if (item.length > 0) {
                        for (var i = item.length - 1; i >= 0; i--) {
                            if(item[i].borrow_status == "借阅中" || !item[i].borrow_status){
                                var borrowdata = item[i];
                                console.log(borrowdata);
                                borrowdata.borrow_status = "已归还";
                                borrowdata.borrow_returntime = req.body.borrow_returntime;
                                borrowdata.save();
                                res.json("确认归还成功");
                                break;
                            }
                        }              
                    } else {
                        res.json("未找到该借阅记录");
                    }
                }
            });
        }
    });
}
