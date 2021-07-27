# Hadoop问题汇总

## 介绍

[TOC]

**环境：CentOS7、hadoop-3.1.2版本**



问题：hadoop 找不到或无法加载主类org.apache.hadoop.mapreduce.v2.app.MRAppMaster



解决方法：

```
hadoop  classpath
```

输出为：

```
/apps/hadoop-3.1.2/etc/hadoop:/apps/hadoop-3.1.2/share/hadoop/common/lib/*:/apps/hadoop-3.1.2/share/hadoop/common/*:/apps/hadoop-3.1.2/share/hadoop/hdfs:/apps/hadoop-3.1.2/share/hadoop/hdfs/lib/*:/apps/hadoop-3.1.2/share/hadoop/hdfs/*:/apps/hadoop-3.1.2/share/hadoop/mapreduce/lib/*:/apps/hadoop-3.1.2/share/hadoop/mapreduce/*:/apps/hadoop-3.1.2/share/hadoop/yarn:/apps/hadoop-3.1.2/share/hadoop/yarn/lib/*:/apps/hadoop-3.1.2/share/hadoop/yarn/*
```

将该内容设置到yarn-siet.xml：

```xml
<property>
<name>yarn.application.classpath</name>
<value>/apps/hadoop-3.1.2/etc/hadoop:/apps/hadoop-3.1.2/share/hadoop/common/lib/*:/apps/hadoop-3.1.2/share/hadoop/common/*:/apps/hadoop-3.1.2/share/hadoop/hdfs:/apps/hadoop-3.1.2/share/hadoop/hdfs/lib/*:/apps/hadoop-3.1.2/share/hadoop/hdfs/*:/apps/hadoop-3.1.2/share/hadoop/mapreduce/lib/*:/apps/hadoop-3.1.2/share/hadoop/mapreduce/*:/apps/hadoop-3.1.2/share/hadoop/yarn:/apps/hadoop-3.1.2/share/hadoop/yarn/lib/*:/apps/hadoop-3.1.2/share/hadoop/yarn/*
</value>
</property>
```

​    

问题：主从namenode都处于standby状态

解决方法：

   一直工作正常的集群，由于机房电源故障，造成部分datanode硬盘故障，一共有几十个blocks丢失，重新运行集群后，主从namenode都处于standby的状态，以下是处理的主要过程。在开始维护之前，可先运行 hdfs haadmin -getServiceState nn1 或是 hdfs haadmin -getServiceState nn2 ，来用命令行检查当前状态，这里nn1 和 nn2 是指在hdfs-site.xml 中的配置namenode
    一、运行zkfc
        先确保zookeeper处于正常工作状态，然后在主从namenode上运行 hadoop-daemon.sh start zkfc
    二、namenode的safemode模式
        safemode是namenode的一种状态，正是由于blocks的丢失，namenode进入safemode状态，此时不能数据进行操作，只能查看元数据，执行 hadoop dfsadmin -safemode leave\
执行后，集群工作正常

   三、处理missing blocks故障

        报错信息是 “There are ** missing blocks. The following files may be corrupted:”
    
        “Please check the logs or run fsck in order to identify the missing blocks. See the Hadoop FAQ for common causes and potential solutions.”
    
        执行命令 hadoop fsck -delete
    
        成功删除丢失的数据块。
参考链接[主从namenode都处于standby状态](https://blog.csdn.net/lepton126/article/details/82977952)

问题：Container is running beyond virtual memory limits. Current usage: 611.1 MB of 1 GB physical memory u

解决方法：

异常分析
611.1MB: 任务所占的物理内存

1GB 是mapreduce.map.memory.mb 设置的

4.9G 是程序占用的虚拟内存： 什么是虚拟内存以及和物理内存的关系

3GB 是mapreduce.map.memory.db 乘以 yarn.nodemanager.vmem-pmem-ratio 得到的

其中yarn.nodemanager.vmem-pmem-ratio 是 虚拟内存和物理内存比例，在yarn-site.xml中设置，默认是2.1, 由于我本地设置的是3， 所以 1*3 = 3GB

很明显，container占用了4.9G的虚拟内存，但是分配给container的却只有3GB。所以kill掉了这个container

上面只是map中产生的报错，当然也有可能在reduce中报错，如果是reduce中，那么就是mapreduce.reduce.memory.db * yarn.nodemanager.vmem-pmem-ratio

解决办法
主要是以下四个方面考虑

取消虚拟内存的检查： 
在yarn-site.xml或者程序中中设置yarn.nodemanager.vmem-check-enabled为false

```xml
<property>
  <name>yarn.nodemanager.vmem-check-enabled</name>
  <value>false</value>
  <description>Whether virtual memory limits will be enforced for containers.</description>
</property>
```

除了虚拟内存超了，也有可能是物理内存超了，同样也可以设置物理内存的检查为false： yarn.nodemanager.pmem-check-enabled 
个人认为这种办法并不太好，如果程序有内存泄漏等问题，取消这个检查，可能会导致集群崩溃。

增大mapreduce.map.memory.mb 或者 mapreduce.map.memory.mb 
个人觉得是一个办法，应该优先考虑这种办法，这种办法不仅仅可以解决虚拟内存，或许大多时候都是物理内存不够了，这个办法正好适用
适当增大yarn.nodemanager.vmem-pmem-ratio的大小，一个物理内存增大多个虚拟内存， 但是这个参数也不能太离谱

如果任务所占用的内存太过离谱，更多考虑的应该是程序是否有内存泄漏，是否存在数据倾斜等，优先程序解决此类问题

参考链接[运行mapreduce内存问题](https://blog.csdn.net/T1DMzks/article/details/78818874)