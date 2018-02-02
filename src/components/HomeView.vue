<template>
  <div>
    <collapse-view header="Source Panel" visible>
      <b-input-group class="mb-2">
        <b-form-file
          ref="fileinput"
          v-model="file"
          placeholder="Choose a json file..."
          @input="loadFile"
          accept=".json">
        </b-form-file>
        <b-input-group-append>
          <b-btn
            :disabled="!file"
            variant="secondary"
            @click="clearFile">
            Reset
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-form-textarea
        v-model="text"
        placeholder="Enter your valid json data here."
        @input="validateText"
        :state="state"
        :rows="10"
        :max-rows="25"
        @dragenter.native.stop.prevent
        @dragover.native.stop.prevent
        @drop.native.stop.prevent="drop">
      </b-form-textarea>
      <b-form-text>{{ error }}</b-form-text>
    </collapse-view>
    <collapse-view header="Viewer Panel" visible>
      <any-view :data="json"></any-view>
    </collapse-view>
  </div>
</template>

<script>
import 'vue-awesome/icons/chevron-circle-down';
import 'vue-awesome/icons/chevron-circle-right';
import Icon from 'vue-awesome/components/Icon';
import AnyView from './AnyView';
import CollapseView from './CollapseView';

export default {
  name: 'HomeView',
  data() {
    return {
      text: '',
      error: '',
      state: null,
      file: null,
    };
  },
  methods: {
    validateText(value) {
      try {
        if (value) {
          JSON.parse(value);
          this.state = true;
        } else {
          this.state = null;
        }
        this.error = '';
      } catch (error) {
        this.state = false;
        this.error = error.message;
      }
    },
    clearFile() {
      this.$refs.fileinput.reset();
    },
    loadFile(value) {
      const reader = new FileReader();
      reader.onload = (e) => { this.text = e.target.result; };
      reader.readAsText(value);
    },
    drop(e) {
      this.loadFile(e.dataTransfer.files[0]);
    },
  },
  computed: {
    json() {
      return this.state ? JSON.parse(this.text) : null;
    },
  },
  components: {
    Icon,
    AnyView,
    CollapseView,
  },
};
</script>
