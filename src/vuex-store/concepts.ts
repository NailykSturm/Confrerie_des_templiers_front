import axios from "axios";
import { Ref, ref } from "vue";

export const listConcepts: Ref<string[]> = ref([]);

export function fetchConcepts() {
    axios
        .get(`${import.meta.env.VITE_API_URL}/graph/concepts`)
        .then((response) => {
            listConcepts.value = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
