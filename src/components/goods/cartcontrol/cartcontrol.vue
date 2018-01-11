<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="icon iconfont icon-jian inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon iconfont icon-jia" @click="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart () {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol{
    font-size 0
    .cart-decrease{
      display inline-block
      padding: 6px;
      /*减号移动效果*/
      transition: all 0.4s linear
      &.move-enter, &.move-leave-active {
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner{
          transform: rotate(180deg)/*减号旋转效果*/
        }
      }
      .inner{
        display: inline-block;
        line-height: 24px;
        font-size 24px;
        color: rgb(0, 160, 220)
        transition: all 0.4s linear/*减号旋转效果*/
        transform: rotate(0)/*减号旋转效果*/
      }
    }
    .cart-count{
      display: inline-block
      vertical-align top;
      padding-top 6px;
      width: 12px;
      line-height: 24px;
      text-align center
      font-size 10px;
      color: rgb(147, 153, 159)
    }
    .cart-add{
      display inline-block
      padding: 6px;
      line-height: 24px;
      font-size 24px;
      color: rgb(0, 160, 220)
    }
  }
</style>
