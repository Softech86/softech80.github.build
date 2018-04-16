<template>
  <div>
    <fei-nav class="mw1000" v-if="!navHidden"/>
    <section class="sec mw800 flex rltv flv flxs" ref="sec" :style="{ opacity: loaded ? 1 : 0 }">

      <div class="desc industry f32" ref="title">
        <div>
          A BLOG ABOUT
        </div>
        <div>
           <span class="color-primary">NOTHING</span>
        </div>
      </div>


      <div class="blogs flex flv flys f16" ref="index">
        <router-link :to="blog.url" v-for="blog in blogs.slice(0, 8)" :key="blog.title">{{blog.title}}</router-link>
      </div>

      <div class="rect" ref="rect"></div>

    </section>

    <section class="loading flex flxc flyc f32 courier" v-if="!loaded">
      <loading></loading>
    </section>

      <!--<div class="fl1 flex flv flxc">-->
    <section class="flex mw800 flv" ref="container">

      <div
        class="category flex rltv"
        v-for="(blogs, category) in categories"
        :key="category"
      >
        <div
          class="imgs flex"
          ref="imgs"
          :style="{
            width: `${imgWidth}px`,
            height: `${imgHeight}px`,
          }"
        >
          <div class="img-left fl1" ref="bottomLayerOdd">
            <div class="img" :style="imageStyles[category]"></div>
          </div>
          <div class="img-right fl1 flex flv">
            <div class="img-rt fl1" ref="topLayer">
              <div class="img" :style="imageStyles[category]"></div>
            </div>
            <div class="img-rb fl2" ref="bottomLayerEven">
              <div class="img" :style="imageStyles[category]"></div>
            </div>
          </div>
        </div>

        <div
          class="blogs flex flv flys fl1"
        >
          <div class="blog mt20" v-for="blog in blogs" :key="blog.title" @click="$router.push(blog.url)">
            <span class="courier f16">{{blog.editAt}}</span>
            <div><nobr class="heading f20">{{blog.title}}</nobr></div>
          </div>
        </div>

        <div class="title industry f32">{{category.toUpperCase()}}</div>

      </div>

    </section>


    <div class="mw1000 mv50 op5 f12">Copyright © Leo Bai. All Rights Reserved.</div>
  </div>
</template>

