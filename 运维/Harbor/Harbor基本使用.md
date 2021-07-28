Harbor基本使用

## 介绍

[TOC]

- 新建用户

  ![1](images/1.png)

- 新建项目

  ![2](images/2.png)

- 将用户加入到项目中，并设置相应权限

  ![3](images/3.png)

- 客户端使用该用户登录

  ![4](images/4.png)

-  往该仓库中推送镜像

```http
docker pull hello-world
#给镜像打tag
docker tag docker.io/hello-world:latest www.ddedds.com/test/hello-world:latest
#push到仓库
docker push www.ddedds.com/test/hello-world:latest
```

  

