<template>
  <div id="app">
    <Navigate></Navigate>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navigate from '@/components/Navigate'
export default {
  name: 'app',
  components: {
    Navigate
  }
}
</script>

<style lang="scss">
  @import 'style/app.scss';
</style>
