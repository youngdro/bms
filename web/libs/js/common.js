// 弹出框
function salert(str, theme) {
    var alert_box = $('<span class="beauty-alert ' + theme + '" style="opacity:0;z-index=100;"></span>');
    alert_box.text(str);
    $("body").append(alert_box);
    setTimeout(function() {
        alert_box.css("opacity", 1);
    }, 1);

    setTimeout(function() {
        alert_box.css("opacity", 0);
    }, 2000);
    setTimeout(function() {
        alert_box.remove();
    }, 3000);
}

// 将无图片替换为默认图片
function dealNullImg(data) {
    for (var i = 0; i < data.length; i++) {
        if (!data[i].book_img) {
            data[i].book_img = "./libs/img/bookdefault.png";
        }
    }
    return data;
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
