k8s安装(使用kubeadm)

## 介绍

[TOC]

**主机配置:**

| 主机名 | IP地址          |
| ------ | --------------- |
| master | 192.168.153.130 |
| node1  | 192.168.153.131 |
| node2  | 192.168.153.132 |

**系统：CentOS7**

**docker版本：19.03.5**

**k8s版本：1.9.0**

**1. k8s安装**

-  安装kube-proxy报错

```shell
#执行降级操作命令
rpm -Uvh --oldpackage iptables-1.4.21-24.el7.x86_64.rpm
#执行完记得执行一下
ldconfig
#验证是否安装成功
rpm -qa|grep iptables
#重启 kube-proxy
service kube-proxy restart
#查看
journalctl -f -u kube-proxy
```

- iptables常用命令

  ```shell
  systemctl start iptables #启动
  
  systemctl status iptables #查看运行状态
  
  systemctl restart iptables.service #重启
  
  systemctl stop iptables.service #停止
  
  systemctl enable iptables.service #设置开机启动
  
  systemctl disable iptables.service #禁止开机启动
  
  iptables -h #查询帮助
  
  iptables -L -n #列出（filter表）所有规则
  
  iptables -L -n --line-number #列出（filter表）所有规则，带编号
  
  iptables -L -n -t nat #列出（nat表）所有规则
  
  iptables -F #清除（filter表）中所有规则
  
  iptables -F -t nat #清除（nat表）中所有规则
  
  service iptables save #保存配置（保存配置后必须重启iptables）
  
  systemctl restart iptables.service #重启
  
  #禁止192.168.1.3 IP地址的所有类型数据接入
  iptables -A INPUT ! -s 192.168.1.3 -j DROP
  
  #开放端口
  iptables -A INPUT -p tcp --dport 80 -j ACCEPT #开放80端口
  
  #开放端口范围
  iptables -I INPUT -p tcp --dport 22:80 -j ACCEPT #开发22-80范围的端口
  
  #不允许80端口流出
  iptables -I OUTPUT -p tcp --dport 80 -j DROP
  ```

  
