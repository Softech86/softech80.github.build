<template>
  <div class="markdown-template">
    <!--<img src="博客搭建记录.jpeg" alt="">-->

    <div class="mw800">

      <div
        class="title-image ani3"
        ref="titleImage"
        style="background-image: url('/markdown/博客搭建记录.jpeg')"
        :style="{ height: titleImageHeight + 'px' }"
        v-if="titleImage"
      ></div>

      <h2 class="title heading mt25 mb0">博客搭建记录[0]·需求和选型</h2>
      <div class="courier mt10 mb40">
        <span class="category">Develop</span>
        <span class="ml10 mr10">|</span>
        <span class="time">Mar 18 2018</span>
      </div>

      <div id="article"><p>作为有 Geek 精神的程序员，没有个人博客是一件憾事。于是给自己加一个需求：写一个属于自己的博客！</p>
<h2 id="-">需求</h2>
<p>如果使用现有的成熟框架，如 <a href="https://hexo.io/">Hexo</a> 或 <a href="https://jekyllrb.com/">Jekyll</a> ，配置简单，技术成熟，开发成本几乎为零，是高性价比的不二之选。</p>
<p>Emmm… 不够<code>硬核</code>。</p>
<p>大概是内心一点执念吧，我希望自数据层之上都由自己完成。毕竟是个人博客，希望个人参与的部分更多一点。</p>
<p>假设我希望在已经建成项目的基础上更新一篇博文，理想的操作步骤为：</p>
<ol>
<li>编辑一篇 Markdown 文章</li>
<li>注明文章信息</li>
<li>生成静态页面</li>
<li>上传至服务器发布</li>
</ol>
<p>计划在春天以前完成，开发时间很短暂了。</p>
<h2 id="-">选型</h2>
<p>希望把更多建设成本放在展示部分，因此在保证性能的情况下，后端成本应尽可能小。比起 MVC 架构，直接静态页面更好了。</p>
<p>希望前端有更大的扩展性，可以经得起后面的多次迭代开发，那先塞一个MVVM 框架进去。我选择 Vue ，一则轻量，二则熟悉。</p>
<p>希望对搜索引擎更加友好，在 JavaScript 渲染之前就已经充满信息。纯前端渲染不可取，前端渲染更多用来负责处理交互和视觉的部分。</p>
<p>好。</p>
<p> Hexo 将文章信息放在文件名中， Jekyll 则在文章开头使用 YAML（<a href="http://www.ruanyifeng.com/blog/2016/07/yaml.html">YAML是什么呀？</a>）。前者不适合较为复杂的文章信息，为了框架的扩展性，选择 YAML。</p>
<p>刷知乎的时候突然看到一篇技术文章，关于 <a href="https://zh.nuxtjs.org/">Nuxt.js</a> 应用场景的。原来对 Nuxt 的印象限于 SSR ，但我觉得 SSR 的意义更在于前后端同构对代码开发成本的减小，对 Nuxt 也没有太多关注。后来注意到它可以基于templage生成静态页面，在当前场境下可以说非常合适了。</p>
<p>好。</p>
<p>选型围绕 Nuxt 展开，下面讨论如何处理 Markdown 。</p>
<p>我们可以先将 Markdown 解析为 Json ，然后通过 ajax 获取。由于没有后端，我们可以生成静态文件，模拟 ajax 中服务器访问。这样做符合传统 SPA 的思路，但是对搜索引擎极不友好。</p>
<p>还是将 Markdown 直接打包进 Nuxt 内部比较好，打包工具流选用 Gulp 。</p>
<h2 id="-">总结</h2>
<p>可以确定的选型如下：</p>
<ul>
<li>Vue</li>
<li>Nuxt</li>
<li>Gulp</li>
<li>Markdown + YAML</li>
</ul>
</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        titleImageHeight: null,

        category: 'Develop',
        titleImage: '博客搭建记录.jpeg',
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
