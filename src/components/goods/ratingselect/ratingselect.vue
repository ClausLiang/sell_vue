<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" @click="selectHandle(2, $event)" :class="{'active':mySelectType===2}">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="selectHandle(0, $event)"  :class="{'active':mySelectType===0}">
        {{desc.positive}}<span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" @click="selectHandle(1, $event)"  :class="{'active':mySelectType===1}">
        {{desc.negative}}<span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggleContent" :class="{'on':myOnlyContent}">
      <span class="icon iconfont icon-duigou switch-icon"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default {
    name: 'ratingselect',
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data () {
      return {
        // 为啥要申明这两变量呢，因为props传进来的值修改会报错
        mySelectType: this.selectType,
        myOnlyContent: this.onlyContent
      }
    },
    methods: {
      selectHandle (type, event) {
        if (!event._constructed) {
          return
        }
        this.mySelectType = type
        // 子组件向父组件传值要通过事件的方式
        this.$emit('ratingtypeSelect', type)
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        this.myOnlyContent = !this.myOnlyContent
        this.$emit('contentToggle', this.myOnlyContent)
      }
    },
    computed: {
      positives () {
        // 利用数组的filter方法来过滤数组
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .ratingselect{
    .rating-type {
      padding: 18px 0
      margin: 0 18px;
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block{
        display: inline-block
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93)
        &.active {
          color: #fff
        }
        .count {
          font-size: 8px;
          margin-left: 2px;
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2)
          &.active {
            background: rgb(0, 160, 220)
          }
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2)
          &.active {
            background: rgb(77, 85, 93)
          }
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on{
        .switch-icon {
          color: #00c850
        }
      }
      .switch-icon {
        display: inline-block
        vertical-align: top
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
</style>
