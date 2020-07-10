import Vue from 'vue';
//全局过滤器
import filters from '@/filters/modules'
// 这种方式可以将filters.js中的所有过滤器都注册
for (let key in filters) {
  Vue.filter(key, filters[key])
}