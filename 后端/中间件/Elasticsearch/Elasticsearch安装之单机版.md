# Centos7下Elasticsearch环境搭建（单机）

## 介绍

[TOC]

**安装环境：**

**system：CentOS7**

**jdk:jdk1.8.0_221**

**elasticsearch:elasticsearch-7.3.0**

## jdk安装

1. 解压jdk包

   ```shell
   tar -zvxf jdk-8u201-linux-x64.tar.gz
   ```

2. 配置环境变量

   ```shell
   #修改/etc下profile文件，加入以下配置并使用source /etc/profile命令使之生效
   
   #Java
   export JAVA_HOME=/app/jdk1.8.0_221
   export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
   export PATH=$PATH:$JAVA_HOME/bin
   ```

## Elasticsearch安装

1. 解压spark包

   ```shell
   tar -zvxf elasticsearch-7.3.0-linux-x86_64.tar.gz
   ```

2. 配置Elasticsearch

   - 进入config 目录,编辑 elasticsearch.yml

     ```yml
     # ======================== Elasticsearch Configuration =========================
     #
     # NOTE: Elasticsearch comes with reasonable defaults for most settings.
     #       Before you set out to tweak and tune the configuration, make sure you
     #       understand what are you trying to accomplish and the consequences.
     #
     # The primary way of configuring a node is via this file. This template lists
     # the most important settings you may want to configure for a production cluster.
     #
     # Please consult the documentation for further information on configuration options:
     # https://www.elastic.co/guide/en/elasticsearch/reference/index.html
     #
     # ---------------------------------- Cluster -----------------------------------
     #
     # Use a descriptive name for your cluster:
     #
     #cluster.name: my-application
     #
     # ------------------------------------ Node ------------------------------------
     #
     # Use a descriptive name for the node:
     #
     #node.name: node-1
     #
     # Add custom attributes to the node:
     #
     #node.attr.rack: r1
     #
     # ----------------------------------- Paths ------------------------------------
     #
     # Path to directory where to store the data (separate multiple locations by comma):
     #
     #path.data: /path/to/data
     #
     # Path to log files:
     #
     #path.logs: /path/to/logs
     #
     # ----------------------------------- Memory -----------------------------------
     #
     # Lock the memory on startup:
     #
     #bootstrap.memory_lock: true
     #
     # Make sure that the heap size is set to about half the memory available
     # on the system and that the owner of the process is allowed to use this
     # limit.
     #
     # Elasticsearch performs poorly when the system is swapping the memory.
     #
     # ---------------------------------- Network -----------------------------------
     #
     # Set the bind address to a specific IP (IPv4 or IPv6):
     #
     #配置IP为本机IP
     network.host: 192.168.153.134
     #network.host: 0.0.0.0
     #
     # Set a custom port for HTTP:
     #
     #配置访问端口，默认为9200
     http.port: 9200
     #
     # For more information, consult the network module documentation.
     #
     # --------------------------------- Discovery ----------------------------------
     #
     # Pass an initial list of hosts to perform discovery when this node is started:
     # The default list of hosts is ["127.0.0.1", "[::1]"]
     #
     #discovery.seed_hosts: ["host1", "host2"]
     #
     # Bootstrap the cluster using an initial set of master-eligible nodes:
     #
     #cluster.initial_master_nodes: ["node-1", "node-2"]
     #worker为主机名
     cluster.initial_master_nodes: ["worker"]
     #
     # For more information, consult the discovery and cluster formation module documentation.
     #
     # ---------------------------------- Gateway -----------------------------------
     #
     # Block initial recovery after a full cluster restart until N nodes are started:
     #
     #gateway.recover_after_nodes: 3
     #
     # For more information, consult the gateway module documentation.
     #
     # ---------------------------------- Various -----------------------------------
     #
     # Require explicit names when deleting indices:
     #
     #action.destructive_requires_name: true
     
     ```

3. 启动Elasticsearch

   - 进入bin 目录，执行如下命令

     ```
     ./elasticsearch
     ```
     
   - 后台启动

     ```
     ./elasticsearch -d
     ```

4. 浏览器访问http://localhost:9200/

