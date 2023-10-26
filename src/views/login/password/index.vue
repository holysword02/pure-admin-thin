<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { passwordUpdate } from "@/api/user";
import { DataInfo, removeToken, sessionKey } from "@/utils/auth";
import router from "@/router";
import { message } from "@/utils/message";
import { storageSession } from "@pureadmin/utils";

const newPassword = reactive({
  password: ""
});
const confirmPassword = reactive({
  password: ""
});

async function changePassword() {
  if (newPassword.password !== confirmPassword.password) {
    ElMessage({
      type: "error",
      message: "新密码和重复密码不匹配"
    });
  } else {
    await passwordUpdate(newPassword);
    removeToken();
    router.push("/login");
    ElMessage({
      type: "success",
      message: "密码修改成功"
    });
  }
}
onMounted(async () => {
  const userInfo = await storageSession().getItem<DataInfo<number>>(sessionKey);
  if (userInfo.roles[0] === "3") {
    message("请修改初始密码", { type: "warning" });
  }
});
</script>
<template>
  <el-card>
    <form>
      <el-form label-position="top">
        <el-form-item label="新密码">
          <el-input v-model="newPassword.password" type="password" />
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input v-model="confirmPassword.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePassword">修改密码</el-button>
        </el-form-item>
      </el-form>
    </form>
  </el-card>
</template>
