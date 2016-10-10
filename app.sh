#!/bin/bash
option=$1
case $option in 
	#启动
	-s)
	echo "---------------------------ready to start the app--------------------------------"
	echo "云智图书管理系统启动成功！"
	pm2 start  ./nodejs/controllers/app.js
	echo "------------------------------------watch----------------------------------------"
	
	#设定cpu最大占用率
	maxCpuPrec=95

	while [ true ]
	do
	    #得到pid
	    pid=`ps -ef|grep -v grep|grep 'node'|awk '{print $2}'`
	    #判断node进程是否存在
	    if [ ! $pid ]
	    then
	        echo "nodejs进程未找到，停止监听"
	        break
	    fi
	    #得到cpu占用率，取得整数
	    cpu=`ps -p $pid -o pcpu|grep -v CPU|cut -d . -f 1|awk '{print $1}'`
	    #判断是否重启node服务
	    if [ "$cpu" -gt "$maxCpuPrec" ]
	    then
	        echo "cpu占用率已大于95%，重启服务！"
	        pm2 restart all
	    else
	        echo "nodejs服务正常，10s后重新检测～"
	        pm2 list
	    fi
	    echo "**************************************************************************************************"
	    #睡眠10秒之后进行
	    sleep 10s   
	done
	;;
	#重启
	-r)
	echo "----------------------------ready to reload the app------------------------------"
	pm2 restart  ./nodejs/controllers/app.js
	;;
	#进程状态
	-l)
	echo "-------------------------------------pm2 list------------------------------------"
	pm2 list
	;;
	#进程日志
	-log)
	echo "----------------------------------pm2 logs---------------------------------------"
	echo "--------------------you can check the logs in app.logs---------------------------"
	pm2 logs > app.log
	;;
	#停止
	-t)
	echo "-------------------------------ready to stop the app-----------------------------"
	pm2 stop ./nodejs/controllers/app.js
	;;
	-d)
	echo "-------------------------------ready to delete all-------------------------------"
	pm2 delete all
	;;
	*)
	# 输入参数规则
	echo "basename ${0}:usage:[-s start the app] | [-r reload the app] | [-l pm2 list] | [-t stop the app] | [-d pm2 delete all] | [-log show app logs]"
	exit 1
	;;
esac

