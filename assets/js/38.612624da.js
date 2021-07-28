(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{403:function(v,_,a){"use strict";a.r(_);var t=a(27),e=Object(t.a)({},(function(){var v=this,_=v.$createElement,a=v._self._c||_;return a("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[a("h1",{attrs:{id:"azkaban介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#azkaban介绍"}},[v._v("#")]),v._v(" Azkaban介绍")]),v._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[v._v("#")]),v._v(" 介绍")]),v._v(" "),a("p",[v._v("[TOC]")]),v._v(" "),a("h2",{attrs:{id:"一、为什么需要工作流调度器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、为什么需要工作流调度器"}},[v._v("#")]),v._v(" 一、为什么需要工作流调度器")]),v._v(" "),a("p",[v._v("1、一个完整的数据分析系统通常都是由大量任务单元组成： shell 脚本程序，java 程序，mapreduce 程序、hive 脚本等")]),v._v(" "),a("p",[v._v("2、各任务单元之间存在时间先后及前后依赖关系")]),v._v(" "),a("p",[v._v("3、为了很好地组织起这样的复杂执行计划，需要一个工作流调度系统来调度执行")]),v._v(" "),a("p",[v._v("例如，我们可能有这样一个需求，某个业务系统每天产生 20G 原始数据，我们每天都要对其进行处理，处理步骤如下所示：")]),v._v(" "),a("p",[v._v("1、 通过 Hadoop 先将原始数据同步到 HDFS 上；")]),v._v(" "),a("p",[v._v("2、 借助 MapReduce 计算框架对原始数据进行清洗转换，生成的数据以分区表的形式存储 到多张 Hive 表中；")]),v._v(" "),a("p",[v._v("3、 需要对 Hive 中多个表的数据进行 JOIN 处理，得到一个明细数据 Hive 大表；")]),v._v(" "),a("p",[v._v("4、 将明细数据进行各种统计分析，得到结果报表信息；")]),v._v(" "),a("p",[v._v("5、 需要将统计分析得到的结果数据同步到业务系统中，供业务调用使用。")]),v._v(" "),a("h2",{attrs:{id:"二、工作流调度实现方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、工作流调度实现方式"}},[v._v("#")]),v._v(" 二、工作流调度实现方式")]),v._v(" "),a("p",[v._v("简单的任务调度：直接使用 linux 的 crontab 来定义；")]),v._v(" "),a("p",[v._v("复杂的任务调度：开发调度平台或使用现成的开源调度系统，比如 ooize、azkaban 等")]),v._v(" "),a("h2",{attrs:{id:"三、常见工作流调度系统"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、常见工作流调度系统"}},[v._v("#")]),v._v(" 三、常见工作流调度系统")]),v._v(" "),a("p",[v._v("市面上目前有许多工作流调度器 在 hadoop 领域，常见的工作流调度器有 Oozie, Azkaban,Cascading,Hamake 等")]),v._v(" "),a("h2",{attrs:{id:"四、各种调度工具对比"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、各种调度工具对比"}},[v._v("#")]),v._v(" 四、各种调度工具对比")]),v._v(" "),a("p",[v._v("下面的表格对上述四种 hadoop 工作流调度器的关键特性进行了比较，尽管这些工作流调度 器能够解决的需求场景基本一致，但在设计理念，目标用户，应用场景等方面还是存在显著 的区别，在做技术选型的时候，可以提供参考")]),v._v(" "),a("table",[a("thead",[a("tr",[a("th",[v._v("特性")]),v._v(" "),a("th",[v._v("Hamake")]),v._v(" "),a("th",[v._v("Oozie")]),v._v(" "),a("th",[v._v("Azkaban")]),v._v(" "),a("th",[v._v("Cascading")])])]),v._v(" "),a("tbody",[a("tr",[a("td",[v._v("工作流描述语言")]),v._v(" "),a("td",[v._v("XML")]),v._v(" "),a("td",[v._v("XML (xPDL based)")]),v._v(" "),a("td",[v._v("text file with key/value pairs")]),v._v(" "),a("td",[v._v("Java API")])]),v._v(" "),a("tr",[a("td",[v._v("依赖机制")]),v._v(" "),a("td",[v._v("data-driven")]),v._v(" "),a("td",[v._v("explicit")]),v._v(" "),a("td",[v._v("explicit")]),v._v(" "),a("td",[v._v("explicit")])]),v._v(" "),a("tr",[a("td",[v._v("是否要web容器")]),v._v(" "),a("td",[v._v("NO")]),v._v(" "),a("td",[v._v("YES")]),v._v(" "),a("td",[v._v("YES")]),v._v(" "),a("td",[v._v("NO")])]),v._v(" "),a("tr",[a("td",[v._v("进度跟踪")]),v._v(" "),a("td",[v._v("console/log messages")]),v._v(" "),a("td",[v._v("web page")]),v._v(" "),a("td",[v._v("web page")]),v._v(" "),a("td",[v._v("Java API")])]),v._v(" "),a("tr",[a("td",[v._v("Hadoop job调度支持")]),v._v(" "),a("td",[v._v("no")]),v._v(" "),a("td",[v._v("YES")]),v._v(" "),a("td",[v._v("YES")]),v._v(" "),a("td",[v._v("YES")])]),v._v(" "),a("tr",[a("td",[v._v("运行模式")]),v._v(" "),a("td",[v._v("command line utility")]),v._v(" "),a("td",[v._v("daemon")]),v._v(" "),a("td",[v._v("daemon")]),v._v(" "),a("td",[v._v("API")])]),v._v(" "),a("tr",[a("td",[v._v("Pig支持")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("yes")])]),v._v(" "),a("tr",[a("td",[v._v("事件通知")]),v._v(" "),a("td",[v._v("no")]),v._v(" "),a("td",[v._v("no")]),v._v(" "),a("td",[v._v("no")]),v._v(" "),a("td",[v._v("yes")])]),v._v(" "),a("tr",[a("td",[v._v("需要安装")]),v._v(" "),a("td",[v._v("no")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("no")])]),v._v(" "),a("tr",[a("td",[v._v("支持的hadoop版本")]),v._v(" "),a("td",[v._v("0.18+")]),v._v(" "),a("td",[v._v("0.20+")]),v._v(" "),a("td",[v._v("currently unknown")]),v._v(" "),a("td",[v._v("0.18+")])]),v._v(" "),a("tr",[a("td",[v._v("重试支持")]),v._v(" "),a("td",[v._v("no")]),v._v(" "),a("td",[v._v("workflownode evel")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("yes")])]),v._v(" "),a("tr",[a("td",[v._v("运行任意命令")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("yes")])]),v._v(" "),a("tr",[a("td",[v._v("Amazon EMR支持")]),v._v(" "),a("td",[v._v("yes")]),v._v(" "),a("td",[v._v("no")]),v._v(" "),a("td",[v._v("currently unknown")]),v._v(" "),a("td",[v._v("yes")])])])]),v._v(" "),a("h2",{attrs:{id:"五、azkaban-与-oozie-对比"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五、azkaban-与-oozie-对比"}},[v._v("#")]),v._v(" 五、Azkaban 与 Oozie 对比")]),v._v(" "),a("p",[v._v("对市面上最流行的两种调度器，给出以下详细对比，以供技术选型参考。总体来说，ooize相比azkaban是一个重量级的任务调度系统，功能全面，但配置使用也更复杂。如果可以不在意某些功能的缺失，轻量级调度器azkaban是很不错的候选对象。\n详情如下：")]),v._v(" "),a("h3",{attrs:{id:"功能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#功能"}},[v._v("#")]),v._v(" 功能")]),v._v(" "),a("p",[v._v("两者均可以调度mapreduce,pig,java,脚本工作流任务\n两者均可以定时执行工作流任务")]),v._v(" "),a("h3",{attrs:{id:"工作流定义"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#工作流定义"}},[v._v("#")]),v._v(" 工作流定义")]),v._v(" "),a("p",[v._v("Azkaban使用Properties文件定义工作流\nOozie使用XML文件定义工作流")]),v._v(" "),a("h3",{attrs:{id:"工作流传参"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#工作流传参"}},[v._v("#")]),v._v(" 工作流传参")]),v._v(" "),a("p",[v._v("Azkaban支持直接传参，例如inputOozie支持参数和EL表达式，例如inputOozie支持参数和EL表达式，例如{fs:dirSize(myInputDir)}")]),v._v(" "),a("h3",{attrs:{id:"定时执行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#定时执行"}},[v._v("#")]),v._v(" 定时执行")]),v._v(" "),a("p",[v._v("Azkaban的定时执行任务是基于时间的\nOozie的定时执行任务基于时间和输入数据")]),v._v(" "),a("h3",{attrs:{id:"资源管理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#资源管理"}},[v._v("#")]),v._v(" 资源管理")]),v._v(" "),a("p",[v._v("Azkaban有较严格的权限控制，如用户对工作流进行读/写/执行等操作\nOozie暂无严格的权限控制")]),v._v(" "),a("h3",{attrs:{id:"工作流执行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#工作流执行"}},[v._v("#")]),v._v(" 工作流执行")]),v._v(" "),a("p",[v._v("Azkaban有两种运行模式，分别是solo server mode(executor server和web server部署在同一台节点)和multi server mode(executor server和web server可以部署在不同节点)\nOozie作为工作流服务器运行，支持多用户和多工作流")]),v._v(" "),a("h3",{attrs:{id:"工作流管理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#工作流管理"}},[v._v("#")]),v._v(" 工作流管理")]),v._v(" "),a("p",[v._v("Azkaban支持浏览器以及ajax方式操作工作流\nOozie支持命令行、HTTP REST、Java API、浏览器操作工作流")]),v._v(" "),a("h2",{attrs:{id:"六、azkaban-介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#六、azkaban-介绍"}},[v._v("#")]),v._v(" 六、Azkaban 介绍")]),v._v(" "),a("p",[v._v("Azkaban是由Linkedin开源的一个批量工作流任务调度器。用于在一个工作流内以一个特定的顺序运行一组工作和流程。Azkaban定义了一种KV文件格式来建立任务之间的依赖关系，并提供一个易于使用的web用户界面维护和跟踪你的工作流。\n它有如下功能特点：\n　　1、Web用户界面\n　　2、方便上传工作流\n　　3、方便设置任务之间的关系\n　　4、调度工作流\n　　5、认证/授权(权限的工作)\n　　6、能够杀死并重新启动工作流\n　　7、模块化和可插拔的插件机制\n　　8、项目工作区\n　　9、工作流和任务的日志记录和审计")]),v._v(" "),a("h2",{attrs:{id:"七、azkaban调度的任务有可能有那些类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#七、azkaban调度的任务有可能有那些类型"}},[v._v("#")]),v._v(" 七、azkaban调度的任务有可能有那些类型")]),v._v(" "),a("p",[v._v("1、shell脚本")]),v._v(" "),a("p",[v._v("2、java程序")]),v._v(" "),a("p",[v._v("3、MR程序")]),v._v(" "),a("p",[v._v("4、spark程序")]),v._v(" "),a("p",[v._v("5、hive的sql")]),v._v(" "),a("p",[v._v("6、python脚本")]),v._v(" "),a("p",[v._v("7、sqoop任务")]),v._v(" "),a("h2",{attrs:{id:"参考链接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[v._v("#")]),v._v(" 参考链接")]),v._v(" "),a("p",[a("a",{attrs:{href:"https://www.cnblogs.com/frankdeng/p/9284541.html",target:"_blank",rel:"noopener noreferrer"}},[v._v("Azkaban的基础介绍"),a("OutboundLink")],1)])])}),[],!1,null,null,null);_.default=e.exports}}]);