<template>
  <transition name="move">
    <div class="foodDetail" v-show="showFlag" ref="foodWrapper">
      <!--为better-scroll多加一层div-->
      <div>
        <!--脑袋上的大图-->
        <div class="image-header">
          <img :src="food.image" alt="大图">
          <div class="back" @click="showFlag = false">
            <span class="icon-left">&lt;</span>
          </div>
        </div>
        <!--商品信息-->
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :eventHub="eventHub" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <split></split>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import split from '../split/split'
  export default {
    name: 'food-detail',
    props: {
      food: {
        type: Object
      },
      eventHub: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      // 展示该页面，被外部调用
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodWrapper, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      // 添加购物车
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        this.eventHub.$emit('cart-add', event.target) // 将点击的节点用派发事件的方式发送出去
        Vue.set(this.food, 'count', 1)
      }
    },
    components: {
      cartcontrol,
      split
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .foodDetail{
    position: fixed
    top:0;
    bottom: 48px;
    left: 0;
    z-index: 30;
    width: 100%;
    background: #fff;
    transition: all 0.3s linear
    &.move-enter, &.move-leave-active {
      transform: translate3d(100%, 0, 0)
    }
    .image-header{
      position: relative
      width: 100%;
      height: 0;
      padding-top 100%
      img{
        position: absolute
        top:0;
        left:0;
        width: 100%;
        height: 100%
      }
      .back {
        position: absolute
        top: 10px;
        left: 0
        .icon-left {
          display: block
          padding: 10px;
          font-size: 20px;
          color: #fff
        }
      }
    }
    /*商品信息*/
    .content {
      position: relative;
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27)
      }
      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
        .sell-count, .rating {
          font-size: 10px;
          color: rgb(147, 153, 159)
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        font-weight: 700px
        line-height: 24px;
        .now {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20)
        }
        .old {
          text-decoration: line-through
          font-size: 10px;
          color: rgb(147, 153, 159)
        }
      }
      .cartcontrol-wrapper {
        position: absolute
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box
        border-radius: 12px;
        font-size: 10px;
        color: #fff
        background: rgb(0, 160, 220)
        transition: all 0.2s
        &.fade-enter-active {
          opacity: 0
        }
      }
    }
  }
</style>
