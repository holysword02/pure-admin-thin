<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

//TODO 表单信息
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    subjectNameId: null,
    teacherId: null,
    classId: null
  }),
  classList: null,
  teacherList: null,
  subjectnameList: null
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const states1 = ref(props.subjectnameList);
const states2 = ref(props.teacherList);
const states3 = ref(props.classList);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });

//远程查询
const list1 = states1.value.map((item): ListItem => {
  return {
    value: item.id,
    label: `${item.id}:${item.label}`
  };
});

const list2 = states2.value.map((item): ListItem => {
  return {
    value: item.id,
    label: `${item.username}:${item.name}`
  };
});

const list3 = states3.value.map((item): ListItem => {
  return {
    value: item.id,
    label: `${item.id}:${item.name}`
  };
});

interface ListItem {
  value: string;
  label: string;
}

const options1 = ref<ListItem[]>([]);
const loading1 = ref(false);
const options2 = ref<ListItem[]>([]);
const loading2 = ref(false);
const options3 = ref<ListItem[]>([]);
const loading3 = ref(false);

const remoteMethod1 = (query: string) => {
  if (query !== "") {
    loading1.value = true;
    setTimeout(() => {
      loading1.value = false;
      options1.value = list1.filter(item => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options1.value = [];
  }
};

const remoteMethod2 = (query: string) => {
  if (query !== "") {
    loading1.value = true;
    setTimeout(() => {
      loading2.value = false;
      options2.value = list2.filter(item => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options2.value = [];
  }
};

const remoteMethod3 = (query: string) => {
  if (query !== "") {
    loading1.value = true;
    setTimeout(() => {
      loading3.value = false;
      options3.value = list3.filter(item => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options3.value = [];
  }
};
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="92px"
  >
    <el-form-item label="学科名:" prop="subjectNameId" style="font-weight: 700">
      <el-select-v2
        v-model="newFormInline.subjectNameId"
        style="width: 240px; font-weight: 400"
        filterable
        remote
        :remote-method="remoteMethod1"
        clearable
        :options="options1"
        :loading="loading1"
        placeholder="请输入学科"
      />
    </el-form-item>

    <el-form-item label="老师名:" prop="teacherId" style="font-weight: 700">
      <el-select-v2
        v-model="newFormInline.teacherId"
        style="width: 240px; font-weight: 400"
        filterable
        remote
        :remote-method="remoteMethod2"
        clearable
        :options="options2"
        :loading="loading2"
        placeholder="请输入老师"
      />
    </el-form-item>

    <el-form-item label="班级名:" prop="classId" style="font-weight: 700">
      <el-select-v2
        v-model="newFormInline.classId"
        style="width: 240px; font-weight: 400"
        filterable
        remote
        :remote-method="remoteMethod3"
        clearable
        :options="options3"
        :loading="loading3"
        placeholder="请输入班级"
      />
    </el-form-item>
  </el-form>
</template>
