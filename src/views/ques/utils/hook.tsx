import { ref, onMounted } from "vue";
import { Ref } from "vue";
import { quesFindAll } from "@/api/ques";
import { FormItemProps } from "@/views/student/utils/types";
import { addDialog } from "@/components/ReDialog/index";
import { h } from "vue/dist/vue";
import editForm from "@/views/student/form.vue";
import { message } from "@/utils/message";
import { studentInsert, studentUpdate } from "@/api/student";

export function useAccount(quesId: Ref, quesValue: Ref) {
  const loading = ref(true);

  async function onSearch() {
    loading.value = true;
    const { id, value } = await quesFindAll();
    quesId.value = id;
    quesValue.value = value;
  }


  onMounted(async () => {
    onSearch();
  });

  return {
    loading,
    onSearch,
  };
}
