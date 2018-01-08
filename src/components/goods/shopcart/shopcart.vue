<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon iconfont icon-gouwuche"></span>
          </div>
        </div>
        <div class="price"></div>
        <div class="desc"></div>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shopcart'
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
    background: #000
  }
</style>
