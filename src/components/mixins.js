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
      return typeof value === 'number' && isFinite(value);
    },
    isObject(value) {
      return value && typeof value === 'object' && value.constructor === Object;
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
      return typeof value === 'string' || value instanceof String;
    },
    isFunction(value) {
      return typeof value === 'function';
    },
    isBoolean(value) {
      return typeof value === 'boolean';
    },
    isRegExp(value) {
      return value && typeof value === 'object' && value.constructor === RegExp;
    },
    isError(value) {
      return value instanceof Error && typeof value.message !== 'undefined';
    },
    isSymbol(value) {
      return typeof value === 'symbol';
    },
  },
};
