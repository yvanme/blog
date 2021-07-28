# Zookeeper安装（单机版）

## 介绍

[TOC]

**环境：CentOS7、zookeeper-3.4.14版本**

**安装目录：/apps/zookeeper-3.4.14**

**备注：zookeeper依赖java，因此在安装zookeeper之前需要安装好java环境**

1、 官网(https://zookeeper.apache.org/releases.html#download)下载Zookeeper。下载地址：<http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.14/zookeeper-3.4.14.tar.gz>

2、 将下载的Zookeeper文件上传到CentOS系统中。

3、 解压文件

```shell
tar -zxvf zookeeper-3.4.14.tar.gz
```

4、进入到conf目录

```shell
cd zookeeper-3.4.14/conf
```

5、将zoo_sample.cfg拷贝一份为zoo.cfg

```shell
cp zoo_sample.cfg zoo.cfg
```

6、修改zoo.cfg配置文件

```shell
# The number of milliseconds of each tick
tickTime=2000
# The number of ticks that the initial 
# synchronization phase can take
initLimit=10
# The number of ticks that can pass between 
# sending a request and getting an acknowledgement
syncLimit=5
# the directory where the snapshot is stored.
# do not use /tmp for storage, /tmp here is just 
# example sakes.
#数据存放目录
dataDir=/tmp/zookeeper
# the port at which the clients will connect
#服务的端口号
clientPort=2181
# the maximum number of client connections.
# increase this if you need to handle more clients
#maxClientCnxns=60
#
# Be sure to read the maintenance section of the 
# administrator guide before turning on autopurge.
#
# http://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_maintenance
#
# The number of snapshots to retain in dataDir
#autopurge.snapRetainCount=3
# Purge task interval in hours
# Set to "0" to disable auto purge feature
#autopurge.purgeInterval=1

```

7、设置环境变量

```shell
#修改/etc/profile文件
vi /etc/profile
#加入以下配置
export ZOOKEEPER_INSTALL=/apps/zookeeper-3.4.14
export PATH=$PATH:$ZOOKEEPER_INSTALL/bin
#使配置生效
source /etc/profile
```

8、启动zookeeper

```shell
zkServer.sh start
```

9、查看zookeeper状态

```shell
zkServer.sh status
```

