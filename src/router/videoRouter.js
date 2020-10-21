export default [
    // ************** demo模块路由 开始 **************
    {
      path: '/video',
      name: 'VideoH5',
      meta: {
        keepAlive: false,
        title: '例子',
        hasBack: true,
      },
      component: () => import('@/pages/video/videoH5'),
    },
  ];
