<template>
  <div class="test-vant">
    <van-cell-group class="vant-box bd">
      <!-- 底部弹窗带取消按钮 -->
      <van-cell center>
        <template #title>
          <span class="cell-title">{{ 'VantActionSheet弹窗' }}</span>
        </template>
        <template #right-icon>
          <span
            class="cell-box"
            @click="isShowSexSelect = true"
          >
            <span
              v-if="childInfo.sex&&childInfo.sex!==''"
              class="cell-content"
            >{{ childInfo.sex }}</span>
            <span
              v-else
              class="cell-txt"
            >去选择</span>
            <van-image
              class="cell-icon"
              :src="icons.iconRightArrow"
            />
          </span>
          <VantActionSheet
            :items="sexItems"
            :value="childInfo.sex"
            :show="isShowSexSelect"
            @closeShow="closeShowSex"
            @selectValue="selectSex"
          />
        </template>
      </van-cell>
      <!-- 日期 -->
      <van-cell center>
        <template #title>
          <span class="cell-title">{{ '日期选择器年月日' }}</span>
        </template>
        <template #right-icon>
          <span
            class="cell-box"
            @click="isShowDateSelect = true"
          >
            <span
              v-if="childInfo.date&&childInfo.date!==''"
              class="cell-content"
            >{{ childInfo.date }}</span>
            <span
              v-else
              class="cell-txt"
            >去选择</span>
            <van-image
              class="cell-icon"
              :src="icons.iconRightArrow"
            />
          </span>
          <VantDatePicker
            title="选择生日"
            :value="childInfo.date"
            :show.sync="isShowDateSelect"
            @closeShow="closeShowDate"
            @selectValue="selectDate"
          />
        </template>
      </van-cell>
      <!-- Picker单列选择器 -->
      <van-cell center>
        <template #title>
          <span class="cell-title">{{ 'Picker单列选择器' }}</span>
        </template>
        <template #right-icon>
          <span
            class="cell-box"
            @click="isShowWeekSelect = true"
          >
            <span
              v-if="childInfo.week&&childInfo.week!==''"
              class="cell-content"
            >{{ childInfo.week }}</span>
            <span
              v-else
              class="cell-txt"
            >去选择</span>
            <van-image
              class="cell-icon"
              :src="icons.iconRightArrow"
            />
          </span>
          <VantPicker
            title="单列选择器"
            :value="childInfo.week"
            :items="weekItems"
            :show="isShowWeekSelect"
            @closeShow="closeShowWeek"
            @selectValue="selectWeek"
          />
        </template>
      </van-cell>
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
            unit="kg"
            :max-num="80"
            :min-num="10"
            @closeShow="closeShowWeight"
            @selectValue="selectWeight"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <p @click="test">
      测试
    </p>
  </div>
</template>

<script>
  import { Cell, CellGroup } from 'vant';
  import icons from '@/assets/icons';
  import VantActionSheet from '@/components/vant/VantActionSheet';
  import VantDatePicker from '@/components/vant/VantDatePicker';
  import VantPicker from '@/components/vant/VantPicker';
  import RulerPicker from '@/components/vant/RulerPicker';
  export default {
    name: 'Home',
    components: {
      vanCell:Cell,
      vanCellGroup:CellGroup,
      VantActionSheet,
      VantDatePicker,
      VantPicker,
      RulerPicker
    },
    data() {
      return {
        icons,
        childInfo: {
          sex: '男',
          date: '2020-04-04',
          week: '1',
          weight: 3.5,
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
      test() {
        this.$router.push({
          path: '/test'
        });
      },
      // 底部弹窗带取消按钮
      closeShowSex() {
        this.isShowSexSelect = false;
      },
      // 日期选择器
      closeShowDate() {
        this.isShowDateSelect = false;
      },
      // 单列孕周选择器
      closeShowWeek() {
        this.isShowWeekSelect = false;
      },
      // 尺子选择器
      closeShowWeight() {
        this.isShowWeightSelect = false;
      },
      // 选择性别
      selectSex(data) {
        this.childInfo.sex = data;
      },
      // 日期选择器
      selectDate(data) {
        this.childInfo.date = data;
      },
      // 选择出生体重
      selectWeight(data) {
        this.childInfo.weight = data;
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
