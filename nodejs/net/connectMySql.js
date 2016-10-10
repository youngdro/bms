// 连接数据库并设置编码与跨域
module.exports = function(res, callback){
	var orm = require("orm");
    res.header("Access-Control-Allow-Origin", "*");
    res.charSet("utf-8");
    orm.connect("mysql://root:@localhost/bms", callback);
}