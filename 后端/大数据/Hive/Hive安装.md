# Hive安装

## 介绍

[TOC]

**环境：CentOS7、hive-3.1.1版本**

**主机配置:**

| 主机名 | IP地址          | JDK       | Hadoop   |
| ------ | --------------- | --------- | -------- |
| master | 192.168.153.130 | 1.8.0_201 | server.1 |
| slave1 | 192.168.153.131 | 1.8.0_201 | server.2 |
| slave2 | 192.168.153.132 | 1.8.0_201 | server.3 |

**安装目录：/apps/hive-3.1.1**

**备注：hive依赖hadoop，因此在安装hbase之前需要安装好hadoop环境**

​      **1.集群安装规划**
​      **1.1 主机规划**

​      这里我们选择3台主机搭建Hadoop3高可用的分布式集群。

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
| Hive      | Hive3.1.1       |

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

- Hive搭建

  - 下载解压Hive3

    ```
    tar -zvxf apache-hive-3.1.1-bin.tar.gz
    ```

  - **配置hive‐env.sh**

    ```shell
    export JAVA_HOME=/apps/jdk1.8.0_221
    export HADOOP_HOME=/apps/hadoop-3.1.2
    export HIVE_CONF_DIR=/apps/apache-hive-3.1.1-bin/conf
    ```
    
  - **hive-log4j.properties**

    ```
    hive.log.dir=/apps/hadoop/data/hive/logs
    ```

  - **配置hive-site.xml**

    ```xml
    <configuration>
    	<property>
    		<!‐‐数据库连接地址，使用MySQL存储元数据信息‐‐>
    		<name>javax.jdo.option.ConnectionURL</name>
    		<value>jdbc:mysql://master:3306/metastore?createDatabaseIfNotExist=true&amp;useSSL=false</value>
    	</property>
    	<property>
    		<!‐‐数据库驱动‐‐>
    		<name>javax.jdo.option.ConnectionDriverName</name>
    		<value>com.mysql.jdbc.Driver</value>
    	</property>
    	<property>
    		<!‐‐数据库用户名‐‐>
    		<name>javax.jdo.option.ConnectionUserName</name>
    		<value>root</value>
    		<description>Username to use against metastore database</description>
    	</property>
    	<property>
    		<!‐‐密码‐‐>
    		<name>javax.jdo.option.ConnectionPassword</name>
    		<value>123456</value>
    		<description>password to use against metastore database</description>
    	</property>
    	<property>
    		<!‐‐HDFS路径，用于存储不同 map/reduce 阶段的执行计划和这些阶段的中间输出结果。‐‐>
    		<name>hive.exec.local.scratchdir</name>
    		<value>/hive/tmp</value>
    	</property>
    	<property>
    		<!‐‐Hive 查询日志所在的目录，如果该值为空，将不创建查询日志。‐‐>
    		<name>hive.querylog.location</name>
    		<value>/hive/logs</value>
    	</property>
    	<property>
    		<!‐‐本地表的默认位置‐‐>
    		<name>hive.metastore.warehouse.dir</name>
    		<value>/hive/warehouse</value>
    	</property>
    	<property>
    		<name>hive.metastore.uris</name>
    		<!‐‐Hive连接到该URI请求远程元存储的元数据‐‐>
    		<value>thrift://master:9083</value>
    	</property>
    	<property>
    		<!‐‐关闭本地模式，此项不存在，需要自己添加‐‐>
    		<name>hive.metastore.local</name>
    		<value>false</value>
    	</property>
    	<property>
    		<name>hive.server2.logging.operation.log.location</name>
    		<value>/hive/logs</value>
    	</property>
    	<property>
    		<name>hive.downloaded.resources.dir</name>
    		<value>/hive/tmp/${hive.session.id}_resources</value>
    	</property>
    </configuration>
    ```

  - **添加mysql 驱动包**
    下载mysql-connector-java-5.1.38.jar，将mysql 驱动包拷贝到hive 的lib 目录下。

  - **配置hive环境变量，并使用source /etc/profile 使之生效**

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
    
    #hive
    export HIVE_HOME=/apps/apache-hive-3.1.1-bin
    export PATH=$PATH:$HIVE_HOME/bin
    ```

  - **创建hive目录**

    ```
    mkdir -p /apps/hadoop/data/hive/logs
    ```

  - **初始化数据库**

    ```
    schematool -dbType mysql -initSchema
    ```
    
  - **启动Hive**

    一键启动Hive

    ```
    bin/hive
    ```

  - **测试运行Hive**

    ```
    http://master:16010/master-status
    ```

- **Hive使用**

  - ​	**Hive shell**

    ```shell
    bin/hive
    #创建表
    CREATE TABLE stu(id INT,name STRING) ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' ;
    ```
    
  - **准备测试数据集**
  
    ```
    vi /home/hadoop/app/hive/stu.txt
    1	zhangsan
    2	lisi
    3	wangwu
    4	zhaoliu
    ```
    
  - **数据加载到Hive 表**
  
    ```
    load data local inpath '/apps/stu.txt' into table stu;
    ```
    
  - **表数据查询**
  
    ```
    select * from stu;
    ```
    
  - **开启远程访问**
  
    ```shell
    bin/hiveserver2
    ```
    
    
    
    
  