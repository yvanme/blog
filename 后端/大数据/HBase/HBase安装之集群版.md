# HBase安装（集群版）

## 介绍

[TOC]

**环境：CentOS7、hadoop-3.1.2版本**

**主机配置:**

| 主机名 | IP地址          | JDK       | Hadoop   |
| ------ | --------------- | --------- | -------- |
| master | 192.168.153.130 | 1.8.0_201 | server.1 |
| slave1 | 192.168.153.131 | 1.8.0_201 | server.2 |
| slave2 | 192.168.153.132 | 1.8.0_201 | server.3 |

**安装目录：/apps/hadoop-3.1.2**

**备注：hbase依赖hadoop，因此在安装hbase之前需要安装好hadoop环境**

​      **1.集群安装规划**
​      **1.1 主机规划**

​      这里我们选择3台主机搭建Hadoop3.0高可用的分布式集群。

|               | master | slave1 | slave2 |
| ------------- | ------ | ------ | ------ |
| Namenode      | 是     | 是     | 是     |
| DataNode      | 是     | 是     | 是     |
| HMaster       | 是     | 是     | 否     |
| HRegionServer | 是     | 是     | 是     |
| Zookeeper     | 是     | 是     | 是     |


​      大家需要注意的是：从Hadoop3.0开始支持更多的Namenode，因为我们只有3台机器，所以这3台机器都配置问Namenode，实际工作中Namenode也不宜过多，否则对集群造成压力。其他角色保持跟Hadoop2.x一致即可。

​      **1.2** **软件规划**

| 软件      | 版本            |
| --------- | --------------- |
| Jdk       | Jdk1.8          |
| CentOS    | CentOS7         |
| Zookeeper | Zookeeper3.4.14 |
| Hadoop    | Hadoop3.2       |
| HBase     | HBase2.2        |

​     需要注意的是：Hadoop3.0最低支持Java8，如果大家还在使用Java7或者更低版本，请升级到Java8。
​     **1.3用户规划**
​     出于权限考虑，Hadoop集群环境安装不要使用root用户，需要大家自己创建相关的用户和用户组，注意创建用户的时候需要设置密码。

| 节点名称 | 用户组 | 用户   |
| -------- | ------ | ------ |
| master   | hadoop | hadoop |
| slave1   | hadoop | hadoop |
| slave2   | hadoop | hadoop |

  **1.4数据目录规划**

​      在搭建Hadoop集群之前，需要规划好所有的软件目录和数据存放目录，便于后期的管理与维护。

| 目录名称               | 绝对路径                |
| ---------------------- | ----------------------- |
| 所有软件存放目录       | /apps/app               |
| 所有数据与日志存放目录 | /apps/hadoop/data/hbase |

**3. 集群安装**

-  配置主机名（永久修改主机名）

```
hostnamectl --static set-hostname <host-name>
```

- 修改/etc/hosts,加入以下配置，使节点之间可以通过主机名访问


```
192.168.153.130 master
192.168.153.131 slave1
192.168.153.132 slave2
```

- 关闭防火墙

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

- 关闭selinux
  selinux是Linux一个子安全机制，学习环境可以将它禁用

  ```
  vim /etc/sysconfig/selinux
  ```

  把SELINUX设置成disabled

  ```
  SELINUX=disabled
  ```

- 设置节点间免密登陆

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

- 配置脚本工具

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

- 安装jdk1.8

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

- 安装Zookeeper

  - 将下载的Zookeeper文件上传到CentOS系统中。

  - 解压文件

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

