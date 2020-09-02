import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import '@/filters';
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

// svg icon
import '@/icons';

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
