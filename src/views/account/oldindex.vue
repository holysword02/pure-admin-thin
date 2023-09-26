<script setup lang="ts">
import { userFind } from "@/api/user";
import { reactive } from "vue";

defineOptions({
  name: "Account"
});

const tableData = reactive({ data: [] });
const page = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 10
});
const handleSizeChange = val => {
  page.pageSize = val;
  initData(1, page.pageSize);
};
const handleCurrentChange = val => {
  page.pageNum = val;
  initData(page.pageNum, page.pageSize);
};
const initData = (pageNum, pageSize) => {
  userFind(pageNum, pageSize).then(res => {
    page.total = res.total;
    tableData.data = res.records;
    console.log(res);
  });
};
initData(page.pageNum, page.pageSize);
</script>

<template>
  <el-space size="large">
    <el-card>
      <el-table :data="tableData.data">
        <el-table-column type="selection" />
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="role" label="权限" />
        <el-table-column prop="isActive" label="状态" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="修改时间" />
      </el-table>
      <!-- 分页条 -->
      <div style="margin-top: 10px">
        <el-pagination
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :page-sizes="[5, 10, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </el-space>
</template>
