<template>
  <div class="card">
    <div
      class="card-header clickable"
      v-b-toggle="id">
      <icon
        :name="icon"
        class="align-text-bottom"
        scale="1.3" />
      <b class="card-title">{{ header }}</b>
    </div>
    <b-collapse
      :id="id"
      :visible="open"
      @show="toggle"
      @hide="toggle"
      class="card-body">
      <slot />
    </b-collapse>
  </div>
</template>

<script>
import 'vue-awesome/icons/chevron-circle-down';
import 'vue-awesome/icons/chevron-circle-right';
import Icon from 'vue-awesome/components/Icon';
import mixins from './mixins';

export default {
  name: 'CollapseView',
  props: {
    header: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: `id-${this.guid()}`,
      open: this.visible,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
  computed: {
    icon() {
      return this.open
        ? 'chevron-circle-down'
        : 'chevron-circle-right';
    },
  },
  components: {
    Icon,
  },
  mixins: [mixins],
};
</script>