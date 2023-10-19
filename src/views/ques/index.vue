<script setup>
import formCreate from "@form-create/element-ui";
import {onMounted, ref} from "vue";
import {useAccount} from "./utils/hook";
import {quesFindAll} from "@/api/ques";

defineOptions({
  name: "Ques"
});
const FormCreate = formCreate.$form();
const quesId = ref("");
const quesValue = ref("");
const q = ref(false);
const rule1 = ref([]);
useAccount(quesId, quesValue);

const getForm = () => {
  q.value = true;
  for (const i in quesValue.value) {
    quesValue.value[i] = JSON.parse(quesValue.value[i]);
  }
  rule1.value = quesValue.value;
  console.log(quesValue.value);
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 编辑器组件，采用开源的 </span>
      </div>
    </template>
    <!-- 只有当 rule.value 有值时才渲染 FormCreate -->
    <FormCreate v-if="q" :rule="rule1" />
    <!-- 显示 rule 的值 -->

    <el-button @click="getForm" v-if="quesValue !== null"
      >Generate JSON
    </el-button>
    <pre v-if="q">{{ rule1 }}</pre>
  </el-card>
</template>
