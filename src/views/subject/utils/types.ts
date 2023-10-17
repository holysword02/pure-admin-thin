interface FormItemProps {
  /** 编号 */
  id: string;
  /** 学科名称 */
  subjectName: string;
  /** 学科id */
  subjectNameId: string;
  /** 老师名称 */
  teacherName: string;
  /** 老师id */
  teacherId: string;
  /** 班级名称 */
  className: string;
  /** 班级id */
  classId: string;
}

interface FormProps {
  formInline: FormItemProps;
  classList: Array<any>;
  teacherList: Array<any>;
  subjectnameList: Array<any>;
}

export type { FormItemProps, FormProps };
