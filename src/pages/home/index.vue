<template>
  <div>
    <van-button
      type="primary"
      @click="routerPage('/demo/test')"
    >
      测试
    </van-button>
    <van-button
      type="primary"
      @click="routerPage('/draw')"
    >
      抽奖
    </van-button>
    <van-button
      type="primary"
      @click="routerPage('/video')"
    >
      视频
    </van-button>
    <van-button
      type="primary"
      @click="routerPage('/vant')"
    >
      vant
    </van-button>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
      };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
      routerPage(path) {
        this.$router.push({
          path: path,
          query: { }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
</style>
