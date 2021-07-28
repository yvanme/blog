# linux下使用 du查看某个文件或目录占用磁盘空间的大小



du -ah --max-depth=1     这个是我想要的结果  a表示显示目录下所有的文件和文件夹（不含子目录），h表示以人类能看懂的方式，max-depth表示目录的深度。

du命令用来查看目录或文件所占用磁盘空间的大小。常用选项组合为：du -sh

　　一、du的功能：`du` reports the amount of disk space used by the specified files and for each subdirectory (of directory arguments). with no arguments,`du` reports the disk space for the current directory。

　　很明显，与df不同，它用来查看文件或目录所占用的磁盘空间的大小。

 　二、du常用的选项：

　　-h：以人类可读的方式显示

　　-a：显示目录占用的磁盘空间大小，还要显示其下目录和文件占用磁盘空间的大小

　　-s：显示目录占用的磁盘空间大小，不要显示其下子目录和文件占用的磁盘空间大小

　　-c：显示几个目录或文件占用的磁盘空间大小，还要统计它们的总和

　　--apparent-size：显示目录或文件自身的大小

　　-l ：统计硬链接占用磁盘空间的大小

　　-L：统计符号链接所指向的文件占用的磁盘空间大小

　　一、du -h：这个就不多说了。

　　二、du -a：使用此选项时，显示目录和目录下子目录和文件占用磁盘空间的大小。

