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
    validate-first
    ref="login-form"
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
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
          v-if="isCountDownShow"
          :time="1000 * 60"
          format="ss s"
          @finish="isCountDownShow = false"
          />
          <van-button
          v-else
          class="send-btn"
          size="mini"
          round
          :loading="isSendSmsloading"
          @click.prevent="onsendSms"
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
import { login, sendSms } from '@/api/user'
// import { CountDown } from 'vant'
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
      },
      isCountDownShow: false, // 控制倒计时的和发送按钮的状态
      isSendSmsloading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登陆中。。。' // 提示文本
        // forbidClick: true, // 禁止背景点击
        // duration: 1 // 展示时常
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登陆
      try {
        const { data } = await login(this.user)
        // 4.处理响应结果
        console.log(data)
        // console.log(123)
        this.$toast.success('登陆成功')

        // 将后端返回的用户登陆状态（ token等数据 ）放到vuex容器中
        this.$store.commit('setUser', data.data)

        // 登录成功弄跳转回原来的页面
        this.$router.back() //
      } catch (err) {
        this.$toast.fail('登陆失败,手机号验证码错误')
        console.log(err)
      }
    },

    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示信息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
    },

    async onsendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过发送验证码
        await sendSms(this.user.mobile)

        // 短信发出后倒计时
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        // try里面任何代码的错误都会进入catch
        // 不通的错误需要有不通的提示，那就需要判断了

        // 提示用户
        this.$toast({
          message, // 提示信息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
      // 校验手机号码
      // this.$refs['login-form'].validate('mobile').then(data => {
      //   console.log(data)
      // })
      // 验证通过 -> 发送验证码 - > 用户接受短信 -> 输入验证码
      // -> 请求登陆
      // 请求发送验证码 -> 隐藏发送按钮 ， 显示倒计时
      // 倒计时结束 -> 隐藏倒计时， 时间发送按钮
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
