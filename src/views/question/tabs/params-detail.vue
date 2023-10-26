<script setup lang="tsx">
import { useDetail } from "./hooks";
import { onMounted, reactive, ref } from "vue";
import { quesOne } from "@/api/ques";
import { surveyoneUpdate } from "@/api/survey";
import { ElMessage, ElMessageBox } from "element-plus";
import { addDialog } from "@/components/ReDialog/index";

defineOptions({
  name: "TabParamsDetail"
});

const { initToDetail, getParameter } = useDetail();
const designerRef = reactive({ id: null, value: [] });
const designerData = ref();
initToDetail("params");
const ruleData = ref(null);
const options = {
  form: {
    labelPosition: "top",
    size: "large",
    labelWidth: "125px",
    hideRequiredAsterisk: false,
    showMessage: true,
    inlineMessage: false
  },
  submitBtn: true,
  resetBtn: true
};
async function test2() {
  await quesOne(getParameter.id).then(res => {
    designerRef.id = res.id;
    designerRef.value = res.value;
    designerData.value.setOption(options);
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
}

const sendForm = () => {
  ElMessageBox.confirm("是否修改数据？", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
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
      surveyoneUpdate(formDesignJSON);
      ElMessage({
        type: "success",
        message: "修改成功"
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消"
      });
    });
};
function onBaseClick() {
  // 在这里获取 getRule 的数据并设置到 ruleData
  ruleData.value = designerData.value.getRule();
  // 使用 addDialog 弹出带有 getRule 数据的弹框
  addDialog({
    title: "导出数据",
    contentRenderer: () => (
      <div>
        <pre>{JSON.stringify(ruleData.value, null, 2)}</pre>
      </div>
    ) // 在弹框内容中显示 getRule 数据
  });
}
// 创建 ref 来存储输入框的值和控制对话框的显示
const inputDialogVisible = ref(false);
const inputValue = ref(null);
const openInputDialog = () => {
  // 打开输入框对话框
  inputDialogVisible.value = true;
};
const setDesignerValue = () => {
  const formDesignJSON = JSON.parse(inputValue.value);
  // 设置 designerRef 的值为输入框的值
  designerData.value.setRule(formDesignJSON);
  console.log(formDesignJSON);
  console.log(inputValue.value);
  // 关闭输入框对话框
  inputDialogVisible.value = false;
};
onMounted(async () => {
  await test2();
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 编辑器组件，采用开源的 </span>
        <el-button @click="sendForm">提交数据</el-button>
        <el-button @click="onBaseClick"> 导出数据 </el-button>
        <el-button @click="openInputDialog">导入数据</el-button>
      </div>
    </template>
    <fc-designer ref="designerData" />
    <!-- 输入框对话框 -->
    <el-dialog v-model="inputDialogVisible" title="导入数据">
      <!-- 输入框 -->
      <el-input
        v-model="inputValue"
        type="textarea"
        :rows="10"
        placeholder="请输入文本"
      />
      <span class="dialog-footer">
        <el-button @click="inputDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="setDesignerValue">确认</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
