<template>
  <!-- 平滑单折线图 -->
  <div
    id="bloodPressureCharts"
    class="myChart"
  />
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: 'Home',
    components: {},
    props: {
      configs: {
        type: Object,
        default: () => {
          return {};
        }
      },
      // 正常区域数据
      normalData: {
        type: Array,
        default: () => {
          return null;
        }
      },
    },
    data() {
      return {
        active: 0,
        myChart: ''
      };
    },
    created() {},
    mounted() {
      this.myChart = echarts.init(document.getElementById('bloodPressureCharts'));
      this.initMyChartData();
    },
    methods: {
      // 初始化echart 雷达图数据
      initMyChartData() {
        this.setEchartsOption(
          this.configs,
          this.normalData,
        );
      },
      setEchartsOption() {
        // 基于准备好的dom，初始化echarts实例
        // 绘制图表，this.echarts1_option是数据
        this.myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer:{
              type: 'line', // 选中网格线的样式
              lineStyle:{
                type: 'dashed',
                width: '2',
                color: 'rgba(255,45,85,0.4)',
              }
            }
          },
          grid: {
            top: '10px',
            bottom: '50px',
            left: '41px',
            right: '21px'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              fontSize: 11,
              color: '#999999', // 改变x轴线和文本样式

            },
            axisLine:{
              show: false,
              lineStyle:{
                color:'#E0E0E0', // 改变X轴线样式
              }
            },
            splitLine:{
              show: false,
            },
            data: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 175,
            axisLabel: {
              fontSize: 13,
              color: '#999', // 改变Y轴文本样式
            },
            axisLine:{
              lineStyle:{
                color:'#E0E0E0', // 改变Y轴线样式
              }
            },
            splitLine:{
              show: true, // Y轴网格线
              lineStyle: {
                type: 'solid',
                width: '1',
                color: '#E0E0E0' // 改变x轴网格线样式
              },
            },
            interval: 45
          },
          series: [
            {
              name:'心率',
              type:'line',
              symbolSize: 20,
              symbol: () => {
                return 'image://data:image/png;base64,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';
              },
              stack: 'lb',
              smooth: true,
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#FF2D55' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgba(255,45,85,0.3)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  },
                  opacity: 0.4,
                  origin: 'auto'
                }
              },
              itemStyle : {
                normal : {
                  color:'#FF8510',
                  lineStyle:{
                    color:'#FF5E5E'
                  }
                }
              },
              data: [60, 80, 70, 90, 100, 80, 60, 60]
            },
          ]
        });
      }

    }
  };
</script>

<style scoped lang="scss">
.myChart {
  display: flex;
  width: 100%;
  height: 300px;
  margin: 0 auto;
  justify-items: center;
  align-items: center;
}
</style>
