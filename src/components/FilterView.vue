<template>
  <b-row>
    <b-col md="4" sm="6" class="my-1">
      <b-form-group
        horizontal
        label="Filter"
        class="mb-0">
        <b-input-group>
          <b-form-input
            :value="keyword"
            @input="changeKeyword"
            placeholder="Type to Search" />
          <b-input-group-button>
            <b-btn
              :disabled="!keyword"
              @click="changeKeyword('')">
              Clear
            </b-btn>
          </b-input-group-button>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col md="4" sm="6" class="my-1">
      <b-pagination
        :total-rows="total"
        :per-page="pageSize"
        :value="current"
        @input="changeCurrent"
        class="my-0" />
    </b-col>
    <b-col md="2" sm="6" class="my-1">
      <label class="my-2">
        Showing {{ start }}-{{ end }} of {{ total }}
      </label>
    </b-col>
    <b-col md="2" sm="6" class="my-1">
      <b-form-group
        horizontal
        label="Page Size"
        label-cols="6"
        class="mb-0">
        <b-form-select
          :options="pageSizes"
          :value="pageSize"
          @input="changePageSize" />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
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
        return [5, 10, 15, 25, 50, 100];
      },
    },
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
  },
  computed: {
    start() {
      return ((this.current - 1) * this.pageSize) + 1;
    },
    end() {
      return Math.min(this.current * this.pageSize, this.total);
    },
  },
};
</script>
