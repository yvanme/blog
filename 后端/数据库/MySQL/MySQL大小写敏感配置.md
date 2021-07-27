# MySQL大小写敏感配置

## 介绍

[TOC]

## 1.mysql大小写敏感配置

mysql大小写敏感配置相关的两个参数，lower_case_file_system 和 lower_case_table_names。

查看当前mysql的大小写敏感配置

```sql
show global variables like '%lower_case%';

+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_file_system | ON    |
| lower_case_table_names | 0     |
+------------------------+-------+
```

lower_case_file_system
表示当前系统文件是否大小写敏感，只读参数，无法修改。

ON  大小写不敏感 
OFF 大小写敏感 


lower_case_table_names
表示表名是否大小写敏感，可以修改。

lower_case_table_names = 0时，mysql会根据表名直接操作，大小写敏感。 
lower_case_table_names = 1时，mysql会先把表名转为小写，再执行操作。 


设置lower_case_table_names的值

打开my.cnf文件，加入以下语句后重启。

lower_case_table_names = 0 或 lower_case_table_names = 1


## 2.测试lower_case_table_names为0和1时的不同情况

创建表 user

```sql
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


1.设置lower_case_table_names = 0
表名与创建时大小写一致

```sql
select count(*) from user;
+----------+
| count(*) |
+----------+
|        0 |
+----------+
```

表名与创建时大小写不一致

```sql
select count(*) from User;
ERROR 1146 (42S02): Table 'user.User' doesn't exist
```

lower_case_table_names=0时，表名大小写敏感。 


2.设置lower_case_table_names = 1
表名与创建时大小写一致

```sql
select count(*) from user;
+----------+
| count(*) |
+----------+
|        0 |
+----------+
```

表名与创建时大小写不一致

```sql
select count(*) from User;
+----------+
| count(*) |
+----------+
|        0 |
+----------+
```

lower_case_table_names=1时，表名大小写不敏感。 


3.设置lower_case_table_names=1时，原来在lower_case_table_names=0时创建的表提示不存在的解决方法
在lower_case_table_names=0时使用大小写混用创建表名，再设置lower_case_table_names=1后，原创建的表使用时会提示不存在。 


演示
首先设置lower_case_table_names=0

创建表 User(大小写混用)

```sql
CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

show tables;
+----------------+
| Tables_in_user |
+----------------+
| User           |
+----------------+
```

再设置lower_case_table_names=1

执行查询，不管表名是大写还是小写，都提示表不存在

```sql
select * from User;
ERROR 1146 (42S02): Table 'user.user' doesn't exist

select * from user;
ERROR 1146 (42S02): Table 'user.user' doesn't exist

select * from USER;
ERROR 1146 (42S02): Table 'user.user' doesn't exist
```

因为lower_case_table_names=1时，会先把表名转为小写后再操作，而文件中根本不存在小写的表名文件，因此出错。 

解决方法：
如果要将lower_case_table_names从0修改为1时，应先对旧数据表的表名进行处理，把所有数据库的表名先改为小写，最后再设置lower_case_table_names为1，否则会出现上述的问题。 

## 总结

操作系统不同导致大小写敏感不一致。我们在开发时，应该按大小写敏感的原则去开发，这样可以使开发的程序兼容不同的操作系统。因此，建议在开发测试环境下把lower_case_table_names的值设为0，便于在开发中就严格控制代码大小写敏感，提高代码的兼容和严谨。

## 参考链接

[MySQL大小写敏感配置](https://blog.csdn.net/fdipzone/article/details/73692929)