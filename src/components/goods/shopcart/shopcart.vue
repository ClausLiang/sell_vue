<template>
  <div>
  <div class="shopcart">
    <!--购物车本体-->
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <span class="icon iconfont icon-gouwuche cheche"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalCount > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <!--购物车的小球-->
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <!--购物车列表详情-->
    <transition name="cartFold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food border-1px" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :eventHub="eventHub" :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade">
    <div class="list-mask" @click="fold = true" v-show="listShow"></div>
  </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  export default {
    name: 'shopcart',
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true // 折叠
      }
    },
    props: {
      eventHub: { // 事件中心，接收事件用的
        type: Object
      },
      selectFoods: {
        type: Array,
        default () {
          return [
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    created () {
      this.eventHub.$on('cart-add', (target) => {
        this.$nextTick(() => {
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i]
            if (!ball.show) {
              ball.show = true // 触发动画
              ball.el = target
              this.dropBalls.push(ball)
              return
            }
          }
        })
      })
    },
    methods: {
      beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect() // 获取元素相对于视口的位置
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
            el.style.transform = `translate3d(0, ${y}px, 0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            inner.style.transform = `translate3d(${x}px, 0, 0)`
          }
        }
      },
      enter (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight // 触发浏览器重绘
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)'
          el.style.transform = 'translate3d(0, 0, 0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0, 0, 0)'
          inner.style.transform = 'translate3d(0, 0, 0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      // 点击购物车本体，展开或折叠购物车列表详情
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      // 清空购物车
      empty () {
        this.selectFoods.forEach(food => {
          food.count = 0
        })
        console.log(this.selectFoods)
      },
      // 点击结算
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        alert(`支付${this.totalPrice}`)
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach(item => {
          total += item.price * item.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach(item => {
          count += item.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice > this.minPrice) {
          return 'enough'
        } else {
          return ''
        }
      },
      // 计算属性，计算购物车详情列表是否展示
      listShow () {
        // 初始，totalCount为0
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .shopcart{
    position: fixed;
    left: 0;
    bottom:0;
    z-index: 50
    width: 100%
    height: 48px;
    .content{
      display: flex;
      background: #141d27;
      font-size 0
      color: rgba(255,255,255,0.4)
      .content-left{
        flex:1;
        .logo-wrapper{
          display: inline-block;
          vertical-align top
          position: relative;
          top: -10px
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box
          border-radius 50%;
          background: #141d27;
          .logo{
            width: 100%
            height: 100%
            border-radius 50%;
            text-align center
            background: #2b343c;
            &.highlight{
              background: rgb(0, 160, 220)
              .cheche{
                color: #fff;
              }
            }
            .cheche{
              line-height: 44px;
              font-size 24px;
              color: #80858a;
            }
          }
          .num{
            position: absolute;
            top:0;
            right:0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            border-radius 16px;
            text-align center
            font-size 9px;
            font-weight 700
            color: #fff;
            background: rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          }
        }
        /*总价*/
        .price{
          display: inline-block;
          vertical-align top;
          margin-top 12px;
          line-height: 24px;
          padding-right 12px;
          box-sizing: border-box
          border-right 1px solid rgba(255,255,255,0.1)
          font-size 16px;
          font-weight 700
          &.highlight{
            color: #fff;
          }
        }
        .desc{
          display: inline-block;
          vertical-align top
          margin 12px 0 0 12px;
          line-height:24px;

          font-size 10px;
        }
      }
      .content-right{
        flex: 0 0 105px;
        width: 105px;
        .pay{
          height 48px;
          line-height: 48px;
          text-align center
          font-size 12px;
          font-weight 700
          background: #2b333b;
          &.enough{
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container{
      .ball{
        position: fixed
        left: 32px;
        bottom: 22px;
        z-index: 200;
        &.drop-enter-active {
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.4s linear
          }
        }
      }
    }
    /*购物车详情列表*/
    .shopcart-list{
      position: absolute
      bottom: 48px;
      left:0;
      z-index: -1
      width: 100%;
      transition: all 0.5s
      &.cartFold-enter, &.cartFold-leave-active {
        transform: translate3d(0, 100%, 0)
      }
      /*头*/
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27)
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220)
        }
      }
      /*列表区*/
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden
        background: #fff
        .food {
          position: relative
          padding: 12px 0;
          box-sizing: border-box;
          border-1px(rgba(7, 17, 27, 0.1))
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27)
          }
          .price {
            position: absolute
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700
            color: rbg(240, 20, 20)
          }
          .cartcontrol-wrapper {
            position: absolute
            right: 0
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask {
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    background: rgba(7, 17, 27, 0.6)
    transition: all 0.5s
    &.fade-enter, &.fade-leave-active {
      opacity: 0
      background: rgba(7, 17, 27, 0)
    }
  }
</style>
