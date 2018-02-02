<template>
  <span v-if="isNull(data)" class="font-italic text-info">
    Null
  </span>
  <boolean-view v-else-if="isBoolean(data)" :data="data">
  </boolean-view>
  <string-view v-else-if="isString(data)" :data="data">
  </string-view>
  <localized-view v-else-if="isLocalized(data)" :data="data">
  </localized-view>
  <object-view v-else-if="isObject(data)" :data="data">
  </object-view>
  <array-view v-else-if="isArray(data)" :data="data">
  </array-view>
  <span v-else>{{ data }}</span>
</template>

<script>
import StringView from './StringView';
import ArrayView from './ArrayView';
import ObjectView from './ObjectView';
import BooleanView from './BooleanView';
import LocalizedView from './LocalizedView';
import mixins from './mixins';

export default {
  name: 'AnyView',
  props: {
    data: {
      required: true,
    },
  },
  beforeCreate() {
    this.$options.components.ObjectView = ObjectView;
    this.$options.components.ArrayView = ArrayView;
  },
  components: {
    BooleanView,
    LocalizedView,
    StringView,
  },
  mixins: [mixins],
};
</script>