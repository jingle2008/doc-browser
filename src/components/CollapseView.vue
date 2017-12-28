<template>
    <div>
      <b-btn v-b-toggle="id" variant="secondary" class="sm mb-1">Show/Hide</b-btn>
      <b-collapse visible :id="id">
        <slot></slot>
      </b-collapse>
    </div>
</template>

<script>
import mixins from './mixins';

export default {
  name: 'CollapseView',
  data() {
    return {
      id: `id-${this.guid()}`,
    };
  },
  mixins: [mixins],
};
</script>