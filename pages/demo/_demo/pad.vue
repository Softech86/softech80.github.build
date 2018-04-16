<template>
  <div class="demo-pad flex flv">
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
        return `/demo/static/${this.demo}/index.html`
      }
    }
  }

</script>

<style lang="scss" scoped>
  iframe {
    width: calc(100vw - 80px);
    height: 100vh;
  }

</style>
