<template>
  <div>
    <b-form-textarea
      :value="data"
      placeholder="Enter your valid json data here."
      @input="textChanged"
      :state="state"
      rows="25"
      @dragenter.native.stop.prevent
      @dragover.native.stop.prevent
      @drop.native.stop.prevent="drop" />
    <b-form-text>
      {{ error }}
    </b-form-text>
  </div>
</template>

<script>
export default {
  name: 'EditorView',
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      state: null,
      error: null,
    };
  },
  methods: {
    textChanged(value) {
      this.$emit('update:data', value);

      try {
        let json = null;
        if (value) {
          json = JSON.parse(value);
          this.state = true;
        } else {
          this.state = null;
        }

        this.error = '';
        this.$emit('update:json', json);
      } catch (error) {
        this.state = false;
        this.error = error.message;
      }
    },
    drop(e) {
      const file = e.dataTransfer.files[0];
      this.$emit('file-dropped', file);
    },
  },
};
</script>
