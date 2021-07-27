# Nginx配置

## 介绍

[TOC]

**环境：CentOS7**

## 一、配置Nginx

1、nginx.conf配置

```shell
        #路由配置
        location / {
            root   html;
	        try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
        #代理配置
		location /prod-api/{
			proxy_set_header Host $http_host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header REMOTE-HOST $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_pass http://localhost:8080/;
		}
```

2、nginx.conf配置样例

```shell
        location / {
            root   html;
            index  index.html index.htm;
        }
        location /demo {
            root   html;#与根路由相同，都是html,项目放在html文件夹下
            index  index.html index.htm;
        }
        location /tomcat/ {#末尾/不能忽略，否则访问会省略tomcat
            proxy_pass http://127.0.0.1:8080/;#末尾/不能忽略否则访问不了
            index  index.html index.htm index.jsp;#反向代理
        }
```
