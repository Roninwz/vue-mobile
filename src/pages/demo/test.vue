<template>
  <div>
    <p
      v-movable
      class="date"
    >
      {{ date | dateFormat }}
    </p>
    <p>{{ number | numberFixFloat }}</p>
    <button
      v-resize="changeChartOptions"
      v-longpress="longpress"
    >
      点击事件
    </button>
    <icon-svg
      icon-class="titile"
      icon-style="width:100px;height:100px;"
    />
    <div class="sn Lfll Lmr20">
      订单编号：
      <span
        data-clipboard-action="copy"
        class="cobyOrderSn"
        :data-clipboard-text="orderData"
        @click="copyLink"
      >{{ orderData }}</span>
    </div>
  </div>
</template>

<script>
  import { listenerScrollPageBottom } from '@/utils/tools';
  import momentDateUtil from '@/utils/momentDateUtil';
  import moment from 'moment';
  import ClipboardJS from 'clipboard';
  export default {
    components: {},
    data() {
      return {
        myNum: [1, 2, 3],
        date: new Date(),
        number: 1.222,
        icon: {
          width: '100px',
          height: '100px'
        },
        orderData: 'dddd',
        name: ''
      };
    },
    computed: {},
    watch: {},
    created() {
      this.testData();
    },
    mounted() {
      this.$nextTick(() => {
        this.myNum = [4, 5, 6];
      });
      window.addEventListener('scroll', listenerScrollPageBottom, false);
    },
    methods: {
      copyLink() {
        const clipboard = new ClipboardJS('.cobyOrderSn');
        clipboard.on('success', function() {
          console.log('my console复制成功 : ');
        });
        clipboard.on('error', function() {
          console.log('my console复制失败 : ');
        });
      },
      testData() {
        console.log('my console moment : ', moment().dayOfYear());
        console.log('my console moment : ', moment().daysInMonth());
        console.log('my console moment : ', moment().get('year'));
        console.log(
          'my console getDateDiffMonth : ',
          momentDateUtil.formatSubtractDate('2020-05-09', 3)
        );
      },
      getData() {},
      changeChartOptions() {
        console.log('my console ddddddddddddd : ');
      },
      longpress() {
        console.log('my console longpress : ');
      }
    }
  };
</script>

<style scoped lang="scss">
.date {
  position: absolute;
}

.icon {
  width: "100px";
  height: "100px";
}
</style>
