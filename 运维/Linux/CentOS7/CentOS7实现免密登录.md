# CentOS7实现免密登录

## 介绍

[TOC]

**环境：CentOS7**

## 方式一

- 在node01上生成公钥私钥

  ```shell
  ssh-keygen
  ```

- 查看公钥私钥

  ```shell
  ll -a
  ```

- 将公钥拷贝到node02,node03节点

  ```shell
  ssh-copy-id root@node02
  ssh-copy-id root@node03
  ```

- 其他两台机器重复此步骤

- 在node01上免密登陆node02

  ```shell
   ssh root@node02
  ```

## 方式二

- 编写一个脚本 autoSSH.sh

  ```shell
  #!/bin/bash
  
  ## 脚本接收的参数，也就是要互相配置 SSH 免密登录的服务器列表参数
  BASE_HOST_LIST=$*
  
  ## 密码，默认用户是当前运行脚本的用户，比如 root 用户
  ## 这里改成你的用户对应的密码
  BASE_PASSWORD="123456"
  
  ## shell 函数：模拟 SSH 公钥私钥文件生成的人机交互过程
  sshkeygen(){
      expect -c "
      spawn ssh-keygen
      expect {
          \"ssh/id_rsa):\" {send \"\r\";exp_continue}
          \"passphrase):\" {send \"\r\";exp_continue}
          \"again:\" {send \"\r\";exp_continue}
      }
      "
  }
  
  ## shell 函数：模拟配置 SSH 免密登录过程的人机交互过程
  sshcopyid(){
      expect -c "
      spawn ssh-copy-id $1
      expect {
          \"(yes/no)?\" {send \"yes\r\";exp_continue}
          \"password:\" {send \"$2\r\";exp_continue}
      }
      "
  }
  
  ## 本机生成密钥对
  sshkeygen
  
  ## 然后本机跟其他服务器建立 SSH 免密登录(包括自己)
  for SSH_HOST in ${BASE_HOST_LIST}
  do
      sshcopyid ${SSH_HOST} ${BASE_PASSWORD}
  done
  ```

- 编写一个启动脚本 startAutoSSH.sh

  ```shell
  #!/bin/bash
  
  ## 配置 SSH 免密登录的服务器列表，可写死，也可通过传参或者读配置文件的方式读取
  #BASE_HOST_LIST="node001 node002 node003"
  BASE_HOST_LIST=$*
  
  ## 脚本的放置目录（传送之前，和传送之后都是这个目录）
  SCRIPT_PATH="/root/autoSSH.sh"
  
  ## 第一步：先让自己先跑 autoSSH.sh 脚本，为了能顺利发送脚本到集群各节点
  sh ${SCRIPT_PATH} ${BASE_HOST_LIST}
  
  ## 第二步：把脚本发送给其他服务器，让其他服务器也执行该脚本
  for SSH_HOST in $BASE_HOST_LIST
  do
      ## first : send install script
      ## 注意这行，用户名写死为root，如果是其他用户，记得在这里修改
      scp -r $SCRIPT_PATH root@${SSH_HOST}:$SCRIPT_PATH
      ## send command and generate ssh and auto ssh
      ssh ${SSH_HOST} sh ${SCRIPT_PATH} ${BASE_HOST_LIST}
  done
  ```

- 给两个脚本执行权限

  ```shell
  chmod +x autoSSH.sh 
  chmod +x startAutoSSH.sh 
  ```

- 执行startAutoSSH.sh脚本

  ```
  startAutoSSH.sh node01 node02 node03
  ```

- 在node01上免密登陆node02

  ```
   ssh root@node02
  ```

## 备注

如报-bash: ./startAutoSSH.sh: /bin/bash^M: 坏的解释器: 没有那个文件或目录错误，运行如下命令

```shell
 sed -i 's/\r$//' startAutoSSH.sh
```

如报expect: 未找到命令，运行如下命令

```shell
yum -y install expect
```

