<template>
  <!-- 使用model-value是单向绑定,v-model是只有自定义组件才可以,element是封装好的组件 -->
  <el-dialog
    :model-value="modelValue"
    :title="dialogTitle"
    width="500"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      label-width="auto"
      style="max-width: 600px"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item
        v-if="dialogTitle === '添加用户'"
        label="密码"
        prop="password"
      >
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { addUser, editUser } from '@/api/users'
import { defineEmits, defineProps, ref, watch } from 'vue'
// import i18n from '@/i18n'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
import { ElMessage } from 'element-plus'
const props = defineProps(['modelValue', 'dialogTitle', 'dialogTitleValue'])
const emit = defineEmits(['update:modelValue', 'initGetUsers'])
const handleClose = () => {
  emit('update:modelValue', false)
}

const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})
const rules = ref({
  username: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '输入正确邮箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  mobile: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    },
    {
      pattern: /^1[3-9]\d{9}$/
    }
  ]
})
watch(
  () => props.dialogTitleValue,
  () => {
    form.value = props.dialogTitleValue
  },
  { deep: true, immediate: true }
)
const formRef = ref(null)
const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      // alert('submit!')
      props.dialogTitle === '添加用户'
        ? await addUser(form.value)
        : await editUser(form.value)
      handleClose()
      ElMessage({
        message: i18n.t('message.updeteSuccess'),
        type: 'success'
      })
      emit('initGetUsers')
    } else {
      console.error('error submit!!')
      return false
    }
  })
}
</script>

<style></style>
