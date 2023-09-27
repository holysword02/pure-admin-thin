<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

//TODO 表单信息
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    label: null,
    parentId: "",
    isActive: null,
    subjectId: null,
    subjectName: "",
    orderBy: null
  }),
  options: null
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const optionRef = ref();
const options = ref(props.options);

function getRef() {
  return ruleFormRef.value;
}

function handleBlur() {
  newFormInline.value.subjectName = optionRef.value.selectedLabel;
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
    <el-form-item label="内容：" prop="label">
      <el-input
        v-model="newFormInline.label"
        placeholder="请输入内容"
        clearable
      />
    </el-form-item>

    <el-form-item label="状态：" prop="isActive">
      <el-select
        v-model="newFormInline.isActive"
        placeholder="请选择状态"
        clearable
      >
        <el-option label="启用" :value="1" />
        <el-option label="停用" :value="0" />
      </el-select>
    </el-form-item>

    <el-form-item label="学科：">
      <el-select
        ref="optionRef"
        v-model="newFormInline.subjectId"
        placeholder="请选择学科"
        @blur="handleBlur"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
