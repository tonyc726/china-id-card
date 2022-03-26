'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var CHECK_CODE_MAP = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
var WEIGHTING_MAP = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

var checkBaseFormat = function checkBaseFormat() {
  var IDCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return /(^\d{15}$)|(^\d{17}(\d|X)$)/i.test(IDCard);
};

var makeYearToYYYY = function makeYearToYYYY() {
  var IDCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var preYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 19;
  return /^\d{15}$/.test(IDCard) ? "".concat(IDCard.substr(0, 6)).concat(preYear).concat(IDCard.substr(6, IDCard.length - 6)) : null;
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

  var diffYear = new Date().getFullYear() - new Date("".concat(birthdayMatch[2], "-").concat(birthdayMatch[3], "-").concat(birthdayMatch[4])).getFullYear();
  return diffYear >= 0 && diffYear <= 130;
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
var tranformEighteen = function tranformEighteen() {
  var IDCard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var preYear = arguments.length > 1 ? arguments[1] : undefined;
  var IDCardMasterCode = makeYearToYYYY(IDCard, preYear);
  return IDCardMasterCode === null ? null : "".concat(IDCardMasterCode).concat(getCheckCode(IDCardMasterCode));
};

var IDCard = function () {
  function IDCard(id) {
    _classCallCheck(this, IDCard);

    if (!checkBaseFormat(id)) {
      console.error('id card format is error!');
      return false;
    }

    this.id = id.length === 15 ? tranformEighteen(id) : id;
    this.isVerified = checkProvince(id) && checkBirthday(this.id) && getCheckCode(this.id) === this.id.substr(17, 1);
  }

  _createClass(IDCard, [{
    key: "getMasterCode",
    value: function getMasterCode() {
      return this.isVerified ? this.id.substr(0, 17).toString() : null;
    }
  }, {
    key: "getCheckCode",
    value: function getCheckCode() {
      return this.isVerified ? this.id.substr(17, 1).toString() : null;
    }
  }]);

  return IDCard;
}();

var index = (function (IDCardNumber) {
  return new IDCard(IDCardNumber);
});

exports.default = index;
exports.getCheckCode = getCheckCode;
exports.tranformEighteen = tranformEighteen;
