# CentOS7下使用Docker安装MySQL

## 介绍
[TOC]

1、拉取镜像

```html
docker pull mysql
```

2、启动MySQL挂载存储目录

```html
docker run --privileged=true --name mysql -p 3306:3306 -v /dctm/mysql/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=dctm1234 -d mysql:5.7
```