import moment from "moment";
// 日期过滤器
let dateFormat = function(date, format) {
  if (!date) return null;
  format = format || "YYYY-MM-DD";

  if (date instanceof moment) {
    return date.format(format);
  }
  if (date instanceof Date) {
    return moment(date).format(format);
  }
  if (typeof date == "string") {
    return moment(date, "YYYY-MM-DD HH:mm:ss").format(format);
  }
  return date;
};

export default { dateFormat };
