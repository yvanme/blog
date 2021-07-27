# Nginx安装

[TOC]

**环境：CentOS7、nginx-1.18.0版本**

**安装目录：/apps/nginx-1.18.0**

1、 官网(http://nginx.org/en/download.html)下载nginx。下载地址：<http://59.80.44.49/nginx.org/download/nginx-1.18.0.tar.gz>

2、 将下载的nginx文件上传到CentOS系统中。

3、 解压文件

```
tar -zxvf nginx-1.18.0.tar.gz
```

4、安装依赖

```
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

5、安装nginx

```
#进入nginx目录
cd /apps/nginx-1.18.0
#执行命令
./configure
#执行make命令
make
#执行make install命令
make install
```

6、配置文件设置

```
listen 80;代表监听80端口
server_name xxx.com;代表外网访问的域名
location / {};代表一个过滤器，/匹配所有请求，我们还可以根据自己的情况定义不同的过滤，比如对静态文件js、css、image制定专属过滤
root html;代表站点根目录
index index.html;代表默认主页
```

7、启动nginx

```java
#默认安装目录为/usr/local/nginx，进入sbin目录
cd /usr/local/nginx/sbin
#启动命令
./nginx
#停止命令
./nginx -s stop
#重启命令
./nginx -s reload
```

8、访问nginx

```
http://ip地址:端口
```

9、设置开机配置

- 在/lib/systemd/system目录下，创建nginx.service文件

  ```
  [Unit]
  Description=nginx service
  After=network.target 
     
  [Service] 
  Type=forking 
  ExecStart=/usr/local/nginx/sbin/nginx
  ExecReload=/usr/local/nginx/sbin/nginx -s reload
  ExecStop=/usr/local/nginx/sbin/nginx -s quit
  PrivateTmp=true 
     
  [Install] 
  WantedBy=multi-user.target
  ```

- 设置开机启动

  ```
  #加载开机配置
  systemctl daemon-reload
  #设置开机启动
  systemctl enable nginx
  #如果需要关闭开机启动
  systemctl disable nginx
  ```

- Nginx服务管理

  ```
  #启动nginx服务
  systemctl start nginx.service　         
  #停止服务
  systemctl stop nginx.service　          
  #重新启动服务
  systemctl restart nginx.service　       
  #查看所有已启动的服务
  systemctl list-units --type=service     
  #查看服务当前状态
  systemctl status nginx.service          
  #设置开机自启动
  systemctl enable nginx.service          
  #停止开机自启动
  systemctl disable nginx.service         
  ```

  

