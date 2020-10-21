import Vue from 'vue';
import VueRouter from 'vue-router';
import videoRouter from './videoRouter';
Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.VUE_APP_BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        keepAlive: false,
        title: '首页',
        hasBack: true
      },
      component: () => import('@/pages/home'),
    },
    ...videoRouter,
  ],
});

export default router;
