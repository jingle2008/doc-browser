<template>
  <div>
    <b-row
      class="mb-2"
      align-h="between">
      <b-col
        md="9">
        <b-button-toolbar
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
            <b-dropdown
              :disabled="!editing">
              <template slot="button-content">
                <icon
                  name="text-height"
                  class="align-text-bottom"
                  scale="1.2" />
                Font Size
              </template>
              <b-dropdown-item-button
                v-for="size in fontSizes"
                :key="size"
                :disabled="size === fontSize"
                @click="fontSize = size">
                {{ size }}
              </b-dropdown-item-button>
            </b-dropdown>
            <b-btn
              :disabled="!editing"
              :pressed="wordWrap"
              @click="wordWrap = !wordWrap">
              <icon
                name="paragraph"
                class="align-text-bottom"
                scale="1.2" />
              Word Wrap
            </b-btn>
          </b-button-group>
          <b-button-group
            class="mr-2">
            <b-btn
              :disabled="!editing || !text"
              @click="prettify">
              <icon
                name="wrench"
                class="align-text-bottom"
                scale="1.2" />
              Prettify
            </b-btn>
            <b-btn
              :disabled="!editing || !text"
              @click="uglify">
              <icon
                name="compress"
                class="align-text-bottom"
                scale="1.2" />
              Uglify
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
        md="3"
        align-self="center">
        <b-input-group>
          <b-input-group-text slot="prepend">
            <icon
              name="eye"
              class="align-text-bottom"
              scale="1.2" />
          </b-input-group-text>
          <b-form-input
            readonly
            :value="identity" />
        </b-input-group>
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
      @hidden="remoteConfirm"
      @show="confirmed = false"
      @ok="confirmed = true">
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
        ref="main"
        :is="viewName"
        :data="viewData"
        :font-size="fontSize"
        :word-wrap="wordWrap"
        @update:data="dataChanged"
        @file-dropped="loadFile">
      </component>
    </keep-alive>
  </div>
</template>

<script>
import 'vue-awesome/icons/file';
import 'vue-awesome/icons/folder-open';
import 'vue-awesome/icons/paragraph';
import 'vue-awesome/icons/text-height';
import 'vue-awesome/icons/wrench';
import 'vue-awesome/icons/compress';
import 'vue-awesome/icons/cloud';
import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/th-list';
import 'vue-awesome/icons/eye';
import Icon from 'vue-awesome/components/Icon';
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';
import { AnyView, CollapseView } from '../../shared/components';
import { format } from '../../../utils/common';
import EditorView from './EditorView';

export default {
  name: 'HomeView',
  props: ['doc'],
  data() {
    return {
      editing: true,
      text: '',
      json: null,
      file: null,
      url: null,
      identity: 'Untitled',
      confirmed: false,
      fontSize: 14,
      fontSizes: [
        8, 9, 10, 11, 12, 14, 18, 24, 36, 48, 60, 72, 96,
      ],
      wordWrap: false,
    };
  },
  created() {
    this.fetchJson();
    this.setPathFn(this.externalUrl);
  },
  watch: {
    $route: 'fetchJson',
  },
  methods: {
    prettify() {
      this.loadSpinner('Prettifying Json ...');
      setTimeout(() => {
        this.text = JSON.stringify(
            this.json, null, 2);
        this.loadSpinner();
      }, 0);
    },
    uglify() {
      this.loadSpinner('Uglifying Json ...');
      setTimeout(() => {
        this.text = JSON.stringify(this.json);
        this.loadSpinner();
      }, 0);
    },
    externalUrl(urlPart) {
      const result = this.$router.resolve({
        name: 'DocBrowser',
        params: { doc: urlPart },
      });

      return result.href;
    },
    ...mapActions([
      'notify',
      'setPathFn',
      'loadSpinner',
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

      // eslint-disable-next-line
      console.log(value.type);
      this.identity = value.name;
      this.loadSpinner(
        `Loading file "${this.identity}"...`);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.dataChanged(e.target.result);
        this.loadSpinner();
      };
      reader.readAsText(value);
    },
    createNew() {
      this.navigateHome();
      this.dataChanged('');
      this.identity = 'Untitled';
    },
    navigateHome() {
      if (this.doc) {
        this.notify();
        this.$router.push({ name: 'DocBrowser' });
      }

      this.file = null;
    },
    browseLocal() {
      this.navigateHome();

      this.$refs.fileinput.reset();
      this.$refs.fileinput.$el.click();
    },
    async fetchJson() {
      if (this.doc) {
        this.identity = this.jsonUrl;
        this.loadSpinner(
          `Fetching doucment "${this.identity}"...`);

        try {
          const res = await fetch(this.jsonUrl, { mode: 'cors' });
          if (res.ok) {
            this.dataChanged(await res.text());
            this.notify();
            return;
          }

          throw new Error(res.statusText);
        } catch (error) {
          this.notify(
            `Error fetching document '${this.jsonUrl}': ${error}`);
        } finally {
          this.loadSpinner();
        }
      }

      this.dataChanged('');
    },
    remoteConfirm() {
      if (!this.confirmed) return;

      this.$router.push({
        name: 'DocBrowser',
        params: { doc: this.url },
      });
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
        ? this.format(this.urlTemplate, this.doc)
        : this.doc;
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
