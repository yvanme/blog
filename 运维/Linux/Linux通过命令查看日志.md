# Linux通过命令查看日志

## 介绍

[TOC]

**环境：CentOS7**

**查看日志的指定行数**

```shell
#查看文件
cat a.txt
#查看文件，并对输出的所有行编号
cat -n a.txt

#显示前面10行
head a.txt
#指定显示前面几行
head -n 5 a.txt

#显示后面10行
tail a.txt
#指定显示后面几行
tail -n 20 a.txt
#从指定行数开始显示到后面几行
tail -n +20 a.txt

#从第10行开始显示到15行
cat a.txt |head -n 15 |tail -n +10
cat a.txt |tail -n +10|head -n 15
#从前15行开始，显示倒数10行
cat a.txt |head -n 15 |tail -n 10
```

**查看文件任意几行的数据**

```shell
#显示文件里匹配995字串那行以及上下5行
cat a.txt | grep -C 5 '995' 
#显示文件里匹配995字串那行以及前5行
cat a.txt | grep -B 5 '995' 
#显示文件里匹配995字串那行以及后5行
cat a.txt | grep -A 5 '995' 
```

