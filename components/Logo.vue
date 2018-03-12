<template>
  <div class="logo" :class="clazz" :style="style">
  </div>
</template>

<script>
  export default {
    props: {
      width: {
        type: [String, Number],
        default: 100
      },
      height: {
        type: [String, Number],
        default: 100
      },
      full: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      clazz () {
        return this.full ? 'logo-full' : ''
      },
      style () {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        }
      }
    }
  }
</script>

<style scoped>
  .logo {
    background: url("~/assets/image/iF.svg") no-repeat center;
    background-size: contain;
  }
  .logo-full {
    background-image: url("~/assets/image/YiFei.png");
  }
</style>
