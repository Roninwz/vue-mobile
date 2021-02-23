// 图片转base64
export const getBase64Image = function (imgurl) {
  return new Promise((resolve) => {
    // let img = imgurl ; //imgurl 就是你的图片路径
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

