# Oracle创建表空间和用户

## 介绍

[TOC]

### 1、创建表空间

```sql
#dctm为表空间名称，路径自己来命名。
create tablespace dctm datafile '/u01/app/oracle/dctm.ora' size 1000m;
```

### 2、创建用户

```sql
#dmadmin 为用户名，dctm1234为密码，dctm 为表空间名
create user dmadmin identified by dctm1234 default tablespace dctm quota 500m on users; 
```

### 3、授权

```sql
#给dmadmin用户授权
grant all privileges to dmadmin;
```

### 4、登陆

![输入图片说明](https://static.oschina.net/uploads/img/201803/09234501_zKfW.png)