<template>
  <div class="child-info">
    <van-cell-group class="child-box bd">
      <!-- 地址选择器 -->
      <van-cell center>
        <template #title>
          <span class="cell-title">{{ '地址选择器' }}</span>
        </template>
        <template #right-icon>
          <span
            class="cell-box"
            @click="isShowAddressSelect = true"
          >
            <span
              v-if="address&&address!==''"
              class="cell-content"
            >{{ address }}</span>
            <span
              v-else
              class="cell-txt"
            >去选择</span>
            <van-image
              class="cell-icon"
              :src="icons.iconRightArrow"
            />
          </span>
          <VantAddressPicker
            title="地址选择器"
            :show="isShowAddressSelect"
            @selectValue="selectAddress"
            @closeShow="closeShowAddress"
            @cancel="isShowAddressSelect = false"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  import { Cell, CellGroup } from 'vant';
  import icons from '@/assets/icons';
  import VantAddressPicker from '@/components/vant/VantAddressPicker';
  export default {
    name: 'Home',
    components: {
      vanCell: Cell,
      vanCellGroup: CellGroup,
      VantAddressPicker
    },
    data() {
      return {
        icons,
        address: '',
        isShowAddressSelect: false
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 底部弹窗带取消按钮
      closeShowAddress() {
        this.isShowAddressSelect = false;
      },
      // 选择地址
      selectAddress(data) {
        if (!data[2]) return; // 当索引3的数据为空时，表示只选择了省，这种情况不进行操作（至少要选择到市）
        this.address = data[0].name + data[1].name + data[2].name;
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
  -moz-background: #f8f8f8;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  /* Firefox */
 
  box-sizing: border-box;

  /
* Firefox */

  /* Safari */
  ::v-deep .van-cell {
    
;
    color: #333
  .
cell-title {
    font-size: $fontSize;
    font-weight: 500;
    line-height: 19px;

    letter-spacing: 0;
    color: #333;
  }

  .cell-box {

    display: inline-flex;
    align-items: center;

    .cell-content
     
 font-size: $fontSize;
      font-weight: 400;
      width: 20px;
      height: 20px;
      -moz-color: #333;
    }webkit

     Frefox

      /* Safarnz*/ontSize;
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
