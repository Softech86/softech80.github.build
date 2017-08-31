<template>
  <div class="markdown" :class="{down: $bus.down}">
    <div class="title center">
      <span>{{title}}</span>
    </div>
    <!--<img :src="imgUri" alt="">-->
    <div class="md-display center" v-html="mhtml" ref="md"></div>
    <transition name="fade">
      <div id="image-preview" v-if="imgPreview && imgPreview.url" @click="imgPreview.url = ''">
        <img :src="imgPreview.url" alt="图片预览失败" :style="imgPreviewStyle">
      </div>
      <div id="link-preview" v-if="linkPreview" @click="linkPreview = ''">
        <iframe
          :src="linkPreview"
          frameborder="0"
          ref="iframe"
          :width="window.width * 0.8 + 'px'"
          :height="window.height * 0.8 + 'px'">
        </iframe>
        <nobr :style="{maxWidth: window.width * 0.8 + 'px'}">{{linkPreview}}</nobr>
        <a :href="linkPreview" target="_blank">在新页面查看</a>
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'
  import marked from 'marked'
  import {highlightAuto} from 'highlight.js'
  import 'highlight.js/styles/vs2015.css'

  marked.setOptions({
    highlight: function (code) {
      return highlightAuto(code).value
    }
  })
  export default {
    components: {},
    data () {
      return {
        path: '',
        md: '',
        mhtml: `<div class="loading" style="font-size: 21px">正在加载文章...</div>`,
        title: '文章',
        imgPreview: {
          url: '',
          ratio: 1
        },
        linkPreview: '',
        window: {
          width: 0,
          height: 0,
          ratio: 1
        }
      }
    },
    watch: {
      'imgPreview.url' (val) {
        document.body.style.overflow = val ? 'hidden' : ''
      },
      linkPreview (val) {
        document.body.style.overflow = val ? 'hidden' : ''
      }
    },
    computed: {
      imgPreviewStyle () {
        const scr = this.window.ratio
        return this.imgPreview.ratio > scr ? {
          width: '80%'
        } : {
          height: this.window.height * 0.8 + 'px'
        }
      }
    },
    created () {
      this.path = this.$route.params.path
      this.title = this.path.split('/').pop().slice(0, -3)
      axios(`/static/markdown/${this.path}`).then(res => {
        this.md = res.data
        this.md = this.md.replace(/(\[.*?\]\()((?!http).+\))/g, `$1/static/markdown/${this.path}/../$2`)
        this.mhtml = marked(this.md)

        while (1) {
          const re = /<pre><code.*?>[\s\S]*?<\/code><\/pre>/
          let code = this.mhtml.match(re)
          if (code) {
//            code = code[0]
//              .replace(/<code(.*?)>/, '<_code$1><ol><li><div>')
//              .replace(/\n<\/code>/, '</div></li></ol></_code>')
//              .replace(/\n/g, '</div></li><li><div>')

            code = code[0]
              .replace(/<code(.*?)>/, '<_code$1><div>')
              .replace(/\n<\/code>/, '</div></_code>')
              .replace(/\n/g, '&nbsp;</div><div>')
//            console.log(code)
            this.mhtml = this.mhtml.replace(re, code)
          } else break
        }

        this.mhtml = this.mhtml.replace(/_code/g, 'code')
      })
    },
    mounted () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
      this.window.ratio = window.innerWidth / (window.innerHeight + 0.01)

      this.$refs.md.onclick = e => {
        const t = e.target
//        console.log(t.tagName)
        if (t.tagName === 'IMG') {
          this.imgPreview.url = t.getAttribute('src')
          const {width, height} = t.getBoundingClientRect()
//          console.log(width, height)
          this.imgPreview.ratio = width / (height + 0.01)
        }
        if (t.tagName === 'A') {
          e.preventDefault()
          this.linkPreview = t.getAttribute('href')
        }
      }
//      const imgs = Array.from(document.getElementsByTagName('img'))
//      console.log(imgs)
//      imgs.forEach(img => {
//        img.onclick = e => {
//          console.log(e)
//        }
//      })
    }
  }
</script>

<style lang="scss">
  @import '../style/markdown';
</style>
