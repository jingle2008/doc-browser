<template functional>
  <b-form-checkbox :checked="props.data" disabled>
    {{ props.data ? "Yes" : "No" }}
  </b-form-checkbox>
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