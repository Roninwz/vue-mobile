import { wakeWeChatPay } from '@/https/course';
import {
  serialize,
  redirectWeChatByAppId,
  initWeChatActivity
} from '@/utils/wechat';
const { orderNo, id } = this.$route.query;

// **************  浏览器唤起微信支付 --- 开始  ***************
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

// 唤起支付
wakeWeChatPay(params)
  .then(({ code, data }) => {
    this.loading = false;
    if (code === 200 && data?.wechatH5url) {
      window.location.href = data.wechatH5url;
    }
  })
  .catch(() => (this.loading = false));

// **************  浏览器唤起微信支付 --- 结束  ***************

// **************  微信内唤起微信支付 --- 开始 ***************
async function checkAuthProcess() {
  const {
    id = '',
    shareId = '',
    code = '',
    orderNo = '',
    price = ''
  } = this.$route.query;
  const params = { id, shareId, orderNo, price };
  if (!code) {
    await redirectWeChatByAppId(params);
  }
  const userInfo = await initWeChatActivity(code);
  handleWakeWeChatPay(userInfo);
}

function handleWakeWeChatPay(userInfo) {
  const { id, orderNo } = this.$route.query;
  const params = {
    orderNo,
    payChannel: 'wechat_jsapi',
    openId: userInfo.openid,
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
      if (code === 200 && data?.wechatJsapiData) {
        this.wechatJsApiPay(JSON.parse(data.wechatJsapiData), orderNo, id);
      }
    })
    .catch(() => (this.loading = false));
}

// 调用微信支付 SDK
function wechatJsApiPay(params, orderNo, id) {
  payInWechat(params)
    .then(({ code, data }) => {
      if (code === 'success') {
        this.$router.push({
          path: '/course-success',
          query: { orderNo, id }
        });
      }
    })
    .catch(({ code, data }) => {
      this.$toast('支付失败');
    });
}
// **************  微信内唤起微信支付 --- 结束 ***************

/**
 * @description: 微信内支付 -- 使用的是微信的jssdk的方法
 * @doc 微信jssdk文档地址：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
 * @param {Number} timestamp 支付签名时间戳
 * @param {String} nonce_str 支付签名随机串
 * @param {String} prepay_id 统一支付接口返回的prepay_id
 * @param {String} paysign 支付签名
 * @return {*}
 */
export function payInWechat(data) {
  return new Promise((resolve, reject) => {
    const payParam = {
      timestamp: Number(data.timestamp), // 支付签名时间戳
      nonceStr: data.nonce_str, // 支付签名随机串
      package: `prepay_id=${data.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: data.paysign, // 支付签名
      success: function(res) {
        // 支付成功
        resolve({ code: 'success', data: res });
      },
      cancel: function(res) {
        // 支付取消
        resolve({ code: 'cancel', data: res });
      },
      fail: function(res) {
        // 支付失败
        reject({ code: 'fail', data: res });
      }
    };
    console.log('payParam', payParam);
    window.wx.chooseWXPay(payParam);
  });
}

/**
 * 微信内支付--  使用的是微信支付单独的方法
 * https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F
 * @param {*} obj
 * @returns
 */
export function getWeChatpay(obj) {
  return new Promise(resolve => {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: obj.wechatappid, // 公众号名称，由商户传入
        timeStamp: obj.timestamp, // 时间戳，自1970年以来的秒数
        nonceStr: obj.nonceStr, // 随机串
        package: `prepay_id=${obj.prepayId}`,
        signType: 'MD5', // 微信签名方式：
        paySign: obj.paysign // 微信签名
      },
      function(res) {
        console.log('微信支付回调------', res);
        resolve(res);
        // if(res.err_msg == "get_brand_wcpay_request:ok" ){
        // // 使用以上方式判断前端返回,微信团队郑重提示：
        //       //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        //     }
      }
    );
  });
}
