<script setup lang="tsx">
import * as echarts from "echarts";
import { onMounted, reactive, ref } from "vue";
import { statisticFind } from "@/api/statistic";
import { useDetail1 } from "./hooks";
import { addDialog } from "@/components/ReDialog/index";

const { initToDetail, getParameter } = useDetail1();
initToDetail("query");
const number = ref(0);
const states = reactive({
  id: "",
  value: null
});
const charts = ref([]);
async function findone() {
  states.value = await statisticFind(
    getParameter.statisticId,
    getParameter.surveyId
  );
  number.value = states.value.value.filter(
    item => Object.keys(item.value).length <= 5
  ).length;
}
function onBaseClick() {
  addDialog({
    title: "导出数据",
    contentRenderer: () => (
      <div>
        <pre>{JSON.stringify(states.value, null, 2)}</pre>
      </div>
    ) // 在弹框内容中显示 getRule 数据
  });
}
onMounted(async () => {
  await findone();
  charts.value = states.value.value
    .filter(item => Object.keys(item.value).length <= 5)
    .map((item, index) => {
      const chart = echarts.init(document.getElementById(`chart${index}`));
      const option = {
        title: {
          text: item.question,
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            name: "Answers",
            type: "pie",
            radius: "50%",
            data: Object.entries(item.value).map(([key, value]) => ({
              value,
              name: key
            }))
          }
        ]
      };
      chart.setOption(option);
      return chart;
    });
});
</script>

<template>
  <el-card>
    <el-button @click="onBaseClick"> 导出数据 </el-button>
    <el-row>
      <el-col v-for="(item, index) in number" :key="index" :span="6">
        <div :id="`chart${index}`" style="height: 200px" />
      </el-col>
    </el-row>
  </el-card>
</template>
