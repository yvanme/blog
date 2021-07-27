# CentOS7查看DNS和网关

## 介绍

[TOC]

**环境：CentOS7**

1. 查看本机网关

   ```
   route -n
   ```

2. 查看DNS。

   ```shell
   cat /etc/resolv.conf。
   ```

## 备注

如提示“bash: route: command not found”，运行以下命令：

```
yum install net-tools
```

