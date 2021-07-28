(window.webpackJsonp=window.webpackJsonp||[]).push([[164],{529:function(s,a,e){"use strict";e.r(a);var t=e(27),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"centos7配置管理员用户"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#centos7配置管理员用户"}},[s._v("#")]),s._v(" CentOS7配置管理员用户")]),s._v(" "),e("h2",{attrs:{id:"介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[s._v("#")]),s._v(" 介绍")]),s._v(" "),e("p",[s._v("[TOC]")]),s._v(" "),e("p",[e("strong",[s._v("环境：CentOS7")])]),s._v(" "),e("h2",{attrs:{id:"配置管理员用户"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置管理员用户"}},[s._v("#")]),s._v(" 配置管理员用户")]),s._v(" "),e("ul",[e("li",[e("h4",{attrs:{id:"添加用户"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#添加用户"}},[s._v("#")]),s._v(" 添加用户")]),s._v(" "),e("p",[s._v("添加用户")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("adduser dmadmin\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("设置密码")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("passwd")]),s._v(" dmadmin\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("h4",{attrs:{id:"配置管理员-root-权限"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置管理员-root-权限"}},[s._v("#")]),s._v(" 配置管理员(root)权限")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("方法一\n修改 /etc/sudoers 文件，找到下面一行，把前面的注释（#）去掉")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## Allows people in group wheel to run all commands")]),s._v("\n%wheel    "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ALL")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ALL"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("    ALL\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("p",[s._v("然后修改用户，使其属于root组（wheel），命令如下")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("usermod")]),s._v(" -g root tommy\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("方法二")]),s._v(" "),e("p",[s._v("修改 /etc/sudoers 文件，找到下面一行，在root下面添加一行")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## Allow root to run any commands anywhere")]),s._v("\nroot    "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ALL")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ALL"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("     ALL\ndmadmin   "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ALL")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ALL"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("     ALL\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("方法三")]),s._v(" "),e("p",[s._v("修改 /etc/passwd 文件，找到如下行，把用户ID修改为 0")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("tommy:x:500:500:tommy:/home/tommy:/bin/bash\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("p",[s._v("修改后如下")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("tommy:x:0:500:tommy:/home/tommy:/bin/bash\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])]),s._v(" "),e("p",[s._v("推荐方法二")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);