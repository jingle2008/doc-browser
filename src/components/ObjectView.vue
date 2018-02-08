<template>
  <span
    v-if="isEmpty"
    class="font-italic text-info">
    {Empty Object}
  </span>
  <collapse-view
    v-else
    :visible="expand"
    :header="header">
    <filter-view
      v-if="complex"
      :total="totalRows"
      :current.sync="currentPage"
      :pageSize.sync="perPage"
      :keyword.sync="keyword" />
    <b-table
      :items="items"
      :fields="fields"
      :filter="filter"
      bordered
      head-variant="light"
      :current-page="currentPage"
      :per-page="complex ? perPage : 0"
      show-empty
      @filtered="onFiltered">
      <template
        slot="table-colgroup">
        <col
          span="1"
          class="bg-light">
      </template>
      <template
        slot="property"
        slot-scope="data">
        <span
          class="text-capitalize">
          {{ data.value }}
        </span>
      </template>
      <template
        slot="value"
        slot-scope="data">
        <any-view
          :data="data.value"
          :property="data.item.property"
          :urlTemplate="urlTemplate"
          :docIdField="docIdField" />
      </template>
    </b-table>
  </collapse-view>
</template>

<script>
import AnyView from './AnyView';
import FilterView from './FilterView';
import ExternalView from './ExternalView';
import CollapseView from './CollapseView';
import mixins from './mixins';
import templateMixins from './templateMixins';

export default {
  name: 'ObjectView',
  props: {
    data: {
      type: Object,
      required: true,
    },
    header: {
      type: String,
      default: 'Object',
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
      fields: [
        {
          key: 'property',
          thClass: 'col-auto',
          sortable: true,
        },
        {
          key: 'value',
          thClass: 'col-10',
        },
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
    };
  },
  components: {
    FilterView,
    ExternalView,
    CollapseView,
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
  },
  methods: {
    filter(item) {
      return this.keyword
        ? item.property.toLowerCase().includes(
            this.keyword.toLowerCase())
        : true;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  computed: {
    keys() {
      return Object.keys(this.data);
    },
    items() {
      return this.keys.map(key => (
        {
          property: key,
          value: this.data[key],
        }));
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
    isEmpty() {
      return this.keys.length === 0;
    },
  },
  mixins: [mixins, templateMixins],
};
</script>
