export default [
  // ************** vant模块路由 开始 **************
  {
    path: '/vant',
    name: 'Copy',
    meta: {
      keepAlive: false,
      title: '复制剪切板',
      hasBack: true,
    },
    component: () => import('@/pages/vant/testVant'),
  },
];
