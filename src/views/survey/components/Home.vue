<script setup lang="ts">
import { ref } from "vue";
defineOptions({
  name: "FormDesign"
});
const designerRef = ref();
const FcDesignerRule = ref();
function getForm() {
  //FcDesigner 生成的`JSON`
  FcDesignerRule.value = designerRef.value.getRule();
}
</script>
<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          编辑器组件，采用开源的
        </span>
        <el-button @click="getForm">Generate JSON</el-button>
        <pre>{{ FcDesignerRule }}</pre>
      </div>
    </template>
    <fc-designer ref="designerRef" />
  </el-card>
</template>
