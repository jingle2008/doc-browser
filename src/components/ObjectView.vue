<template>
  <div>
    <b-row v-if="complex">
      <b-col md="4" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="keyword" placeholder="Type to Search" />
            <b-input-group-button>
              <b-btn :disabled="!keyword" @click="keyword = ''">Clear</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="3" offset-md="1" class="my-1">
        <b-pagination align="center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
      <b-col md="3" offset-md="1" class="my-1">
        <b-form-group horizontal label="Page Size" label-cols="6" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-table :items="items" :fields="fields" :filter="filter" bordered caption-top head-variant="light"
      :current-page="currentPage" :per-page="complex ? perPage : 0" show-empty @filtered="onFiltered">
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
      keyword: null,
      fields: [
        { key: 'property', thClass: 'col-auto', sortable: true },
        { key: 'value', thClass: 'col-10' },
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, 25, 50, 100],
      totalRows: 0,
    };
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
  },
  methods: {
    filter(item) {
      return this.keyword ? item.property.toLowerCase().includes(this.keyword.toLowerCase()) : true;
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
      return this.keys
        .map(key => ({ property: key, value: this.data[key] }));
    },
    complex() {
      return this.items.length >= 20;
    },
  },
  mixins: [mixins],
};
</script>
