<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

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

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="92px"
  >
    <el-form-item label="教师账号：" prop="username">
      <el-input
        v-model="newFormInline.username"
        placeholder="请输入账号"
        clearable
      />
    </el-form-item>

    <el-form-item label="教师姓名：" prop="name">
      <el-input
        v-model="newFormInline.name"
        placeholder="请输入姓名"
        clearable
      />
    </el-form-item>

    <el-form-item label="教师性别：" prop="sex">
      <el-select v-model="newFormInline.sex" placeholder="请选择性别" clearable>
        <el-option label="男" :value="1" />
        <el-option label="女" :value="2" />
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
