<template>
  <span v-if="isNull(data)" class="font-italic">[Unset]</span>
  <span v-else-if="isString(data) && isValidDate(data)">
    <date-view :data="data"></date-view>
  </span>
  <span v-else-if="isEmptyArray(data) || isEmptyObject(data)" class="font-italic">[Empty]</span>
  <template v-else>
    <b-btn v-b-toggle="data.item.property" variant="secondary" class="sm mb-1">Show/Hide</b-btn>
    <b-collapse visible :id="data.item.property">
      <any-view :data="data"></any-view>
    </b-collapse>
  </template>
  <date-view v-if="data instanceof Date" :data="data"></date-view>
  <array-view v-else-if="data instanceof Array" :data="data"></array-view>
  <object-view v-else-if="data instanceof Object" :data="data"></object-view>
  <span v-else>{{ data }}</span>
</template>

<script>
import DateView from './DateView';
import ArrayView from './ArrayView';
import ObjectView from './ObjectView';
import mixins from './mixins';

export default {
  name: 'AnyView',
  props: {
    data: {
    },
    key: {
      type: String,
    }
  },
  methods: {
    isEmptyArray(value) {
      return Array.isArray(value) && value.length === 0;
    },
    isEmptyObject(value) {
      return this.isObject(value) && Object.keys(value).length === 0;
    },
    toDate(value) {
      if (this.isDate(value)) {
        return value;
      }

      if (this.isString(value)) {
        
      }
      return false;
    },
  },
  beforeCreate() {
    this.$options.components.ObjectView = ObjectView;
    this.$options.components.ArrayView = ArrayView;
    this.$options.components.DateView = DateView;
  },
  mixins: [mixins],
};
</script>