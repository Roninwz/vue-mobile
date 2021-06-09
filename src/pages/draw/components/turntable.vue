<template>
  <div class="hma-draw-turntable">
    <div
      class="hma-draw-turntable__wrapper"
      :style="stylBg"
    >
      <div class="hma-draw-turntable__wheel">
        <div
          class="hma-draw-turntable__award"
          :style="stylAmi"
          @transitionend="ontransitionend"
        >
          <div class="hma-draw-turntable__pie">
            <div
              v-for="item in count"
              :key="item"
              class="hma-draw-turntable__sector"
              :style="item | calcSector(count, colors)"
            />
          </div>
          <div
            v-for="(item, idx) in awards"
            :key="idx"
            class="hma-draw-turntable__award__item"
            :style="idx | calcPosi(count)"
          >
            <div
              class="hma-draw-turntable__award__item__wrapper"
              :style="idx | calcAngel(count)"
            >
              <div class="hma-draw-turntable__award__item__content">
                <van-image
                  class="hma-draw-turntable__award__item__img"
                  src="../images/share@2x"
                  fit="contain"
                />
                <div class="hma-draw-turntable__award__item__txt">
                  奖品 {{ idx + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div
        v-if="isimitate"
        class="hma-draw-turntable__wheel"
      >
        <div class="hma-draw-turntable__award hma-draw-turntable__imitate">
          <div class="hma-draw-turntable__pie">
            <div
              v-for="item in count"
              :key="item"
              class="hma-draw-turntable__sector"
              :style="item | calcSector(count, colors)"
            />
          </div>
          <div
            v-for="(item, idx) in awards"
            :key="idx"
            class="hma-draw-turntable__award__item"
            :style="idx | calcPosi(count)"
          >
            <div
              class="hma-draw-turntable__award__item__wrapper"
              :style="idx | calcAngel(count)"
            >
              <div class="hma-draw-turntable__award__item__content">
                <van-image
                  class="hma-draw-turntable__award__item__img"
                  :src="item.showImg"
                  fit="contain"
                />
                <div class="hma-draw-turntable__award__item__txt">
                  {{ item.showCopywriting }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div
        class="hma-draw-turntable__pointer"
        :style="stylPointer"
        @click="onstart"
      >
        开始
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HmaDrawTurntable',
    filters: {
      /**
       * 计算扇形样式
       */
      calcSector(item, count, colors) {
        // 单位角度(一圈角度 / 奖品数量)
        const per = 360 / count;
        const angel = per * item - per;

        // ['#FFF', '#F4EAFF', '#FFFE8B']

        // 最后一个扇形且是奇数数
        if (item === count && item % 2 && item > 3) {
          return {
            transform: `rotate(${angel}deg) skewY(${per - 90}deg)`,
            background: colors[2],
          };
        }

        // 其它扇形
        const n = count % 2 ? 3 : 2;
        const idx = item % n;
        return {
          transform: `rotate(${angel}deg) skewY(${per - 90}deg)`,
          background: colors[idx],
        };
      },
      /**
       * 计算奖品位置
       */
      calcPosi(idx, count) {
        const item = idx + 1;

        // 单个奖品偏移角度(一圈角度 / 奖品数量)
        const per = 360 / count;
        // 角度 = 奖品位置 * 单个奖品偏移角度 - 单个奖品偏移角度 / 2
        const angel = item * per - per / 2;
        // 弧度
        const radian = 2 * Math.PI / 360 * angel;

        let x = 0, y = 0;
        const o = 153, r = 100;

        x = o + r * Math.sin(radian);
        y = o - r * Math.cos(radian);

        x = 0.26667 * x;
        y = 0.26667 * y;

        return {
          left: `${x}vw`,
          top: `${y}vw`,
        };
      },
      /**
       * 计算奖品旋转角度
       */
      calcAngel(idx, count) {
        const item = idx + 1;

        // 单个奖品偏移角度(一圈角度 / 奖品数量)
        const per = 360 / count;
        // 角度 = 奖品位置 * 单个奖品偏移角度 - 单个奖品偏移角度 / 2
        const angel = item * per - per / 2;
        return {
          transform: `rotate(${angel}deg)`,
        };
      },
    },
    props: {
      posi: {
        type: Number,
        default: 0,
      },
      theme: {
        type: Number,
        default: 1,
      },
      awards: {
        type: Array,
        default: () => [],
      },
      isimitate: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      /**
       * 奖品个数
       */
      count() {
        const { awards } = this;
        if (awards && Array.isArray(awards)) {
          return awards.length;
        }
        return 0;
      },
      /**
       * 抽奖动画
       */
      stylAmi() {
        const { posi } = this;

        if (!posi) {
          return {
            transform: 'rotate(0deg)',
            transition: 'none',
          };
        }

        const { count } = this;
        // 单个奖品偏移角度(一圈角度 / 奖品数量)
        const per = 360 / count;
        // 旋转角度 = 一圈角度 * 圈数 + (奖品位置 * 单个奖品偏移角度 - 单个奖品偏移角度 / 2)
        const angel = 360 * 10 + (posi * per - per / 2);
        return {
          transform: `rotate(${angel}deg)`,
          transition: 'transform 4s ease',
        };
      },
      /**
       * 转盘背景
       */
      stylBg() {
        const { theme } = this;

        const url = require(`../images/turntable/bg${theme}.png`);
        return {
          'background-image': `url(${url})`,
        };
      },
      /**
       * 转盘指针背景
       */
      stylPointer() {
        const { theme } = this;

        const url = require(`../images/turntable/pointer${theme}.png`);
        return {
          'background-image': `url(${url})`,
        };
      },
      /**
       * 转盘扇形区域颜色集合
       */
      colors() {
        const { theme } = this;
        if (theme === 1) {
          return ['#FFF', '#F4EAFF', '#FFFE8B'];
        }
        return ['#FFF', '#F4EAFF', '#FFFE8B'];
      },
    },
    methods: {
      /**
       * 转盘旋转动画结束事件
       */
      ontransitionend() {
        this.$emit('gameover');
      },
      /**
       * 游戏开始点击事件
       */
      onstart() {
        this.$emit('gamestart');
      }
    },
  };
</script>

<style lang="scss">
.hma-draw-turntable__imitate {
  transform: rotate(0deg);
  animation: imitate 2.5s linear infinite;
}

@keyframes imitate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(3600deg);
  }
}
</style>

