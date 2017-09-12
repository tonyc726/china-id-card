/* china-id-card v0.0.0 - tonyc726 <zhujf620@gmail.com> */
define(['exports'], function (exports) { 'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var CHECK_CODE_MAP = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

var WEIGHTING_MAP = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

var checkBaseFormat = function checkBaseFormat() {
  var IDCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (/(^\d{15}$)|(^\d{17}(\d|X)$)/i.test(IDCard)
  );
};

var makeYearToYYYY = function makeYearToYYYY() {
  var IDCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var preYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 19;
  return (/^\d{15}$/.test(IDCard) ? '' + IDCard.substr(0, 6) + preYear + IDCard.substr(6, IDCard.length - 6) : null
  );
};

var checkProvince = function checkProvince() {
  var IDCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return IDCard && /^(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82)/.test(IDCard);
};

var checkBirthday = function checkBirthday() {
  var IDCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var birthdayMatch = IDCard.match(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
  if (birthdayMatch === null) {
    return false;
  }

  var diffYear = new Date().getFullYear() - new Date(birthdayMatch[2] + '/' + birthdayMatch[3] + '/' + birthdayMatch[4]).getFullYear();

  return diffYear >= 0 && diffYear <= 130;
};

var tranformEighteen = function tranformEighteen() {
  var IDCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var preYear = arguments[1];

  var IDCardMasterCode = makeYearToYYYY(IDCard, preYear);

  return IDCardMasterCode === null ? null : '' + IDCardMasterCode + getCheckCode(IDCardMasterCode);
};

var getCheckCode = function getCheckCode() {
  var IDCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var IDCardMasterCodeMatch = /^\d{15}$/.test(IDCard) ? makeYearToYYYY(IDCard).match(/(^\d{17})/) : IDCard.match(/(^\d{17})/);
  if (IDCardMasterCodeMatch === null) {
    return null;
  }
  var IDCardMasterCode = IDCardMasterCodeMatch[1];
  var IDCardMasterCodeWithWeightingReduce = IDCardMasterCode.split('').reduce(function (sum, a, i) {
    return sum + a * WEIGHTING_MAP[i];
  }, 0);
  return CHECK_CODE_MAP[IDCardMasterCodeWithWeightingReduce % 11];
};

var IDCard = function () {
  function IDCard(id) {
    classCallCheck(this, IDCard);

    if (!checkBaseFormat(id)) {
      console.error('id card format is error!');
      return false;
    }

    this.id = id.length === 15 ? tranformEighteen(id) : id;
    this.isVerified = checkProvince(id) && checkBirthday(this.id) && getCheckCode(this.id) === this.id.substr(17, 1);
  }

  createClass(IDCard, [{
    key: 'getMasterCode',
    value: function getMasterCode() {
      return this.isVerified ? this.id.substr(0, 17).toString() : null;
    }
  }, {
    key: 'getCheckCode',
    value: function getCheckCode() {
      return this.isVerified ? this.id.substr(17, 1).toString() : null;
    }
  }]);
  return IDCard;
}();

var index = (function (IDCardNumber) {
  return new IDCard(IDCardNumber);
});

exports.tranformEighteen = tranformEighteen;
exports.getCheckCode = getCheckCode;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

});
