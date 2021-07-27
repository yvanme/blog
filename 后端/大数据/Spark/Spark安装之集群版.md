# Centos7下Spark环境搭建（集群）

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**

**spark:spark-2.4.3-bin-hadoop2.7**

## Spark安装

1. 解压spark包

   ```shell
   tar -zvxf spark-2.4.3-bin-hadoop2.7.tgz
   ```

2. 配置环境变量

   ```shell
   #修改/etc下profile文件，加入以下配置并使用source /etc/profile命令使之生效
   #Spark
   export SPARK_HOME=/apps/spark-2.4.3-bin-hadoop2.7
   export PATH=$PATH:${SPARK_HOME}/bin
   ```

3. 配置Spark

   - 进入 ${SPARK_HOME}/conf 目录

   - 执行如下命令

     ```
     cp spark-env.sh.template spark-env.sh
     cp slaves.template slaves
     ```

   - slaves

     ```
     master
     slave1
     slave2
     ```
     
   - spark-env.sh

     ```shell
     #配置jdk
     export JAVA_HOME=/apps/jdk1.8.0_221
     #配置hadoop 配置文件目录
     export HADOOP_CONF_DIR=/apps/hadoop-3.1.2/etc/hadoop
     #配置hadoop 根目录
     export HADOOP_HOME=/apps/hadoop-3.1.2 
     #spark master webui 端口，默认是8080，跟tomcat 冲突
     SPARK_MASTER_WEBUI_PORT=8888
     #配置spark HA 配置
     SPARK_DAEMON_JAVA_OPTS="-Dspark.deploy.recoveryMode=ZOOKEEPER
     -Dspark.deploy.zookeeper.url=master:2181,slave1:2181,slave2:2181
     -Dspark.deploy.zookeeper.dir=/myspark"
     #spark 配置文件目录
     SPARK_CONF_DIR=/apps/spark-2.4.3-bin-hadoop2.7/conf
     #spark 日志目录
     SPARK_LOG_DIR=/apps/spark-2.4.3-bin-hadoop2.7/logs
     #spark 进程ip 文件保存位置
     SPARK_PID_DIR=/apps/spark-2.4.3-bin-hadoop2.7/logs
     ```
     
   - 创建相应目录

     ```shell
     runRemoteCmd.sh "mkdir -p /apps/spark-2.4.3-bin-hadoop2.7/logs" all
     ```
     
   - 拷贝hdfs 配置文件到spark 目录

     ```shell
     cp core-site.xml /apps/spark-2.4.3-bin-hadoop2.7/conf/
     cp hdfs-site.xml /apps/spark-2.4.3-bin-hadoop2.7/conf/
     ```
     
   - 拷贝到各个节点

     ```shell
     deploy.sh /apps/spark-2.4.3-bin-hadoop2.7 /apps/ slave
     ```

4. 启动Spark

   - 进入${SPARK_HOME}/sbin 目录，执行如下命令

     ```
     sbin/start-all.sh
     ```

5. 浏览器访问

   ```
   http://master:8888/
   ```

6. 提交yarn任务

   ```shell
   ./spark-submit --class com.loong.MyJavaWordCount --master yarn --deploy-mode cluster /apps/wordcount.jar  /user/hive/warehouse/stu/stu.txt /out
   ```

   