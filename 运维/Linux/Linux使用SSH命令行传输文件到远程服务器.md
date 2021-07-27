# Linux使用SSH命令行传输文件到远程服务器

## 介绍

[TOC]

**环境：CentOS7**

## 1、上传本地文件到服务器

```
scp /path/filename username@servername:/path/
```

例：把本机/var/www/目录下的test.php文件上传到192.168.0.101这台服务器上的/var/www/目录中

```
scp /var/www/test.php root@192.168.0.101:/var/www/
```

## 2、从服务器上下载文件

下载文件我们经常使用wget，但是如果没有http服务，如何从服务器上下载文件呢？
scp username@servername:/path/filename /var/www/local_dir（本地目录）

```
scp username@servername:/path/filename /var/www/local_dir
```

例： 把192.168.0.101上的/var/www/test.txt 的文件下载到/var/www/local_dir（本地目录）

```
scp root@192.168.0.101:/var/www/test.txt
```

## 3、从服务器下载整个目录

```
scp -r username@servername:/var/www/remote_dir/（远程目录） /var/www/local_dir（本地目录）
```

例：

```
scp -r root@192.168.0.101:/var/www/test /var/www/
```

## 4、上传目录到服务器

```
scp -r local_dir username@servername:remote_dir
```

例： 把当前目录下的test目录上传到服务器的/var/www/ 目录

```
scp -r test root@192.168.0.101:/var/www/
```

