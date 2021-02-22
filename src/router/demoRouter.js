export default [
  // ************** echarts模块路由 开始 **************
  {
    path: '/demo/copy',
    name: 'Copy',
    meta: {
      keepAlive: false,
      title: '复制剪切板',
      hasBack: true,
    },
    component: () => import('@/pages/demo/copy'),
  },
];
