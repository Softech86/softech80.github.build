<template>
  <div class="markdown-template">
    <!--<img src="<%= titleImage %>" alt="">-->

    <div class="mw800">

      <div
        class="title-image ani3"
        ref="titleImage"
        style="background-image: url('<%= titleImage %>')"
        :style="{ height: titleImageHeight + 'px' }"
        v-if="titleImage"
      ></div>

      <h2 class="title heading mt25 mb0"><%= title %></h2>
      <div class="courier mt10 mb40">
        <span class="category"><%= category %></span>
        <span class="ml10 mr10">|</span>
        <span class="time">{{ time }}</span>
      </div>

      <div id="article"><%= body %></div>
    </div>
  </div>
</template>

<script>
  import { TimeFormat } from '~/assets/script/util.js'
  export default {
    data () {
      return {
        titleImageHeight: null,

        category: '<%= category %>',
        titleImage: '<%= titleImage %>',
        time: new TimeFormat('<%= createdAt || updatedAt %>' || 0).text(),
      }
    },
    mounted () {
      this.$refs.titleImage && (this.titleImageHeight = this.$refs.titleImage.getBoundingClientRect().width * 9 / 16)
    },
  }
</script>

<style lang="scss" scoped>
  @import '~assets/style/blog-template.scss';
</style>
