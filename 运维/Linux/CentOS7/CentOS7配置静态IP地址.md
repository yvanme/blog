# CentOS7配置静态IP地址

## 介绍

[TOC]

**环境：CentOS7**

1. 进入/etc/sysconfig/network-scripts目录。

   ```shell
   cd /etc/sysconfig/network-scripts
   ```

2. 使用“vi ifcfg-ens33”命令打开配置文件 ifcfg-ens33,配置静态IP地址。

   ```shell
   TYPE=Ethernet
   PROXY_METHOD=none
   BROWSER_ONLY=no
   #BOOTPROTO=dhcp
   BOOTPROTO=static         #BOOTPROTO改为static
   IPADDR=192.168.153.131   # 设置的静态IP地址
   NETMASK=255.255.255.0    # 子网掩码
   GATEWAY=192.168.153.2    # 网关地址
   DNS1=192.168.153.2       # DNS服务器
   DNS2=8.8.8.8             # DNS服务器
   DEFROUTE=yes
   IPV4_FAILURE_FATAL=no
   IPV6INIT=yes
   IPV6_AUTOCONF=yes
   IPV6_DEFROUTE=yes
   IPV6_FAILURE_FATAL=no
   IPV6_ADDR_GEN_MODE=stable-privacy
   NAME=ens33
   UUID=764b892b-1290-4faf-a333-95367062c548
   DEVICE=ens33
   ONBOOT=yes
   ```

4. 重启网络。

   ```shell
   systemctl restart network
   ```

5. 查看ip地址配置是否正确。

   ```shell
   ip addr
   ```
