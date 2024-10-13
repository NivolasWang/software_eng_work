# 通讯录存储系统环境配置与说明

##环境
```
此通讯录存储系统前端使用html，css，javascript，前后端交互使用axios，后端使用node.js，请安装并且配置node.js环境
```

##安装包
```
所需安装的包存储于pakage.json中，请在该文件夹目录终端输入 npm install 来安装express和mysql2
```

##前端
```
前端文件夹为web文件夹，里面的 index.html , style.css ,script.js 分别用来实现页面块的排布，样式的调整，基础前端逻辑与和后端交互
```

##后端
```
后端文件夹为server文件夹，里面的 script.js , mysql.js , get_message.js , dateFormat.js 分别用来实现基础的本地服务器的搭建，与mysql数据库的增删改查操作，各个路由端口的搭建，时间的记录与格式化日期和时间
```

##使用前要做的调整
```
请提前创建一个名叫informations，包含ID,name,age,phone,gender,time属性的mysql表。并且将ID属性定为关键字段，唯一引索且自动增加，所有属性定为非空。并且于 mysql.js 文件开头备注区域填入该数据库表所在的数据库名称，mysql用户名与mysql密码
```
