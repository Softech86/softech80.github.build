<template>
  <div class="demo-pad flex flv flxc flyc">
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
        return `/demo/${this.demo}/index.html`
      }
    }
  }

</script>

<style lang="scss">
  // body {
  //   background: black
  // }
  .demo-pad {
    height: 100vh;
  }
  iframe {
    width: 414px;
    height: 736px;
    box-shadow: -2px 2px 21px -7px black;
  }

</style>
