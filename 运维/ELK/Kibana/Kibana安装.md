Kibana安装

## 介绍

[TOC]

**主机配置:**

| 主机名 | IP地址          | JDK       |
| ------ | --------------- | --------- |
| worker | 192.168.153.130 | 1.8.0_201 |

**安装目录：/apps/hadoop-3.1.2**

**备注：hadoop依赖java，因此在安装zookeeper之前需要安装好java环境**

​      **1.集群安装规划**
​      **1.1 主机规划**

​      这里我们选择1台主机搭建Hadoop3高可用的分布式集群。

|                 | worker |
| --------------- | ------ |
| Namenode        | 是     |
| DataNode        | 是     |
| ResourceManager | 是     |
| NodeManager     | 是     |
| Journalnode     | 是     |
| Zookeeper       | 是     |


​      大家需要注意的是：从Hadoop3开始支持更多的Namenode，因为我们只有1台机器，所以这台机器配置Namenode，实际工作中Namenode也不宜过多，否则对集群造成压力。其他角色保持跟Hadoop2.x一致即可。

​      **1.2** **软件规划**

| 软件      | 版本            |
| --------- | --------------- |
| Jdk       | Jdk1.8          |
| CentOS    | CentOS7         |
| Zookeeper | Zookeeper3.4.14 |
| Hadoop    | Hadoop3.2       |

​     需要注意的是：Hadoop3最低支持Java8，如果大家还在使用Java7或者更低版本，请升级到Java8。
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

 **2. 集群安装**

-  配置主机名（永久修改主机名）

```
hostnamectl --static set-hostname <host-name>
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

  - 在master上生成公钥私钥

    ```shell
    ssh-keygen
    ```

  - 查看公钥私钥

    ```shell
    ll -a
    ```
  
  - 将公钥拷贝到自己
  
    ```shell
    ssh-copy-id root@worker
    ```
  
  - 其他两台机器重复此步骤
  
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

- Hadoop3分布式集群搭建

    - **下载解压Hadoop3**

        ```xml
        tar -zvxf hadoop-3.1.2.tar.gz
        ```

    - **配置hadoop-env.sh**
    
        ```shell
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
                        <value>1</value>
                </property>
        </configuration>
        ```
    
    - **配置workers**
    
        ```
        worker
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
        ```
    
    - **格式化hdfs**
    
       第一次安装hdfs的时候，需要对hdfs进行相关的格式化操作，以后就不需要了。
    
    - **创建hadoop目录**
    
        ```
        mkdir -p /apps/hadoop/data
        ```
    
    - **在master节点上执行格式化**
    
        ```
        bin/hdfs namenode -format
        ```
    
    - **启动HDFS**
    
        ```
        sbin/start-dfs.sh
        ```
    
    - **测试运行HDFS**
      
        ```
        http://worker:9870/explorer.html#/
        ```
      
    - **备注**
    
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
          <property>
              <name>mapreduce.application.classpath</name>
              <value> 
            /apps/hadoop-3.1.2/etc/*,
                /apps/hadoop-3.1.2/etc/hadoop/*,
            /apps/hadoop-3.1.2/lib/*,
                /apps/hadoop-3.1.2/share/hadoop/common/*,
                /apps/hadoop-3.1.2/share/hadoop/common/lib/*,
                /apps/hadoop-3.1.2/share/hadoop/mapreduce/*,
                /apps/hadoop-3.1.2/share/hadoop/mapreduce/lib-examples/*,
                /apps/hadoop-3.1.2/share/hadoop/hdfs/*,
                /apps/hadoop-3.1.2/share/hadoop/hdfs/lib/*,
                /apps/hadoop-3.1.2/share/hadoop/yarn/*,
                /apps/hadoop-3.1.2/share/hadoop/yarn/lib/*,
              </value>
          </property>    
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
        
        <!-- Site specific YARN configuration properties -->
          <property>
            <name>yarn.resourcemanager.hostname</name>
            <value>worker</value>
          </property>
          <property>
            <name>yarn.nodemanager.aux-services</name>
            <value>mapreduce_shuffle</value>
          </property> 
          <property>
              <name>mapreduce.application.classpath</name>
              <value>
                /apps/hadoop-3.1.2/etc/*,
                /apps/hadoop-3.1.2/etc/hadoop/*,
                /apps/hadoop-3.1.2/lib/*,
                /apps/hadoop-3.1.2/share/hadoop/common/*,
                /apps/hadoop-3.1.2/share/hadoop/common/lib/*,
                /apps/hadoop-3.1.2/share/hadoop/mapreduce/*,
                /apps/hadoop-3.1.2/share/hadoop/mapreduce/lib-examples/*,
                /apps/hadoop-3.1.2/share/hadoop/hdfs/*,
                /apps/hadoop-3.1.2/share/hadoop/hdfs/lib/*,
                /apps/hadoop-3.1.2/share/hadoop/yarn/*,
                /apps/hadoop-3.1.2/share/hadoop/yarn/lib/*,
              </value>
            </property>
        </configuration>
        
        ```
    
    - **启动yarn**
    
        ```
         sbin/start-yarn.sh
        ```
    
    - **通过Web查看YARN**
    
        ```
        http://worker:8088/cluster/apps
        ```
  
    
