(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{489:function(t,s,a){"use strict";a.r(s);var n=a(44),p=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("Logstash安装")]),t._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),a("p",[t._v("[TOC]")]),t._v(" "),a("p",[a("strong",[t._v("主机配置:")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("主机名")]),t._v(" "),a("th",[t._v("IP地址")]),t._v(" "),a("th",[t._v("JDK")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("worker")]),t._v(" "),a("td",[t._v("192.168.153.130")]),t._v(" "),a("td",[t._v("1.8.0_201")])])])]),t._v(" "),a("p",[a("strong",[t._v("安装目录：/apps/logstash-7.8.1")])]),t._v(" "),a("p",[a("strong",[t._v("版本：/apps/logstash-7.8.1")])]),t._v(" "),a("p",[t._v("​      "),a("strong",[t._v("1.Logstash安装")]),t._v("\n​      "),a("strong",[t._v("1.1 上传安装文件到apps目录")])]),t._v(" "),a("p",[t._v("​      "),a("strong",[t._v("1.2")]),t._v(" "),a("strong",[t._v("解压安装文件")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("tar -zvxf logstash-7.8.1.tar.gz\n")])])]),a("p",[t._v("​     "),a("strong",[t._v("1.3修改配置文件")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[t._v("# Sample Logstash configuration for creating a simple\n# Beats -> Logstash -> Elasticsearch pipeline.\n#配置从控制台输入\ninput "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" stdin "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n#配置过滤规则\nfilter "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  grok "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    match => "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"message"')]),t._v(" => "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"%{COMBINEDAPACHELOG}"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  date "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    match => "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"timestamp"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dd/MMM/yyyy:HH:mm:ss Z"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n#配置从控制台输出\noutput "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   stdout "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    codec => json\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n#input "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n#  beats "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n#    port => "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5044")]),t._v("\n#  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n#"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n#output "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n#  elasticsearch "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n#    hosts => "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://localhost:9200"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n#    index => "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"')]),t._v("\n#    #user => "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"elastic"')]),t._v("\n#    #password => "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"changeme"')]),t._v("\n#  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n#"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),a("p",[a("strong",[t._v("1.4启动logstash")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("bin/logstash -f logstash.conf\n")])])])])}),[],!1,null,null,null);s.default=p.exports}}]);