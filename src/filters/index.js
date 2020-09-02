import Vue from 'vue';
// 全局过滤器
import dateFilters from '@/filters/modules/date';
import numberFilters from '@/filters/modules/number';
// 这种方式可以将filters.js中的所有过滤器都注册
for (const key in dateFilters) {
  Vue.filter(key, dateFilters[key]);
}
// 这种方式可以将filters.js中的所有过滤器都注册
for (const key in numberFilters) {
  Vue.filter(key, numberFilters[key]);
}
