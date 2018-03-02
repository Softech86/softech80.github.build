<template>
  <aside class="side">

    <canvas id="canvas-side" width="200" :height="$bus.windowHeight"></canvas>
  </aside>
</template>

<script>
export default {
  name: 'navigate',
  data () {
    return {
      td: 0,
      prev: null
    }
  },
  computed: {
    top () {
      return (this.$bus.down ? 0 : -90) + 'px'
    }
  },
  mounted () {
    const canvas = document.querySelector('#canvas-side')
    const context = canvas.getContext('2d')
    window.c = context
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../style/side.scss';
</style>
