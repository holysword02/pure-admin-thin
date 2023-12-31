<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAccount } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { useDetail } from "@/views/question/tabs/hooks";
import { useDetail1 } from "@/views/question/statistic/hooks";
import { storageSession } from "@pureadmin/utils";
import { DataInfo, sessionKey } from "@/utils/auth";

defineOptions({
  name: "Student"
});

const formRef = ref();
const tableRef = ref();

const {
  form,
  loading,
  columns,
  dataList,
  selectedNum,
  pagination,
  onSearch,
  resetForm,
  onbatchDel,
  openDialog,
  handleDelete,
  handleSizeChange,
  onSelectionCancel,
  handleCurrentChange,
  handleSelectionChange
} = useAccount(tableRef);
const { toDetail, router } = useDetail();
const { toDetail1, router1 } = useDetail1();
const role = ref("");
onMounted(async () => {
  const userInfo = await storageSession().getItem<DataInfo<number>>(sessionKey);
  role.value = userInfo.roles[0];
});
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="学生账号：" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户账号"
          clearable
          class="!w-[160px]"
        />
      </el-form-item>
      <el-form-item label="学生姓名：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入姓名"
          clearable
          class="!w-[160px]"
        />
      </el-form-item>
      <el-form-item label="学生性别：" prop="sex">
        <el-select
          v-model="form.sex"
          placeholder="请选择"
          clearable
          class="!w-[160px]"
        >
          <el-option label="男" :value="1" />
          <el-option label="女" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar title="调查问题管理" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button
          v-if="role === '0'"
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="router.push({ name: 'NewSurvey' })"
        >
          新增问题
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <div
          v-if="selectedNum > 0"
          v-motion-fade
          class="bg-[var(--el-fill-color-light)] w-full h-[46px] mb-2 pl-4 flex items-center"
        >
          <div class="flex-auto">
            <span
              style="font-size: var(--el-font-size-base)"
              class="text-[rgba(42,46,54,0.5)] dark:text-[rgba(220,220,242,0.5)]"
            >
              已选 {{ selectedNum }} 项
            </span>
            <el-button type="primary" text @click="onSelectionCancel">
              取消选择
            </el-button>
          </div>
          <el-popconfirm title="是否确认删除?" @confirm="onbatchDel">
            <template #reference>
              <el-button v-if="role === '0'" class="mr-1" text type="danger">
                批量删除
              </el-button>
            </template>
          </el-popconfirm>
        </div>
        <pure-table
          row-key="id"
          ref="tableRef"
          adaptive
          align-whole="center"
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @selection-change="handleSelectionChange"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #operation="{ row }">
            <el-button
              v-if="role === '0'"
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="toDetail({ id: row.fieldId }, 'params')"
            >
              问卷修改
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="
                toDetail1(
                  { surveyId: row.id, statisticId: row.statisticId },
                  'query'
                )
              "
            >
              查看统计
            </el-button>
            <el-button
              v-if="role === '0'"
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('编辑', row)"
            >
              状态修改
            </el-button>
            <el-popconfirm
              :title="`是否确认删除用户编号为${row.id}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  v-if="role === '0'"
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

:deep(.el-button:focus-visible) {
  outline: none;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
