# Hadoop安装（集群版）

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

**备注：hadoop依赖java，因此在安装zookeeper之前需要安装好java环境**

​      **1.集群安装规划**
​      **1.1 主机规划**

​      这里我们选择3台主机搭建Hadoop3.0高可用的分布式集群。

|                 | master | slave1 | slave2 |
| --------------- | ------ | ------ | ------ |
| Namenode        | 是     | 是     | 是     |
| DataNode        | 是     | 是     | 是     |
| ResourceManager | 是     | 是     | 否     |
| NodeManager     | 是     | 是     | 是     |
| Journalnode     | 是     | 是     | 是     |
| Zookeeper       | 是     | 是     | 是     |


​      大家需要注意的是：从Hadoop3.0开始支持更多的Namenode，因为我们只有3台机器，所以这3台机器都配置问Namenode，实际工作中Namenode也不宜过多，否则对集群造成压力。其他角色保持跟Hadoop2.x一致即可。

​      **1.2** **软件规划**

| 软件      | 版本            |
| --------- | --------------- |
| Jdk       | Jdk1.8          |
| CentOS    | CentOS7         |
| Zookeeper | Zookeeper3.4.14 |
| Hadoop    | Hadoop3.2       |

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

| 目录名称               | 绝对路径   |
| ---------------------- | ---------- |
| 所有软件存放目录       | /apps/app  |
| 所有数据与日志存放目录 | /apps/data |

​	**2. 集群安装前的环境检查**

​    **2.1时钟同步**

​      所有节点的系统时间要与当前时间保持一致，否则集群运行会出现异常。时钟同步在3台机器上都需要操作，这里以master节点为例。
首先查看master节点的当前系统时间

```shell
[root@master ~]# date
2019年 08月 05日 星期一 06:14:29 CST
```

​      如果系统时间与当前网络时间不一致,进行以下操作。

```js
[root@master ~]# cd /usr/share/zoneinfo/Asia
[root@master zoneinfo]# ls		//找到Asia
[root@master zoneinfo]# cd Asia/		//进入Asia目录
[root@master Asia]# ls		//找到Shanghai
[root@master Asia]# cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime		//当前时区替换为上海
```

​      我们可以保持当前系统时间与NTP（网络时间协议）一致。

```js
[root@master Asia]# yum install ntp   //如果ntp命令不存在，在线安装ntp
[root@master Asia]# ntpdate pool.ntp.org		//执行此命令同步日期时间
[root@master Asia]# date		//查看当前系统时间
```

​	**3. 集群安装**

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

