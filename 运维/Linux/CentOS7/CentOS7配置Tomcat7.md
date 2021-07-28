# CentOS7配置Tomcat7

## 介绍

[TOC]

**环境：CentOS7**

### 1、[下载](http://tomcat.apache.org/download-70.cgi)Tomcat7 linux下的安装包。

![输入图片说明](https://static.oschina.net/uploads/img/201612/21163629_xNb3.png)

### 2、通过FTP（WinSCP,FileZilla等）工具上传到“/usr/local/tomcat”目录。

![输入图片说明](https://static.oschina.net/uploads/img/201612/21164237_PS8i.png)

### 3、将安装包解压到当前目录

```
tar zxvf apache-tomcat-7.0.73.tar.gz
```

### 4、进入bin目录，启动tomcat。

```
 cd apache-tomcat-7.0.73/bin
./startup.sh
```

![输入图片说明](https://static.oschina.net/uploads/img/201612/21165145_aD8F.png)

### 5、如果tomcat启动正常但是访问不到tomcat首页，那就需要去关闭防火墙或开启防火墙8080端口。

```shell
#关闭防火墙
systemctl stop firewalld
#开启8080端口（两种方法选一种即可）。
#添加 （--permanent永久生效，没有此参数重启后失效）
firewall-cmd --zone=public --add-port=8080/tcp --permanent    
#重新载入
firewall-cmd --reload
#查看
firewall-cmd --zone=public --query-port=8080/tcp
```

### 6、停止tomcat。

```shell
./shutdown.sh
```