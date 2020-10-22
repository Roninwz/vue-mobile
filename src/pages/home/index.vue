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
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
    <p>ddddddddddddddddddd</p>
  </div>
</template>

<script>
  import { listenerScrollPageBottom } from '@/utils/tools';
  import momentDateUtil from '@/utils/momentDateUtil';
  import moment from 'moment';
  export default {
    components: {},
    data() {
      return {
        date: new Date(),
        number: 1.222,
        icon: {
          width: '100px',
          height: '100px',
        },
        name: '',
      };
    },
    computed: {},
    watch: {},
    created() {
      this.testData();
    },
    mounted() {
      window.addEventListener('scroll', listenerScrollPageBottom, false);
    },
    methods: {
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
      },
    },
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
