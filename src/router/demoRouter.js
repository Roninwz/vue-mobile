export default [
    // ************** demo模块路由 开始 **************
    {
      path: '/demo',
      name: 'demo',
      meta: {
        keepAlive: false,
        title: '例子',
        hasBack: true,
      },
      component: () => import('@/pages/home'),
    },
  ]
  