## Elasticsearch head安装

1. 安装node

2. 安装git

3. 下载head

   ```shell
   git clone git://github.com/mobz/elasticsearch-head.git
   ```

4. 安装head

   ```shell
   cd elasticsearch-head
   npm install
   ```

5. 修改Gruntfile.js配置,增加hostname:‘*‘配置(可选)

   ```json
   		connect: {
   			server: {
   				options: {
   					port: 9100,
   					base: '.',
   					hostname:'*',
   					keepalive: true
   				}
   			}
   		}
   ```

6. 修改head/_site/app.js文件,修改head连接es的地址（修改localhost为本机的IP地址）

   ```json
   		init: function(parent) {
   			this._super();
   			this.prefs = services.Preferences.instance();
   			this.base_uri = this.config.base_uri || this.prefs.get("app-base_uri") || "http://192.168.153.134:9200";
   			if( this.base_uri.charAt( this.base_uri.length - 1 ) !== "/" ) {
   				// XHR request fails if the URL is not ending with a "/"
   				this.base_uri += "/";
   			}
   			if( this.config.auth_user ) {
   				var credentials = window.btoa( this.config.auth_user + ":" + this.config.auth_password );
   				$.ajaxSetup({
   					headers: {
   						"Authorization": "Basic " + credentials
   					}
   				});
   			}
   			this.cluster = new services.Cluster({ base_uri: this.base_uri });
   			this._clusterState = new services.ClusterState({
   				cluster: this.cluster
   			});
   
   			this._header = new ui.Header({ cluster: this.cluster, clusterState: this._clusterState });
   			this.$body = $.joey( this._body_template() );
   			this.el = $.joey(this._main_template());
   			this.attach( parent );
   			this.instances = {};
   			this.el.find(".uiApp-headerMenuItem:first").click();
   			if( this.config.dashboard ) {
   				if( this.config.dashboard === "cluster" ) {
   					var page = this.instances["ClusterOverview"];
   					page._refreshButton.set( 5000 );
   				}
   			}
   		}
   ```

7. 修改elasticsearch.yml，增加跨域的配置(需要重启es才能生效)

   ```
   http.cors.enabled: true
   http.cors.allow-origin: "*"
   ```

8. 启动

   ```shell
   npm run start
   ```

## Elasticsearch安装错误解决

1. can not run elasticsearch as root

   解决方法：

   别无它法只有新建个新的用户，使用该用户启动

   

2. Caused by: java.net.BindException: 无法指定被请求的地址

   解决方法：

   配置elasticsearch.yml，加入以下配置：

   ```shell
   #配置IP为本机IP
   network.host: 192.168.153.134
   #或
   network.host: 0.0.0.0
   ```

3. ERROR: [4] bootstrap checks failed
   [1]: max file descriptors [4096] for elasticsearch process is too low, increase to at least [65535]
   [2]: max number of threads [3795] for user [es] is too low, increase to at least [4096]
   [3]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
   [4]: the default discovery settings are unsuitable for production use; at least one of [discovery.seed_hosts, discovery.seed_providers, cluster.initial_master_nodes] must be configured

   解决方法：

   [1]错误1解决方法：

   修改/etc/security/limits.conf文件，加入以下配置（记得*号别漏掉）

   ```shell
   *               soft    nofile          65536
   *               hard    nofile          65536
   ```

   查看命令

   ```shell
   ulimit -Hn
   ulimit -Sn
   ```

   [2]错误2解决方法：

   修改/etc/security/limits.conff文件,加入以下配置（记得*号别漏掉）

   ```shell
   *               soft    nofile          65536
   *               hard    nofile          65536
   ```

   查看命令

   ```shell
   ulimit -Hn
   ulimit -Sn
   ```

   [3]错误3解决方法：

   修改/etc/sysctl.conf文件,加入以下配置

   ```shell
   vm.max_map_count=262144
   ```

   执行以下命令使之生效

   ```shell
   sysctl -p
   ```

   [4]错误4解决方法：

   配置elasticsearch.yml，加入以下配置，worker为主机名

   ```shell
   cluster.initial_master_nodes: ["worker"]
   ```