<template>
  <div
    id="TwoSmoothBrokenLineCharts"
    class="myChart"
  />
</template>

<script>
  import echarts from 'echarts';
  import {
    floatAdd,
    floatDivision,
    getSize,
    get01XAxisData,
  } from './computeUtil';
  let myChart = '';
  export default {
    name: 'Home',
    components: {},
    data() {
      return {
        active: 0,
        configs: {
          xLabel: get01XAxisData(),
          yMin: 36,
          yMax: 84,
          xUnit: '月龄',
          yUnit: 'cm',
          yInterval: 4,
        },
        normalData: ['-', '-', '-', '-', '-', '-', 60, '-', '-', '-', '-', '-', '-'],
        unNormalData: ['-', '-', '-', '-', '-', '-', 60, '-', '-', '-', '-', '-', '-'],
        areaDownData: [
          48,
          51.7,
          55.3,
          58.4,
          61,
          62.9,
          64.5,
          65.9,
          67.2,
          68.5,
          69.8,
          71.1,
          72.3,
        ],
        areaUpData: [
          3.4,
          4,
          4.3,
          4.4,
          4.4,
          4.5,
          4.6,
          4.7,
          4.9,
          5.1,
          5.2,
          5.3,
          5.4,
        ],
        lastData: {
          ageMonth: 6,
          childData: 60,
          childDataStatus: '1',
          downLimit: 64.5,
          gender: null,
          upLimit: 69.1,
        },
      };
    },
    created() {},
    mounted() {
      //  初始化折线图
      this.$nextTick(() => {
        myChart = echarts.init(document.getElementById('TwoSmoothBrokenLineCharts'));
        this.initMyChartData();
      });
    },
    methods: {
      // 初始化echart 雷达图数据
      initMyChartData() {
        /**
         * xLabel: x轴标签数据
         * yMin: y轴数据最小值
         * yMax： y轴数据最大值,
         * xUnit: x轴单位，
         * Yunit: y轴单位
         * normalData: 正常区域数据
         * unNormalData:  偏高偏低数据
         * areaDownData: 面积区域下部分
         * areaUpData:  面积区域上部分
         */
        this.setOption(
          this.configs,
          this.normalData,
          this.unNormalData,
          this.areaDownData,
          this.areaUpData,
          this.lastData
        );
      },
      /**
       * 雷达图配置,
       */
      setOption(
        configs,
        normalData,
        unNormalData,
        areaDownData,
        areaUpData,
        lastData
      ) {
        showMyecharts();
        function showMyecharts() {
          const options = {
            color: ['#61DEFF', '#61DEFF', '#2FD4AB', '#FF707B'],
            legend: {
              icon: 'rect',
              top: '5px',
              right: '19px',
              itemWidth: getSize(10),
              itemHeight: getSize(10),
              textStyle: {
                lineHeight: getSize(11),
                fontSize: getSize(11),
                color: '#999',
              },
              selectedMode: false, // 取消图例上的点击事件
              data: ['正常区域', '正常区域', '正常', '偏低/高'],
            },
            grid: {
              left: '5%',
              right: '10%',
              bottom: '3%',
              top: '12%',
              containLabel: true,
            },
            tooltip: {
              show: false,
              // trigger: "axis",
              trigger: 'axis',
              confine: true, // 将 tooltip 框限制在图表的区域内，在移动端开发时非常有用
              // position 可以自己设定 tooltip 的位置，下面例子是在老版本 echarts 不支持 confine 属性时写的一个当提示左侧超出画布时的限制函数
              // position: function(point, params, dom) {
              //   if (dom.contentSize.width + 20 > point[0]) {
              //     //tooltip宽度 + 20 大于鼠标横向位置时，强制避免提示超出左侧画布
              //     return { left: 10, top: point[1] };
              //   }
              // },
              backgroundColor: 'transparent',
              axisPointer: {
                type: 'none',
              },
              formatter: function (params) {
                if (params && Array.isArray(params)) {
                  let resStr = '';
                  params.forEach((item) => {
                    if (
                      item.seriesName === '正常' ||
                      item.seriesName === '偏低/高'
                    ) {
                      if (item.value && item.value !== '-') {
                        if (areaDownData[item.dataIndex] > item.value) {
                          resStr =
                            '<span style="color:#FF707B;">' + '偏低' + '</span>';
                        } else if (
                          floatAdd(
                            areaDownData[item.dataIndex],
                            areaUpData[item.dataIndex]
                          ) < item.value
                        ) {
                          resStr =
                            '<span style="color:#FF707B;">' + '偏高' + '</span>';
                        } else {
                          resStr =
                            '<span style="color:#2FD4AB;">' + '正常' + '</span>';
                        }
                      }
                    }
                  });
                  return resStr;
                }
                return '';
              },
            },
            xAxis: {
              name: '  ' + configs.xUnit, // 给X轴加单位
              nameLocation: 'end',
              nameTextStyle: {
                color: '#999999',
                fontSize: getSize(11),
                padding: [10, 0, -16, 3],
                verticalAlign: 'bottom',
              },
              type: 'category',
              data: configs.xLabel,
              boundaryGap: false,
              nameGap: 0,
              axisLabel: {
                interval: 0,
                // align: 'right',
                fontSize: getSize(10),
                color: '#999',
                formatter: function (value) {
                  return value.substr(0, 2) + '\n' + value.substr(2);
                },
              },
              minInterval: 1,
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                },
                show: true,
              },
              axisTick: false,
              axisLine: {
                lineStyle: {
                  color: '#DCDCDC',
                },
              },
            },
            yAxis: {
              name: configs.yUnit + '         ', // 给Y轴加单位
              // nameTextStyle: {
              //   padding: [4, 0, 0, 0]
              // },
              nameTextStyle: {
                color: '#999999',
              },
              type: 'value',
              min: configs.yMin,
              max: configs.yMax,
              // scale:true,
              boundaryGap: false,
              // gridIndex: 1,
              interval: configs.yInterval,
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                },
              },
              axisLine: {
                lineStyle: {
                  color: '#DCDCDC',
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                fontSize: getSize(11),
                color: '#999',
                formatter: function (value) {
                  return value.toFixed(1);
                },
              },
            },
            series: [
              // 下部分
              {
                name: '正常区域',
                type: 'line',
                symbolSize: 7,
                symbol: 'none', // 设定为实心点
                stack: 'lb', // 两根线这个字段值设置就会叠加
                data: areaDownData,
                areaStyle: {
                  normal: {
                    color: 'transparent',
                    origin: 'auto',
                  },
                },
                lineStyle: {
                  color: '#CEF4FE',
                },
              },
              // 重叠部分
              {
                name: '正常区域',
                type: 'line',
                symbolSize: 0, // 叠加，设置为0
                symbol: 'none', // 设定为实心点
                stack: 'lb', // 两根线这个字段值设置就会叠加
                data: areaUpData,
                areaStyle: {
                  normal: {
                    color: '#CEF4FE',
                  // origin :'auto'
                  },
                },
                lineStyle: {
                  color: '#CEF4FE',
                },
              },
              {
                name: '正常',
                type: 'line',
                symbolSize: getSize(7),
                color: '#2FD4AB', // 改变折线点的颜色
                symbol: 'circle', // 设定为实心点
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      formatter: function (value) {
                        const dataIndex = value.dataIndex;
                        console.log('my console lastData : ', lastData);
                        console.log('my console value : ', value);
                        console.log('my console dataIndex : ', dataIndex);
                        if (
                          value.value === lastData.childData &&
                          areaDownData[dataIndex] === lastData.downLimit &&
                          areaDownData[value.dataIndex] < value.value &&
                          floatAdd(
                            areaDownData[value.dataIndex],
                            areaUpData[value.dataIndex]
                          ) > value.value
                        ) {
                          return '正常';
                        } else {
                          return '';
                        }
                      // x轴文字颜色的设定
                      },
                      textStyle: {
                        color: '#2FD4AB',
                      },
                    },
                    textColor: '#2FD4AB',
                  },
                },
                lineStyle: {
                  color: '#2FD4AB',
                },
                data: normalData,
              },
              {
                name: '偏低/高',
                type: 'line',
                symbolSize: getSize(7),
                symbol: 'circle', // 设定为实心点
                //  connectNulls: true, // 折线是否连线
                // 文字样式
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      formatter: function (value) {
                        if (areaDownData[value.dataIndex] > value.value) {
                          return value.value === lastData.childData &&
                            areaDownData[value.dataIndex] === lastData.downLimit
                            ? '偏低'
                            : '';
                        } else {
                          return value.value === lastData.childData &&
                            areaDownData[value.dataIndex] === lastData.downLimit
                            ? '偏高'
                            : '';
                        }
                      },
                      textStyle: {
                        color: '#FF707B',
                      },
                    },
                    textColor: '#FF707B',
                  },
                },
                color: '#FF707B', // 改变折线点的颜色
                lineStyle: {
                  color: '#FF707B',
                },
                data: unNormalData,
              },
            ],
          };
          myChart.clear();
          myChart.setOption(options, false);
        }
        // options.series[0].data = [];

        // 点击折线图的拐点。
        myChart.on('click', function () {
          // showMyecharts(param.dataIndex, param.color);
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
          });
        });
      },
      getMinAreaData() {
        const min = 6.0 + '';
        const max = 8.0 + '';
        const arr = [];
        for (
          let index = min;
          index <= max;
          index = floatAdd(index, floatDivision(2.0, 13.0))
        ) {
          arr.push(index);
        }
        return arr;
      },
      getMaxAreaData() {
        const min = 8.0 + '';
        const max = 12.0 + '';
        const arr = ['8.0'];
        for (
          let index = min;
          index <= max;
          index = floatAdd(index, floatDivision(4.0, 13.0))
        ) {
          arr.push(index);
        }
        return arr;
      },
    },
  };
</script>

<style scoped lang="scss">
.myChart {
  display: flex;
  width: 100%;
  height: 400px;
  margin: 0 auto;
  justify-items: center;
  align-items: center;
}
</style>
