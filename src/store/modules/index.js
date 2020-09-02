/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 * 该文件启用了“@/store/index”。导入所有vuex模块
 * 以一次性的方式,无需编辑这个文件。
 */
const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key === './index.js') return;
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default modules;