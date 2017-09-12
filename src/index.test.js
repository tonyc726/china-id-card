import IDCard, { tranformEighteen, getCheckCode } from './index';

test('tranformEighteen', () => {
  expect(tranformEighteen('310000810227632')).toBe('310000198102276323');
  // error id size
  expect(tranformEighteen('3100008102276321')).toBeNull();
  // error format
  expect(tranformEighteen('31abc08102276321')).toBeNull();
});

test('getCheckCode', () => {
  expect(getCheckCode('310000810227632')).toBe('3');
  expect(getCheckCode('31000019810227632')).toBe('3');
  expect(getCheckCode('310000198102276323')).toBe('3');
  // error id size
  expect(getCheckCode('31000081022763')).toBeNull();
  expect(getCheckCode('3100001981022763231')).toBe('3');
  // error format
  expect(getCheckCode('31abc0810227632')).toBeNull();
  expect(getCheckCode('31abc0198102276323')).toBeNull();
});

test('IDCard 15', () => {
  const newIDCard = IDCard('310000810227632');
  expect(newIDCard.isVerified).toBeTruthy();
  expect(newIDCard.getCheckCode()).toBe('3');
  expect(newIDCard.getMasterCode()).toBe('31000019810227632');
});

test('IDCard 18', () => {
  const newIDCard = IDCard('310000198102276323');
  expect(newIDCard.isVerified).toBeTruthy();
  expect(newIDCard.getCheckCode()).toBe('3');
  expect(newIDCard.getMasterCode()).toBe('31000019810227632');
});

test('IDCard 18 - check code = X', () => {
  const newIDCard = IDCard('31000019830212878X');
  expect(newIDCard.isVerified).toBeTruthy();
  expect(newIDCard.getCheckCode()).toBe('X');
  expect(newIDCard.getMasterCode()).toBe('31000019830212878');
});

test('IDCard error test', () => {
  const newIDCard = IDCard('3100001983021287');
  expect(newIDCard.isVerified).toBeFalsy();
  expect(newIDCard.getCheckCode()).toBeNull();
  expect(newIDCard.getMasterCode()).toBeNull();
});

test('IDCard error check code', () => {
  const newIDCard = IDCard('310000198302128788');
  expect(newIDCard.isVerified).toBeFalsy();
  expect(newIDCard.getCheckCode()).toBeNull();
  expect(newIDCard.getMasterCode()).toBeNull();
});
