<template>
  <div class="article-list">
    <van-pull-refresh
    v-model="isPullDownLoading"
    @refresh="onRefresh"
    success-text="refreshSuccessText"
    @success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <van-cell
        v-for="(article, index) in articles"
        :key="index"
        :title="article.title"
      />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false, // 控制加载中的loding状态
      finished: false, // 控制加载结束的状态，当加载结束后不再触发loding事件
      timestamp: null, // 获取下一页数据的时间戳
      isPullDownLoading: false, // 下拉刷新的 loading
      refreshSuccessText: '' // 下拉刷新成功的提示
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      // 2.把数据放到list中去
      const { results } = data.data
      this.articles.push(...data.data.results)
      // 3.设置本次加载状态结束，他才可以判断是否需要家在下一次，否则就会永远停在那里
      this.loading = false
      // 4.数据全部加载完成
      if (results.length) {
        // 更新下一页数据
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没哟数据了，把加载状态设置结束，不再触发加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新

      // 1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(),
        with_top: 1
      })

      // 2.把数据放到数据列表中
      const { results } = data.data
      this.articles.unshift(...results)

      // 3. 关闭刷新状态
      this.isPullDownLoading = false

      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
