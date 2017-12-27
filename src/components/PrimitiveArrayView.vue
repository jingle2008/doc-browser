<template>
  <b-card no-body :header="'Count: ' + data.length">
    <b-list-group flush v-if="data.length">
      <b-badge pills variant="info" v-for="(item, index) of data" :key="index">
        {{ item }}
      </b-badge>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: 'PrimitiveArrayView',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
