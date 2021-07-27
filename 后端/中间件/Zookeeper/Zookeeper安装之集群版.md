# Zookeeper安装（集群版）

## 介绍

[TOC]

**环境：CentOS7、zookeeper-3.4.14版本**

**主机配置:**

| 主机名 | IP地址          | JDK       | ZooKeeper | myid |
| ------ | --------------- | --------- | --------- | ---- |
| master | 192.168.153.131 | 1.8.0_201 | server.1  | 1    |
| slave1 | 192.168.153.132 | 1.8.0_201 | server.2  | 2    |
| slave2 | 192.168.153.133 | 1.8.0_201 | server.3  | 3    |

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
dataLogDir=/tmp/zookeeper/log
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
server.1=192.168.153.131:2888:3888
server.2=192.168.153.132:2888:3888
server.3=192.168.153.133:2888:3888

```

**配置参数说明**

> tickTime:这个时间是作为zookeeper服务器之间或客户端与服务器之间维持心跳的时间间隔,也就是说每个tickTime时间就会发送一个心跳。
>
> initLimit:这个配置项是用来配置zookeeper接受客户端（这里所说的客户端不是用户连接zookeeper服务器的客户端,而是zookeeper服务器集群中连接到leader的follower 服务器）初始化连接时最长能忍受多少个心跳时间间隔数。
>
> 当已经超过10个心跳的时间（也就是tickTime）长度后 zookeeper 服务器还没有收到客户端的返回信息,那么表明这个客户端连接失败。总的时间长度就是 10*2000=20秒。
>
> syncLimit:这个配置项标识leader与follower之间发送消息,请求和应答时间长度,最长不能超过多少个tickTime的时间长度,总的时间长度就是5*2000=10秒。
>
> dataDir:顾名思义就是zookeeper保存数据的目录,默认情况下zookeeper将写数据的日志文件也保存在这个目录里；
>
> clientPort:这个端口就是客户端连接Zookeeper服务器的端口,Zookeeper会监听这个端口接受客户端的访问请求；
>
> server.A=B:C:D:中的A是一个数字,表示这个是第几号服务器,B是这个服务器的IP地址，C第一个端口用来集群成员的信息交换,表示这个服务器与集群中的leader服务器交换信息的端口，D是在leader挂掉时专门用来进行选举leader所用的端口。

7、创建ServerID标识

除了修改zoo.cfg配置文件外,zookeeper集群模式下还要配置一个myid文件,这个文件需要放在dataDir目录下。

这个文件里面有一个数据就是A的值（该A就是zoo.cfg文件中server.A=B:C:D中的A）,在zoo.cfg文件中配置的dataDir路径中创建myid文件。值同时与zoo.cfg文件里面的server.1保持一致，如下

```shell
#192.168.153.131
echo "1" > /tmp/zookeeper/myid
#192.168.153.132
echo "2" > /tmp/zookeeper/myid
#192.168.153.133
echo "3" > /tmp/zookeeper/myid
```

8、设置环境变量

```shell
#修改/etc/profile文件
vi /etc/profile
#加入以下配置
export ZOOKEEPER_INSTALL=/apps/zookeeper-3.4.14
export PATH=$PATH:$ZOOKEEPER_INSTALL/bin
#使配置生效
source /etc/profile
```

9、启动zookeeper

```shell
zkServer.sh start
```

10、查看zookeeper状态

```shell
zkServer.sh status
```

zookeeper连接测试

```shell
zkCli.sh -server 192.168.153.133:2181 
```

11、停止zookeeper

```shell
zkServer.sh stop
```

