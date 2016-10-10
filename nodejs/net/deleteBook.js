module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();

    connectMySql(res, function(err, db) {
        if (err) {
            throw err;
            res.json(err);
            console.log(err);
        } else {
            var bookitem = selectTable.book(db);
            if (bookitem) {
                console.log({ book_number: req.body.book_number });
                bookitem.find({ book_number: req.body.book_number }).remove(function(err1, data) {
                    if (err1) {
                        console.log("find err");
                        res.json("删除失败");
                        throw errs;
                    } else {
                       res.json("删除成功");
                    }
                });
            }
        }
    }); 
}
