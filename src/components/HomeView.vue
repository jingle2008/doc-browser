<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="From Json String" active>
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
          v-model="json"
          placeholder="Enter your valid json data here."
          @input="validateJson"
          :state="state"
          :rows="25"
          :max-rows="25">
        </b-form-textarea>
        <b-form-text>{{ error }}</b-form-text>
        <b-card-footer>
          <b-button
            :disabled="!state"
            :to="targetForString"
            variant="primary">
            Show in Browser
          </b-button>
        </b-card-footer>
      </b-tab>
      <b-tab title="From Remote Source">
        Tab Contents 2
        <b-card-footer>
          <b-button href="#" variant="primary">Show in Browser</b-button>
        </b-card-footer>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      json: '',
      error: '',
      state: null,
      file: null,
    };
  },
  methods: {
    validateJson(value) {
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
    getJson(text) {
      return this.state ? JSON.parse(text) : null;
    },
    clearFile() {
      this.$refs.fileinput.reset();
    },
    loadFile() {
      const reader = new FileReader();
      reader.onload = (e) => { this.json = e.target.result; };
      reader.readAsText(this.file);
    },
  },
  computed: {
    targetForString() {
      return {
        name: 'DocumentView',
        params: {
          json: this.getJson(this.json),
        },
      };
    },
  },
};
</script>
