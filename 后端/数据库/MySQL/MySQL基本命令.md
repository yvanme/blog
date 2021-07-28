# MySQL基本命令

## 介绍

[TOC]

## MySQL查看版本号的五种方式

### 1 命令行模式登录MySQL

```html
[root@localhost ~]# mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 13
Server version: 5.7.12-5 Percona Server (GPL), Release 5, Revision a2f663a

Copyright (c) 2009-2016 Percona LLC and/or its affiliates
Copyright (c) 2000, 2016, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```

### 2 命令行下使用：status

```html
mysql> status;
--------------
mysql  Ver 14.14 Distrib 5.7.12-5, for Linux (x86_64) using  6.2

Connection id:      13
Current database:   
Current user:       root@localhost
SSL:            Not in use
Current pager:      stdout
Using outfile:      ''
Using delimiter:    ;
Server version:     5.7.12-5 Percona Server (GPL), Release 5, Revision a2f663a
Protocol version:   10
Connection:     Localhost via UNIX socket
Server characterset:    latin1
Db     characterset:    latin1
Client characterset:    utf8
Conn.  characterset:    utf8
UNIX socket:        /var/lib/mysql/mysql.sock
Uptime:         14 days 4 hours 37 min 53 sec

Threads: 1  Questions: 64  Slow queries: 0  Opens: 97  Flush tables: 1  Open tables: 90  Queries per second avg: 0.000
--------------
```

### 3 使用系统函数：version()

```html
mysql> select version();
+-----------+
| version() |
+-----------+
| 5.7.12-5  |
+-----------+
1 row in set (0.03 sec)
```

### 4 mysql --version

```html
[root@localhost ~]# mysql --version
mysql  Ver 14.14 Distrib 5.7.12-5, for Linux (x86_64) using  6.2
```

### 5 包管理工具（根据不同系统 rh系列或bsd系列）

```html
rpm -qa|grep mysql
```