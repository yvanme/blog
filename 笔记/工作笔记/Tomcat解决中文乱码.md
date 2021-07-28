# Tomcat解决中文乱码

## 介绍

[TOC]

### 对Tomcat_HOME/conf/server.xml文件进行配置，在配置文件中加入URIEncoding="UTF-8"，如下

```xml
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443"  URIEncoding="UTF-8"/>
```