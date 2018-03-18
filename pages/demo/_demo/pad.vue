<template>
  <div class="demo-pad">
    pad - {{demo}}
    <iframe :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>

  export default {
    mounted () {

    },
    computed: {
      demo () {
        return this.$route.params.demo
      },
      url () {
        return `/demo/static/plane/plane.html`
      }
    }
  }

</script>

<style lang="scss" scoped>
</style>
