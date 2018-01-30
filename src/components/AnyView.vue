<template>
  <span v-if="isNull(data)" class="font-italic">
    [Unset]
  </span>
  <boolean-view v-else-if="isBoolean(data)" :data="data">
  </boolean-view>
  <span v-else-if="isEmpty(data)" class="font-italic">
    [Empty]
  </span>
  <localized-view v-else-if="isLocalized(data)" :data="data">
  </localized-view>
  <collapse-view v-else-if="isObject(data)">
    <object-view :data="data"></object-view>
  </collapse-view>
  <collapse-view v-else-if="isArray(data)">
    <array-view :data="data"></array-view>
  </collapse-view>
  <span v-else>{{ data }}</span>
</template>

<script>
import ArrayView from './ArrayView';
import ObjectView from './ObjectView';
import CollapseView from './CollapseView';
import BooleanView from './BooleanView';
import LocalizedView from './LocalizedView';
import mixins from './mixins';

export default {
  name: 'AnyView',
  props: {
    data: {
    },
  },
  methods: {
    isEmptyArray(value) {
      return Array.isArray(value)
        && value.length === 0;
    },
    isEmptyObject(value) {
      return this.isObject(value)
        && Object.keys(value).length === 0;
    },
    isEmptyString(value) {
      return this.isString(value)
        && value.length === 0;
    },
    isEmpty(value) {
      return this.isEmptyArray(value)
        || this.isEmptyObject(value)
        || this.isEmptyString(value);
    },
  },
  beforeCreate() {
    this.$options.components.ObjectView = ObjectView;
    this.$options.components.ArrayView = ArrayView;
  },
  components: {
    CollapseView,
    BooleanView,
    LocalizedView,
  },
  mixins: [mixins],
};
</script>