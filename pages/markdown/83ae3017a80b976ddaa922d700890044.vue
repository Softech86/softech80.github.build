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

      <h2 class="title heading mt25 mb0">入学小记</h2>
      <div class="courier mt10 mb40">
        <span class="category">Daily</span>
        <span class="ml10 mr10">|</span>
        <span class="time">Oct 17 2015</span>
      </div>

      <div id="article"><p>上大学有一段时间，好几次萌生了写些什么的想法，可是都在叹息中停止了。似乎只是些小的感慨，不足以记。然而有些想法，却实在无法压抑了。</p>
<p>可是要是全部写出来，的确没有什么可说。</p>
<p>其实哀怨来忧愁去，还是自己的问题咯。自鸣得意，所以内心高高在上；自视清高，所以一人形单影只。
可是，好像找一个能说话的人啊。</p>
<p>我感觉到真正的孤立无援了。樱花大道每天熙熙攘攘，可惜找不到同路人。</p>
<p>所以只能遗憾地叹息。道不同，不相为谋。毕竟啊，哪有那么多认真的人。</p>
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
