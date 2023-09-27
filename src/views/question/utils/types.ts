interface FormItemProps {
  /** 编号 */
  id: string;
  /** 内容 */
  label: string;
  /** 父编号 */
  parentId: string;
  /** 状态 */
  isActive: number;
  /** 学科编号 */
  subjectId: string;
  /** 学科名称 */
  subjectName: string;
  /** 排序 */
  orderBy: number;
}

interface FormProps {
  formInline: FormItemProps;
  options: Array<any>;
}

export type { FormItemProps, FormProps };
