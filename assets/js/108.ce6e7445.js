(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{466:function(a,s,t){"use strict";t.r(s);var e=t(44),r=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"oracle创建表空间和用户"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#oracle创建表空间和用户"}},[a._v("#")]),a._v(" Oracle创建表空间和用户")]),a._v(" "),t("h2",{attrs:{id:"介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[a._v("#")]),a._v(" 介绍")]),a._v(" "),t("p",[a._v("[TOC]")]),a._v(" "),t("h3",{attrs:{id:"_1、创建表空间"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、创建表空间"}},[a._v("#")]),a._v(" 1、创建表空间")]),a._v(" "),t("div",{staticClass:"language-sql extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#dctm为表空间名称，路径自己来命名。")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("create")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("tablespace")]),a._v(" dctm datafile "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'/u01/app/oracle/dctm.ora'")]),a._v(" size "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1000")]),a._v("m"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),t("h3",{attrs:{id:"_2、创建用户"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、创建用户"}},[a._v("#")]),a._v(" 2、创建用户")]),a._v(" "),t("div",{staticClass:"language-sql extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#dmadmin 为用户名，dctm1234为密码，dctm 为表空间名")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("create")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("user")]),a._v(" dmadmin identified "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("by")]),a._v(" dctm1234 "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("default")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("tablespace")]),a._v(" dctm quota "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("500")]),a._v("m "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("on")]),a._v(" users"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n")])])]),t("h3",{attrs:{id:"_3、授权"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、授权"}},[a._v("#")]),a._v(" 3、授权")]),a._v(" "),t("div",{staticClass:"language-sql extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#给dmadmin用户授权")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("grant")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("all")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("privileges")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("to")]),a._v(" dmadmin"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),t("h3",{attrs:{id:"_4、登陆"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4、登陆"}},[a._v("#")]),a._v(" 4、登陆")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://static.oschina.net/uploads/img/201803/09234501_zKfW.png",alt:"输入图片说明"}})])])}),[],!1,null,null,null);s.default=r.exports}}]);