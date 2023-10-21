interface FormItemProps {
  id: string;
  value: Array<any>;
}

interface FormProps {
  formInline: FormItemProps;
  classList: Array<any>;
}

export type { FormItemProps, FormProps };
