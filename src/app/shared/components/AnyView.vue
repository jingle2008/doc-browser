<script>
import StringView from './StringView';
import ArrayView from './ArrayView';
import ObjectView from './ObjectView';
import BooleanView from './BooleanView';
import LocalizedView from './LocalizedView';
// import ExternalView from './ExternalView';
import DefaultView from './DefaultView';
import NullView from './NullView';
import { isNull, isBoolean, isString, isLocalized, isObject, isArray } from '../../../utils/common';

export default {
  name: 'AnyView',
  functional: true,
  props: {
    data: {
      required: true,
    },
    property: {
      type: String,
      default: null,
    },
  },
  render(createElement, context) {
    const data = context.props.data;

    function getComponent() {
      if (isNull(data)) return NullView;
      if (isBoolean(data)) return BooleanView;
      if (isString(data)) return StringView;
      if (isLocalized(data)) return LocalizedView;
      if (isObject(data)) return ObjectView;
      if (isArray(data)) return ArrayView;

      return DefaultView;
    }

    return createElement(
      getComponent(),
      { props: { data } },
      context.children);
  },
};
</script>