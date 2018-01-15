<template>
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
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
        dropBalls: []
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
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
  }
</style>
