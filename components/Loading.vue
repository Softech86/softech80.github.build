<template>
  <div class="rltv flex flv flyc">
    <div class="panrose" ref="panrose">
      <div class="surface" v-for="(_, i) in Array(4)" :key="i"></div>

      <!--<div class="block"></div>-->
    </div>
    <div class="text">Loading</div>
    <!--<script src="https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js"></script>-->
  </div>
</template>

<script>
  export default {
    // props: {
    //   width: {
    //     type: [String, Number],
    //     default: 100
    //   },
    //   height: {
    //     type: [String, Number],
    //     default: 100
    //   },
    //   full: {
    //     type: Boolean,
    //     default: false
    //   }
    // },
    // computed: {
    //   clazz () {
    //     return this.full ? 'logo-full' : ''
    //   },
    //   //   style () {
    //   //     return {
    //   //       width: this.width + 'px',
    //   //       height: this.height + 'px'
    //   //     }
    //   //   }
    // },
    // mounted () {
    //   window.p = this.$refs.panrose
    //
    //   // const ani = this.$refs.panrose.animate({
    //   //   transform: ['rotateZ(0)', 'rotateZ(-90deg)'],
    //   // }, {
    //   //   direction: 'alternate',
    //   //   duration: 250,
    //   //   endDelay: 100,
    //   //   easing: 'ease-in-out'
    //   // })
    //   //
    //   //   ani.onfinish = function () {
    //   //   console.log(this)
    //   // }
    //
    // }
  }
</script>

<style lang="scss" scoped>

  @mixin panroseStyle($height, $width, $long, $space, $deg: 0) {

    $w: $width + $height + $long + $space * 2;
    width: $w;
    height: $w;
    position: relative;
    transform: rotateZ($deg);
    animation: rotate .8s infinite;
    animation-fill-mode: forwards;

    @keyframes rotate {
      0% {
        transform: rotateZ(0);
      }
      90%, 100% {
        transform: rotateZ(90deg);
      }
    }



    .surface {
      position: absolute;
      width: $long - $width;
      height: $long - $height + $space;
      border: solid currentColor;
      border-width: $height 0 0 $width;
      margin-bottom: $height;

      &:before {
        content: "";
        position: absolute;
        width: 0;
        height: $long - $height;
        top: -$height + $space;
        left: -$width * 2;
        border: solid transparent;
        border-width: $height $width;
        border-right-color: currentColor;
      }
    }
    .surface:nth-child(1) {
      bottom: 0;
      left: 0;
    }
    .surface:nth-child(2) {
      top: -$space / 2;
      left: $height + $space / 2;
      transform: rotateZ(90deg)
    }
    .surface:nth-child(3) {
      top: $height;
      right: 0;
      transform: rotateZ(180deg)
    }
    .surface:nth-child(4) {
      bottom: -$height - $space / 2;
      right: $height + $space / 2;
      transform: rotateZ(-90deg)
    }
  }

  $height: 10px;
  $width: 8px;
  $long: 50px;
  $space: 2px;
  .panrose {
    @include panroseStyle($height, $width, $long, $space, 0);
  }

  .text {
    text-align: center;
    margin-top: 1em;
  }

  /*.t {
    @include panroseStyle($width + 5px, $height - 5px, $long, $space, -90deg);
  }

  .block {
    position: absolute;
    width: 20px;
    height: 40px;
    top: -20px;
    left: 20px;
    transition: 1s;
    background: khaki;
    animation: move 2.5s 1;
    animation-fill-mode: forwards;
  }

  @keyframes move {
    0% {
      width: 20px;
      height: 40px;
      top: -20px;
      left: 20px;
    }
    40% {
      width: 40px;
      height: 20px;
      top: 0;
      left: 350px;
    }
    50% {
      width: 40px;
      height: 20px;
      top: 25px;
      left: 360px;
    }
  }*/
</style>
