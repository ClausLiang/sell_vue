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
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
  export default {
    name: 'vheader',
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .header{
    color: #fff;
    background: #000;
    /*商家信息*/
    .content-wrapper{
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
        }
      }
    }
  }
</style>
