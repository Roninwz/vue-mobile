<template>
  <div class="child-info">
    <van-cell-group class="child-box bd">
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
    </van-cell-group>
  </div>
</template>

<script>
  import { Cell, CellGroup } from 'vant';
  import icons from '@/assets/icons';
  import VantDatePicker from '@/components/vant/VantDatePicker';
  export default {
    name: 'Home',
    components: {
      vanCell: Cell,
      vanCellGroup: CellGroup,
      VantDatePicker
    },
    data() {
      return {
        icons,
        childInfo: {
          date: '2020-04-04'
        },
        isShowDateSelect: false
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 日期选择器
      closeShowDate() {
        this.isShowDateSelect = false;
      },
      // 日期选择器
      selectDate(data) {
        this.childInfo.date = data;
      }
    }
  };
</script>

<style scoped lang="scss">
$fontSize: 15px;

.child-info {
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
