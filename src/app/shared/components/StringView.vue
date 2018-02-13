<template functional>
  <span
    v-if="!props.data.length"
    class="font-italic text-info">
    "Empty String"
  </span>
  <span v-else>{{ props.data }}</span>
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