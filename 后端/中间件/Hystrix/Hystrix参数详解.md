# Hystrix参数详解

## 介绍

[TOC]

## Hystrix属性优先级

1、内置全局默认值（Global default from code），默认值
如果某属性未通过下面的任何方式进行设置，则默认使用内置全局默认值。

2、动态全局默认属性（Dynamic global default property），默认属性
可以通过此方式来更改某属性的全局默认值。

3、内置实例默认值（Instance default from code），实例默认
可以在写代码的时候，设置某个属性的值。
例如：

```java
public HystrixCommandInstance(int id) {
    super(Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey("ExampleGroup"))
        .andCommandPropertiesDefaults(HystrixCommandProperties.Setter()
               .withExecutionTimeoutInMilliseconds(500)));
    this.id = id;
}
```

4、动态配置实例属性（Dynamic instance property），实例属性
可以通过动态配置某特定实例的属性值，来覆盖前面三种的值。
例如下面的属性：

```java
hystrix.command.HystrixCommandKey.execution.isolation.thread.timeoutInMilliseconds
```

可以使用通过 HystrixCommandKey 的名称来替换属性中的HystrixCommandKey，这样就完成了动态配置实例属性，例如：

```
hystrix.command.SubscriberGetAccount.execution.isolation.thread.timeoutInMilliseconds
```

上面四种设置属性值的优先级为：4 > 3 > 2 > 1



## Hystrix 参数详解

Command Properties

### 一、Execution相关的属性

1、execution.isolation.strategy：隔离策略，默认是Thread, 可选Thread｜Semaphore。
注意：在设置线程隔离策略时，推荐 HystrixCommand 使用 Thread，HystrixObservableCommand 使用 Semaphore。
默认属性：hystrix.command.default.execution.isolation.strategy
实例属性：hystrix.command.HystrixCommandKey.execution.isolation.strategy
例如：

```java
HystrixCommandProperties.Setter()
                                   .withExecutionIsolationStrategy(ExecutionIsolationStrategy.THREAD)
```

2、execution.timeout.enabled： 执行是否启用超时，默认启用true
默认属性：hystrix.command.default.execution.timeout.enabled
实例属性：hystrix.command.HystrixCommandKey.execution.timeout.enabled
例如：

```
HystrixCommandProperties.Setter()
                                   .withExecutionTimeoutEnabled(boolean value)
```

3、execution.isolation.thread.timeoutInMilliseconds：命令执行超时时间，超过此时间，HystrixCommand被标记为TIMEOUT，并执行回退逻辑，默认1000ms
注意：超时会作用在HystrixCommand.queue()，即使调用者没有调用 get() 去获得 Future 对象。
默认属性：hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds
实例属性：hystrix.command.HystrixCommandKey.execution.isolation.thread.timeoutInMilliseconds
例如：

```
HystrixCommandProperties.Setter()
                                  .withExecutionTimeoutInMilliseconds(int value)
```

4、execution.isolation.thread.interruptOnTimeout： 发生超时是否中断，默认true
默认属性：hystrix.command.default.execution.isolation.thread.interruptOnTimeout
实例属性：hystrix.command.HystrixCommandKey.execution.isolation.thread.interruptOnTimeout
例如：

```
HystrixCommandProperties.Setter()
                                .withExecutionIsolationThreadInterruptOnTimeout(boolean value)
```

5、execution.isolation.thread.interruptOnCancel： 执行取消运行是否中断，默认false
默认属性：hystrix.command.default.execution.isolation.thread.interruptOnCancel
实例属性：hystrix.command.HystrixCommandKey.execution.isolation.thread.interruptOnCancel
例如：

```
HystrixCommandProperties.Setter()
                                  .withExecutionIsolationThreadInterruptOnCancel(boolean value)
```

6、execution.isolation.semaphore.maxConcurrentRequests： 最大并发请求数，默认10，该参数当使用ExecutionIsolationStrategy.SEMAPHORE策略时才有效。如果达到最大并发请求数，请求会被拒绝。理论上选择semaphore size的原则和选择thread size一致，但选用semaphore时每次执行的单元要比较小且执行速度快（ms级别），否则的话应该用thread。
semaphore应该占整个容器（tomcat）的线程池的一小部分。
默认属性：hystrix.command.default.execution.isolation.semaphore.maxConcurrentRequests
实例属性：hystrix.command.HystrixCommandKey.execution.isolation.semaphore.maxConcurrentRequests
例如：

```
HystrixCommandProperties.Setter()
                          .withExecutionIsolationSemaphoreMaxConcurrentRequests(int value)
```

### 二、Fallback相关的属性

这些参数可以应用于Hystrix的THREAD和SEMAPHORE策略

