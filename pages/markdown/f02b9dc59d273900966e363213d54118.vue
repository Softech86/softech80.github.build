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

      <h2 class="title heading mt25 mb0">理想与现实</h2>
      <div class="courier mt10 mb40">
        <span class="category">Daily</span>
        <span class="ml10 mr10">|</span>
        <span class="time">Nov 12 2015</span>
      </div>

      <div id="article"><p>理想与现实，梦境与生活，是否有明确的界限？意识架构的世界与客观存在的世界，是否有明确的边缘？也许有，因为后者过于宏大而不可复制，过于复杂而难以推演。但身处保温箱中，远离柴米油盐，远离尔虞我诈，远离悲欢离合。举目唯有分数成绩，垂首不过书山题海。这个世界太简陋，简陋到可以预测未来；太单纯，单纯到万事皆有是非。</p>
<p>因此，当梦与实规模相当，它们的边界就会模糊。当梦境与生活等大，理想与现实齐平，两个世界就会交错。我的确游离于两个世界，在边缘步步前行。</p>
<p>但我的阅历浅陋，不足以使理想世界客观。两个世界的交接处充满扭曲与混乱：尽善尽美与得过且过，一帆风顺与寸步难行，光明磊落与阴险诡谲。激情与麻木，生动与呆板，乐观与消极。</p>
<p>左手梦幻，右手生存。</p>
<p>但我会一直走下去。</p>
<p>倘若躺进理想与梦境的世界，满眼生机，四处美好，很容易忽略前路波折，最终肉身在现实世界湮灭。</p>
<p>倘若钻进现实与生活的时间，也许接触的灰霾会更多些。不公，自私，冷酷，卑鄙，疯狂，人生一路过客无数，他们都会见面。最终自囚现实的笼，伤痕累累。</p>
<p>我想，完整的人应同时拥有两个世界。心怀理想，而不沉溺于理想；正视现实，而不屈服于现实。</p>
<p>很遗憾，我的两个世界都很破弊，毕竟经历太少，行路无多。而我未来要做的，就是补全两个世界。</p>
<p>这就是我。</p>
<p>所谓幻象，是针对客观现实而言。在理想世界，幻象就是最真的现实。我的情感基于理想世界。爱一本书，其实爱的是它与我相似的思想；爱一部电影，其实爱的是它在我世界的投影。许多人不明白爱，喊着要死要活。他们渴望的其实是多巴胺。这样的欲求，与对酒精的渴求别无二致。建立在欲望之上的追随是无根之萍，它只会随波逐流。</p>
<p>其实我们不都身处这样的世界么？左眼理想，右眼现实。我很少遇到有意识地建立理想世界的人，因为人们大多纷纷乱乱，浮躁喧嚣，被求生的需求与享乐的欲望裹挟着前行。</p>
<p>人与人有太多不同，能相似相近相识相知简直是奇迹。我享受思维的交流与碰撞，尤其是同活生生的人。人，是怎样一本无穷无尽的沙之书啊！</p>
<p>“一个人知道自己为什么而活，就可以忍受任何一种生活。”其实，无论身在何处，我大概都会享受生活吧！如果在坎坷中跋涉，我定拿摔跤取乐；如果在雷火中求生，我定以光焰为景；如果在黑夜中寻路，我定令阴影相伴。</p>
<p>如果不幸委身斧质，我定在微笑中长存。</p>
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
