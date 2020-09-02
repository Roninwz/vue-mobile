/**
 * 验证是否为undefined或null或''
 * 都不是的话返回true，
 * 等于undefined或null或''其中一个的话返回false
 * @param {*} 参数
 */
export const verify = (param) => {
  return param !== undefined && param !== null && param !== '';
};

/**
 * 验证是否为数值型
 * 是数字 返回 true
 * 不是数字，返回 false
 * @param {*} 参数
 */
export const verifyIsNumber = (param) => {
  return typeof param === 'number' && !isNaN(param);
};

