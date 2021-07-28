# GitBook基本使用

## 介绍

[TOC]

**环境：CentOS7**

1、安装 GitBook

```shell
npm install gitbook-cli -g
```

2、检验是否安装成功

```shell
gitbook -V
```

3、构建书籍

```shell
gitbook build
```

4、启动服务

```shell
#启动服务
gitbook serve
#启动服务，指定端口
gitbook serve --port 2333
```

5、生成PDF

```shell
#生成PDF
gitbook pdf
#生成PDF指定路径
gitbook pdf ./ ./mybook.pdf
```



