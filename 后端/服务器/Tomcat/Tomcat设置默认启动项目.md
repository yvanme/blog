# Tomcat设置默认启动项目

## 介绍

[TOC]

修改配置文件server.xml，添加

<Context path="" docBase="Cluster" debug="0" reloadable="true"/>节点：

```xml
<Host name="localhost" appBase="webapps"
            unpackWARs="true" autoDeploy="true"
            xmlValidation="false" xmlNamespaceAware="false">
<Context path="" docBase="bootdo" debug="0" reloadable="true"/>
```

