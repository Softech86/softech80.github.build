<template>
  <div class="markdown-template">
    <!--<img src="下一步开发内容.jpg" alt="">-->

    <div class="mw800">

      <div
        class="title-image ani3"
        ref="titleImage"
        style="background-image: url('下一步开发内容.jpg')"
        :style="{ height: titleImageHeight + 'px' }"
        v-if="titleImage"
      ></div>

      <h2 class="title heading mt25 mb0">下一步开发内容</h2>
      <div class="courier mt10 mb40">
        <span class="category">Develop</span>
        <span class="ml10 mr10">|</span>
        <span class="time">{{ time }}</span>
      </div>

      <div id="article"><h2 id="-">更新</h2>
<h3 id="-">主页</h3>
<ul>
<li>主页动效 by <code>three.js</code></li>
<li>完善页面响应式</li>
<li>主页目录 - 更好的展示，支持多级目录</li>
</ul>
<h3 id="markdown">markdown</h3>
<ul>
<li>markdown 的链接 - 点击跳转直接到预览操作后的页面</li>
<li>top 按钮</li>
<li>面包屑</li>
<li>文档目录 / 结构 浮动显示</li>
</ul>
<h3 id="-">结构</h3>
<ul>
<li>github 更新钩子</li>
<li>webpack 懒加载，拆分代码</li>
<li>更好的 css 逻辑</li>
</ul>
<h2 id="-">增加</h2>
<h3 id="-">页面</h3>
<ul>
<li>Blog 页面 - 按照分类筛选 Blog</li>
<li><strong>Demo 页面</strong> - 可以用来展示前端小组件<blockquote>
<p>每个 Demo 页面为一个 HTML 静态页面，在 Blog 页面引用时，只需添加一个超链接</p>
</blockquote>
</li>
</ul>
<h3 id="-">后端</h3>
<ul>
<li><del><strong>增加后端</strong> - 考虑 ssr 渲染</del></li>
</ul>
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

        category: 'Develop',
        titleImage: '下一步开发内容.jpg',
        time: new TimeFormat('2018-03-12T06:48:49.095Z' || 0).text(),
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
