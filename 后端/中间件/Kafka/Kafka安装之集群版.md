# Kafka安装（集群版）

## 介绍

[TOC]

**环境：CentOS7、kafka_2.12-2.3.0版本**

**主机配置:**

| 主机名 | IP地址          | JDK       | Hadoop   |
| ------ | --------------- | --------- | -------- |
| master | 192.168.153.130 | 1.8.0_201 | server.1 |
| slave1 | 192.168.153.131 | 1.8.0_201 | server.2 |
| slave2 | 192.168.153.132 | 1.8.0_201 | server.3 |

**安装目录：/apps/kafka_2.12-2.3.0**

**备注：kafka依赖zookeeper，因此在安装kafka之前需要安装好zookeeper环境**

​      **1.集群安装规划**

​      **1.1** **软件规划**

| 软件      | 版本             |
| --------- | ---------------- |
| Jdk       | Jdk1.8           |
| CentOS    | CentOS7          |
| Zookeeper | Zookeeper3.4.14  |
| kafka     | kafka_2.12-2.3.0 |

  **1.2数据目录规划**

​      在搭建Hadoop集群之前，需要规划好所有的软件目录和数据存放目录，便于后期的管理与维护。

| 目录名称               | 绝对路径   |
| ---------------------- | ---------- |
| 所有软件存放目录       | /apps/app  |
| 所有数据与日志存放目录 | /apps/data |

​	**2. 集群安装**

-  **配置主机名（永久修改主机名）**

```
hostnamectl --static set-hostname <host-name>
```

- **修改/etc/hosts,加入以下配置，使节点之间可以通过主机名访问**


```
192.168.153.130 master
192.168.153.131 slave1
192.168.153.132 slave2
```

- **关闭防火墙**

  查看防火墙状态

  ```
  systemctl status firewalld 
  ```

  临时关闭防火墙

  ```
  systemctl stop firewalld
  ```

  永久关闭防火墙(需要重启才能生效)

  ```
  systemctl disable firewalld
  ```

- **关闭selinux**
  selinux是Linux一个子安全机制，学习环境可以将它禁用

  ```
  vim /etc/sysconfig/selinux
  ```

  把SELINUX设置成disabled

  ```
  SELINUX=disabled
  ```

- **设置节点间免密登陆**

  - 在jmaster上生成公钥私钥

    ```shell
    ssh-keygen
    ```

  - 查看公钥私钥

    ```shell
    ll -a
    ```

  - 将公钥拷贝到slave1,slave2节点

    ```shell
    ssh-copy-id root@slave1
    ssh-copy-id root@slave2
    ```

  - 其他两台机器重复此步骤

  - 在slave1上免密登陆slave2

    ```shell
     ssh root@slave2
    ```

- **配置脚本工具**

  - deploy.conf

    ```
    #规划集群角色
    master,all,namenode,zookeeper,resourcemanager,
    slave1,all,slave,namenode,zookeeper,resourcemanager,
    slave2,all,slave,datanode,zookeeper,
    ```

  - deploy.sh

    ```shell
    #!/bin/bash
    #set -x
    
    if [ $# -lt 3 ]
    then 
      echo "Usage: ./deply.sh srcFile(or Dir) descFile(or Dir) MachineTag"
      echo "Usage: ./deply.sh srcFile(or Dir) descFile(or Dir) MachineTag confFile"
      exit 
    fi
    
    src=$1
    dest=$2
    tag=$3
    if [ 'a'$4'a' == 'aa' ]
    then
      confFile=/apps/deploy.conf
    else 
      confFile=$4
    fi
    
    if [ -f $confFile ]
    then
      if [ -f $src ]
      then
        for server in `cat $confFile|grep -v '^#'|grep ','$tag','|awk -F',' '{print $1}'` 
        do
           scp $src $server":"${dest}
        done 
      elif [ -d $src ]
      then
        for server in `cat $confFile|grep -v '^#'|grep ','$tag','|awk -F',' '{print $1}'` 
        do
           scp -r $src $server":"${dest}
        done 
      else
          echo "Error: No source file exist"
      fi
    
    else
      echo "Error: Please assign config file or run deploy.sh command with deploy.conf in same directory"
    fi
    ```

  - runRemoteCmd.sh

    ```shell
    #!/bin/bash
    #set -x
    
    if [ $# -lt 2 ]
    then 
      echo "Usage: ./runRemoteCmd.sh Command MachineTag"
      echo "Usage: ./runRemoteCmd.sh Command MachineTag confFile"
      exit 
    fi
    
    cmd=$1
    tag=$2
    if [ 'a'$3'a' == 'aa' ]
    then
      
      confFile=/apps/deploy.conf
    else 
      confFile=$3
    fi
    
    if [ -f $confFile ]
    then
        for server in `cat $confFile|grep -v '^#'|grep ','$tag','|awk -F',' '{print $1}'` 
        do
           echo "*******************$server***************************"
           ssh $server "source /etc/profile; $cmd"
        done 
    else
      echo "Error: Please assign config file or run deploy.sh command with deploy.conf in same directory"
    fi
    ```

  - 给脚本添加执行权限

    ```
     chmod u+x deploy.sh
     chmod u+x runRemoteCmd.sh
    ```

