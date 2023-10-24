<script setup>
import formCreate from "@form-create/element-ui";
import { onMounted, reactive, ref } from "vue";
import { quesOne } from "@/api/ques";
import { useDetail } from "./hooks";
import { surveyFind, surveyInsert, surveyUpdate } from "@/api/survey";
import { ElMessage, ElMessageBox } from "element-plus";
import { voteUpdate } from "@/api/vote";

defineOptions({
  name: "newVote"
});

const { initToDetail, getParameter } = useDetail();
initToDetail("query");

const options = {
  onSubmit: formData => {
    ElMessageBox.confirm("是否提交当前数据?", "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning"
    })
      .then(() => {
        const data = {
          id: getParameter.id,
          value: formData
        };
        voteUpdate(data);
        ElMessage({
          type: "success",
          message: "提交成功"
        });
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消"
        });
      });
  }
  //   const data = {
  //     id: getParameter.id,
  //     value: formData
  //   };
  //   console.log(data);
  //   voteUpdate(data).then(res => {
  //     if (res.code === 200) {
  //       ElMessage.success("修改成功");
  //     } else {
  //       ElMessage.error("修改失败");
  //     }
  //   });
  // },
  // resetBtn: true
};
const states = ref();
const rule = ref();
async function test2() {
  states.value = await surveyFind(getParameter.surveyId);
  rule.value = states.value.value;
}
onMounted(() => {
  test2();
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 编辑器组件，采用开源的 </span>
      </div>
    </template>
    <FormCreate :rule="rule" v-model:option="options" />
  </el-card>
</template>