- HBase分布式集群搭建

  - 下载解压HBase2

    ```
    tar -zvxf hbase-2.2.0-bin.tar.gz 
    ```

  - **配置hbase-env.sh**

    ```shell
    export JAVA_HOME=/apps/jdk1.8.0_221
    export HBASE_LOG_DIR=/apps/hadoop/data/hbase/logs
    export HBASE_PID_DIR=/apps/hadoop/data/hbase/pids
    export HBASE_MANAGES_ZK=false
    ```

  - **配置hbase-site.xml**

    ```xml
    <configuration>
    	<property>
    		<name>hbase.zookeeper.quorum</name>
    		<value>master,slave1,slave2</value>
    		<!--指定Zookeeper集群节点-->
    	</property>
    	<property>
          <name>hbase.zookeeper.property.dataDir</name>
          <value>/tmp/zookeeper</value>
    	<!--指定Zookeeper数据存储目录-->
      </property>
    	<property>
          		<name>hbase.zookeeper.property.clientPort</name>
          		<value>2181</value>
    			<!--指定Zookeeper端口号-->
    	</property>
    	<property>
        		<name>hbase.rootdir</name>
        		<value>hdfs://mycluster/hbase</value>
    			<!--指定HBase在HDFS上的根目录-->
    	</property>
    	<property>
        		<name>hbase.cluster.distributed</name>
        		<value>true</value>
    			<!--指定true为分布式集群部署-->
    	</property>
    </configuration>
    ```

  - **配置regionservers**

    ```
    master
    slave1
    slave2
    ```

  - **配置backup-masters**

     ```
     slave1
     ```

  - **添加hdfs 配置文件**

     ```
     cp /apps/hadoop-3.1.2/etc/hadoop/core-site.xml /apps/hbase-2.2.0/conf/
     cp /apps/hadoop-3.1.2/etc/hadoop/hdfs-site.xml /apps/hbase-2.2.0/conf/
     ```

  - **将hbase2安装包分发到其他节点**

     ```shell
      ./deploy.sh /apps/hbase-2.2.0 /apps/ slave
     ```

  - **配置hbase2环境变量，并使用source /etc/profile 使之生效**

    ```shell
    #java environment
    export JAVA_HOME=/apps/jdk1.8.0_221
    export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
    export PATH=$PATH:$JAVA_HOME/bin
    
    export ZOOKEEPER_INSTALL=/apps/zookeeper-3.4.14
    export PATH=$PATH:$ZOOKEEPER_INSTALL/bin
    
    export HADOOP_HOME=/apps/hadoop-3.1.2
    export PATH=$PATH:$HADOOP_HOME/bin
    
    export HBASE_HOME=/apps/hbase-2.2.0
    export PATH=$PATH:$HBASE_HOME/bin
    ```

  - **创建hbase目录**

    ```
    runRemoteCmd.sh "mkdir /apps/hadoop/data/hbase" all
    ```

  - **启动HBase**

    一键启动HBase

    ```
    bin/start-hbase.sh
    ```

  - **测试运行HBase**

    ```
    http://master:16010/master-status
    ```

  - 备注

    启动HBase访问不了web ui，解决方案如下：

    清空zookeeper，hadoop目录重新启动格式化
    

- **HBase使用**

  - ​	**HBase shell**

    ```shell
    bin/hbase shell
    #查看hbase状态
    hbase>status
    #查看hbase版本
    hbase>version
    #创建一张表
    hbase(main):002:0> create 'myhbase','cf'
    #查看HBase 所有表
    hbase(main):003:0> list
    #描述表结构
    hbase(main):004:0> describe 'myhbase'
    #删除表
    hbase(main):005:0> disable 'myhbase'
    hbase(main):006:0> drop 'myhbase'
    hbase(main):007:0> list
    
    #创建一个表
    hbase(main):002:0> create 'user','cf'
    #插入数据
    put 'user', '1', 'cf:name', 'xiaoli'
    put 'user', '1', 'cf:age', '24'
    put 'user', '1', 'cf:birthday', '1987-06-17'
    put 'user', '1', 'cf:company', 'alibaba'
    put 'user', '1', 'cf:contry', 'china'
    put 'user', '1', 'cf:province', 'zhejiang'
    put 'user', '1', 'cf:city', 'hangzhou'
    #扫描表所有数据
    hbase(main):011:0> scan 'user'
    #根据rowkey 获取数据
    hbase(main):012:0> get 'user','1'
    #根据rowkey 更新一条数据
    hbase(main):013:0>put 'user', '1', 'cf:age', '28'
    hbase(main):014:0> get 'user','1'
    #查询表中总记录数据
    hbase(main):015:0> count 'user'
    #删除某一列数据
    hbase(main):016:0> delete 'user', '1', 'cf:age'
    hbase(main):017:0> get 'user','1'
    #清空hbase 表数据
    hbase(main):018:0> truncate 'user'
    hbase(main):019:0> scan 'user'
    ```
  
    
  
    
  