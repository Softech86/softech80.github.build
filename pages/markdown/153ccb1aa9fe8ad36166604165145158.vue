<template>
  <div class="markdown-template">
    <!--<img src="" alt="">-->

    <div class="mw800">

      <div
        class="title-image ani3"
        ref="titleImage"
        style="background-image: url('/markdown/')"
        :style="{ height: titleImageHeight + 'px' }"
        v-if="titleImage"
      ></div>

      <h2 class="title heading mt25 mb0">无话可说</h2>
      <div class="courier mt10 mb40">
        <span class="category">Daily</span>
        <span class="ml10 mr10">|</span>
        <span class="time">Mar 11 2018</span>
      </div>

      <div id="article"><h2 id="nothing-to-say">nothing to say</h2>
<p>end.</p>
</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        titleImageHeight: null,

        category: 'Daily',
        titleImage: '',
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
