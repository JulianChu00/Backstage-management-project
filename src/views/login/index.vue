<template>
  <div class="login-container">
    <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>
      <el-form-item prop="username">
        <el-icon
          :size="20"
          style="margin-left: 8px; margin-right: 8px; opacity: 0.5"
        >
          <UserFilled/>
        </el-icon>
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-icon
          :size="20"
          style="margin-left: 8px; margin-right: 8px; opacity: 0.5"
        >
          <Lock/>
        </el-icon>
        <el-input v-model="form.password" :type="passwordType" />
        <i
          :class="
            passwordType === 'password'
              ? 'iconfont el-icon-eye-close'
              : 'iconfont el-icon-eye'
          "
          @click="changeType"
        ></i>
      </el-form-item>
      <el-button type="primary" class="login-button" @click="handleLogin">
        {{ $t('login.btnTitle') }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons-vue'
// import { login } from '@/api/login'
import { useStore } from 'vuex'
const store = useStore()
const form = ref({
  username: 'admin',
  password: '123456'
})
const rules = ref({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' }
  ]
})
const formRef = ref(null)
const handleLogin = () => {
  formRef.value.validate(async (vaild) => {
    if (vaild) {
      try {
        store.dispatch('app/login', form.value)
      } catch (error) {
        console.error('登录失败:', error.message) // 兜底，防止控制台报红
      }
    } else {
      console.log('error submit')
      return false
    }
  })
}
const passwordType = ref('password')
const changeType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
:deep(.el-input__wrapper) {
  background-color: transparent;
  box-shadow: transparent;
  width: 100%;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      background: transparent;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }
  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
