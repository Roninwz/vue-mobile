/**
 * H5浏览器内支付宝支付
 */
import { wakeWeChatPay } from '@/https/course';
import { serialize } from '@/utils/wechat';

const { id, orderNo } = this.$route.query;
const params = {
  orderNo,
  payChannel: 'wechat_wap',
  // https://baidu.com + /h5-agent-course + /course-success
  redirectURL:
    process.env.VUE_APP_SERVICE_URL +
    process.env.VUE_APP_BASE_URL +
    '/course-success' +
    serialize({ orderNo, id })
};

wakeWeChatPay(params)
  .then(({ code, data }) => {
    this.loading = false;
    if (code === 200 && data?.alipayMpbwapurl) {
      alipayWapPay(data.alipayMpbwapurl);
    }
  })
  .catch(() => (this.loading = false));

// 支付宝
function alipayWapPay(form) {
  const div = document.createElement('div');
  div.innerHTML = form;
  document.body.appendChild(div);
  document.forms[0].submit();
}
