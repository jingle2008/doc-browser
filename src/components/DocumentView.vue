<template>
  <div>
    <object-view v-if="json" :data="json"></object-view>
    <spinner v-else size="big" message="Loading..."></spinner>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import ObjectView from './ObjectView';

export default {
  name: 'DocumentView',
  components: {
    ObjectView,
    Spinner,
  },
  props: ['json'],
  data() {
    return {
      doc: null,
    };
  },
  computed: {
    doc() {
      return this.json;
    },
  },
  created() {
    fetch('https://api.myjson.com/bins/18nc6b')
      .then(response => response.json())
      .then((json) => {
        this.doc = json;
      });
  },
};
</script>
