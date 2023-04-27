### **基于`vite`+`vue3.x`+ `vant4`+`vue-router`+`pinia`+`axios`的漫画 app**

项目主要是以一个`vite`-`vue3`的项目搭建为基础，在项目中引入`Eslint`+`Prettier`+`husky`+`lint-staged`+`commitlint`+`commitizen`来规范项目

项目开发时间: 4.15

数据接口：

```
https://www.kuaikanmanhua.com/v2/pweb/daily/topics?pos=6  // 获取每日更新  pos 星期几 0~6
https://www.kuaikanmanhua.com/v2/pweb/ugc/rec_topics // 原创
https://www.kuaikanmanhua.com/v2/pweb/ugc/topics // 最新上架

 http://m.kuaikanmanhua.com/v2/mweb/ugc/popularity_rank/topics?diffServerTimestamp=1615824259661&tag_id=20  // 投稿人气

https://www.kuaikanmanhua.com/v1/search/by_tag?since=0&count=24&f=3&tag=63&sort=1&query_category={"update_status":1}  // 获取分类数据
// update_status  书本状态        0 全部   1连载中 2完结
// count 返回数据数量
// sort 排序 1 推荐 2 最火热 3 新上架
// tag 分类  0 全部 20 恋爱 83 纯爱 47 校园  82 强剧情 46 古风 22 奇幻 67 热血 57 日漫 60 韩漫 77 大女主 40 完结 80 穿越 62 萌系 81 恐怖 65 悬疑 63 玄幻 71 搞笑 48 都市 54 正能量 52 总裁 76 投稿

https://www.kuaikanmanhua.com/v1/graph/pc/feeds/getRecommendFeed?uid=0&webTokenId=1615007958330_FFwnyURnzD0rgO2&since=0&limit=20  //世界
https://www.kuaikanmanhua.com/v2/pweb/home // 获取首页数据
https://www.kuaikanmanhua.com/v2/pweb/rank_type_list // 获取分类数据
https://www.kuaikanmanhua.com/v2/pweb/rank/topics?rank_id=5 获取榜单信息
https://www.kuaikanmanhua.com/v2/pweb/all_rank/topics // 获取全部榜单数据
https://www.kuaikanmanhua.com//v2/pweb/rank_type_list // 获取榜单列表
https://www.kuaikanmanhua.com/v1/search/topic?q=任翔&f=3&size=18 // 获取搜索结果
https://www.kuaikanmanhua.com/v1/search/suggestion_topic_author?q=元尊&type=2&f=2 // 获取模糊搜索
https://kuaikanmanhua.com//v1/search/by_tag?since=0&count=24&f=3&tag=63&sort=1&query_category={"update_status":1}  //  分类搜索
https://m.kuaikanmanhua.com/search/mini/topic/multi_filter?page=1&size=6&tag_id=63&gender=0&sort=1&fav_filter=0&update_status=1   // 分类获取数据
https://www.kuaikanmanhua.com/v2/pweb/topic/9265 // 获取漫画的详情 id
https://www.kuaikanmanhua.com//v2/pweb/comic/353105 // 获取漫画章节详情· id
https://m.kuaikanmanhua.com/mini/v1/comic/mkuaikan/rank_list?limit=6&since=2&need_ranks=0&rank_id=5 移动端排行
https://m.kuaikanmanhua.com/v2/mweb/comic/65709 移动端获取章节
http://m.kuaikanmanhua.com/search/mini/hot_word?&page=1&size=10 // 获取搜索热词
http://m.kuaikanmanhua.com/search/mini/topic/title_and_author?page=1&size=20&q=%E6%96%97%E7%BD%97%E5%A4%A7%E9%99%86 移动端搜索

```

相关技术介绍或 API 使用

`pinia`：https://www.qycn.com/xzx/article/17664.html

https://pinia.vuejs.org/zh/core-concepts/

- Vite 官方文档：下一代前端开发与构建工具
- pnpm 中文文档：快速的，节省磁盘空间的包管理工具
- eslint 中文文档：javascript 代码检测工具
- Prettier 中文文档：一个“有态度”的代码格式化工具
- husky 中文文档：操作 Git 钩子的工具
- lint-staged 文档：检测本地暂存代码的工具
- commitlint 文档：commit 信息校验的工具
- commitizen 文档：提示提交 commit 信息的工具

