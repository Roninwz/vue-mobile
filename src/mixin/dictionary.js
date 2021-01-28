import commonApi from '@/https/api/commonApi';

export default {
  data() {
    return {
      DICT_MIGU_COVER_TYPE: 'MIGU_COVER_TYPE',
      DICT_VIDEO_PURCHASE_CHANNEL: 'VIDEO_PURCHASE_CHANNEL', // 采购渠道
      DICT_VIDEO_USE_CHANNEL: 'VIDEO_USE_CHANNEL', // 使用渠道
      DICT_ONLINE_STATUS: 'ONLINE_STATUS', // 上下架
      DICT_MEDIA_UPLOAD_STATUS: 'MEDIA_UPLOAD_STATUS', // 审核状态
      DICT_MEDIA_SOURCE: 'MEDIA_SOURCE', // 来源

      DICT_ITEM: {
        ONLINE_STATUS: {
          UP_SHELF_ING: '1', // 待上架
          UP_SHELF_ED: '2', // 已上架
          DOWN_SHELF_ING: '3'// 已下架
        }
      },
      DICT_DATA: []
    };
  },
  filters: {
    // 字典format
    DICT_FROMAT(value, options) {
      if (!value) return;
      value = value + ''; // 先转为字符串
      value = value.indexOf(',') !== -1 ? value.split(',') : [value];
      let label = '';
      options.map((item) => {
        value.forEach(vItem => {
          if (vItem === item.itemCode) {
            label += item.itemValue + '，';
          }
        });
      });
      if (label.lastIndexOf('，') === label.length - 1) {
        label = label.substring(0, label.length - 1);
      }
      return label;
    }
  },
  methods: {
    async LOAD_DICT(types) {
      let params;
      if (typeof types === 'string') {
        params = {};
        params['dictType'] = types;
      } else if (Array.isArray(types)) {
        params = [];
        types.forEach(item => {
          params.push({ dictType: item });
        });
      } else {
        params = types;
      }
      const res = await commonApi.getDictByType(params);
      if (Array.isArray(res.data)) {
        this.DICT_DATA = res.data;
      }
    },
    GET_DICT(type) {
      const itemTypeArr = [];
      this.DICT_DATA.forEach((it) => {
        if (it.dictType === type) {
          itemTypeArr.push(it);
        }
      });
      return itemTypeArr || [];
    },
    GET_DICT_NAME(type, code) {
      if (!code || !type) return '';
      const data = this.GET_DICT(type);
      if (!data) return '';

      if (Array.isArray(data)) {
        const item = data.find((d) => d.itemCode === code);
        return item ? item['itemValue'] : '';
      }
      return null;
    }
  }
};
