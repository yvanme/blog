# 定时清理Tomcat下temp目录

## 介绍

[TOC]

定时清理tomcat temp目录下后缀为".xlsx"的文件：

```java
public class CleanTask {

    public void cleanTemp(){
        File tempFolder = new File(FileUtils.getTempDirectoryPath());
        File[] files = tempFolder.listFiles(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                if(name.endsWith(".xlsx")){
                    return true;
                }
                return false;
            }
        });
        if(files!=null&&files.length>0){
           for(File file:files){
               file.delete();
           } 
        }
    }
}
```

