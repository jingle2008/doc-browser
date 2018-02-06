import locales from './locales';

export default {
  methods: {
    isPrimitive(value) {
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
    },
    isNumber(value) {
      return typeof value === 'number'
        && isFinite(value);
    },
    isObject(value) {
      return value
        && typeof value === 'object'
        && value.constructor === Object;
    },
    isDate(value) {
      return value instanceof Date;
    },
    isNull(value) {
      return value === null;
    },
    isUndefined(value) {
      return typeof value === 'undefined';
    },
    isString(value) {
      return typeof value === 'string'
        || value instanceof String;
    },
    isFunction(value) {
      return typeof value === 'function';
    },
    isBoolean(value) {
      return typeof value === 'boolean';
    },
    isRegExp(value) {
      return value
        && typeof value === 'object'
        && value.constructor === RegExp;
    },
    isError(value) {
      return value instanceof Error
        && typeof value.message !== 'undefined';
    },
    isSymbol(value) {
      return typeof value === 'symbol';
    },
    isArray(value) {
      return Array.isArray(value);
    },
    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      }
      return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    },
    isLocalized(value) {
      if (!this.isObject(value)) {
        return false;
      }

      const keys = Object.keys(value);
      return keys.length
        && keys.every(key => locales.includes(key));
    },
    getEnglishString(value) {
      if (!this.isLocalized(value)) {
        return null;
      }

      return value.en || value['en-US'];
    },
    format(fmt, ...args) {
      return fmt.replace(
        /{(\d+)}/g,
        (match, number) =>
          (typeof args[number] !== 'undefined'
            ? args[number]
            : match));
    },
  },
};
