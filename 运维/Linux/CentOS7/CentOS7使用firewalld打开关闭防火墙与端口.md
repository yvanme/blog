# CentOS7使用firewalld打开关闭防火墙与端口

## 介绍

[TOC]

**环境：CentOS7**

### 1、firewalld的基本使用。

```shell
#启动：
systemctl start firewalld
#查看状态： 
systemctl status firewalld 
#停止：
systemctl stop firewalld
#禁用：
systemctl disable firewalld
```

### 2.systemctl是CentOS7的服务管理工具中主要的工具，它融合之前service和chkconfig的功能于一体。

```shell
#启动一个服务：
systemctl start firewalld.service
#关闭一个服务：
systemctl stop firewalld.service
#重启一个服务：
systemctl restart firewalld.service
#显示一个服务的状态：
systemctl status firewalld.service
#在开机时启用一个服务：
systemctl enable firewalld.service
#在开机时禁用一个服务：
systemctl disable firewalld.service
#查看服务是否开机启动：
systemctl is-enabled firewalld.service
#查看已启动的服务列表：
systemctl list-unit-files|grep enabled
#查看启动失败的服务列表：
systemctl --failed
```

### 3.配置firewalld-cmd。

```shell
#查看版本：
firewall-cmd --version
#查看帮助： 
firewall-cmd --help
#显示状态：
firewall-cmd --state
#查看所有打开的端口：
firewall-cmd --zone=public --list-ports
#更新防火墙规则：
firewall-cmd --reload
#查看区域信息: 
firewall-cmd --get-active-zones
#查看指定接口所属区域：
firewall-cmd --get-zone-of-interface=eth0
#拒绝所有包：
firewall-cmd --panic-on
#取消拒绝状态：
firewall-cmd --panic-off
#查看是否拒绝：
firewall-cmd --query-panic
```

### 4.开启一个端口。

```shell
#添加
firewall-cmd --zone=public --add-port=80/tcp --permanent    （--permanent永久生效，没有此参数重启后失效）
#重新载入
firewall-cmd --reload
#查看
firewall-cmd --zone=public --query-port=80/tcp
#删除
firewall-cmd --zone=public --remove-port=80/tcp --permanent
```

### 5、常用命令介绍

```shell
firewall-cmd --state                           ##查看防火墙状态，是否是running
firewall-cmd --reload                          ##重新载入配置，比如添加规则之后，需要执行此命令
firewall-cmd --get-zones                       ##列出支持的zone
firewall-cmd --get-services                    ##列出支持的服务，在列表中的服务是放行的
firewall-cmd --query-service ftp               ##查看ftp服务是否支持，返回yes或者no
firewall-cmd --add-service=ftp                 ##临时开放ftp服务
firewall-cmd --add-service=ftp --permanent     ##永久开放ftp服务
firewall-cmd --remove-service=ftp --permanent  ##永久移除ftp服务
firewall-cmd --add-port=80/tcp --permanent     ##永久添加80端口 
iptables -L -n                                 ##查看规则，这个命令是和iptables的相同的
man firewall-cmd                               ##查看帮助
```