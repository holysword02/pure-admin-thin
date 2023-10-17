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
    email: "",
    classId: null
  }),
  classList: null
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const states = ref(props.classList);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });

//远程查询
const list1 = states.value.map((item): ListItem => {
  return { value: item.id, label: `${item.id}:${item.name}` };
});

interface ListItem {
  value: string;
  label: string;
}

const options1 = ref<ListItem[]>([]);
const loading1 = ref(false);

const remoteMethod = (query: string) => {
  if (query !== "") {
    loading1.value = true;
    setTimeout(() => {
      loading1.value = false;
      options1.value = list1.filter(item => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options1.value = [];
  }
};
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="92px"
  >
    <el-form-item label="学生账号：" prop="username">
      <el-input
        v-model="newFormInline.username"
        placeholder="请输入账号"
        clearable
      />
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

    <el-form-item label="班级：" prop="classId" style="font-weight: 700">
      <el-select-v2
        v-model="newFormInline.classId"
        style="width: 240px; font-weight: 400"
        filterable
        remote
        :remote-method="remoteMethod"
        clearable
        :options="options1"
        :loading="loading1"
        placeholder="请输入班级"
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

<style>
.el-form-item__label {
  font-weight: 700;
}
</style>
