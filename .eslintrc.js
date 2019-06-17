// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 0, //箭头函数用小括号括起来
    'generator-star-spacing': 0, //生成器函数*的前后空格
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': [0, 'always'],//语句强制分号结尾
    'eqeqeq': 0,//必须使用全等
    'spaced-comment': 0,//注释风格要不要有空格什么的
    'space-before-function-paren': [0, 'always'],//函数定义时括号前面要不要有空格
    'no-multi-spaces': 2,//不能用多余的空格
    'no-spaced-func': 2,//函数调用时 函数名与()之间不能有空格
    'array-bracket-spacing': [2, 'never'],//是否允许非空数组里面有多余的空格
    'indent': [0, 'tab', {'SwitchCase': 1}],//缩进风格
    'no-multiple-empty-lines': [0, {'max': 2}],//空行最多不能超过2行
    'no-undefined': 0,//不能使用undefined
    'quotes': [0, 'single'],//引号类型 `` "" ''
    'space-before-blocks': [0, 'always'],//不以新行开始的块{前面要有空格
    'padded-blocks': 0,//块语句内行首行尾是否要空行
    'comma-dangle': [2, 'never'],//对象字面量项尾不能有逗号
    'brace-style': [0, '1tbs'],//大括号风格
    'no-new': 0,//禁止在使用new构造一个实例后不赋值
    'comma-spacing': 2,//逗号前后的空格
    'no-var': 0,//禁用var，用let和const代替
    'no-unused-vars': 2,//不能有声明后未被使用的变量或参数
    'no-mixed-spaces-and-tabs': 2,//禁止空格和 tab 的混合缩进
    'no-tabs': 0,//禁止空格和 tab 的混合缩进
    'eol-last': 0,//末尾加一行
    'no-extend-native': 0,
    'no-throw-literal': 0,
    'no-useless-escape': 0
  }
}
