(window.webpackJsonp=window.webpackJsonp||[]).push([[139],{497:function(t,s,a){"use strict";a.r(s);var n=a(44),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"jenkins构建发布vue项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jenkins构建发布vue项目"}},[t._v("#")]),t._v(" Jenkins构建发布Vue项目")]),t._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),a("p",[t._v("[TOC]")]),t._v(" "),a("p",[a("strong",[t._v("安装环境：")])]),t._v(" "),a("p",[a("strong",[t._v("system：CentOS7")])]),t._v(" "),a("h2",{attrs:{id:"jenkins构建发布vue项目-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jenkins构建发布vue项目-2"}},[t._v("#")]),t._v(" Jenkins构建发布Vue项目")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("安装nodejs插件")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/1.png",alt:""}})])]),t._v(" "),a("li",[a("p",[t._v("系统管理，全局工具配置，新增nodejs配置")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/2.png",alt:""}})])]),t._v(" "),a("li",[a("p",[t._v("新建自由流任务")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/3.png",alt:""}})])]),t._v(" "),a("li",[a("p",[t._v("配置任务")]),t._v(" "),a("p",[a("img",{attrs:{src:"images/4.png",alt:""}})]),t._v(" "),a("p",[a("img",{attrs:{src:"images/5.png",alt:"5"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"images/6.png",alt:"6"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"images/7.png",alt:"7"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"images/8.png",alt:"8"}})]),t._v(" "),a("p",[a("img",{attrs:{src:"images/9.png",alt:"9"}})])])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#shell")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" /var/lib/jenkins/workspace/NodeJS项目\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run build:prod\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" dist \n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" -rf dist.tar.gz   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#删除上次打包生成的压缩文件，打包的时候会自动删除整个dist文件夹无需这一步")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("tar")]),t._v(" -zcvf dist.tar.gz *   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#把新生成的项目打包tar包方便传输到远程服务器")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v("/\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#command")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" /apps/html\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#判断文件夹是否存在")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("target")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/usr/local/nginx/html/dist"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#判断文件夹是否存在 -d")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v(" -d "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$target")]),t._v('"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("then")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" -p "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$target")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("fi")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mv")]),t._v(" /apps/html/dist.tar.gz "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$target")]),t._v("/\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$target")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("tar")]),t._v(" -xf dist.tar.gz            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#进行解压")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" -rf  dist.tar.gz           "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#解压完成后删掉解压包")]),t._v("\n/usr/local/nginx/sbin/nginx -s reload\n")])])]),a("p",[t._v("5.nginx配置")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("location /dist/ {\n        root   html;\n    try_files $uri $uri/ /dist/index.html;\n        index  index.html index.htm;\n    }\n\t\nlocation /prod-api/{\n\tproxy_set_header Host $http_host;\n\tproxy_set_header X-Real-IP $remote_addr;\n\tproxy_set_header REMOTE-HOST $remote_addr;\n\tproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\tproxy_pass http://localhost:8080/;\n}\n")])])]),a("ol",{attrs:{start:"6"}},[a("li",[t._v("构建任务")])])])}),[],!1,null,null,null);s.default=e.exports}}]);