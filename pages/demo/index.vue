<template>
  <section class="mw1000 flex flv">
    <fei-nav />

    <!--<div class="fl1 flex flv flxc">-->
    <div class="flex fl1">

      <div class="ml15 mr20 flex flyc demoBox">
        <div class="btn" @click="prev">
          <transition name="btn-up">
            <div class="before" v-if="this.hasPrev">
              <div class="left"></div>
              <div class="right"></div>
            </div>
          </transition>
        </div>
        <div class="demoList rltv">
          <transition :name="down ? 'demo-temp-up' : 'demo-temp-down'">
            <div class="tempDemoListBox" v-if="showTempDemoList">
              <!-- ^ change to data: showTempDemo-->
              <div
                v-for="demo in tempDemoList"
                :key="demo.key"
                class="pt20 pb20"
              >
                <span class="editAt courier f16">{{demo.editAt}}</span>
                <!--<router-link :to="demo.url" class="title f20 ani2" @click.prevent="handleClick(selected === index, demo.url)">{{demo.title}}</router-link>-->
                <div class="title courier f20">{{demo.name}}</div>
              </div>
            </div>
          </transition>

          <transition :name="down ? 'demo-up' : 'demo-down'">
            <div class="demoListBox" v-if="showDemoList" ref="demoList">
              <div
                v-for="(demo, index) in demoList"
                :key="demo.key"
                class="pt20 pb20 demo"
                :class="{ selected: selected === index}"
                @mouseenter="$nextTick( () =>  { selected = index } )"
                @click="handleClick(selected === index, demo.url)"
              >
                <span class="editAt courier f16">{{demo.editAt}}</span>
                <!--<router-link :to="demo.url" class="title f20 ani2" @click.prevent="handleClick(selected === index, demo.url)">{{demo.title}}</router-link>-->
                <div class="title courier f20">{{demo.name}}</div>
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

      <!-- <div class="fl1 flex flv flxc flyst">
        <div class="body f14 mt50">{{demoSelected.body}}</div>
        <div class="mt40 rltv flex flxsb">
          <div class="category rltv courier-bold">
            {{demoSelected.category}}
          </div>
          <router-link :to="demoSelected.url" class="read flex flyc industry ml20 f14">Read</router-link>
        </div>

        <div class="titleImage mt20 flex" :style="titleImageStyle"  ref="titleImage">
          <span class="song f40 fl1 flex flxc flyc" v-if="!demoSelected.titleImage">{{demoSelected.title}}</span>
        </div> -->
      <!-- </div> -->

    </div>

  </section>
</template>

<script>
  import FeiNav from '~/components/Nav.vue'
  import demos from '~/demo/manifest.json'

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
        tempDemoList: [],
        showTempDemoList: false,
        showDemoList: true,

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
          // this.$router.push(url)
          window.location.href = url
        }
      },
      prev () {
        if (this.hasPrev) {
          this.down = false
          this.tempDemoList = this.demoList
          this.showDemoList = false
          this.showTempDemoList = true
          this.selected = 0
          this.page -= 1
          // this.$nextTick(() => {
          //   this.tempDemoList = []
          // })
          this.$nextTick(() => {
            this.showTempDemoList = false
          })
          setTimeout(() => {
            this.showDemoList = true
          }, 200)
        }
      },
      next () {
        if (this.hasNext) {
          this.down = true
          this.tempDemoList = this.demoList
          this.showDemoList = false
          this.showTempDemoList = true
          this.selected = 0
          this.page += 1
          this.$nextTick(() => {
            this.showTempDemoList = false
          })
          setTimeout(() => {
            this.showDemoList = true
          }, 200)
        }
      }
    },
    computed: {
      demos () {
        // return this.$store.state.demos
        return Object.keys(demos).map(x => Object.assign(demos[x], {key: x}))
      },
      demoList () {
        return this.demos.slice(this.page * 4, this.page * 4 + 4)
      },
      demoSelected () {
        return this.demoList[this.selected] || this.demoList[0]
      },
      titleImageStyle () {
        const titleImage = this.$refs.titleImage
        const url = this.demoSelected.titleImage
        return {
          backgroundImage: url && `url('/markdown/${url}')`,
          height: titleImage ? (titleImage.getBoundingClientRect().width * 9 / 16 + 'px') : ''
        }
      },
      maxPage () {
        return Math.ceil(this.demos.length / 4)
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
  .demo {
    opacity: .4;
    transition: opacity;
    cursor: pointer;
  }
  .tempDemoListBox {
    opacity: .4;
  }

  .btn {
    width: 50px;
    height: 2px;
    font-family: "Courier New", serif;
    padding: 15px 0;
    cursor: pointer;
    opacity: .4;
    transform: rotateZ(-90deg);
    flex: 1;

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
      margin-right: -1%;
    }
    .right {
      margin-left: -1%;
    }

    .after .left, .before .right {
      transform: rotateZ(5deg);
    }
    .after .right, .before .left {
      transform: rotateZ(-5deg);
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

  .selected, .demo:hover {
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
  .demoBox {
    flex: 1;
  }
  .demoList {
    height: 340px;
    flex: 1;
    margin: 40px 0;
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
    transform: translate3d(0, -10px,  0);
  }
  .btn-down-leave-to {
    transform: translate3d(0, 10px,  0);
  }

  .demo-temp-down-leave-active,
  .demo-temp-up-leave-active,
  .demo-down-enter-active,
  .demo-up-enter-active {
    transition: .5s;
  }
  .demo-temp-down-leave,
  .demo-temp-up-leave,
  .demo-down-enter-to,
  .demo-up-enter-tp {
    transform: translate3d(0, 0, 0);
  }
  .demo-temp-down-leave-to,
  .demo-up-enter {
    transform: translate3d(30px, 0, 0);
    opacity: 0;
  }
  .demo-temp-up-leave-to,
  .demo-down-enter {
    transform: translate3d( -30px, 0, 0);
    opacity: 0;
  }

</style>
