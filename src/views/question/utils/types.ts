interface FormItemProps {
  /** 编号 */
  id: string;
  /** 内容 */
  name: string;
  field: string;
  subject: string;
  createDate: string;
  updateDate: string;
  isActived: string;
  subjectId: string;
  subjectName: string;
}

interface FormProps {
  formInline: FormItemProps;
  subjectList: Array<any>;
}

export type { FormItemProps, FormProps };
