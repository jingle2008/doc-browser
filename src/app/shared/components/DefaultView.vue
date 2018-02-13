<template functional>
  <span>{{ props.data }}</span>
</template>

<script>
export default {
  name: 'DefaultView',
  props: {
    data: {
      require: true,
    },
  },
};
</script>