<template>
  <div
    class="hma-draw"
  >
    <div
      :style="wrapperstyl"
      class="hma-draw__wrapper"
    >
      <div
        v-if="hasTimes"
        class="hma-draw__tip"
      >
        剩余抽奖次数：10 次
      </div>
      <!-- 大转盘 -->
      <hma-draw-turntable
        class="hma-draw__turntable"
        :posi="posi"
        :awards="['','','','','','']"
        :isimitate="isimitate"
        @gamestart="ongamestart"
        @gameover="ongameover"
      />
    </div>
  </div>
</template>

<script>
  import HmaDrawTurntable from './components/turntable';
  export default {
    name: 'HmaDraw',
    components: {
      HmaDrawTurntable,
    },
    data() {
      this.themeMap = {
        '1': 'hma-draw--theme1',
        '2': 'hma-draw--theme2',
      };
      return {
        isbeginning: false,
        islogin: false,
        isimitate: false,
        hasTimes: true,
        posi: 0
      };
    },
    computed: {
      wrapperstyl() {
        return { padding: '13.33333vw 0 5.86667vw' };
      },
      shareimg() {
        return require('./images/shareimg.jpg');
      },
    },
    watch: {
    },
    async created() {
    },
    methods: {
      /**
       * 游戏开始
       */
      async ongamestart() {

        this.isimitate = true;
        this.posi = 3;
        // setTimeout(() => {
         
        // }, 3000);
      },
      /**
       * 游戏结束
       */
      ongameover() {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.isbeginning = false;
        }, 500);
      },
      async initData() {

      },
      resetData() {
        this.isbeginning = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
@import './index.scss';
@import './theme/theme1.scss';
@import './theme/theme2.scss';

// 适配 iPhoneX 顶部安全区域
@supports (top: constant(safe-area-inset-top)) or (top: env(safe-area-inset-top)) {
  .hma-draw {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
}

// 适配 iPhoneX 底部安全区域
@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
  .hma-draw {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
