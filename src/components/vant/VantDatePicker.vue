<template>
  <!-- vant日期选择器 -->
  <!-- 
  使用方法
       <VantDatePicker
            title="选择时间"
            :value="defaultRecordtime"
            :min-date="minDate"
            :show.sync="isShowTimeSelect"
            @closeShow="closeShowTime"
            @selectValue="selectTime"
          />
      defaultRecordtime ： 默认值
      isShowTimeSelect ： 是否显示弹出框
      // 是否弹出时间选择器
      changeSelectShowTime() {
        this.isShowTimeSelect = true;
      },
      // 关闭时间选择器
      closeShowTime() {
        this.isShowTimeSelect = false;
      },
  -->
  <div @touchmove.prevent>
    <van-popup
      v-model="showStatus"
      class="popup"
      position="bottom"
      :style="{ height: '40%' ,overflow:'hidden'}"
      @click-overlay="closeShow()"
      @touchmove.prevent
    >
      <van-datetime-picker
        v-model="newDate"
        type="date"
        :title="title"
        :min-date="minDate"
        :max-date="maxDate"
        @change="selectValue(0)"
        @confirm="selectValue(1)"
        @cancel="selectValue(2)"
        @touchmove.prevent
      />
    </van-popup>
  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    components: {},
    props: {
      // 标题
      title: {
        type: String,
        default: '',
      },
      // 默认值
      value: {
        type: [String, Date],
        default: '',
      },
      // 控制显示隐藏
      show: {
        type: Boolean,
        default: false,
      },
      // 最小日期
      minDate: {
        type: [String, Date],
        default: () => new Date(1900, 0, 1),
      },
      // 最大日期
      maxDate: {
        type: [String, Date],
        default: () => new Date(),
      },
    },
    data() {
      return {
        newDate: new Date(moment(this.value).format('YYYY-MM-DD')),
        showStatus: this.show,
      };
    },
    watch: {
      show: function () {
        this.initStatus();
      },
    },
    created() {},
    methods: {
      // 弹出框
      selectValue(status) {
        if (status === 0) {
          this.$emit('selectValue', moment(this.newDate).format('YYYY-MM-DD'));
        } else if (status === 1) {
          this.closeShow();
          this.showStatus = false;
          this.$emit('selectValue', moment(this.newDate).format('YYYY-MM-DD'));
        } else {
          this.closeShow();
          this.showStatus = false;
        }
      },
      closeShow() {
        this.$emit('closeShow');
      },
      // 接收状态值并初始化
      initStatus() {
        this.showStatus = this.show;
      },
    },
  };
</script>
