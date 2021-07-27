# kafka设置日志过期策略



## 参数说明

Kafka 作为一个高吞吐的消息中间件和传统的消息中间件一个很大的不同点就在于它的日志实际上是以日志的方式默认保存在/kafka-logs文件夹中的。虽然默认有7天清楚的机制，但是在数据量大，而磁盘容量不足的情况下，经常出现无法写入的情况。如何调整Kafka的一些默认参数就显得比较关键了。这里笔者整理了一些常见的配置参数供大家参考：

**分段策略属性**

属性名 | 含义 |默认值
---|---|--
log.roll.{hours,ms} | 日志滚动的周期时间，到达指定周期时间时，强制生成一个新的segment |168（7day）
log.segment.bytes| 每个segment的最大容量。到达指定容量时，将强制生成一个新的segment | 1G(-1为不限制)
|log.retention.check.interval.ms |日志片段文件检查的周期时间|60000

**日志刷新策略**

Kafka的日志实际上是开始是在缓存中的，然后根据策略定期一批一批写入到日志文件中去，以提高吞吐率。

| 属性名                          | 含义                                 | 默认值   |
| :------------------------------ | :----------------------------------- | :------- |
| log.flush.interval.messages     | 消息达到多少条时将数据写入到日志文件 | 10000    |
| log.flush.interval.ms           | 当达到该时间时，强制执行一次flush    | null     |
| log.flush.scheduler.interval.ms | 周期性检查，是否需要将信息flush      | 很大的值 |

**日志保存清理策略**

| 属性名                          | 含义                                             | 默认值    |
| :------------------------------ | :----------------------------------------------- | :-------- |
| log.cleanup.polict              | 日志清理保存的策略只有delete和compact两种        | delete    |
| log.retention.hours             | 日志保存的时间，可以选择hours,minutes和ms        | 168(7day) |
| log.retention.bytes             | 删除前日志文件允许保存的最大值                   | -1        |
| log.segment.delete.delay.ms     | 日志文件被真正删除前的保留时间                   | 60000     |
| log.cleanup.interval.mins       | 每隔一段时间多久调用一次清理的步骤               | 10        |
| log.retention.check.interval.ms | 周期性检查是否有日志符合删除的条件（新版本使用） | 300000    |

这里特别说明一下，日志的真正清楚时间。当删除的条件满足以后，日志将被“删除”，但是这里的删除其实只是将该日志进行了“delete”标注，文件只是无法被索引到了而已。但是文件本身，仍然是存在的，只有当过了log.segment.delete.delay.ms 这个时间以后，文件才会被真正的从文件系统中删除。

## 配置示例

```java
#日志清理保存的策略,只有delete和compact两种
log.cleanup.polict=delete
#日志保存的时间，可以选择hours,minutes和ms
log.retention.minutes=1
#删除前日志文件允许保存的最大值（说明：日志分片数据存储的最大字节数。默认-1无限制，超过这个大小会根据policy处理数据，删除最老的segment文件，达到不超过该阈值范围，可用来控制一个topic保存的最大大小，如：为1G,则一个topic的限制=1G * 分区数）
log.retention.bytes=1048576
#每个segment的最大容量。到达指定容量时，将强制生成一个新的segment | 默认为1G(-1为不限制)
log.segment.bytes=1024
#日志文件被真正删除前的保留时间	
#log.segment.delete.delay.ms=5000
#每隔一段时间多久调用一次清理的步骤
#log.cleanup.interval.mins=1
#周期性检查是否有日志符合删除的条件
log.retention.check.interval.ms=5000
```

