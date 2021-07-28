# CentOS7配置JDK1.7

## 介绍

[TOC]

**环境：CentOS7**

### 1、[下载](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html)JDK1.7。选择linux64位版。

![输入图片说明](https://static.oschina.net/uploads/img/201612/21155623_DgwY.png)

### 2、通过FTP（WinSCP,FileZilla等）工具上传到“/usr/local/java”目录。

![输入图片说明](https://static.oschina.net/uploads/img/201612/21155939_hbk4.png)

### 3、使用解压命令解压到当前目录。

```
tar zxvf jdk-7u80-linux-x64.tar.gz
```

### 4、修改etc/profile，在文件结尾追加如下命令：

```shell
#java environment
export JAVA_HOME=/usr/local/java/jdk1.7.0_80
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
export PATH=$PATH:$JAVA_HOME/bin
```

### 5、保存profile，使之生效。

```shell
source /etc/profile
```

### 6、检验是否安装成功。

```shell
java -version
```

### 7、安装成功效果。

![输入图片说明](https://static.oschina.net/uploads/img/201612/21160626_6l29.png)