<script>
  import FeiNav from '~/components/Nav.vue'
  import Loading from '~/components/Loading.vue'

  export default {
    props: {
      navHidden: {
        type: Boolean,
        default: false
      }
    },
    components: {
      FeiNav,
      Loading
    },
    data () {
      return {
        loaded: false,
        imgWidth: 600,
        imgHeight: 360,
        baseTop: 250,
        imageStyles: {}
      }
    },
    computed: {
      blogs () {
        return this.$store.state.blogs
      },
      categories () {
        return this.$store.state.categories
      },
    },
    methods: {
      setImg () {

        const containerWidth = Math.min(window.innerWidth - 80, 800)
        this.imgWidth = containerWidth * .75
        this.imgHeight = containerWidth * .45

        this.imageStyles = Object.assign({}, this.categories)

        Object.keys(this.categories).forEach(x => {
          let url = '/markdown/' + this.categories[x].map(x => x.titleImage).filter(x => x)[0]

          const img = document.createElement('img')
          img.setAttribute('src', url)

          img.onload = () => {
            // console.log(img.naturalWidth, img.naturalHeight)

            const nw = img.naturalWidth
            const nh = img.naturalHeight
            const w = this.imgWidth
            const h = this.imgHeight

            const canvas = document.createElement('canvas')
            canvas.width = this.imgWidth
            canvas.height = this.imgHeight
            const ctx = canvas.getContext('2d')

            if (w * nh < h * nw) {
              const sw = h * nw / nh
              ctx.drawImage(img, (w - sw) * .5, 0, sw, h)
            } else {
              const sh = w * nh / nw
              ctx.drawImage(img, 0, (h - sh) * .5, w, sh)
            }

            url = canvas.toDataURL()

            Object.assign(this.imageStyles, {
              [x]: `background-image: url(${url});background-size: ${w}px ${h}px;`
            })
          }

        })
      },
      setLayer () {
        // console.log(document.querySelector('#__nuxt').getBoundingClientRect().y)
        this.$refs.imgs.forEach((el, index) => {
          const top = el.getBoundingClientRect().top
          // const style = el.getAttribute('style')
          window.el = el
          this.$refs.topLayer[index].style.transform = `translateY(${(top - this.baseTop) * .1}px)`
          this.$refs[index % 2 ? 'bottomLayerOdd' : 'bottomLayerEven'][index].style.transform = `translateY(${(top - this.baseTop) * -.1}px)`

          // el.setAttribute('style', style + )
        })


        const top = this.$refs.title.getBoundingClientRect().top
        this.$refs.title.style.transform = `translateY(${(top - this.baseTop) * .1}px)`
        this.$refs.index.style.transform = `translateY(${(top - this.baseTop) * .2}px)`
        // this.$refs.rect.style.transform = `translateY(${(top - this.baseTop) * 0}px)`
      }
    },
    mounted () {

      this.setImg()
      window.addEventListener('resize', this.setImg)

      this.baseTop = this.$refs.imgs[0].getBoundingClientRect().top + window.scrollY - window.innerHeight * .8
      this.setLayer()
      window.addEventListener('scroll', this.setLayer)

      this.loaded = true
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.setImg)
      window.removeEventListener('scroll', this.setLayer)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/style/variable.scss";

  /*section {*/
    /*min-height: 100vh;*/
  /*}*/

  .loading {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: white;
    z-index: 1000;
  }

  .sec {
    height: 72vh;
    margin-bottom: -8vh;
    opacity: 0;
    transition: opacity .3s;

    .desc {
      line-height: 1.6;
      font-weight: 100;
      letter-spacing: 2px;
      border-bottom: 1px solid black;
      margin-right: 120px;
      margin-top: 18vh;

      & > div {
        transform: scaleY(.95) translateZ(0);
      }
    }

    .blogs {
      line-height: 1.8;
      font-weight: 300;
      margin-left: 140px;
      margin-top: calc(15vh - 60px);

      a {
        border: 0;
        color: inherit !important;

        &:hover {
          text-decoration: underline !important;
        }
      }
    }

    .rect {
      position: absolute;
      width: calc(100% - 200px);
      height: 64%;
      top: 10%;
      right: 0;

      background-color: $gray;
      background-image: url("~/markdown/res/高压危险.png");

      background-size: cover;
      opacity: .3;
      z-index: -1;
    }
  }


  .imgs {

    $edge: 10px;
    $blank: 50px;

    .img {
      width: 100%;
      height: 100%;
      background-color: $gray;
    }
    .img-left {
      margin-top: $blank;
      margin-right: $edge;
      .img {
        background-position: bottom left;
      }
    }
    .img-rt {
      margin-bottom: $edge;
      z-index: 1;

      .img {
        background-position: top right;
      }
    }
    .img-rb {
      margin-right: $blank;
      margin-bottom: $blank;

      .img {
        background-position: calc(100% + 50px) calc(100% + 50px);
      }
    }
  }

  .blog {
    cursor: pointer;
  }

  .title {
    letter-spacing: 2px;
    transform: scaleY(.95) translateZ(0);
    position: absolute;
  }
  .title:first-letter {
    color: $primary-color;
  }

  .category {
    margin: calc(20vh - 60px) 0;
  }
  $op: .2;
  .category:nth-child(odd)  {
    .img-rb {
      opacity: $op;
      z-index: -1;
    }

    .blogs {
      margin: 200px 0 0 -25%;
    }
    .title {
      margin-top: 140px;
      right: 0;
      padding-bottom: .5%;
      border-bottom: 1px solid black;
      width: 50%;
      text-align: right;
    }
  }
  .category:nth-child(even) {
    flex-direction: row-reverse;

    .img-left {
      opacity: $op;
      z-index: -1;
    }
    .blogs {
      margin: 120px -25% 0 0;
    }
    .title {
      right: 45%;
      border-left: 1px solid black;
      padding-left: .5%;
      letter-spacing: 4px;
      margin-top: -40px;
      writing-mode: vertical-lr;
    }
  }



</style>