<style lang="scss" scoped>
.hma-draw-turntable {
  &__wrapper {
    position: relative;
    width: 341px;
    height: 341px;
    margin: 0 auto;
    background-size: cover;
    border-radius: 50%;
    box-sizing: border-box;
  }

  &__wheel,
  &__pointer,
  &__pie {
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: hidden;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &__wheel {
    width: 306px;
    height: 306px;
  }

  &__pie {
    width: 306px;
    height: 355px;
  }

  &__sector {
    position: absolute;
    top: 0;
    right: 0;
    transform-origin: 0% 100%;
    width: 50%;
    height: 50%;
    overflow: hidden;
  }

  &__award {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    &__item {
      position: absolute;
      transform: translate(-50%, -50%);

      &__wrapper {
        width: 64px;
        height: 84px;
        text-align: center;
      }

      &__content {
        display: flex;
        flex-direction: column;
      }

      &__img {
        width: 58px;
        max-height: 58px;
        min-height: 36px;
        margin: 0 auto;
        overflow: hidden;
      }

      &__txt {
        width: 52px;
        margin: 11px auto 0;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        color: #1a1a1a;
        // text-align: center;
      }
    }
  }

  &__pointer {
    left: 49.8%;
    width: 93.5px;
    height: 107px;
    font-size: 24px;
    font-weight: 500;
    line-height: 118px;
    color: #fff;
    text-align: center;
    background-size: cover;
  }
}
</style>
