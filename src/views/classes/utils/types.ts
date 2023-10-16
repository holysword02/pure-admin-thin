interface FormItemProps {
  /** 班级编号 */
  id: string;
  /** 班级名 */
  name: string;
}

interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
