/**
 * @author Roninwz
 * @description 聚焦指令
 * 使用方式： v-focus
 **/
export default {
  key: 'focus',
  func: {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el) {
      // 聚焦元素
      el.focus();
    },
  },
};
