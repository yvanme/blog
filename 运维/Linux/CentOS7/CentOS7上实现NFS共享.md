# CentOS7上实现NFS共享

## 介绍

[TOC]

一.介绍

​    NFS 是Network File System的缩写，即网络文件系统。一种使用于分散式文件系统的协定，功能是让客户端通过网络访问不同主机上磁盘里的数据，主要用在类Unix系统上实现文件共享的一种方法。
​     NFS在文件传送或信息传送过程中依赖于RPC协议。RPC，远程过程调用 (Remote Procedure Call) 是能使客户端执行其他系统中程序的一种机制。NFS本身是没有提供信息传输的协议和功能的，但NFS却能让我们通过网络进行资料的分享，这是因为NFS使用了一些其它的传输协议。而这些传输协议用到这个RPC功能的。可以说NFS本身就是使用RPC的一个程序。或者说NFS也是一个RPC SERVER。所以只要用到NFS的地方都要启动RPC服务，不论是NFS SERVER或者NFS CLIENT。这样SERVER和CLIENT才能通过RPC来实现PROGRAM PORT的对应。可以这么理解RPC和NFS的关系：NFS是一个文件系统，而RPC是负责负责信息的传输。

二.服务端配置

1.关闭系统防火墙和selinux（针对服务器端和客户端）

\#查看系统防火墙的状态,可以看到防火墙是开着的
 [root@linuxidc ~]#systemctl status firewalld
 ● firewalld.service - firewalld - dynamic firewall daemon
    Loaded: loaded (/usr/lib/systemd/system/firewalld.service; disabled; vendor preset: enabled)
    Active: active (running) since Sat 2017-06-03 09:38:00 CST; 8s ago
      Docs: man:firewalld(1)
  Main PID: 24067 (firewalld)
    CGroup: /system.slice/firewalld.service
            └─24067 /usr/bin/python -Es /usr/sbin/firewalld --nofork --nopid

Jun 03 09:37:58 linuxidc systemd[1]: Starting firewalld -
dynamic firewall daemon...

Jun 03 09:38:00 linuxidc systemd[1]: Started firewalld - dynamic firewall
daemon.

#关闭防火墙

[root@linuxidc ~]#systemctl stop firewalld

#再次查看防火墙,可以看到已经关闭了

[root@linuxidc ~]#systemctl status firewalld

● firewalld.service - firewalld - dynamic firewall
daemon

   Loaded: loaded
(/usr/lib/systemd/system/firewalld.service; disabled; vendor preset: enabled)

   Active: inactive (dead)

     Docs: man:firewalld(1)

Jun 01 11:33:35 localhost systemd[1]: Starting firewalld - dynamic firewall daemon...
 Jun 01 11:33:44 localhost systemd[1]: Started firewalld - dynamic firewall daemon.
 Jun 03 09:11:32 linuxidc systemd[1]: Stopping firewalld - dynamic firewall daemon...
 Jun 03 09:11:34 linuxidc systemd[1]: Stopped firewalld - dynamic firewall daemon.
 Jun 03 09:37:58 linuxidc systemd[1]: Starting firewalld - dynamic firewall daemon...
 Jun 03 09:38:00 linuxidc systemd[1]: Started firewalld - dynamic firewall daemon.
 Jun 03 09:38:34 linuxidc systemd[1]: Stopping firewalld - dynamic firewall daemon...
 Jun 03 09:38:36 linuxidc systemd[1]: Stopped firewalld - dynamic firewall daemon.
 \#查看selinux的运行模式,现在为强制模式
 [root@linuxidc share]#getenforce

Enforcing

#把selinux设为许可模式

[root@linuxidc share]#setenforce 0

#再次查看selinux的运行模式,已经变为许可模式

[root@linuxidc share]#getenforce

Permissive

#要想禁用selinux,则需要编辑selinux的配置文件,把SELINUX设置成disabled,然后重启生效

[root@linuxidc share]#vi /etc/sysconfig/selinux

[root@linuxidc share]#cat /etc/sysconfig/selinux

This file controls the state of SELinux on the system.

SELINUX= can take one of these three values:

enforcing - SELinux security policy

is enforced.

permissive - SELinux prints

warnings instead of enforcing.

disabled - No SELinux policy is

loaded.

SELINUX=disabled

SELINUXTYPE= can take one of three two values:

targeted - Targeted processes are

protected,

minimum - Modification of targeted

policy. Only selected processes are protected. 

mls - Multi Level Security

protection.

SELINUXTYPE=targeted 

2.安装所需的软件包（针对服务器端和客户端）

[root@linuxidc ~]#yum install -y rpc-bind nfs-utils

