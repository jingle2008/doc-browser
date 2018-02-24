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
      :visible="isVisible"
      @show="toggle"
      @hide="toggle"
      class="card-body">
      <slot v-if="counter" />
    </b-collapse>
  </div>
</template>

<script>
import 'vue-awesome/icons/chevron-circle-down';
import 'vue-awesome/icons/chevron-circle-right';
import Icon from 'vue-awesome/components/Icon';
import { guid } from '../../../utils/common';

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
      id: `collapse-view-${this.guid()}`,
      counter: this.visible ? 1 : 0,
    };
  },
  methods: {
    toggle() {
      this.counter += 1;
    },
  },
  computed: {
    isVisible() {
      return this.counter % 2 === 1;
    },
    icon() {
      return this.isVisible
        ? 'chevron-circle-down'
        : 'chevron-circle-right';
    },
  },
  components: {
    Icon,
  },
  mixins: [{
    methods: {
      guid,
    },
  }],
};
</script>
