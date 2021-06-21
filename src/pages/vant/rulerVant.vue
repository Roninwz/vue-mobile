<template>
  <div class="test-vant">
    <van-cell-group class="vant-box bd">
      <!-- 尺子选择器 -->
      <van-cell center>
        <template #title>
          <span class="cell-title">{{ '尺子选择器' }}</span>
        </template>
        <template #right-icon>
          <span
            class="cell-box"
            @click="isShowWeightSelect = true"
          >
            <span
              v-if="childInfo.weight&&childInfo.weight!==''"
              class="cell-content"
            >{{ childInfo.weight }}kg</span>
            <span
              v-else
              class="cell-txt"
            >去选择</span>
            <van-image
              class="cell-icon"
              :src="icons.iconRightArrow"
            />
          </span>
          <RulerPicker
            v-model="isShowWeightSelect"
            title="体重"
            :default-value="childInfo.weight"
            :ispoint="false"
            unit="kg"
            :max-num="400"
            :min-num="10"
            @closeShow="closeShowWeight"
            @selectValue="selectWeight"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  import { Cell, CellGroup } from 'vant';
  import icons from '@/assets/icons';
  import RulerPicker from '@/components/vant/RulerPicker';
  export default {
    name: 'Home',
    components: {
      vanCell: Cell,
      vanCellGroup: CellGroup,
      RulerPicker
    },
    data() {
      return {
        icons,
        childInfo: {
          sex: '男',
          date: '2020-04-04',
          week: '1',
          weight: 4
        },
        sexItems: [{ name: '男' }, { name: '女' }],
        deliveryItems: [{ name: '顺产' }, { name: '刨宫产' }, { name: '产钳' }],
        historyItems: [{ name: '有' }, { name: '无' }],
        weekItems: ['27周', '28周', '29周', '30周'],
        isShowSexSelect: false,
        isShowDeliverySelect: false,
        isShowHistorySelect: false,
        isShowDateSelect: false,
        isShowWeekSelect: false,
        isShowHeightSelect: false,
        isShowWeightSelect: false
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 尺子选择器
      closeShowWeight() {
        this.isShowWeightSelect = false;
      },
      // 选择孕周
      selectWeek(data) {
        this.childInfo.week = data;
      }
    }
  };
</script>

<style scoped lang="scss">
$fontSize: 15px;

.test-vant {
  width: 100%;
  height: 100%;
  padding: 13px;
  background: #f8f8f8;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  /* Firefox */

  /* Safari */
  ::v-deep .van-cell {
    line-height: 22px;
  }

  .cell-title {
    font-size: $fontSize;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0;
    color: #333;
  }

  .cell-box {
    display: inline-flex;
    align-items: center;

    .cell-content {
      font-size: $fontSize;
      font-weight: 400;
      color: #333;
    }

    .cell-txt {
      font-size: $fontSize;
      font-weight: 400;
      color: #999;
    }

    .cell-icon {
      width: 20px;
      height: 20px;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;

      /* Firefox */

      /* Safari */
    }
  }
}
</style>
