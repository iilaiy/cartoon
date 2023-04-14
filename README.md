**基于`vite`+`vue3.x`+`vue-router`+`pinia`+`axios`的漫画 app**

项目主要是以一个`vite`-`vue3`的项目搭建为基础，在项目中引入`Eslint`+`Prettier`+`husky`+`lint-staged`+`commitlint`+`commitizen`来规范项目，利用`vue-router`实现路由跳转，使用 Vue 官方团队推荐代替`Vuex`的一款轻量级状态管理库`pinia`对全局数据状态进行管理，`axios`网络通信技术实现数据交互。

相关技术介绍或 API 使用

`pinia`：https://www.qycn.com/xzx/article/17664.html

​ https://pinia.vuejs.org/zh/core-concepts/

- Vite 官方文档：下一代前端开发与构建工具
- pnpm 中文文档：快速的，节省磁盘空间的包管理工具
- eslint 中文文档：javascript 代码检测工具
- Prettier 中文文档：一个“有态度”的代码格式化工具
- husky 中文文档：操作 Git 钩子的工具
- lint-staged 文档：检测本地暂存代码的工具
- commitlint 文档：commit 信息校验的工具
- commitizen 文档：提示提交 commit 信息的工具

代码检测

```
pnpm lint
```

代码格式化

```
pnpm format
```

项目启动

```
pnpm dev
```

代码提交

```
pnpm commit
```