- **安装jdk1.8**

  - 使用解压命令解压到当前目录。

    ```shell
    tar zxvf jdk-8u221-linux-x64.tar.gz
    ```

  - 修改etc/profile，在文件结尾追加如下命令：

    ```shell
    #java environment
    export JAVA_HOME=/apps/jdk1.8.0_221
    export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
    export PATH=$PATH:$JAVA_HOME/bin
    ```

  - 保存profile，使之生效

    ```shell
    source /etc/profile
    ```

  - 检验是否安装成功

    ```shell
    java -version
    ```

- **安装Zookeeper**

  - 将下载的Zookeeper文件上传到CentOS系统中。

  -  解压文件

    ```
    tar -zxvf zookeeper-3.4.14.tar.gz
    ```

  - 进入到conf目录

    ```
    cd zookeeper-3.4.14/conf
    ```

  - 将zoo_sample.cfg拷贝一份为zoo.cfg

    ```
    cp zoo_sample.cfg zoo.cfg
    ```

  - 修改zoo.cfg配置文件

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
    server.1=master:2888:3888
    server.2=slave1:2888:3888
    server.3=slave2:2888:3888
    
    ```

  - 创建ServerID标识

    除了修改zoo.cfg配置文件外,zookeeper集群模式下还要配置一个myid文件,这个文件需要放在dataDir目录下。

    这个文件里面有一个数据就是A的值（该A就是zoo.cfg文件中server.A=B:C:D中的A）,在zoo.cfg文件中配置的dataDir路径中创建myid文件。值同时与zoo.cfg文件里面的server.1保持一致，如下

    ```shell
    #192.168.153.130
    echo "1" > /tmp/zookeeper/myid
    #192.168.153.131
    echo "2" > /tmp/zookeeper/myid
    #192.168.153.132
    echo "3" > /tmp/zookeeper/myid
    ```

  - 设置环境变量

    ```shell
    #修改/etc/profile文件
    vi /etc/profile
    #加入以下配置
    export ZOOKEEPER_INSTALL=/apps/zookeeper-3.4.14
    export PATH=$PATH:$ZOOKEEPER_INSTALL/bin
    #使配置生效
    source /etc/profile
    ```

  - 使用runRemoteCmd.sh 脚本，启动所有节点上面的Zookeeper

    ```
    runRemoteCmd.sh "/apps/zookeeper-3.4.14/bin/zkServer.sh start" zookeeper
    ```

  - 查看所有Zookeeper节点状态

    ```
    runRemoteCmd.sh "/apps/zookeeper-3.4.14/bin/zkServer.sh status" zookeeper
    ```

- **集群搭建**

- 下载解压kafka_2.12-2.3.0

```
tar -zvxf kafka_2.12-2.3.0.tgz
```

- **配置server.properties**

```shell
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# see kafka.server.KafkaConfig for additional details and defaults

############################# Server Basics #############################

# The id of the broker. This must be set to a unique integer for each broker.
broker.id=0

############################# Socket Server Settings #############################

# The address the socket server listens on. It will get the value returned from 
# java.net.InetAddress.getCanonicalHostName() if not configured.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
#listeners=PLAINTEXT://:9092
listeners=PLAINTEXT://master:9092

# Hostname and port the broker will advertise to producers and consumers. If not set, 
# it uses the value for "listeners" if configured.  Otherwise, it will use the value
# returned from java.net.InetAddress.getCanonicalHostName().
#advertised.listeners=PLAINTEXT://your.host.name:9092

# Maps listener names to security protocols, the default is for them to be the same. See the config documentation for more details
#listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL

# The number of threads that the server uses for receiving requests from the network and sending responses to the network
num.network.threads=3

# The number of threads that the server uses for processing requests, which may include disk I/O
num.io.threads=8

# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=102400

# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=102400

# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600


############################# Log Basics #############################

# A comma separated list of directories under which to store log files
log.dirs=/apps/kafka_2.12-2.3.0/kafka-logs

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
num.partitions=1

# The number of threads per data directory to be used for log recovery at startup and flushing at shutdown.
# This value is recommended to be increased for installations with data dirs located in RAID array.
num.recovery.threads.per.data.dir=1

############################# Internal Topic Settings  #############################
# The replication factor for the group metadata internal topics "__consumer_offsets" and "__transaction_state"
# For anything other than development testing, a value greater than 1 is recommended for to ensure availability such as 3.
offsets.topic.replication.factor=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1

############################# Log Flush Policy #############################

# Messages are immediately written to the filesystem but by default we only fsync() to sync
# the OS cache lazily. The following configurations control the flush of data to disk.
# There are a few important trade-offs here:
#    1. Durability: Unflushed data may be lost if you are not using replication.
#    2. Latency: Very large flush intervals may lead to latency spikes when the flush does occur as there will be a lot of data to flush.
#    3. Throughput: The flush is generally the most expensive operation, and a small flush interval may lead to excessive seeks.
# The settings below allow one to configure the flush policy to flush data after a period of time or
# every N messages (or both). This can be done globally and overridden on a per-topic basis.

# The number of messages to accept before forcing a flush of data to disk
#log.flush.interval.messages=10000

# The maximum amount of time a message can sit in a log before we force a flush
#log.flush.interval.ms=1000

############################# Log Retention Policy #############################

# The following configurations control the disposal of log segments. The policy can
# be set to delete segments after a period of time, or after a given size has accumulated.
# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
# from the end of the log.

# The minimum age of a log file to be eligible for deletion due to age
log.retention.hours=168

# A size-based retention policy for logs. Segments are pruned from the log unless the remaining
# segments drop below log.retention.bytes. Functions independently of log.retention.hours.
#log.retention.bytes=1073741824

# The maximum size of a log segment file. When this size is reached a new log segment will be created.
log.segment.bytes=1073741824

# The interval at which log segments are checked to see if they can be deleted according
# to the retention policies
log.retention.check.interval.ms=300000

############################# Zookeeper #############################

# Zookeeper connection string (see zookeeper docs for details).
# This is a comma separated host:port pairs, each corresponding to a zk
# server. e.g. "127.0.0.1:3000,127.0.0.1:3001,127.0.0.1:3002".
# You can also append an optional chroot string to the urls to specify the
# root directory for all kafka znodes.
zookeeper.connect=master:2181,slave1:2181,slave2:2181

# Timeout in ms for connecting to zookeeper
zookeeper.connection.timeout.ms=6000


############################# Group Coordinator Settings #############################

# The following configuration specifies the time, in milliseconds, that the GroupCoordinator will delay the initial consumer rebalance.
# The rebalance will be further delayed by the value of group.initial.rebalance.delay.ms as new members join the group, up to a maximum of max.poll.interval.ms.
# The default value for this is 3 seconds.
# We override this to 0 here as it makes for a better out-of-the-box experience for development and testing.
# However, in production environments the default value of 3 seconds is more suitable as this will help to avoid unnecessary, and potentially expensive, rebalances during application startup.
group.initial.rebalance.delay.ms=0
```

- **将kafka安装包分发到其他节点**

```
deploy.sh /apps/kafka_2.12-2.3.0 /apps/ slave
```

- **配置hadoop3环境变量，并使用source /etc/profile 使之生效**

```shell
#java environment
export JAVA_HOME=/apps/jdk1.8.0_221
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
export PATH=$PATH:$JAVA_HOME/bin

export ZOOKEEPER_INSTALL=/apps/zookeeper-3.4.14
export PATH=$PATH:$ZOOKEEPER_INSTALL/bin

export HADOOP_HOME=/apps/hadoop-3.1.2
export PATH=$PATH:$HADOOP_HOME/bin

#kafka 
export KAFKA_HOME=/apps/kafka_2.12-2.3.0
export PATH=$PATH:${KAFKA_HOME}/bin

```

- **配置slave1 server.properties**

```shell
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# see kafka.server.KafkaConfig for additional details and defaults

############################# Server Basics #############################

# The id of the broker. This must be set to a unique integer for each broker.
broker.id=1

############################# Socket Server Settings #############################

# The address the socket server listens on. It will get the value returned from 
# java.net.InetAddress.getCanonicalHostName() if not configured.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
#listeners=PLAINTEXT://:9092
listeners=PLAINTEXT://slava1:9092

