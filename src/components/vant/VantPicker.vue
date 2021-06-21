<template>
  <!-- vant 单列和多列选择器  
  v-model="show" 改为 
  :value="show"
  @input="val=>this.$emit('input',val)"
  解决双向绑定问题
   -->
  <van-popup
    class="popup"
    :value="show"
    position="bottom"
    @input="val=>this.$emit('input',val)"
    @click-overlay="onCancel"
    @touchmove.prevent
  >
    <!-- <div class="top-bar">
      <div class="cancel" @click="onCancel()">取消</div>
      <div class="title">{{ title }}</div>
      <div class="confirm" @click="onSelect()">确认</div>
    </div>-->
    <div class="popup-body">
      <van-picker
        :title="title"
        show-toolbar
        :columns="items"
        :default-index="2"
        @confirm="onSelect"
        @cancel="onCancel"
      />
    </div>
  </van-popup>
</template>

<script>
  import { Popup, Picker } from 'vant';
  export default {
    components: {
      vanPopup: Popup,
      vanPicker: Picker
    },
    props: {
      items: {
        type: Array,
        default: () => {
          return [];
        }
      },
      // 标题
      title: {
        type: String,
        default: () => {
          return '';
        }
      },
      show: {
        type: Boolean,
        default: () => {
          return false;
        }
      },
      // 选择器类型 one单列选择  many多列选择
      type: {
        type: String,
        default: () => {
          return 'one';
        }
      },
      value: {
        type: String,
        default: () => {
          return '';
        }
      }
    },
    data() {
      return {
        itemsArr: []
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      onCancel() {
        this.$emit('closeShow');
      },
      onSelect(item) {
        this.$emit('closeShow');
        this.$emit('selectValue', item);
      }
    }
  };
</script>

<style  scoped lang="scss">
</style>
