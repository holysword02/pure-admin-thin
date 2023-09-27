interface FormItemProps {
  /** 学生编号 */
  id: string;
  /** 学生账号 */
  username: string;
  /** 学生姓名 */
  name: string;
  /** 学生性别 */
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
