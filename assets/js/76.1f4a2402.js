(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{441:function(s,a,t){"use strict";t.r(a);var n=t(27),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"ngrok服务器搭建"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ngrok服务器搭建"}},[s._v("#")]),s._v(" Ngrok服务器搭建")]),s._v(" "),t("h5",{attrs:{id:"前言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[s._v("#")]),s._v(" 前言：")]),s._v(" "),t("p",[s._v("简单说一下什么是ngrok:")]),s._v(" "),t("p",[s._v("ngrok是一个内网穿透的解决方案,它使得你本地的服务器可以被局域网外的公网访问到\nngork有服务端和客户端，服务端运行在公网服务器，客户端运行在本地服务器\nngrok服务端会建立http和https服务，默认端口80/443，以及供ngrok客户端连接的服务，默认端口4443")]),s._v(" "),t("p",[s._v("它的工作流程如下：")]),s._v(" "),t("p",[s._v("访问端输入域名->DNS->ngrok服务端->请求映射到ngrok客户端->客户端返回响应到ngrok服务端->ngrok服务端返回响应到访问端")]),s._v(" "),t("h6",{attrs:{id:"本文环境"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#本文环境"}},[s._v("#")]),s._v(" 本文环境：")]),s._v(" "),t("p",[s._v("centos7 64位")]),s._v(" "),t("p",[s._v("go1.12.5")]),s._v(" "),t("h6",{attrs:{id:"准备工作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#准备工作"}},[s._v("#")]),s._v(" 准备工作：")]),s._v(" "),t("ol",[t("li",[s._v("一台公网服务器")]),s._v(" "),t("li",[s._v("一个域名，顶级或二级均可")])]),s._v(" "),t("p",[t("strong",[s._v("关于域名：我们声明两个概念：一个是基础域名，可以是顶级或者二级，它用来为ngrok服务端本身提供外部访问（ngrok客户端连接用）。二就是基于基础域名的二级或者三级域名，它用来映射到你的本地服务器，我称它为映射域名。它可以设置多个，这取决于你的需要。例如 *abc.com* 和 *ngrok.abc.com* / *ngrok2.abc.com*，每个映射域名对应一个ngrok客户端")])]),s._v(" "),t("p",[s._v("假设你的域名是 *"),t("strong",[s._v("abc.com*")]),s._v(" (全文皆使用此假设)")]),s._v(" "),t("p",[s._v("如果你需要使用顶级域名作为基础域名，那么请将 *"),t("strong",[s._v("abc.com*")]),s._v(" 泛解析到服务器ip，然后将你需要使用的二级域名通过A记录解析到服务器ip,例如  *"),t("strong",[s._v("ngrok.abc.com*")])]),s._v(" "),t("p",[s._v("如果你需要使用二级域名，那么先将你的二级域名 *"),t("strong",[s._v("xxx.abc.com*")]),s._v(" 通过A记录解析到服务器域名。然后将三级域名（比如 *"),t("strong",[s._v("test.xxx*")]),s._v("）通过CNAME的方式解析到 *"),t("strong",[s._v("xxx.abc.com*")]),s._v("，这次 *"),t("strong",[s._v("xxx.abc.com*")]),s._v(" 便成为了客户端与服务端的连接域名，*"),t("strong",[s._v("test.xxx.abc.com*")]),s._v(" 则是映射域名")]),s._v(" "),t("p",[s._v("下面的教程我们使用 *"),t("strong",[s._v("abc.com*")]),s._v(" 作为基础域名演示，请根据实际替换域名")]),s._v(" "),t("h6",{attrs:{id:"一-安装git和go以及其它依赖"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一-安装git和go以及其它依赖"}},[s._v("#")]),s._v(" 一，安装git和go以及其它依赖")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#安装依赖")]),s._v("\nyum "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" gcc mercurial "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" bzr subversion golang\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#离线安装go,这里选择1.12.5，安装1.15版本证书会报错")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://storage.googleapis.com/golang/go1.12.5.linux-amd64.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#解压安装包")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -C /root -xzf go1.12.5.linux-amd64.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /root"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" ~/.bashrc\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#设置环境变量")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("GOPATH")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/root/Go\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("GOROOT")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/root/go\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")])]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$PATH")]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$GOROOT")]),s._v("/bin\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#使配置生效")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" ~/.bashrc\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看go版本")]),s._v("\ngo version\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br")])]),t("h6",{attrs:{id:"二-下载源码-项目早已停止更新-源码完全固定"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二-下载源码-项目早已停止更新-源码完全固定"}},[s._v("#")]),s._v(" 二，下载源码 （项目早已停止更新，源码完全固定）")]),s._v(" "),t("div",{staticClass:"language-php line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-php"}},[t("code",[s._v("git "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("clone")]),s._v(" https"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//github.com/inconshreveable/ngrok.git")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("完成后会在当前目录生成ngrok目录")]),s._v(" "),t("h6",{attrs:{id:"三-生成证书-默认的证书是-ngrok-com-我们需要改成-abc-com"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三-生成证书-默认的证书是-ngrok-com-我们需要改成-abc-com"}},[s._v("#")]),s._v(" 三，生成证书（默认的证书是 *"),t("strong",[s._v("ngrok.com*")]),s._v("，我们需要改成 *"),t("strong",[s._v("abc.com*")]),s._v("）")]),s._v(" "),t("p",[s._v("生成：")]),s._v(" "),t("div",{staticClass:"language-objectivec line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-objectivec"}},[t("code",[s._v("cd ngrok  \n\nmkdir cert \n\ncd cert\n\nexport NGROK_DOMAIN"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"abc.com"')]),s._v("\n\nopenssl genrsa "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("out rootCA"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("key "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2048")]),s._v("\n\nopenssl req "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("x509 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("new "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("nodes "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("key rootCA"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("key "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("subj "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/CN=$NGROK_DOMAIN"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("days "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("out rootCA"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("pem\n\nopenssl genrsa "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("out device"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("key "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2048")]),s._v("\n\nopenssl req "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("new "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("key device"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("key "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("subj "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/CN=$NGROK_DOMAIN"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("out device"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("csr\n\nopenssl x509 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("req "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" device"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("csr "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("CA rootCA"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("pem "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("CAkey rootCA"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("key "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("CAcreateserial "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("out device"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("crt "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("days "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5000")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br")])]),t("p",[s._v("替换(提示overwrite输入y)")]),s._v(" "),t("div",{staticClass:"language-undefined line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("cp rootCA.pem ../assets/client/tls/ngrokroot.crt\n\ncp device.crt ../assets/server/tls/snakeoil.crt\n\ncp device.key ../assets/server/tls/snakeoil.key\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h6",{attrs:{id:"四-生成服务端与客户端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四-生成服务端与客户端"}},[s._v("#")]),s._v(" 四：生成服务端与客户端")]),s._v(" "),t("p",[s._v("切换回ngrok目录")]),s._v(" "),t("p",[s._v("以下命令按需生成")]),s._v(" "),t("div",{staticClass:"language-xml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-xml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("\x3c!--linux服务端/客户端--\x3e")]),s._v("\nGOOS=linux GOARCH=386 make release-server (32位)\nGOOS=linux GOARCH=amd64 make release-server（64位）\n\nGOOS=linux GOARCH=386 make release-client (32位)\nGOOS=linux GOARCH=amd64 make release-client（64位）\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("\x3c!--Mac OS服务端/客户端--\x3e")]),s._v("\nGOOS=darwin GOARCH=386 make release-server\nGOOS=darwin GOARCH=amd64 make release-server\n\nGOOS=darwin GOARCH=386 make release-client\nGOOS=darwin GOARCH=amd64 make release-client\n\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("\x3c!--windows服务端/客户端--\x3e")]),s._v("\nGOOS=windows GOARCH=386 make release-server\nGOOS=windows GOARCH=amd64 make release-server\n\nGOOS=windows GOARCH=386 make release-client\nGOOS=windows GOARCH=amd64 make release-client\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br")])]),t("p",[s._v("所有程序都将生成在bin目录中，不同平台将建立不同的子目录")]),s._v(" "),t("p",[s._v("（当我生成linux 64位程序时，会直接保存在bin目录下无子目录。所以我个人推测，如果生成是当前系统的程序，则无子目录，直接存放于bin目录下。各位若有条件可验证下）")]),s._v(" "),t("p",[s._v("目录中，ngrok是客户端，ngrokd是服务端")]),s._v(" "),t("div",{staticClass:"language-undefined line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("linux\nbin/linux_386\nbin/linux_amd64\n\nmac os \nbin/darwin_386 \nbin/darwin_amd64 \n\nwindows\nbin/windows_386\nbin/windows_amd64\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("p",[s._v("启动服务器：")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("./bin/ngrokd -domain"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$NGROK_DOMAIN")]),s._v('"')]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("其它配置：")]),s._v(" "),t("p",[s._v('-httpAddr=":80"  http服务的访问端口 默认80')]),s._v(" "),t("p",[s._v('-httpsAddr=":443" https服务的访问端口 默认443')]),s._v(" "),t("p",[s._v('-tunnelAddr=":4443" 客户端连接服务端的端口 默认4443')]),s._v(" "),t("p",[s._v("以上端口，如若与系统其他服务有冲突，开启服务时请自行配置其他端口，同时记得配置防火墙")]),s._v(" "),t("h6",{attrs:{id:"五-客户端配置与连接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#五-客户端配置与连接"}},[s._v("#")]),s._v(" 五：客户端配置与连接")]),s._v(" "),t("p",[s._v("通过sz或者ftp等方式将ngrok下载到你需要使用客户端的电脑中")]),s._v(" "),t("p",[s._v("新建配置文件ngrok.cfg")]),s._v(" "),t("div",{staticClass:"language-xml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-xml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("\x3c!--配置服务端连接地址，也就是基础域名。端口则与服务端-tunnelAddr配置相同--\x3e")]),s._v('\nserver_addr: "abc.com:4443"  \ntrust_host_root_certs: false\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("运行客户端")]),s._v(" "),t("div",{staticClass:"language-undefined line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("ngrok -config=ngrok.cfg -subdomain ngrok 80\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h6",{attrs:{id:"六-配置ngrok服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#六-配置ngrok服务"}},[s._v("#")]),s._v(" 六：配置NGROK服务")]),s._v(" "),t("p",[s._v("新建配置文件/usr/lib/systemd/system/ngrok.service")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Unit"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("Description")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ngrok\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("After")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("network.target\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Service"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ExecStart")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/root/ngrok/bin/ngrokd -tlsKey"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/root/ngrok/cert/device.key -tlsCrt"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/root/ngrok/cert/device.crt -domain"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("xiaoaixi.com -httpAddr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(":80 -httpsAddr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(":443\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("Install"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("WantedBy")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("multi-user.target\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("p",[s._v("管理ngrok服务")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#使配置生效")]),s._v("\nsystemctl daemon-reload\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#启动服务")]),s._v("\nsystemctl start ngrok\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看服务状态")]),s._v("\nsystemctl status ngrok\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h6",{attrs:{id:"七-配置ngrok客户端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#七-配置ngrok客户端"}},[s._v("#")]),s._v(" 七：配置NGROK客户端")]),s._v(" "),t("p",[s._v("新建配置文件ngrok.cfg")]),s._v(" "),t("div",{staticClass:"language-yaml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("server_addr")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"xiaoaixi.com:4443"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("trust_host_root_certs")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("false")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("tunnels")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("nginx")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("subdomain")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" nginx\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("proto")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("http")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("about")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("subdomain")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" about\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("proto")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("http")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 192.168.0.1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ssh")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("remote_port")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2020")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("proto")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("tcp")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br")])]),t("p",[s._v("启动客户端")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#转发指定服务")]),s._v("\nngrok.exe -config ngrok.cfg -log ngrok.log start nginx\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#转发所有服务")]),s._v("\nngrok.exe -config ngrok.cfg -log ngrok.log start-all\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("配置为window服务")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#注册服务")]),s._v("\nsc create ngrok "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("binPath")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cmd.exe /c start C:'),t("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),s._v("grok"),t("span",{pre:!0,attrs:{class:"token entity",title:"\\n"}},[s._v("\\n")]),s._v('grok.bat"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("start")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" auto "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("displayname")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ngrok"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#删除服务")]),s._v("\nsc delete ngrok\n\nshell:startup\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);