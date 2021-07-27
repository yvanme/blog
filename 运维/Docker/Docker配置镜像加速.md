Docker配置镜像加速

## 介绍

[TOC]

**主机配置:**

| 主机名 | IP地址          |
| ------ | --------------- |
| worker | 192.168.153.100 |

**系统：CentOS7**

**版本：19.03.5**

**1. Docker配置镜像加速**

-  修改/etc/docker/daemon.json配置文件，添加如下配置

```shell
{
    "registry-mirrors":[
        "http://f1361db2.m.daocloud.io",
        "https://docker.mirrors.ustc.edu.cn",
        "http://hub-mirror.c.163.com",
        "https://kfwkfulq.mirror.aliyuncs.com",
        "https://2lqq34jg.mirror.aliyuncs.com",
        "https://pee6w651.mirror.aliyuncs.com",
        "https://registry.docker-cn.com"
    ]
}
```

-  重启Docker 

```shell
systemctl restart docker
```

-  查看是否添加成功

```shell
docker info
```

