module.exports = {
  // 指定自动换行的行长，默认值：80
  printWidth: 80,

  // 指定每个缩进级别的空格数，默认值：2
  tabWidth: 2,

  // 用制表符代替空格缩进行，默认值：false
  useTabs: false,

  // 在语句的末尾打印分号，默认值：true
  semi: false,

  // 用单引号代替双引号，默认值：false
  singleQuote: true,

  // 选项：as-needed 只在需要的对象属性周围添加引号
  // 选项：consistent 如果对象中至少有一个属性需要引用，则需要引用所有属性
  // 选项：preserve 对象属性中引号的输入使用
  // 默认值：as-needed
  quoteProps: 'as-needed',

  // 在JSX中使用单引号而不是双引号，默认值：false
  jsxSingleQuote: false,

  // 在多行逗号分隔的语法结构中，尽可能打印尾随逗号(例如，单行数组的后面永远不会有逗号)
  // 选项：es5 尾随逗号在ES5中有效(对象、数组等)。在TypeScript中，类型参数中没有后面的逗号
  // 选项：none 后面没有逗号
  // 选项：all 尽可能以逗号结尾(包括函数参数和调用)
  // 默认值：es5
  trailingComma: 'es5',

  // 在对象字面量的括号之间打印空格，默认值：true，例如：{ foo: bar }
  bracketSpacing: true,

  // 将多行HTML (HTML, JSX, Vue, Angular)元素的>放在最后一行的末尾，而不是单独放在下一行(不适用于自关闭元素)。默认值：false
  bracketSameLine: false,

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
