<template>
  <span
    v-if="isNull(data)"
    class="font-italic text-info">
    Null
  </span>
  <boolean-view
    v-else-if="isBoolean(data)"
    :data="data" />
  <external-view
    v-else-if="isExternal(property) && isString(data)"
    :data="data"
    :urlTemplate="urlTemplate"
    :docIdField="docIdField" />
  <string-view
    v-else-if="isString(data)"
    :data="data" />
  <localized-view
    v-else-if="isLocalized(data)"
    :data="data"
    :urlTemplate="urlTemplate"
    :docIdField="docIdField" />
  <object-view
    v-else-if="isObject(data)"
    :data="data"
    :urlTemplate="urlTemplate"
    :docIdField="docIdField" />
  <array-view
    v-else-if="isArray(data)"
    :data="data"
    :urlTemplate="urlTemplate"
    :docIdField="docIdField" />
  <span
    v-else>
    {{ data }}
  </span>
</template>

<script>
import StringView from './StringView';
import ArrayView from './ArrayView';
import ObjectView from './ObjectView';
import BooleanView from './BooleanView';
import LocalizedView from './LocalizedView';
import ExternalView from './ExternalView';
import mixins from './mixins';
import templateMixins from './templateMixins';

export default {
  name: 'AnyView',
  props: {
    data: {
      required: true,
    },
    property: {
      type: String,
      default: null,
    },
  },
  beforeCreate() {
    this.$options.components.ObjectView = ObjectView;
    this.$options.components.ArrayView = ArrayView;
  },
  components: {
    BooleanView,
    LocalizedView,
    StringView,
    ExternalView,
  },
  mixins: [mixins, templateMixins],
};
</script>