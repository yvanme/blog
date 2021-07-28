# Jenkins安装

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**

## Jenkins安装

1. 下载jenkins war包

2. 运行jenkins war包

   ```shell
   #--httpPort参数指定端口，默认为8080
   java -jar jenkins.war --httpPort=8081
   ```

3. shell

   ```shell
   APP_NAME=ruoyi-admin.jar
   cd ruoyi-admin/target
   mkdir -p /home/dmadmin/logs
   
   #找到包含AppName的进程
   PROCESS=`ps -ef|grep $APP_NAME|grep -v grep  |awk '{ print $2}'`
   if [ $PROCESS ]; then
     
   	#循环停用进程直到成功
   	while :
   	do
   	  kill -9 $PROCESS > /dev/null 2>&1
   	  if [ $? -ne 0 ];then
   	   break
   	  else
   	   sleep 5
   	   continue
   fi
   done
   echo 'Stop Successed'
     
   else
     
   echo "NOT NULL"
     
   fi
   
   
   #启动应用
   nohup  java -jar $APP_NAME >>/home/dmadmin/logs/start.log 2>>/home/dmadmin/logs/startError.log &
   
   #sleep等待15秒后，判断包含AppName的线程是否存在
   sleep 15
   if test $(pgrep -f $APP_NAME|wc -l) -eq 0
   then
      echo "Start Failed"
   else
      echo "Start Successed"
   fi
   ```
2. maven

  ```shell
  clean install -Dmaven.test.skip=true -Ptest
  ```

  5.设置开机启动 

- 配置startup.sh

  ```
  # jar包启动命令
  nohup java -jar jenkins.war > jenkins.log 2>1 &
  ```

- 给startup.sh添加权限

  ```
  chmod +x /etc/rc.d/rc.local
  chmod +x startup.sh
  ```

- 添加开机启动

  ```
  #编辑rc.local
  vim /etc/rc.local
  #在rc.local中加上一行
  /usr/local/project/startup.sh
  ```

  