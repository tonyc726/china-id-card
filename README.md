# china-id-card - 中国公民身份证验证工具

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/tonyc726/china-id-card)
[![Build Status](https://travis-ci.org/tonyc726/china-id-card.svg?style=flat-square&branch=master)](https://travis-ci.org/tonyc726/china-id-card)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/tonyc726/china-id-card)

## Usage

[ONLINE DEMO](https://tonyc726.github.io/china-id-card)

### ES6 Modules

```js
import IDCard from 'china-id-card';

console.log(IDCard('xxxxxxx').isVerified);
```

### CommonJS

```js
const IDCard = require('china-id-card');

console.log(IDCard.default('xxxxxxx').isVerified);
```

### AMD

```js
require(['path/to/amd.file.js'], function(IDCard) {
  console.log(IDCard.default('xxxxxxx').isVerified);
});
```

## License

Copyright © 2017-present. This source code is licensed under the MIT license found in the
[LICENSE](./LICENSE) file.

---

Made by Tony ([blog](https://itony.net))
