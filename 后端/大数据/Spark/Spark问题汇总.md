# Spark问题汇总

## 介绍

[TOC]

**环境：CentOS7、spark-2.4.3版本**



问题：window下运行spark程序报[entry in command string: null chmod 0644]错误

解决方法：

下载hadoop.dll文件,并拷贝到c:\windows\system32目录中,重新运行代码程序即可



问题：window下运行spark程序报Could not locate executable null\bin\winutils.exe in the Hadoop binaries.错误

解决方法：

下载hadoop-common，下载地址：https://github.com/SweetInk/hadoop-common-bin

方法一：

配置环境变量HADDOOP_HOME

方法二：

在代码中加入：

```
        System.setProperty("hadoop.home.dir", "D:\\yvanme\\study\\workspace\\idea3\\notes-document\\后端\\大数据\\Spark\\spark-sample\\src\\test\\resources\\2.7.3");
```