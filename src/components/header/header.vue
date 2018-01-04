<template>
  <div class="header">
    <!--商家信息-->
    <div class="content-wrapper">
      <!--左侧图片-->
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <!--右侧信息-->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="detailShow = true">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon">&gt;</span>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin-wrapper" @click="detailShow = true">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon">&gt;</span>
    </div>
    <!--背景-->
    <div class="bigbackground">
      <img :src="seller.avatar" alt="bg" width="100%" height="100%">
    </div>
    <!--商家弹层详情-->
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon iconfont icon-close" @click="detailShow = false"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '@/components/header/star/star'
  export default {
    name: 'vheader',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/base.styl";
  .header{
    position: relative;
    color: #fff;
    background: rgba(7, 17, 27, 0.5)
    overflow: hidden
    /*商家信息*/
    .content-wrapper{
      position: relative;
      padding:24px 12px 18px 24px;
      font-size 0;
      /*图片*/
      .avatar{
        display: inline-block;
        vertical-align top;
        img{
          border-radius 2px;
        }
      }
      .content{
        display: inline-block;
        margin-left 16px;
        .title{
          margin: 2px 0 8px 0
          .brand{
            display: inline-block;
            vertical-align top;
            width: 30px;
            height: 18px;
            bg-image('brand')
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name{
            margin-left 6px;
            font-size 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description{
          margin-bottom 10px;
          font-size 12px;
          line-height:12px;
        }
        .support{
          .icon{
            display: inline-block;
            vertical-align top;
            width: 12px;
            height: 12px;
            margin-right 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              bg-image('decrease_1')
            }
            &.discount {
              bg-image('discount_1')
            }
            &.guarantee {
              bg-image('guarantee_1')
            }
            &.invoice {
              bg-image('invoice_1')
            }
            &.special {
              bg-image('special_1')
            }
          }
          .text{
            line-height: 12px;
            font-size 10px;

          }
        }
      }
      .support-count{
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 8px;
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0,0,0,0.2)
        text-align center;
        .count {
          font-size 10px
        }
        .icon {
          font-size: 10px
          margin-left: 3px
        }
      }
    }
    /*公告*/
    .bulletin-wrapper{
      position: relative;
      height: 28px;
      line-height:28px;
      padding: 0 22px 0 12px;
      white-space: nowrap
      overflow: hidden;
      -ms-text-overflow: ellipsis
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title{
        display: inline-block;
        vertical-align middle
        width:22px;
        height: 12px;
        bg-image('bulletin')
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text{
        margin: 0 4px;
        font-size 10px;
      }
      .icon{
        position: absolute
        right: 12px;
        top: 2px;
      }
    }
    /*背景*/
    .bigbackground{
      position: absolute
      top:0
      left: 0;
      width: 100%;
      height: 100%
      z-index: -1;
      filter: blur(10px)
    }
    /*商家详情弹层*/
    .detail{
      position: fixed
      z-index: 100
      top: 0;
      left: 0;
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      .detail-wrapper{
        width: 100%;
        min-height: 100%
        .detail-main{
          margin-top 64px;
          padding-bottom 64px;
          .name{
            line-height: 16px;
            text-align center;
            font-size 16px;
            font-weight 700;
          }
          .star-wrapper{
            margin-top 18px;
            padding: 2px 0;
            text-align center
          }
          .title{
            display: flex;
            width: 80%
            margin: 30px auto 24px auto
            .line{
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            }
            .text{
              padding: 0 12px;
              font-size 14px;
            }
          }
        }
      }
      .detail-close{
        position: relative
        width: 32px;
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
        color: #fff
      }
    }
  }
</style>
