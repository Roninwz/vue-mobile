export default [
  // ************** 工具模块路由 开始 **************
  {
    path: '/tool/copy',
    name: 'Copy',
    meta: {
      keepAlive: false,
      title: '复制剪切板',
      hasBack: true,
    },
    component: () => import('@/pages/tool/copy'),
  },
];
