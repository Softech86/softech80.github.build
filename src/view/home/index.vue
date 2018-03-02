<template>
  <div class="home">
    <side></side>
  </div>
</template>

<script>
  import axios from 'axios'
  import Side from '@/components/Side'
  export default {
    name: 'home',
    components: {
      Side
    },
    data () {
      return {
        poems: [],
        poem: {},
        groups: []
      }
    },
    async created () {
//      this.poems = (await axios(`/static/poem/index.json`)).data
      this.groups = (await axios(`/static/markdown/tree.json`)).data.children
//      const index = Matha.floor((Math.random() * this.poems.length))
//      this.poem = this.poems[index]
//
//      this.$nextTick(() => {
//        const poem = this.$refs.poem
//        for (let i = 0; i < 100; ++i) {
//          const t = document.createTextNode(this.poem.content)
//          const n = document.createElement('span')
//          n.appendChild(t)
//          poem.appendChild(n)
//          const bcr = n.getBoundingClientRect()
//          if (bcr.top > window.innerHeight && bcr.left > window.innerWidth) {
//            poem.removeChild(n)
//            break
//          }
//        }
//      })
    }
  }
</script>

<style lang="scss">
  @import '../../style/home';
</style>
