<script setup lang="tsx">
import { onMounted, reactive, ref } from "vue";
import { surveyInsert } from "@/api/survey";
import { ElMessage, ElMessageBox } from "element-plus";
import { subjectFindAll } from "@/api/subject";
import { addDialog } from "@/components/ReDialog";

defineOptions({
  name: "NewSurvey"
});
const ruleData = ref(null);
interface ListItem {
  value: string;
  label: string;
}
const options1 = {
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
const states = ref();
async function test2() {
  states.value = await subjectFindAll();
  const list = states.value.map((item): ListItem => {
    return {
      value: `${item.id}`,
      label: `${item.className}:${item.subjectName}(${item.teacherName})`
    };
  });
  options.value = list;
}

const options = ref<ListItem[]>([]);
const loading = ref(false);

const remoteMethod = (query: string) => {
  if (query !== "") {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 200);
  } else {
    options.value = [];
  }
};

const form = reactive({
  name: "",
  subjectId: "",
  endDate: ""
});

const designerData = ref();

onMounted(() => {
  test2();
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
const dialogFormVisible = ref(false);

const formLabelWidth = "140px";
const sendForm = () => {
  ElMessageBox.confirm("是否提交数据？", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      const newForm = {
        id: null,
        name: form.name,
        subjectId: form.subjectId,
        endDate: form.endDate,
        value: designerData.value.getRule()
      };
      surveyInsert(newForm);
      console.log(newForm);
      dialogFormVisible.value = false;
      ElMessage({
        type: "success",
        message: "提交成功"
      });
    })
    .catch(() => {
      dialogFormVisible.value = false;
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
onMounted(() => {
  designerData.value.setOption = options1;
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 编辑器组件，采用开源的 </span>
        <el-button @click="dialogFormVisible = true">提交数据</el-button>
        <el-button @click="onBaseClick"> 导出数据 </el-button>
        <el-button @click="openInputDialog">导入数据</el-button>
      </div>
    </template>
    <fc-designer ref="designerData" />
    <!-- Form -->
    <el-dialog v-model="dialogFormVisible" title="新建问卷">
      <el-form :model="form">
        <el-form-item label="问卷名:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学科:" :label-width="formLabelWidth">
          <el-select-v2
            v-model="form.subjectId"
            style="width: 240px"
            filterable
            remote
            :remote-method="remoteMethod"
            clearable
            :options="options"
            :loading="loading"
            placeholder="Please enter a keyword"
          />
        </el-form-item>
        <el-form-item label="结束时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.endDate"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="sendForm"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
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

<style>
.el-form-item__label {
  font-weight: 700;
}
</style>
