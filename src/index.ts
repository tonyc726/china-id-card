/**
 * 中国公民身份证号码工具库
 * @see GB 11643-1999
 */

// ==================== 核心实现 ====================

/** 检验码结果对照表 */
const CHECK_CODE_MAP = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] as const;

/** 身份号码中各个位置上的加权因子W(i)数值 */
const WEIGHTING_MAP = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1] as const;

/** 省份映射表 */
const PROVINCE_MAP: Record<string, string> = {
  '11': '北京市', '12': '天津市', '13': '河北省', '14': '山西省', '15': '内蒙古自治区',
  '21': '辽宁省', '22': '吉林省', '23': '黑龙江省',
  '31': '上海市', '32': '江苏省', '33': '浙江省', '34': '安徽省', '35': '福建省', '36': '江西省', '37': '山东省',
  '41': '河南省', '42': '湖北省', '43': '湖南省', '44': '广东省', '45': '广西壮族自治区', '46': '海南省',
  '50': '重庆市', '51': '四川省', '52': '贵州省', '53': '云南省', '54': '西藏自治区',
  '61': '陕西省', '62': '甘肃省', '63': '青海省', '64': '宁夏回族自治区', '65': '新疆维吾尔自治区',
  '71': '台湾省', '81': '香港特别行政区', '82': '澳门特别行政区',
};

/**
 * 检验身份证基本格式
 */
export const checkBaseFormat = (id: string): boolean => {
  return /(^\d{15}$)|(^\d{17}(\d|X)$)/i.test(id);
};

/**
 * 检验省份代码是否有效
 */
export const checkProvince = (id: string): boolean => {
  const code = id.slice(0, 2);
  return /^(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82)/.test(code);
};

/**
 * 计算校验码
 */
export const getCheckCode = (id: string): string | null => {
  const masterCode = id.slice(0, 17);
  if (!/^\d{17}$/.test(masterCode)) return null;

  const sum = masterCode.split('').reduce((acc, char, i) => {
    return acc + parseInt(char, 10) * WEIGHTING_MAP[i]!;
  }, 0);

  return CHECK_CODE_MAP[sum % 11]!;
};

/**
 * 15位身份证转18位
 */
export const toEighteen = (id: string): string | null => {
  if (!/^\d{15}$/.test(id)) return null;

  const addressCode = id.slice(0, 6);
  const year = id.slice(6, 8);
  const monthDayOrder = id.slice(8);
  const seventeen = `${addressCode}19${year}${monthDayOrder}`;

  const sum = seventeen.split('').reduce((acc, char, i) => {
    return acc + parseInt(char, 10) * WEIGHTING_MAP[i]!;
  }, 0);

  const checkCode = CHECK_CODE_MAP[sum % 11]!;
  return `${seventeen}${checkCode}`;
};

/**
 * 身份证脱敏
 */
export const mask = (id: string): string => {
  const idStr = String(id);
  const isFifteen = idStr.length === 15;
  const isEighteen = idStr.length === 18;

  if (!isFifteen && !isEighteen) {
    return 'Invalid ID';
  }

  const eighteen = isFifteen ? toEighteen(idStr) : idStr;
  if (!eighteen) return 'Invalid ID';

  return `${eighteen.slice(0, 3)}***********${eighteen.slice(-4)}`;
};

/**
 * 解析身份证信息
 */
export interface IDCardInfo {
  isValid: boolean;
  provinceCode: string;
  province: string;
  birthDate: string;
  gender: 'male' | 'female';
  age: number;
  fifteenDigit: string | null;
  eighteenDigit: string | null;
}

export const parse = (id: string): IDCardInfo => {
  const idStr = String(id);
  const isFifteen = idStr.length === 15;

  if (!checkBaseFormat(idStr)) {
    return {
      isValid: false,
      provinceCode: '',
      province: '',
      birthDate: '',
      gender: 'male',
      age: 0,
      fifteenDigit: null,
      eighteenDigit: null,
    };
  }

  const provinceCode = idStr.slice(0, 2);
  const year = parseInt(isFifteen ? `19${idStr.slice(6, 8)}` : idStr.slice(6, 10), 10);
  const month = parseInt(isFifteen ? idStr.slice(8, 10) : idStr.slice(10, 12), 10);
  const day = parseInt(isFifteen ? idStr.slice(10, 12) : idStr.slice(12, 14), 10);
  const orderCode = isFifteen ? idStr.slice(12, 15) : idStr.slice(14, 17);
  const genderCode = parseInt(orderCode, 10) % 2;

  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  const eighteenDigit = isFifteen ? toEighteen(idStr) : idStr;

  let isValid = checkProvince(idStr);
  if (isFifteen) {
    isValid = isValid && eighteenDigit !== null;
  } else {
    isValid = isValid && getCheckCode(idStr) === idStr[17];
  }

  return {
    isValid,
    provinceCode,
    province: PROVINCE_MAP[provinceCode] || '',
    birthDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    gender: genderCode === 1 ? 'male' : 'female',
    age,
    fifteenDigit: isFifteen ? idStr : null,
    eighteenDigit: isFifteen ? eighteenDigit : idStr,
  };
};

/**
 * 快速验证身份证是否有效
 */
export const isValid = (id: string): boolean => {
  return parse(id).isValid;
};
