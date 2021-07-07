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
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in selectionList"
              :key="item.code"
              :title="item.data"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  ref="checkboxes"
                  :name="item"
                  checked-color="#15A4AC"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { Popup, Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant';

  export default {
    components: {
      'van-popup': Popup,
      'van-checkbox': Checkbox,
      'van-checkbox-group': CheckboxGroup,
      'van-cell-group': CellGroup,
      'van-cell': Cell
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
            { code: '0', data: '选项0', desc: '' },
            { code: '1', data: '选项1', desc: '' },
            { code: '2', data: '选项2', desc: '' },
            { code: '3', data: '选项3', desc: '' }
          ];
        }
      },
      popupStatus: {
        type: Boolean,
        default: false
      },
      selectList: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        result: [],
        showStatus: false, // 弹出框选择选项
        couponCode: '', // 已选择项
        selectedData: {} // 选中的数据
      };
    },
    watch: {
      popupStatus: function() {
        this.initStatus();
      }
    // selectList: {
    //   immediate: true,
    //   handler(newVal, oldVal) {
    //     if (this.$route.query.id) {
    //       console.log("监听到了吗", newVal, this.selectionList);
    //       for (let i = 0; i < this.selectionList.length; i++) {
    //         for (let j = 0; j < newVal.length; j++) {
    //           if (newVal[j] === this.selectionList[i].data) {
    //             console.log("i-------<", i);
    //             this.$nextTick(() => {
    //               this.$refs.checkboxes[i].toggle();
    //             });
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    },
    mounted() {
    // console.log("我点击了", this.selectList);
    // this.result = this.selectList
    // this.$nextTick(function() {
    //   this.toggle(1);
    // });
    },
    methods: {
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      },
      // 弹出框
      selectFun(status) {
        if (status === 1) {
          this.showStatus = false;
          this.toParent();
        } else {
          this.showStatus = false;
        }
      },
      // 向父组件传值
      toParent() {
        console.log(this.result);
        this.$emit('toParent', this.result);
      },
      // 接收状态值并初始化
      initStatus() {
        if (this.popupStatus === true) {
          console.log('22', this.selectList);
          this.result = this.selectList;
          this.showStatus = this.popupStatus;
        // for (let i = 0; i < this.selectionList.length; i++) {
        //   for (let j = 0; j < this.selectList.length; j++) {
        //     if (this.selectList[j] === this.selectionList[i].data) {
        //       console.log("i-------<", i);
        //       this.$refs.checkboxes[i].toggle();
        //     }
        //   }
        // }
        } else {
          this.showStatus = !this.popupStatus;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.popup {
  .top-bar {
    display: flex;
    height: 45px;
    padding-right: 16px;
    padding-left: 16px;
    font-size: 16px;
    align-items: center;
    justify-content: space-between;

    .cancel {
      color: #838b98;
    }

    .title {
      color: #3a4761;
    }

    .confirm {
      color: $color15;
    }
  }

  .popup-body {
    box-shadow: 0 -9px 30px 0 rgba(0, 0, 0, 0.05);

    .van-cell:not(:last-child)::after {
      border-bottom: 1px solid #d8d8d8;
    }

    .van-cell {
      line-height: 30px;
    }

    .popup .popup-body .van-cell[data-v-016c4e72] {
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      color: rgba(58, 71, 97, 1);
    }
  }
}
</style>