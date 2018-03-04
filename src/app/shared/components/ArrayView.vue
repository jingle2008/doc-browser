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
        v-for="(field, index) in fields"
        :slot="field.key"
        slot-scope="data">
        <any-view
          :data="data.value"
          :key="index"
          :property="field.key" />
      </template>
      <template
        v-if="lineNo"
        slot="index"
        slot-scope="data">
        {{ items.indexOf(data.item) + 1 }}
      </template>
    </b-table>
    <b-alert
      v-else
      variant="warning"
      show>There are no columns selected.</b-alert>
  </collapse-view>
</template>

<script>
import { mapGetters } from 'vuex';
import AnyView from './AnyView';
import FilterView from './FilterView';
import CollapseView from './CollapseView';
import { isString, isObject, isDate, isPrimitive } from '../../../utils/common';

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
    lineNo: {
      type: Boolean,
      default: true,
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
      return value.every(isObject);
    },
    isSimple(value) {
      return isPrimitive(value)
        || isString(value)
        || isDate(value);
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
    isExternal(key) {
      return this.enable && this.idProp === key;
    },
  },
  computed: {
    ...mapGetters([
      'enable',
      'idProp',
    ]),
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
        return this.data;
      }

      return this.data.map(value => ({ value }));
    },
    fieldDefs() {
      const results = [];

      this.items.forEach((item) => {
        Object.keys(item).forEach((key) => {
          const simple = this.isSimple(item[key])
            && !this.isExternal(key);

          const match = results
            .find(d => d.key === key);
          if (!match) {
            results.push({ key, simple });
          } else {
            match.simple = match.simple && simple;
          }
        });
      });

      if (this.lineNo) {
        results.unshift({ key: 'index' });
      }

      return results;
    },
    fields() {
      return this.fieldDefs.map(def => (
        {
          key: def.key,
          sortable: def.simple === true,
        }))
        .filter(f => this.shouldShow(f.key));
    },
    fieldNames() {
      return this.fieldDefs
        .map(def => def.key);
    },
  },
};
</script>
