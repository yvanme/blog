# Sqoop安装

## 介绍

[TOC]

**环境：CentOS7、sqoop-1.4.7版本**

**安装目录：/apps/sqoop-1.4.7**

- Sqoop安装

  - 下载解压Sqoop

    ```
    tar -zvxf sqoop-1.4.7.tar.gz
    ```

  - **配置sqoop-env.sh**

    ```shell
    export HADOOP_COMMON_HOME=/apps/hadoop-3.1.2
    export HADOOP_MAPRED_HOME=/apps/hadoop-3.1.2
    export HIVE_HOME=/apps/apache-hive-3.1.1-bin
    export HBASE_HOME=/apps/hbase-2.2.0
    ```

  - **把MySQL的驱动包上传到sqoop的lib下** 

  - **配置环境变量，并使用source /etc/profile 使之生效**

    ```shell
    #java environment
    export JAVA_HOME=/apps/jdk1.8.0_221
    export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
    export PATH=$PATH:$JAVA_HOME/bin
    
    export ZOOKEEPER_INSTALL=/apps/zookeeper-3.4.14
    export PATH=$PATH:$ZOOKEEPER_INSTALL/bin
    
    export HADOOP_HOME=/apps/hadoop-3.1.2
    export PATH=$PATH:$HADOOP_HOME/bin
    
    export HBASE_HOME=/apps/hbase-2.2.0
    export PATH=$PATH:$HBASE_HOME/bin
    
    export SQOOP_HOME=/apps/sqoop-1.4.7
    ```

  - **.使用sqoop查看mysql中的数据表**

    ```shell
    bin/sqoop list-databases --connect jdbc:mysql://192.168.1.34:3306/test?characterEncoding=UTF-8 --username root --password '123'
    ```

  - **把MySQL中的表导入hdfs中**

    ```shell
    bin/sqoop import \
    --connect 'jdbc:mysql://ip/test?useUnicode=true&characterEncoding=utf-8' \
    --username root \
    --password 111111 \
    --table stu \
    --fields-terminated-by '\t' \
    -m 1
    ```

  - **将HDFS 数据导入MySQL 数据库**

    ```shell
    bin/sqoop export \
    --connect 'jdbc:mysql://ip/test?useUnicode=true&characterEncoding=utf-8' \
    --username root \
    --password 111111 \
    --table stu2 \
    --columns name,sex,age,profile \
    --export-dir '/user/hive/warehouse/stu' \
    --input-fields-terminated-by "\t" \
    -m 1 \
    --update-key id \
    --update-mode allowinsert
    ```


  备注：

  如报找不到或无法加载主类 org.apache.sqoop.Sqoop

  解决方法：

  ​    1.下载sqoop-1.4.6.bin_hadoop-2.0.4-alpha.tar.gz这个安装包。

  ​	2.然后解压这个安装包，打开安装包取出sqoop-1.4.6.jar放在hadoop的lib下  