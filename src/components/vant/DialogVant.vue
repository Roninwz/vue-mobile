<template>
  <!-- 
    vant弹窗 
  get-container : 挂载位置
  -->
  <van-popup
    v-model="showDialog"
    class="mask"
    position="bottom"
    :style="{ height: '100%' ,overflow:'hidden'}"
    get-container="body"
    @click-overlay="closeDialog()"
    @touchmove.prevent
  >
    <div
      class="videoDialog"
    />
  </van-popup>
</template>

<script>
  export default {
    components: {},
    props: {
      show: {
        // 控制弹窗是否展示
        type: Boolean,
        default: () => {
          return false;
        }
      },
    },
    data () {
      return {
        showDialog: this.show,
      };
    },
    computed: {},
    watch: {
      show () {
        this.showDialog = this.show;
      },
    },
    created () {},
    mounted () {
    },
    methods: {
      closeDialog () {
        this.$emit('update:show', false);
      }
    }
  };
</script>
<style scoped lang="scss">
</style>
