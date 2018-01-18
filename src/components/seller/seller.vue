<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <!--三块-->
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon iconfont icon-xin icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <!--公告-->
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="item in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <!--图片-->
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList"><!--这个ref是获取节点给它设置宽度-->
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../header/star/star'
  import split from '../goods/split/split'
  export default {
    name: 'seller',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: false
      }
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted () {
      this._initScroll() // 这个是路由切换使其滚动
      this._initPics()
    },
    watch: {
      'seller' () {
        this._initScroll() // 这个是刷新页面使其滚动,因为刷新页面的时候seller还没传过来
        this._initPics()
      }
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true
            })
          })
        } else {
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        }
      },
      _initPics () {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true, // 设置横向滚动
                eventPassthrough: 'vertical' // 忽略垂直滚动
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      },
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
      }
    },
    components: {
      star,
      split
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview {
      position: relative;
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 47)
        font-size 14px;
      }
      .desc {
        padding-bottom 18px;
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0
        .star {
          display: inline-block
          margin-right 8px;
          vertical-align top
        }
        .text {
          display: inline-block
          margin-right 12px;
          line-height: 18px;
          vertical-align top
          font-size 10px;
          color: rgb(77, 85, 93)
        }
      }
      /*三块*/
      .remark {
        display: flex
        padding-top: 18px;
        .block {
          flex: 1
          text-align center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child {
            border: none
          }
          h2 {
            margin-bottom 4px;
            line-height: 10px;
            font-size 10px;
            color: rgb(147, 153, 159)
          }
          .content {
            line-height 24px;
            font-size 10px;
            color: rgb(7, 17, 47)
            .stress {
              font-size 24px;
            }
          }
        }
      }
      .favorite {
        position: absolute
        right: 11px;
        top: 18px;
        width: 50px;
        text-align center
        .icon-favorite {
          display: block
          margin-bottom: 4px;
          color: #d4d6d9
          line-height: 24px;
          font-size 24px;
          &.active {
            color: rgb(240, 20, 20)
          }
        }
        .text {
          line-height: 10px;
          font-size 10px;
          color: rgb(77, 85, 93)
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px
      .title {
        margin-bottom: 8px;
        line-height 14px;
        color: rgb(7, 17, 27)
        font-size 14px;
      }
      .content-wrapper {
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content {
          line-height 24px;
          font-size 12px;
          color: rgb(240, 20, 20)
        }
      }
      .supports{
        .support-item {
          padding: 16px 12px;
          font-size 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child {
            border-none()
          }
          .icon {
            display: inline-block
            vertical-align top
            width: 16px
            height: 16px
            margin-right 6px
            background-size: 16px
            background-repeat no-repeat
            &.decrease {
              bg-image('decrease_4')
            }
            &.discount {
              bg-image('discount_4')
            }
            &.guarantee {
              bg-image('guarantee_4')
            }
            &.invoice {
              bg-image('invoice_4')
            }
            &.special {
              bg-image('special_4')
            }
          }
          .text {
            line-height: 16px;
            font-size 12px;
            color: rgb(7, 17, 27)
          }
        }
      }
    }
    .pics {
      padding: 18px
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 47)
        font-size 14px;
      }
      .pic-wrapper {
        width: 100%
        overflow: hidden
        white-space: nowrap /*不折行*/
        .pic-list {
          font-size 0
          .pic-item {
            display: inline-block
            margin-right 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin: 0
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px
      color: rgb(7, 17, 47)
      .title {
        padding-bottom: 12px;
        font-size 14px;
        line-height 14px;
        border-1px(rgba(7, 17, 27, 0.1))
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px;
        &:last-child {
          border-none()
        }
      }
    }
  }
</style>
