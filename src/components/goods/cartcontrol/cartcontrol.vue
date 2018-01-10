<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon iconfont icon-jian" v-show="food.count>0" @click="decreaseCart"></div>
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
    .cart-decrease, .cart-add{
      display inline-block
      padding: 6px;
      line-height: 24px;
      font-size 24px;
      color: rgb(0, 160, 220)
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
    }
  }
</style>
