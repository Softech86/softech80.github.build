<template>
  <div class="markdown-template">
    <!--<img src="down.gif" alt="">-->

    <div class="mw800">

      <div
        class="title-image ani3"
        ref="titleImage"
        style="background-image: url('down.gif')"
        :style="{ height: titleImageHeight + 'px' }"
        v-if="titleImage"
      ></div>

      <h2 class="title heading mt25 mb0">Todo List</h2>
      <div class="courier mt10 mb40">
        <span class="category">Develop</span>
        <span class="ml10 mr10">|</span>
        <span class="time">{{ time }}</span>
      </div>

      <div id="article"><p>事情太多，一团乱麻。先把要做的事情列下来，一件一件去完成。</p>
<p>具体的事情有<code>滴答清单</code>收集，这里列一些大的时间点吧。</p>
<h2 id="-">须知</h2>
<ul>
<li>精通编译原理课程</li>
<li>实现 Markdown 编译器</li>
<li>精通设计模式课程</li>
<li>熟知23种设计模式</li>
<li>JavaScript设计模式</li>
</ul>
<h2 id="-">温故</h2>
<ul>
<li>总结网页常见布局</li>
</ul>
<h2 id="-">知新</h2>
<ul>
<li>学习 Ruby on Rails</li>
<li>使用 RoR 搭建博客后端</li>
<li>学习 React</li>
<li>使用 React 搭建博客管理界面</li>
<li>学习 React Native</li>
<li>使用 React Native 完成一个 Native 项目，且动画效果出众</li>
</ul>
<p>这些项目的优先级大致等同，希望在年前完成。
祝我开坑顺利。</p>
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
        titleImage: 'down.gif',
        time: new TimeFormat('2017-11-4 10:12' || 0).text(),
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
