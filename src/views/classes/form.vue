<script setup lang="ts">
import { onMounted, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { teacherList } from "@/api/account";

//TODO 表单信息
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    name: ""
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
  teacherList().then(r => {
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
    <el-form-item label="班级id：" prop="id">
      <el-input
        v-model="newFormInline.id"
        placeholder="请输入班级id"
        clearable
      />

    </el-form-item>

    <el-form-item label="班级名：" prop="name">
      <el-input
        v-model="newFormInline.name"
        placeholder="请输入班级名"
        clearable
      />
    </el-form-item>

  </el-form>
</template>
