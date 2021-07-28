# CentOS7mini安装vm-tools

## 介绍

[TOC]

**环境：CentOS7**

## 一、安装依赖包

1、依赖安装

```shell
yum -y install perl gcc gcc-c++ make cmake kernel kernel-headers kernel-devel net-tools
```

2、重启电脑

```shell
reboot#主要是为了确保kernel安装成功
```

## 二、加载vmware tools 到CentOS7光驱CD-ROM

1、通常情况下都是将设备目录 /dev/crrom 挂载到 /mnt/cdrom 目录,如果 /mnt 目录下不存在 cdrom 目录则创建

```shell
#不存在 /mnt/cdrom 则创建
mkdir -p /mnt/cdrom
#挂载目录
mount -t auto /dev/cdrom /mnt/cdrom
```

2、拷贝安装包到用户家目录

```shell
cp /mnt/cdrom/VMwareTools-10.3.21-14772444.tar.gz ~
```

3、解除挂载

```shell
umount /dev/cdrom
```

4、解压安装包

```shell
tar -zxvf VMwareTools-10.3.21-14772444.tar.gz
```

## 三、安装`VMware Tools`

1、安装VMware Tools

```shell
cd vmware-tools-distrib/
./vmware-install.pl 
```