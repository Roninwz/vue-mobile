<template>
  <div>
    <span>{{ date  }}</span>
    <button v-debounce="getData">点击事件</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      date: new Date()
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    getData(){
      console.log('my console ddddddddddddd : ');
    }
  }
};
</script>

<style scoped lang="scss">
</style>
