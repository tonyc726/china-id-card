/**
 * 中国公民身份证号码工具库
 * @see GB 11643-1999
 */
/**
 * 检验身份证基本格式
 */
export declare const checkBaseFormat: (id: string) => boolean;
/**
 * 检验省份代码是否有效
 */
export declare const checkProvince: (id: string) => boolean;
/**
 * 计算校验码
 */
export declare const getCheckCode: (id: string) => string | null;
/**
 * 15位身份证转18位
 */
export declare const toEighteen: (id: string) => string | null;
/**
 * 身份证脱敏
 */
export declare const mask: (id: string) => string;
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
export declare const parse: (id: string) => IDCardInfo;
/**
 * 快速验证身份证是否有效
 */
export declare const isValid: (id: string) => boolean;
