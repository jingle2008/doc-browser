import locales from './locales';

export function isPrimitive(value) {
  switch (typeof value) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'symbol':
    case 'undefined':
      return true;
    default: {
      return value === null;
    }
  }
}

export function isNumber(value) {
  return typeof value === 'number'
    && isFinite(value);
}

export function isObject(value) {
  return value
    && typeof value === 'object'
    && value.constructor === Object;
}

export function isDate(value) {
  return value instanceof Date;
}

export function isNull(value) {
  return value === null;
}

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function isString(value) {
  return typeof value === 'string'
    || value instanceof String;
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

export function isRegExp(value) {
  return value
    && typeof value === 'object'
    && value.constructor === RegExp;
}

export function isError(value) {
  return value instanceof Error
    && typeof value.message !== 'undefined';
}

export function isSymbol(value) {
  return typeof value === 'symbol';
}

export function isArray(value) {
  return Array.isArray(value);
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function isLocalized(value) {
  if (!isObject(value)) {
    return false;
  }

  const keys = Object.keys(value);
  return keys.length
    && keys.every(key => locales.includes(key));
}

export function getDisplayValue(value) {
  if (!isLocalized(value)) {
    return null;
  }

  return value.en || value['en-US'];
}

export function format(fmt, ...args) {
  return fmt.replace(
    /{(\d+)}/g,
    (match, number) =>
      (typeof args[number] !== 'undefined'
        ? args[number]
        : match));
}
