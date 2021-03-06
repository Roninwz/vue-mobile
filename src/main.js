import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import '@/filters';
import 'vant/lib/index.css';
// 全局重写vant样式
import '@/styles/Vant.scss';
import Vconsole from 'vconsole';

// 阻止启动生产消息
Vue.config.productionTip = false;

// 是否开启vconsole手机端调试
if (process.env.VUE_APP_VCONSOLE === 'true') {
  const vConsole = new Vconsole();
  Vue.use(vConsole);
}

// 常量文件
import $Def from '@/config/Def.js';
Vue.prototype.$Def = $Def;

// 自定义指令
import Directives from '@/directives/index';
Vue.use(Directives);

import Vant from 'vant';
Vue.use(Vant);

// 系统错误捕获
const errorHandler = (error, vm) => {
  console.error('抛出全局异常');
  console.error(vm);
  console.error(error);
};

Vue.config.errorHandler = errorHandler;

// svg icon
import '@/icons';

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
