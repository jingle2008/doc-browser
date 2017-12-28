<template>
  <b-table :items="items" :fields="fields" :filter="filter" bordered caption-top head-variant="light">
    <template slot="table-caption">
      <h4 v-if="caption">{{ caption }}</h4>
      <b-row v-if="searchable">
        <b-col md="auto">
          <b-input-group>
            <b-form-input v-model="keyword" placeholder="Type to Search" autofocus />
            <b-input-group-button>
              <b-btn :disabled="!keyword" @click="keyword = ''">Clear</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-col>
      </b-row>
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
    searchable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keyword: null,
      fields: [
        { key: 'property', thClass: 'col-auto', sortable: true },
        { key: 'value', thClass: 'col-10' },
      ],
    };
  },
  filters: {
    capitalize(value) {
      return value[0].toUpperCase() + value.slice(1);
    },
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
  },
  methods: {
    filter(item) {
      return this.keyword ? item.property.toLowerCase().includes(this.keyword.toLowerCase()) : true;
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
  },
  mixins: [mixins],
};
</script>
