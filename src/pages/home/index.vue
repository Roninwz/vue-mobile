<template>
  <div>
    <p>{{ date | dateFormat }}</p>
    <p>{{ number | numberFixFloat }}</p>
    <button v-debounce="getData">点击事件</button>
  </div>
</template>

<script>
// import { verifyIsDate } from "@/utils/tools";
export default {
  components: {},
  data() {
    return {
      date: new Date(),
      number: 1.222
    };
  },
  created() {
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    getData() {
      console.log("my console ddddddddddddd : ");
    }
  }
};
</script>

<style scoped lang="scss">
</style>
