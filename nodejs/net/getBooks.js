// 根据书籍编号获取其所有信息，传参的编号为0则代表获取库中所有的书籍信息
module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    var book_number = req.params.book_number;
    if(book_number == "0"){
        var findData = {};
    }else{
         var findData = {
            book_number: book_number
         };
    }
    connectMySql(res, function(err, db) {
        var bookitem = selectTable.book(db);
        if (err) {
            console.log(err);
            throw err;
        }
        if (bookitem) {
            bookitem.find(findData).run(function(err1, data) {
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
