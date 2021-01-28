/**
 * 0-1岁，x轴label数据
 */
export const get01XAxisData = function() {
  const dataArr = [0];
  let index;
  for (index = 1; index <= 12; index++) {
    dataArr.push(index);
  }
  return dataArr;
};
/**
 * 1-3岁，x轴label数据
 */
export const get13XAxisData = function() {
  const dataArr = ['1 岁'];
  let index;
  for (index = 3; index <= 9; index = index + 3) {
    dataArr.push('+' + index + '个月');
  }
  dataArr.push('2 岁');
  for (index = 3; index <= 9; index = index + 3) {
    dataArr.push('+' + index + '个月');
  }
  dataArr.push('3 岁');
  return dataArr;
};
/**
 * 3-6岁，身高和体重 -- x轴label数据
 */
export const get36XAxisData = function() {
  const dataArr = ['3 岁'];
  let index;
  for (index = 3; index <= 9; index = index + 3) {
    dataArr.push('+' + index + '个月');
  }
  dataArr.push('4 岁');
  for (index = 3; index <= 9; index = index + 3) {
    dataArr.push('+' + index + '个月');
  }
  dataArr.push('5 岁');
  for (index = 3; index <= 9; index = index + 3) {
    dataArr.push('+' + index + '个月');
  }
  dataArr.push('6 岁');
  return dataArr;
};

/**
 * 3-6岁，头围 -- x轴label数据
 */
export const get36XHeadAxisData = function() {
  const dataArr = ['3 岁'];
  dataArr.push('+' + 6 + '个月');
  dataArr.push('4 岁');
  dataArr.push('+' + 6 + '个月');
  dataArr.push('5 岁');
  dataArr.push('+' + 6 + '个月');
  dataArr.push('6 岁');
  return dataArr;
};

/**
 * 根据屏幕计算尺寸
 */
export const getSize = function(size) {
  const baseWinWidth = 375; // 屏幕基数
  const nowWinWidth = window.innerWidth;
  const fontSize = (size * nowWinWidth) / baseWinWidth;
  return ~~fontSize;
};

// 浮点数加减乘除 https://blog.csdn.net/mafan121/article/details/81354735
/**
 * 浮点数加法
 * @param {} a
 * @param {*} b
 */
export const floatAdd = function(a, b) {
  let m = 0,
    n = 0; // 记录a，b的小数位数
 const d = a + ''; // 字符串化
 const e = b + '';
  try {
    m = d.split('.')[1] ? d.split('.')[1].length : '';
  } catch (error) {
    console.log(error);
  }
  try {
    n = e.split('.')[1] ? e.split('.')[1].length : '';
  } catch (error) {
    console.log(error);
  }
  const maxInt = Math.pow(10, Math.max(m, n)); // 将数字转换为整数的最大倍数
  return (floatMul(a, maxInt) + floatMul(b, maxInt)) / maxInt;
};

/**
 * 浮点数加法
 * @param {} a
 * @param {*} b
 */
export const floatMul = function(a, b) {
  let m = 0,
    n = 0; // 记录a，b的小数位数
 const d = a + '';// 字符串化
 const e = b + '';
  try {
    m = d.split('.')[1] ? d.split('.')[1].length : '';
  } catch (error) {
    console.log(error);
  }
  try {
    n = e.split('.')[1] ? e.split('.')[1].length : '';
  } catch (error) {
    console.log(error);
  }
  const maxInt = Math.pow(10, m + n); // 将数字转换为整数的最大倍数
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / maxInt;
};

/**
 * 浮点数加法
 * @param {} a
 * @param {*} b
 */
export const floatDivision = function(a, b) {
  let m = 0,
    n = 0; // 记录a，b的小数位数
   const d = a + ''; // 字符串化
  const e = b + '';
  try {
    m = d.split('.')[1] ? d.split('.')[1].length : '';
  } catch (error) {
    console.log(error);
  }
  try {
    n = e.split('.')[1] ? e.split('.')[1].length : '';
  } catch (error) {
    console.log(error);
  }
  const maxInt = Math.pow(10, Math.max(n, m)); // 将数字转换为整数的最大倍数
  const aInt = floatMul(a, maxInt);
  const bInt = floatMul(b, maxInt);
  return aInt / bInt;
};

// 小数减法
export const floatSub = (a, b) => {
  let m = 0,
    n = 0; // 记录a，b的小数位数
   const d = a + ''; // 字符串化
   const e = b + '';
  try {
    m = d.split('.')[1] ? d.split('.')[1].length : '';
  } catch (error) {
    console.log(error);
  }
  try {
    n = e.split('.')[1] ? e.split('.')[1].length : '';
  } catch (error) {
    console.log(error);
  }
  const maxInt = Math.pow(10, Math.max(m, n)); // 将数字转换为整数的最大倍数
  return (floatMul(a, maxInt) - floatMul(b, maxInt)) / maxInt;
};
