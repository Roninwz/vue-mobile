// 浮点数过滤器-- 保留几位小数
let numberFixFloat = function(number, bit) {
  if (!(typeof number === "number" && !isNaN(number))) {
    return number;
  }
  let bitNum = 1;
  if (bit) {
    bitNum = bit;
  }
  return number.toFixed(bitNum);
};

export default { numberFixFloat };