1、fallback.enabled： 当执行失败或者请求被拒绝，是否会尝试调用hystrixCommand.getFallback() 。默认true
默认属性：hystrix.command.default.fallback.enabled
实例属性：hystrix.command.HystrixCommandKey.fallback.enabled
例如：

```
HystrixCommandProperties.Setter()
                         .withFallbackEnabled(boolean value)
```

2、fallback.isolation.semaphore.maxConcurrentRequests： 如果并发数达到该设置值，请求会被拒绝和抛出异常并且fallback不会被调用。默认10
默认属性：hystrix.command.default.fallback.isolation.semaphore.maxConcurrentRequests
实例属性：hystrix.command.HystrixCommandKey.fallback.isolation.semaphore.maxConcurrentRequests
例如：

```
HystrixCommandProperties.Setter()
                   .withFallbackIsolationSemaphoreMaxConcurrentRequests(int value)
```

### 三、Circuit Breaker相关的属性

1、circuitBreaker.enabled： 用来跟踪circuit的健康性，如果未达标则让request短路。默认true
默认属性：hystrix.command.default.circuitBreaker.enabled
实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.enabled
例如：

```
HystrixCommandProperties.Setter()
                         .withCircuitBreakerEnabled(boolean value)
```

2、circuitBreaker.requestVolumeThreshold： 一个rolling window内最小的请求数。如果设为20，那么当一个rolling window的时间内（比如说1个rolling window是10秒）收到19个请求，即使19个请求都失败，也不会触发circuit break。默认20
默认属性：hystrix.command.default.circuitBreaker.requestVolumeThreshold
实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.requestVolumeThreshold
例如：

```
HystrixCommandProperties.Setter()
                        .withCircuitBreakerRequestVolumeThreshold(int value)
```

3、circuitBreaker.sleepWindowInMilliseconds： 触发短路的时间值，当该值设为5000时，则当触发circuit break后的5000毫秒内都会拒绝request，也就是5000毫秒后才会关闭circuit。默认5000
默认属性：hystrix.command.default.circuitBreaker.sleepWindowInMilliseconds
实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.sleepWindowInMilliseconds
例如：

```
HystrixCommandProperties.Setter()
                            .withCircuitBreakerSleepWindowInMilliseconds(int value)
```

4、circuitBreaker.errorThresholdPercentage：错误比率阀值，如果错误率>=该值，circuit会被打开，并短路所有请求触发fallback。默认50
默认属性：hystrix.command.default.circuitBreaker.errorThresholdPercentage
实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.errorThresholdPercentage
例如：

```
HystrixCommandProperties.Setter()
                            .withCircuitBreakerErrorThresholdPercentage(int value)
```

5、circuitBreaker.forceOpen： 强制打开熔断器，如果打开这个开关，那么拒绝所有request，默认false
该属性优先级比circuitBreaker.forceClosed高。
默认属性：hystrix.command.default.circuitBreaker.forceOpen
实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.forceOpen
例如：

```
HystrixCommandProperties.Setter()
                            .withCircuitBreakerForceOpen(boolean value)
```

6、circuitBreaker.forceClosed： 强制关闭熔断器 如果这个开关打开，circuit将一直关闭且忽略circuitBreaker.errorThresholdPercentage
默认属性：hystrix.command.default.circuitBreaker.forceClosed
实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.forceClosed
例如：

```
HystrixCommandProperties.Setter()
                            .withCircuitBreakerForceClosed(boolean value)
```

### 四、Metrics相关参数

1、metrics.rollingStats.timeInMilliseconds： 设置统计的时间窗口值的毫秒值，circuit break 的打开会根据1个rolling window的统计来计算。若rolling window被设为10000毫秒，则rolling window会被分成n个buckets，每个bucket包含success，failure，timeout，rejection的次数的统计信息。默认10000。

默认属性：hystrix.command.default.metrics.rollingStats.timeInMilliseconds
实例属性：hystrix.command.HystrixCommandKey.metrics.rollingStats.timeInMilliseconds
例如：

```
HystrixCommandProperties.Setter()
                       .withMetricsRollingStatisticalWindowInMilliseconds(int value)
```

2、metrics.rollingStats.numBuckets： 设置一个rolling window被划分的数量，若numBuckets＝10，rolling window＝10000，那么一个bucket的时间即1秒。必须符合rolling window % numberBuckets == 0，否则会抛出异常。默认10
默认属性：hystrix.command.default.metrics.rollingStats.numBuckets
实例属性：hystrix.command.HystrixCommandKey.metrics.rollingStats.numBuckets
例如：

```
HystrixCommandProperties.Setter()
                              .withMetricsRollingStatisticalWindowBuckets(int value)
```

