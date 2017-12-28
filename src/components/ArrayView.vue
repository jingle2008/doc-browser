<template>
  <b-card no-body v-if="data.length" :header="'Count: ' + data.length">
    <div v-if="isSimpleArray(data)" class="m-2">
      <b-badge pill class="m-1" v-for="(item, index) of data" :key="index">
        {{ item }}
      </b-badge>
    </div>
    <b-list-group v-else flush>
      <b-list-group-item v-for="(item, index) of data" :key="index">
        <any-view :data="item"></any-view>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import AnyView from './AnyView';
import mixins from './mixins';

export default {
  name: 'ArrayView',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isSimpleArray(value) {
      return value.every(item =>
        this.isPrimitive(item) || this.isString(item) || this.isDate(item));
    },
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
  },
  mixins: [mixins],
};
</script>
