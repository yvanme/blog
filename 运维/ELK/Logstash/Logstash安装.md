Logstash安装

## 介绍

[TOC]

**主机配置:**

| 主机名 | IP地址          | JDK       |
| ------ | --------------- | --------- |
| worker | 192.168.153.130 | 1.8.0_201 |

**安装目录：/apps/logstash-7.8.1**

**版本：/apps/logstash-7.8.1**

​      **1.Logstash安装**
​      **1.1 上传安装文件到apps目录**

​      **1.2** **解压安装文件**

```
tar -zvxf logstash-7.8.1.tar.gz
```

​     **1.3修改配置文件**

```json
# Sample Logstash configuration for creating a simple
# Beats -> Logstash -> Elasticsearch pipeline.
#配置从控制台输入
input { stdin { } }
#配置过滤规则
filter {
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}" }
  }
  date {
    match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]
  }
}
#配置从控制台输出
output {
   stdout { 
    codec => json
   }
}

#input {
#  beats {
#    port => 5044
#  }
#}

#output {
#  elasticsearch {
#    hosts => ["http://localhost:9200"]
#    index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
#    #user => "elastic"
#    #password => "changeme"
#  }
#}

```

  **1.4启动logstash**

```
bin/logstash -f logstash.conf
```