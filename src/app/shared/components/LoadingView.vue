<template>
  <b-modal
    size="md"
    centered
    no-fade
    lazy
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    :visible="loading">
    <b-row align-v="center">
      <b-col sm="auto">
        <icon name="spinner" scale="4" pulse />
      </b-col>
      <b-col>
        <span>{{ status }}</span>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import 'vue-awesome/icons/spinner';
import Icon from 'vue-awesome/components/Icon';
import { mapGetters } from 'vuex';

export default {
  name: 'LoadingView',
  computed: {
    ...mapGetters([
      'loading',
      'status',
    ]),
  },
  components: {
    Icon,
  },
};
</script>
