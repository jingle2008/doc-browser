<template>
  <div>
    <a
      :href="jsonUrl"
      @click.prevent
      v-b-modal="id">
      <icon
        name="external-link"
        class="align-text-bottom"
        scale="1.2" />
      Document
    </a>
    <b-modal
      :id="id"
      size="lg"
      lazy
      centered
      title="Document"
      @show="loadDocument"
      header-bg-variant="dark"
      header-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light">
      <any-view
        :data="json" />
    </b-modal>
  </div>
</template>

<script>
import 'vue-awesome/icons/external-link';
import Icon from 'vue-awesome/components/Icon';
import { mapGetters } from 'vuex';
import AnyView from './AnyView';
import { guid, format } from '../../../utils/common';

export default {
  name: 'ExternalView',
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      json: null,
    };
  },
  methods: {
    async loadDocument() {
      if (this.json) {
        return;
      }

      try {
        const res = await fetch(
          this.jsonUrl, { mode: 'cors' });
        this.json = await res.json();
      } catch (error) {
        this.json = error;
      }
    },
  },
  computed: {
    id() {
      return `url-view-${this.guid()}`;
    },
    jsonUrl() {
      return this.format(
        `${this.prefix}{0}${this.suffix || ''}`,
        this.data);
    },
    ...mapGetters([
      'prefix',
      'suffix',
    ]),
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
  },
  components: {
    Icon,
  },
  mixins: [{
    methods: {
      guid,
      format,
    },
  }],
};

</script>
