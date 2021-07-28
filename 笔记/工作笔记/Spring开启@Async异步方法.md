# Spring开启@Async异步方法

## 介绍

[TOC]

应用场景：

- 某些耗时较长的而用户不需要等待该方法的处理结果
- 某些耗时较长的方法，后面的程序不需要用到这个方法的处理结果时
  代码

## SpringBoot

### 创建AsyncTask

```java
/**
 * 异步任务
 *
 * @author Peng
 */
public class AsyncTask {
    @Async
    public void doAsyncTask() throws InterruptedException {
        // 假设执行一个很耗时的任务
        Thread.sleep(10 * 1000);
        System.out.println("执行完成，我执行了10秒");
    }
}
```

### 创建spring配置AppConfig

```java
/**
 * spring 配置
 *
 * @author Peng
 */
@Configuration
@EnableAsync
public class AppConfig {
    /**
     * 声明异步任务bean
     *
     * @return
     */
    @Bean
    public AsyncTask asyncTask() {
        return new AsyncTask();
    }
}
```

### 测试

```java
/**
 * 异步测试
 *
 * @author Peng
 */
public class AppTest {
    public static void main(String[] args) throws InterruptedException {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
        AsyncTask task = ctx.getBean(AsyncTask.class);
        task.doAsyncTask();
        System.out.println("异步任务调用成功，返回客户端执行成功，异步任务继续执行");
    }
}
```

### 执行结果

```java
异步任务调用成功，返回客户端执行成功，异步任务继续执行
执行完成，我执行了10秒
```

从结果可以看出，异步任务测试成功

## spring

### 简单介绍

Spring为任务调度与异步方法执行提供了注解支持。通过在方法上设置@Async注解，可使得方法被异步调用。也就是说调用者会在调用时立即返回，而被调用方法的实际执行是交给Spring的TaskExecutor来完成。

### 开启@Async注解

```java
<task:annotation-driven executor="annotationExecutor" />
<!-- 支持 @Async 注解 -->
<task:executor id="annotationExecutor" pool-size="20"/>
```

同时加入<context:component-scan />扫描注解。

### 栗子

### 为了比较，先来一个同步调用

```java
@Component
public class TestAsyncBean {
    public void sayHello4() throws InterruptedException {
        Thread.sleep(2 * 1000);//网络连接中 。。。消息发送中。。。
        System.out.println("我爱你啊!");
}
```

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:/applicationContext.xml"})
public class TestAsync {
    @Test
    public void test_sayHello4() throws InterruptedException, ExecutionException {
        System.out.println("你不爱我了么?");
        testAsyncBean.sayHello4();
        System.out.println("回的这么慢, 你肯定不爱我了, 我们还是分手吧。。。");
        Thread.sleep(3 * 1000);// 不让主进程过早结束
    }
}
```

输出结果：

```java
你不爱我了么?
我爱你啊!
回的这么慢, 你肯定不爱我了, 我们还是分手吧。。。
```

同步调用会按代码顺序依次进行下去，如果哪里需要等待，那么就阻塞在那里，不再向下继续进行。

### 使用@Async的异步调用

```java
@Component
public class TestAsyncBean {
    @Async
    public void sayHello3() throws InterruptedException {
        Thread.sleep(2 * 1000);//网络连接中 。。。消息发送中。。。
        System.out.println("我爱你啊!");
    }
}
```

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:/applicationContext.xml"})
public class TestAsync {
    @Autowired
    private TestAsyncBean testAsyncBean;
    @Test
    public void test_sayHello3() throws InterruptedException, ExecutionException {
        System.out.println("你不爱我了么?");
        testAsyncBean.sayHello3();
        System.out.println("你竟无话可说, 我们分手吧。。。");
        Thread.sleep(3 * 1000);// 不让主进程过早结束
    }
}
```

输出结果：

```java
你不爱我了么?
你竟无话可说, 我们分手吧。。。
我爱你啊!
```

异步调用，通过开启新的线程来执行调用的方法，不影响主线程。异步方法实际的执行交给了Spring的TaskExecutor来完成。

#### 上面这种方式是没有返回值的，下面尝试有返回值的异步调用

```java
@Component
public class TestAsyncBean {
    @Async
    public String sayHello2() throws InterruptedException {
        Thread.sleep(2 * 1000);//网络连接中 。。。消息发送中。。。
        return "我爱你啊!";// 调用方调用后会立即返回,所以返回null
    }
}
```

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:/applicationContext.xml"})
public class TestAsync {
    @Autowired
    private TestAsyncBean testAsyncBean;
    @Test
    public void test_sayHello2() throws InterruptedException, ExecutionException {
        System.out.println("你不爱我了么?");
        System.out.println(testAsyncBean.sayHello2());
        System.out.println("你说的啥? 我们还是分手吧。。。");
        Thread.sleep(3 * 1000);// 不让主进程过早结束
    }
}
```

输出结果：

```java
你不爱我了么?
null
你说的啥? 我们还是分手吧。。。
```

通过直接获取返回值得方式是不行的，这里就需要用到异步回调，异步方法返回值必须为Future<>，就像Callable与Future。

#### 下面通过AsyncResult<>来获得异步调用的返回值：

```java
@Component
public class TestAsyncBean {
    @Async
    public Future<String> sayHello1() throws InterruptedException {
        int thinking = 2;
        Thread.sleep(thinking * 1000);//网络连接中 。。。消息发送中。。。
        System.out.println("我爱你啊!");
        return new AsyncResult<String>("发送消息用了"+thinking+"秒");
    }
}
```

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:/applicationContext.xml"})
public class TestAsync {
    @Autowired
    private TestAsyncBean testAsyncBean;
    @Test
    public void test_sayHello1() throws InterruptedException, ExecutionException {
        Future<String> future = null;
        System.out.println("你不爱我了么?");
        future = testAsyncBean.sayHello1();
        System.out.println("你竟无话可说, 我们分手吧。。。");
        Thread.sleep(3 * 1000);// 不让主进程过早结束
        System.out.println(future.get());
    }
}
```

输出结果：

```java
你不爱我了么?
你竟无话可说, 我们分手吧。。。
我爱你啊!
发送消息用了2秒
```