#### 规范项目构建步骤

##### 安装 Eslint

```
pnpm add eslint -D
```

##### 初始化 Eslint

```
pnpm eslint --init

(1) How would you like to use ESLint? （你想如何使用ESLint？）
选择：To check syntax and find problems （检查语法并发现问题）

(2) What type of modules does your project use? （你的项目使用什么类型的模块？）
选择：JavaScript modules (import/export) （JavaScript模块(导入/导出)）

(3) Which framework does your project use? （你的项目使用哪个框架？）
选择：Vue.js

(4) Does your project use TypeScript? （你的项目使用TypeScript吗？）
选择：No

(5) Where does your code run? （你的代码在哪里运行？）
选择：Browser,Node

(6) What format do you want your config file to be in? (您希望您的配置文件采用什么格式？)
选择：JavaScript

(7) Would you like to install them now? （您现在要安装它们吗？）
选择：Yes

(8) Which package manager do you want to use? （您想使用哪个包管理器？）
选择：pnpm

初始化后，会生成.eslintrc.cjs配置文件
```

##### 在`package.json`文件中的`script`中添加命令

```
{
    ...
    "scripts": {
    	...
+       // eslint . 为指定lint当前项目中的文件
+       // --ext 为指定lint哪些后缀的文件
+       // --fix 开启自动修复
+       "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
    }
    ...
}
```

##### 安装 Prettier

```
pnpm add prettier -D
```

##### 在根目录下新建`.prettierrc.cjs`文件

```
module.exports = {
  // 指定自动换行的行长，默认值：80
  // printWidth: 80,

  // 指定每个缩进级别的空格数，默认值：2
  // tabWidth: 2,

  // 用制表符代替空格缩进行，默认值：false
  // useTabs: false,

  // 在语句的末尾打印分号，默认值：true
  semi: false,

  // 用单引号代替双引号，默认值：false
  singleQuote: true,

  // 选项：as-needed 只在需要的对象属性周围添加引号
  // 选项：consistent 如果对象中至少有一个属性需要引用，则需要引用所有属性
  // 选项：preserve 对象属性中引号的输入使用
  // 默认值：as-needed
  // quoteProps: 'as-needed',

  // 在JSX中使用单引号而不是双引号，默认值：false
  // jsxSingleQuote: false,

  // 在多行逗号分隔的语法结构中，尽可能打印尾随逗号(例如，单行数组的后面永远不会有逗号)
  // 选项：es5 尾随逗号在ES5中有效(对象、数组等)。在TypeScript中，类型参数中没有后面的逗号
  // 选项：none 后面没有逗号
  // 选项：all 尽可能以逗号结尾(包括函数参数和调用)
  // 默认值：es5
  // trailingComma: 'es5',

  // 在对象字面量的括号之间打印空格，默认值：true，例如：{ foo: bar }
  // bracketSpacing: true,

  // 将多行HTML (HTML, JSX, Vue, Angular)元素的>放在最后一行的末尾，而不是单独放在下一行(不适用于自关闭元素)。默认值：false
  // bracketSameLine: false,

  // 在唯一的箭头函数参数周围包含圆括号
  // 选项：always 总是包含圆括号。例如：(x) => x
  // 选项：avoid 尽可能圆括号。例如：x => x
  // 默认值：always
  arrowParens: 'avoid',

  // 尾行
  // 选项：lf，仅换行
  // 选项：crlf，回车符 + 换行符
  // 选项：cr，仅回车符
  // 选项：auto，维护现有的行尾（一个文件中的混合值通过查看第一行后使用的内容进行规范化）
  // 默认值：lf
  endOfLine: 'auto',
}
```

##### 在`package.json`中的`script`中添加命令

```
{
    ...
    "scripts": {
        ...
+       "format": "prettier --write \"./**/*.{html,vue,ts,js,cjs,json,md}\"",
    }
    ...
}
```

##### 解决`Eslint`与`Prettier`的冲突(安装依赖)

```
pnpm add eslint-config-prettier eslint-plugin-prettier -D
```

##### 在 `.eslintrc.cjs`中`extends`的最后添加一个配置

```
{
    extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
+    // 新增，必须放在最后面
+    'plugin:prettier/recommended'
  ],
}
```

##### 配置 husky

```
# 安装husky
pnpm add husky -D
```

