# docker基本使用

## 介绍

[TOC]

**环境：CentOS7**

## 一、配置远程访问

1、在/usr/lib/systemd/system/docker.service，配置远程访问。主要是在[Service]这个部分，加上下面两个参数

```shell
vim /usr/lib/systemd/system/docker.service  

[Service]  
ExecStart=  
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock
```

2、docker重新读取配置文件，重新启动docker服务

```shell
systemctl daemon-reload
systemctl restart docker
```

3、查看docker进程，发现docker守护进程在已经监听2375的tcp端口

```shell
ps -ef|grep docker
```

4、这里拿本地客户端，来访问CentOS7的docker服务，访问成功

```shell
docker -H tcp://139.129.130.123:2375 images
```

## 二、容器管理

1、查看运行容器

```shell
docker ps
```

2、查看所有容器

```shell
docker ps -a
```

3、进入容器（其中字符串为容器ID）

```shell
docker exec -it d27bd3008ad9 /bin/bash
```

4、将主机/www/runoob目录拷贝到容器96f7f14e99ab的/www目录下

```shell
docker cp /www/runoob 96f7f14e99ab:/www/
```

5、将主机/www/runoob目录拷贝到容器96f7f14e99ab中，目录重命名为www

```shell
docker cp /www/runoob 96f7f14e99ab:/www
```

6、将容器96f7f14e99ab的/www目录拷贝到主机的/tmp目录中

```shell
docker cp  96f7f14e99ab:/www /tmp/
```

7、在容器内拷贝  

```shell
docker run -v /path/to/hostdir:/mnt $container 
cp /mnt/sourcefile /path/to/destfile  
```

8、杀死所有running状态的容器

```shell
docker kill $(docker ps -q)
```

9、停用全部运行中的容器:

```shell
docker stop $(docker ps -q)
```

10、删除所有已经停止的容器

```shell
docker rm $(docker ps -a -q)
```

11、一条命令实现停用并删除容器

```shell
docker stop $(docker ps -q) & docker rm $(docker ps -aq)
```

三、镜像管理

1、批量删除镜像：（删除所有名字中带 “none” 关键字的镜像）

```shell
 docker rmi $(docker images | grep "info" | awk '{print $3}') 
```

2、删除所有\'untagged/dangling\' ()状态的镜像

```shell
docker rmi $(docker images -q -f dangling=true)
```

3、删除所有镜像：

```shell
docker rmi $(docker images -q)
```


四、镜像的导入导出

1、镜像导出：（其中：infoarchivesapi为镜像名称，infoarchivesapi.tar为导出备份名称）

```shell
docker save -o infoarchivesapi.tar infoarchivesapi
```

2、镜像导入：（infoarchivesapi.tar为导入备份名称）

```shell
docker load -i infoarchivesapi.tar
```

