<template>
  <div @touchmove.prevent>
    <van-popup
      v-model="showStatus"
      class="popup"
      position="bottom"
      :style="{ height: '40%' }"
      @click-overlay="changeStatus(false)"
      @touchmove.prevent
    >
      <van-datetime-picker
        v-model="newDate"
        type="date"
        @change="selectDate(0)"
        @confirm="selectDate(1)"
        @cancel="selectDate(2)"
        @touchmove.prevent
      />
    </van-popup>
  </div>
</template>

<script>
  import { Popup, DatetimePicker } from 'vant';
  import moment from 'moment';
  export default {
    components: {
      'van-popup': Popup,
      'van-datetime-picker': DatetimePicker
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      date: {
        type: [String, Date]
      },
      popupStatus: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        newDate: this.Date,
        showStatus: this.popupStatus
      };
    },
    watch: {
      popupStatus: function() {
        this.initStatus();
      }
    },
    methods: {
      // 弹出框
      selectDate(status) {
        if (status === 0) {
          this.$emit('selectDate', moment(this.newDate).format('YYYY-MM-DD'));
        } else if (status === 1) {
          this.changeStatus(false);
          this.showStatus = false;
          this.$emit('selectDate', moment(this.newDate).format('YYYY-MM-DD'));
        } else {
          this.changeStatus(false);
          this.showStatus = false;
        }
      },
      changeStatus(data) {
        this.$emit('changeStatus', data);
      },
      // 接收状态值并初始化
      initStatus() {
        this.showStatus = this.popupStatus;
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>