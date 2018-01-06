<template>
  <div class="home">
    <Logo></Logo>
    <div class="mask">
      <div class="contents page" ref="contents">

        <div class="poem" ref="poem" v-if="poem.content">
          <div class="favor" v-for="f in ['Code', 'Design', 'Music']">{{f}}</div>
        </div>
      </div>
    </div>

    <div class="float">
      <div class="menu page">
        <!--<div class="left">-->
          <!--<div class="filter">-->
            <!--{{groups[0] && groups[0].dirname}}-->
          <!--</div>-->

          <!--<div class="item" v-for="i in (groups[0] ? groups[0].children : [])">-->
            <!--{{i.filename}}-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="right">-->

        <!--</div>-->
        <div class="group" v-for="group in groups">
          <div class="name">{{group.dirname}}</div>
          <div class="item" v-for="i in group.children">
            <router-link :to="`/markdown/${group.dirname}/${i.filename}`">{{i.filename.slice(0, -3)}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Logo from '@/components/Logo'
  export default {
    name: 'home',
    components: {
      Logo
    },
    data () {
      return {
        poems: [],
        poem: {},
        groups: []
      }
    },
    async created () {
      this.poems = (await axios(`/static/poem/index.json`)).data
      this.groups = (await axios(`/static/markdown/tree.json`)).data.children
      const index = Math.floor((Math.random() * this.poems.length))
      this.poem = this.poems[index]

      this.$nextTick(() => {
        const poem = this.$refs.poem
        for (let i = 0; i < 100; ++i) {
          const t = document.createTextNode(this.poem.content)
          const n = document.createElement('span')
          n.appendChild(t)
          poem.appendChild(n)
          const bcr = n.getBoundingClientRect()
          if (bcr.top > window.innerHeight && bcr.left > window.innerWidth) {
            poem.removeChild(n)
            break
          }
        }
      })
    }
  }
</script>

<style lang="scss">
  @import '../style/home.scss';
</style>
