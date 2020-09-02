/** *****************************************************
 * 设置sessionStorage缓存
 * @param  {String}        key   缓存对象key
 * @param  {String/Object} value 缓存对象value
 * @return {Boolean}             是否保存成功 true/false
 *******************************************************/
export const setSStorage = function (key, value) {
    if (arguments.length !== 2) return false;
    let v = value;
    if (typeof v === 'object') {
      v = JSON.stringify(v);
      v = 'ri-obj-' + v;
    } else {
      v = 'ri-str-' + v;
    }
    const ss = sessionStorage;
    if (ss) {
      ss.setItem(key, v);
    } else { return false; }
    return true;
  };
  
  /** *******************************************
   * 获取sessionStorage缓存
   * @param  {String}        key   缓存对象key
   * @return {String/Object}       缓存对象value
   *********************************************/
  export const getSStorage = function (key) {
    const ss = sessionStorage;
    if (ss) {
      let v = ss.getItem(key);
      if (!v) { return false; }
      if (v.indexOf('ri-obj-') === 0) {
        v = v.slice(7);
        return JSON.parse(v);
      } else if (v.indexOf('ri-str-') === 0) {
        return v.slice(7);
      } else { return false; }
    } else { return false; }
  };
  
  /** *****************************************
   * 删除sessionStorage缓存
   * @param  {String} key  缓存对象key
   * @return {Boolean}     是否删除成功 true/false
   *******************************************/
  export const removeSStorage = function (key) {
    const ss = sessionStorage;
    if (ss && key) {
      ss.removeItem(key);
      return true;
    } else { return false; }
  };
  
  /** *************************************
   * 清理sessionStorage缓存
   * @return {Boolean} 是否清理成功 true/false
   ***************************************/
  export const clearSStorage = function () {
    const ss = sessionStorage;
    if (ss) {
      ss.clear();
      return true;
    } else { return false; }
  };
  
  /** *****************************************************
   * 设置localStorage缓存
   * @param  {String}        key   缓存对象key
   * @param  {String/Object} value 缓存对象value
   * @return {Boolean}             是否保存成功 true/false
   *******************************************************/
  export const setLStorage = function (key, value) {
    if (arguments.length !== 2) return false;
    let v = value;
    if (typeof v === 'object') {
      v = JSON.stringify(v);
      v = 'ri-obj-' + v;
    } else {
      v = 'ri-str-' + v;
    }
    const ls = localStorage;
    if (ls) {
      ls.setItem(key, v);
    } else { return false; }
    return true;
  };
  
  /** *******************************************
   * 获取localStorage缓存
   * @param  {String}        key   缓存对象key
   * @return {String/Object}       缓存对象value
   *********************************************/
  export const getLStorage = function (key) {
    const ls = localStorage;
    if (ls) {
      let v = ls.getItem(key);
      if (!v) { return false; }
      if (v.indexOf('ri-obj-') === 0) {
        v = v.slice(7);
        return JSON.parse(v);
      } else if (v.indexOf('ri-str-') === 0) {
        return v.slice(7);
      } else { return false; }
    } else { return false; }
  };
  
  /** *****************************************
   * 删除localStorage缓存
   * @param  {String} key  缓存对象key
   * @return {Boolean}     是否删除成功 true/false
   *******************************************/
  export const removeLStorage = function (key) {
    const ls = localStorage;
    if (ls && key) {
      ls.removeItem(key);
      return true;
    } else { return false; }
  };
  
  /** *************************************
   * 清理localStorage缓存
   * @return {Boolean} 是否清理成功 true/false
   ***************************************/
  export const clearLStorage = function () {
    const ls = localStorage;
    if (ls) {
      ls.clear();
      return true;
    } else { return false; }
  };