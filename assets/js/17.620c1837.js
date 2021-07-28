(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{375:function(e,t,a){"use strict";a.r(t);var s=a(44),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"hystrix参数详解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hystrix参数详解"}},[e._v("#")]),e._v(" Hystrix参数详解")]),e._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[e._v("#")]),e._v(" 介绍")]),e._v(" "),a("p",[e._v("[TOC]")]),e._v(" "),a("h2",{attrs:{id:"hystrix属性优先级"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hystrix属性优先级"}},[e._v("#")]),e._v(" Hystrix属性优先级")]),e._v(" "),a("p",[e._v("1、内置全局默认值（Global default from code），默认值\n如果某属性未通过下面的任何方式进行设置，则默认使用内置全局默认值。")]),e._v(" "),a("p",[e._v("2、动态全局默认属性（Dynamic global default property），默认属性\n可以通过此方式来更改某属性的全局默认值。")]),e._v(" "),a("p",[e._v("3、内置实例默认值（Instance default from code），实例默认\n可以在写代码的时候，设置某个属性的值。\n例如：")]),e._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("HystrixCommandInstance")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("int")]),e._v(" id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("super")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("Setter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("withGroupKey")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("HystrixCommandGroupKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("Factory")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("asKey")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ExampleGroup"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("andCommandPropertiesDefaults")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("HystrixCommandProperties"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("Setter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n               "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("withExecutionTimeoutInMilliseconds")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("500")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("id "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),a("p",[e._v("4、动态配置实例属性（Dynamic instance property），实例属性\n可以通过动态配置某特定实例的属性值，来覆盖前面三种的值。\n例如下面的属性：")]),e._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token namespace"}},[e._v("hystrix"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("command"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")])]),e._v("HystrixCommandKey")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("execution"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("isolation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("thread"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("timeoutInMilliseconds\n")])])]),a("p",[e._v("可以使用通过 HystrixCommandKey 的名称来替换属性中的HystrixCommandKey，这样就完成了动态配置实例属性，例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("hystrix.command.SubscriberGetAccount.execution.isolation.thread.timeoutInMilliseconds\n")])])]),a("p",[e._v("上面四种设置属性值的优先级为：4 > 3 > 2 > 1")]),e._v(" "),a("h2",{attrs:{id:"hystrix-参数详解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hystrix-参数详解"}},[e._v("#")]),e._v(" Hystrix 参数详解")]),e._v(" "),a("p",[e._v("Command Properties")]),e._v(" "),a("h3",{attrs:{id:"一、execution相关的属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、execution相关的属性"}},[e._v("#")]),e._v(" 一、Execution相关的属性")]),e._v(" "),a("p",[e._v("1、execution.isolation.strategy：隔离策略，默认是Thread, 可选Thread｜Semaphore。\n注意：在设置线程隔离策略时，推荐 HystrixCommand 使用 Thread，HystrixObservableCommand 使用 Semaphore。\n默认属性：hystrix.command.default.execution.isolation.strategy\n实例属性：hystrix.command.HystrixCommandKey.execution.isolation.strategy\n例如：")]),e._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("HystrixCommandProperties"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("Setter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n                                   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("withExecutionIsolationStrategy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("ExecutionIsolationStrategy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("THREAD"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n")])])]),a("p",[e._v("2、execution.timeout.enabled： 执行是否启用超时，默认启用true\n默认属性：hystrix.command.default.execution.timeout.enabled\n实例属性：hystrix.command.HystrixCommandKey.execution.timeout.enabled\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                                   .withExecutionTimeoutEnabled(boolean value)\n")])])]),a("p",[e._v("3、execution.isolation.thread.timeoutInMilliseconds：命令执行超时时间，超过此时间，HystrixCommand被标记为TIMEOUT，并执行回退逻辑，默认1000ms\n注意：超时会作用在HystrixCommand.queue()，即使调用者没有调用 get() 去获得 Future 对象。\n默认属性：hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds\n实例属性：hystrix.command.HystrixCommandKey.execution.isolation.thread.timeoutInMilliseconds\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                                  .withExecutionTimeoutInMilliseconds(int value)\n")])])]),a("p",[e._v("4、execution.isolation.thread.interruptOnTimeout： 发生超时是否中断，默认true\n默认属性：hystrix.command.default.execution.isolation.thread.interruptOnTimeout\n实例属性：hystrix.command.HystrixCommandKey.execution.isolation.thread.interruptOnTimeout\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                                .withExecutionIsolationThreadInterruptOnTimeout(boolean value)\n")])])]),a("p",[e._v("5、execution.isolation.thread.interruptOnCancel： 执行取消运行是否中断，默认false\n默认属性：hystrix.command.default.execution.isolation.thread.interruptOnCancel\n实例属性：hystrix.command.HystrixCommandKey.execution.isolation.thread.interruptOnCancel\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                                  .withExecutionIsolationThreadInterruptOnCancel(boolean value)\n")])])]),a("p",[e._v("6、execution.isolation.semaphore.maxConcurrentRequests： 最大并发请求数，默认10，该参数当使用ExecutionIsolationStrategy.SEMAPHORE策略时才有效。如果达到最大并发请求数，请求会被拒绝。理论上选择semaphore size的原则和选择thread size一致，但选用semaphore时每次执行的单元要比较小且执行速度快（ms级别），否则的话应该用thread。\nsemaphore应该占整个容器（tomcat）的线程池的一小部分。\n默认属性：hystrix.command.default.execution.isolation.semaphore.maxConcurrentRequests\n实例属性：hystrix.command.HystrixCommandKey.execution.isolation.semaphore.maxConcurrentRequests\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                          .withExecutionIsolationSemaphoreMaxConcurrentRequests(int value)\n")])])]),a("h3",{attrs:{id:"二、fallback相关的属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、fallback相关的属性"}},[e._v("#")]),e._v(" 二、Fallback相关的属性")]),e._v(" "),a("p",[e._v("这些参数可以应用于Hystrix的THREAD和SEMAPHORE策略")]),e._v(" "),a("p",[e._v("1、fallback.enabled： 当执行失败或者请求被拒绝，是否会尝试调用hystrixCommand.getFallback() 。默认true\n默认属性：hystrix.command.default.fallback.enabled\n实例属性：hystrix.command.HystrixCommandKey.fallback.enabled\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                         .withFallbackEnabled(boolean value)\n")])])]),a("p",[e._v("2、fallback.isolation.semaphore.maxConcurrentRequests： 如果并发数达到该设置值，请求会被拒绝和抛出异常并且fallback不会被调用。默认10\n默认属性：hystrix.command.default.fallback.isolation.semaphore.maxConcurrentRequests\n实例属性：hystrix.command.HystrixCommandKey.fallback.isolation.semaphore.maxConcurrentRequests\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                   .withFallbackIsolationSemaphoreMaxConcurrentRequests(int value)\n")])])]),a("h3",{attrs:{id:"三、circuit-breaker相关的属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、circuit-breaker相关的属性"}},[e._v("#")]),e._v(" 三、Circuit Breaker相关的属性")]),e._v(" "),a("p",[e._v("1、circuitBreaker.enabled： 用来跟踪circuit的健康性，如果未达标则让request短路。默认true\n默认属性：hystrix.command.default.circuitBreaker.enabled\n实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.enabled\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                         .withCircuitBreakerEnabled(boolean value)\n")])])]),a("p",[e._v("2、circuitBreaker.requestVolumeThreshold： 一个rolling window内最小的请求数。如果设为20，那么当一个rolling window的时间内（比如说1个rolling window是10秒）收到19个请求，即使19个请求都失败，也不会触发circuit break。默认20\n默认属性：hystrix.command.default.circuitBreaker.requestVolumeThreshold\n实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.requestVolumeThreshold\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                        .withCircuitBreakerRequestVolumeThreshold(int value)\n")])])]),a("p",[e._v("3、circuitBreaker.sleepWindowInMilliseconds： 触发短路的时间值，当该值设为5000时，则当触发circuit break后的5000毫秒内都会拒绝request，也就是5000毫秒后才会关闭circuit。默认5000\n默认属性：hystrix.command.default.circuitBreaker.sleepWindowInMilliseconds\n实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.sleepWindowInMilliseconds\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                            .withCircuitBreakerSleepWindowInMilliseconds(int value)\n")])])]),a("p",[e._v("4、circuitBreaker.errorThresholdPercentage：错误比率阀值，如果错误率>=该值，circuit会被打开，并短路所有请求触发fallback。默认50\n默认属性：hystrix.command.default.circuitBreaker.errorThresholdPercentage\n实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.errorThresholdPercentage\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                            .withCircuitBreakerErrorThresholdPercentage(int value)\n")])])]),a("p",[e._v("5、circuitBreaker.forceOpen： 强制打开熔断器，如果打开这个开关，那么拒绝所有request，默认false\n该属性优先级比circuitBreaker.forceClosed高。\n默认属性：hystrix.command.default.circuitBreaker.forceOpen\n实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.forceOpen\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                            .withCircuitBreakerForceOpen(boolean value)\n")])])]),a("p",[e._v("6、circuitBreaker.forceClosed： 强制关闭熔断器 如果这个开关打开，circuit将一直关闭且忽略circuitBreaker.errorThresholdPercentage\n默认属性：hystrix.command.default.circuitBreaker.forceClosed\n实例属性：hystrix.command.HystrixCommandKey.circuitBreaker.forceClosed\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                            .withCircuitBreakerForceClosed(boolean value)\n")])])]),a("h3",{attrs:{id:"四、metrics相关参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、metrics相关参数"}},[e._v("#")]),e._v(" 四、Metrics相关参数")]),e._v(" "),a("p",[e._v("1、metrics.rollingStats.timeInMilliseconds： 设置统计的时间窗口值的毫秒值，circuit break 的打开会根据1个rolling window的统计来计算。若rolling window被设为10000毫秒，则rolling window会被分成n个buckets，每个bucket包含success，failure，timeout，rejection的次数的统计信息。默认10000。")]),e._v(" "),a("p",[e._v("默认属性：hystrix.command.default.metrics.rollingStats.timeInMilliseconds\n实例属性：hystrix.command.HystrixCommandKey.metrics.rollingStats.timeInMilliseconds\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                       .withMetricsRollingStatisticalWindowInMilliseconds(int value)\n")])])]),a("p",[e._v("2、metrics.rollingStats.numBuckets： 设置一个rolling window被划分的数量，若numBuckets＝10，rolling window＝10000，那么一个bucket的时间即1秒。必须符合rolling window % numberBuckets == 0，否则会抛出异常。默认10\n默认属性：hystrix.command.default.metrics.rollingStats.numBuckets\n实例属性：hystrix.command.HystrixCommandKey.metrics.rollingStats.numBuckets\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                              .withMetricsRollingStatisticalWindowBuckets(int value)\n")])])]),a("p",[e._v("3、metrics.rollingPercentile.enabled： 执行时是否enable指标的计算和跟踪，默认true\n默认属性：hystrix.command.default.metrics.rollingPercentile.enabled\n实例属性：hystrix.command.HystrixCommandKey.metrics.rollingPercentile.enabled\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                               .withMetricsRollingPercentileEnabled(boolean value)\n")])])]),a("p",[e._v("4、metrics.rollingPercentile.timeInMilliseconds： 设置rolling percentile window的时间，默认60000\n默认属性：hystrix.command.default.metrics.rollingPercentile.timeInMilliseconds\n实例属性：hystrix.command.HystrixCommandKey.metrics.rollingPercentile.timeInMilliseconds\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                        .withMetricsRollingPercentileWindowInMilliseconds(int value)\n")])])]),a("p",[e._v("5、metrics.rollingPercentile.numBuckets： 设置rolling percentile window的numberBuckets。逻辑同上。默认6\n默认属性：hystrix.command.default.metrics.rollingPercentile.numBuckets\n实例属性：hystrix.command.HystrixCommandKey.metrics.rollingPercentile.numBuckets\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                              .withMetricsRollingPercentileWindowBuckets(int value)\n")])])]),a("p",[e._v("6、metrics.rollingPercentile.bucketSize： 如果bucket size＝100，window＝10s，若这10s里有500次执行，只有最后100次执行会被统计到bucket里去。增加该值会增加内存开销以及排序的开销。默认100\n默认属性：hystrix.command.default.metrics.rollingPercentile.bucketSize\n实例属性：hystrix.command.HystrixCommandKey.metrics.rollingPercentile.bucketSize\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                                      .withMetricsRollingPercentileBucketSize(int value)\n")])])]),a("p",[e._v("7、metrics.healthSnapshot.intervalInMilliseconds： 记录health 快照（用来统计成功和错误绿）的间隔，默认500ms\n默认属性：hystrix.command.default.metrics.healthSnapshot.intervalInMilliseconds\n实例属性：hystrix.command.HystrixCommandKey.metrics.healthSnapshot.intervalInMilliseconds\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                            .withMetricsHealthSnapshotIntervalInMilliseconds(int value)\n")])])]),a("h3",{attrs:{id:"五、request-context-相关参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五、request-context-相关参数"}},[e._v("#")]),e._v(" 五、Request Context 相关参数")]),e._v(" "),a("p",[e._v("1、requestCache.enabled：默认true，需要重载getCacheKey()，返回null时不缓存\n默认属性：hystrix.command.default.requestCache.enabled\n实例属性：hystrix.command.HystrixCommandKey.requestCache.enabled\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                         .withRequestCacheEnabled(boolean value)\n")])])]),a("p",[e._v("2、requestLog.enabled：记录日志到HystrixRequestLog，默认true\n默认属性：hystrix.command.default.requestLog.enabled\n实例属性：hystrix.command.HystrixCommandKey.requestLog.enabled\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCommandProperties.Setter()\n                              .withRequestLogEnabled(boolean value)\n")])])]),a("h3",{attrs:{id:"六、collapser-properties-相关参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#六、collapser-properties-相关参数"}},[e._v("#")]),e._v(" 六、Collapser Properties 相关参数")]),e._v(" "),a("p",[e._v("1、requestCache.enabled： 设置请求缓存是否对HystrixCollapser.execute() and HystrixCollapser.queue()的调用起作用。，默认true\n默认属性：hystrix.collapser.default.requestCache.enabled\n实例属性：hystrix.collapser.HystrixCollapserKey.requestCache.enabled\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCollapserProperties.Setter()\n                      .withRequestCacheEnabled(boolean value)\n")])])]),a("p",[e._v("2、maxRequestsInBatch： 单次批处理的最大请求数，达到该数量触发批处理，默认Integer.MAX_VALUE\n默认属性：hystrix.collapser.default.maxRequestsInBatch\n实例属性：hystrix.collapser.HystrixCollapserKey.maxRequestsInBatch\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCollapserProperties.Setter()\n                    .withMaxRequestsInBatch(int value)\n")])])]),a("p",[e._v("3、timerDelayInMilliseconds： 触发批处理的延迟，也可以为创建批处理的时间＋该值，默认10\n默认属性：hystrix.collapser.default.timerDelayInMilliseconds\n实例属性：hystrix.collapser.HystrixCollapserKey.timerDelayInMilliseconds\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixCollapserProperties.Setter()\n                     .withTimerDelayInMilliseconds(int value)\n")])])]),a("p",[e._v("ThreadPool Properties\n线程数默认值10适用于大部分情况（有时可以设置得更小），如果需要设置得更大，那有个基本得公式可以follow：\nrequests per second at peak when healthy × 99th percentile latency in seconds + some breathing room\n每秒最大支撑的请求数 × 99%平均响应时间 + 缓存值\n比如：每秒能处理1000个请求，99%的请求响应时间是60ms，那么公式是：\n1000×0.060 + 12 = 72")]),e._v(" "),a("p",[e._v("基本得原则是保持线程池尽可能小，他主要是为了释放压力，防止资源被阻塞。\n当一切都是正常的时候，线程池一般仅会有1到2个线程激活来提供服务")]),e._v(" "),a("p",[e._v("1、coreSize： 设置核心线程池大小，默认10\n默认属性：hystrix.threadpool.default.coreSize\n实例属性：hystrix.threadpool.HystrixThreadPoolKey.coreSize\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixThreadPoolProperties.Setter()\n                               .withCoreSize(int value)\n")])])]),a("p",[e._v("2、maximumSize：设置线程池最大值。这个是在不开启拒绝HystrixCommand的情况下支持的最大并发数。这个属性起作用的前提是设置了allowMaximumSizeToDrivergeFromCoreSize。\n默认属性：hystrix.threadpool.default.maximumSize\n实例属性：hystrix.threadpool.HystrixThreadPoolKey.maximumSize\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixThreadPoolProperties.Setter()\n                                .withMaximumSize(int value)\n")])])]),a("p",[e._v("3、maxQueueSize： BlockingQueue的最大队列数，当设为－1，会使用SynchronousQueue，值为正时使用LinkedBlcokingQueue。该设置只会在初始化时有效，之后不能修改threadpool的queue size，除非reinitialising thread executor。默认－1。\n默认属性：hystrix.threadpool.default.maxQueueSize\n实例属性：hystrix.threadpool.HystrixThreadPoolKey.maxQueueSize\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixThreadPoolProperties.Setter()\n                             .withMaxQueueSize(int value)\n")])])]),a("p",[e._v("4、queueSizeRejectionThreshold： 即使maxQueueSize没有达到，达到queueSizeRejectionThreshold该值后，请求也会被拒绝。因为maxQueueSize不能被动态修改，这个参数将允许我们动态设置该值。if maxQueueSize == -1，该字段将不起作用。默认5\n默认属性：hystrix.threadpool.default.queueSizeRejectionThreshold\n实例属性：hystrix.threadpool.HystrixThreadPoolKey.queueSizeRejectionThreshold\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixThreadPoolProperties.Setter()\n                           .withQueueSizeRejectionThreshold(int value)\n")])])]),a("p",[e._v("5、keepAliveTimeMinutes： 如果corePoolSize和maxPoolSize设成一样（默认实现）该设置无效。如果coreSize小于maximumSize，那么该属性控制一个线程从实用完成到被释放的时间。默认1（分钟）。\n默认属性：hystrix.threadpool.default.keepAliveTimeMinutes\n实例属性：hystrix.threadpool.HystrixThreadPoolKey.keepAliveTimeMinutes\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixThreadPoolProperties.Setter()\n                         .withKeepAliveTimeMinutes(int value)\n")])])]),a("p",[e._v("6、allowMaximumSizeToDivergeFromCoreSize：该属性允许maximumSize起作用。属性值可以等于或者大于coreSize值，设置coreSize小于maximumSize的线程池能够支持maximumSize的并发数，但是会将不活跃的线程返回到系统中去。\n默认属性：hystrix.threadpool.default.allowMaximumSizeToDivergeFromCoreSize\n实例属性：hystrix.threadpool.HystrixThreadPoolKey.allowMaximumSizeToDivergeFromCoreSize\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixThreadPoolProperties.Setter()\n                          .withAllowMaximumSizeToDivergeFromCoreSize(boolean value)\n")])])]),a("p",[e._v("7、metrics.rollingStats.timeInMilliseconds：设置统计的滚动窗口的时间段大小。该属性是线程池保持指标时间长短。默认值 10000（毫秒）\n默认属性：hystrix.threadpool.default.metrics.rollingStats.timeInMilliseconds\n实例属性：hystrix.threadpool.HystrixThreadPoolKey.metrics.rollingStats.timeInMilliseconds\n例如：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixThreadPoolProperties.Setter()\n                           .withMetricsRollingStatisticalWindowInMilliseconds(int value)\n")])])]),a("p",[e._v('8、metrics.rollingStats.numBuckets：设置滚动的统计窗口被分成的桶（bucket）的数目。默认值 10。\n注意：”metrics.rollingStats.timeInMilliseconds % metrics.rollingStats.numBuckets == 0"必须为true，否则会抛出异常。即任何能被metrics.rollingStats.timeInMilliseconds整除的值。\n默认属性：hystrix.threadpool.default.metrics.rollingStats.numBuckets\n实例属性：hystrix.threadpool.HystrixThreadPoolProperties.metrics.rollingStats.numBuckets\n例如：')]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("HystrixThreadPoolProperties.Setter()\n                   .withMetricsRollingStatisticalWindowBuckets(int value)\n")])])]),a("h2",{attrs:{id:"参考链接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[e._v("#")]),e._v(" 参考链接")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://blog.csdn.net/sun_qiangwei/article/details/80376791",target:"_blank",rel:"noopener noreferrer"}},[e._v("Hystrix 参数详解"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://blog.csdn.net/u013889359/article/details/80118884",target:"_blank",rel:"noopener noreferrer"}},[e._v("hystrix参数详解"),a("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=r.exports}}]);