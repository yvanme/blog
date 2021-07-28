(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{432:function(s,a,e){"use strict";e.r(a);var t=e(27),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"centos7下zeppelin搭建"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#centos7下zeppelin搭建"}},[s._v("#")]),s._v(" Centos7下Zeppelin搭建")]),s._v(" "),e("h2",{attrs:{id:"介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[s._v("#")]),s._v(" 介绍")]),s._v(" "),e("p",[s._v("[TOC]")]),s._v(" "),e("p",[e("strong",[s._v("安装环境：")])]),s._v(" "),e("p",[e("strong",[s._v("system：CentOS7")])]),s._v(" "),e("p",[e("strong",[s._v("zeppelin:zeppelin-0.8.1-bin-all")])]),s._v(" "),e("h2",{attrs:{id:"jdk安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jdk安装"}},[s._v("#")]),s._v(" jdk安装")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("解压jdk包")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -zvxf jdk-8u201-linux-x64.tar.gz\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("配置环境变量")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#修改/etc下profile文件，加入以下配置并使用source /etc/profile命令使之生效")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#Java")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("JAVA_HOME")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/apps/jdk1.8.0_201\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CLASSPATH")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(".:"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/jre/lib/rt.jar:"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/lib/dt.jar:"),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/lib/tools.jar \n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$PATH")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/bin\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])])])]),s._v(" "),e("h2",{attrs:{id:"zeppelin安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#zeppelin安装"}},[s._v("#")]),s._v(" Zeppelin安装")]),s._v(" "),e("ol",[e("li",[e("p",[s._v("解压包")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -zvxf zeppelin-0.8.1-bin-all.tgz\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("启动")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("bin/zeppelin-daemon.sh start\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("访问服务")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("http://localhost:8080\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("停止")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("bin/zeppelin-daemon.sh stop\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])])])}),[],!1,null,null,null);a.default=n.exports}}]);