# Maven安装

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**

**maven:maven-3.6.3**

## Maven安装

1. 解压maven包

   ```shell
   tar -zvxf apache-maven-3.6.3-bin.tar.gz
   ```

2. 配置环境变量

   ```shell
   #修改/etc下profile文件，加入以下配置并使用source /etc/profile命令使之生效
   
   #maven environment
   export MAVEN_HOME=/app/apache-maven-3.6.3
   export PATH=$PATH:$MAVEN_HOME/bin
   ```
3. 配置环境变量

   ```shell
   #修改/etc下profile文件，加入以下配置并使用source /etc/profile命令使之生效
   
   #maven environment
   export MAVEN_HOME=/app/apache-maven-3.6.3
   export PATH=$PATH:$MAVEN_HOME/bin
   ```