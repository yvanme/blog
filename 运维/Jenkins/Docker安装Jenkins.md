# Docker安装Jenkins

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**

## Jenkins安装

1. 拉取jenkins镜像

   ```
   docker pull jenkins/jenkins:2.251
   ```

2. 本地新建数据存放目录，并设置权限（否则会报权限不够错误）

   ```shell
   chown -R 1000:1000 /apps/jenkins
   ```

3. 修改/apps/jenkins/hudson.model.UpdateCenter.xml,配置国内插件镜像

   ```shell
   https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
   ```

4. 启动jenkins

   ```
   docker run -d -p 8080:8080 -p 50000:50000 -v /apps/jenkins:/var/jenkins_home jenkins/jenkins:2.251
   ```

5. 修改/apps/jenkins/updates/default.json,提升插件安装速度

  ```shell
#全局搜索
#“ www.google.com”替换成“www.baidu.com”
# “ updates.jenkins-ci.org/download”替换成“ mirrors.tuna.tsinghua.edu.cn/jenkins”
  ```

