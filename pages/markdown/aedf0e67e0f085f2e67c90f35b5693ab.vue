<template>
  <div class="markdown-template">
    <!--<img src="启程.jpg" alt="">-->

    <div class="mw800">

      <div
        class="title-image ani3"
        ref="titleImage"
        style="background-image: url('启程.jpg')"
        :style="{ height: titleImageHeight + 'px' }"
        v-if="titleImage"
      ></div>

      <h2 class="title heading mt25 mb0">启程</h2>
      <div class="courier mt10 mb40">
        <span class="category">Daily</span>
        <span class="ml10 mr10">|</span>
        <span class="time">{{ time }}</span>
      </div>

      <div id="article"><p>一直有写个人博客的想法，又不甘心套别人的模板。俗务缠身，无从下笔。放假这么久，一直工作；加上手头积压的项目，难有闲暇。</p>
<p>终于抽出时间做了一点，从这里开始吧。</p>
</div>
    </div>
  </div>
</template>

<script>
  import { TimeFormat } from '~/assets/script/util.js'
  export default {
    data () {
      return {
        titleImageHeight: null,

        category: 'Daily',
        titleImage: '启程.jpg',
        time: new TimeFormat('2018-03-12T02:41:13.193Z' || 0).text(),
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
