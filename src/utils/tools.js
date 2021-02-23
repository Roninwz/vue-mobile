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

/**
 * 监听滚动条是否滚动到底部
 * 使用方式:
 * 1.导入： import { listenerScrollPageBottom } from '@/utils/tools';
 * 2.vue mount 中 window.addEventListener('scroll', listenerScrollPageBottom, false);
 * @param {*} 参数
 */
export const listenerScrollPageBottom = () => {
  let isBottom = false;
  // 变量scrollTop是滚动条滚动时，距离顶部的距离
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  console.log('my console scrollTop : ', scrollTop);
  // 变量windowHeight是可视区的高度
  var windowHeight = document.documentElement.clientHeight;
  // 变量scrollHeight是滚动条的总高度
  var scrollHeight = document.documentElement.scrollHeight;
  // 滚动条到底部的条件
  if (Number(scrollTop) + Number(windowHeight) + 2 >= scrollHeight) {
    // 到了这个就可以进行业务逻辑加载后台数据了
    console.log('到了底部');
    isBottom = true;
    // 分享浏览埋点
  }
  return isBottom;
};


// 获取当前环境
export const isWeiXinEnvironment = () => {
  // 判断当前环境是否在微信中
  if (navigator.userAgent.toLowerCase().includes('micromessenger')) {
    return true;
  }
  return false;
};

// 判断当前环境是否是android
export const isAndroidEnvironment = () => {
  let ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) {
    return false;
  } else if (/android/.test(ua)) {
    return true;
  }
};


/**
 * 复制内容到粘贴板
 * content : 需要复制的内容
 * callback : 回调函数
 */
export const copyToClip = function (content, callback) {
  var aux = document.createElement('input')
  aux.setAttribute('value', content)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
  callback()
}

