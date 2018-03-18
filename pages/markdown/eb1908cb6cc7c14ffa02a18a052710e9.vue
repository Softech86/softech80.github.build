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

      <h2 class="title heading mt25 mb0">测试文章</h2>
      <div class="courier mt10 mb40">
        <span class="category">Develop</span>
        <span class="ml10 mr10">|</span>
        <span class="time">Jun 11 1898</span>
      </div>

      <div id="article"><h2 id="subtitle">subtitle</h2>
<p>hello <em>there</em></p>
<ul>
<li>w</li>
<li>x</li>
<li>y</li>
<li>z</li>
</ul>
<p>hi
hi</p>
<p>hi
hi</p>
<h2 id="node">node</h2>
<pre><code class="lang-node">function () {
  <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; <span class="hljs-comment">// what?</span>
}

  <span class="hljs-keyword">import</span> axios from <span class="hljs-string">'axios'</span>
  <span class="hljs-keyword">import</span> marked from <span class="hljs-string">'marked'</span>
  <span class="hljs-keyword">import</span> {highlightAuto} from <span class="hljs-string">'highlight.js'</span>
<span class="hljs-comment">//  import 'highlight.js/styles/github-gist.css'</span>
<span class="hljs-comment">//  import 'highlight.js/styles/paraiso-light.css'</span>
  <span class="hljs-keyword">import</span> <span class="hljs-string">'highlight.js/styles/vs2015.css'</span>

  marked.setOptions({
    highlight: function (code) {
      <span class="hljs-keyword">return</span> highlightAuto(code).value
    }
  })

