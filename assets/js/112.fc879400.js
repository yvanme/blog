(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{470:function(v,_,n){"use strict";n.r(_);var t=n(44),o=Object(t.a)({},(function(){var v=this,_=v.$createElement,n=v._self._c||_;return n("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[n("h1",{attrs:{id:"cron表达式详解"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#cron表达式详解"}},[v._v("#")]),v._v(" cron表达式详解")]),v._v(" "),n("h2",{attrs:{id:"介绍"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[v._v("#")]),v._v(" 介绍")]),v._v(" "),n("p",[v._v("[TOC]")]),v._v(" "),n("p",[v._v("Cron表达式是一个字符串，字符串以5或6个空格隔开，分为6或7个域，每一个域代表一个含义，Cron有如下两种语法格式：")]),v._v(" "),n("p",[n("em",[v._v("Seconds Minutes Hours DayofMonth Month DayofWeek Year或 Seconds Minutes Hours DayofMonth Month DayofWeek")])]),v._v(" "),n("p",[v._v('每一个域可出现的字符如下：\nSeconds:可出现", - * /"四个字符，有效范围为0-59的整数\nMinutes:可出现", - * /"四个字符，有效范围为0-59的整数\nHours:可出现", - * /"四个字符，有效范围为0-23的整数\nDayofMonth:可出现", - * / ? L W C"八个字符，有效范围为0-31的整数\nMonth:可出现", - * /"四个字符，有效范围为1-12的整数或JAN-DEc\nDayofWeek:可出现", - * / ? L C #"四个字符，有效范围为1-7的整数或SUN-SAT两个范围。1表示星期天，2表示星期一， 依次类推\nYear:可出现", - * /"四个字符，有效范围为1970-2099年')]),v._v(" "),n("p",[v._v("每一个域都使用数字，但还可以出现如下特殊字符，它们的含义是：\n(1)"),n("em",[v._v("：表示匹配该域的任意值，假如在Minutes域使用")]),v._v(", 即表示每分钟都会触发事件。")]),v._v(" "),n("p",[v._v("(2)?:只能用在DayofMonth和DayofWeek两个域。它也匹配域的任意值，但实际不会。因为DayofMonth和 DayofWeek会相互影响。例如想在每月的20日触发调度，不管20日到底是星期几，则只能使用如下写法： 13 13 15 20 * ?, 其中最后一位只能用？，而不能使用*，如果使用*表示不管星期几都会触发，实际上并不是这样。")]),v._v(" "),n("p",[v._v("(3)-:表示范围，例如在Minutes域使用5-20，表示从5分到20分钟每分钟触发一次")]),v._v(" "),n("p",[v._v("(4)/：表示起始时间开始触发，然后每隔固定时间触发一次，例如在Minutes域使用5/20,则意味着5分钟触发一次，而25，45等分别触发一次.")]),v._v(" "),n("p",[v._v("(5),:表示列出枚举值值。例如：在Minutes域使用5,20，则意味着在5和20分每分钟触发一次。")]),v._v(" "),n("p",[v._v("(6)L:表示最后，只能出现在DayofWeek和DayofMonth域，如果在DayofWeek域使用5L,意味着在最后的一个星期四触发。")]),v._v(" "),n("p",[v._v("(7)W: 表示有效工作日(周一到周五),只能出现在DayofMonth域，系统将在离指定日期的最近的有效工作日触发事件。例如：在 DayofMonth使用5W，如果5日是星期六，则将在最近的工作日：星期五，即4日触发。如果5日是星期天，则在6日(周一)触发；如果5日在星期一 到星期五中的一天，则就在5日触发。另外一点，W的最近寻找不会跨过月份")]),v._v(" "),n("p",[v._v("(8)LW:这两个字符可以连用，表示在某个月最后一个工作日，即最后一个星期五。")]),v._v(" "),n("p",[v._v("(9)#:用于确定每个月第几个星期几，只能出现在DayofMonth域。例如在4#2，表示某月的第二个星期三。")]),v._v(" "),n("p",[v._v("举几个例子:\n0 0 2 1 * ? * 表示在每月的1日的凌晨2点调度任务\n0 15 10 ? * MON-FRI 表示周一到周五每天上午10：15执行作业\n0 15 10 ? 6L 2002-2006 表示2002-2006年的每个月的最后一个星期五上午10:15执行作")]),v._v(" "),n("p",[v._v("一个cron表达式有至少6个（也可能7个）有空格分隔的时间元素。\n按顺序依次为\n秒（0~59）\n分钟（0~59）\n小时（0~23）\n天（月）（0~31，但是你需要考虑你月的天数）\n月（0~11）\n天（星期）（1~7 1=SUN 或 SUN，MON，TUE，WED，THU，FRI，SAT）\n年份（1970－2099）")]),v._v(" "),n("p",[v._v('其中每个元素可以是一个值(如6),一个连续区间(9-12),一个间隔时间(8-18/4)(/表示每隔4小时),一个列表(1,3,5),通配符。由于"月份中的日期"和"星期中的日期"这两个元素互斥的,必须要对其中一个设置?')]),v._v(" "),n("p",[v._v('0 0 10,14,16 * * ? 每天上午10点，下午2点，4点\n0 0/30 9-17 * * ? 朝九晚五工作时间内每半小时\n0 0 12 ? * WED 表示每个星期三中午12点\n"0 0 12 * * ?" 每天中午12点触发\n"0 15 10 ? * *" 每天上午10:15触发\n"0 15 10 * * ?" 每天上午10:15触发\n"0 15 10 * * ? *" 每天上午10:15触发\n"0 15 10 * * ? 2005" 2005年的每天上午10:15触发\n"0 * 14 * * ?" 在每天下午2点到下午2:59期间的每1分钟触发\n"0 0/5 14 * * ?" 在每天下午2点到下午2:55期间的每5分钟触发\n"0 0/5 14,18 * * ?" 在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发\n"0 0-5 14 * * ?" 在每天下午2点到下午2:05期间的每1分钟触发\n"0 10,44 14 ? 3 WED" 每年三月的星期三的下午2:10和2:44触发\n"0 15 10 ? * MON-FRI" 周一至周五的上午10:15触发\n"0 15 10 15 * ?" 每月15日上午10:15触发\n"0 15 10 L * ?" 每月最后一日的上午10:15触发\n"0 15 10 ? * 6L" 每月的最后一个星期五上午10:15触发\n"0 15 10 ? * 6L 2002-2005" 2002年至2005年的每月的最后一个星期五上午10:15触发\n"0 15 10 ? * 6#3" 每月的第三个星期五上午10:15触发')]),v._v(" "),n("p",[v._v("有些子表达式能包含一些范围或列表")]),v._v(" "),n("p",[v._v("例如：子表达式（天（星期））可以为 “MON-FRI”，“MON，WED，FRI”，“MON-WED,SAT”")]),v._v(" "),n("p",[v._v("“*”字符代表所有可能的值")]),v._v(" "),n("p",[v._v("因此，“"),n("em",[v._v("”在子表达式（月）里表示每个月的含义，“")]),v._v("”在子表达式（天（星期））表示星期的每一天")]),v._v(" "),n("p",[v._v("“/”字符用来指定数值的增量\n例如：在子表达式（分钟）里的“0/15”表示从第0分钟开始，每15分钟\n在子表达式（分钟）里的“3/20”表示从第3分钟开始，每20分钟（它和“3，23，43”）的含义一样")]),v._v(" "),n("p",[v._v("“？”字符仅被用于天（月）和天（星期）两个子表达式，表示不指定值\n当2个子表达式其中之一被指定了值以后，为了避免冲突，需要将另一个子表达式的值设为“？”")]),v._v(" "),n("p",[v._v("“L” 字符仅被用于天（月）和天（星期）两个子表达式，它是单词“last”的缩写\n但是它在两个子表达式里的含义是不同的。\n在天（月）子表达式中，“L”表示一个月的最后一天\n在天（星期）自表达式中，“L”表示一个星期的最后一天，也就是SAT")]),v._v(" "),n("p",[v._v("如果在“L”前有具体的内容，它就具有其他的含义了")]),v._v(" "),n("p",[v._v("例如：“6L”表示这个月的倒数第６天，“FRIL”表示这个月的最一个星期五\n注意：在使用“L”参数时，不要指定列表或范围，因为这会导致问题")]),v._v(" "),n("p",[v._v("字段 允许值 允许的特殊字符\n秒 0-59 , - * /\n分 0-59 , - * /\n小时 0-23 , - * /\n日期 1-31 , - * ? / L W C\n月份 1-12 或者 JAN-DEC , - * /\n星期 1-7 或者 SUN-SAT , - * ? / L C #\n年（可选） 留空, 1970-2099 , - * /")]),v._v(" "),n("p",[v._v("2）Cron表达式范例：")]),v._v(" "),n("p",[v._v("​                 每隔5秒执行一次：*/5 * * * * ?")]),v._v(" "),n("p",[v._v("​                 每隔1分钟执行一次：0 */1 * * * ?")]),v._v(" "),n("p",[v._v("​                 每天23点执行一次：0 0 23 * * ?")]),v._v(" "),n("p",[v._v("​                 每天凌晨1点执行一次：0 0 1 * * ?")]),v._v(" "),n("p",[v._v("​                 每月1号凌晨1点执行一次：0 0 1 1 * ?")]),v._v(" "),n("p",[v._v("​                 每月最后一天23点执行一次：0 0 23 L * ?")]),v._v(" "),n("p",[v._v("​                 每周星期天凌晨1点实行一次：0 0 1 ? * L")]),v._v(" "),n("p",[v._v("​                 在26分、29分、33分执行一次：0 26,29,33 * * * ?")]),v._v(" "),n("p",[v._v("​                 每天的0点、13点、18点、21点都执行一次：0 0 0,13,18,21 * * ?")]),v._v(" "),n("p",[v._v("Cron表达式是一个字符串，字符串以5或6个空格隔开，分为6或7个域，每一个域代表一个含义，Cron有如下两种语法格式：")]),v._v(" "),n("p",[v._v("（1） Seconds Minutes Hours DayofMonth Month DayofWeek Year")]),v._v(" "),n("p",[v._v("（2）"),n("em",[v._v("Seconds Minutes Hours DayofMonth Month DayofWeek")])]),v._v(" "),n("p"),v._v(" "),n("p",[n("strong",[v._v("一、结构")])]),v._v(" "),n("p",[v._v("corn从左到右（用空格隔开）：秒 分 小时 月份中的日期 月份 星期中的日期 年份")]),v._v(" "),n("p",[n("strong",[v._v("二、各字段的含义")])]),v._v(" "),n("table",[n("thead",[n("tr",[n("th",[v._v("字段")]),v._v(" "),n("th",[v._v("允许值")]),v._v(" "),n("th",[v._v("允许的特殊字符")])])]),v._v(" "),n("tbody",[n("tr",[n("td",[v._v("秒（Seconds）")]),v._v(" "),n("td",[v._v("0~59的整数")]),v._v(" "),n("td",[v._v(", - * /    四个字符")])]),v._v(" "),n("tr",[n("td",[v._v("分（"),n("em",[v._v("Minutes")]),v._v("）")]),v._v(" "),n("td",[v._v("0~59的整数")]),v._v(" "),n("td",[v._v(", - * /    四个字符")])]),v._v(" "),n("tr",[n("td",[v._v("小时（"),n("em",[v._v("Hours")]),v._v("）")]),v._v(" "),n("td",[v._v("0~23的整数")]),v._v(" "),n("td",[v._v(", - * /    四个字符")])]),v._v(" "),n("tr",[n("td",[v._v("日期（"),n("em",[v._v("DayofMonth")]),v._v("）")]),v._v(" "),n("td",[v._v("1~31的整数（但是你需要考虑你月的天数）")]),v._v(" "),n("td",[v._v(",- * ? / L W C     八个字符")])]),v._v(" "),n("tr",[n("td",[v._v("月份（"),n("em",[v._v("Month")]),v._v("）")]),v._v(" "),n("td",[v._v("1~12的整数或者 JAN-DEC")]),v._v(" "),n("td",[v._v(", - * /    四个字符")])]),v._v(" "),n("tr",[n("td",[v._v("星期（"),n("em",[v._v("DayofWeek")]),v._v("）")]),v._v(" "),n("td",[v._v("1~7的整数或者 SUN-SAT （1=SUN）")]),v._v(" "),n("td",[v._v(", - * ? / L C #     八个字符")])]),v._v(" "),n("tr",[n("td",[v._v("年(可选，留空)（"),n("em",[v._v("Year")]),v._v("）")]),v._v(" "),n("td",[v._v("1970~2099")]),v._v(" "),n("td",[v._v(", - * /    四个字符")])])])]),v._v(" "),n("p",[n("strong",[v._v("注意事项：")])]),v._v(" "),n("p",[v._v("每一个域都使用数字，但还可以出现如下特殊字符，它们的含义是：")]),v._v(" "),n("p",[v._v("（1）"),n("em",[v._v("：表示匹配该域的任意值。假如在Minutes域使用")]),v._v(", 即表示每分钟都会触发事件。")]),v._v(" "),n("p",[v._v("（2）?：只能用在DayofMonth和DayofWeek两个域。它也匹配域的任意值，但实际不会。因为DayofMonth和DayofWeek会相互影响。例如想在每月的20日触发调度，不管20日到底是星期几，则只能使用如下写法： 13 13 15 20 * ?, 其中最后一位只能用？，而不能使用*，如果使用*表示不管星期几都会触发，实际上并不是这样。")]),v._v(" "),n("p",[v._v("（3）-：表示范围。例如在Minutes域使用5-20，表示从5分到20分钟每分钟触发一次")]),v._v(" "),n("p",[v._v("（4）/：表示起始时间开始触发，然后每隔固定时间触发一次。例如在Minutes域使用5/20,则意味着5分钟触发一次，而25，45等分别触发一次.")]),v._v(" "),n("p",[v._v("（5）,：表示列出枚举值。例如：在Minutes域使用5,20，则意味着在5和20分每分钟触发一次。")]),v._v(" "),n("p",[v._v("（6）L：表示最后，只能出现在DayofWeek和DayofMonth域。如果在DayofWeek域使用5L,意味着在最后的一个星期四触发。")]),v._v(" "),n("p",[v._v("（7）W:表示有效工作日(周一到周五),只能出现在DayofMonth域，系统将在离指定日期的最近的有效工作日触发事件。例如：在 DayofMonth使用5W，如果5日是星期六，则将在最近的工作日：星期五，即4日触发。如果5日是星期天，则在6日(周一)触发；如果5日在星期一到星期五中的一天，则就在5日触发。另外一点，W的最近寻找不会跨过月份 。")]),v._v(" "),n("p",[v._v("（8）LW:这两个字符可以连用，表示在某个月最后一个工作日，即最后一个星期五。")]),v._v(" "),n("p",[v._v("（9）#:用于确定每个月第几个星期几，只能出现在DayofMonth域。例如在4#2，表示某月的第二个星期三。")]),v._v(" "),n("p",[n("strong",[v._v("三、常用表达式例子")])]),v._v(" "),n("p",[v._v("（1）"),n("strong",[v._v("0 0 2 1 * ? *")]),v._v("   表示在每月的1日的凌晨2点调整任务")]),v._v(" "),n("p",[v._v("（2）"),n("strong",[v._v("0 15 10 ? * MON-FRI")]),v._v("   表示周一到周五每天上午10:15执行作业")]),v._v(" "),n("p",[v._v("（3）"),n("strong",[v._v("0 15 10 ? 6L 2002-2006")]),v._v("   表示2002-2006年的每个月的最后一个星期五上午10:15执行作")]),v._v(" "),n("p",[v._v("（4）"),n("strong",[v._v("0 0 10,14,16 * * ?")]),v._v("   每天上午10点，下午2点，4点")]),v._v(" "),n("p",[v._v("（5）"),n("strong",[v._v("0 0/30 9-17 * * ?")]),v._v("   朝九晚五工作时间内每半小时")]),v._v(" "),n("p",[v._v("（6）"),n("strong",[v._v("0 0 12 ? * WED")]),v._v("    表示每个星期三中午12点")]),v._v(" "),n("p",[v._v("（7）"),n("strong",[v._v("0 0 12 * * ?")]),v._v("   每天中午12点触发")]),v._v(" "),n("p",[v._v("（8）"),n("strong",[v._v("0 15 10 ? * *")]),v._v("    每天上午10:15触发")]),v._v(" "),n("p",[v._v("（9）"),n("strong",[v._v("0 15 10 * * ?")]),v._v("     每天上午10:15触发")]),v._v(" "),n("p",[v._v("（10）"),n("strong",[v._v("0 15 10 * * ? *")]),v._v("    每天上午10:15触发")]),v._v(" "),n("p",[v._v("（11）"),n("strong",[v._v("0 15 10 * * ? 2005")]),v._v("    2005年的每天上午10:15触发")]),v._v(" "),n("p",[v._v("（12）"),n("strong",[v._v("0 * 14 * * ?")]),v._v("     在每天下午2点到下午2:59期间的每1分钟触发")]),v._v(" "),n("p",[v._v("（13）"),n("strong",[v._v("0 0/5 14 * * ?")]),v._v("    在每天下午2点到下午2:55期间的每5分钟触发")]),v._v(" "),n("p",[v._v("（14）"),n("strong",[v._v("0 0/5 14,18 * * ?")]),v._v("     在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发")]),v._v(" "),n("p",[v._v("（15）"),n("strong",[v._v("0 0-5 14 * * ?")]),v._v("    在每天下午2点到下午2:05期间的每1分钟触发")]),v._v(" "),n("p",[v._v("（16）"),n("strong",[v._v("0 10,44 14 ? 3 WED")]),v._v("    每年三月的星期三的下午2:10和2:44触发")]),v._v(" "),n("p",[v._v("（17）"),n("strong",[v._v("0 15 10 ? * MON-FRI")]),v._v("    周一至周五的上午10:15触发")]),v._v(" "),n("p",[v._v("（18）"),n("strong",[v._v("0 15 10 15 * ?")]),v._v("    每月15日上午10:15触发")]),v._v(" "),n("p",[v._v("（19）"),n("strong",[v._v("0 15 10 L * ?")]),v._v("    每月最后一日的上午10:15触发")]),v._v(" "),n("p",[v._v("（20）"),n("strong",[v._v("0 15 10 ? * 6L")]),v._v("    每月的最后一个星期五上午10:15触发")]),v._v(" "),n("p",[v._v("（21）"),n("strong",[v._v("0 15 10 ? * 6L 2002-2005")]),v._v("   2002年至2005年的每月的最后一个星期五上午10:15触发")]),v._v(" "),n("p",[v._v("（22）"),n("strong",[v._v("0 15 10 ? * 6#3")]),v._v("   每月的第三个星期五上午10:15触发")]),v._v(" "),n("p"),v._v(" "),n("p",[n("strong",[v._v("注：")])]),v._v(" "),n("p",[v._v("（1）有些子表达式能包含一些范围或列表")]),v._v(" "),n("p",[v._v("例如：子表达式（天（星期））可以为 “MON-FRI”，“MON，WED，FRI”，“MON-WED,SAT”")]),v._v(" "),n("p",[v._v("“*”字符代表所有可能的值")]),v._v(" "),n("p",[v._v("因此，“"),n("em",[v._v("”在子表达式（月）里表示每个月的含义，“")]),v._v("”在子表达式（天（星期））表示星期的每一天")]),v._v(" "),n("p",[v._v("“/”字符用来指定数值的增量\n　　例如：在子表达式（分钟）里的“0/15”表示从第0分钟开始，每15分钟\n在子表达式（分钟）里的“3/20”表示从第3分钟开始，每20分钟（它和“3，23，43”）的含义一样")]),v._v(" "),n("p",[v._v("“？”字符仅被用于天（月）和天（星期）两个子表达式，表示不指定值\n　　当2个子表达式其中之一被指定了值以后，为了避免冲突，需要将另一个子表达式的值设为“？”")]),v._v(" "),n("p",[v._v("“L” 字符仅被用于天（月）和天（星期）两个子表达式，它是单词“last”的缩写\n　　但是它在两个子表达式里的含义是不同的。\n　　在天（月）子表达式中，“L”表示一个月的最后一天\n　　在天（星期）自表达式中，“L”表示一个星期的最后一天，也就是SAT")]),v._v(" "),n("p",[v._v("如果在“L”前有具体的内容，它就具有其他的含义了")]),v._v(" "),n("p",[v._v("例如：“6L”表示这个月的倒数第６天，“FRIL”表示这个月的最一个星期五\n　　注意：在使用“L”参数时，不要指定列表或范围，因为这会导致问题")])])}),[],!1,null,null,null);_.default=o.exports}}]);