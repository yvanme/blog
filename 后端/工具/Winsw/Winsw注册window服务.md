# Winsw注册window服务

Windows 服务包装器（Windows service wrapper），用于把.exe或bat文件注册为windows服务。比如把Nginx.exe注册为windows服务，这样做的好处是，每次启动nginx时不用在命令行中输入命令，而且可以随windows系统启动而启动。不用担心服务器意外重启，服务挂掉。

​    github地址：https://github.com/kohsuke/winsw/releases

​    下载地址：https://github.com/kohsuke/winsw/releases

​    目前（2019年 1 月 17 日）最新版本是2.2.0版。有两种选择，WinSW.NET2.exe安装在.netframework2.0中，WinSW.NET4.exe安装在.netframework4.0中，根据安装环境选择需要下载的文件。如图1

![img](https://img2018.cnblogs.com/blog/543925/201907/543925-20190725143553769-1547157062.png)

 

 

 

   下载完成后，需要通过配置文件进行配置，参照图1中sample-minimal.xml或sample-allOptions.xml中所示。

 

使用方法

以WinSW.NET4.exe为例，下载WinSW.NET4.exe，放至待包装的exe文件夹中，它可以自定义名字，比如这里我们命名为nginxservice.exe。图中的.log文件都是启动后自动生成的。

![img](https://img2018.cnblogs.com/blog/543925/201907/543925-20190725143837590-1598517726.png)

 

最重要的是，要在nginxservice.exe同目录中新建一个同名的xml文件，对其配置。如前所述，该文件的格式在sample-minimal.xml或sample-allOptions.xml中所示。

这里所配置的是最简单的格式，更丰富的配置可以在sample-allOptions中查看。

![img](https://img2018.cnblogs.com/blog/543925/201907/543925-20190725144012118-704768373.png)

![img](https://img2018.cnblogs.com/blog/543925/201907/543925-20190725145102481-1500752515.png)

其中id和name不能与系统中其它服务的冲突。

配置完成后，在命令行中进行安装，

nginxservice.exe install

卸载命令：nginxservice.exe uninstall

![img](https://img2018.cnblogs.com/blog/543925/201907/543925-20190725144056939-1696536539.png)

 

 

安装后运行services.msc打开服务查看器，就能看到该服务

 

![img](https://img2018.cnblogs.com/blog/543925/201907/543925-20190725144111543-1851843846.png)

 

 

查看它的属性，就是我们在配置文件中的配置信息。

 

![img](https://img2018.cnblogs.com/blog/543925/201907/543925-20190725144134720-336909101.png)