##### 在`package.json`的`script`中添加命令

```
{
	...
	"script": {
		...
+		"prepare": "husky install"
	}
	...
}
```

##### 初始化 husky

```
pnpm prepare
```

##### 添加`pre-commit`钩子

```
npx husky add .husky/pre-commit "pnpm lint && pnpm format"
```

##### 配置 lint-staged

```
# 安装lint-staged
pnpm add lint-staged -D
```

##### 在 `package.json`中配置 lint-staged

```
{
  ...
+ "lint-staged": {
+   ".vue,.js,.ts,.jsx,.tsx": "eslint --fix",
+   "./**/*.{html,vue,ts,js,cjs,json,md}": "prettier --write",
+   "./**/*.{css,scss,vue,html}": [
+     "prettier --write"
+   ]
+ },
}
```

##### 修改`.husky/pre-commit`文件

```
...
- pnpm lint && pnpm format && pnpm lint:style
+ npx lint-staged
```

##### 配置 commitlint

```
# 安装commitlint
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

##### 在根目录新建`commitlint.config.cjs`文件

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'type-empty': [2, 'never'],
    'scope-empty': [0],
    'subject-empty': [2, 'never'],
  },
}
```

##### 添加`commit-msg`钩子

```
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

##### 配置 commitizen

```
# 安装commitizen
pnpm add -D commitizen cz-conventional-changelog
```

##### 在`package.json`中的`script`中添加命令及配置

```
{
    ...
    "scripts": {
        ...
+       "commit": "cz"
    }
    ...
+   "config": {
+     "commitizen": {
+       "path": "cz-conventional-changelog"
+     }
+   }
}
```

##### 自定义 commitizen 规则

```
# 使用cz-customizable工具
pnpm add cz-customizable -D
```

##### 在根目录下新建`.cz-config.cjs`文件

```
module.exports = {
  types: [
    { value: 'feat', name: '✨feat:     新功能' },
    { value: 'fix', name: '🐛fix:      修复' },
    { value: 'docs', name: '✏️docs:      文档变更' },
    { value: 'style', name: '💄style:    代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: '♻️refactor:  重构(既不是增加feature，也不是修复bug)',
    },
    { value: 'perf', name: '⚡️perf:     性能优化' },
    { value: 'test', name: '✅test:     增加测试' },
    { value: 'chore', name: '🚀chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: '⏪️revert:   回退' },
    { value: 'build', name: '📦️build:    打包' },
    { value: 'ci', name: '👷CI:       related changes' },
  ],
  scopes: [
    { name: '模块1' },
    { name: '模块2' },
    { name: '模块3' },
    { name: '模块4' },
  ],
  messages: {
    type: '请选择提交类型(必选):',
    scope: '请输入文件修改范围(可选):',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    breaking: '非兼容性说明 (可选):\n',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(Y/n)',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  subjectLimit: 120,
}
```

##### 修改`package.json`

```
{
    ...
    "scripts": {
        ...
-       "commit": "cz"
+		"commit": "git-cz"
    }
    ...
    "config": {
      "commitizen": {
-       "path": "cz-conventional-changelog"
+		"path": "cz-customizable"
      },
+     "cz-customizable": {
+       "config": ".cz-config.cjs"
+     }
    }
}
```

##### 执行`pnpm commit` ，根据`.cz-config.cjs`配置提示提交信息

*注意：*需要先把代码提交到本地暂存区

#### 移动端 vue 适配解决方案,（兼容 vant）

```
# 安装
pnpm i postcss-px-to-viewport -D

# main.js中引入amfe-flexible
import 'amfe-flexible'

# vite.config.js

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75 // 因为vant框架是以375px的稿子为基础的，所以需要适配一下
          },
          propList: ['*'], // 需要转换的css属性，默认*全部
          minPixelValue: 2,
        })
      ]
    }
  }
})

```

#### Vant

```
# 安装
pnpm add vant

# 全局引入
import Vant from 'vant';
import 'vant/lib/index.css';
app.use(Vant);
```

#### 相关脚本命令

##### 项目启动

```
pnpm dev
```

##### 代码检测

```
pnpm lint
```

##### 代码格式化

```
pnpm format
```

##### 代码提交

```
git add *
pnpm commit
git push origin main
```

##### 发布

```
# 项目打包
pnpm build

# 预览打包效果
pnpm preview
```
