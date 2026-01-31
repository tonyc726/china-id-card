import { isValid, parse, toEighteen, mask, checkBaseFormat, checkProvince, getCheckCode } from '../src';

// ==================== checkBaseFormat ====================
describe('checkBaseFormat', () => {
  it('should return true for valid 15-digit ID', () => {
    expect(checkBaseFormat('310000810227632')).toBe(true);
  });

  it('should return true for valid 18-digit ID with digit', () => {
    expect(checkBaseFormat('310000198102276323')).toBe(true);
  });

  it('should return true for valid 18-digit ID with X', () => {
    expect(checkBaseFormat('31000019830212878X')).toBe(true);
  });

  it('should return false for 17 digits', () => {
    expect(checkBaseFormat('31000019810227632')).toBe(false);
  });

  it('should return false for 19 digits', () => {
    expect(checkBaseFormat('3100001981022763234')).toBe(false);
  });

  it('should return false for invalid characters', () => {
    expect(checkBaseFormat('abc')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(checkBaseFormat('')).toBe(false);
  });

  it('should handle number input', () => {
    expect(checkBaseFormat(310000810227632 as unknown)).toBe(true);
  });
});

// ==================== checkProvince ====================
describe('checkProvince', () => {
  it('should return true for valid province codes', () => {
    expect(checkProvince('110000000000000')).toBe(true); // 北京市
    expect(checkProvince('310000000000000')).toBe(true); // 上海市
    expect(checkProvince('440100000000000')).toBe(true); // 广东省
    expect(checkProvince('710000000000000')).toBe(true); // 台湾省
    expect(checkProvince('820000000000000')).toBe(true); // 澳门特别行政区
  });

  it('should return false for invalid province codes', () => {
    expect(checkProvince('000000000000000')).toBe(false);
    expect(checkProvince('990000000000000')).toBe(false);
    expect(checkProvince('abc')).toBe(false);
  });
});

// ==================== getCheckCode ====================
describe('getCheckCode', () => {
  it('should return correct check code for 17-digit ID', () => {
    expect(getCheckCode('31000019810227632')).toBe('3');
  });

  it('should return correct check code for 18-digit ID', () => {
    expect(getCheckCode('310000198102276323')).toBe('3');
  });

  it('should return X for check code X', () => {
    expect(getCheckCode('31000019830212878')).toBe('X');
  });

  it('should return null for invalid format (not 17 digits)', () => {
    expect(getCheckCode('310000810227632')).toBeNull(); // 15 digits
    expect(getCheckCode('abc')).toBeNull();
    expect(getCheckCode('')).toBeNull();
  });

  it('should return null for non-numeric characters', () => {
    expect(getCheckCode('31000019abc276323')).toBeNull();
  });

  it('should calculate sum correctly for all 9s', () => {
    // All 9s will exercise all branches of the reduce calculation
    expect(getCheckCode('99999999999999999')).toBe('3');
  });
});

// ==================== toEighteen ====================
describe('toEighteen', () => {
  it('should transform 15-digit to 18-digit ID', () => {
    expect(toEighteen('310000810227632')).toBe('310000198102276323');
  });

  it('should return null for invalid ID size (16 digits)', () => {
    expect(toEighteen('3100008102276321')).toBeNull();
  });

  it('should return null for invalid ID size (14 digits)', () => {
    expect(toEighteen('31000081022763')).toBeNull();
  });

  it('should return null for invalid format (non-numeric)', () => {
    expect(toEighteen('31abc08102276321')).toBeNull();
  });

  it('should return null for empty string', () => {
    expect(toEighteen('')).toBeNull();
  });

  it('should calculate check code correctly for all 9s prefix', () => {
    // Exercise all branches of the reduce calculation
    expect(toEighteen('999999990123456')).toBe('999999199901234568');
  });
});

// ==================== mask ====================
describe('mask', () => {
  it('should mask 15-digit ID', () => {
    expect(mask('310000810227632')).toBe('310***********6323');
  });

  it('should mask 18-digit ID', () => {
    expect(mask('310000198102276323')).toBe('310***********6323');
  });

  it('should return Invalid ID for invalid input (abc)', () => {
    expect(mask('abc')).toBe('Invalid ID');
  });

  it('should return Invalid ID for wrong length (14 digits)', () => {
    expect(mask('31000081022763')).toBe('Invalid ID');
  });

  it('should return Invalid ID for 16 digits', () => {
    expect(mask('3100008102276321')).toBe('Invalid ID');
  });

  it('should return Invalid ID for empty string', () => {
    expect(mask('')).toBe('Invalid ID');
  });

  it('should return Invalid ID when toEighteen returns null', () => {
    expect(mask('31abc08102276321')).toBe('Invalid ID');
  });

  it('should return Invalid ID for 15-digit format with non-numeric chars', () => {
    // This triggers the toEighteen null branch in mask (line 86)
    expect(mask('31abc0810227632')).toBe('Invalid ID');
  });
});

// ==================== parse ====================
describe('parse', () => {
  it('should parse 15-digit ID correctly', () => {
    const result = parse('310000810227632');
    expect(result.isValid).toBe(true);
    expect(result.provinceCode).toBe('31');
    expect(result.province).toBe('上海市');
    expect(result.birthDate).toBe('1981-02-27');
    expect(result.gender).toBe('female');
    expect(result.eighteenDigit).toBe('310000198102276323');
    expect(result.fifteenDigit).toBe('310000810227632');
    expect(result.age).toBe(new Date().getFullYear() - 1981);
  });

  it('should parse 18-digit ID correctly', () => {
    const result = parse('310000198102276323');
    expect(result.isValid).toBe(true);
    expect(result.provinceCode).toBe('31');
    expect(result.province).toBe('上海市');
    expect(result.birthDate).toBe('1981-02-27');
    expect(result.gender).toBe('female');
    expect(result.eighteenDigit).toBe('310000198102276323');
    expect(result.fifteenDigit).toBe(null);
  });

  it('should parse ID with check code X', () => {
    const result = parse('31000019830212878X');
    expect(result.isValid).toBe(true);
    expect(result.birthDate).toBe('1983-02-12');
    expect(result.gender).toBe('female'); // 顺序码 878 是偶数
    expect(result.eighteenDigit).toBe('31000019830212878X');
  });

  it('should return invalid result for invalid format', () => {
    const result = parse('abc');
    expect(result.isValid).toBe(false);
    expect(result.province).toBe('');
    expect(result.birthDate).toBe('');
    expect(result.provinceCode).toBe('');
    expect(result.fifteenDigit).toBeNull();
    expect(result.eighteenDigit).toBeNull();
  });

  it('should return invalid result for empty string', () => {
    const result = parse('');
    expect(result.isValid).toBe(false);
    expect(result.gender).toBe('male');
    expect(result.age).toBe(0);
  });

  it('should return invalid result for invalid province', () => {
    const result = parse('00000019830212878X');
    expect(result.isValid).toBe(false);
    expect(result.province).toBe('');
  });

  it('should return invalid result for invalid check code', () => {
    const result = parse('310000198302128788');
    expect(result.isValid).toBe(false);
  });

  it('should parse male gender correctly', () => {
    // 顺序码奇数为男性
    const result = parse('110101199001011234'); // 顺序码 123 是奇数
    expect(result.gender).toBe('male');
  });

  it('should handle number input', () => {
    const result = parse(310000810227632 as unknown);
    expect(result.isValid).toBe(true);
    expect(result.province).toBe('上海市');
  });
});

// ==================== isValid ====================
describe('isValid', () => {
  it('should return true for valid 15-digit ID', () => {
    expect(isValid('310000810227632')).toBe(true);
  });

  it('should return true for valid 18-digit ID', () => {
    expect(isValid('310000198102276323')).toBe(true);
  });

  it('should return true for 18-digit ID with X', () => {
    expect(isValid('31000019830212878X')).toBe(true);
  });

  it('should return false for invalid format (17 digits)', () => {
    expect(isValid('31000019810227632')).toBe(false);
  });

  it('should return false for invalid format (19 digits)', () => {
    expect(isValid('3100001981022763234')).toBe(false);
  });

  it('should return false for invalid format (abc)', () => {
    expect(isValid('abc')).toBe(false);
  });

  it('should return false for invalid province', () => {
    expect(isValid('00000019830212878X')).toBe(false);
  });

  it('should return false for invalid check code', () => {
    expect(isValid('310000198302128788')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isValid('')).toBe(false);
  });

  it('should handle number input', () => {
    expect(isValid(310000810227632 as unknown)).toBe(true);
  });
});
