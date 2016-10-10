module.exports = function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.charSet("utf-8");
	var phone = req.body.phone;
	var content = req.body.phone;
	var Message = require('alidayu-node');
	var message = new Message('23449907', '9461dc7a83e0bd9***************');

	sendMessage(phone,content);
	// 此方法模拟发送短信
	function sendMessage(phone,content){
		console.log("发送短信至"+phone+"，"+content);
		res.json("短信发送成功");
	}
	// 阿里大鱼短信发送方法，由于本人的AppKey及密钥没有申请到官方的签名模板，所以这里无法成功发送短信，模拟替代，假设发送成功
	function messageSend(code, product, phone) {
	    message.smsSend({
	        sms_free_sign_name: '云智图书管理系统',
	        sms_param: { "code": code, "product": product },
	        rec_num: phone,
	        sms_template_code: 'SMS_640004'
	    }, function(d) {
	        console.log(d);
	        console.log("message send");
	    });
	}
}