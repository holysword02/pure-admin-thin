interface FormItemProps {
  /** 教师编号 */
  id: string;
  /** 教师账号 */
  username: string;
  /** 教师姓名 */
  name: string;
  /** 教师性别 */
  sex: number;
  /** 出生日期 */
  birthday: Date;
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
}

interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
