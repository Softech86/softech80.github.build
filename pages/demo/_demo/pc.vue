<template>
    <iframe :src="url" frameborder="0"></iframe>
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
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
