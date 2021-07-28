# Shell脚本练习

系统：CentOS7

*1.*清理/home/dmadmin/logs目录下以日期命名的文件夹，当该文件夹名称所代表的日期大于一天则删除该文件夹。

```shell
#!/bin/bash
historyDir=/home/dmadmin/logs/
today=$(date +%Y-%m-%d)
echo "---------today is $today-----------"
tt=`date -d '1 days ago' +%Y-%m-%d`
echo "next is to delete release before $tt"
tt1=`date -d $tt +%s`  #小于此数值的文件夹删掉
#echo $tt1 
for file in ${historyDir}*
do
    if test -d $file
        then
        name=`basename $file`
        #echo $name
        curr=`date -d $name +%s`
        if [ $curr -le $tt1 ]
            then
                echo " delete $name-------"
                rm -rf ${historyDir}${name}
        fi
    fi
done
```

*2.*统计指定分区的使用率。

```shell
#!/bin/bash
# 统计根分区使用率
#指定分区为/dev/sda1，也可以从参数获取
dir_path=/dev/sda1
#获取第五列数据，并去掉%号，注意，在nfs上时，取顺位第4位为使用率百分比
rate=$(df -h| grep $dir_path | awk '{print $5}' | cut -d "%" -f1)
 
if [ $rate -ge 20 ]
   then
        echo "rate is $rate"
   else
        echo "rate is $rate"
fi
```

*3.*获取系统各个分区使用率，当有分区用率超过50%时报警。

```shell
#!/bin/bash
#取得每个分区的使用百分比
percent=`df -k | grep -v Filesystem| awk '{print int($5)}'`
 
#循环判断分区使用率是否超过50%
for each_one in $percent
do
    #判断使用率是否超过50%
	if [ $each_one -ge 50 ];then
		echo "warning";	 
	fi
done
```

