export default [
  // ************** echarts模块路由 开始 **************
  {
    path: '/echarts/brokenLineCharts',
    name: 'BrokenLineCharts',
    meta: {
      keepAlive: false,
      title: '双折线图',
      hasBack: true,
    },
    component: () => import('@/pages/echarts/BrokenLineCharts'),
  },
  {
    path: '/echarts/brokenLineSmoothCharts',
    name: 'BrokenLineCharts',
    meta: {
      keepAlive: false,
      title: '平滑单折线图',
      hasBack: true,
    },
    component: () => import('@/pages/echarts/BrokenLineSmoothCharts'),
  },
];
