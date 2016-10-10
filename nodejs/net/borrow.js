// 书籍借阅，并减少对应书籍数量
module.exports = function(req, res, next) {
    var selectTable = require("./selectTable")();
    var orm = require("orm");
    res.header("Access-Control-Allow-Origin", "*");
    res.charSet("utf-8");
    var record = [];
    record.push(req.body);
    orm.connect("mysql://root:@localhost/bms", function(err, db) {
        if (err) {
            console.log(err);
            throw err;
        }
        var borrowitem = selectTable.borrow(db);
        if (borrowitem) {
            // 在借阅表中插入借阅记录
            borrowitem.create(record, function(errs, results) {
                if (errs) { 
                    res.json("借阅失败");
                    throw errs;
                } else {
                    orm.connect("mysql://root:@localhost/bms", function(err2, db2) {
                        if (err2) {
                            console.log(err2);
                            throw err2;
                        }
                        var bookitem = selectTable.book(db2);
                        // 查询到借阅的书籍数量并使其数量减一
                        bookitem.find({book_number: req.body.borrow_number}, function(err3, item) {
                            if(err3){
                                console.log(err3);
                                throw err3;
                                res.json(err3);
                            }else{
                                var bookdata = item[0];
                                bookdata.book_count = bookdata.book_count-1<0?0:bookdata.book_count-1;
                                console.log(bookdata.book_count);
                                bookdata.save();
                                res.json("借阅成功");
                            }                            
                        });
                    });
                }
            });
        }
    });
}
