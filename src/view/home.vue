<template>
  <div class="home">
    <Logo></Logo>
    <div class="mask" :style="maskStyle">
      <div class="contents page" ref="contents" :style="contentStyle">

        <div class="poem" v-if="poem.content">
          <div class="favor" v-for="f in ['Code', 'Design', 'Music']">{{f}}</div>
          {{(poem.content).repeat(1 + len / poem.content.length).slice(0, len)}}
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
        cw: 0,
        poems: [],
        poem: {},
        groups: [],
        len: 760
      }
    },
    computed: {
      maskStyle () {
        return {
          height: this.$bus.windowHeight + 'px'
        }
      },
      contentStyle () {
        return {
          height: this.cw
        }
      }
    },
    async created () {
      this.poems = (await axios(`/static/poem/index.json`)).data
      this.groups = (await axios(`/static/markdown/tree.json`)).data.children
      const index = Math.floor((Math.random() * this.poems.length))
      this.poem = this.poems[index]
    },
    mounted () {
      const c = this.$refs.contents
      this.cw = window.getComputedStyle(c).width

      // magic
      let l = parseInt(this.cw) + 36
      let y
      if (l <= 540) {
        y = 0.0205 * l * l - 10.816 * l + 1718
      } else {
        y = 0.0006 * l * l + 2.87 * l - 2004
      }
      this.len = parseInt(y)
    }
  }
</script>

<style lang="scss">
  @import '../style/home.scss';
</style>
