// 微信jssdk文档地址：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

import { getAppId, weixinByCode, getSignature } from '@/https/public/public';

// getAppId 获取appId接口
// weixinByCode 根据code获取微信信息
// getSignature 获取签名
const SESSION_KEY = 'userInfo';
const { location, localStorage} = window || {};
const weChatUserInfo = localStorage.getItem(SESSION_KEY);
/**
 * 初始化微信活动主流程
 * 1. 获取微信用户信息
 * 2. 动态加载微信 SDK
 * 3. 获取微信签名
 * 4. 初始化微信 SDK
 * @export
 */
export async function initWeChatActivity(code) {
    // code 可能为一个数组，取数组未尾 code
    const transCode = code && Array.isArray(code) ? code[code.length - 1] : code;
    // 获取用户信息
    const userInfo = await getWeChatUserInfoByCode(transCode);
    // 动态加载微信 SDK
    await loadWeChatSDKScript();
    // 获取微信签名
    const signature = await handleGetSignature();
    // 初始化微信 SDK
    await initWeChatSDK(signature);
    return userInfo;
}
 
/**
 * 第一步：获取公众号 appId 微信授权
 * @export
 * @param {Object} params
 */
export async function redirectWeChatByAppId(params) {
    await getAppId({}).then(({ data } = {}) => {
        const { appId } = data || {};
        if (!appId) return;
        const redirect_uri = encodeURIComponent(transFullPath() + serialize(params));
        const redirectParams = {
            appid: appId,
            redirect_uri,
            response_type: 'code',
            scope: 'snsapi_userinfo'
        };
        const targetUrl =
            'https://open.weixin.qq.com/connect/oauth2/authorize' +
            serialize(redirectParams) +
            '#wechat_redirect';
        if (!weChatUserInfo) { location.replace(targetUrl); }
    });
}
 
/**
 * 第二步：动态加载微信 SDK
 * @export
 * @returns Promise
 */
export function loadWeChatSDKScript() {
    return new Promise(resolve => {
        const src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js';
        const check = document.querySelectorAll(`script[src="${src}"]`);
        if (check.length > 0) {
            check[0].addEventListener('load', function() {
                resolve();
            });
            resolve();
            return;
        }
        const script = document.createElement('script');
        const head = document.getElementsByTagName('head')[0];
        script.type = 'text/javascript';
        script.charset = 'UTF-8';
        script.src = src;
        if (script.addEventListener) {
            script.addEventListener('load', () => resolve(), false);
        } else if (script.attachEvent) {
            script.attachEvent('onreadystatechange', () => {
                const target = window.event.srcElement;
                if (target.readyState === 'loaded') {
                    resolve();
                }
            });
        }
        head.appendChild(script);
    });
}
 
/**
 * 第三步：获取微信签名
 * @export
 * @returns Promise
 */
export function handleGetSignature() {
    const params = { url: location.href.split('#')[0] };
    return getSignature(params).then(({ data } = {}) => data);
}
 
/**
 * 第四步：初始化微信 SDK
 * @export
 * @param {Object}
 *  {
 *   appId      公众号的唯一标识
 *   timeStamp  生成签名的时间戳
 *   nonceStr   生成签名的随机串
 *   signature  签名
 *  }
 * @returns Promise
 */
export function initWeChatSDK({ appId, timeStamp: timestamp, nonceStr, signature }) {
    const debug = true;
    // 需要使用的JS接口列表
    const jsApiList = [
        'updateAppMessageShareData', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        'updateTimelineShareData', // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
        'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
        'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
        'chooseWXPay', // 发起一个微信支付请求
        'hideMenuItems', // 批量隐藏功能按钮接口
    ];
    return new Promise(resolve => {
        window.wx.config({ debug, appId, timestamp, nonceStr, signature, jsApiList });
        window.wx.ready(() => resolve());
    });
}
 
