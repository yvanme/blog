# CentOS7没有netstat和ifconfig命令问题

## 介绍

[TOC]

**环境：CentOS7**

yum search ifconfig

通过yum search 这个命令我们发现ifconfig这个命令是在net-tools.x86_64这个包里，接下来我们安装这个包就行了

运行 yum install net-tools 就OK了