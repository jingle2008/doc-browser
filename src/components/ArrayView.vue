<template>
  <span v-if="!data.length" class="font-italic text-info">
    [Empty Array]
  </span>
  <collapse-view
    v-else
    :header="displayHeader"
    :visible="visible">
    <filter-view
      v-if="complex"
      :total.sync="totalRows"
      :current.sync="currentPage"
      :pageSize.sync="perPage"
      :keyword.sync="keyword">
    </filter-view>
    <b-table
      :items="items"
      :fields="fields"
      :filter="keyword"
      bordered
      head-variant="light"
      :current-page="currentPage"
      :per-page="complex ? perPage : 0"
      show-empty
      @filtered="onFiltered">
      <template
        v-for="(field, index) in complexFields"
        :slot="field"
        slot-scope="data">
        <any-view :data="data.value" :key="index">
        </any-view>
      </template>
    </b-table>
  </collapse-view>
</template>

<script>
import AnyView from './AnyView';
import FilterView from './FilterView';
import CollapseView from './CollapseView';
import mixins from './mixins';

export default {
  name: 'ArrayView',
  props: {
    data: {
      type: Array,
      required: true,
    },
    header: {
      type: String,
      default: 'Array',
    },
    showFilter: {
      type: Boolean,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keyword: '',
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
    };
  },
  components: {
    FilterView,
    CollapseView,
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
  },
  methods: {
    isObjectArray(value) {
      return value.every(this.isObject);
    },
    isSimple(value) {
      return this.isPrimitive(value)
        || this.isString(value)
        || this.isDate(value);
    },
    isSimpleObjectArray(value) {
      return value.every(
        item => Object.keys(item).length === 1);
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  computed: {
    displayHeader() {
      return `${this.header} (${this.data.length})`;
    },
    complex() {
      if (this.showFilter !== null) {
        return this.showFilter;
      }

      return this.items.length >= 20;
    },
    items() {
      if (this.isObjectArray(this.data)) {
        if (this.isSimpleObjectArray(this.data)) {
          const name = Object.keys(this.data[0])[0];
          return this.data.map((item, index) => (
            {
              index: index + 1,
              [name]: item[name],
            }));
        }

        return this.data;
      }

      return this.data.map((item, index) => (
        {
          index: index + 1,
          value: item,
        }));
    },
    fieldDefs() {
      const item = this.items[0];
      const keys = Object.keys(item);
      return keys.map(key => (
        {
          key,
          simple: this.isSimple(item[key]),
        }));
    },
    complexFields() {
      return this.fieldDefs
        .filter(def => !def.simple)
        .map(def => def.key);
    },
    fields() {
      return this.fieldDefs.map(def => (
        {
          key: def.key,
          sortable: def.simple,
        }));
    },
  },
  mixins: [mixins],
};
</script>
