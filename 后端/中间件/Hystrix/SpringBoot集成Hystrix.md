# SpringBoot集成Hystrix

## 介绍

[TOC]

1. pom.xml配置

   ```xml
           <!-- hystrix-config start-->
           <dependency>
               <groupId>com.netflix.hystrix</groupId>
               <artifactId>hystrix-javanica</artifactId>
               <version>1.5.18</version>
           </dependency>
           <dependency>
               <groupId>com.netflix.hystrix</groupId>
               <artifactId>hystrix-core</artifactId>
               <version>1.5.18</version>
           </dependency>
           <dependency>
               <groupId>com.netflix.hystrix</groupId>
               <artifactId>hystrix-metrics-event-stream</artifactId>
               <version>1.5.18</version>
           </dependency>
           <!-- hystrix-config end-->
   ```

2. Hystrix配置

   ```java
   @Configuration
   public class HystrixConfig {
       //用来拦截处理HystrixCommand注解
       @Bean
       public HystrixCommandAspect hystrixCommandAspect() {
           return new HystrixCommandAspect();
       }
   
       /**
        * 向监控中心Dashboard发送stream消息
        */
       @Bean
       public ServletRegistrationBean hystrixMetricsStreamServlet() {
           ServletRegistrationBean registrationBean =
                   new ServletRegistrationBean(new HystrixMetricsStreamServlet());
           registrationBean.addUrlMappings("/hystrix.stream");
           return registrationBean;
       }
   }
   ```

3. 熔断测试

   ```java
   @RestController
   @RequestMapping("/order")
   @Slf4j
   public class OrderController {
   
   
       @RequestMapping(value = "/getOrderPageList", method = RequestMethod.GET)
       @HystrixCommand(
               fallbackMethod = "getOrderPageListFallback",
               threadPoolProperties = {  //10个核心线程池,超过20个的队列外的请求被拒绝; 当一切都是正常的时候，线程池一般仅会有1到2个线程激活来提供服务
                       @HystrixProperty(name = "coreSize", value = "10"),
                       @HystrixProperty(name = "maxQueueSize", value = "100"),
                       @HystrixProperty(name = "queueSizeRejectionThreshold", value = "20")},
               commandProperties = {
                       @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "10000"), //命令执行超时时间
                       @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "2"), //若干10s一个窗口内失败三次, 则达到触发熔断的最少请求量
                       @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "30000") //断路30s后尝试执行, 默认为5s
               })
       public String getOrderPageList() {
           //do something
           int i = 1/0;
           return "test";
       }
   
       public String getOrderPageListFallback() {
           log.error("===================== 执行降级策略");
           return "failed";
       }
   }
   ```

   