# Hostname and port the broker will advertise to producers and consumers. If not set, 
# it uses the value for "listeners" if configured.  Otherwise, it will use the value
# returned from java.net.InetAddress.getCanonicalHostName().
#advertised.listeners=PLAINTEXT://your.host.name:9092

# Maps listener names to security protocols, the default is for them to be the same. See the config documentation for more details
#listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL

# The number of threads that the server uses for receiving requests from the network and sending responses to the network
num.network.threads=3

# The number of threads that the server uses for processing requests, which may include disk I/O
num.io.threads=8

# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=102400

# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=102400

# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600


############################# Log Basics #############################

# A comma separated list of directories under which to store log files
log.dirs=/apps/kafka_2.12-2.3.0/kafka-logs

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
num.partitions=1

# The number of threads per data directory to be used for log recovery at startup and flushing at shutdown.
# This value is recommended to be increased for installations with data dirs located in RAID array.
num.recovery.threads.per.data.dir=1

############################# Internal Topic Settings  #############################
# The replication factor for the group metadata internal topics "__consumer_offsets" and "__transaction_state"
# For anything other than development testing, a value greater than 1 is recommended for to ensure availability such as 3.
offsets.topic.replication.factor=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1

############################# Log Flush Policy #############################

# Messages are immediately written to the filesystem but by default we only fsync() to sync
# the OS cache lazily. The following configurations control the flush of data to disk.
# There are a few important trade-offs here:
#    1. Durability: Unflushed data may be lost if you are not using replication.
#    2. Latency: Very large flush intervals may lead to latency spikes when the flush does occur as there will be a lot of data to flush.
#    3. Throughput: The flush is generally the most expensive operation, and a small flush interval may lead to excessive seeks.
# The settings below allow one to configure the flush policy to flush data after a period of time or
# every N messages (or both). This can be done globally and overridden on a per-topic basis.

# The number of messages to accept before forcing a flush of data to disk
#log.flush.interval.messages=10000

# The maximum amount of time a message can sit in a log before we force a flush
#log.flush.interval.ms=1000

############################# Log Retention Policy #############################

# The following configurations control the disposal of log segments. The policy can
# be set to delete segments after a period of time, or after a given size has accumulated.
# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
# from the end of the log.

# The minimum age of a log file to be eligible for deletion due to age
log.retention.hours=168

# A size-based retention policy for logs. Segments are pruned from the log unless the remaining
# segments drop below log.retention.bytes. Functions independently of log.retention.hours.
#log.retention.bytes=1073741824

# The maximum size of a log segment file. When this size is reached a new log segment will be created.
log.segment.bytes=1073741824

# The interval at which log segments are checked to see if they can be deleted according
# to the retention policies
log.retention.check.interval.ms=300000

############################# Zookeeper #############################

# Zookeeper connection string (see zookeeper docs for details).
# This is a comma separated host:port pairs, each corresponding to a zk
# server. e.g. "127.0.0.1:3000,127.0.0.1:3001,127.0.0.1:3002".
# You can also append an optional chroot string to the urls to specify the
# root directory for all kafka znodes.
zookeeper.connect=master:2181,slave1:2181,slave2:2181

# Timeout in ms for connecting to zookeeper
zookeeper.connection.timeout.ms=6000


############################# Group Coordinator Settings #############################

# The following configuration specifies the time, in milliseconds, that the GroupCoordinator will delay the initial consumer rebalance.
# The rebalance will be further delayed by the value of group.initial.rebalance.delay.ms as new members join the group, up to a maximum of max.poll.interval.ms.
# The default value for this is 3 seconds.
# We override this to 0 here as it makes for a better out-of-the-box experience for development and testing.
# However, in production environments the default value of 3 seconds is more suitable as this will help to avoid unnecessary, and potentially expensive, rebalances during application startup.
group.initial.rebalance.delay.ms=0
```

- **配置slave2 server.properties**

```shell
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# see kafka.server.KafkaConfig for additional details and defaults

############################# Server Basics #############################

# The id of the broker. This must be set to a unique integer for each broker.
broker.id=2

############################# Socket Server Settings #############################

# The address the socket server listens on. It will get the value returned from 
# java.net.InetAddress.getCanonicalHostName() if not configured.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
#listeners=PLAINTEXT://:9092
listeners=PLAINTEXT://slave2:9092

