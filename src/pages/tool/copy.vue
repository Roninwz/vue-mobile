<template>
  <div class="demo">
    订单编号：
    <span
      data-clipboard-action="copy"
      class="cobyOrderSn"
      :data-clipboard-text="orderData"
      @click="copyLink"
    >{{ orderData }}</span>
  </div>
</template>

<script>
  import ClipboardJS from 'clipboard';
  export default {
    components: {},
    data() {
      return {
        orderData: 'dddd',
      };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {},
    methods: {
      copyLink() {
        const clipboard = new ClipboardJS('.cobyOrderSn');
        clipboard.on('success', () => {
          console.log('my console复制成功 : ');
        });
        clipboard.on('error', () => {
          console.log('my console复制失败 : ');
        });
      },
    },
  };
</script>

<style scoped lang="scss">
.demo {
  position: absolute;
}
</style>
