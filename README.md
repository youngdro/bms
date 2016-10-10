# 云智图书管理系统
使用NodeJs+AngularJs+BootStrap+jQuery开发

##启动说明

首先需要新建一个名为bms的数据库，然后导入数据库文件bms.sql，在本机上是将bms整个文件夹放在xampp/htdocs/下，需先开启本地的数据库和服务器，然后再进入 /bms下，

打开git bash命令面板，使用app.sh脚本开启nodejs的后台服务，方可成功访问图书管理系统首页。

在网址中输入http://localhost/bms/index.html或者http://localhost/bms进入首页。

##运维管理：

app.sh中利用pm2对任务进程操作

./app.sh -s     启动app.js，打印其进程状态，并开启CPU检测，超过阈值则重启服务
./app.sh -r     重启app.js
./app.sh -l     打印进程状态
./app.sh -d     杀死全部进程
./app.sh -log   打印进程日志保存到app.log中

##系统截图
![](https://github.com/youngdro/bms/blob/master/bms_image/bms1.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms2.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms3.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms4.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms5.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms6.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms7.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms8.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms9.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms10.png)
![](https://github.com/youngdro/bms/blob/master/bms_image/bms11.png)
