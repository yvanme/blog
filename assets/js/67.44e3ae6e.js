(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{425:function(s,a,t){"use strict";t.r(a);var e=t(44),l=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"centos7下zeppelin搭建"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#centos7下zeppelin搭建"}},[s._v("#")]),s._v(" Centos7下Zeppelin搭建")]),s._v(" "),t("h2",{attrs:{id:"介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[s._v("#")]),s._v(" 介绍")]),s._v(" "),t("p",[s._v("[TOC]")]),s._v(" "),t("p",[t("strong",[s._v("安装环境：")])]),s._v(" "),t("p",[t("strong",[s._v("system：CentOS7")])]),s._v(" "),t("p",[t("strong",[s._v("zeppelin:zeppelin-0.8.1-bin-all")])]),s._v(" "),t("h2",{attrs:{id:"jdk安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jdk安装"}},[s._v("#")]),s._v(" jdk安装")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("解压jdk包")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -zvxf jdk-8u201-linux-x64.tar.gz\n")])])])]),s._v(" "),t("li",[t("p",[s._v("配置环境变量")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#修改/etc下profile文件，加入以下配置并使用source /etc/profile命令使之生效")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#Java")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("JAVA_HOME")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/apps/jdk1.8.0_201\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CLASSPATH")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(".:"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/jre/lib/rt.jar:"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/lib/dt.jar:"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/lib/tools.jar \n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")])]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$PATH")]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/bin\n")])])])])]),s._v(" "),t("h2",{attrs:{id:"zeppelin安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#zeppelin安装"}},[s._v("#")]),s._v(" Zeppelin安装")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("解压包")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -zvxf zeppelin-0.8.1-bin-all.tgz\n")])])])]),s._v(" "),t("li",[t("p",[s._v("启动")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("bin/zeppelin-daemon.sh start\n")])])])]),s._v(" "),t("li",[t("p",[s._v("访问服务")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("http://localhost:8080\n")])])])]),s._v(" "),t("li",[t("p",[s._v("停止")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("bin/zeppelin-daemon.sh stop\n")])])])])])])}),[],!1,null,null,null);a.default=l.exports}}]);