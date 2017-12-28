<template>
  <div>
    <object-view v-if="doc" :data="doc" :caption="this.doc['$type']" searchable></object-view>
  </div>
</template>

<script>
import ObjectView from './ObjectView';

export default {
  name: 'DocumentBrowser',
  components: {
    ObjectView,
  },
  data() {
    return {
      text: 'this is huge!',
      doc: null,
      array: ['Item 1', 'Item 2', 'Item 3'],
    };
  },
  created() {
    fetch('https://api.myjson.com/bins/912tz')
      .then(response => response.json())
      .then((json) => {
        this.doc = json;
      });
  },
  filters: {
    capitalize(value) {
      return value[0].toUpperCase() + value.slice(1);
    },
  },
  computed: {
    keys() {
      return Object.keys(this.doc)
        .filter(key => !key.startsWith('_'))
        .filter(key => !key.startsWith('$'))
        .sort();
    },
    items() {
      return this.keys
        .map(key => ({ property: key, value: this.doc[key] }));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
