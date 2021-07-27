# CentOS7配置MongoDB

## 介绍

[TOC]

**环境：CentOS7**

### [[官网](https://www.mongodb.com/download-center#community)]下载mongodb-linux-x86_64-rhel62-3.4.3.tgz

### 通过FTP（WinSCP,FileZilla等）工具上传到“/apps”目录

### 使用解压命令解压到当前目录

```shell
tar -zvxf mongodb-linux-x86_64-rhel62-3.4.3.tgz
```

### 开启27017端口

```shell
firewall-cmd --zone=public --add-port=27017/tcp --permanent    （--permanent永久生效，没有此参数重启后失效）
#重新载入
firewall-cmd --reload
```

### 创建data文件夹用于存放数据，创建logs文件用于存放日志

```shell
cd mongodb-linux-x86_64-rhel62-3.4.3
mkdir data
touch logs
```

### 启动MongoDB

```shell
/apps/mongodb-linux-x86_64-rhel62-3.4.3/bin/mongod -dbpath=/apps/mongodb-linux-x86_64-rhel62-3.4.3/data -logpath=/apps/mongodb-linux-x86_64-rhel62-3.4.3/logs  --fork --auth
```

### 创建超级用户

```shell
cd /apps/mongodb-linux-x86_64-rhel62-3.4.3/bin
./mongo
use admin
db.createUser(
...   {
...     user: "admin",
...     pwd: "admin",
...     roles: [ { role: "root", db: "admin" } ]
...   }
... )
```

### 登陆admin用户

```shell
db.auth('admin','admin');
```

### 创建登陆用户

```shell
use test
db.createUser(
...   {
...     user: "test",
...     pwd: "test",
...     roles: [ { role: "readWrite", db: "test" } ]
...   }
... )
```

### 设置开机启动

```shell
#设置开机启动
#修改/etc/下的rc.local添加如下命令
/apps/mongodb-linux-x86_64-rhel62-3.4.3/bin/mongod -dbpath=/apps/mongodb-linux-x86_64-rhel62-3.4.3/data -logpath=/apps/mongodb-linux-x86_64-rhel62-3.4.3/logs  --fork --auth
```