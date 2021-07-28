# Redis安装（单机）

## 介绍

[TOC]

**环境：CentOS7、Redis-5.0.5版本。**

1、 Redis官网(<http://redis.io/download>)下载Redis。下载地址：<http://download.redis.io/releases/redis-5.0.5.tar.gz>

2、 将下载的Redis文件上传到CentOS系统中。

3、 安装gcc

```shell
yum install gcc-c++
```

4、 解压文件

```shell
 tar -zvxf redis-5.0.5.tar.gz
```

5、执行make命令

```shell
cd redis-5.0.5
make
#make install,默认安装在/usr/local下
#指定安装目录为/app/redis-5.0.5
make PREFIX=/app/redis-5.0.5 install
```

6、修改redis-5.0.5/redis.conf

```shell
#注释掉 bind 127.0.0.1 这一行
#bind 127.0.0.1
#将 protected-mode 属性改为 no （关闭保护模式，不然会阻止远程访问）
protected-mode no
#将 daemonize 属性改为 yes （这样启动时就在后台启动）
daemonize yes
#设置密码（可选，个人建议还是设个密码）
# requirepass foobared
#修改端口号（可选，默认为6379）
#port 6379
```

7、启动redis

```shell
bin/redis-server redis.conf
```

8、停止redis

```shell
bin/redis-cli shutdown
```
9、redis设置开机启动

vi /usr/lib/systemd/system/redis.service
```shell
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /usr/local/bin/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

