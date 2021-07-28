# 线上CPU占用过高排查方法

系统：CentOS7

*1.*top命令查看占用CPU的进程pid。

```shell
top
```

结果：

```shell
   PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND            
  4287 root      20   0       0      0      0 S   0.3  0.0   1:17.95 xfsaild/dm-0
  9040 mysql     20   0 1185580 184212   5868 S   0.3  4.8   2:33.76 mysqld 
  19525 dmadmin   20   0 3509408 157400  13748 S   0.3  4.1   3:01.23 java
  23179 root      20   0       0      0      0 S   0.3  0.0   0:00.06 kworker/0:0
  1 root      20   0  128160   6684   4164 S   0.0  0.2   0:05.64 systemd 
```

*2.*查看指定进程下线程的CPU占用。

```shell
top -H -p pid
#for example:
top -H -p 19525
```

结果：

```shell
   PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND                19536 dmadmin   20   0 3509408 157400  13748 S  0.3  4.1   1:56.24 java                  19525 dmadmin   20   0 3509408 157400  13748 S  0.0  4.1   0:00.00 java                  19526 dmadmin   20   0 3509408 157400  13748 S  0.0  4.1   0:01.15 java
```

*3.*使用 jstack -l [pid] > jstack_log ,导出堆栈信息。

```shell
jstack -l [pid] > jstack_log
#for example:
jstack -l 19536 > jstack_log
```

*4.*排查堆栈信息。

备注：根据线程id还可以做其他的排查工作。