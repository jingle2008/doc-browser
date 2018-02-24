<template>
  <b-row>
    <b-col sm="auto">
      <a href="#" @click.prevent="visible = !visible">
        <icon
          name="globe"
          scale="2"
          class="align-text-bottom" />
      </a>
      <b-badge pill>
        {{ Object.keys(data).length }}
      </b-badge>
      <b-modal
        v-if="visible"
        size="lg"
        centered
        no-fade
        :title="title"
        header-bg-variant="dark"
        header-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="light"
        v-model="visible">
        <object-view
          :data="data"
          header="Localized"
          expand />
      </b-modal>
    </b-col>
    <b-col>
      <any-view
        :data="getDisplayValue(data)" />
    </b-col>
  </b-row>
</template>

<script>
import 'vue-awesome/icons/globe';
import Icon from 'vue-awesome/components/Icon';
import startCase from 'lodash.startcase';
import AnyView from './AnyView';
import ObjectView from './ObjectView';
import { getDisplayValue } from '../../../utils/common';

export default {
  name: 'LocalizedView',
  props: {
    data: {
      type: Object,
      required: true,
    },
    property: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
    this.$options.components.ObjectView = ObjectView;
  },
  computed: {
    title() {
      return startCase(this.property || 'Localized');
    },
  },
  components: {
    Icon,
  },
  mixins: [{
    methods: {
      getDisplayValue,
    },
  }],
};
</script>
