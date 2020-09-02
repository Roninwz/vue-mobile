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
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  // 全局变量
  globals: {
    'gdp': true,
  },
  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console': 0,
    'comma-spacing': [2, { // 控制逗号前面没有空格，后面必须有空格
      'before': false,
      'after': true
    }],
    'arrow-spacing': [2, { // 要求箭头函数前后有空格
      'before': true,
      'after': true
    }],
    'no-multi-spaces': 2, // 禁止使用多个空格,
    'no-spaced-func': 2, // 禁止 function 标识符和括号之间出现空格,this.getList () 报错
    'semi-spacing': [2, {// 强制分号之前不允许有空格
      'before': false,
      'after': true
    }],
    'space-infix-ops': 2, // 要求操作符前后必须有空格: 2 + 3    2 === 2    3 > 2
    'spaced-comment': [2, 'always'], // 强制在注释中 // 或 /* 使用一致的空格
    'array-bracket-spacing': [2, 'never'], // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之后和 ] 之前不能带空格，always参数：[ 之后和 ] 之前必须带空格
    'space-before-blocks': 2, // if/function等的大括号之前需要有空格
    'vue/script-indent': ['error', 2, { // script标签缩进设置
      'baseIndent': 1,
      'switchCase': 0,
      'ignores': []
    }],

    'no-undef-init': 2, // 禁止将变量初始化为 undefined,保存时会将let a = undefined变成let a
    'semi': [2, 'always'], // 强制结尾必须有分号;
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'quotes': [2, 'single'], // js中强制使用单引号
    'no-multiple-empty-lines': [2, {// 不允许多个空行,最多一行
      'max': 1
    }],
    'eqeqeq': 2, // 强制使用===
    'vue/order-in-components': ['error', {
      'order': [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        'methods',
        ['template', 'render'],
        'renderError'
      ]
    }],
    'vue/attributes-order': ['error', {
      'order': [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'UNIQUE',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT'
      ]
    }],
  }
};