3、metrics.rollingPercentile.enabled： 执行时是否enable指标的计算和跟踪，默认true
默认属性：hystrix.command.default.metrics.rollingPercentile.enabled
实例属性：hystrix.command.HystrixCommandKey.metrics.rollingPercentile.enabled
例如：

```
HystrixCommandProperties.Setter()
                               .withMetricsRollingPercentileEnabled(boolean value)
```

4、metrics.rollingPercentile.timeInMilliseconds： 设置rolling percentile window的时间，默认60000
默认属性：hystrix.command.default.metrics.rollingPercentile.timeInMilliseconds
实例属性：hystrix.command.HystrixCommandKey.metrics.rollingPercentile.timeInMilliseconds
例如：

```
HystrixCommandProperties.Setter()
                        .withMetricsRollingPercentileWindowInMilliseconds(int value)
```

5、metrics.rollingPercentile.numBuckets： 设置rolling percentile window的numberBuckets。逻辑同上。默认6
默认属性：hystrix.command.default.metrics.rollingPercentile.numBuckets
实例属性：hystrix.command.HystrixCommandKey.metrics.rollingPercentile.numBuckets
例如：

```
HystrixCommandProperties.Setter()
                              .withMetricsRollingPercentileWindowBuckets(int value)
```

6、metrics.rollingPercentile.bucketSize： 如果bucket size＝100，window＝10s，若这10s里有500次执行，只有最后100次执行会被统计到bucket里去。增加该值会增加内存开销以及排序的开销。默认100
默认属性：hystrix.command.default.metrics.rollingPercentile.bucketSize
实例属性：hystrix.command.HystrixCommandKey.metrics.rollingPercentile.bucketSize
例如：

```
HystrixCommandProperties.Setter()
                                      .withMetricsRollingPercentileBucketSize(int value)
```

7、metrics.healthSnapshot.intervalInMilliseconds： 记录health 快照（用来统计成功和错误绿）的间隔，默认500ms
默认属性：hystrix.command.default.metrics.healthSnapshot.intervalInMilliseconds
实例属性：hystrix.command.HystrixCommandKey.metrics.healthSnapshot.intervalInMilliseconds
例如：

```
HystrixCommandProperties.Setter()
                            .withMetricsHealthSnapshotIntervalInMilliseconds(int value)
```

### 五、Request Context 相关参数

1、requestCache.enabled：默认true，需要重载getCacheKey()，返回null时不缓存
默认属性：hystrix.command.default.requestCache.enabled
实例属性：hystrix.command.HystrixCommandKey.requestCache.enabled
例如：

```
HystrixCommandProperties.Setter()
                         .withRequestCacheEnabled(boolean value)
```

2、requestLog.enabled：记录日志到HystrixRequestLog，默认true
默认属性：hystrix.command.default.requestLog.enabled
实例属性：hystrix.command.HystrixCommandKey.requestLog.enabled
例如：

```
HystrixCommandProperties.Setter()
                              .withRequestLogEnabled(boolean value)
```



### 六、Collapser Properties 相关参数

1、requestCache.enabled： 设置请求缓存是否对HystrixCollapser.execute() and HystrixCollapser.queue()的调用起作用。，默认true
默认属性：hystrix.collapser.default.requestCache.enabled
实例属性：hystrix.collapser.HystrixCollapserKey.requestCache.enabled
例如：

```
HystrixCollapserProperties.Setter()
                      .withRequestCacheEnabled(boolean value)
```

2、maxRequestsInBatch： 单次批处理的最大请求数，达到该数量触发批处理，默认Integer.MAX_VALUE
默认属性：hystrix.collapser.default.maxRequestsInBatch
实例属性：hystrix.collapser.HystrixCollapserKey.maxRequestsInBatch
例如：

```
HystrixCollapserProperties.Setter()
                    .withMaxRequestsInBatch(int value)
```

3、timerDelayInMilliseconds： 触发批处理的延迟，也可以为创建批处理的时间＋该值，默认10
默认属性：hystrix.collapser.default.timerDelayInMilliseconds
实例属性：hystrix.collapser.HystrixCollapserKey.timerDelayInMilliseconds
例如：

```
HystrixCollapserProperties.Setter()
                     .withTimerDelayInMilliseconds(int value)
```


ThreadPool Properties
线程数默认值10适用于大部分情况（有时可以设置得更小），如果需要设置得更大，那有个基本得公式可以follow：
requests per second at peak when healthy × 99th percentile latency in seconds + some breathing room
每秒最大支撑的请求数 × 99%平均响应时间 + 缓存值
比如：每秒能处理1000个请求，99%的请求响应时间是60ms，那么公式是：
1000×0.060 + 12 = 72