# Hostname and port the broker will advertise to producers and consumers. If not set, 
# it uses the value for "listeners" if configured.  Otherwise, it will use the value
# returned from java.net.InetAddress.getCanonicalHostName().
#advertised.listeners=PLAINTEXT://your.host.name:9092

# Maps listener names to security protocols, the default is for them to be the same. See the config documentation for more details
#listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL

# The number of threads that the server uses for receiving requests from the network and sending responses to the network
num.network.threads=3

# The number of threads that the server uses for processing requests, which may include disk I/O
num.io.threads=8

# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=102400

# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=102400

# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600


############################# Log Basics #############################

# A comma separated list of directories under which to store log files
log.dirs=/apps/kafka_2.12-2.3.0/kafka-logs

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
num.partitions=1

# The number of threads per data directory to be used for log recovery at startup and flushing at shutdown.
# This value is recommended to be increased for installations with data dirs located in RAID array.
num.recovery.threads.per.data.dir=1

############################# Internal Topic Settings  #############################
# The replication factor for the group metadata internal topics "__consumer_offsets" and "__transaction_state"
# For anything other than development testing, a value greater than 1 is recommended for to ensure availability such as 3.
offsets.topic.replication.factor=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1

############################# Log Flush Policy #############################

# Messages are immediately written to the filesystem but by default we only fsync() to sync
# the OS cache lazily. The following configurations control the flush of data to disk.
# There are a few important trade-offs here:
#    1. Durability: Unflushed data may be lost if you are not using replication.
#    2. Latency: Very large flush intervals may lead to latency spikes when the flush does occur as there will be a lot of data to flush.
#    3. Throughput: The flush is generally the most expensive operation, and a small flush interval may lead to excessive seeks.
# The settings below allow one to configure the flush policy to flush data after a period of time or
# every N messages (or both). This can be done globally and overridden on a per-topic basis.

# The number of messages to accept before forcing a flush of data to disk
#log.flush.interval.messages=10000

# The maximum amount of time a message can sit in a log before we force a flush
#log.flush.interval.ms=1000

############################# Log Retention Policy #############################

# The following configurations control the disposal of log segments. The policy can
# be set to delete segments after a period of time, or after a given size has accumulated.
# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
# from the end of the log.

# The minimum age of a log file to be eligible for deletion due to age
log.retention.hours=168

# A size-based retention policy for logs. Segments are pruned from the log unless the remaining
# segments drop below log.retention.bytes. Functions independently of log.retention.hours.
#log.retention.bytes=1073741824

# The maximum size of a log segment file. When this size is reached a new log segment will be created.
log.segment.bytes=1073741824

# The interval at which log segments are checked to see if they can be deleted according
# to the retention policies
log.retention.check.interval.ms=300000

############################# Zookeeper #############################

# Zookeeper connection string (see zookeeper docs for details).
# This is a comma separated host:port pairs, each corresponding to a zk
# server. e.g. "127.0.0.1:3000,127.0.0.1:3001,127.0.0.1:3002".
# You can also append an optional chroot string to the urls to specify the
# root directory for all kafka znodes.
zookeeper.connect=master:2181,slave1:2181,slave2:2181

# Timeout in ms for connecting to zookeeper
zookeeper.connection.timeout.ms=6000


############################# Group Coordinator Settings #############################

# The following configuration specifies the time, in milliseconds, that the GroupCoordinator will delay the initial consumer rebalance.
# The rebalance will be further delayed by the value of group.initial.rebalance.delay.ms as new members join the group, up to a maximum of max.poll.interval.ms.
# The default value for this is 3 seconds.
# We override this to 0 here as it makes for a better out-of-the-box experience for development and testing.
# However, in production environments the default value of 3 seconds is more suitable as this will help to avoid unnecessary, and potentially expensive, rebalances during application startup.
group.initial.rebalance.delay.ms=0
```

- **创建目录**

```shell
runRemoteCmd.sh "mkdir -p /apps/kafka_2.12-2.3.0/kafka-logs" all
```

- **启动Kafka**

一键启动Kafka

```shell
runRemoteCmd.sh "/apps/kafka_2.12-2.3.0/bin/kafka-server-start.sh -daemon /apps/kafka_2.12-2.3.0/config/server.properties" all
```

- **测试运行Kafka**

```shell
#使用自带脚本向topic 发送数据
bin/kafka-console-producer.sh --broker-list master:9092 --topic test
#使用自带脚本消费topic 数据（从头消费数据）
bin/kafka-console-consumer.sh --bootstrap-server master:9092 --topic test
--from-beginning
```
