# CentOS7查看某个端口是否被占用

## 介绍

[TOC]

**环境：CentOS7**

### 1、使用lsof

lsof -i:端口号查看某个端口是否被占用

```shell
 lsof -i:80
```

### 2、使用netstat

```shell
netstat -anp|grep 80 
```

### 3、netstat常用命令

```shell
netstat -ntlp   //查看当前所有tcp端口·
netstat -ntulp |grep 80   //查看所有80端口使用情况·
netstat -an | grep 3306   //查看所有3306端口使用情况·
```