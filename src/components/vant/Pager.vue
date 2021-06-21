<template>
  <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <slot />
    </van-list>
  </van-pull-refresh>
</template>

<script>
  import {PullRefresh, List} from 'vant';

  export default {
    name: 'Pager',
    components: {
      vanPullRefresh: PullRefresh,
      vanList: List,
    },
    props: {
      getHistoryList: {
        type: Function,
        default: null
      },
      params: {
        type: Object,
        default: () => {
          return {};
        }
      },
      value: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        loading: false,
        finished: false,
        refreshing: false,

        total: 0,

        pageSize: 5,
        pageIndex: 1,
        list: []
      };
    },
    methods: {
      onRefresh() {
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
      async onLoad() {
        if (this.refreshing) {
          this.list = [];
          this.pageIndex = 1;
          this.refreshing = false;
          this.$emit('input', this.list);
        }

        let params = {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        };
        if (this.params) {
          params = Object.assign(this.params, params);
        }
        const res = await this.getHistoryList(params);
        if (res.data && Array.isArray(res.data['data'])) {
          res.data['data'].forEach(x => this.list.push(x));
          this.total = res.data.total;
        }
        this.loading = false;
        this.pageIndex = this.pageIndex + 1;
        if (this.list.length >= this.total) {
          this.finished = true;
        }
        this.$emit('input', this.list);
      },
    }
  };
</script>

<style scoped>

</style>