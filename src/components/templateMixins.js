export default {
  props: {
    urlTemplate: {
      type: String,
      default: null,
    },
    docIdField: {
      type: String,
      default: null,
    },
  },
  computed: {
    externalEnabled() {
      return !!this.urlTemplate
        && !!this.docIdField;
    },
  },
  methods: {
    isExternal(property) {
      return this.externalEnabled
        && property === this.docIdField;
    },
  },
};
