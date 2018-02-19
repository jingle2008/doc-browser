<template>
  <transition name="slideDown">
    <b-alert
      :show="visible"
      @dismissed="notify()"
      variant="danger"
      dismissible>
      <h4 class="alert-heading">
        <icon
          name="exclamation-triangle"
          class="align-text-bottom"
          scale="2" />
        Error
      </h4>
      <hr>
      <p>
        {{ message }}
      </p>
    </b-alert>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import 'vue-awesome/icons/exclamation-triangle';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'NotifyView',
  computed: {
    ...mapGetters([
      'visible',
      'message',
    ]),
  },
  methods: {
    ...mapActions([
      'notify',
    ]),
  },
  components: {
    Icon,
  },
};
</script>
