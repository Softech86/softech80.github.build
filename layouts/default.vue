<template>
  <div class="layout">
    <nuxt/>
  </div>
</template>

<script>
  import FeiNav from '~/components/Nav.vue'

  export default {
    components: {
      FeiNav
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/style/variable";
  .layout {
    padding: 0 40px;

    @include mobile {
      padding: 20px;
    }
  }
</style>
