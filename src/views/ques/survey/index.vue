<script setup lang="ts">
import { ref } from "vue";
import { useAccount } from "../utils/hook";
import { surveyInsert } from "@/api/survey";
defineOptions({
  name: "FormDesign"
});
const quesId = ref("");
const quesValue = ref("");
const designerRef = ref();
const FcDesignerRule = ref();
useAccount(quesId, quesValue);

function setForm() {
  designerRef.value.setRule(quesValue.value);
}
function getForm() {
  // FcDesigner 生成的 JSON
  const jsonData = designerRef.value.getRule();

  // 创建 FormDesign 对象
  const formDesign = {
    id: null, // 你可以设置一个默认值或者从其他地方获取
    value: jsonData
  };

  // 将 FormDesign 对象转换为 JSON 字符串
  const formDesignJSON = JSON.stringify(formDesign);
  surveyInsert(formDesignJSON);
  console.log(formDesignJSON);
}
</script>
<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 编辑器组件，采用开源的 </span>
        <el-button @click="getForm">Generate JSON</el-button>
        <pre>{{ FcDesignerRule }}</pre>
      </div>
    </template>
    <fc-designer ref="designerRef" />
  </el-card>
</template>
