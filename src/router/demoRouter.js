export default [
  // ************** demo模块路由 开始 **************
  {
    path: '/demo/test',
    name: 'test',
    meta: {
      keepAlive: false,
      title: '复制剪切板',
      hasBack: true,
    },
    component: () => import('@/pages/demo/test'),
  },
];
