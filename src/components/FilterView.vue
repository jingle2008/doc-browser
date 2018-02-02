<template>
  <b-row>
    <b-col sm="12" md="6" class="mb-2">
      <b-pagination
        :total-rows="total"
        :per-page="pageSize"
        :value="current"
        @input="changeCurrent"
        class="my-0" />
    </b-col>
    <b-col sm="12" md="6" class="mb-2">
      <b-input-group>
        <b-input-group-prepend is-text>
          <icon name="search" scale="1.5"></icon>
        </b-input-group-prepend>
        <b-form-input
          :value="keyword"
          @input="changeKeyword"
          placeholder="Type to Search" />
        <b-input-group-append>
          <b-btn
            :disabled="!keyword"
            @click="changeKeyword('')">
            Clear
          </b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-col>
  </b-row>
</template>

<script>
import 'vue-awesome/icons/search';
import Icon from 'vue-awesome/components/Icon';

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
  },
  methods: {
    changeKeyword(value) {
      this.$emit('update:keyword', value);
    },
    changeCurrent(value) {
      this.$emit('update:current', value);
    },
  },
  components: {
    Icon,
  },
};
</script>
