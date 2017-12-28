<template>
  <div>
    <object-view v-if="doc" :data="doc" :caption="this.doc['$type']" searchable></object-view>
    <spinner v-else size="big" message="Loading..."></spinner>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import ObjectView from './ObjectView';

export default {
  name: 'DocumentBrowser',
  components: {
    ObjectView,
    Spinner,
  },
  data() {
    return {
      doc: null,
    };
  },
  created() {
    fetch('https://api.myjson.com/bins/912tz')
      .then(response => response.json())
      .then((json) => {
        this.doc = json;
      });
  },
};
</script>
