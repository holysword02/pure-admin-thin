import { ref, onMounted } from "vue";
import { Ref } from "vue";
import { quesFindAll } from "@/api/ques";

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
    onSearch
  };
}
