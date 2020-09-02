/**
 * 读取所有指令文件
 */
const files = require.context('.', false, /\.js$/);
const modulesArr = [];
files.keys().forEach((item) => {
  if (item === './index.js') return;
  const obj = {};
  if (files(item).default.key) {
    obj.key = files(item).default.key;
  } else {
    obj.key = item.replace(/(\.\/|\.js)/g, '');
  }
  if (files(item).default.func) {
    obj.func = files(item).default.func;
  }
  modulesArr.push(obj);
});
export default modulesArr;
