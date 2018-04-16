<template>
  <section class="mw1000 flex flv">
    <fei-nav v-if="!navHidden"/>

    <!--<div class="fl1 flex flv flxc">-->
    <div class="flex fl1">

      <div class="ml15 mr20 flex flv blogBox">
        <div class="btn" @click="prev">
          <transition name="btn-up">
            <div class="before" v-if="this.hasPrev">
              <div class="left"></div>
              <div class="right"></div>
            </div>
          </transition>
        </div>
        <div class="blogList rltv">
          <transition :name="down ? 'blog-temp-up' : 'blog-temp-down'">
            <div class="tempBlogListBox" v-if="showTempBlogList">
              <!-- ^ change to data: showTempBlog-->
              <div
                v-for="blog in tempBlogList"
                :key="blog.title"
                class="pt20 pb20"
              >
                <span class="editAt courier f16">{{blog.editAt}}</span>
                <!--<router-link :to="blog.url" class="title f20 ani2" @click.prevent="handleClick(selected === index, blog.url)">{{blog.title}}</router-link>-->
                <div class="title heading f20">{{blog.title}}</div>
              </div>
            </div>
          </transition>

          <transition :name="down ? 'blog-up' : 'blog-down'">
            <div class="blogListBox" v-if="showBlogList" ref="blogList">
              <div
                v-for="(blog, index) in blogList"
                :key="blog.title"
                class="pt20 pb20 blog"
                :class="{ selected: selected === index}"
                @mouseenter="$nextTick( () =>  { selected = index } )"
                @click="handleClick(selected === index, blog.url)"
              >
                <span class="editAt courier f16">{{blog.editAt}}</span>
                <!--<router-link :to="blog.url" class="title f20 ani2" @click.prevent="handleClick(selected === index, blog.url)">{{blog.title}}</router-link>-->
                <div class="title heading f20">{{blog.title}}</div>
              </div>
            </div>
          </transition>
        </div>

        <div class="btn" @click="next">
          <transition name="btn-down">
            <div class="after" v-if="this.hasNext">
              <div class="left"></div>
              <div class="right"></div>
            </div>
          </transition>
        </div>

      </div>

      <div class="fl1 flex flv flxc flyst">
        <div class="body f14 mt50">{{blogSelected.body}}</div>
        <div class="mt40 rltv flex flxsb">
          <div class="category rltv courier-bold">
            {{blogSelected.category}}
          </div>
          <router-link :to="blogSelected.url" class="read flex flyc industry ml20 f14">Read</router-link>
        </div>

        <div class="titleImage mt20 flex" :style="titleImageStyle"  ref="titleImage">
          <span class="song f40 fl1 flex flxc flyc" v-if="!blogSelected.titleImage">{{blogSelected.title}}</span>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
  import FeiNav from '~/components/Nav.vue'

  export default {
    props: {
      navHidden: {
        type: Boolean,
        default: false
      }
    },
    components: {
      FeiNav
    },
    data () {
      return {
        selected: -1,
        page: 0,
        tempBlogList: [],
        showTempBlogList: false,
        showBlogList: true,

        down: true
      }
    },
    mounted () {
      this.selected = 0
    },
    methods: {
      handleClick (focus, url) {
        // console.log(focus)
        if (focus) {
          this.$router.push(url)
        }
      },
      prev () {
        if (this.hasPrev) {
          this.down = false
          this.tempBlogList = this.blogList
          this.showBlogList = false
          this.showTempBlogList = true
          this.selected = 0
          this.page -= 1
          // this.$nextTick(() => {
          //   this.tempBlogList = []
          // })
          this.$nextTick(() => {
            this.showTempBlogList = false
          })
          setTimeout(() => {
            this.showBlogList = true
          }, 200)
        }
      },
      next () {
        if (this.hasNext) {
          this.down = true
          this.tempBlogList = this.blogList
          this.showBlogList = false
          this.showTempBlogList = true
          this.selected = 0
          this.page += 1
          this.$nextTick(() => {
            this.showTempBlogList = false
          })
          setTimeout(() => {
            this.showBlogList = true
          }, 200)
        }
      }
    },
    computed: {
      blogs () {
        return this.$store.state.blogs
      },
      blogList () {
        return this.blogs.slice(this.page * 4, this.page * 4 + 4)
      },
      blogSelected () {
        return this.blogList[this.selected] || this.blogList[0]
      },
      titleImageStyle () {
        const titleImage = this.$refs.titleImage
        const url = this.blogSelected.titleImage
        return {
          backgroundImage: url && `url('/markdown/${url}')`,
          height: titleImage ? (titleImage.getBoundingClientRect().width * 9 / 16 + 'px') : ''
        }
      },
      maxPage () {
        return Math.ceil(this.blogs.length / 4)
      },
      hasPrev () {
        return this.page > 0
      },
      hasNext () {
        return this.page < this.maxPage - 1
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/style/variable.scss";

  section {
    height: 100vh;
  }
  #nav {
    width: 100%;
  }

  .editAt {
    font-weight: bold;
  }
  .title {
    font-weight: 300;
    line-height: 1.3;
  }
  .blog {
    opacity: .4;
    transition: opacity;
    cursor: pointer;
  }
  .tempBlogListBox {
    opacity: .4;
  }

  .btn {
    width: 50px;
    height: 2px;
    font-family: "Courier New", serif;
    padding: 15px 0;
    cursor: pointer;
    opacity: .4;

    .before, .after {
      display: flex;
    }

    .left, .right {
      flex: 1;
      height: 2px;
      border-radius: 1px;
      background: currentColor;
      transition: .2s;
    }
    .left {
      margin-right: -2%;
    }
    .right {
      margin-left: -2%;
    }

    &:empty {
      cursor: unset;
    }
    &:hover {
      .after .left, .before .right {
        transform: rotateZ(15deg);
      }
      .after .right, .before .left {
        transform: rotateZ(-15deg);
      }
    }
  }

  .selected, .blog:hover {
    opacity: 1;

    .editAt {
      /*font-size: 18px !important;*/
      font-family: "Courier New Bold", serif;
      color: $primary-color !important;
      transform: translateZ(0);
      /*margin: 2px;*/
    }
    .title {
      /*font-size: 32px !important;*/
      transform: translateZ(0);
      transform-origin: left center;
      color: black !important;
    }
  }

  .read {
    transform: scaleY(0.9) translateY(.5px) translateZ(0px);;
    letter-spacing: 2px;
    font-weight: bold;
    flex: 1;
    justify-content: flex-end;
    color: $sub-color;

    &:before, &:after {
      content: "";
      position: relative;
    }
    &:before {
      height: 0;
      order: 1;
      border: solid transparent;
      background: transparent;
      border-width: 8px 12px;
      margin-right: -12px;
      border-left-color: currentColor;
    }
    &:after {
      transition: .3s;
      border: solid transparent;
      border-right-color: currentColor;
      border-width: 1px 12px;
      height: 4px;
    }
    &:hover:after {
      border-left-color: currentColor;
      border-right-color: transparent;
      margin: {
        left: 8px;
        right: -12px;
      }
    }
  }
  .blogBox {
    width: 300px;
    flex-shrink: 0;
  }
  .blogList {
    height: 340px;
    & > div {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .titleImage {
    width: 100%;
    height: 376.875px;
    background-color: $primary-color;
    background-image: url(~assets/image/null.png);
    color: white;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 1px 1px 20px -10px black;
    letter-spacing: 5px;
    border-radius: 8px;
    transition: height .3s, background .3s;
  }
  .titleImage:empty {
    /*background-color: transparent;*/
  }
  .body {
    white-space: pre-line;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 53px;
    opacity: .5;
    line-height: 1.3;
    width: 60%;
  }
  .category {
    &:before {
      content: "";
      height: 2px;
      width: 50px;
      border-radius: 1px;
      background: black;
      position: absolute;
      top: -20px;
    }
  }

  .btn-up-enter-active,
  .btn-up-leave-active,
  .btn-down-enter-active,
  .btn-down-leave-active {
    transition: .5s;
  }
  .btn-up-enter,
  .btn-up-leave-to,
  .btn-down-enter,
  .btn-down-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    height: 0;
    padding: 0;
    transform: translate3d(0, -10px, 0);
  }
  .btn-down-leave-to {
    transform: translate3d(0, 10px, 0);
  }

  .blog-temp-down-leave-active,
  .blog-temp-up-leave-active,
  .blog-down-enter-active,
  .blog-up-enter-active {
    transition: .5s;
  }
  .blog-temp-down-leave,
  .blog-temp-up-leave,
  .blog-down-enter-to,
  .blog-up-enter-tp {
    transform: translate3d(0, 0, 0);
  }
  .blog-temp-down-leave-to,
  .blog-up-enter {
    transform: translate3d(0, 30px, 0);
    opacity: 0;
  }
  .blog-temp-up-leave-to,
  .blog-down-enter {
    transform: translate3d(0, -30px, 0);
    opacity: 0;
  }

</style>
