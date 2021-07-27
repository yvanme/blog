# Linux 一条命令杀死占用端口的所有进程

[TOC]

Linux网络编程的实验中遇到了开启server后用CTRL+C退出但是端口仍被server占用的情况，首先可以用lsof查看占用端口的进程号

	lsof -i:端口号
	#然后kill掉占用进程，就可以再次启动server了
	kill -9 进程号
	#当然上述还是有些麻烦，因此可以用以下一条命令替代：
	sudo kill -9 $(lsof -i:端口号 -t)
#### 参考链接

------

[一条命令杀死占用端口的所有进程](https://blog.csdn.net/gq__97/article/details/80487588)

