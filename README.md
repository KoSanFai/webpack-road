# webpack-road
From Noob To God

:boom: 本地如何运行生产包？
```
// 1.全局安装express-generator生成器(express-generator是express新版本分离出来的命令工具，想要使用express命令必须装这个依赖)
npm install express-generator -g

// 2.创建一个express项目
express projectName

// 3.进入项目目录，安装相关项目依赖
npm install

// 4.将build生成的dist文件夹下的所有文件复制到express项目的public文件夹下面

// 5.运行 npm start 来启动express项目
npm start

// 6.打开浏览器，输入localhost:3000就可以看到效果了
