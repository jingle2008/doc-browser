<script>
import { mapGetters } from 'vuex';
import StringView from './StringView';
import ArrayView from './ArrayView';
import ObjectView from './ObjectView';
import BooleanView from './BooleanView';
import LocalizedView from './LocalizedView';
import ExternalView from './ExternalView';
import DefaultView from './DefaultView';
import NullView from './NullView';
import ErrorView from './ErrorView';
import UndefinedView from './UndefinedView';
import { isNull, isUndefined, isBoolean, isString, isLocalized, isObject, isArray, isError } from '../../../utils/common';

export default {
  name: 'AnyView',
  props: {
    data: {
      required: true,
    },
    property: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters([
      'enable',
      'idProp',
    ]),
  },
  render(createElement) {
    const data = this.data;
    const property = this.property;

    const getComponent = () => {
      if (isNull(data)) return NullView;
      if (isUndefined(data)) return UndefinedView;
      if (this.enable
        && this.idProp === this.property) {
        return ExternalView;
      }
      if (isBoolean(data)) return BooleanView;
      if (isString(data)) return StringView;
      if (isLocalized(data)) return LocalizedView;
      if (isError(data)) return ErrorView;
      if (isObject(data)) return ObjectView;
      if (isArray(data)) return ArrayView;

      return DefaultView;
    };

    return createElement(
      getComponent(),
      { props: { data, property } },
      this.children);
  },
};
</script>
