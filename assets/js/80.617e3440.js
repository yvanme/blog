(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{438:function(t,s,a){"use strict";a.r(s);var e=a(44),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"centos7下使用docker安装mysql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#centos7下使用docker安装mysql"}},[t._v("#")]),t._v(" CentOS7下使用Docker安装MySQL")]),t._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),a("p",[t._v("[TOC]")]),t._v(" "),a("p",[t._v("1、拉取镜像")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[t._v("docker pull mysql\n")])])]),a("p",[t._v("2、启动MySQL挂载存储目录")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[t._v("docker run --privileged=true --name mysql -p 3306:3306 -v /dctm/mysql/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=dctm1234 -d mysql:5.7\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);