- Hadoop3分布式集群搭建

  - 下载解压Hadoop3

    ```
    tar -zvxf hadoop-3.1.2.tar.gz
    ```

  - **配置hadoop-env.sh**

    ```
    
    export JAVA_HOME=/apps/jdk1.8.0_221
    export HADOOP_HOME=/apps/hadoop-3.1.2
    ```

  - **配置core-site.xml**

    ```xml
    <configuration>
    	<property>
    		<name>fs.defaultFS</name>
    		<value>hdfs://mycluster</value>
    	</property>
    	<!--默认的HDFS路径-->
    	<property>
    		<name>hadoop.tmp.dir</name>
    		<value>/apps/hadoop/data/tmp</value>
    	</property>
    	<!--hadoop的临时目录，如果需要配置多个目录，需要逗号隔开-->
    	<property>
    	<name>ha.zookeeper.quorum</name>
    	<value>master:2181,slave1:2181,slave2:2181</value>
    	</property>
    	<!--配置Zookeeper 管理HDFS-->
    </configuration>
    ```

  - **配置hdfs-site.xml**

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
    <!--
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License. See accompanying LICENSE file.
    -->
    
    <!-- Put site-specific property overrides in this file. -->
    
    <configuration>
    	<property>
                    <name>dfs.replication</name>
                    <value>3</value>
            </property>
    		<!--数据块副本数为3-->
    	<property>
                    <name>dfs.permissions</name>
                    <value>false</value>
            </property>
    	<property>
                    <name>dfs.permissions.enabled</name>
                    <value>false</value>
            </property>
    		<!--权限默认配置为false-->
    	<property>
                    <name>dfs.nameservices</name>
                    <value>mycluster</value>
            </property>
    		<!--命名空间，它的值与fs.defaultFS的值要对应，namenode高可用之后有两个namenode，mycluster是对外提供的统一入口-->
    	<property>
                    <name>dfs.ha.namenodes.mycluster</name>
                    <value>nn1,nn2</value>
            </property>
    		<!-- 指定 nameService 是 mycluster时的nameNode有哪些，这里的值也是逻辑名称，名字随便起，相互不重复即可-->
            <property>
                    <name>dfs.namenode.rpc-address.mycluster.nn1</name>
                    <value>master:9000</value>
            </property>
            <property>
                    <name>dfs.namenode.http-address.mycluster.nn1</name>
                    <value>master:50070</value>
            </property>
    	<property>
                    <name>dfs.namenode.rpc-address.mycluster.nn2</name>
                    <value>slave1:9000</value>
            </property>
            <property>
                    <name>dfs.namenode.http-address.mycluster.nn2</name>
                    <value>slave1:50070</value>
            </property>
    	<property>
                    <name>dfs.ha.automatic-failover.enabled</name>
                    <value>true</value>
            </property>
    		<!--启动故障自动恢复-->
            <property>
                    <name>dfs.namenode.shared.edits.dir</name>
                    <value>qjournal://master:8485;slave1:8485;slave2:8485/mycluster</value>
            </property>
    		<!--指定NameNode的元数据在JournalNode上的存放位置-->
    	<property>
                    <name>dfs.client.failover.proxy.provider.mycluster</name>
                    <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
            </property>
    		<!--指定 mycluster 出故障时，哪个实现类负责执行故障切换-->
            <property>
                    <name>dfs.journalnode.edits.dir</name>
                    <value>/apps/hadoop/data/journaldata/jn</value>
            </property>
    		<!-- 指定JournalNode在本地磁盘存放数据的位置 -->
    	<property>
                    <name>dfs.ha.fencing.methods</name>
                    <value>shell(/bin/true)</value>
            </property>
    		<!-- 配置隔离机制,shell通过ssh连接active namenode节点，杀掉进程-->
            <property>
                    <name>dfs.ha.fencing.ssh.private-key-files</name>
                    <value>/root/.ssh/id_rsa</value>
            </property>
    		<!-- 为了实现SSH登录杀掉进程，还需要配置免密码登录的SSH密匙信息 -->
    	<property>
                    <name>dfs.ha.fencing.ssh.connect-timeout</name>
                    <value>10000</value>
            </property>
            <property>
                    <name>dfs.namenode.handler.count</name>
                    <value>100</value>
            </property>
    </configuration>
    ```

  - **配置workers**

    ```
    master
    slave1
    slave2
    ```

  - **将hadoop3安装包分发到其他节点**

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
    ```

  - **格式化hdfs**

     第一次安装hdfs的时候，需要对hdfs进行相关的格式化操作，以后就不需要了。

  - **创建hadoop目录**

    ```
    runRemoteCmd.sh "mkdir /apps/hadoop/data" all
    ```

  - **先启动Zookeeper**

    ```
    runRemoteCmd.sh "/apps/zookeeper-3.4.14/bin/zkServer.sh start" all
    ```

  - **接着启动journalnode**

    ```
    runRemoteCmd.sh "/apps/hadoop-3.1.2/sbin/hadoop-daemon.sh start journalnode" all
    ```

  - **在master节点上执行格式化**

    ```
    bin/hdfs namenode -format #namenode格式化
    bin/hdfs zkfc -formatZK   #格式化高可用
    bin/hdfs namenode         #启动namenode 
    ```

  - **备用节点slave1 slave2通过master节点元数据信息，分别在slave1、slave2节点上执行**

    ```
    bin/hdfs namenode -bootstrapStandby
    ```

  - **slave1 slave2节点同步完master上的元数据之后，在master节点上按下ctrl+c来结束namenode进程**

  - **关闭所有节点journalnode**

    ```
    runRemoteCmd.sh "/apps/hadoop-3.1.2/sbin/hadoop-daemon.sh stop journalnode" all
    ```

  - **启动HDFS**

    一键启动hdfs

    ```
    sbin/start-dfs.sh
    ```

  -  **测试运行HDFS**

    ```
    http://master:50070/explorer.html#/
    ```

  - 备注

    启动HDFS报Attempting to operate on hdfs namenode as root，解决方案如下：

    在/hadoop/sbin路径下： 
    将start-dfs.sh，stop-dfs.sh两个文件顶部添加以下参数

    ```shell
    #!/usr/bin/env bash
    HDFS_DATANODE_USER=root
    HADOOP_SECURE_DN_USER=hdfs
    HDFS_NAMENODE_USER=root
    HDFS_SECONDARYNAMENODE_USER=root
    HDFS_JOURNALNODE_USER=root
    HDFS_ZKFC_USER=root
    ```
    
    还有，start-yarn.sh，stop-yarn.sh顶部也需添加以下：
    
    ```shell
    #!/usr/bin/env bash
    YARN_RESOURCEMANAGER_USER=root
    HADOOP_SECURE_DN_USER=yarn
    YARN_NODEMANAGER_USER=root
    ```

