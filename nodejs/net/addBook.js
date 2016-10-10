module.exports = function(req, res, next) {
    var connectMySql = require("./connectMySql");
    var selectTable = require("./selectTable")();
    var fs = require('fs');
    // var formidable = require("formidable");
    // var form = new formidable.IncomingForm();
    // form.uploadDir = "./tmp";

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
            var addRecord = [{
                book_number: fields.add_book_number,
                book_title: fields.add_book_title,
                book_author: fields.add_book_author,
                book_category: fields.add_book_category,
                book_publisher: fields.add_book_publisher,
                book_img: image_path,
                book_count: fields.add_book_count,
                book_content: fields.add_book_content,
            }];
            // console.log(addRecord);
            var bookitem = selectTable.book(db);
            var addbookitem = selectTable.addbook(db);
            if (bookitem) {
                bookitem.find({ book_number: addRecord[0].book_number }).run(function(err1, data) {
                    if (err1) {
                        console.log("find err");
                        res.json("新增失败");
                        throw errs;
                    } else {
                        if (data.length > 0) {
                            res.json("该图书编号已存在");
                        } else {
                            bookitem.create(addRecord, function(errs, results) {
                                if (errs) {
                                    console.log("add1 err");
                                    console.log(errs);
                                    res.json("新增失败");
                                    throw errs;
                                } else {
                                    // 添加相应的添书记录
                                    if(addbookitem){
                                        var addbookData = [{
                                            book_number: fields.add_book_number,
                                            book_title: fields.add_book_title,
                                            book_img: image_path,
                                            book_category: fields.add_book_category,
                                            book_author: fields.add_book_author,
                                            book_addtime: getNowDate().now
                                        }];
                                        addbookitem.create(addbookData, function(err2,adddata){
                                            if (err2) {
                                                console.log("add2 err");
                                                console.log(err2);
                                                res.json("新增失败");
                                                throw err2;
                                            }else{
                                                res.json("新增成功");
                                            }
                                        });
                                    } 
                                }
                            });
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
    // 获取当天日期信息
    function getNowDate() {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var day = d.getDay();
        var now = year + "-" + dealNum(month) + "-" + dealNum(date);
        return {
            year: year,
            month: month,
            day: day,
            date: date,
            now: now
        }
    }

    function dealNum(num) {
        return num < 10 ? "0" + num : num + "";
    }
}
