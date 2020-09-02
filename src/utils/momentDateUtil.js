/**
 * moment时间工具类
 */
import moment from 'moment';
const momentDateUtil = {};

/**
 * 格式化日期
 * @param date 日期
 * @param fmt 格式化字符串  YYYY-MM-DD hh:mm:ss
 */
momentDateUtil.formatDate = (date = new Date(), fmt = 'YYYY-MM-DD') => {
  return date && moment(date).format(fmt);
};

/**
 * 2、时间 加法 并 格式化时间
 *
 * @param date 需要格式化时间  默认当前时间
 * @param addNum 加数
 * @param addType 加法规则 默认 'days'
 * @param fmt 格式化字符串  YYYY-MM-DD hh:mm:ss
 */
momentDateUtil.formatAddDate = function (date = new Date(), addNum = 1, addType = 'days', fmt = 'YYYY-MM-DD') {
  return date && moment(date).add(addNum, addType).format(fmt) || '';
};
/**
 * 3、时间 减法 并 格式化时间
 *
 * @param date 需要格式化时间  默认当前时间
 * @param subtractNum 减去的数
 * @param subtractType 类型
 * @param fmt 格式化字符串  YYYY-MM-DD hh:mm:ss
 * @Description:
 */
momentDateUtil.formatSubtractDate = function (date = new Date(), subtractNum = 1, subtractType = 'days', fmt = 'YYYY-MM-DD') {
  return date && moment(date).subtract(subtractNum, subtractType).format(fmt) || '';
};

/**
 * 4. 获取日期的差值 -- 年份
 * @param 开始日期 startTime {日期} 小/远日期
 * @param 结束日期 endTime {日期}  大/近日期
 * @param 类型 type {years、months、weeks、days、hours、minutes 和 seconds}
 * @return 数字
 */
momentDateUtil.getDateDiffNum = (startDate, endDate, type = 'months') => {
  if (!startDate || !endDate) return 0;
  const num = moment(endDate).diff(moment(startDate), type);
  return num;
};

export default momentDateUtil;
