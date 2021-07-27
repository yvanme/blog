# CentOS7修改主机名

## 介绍

[TOC]

**环境：CentOS7**

在CentOS，有三种定义的主机名:a、静态的（static），b、瞬态的（transient），以及 c、灵活的（pretty）。“静态”主机名也称为内核主机名，是系统在启动时从/etc/hostname自动初始化的主机名。“瞬态”主机名是在系统运行时临时分配的主机名，例如，通过DHCP或mDNS服务器分配。静态主机名和瞬态主机名都遵从作为互联网域名同样的字符限制规则。而另一方面，“灵活”主机名则允许使用自由形式（包括特殊/空白字符）的主机名，以展示给终端用户（如Dan's Computer）。

### 1、查看主机名相关的设置

```shell
$ hostnamectl status
```

### 2、同时修改所有三个主机名：静态、瞬态和灵活主机名

```shell
$hostnamectl set-hostname <host-name>
```

### 3、永久修改主机名，你可以修改静态主机名

```shell
$hostnamectl --static set-hostname <host-name>
```

### 4、临时修改主机名

```shell
hostname <host-name>
```