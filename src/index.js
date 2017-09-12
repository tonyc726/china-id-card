/**
 * 中华人民共和国国家标准 - 公民身份号码
 * @see https://zh.wikisource.org/wiki/GB_11643-1999_%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81
 */

// 检验码结果对照表
const CHECK_CODE_MAP = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

// 身份号码中各个位置上的加权因子W(i)数值
const WEIGHTING_MAP = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

/**
 * 检验身份证基本格式，15位数字、18位数字、17位数字末尾是字母X
 *
 * @param {String | Number} IDCard - 待检验的身份证号
 * @return {Boolean} - 返回检验结果
 */
const checkBaseFormat = (IDCard = '') => (
  (/(^\d{15}$)|(^\d{17}(\d|X)$)/i).test(IDCard)
);

/**
 * 补全15位身份号码的年份，用于计算验证码
 *
 * @param {String | Number} IDCard - 待补全年份格式的15位身份证号码
 * @param {String | Number} [preYear = 19] - 年份前2位，默认为19
 */
const makeYearToYYYY = (IDCard = '', preYear = 19) => (
  (/^\d{15}$/).test(IDCard) ?
    `${IDCard.substr(0, 6)}${preYear}${IDCard.substr(6, IDCard.length - 6)}` :
    null
);

/**
 * 检验身份证前2位省级地址码是否正确
 * @see http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201703/t20170310_1471429.html
 *
 * @param {String | Number} IDCard - 待检验的身份证号
 * @return {Boolean} - 返回检验结果
 */
const checkProvince = (IDCard = '') => (
  IDCard && (/^(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82)/).test(IDCard)
);

/**
 * 检验身份证的生日信息是否正确，依据为年龄
 *
 * @param {String | Number} IDCard - 待检验的身份证号
 * @return {Boolean} - 返回检验结果
 */
const checkBirthday = (IDCard = '') => {
  const birthdayMatch = IDCard.match(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
  if (birthdayMatch === null) {
    return false;
  }
  // 年龄
  const diffYear = (new Date()).getFullYear() - (new Date(`${birthdayMatch[2]}/${birthdayMatch[3]}/${birthdayMatch[4]}`)).getFullYear();
  // 年龄在0-130之间，目前中国没有超过130岁的
  return diffYear >= 0 && diffYear <= 130;
};

/**
 * 转换15位身份号码为18位身份证号码
 *
 * @param {String | Number} IDCard - 待转换的15位身份证号码
 * @param {String | Number} preYear - 年份前2位
 * @return {String} - 18位身份证号码
 */
export const tranformEighteen = (IDCard = '', preYear) => {
  const IDCardMasterCode = makeYearToYYYY(IDCard, preYear);

  return IDCardMasterCode === null ?
    null :
    `${IDCardMasterCode}${getCheckCode(IDCardMasterCode)}`;
};

/**
 * 获取身份证的末位检验码
 *
 * @param {String | Number} IDCard - 待检验的身份证号
 * @return {Number} - 如果身份证符合条件，则返回检验码
 */
export const getCheckCode = (IDCard = '') => {
  const IDCardMasterCodeMatch = (/^\d{15}$/).test(IDCard) ?
    makeYearToYYYY(IDCard).match(/(^\d{17})/) :
    IDCard.match(/(^\d{17})/);
  if (
    IDCardMasterCodeMatch === null
  ) {
    return null;
  }
  const IDCardMasterCode = IDCardMasterCodeMatch[1];
  const IDCardMasterCodeWithWeightingReduce = IDCardMasterCode.split('').reduce(
    (sum, a, i) => (sum + (a * WEIGHTING_MAP[i])),
    0
  );
  return CHECK_CODE_MAP[IDCardMasterCodeWithWeightingReduce % 11];
};

/**
 * 身份证号码实例
 */
class IDCard {
  constructor(id) {
    if (!checkBaseFormat(id)) {
      console.error('id card format is error!');
      return false;
    }

    this.id = (id.length === 15) ? tranformEighteen(id) : id;
    this.isVerified = (
      checkProvince(id) &&
      checkBirthday(this.id) &&
      getCheckCode(this.id) === this.id.substr(17, 1)
    );
  }

  getMasterCode() {
    return this.isVerified ? this.id.substr(0, 17).toString() : null;
  }

  getCheckCode() {
    return this.isVerified ? this.id.substr(17, 1).toString() : null;
  }
}

export default (IDCardNumber) => (
  new IDCard(IDCardNumber)
);
