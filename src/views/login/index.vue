<template>
  <div class="login-container">
    <van-nav-bar
    class="app-nav-bar"
      title="注册/登陆"
      left-arrow
      @click-left="$router.back()"
    />

  <!-- 登陆表单 -->
    <!--
      基于van=form 组件包裹所有的表单项  vanfield
      给form 注册submit时间，当表单提交时触发
     -->
    <van-form
    :show-error="false"
    :show-error-message="false"
    @submit="onLogin"
    @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-button
          class="send-btn"
          size="mini"
          round
        >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
        type="info"
        block
        @click="onLogin"
        >登陆</van-button>
    </div>
    </van-form>
  <!-- /登陆表单 -->

  </div>

</template>

<script>
import { login } from '@/api/user'

// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登陆
      try {
        const { data } = await login(this.user)

        // 4.处理响应结果
        this.$toast.success('登陆成功')

        // 将后端返回的用户登陆状态（ token等数据 ）放到vuex容器中
        this.$store.commit('setUser', data.data)
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败,手机号验证码错误')
      }
    }
  },

  onFailed (error) {
    if (error.errors[0]) {
      this.$toast({
        message: error.errrors[0].message, // 提示信息
        position: 'top'
      })
    }
  }

}
</script>
<style scoped lang="less">
.login-container {
  .send-btn {
        width: 76px;
        height: 23px;
        background-color: #ededed;
        .van-button__text {
          color: #666;
          font-size: 11px;
        }
    }
  .login-btn-wrap {
  padding:26px 16px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
    .van-button__text {
      font-size: 15px;
     }
   }
 }
}
</style>
