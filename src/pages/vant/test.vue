<template>
  <div class="test">
    <div class="container">
      DOM挂载点
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    components: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
      console.log('my console ddddddddd : ');
      this.initToast();
    },
    methods: {
      initToast() {
        Toast({
          message: '自定义图片',
          getContainer: '.container',
        });
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
