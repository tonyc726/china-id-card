# China ID Card Validator

基于 GB 11643-1999 标准的中华人民共和国公民身份证号码验证工具库。支持 15 位和 18 位身份证的验证、解析和转换。

## 功能特性

- **格式验证** - 验证身份证基本格式
- **省份验证** - 验证省份编码有效性
- **校验码计算** - 根据 GB 11643-1999 计算校验码
- **15位转18位** - 将 15 位身份证转换为 18 位
- **信息解析** - 解析身份证获取省份、出生日期、性别、年龄
- **隐私脱敏** - 对身份证号进行脱敏处理

## 快速开始

### 安装

```bash
pnpm add china-id-card
```

### 使用

```typescript
import { isValid, parse, mask } from 'china-id-card'

// 验证身份证
isValid('622922197808118498') // → true

// 解析身份证信息
const info = parse('622922197808118498')
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11', gender: 'male', ... }

// 脱敏处理
mask('622922197808118498') // → '622***********8498'
```

## 在线演示

请查看各 API 的在线演示页面。

## API 参考

- [isValid()](/api/isValid) - 快速验证身份证是否有效
- [parse()](/api/parse) - 完整解析身份证信息
- [mask()](/api/mask) - 身份证脱敏
- [toEighteen()](/api/toEighteen) - 15位转18位
- [getCheckCode()](/api/getCheckCode) - 计算校验码
- [checkProvince()](/api/checkProvince) - 省份验证
- [checkBaseFormat()](/api/checkBaseFormat) - 格式验证

## 测试数据

```typescript
[
  '622922197808118498', // 甘肃省
  '37012519790112881X', // 山东省
  '510726198609245808', // 四川省
  '530629198901284967', // 云南省
  '31000019850412412X', // 上海市
  '110101900101001',    // 15位北京市
  '810000199012305532', // 香港特别行政区
  '820000199012305521'  // 澳门特别行政区
]
```
