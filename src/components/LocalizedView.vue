<template>
  <div>
    <a href="#" @click.prevent v-b-modal="id">
      <icon name="globe" scale="2"></icon>
    </a>
    <b-badge pill>
      {{ Object.keys(data).length }}
    </b-badge>
    {{ getEnglishString(data) }}
    <b-modal
      :id="id"
      size="lg"
      lazy
      title="Localized Values"
      header-bg-variant="dark"
      header-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light">
      <object-view :data="data"></object-view>
    </b-modal>
  </div>
</template>

<script>
import 'vue-awesome/icons/globe';
import Icon from 'vue-awesome/components/Icon';
import mixins from './mixins';
import ObjectView from './ObjectView';

export default {
  name: 'LocalizedView',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    id() {
      return `id-${this.guid()}`;
    },
  },
  beforeCreate() {
    this.$options.components.ObjectView = ObjectView;
  },
  components: {
    Icon,
  },
  mixins: [mixins],
};
</script>
