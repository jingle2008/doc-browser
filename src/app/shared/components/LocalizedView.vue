<template>
  <div>
    <a href="#" @click.prevent="visible = !visible">
      <icon
        name="globe"
        scale="2"
        class="align-text-bottom" />
    </a>
    <b-badge pill>
      {{ Object.keys(data).length }}
    </b-badge>
    {{ getEnglishString(data) }}
    <b-modal
      v-if="visible"
      size="lg"
      centered
      no-fade
      title="Localized Values"
      header-bg-variant="dark"
      header-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      v-model="visible">
      <object-view
        :data="data"
        expand />
    </b-modal>
  </div>
</template>

<script>
import 'vue-awesome/icons/globe';
import Icon from 'vue-awesome/components/Icon';
import ObjectView from './ObjectView';
import { getEnglishString } from '../../../utils/common';

export default {
  name: 'LocalizedView',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  beforeCreate() {
    this.$options.components.ObjectView = ObjectView;
  },
  components: {
    Icon,
  },
  mixins: [{
    methods: {
      getEnglishString,
    },
  }],
};
</script>
