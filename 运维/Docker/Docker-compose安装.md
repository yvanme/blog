Docker-compose安装

## 介绍

[TOC]

**主机配置:**

| 主机名 | IP地址          |
| ------ | --------------- |
| worker | 192.168.153.128 |

**系统：CentOS7**

**版本：1.25.0**

**1. Docker-compose在线安装**

-  下载安装包

```shell
curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

-  给文件执行权限 

```shell
chmod +x /usr/local/bin/docker-compose
```

-  测试是否安装成功

```shell
docker-compose --version
```

**2. Docker-compose离线安装**

-  官网下载对应版本安装包

-  将下载下来的“**docker-compose-Linux-x86_64**”文件上传到服务器上，然后执行如下命令将其移动到 **/usr/local/bin**，并改名为“**docker-compose**”

```
mv docker-compose-Linux-x86_64 /usr/local/bin/docker-compose
```

-   执行如下命令添加可执行权限 

```
chmod +x /usr/local/bin/docker-compose
```

-  测试是否安装成功

```shell
docker-compose --version
```
  **2. Docker卸载**

-  移除docker-compose

```
rm /usr/local/bin/docker-compose
```

-  如果安装了pip，可使用如下命令

```
pip uninstall docker-compose
```



