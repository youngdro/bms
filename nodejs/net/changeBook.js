// 修改书籍信息
module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    var fs = require('fs');
    connectMySql(res, function(err, db) {
        var fields = req.params;
        if (err) {
            throw err;
            res.json(err);
            console.log(err);
        } else {
            var image_path = "";
            image_path = moveImg(req.files.add_book_img);
            if (image_path == "false") {
                res.json("图片格式错误");
                console.log("img err");
                return;
            }
            var addRecord = {
                book_number: fields.add_book_number,
                book_title: fields.add_book_title,
                book_author: fields.add_book_author,
                book_category: fields.add_book_category,
                book_publisher: fields.add_book_publisher,
                book_img: image_path,
                book_count: fields.add_book_count,
                book_content: fields.add_book_content,
            };
            var bookitem = selectTable.book(db);
            if (bookitem) {
                bookitem.find({ book_number: addRecord.book_number }).run(function(err1, data) {
                    if (err1) {
                        console.log("find err");
                        res.json("修改失败");
                        throw errs;
                    } else {
                        if (data.length > 0) {
                            var changeData = data[0];
                            changeData.book_title = addRecord.book_title;
                            changeData.book_author = addRecord.book_author;
                            changeData.book_category = addRecord.book_category;
                            changeData.book_publisher = addRecord.book_publisher;
                            changeData.book_count = addRecord.book_count;
                            changeData.book_img = addRecord.book_img;
                            changeData.book_content = addRecord.book_content;
                            changeData.save();
                            res.json("修改成功");
                        } else {  
                            res.json("该编号不存在");
                        }
                    }
                });

            }
        }

    });
    // 检验图片格式，正确情况下保存到upload目录下
    function moveImg(img) {
        var path = "";
        if (img.size != 0) {
            if ((img.type != "image/jpeg") && (img.type != "image/png") && (img.type != "image/jpg")) {
                path = "false";
                console.log("img type error");
            } else {
                // var tmp_path = img.path;
                var readStream = fs.createReadStream(img.path);
                var writeStream = fs.createWriteStream("../../web/libs/upload/" + img.name);
                readStream.pipe(writeStream);
                // fs.unlinkSync(tmp_path);
                path = "./libs/upload/" + img.name;
                console.log("rename success");
            }
        }
        return path;
    }
}
