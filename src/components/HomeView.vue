<template>
  <div>
    <b-alert
      :show="showError"
      @dismissed="showError=false"
      variant="danger"
      dismissible>
      {{ error }}
    </b-alert>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Raw Json" active>
          <b-button-toolbar
            class="mb-2"
            aria-label="Toolbar">
            <b-button-group
              class="mr-2">
              <b-btn
                @click="createNew">
                <icon
                  name="file"
                  class="align-text-bottom"
                  scale="1.2" />
                New
              </b-btn>
            </b-button-group>
            <b-button-group
              class="mr-2">
              <b-btn
                v-b-tooltip.hover
                @click="browseLocal"
                title="Browse local files">
                <icon
                  name="folder-open"
                  class="align-text-bottom"
                  scale="1.2" />
                Open
              </b-btn>
              <b-btn
                v-b-modal.remote-dialog
                v-b-tooltip.hover
                title="Fetch remote documents">
                <icon
                  name="cloud"
                  class="align-text-bottom"
                  scale="1.2" />
                Fetch
              </b-btn>
            </b-button-group>
            <b-button-group
              class="mr-2">
              <b-btn>
                <icon
                  name="download"
                  class="align-text-bottom"
                  scale="1.2" />
                Export
              </b-btn>
            </b-button-group>
          </b-button-toolbar>
          <b-modal
            id="remote-dialog"
            centered
            lazy
            title="Fetch Documents"
            :ok-disabled="$v.result.$invalid"
            @show="remoteInit($v.result)"
            @ok="remoteConfirm">
            <b-form
              ref="remoteform"
              novalidate
              @submit.stop.prevent>
              <b-form-group
                description="Please enter url of remote json document."
                label="Remote Url:">
                <b-input-group
                  :prepend="result.prefix"
                  :append="result.suffix">
                  <b-form-input
                    :state="inputState($v.result.url)"
                    :type="urlType"
                    aria-describedby="urlFeedback"
                    v-model.trim="result.url"
                    @input="$v.result.url.$touch()" />
                  <b-form-invalid-feedback id="urlFeedback">
                    {{ urlFeedback }}
                  </b-form-invalid-feedback>
                </b-input-group>
              </b-form-group>
              <collapse-view
                v-if="result"
                header="Url Template (Optional)">
                <b-form-group
                  description="{Id} will be substituted with real document id provided."
                  label="Url Template:">
                  <b-input-group>
                    <b-form-input
                      placeholder="http://example.com/id="
                      :state="inputState($v.result.prefix)"
                      aria-describedby="prefixFeedback"
                      v-model.trim="result.prefix"
                      @input="$v.result.prefix.$touch()" />
                    <b-form-invalid-feedback id="prefixFeedback">
                      This field must be an URL.
                    </b-form-invalid-feedback>
                    <b-input-group-append>
                      <b-input-group-text>
                        { Id }
                      </b-input-group-text>
                    </b-input-group-append>
                    <b-form-input
                      placeholder="?format=json"
                      v-model.trim="result.suffix" />
                  </b-input-group>
                </b-form-group>
                <b-form-group
                  description="This field is used to identify referenced external documents."
                  label="Document Id Field:">
                  <b-form-input
                    placeholder="Example: _id"
                    v-model.trim="result.idField" />
                </b-form-group>
              </collapse-view>
            </b-form>
          </b-modal>
          <b-form-file
            ref="fileinput"
            v-model="file"
            plain
            v-show="false"
            @input="loadFile"
            accept=".json" />
          <b-progress
            v-if="showProgress"
            class="mb-2"
            :value="loadingProgress"
            :max="totalProgress"
            show-progress
            animated
            height="1.5rem" />
          <b-form-textarea
            v-model="text"
            placeholder="Enter your valid json data here."
            :state="state"
            :rows="24"
            :max-rows="25"
            @dragenter.native.stop.prevent
            @dragover.native.stop.prevent
            @drop.native.stop.prevent="drop" />
          <b-form-text>{{ error }}</b-form-text>
        </b-tab>
        <b-tab title="Json Viewer">
          <any-view :data="json" />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import 'vue-awesome/icons/file';
import 'vue-awesome/icons/folder-open';
import 'vue-awesome/icons/download';
import 'vue-awesome/icons/cloud';
import Icon from 'vue-awesome/components/Icon';
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';
import AnyView from './AnyView';
import CollapseView from './CollapseView';
import mixins from './mixins';

export default {
  name: 'HomeView',
  data() {
    return {
      text: '',
      state: null,
      showError: false,
      error: '',
      file: null,
      result: {},
      prefix: null,
      suffix: null,
      idField: null,
      url: null,
      showProgress: false,
      loadingProgress: 0,
      totalProgress: 0,
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
    createNew() {
      this.text = '';
    },
    loadFile(value) {
      if (!value) {
        return;
      }

      this.showLoading(2);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.text = e.target.result;
        this.updateProgress();
      };

      reader.readAsText(value);
      this.updateProgress();
    },
    drop(e) {
      this.loadFile(e.dataTransfer.files[0]);
    },
    browseLocal() {
      this.$refs.fileinput.reset();
      this.$refs.fileinput.$el.click();
    },
    remoteInit(validation) {
      this.result = {
        prefix: this.prefix,
        suffix: this.suffix,
        idField: this.idField,
        url: null,
      };

      validation.$reset();
    },
    showLoading(total) {
      this.totalProgress = total;
      this.loadingProgress = 0;
      this.showProgress = true;
    },
    updateProgress(progress = 1) {
      this.loadingProgress = Math.min(
        this.loadingProgress + progress,
        this.totalProgress);

      if (this.loadingProgress >= this.totalProgress) {
        setTimeout(() => {
          this.showProgress = false;
          this.loadingProgress = 0;
        }, 2000);
      }
    },
    async remoteConfirm() {
      this.showLoading(4);

      Object.assign(this, this.result);
      this.updateProgress();

      // TODO: save prefix, suffix and idField
      this.updateProgress();

      try {
        const res = await fetch(this.jsonUrl, { mode: 'cors' });
        this.updateProgress();
        if (res.ok) {
          this.text = await res.text();
          this.updateProgress();
        } else {
          this.text = '';
          throw new Error(res.statusText);
        }
      } catch (error) {
        this.updateProgress(this.totalProgress);
        this.error = `Error fetching document (${this.jsonUrl}): ${error}`;
        this.showError = true;
      }
    },
    inputState(validation) {
      return validation.$dirty
        ? !validation.$invalid
        : null;
    },
  },
  computed: {
    json() {
      return this.state ? JSON.parse(this.text) : null;
    },
    urlTemplate() {
      return this.prefix
        ? `${this.prefix}{0}${this.suffix || ''}`
        : null;
    },
    requireUrl() {
      return !this.result.prefix;
    },
    urlFeedback() {
      return this.requireUrl
        ? 'This field is required and must be an URL.'
        : 'This field is required.';
    },
    urlType() {
      return this.requireUrl ? 'url' : 'text';
    },
    jsonUrl() {
      return this.urlTemplate
        ? this.format(this.urlTemplate, this.url)
        : this.url;
    },
  },
  components: {
    Icon,
    AnyView,
    CollapseView,
  },
  mixins: [mixins, validationMixin],
  validations() {
    return {
      result: {
        url: this.requireUrl
          ? { required, url }
          : { required },
        prefix: {
          url,
        },
      },
    };
  },
};
</script>
