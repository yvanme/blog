# MAVEN剪除传递依赖

## 介绍

[TOC]

### 剪除axis2-transport-http包中的httpcore包

```xml
    <dependency>
      <groupId>org.apache.axis2</groupId>
      <artifactId>axis2-transport-http</artifactId>
      <version>${axis2.version}</version>
      <exclusions>
        <exclusion>

          <groupId>org.apache.httpcomponents</groupId>
          <artifactId>httpcore</artifactId>
        </exclusion>
      </exclusions>
    </dependency>
```