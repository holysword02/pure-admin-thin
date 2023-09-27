import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "角色名称为必填项", trigger: "blur" }],
  sex: [{ required: true, message: "角色权限为必填项", trigger: "blur" }],
  birthday: [{ required: true, message: "角色状态为必填项", trigger: "blur" }]
});
