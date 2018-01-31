<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="From Json String" active>
        <b-form-textarea 
          v-model="text"
          placeholder="Enter your valid json data here."
          @input="validateJson"
          :state="state"
          :rows="25">
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
      text: '',
      error: '',
      state: null,
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
  },
  computed: {
    targetForString() {
      return {
        name: 'DocumentView',
        params: {
          json: this.getJson(this.text),
        },
      };
    },
  },
};
</script>
