(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{394:function(e,t,s){"use strict";s.r(t);var a=s(44),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"zookeeper安装-单机版"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#zookeeper安装-单机版"}},[e._v("#")]),e._v(" Zookeeper安装（单机版）")]),e._v(" "),s("h2",{attrs:{id:"介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[e._v("#")]),e._v(" 介绍")]),e._v(" "),s("p",[e._v("[TOC]")]),e._v(" "),s("p",[s("strong",[e._v("环境：CentOS7、zookeeper-3.4.14版本")])]),e._v(" "),s("p",[s("strong",[e._v("安装目录：/apps/zookeeper-3.4.14")])]),e._v(" "),s("p",[s("strong",[e._v("备注：zookeeper依赖java，因此在安装zookeeper之前需要安装好java环境")])]),e._v(" "),s("p",[e._v("1、 官网(https://zookeeper.apache.org/releases.html#download)下载Zookeeper。下载地址："),s("a",{attrs:{href:"http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.14/zookeeper-3.4.14.tar.gz",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.14/zookeeper-3.4.14.tar.gz"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("2、 将下载的Zookeeper文件上传到CentOS系统中。")]),e._v(" "),s("p",[e._v("3、 解压文件")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("tar")]),e._v(" -zxvf zookeeper-3.4.14.tar.gz\n")])])]),s("p",[e._v("4、进入到conf目录")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" zookeeper-3.4.14/conf\n")])])]),s("p",[e._v("5、将zoo_sample.cfg拷贝一份为zoo.cfg")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("cp")]),e._v(" zoo_sample.cfg zoo.cfg\n")])])]),s("p",[e._v("6、修改zoo.cfg配置文件")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The number of milliseconds of each tick")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("tickTime")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("2000")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The number of ticks that the initial ")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# synchronization phase can take")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("initLimit")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("10")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The number of ticks that can pass between ")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# sending a request and getting an acknowledgement")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("syncLimit")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("5")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# the directory where the snapshot is stored.")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# do not use /tmp for storage, /tmp here is just ")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# example sakes.")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#数据存放目录")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("dataDir")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("/tmp/zookeeper\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# the port at which the clients will connect")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#服务的端口号")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("clientPort")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("2181")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# the maximum number of client connections.")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# increase this if you need to handle more clients")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#maxClientCnxns=60")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Be sure to read the maintenance section of the ")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# administrator guide before turning on autopurge.")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# http://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_maintenance")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The number of snapshots to retain in dataDir")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#autopurge.snapRetainCount=3")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Purge task interval in hours")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v('# Set to "0" to disable auto purge feature')]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#autopurge.purgeInterval=1")]),e._v("\n\n")])])]),s("p",[e._v("7、设置环境变量")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#修改/etc/profile文件")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("vi")]),e._v(" /etc/profile\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#加入以下配置")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("export")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("ZOOKEEPER_INSTALL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("/apps/zookeeper-3.4.14\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("export")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s("span",{pre:!0,attrs:{class:"token environment constant"}},[e._v("PATH")])]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token environment constant"}},[e._v("$PATH")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(":")]),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$ZOOKEEPER_INSTALL")]),e._v("/bin\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#使配置生效")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("source")]),e._v(" /etc/profile\n")])])]),s("p",[e._v("8、启动zookeeper")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("zkServer.sh start\n")])])]),s("p",[e._v("9、查看zookeeper状态")]),e._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[e._v("zkServer.sh status\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);