<template>
  <van-popup
    :style="{ height: '40%',overflow:'hidden' }"
    :value="value"
    round
    position="bottom"
    @click-overlay="onCancel"
  >
    <p class="statureHeader">
      <span @click="onCancel">取消</span>
      <span @click="onConfirm">确定</span>
    </p>
    <van-divider
      :style="{ 
        width:'100%',
        color: '#DAE1EE',
        borderColor: '#DAE1EE',
        margin:0
      }"
    />
    <p class="stature">
      {{ title }}
    </p>
    <p class="statureNum">
      {{ newNowNum }}
      <span>{{ unit }}</span>
    </p>
    <cs-heightruler
      v-if="value"
      :pointer-color="pointerColor"
      :num-size="numSize"
      :now-num="nowNum"
      :max-num="maxNum"
      :min-num="minNum"
      :ispoint="ispoint"
      @post-NumValue="rulerheightNum"
    />
  </van-popup>
</template>

<script>
// 依赖cs-ruler包
// cs-ruler文档 https://python.ctolib.com/328921371-ruler.html
  import ruler from 'cs-ruler';

  export default {
    name: 'HeightPicker',
    components: {
      'cs-heightruler': ruler.CsingRuler
    },
    props: {
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 双向绑定弹窗
      value: {
        type: Boolean,
        default: false
      },
      // 默认值
      defaultValue: {
        type: Number,
        default: 0
      },
      // 单位
      unit: {
        type: String,
        default: ''
      },
      // maxNum为刻度尺的最大值,默认为1000,可不传
      maxNum: {
        type: Number,
        default: 700
      },
      // minNum为刻度的最小值,默认为0,可不传
      minNum: {
        type: Number,
        default: 150
      },
      pointerColor: {
        type: String,
        default: '#15a4ac'
      },
      // 配置字体大小
      numSize: {
        type: Number,
        default: 16
      },
      ispoint: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        newNowNum: 0,
        nowNum: 0
      };
    },
    watch: {
      defaultValue: {
        handler(val) {
          this.newNowNum = val;
          if (this.ispoint) {
            this.nowNum = this.defaultValue * 10;
          } else {
            this.nowNum = this.defaultValue;
          }
        },
        immediate: true
      }
    },
    methods: {
      rulerheightNum(val) {
        if (this.ispoint) {
          if (val > this.maxNum / 10) {
            this.newNowNum = this.maxNum / 10;
          } else {
            this.newNowNum = val;
          }
        } else {
          if (val > this.maxNum) {
            this.newNowNum = this.maxNum;
          } else {
            this.newNowNum = val;
          }
        }
      },
      onConfirm() {
        const { newNowNum } = this;

        this.$emit('selectValue', newNowNum);
        this.onCancel();
      },
      onCancel() {
        setTimeout(() => {
          this.newNowNum = JSON.parse(JSON.stringify(this.defaultValue));
        }, 0);
        this.$emit('closeShow');
      }
    }
  };
</script>

<style lang="scss" scoped>
.van-popup--bottom.van-popup--round {
  border-radius: 0;
}
.statureHeader {
  width: 90%;
  margin-left: 5%;
  height: 50px;
  line-height: 50px;
  span {
    display: block;
    font-size: 14px;
    // margin: 20px 0;
  }
  span:nth-child(1) {
    float: left;
    color: #838b98;
  }
  span:nth-child(2) {
    float: right;
    color: #ff707b;
  }
}
.stature {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  color: #3a4761;
  font-size: 16px;
  font-weight: bold;
}
.statureNum {
  width: 100%;
  text-align: center;
  margin: 20px 0;
  color: #ff707b;
  font-size: 18px;
  font-weight: bold;
}
::v-deep .cs-rule .cs-scroll-item-pointer {
  border-color: #ff707b;
}
</style>
