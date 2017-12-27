<template>
  <b-card no-body :header="'Count: ' + data.length">
    <b-list-group flush v-if="data.length">
      <b-list-group-item v-for="(item, index) of data" :key="index">
        <any-view :data="item"></any-view>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import AnyView from './AnyView';

export default {
  name: 'ArrayView',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
  },
};
</script>
