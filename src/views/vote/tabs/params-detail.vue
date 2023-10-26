<script setup lang="ts">
import {useDetail} from "./hooks";
import {onMounted, reactive, ref} from "vue";
import {quesOne} from "@/api/ques";
import {surveyInsert, surveyUpdate} from "@/api/survey";
import {ElMessage, ElMessageBox} from "element-plus";

defineOptions({
  name: "TabParamsDetail"
});

const {initToDetail, getParameter} = useDetail();
const designerRef = reactive({id: null, value: [] });
const designerData = ref()
initToDetail("params");

function getForm() {
  // FcDesigner 生成的 JSON
  const jsonData = designerData.value.getRule();

  // 创建 FormDesign 对象
  const formDesign = {
    id: designerRef.id ?? null, // 你可以设置一个默认值或者从其他地方获取
    value: jsonData
  };

  // 将 FormDesign 对象转换为 JSON 字符串
  const formDesignJSON = JSON.stringify(formDesign);
  surveyInsert(formDesignJSON);
  console.log(formDesignJSON);
}

onMounted(async () => {
  quesOne(<string>getParameter.id).then(res => {
    designerRef.id = res.id;
    designerRef.value = res.value;
    designerData.value.setRule(designerRef.value);
    designerData.value.removeMenu("layout");
    designerData.value.removeMenuItem("upload");
    designerData.value.removeMenuItem("number");
    designerData.value.removeMenuItem("color");
    designerData.value.removeMenuItem("cascader");
    designerData.value.removeMenuItem("transfer");
    designerData.value.removeMenuItem("tree");
    designerData.value.removeMenuItem("slider");
    designerData.value.removeMenuItem("switch");
  });
});

const sendForm = () => {
  ElMessageBox.confirm(
      '是否修改数据？',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        // FcDesigner 生成的 JSON
        const jsonData = designerData.value.getRule();

        // 创建 FormDesign 对象
        const formDesign = {
          id: designerRef.id ?? null, // 你可以设置一个默认值或者从其他地方获取
          value: jsonData
        };

        // 将 FormDesign 对象转换为 JSON 字符串
        const formDesignJSON = JSON.stringify(formDesign);
        surveyUpdate(formDesignJSON);
        console.log(formDesignJSON);
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消',
        })
      })
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 编辑器组件，采用开源的 </span>
        <el-button @click="sendForm">提交数据</el-button>
      </div>
    </template>
    <fc-designer ref="designerData" />
  </el-card>
</template>
