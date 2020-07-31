<template>
  <div>
    <p class="date" v-movable>{{ date | dateFormat }}</p>
    <p>{{ number | numberFixFloat }}</p>
    <button v-resize="changeChartOptions" v-longpress="longpress">点击事件</button>
    <icon-svg iconClass="titile" iconStyle="width:100px;height:100px;"></icon-svg>

  </div>
</template>

<script>
// import { verifyIsDate } from "@/utils/tools";
export default {
  components: {},
  data() {
    return {
      date: new Date(),
      number: 1.222,
      icon: {
        width: "100px",
        height: "100px"
      },
      name:''
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    getData() {},
    changeChartOptions() {
      console.log("my console ddddddddddddd : ");
    },
    longpress() {
      console.log("my console longpress : ");
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
