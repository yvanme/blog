# SQL练习

数据库：MySQL

版本：5.7.28

测试数据创建sql:

```sql
-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `name` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `grade` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('张三', '语文', '81');
INSERT INTO `student` VALUES ('张三', '数学', '75');
INSERT INTO `student` VALUES ('李四', '语文', '76');
INSERT INTO `student` VALUES ('李四', '数学', '90');
INSERT INTO `student` VALUES ('王五', '语文', '81');
INSERT INTO `student` VALUES ('王五 ', '数学', '100');
INSERT INTO `student` VALUES ('王五', '英语', '90');
```

*1.*用一条*SQL* 语句 查询出每门课都大于*80* 分的学生姓名

```
select name from student group by name having min(grade)>80
```

