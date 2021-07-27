# CentOS7配置管理员用户

## 介绍

[TOC]

**环境：CentOS7**

## 配置管理员用户

- #### 添加用户

  添加用户

  ```shell
  adduser dmadmin
  ```

  设置密码

  ```shell
  passwd dmadmin
  ```

- #### 配置管理员(root)权限

  - 方法一
    修改 /etc/sudoers 文件，找到下面一行，把前面的注释（#）去掉
    
    ```shell
    ## Allows people in group wheel to run all commands
    %wheel    ALL=(ALL)    ALL
    ```
    然后修改用户，使其属于root组（wheel），命令如下
    ```shell
    usermod -g root tommy
    ```
    
  - 方法二
  
    修改 /etc/sudoers 文件，找到下面一行，在root下面添加一行
    ```shell
    ## Allow root to run any commands anywhere
    root    ALL=(ALL)     ALL
    dmadmin   ALL=(ALL)     ALL
    ```
  
  - 方法三

    修改 /etc/passwd 文件，找到如下行，把用户ID修改为 0
    ```shell
    tommy:x:500:500:tommy:/home/tommy:/bin/bash
    ```
    修改后如下
    ```shell
    tommy:x:0:500:tommy:/home/tommy:/bin/bash
    ```
  
  推荐方法二