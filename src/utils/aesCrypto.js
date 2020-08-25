/* eslint-disable */
import CryptoJS from 'crypto-js/crypto-js'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'
import axios from 'axios'

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse("1234567890123456");
const IV = CryptoJS.enc.Utf8.parse('1234567890123456');

var $rsaPublicKey = ''
var $aesPrivateKey = ''

const encryptUtil = {
  name: 'encryptUtil',
  /**
   * AES加密 ：字符串 key iv  返回base64
   */
  Encrypt (word, keyStr, ivStr) {
    let key = KEY
    let iv = IV
   
    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr);
      iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
  
    let srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },
  
  /**
   * AES 解密 ：字符串 key iv  返回base64
   */
  Decrypt (word, keyStr, ivStr) {
    let key = KEY
    let iv = IV
   
    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr);
      iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
  
    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);
  
    var decrypt = CryptoJS.AES.decrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },
  
  /**
   * 请求头config加密
  */
  encryptConfig (config) {
    // 创建RSA解密方法的对象实例
    const encryptor = new JSEncrypt()
    // 如果是密文，则加上请求头data-model
    // 所有post请求入参加密
    config.headers['data-model'] = 'cipher'
    if (config.data) {
      // 入参加密
      config.data = { data: this.AESEncrypt(config.data) }
    }
    // console.log($rsaPublicKey, $aesPrivateKey, 'MLSNKNVZW9HDPRDC');
    
    // 所有请求的请求头都加上data-key
    encryptor.setPublicKey($rsaPublicKey)
    config.headers['data-key'] = encryptor.encrypt($aesPrivateKey)
    return config
  },
  
  /**
   * 处理返回数据解密
   * 如果返回头带有'data-model'则通过解密，否则直接返回
   * @param {Object} response
   */
  encryptResponse (response) {
    // console.log('response encrypt:', $rsaPublicKey, $aesPrivateKey, 'KGKHDHFAFIJVNFUUFIV');
    // console.log('待解密返回数据：', response);

    if (response.headers && (response.headers['data-model'] === 'cipher')) {
      // console.log('返回头携带解密信息', response.headers);
      if (response.data.data) {
        // console.log('包含待解密数据', response.data.data);
        var data = null
        try {
          data = this.AESDecrypt(response.data.data)
          response.data.data = JSON.parse(data);
          // console.log('对象数据', data);
        } catch (e) {
          response.data.data = data;
          // console.log('字符串', data);
        }
        return {
          ...response
        }
      } else {
        return response
        // console.log('数据结构异常', response);
      }
    } else {
      return response
    }
  },
  
  /**
   * 获取公钥
   */
  generateCipher () {
    //  已存在公钥，return，防止多次发起
    if ($rsaPublicKey && $aesPrivateKey) return

    const _generate = () => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/api/',
          headers: {
            'data-key': false,
            'data-model': 'cipher'
          }
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
    return _generate().then(res => {
      if (res.status && (res.status != 200 || res.data.code != 200)) {
        console.error('获取公钥失败')
        return
      } else if (res.code && res.code != 200) {
        console.error('获取公钥失败')
        return
      }
      //  已存在公钥，return，防止覆盖旧的导致旧请求失效
      if ($rsaPublicKey && $aesPrivateKey) return

      $rsaPublicKey = res.data.public_key || res.data.data.public_key
      // 随机生成16位字符串 - AES密钥
      var num = ''
      for (var i = 0; i <= 15; i++) {
        var tmp = Math.ceil(Math.random() * 15)
        if (tmp > 9) {
          switch (tmp) {
            case (10):
              num += 'a'
              break
            case (11):
              num += 'b'
              break
            case (12):
              num += 'c'
              break
            case (13):
              num += 'd'
              break
            case (14):
              num += 'e'
              break
            case (15):
              num += 'f'
              break
          }
        } else {
          num += tmp
        }
      }
      $aesPrivateKey = num
      return res
    })
  },
  
  /**
   * AES加密: 封装
   */
  AESEncrypt(word) {
    return this.Encrypt(JSON.stringify(word), $aesPrivateKey, 'KGKHDHFAFIJVNFUUFIV')
  },
  
  /**
   * AES解密: 封装
   */
  AESDecrypt(word) {
    return this.Decrypt(word, $aesPrivateKey, 'KGKHDHFAFIJVNFUUFIV')
  }
}
// 封装子模块组件
// encryptUtil.install = Vue => Vue.component(encryptUtil.name, encryptUtil);
// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(encryptUtil);
// }

export default encryptUtil
