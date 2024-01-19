import { ref } from "vue";

const isLoading = ref(false);

export default function useLoading() {
    function setLoading(value: boolean) {
        isLoading.value = value;
    }

    function toggleLoading() {
        setLoading(!isLoading.value);
    }

    return {
        isLoading,
        toggleLoading,
        setLoading,
    };
}
