/**
 * 获取日期的年龄的年份
 * @param {日期} date
 */
export const getBirthYear = (date) => {
  if (!date) return 0;
  let birthDay = new Date(date);
  let nowDate = new Date();
  let date1 = Date.parse(birthDay);
  let date2 = Date.parse(nowDate);
  let day = Math.ceil((date2 - date1) / (60 * 60 * 1000 * 24));
  let year = Math.floor(day / 365);
  return year;
};
/**
 * 获取日期的年龄的年份
 * @param {日期} date
 */
export const getBirthDiffMonth = (startTime, endTime) => {
  if (!endTime || !startTime) return 0;
  const month = moment(endTime).diff(moment(startTime), "months");
  return month;
};
