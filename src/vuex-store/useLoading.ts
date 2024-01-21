import { ref } from "vue";

export const isLoading = ref(false);

export function setLoading(value: boolean) {
    isLoading.value = value;
}

export function toggleLoading() {
    setLoading(!isLoading.value);
}
