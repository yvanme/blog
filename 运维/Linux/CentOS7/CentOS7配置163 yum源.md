# CentOS7 配置163 yum源

## 介绍

[TOC]

**环境：CentOS7**

1）下载repo文件 

wget http://mirrors.163.com/.help/CentOS7-Base-163.repo

2）备份并替换系统的repo文件 

```shell
cp CentOS7-Base-163.repo /etc/yum.repos.d/
cd /etc/yum.repos.d/
mv CentOS-Base.repo CentOS-Base.repo.bak
mv CentOS7-Base-163.repo CentOS-Base.repo
```

3）执行yum源更新命令 

```shell
yum clean all
yum makecache
yum update
```

