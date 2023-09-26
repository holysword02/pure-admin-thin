interface FormItemProps {
  /** 角色编号 */
  id: string;
  /** 账号 */
  username: string;
  /** 角色名称 */
  name: string;
  // /** 性别 */
  // sex: string;
  /** 权限 */
  role: number;
  /** 状态 */
  isActive: number;
}

interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