基本得原则是保持线程池尽可能小，他主要是为了释放压力，防止资源被阻塞。
当一切都是正常的时候，线程池一般仅会有1到2个线程激活来提供服务

1、coreSize： 设置核心线程池大小，默认10
默认属性：hystrix.threadpool.default.coreSize
实例属性：hystrix.threadpool.HystrixThreadPoolKey.coreSize
例如：

```
HystrixThreadPoolProperties.Setter()
                               .withCoreSize(int value)
```

2、maximumSize：设置线程池最大值。这个是在不开启拒绝HystrixCommand的情况下支持的最大并发数。这个属性起作用的前提是设置了allowMaximumSizeToDrivergeFromCoreSize。
默认属性：hystrix.threadpool.default.maximumSize
实例属性：hystrix.threadpool.HystrixThreadPoolKey.maximumSize
例如：

```
HystrixThreadPoolProperties.Setter()
                                .withMaximumSize(int value)
```

3、maxQueueSize： BlockingQueue的最大队列数，当设为－1，会使用SynchronousQueue，值为正时使用LinkedBlcokingQueue。该设置只会在初始化时有效，之后不能修改threadpool的queue size，除非reinitialising thread executor。默认－1。
默认属性：hystrix.threadpool.default.maxQueueSize
实例属性：hystrix.threadpool.HystrixThreadPoolKey.maxQueueSize
例如：

```
HystrixThreadPoolProperties.Setter()
                             .withMaxQueueSize(int value)
```

4、queueSizeRejectionThreshold： 即使maxQueueSize没有达到，达到queueSizeRejectionThreshold该值后，请求也会被拒绝。因为maxQueueSize不能被动态修改，这个参数将允许我们动态设置该值。if maxQueueSize == -1，该字段将不起作用。默认5
默认属性：hystrix.threadpool.default.queueSizeRejectionThreshold
实例属性：hystrix.threadpool.HystrixThreadPoolKey.queueSizeRejectionThreshold
例如：

```
HystrixThreadPoolProperties.Setter()
                           .withQueueSizeRejectionThreshold(int value)
```

5、keepAliveTimeMinutes： 如果corePoolSize和maxPoolSize设成一样（默认实现）该设置无效。如果coreSize小于maximumSize，那么该属性控制一个线程从实用完成到被释放的时间。默认1（分钟）。
默认属性：hystrix.threadpool.default.keepAliveTimeMinutes
实例属性：hystrix.threadpool.HystrixThreadPoolKey.keepAliveTimeMinutes
例如：

```
HystrixThreadPoolProperties.Setter()
                         .withKeepAliveTimeMinutes(int value)
```

6、allowMaximumSizeToDivergeFromCoreSize：该属性允许maximumSize起作用。属性值可以等于或者大于coreSize值，设置coreSize小于maximumSize的线程池能够支持maximumSize的并发数，但是会将不活跃的线程返回到系统中去。
默认属性：hystrix.threadpool.default.allowMaximumSizeToDivergeFromCoreSize
实例属性：hystrix.threadpool.HystrixThreadPoolKey.allowMaximumSizeToDivergeFromCoreSize
例如：

```
HystrixThreadPoolProperties.Setter()
                          .withAllowMaximumSizeToDivergeFromCoreSize(boolean value)
```

7、metrics.rollingStats.timeInMilliseconds：设置统计的滚动窗口的时间段大小。该属性是线程池保持指标时间长短。默认值 10000（毫秒）
默认属性：hystrix.threadpool.default.metrics.rollingStats.timeInMilliseconds
实例属性：hystrix.threadpool.HystrixThreadPoolKey.metrics.rollingStats.timeInMilliseconds
例如：

```
HystrixThreadPoolProperties.Setter()
                           .withMetricsRollingStatisticalWindowInMilliseconds(int value)
```

8、metrics.rollingStats.numBuckets：设置滚动的统计窗口被分成的桶（bucket）的数目。默认值 10。
注意：”metrics.rollingStats.timeInMilliseconds % metrics.rollingStats.numBuckets == 0"必须为true，否则会抛出异常。即任何能被metrics.rollingStats.timeInMilliseconds整除的值。
默认属性：hystrix.threadpool.default.metrics.rollingStats.numBuckets
实例属性：hystrix.threadpool.HystrixThreadPoolProperties.metrics.rollingStats.numBuckets
例如：

```
HystrixThreadPoolProperties.Setter()
                   .withMetricsRollingStatisticalWindowBuckets(int value)
```

## 参考链接

[Hystrix 参数详解](https://blog.csdn.net/sun_qiangwei/article/details/80376791)

[hystrix参数详解](https://blog.csdn.net/u013889359/article/details/80118884)