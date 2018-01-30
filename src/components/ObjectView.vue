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
      :filter="filter"
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
      <template slot="table-colgroup">
        <col span="1" class="bg-light">
      </template>
      <template slot="property" slot-scope="data">
        <span class="text-capitalize">
          {{ data.value }}
        </span>
      </template>
      <template slot="value" slot-scope="data">
        <any-view :data="data.value"></any-view>
      </template>
    </b-table>
  </div>
</template>

<script>
import AnyView from './AnyView';
import FilterView from './FilterView';
import mixins from './mixins';

export default {
  name: 'ObjectView',
  props: {
    data: {
      type: Object,
      required: true,
    },
    caption: {
      type: String,
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
      return this.items.length >= 20;
    },
  },
  mixins: [mixins],
};
</script>
