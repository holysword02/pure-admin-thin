import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import { computed, Ref } from "vue";
import {
  studentDelete,
  studentFind,
  studentInsert,
  studentUpdate
} from "@/api/student";
import { classesFindAll } from "@/api/classes";

export function useAccount(tableRef: Ref) {
  const classList = ref();
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const selectedNum = ref(0);
  const form = reactive({
    username: "",
    name: "",
    sex: null
  });
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "勾选列", // 如果需要表格多选，此处label必须设置
      type: "selection",
      fixed: "left",
      reserveSelection: true // 数据刷新后保留选项
    },
    {
      label: "学生账号",
      prop: "username",
      minWidth: 130
    },
    {
      label: "学生姓名",
      prop: "name",
      minWidth: 130
    },
    {
      label: "班级",
      prop: "className",
      minWidth: 130
    },
    {
      label: "学生性别",
      prop: "sex",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.sex === 0 ? "danger" : ""}
          effect="plain"
        >
          {row.sex === 0 ? "女" : "男"}
        </el-tag>
      )
    },
    {
      label: "出生日期",
      prop: "birthday",
      minWidth: 90,
      formatter: ({ birthday }) => dayjs(birthday).format("YYYY-MM-DD")
    },
    {
      label: "手机号",
      prop: "phone",
      minWidth: 130
    },
    {
      label: "邮箱",
      prop: "email",
      minWidth: 130
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });

  function handleUpdate(row) {
    console.log(row);
  }

  function handleDelete(row) {
    studentDelete(row.id).then(r => {
      if (r) {
        message(`您删除了 ${row.name} 的数据`, { type: "success" });
        onSearch();
      }
    });
  }

  // 选择一页多少条数据
  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  // 选择到第几页
  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
    console.log(`current page: ${val}`);
  }

  /** 当CheckBox选择项发生变化时会触发该事件 */
  function handleSelectionChange(val) {
    selectedNum.value = val.length;
    // 重置表格高度
    tableRef.value.setAdaptive();
  }

  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.getTableRef().clearSelection();
  }

  /** 批量删除 */
  function onbatchDel() {
    // 返回当前选中的行
    const curSelected = tableRef.value.getTableRef().getSelectionRows();
    for (const i in curSelected) {
      studentDelete(curSelected[i].id).then(r => {
        if (!r) {
          message(`删除 ${curSelected[i].name} 的数据失败`, {
            type: "success"
          });
        } else {
          message(`您删除了 ${curSelected[i].name} 的数据`, {
            type: "success"
          });
        }
      });
    }
    // 接下来根据实际业务，通过选中行的某项数据，比如下面的id，调用接口进行批量删除
    // message(`已删除用户编号为 ${getKeyList(curSelected, "id")} 的数据`, {
    //   type: "success"
    // });
    tableRef.value.getTableRef().clearSelection();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { records, total } = await studentFind(
      pagination.currentPage,
      pagination.pageSize
    );
    dataList.value = records;
    pagination.total = total;

    classList.value = await classesFindAll();
    subjectnameList.value = await classesFindAll();
    teacherList.value = await classesFindAll();

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}用户`,
      props: {
        formInline: {
          title,
          id: row?.id ?? null,
          username: row?.username ?? null,
          name: row?.name ?? "",
          sex: row?.sex ?? null,
          birthday: row?.birthday ?? null,
          phone: row?.phone ?? ""
        },
        classList: classList?.value ?? null
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;

        function chores(r) {
          if (r) {
            message(`您${title}了用户名称为${curData.username}的这条数据`, {
              type: "success"
            });
          } else {
            message(`您${title}数据失败`, {
              type: "success"
            });
          }
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }

        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              studentInsert(curData)
                .then(r => {
                  chores(r);
                })
                .catch(e => {
                  chores(e);
                });
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              studentUpdate(curData).then(r => {
                chores(r);
              });
            }
          }
        });
      }
    });
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    selectedNum,
    pagination,
    buttonClass,
    classList,
    onSearch,
    resetForm,
    onbatchDel,
    openDialog,
    handleUpdate,
    handleDelete,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
