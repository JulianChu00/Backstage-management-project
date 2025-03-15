<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          v-model="queryForm.query"
          :placeholder="$t('table.placeholder')"
          clearable
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUsers">
        {{
          $t('table.search')
        }}
      </el-button>
      <el-button type="primary" @click="hanldeDialogValue()">
        {{
          $t('table.adduser')
        }}
      </el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        v-for="(item, index) in options"
        :key="index"
        :width="item.width"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
      >
        <!-- v-slot:row 是"我要把内容放在名为row的插槽中" -->
        <!-- v-slot="{ row }" 是"我要从子组件获取数据，并用row变量接收其中的row属性" -->
        <!-- 这里的template是父组件其实,el-table-coolumn是子组件,里面集成了:row属性,所以可以通过v-slot="{ row }"获取到子组件的数据 -->
        <template v-if="item.prop === 'mg_state'" #default="{ row }">
          <el-switch v-model="row.mg_state" @change="changeState(row)" />
        </template>
        <template v-else-if="item.prop === 'create_time'" #default="{ row }">
          {{ $filters.filterTimes(row.create_time) }}
        </template>
        <template v-else-if="item.prop === 'action'" #default="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="hanldeDialogValue(row)"
          ></el-button>
          <el-button type="warning" size="small" :icon="Setting"></el-button>
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            @click="delUser(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
      :page-sizes="[2, 5, 10, 15]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <Dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :dialog-title="dialogTitle"
    :dialog-title-value="dialogTitleValue"
    @init-get-users="initGetUsers"
  />
  <!-- 使用v-if保证dialog点击取消再次进入时值为空,v-if重新渲染 -->
</template>

<script setup>
import {
  Delete,
  Edit,
  Search,
  Setting,
  Share,
  Upload
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { getUsers, changeUserState, deleteUser } from '@/api/users'
import { options } from './options'
import { useI18n } from 'vue-i18n'
import Dialog from './components/dialog.vue'
import { isNull } from '@/utils/filters'
const dialogTitle = ref('')
const dialogTitleValue = ref({})
const i18n = useI18n()
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
const total = ref(0)
const tableData = ref([])
const initGetUsers = async () => {
  const res = await getUsers(queryForm.value)
  total.value = res.total
  tableData.value = res.users
}
initGetUsers()
// Element Plus 会自动传递参数。
const handleSizeChange = (pageSize) => {
  // console.log(`${val} items per page`)
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUsers()
}
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUsers()
}
const changeState = async (info) => {
  await changeUserState(info.id, info.mg_state)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success'
  })
}
const dialogVisible = ref(false)
const hanldeDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加用户'
    dialogTitleValue.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogTitleValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true
}
const delUser = (row) => {
  ElMessageBox.confirm(i18n.t('dialog.deleteTitle'), 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await deleteUser(row.id)
      initGetUsers()
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
::v-deep(.el-pagination) {
  padding-top: 16px;
  box-sizing: border-box;
  justify-content: flex-end;
}
</style>
