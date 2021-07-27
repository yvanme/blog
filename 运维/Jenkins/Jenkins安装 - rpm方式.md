# Jenkins安装-rpm方式

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**

## Jenkins安装

1. 下载jenkins rpm包

2. 安装jenkins war包

   ```shell
   rpm -ivh jenkins-2.281-1.1.noarch.rpm
   ```
   
3. 创建jdk软连接（jenkins默认从/usr/local下找java）

   ```shell
   ln -s /apps/jdk1.8.0_251/bin/java /usr/bin/java
   ```
2. 启动jenkins

  ```shell
  clean install -Dmaven.test.skip=true -Ptest
  ```

  5.设置开机启动 

- 配置startup.sh

  ```
  # jar包启动命令
  nohup java -jar jenkins.war > jenkins.log 2>1 &
  ```

- 默认安装路径

  ```
  /usr/lib/jenkins/jenkins.war    WAR包 
  
  /etc/sysconfig/jenkins       配置文件
  
  /var/lib/jenkins/        默认的JENKINS_HOME目录
  
  /var/log/jenkins/jenkins.log    Jenkins日志文件
  ```

- 添加开机启动

  ```
  chkconfig --add jenkins
  chkconfig jenkins on
  ```
  
  chkconfig管理

  ```
  chkconfig --list                 # 列出所有被chkconfig管理的服务
  chkconfig --add jenkins            # 添加指定的服务，让chkconfig指令管理它
  chkconfig --del jenkins            # 删除指定的服务，不再让chkconfig指令管理它
  chkconfig jenkins on               # 设置开机运行服务，需要先执行 --add 才能执行该命令
  chkconfig jenkins off              # 设置开机不运行服务，需要先执行 --add 才能执行该命令
  chkconfig --level 35 jenkins on    # 设置服务在等级3和5时开机运行服务，默认是设置2345等级开机运行服务
  ```
  
  解决部分中文问题
  
  ```
  localectl set-locale  LANG=en_US.utf8
  ```
  
  