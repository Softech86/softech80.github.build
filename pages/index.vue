<template>
  <div :class="{ firstFold }" class="flex flv flyst">
    <section class="sec sec-1 mw1000">
      <div class="nav pl40 pr40">
        <fei-nav />
      </div>

      <transition name="first-fade">
        <div class="flex rltv flv flxsb content" v-if="!firstFold">

          <div></div>

          <div class="index pt40 flex flv flys f16 pl20">
            <router-link :to="blog.url" v-for="blog in blogs" :key="blog.title">{{blog.title}}</router-link>
          </div>

          <div class="title industry f32">
            <div>
              A BLOG
            </div>
            <div>
              ABOUT <span class="color-primary">NOTHING</span>
            </div>
          </div>



        </div>
      </transition>

      <!--<div class="image-bg absl" ref="rect">-->

        <!--<div class="title">-->
          <!--<div class="f28 industry">-->
            <!--<div>A</div>-->
            <!--<div class="color-primary">BLOG</div>-->
            <!--<div>OF</div>-->
          <!--</div>-->
          <!--<logo full width="108" height="60"/>-->
        <!--</div>-->

      <!--</div>-->
    </section>


    <div class="sec sec-2 mw1000 flex fly ">
      <div class="image-bg absl" ref="rect"></div>

      <transition name="second-fade">
          <Blog nav-hidden v-if="secondFold" class="fl1 content"></Blog>
      </transition>
    </div>

  </div>
</template>

<script>
import FeiNav from '~/components/Nav.vue'
import Logo from '~/components/Logo.vue'
import Blog from './blog.vue'

export default {
  components: {
    FeiNav,
    Logo,
    Blog
  },
  data () {
    return {
      firstFold: false,
      secondFold: false
    }
  },
  mounted () {
    const rect = this.$refs.rect
    window.rect = rect

    document.body.onscroll = e => {
      console.log(this.firstFold, rect.getBoundingClientRect().top, document.querySelector('#__nuxt').getBoundingClientRect().y)
      if (!this.firstFold && rect.getBoundingClientRect().top <= 300) {
        this.firstFold = true
      }
      // if (this.homeFold && document.body.scrollTop <= 10) {
      //   this.homeFold = false
      // }
      const y = document.querySelector('#__nuxt').getBoundingClientRect().y
      if (this.firstFold && y >= -10) {
        this.firstFold = false
      }
    }
  },
  computed: {
    blogs () {
      return this.$store.state.blogs
    }
  },
  watch: {
    firstFold (val) {
      if (val) {
        setTimeout(() => {
          this.secondFold = true
        }, 300)
      } else {
        this.secondFold = false
      }
    }
  }
}
</script>

<style>
  #__layout {
    overflow: hidden;
  }
</style>

<style lang="scss" scoped>
  @import "~assets/style/oo.scss";

  .nav {
    width: 100vw;
    left: 0;
    position: fixed;
    box-sizing: border-box;
    z-index: 1000;
  }

  .sec {
    height: 100vh;
    width: 100%;
    position: sticky;
    top: 0;
  }
  .content {
    height: calc(100vh - 40px);
  }
  .sec-1 {
    /*overflow: hidden;*/
    z-index: 1;
    transition: height 1s;
  }
  .image-bg {
    width: 100vw;
    /*height: 110vh;*/
    height: 100vh;
    background: #f8f9fa;
    top: 0vh;
    left: 0;
    z-index: -1;
    transform: translateY(-70%) rotateZ(30deg) translateZ(0);
    transform-origin: left top;
    transition: 1s;
    border-radius: 40px;
  }
  .title {
    float: right;
    line-height: 1.6;
    font-weight: 100;
    align-self: flex-end;
    margin-bottom: 60px;
    letter-spacing: 2px;

    & > div {
      transform: scaleY(.95) translateZ(0);
    }
  }
  .index {
    text-align: right;
    line-height: 2;
    font-weight: 300;
    word-break: keep-all;

    a {
      border: 0;
      color: inherit !important;

      &:hover {
        text-decoration: underline !important;
      }
    }
  }
  .sec-2 {
    box-sizing: border-box;
    transition: 1s;

    .content {
      padding-top: 145px;
      box-sizing: border-box;
    }
  }
  .firstFold {
    .sec-1 {
      height: 30px;
    }
    .sec-2 {
      .image-bg {
        /*opacity: 0;*/
        top: 10%;
        transform: translateX(-70%) translateY(100%) translateZ(0) rotateZ(-60deg);
      }
    }
  }

  .first-fade-enter-active {
    &, & .image, & .title {
      transition: 1s;
    }
  }

  .first-fade-leave-active {
    &, & .image, & .title {
      transition: .6s;
    }
  }
  .first-fade-enter-to, .first-fade-leave {

    &, & .image, & .title {
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }
  }
  .first-fade-enter, .first-fade-leave-to {
    opacity: 0;
    transform: translateY(-200px) translateZ(0);

    .image {
      transform: translateY(-100px) translateZ(0);
    }
    .title {
      transform: translateY(-250px) translateZ(0);
    }
  }

  .second-fade-enter-active {
    transition: 1s;
  }

  .second-fade-leave-active {
    transition: .6s;
  }
  .second-fade-enter-to, .second-fade-leave {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
  .second-fade-enter, .second-fade-leave-to {
    opacity: 0;
    transform: translateY(100px) translateZ(0);
  }
</style>
