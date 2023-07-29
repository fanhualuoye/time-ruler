module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    afterEach: true,
    describe: true,
    it: true,
    expect: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  rules: {
    'indent': ['warn', 4, { 'SwitchCase': 1 }], //强制使用一致的缩进
    'no-console': 'off', // 允许打印
    'strict': ['off', 'function'], //要求或禁止使用严格模式指令
    'brace-style': 0,  //强制在代码块中使用一致的大括号风格
    'comma-style': [1, 'last'],  //强制使用一致的逗号风格
    'default-case': 2, //要求 switch 语句中有 default 分支
    'no-floating-decimal': 2, //	禁止数字字面量中使用前导和末尾小数点 如 .1234 或 999.
    'space-before-function-paren': [1, {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }], //强制在 function的左括号之前使用一致的空格
    'keyword-spacing': [2, { 'after': true }], //制在关键字前后使用一致的空格
    'space-before-blocks': 1,  //强制在块之前使用一致的空格
    'wrap-iife': [2, 'any'], //	要求 IIFE 使用括号括起来
    // 'no-alert': 2, //禁用 alert、confirm 和 prompt
    'curly': [2, 'all'], //强制所有控制语句使用一致的括号风格
    'no-empty': [2, { 'allowEmptyCatch': true }], // 	禁止出现空语句块
    'no-obj-calls': 2,  // 禁止把全局对象作为函数调用
    'no-unused-vars': [1, { 'vars': 'local', 'args': 'after-used' }], //禁止出现未使用过的变量
    'no-invalid-regexp': 2, //禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'comma-dangle': [1, 'never'], //要求或禁止末尾逗号
    'no-undef': 2, //禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-new': 2, //禁止使用 new 以避免产生副作用
    'no-extra-semi': 0, //	禁止不必要的分号
    'semi': ['error', 'never'],//要求或禁止使用分号代替 ASI
    'no-caller': 1, //禁用 arguments.caller 或 arguments.callee
    'no-unreachable': 2,  //禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-multi-str': 1, //禁止使用多行字符串
    // 'no-mixed-spaces-and-tabs': 1, //禁止空格和 tab 的混合缩进
    'no-trailing-spaces': 1, //禁用行尾空格
    'space-infix-ops': 1, //	要求操作符周围有空格
    'no-with': 2, //禁用 with 语句
    'dot-notation': 1, //强制尽可能地使用点号
    'semi-spacing': 1, //强制分号之前和之后使用一致的空格
    'key-spacing': [1, { 'beforeColon': false, 'afterColon': true, 'mode': 'minimum' }], //强制在对象字面量的属性中键和值之间使用一致的间距
    'space-in-parens': [1, 'never'], //强制在圆括号内使用一致的空格
    'prefer-const': 2, //要求使用 const 声明那些声明后不再被修改的变量
    'accessor-pairs': 2, //强制 getter 和 setter 在对象中成对出现
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],  //强制箭头函数的箭头前后使用一致的空格
    'block-spacing': [2, 'always'], //禁止或强制在代码块中开括号前和闭括号后有空格
    'camelcase': [0, {
      'properties': 'always'
    }],  //强制使用骆驼拼写法命名约定
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],  //	强制在逗号前后使用一致的空格
    'constructor-super': 2, //	要求在构造函数中有 super() 的调用
    'dot-location': [2, 'property'], //强制在点号之前和之后一致的换行
    'eol-last': 2, //要求或禁止文件末尾存在空行
    'generator-star-spacing': 0, //	强制 generator 函数中 * 号周围使用一致的空格
    'handle-callback-err': [2, '^(err|error)$'], //要求回调函数中有容错处理
    'jsx-quotes': [2, 'prefer-single'],  //强制在 JSX 属性中一致地使用双引号或单引号
    'new-parens': 2, //强制或禁止调用无参构造函数时有圆括号
    'no-array-constructor': 2, //禁用 Array 构造函数
    'no-class-assign': 2, //禁止修改类声明的变量
    'no-cond-assign': 2,  //	禁止条件表达式中出现赋值操作符
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-control-regex': 2, //禁止在正则表达式中使用控制字符
    'no-delete-var': 2,  // 	禁止删除变量
    'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
    'no-dupe-class-members': 2,  //	禁止类成员中出现重复的名称
    'no-dupe-keys': 2,  //	禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2,  //禁止出现重复的 case 标签
    'no-empty-character-class': 2,  //禁止在正则表达式中使用空字符集
    'no-empty-pattern': 2,  //禁止使用空解构模式
    'no-eval': 2,  //	禁用 eval()
    'no-ex-assign': 2,  // 禁止对 catch 子句的参数重新赋值
    'no-extra-bind': 2, // 	禁止不必要的 .bind() 调用
    'no-extra-boolean-cast': 2, //禁止不必要的布尔转换
    'no-fallthrough': 2,  //禁止 case 语句落空
    'no-func-assign': 2,  // 禁止对 function 声明重新赋值
    'no-implied-eval': 2,  //禁止使用类似 eval() 的方法
    'no-inner-declarations': 0, //禁止在嵌套的块中出现变量声明或 function 声明
    'no-irregular-whitespace': 2,  //禁止不规则的空白
    'no-iterator': 2, //禁用 __iterator__ 属性
    'no-label-var': 2, //不允许标签与变量同名
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }], //禁用标签语句
    'no-lone-blocks': 2,  //禁用不必要的嵌套块
    'no-native-reassign': 2, //禁止重新分配本机对象
    'no-negated-in-lhs': 2, //不允许在in表达式中取反左操作数
    'no-new-object': 2, //禁用 Object 的构造函数
    'no-new-require': 2,  //禁止调用 require 时使用 new 操作符
    'no-new-symbol': 2,  //	禁止 Symbolnew 操作符和 new 一起使用
    'no-new-wrappers': 2, //禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-octal': 2, //	禁用八进制字面量
    'no-octal-escape': 2, //禁止在字符串中使用八进制转义序列
    'no-path-concat': 2,  //禁止对 __dirname 和 __filename 进行字符串连接
    'no-proto': 2, //	禁用 __proto__ 属性
    'no-redeclare': 2,  //禁止多次声明同一变量
    'no-regex-spaces': 2,  //	禁止正则表达式字面量中出现多个空格
    'no-self-assign': 2,  //	禁止自我赋值
    'no-self-compare': 2,  // 禁止自身比较
    'no-sequences': 2,   //	禁用逗号操作符
    'no-shadow-restricted-names': 2,  // 禁止将标识符定义为受限的名字
    'no-spaced-func': 2,  //不允许在函数标识符及其应用程序之间使用空格
    'no-sparse-arrays': 2,  //	禁用稀疏数组
    'no-this-before-super': 2,  //禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-undef-init': 2,  //	禁止将变量初始化为 undefined
    'no-unexpected-multiline': 2, // 禁止出现令人困惑的多行表达式
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],  //禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unsafe-finally': 2,  //禁止在 finally 语句块中出现控制流语句
    'no-useless-call': 2,  //	禁止不必要的 .call() 和 .apply()
    'no-useless-computed-key': 2,  //禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 2,  //禁用不必要的构造函数
    'no-useless-escape': 0,  //禁用不必要的转义字符
    'no-whitespace-before-property': 2,  //禁止属性前有空白
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],  //	强制在一元操作符前后使用一致的空格
    'template-curly-spacing': [2, 'never'],  //要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'use-isnan': 2,  //要求使用 isNaN() 检查 NaN
    'valid-typeof': 2,  //强制 typeof 表达式与有效的字符串进行比较
    'yield-star-spacing': [2, 'both'], //强制在 yield* 表达式中 * 周围使用空格
    'yoda': [2, 'never'],  //要求或禁止 “Yoda” 条件
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,  //禁用 debugger
    'object-curly-spacing': [1, 'always', { objectsInObjects: true }],  //强制在大括号中使用一致的空格
    'array-bracket-spacing': [2, 'never'],  //强制数组方括号中使用一致的空格
    'no-var': 2,  //要求使用 let 或 const 而不是 var
    'vue/max-attributes-per-line': 0,  //强制执行每行的最大属性数
    'vue/attributes-order': 0,  //强制属性顺序
    'vue/html-self-closing': 0, //html自动关闭
    "vue/no-v-html":"off",
    'vue/require-default-prop': 0,  //prop 需要默认值
    'vue/no-parsing-error': 0, //禁止分析中的错误
    'vue/multiline-html-element-content-newline': 0, //在多行元素的内容前后需要换行符
    'vue/singleline-html-element-content-newline': 0, //在单行元素的内容前后需要换行符
    'vue/no-use-v-if-with-v-for': [1, {
      'allowUsingIterationVar': true
    }],// v-for相同的元素上使用v-if
    'vue/require-prop-type-constructor': 0, //要求属性类型为构造函数
    'vue/html-closing-bracket-newline': 0, //在标记的右括号前需要或不允许换行
    'vue/arrow-spacing': [2, {
      'before': true,
      'after': true
    }], //在箭头函数中的箭头前后强制一致的间距
    'vue/block-spacing': [2, 'always'], //块间距
    'vue/brace-style': .0, //对块强制使用一致的大括号样式
    'vue/comma-dangle': [1, 'never'], //需要或不允许尾随逗号
    'vue/key-spacing': [1, { 'beforeColon': false, 'afterColon': true, 'mode': 'minimum' }],  //在对象文本属性中强制键和值之间的一致间距
    'vue/object-curly-spacing': [1, 'always', { objectsInObjects: true }], //加强支撑内的一致间距
    'vue/space-infix-ops': 1, //需要中缀运算符周围的间距
    'vue/space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }], //元操作
    "vue/html-indent": ["error", 4]
  }
}
