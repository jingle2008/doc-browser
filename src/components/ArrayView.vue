<template>
  <div>
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
      caption-top
      head-variant="light"
      :current-page="currentPage"
      :per-page="complex ? perPage : 0"
      show-empty
      @filtered="onFiltered">
      <template slot="table-caption">
        <h4 v-if="caption">{{ caption }}</h4>
      </template>
      <template
        v-for="(field, index) in complexFields"
        :slot="field"
        slot-scope="data">
        <any-view :data="data.value" :key="index"></any-view>
      </template>
    </b-table>
  </div>
</template>

<script>
import AnyView from './AnyView';
import FilterView from './FilterView';
import mixins from './mixins';

export default {
  name: 'ArrayView',
  props: {
    data: {
      type: Array,
      required: true,
    },
    caption: {
      type: String,
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
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
  },
  methods: {
    isSimple(value) {
      return this.isPrimitive(value)
        || this.isString(value)
        || this.isDate(value);
    },
    isSimpleArray(value) {
      return value.every(this.isSimple);
    },
    isSimpleObject(value) {
      return value.every(
        item => this.isObject(item)
        && Object.keys(item).length === 1);
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  computed: {
    complex() {
      return this.data.length >= 20;
    },
    items() {
      if (this.isSimpleArray(this.data)) {
        return this.data.map((item, index) => (
          {
            id: index + 1,
            value: item,
          }));
      } else if (this.isSimpleObject(this.data)) {
        const name = Object.keys(this.data[0])[0];
        return this.data.map((item, index) => (
          {
            id: index + 1,
            [name]: item[name],
          }));
      }

      return this.data;
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
