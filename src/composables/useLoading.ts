import { ref } from "vue";

export default function useLoading() {
  const isLoading = ref(false);

  function toggleLoading() {
    isLoading.value = !isLoading.value;
  }

  return {
    isLoading,
    toggleLoading,
  };
}
