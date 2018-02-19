<template>
  <b-modal
    :id="id"
    centered
    lazy
    title="Settings"
    header-bg-variant="dark"
    header-text-variant="light"
    footer-bg-variant="dark"
    footer-text-variant="light"
    :ok-disabled="$v.result.$invalid"
    @show="init($v.result)"
    @ok="confirm">
    <b-form
      novalidate
      @submit.stop.prevent>
      <b-form-group
        label="Enable document link:">
        <b-form-checkbox
          v-model="result.enable">
        </b-form-checkbox>
      </b-form-group>
      <b-form-group
        description="{Id} will be substituted with real document id provided."
        label="Url Format:">
        <b-input-group>
          <b-form-input
            placeholder="http://example.com/id="
            :state="!$v.result.prefix.$invalid"
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
        description="This field is used to identify the id of referenced external documents."
        label="Document Id Field:">
        <b-form-input
          placeholder="Example: _id"
          :state="!$v.result.idProp.$invalid"
          aria-describedby="idPropFeedback"
          v-model.trim="result.idProp"
          @input="$v.result.idProp.$touch()" />
        <b-form-invalid-feedback id="idPropFeedback">
          This field is required.
        </b-form-invalid-feedback>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { url, requiredIf } from 'vuelidate/lib/validators';

const requiredIfEnabled = requiredIf(function _() {
  return this.result.enable;
});

export default {
  name: 'ConfigView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      result: {},
    };
  },
  methods: {
    ...mapActions([
      'enableLink',
      'disableLink',
    ]),
    init(validation) {
      this.result = {
        prefix: this.prefix,
        suffix: this.suffix,
        idProp: this.idProp,
        enable: this.enable,
      };

      validation.$reset();
    },
    async confirm() {
      if (this.result.enable) {
        this.enableLink(this.result);
      } else {
        this.disableLink();
      }
    },
  },
  computed: {
    ...mapGetters([
      'enable',
      'prefix',
      'suffix',
      'idProp',
    ]),
  },
  mixins: [validationMixin],
  validations() {
    return {
      result: {
        prefix: {
          url,
          required: requiredIfEnabled,
        },
        idProp: {
          required: requiredIfEnabled,
        },
      },
    };
  },
};
</script>
