# Redis集群搭建

## 介绍

[TOC]

**环境：CentOS7、Redis-5.0.4版本。**

1、 Redis官网(<http://redis.io/download>)下载Redis。下载地址：<http://download.redis.io/releases/redis-5.0.4.tar.gz>

2、 将下载的Redis文件上传到CentOS系统中。

3、 安装gcc

```html
yum install gcc-c++
```

4、 解压文件

```html
tar -zvxf redis-5.0.4.tar.gz
```

5、执行make命令

```html
cd redis-5.0.4
make
```

6、修改redis-5.0.4/utils/create-cluster目录下create-cluster脚本,其中PORT=30000，NODES=6表示集群有6个节点，端口从30001开始至30006，可以根据自身需求自行调整，如需远程访问，请在--daemonize yes 后加入protected-mode no，并将127.0.0.1换为本机地址

```html
#!/bin/bash

# Settings
PORT=30000
TIMEOUT=2000
NODES=6
REPLICAS=1

# You may want to put the above config parameters into config.sh in order to
# override the defaults without modifying this script.

if [ -a config.sh ]
then
    source "config.sh"
fi

# Computed vars
ENDPORT=$((PORT+NODES))

if [ "$1" == "start" ]
then
    while [ $((PORT < ENDPORT)) != "0" ]; do
        PORT=$((PORT+1))
        echo "Starting $PORT"
        ../../src/redis-server --port $PORT --cluster-enabled yes --cluster-config-file nodes-${PORT}.conf --cluster-node-timeout $TIMEOUT --appendonly yes --appendfilename appendonly-${PORT}.aof --dbfilename dump-${PORT}.rdb --logfile ${PORT}.log --daemonize yes
    done
    exit 0
fi

if [ "$1" == "create" ]
then
    HOSTS=""
    while [ $((PORT < ENDPORT)) != "0" ]; do
        PORT=$((PORT+1))
        HOSTS="$HOSTS 127.0.0.1:$PORT"
    done
    ../../src/redis-cli --cluster create $HOSTS --cluster-replicas $REPLICAS
    exit 0
fi

if [ "$1" == "stop" ]
then
    while [ $((PORT < ENDPORT)) != "0" ]; do
        PORT=$((PORT+1))
        echo "Stopping $PORT"
        ../../src/redis-cli -p $PORT shutdown nosave
    done
    exit 0
fi

if [ "$1" == "watch" ]
then
    PORT=$((PORT+1))
    while [ 1 ]; do
        clear
        date
        ../../src/redis-cli -p $PORT cluster nodes | head -30
        sleep 1
    done
    exit 0
fi

if [ "$1" == "tail" ]
then
    INSTANCE=$2
    PORT=$((PORT+INSTANCE))
    tail -f ${PORT}.log
    exit 0
fi

if [ "$1" == "call" ]
then
    while [ $((PORT < ENDPORT)) != "0" ]; do
        PORT=$((PORT+1))
        ../../src/redis-cli -p $PORT $2 $3 $4 $5 $6 $7 $8 $9
    done
    exit 0
fi

if [ "$1" == "clean" ]
then
    rm -rf *.log
    rm -rf appendonly*.aof
    rm -rf dump*.rdb
    rm -rf nodes*.conf
    exit 0
fi

if [ "$1" == "clean-logs" ]
then
    rm -rf *.log
    exit 0
fi

echo "Usage: $0 [start|create|stop|watch|tail|clean]"
echo "start       -- Launch Redis Cluster instances."
echo "create      -- Create a cluster using redis-cli --cluster create."
echo "stop        -- Stop Redis Cluster instances."
echo "watch       -- Show CLUSTER NODES output (first 30 lines) of first node."
echo "tail <id>   -- Run tail -f of instance at base port + ID."
echo "clean       -- Remove all instances data, logs, configs."
echo "clean-logs  -- Remove just instances logs."
```

7、创建集群,运行以下命令，在选则框中选择yes：

```html
./create-cluster start
./create-cluster create
```

8、停止集群：

```html
./create-cluster stop
```

9、参数说明

```html
port  7000                                        //端口7000,7002,7003        
bind 本机ip                                       //默认ip为127.0.0.1 需要改为其他节点机器可访问的ip 否则创建集群时无法访问对应的端口，无法创建集群
daemonize    yes                               //redis后台运行
pidfile  /var/run/redis_7000.pid          //pidfile文件对应7000,7001,7002
cluster-enabled  yes                           //开启集群  把注释#去掉
cluster-config-file  nodes_7000.conf   //集群的配置  配置文件首次启动自动生成 7000,7001,7002
cluster-node-timeout  15000                //请求超时  默认15秒，可自行设置
appendonly  yes                           //aof日志开启  有需要就开启，它会每次写操作都记录一条日志
```