![img](http://d.hiphotos.baidu.com/album/pic/item/aec379310a55b319c03a678543a98226cefc177a.jpg)

　　可以看出，默认情况下du只显示download目录占用磁盘空间的大小，而使用-a选项后，它不仅显示了目录（最后一行），而且显示了目录下各个文件占用磁盘空间的大小。

　　三、du -s：使用此选项时，du只显示目录所占用磁盘空间的大小，而不显示其下子目录和文件占用磁盘空间的信息。

![img](http://d.hiphotos.baidu.com/album/pic/item/a8ec8a13632762d0ac34404fa0ec08fa513dc63c.jpg)

　　默认情况下，du不显示目录下文件占用磁盘空间的信息，但它会显示其下子目录占用磁盘空间的信息；而使用-s选项以后，只显示xx目录占用磁盘空间的大小。

　　四、du --apparent-size：显示文件或目录自身大小，而不是它们占用的磁盘空间大小。文件或目录占用磁盘空间的大小与它们自身大小有时候并非完全一致；这种现象非linux所独有，windows里也是如此。我们看这个选项的帮助文档的解释：The apparent size of a file is the number of bytes reported by `wc –c` regular files ,or more generally, `ls –l –block-size=1` or `stat –format=%s`.For example, a file containing the word `zoo` with no newline would, of course, have an apparent size of 3. Such a small file may require anywhere from 0 to 16 kib or more of disk space, depending on the type and configuration of the file system on which the file resides.

　　这段话给出了文件或目录自身大小与占用磁盘空间大小的区别。他下面举出了一个更加夸张的例子，这里就不把它写出来了。我们知道了：wc或ls --block-size显示的是其自身大小，而du给出的则是占用的磁盘空间的大小。

![img](http://b.hiphotos.baidu.com/album/pic/item/b03533fa828ba61e49372ddf4134970a314e5961.jpg)

 　五、du -c：使用此选项时，不仅显示几个文件或目录各自占用磁盘空间的大小，还统计它们的总和。

![img](http://c.hiphotos.baidu.com/album/pic/item/4bed2e738bd4b31cc5ff714b87d6277f9f2ff87b.jpg)
如图所示，加上-c选项后，du不仅显示两个目录各自占用磁盘空间的大小，还在最后一行统计它们的总和。

　　六、du -l：这个选项主要是针对硬链接。在统计目录占用磁盘空间大小时，-l选项会把硬链接也统计进来。帮助文档是这样解释的：Count the size of all files,even if they have appeared already(as a hard link)。

![img](http://a.hiphotos.baidu.com/album/pic/item/908fa0ec08fa513d468e882e3d6d55fbb2fbd91e.jpg)

　　我们在download目录下建立一个硬链接，指向本目录下的一个文件。不使用-l选项时，du发现硬链接指向本目录下的文件，于是自动忽略该链接文件，以免造成重复统计；使用-l选项，du才会把硬链接文件也统计进来。

　　七、du -L：这个选项主要是针对符号链接。它会把符号链接所指向的文件占用磁盘空间的大小也统计进来。帮助文档是这样解释的：Dereference symbolic links(show the disk space used by the file or directory that the link points to instead of the space used by the link)。

![img](http://c.hiphotos.baidu.com/album/pic/item/09fa513d269759ee5f74843bb2fb43166d22df1e.jpg)

 　　我们在download目录下创建一个符号链接，指向本目录下的一个文件。我们看到上面图片中显示的操作结果，当使用-L选项时，du会把符号链接所指向的文件的大小也统计到目录里来。

　　另外我们看du -lh的结果，与du -h相同，好像没有统计出符号链接的大小；其实并非如此。从实际操作来看，符号链接本身似乎并不占用磁盘空间，所以才出现上述情况。

![img](http://h.hiphotos.baidu.com/album/pic/item/63d0f703918fa0ec570481fd269759ee3c6ddb7b.jpg)

　　最后，du命令在统计目录占用磁盘空间时，默认不统计链接文件（无论是硬链接或是符号链接），所以要用-l和-L选项特地指出来；此外，du命令默认不显示目录下文件占用磁盘空间的信息，但是却默认显示其下子目录所占用磁盘空间的信息。怪哉。

 

du -sh : 查看当前目录总共占的容量。而不单独列出各子项占用的容量 

du -lh --max-depth=1 : 查看当前目录下一级子文件和子目录占用的磁盘容量。



du [-abcDhHklmsSx] [-L <符号连接>][-X <文件>][--block-size][--exclude=<目录或文件>] [--max-depth=<目录层数>][--help][--version][目录或文件]

常用参数：

-a或-all 为每个指定文件显示磁盘使用情况，或者为目录中每个文件显示各自磁盘使用情况。

-b或-bytes 显示目录或文件大小时，以byte为单位。

-c或–total 除了显示目录或文件的大小外，同时也显示所有目录或文件的总和。

-D或–dereference-args 显示指定符号连接的源文件大小。

-h或–human-readable 以K，M，G为单位，提高信息的可读性。

-H或–si 与-h参数相同，但是K，M，G是以1000为换算单位,而不是以1024为换算单位。

-k或–kilobytes 以1024 bytes为单位。

-l或–count-links 重复计算硬件连接的文件。

-L<符号连接>或–dereference<符号连接> 显示选项中所指定符号连接的源文件大小。

-m或–megabytes 以1MB为单位。

-s或–summarize 仅显示总计，即当前目录的大小。

-S或–separate-dirs 显示每个目录的大小时，并不含其子目录的大小。

-x或–one-file-xystem 以一开始处理时的文件系统为准，若遇上其它不同的文件系统目录则略过。

-X<文件>或–exclude-from=<文件> 在<文件>指定目录或文件。

–exclude=<目录或文件> 略过指定的目录或文件。

–max-depth=<目录层数> 超过指定层数的目录后，予以忽略。

–help 显示帮助。

–version 显示版本信息。



1> 要显示一个目录树及其每个子树的磁盘使用情况

du /home/linux

这在/home/linux目录及其每个子目录中显示了磁盘块数。

2> 要通过以1024字节为单位显示一个目录树及其每个子树的磁盘使用情况

du -k /home/linux

这在/home/linux目录及其每个子目录中显示了 1024 字节磁盘块数。

3> 以MB为单位显示一个目录树及其每个子树的磁盘使用情况

du -m /home/linux

这在/home/linux目录及其每个子目录中显示了 MB 磁盘块数。

4> 以GB为单位显示一个目录树及其每个子树的磁盘使用情况

du -g /home/linux

这在/home/linux目录及其每个子目录中显示了 GB 磁盘块数。

5>查看当前目录下所有目录以及子目录的大小：

du -h .

“.”代表当前目录下。也可以换成一个明确的路径

-h表示用K、M、G的人性化形式显示

6>查看当前目录下user目录的大小，并不想看其他目录以及其子目录：

du -sh user

-s表示总结的意思，即只列出一个总结的值

du -h --max-depth=0 user

--max-depth=n表示只深入到第n层目录，此处设置为0，即表示不深入到子目录。

7>列出user目录及其子目录下所有目录和文件的大小：

du -ah user

-a表示包括目录和文件

8>列出当前目录中的目录名不包括xyz字符串的目录的大小：

du -h --exclude='*xyz*'

9>想在一个屏幕下列出更多的关于user目录及子目录大小的信息：

du -0h user

-0（杠零）表示每列出一个目录的信息，不换行，而是直接输出下一个目录的信息。

10>只显示一个目录树的全部磁盘使用情况

du -s /home/linux



11>查看各文件夹大小:du -h --max-depth=1

![img](http://img.blog.csdn.net/20130827191928796?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvb3V5YW5nX3Blbmc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)