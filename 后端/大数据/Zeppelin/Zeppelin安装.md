# Centos7下Zeppelin搭建

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**

**zeppelin:zeppelin-0.8.1-bin-all**

## jdk安装

1. 解压jdk包

   ```shell
   tar -zvxf jdk-8u201-linux-x64.tar.gz
   ```

2. 配置环境变量

   ```shell
   #修改/etc下profile文件，加入以下配置并使用source /etc/profile命令使之生效
   
   #Java
   export JAVA_HOME=/apps/jdk1.8.0_201
   export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
   export PATH=$PATH:$JAVA_HOME/bin
   ```
## Zeppelin安装

1. 解压包

    ```shell
    tar -zvxf zeppelin-0.8.1-bin-all.tgz
    ```

2. 启动

    ```shell
    bin/zeppelin-daemon.sh start
    ```
    
3. 访问服务

    ```
    http://localhost:8080
    ```

4. 停止

    ```shell
    bin/zeppelin-daemon.sh stop
    ```
