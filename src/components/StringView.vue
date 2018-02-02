<template>
  <span v-if="!data.length" class="font-italic text-info">
    "Empty String"
  </span>
  <span v-else>{{ data }}</span>
</template>

<script>
export default {
  name: 'StringView',
  props: {
    data: {
      type: String,
      required: true,
    },
  },
};
</script>