3.服务端配置
 NFS服务的主要配置文件为 /etc/exports.
 /etc/exports文件内容格式：
     <输出目录> 客户端（选项:访问权限,用户映射,其他]
         输出目录是指NFS系统中所定义的共享给客户端使用的文件系统
         客户端是定义网络中可以访问这个NFS共享目录的IP地址或网段或域名等
             客户端常用的指定方式
                 指定ip地址的主机：192.168.100.1
                 指定一个子网：192.168.100.0/24 也可以写成:192.168.100.0/255.255.255.0
                 指定域名的主机：david.bsmart.cn
                 指定域中的所有主机：*.bsmart.cn
                 所有主机：*
         选项用来设置输出目录的访问权限、用户映射等。
             NFS主要有3类选项：
                 设置输出目录只读：ro
                 设置输出目录读写：rw
             用户映射选项
                 all_squash：将远程访问的所有普通用户及所属组都映射为匿名用户或用户组（nfsnobody）；
                 no_all_squash：与all_squash取反（默认设置）；
                 root_squash：将root用户及所属组都映射为匿名用户或用户组（默认设置）；
                 no_root_squash：与rootsquash取反；
                 anonuid=xxx：将远程访问的所有用户都映射为匿名用户，并指定该用户为本地用户（UID=xxx）；
                 anongid=xxx：将远程访问的所有用户组都映射为匿名用户组账户，并指定该匿名用户组账户为本地用户组账户（GID=xxx）；
             其它选项
                 secure：限制客户端只能从小于1024的tcp/ip端口连接nfs服务器（默认设置）；
                 insecure：允许客户端从大于1024的tcp/ip端口连接服务器；
                 sync：将数据同步写入内存缓冲区与磁盘中，效率低，但可以保证数据的一致性；
                 async：将数据先保存在内存缓冲区中，必要时才写入磁盘；
                 wdelay：检查是否有相关的写操作，如果有则将这些写操作一起执行，这样可以提高效率（默认设置）；
                 no_wdelay：若有写操作则立即执行，应与sync配合使用；
                 subtree：若输  目录是一个子目录，则nfs服务器将检查其父目录的权限(默认设置)；
                 no_subtree：即使输出目录是一个子目录，nfs服务器也不检查其父目录的权限，这样可以提高效率；

修改/etc/exports文件,定义NFS共享

#修改NFS配置文件,定义共享

[root@linuxidc ~]#vi /etc/exports

#定义向所有客户端共享/share目录,共享方式为可读可写

[root@linuxidc ~]#cat /etc/exports

/share *(rw,async,no_root_squash)

#创建/share这个共享目录

[root@linuxidc ~]#mkdir /share

#把共享目录的权限设定为所有用户都可读可写权限

[root@linuxidc ~]#chmod 766 /share

#把NFS加入到开机自启动选项中

[root@linuxidc ~]#systemctl enable nfs-server

Created symlink from
/etc/systemd/system/multi-user.target.wants/nfs-server.service to
/usr/lib/systemd/system/nfs-server.service.

#把RPCbind加入开机处启动选项中

[root@linuxidc ~]#systemctl enable rpcbind 

#启动RPCbind

[root@linuxidc ~]#systemctl start rpcbind

\#开启NFS服务

[root@linuxidc ~]#systemctl start nfs-server

 

\#查看NFS服务的状态 ,可以看到NFS服务已经在运行中
 [root@linuxidc ~]#systemctl status nfs-server
 ● nfs-server.service - NFS server and services
    Loaded: loaded (/usr/lib/systemd/system/nfs-server.service; enabled; vendor preset: disabled)
    Active: active (exited) since Sat 2017-06-03 09:22:02 CST; 37min ago
  Main PID: 23967 (code=exited, status=0/SUCCESS)
    CGroup: /system.slice/nfs-server.service

Jun 03 09:22:02 linuxidc systemd[1]: Starting NFS server and services...
 Jun 03 09:22:02 linuxidc systemd[1]: Started NFS server and services.
 \#查看本机共享的文件系统
 [root@linuxidc ~]#exportfs
 /share          <world>

三.客户端配置:

1.客户端关闭防火墙和selinux,方法同上.

2.客户端安装NFS软件包,并把NFS服务设为开机自启动,方法同上.

3.挂载共享的NFS文件系统

\#把192.168.16.29这个主机上的共享目录挂载到本机的/share上
 [root@linuxidc ~]#mount -t nfs 192.168.16.29:/share /share

 

\#查看是否已经挂载成功
 [root@linuxidc ~]#df -h

文件系统                 容量  已用  可用 已用% 挂载点

/dev/mapper/centos-root   17G  1.1G   16G    7% /

devtmpfs                 476M     0  476M    0% /dev

tmpfs                    488M     0  488M    0% /dev/shm

tmpfs                    488M  7.7M  480M    2% /run

tmpfs                    488M     0  488M    0% /sys/fs/cgroup

/dev/sda1               1014M  130M  885M   13% /boot

tmpfs                     98M     0   98M    0% /run/user/0

192.168.153.130:/share    17G  1.1G   16G    7% /share


 \#把共享目录写入系统挂载文件系统
 [root@linuxidc ~]#vi /etc/fstab
 [root@linuxidc ~]#cat /etc/fstab | grep media
 192.168.16.29:/share        /media      nfs4    defaults    0 0

四.测试:

1.在服务端共享目录中新建一个10M大小的文件

[root@linuxidc media]#cd /share

[root@linuxidc share]#ls

#在NFS共享目录上新建一个10M大小的文件,提示成功

[root@linuxidc share]#dd if=/dev/zero of=/share/f1 bs=1M count=10

10+0 records in

10+0 records out

10485760 bytes (10 MB) copied, 0.0351504 s, 298 MB/s

[root@linuxidc share]#ll -h

total 10M

-rw-r--r--. 1 root root 10M Jun  3 10:14
f1

2.在客户端新建另一个文件f2,同时尝试删除另一个文件f1

[root@linuxidc ~]#cd /media

[root@linuxidc media]#ls

f1

#在共享目录上新建一个文件f2,未报错

[root@linuxidc media]#touch f2

#删除存在的文件f1,未报错

[root@linuxidc media]#rm -f f1

3.在服务端查看共享目录中的文件

[root@linuxidc share]#ls
 f2