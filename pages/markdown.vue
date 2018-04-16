<template>
  <div class="markdown pb50">
    <fei-nav></fei-nav>
    <nuxt-child/>

    <transition name="fade">
      <div id="image-preview" v-if="imgPreview && imgPreview.url" @click="imgPreview.url = ''">
        <div class="img-box center">
          <img :src="imgPreview.url" alt="图片预览失败">
        </div>
      </div>
      <div id="link-preview" v-if="linkPreview" @click="linkPreview = ''">
        <iframe
          :src="linkPreview"
          frameborder="0"
          ref="iframe">
        </iframe>
        <nobr>{{linkPreview}}</nobr>
        <a :href="linkPreview" target="_blank">在新页面查看</a>
      </div>
    </transition>
  </div>
</template>


<script>
  import FeiNav from '~/components/Nav.vue'
  export default {
    components: {
      FeiNav
    },
    data () {
      return {
        imgPreview: {
          url: '',
          ratio: 1
        },
        linkPreview: '',
      }
    },
    watch: {
      linkPreview (v) {
        document.body.style.overflow = v && 'hidden'
      },
      imgPreview: {
        deep: true,
        handler ({url}) {
          document.body.style.overflow = url && 'hidden'
        }
      }
    },
    mounted () {
      const article = document.querySelector('#article')

      // wrap img tag
      const images = [...article.querySelectorAll('img')]
      images.forEach(x => {
        // console.log(x.outerHTML)
        const alt = x.getAttribute('alt')
        const src = x.getAttribute('src')
        if (src.search(/(http|ftp|https|www):\/\//g) < 0) {
          x.setAttribute('src', `/markdown/${src}`)
        }

        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'img')
        wrapper.appendChild(x.cloneNode())
        Object.assign(wrapper.dataset, x.dataset, alt.startsWith('_') ? {
          desc: alt.slice(1)
        } : {})
        //
        // console.log(wrapper.outerHTML)
        x.outerHTML = wrapper.outerHTML
      })

      // wrap line in code tag
      const codes = [...article.querySelectorAll('pre code')]
      codes.forEach(x => {
        x.innerHTML = x.innerHTML
          .split('\n')
          .map(t => {
            const wrapper = document.createElement('div')
            Object.assign(wrapper.dataset, x.dataset)
            wrapper.innerHTML = t
            return wrapper.outerHTML
          })
          .join('')
      })


      article.onclick = e => {
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
//
//       while (1) {
//         const re = /<pre><code.*?>[\s\S]*?<\/code><\/pre>/
//         let code = this.mhtml.match(re)
//         if (code) {
// //            code = code[0]
// //              .replace(/<code(.*?)>/, '<_code$1><ol><li><div>')
// //              .replace(/\n<\/code>/, '</div></li></ol></_code>')
// //              .replace(/\n/g, '</div></li><li><div>')
//           code = code[0]
//             .replace(/<code(.*?)>/, '<_code$1><div>')
//             .replace(/\n<\/code>/, '</div></_code>')
//             .replace(/\n/g, '&nbsp;</div><div>')
// //            console.log(code)
//           this.mhtml = this.mhtml.replace(re, code)
//         } else break
//       }
//       this.mhtml = this.mhtml.replace(/_code/g, 'code')

    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/style/variable";


  #image-preview, #link-preview {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(white, .9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    box-sizing: border-box;
    z-index: 1001;
  }
  #image-preview img, #link-preview iframe {
    width: 100%;
    background: grayscale($primary-color);
    box-shadow: grayscale($primary-color) 0 0 30px -10px;
  }

  #image-preview {
    .img-box {
      max-height: 100%;
      width: 80%;
      //flex-grow: 1;
      overflow-y: scroll;
      /* @include responsive(phone) {
        width: 100%;
      } */
    }
    img {
      box-sizing: border-box;
      //padding: 1px;
      display: block;
    }
  }

  #link-preview {
    padding: 20px;

    iframe {
      border-radius: 8px;
      background: white;
      flex-grow: 1;
    }
    a {
      font-size: 16px;
      line-height: 1;
      letter-spacing: .1em;
      opacity: .75;
    }
    nobr {
      line-height: 1.8;
      margin-top: 1em;
      font-size: 12px;;
      word-break: break-all;
      opacity: .5;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }

</style>
