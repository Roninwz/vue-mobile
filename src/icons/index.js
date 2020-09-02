import Vue from 'vue';
// 引入svg组件
import IconSvg from '@/components/IconSvg';

// 全局注册icon-svg
Vue.component('icon-svg', IconSvg);

const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);
