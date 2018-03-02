<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.$bus.windowHeight = window.innerHeight
    window.onresize = () => {
      this.$bus.windowHeight = window.innerHeight
    }
  }
}
</script>

<style lang="scss">
  @import "style/app.scss";
  @import "style/oo";
</style>
