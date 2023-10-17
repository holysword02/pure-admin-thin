import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  id: [{ required: true, message: "角色账号为必填项", trigger: "blur" }],
  subjectNameId: [
    { required: true, message: "角色名称为必填项", trigger: "blur" }
  ],
  teacherId: [{ required: true, message: "角色权限为必填项", trigger: "blur" }],
  classId: [{ required: true, message: "角色状态为必填项", trigger: "blur" }]
});
