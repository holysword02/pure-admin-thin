<script setup lang="ts">
import { onMounted, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { studentList } from "@/api/account";

//TODO 表单信息
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    username: null,
    name: "",
    sex: null,
    birthday: null,
    phone: "",
    email: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const options = ref();

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
onMounted(async () => {
  studentList().then(r => {
    options.value = r;
  });
});
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="92px"
  >
    <el-form-item label="学生账号：" prop="username">
      <el-select
        v-model="newFormInline.username"
        clearable
        filterable
        placeholder="请选择账号"
      >
        <el-option
          v-for="item in options"
          :key="item.username"
          :label="item.username"
          :value="item.username"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="学生姓名：" prop="name">
      <el-input
        v-model="newFormInline.name"
        placeholder="请输入姓名"
        clearable
      />
    </el-form-item>

    <el-form-item label="学生性别：" prop="sex">
      <el-select v-model="newFormInline.sex" placeholder="请选择性别" clearable>
        <el-option label="男" :value="1" />
        <el-option label="女" :value="0" />
      </el-select>
    </el-form-item>

    <el-form-item label="出生日期：" prop="birthday">
      <el-date-picker
        v-model="newFormInline.birthday"
        type="date"
        placeholder="请选择出生日期"
      />
    </el-form-item>

    <el-form-item label="手机号：" prop="phone">
      <el-input
        v-model="newFormInline.phone"
        placeholder="请输入手机号"
        clearable
      />
    </el-form-item>

    <el-form-item label="邮箱：" prop="email">
      <el-input
        v-model="newFormInline.email"
        placeholder="请输入邮箱"
        clearable
      />
    </el-form-item>
  </el-form>
</template>
