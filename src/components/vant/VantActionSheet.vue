<template>
  <!-- vant底部弹出框选择器，单选
    v-model="show" 改为 
  :value="show"
  @input="val=>this.$emit('input',val)"
  解决双向绑定问题
   -->
  <van-action-sheet
    :value="show"
    :actions="itemsArr"
    cancel-text="取消"
    close-on-click-action
    class="sheet"
    :round="false"
    @input="val=>this.$emit('input',val)"
    @cancel="onCancel"
    @select="onSelect"
    @click-overlay="onCancel"
  />
</template>

<script>
  export default {
    components: {},
    props: {
      items: {
        type: Array,
        default: () => {
          return [];
        }
      },
      show: {
        type: Boolean,
        default: () => {
          return false;
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
    watch: {
      items: {
        handler() {
          if (this.items.length > 0) {
            this.itemsArr = this.items.concat();
          }
        },
        deep: true,
        immediate: true
      },
      value: {
        handler() {
          this.itemsArr.forEach(cItem => {
            if (cItem.name === this.value) {
              this.$set(cItem, 'color', '#FF707B');
            } else {
              this.$set(cItem, 'color', '#333333');
            }
          });
        },
        immediate: true
      }
    },
    created() {
      // this.itemsArr.forEach(cItem => {
      //   if (cItem.name == this.value) {
      //     this.$set(cItem, "color", "#FF707B");
      //   }
      // });
      console.log('my console ffff : ');
    },
    mounted() {},
    methods: {
      onCancel() {
        this.$emit('closeShow');
      },
      onSelect(item) {
        this.$emit('closeShow');
        this.$emit('selectValue', item.name);
      }
    }
  };
</script>

<style  scoped lang="scss">
</style>
