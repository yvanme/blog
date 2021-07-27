# maven插件构建docker镜像并推送到私有仓库

## 介绍

[TOC]

**主机配置:**

| 主机名 | IP地址          |
| ------ | --------------- |
| worker | 192.168.153.100 |

**系统：CentOS7**

**版本：19.03.5**

**1. maven插件构建docker镜像并推送到私有仓库**

-  maven新增配置

```xml
        <docker.repostory>www.ddedds.com</docker.repostory>
        <docker.registry.name>test</docker.registry.name>
```

```xml
    <build>
        <finalName>app</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>com.spotify</groupId>
                <artifactId>docker-maven-plugin</artifactId>
                <version>1.0.0</version>
                <configuration>
                    <imageName>${docker.repostory}/${docker.registry.name}/${project.artifactId}:${project.version}</imageName>
                    <!-- 指定Dockerfile所在的路径 -->

                    <dockerDirectory>${project.basedir}/src/main/docker</dockerDirectory>
                    <dockerHost>http://www.ddedds.com:2375</dockerHost>
                    <resources>
                        <resource>
                            <targetPath>/</targetPath>
                            <directory>${project.build.directory}</directory>
                            <include>${project.build.finalName}.jar</include>
                        </resource>
                    </resources>
                    <serverId>docker-harbor</serverId>
                    <registryUrl>${docker.repostory}</registryUrl>
                    <pushImage>true</pushImage>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

-  修改maven setting.xml，增加如下配置

```xml
    <server>
		<id>>docker-harbo</id>
		<username>dmadmin</username>
		<password>123456</password>
		<configuration>
		  <email>123456@qq.com</email>
		</configuration>
	</server>
```

-  Dockerfile(存放路径与pom中配置路径一致)

```shell
FROM openjdk:8-jdk-alpine
VOLUME /tmp
RUN mkdir /app
RUN mkdir /app/file
RUN mkdir /app/avatar
#captcher 字体包(解决docker下openjdk没有字体包问题)
RUN set -xe \
&& apk --no-cache add ttf-dejavu fontconfig

ADD app.jar app.jar
ENTRYPOINT [ "java",  "-jar", "/app.jar" ]
```

- 推送镜像

```shell
mvn clean package -Dmaven.test.skip=true docker:build -DpushImage
```

