# Ngrok服务器搭建

##### 前言：

简单说一下什么是ngrok:

ngrok是一个内网穿透的解决方案,它使得你本地的服务器可以被局域网外的公网访问到
 ngork有服务端和客户端，服务端运行在公网服务器，客户端运行在本地服务器
 ngrok服务端会建立http和https服务，默认端口80/443，以及供ngrok客户端连接的服务，默认端口4443

它的工作流程如下：

访问端输入域名->DNS->ngrok服务端->请求映射到ngrok客户端->客户端返回响应到ngrok服务端->ngrok服务端返回响应到访问端

###### 本文环境：

centos7 64位 

go1.12.5

###### 准备工作：

1. 一台公网服务器
2. 一个域名，顶级或二级均可

**关于域名：我们声明两个概念：一个是基础域名，可以是顶级或者二级，它用来为ngrok服务端本身提供外部访问（ngrok客户端连接用）。二就是基于基础域名的二级或者三级域名，它用来映射到你的本地服务器，我称它为映射域名。它可以设置多个，这取决于你的需要。例如 \*abc.com\* 和 \*ngrok.abc.com\* / \*ngrok2.abc.com\*，每个映射域名对应一个ngrok客户端**

假设你的域名是 ***abc.com\*** (全文皆使用此假设)

如果你需要使用顶级域名作为基础域名，那么请将 ***abc.com\*** 泛解析到服务器ip，然后将你需要使用的二级域名通过A记录解析到服务器ip,例如  ***ngrok.abc.com\***

如果你需要使用二级域名，那么先将你的二级域名 ***xxx.abc.com\*** 通过A记录解析到服务器域名。然后将三级域名（比如 ***test.xxx\***）通过CNAME的方式解析到 ***xxx.abc.com\***，这次 ***xxx.abc.com\*** 便成为了客户端与服务端的连接域名，***test.xxx.abc.com\*** 则是映射域名

下面的教程我们使用 ***abc.com\*** 作为基础域名演示，请根据实际替换域名

###### 一，安装git和go以及其它依赖



```shell
#安装依赖
yum install gcc mercurial git bzr subversion golang
#离线安装go,这里选择1.12.5，安装1.15版本证书会报错
wget https://storage.googleapis.com/golang/go1.12.5.linux-amd64.tar.gz
#解压安装包
tar -C /root -xzf go1.12.5.linux-amd64.tar.gz
cd /root;vim ~/.bashrc
#设置环境变量
export GOPATH=/root/Go
export GOROOT=/root/go
export PATH=$PATH:$GOROOT/bin
#使配置生效
source ~/.bashrc
#查看go版本
go version
```

###### 二，下载源码 （项目早已停止更新，源码完全固定）

```php
git clone https://github.com/inconshreveable/ngrok.git
```

完成后会在当前目录生成ngrok目录

###### 三，生成证书（默认的证书是 ***ngrok.com\***，我们需要改成 ***abc.com\***）

生成：

```objectivec
cd ngrok  

mkdir cert 

cd cert

export NGROK_DOMAIN="abc.com"

openssl genrsa -out rootCA.key 2048

openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 5000 -out rootCA.pem

openssl genrsa -out device.key 2048

openssl req -new -key device.key -subj "/CN=$NGROK_DOMAIN" -out device.csr

openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000
```

替换(提示overwrite输入y)



```undefined
cp rootCA.pem ../assets/client/tls/ngrokroot.crt

cp device.crt ../assets/server/tls/snakeoil.crt

cp device.key ../assets/server/tls/snakeoil.key
```

###### 四：生成服务端与客户端

切换回ngrok目录

以下命令按需生成

```xml
<!--linux服务端/客户端-->
GOOS=linux GOARCH=386 make release-server (32位)
GOOS=linux GOARCH=amd64 make release-server（64位）

GOOS=linux GOARCH=386 make release-client (32位)
GOOS=linux GOARCH=amd64 make release-client（64位）

<!--Mac OS服务端/客户端-->
GOOS=darwin GOARCH=386 make release-server
GOOS=darwin GOARCH=amd64 make release-server

GOOS=darwin GOARCH=386 make release-client
GOOS=darwin GOARCH=amd64 make release-client


<!--windows服务端/客户端-->
GOOS=windows GOARCH=386 make release-server
GOOS=windows GOARCH=amd64 make release-server

GOOS=windows GOARCH=386 make release-client
GOOS=windows GOARCH=amd64 make release-client
```

所有程序都将生成在bin目录中，不同平台将建立不同的子目录

（当我生成linux 64位程序时，会直接保存在bin目录下无子目录。所以我个人推测，如果生成是当前系统的程序，则无子目录，直接存放于bin目录下。各位若有条件可验证下）

目录中，ngrok是客户端，ngrokd是服务端

```undefined
linux
bin/linux_386
bin/linux_amd64

mac os 
bin/darwin_386 
bin/darwin_amd64 

windows
bin/windows_386
bin/windows_amd64
```

启动服务器：



```bash
./bin/ngrokd -domain="$NGROK_DOMAIN"
```

其它配置：

-httpAddr=":80"  http服务的访问端口 默认80

-httpsAddr=":443" https服务的访问端口 默认443

-tunnelAddr=":4443" 客户端连接服务端的端口 默认4443

以上端口，如若与系统其他服务有冲突，开启服务时请自行配置其他端口，同时记得配置防火墙

###### 五：客户端配置与连接

通过sz或者ftp等方式将ngrok下载到你需要使用客户端的电脑中

新建配置文件ngrok.cfg

```xml
<!--配置服务端连接地址，也就是基础域名。端口则与服务端-tunnelAddr配置相同-->
server_addr: "abc.com:4443"  
trust_host_root_certs: false
```

运行客户端

```undefined
ngrok -config=ngrok.cfg -subdomain ngrok 80
```

###### 六：配置NGROK服务

新建配置文件/usr/lib/systemd/system/ngrok.service

```shell
[Unit]
Description=ngrok
After=network.target

[Service]
ExecStart=/root/ngrok/bin/ngrokd -tlsKey=/root/ngrok/cert/device.key -tlsCrt=/root/ngrok/cert/device.crt -domain=xiaoaixi.com -httpAddr=:80 -httpsAddr=:443

[Install]
WantedBy=multi-user.target
```

管理ngrok服务

```shell
#使配置生效
systemctl daemon-reload
#启动服务
systemctl start ngrok
#查看服务状态
systemctl status ngrok
```

###### 七：配置NGROK客户端

新建配置文件ngrok.cfg

```yaml
server_addr: "xiaoaixi.com:4443"
trust_host_root_certs: false
tunnels:
 nginx:
  subdomain: nginx
  proto:
   http: 80
 about:
  subdomain: about
  proto:
   http: 192.168.0.1:80
 ssh:
  remote_port: 2020
  proto:
   tcp: 22
```

启动客户端

```shell
#转发指定服务
ngrok.exe -config ngrok.cfg -log ngrok.log start nginx
#转发所有服务
ngrok.exe -config ngrok.cfg -log ngrok.log start-all
```

配置为window服务

```shell
#注册服务
sc create ngrok binPath= "cmd.exe /c start C:\ngrok\ngrok.bat" start= auto displayname= "ngrok"
#删除服务
sc delete ngrok

shell:startup
```



