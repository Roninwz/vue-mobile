export default [
  // ************** 抽奖模块路由 开始 **************
  {
    path: '/draw',
    name: 'Draw',
    meta: {
      keepAlive: false,
      title: '抽奖',
      hasBack: true,
    },
    component: () => import('@/pages/draw/index.vue'),
  },
];
