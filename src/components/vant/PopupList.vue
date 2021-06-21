<template>
  <div>
    <van-popup
      v-model="showStatus"
      class="popup"
      position="bottom"
    >
      <div class="top-bar">
        <div
          class="cancel"
          @click="selectFun(0)"
        >
          取消
        </div>
        <div class="title">
          {{ title }}
        </div>
        <div
          class="confirm"
          @click="selectFun(1)"
        >
          确认
        </div>
      </div>
      <div class="popup-body">
        <div
          v-for="(coupon, i) in selectionList" 
          :key="i" 
          class="popup-row" 
          :class="{'checked': coupon.code == couponCode}" 
          @click="changeCoupon(coupon)"
        >
          <div class="row-data">
            {{ coupon.name }}
          </div>
          <div class="row-desc">
            {{ coupon.desc }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { Popup } from 'vant';

  export default {
    components : {
      'van-popup':Popup
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      selectionList: {
        type: Array,
        default: function() {
          return [
            {code: '0', name: '选项0', desc: ''},
            {code: '1', name: '选项1', desc: ''},
            {code: '2', name: '选项2', desc: ''},
            {code: '3', name: '选项3', desc: ''}
          ];
        }
      },
      popupStatus: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showStatus: false, // 弹出框选择选项
        couponCode: '', // 已选择项
        selectedData: {} // 选中的数据
      };
    },
    watch: {
      popupStatus: function() {
        this.initStatus();
      }
    },
    methods: {
      // 弹出框
      selectFun (status) {
        if(status === 1) {
          this.showStatus = false;
          this.toParent();
        } else {
          this.showStatus = false;
        }
      },
      // 选择具体选项
      changeCoupon (data) {
        this.couponCode = data.code;
        this.selectedData = data;
      },
      // 向父组件传值
      toParent () {
        this.$emit('toParent', this.selectedData);
      },
      // 接收状态值并初始化
      initStatus() {
        if(this.popupStatus === true) {
          this.showStatus = this.popupStatus;
        } else {
          this.showStatus = !this.popupStatus;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.popup{
    .top-bar{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        font-size: 16px;
        padding-left: 16px;
        padding-right: 16px;
        .cancel{
        color: #838B98;
        }
        .title{
        color: #3A4761
        }
        .confirm{
        color: $color15;
        }
    }
    .popup-body{
        padding-left: 16px;
        padding-right: 16px;
        box-shadow:0px -9px 30px 0px rgba(0,0,0,0.05);
        .popup-row{
            position: relative;
            display: flex;
            font-size: 16px;
            padding-left: 70px;
            padding-top: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #D8D8D8;
            .row-data{
                color: #3A4761;
            }
            .row-desc{
                padding-left: 10px;
                color: #B0B5C0;
            }
            &:last-child{
                border-bottom: none;
            }
            &::after{
                content: '';
                position: absolute;
                width: 23px;
                height: 23px;
                border-radius: 50%;
                background: #fff;
                border: 7px solid #E7ECF4;
                box-sizing: border-box;
                left: 18px;
                top: 50%;
                transform: translateY(-50%);
            }
            &.checked::after{
                border:7px solid rgba(21,164,172,1);
            }
        }
    }
}
</style>