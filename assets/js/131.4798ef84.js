(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{496:function(s,t,n){"use strict";n.r(t);var a=n(27),e=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[s._v("Logstash安装")]),s._v(" "),n("h2",{attrs:{id:"介绍"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[s._v("#")]),s._v(" 介绍")]),s._v(" "),n("p",[s._v("[TOC]")]),s._v(" "),n("p",[n("strong",[s._v("主机配置:")])]),s._v(" "),n("table",[n("thead",[n("tr",[n("th",[s._v("主机名")]),s._v(" "),n("th",[s._v("IP地址")]),s._v(" "),n("th",[s._v("JDK")])])]),s._v(" "),n("tbody",[n("tr",[n("td",[s._v("worker")]),s._v(" "),n("td",[s._v("192.168.153.130")]),s._v(" "),n("td",[s._v("1.8.0_201")])])])]),s._v(" "),n("p",[n("strong",[s._v("安装目录：/apps/logstash-7.8.1")])]),s._v(" "),n("p",[n("strong",[s._v("版本：/apps/logstash-7.8.1")])]),s._v(" "),n("p",[s._v("​      "),n("strong",[s._v("1.Logstash安装")]),s._v("\n​      "),n("strong",[s._v("1.1 上传安装文件到apps目录")])]),s._v(" "),n("p",[s._v("​      "),n("strong",[s._v("1.2")]),s._v(" "),n("strong",[s._v("解压安装文件")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("tar -zvxf logstash-7.8.1.tar.gz\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("​     "),n("strong",[s._v("1.3修改配置文件")])]),s._v(" "),n("div",{staticClass:"language-json line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-json"}},[n("code",[s._v("# Sample Logstash configuration for creating a simple\n# Beats -> Logstash -> Elasticsearch pipeline.\n#配置从控制台输入\ninput "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" stdin "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n#配置过滤规则\nfilter "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  grok "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    match => "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"message"')]),s._v(" => "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%{COMBINEDAPACHELOG}"')]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  date "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    match => "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"timestamp"')]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dd/MMM/yyyy:HH:mm:ss Z"')]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n#配置从控制台输出\noutput "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n   stdout "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n    codec => json\n   "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n#input "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n#  beats "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n#    port => "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("5044")]),s._v("\n#  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n#"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n#output "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n#  elasticsearch "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n#    hosts => "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://localhost:9200"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n#    index => "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"')]),s._v("\n#    #user => "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"elastic"')]),s._v("\n#    #password => "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"changeme"')]),s._v("\n#  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n#"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br")])]),n("p",[n("strong",[s._v("1.4启动logstash")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("bin/logstash -f logstash.conf\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);