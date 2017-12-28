<template>
    <b-form-checkbox :checked="data" disabled>{{ data ? "Yes" : "No" }}</b-form-checkbox>
</template>

<script>
export default {
  name: 'BooleanView',
  props: {
    data: {
      type: Boolean,
      require: true,
    },
  },
};
</script>