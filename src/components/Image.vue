<template>
  <img src="" alt="">
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
  created () {
    window.onscroll = e => {
      const t = document.body.getBoundingClientRect().top
      // 如果向下就显示
      if (this.prev !== null) {
        this.td = Math.max(this.td + t - this.prev, -90)
        this.td = Math.min(this.td, 0)
        this.$bus.down = (this.td > -45)
      }
      this.prev = t
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../style/navigate.scss';
</style>
