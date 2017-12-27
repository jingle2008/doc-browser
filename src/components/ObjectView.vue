<template>
  <b-table :items="items" :fields="fields" bordered caption-top head-variant="light">
    <template v-if="caption" slot="table-caption">
      <b-row>
        <b-col v-if="caption" md="6" class="my-1">{{ caption }}</b-col>
        <b-col md="6" class="my-1 pull-right">
           <b-form-group horizontal label="Search property" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
              <b-input-group-button>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-button>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
    </template>
    <template slot="property" slot-scope="data">
      <span class="text-capitalize">
        {{ data.value }}
      </span>
    </template>
    <template slot="value" slot-scope="data">
      <span v-if="isNull(data.value)" class="font-italic">[Unset]</span>
      <span v-else-if="isPrimitive(data.value) || isString(data.value)">{{ data.value }}</span>
      <span v-else-if="isEmptyArray(data.value) || isEmptyObject(data.value)" class="font-italic">[Empty]</span>
      <template v-else>
        <b-btn v-b-toggle="data.item.property" variant="secondary" class="sm mb-1">Show/Hide</b-btn>
        <b-collapse visible :id="data.item.property">
          <any-view :data="data.value"></any-view>
        </b-collapse>
      </template>
    </template>
  </b-table>
</template>

<script>
import AnyView from './AnyView';
import mixins from './mixins';

export default {
  name: 'ObjectView',
  props: {
    data: {
      type: Object,
      required: true,
    },
    caption: {
      type: String,
    },
  },
  data() {
    return {
      filter: null,
      fields: [
        { key: 'property', thClass: 'col-auto', sortable: true },
        { key: 'value', thClass: 'col-10' },
      ],
    };
  },
  filters: {
    capitalize(value) {
      return value[0].toUpperCase() + value.slice(1);
    },
  },
  beforeCreate() {
    this.$options.components.AnyView = AnyView;
  },
  
  computed: {
    keys() {
      return Object.keys(this.data);
    },
    items() {
      return this.keys
        .map(key => ({ property: key, value: this.data[key] }));
    },
  },
  mixins: [mixins],
};
</script>
