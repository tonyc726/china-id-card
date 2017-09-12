# china-id-card - 中国公民身份证验证工具

[![Build Status](https://travis-ci.org/tonyc726/china-id-card.svg?style=flat-square&branch=master)](https://travis-ci.org/tonyc726/china-id-card)
[![bitHound Code](https://www.bithound.io/github/tonyc726/china-id-card/badges/code.svg)](https://www.bithound.io/github/tonyc726/china-id-card)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/tonyc726/china-id-card)

## 如何使用

### ES6 Modules
```
import IDCard from 'china-id-card';

console.log(IDCard('xxxxxxx').isVerified);
```

### CommonJS
```
const IDCard = require('china-id-card');

console.log(IDCard.default('xxxxxxx').isVerified);
```

### AMD
```
require(['path/to/amd.file.js'], function (IDCard) {
  console.log(IDCard.default('xxxxxxx').isVerified);
});
```

## License

Copyright © 2017-present. This source code is licensed under the MIT license found in the
[LICENSE](./LICENSE) file.

---
Made by Tony ([blog](https://itony.net))
