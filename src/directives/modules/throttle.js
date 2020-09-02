/**
 * @author Roninwz
 * @description 节流指令
 * 使用方式： v-throttle:[2000]="shareTime"
 * 其中2000未定时器时间，ms
 **/
export default {
  key: 'throttle',
  func: {
    bind(el, binding) {
      console.log('my console  : ', binding.arg);
      let time = 2000;
      if (binding.arg !== undefined) {
        time = binding.arg;
      }
      let lastTime = 0;
      el.addEventListener('click', () => {
        // 记录当前函数触发的时间
        var nowTime = new Date().getTime();
        // 当前时间减去上一次执行时间大于这个指定间隔时间才让他触发这个函数
        if (nowTime - lastTime > time) {
          // 绑定 this 指向
          binding.value();
          // 同步时间
          lastTime = nowTime;
        }
      });
    },
  },
};
