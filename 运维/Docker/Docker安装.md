Docker安装

## 介绍

[TOC]

**主机配置:**

| 主机名 | IP地址          |
| ------ | --------------- |
| worker | 192.168.153.100 |

**系统：CentOS7**

**版本：19.03.5**

**1. Docker安装**

-  更新Yum包 

```shell
yum update
```

-  安装 yum-utils , 使用 yum-config-manager 工具设置Yum源, 后面两个是 devicemapper驱动依赖 

```shell
yum install -y yum-utils device-mapper-persistent-data lvm2
```

-  添加docker的yum源 

```shell
#国外镜像
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
#国内镜像
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

-  查看所有仓库中docker版本 

```shell
yum list docker-ce --showduplicates | sort -r
```

-  安装Docker，命令：yum install docker-ce-版本号 

```shell
#安装最新版本
yum install docker-ce
#安装指定版本
yum install docker-ce-18.03.1.ce
```

-  启动Docker 

```shell
systemctl start docker
```

-  验证是否启动成功:

```shell
docker run hello-world
```

-  开机启动

```shell
systemctl enable docker
```

-  查看docker版本

```shell
docker version
```
-  开启远程访问

  配置/usr/lib/systemd/system/docker.service，添加如下配置

```shell
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock  -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock
```

-  重启docker

```shell
systemctl daemon-reload
systemctl restart docker
```

-  验证是否添加成功

```shell
ps -ef|grep docker
```

**2. Docker卸载**

-  列出你已安装的Docker

```
yum list installed | grep docker
```

-  移除这个package 

```
yum -y remove docker-engine.x86_64
```

-  要删除所有的images、containers、volumes

```
rm -rf /var/lib/docker
```

  

