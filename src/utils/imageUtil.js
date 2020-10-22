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
