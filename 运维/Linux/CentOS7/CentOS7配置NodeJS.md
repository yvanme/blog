# CentOS7下配置Node

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**

**node:node-v10.16.3-linux-x64**

## Node安装

### 方法一

1. 解压压缩包

   ```shell
   tar -xvf node-v10.16.3-linux-x64.tar.xz
   ```

2. 建立软连接

   ```shell
   ln -s /app/node-v10.16.3-linux-x64/bin/npm /usr/local/bin/ 
   
   ln -s /app/node-v10.16.3-linux-x64/bin/node /usr/local/bin/
   ```

### 方法二

1. 下载安装包

   ```shell
   curl:
   
   curl https://raw.github.com/creationix/nvm/master/install.sh | sh
   
   wget：
   
   wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
   ```

2. 安装node

   ```shell
   nvm install stable
   ```

### 方法三

1. 下载安装包

   ```shell
   curl:
   
   curl -sL https://rpm.nodesource.com/setup_10.x | bash -
   ```

2. 安装node

   ```shell
   yum install -y nodejs
   ```

## NPM配置镜像

1. npm配置淘宝镜像

   ```
   npm config set registry https://registry.npm.taobao.org
   ```

2. 查看镜像配置信息

   ```
   npm config get registry
   ```

3. 还原npm仓库地址

   ```
   npm config set registry https://registry.npmjs.org/
   ```