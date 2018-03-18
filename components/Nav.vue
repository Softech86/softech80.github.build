<template>
  <nav id="nav" class="f20 courier bold mw1000" :style="navStyle">
    <router-link to="/" class="logo-box">
      <fei-logo :width="size" :height="size"></fei-logo>
    </router-link>

    <!--<router-link to="/">News</router-link>-->
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
    computed: {
      navStyle () {
        return `line-height: ${this.size}px;`
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
  }

</style>
