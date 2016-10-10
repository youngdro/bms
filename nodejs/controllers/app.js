var restify = require('restify');
var server = restify.createServer();

var selectTable = require("../net/selectTable")();
var Register = require("../net/register")();
var Login = require("../net/login")();
var CheckRegister = require("../net/checkRegister")();
var verifyUser = require("../net/verifyUser");
var getBooks = require("../net/getBooks");
var borrow = require("../net/borrow");
var borrowFind = require("../net/borrowFind");
var passwordChange = require("../net/passwordChange");
var adminPasswordChange = require("../net/adminPasswordChange");
var Return = require("../net/return");
var addBook = require("../net/addBook");
var deleteBook = require("../net/deleteBook");
var changeBook = require("../net/changeBook");
var addBookFind = require("../net/addBookFind");
var applyReturn = require("../net/applyReturn");
var deleteApply = require("../net/deleteApply");
var userFind = require("../net/userFind");
var sendMessage = require("../net/sendMessage");

// post数据解析
server.use(restify.bodyParser());

server.post('/register', Register.userRegister); // 学员注册
server.post('/userlogin', Login.userLogin); //学员登录
server.post('/adminlogin', Login.adminLogin); //管理员登录
server.post('/verifyUser', verifyUser); //身份验证
server.post('/borrow', borrow); //图书借阅
server.post('/borrowFind', borrowFind); //借阅记录查询
server.post('/passwordChange', passwordChange); //学员密码修改
server.post('/adminPasswordChange', adminPasswordChange); //管理员密码修改
server.post('/return', Return); //图书归还
server.post('/addBook', addBook); //新增书籍
server.post('/deleteBook', deleteBook); //删除书籍
server.post('/changeBook', changeBook); //修改书籍
server.post('/addBookFind', addBookFind); //新增书籍记录查询
server.post('/applyReturn', applyReturn); //申请归还图书
server.post('/deleteApply', deleteApply); //删除申请记录
server.post('/userFind', userFind); //学员信息查询及删除
server.post('/sendMessage', sendMessage); //短信发送

server.get('/checkUsername/:username', CheckRegister.checkUsername); //检查用户名是否重复
server.get('/checkPhone/:phone', CheckRegister.checkPhone); //检查手机号是否存在
server.get('/getBooks/:book_number', getBooks); //查询图书信息

// 监听3900端口
server.listen(3900, function() {
    console.log('%s listening at %s', server.name, server.url);
});
