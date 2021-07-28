# Centos7下Spark环境搭建（伪分布）

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**

**jdk:jdk-8u201**

**hadoop:hadoop-2.7.7**

**scala:scala-2.13.0**

**spark:spark-2.4.3-bin-hadoop2.7**

## jdk安装

1. 解压jdk包

   ```html
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
     localhost
     ```
     
   - spark-env.sh

     ```shell
     #JAVA_HOME：指定的是 Java 的安装目录
     export JAVA_HOME=/apps/jdk1.8.0_201
     #SPARK_MASTER_IP：指定的是 Spark 集群的 Master 节点的 IP 地址
     export SPARK_MASTER_IP=localhost
     #SPARK_WORKER_MEMOERY：指定的 Worker 节点能够最大分配给 Excutors 的内存大小
     export SPARK_WORKER_MEMORY=2g
     
     export SCALA_HOME=/apps/scala-2.13.0 
     
     export HADOOP_HOME=/apps/hadoop-3.1.2 
     
     export HADOOP_CONF_DIR=/apps/hadoop-3.1.2/etc/hadoop
     
     ```

4. 启动Spark

   - 进入${SPARK_HOME}/sbin 目录，执行如下命令

     ```
     ./start-all.sh
     ```

5. 浏览器访问http://localhost:8080/

6. 提交yarn任务

   ```shell
   ./spark-submit --class com.loong.MyJavaWordCount --master yarn --deploy-mode cluster /apps/wordcount.jar  /user/hive/warehouse/stu/stu.txt /out
   ```

   