/**
 * 第五步：监听微信转发
 * @export
 * @param {Object} activityInfo
 *  {
 *   activityName       分享标题
 *   activityPurpose    分享描述
 *   activityPicture    分享图片
 *  }
 */
 export function addListenWeChatForward({ title, desc, imgUrl, link }, cb) {
  const data = {
    title: title,
    desc: desc,
    imgUrl: imgUrl,
    link: link,
    type: '', // 分享类型 music、video、link，默认为 link
    dataUrl: '', // 如果 type 是 music 或 video，则要提供数据链接，默认为空
    success: () => {
      console.log('微信分享成功回调', { title, desc, imgUrl, link });
      cb && cb();
    },
  };
  if (judgingIsIOS()) {
    // iOS平台采用新api 
    /** 原因：在iOS微信客户端8.0，iOS14.4出现微信分享两次及以上之后，自定义分享的标题、内容、图片等会缺失。安卓无此问题。
     * 解决方案：
     *  1,判断平台，安卓调用旧的api，iOS则调用新api
     *  2,由于iOS微信自定义分享的链接只能是当前页面的链接，所以需要在当前分享页的导航守卫中重定向到指定链接
     */
    window.wx.updateAppMessageShareData(data);
    window.wx.updateTimelineShareData(data);
  } else {
    window.wx.onMenuShareTimeline(data);
    window.wx.onMenuShareAppMessage(data);
  }
}
 
/**
 * 判断是否是 IOS
 *
 * @export
 * @returns {boolean}
 */
export function judgingIsIOS() {
  const ua = window.navigator.userAgent;
  return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua);
}
 
/**
 * 获取微信用户信息
 * @export
 * @param {String} code 微信授权 code
 * @returns Promise
 */
export function getWeChatUserInfoByCode(code) {
    return new Promise(resolve => {
        if (weChatUserInfo) {
            console.log('local', code);
            resolve(JSON.parse(weChatUserInfo));
        } else {
            code && weixinByCode({ code }).then(({ data } = {}) => {
                localStorage.setItem(SESSION_KEY, data);
                console.log('weixinByCode');
                resolve(JSON.parse(data));
            });
        }
    });
}

// 禁止微信操作
export function hideWXOptionMenu() {
  // 朋友、朋友圈、QQ、微博、FB、QQ空间、email、特殊公众号
  // ['appMessage', 'timeline', 'qq', 'weiboApp', 'facebook', 'QZone', 'email', 'brand'];
  // 复制链接、收藏、编辑标签、删除、原网页、阅读模式、在QQ浏览器中打开、在Safari中打开
  // ['copyUrl', 'favorite', 'editTag', 'delete', 'originPage', 'readMode', 'openWithQQBrowser', 'openWithSafari'];
  window.wx.hideMenuItems({
    menuList: [
      'menuItem:share:timeline',
      'menuItem:share:qq',
      'menuItem:share:weiboApp',
      'menuItem:share:facebook',
      'menuItem:share:QZone',
      'menuItem:share:email',
      'menuItem:share:brand',
      'menuItem:originPage',
      'menuItem:readMode',
      'menuItem:openWithQQBrowser',
      'menuItem:openWithSafari',
      'menuItem:copyUrl',
    ], // 要隐藏的菜单项
  });
}
 
/**
 * 记录浏览时长，递归调用
 * @export
 * @param {String} id
 * @param {Function} cb
 * @param {number} [minute=1]
 * @returns
 */
let timer = null;
export function handleRecordViewTime(id, cb, minute = 1) {
    if (minute > 10) {
        return clearTimeout(timer);
    }
    cb && minute > 1 && cb({ id, time: minute });
    timer = setTimeout(() => {
        handleRecordViewTime(id, cb, ++minute);
    }, 1000 * 60);
}
 
/**
 * 序列号 url 参数
 * @param {Object} params 请求参数对象
 * @returns String
 */
export function serialize(params = {}) {
    return (
        '?' +
        Object.keys(params)
            .reduce(function(acc, key) {
                acc.push(key + '=' + params[key]);
                return acc;
            }, [])
            .join('&')
    );
}
 
// 转发链接处理
export function transFullPath() {
    return process.env.VUE_APP_SERVICE_URL + location.pathname;
}
 
// ios后退关闭
export function wxClose() {
    const state = {
        title: 'title',
        url: '#'
    };
    window.history.pushState(state, 'title', '#');
    window.addEventListener('popstate', function() {
        window['wx'].closeWindow();
    }, false);
}