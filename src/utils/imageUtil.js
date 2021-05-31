/**
 * 图片转base64
 * @param {*} imgurl 图片url
 * @returns
 */
export const getBase64Image = function (imgurl) {
  return new Promise((resolve) => {
    function getBase64Image(img) {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
      const dataURL = canvas.toDataURL('image/' + ext);
      return dataURL;
    }
    const image = new Image();
    image.src = imgurl;
    image.onload = function () {
      const base64 = getBase64Image(image);
      resolve(base64);
    };
  });
};

/**
 * base64转Blob
 * @param base64
 * @returns {Blob}
 */
export const base64toBlob = (base64) => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
/**
 * blob转URL
 * @param file
 * @returns {string|null}
 */
export const getObjectURL = (file) => {
  if (window.createObjectURL !== undefined) { // basic
    return window.createObjectURL(file);
  } else if (window.URL !== undefined) { // mozilla(firefox)
    return window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) { // webkit or chrome
    return window.webkitURL.createObjectURL(file);
  }
  return null;
};

/**
 * base64转URL
 * @param base64
 * @returns {string|null}
 */
export const base64ToUrl = base64 => getObjectURL(base64toBlob(base64));

/**
 * 图片下载
 * @param imgsrc 图片地址
 * @param name: 图片名称
 */
export const downIamge = (imgsrc, name) => { // 下载图片地址和图片名
  var image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function () {
    var canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    var context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据

    var a = document.createElement('a') // 生成一个a元素
    var event = new MouseEvent('click') // 创建一个单击事件
    a.download = name || 'photo' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
  image.src = imgsrc
},

/**
 * 获取图片分辨率
 * @param file 文件数据
 */
export const getImageWidthHeight = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      if (reader.readyState === 2) {
        const img = new Image()
        img.src = reader.result
        img.onload = function () {
          resolve(this.width + '*' + this.height)
        }
      } else {
        reject()
      }
    }
  })
},
