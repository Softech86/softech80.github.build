<template>
  <nav
    id="nav"
    class="f20 courier bold mw1000"
    :style="navStyle"
    :class="{ active }"
  >
    <router-link to="/" class="logo-box">
      <fei-logo :width="size" :height="size"></fei-logo>
    </router-link>
    <div class="btn-active" @click="active = !active">
      <i class="a"></i>
      <i class="b"></i>
      <i class="c"></i>
      <i class="d"></i>
    </div>

    <!--<router-link to="/">News</router-link>-->
    <transition name="fade">
    <router-link to="/" class="home" hidden>Home</router-link>
    </transition>

    <router-link to="/blog">Blog</router-link>

    <!--<router-link to="/">Demo</router-link>-->
    <a href="//github.com/Softech86" target="_blank">Git</a>
    <a href="//www.zhihu.com/people/leo-bai-35" target="_blank">Zhihu</a>
    <a id="girl" href="//www.jianshu.com/u/ea9ec8de23aa" target="_blank">GIRL</a>

  </nav>
</template>

<script>
  import FeiLogo from "./Logo"
  export default {
    props: {
      size: {
        type: [ Number, String ],
        default: 45
      }
    },
    components: {
      FeiLogo
    },
    data () {
      return {
        active: false
      }
    },
    computed: {
      navStyle () {
        return `line-height: ${this.size}px;`
      }
    },
    watch: {
      active (val) {
        if (document) {
          document.body.style.overflow = val ? 'hidden' : 'auto';
          document.body.style.height = val ? '100vh' : 'auto';
        }
      }
    },
    beforeDestroy () {
      if (document) {
        document.body.style.overflow = document.body.style.height = 'auto';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/style/variable";

  nav#nav {
    direction: rtl;
    padding: 50px 0;
    position: relative;
    z-index: 1000;
  }

  a {
    border: 0;
    margin-right: 40px;
  }
  a:last-child {
    margin: 0;
  }

  #girl:hover {
    color: #f981aa !important;
  }

  .logo-box {
    float: left;
    transition: .3s;
  }

  @include mobile {
    nav#nav {
      direction: ltr;
      height: 50px;
      background: rgba(white, .8);
      overflow: hidden;
      transition: .3s;
      width: 100%;
      left: 0;
      padding: 10px 20px 0;
      box-sizing: border-box;
      position: fixed;
      top: 0;
    }
    .home {
      display: block;
    }
    /*.logo-box .logo {*/
      /*margin: auto;*/
      /*width: 24px !important;*/
      /*height: 30px !important;*/
    /*}*/
    .logo-box {
      display: none;
    }
    a {
      display: block;
      /*text-align: right;*/
      line-height: 3.5;
    }
    a:not(:first-child) {
      margin: 0 9px !important;
      opacity: 0;
      border-right: 1px solid;
      padding-left: 30px;
    }

    nav#nav.active {
      /*position: fixed !important;*/
      background: white;
      /*width: 100vw  !important;*/
      height: 100vh;
      /*top: 0;*/
      /*left: 0;*/
      padding-top: 30px;
      /*box-sizing: border-box;*/
    }
    .btn-active {
      text-align: right;
      margin-bottom: 50px;
      width: 20px;
      height: 30px;
      margin-left: auto;
      position: relative;
      /*background: red;*/

      i {
        width: 60%;
        height: 2px;
        background: black;
        position: absolute;
        border-radius: 1px;
        transform: rotateZ(0deg);
        transition: .3s;
      }
      .a, .b {
        top: 10px;
      }
      .a, .c {
        left: 0;
      }
      .c, .d {
        bottom: 10px;
      }
      .b, .d {
        right: 0;
      }
    }

    .active {
      .logo-box {
        transform: translate3d(0, -100%, 0);
        opacity: 0;
      }
      @for $i from 2 through 10 {
        a:nth-child(#{$i}) {
          animation: show .5s ($i - 2) * .2s forwards;
        }
      }
      .a {
        width: 100%;
        transform: translate3d(-4.5px, 2px, 0) rotateZ(120deg);
      }
      .b {
        transform: translate3d(0, 6px, 0) rotateZ(180deg);
      }
      .c {
        transform: translate3d(0px, 2px, 0) rotateZ(-180deg);
      }
      .d {
        width: 100%;
        transform: translate3d(4.5px, -6px, 0) rotateZ(240deg);
      }
    }
  }

  @keyframes show {
    from {
      transform: translate3d(0, 50%, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

</style>
