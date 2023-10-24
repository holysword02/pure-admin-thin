import editForm from "../form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import { computed, Ref } from "vue";
import { usePublicHooks } from "@/views/account/utils/hooks";
import { ElMessageBox } from "element-plus";
import { accountUpdate } from "@/api/account";
import { useDetail } from "@/views/question/tabs/hooks";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import {
  questionDelete,
  questionFind,
  questionInsert,
  questionList,
  questionUpdate
} from "@/api/question";
import dayjs from "dayjs";
import { surveyUpdate } from "@/api/survey";
import { subjectFind, subjectFindAll } from "@/api/subject";
import { classesFindAll } from "@/api/classes";
import { dictFindAll } from "@/api/dict";
import { teacherFindAll } from "@/api/teacher";
import { voteFind } from "@/api/vote";
const { tagStyle } = usePublicHooks();

export function useAccount(tableRef: Ref) {
  const options = ref();
  const formRef = ref();
  const subjectList = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const { switchStyle } = usePublicHooks();
  const selectedNum = ref(0);
  const { toDetail, router } = useDetail();
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
      label: "问卷名",
      prop: "name",
      minWidth: 130
    },
    {
      label: "状态",
      prop: "status",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.status)}>
          {row.status === 1 ? "已填写" : "未填写"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      minWidth: 90,
      prop: "createDate",
      formatter: ({ createDate }) =>
        dayjs(createDate).format("YYYY-MM-DD HH:mm:ss")
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

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.isActive === 0 ? "停用" : "启用"
      }</strong><strong style="color:var(--el-color-primary)">${
        row.username
      }</strong>用户吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        surveyUpdate(row);
        console.log(row);
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message("已成功修改用户状态", {
            type: "success"
          });
        }, 300);
      })
      .catch(() => {
        row.isActive === 0 ? (row.isActive = 1) : (row.isActive = 0);
      });
  }

  function handleDelete(row) {
    questionDelete(row.id).then(r => {
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
      questionDelete(curSelected[i].id).then(r => {
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
    options.value = await questionList();
    loading.value = true;
    const { records, total } = await voteFind(
      pagination.currentPage,
      pagination.pageSize
    );
    dataList.value = records;
    pagination.total = total;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function subjectSearch() {
    loading.value = true;
    const { records, total } = await voteFind(
      pagination.currentPage,
      pagination.pageSize
    );
    dataList.value = records;
    pagination.total = total;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog() {
    // 保存信息到标签页
    useMultiTagsStoreHook().handleTags("push", {
      path: `/question/tabs/query-detail`,
      name: "NewSurvey",
      meta: {
        title: `新建问卷`,
        // 如果使用的是非国际化精简版title可以像下面这么写
        // title: `No.${index} - 详情信息`,
        // 最大打开标签数
        dynamicLevel: 3
      }
    });
    // 路由跳转
    router.push({ name: "NewSurvey" });
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
    options,
    onSearch,
    resetForm,
    subjectSearch,
    subjectList,
    onbatchDel,
    openDialog,
    handleDelete,
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
