//#region src/index.ts
var e = [
	"1",
	"0",
	"X",
	"9",
	"8",
	"7",
	"6",
	"5",
	"4",
	"3",
	"2"
], t = [
	7,
	9,
	10,
	5,
	8,
	4,
	2,
	1,
	6,
	3,
	7,
	9,
	10,
	5,
	8,
	4,
	2,
	1
], n = {
	11: "北京市",
	12: "天津市",
	13: "河北省",
	14: "山西省",
	15: "内蒙古自治区",
	21: "辽宁省",
	22: "吉林省",
	23: "黑龙江省",
	31: "上海市",
	32: "江苏省",
	33: "浙江省",
	34: "安徽省",
	35: "福建省",
	36: "江西省",
	37: "山东省",
	41: "河南省",
	42: "湖北省",
	43: "湖南省",
	44: "广东省",
	45: "广西壮族自治区",
	46: "海南省",
	50: "重庆市",
	51: "四川省",
	52: "贵州省",
	53: "云南省",
	54: "西藏自治区",
	61: "陕西省",
	62: "甘肃省",
	63: "青海省",
	64: "宁夏回族自治区",
	65: "新疆维吾尔自治区",
	71: "台湾省",
	81: "香港特别行政区",
	82: "澳门特别行政区"
}, r = (e) => /(^\d{15}$)|(^\d{17}(\d|X)$)/i.test(e), i = (e) => {
	let t = e.slice(0, 2);
	return /^(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82)/.test(t);
}, a = (n) => {
	let r = n.slice(0, 17);
	return /^\d{17}$/.test(r) ? e[r.split("").reduce((e, n, r) => e + parseInt(n, 10) * t[r], 0) % 11] : null;
}, o = (n) => {
	if (!/^\d{15}$/.test(n)) return null;
	let r = `${n.slice(0, 6)}19${n.slice(6, 8)}${n.slice(8)}`;
	return `${r}${e[r.split("").reduce((e, n, r) => e + parseInt(n, 10) * t[r], 0) % 11]}`;
}, s = (e) => {
	let t = String(e), n = t.length === 15, r = t.length === 18;
	if (!n && !r) return "Invalid ID";
	let i = n ? o(t) : t;
	return i ? `${i.slice(0, 3)}***********${i.slice(-4)}` : "Invalid ID";
}, c = (e) => {
	let t = String(e), s = t.length === 15;
	if (!r(t)) return {
		isValid: !1,
		provinceCode: "",
		province: "",
		birthDate: "",
		gender: "male",
		age: 0,
		fifteenDigit: null,
		eighteenDigit: null
	};
	let c = t.slice(0, 2), l = parseInt(s ? `19${t.slice(6, 8)}` : t.slice(6, 10), 10), u = parseInt(s ? t.slice(8, 10) : t.slice(10, 12), 10), d = parseInt(s ? t.slice(10, 12) : t.slice(12, 14), 10), f = s ? t.slice(12, 15) : t.slice(14, 17), p = parseInt(f, 10) % 2, m = (/* @__PURE__ */ new Date()).getFullYear() - l, h = s ? o(t) : t, g = i(t);
	return s ? g &&= h !== null : g &&= a(t) === t[17], {
		isValid: g,
		provinceCode: c,
		province: n[c] || "",
		birthDate: `${l}-${String(u).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
		gender: p === 1 ? "male" : "female",
		age: m,
		fifteenDigit: s ? t : null,
		eighteenDigit: s ? h : t
	};
}, l = (e) => c(e).isValid;
//#endregion
export { r as checkBaseFormat, i as checkProvince, a as getCheckCode, l as isValid, s as mask, c as parse, o as toEighteen };
