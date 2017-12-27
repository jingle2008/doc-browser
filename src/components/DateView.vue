<template>
  <span>{{ date | moment(format) }}</span>
</template>

<script>
export default {
  name: 'DateView',
  props: {
    date: {
      type: Date,
      default: Date.now(),
    },
    format: {
      type: String,
      default: 'MM/DD/YYYY, h:mm:ss A',
    },
  },
};
</script>
