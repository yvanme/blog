# idea提交本地项目到git

## 介绍

[TOC]

### 1、选中项目->vcs->Import into version Control->Create git respository

### 2、给项目设置远程远程仓库

```
 git remote add origin http://git.oschina.net/***/***.git 
```

### 3、抓取远程仓库数据，并自动合并远程分支

```
git pull origin master 
```

### 4、更新本地数据到Git@OSC

```
git push origin master
```