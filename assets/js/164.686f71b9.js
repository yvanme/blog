(window.webpackJsonp=window.webpackJsonp||[]).push([[164],{522:function(s,a,t){"use strict";t.r(a);var e=t(44),r=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"centos7配置管理员用户"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#centos7配置管理员用户"}},[s._v("#")]),s._v(" CentOS7配置管理员用户")]),s._v(" "),t("h2",{attrs:{id:"介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[s._v("#")]),s._v(" 介绍")]),s._v(" "),t("p",[s._v("[TOC]")]),s._v(" "),t("p",[t("strong",[s._v("环境：CentOS7")])]),s._v(" "),t("h2",{attrs:{id:"配置管理员用户"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置管理员用户"}},[s._v("#")]),s._v(" 配置管理员用户")]),s._v(" "),t("ul",[t("li",[t("h4",{attrs:{id:"添加用户"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#添加用户"}},[s._v("#")]),s._v(" 添加用户")]),s._v(" "),t("p",[s._v("添加用户")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("adduser dmadmin\n")])])]),t("p",[s._v("设置密码")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("passwd")]),s._v(" dmadmin\n")])])])]),s._v(" "),t("li",[t("h4",{attrs:{id:"配置管理员-root-权限"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置管理员-root-权限"}},[s._v("#")]),s._v(" 配置管理员(root)权限")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("方法一\n修改 /etc/sudoers 文件，找到下面一行，把前面的注释（#）去掉")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## Allows people in group wheel to run all commands")]),s._v("\n%wheel    "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ALL")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ALL"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("    ALL\n")])])]),t("p",[s._v("然后修改用户，使其属于root组（wheel），命令如下")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("usermod")]),s._v(" -g root tommy\n")])])])]),s._v(" "),t("li",[t("p",[s._v("方法二")]),s._v(" "),t("p",[s._v("修改 /etc/sudoers 文件，找到下面一行，在root下面添加一行")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## Allow root to run any commands anywhere")]),s._v("\nroot    "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ALL")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ALL"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("     ALL\ndmadmin   "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ALL")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ALL"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("     ALL\n")])])])]),s._v(" "),t("li",[t("p",[s._v("方法三")]),s._v(" "),t("p",[s._v("修改 /etc/passwd 文件，找到如下行，把用户ID修改为 0")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("tommy:x:500:500:tommy:/home/tommy:/bin/bash\n")])])]),t("p",[s._v("修改后如下")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("tommy:x:0:500:tommy:/home/tommy:/bin/bash\n")])])])])]),s._v(" "),t("p",[s._v("推荐方法二")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);