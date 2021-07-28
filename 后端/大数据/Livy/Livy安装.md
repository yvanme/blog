# Centos7下Livy环境搭建

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**
**Livy:livy-0.6.0**

## Livy安装

1. 解压Livy包

   ```html
   unzip apache-livy-0.6.0-incubating-bin.zip
   ```

2. livy-env.sh

   ```
   export SPARK_HOME=/apps/spark-2.4.3-bin-hadoop2.7
   export HADOOP_CONF_DIR=/apps/hadoop-3.1.2/etc/hadoop
   ```
   
4. 创建目录

   ```
    mkdir -p /apps/apache-livy-0.6.0-incubating-bin/logs
   ```
   
4. 启动Spark

   进入${LIVY_HOME}/sbin 目录，执行如下命令

   ```
   #前台模式，可观察程序运行日志
   ./livy-server
   #后台模式
   ./livy-server start
   ```

5. 访问web

   ```
   http://worker:8998
   ```

备注：

当报 Cannot write log directory /apps/apache-livy-0.6.0-incubating-bin/logs错误

解决方法：

```
mkdir logs
```

