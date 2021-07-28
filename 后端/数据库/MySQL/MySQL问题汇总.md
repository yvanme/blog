# MySQL问题汇总

## 介绍

[TOC]

**环境：CentOS7版本**



问题：CentOS7安装Mysql时没有mysql-server可用包

解决方法：

```shell
yum -y install wget
#下载mysql的repo源
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm 
#安装mysql-community-release-el7-5.noarch.rpm包
rpm -ivh mysql-community-release-el7-5.noarch.rpm
#安装mysql
yum install mysql-server
#查看mysql 服务状态
systemctl status mysql
#启动mysql
systemctl start mysql
```

参考链接[Linux下安装Mysql时没有mysql-server可用包的解决](https://blog.csdn.net/weixin_39469127/article/details/85256619)



//获取数据中指定表表名

```
SELECT table_name FROM INFORMATION_SCHEMA.TABLES where TABLE_NAME = 'test'
```

//获取数据中指定表列名

```
SELECT table_name FROM INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = 'test'
```

