<template>
  <a :href="url">
    <icon
      name="external-link"
      class="align-text-bottom"
      scale="1.2" />
    View Details
  </a>
</template>

<script>
import 'vue-awesome/icons/external-link';
import Icon from 'vue-awesome/components/Icon';
import { mapGetters } from 'vuex';

export default {
  name: 'ExternalView',
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  computed: {
    url() {
      return this.pathFn
        ? this.pathFn(this.data)
        : '#';
    },
    ...mapGetters([
      'pathFn',
    ]),
  },
  components: {
    Icon,
  },
};

</script>
