<template>
  <div>
    <b-row
      class="mb-2"
      align-h="between">
      <b-col
        cols="9">
        <b-button-toolbar
          aria-label="Toolbar">
          <b-button-group
            class="mr-2">
            <b-btn
              @click="dataChanged('')">
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
          <b-button-group>
            <b-form-radio-group
              buttons
              v-model="editing">
              <b-form-radio
                :value="true">
                <icon
                  name="edit"
                  class="align-text-bottom"
                  scale="1.2" />
                Editing
              </b-form-radio>
              <b-form-radio
                :value="false">
                <icon
                  name="th-list"
                  class="align-text-bottom"
                  scale="1.2" />
                Viewer
              </b-form-radio>
            </b-form-radio-group>
          </b-button-group>
        </b-button-toolbar>
      </b-col>
      <b-col
        cols="3"
        align-self="center">
        <b-progress
          v-if="showProgress"
          :value="loadingProgress"
          :max="totalProgress"
          show-progress
          animated
          height="1.5rem" />
      </b-col>
    </b-row>
    <b-modal
      id="remote-dialog"
      centered
      lazy
      title="Fetch Documents"
      header-bg-variant="dark"
      header-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      :ok-disabled="$v.url.$invalid"
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
            :prepend="enable ? prefix : ''"
            :append="enable ? suffix : ''">
            <b-form-input
              :state="!$v.url.$invalid"
              autofocus
              aria-describedby="urlFeedback"
              v-model.trim="url"
              @input="$v.url.$touch()" />
            <b-form-invalid-feedback id="urlFeedback">
              {{ urlFeedback }}
            </b-form-invalid-feedback>
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-modal>
    <b-form-file
      ref="fileinput"
      v-model="file"
      plain
      v-show="false"
      @input="loadFile"
      accept=".json" />
    <keep-alive>
      <component
        :is="viewName"
        :data="viewData"
        @update:data="dataChanged"
        @file-dropped="loadFile">
      </component>
    </keep-alive>
  </div>
</template>

<script>
import 'vue-awesome/icons/file';
import 'vue-awesome/icons/folder-open';
import 'vue-awesome/icons/download';
import 'vue-awesome/icons/cloud';
import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/th-list';
import Icon from 'vue-awesome/components/Icon';
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';
import { AnyView, CollapseView } from '../../shared/components';
import { format } from '../../../utils/common';
import EditorView from './EditorView';

export default {
  name: 'HomeView',
  data() {
    return {
      editing: true,
      text: '',
      json: null,
      file: null,
      url: null,
      showProgress: false,
      loadingProgress: 0,
      totalProgress: 0,
    };
  },
  methods: {
    ...mapActions([
      'notify',
    ]),
    dataChanged(value) {
      this.text = value;

      try {
        this.json = value ? JSON.parse(value) : null;
      } catch (error) {
        // eslint-disable-next-line
      }
    },
    loadFile(value) {
      if (!value) return;

      this.showLoading(2);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.dataChanged(e.target.result);
        this.updateProgress();
      };

      reader.readAsText(value);
      this.updateProgress();
    },
    browseLocal() {
      this.$refs.fileinput.reset();
      this.$refs.fileinput.$el.click();
    },
    remoteInit(validation) {
      this.url = null;
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
        }, 1000);
      }
    },
    async remoteConfirm() {
      this.showLoading(2);

      try {
        const res = await fetch(this.jsonUrl, { mode: 'cors' });
        this.updateProgress();
        if (res.ok) {
          this.dataChanged(await res.text());
          this.notify();
          this.updateProgress();
        } else {
          throw new Error(res.statusText);
        }
      } catch (error) {
        this.updateProgress(this.totalProgress);
        this.notify(
          `Error fetching document '${this.jsonUrl}': ${error}`);
      }
    },
  },
  computed: {
    ...mapGetters([
      'enable',
      'prefix',
      'suffix',
    ]),
    viewData() {
      return this.editing ? this.text : this.json;
    },
    viewName() {
      return this.editing ? 'EditorView' : 'AnyView';
    },
    urlTemplate() {
      return this.enable
        ? `${this.prefix}{0}${this.suffix || ''}`
        : null;
    },
    urlFeedback() {
      return !this.enable
        ? 'This field is required and must be an URL.'
        : 'This field is required.';
    },
    jsonUrl() {
      return this.enable
        ? this.format(this.urlTemplate, this.url)
        : this.url;
    },
  },
  components: {
    Icon,
    AnyView,
    CollapseView,
    EditorView,
  },
  mixins: [
    {
      methods: {
        format,
      },
    },
    validationMixin,
  ],
  validations() {
    return {
      url: !this.enable
        ? { required, url }
        : { required },
    };
  },
};
</script>