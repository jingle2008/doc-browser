<template functional>
  <b-card
    :title="props.data.name">
    <p class="card-text">
      {{ props.data.message }}
    </p>
  </b-card>
</template>

<script>
export default {
  name: 'ErrorView',
  props: {
    data: {
      type: Error,
      require: true,
    },
  },
};
</script>