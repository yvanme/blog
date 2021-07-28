# JDK安装

## 介绍

[TOC]

**环境：CentOS7、jdk-8u201版本。**

### 1、下载jdk

​		**官网(<https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html>)下载jdk。**

### 2、使用解压命令解压到当前目录

```
tar -zxvf jdk-8u201-linux-x64.tar.gz
```

### 3、修改etc/profile，在文件结尾追加如下命令

```shell
#java environment
export JAVA_HOME=/apps/jdk1.8.0_201
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
export PATH=$PATH:$JAVA_HOME/bin
```

### 4、保存profile，使之生效

```shell
source /etc/profile
```

### 5、检验是否安装成功

```shell
java -version
```