- **配置YARN**

  - ​	**配置mapred-site.xml**

    ```xml
    <configuration>
    <property>
    	<name>mapreduce.framework.name</name>
    	<value>yarn</value>
    </property>
    <!--MapReduce以yarn模式运行-->
    </configuration>
    ```

  - **配置yarn-site.xml**

    ```xml
    <?xml version="1.0"?>
    <!--
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License. See accompanying LICENSE file.
    -->
    <configuration>
    <property>
    	<name>yarn.resourcemanager.connect.retry-interval.ms</name>
    	<value>2000</value>
    </property>
    <property>
    	<name>yarn.resourcemanager.ha.enabled</name>
    	<value>true</value>
    </property>
    <!--打开高可用-->
    <property>
    	<name>yarn.resourcemanager.ha.automatic-failover.enabled</name>
    	<value>true</value>
    </property>
    <!--启动故障自动恢复-->
    <property>
    	<name>yarn.resourcemanager.ha.automatic-failover.embedded</name>
    	<value>true</value>
    </property>
    <!--rm启动内置选举active-->
    <property>
    	<name>yarn.resourcemanager.cluster-id</name>
    	<value>yarn-rm-cluster</value>
    </property>
    <!--给yarn cluster 取个名字yarn-rm-cluster-->
    <property>
    	<name>yarn.resourcemanager.ha.rm-ids</name>
    	<value>rm1,rm2</value>
    </property>
    <!--ResourceManager高可用 rm1,rm2-->
    <property>
    	<name>yarn.resourcemanager.hostname.rm1</name>
    	<value>master</value>
    </property>
    <property>
    	<name>yarn.resourcemanager.hostname.rm2</name>
    	<value>slave1</value>
    </property>
    <property>
    	<name>yarn.resourcemanager.recovery.enabled</name>
    	<value>true</value>
    </property>
    <!--启用resourcemanager 自动恢复-->
    <property>
    	<name>yarn.resourcemanager.zk.state-store.address</name>
    	<value>master:2181,slave1:2181,slave2:2181</value>
    </property>
    <!--状态存储地址-->
    <property>
    	<name>yarn.resourcemanager.zk-address</name>
    	<value>master:2181,slave1:2181,slave2:2181</value>
    </property>
    <!--配置Zookeeper地址-->
    <property>
    	<name>yarn.resourcemanager.address.rm1</name>
    	<value>master:8032</value>
    </property>
    <!--rm1端口号-->
    <property>
    	<name>yarn.resourcemanager.scheduler.address.rm1</name>
    	<value>master:8034</value>
    </property>
    <!-- rm1调度器的端口号-->
    <property>
    	<name>yarn.resourcemanager.webapp.address.rm1</name>
    	<value>master:8088</value>
    </property>
    <!-- rm1 webapp端口号-->
    <property>
    	<name>yarn.resourcemanager.address.rm2</name>
    	<value>slave1:8032</value>
    </property>
    <property>
    	<name>yarn.resourcemanager.scheduler.address.rm2</name>
    	<value>slave1:8034</value>
    </property>
    <property>
    	<name>yarn.resourcemanager.webapp.address.rm2</name>
    	<value>slave1:8088</value>
    </property>
    <property>
    	<name>yarn.nodemanager.aux-services</name>
    	<value>mapreduce_shuffle</value>
    </property>
    <property>
    	<name>yarn.nodemanager.aux-services.mapreduce_shuffle.class</name>
    	<value>org.apache.hadoop.mapred.ShuffleHandler</value>
    </property>
    <!--执行MapReduce需要配置的shuffle过程-->
    </configuration>
    
    ```

  - **脚本分发修改的yarn配置**

    ```
    deploy.sh /apps/hadoop-3.1.2/etc/hadoop/mapred-site.xml /apps/hadoop-3.1.2/etc/hadoop/ slave
    deploy.sh /apps/hadoop-3.1.2/etc/hadoop/yarn-site.xml /apps/hadoop-3.1.2/etc/hadoop/ slave
    ```

  - **启动yarn**

    ```
    #在master节点启动resourcemanager
    bin/yarn --daemon start resourcemanager
    #在slave1节点启动resourcemanager
    bin/yarn --daemon start resourcemanager
    #在3个节点分别启动nodemanager
    bin/yarn --daemon start nodemanager
    ```

  - **通过Web查看YARN**

    ```
    http://master:8088/cluster/apps
    ```

  - **检查ResourceManager状态**

    ```
    bin/yarn rmadmin -getServiceState rm1
    ```

  - **测试运行WordCount**

    ```
    bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-3.1.2.jar wordcount /zoo.cfg /output
    ```

    