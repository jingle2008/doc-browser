<template>
  <span
    v-if="!data.length"
    class="font-italic text-info">
    [Empty Array]
  </span>
  <collapse-view
    v-else
    :header="displayHeader"
    :visible="expand">
    <filter-view
      v-if="complex"
      :total="totalRows"
      :current.sync="currentPage"
      :pageSize.sync="perPage"
      :keyword.sync="keyword"
      :columns="fieldNames"
      @update:filterColumns="onFieldsFiltered" />
    <b-table
      v-if="fields.length"
      :items="items"
      :fields="fields"
      :filter="keyword"
      bordered
      head-variant="light"
      :current-page="currentPage"
      :per-page="complex ? perPage : 0"
      show-empty
      @filtered="onItemsFiltered">
      <template
        v-for="(field, index) in complexFields"
        :slot="field"
        slot-scope="data">
        <any-view
          :data="data.value"
          :key="index" />
      </template>
    </b-table>
    <b-alert
      v-else
      variant="warning"
      show>There are no columns selected.</b-alert>
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
    expand: {
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
      filteredFields: null,
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
    onItemsFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    onFieldsFiltered(filteredFields) {
      this.filteredFields = filteredFields;
    },
    shouldShow(field) {
      if (this.filteredFields !== null) {
        return this.filteredFields.includes(field);
      }

      return true;
    },
  },
  computed: {
    displayHeader() {
      return `${this.header} (${this.data.length})`;
    },
    complex() {
      if (this.keyword) {
        return true;
      }

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
        }))
        .filter(f => this.shouldShow(f.key));
    },
    fieldNames() {
      return this.fieldDefs
        .map(def => def.key);
    },
  },
  mixins: [mixins],
};
</script>