export <span class="hljs-keyword">default</span> {
  components: {},
<span class="hljs-comment">//    computed: {</span>
<span class="hljs-comment">//        imgUri () {</span>
<span class="hljs-comment">//            return `/static/markdown/${this.path.slice(0, -3)}.png`</span>
<span class="hljs-comment">//        }</span>
<span class="hljs-comment">//    },</span>
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      path: <span class="hljs-string">''</span>,
      md: <span class="hljs-string">''</span>,
      mhtml: `&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">loading</span>" <span class="hljs-title">style</span>="<span class="hljs-title">font</span>-<span class="hljs-title">size</span>: <span class="hljs-type">21px"&gt;正在加载文章...</span>&lt;<span class="hljs-type">/div</span>&gt;`,
      <span class="hljs-type">title: ''</span>,
      <span class="hljs-type">imgPreview: {</span></span>
        url: <span class="hljs-string">''</span>,
        ratio: <span class="hljs-number">1</span>
      },
      linkPreview: <span class="hljs-string">''</span>,
      window: {
        width: <span class="hljs-number">0</span>,
        height: <span class="hljs-number">0</span>,
        ratio: <span class="hljs-number">1</span>
      }
    }
  },
  watch: {
    <span class="hljs-string">'imgPreview.url'</span> (<span class="hljs-keyword">val</span>) {
      document.body.style.overflow = <span class="hljs-keyword">val</span> ? <span class="hljs-string">'hidden'</span> : <span class="hljs-string">''</span>
    },
    linkPreview (<span class="hljs-keyword">val</span>) {
      document.body.style.overflow = <span class="hljs-keyword">val</span> ? <span class="hljs-string">'hidden'</span> : <span class="hljs-string">''</span>
    }
  },
  computed: {
    imgPreviewStyle () {
      const scr = <span class="hljs-keyword">this</span>.window.ratio
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.imgPreview.ratio &gt; scr ? {
        width: <span class="hljs-string">'80%'</span>
      } : {
        height: <span class="hljs-keyword">this</span>.window.height * <span class="hljs-number">0.8</span> + <span class="hljs-string">'px'</span>
      }
    }
  },
  created () {
    <span class="hljs-keyword">this</span>.path = <span class="hljs-keyword">this</span>.$route.params.path
    <span class="hljs-keyword">this</span>.title = <span class="hljs-keyword">this</span>.path.split(<span class="hljs-string">'/'</span>).pop().slice(<span class="hljs-number">0</span>, <span class="hljs-number">-3</span>)
    axios(`/static/markdown/${<span class="hljs-keyword">this</span>.path}`).then(res =&gt; {
      <span class="hljs-keyword">this</span>.md = res.<span class="hljs-keyword">data</span>
      <span class="hljs-keyword">this</span>.md = <span class="hljs-keyword">this</span>.md.replace(/(\[.*?\]\()((?!http).+\))/g, `$<span class="hljs-number">1</span>/static/markdown/${<span class="hljs-keyword">this</span>.path}/../$<span class="hljs-number">2</span>`)
      <span class="hljs-keyword">this</span>.mhtml = marked(<span class="hljs-keyword">this</span>.md)

      <span class="hljs-keyword">while</span> (<span class="hljs-number">1</span>) {
        const re = /&lt;pre&gt;&lt;code.*?&gt;[\s\S]*?&lt;\/code&gt;&lt;\/pre&gt;/
        let code = <span class="hljs-keyword">this</span>.mhtml.match(re)
        <span class="hljs-keyword">if</span> (code) {
          code = code[<span class="hljs-number">0</span>]
            .replace(/&lt;code(.*?)&gt;/, <span class="hljs-string">'&lt;_code$1&gt;&lt;div&gt;'</span>)
            .replace(/\n&lt;\/code&gt;/, <span class="hljs-string">'&lt;/div&gt;&lt;/_code&gt;'</span>)
            .replace(/\n/g, <span class="hljs-string">'&lt;/div&gt;&lt;div&gt;'</span>)
          console.log(code)
          <span class="hljs-keyword">this</span>.mhtml = <span class="hljs-keyword">this</span>.mhtml.replace(re, code)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">break</span>
      }

      <span class="hljs-keyword">this</span>.mhtml = <span class="hljs-keyword">this</span>.mhtml.replace(/_code/g, <span class="hljs-string">'code'</span>)
    })
  },
  mounted () {
    <span class="hljs-keyword">this</span>.window.width = window.innerWidth
    <span class="hljs-keyword">this</span>.window.height = window.innerHeight
    <span class="hljs-keyword">this</span>.window.ratio = window.innerWidth / (window.innerHeight + <span class="hljs-number">0.01</span>)

    <span class="hljs-keyword">this</span>.$refs.md.onclick = e =&gt; {
      const t = e.target
      <span class="hljs-keyword">if</span> (t.tagName === <span class="hljs-string">'IMG'</span>) {
        <span class="hljs-keyword">this</span>.imgPreview.url = t.getAttribute(<span class="hljs-string">'src'</span>)
        const {width, height} = t.getBoundingClientRect()
        console.log(width, height)
        <span class="hljs-keyword">this</span>.imgPreview.ratio = width / (height + <span class="hljs-number">0.01</span>)
      }
      <span class="hljs-keyword">if</span> (t.tagName === <span class="hljs-string">'A'</span>) {
        e.preventDefault()
        <span class="hljs-keyword">this</span>.linkPreview = t.getAttribute(<span class="hljs-string">'href'</span>)
      }
    }
  }
}
</code></pre>
<h1 id="title">title</h1>
<h2 id="c-">c++</h2>
<pre><code class="lang-c++"><span class="hljs-meta">#<span class="hljs-meta-keyword">include</span> <span class="hljs-meta-string">&lt;iostream&gt;</span></span>
<span class="hljs-keyword">using</span> <span class="hljs-keyword">namespace</span> <span class="hljs-built_in">std</span>;
<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-built_in">cout</span> &lt;&lt; <span class="hljs-string">"hello world"</span>;
  <span class="hljs-built_in">cout</span> &lt;&lt; <span class="hljs-string">"hello world"</span> &lt;&lt; <span class="hljs-string">"hello world"</span> &lt;&lt; <span class="hljs-string">"hello world"</span> &lt;&lt; <span class="hljs-string">"hello world"</span> &lt;&lt; <span class="hljs-string">"hello world"</span> &lt;&lt; <span class="hljs-string">"hello world"</span> &lt;&lt; <span class="hljs-string">"hello world"</span> &lt;&lt; <span class="hljs-string">"hello world"</span> &lt;&lt; <span class="hljs-string">"hello world"</span> &lt;&lt; <span class="hljs-string">"hello world"</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
}
</code></pre>
<p>请使用快捷键<code>⌘1</code>、<code>⌘2</code>和<code>⌘3</code>在三窗格（文库、文稿列表和编辑器）、两窗格（文稿列表和编辑器）和仅<a href="https://www.baidu.com">编辑器视图</a>之间切换。您还可以最左侧的工具栏按钮切换视图。</p>
<blockquote>
<p>what is this</p>
</blockquote>
<h2 id="image">image</h2>
<p><img src="https://zh.nuxtjs.org/vuejobs.png" alt="vuejob">
<img src="http://120.27.121.123/markdown/%E5%90%AF%E7%A8%8B.jpg" alt="from server">
<img src="res/scr.png" alt="_here"></p>
<h2 id="link">link</h2>
<ol>
<li><a href="res/scr.png">here</a></li>
<li><a href="https://www.baidu.com">百度</a></li>
<li><a href="https://www.bilibili.com">哔哩哔哩动画</a></li>
<li><a href="https://www.webnovel.com">海外站</a></li>
<li><a href="https://www.baidu.com/s?ie=utf-8&amp;f=8&amp;rsv_bp=1&amp;rsv_idx=1&amp;tn=baidu&amp;wd=window.scrollTo&amp;oq=scss%2520media&amp;rsv_pq=f173df2800000244&amp;rsv_t=a5f1oqa0saaM%2FvqQSE%2FFzKILI2QLY%2BydYOHaJycFZ4SgnH7xSfI7zWMVMuo&amp;rqlang=cn&amp;rsv_enter=1&amp;inputT=435&amp;rsv_sug3=10&amp;rsv_sug2=0&amp;rsv_sug4=461">百度搜索</a></li>
</ol>
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
