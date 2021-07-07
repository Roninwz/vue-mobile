<!-- 仿vantpicker 用于popup弹出时单选 -->
<template>
  <div class="picker">
    <div class="toolbar">
      <div
        class="cancel"
        @click="cancel"
      >
        取消
      </div>
      <div class="title">
        {{ title }}
      </div>
      <div
        class="confirm"
        @click="confirm"
      >
        确定
      </div>
    </div>
    <div class="columns">
      <van-radio-group v-model="current">
        <div
          v-for="(item, i) in columns"
          :key="i"
          class="row"
          @click="select(item.code)"
        >
          <van-radio :name="item.code">
            {{ item.name }}
            <template #icon>
              <img
                class="img-icon"
                :src="item.code == current ? activeIcon : inactiveIcon"
                alt=""
              >
            </template>
          </van-radio>
        </div>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
  import { RadioGroup, Radio } from 'vant';
  import icons from '../assets/icons';

  export default {
    name: 'Picker',
    components: {
      'van-radio-group': RadioGroup,
      'van-radio': Radio
    },
    props: {
      title: {
        default: '',
        type: String
      },
      columns: {
        default: () => [],
        type: Array
      },
      defaultValue: {
        default: () => '',
        type: [String, Number]
      }
    },
    data() {
      return {
        current: this.defaultValue,
        activeIcon: icons.iconXuanZhong_2X,
        inactiveIcon: icons.iconWeixuan
      };
    },
    methods: {
      cancel() {
        this.$emit('cancel');
      },
      confirm() {
        this.$emit('confirm', this.current);
      },
      select(value) {
        this.current = value;
      }
    }
  };
</script>

<style lang="scss" scoped>
.picker {
  .toolbar {
    display: flex;
    height: 45px;
    padding: 0 16px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 -4px 15px 0 rgba(0, 0, 0, 0.05);
    align-items: center;
    justify-content: space-between;

    .cancel,
    .confirm {
      height: 45px;
      font-size: 16px;
      font-weight: 400;
      line-height: 45px;
      color: rgba(131, 139, 152, 1);
    }

    .title {
      height: 23px;
      font-size: 16px;
      font-weight: 400;
      line-height: 23px;
      color: rgba(58, 71, 97, 1);
    }
  }

  .columns {
    padding: 0 22px;
  }

  .row {
    display: flex;
    height: 45px;
    border-bottom: 1px solid rgba(151, 151, 151, 0.3);
    align-items: center;
  }

  .img-icon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
}
</style>
