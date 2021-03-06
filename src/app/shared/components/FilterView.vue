<template>
  <b-row align-h="between">
    <b-col sm="6" class="mb-2">
      <b-input-group>
        <b-form-input
          :value="keyword"
          @input="changeKeyword"
          placeholder="Type to Search" />
        <b-input-group-append>
          <b-btn
            :disabled="!keyword"
            @click="changeKeyword('')">
            <icon
              scale="1.2"
              class="align-text-bottom"
              :name="keyword ? 'times' : 'search'" />
          </b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-col>
    <b-col sm="auto" class="mb-2">
      <b-pagination
        :total-rows="total"
        :per-page="pageSize"
        :value="current"
        @input="changeCurrent"
        class="my-0" />
    </b-col>
    <b-col sm="auto" class="mb-2">
      <b-input-group prepend="Go to:">
        <b-select
          :value="current"
          @input="changeCurrent"
          :options="pageIndices" />
      </b-input-group>
    </b-col>
    <b-col sm="auto" class="mb-2">
      <b-input-group prepend="Page Size:">
        <b-select
          :value="pageSize"
          @input="changePageSize"
          :options="pageSizes" />
      </b-input-group>
    </b-col>
    <b-col sm="auto" class="mb-2">
      <label class="my-2">
        Displaying {{ start }}-{{ end }} of {{ total }}
      </label>
    </b-col>
    <b-col
      v-if="canFilter"
      sm="auto"
      class="mb-2">
      <b-dropdown>
        <template slot="button-content">
          <icon
            name="filter"
            scale="1.2"
            class="align-text-bottom" />
          Columns
        </template>
        <b-form-checkbox-group
          class="px-3 py-1"
          stacked
          v-model="filterColumns"
          :options="allColumns"
          @input="changeColumns" />
        </b-dropdown>
    </b-col>
  </b-row>
</template>

<script>
import 'vue-awesome/icons/search';
import 'vue-awesome/icons/filter';
import 'vue-awesome/icons/times';
import Icon from 'vue-awesome/components/Icon';
import startCase from 'lodash.startcase';

export default {
  name: 'FilterView',
  props: {
    keyword: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 25, 50, 100, 250, 500];
      },
    },
    columns: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      filterColumns: this.columns
        ? this.columns.slice(0)
        : null,
      allColumns: this.columns
        ? this.columns.map(c => ({
          text: startCase(c),
          value: c,
        }))
        : null,
    };
  },
  methods: {
    changeKeyword(value) {
      this.$emit('update:keyword', value);
    },
    changeCurrent(value) {
      this.$emit('update:current', value);
    },
    changePageSize(value) {
      this.$emit('update:pageSize', value);
    },
    changeColumns(value) {
      this.$emit('update:filterColumns', value.slice(0));
    },
  },
  computed: {
    start() {
      return ((this.current - 1) * this.pageSize) + 1;
    },
    end() {
      return Math.min(this.current * this.pageSize, this.total);
    },
    canFilter() {
      return this.columns && this.columns.length > 0;
    },
    pageIndices() {
      const total = Math.ceil(this.total / this.pageSize);
      return Array.from(Array(total)).map((v, i) => i + 1);
    },
  },
  components: {
    Icon,
  },
};
</script>
