import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted } from "vue";
import { computed, Ref } from "vue";
import { usePublicHooks } from "@/views/account/utils/hooks";
import { questionList } from "@/api/question";
import dayjs from "dayjs";
import { voteFind } from "@/api/vote";
const { tagStyle } = usePublicHooks();

export function useAccount(tableRef: Ref) {
  const options = ref();
  const subjectList = ref();
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
    handleSizeChange,
    onSelectionCancel,
    handleCurrentChange,
    handleSelectionChange
  };
}
